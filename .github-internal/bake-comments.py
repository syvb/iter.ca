#!/usr/bin/env python3
"""Fetch each post's external comments into data/comments.json for Hugo to bake in.

A post's front matter names where it was shared (bsky = "...", lw = "..."). The deploy
workflow runs this before every Hugo build, and themes/smitop/layouts/post/single.html
embeds the post's entry in its page. Entries are keyed by the post's path under content/:

  {"post/name.md": {"comments": [...], "sources": [...]}}

The workflow also publishes the file as https://iter.ca/comments.json. When a source
can't be fetched, its comments from there (the last deploy) are kept, so an outage at
build time doesn't empty a comment section.
"""

from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
import json
from pathlib import Path
import re
import tomllib
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
LAST_DEPLOY = "https://iter.ca/comments.json"
APPVIEW = "https://public.api.bsky.app/xrpc"
LW = "https://www.lesswrong.com"
# The blog author's accounts (@iter.ca and loops); their comments get isAuthor.
AUTHOR_DID = "did:plc:n3csajkwabhchilmzmrsnvlc"
AUTHOR_LW_ID = "nDWrtEhgEPvoYqyyk"


def get_json(url, body=None):
    request = Request(url, data=body and json.dumps(body).encode(),
                      headers={"Content-Type": "application/json", "User-Agent": "iter.ca comments"})
    with urlopen(request, timeout=10) as response:
        return json.load(response)


def fetch_bsky(ref):
    match = re.fullmatch(r"https://bsky\.app/profile/([^/]+)/post/([^/?#]+)/?", ref)
    if not match:
        raise ValueError("unrecognized Bluesky post URL")
    repo, rkey = match.groups()
    if not repo.startswith("did:"):
        repo = get_json(f"{APPVIEW}/com.atproto.identity.resolveHandle?" + urlencode({"handle": repo}))["did"]
    uri = f"at://{repo}/app.bsky.feed.post/{rkey}"
    thread = get_json(f"{APPVIEW}/app.bsky.feed.getPostThread?" + urlencode({"depth": 10, "uri": uri}))["thread"]
    if "post" not in thread:
        raise ValueError("post not found or blocked")
    comments = []

    def flatten(node, depth):
        replies = [reply for reply in node.get("replies", []) if "post" in reply]
        for reply in sorted(replies, key=lambda reply: reply["post"]["record"].get("createdAt", "")):
            post = reply["post"]
            author = post["author"]
            profile = f"https://bsky.app/profile/{author['handle']}"
            comments.append({
                "source": "bsky",
                "url": f"{profile}/post/{post['uri'].rsplit('/', 1)[1]}",
                "depth": depth,
                "author": {"name": author.get("displayName") or author["handle"], "url": profile,
                           "avatar": author.get("avatar")},
                "text": post["record"].get("text", ""),
                "createdAt": post["record"].get("createdAt") or post["indexedAt"],
                "isAuthor": author["did"] == AUTHOR_DID,
            })
            flatten(reply, depth + 1)

    flatten(thread, 0)
    url = f"https://bsky.app/profile/{thread['post']['author']['handle']}/post/{rkey}"
    return {"url": url, "replyUrl": url, "comments": comments}


