"""Exercise stream importers and regeneration without network or real data writes."""

import json
import os
import re
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

    def test_buttondown_excerpt_is_the_first_section_past_the_greeting_and_posts(self):
        (self.get / "tokens").mkdir()
        (self.get / "tokens/buttondown.txt").write_text("token\n")
        emails = {
            # as Buttondown's editor writes HTML; a figure's caption isn't part of the excerpt
            "html": "<!-- buttondown-editor-mode: fancy --><p>Hey there!</p><h2>posts</h2><ul><li><p>A post</p></li>"
                    "</ul><h2>research</h2><p>I wrote about FDT &amp; more.</p><figure><img src=\"a.png\"><figcaption>"
                    "A caption</figcaption></figure><p>Then NLAs.</p><h2>london</h2><p>Still here.</p>",
            # Markdown, whose list items are run together, and the posts inside the first section are left out
            "markdown": "Welcome!\n\n## stuff I’ve done\n\n- I shut down [a service](https://x.example)\n"
                        "- I hosted **Writehaven**.\n- I made _a game_\n\nNot much else.\n\n### posts\n\n"
                        "- [A post](https://y.example)\n",
            # a section with only a subsection in it
            "nested": "<p>Hi!</p><h2>Travel</h2><h3>SF</h3><p>I stayed in SF.</p>",
            # with no headings, there's no greeting to tell from the rest
            "plain": "<p>Hi everyone!</p><p>I've been in SF.</p>",
        }
        results = [{"slug": slug, "subject": slug, "body": body, "publish_date": "2026-11-12T00:00:00Z",
                    "absolute_url": f"https://buttondown.com/z/archive/{slug}/"} for slug, body in emails.items()]
        rows = self.importer("buttondown", f"""
globalThis.fetch = async url => ({{json: async () =>
    ({{results: url.includes("status=sent") ? {json.dumps(results)} : [], next: null}})}});
""")
        self.assertEqual({row["Id"]: (row.get("Headings"), row["Excerpt"]) for row in rows}, {
            "buttondown-html": (["posts", "research", "london"], "I wrote about FDT &amp; more. Then NLAs."),
            "buttondown-markdown": (["stuff I’ve done", "posts"],
                                    "I shut down a service, I hosted Writehaven. I made a game, Not much else."),
            "buttondown-nested": (["Travel", "SF"], "I stayed in SF."),
            "buttondown-plain": (None, "Hi everyone! I've been in SF."),
        })

    def test_buttondown_copies_public_updates_to_the_site(self):
        (self.get / "tokens").mkdir()
        (self.get / "tokens/buttondown.txt").write_text("token\n")
        updates = self.root / "content/update"
        updates.mkdir(parents=True)
        # a copy of an email that's since been deleted or renamed
        (updates / "99.html").write_text('+++\ntitle = "iter.ca update #99"\n+++\n<p>Gone.</p>\n')
        # each email's raw body, and Buttondown's rendering of it, which the copy is
        emails = [
            ("iter.ca update #13", "enabled", "<p>Welcome to update <em>thirteen</em>.</p>\n\nhttps://iter.ca/post/x/",
             '<p>Welcome to update <em>thirteen</em> &amp; its photos.</p>'
             '<a href="https://iter.ca/post/x/" class="embedded-link">X</a><h2>Photos</h2>'
             '<figure><img src="https://assets.buttondown.email/images/a-1.jpg?w=960&amp;fit=max">'
             '<figcaption>A photo &amp; more</figcaption></figure><p>Done.<sup id="fnref:1"><a class="footnote-ref" '
             'href="#fn:1">1</a></sup></p><div class="footnote"><hr /><ol><li id="fn:1"><p>A note.</p></li></ol></div>'),
            ("iter.ca update #2", "enabled", "Hi!\n\n- I did **a thing**\n", "<p>Hi!</p><ul><li>I did <strong>a thing</strong></li></ul>"),
            ("iter.ca update #7", "enabled_for_subscribers", "<p>Only for subscribers.</p>", None),
            ("A special announcement", "enabled", "<p>Not an update.</p>", None),
        ]
        # an email's own description and preview image, which #13 doesn't have
        fields = {"iter.ca update #2": {"description": "Update two.",
                                        "image": "https://assets.buttondown.email/images/two.png"}}
        patches = self.root / "patches.jsonl"

        # a stub of Buttondown's API with these emails, and of iter.ca serving the pages in live; it records the
        # changes made to emails in patches
        def fetch(emails, render_ok=True, live=(), patch_ok=True):
            results = [{"id": f"em_{i}", "slug": f"slug-{i}", "subject": subject, "archival_mode": mode, "body": body,
                        "publish_date": f"2026-11-{12 - i}T00:00:00Z", "canonical_url": "",
                        "absolute_url": f"https://buttondown.com/z/archive/slug-{i}/", **fields.get(subject, {})}
                       for i, (subject, mode, body, _) in enumerate(emails)]
            renders = {f"em_{i}": render for i, (*_, render) in enumerate(emails) if render}
            return f"""
globalThis.fetch = async (url, options = {{}}) => {{
    if (url.startsWith("https://iter.ca/")) return {{ok: {json.dumps(list(live))}.includes(url)}};
    if (options.method === "PATCH") {{
        require("fs").appendFileSync({json.dumps(str(patches))}, JSON.stringify(
            {{url, headers: options.headers, body: JSON.parse(options.body)}}) + "\\n");
        return {{ok: {json.dumps(patch_ok)}, status: {200 if patch_ok else 403}}};
    }}
    const render = url.match(/emails\\/(\\w+)\\/renders\\?target=html$/);
    const ok = !render || {json.dumps(render_ok)};
    return {{ok, status: ok ? 200 : 503, json: async () => render
        ? {{content: {json.dumps(renders)}[render[1]]}}
        : {{results: url.includes("status=sent") ? {json.dumps(results)} : [], next: null}}}};
}};
"""
        # a failed render, or two emails with the same number, fails the import and leaves the copies as they were
        for stub in [fetch(emails, render_ok=False),
                     fetch(emails + [("iter.ca update #2: correction", "enabled", "<p>Oops.</p>", "<p>Oops.</p>")])]:
            self.install("buttondown", stub)
            failed = subprocess.run(["node", "buttondown.js"], cwd=self.get, env=self.env, capture_output=True,
                                    text=True, timeout=30)
            self.assertNotEqual(failed.returncode, 0)
            self.assertEqual(sorted(path.name for path in updates.iterdir()), ["99.html"])

        # a change to an email that fails doesn't fail the import
        self.install("buttondown", fetch(emails, live=["https://iter.ca/update/13/"], patch_ok=False))
        warned = subprocess.run(["node", "buttondown.js"], cwd=self.get, env=self.env, capture_output=True, text=True,
                                timeout=30)
        self.assertEqual(warned.returncode, 0, warned.stderr)
        self.assertIn('::warning::Couldn\'t set the canonical URL of "iter.ca update #13" in Buttondown', warned.stderr)
        self.assertEqual(len(warned.stdout.splitlines()), 4)
        patches.unlink()

        rows = self.importer("buttondown", fetch(emails, live=["https://iter.ca/update/13/"]))
        # an email whose copy iter.ca serves gets the copy as its canonical URL; one whose copy isn't up yet doesn't
        self.assertEqual([json.loads(line) for line in patches.read_text().splitlines()], [{
            "url": "https://api.buttondown.email/v1/emails/em_0",
            "headers": {"Authorization": "Token token", "Content-Type": "application/json"},
            "body": {"canonical_url": "https://iter.ca/update/13/"},
        }])
        self.assertEqual({row["Title"]: row["Uri"] for row in rows}, {
            "iter.ca update #13": "https://iter.ca/update/13/",
            "iter.ca update #2": "https://iter.ca/update/2/",
            "iter.ca update #7": "https://buttondown.com/z/archive/slug-2/",
            "A special announcement": "https://buttondown.com/z/archive/slug-3/",
        })
        self.assertEqual(sorted(path.name for path in updates.iterdir()), ["13.html", "2.html"])

        self.data.write_text(json.dumps(rows))
        for name in ["homecols.toml", "voverrides.yml", "cta.toml"]:
            shutil.copy2(ROOT / "data" / name, self.root / "data")
        config = self.root / "config.json"
        config.write_text(json.dumps({"dataDir": str(self.root / "data")}))
        result = subprocess.run([
            "hugo", "-t", "smitop", "--enableGitInfo=false",
            "--config", f"{ROOT / 'config.toml'},{config}",
            "--contentDir", str(self.root / "content"),
            "--destination", str(self.root / "public"),
            "--cacheDir", str(self.root / "cache"),
        ], cwd=ROOT, capture_output=True, text=True, timeout=30)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        public = self.root / "public"
        thirteen = (public / "update/13/index.html").read_text()
        self.assertIn("iter.ca update #13</h1>", thirteen)
        self.assertIn('<p>Welcome to update <em>thirteen</em> &amp; its photos.</p>'
                      '<a href="https://iter.ca/post/x/" class="embedded-link">', thirteen)
        two = (public / "update/2/index.html").read_text()
        self.assertIn("<li>I did <strong>a thing</strong></li>", two)
        # each is shown with iter.ca's copies of its Buttondown images (which subrepos.sh makes)
        self.assertIn('<img src="/ext/buttondown/a-1.jpg">', thirteen)
        self.assertNotIn("assets.buttondown.email", thirteen)
        # a link to an issue shows its description, or else the start of its text, and its preview image, or else its
        # first image; it's in the newsletter's section, and the sitemap
        for page, text, image in [(thirteen, "Welcome to update thirteen &amp; its photos. X", "a-1.jpg"),
                                  (two, "Update two.", "two.png")]:
            self.assertIn(f'<meta property="og:description" content="{text}">', page)
            self.assertIn(f'<meta property="og:image" content="https://iter.ca/ext/buttondown/{image}">', page)
            breadcrumbs = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', page, re.S)[1])
            self.assertEqual(breadcrumbs["itemListElement"][0]["item"], "https://iter.ca/update/")
        sitemap = (public / "sitemap.xml").read_text()
        self.assertIn("<loc>https://iter.ca/update/13/</loc>", sitemap)
        self.assertIn("<loc>https://iter.ca/update/2/</loc>", sitemap)
        # each issue links to the ones before and after it, of those copied, above its footnotes, and to the list of
        # them at its top
        self.assertIn('<a href="/update/2/" rel="prev">← iter.ca update #2</a>', thirteen)
        self.assertLess(thirteen.index('class="update-nav"'), thirteen.index('<div class="footnote">'))
        self.assertLess(thirteen.index('<a href="/update/">All&nbsp;updates</a>'), thirteen.index('id="content"'))
        self.assertNotIn('rel="next"', thirteen)
        self.assertIn('<a href="/update/13/" rel="next">iter.ca update #13 →</a>', two)
        self.assertNotIn('rel="prev"', two)
        # /update/ lists the copies, the homepage's newsletter shelf links to them, and search finds each update once,
        # by its item
        self.assertEqual(re.findall(r'href="https://iter.ca(/update/\d+/)"', (public / "update/index.html").read_text()),
                         ["/update/13/", "/update/2/"])
        home = (public / "index.html").read_text()
        self.assertIn('href="/update/13/"', home)
        self.assertIn('<a href="/update/" class="home-newsletter-all">', home)
        search = json.loads((public / "search.json").read_text())
        self.assertEqual([entry.get("type") for entry in search if entry["url"] == "/update/13/"], ["Newsletter"])

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

    def test_se_posts_are_newest_first_and_survive_api_errors(self):
        previous = [{"Type": "SePost", "Id": "se-stackoverflow-0", "Verbose": 1},
                    {"Type": "itch", "Id": "itch-1"}]
        self.data.write_text(json.dumps(previous))
        for failures, ids in [
            (1, ["se-stackoverflow-2", "se-meta.stackoverflow-2",
                 "se-stackoverflow-1", "se-meta.stackoverflow-1"]),
            (2, ["se-stackoverflow-0"]),
        ]:
            with self.subTest(failures=failures):
                # every account has two pages, each with a post created at its page number,
                # and the second page fails this many times
                rows = self.importer("se", f"""
let failures = {failures};
globalThis.setTimeout = resolve => resolve();
globalThis.fetch = async url => {{
    const {{pathname, searchParams}} = new URL(url);
    const page = searchParams.get("page");
    const reply = pathname.endsWith("/associated")
        ? {{items: [{{site_url: "https://stackoverflow.com", user_id: 7, answer_count: 1}}]}}
        : pathname.endsWith("/sites")
        ? {{items: ["stackoverflow", "meta.stackoverflow"].map(site =>
            ({{site_url: `https://${{site}}.com`, api_site_parameter: site}}))}}
        : page === "2" && failures-- > 0
        ? {{error_id: 502, error_name: "throttle_violation", error_message: "too many requests"}}
        : {{items: [{{post_id: Number(page), creation_date: Number(page)}}], has_more: page === "1"}};
    return {{ok: !reply.error_id, status: reply.error_id ? 400 : 200, json: async () => reply}};
}};
""")
                self.assertEqual([row["Id"] for row in rows], ids)

    def test_scratch_retries_once_then_keeps_previous_projects(self):
        previous = [{"Type": "scrproj", "Id": "scr0", "Verbose": 1},
                    {"Type": "itch", "Id": "itch-1"}]
        self.data.write_text(json.dumps(previous))
        for failures, ids in [(1, ["scr1", "scr41"]), (2, ["scr0"])]:
            with self.subTest(failures=failures):
                # each page has one project, and the second page fails this many times
                rows = self.importer("scrprojs", f"""
let failures = {failures};
globalThis.setTimeout = resolve => resolve();
globalThis.fetch = async url => {{
    const offset = Number(new URL(url).searchParams.get("offset"));
    const reply = offset === 40 && failures-- > 0
        ? {{code: "TooManyRequests", message: ""}}
        : [{{id: offset + 1, title: "Project", description: "", history: {{shared: "2020-01-01T00:00:00.000Z"}}}}];
    return {{ok: Array.isArray(reply), status: Array.isArray(reply) ? 200 : 429, json: async () => reply}};
}};
""")
                self.assertEqual([row["Id"] for row in rows], ids)

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
