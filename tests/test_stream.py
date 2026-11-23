"""Exercise stream importers and regeneration without network or real data writes."""

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]


def lw_reply(posts, comments=()):
    """A LessWrong GraphQL reply with these posts and comments."""
    return {"data": {"posts": {"results": list(posts)}, "comments": {"results": list(comments)}}}


def lw_fetch(reply, ok=True):
    """A fetch stub that answers the LessWrong GraphQL request with reply."""
    return (f"globalThis.fetch = async () => ({{ok: {json.dumps(ok)}, status: {200 if ok else 502}, "
            f"json: async () => ({json.dumps(reply)})}});\n")


class StreamTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.get = self.root / "build-data/get"
        self.get.mkdir(parents=True)
        (self.root / "data").mkdir()
        self.data = self.root / "data/data.json"
        self.original = b'[{"Id":"previous-data"}]\n'
        self.data.write_bytes(self.original)
        shutil.copy2(ROOT / "regen.sh", self.root)
        shutil.copy2(ROOT / "build-data/get/all.sh", self.get)
        self.generators = ["notes", "gh", "ghrepos", "yt", "hn", "itch", "scrprojs",
                           "se", "observable", "buttondown", "lw", "bsky", "kb"]
        for name in self.generators:
            (self.get / f"{name}.js").write_text(
                f'console.log(JSON.stringify({{Id: "{name}"}}));\n')
        self.env = dict(os.environ, NODE_OPTIONS="")

    def install(self, name, fetch):
        shutil.copy2(ROOT / f"build-data/get/{name}.js", self.get)
        shutil.copy2(ROOT / "build-data/get/plaintext.js", self.get)
        stub = self.root / "fetch.js"
        stub.write_text(fetch)
        self.env["NODE_OPTIONS"] = f'--require "{stub}"'

    def importer(self, name, fetch):
        self.install(name, fetch)
        result = subprocess.run(["node", f"{name}.js"], cwd=self.get,
                                env=self.env, capture_output=True, text=True,
                                timeout=30)
        self.assertEqual(result.returncode, 0, result.stderr)
        return [json.loads(line) for line in result.stdout.splitlines()]

    def regenerate(self):
        return subprocess.run(["bash", "regen.sh"], cwd=self.root,
                              env=self.env, capture_output=True, text=True,
                              timeout=30)

    def test_hn_keeps_posts_after_a_deleted_post(self):
        rows = self.importer("hn", """
const posts = {
    31: {id: 31, type: "story", title: "Newest", time: 300},
    22: {id: 22, deleted: true},
    13: {id: 13, type: "comment", text: "Older comment", time: 100},
};
globalThis.fetch = async url => ({json: async () => url.includes("/user/")
    ? {submitted: [31, 22, 13]}
    : posts[url.match(/item\\/(\\d+)/)[1]]});
""")
        self.assertEqual([row["Id"] for row in rows],
                         ["hn-post-31", "hn-post-13"])
        self.assertEqual(rows[1]["Text"], "Older comment")

    def test_github_imports_each_pr_once_across_pages(self):
        rows = self.importer("gh", """
const items = Array.from({length: 205}, (_, i) => ({
    id: i + 1, number: i + 1, title: `PR ${i + 1}`, comments: 0,
    body: "PR body", closed_at: "2026-01-01T00:00:00Z",
    html_url: `https://github.com/example/repo/pull/${i + 1}`,
    url: `https://api.github.com/repos/example/repo/issues/${i + 1}`,
}));
globalThis.fetch = async url => {
    const params = new URL(url).searchParams;
    const page = Math.max(1, Number(params.get("page")));
    const size = Math.min(100, Number(params.get("per_page")));
    return {json: async () => ({
        items: items.slice((page - 1) * size, page * size),
        total_count: items.length,
    })};
};
""")
        self.assertEqual([row["Id"] for row in rows],
                         [f"gh-pr-{i}" for i in range(1, 206)])

    def test_lw_skips_events_and_posts_on_this_site_and_dates_old_posts_in_sf(self):
        posts = [
            ("Event", "2026-11-20T18:00:00.000Z", {"isEvent": True}),
            ("Exact", "2026-11-11T08:30:00.900Z", {}),
            ("BeforeCutoff", "2026-11-11T07:30:00.000Z", {}),
            ("Old", "2026-04-28T06:46:24.097Z", {}),
            ("Short", "2026-10-13T19:59:43.684Z", {"shortform": True}),
            ("Link", "2024-09-28T23:43:10.870Z",
             {"url": "https://iter.ca/post/llm-user-roleplay/"}),
        ]
        results = [dict({"_id": id, "title": f"{id} title", "postedAt": at,
                         "shortform": False, "isEvent": False, "url": None,
                         "pageUrl": f"https://www.lesswrong.com/posts/{id}/slug"}, **extra)
                   for id, at, extra in posts]
        rows = self.importer("lw", lw_fetch(lw_reply(results)))
        # 2026-11-11T08:30:00Z, then midnight UTC of the San Francisco dates Nov 10 and Apr 27
        self.assertEqual([(row["Id"], row["Date"]["Unix"]) for row in rows],
                         [("lw-Exact", 1794385800), ("lw-BeforeCutoff", 1794268800),
                          ("lw-Old", 1777248000)])
        self.assertEqual(rows[0]["Uri"], "https://www.lesswrong.com/posts/Exact/slug")

    def test_lw_keeps_post_text_for_search(self):
        # LessWrong splits words across inline tags, and MathJax leaves a formula's text in neither the formula nor the
        # page: it draws it from the CSS in a <style>, so only the formula's aria-label has its TeX.
        html = ('<style>mjx-container { line-height: 0; }</style>'
                '<p><span>Activation </span><span>verbal</span><span>izers</span> map '
                '<span class="math-tex"><mjx-container class="MathJax" aria-label="x^2 &amp; y" role="math">'
                '<mjx-math><mjx-c class="mjx-c78"></mjx-c></mjx-math></mjx-container></span> to text.</p>'
                '<ul><li>One</li><li>Two&lt;3</li></ul><h2>End<img alt="an <activation> of a > b" src="x"></h2>')
        post = {"_id": "Post", "title": "Post title", "postedAt": "2026-11-12T00:00:00.000Z",
                "shortform": False, "isEvent": False, "url": None,
                "pageUrl": "https://www.lesswrong.com/posts/Post/slug", "contents": {"html": html}}
        rows = self.importer("lw", lw_fetch(lw_reply([post])))
        # entities stay, for the search index to decode
        self.assertEqual(rows[0]["FullText"], "Activation verbalizers map $x^2 &amp; y$ to text. One Two&lt;3 End")
        self.assertNotIn("Text", rows[0])

    def test_lw_imports_comments_and_quick_takes(self):
        def comment(id, **extra):
            return dict({"_id": id, "postedAt": "2026-11-12T00:00:00.000Z", "shortform": False,
                         "parentCommentId": None, "deleted": False, "draft": False, "retracted": False,
                         "pageUrl": f"https://www.lesswrong.com/posts/P/slug?commentId={id}",
                         "contents": {"html": f"<p>{id} <em>text</em></p><p>&lt;b&gt;</p>"},
                         "post": {"title": "Someone's post"}}, **extra)
        post = {"_id": "Post", "title": "Post title", "postedAt": "2026-11-12T00:00:00.000Z", "shortform": False,
                "isEvent": False, "url": None, "pageUrl": "https://www.lesswrong.com/posts/Post/slug"}
        rows = self.importer("lw", lw_fetch(lw_reply([post], [
            comment("Reply"),
            comment("Deleted", deleted=True),
            comment("Retracted", retracted=True),
            comment("Draft", draft=True),
            # a comment that starts a thread in my shortform post, and a reply in someone else's
            comment("Take", shortform=True, post={"title": "loops's Shortform"}),
            comment("ShortReply", shortform=True, parentCommentId="Parent"),
        ])))[1:]
        self.assertEqual([(row["Id"], row["LwType"], row.get("Title")) for row in rows], [
            ("lw-comment-Reply", "comment", "Comment on Someone's post"),
            ("lw-comment-Take", "quick take", None),
            ("lw-comment-ShortReply", "comment", "Comment on Someone's post"),
        ])
        self.assertEqual(rows[0]["Text"], "Reply text &lt;b&gt;")
        self.assertEqual(rows[0]["Uri"], "https://www.lesswrong.com/posts/P/slug?commentId=Reply")

    def test_bsky_imports_posts_across_pages_but_not_noted_posts(self):
        (self.root / "notes").mkdir()
        (self.root / "notes/thread.txt").write_text(
            "Title=Thread\nUri=https://bsky.app/profile/iter.ca/post/noted\n\nText\n")
        rows = self.importer("bsky", """
const post = (rkey, extra = {}) => ({post: {uri: `at://did:plc:x/app.bsky.feed.post/${rkey}`,
    record: {text: `${rkey} text`, createdAt: "2026-05-16T12:00:00.000Z", ...extra}}});
const pages = {
    "": {feed: [post("top"), {...post("repost"), reason: {}}, post("noted")], cursor: "next"},
    next: {feed: [post("reply", {reply: {}})], cursor: "end"},
    end: {feed: []},
};
globalThis.fetch = async url => ({ok: true, status: 200,
    json: async () => pages[new URL(url).searchParams.get("cursor") || ""]});
""")
        self.assertEqual([(row["Id"], row["BskyType"]) for row in rows],
                         [("bsky-top", "post"), ("bsky-reply", "reply")])
        self.assertEqual(rows[0]["Uri"], "https://bsky.app/profile/iter.ca/post/top")
        self.assertEqual(rows[0]["Date"]["Unix"], 1778932800)

    KB_FETCH = """
const manifest = {
    "public/journals/2024-06-07.html": {slug: "/journals/2024_06_07", title: "2024-06-07"},
    "public/pages/irrops.html": {slug: "/pages/irrops", title: "IRROPs"},
    "public/pages/kbitercatests.html": {slug: "/pages/kbitercatests", title: "Tests"},
};
const page = (title, body) => `<html><head><title>${title}</title></head><body><article><header><h1>${title}</h1>
    </header><ul><li><span><span class="attr-name">public:</span> <span class="attr-value">true</span></span></li>
    ${body}</ul></article></body></html>`;
const pages = {
    "/manifest.json": manifest,
    "/journals/2024-06-07": page("2024-06-07", "<li>Trip<ul><li>Talk</li></ul></li>"),
    "/pages/irrops": page("IRROPs", "<li>means IRRegular <strong>OP</strong>erations &amp; more</li>"),
};
globalThis.fetch = async url => {
    const body = pages[new URL(url).pathname];
    return {ok: !!body, status: body ? 200 : 404,
        headers: {get: name => name === "last-modified" ? "Mon, 24 Feb 2025 19:14:19 GMT" : null},
        json: async () => body, text: async () => body};
};
"""

    def test_kb_imports_page_text_for_search_only(self):
        rows = self.importer("kb", self.KB_FETCH)
        self.assertEqual([(row["Id"], row["KbType"], row["Title"], row["Date"]["Unix"]) for row in rows], [
            ("kb-journals-2024-06-07", "journal", "2024-06-07", 1717718400),
            ("kb-pages-irrops", "page", "IRROPs", 1740424459),
        ])
        # without the title or "public: true"; entities stay, for the search index to decode
        self.assertEqual([row["FullText"] for row in rows],
                         ["Trip Talk", "means IRRegular OPerations &amp; more"])
        self.assertEqual(rows[1]["Uri"], "https://kb.iter.ca/pages/irrops")
        self.assertEqual({row["Verbose"] for row in rows}, {2})

    def test_failed_kb_page_preserves_previous_data(self):
        self.install("kb", self.KB_FETCH.replace('"/pages/irrops": page', '"/gone": page'))
        result = self.regenerate()
        self.assertNotEqual(result.returncode, 0, result.stdout)
        self.assertEqual(self.data.read_bytes(), self.original)

    def test_github_repos_are_public_non_forks_with_the_start_of_their_readme(self):
        self.env["GITHUB_TOKEN"] = "token"
        rows = self.importer("ghrepos", """
const repo = (name, extra = {}) => ({name, description: `${name} repo`, url: `https://github.com/syvb/${name}`,
    createdAt: "2020-08-04T13:45:04Z", isPrivate: false, isFork: false, readme: null, ...extra});
const pages = {
    null: {nodes: [repo("ttw", {readme: {text: "word ".repeat(1000)}}), repo("secret", {isPrivate: true})],
           pageInfo: {hasNextPage: true, endCursor: "next"}},
    next: {nodes: [repo("fork", {isFork: true}), repo("empty", {description: null})],
           pageInfo: {hasNextPage: false, endCursor: null}},
};
globalThis.fetch = async (url, options) => {
    const {query, variables} = JSON.parse(options.body);
    if (!query.includes("privacy: PUBLIC")) throw new Error("asked for private repositories");
    return {ok: true, status: 200,
        json: async () => ({data: {user: {repositories: pages[variables.after]}}})};
};
""")
        self.assertEqual([(row["Id"], row["Verbose"]) for row in rows],
                         [("gh-repo-ttw", 2), ("gh-repo-empty", 2)])
        readme = rows[0]["Text"].removeprefix("ttw repo\n\n")
        self.assertTrue(readme.startswith("word word"))
        self.assertLessEqual(len(readme), 2000)
        self.assertGreater(len(readme), 1990)
        self.assertFalse(readme.endswith(" ") or readme.endswith("wor"))
        self.assertEqual(rows[1]["Text"], "")

    def test_failed_or_partial_lw_listing_preserves_previous_data(self):
        good = {"_id": "Good", "title": "Good title", "postedAt": "2026-11-12T00:00:00.000Z",
                "shortform": False, "url": None,
                "pageUrl": "https://www.lesswrong.com/posts/Good/slug"}
        for name, reply, ok in [
            ("HTTP error", {}, False),
            ("GraphQL errors", {"errors": [{"message": "timeout"}],
                                "data": {"posts": {"results": [good]}}}, True),
            ("empty listing", {"data": {"posts": {"results": []}}}, True),
            ("no URL", {"data": {"posts": {"results": [good, dict(good, pageUrl=None)]}}}, True),
            ("bad date", {"data": {"posts": {"results": [good, dict(good, postedAt="soon")]}}}, True),
        ]:
            with self.subTest(name):
                self.install("lw", lw_fetch(reply, ok))
                result = self.regenerate()
                self.assertNotEqual(result.returncode, 0, result.stdout)
                self.assertEqual(self.data.read_bytes(), self.original)

    def test_successful_regen_replaces_previous_data(self):
        result = self.regenerate()
        self.assertEqual(result.returncode, 0, result.stderr)
        rows = json.loads(self.data.read_text())
        self.assertEqual([row["Id"] for row in rows],
                         self.generators + ["allsh-first-note"])
        self.assertEqual(list(self.data.parent.iterdir()), [self.data])

    def test_failed_or_invalid_regen_preserves_previous_data(self):
        for script in [
            'console.log(JSON.stringify({Id: "partial"})); process.exit(1);',
            'console.log("not JSON");',
        ]:
            with self.subTest(script=script):
                (self.get / "itch.js").write_text(script)
                result = self.regenerate()
                self.assertNotEqual(result.returncode, 0, result.stderr)
                self.assertEqual(self.data.read_bytes(), self.original)
                self.assertEqual(list(self.data.parent.iterdir()), [self.data])


if __name__ == "__main__":
    unittest.main()