def fetch_lw(ref):
    match = re.match(r"https://(?:www\.)?lesswrong\.com/posts/([A-Za-z0-9]+)(?:/|$)", ref)
    if not match:
        raise ValueError("unrecognized LessWrong post URL")
    # The ID is alphanumeric, so it is safe to inline. postCommentsOld sorts oldest first.
    query = """{
      post(input: {selector: {_id: "%(id)s"}}) { result { pageUrl } }
      comments(input: {terms: {view: "postCommentsOld", postId: "%(id)s", limit: 1000}}) {
        results { _id parentCommentId postedAt deleted pageUrl user { _id slug displayName } contents { markdown html } }
      }
    }""" % {"id": match[1]}
    data = get_json(f"{LW}/graphql", {"query": query}).get("data") or {}
    post = (data.get("post") or {}).get("result")
    if not post:
        raise ValueError("post not found")
    raw = data["comments"]["results"]
    ids = {comment["_id"] for comment in raw}
    children = {}
    for comment in raw:
        # A reply whose parent isn't listed (e.g. removed by moderators) becomes top-level.
        parent = comment["parentCommentId"] if comment["parentCommentId"] in ids else None
        children.setdefault(parent, []).append(comment)
    comments = []

    def flatten(parent, depth):
        for raw_comment in children.get(parent, []):
            user = None if raw_comment["deleted"] else raw_comment["user"]
            contents = raw_comment["contents"] or {}
            comment = {
                "source": "lw",
                "url": raw_comment["pageUrl"],
                "depth": depth,
                "author": {"name": user["displayName"], "url": f"{LW}/users/{user['slug']}"} if user
                          else {"name": "[deleted]"},
                "createdAt": raw_comment["postedAt"],
                "isAuthor": bool(user) and user["_id"] == AUTHOR_LW_ID,
            }
            if raw_comment["deleted"]:
                comment["text"] = "[comment deleted]"
            elif contents.get("html"):
                # LessWrong's rendered HTML, passed through as is; the page sanitizes it before display.
                comment["html"] = contents["html"]
            else:
                comment["text"] = contents.get("markdown") or ""
            comments.append(comment)
            count = len(comments)
            flatten(raw_comment["_id"], depth + 1)
            # Like LessWrong, keep a deleted comment only as a placeholder above its replies.
            if raw_comment["deleted"] and len(comments) == count:
                comments.pop()

    flatten(None, 0)
    return {"url": post["pageUrl"], "replyUrl": post["pageUrl"], "comments": comments}


SOURCES = {"bsky": fetch_bsky, "lw": fetch_lw}


def fetch(kind, ref):
    try:
        return {"type": kind, "ref": ref, **SOURCES[kind](ref)}
    except Exception as error:
        return {"type": kind, "ref": ref, "url": ref, "replyUrl": ref, "error": f"{type(error).__name__}: {error}"}


def last_deploy():
    try:
        return get_json(LAST_DEPLOY)
    except Exception:
        return {}


def kept(entry, kind, ref):
    """This source's share of a post's entry from the last deploy, if it was fetched then."""
    for source in (entry or {}).get("sources", []):
        if source["type"] == kind and source.get("ref") == ref and "error" not in source:
            return {**source, "comments": [comment for comment in entry["comments"] if comment["source"] == kind]}


def posted(comment):
    try:
        return datetime.fromisoformat(comment["createdAt"]).timestamp()
    except ValueError:
        return 0


def merge_threads(results):
    """Interleave the sources' threads by when each thread's top-level comment was posted.

    Each source lists its comments depth-first, so a depth-0 comment starts a thread that
    runs until the next one; replies stay under their parent.
    """
    threads = []
    for result in results:
        for comment in result.get("comments", []):
            if comment["depth"] == 0:
                threads.append([])
            threads[-1].append(comment)
    threads.sort(key=lambda thread: posted(thread[0]))
    return [comment for thread in threads for comment in thread]


def main():
    content = ROOT / "content"
    jobs = []
    for path in sorted(content.glob("post/**/*.md")):
        front = tomllib.loads(path.read_text().split("+++", 2)[1])
        jobs += [(path.relative_to(content).as_posix(), kind, front[kind]) for kind in SOURCES if front.get(kind)]
    with ThreadPoolExecutor(8) as pool:
        results = list(pool.map(lambda job: fetch(*job[1:]), jobs))

    previous = None
    by_post = {}
    for (post, kind, ref), result in zip(jobs, results):
        if "error" in result:
            if previous is None:
                previous = last_deploy()
            old = kept(previous.get(post), kind, ref)
            print(f"::warning::{post}: couldn't fetch {kind} comments ({result['error']}); "
                  + ("kept the last deploy's" if old else "none from the last deploy to keep"))
            result = old or result
        by_post.setdefault(post, []).append(result)

    baked = {}
    for post, results in by_post.items():
        baked[post] = {
            "comments": merge_threads(results),
            "sources": [{key: value for key, value in result.items() if key != "comments"} for result in results],
        }
        print(f"{post}: {len(baked[post]['comments'])} comments")
    (ROOT / "data/comments.json").write_text(json.dumps(baked, indent=1) + "\n")


if __name__ == "__main__":
    main()
