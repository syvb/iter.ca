"""Exercise the comment baking entry point against canned Bluesky, LessWrong, and iter.ca replies."""

from contextlib import redirect_stdout
import io
import json
from pathlib import Path
import runpy
import shutil
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlsplit


SCRIPT = Path(__file__).resolve().parents[1] / "bake-comments.py"
BLOG_AUTHOR = "did:plc:n3csajkwabhchilmzmrsnvlc"


def bsky_reply(rkey, handle, created, text, replies=(), did="did:plc:reader", name=None):
    author = {"did": did, "handle": handle, "avatar": f"https://cdn.example/{handle}"}
    if name:
        author["displayName"] = name
    return {"post": {"uri": f"at://{did}/app.bsky.feed.post/{rkey}", "author": author,
                     "record": {"text": text, "createdAt": created}, "indexedAt": created},
            "replies": list(replies)}


# Replies are listed newest first, as the API may return them; one is from a blocked account.
THREADS = {
    f"at://{BLOG_AUTHOR}/app.bsky.feed.post/abc": {"post": {"author": {"handle": "iter.ca"}}, "replies": [
        bsky_reply("b2", "bob.test", "2026-01-05T00:00:00.000Z", "later"),
        {"$type": "app.bsky.feed.defs#blockedPost", "blocked": True},
        bsky_reply("b1", "alice.test", "2026-01-01T00:00:00.000Z", "first", name="Alice", replies=[
            bsky_reply("b1b", "bob.test", "2026-01-09T00:00:00.000Z", "late reply"),
            bsky_reply("b1a", "iter.ca", "2026-01-02T00:00:00.000Z", "reply", did=BLOG_AUTHOR, name="iter"),
        ]),
    ]},
    "at://did:plc:other/app.bsky.feed.post/xyz": {"post": {"author": {"handle": "other.test"}}, "replies": [
        bsky_reply("o1", "bob.test", "2026-02-01T00:00:00.000Z", "on the bundle"),
    ]},
}


def lw_comment(comment_id, parent, day, user=("u1", "carol", "Carol"), html=None, markdown=None, deleted=False):
    return {"_id": comment_id, "parentCommentId": parent, "postedAt": f"2026-01-0{day}T00:00:00.000Z",
            "deleted": deleted, "pageUrl": f"https://www.lesswrong.com/posts/Post1/slug?commentId={comment_id}",
            "user": dict(zip(("_id", "slug", "displayName"), user)), "contents": {"html": html, "markdown": markdown}}


LW_COMMENTS = [
    lw_comment("L1", None, 3, html="<p>hi</p>"),
    lw_comment("L4", None, 4, html="<p>gone</p>", deleted=True),  # no replies, so it is dropped
    lw_comment("L2", "L1", 6, html="<p>hidden</p>", deleted=True),  # kept as a placeholder above L3
    lw_comment("L3", "L2", 7, user=("nDWrtEhgEPvoYqyyk", "loops", "loops"), markdown="md"),
    lw_comment("L5", "unlisted", 8, html="<p>orphan</p>"),
]


class BakeCommentsTest(unittest.TestCase):
    def bake(self, root, bsky_up=True, last_deploy=None):
        def respond(request, timeout):
            url = urlsplit(request.full_url)
            if url.netloc == "iter.ca" and last_deploy is not None:
                reply = last_deploy
            elif url.path.endswith("resolveHandle"):
                reply = {"did": BLOG_AUTHOR}
            elif url.path.endswith("getPostThread") and bsky_up:
                reply = {"thread": THREADS[parse_qs(url.query)["uri"][0]]}
            elif url.netloc == "www.lesswrong.com":
                self.assertIn('"Post1"', json.loads(request.data)["query"])
                reply = {"data": {"post": {"result": {"pageUrl": "https://www.lesswrong.com/posts/Post1/slug"}},
                                  "comments": {"results": LW_COMMENTS}}}
            else:
                raise HTTPError(request.full_url, 502, "Bad Gateway", {}, None)
            return io.BytesIO(json.dumps(reply).encode())

        stdout = io.StringIO()
        with patch("urllib.request.urlopen", side_effect=respond), redirect_stdout(stdout):
            runpy.run_path(str(root / ".github/bake-comments.py"), run_name="__main__")
        return json.loads((root / "data/comments.json").read_text()), stdout.getvalue()

    def test_merges_sources_and_keeps_last_deploy_when_a_source_is_down(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            for directory in [".github", "data", "content/post/bundle"]:
                (root / directory).mkdir(parents=True)
            shutil.copy(SCRIPT, root / ".github")
            (root / "content/post/shared.md").write_text(
                '+++\ntitle = "Shared"\nbsky = "https://bsky.app/profile/iter.ca/post/abc"\n'
                'lw = "https://www.lesswrong.com/posts/Post1/slug"\n+++\nBody with +++ in it\n')
            (root / "content/post/bundle/index.md").write_text(
                '+++\nbsky = "https://bsky.app/profile/did:plc:other/post/xyz"\n+++\n')
            (root / "content/post/plain.md").write_text('+++\ntitle = "Not shared anywhere"\n+++\n')

            baked, _ = self.bake(root)
            self.assertEqual(sorted(baked), ["post/bundle/index.md", "post/shared.md"])
            shared = baked["post/shared.md"]
            # Threads from both sources in order of their top-level comment, replies under their parent.
            self.assertEqual(
                [(c["source"], c["depth"], c["author"]["name"], c.get("html") or c["text"], c["isAuthor"])
                 for c in shared["comments"]],
                [("bsky", 0, "Alice", "first", False),
                 ("bsky", 1, "iter", "reply", True),
                 ("bsky", 1, "bob.test", "late reply", False),
                 ("lw", 0, "Carol", "<p>hi</p>", False),
                 ("lw", 1, "[deleted]", "[comment deleted]", False),
                 ("lw", 2, "loops", "md", True),
                 ("bsky", 0, "bob.test", "later", False),
                 ("lw", 0, "Carol", "<p>orphan</p>", False)])
            self.assertEqual(shared["comments"][1]["url"], "https://bsky.app/profile/iter.ca/post/b1a")
            self.assertEqual(shared["comments"][0]["author"],
                             {"name": "Alice", "url": "https://bsky.app/profile/alice.test",
                              "avatar": "https://cdn.example/alice.test"})
            self.assertEqual(shared["comments"][5]["author"],
                             {"name": "loops", "url": "https://www.lesswrong.com/users/loops"})
            self.assertEqual([(s["type"], s["replyUrl"]) for s in shared["sources"]],
                             [("bsky", "https://bsky.app/profile/iter.ca/post/abc"),
                              ("lw", "https://www.lesswrong.com/posts/Post1/slug")])
            self.assertEqual(baked["post/bundle/index.md"]["sources"][0]["url"],
                             "https://bsky.app/profile/other.test/post/xyz")

            # Bluesky is down for the next build. The last deploy has the shared post but not the bundle.
            last_deploy = {"post/shared.md": shared}
            rebaked, output = self.bake(root, bsky_up=False, last_deploy=last_deploy)
            self.assertEqual(rebaked["post/shared.md"], shared)
            bundle = rebaked["post/bundle/index.md"]
            self.assertEqual(bundle["comments"], [])
            self.assertEqual(bundle["sources"][0]["replyUrl"], "https://bsky.app/profile/did:plc:other/post/xyz")
            self.assertIn("502", bundle["sources"][0]["error"])
            for post in ["post/shared.md", "post/bundle/index.md"]:
                self.assertIn(f"::warning::{post}: couldn't fetch bsky comments", output)

            # A copy kept for a different Bluesky post is not reused.
            last_deploy["post/shared.md"]["sources"][0]["ref"] = "https://bsky.app/profile/iter.ca/post/old"
            rebaked, _ = self.bake(root, bsky_up=False, last_deploy=last_deploy)
            self.assertEqual({c["source"] for c in rebaked["post/shared.md"]["comments"]}, {"lw"})
            self.assertIn("error", rebaked["post/shared.md"]["sources"][0])


if __name__ == "__main__":
    unittest.main()
