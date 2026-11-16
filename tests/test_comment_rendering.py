"""Exercise baked comments in a real browser. Like og/gen.js, requires Chrome or CHROME."""

from html import unescape
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]


class CommentRenderingTest(unittest.TestCase):
    def test_untrusted_comments_are_safe_without_losing_supported_content(self):
        chrome = os.environ.get("CHROME") or next((shutil.which(name) for name in
            ("google-chrome", "chromium", "chromium-browser") if shutil.which(name)), None)
        self.assertIsNotNone(chrome, "Install Chrome or set CHROME, as for og/gen.js")
        attack = "document.documentElement.dataset.commentXss = 'executed'; void 0"
        html = f"""
</script><script>{attack}</script>
<p style="position:fixed" onclick="{attack}">Safe <strong>bold &amp; &lt;literal&gt;</strong>
<em>emphasis</em> <code>x &lt; y</code></p>
<a href="JaVaScRiPt:{attack}">unsafe javascript</a>
<a href="java&#x09;script:{attack}">unsafe encoded</a>
<a href="data:text/html,ignored">unsafe data</a>
<a href="https://safe.example/path?a=1&amp;b=2" onclick="{attack}">https</a>
<a href="/relative#section">relative</a>
<a href="mailto:reader@example.invalid">mail</a>
<a href="#note">footnote</a><p id="note">Note body</p>
<img src="/safe.png" alt="A &amp; B" onerror="{attack}">
<img src="http://unsafe.example/image.png"><img src="data:image/png;base64,AAAA">
<iframe srcdoc="&lt;script&gt;parent.{attack}&lt;/script&gt;"></iframe>
<svg onload="{attack}"><text>untrusted SVG</text></svg>
<style>body {{ display: none }}</style><form><input name="untrusted"></form>
<mjx-container aria-label="x &lt; y"><span>rendered math</span></mjx-container>
<unknown-tag><b>unwrapped</b></unknown-tag>
"""
        plain = f'<img src=x onerror="{attack}"><script>{attack}</script>'
        # Observe the rendered page, not a copied/extracted implementation of the sanitizer.
        probe = """
<p id="note">Post anchor</p>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const comments = document.querySelectorAll("#comments-body .comment");
    const html = comments[0].querySelector(".comment-html");
    const plain = comments[1].querySelector(".comment-text");
    html.querySelector("p").click();
    html.querySelectorAll("img").forEach(el => el.dispatchEvent(new Event("error")));
    html.querySelectorAll("a").forEach(a => {
        if (a.textContent.startsWith("unsafe")) a.click();
    });
    setTimeout(function () {
        const anchors = Array.from(html.querySelectorAll("a"));
        const footnote = anchors.find(a => a.textContent === "footnote");
        const target = document.getElementById(new URL(footnote.href).hash.slice(1));
        const result = {
            count: comments.length,
            executed: document.documentElement.hasAttribute("data-comment-xss"),
            forbiddenTags: Array.from(html.querySelectorAll("script, style, iframe, svg, form, input"),
                                      el => el.localName),
            forbiddenAttrs: Array.from(html.querySelectorAll("*")).flatMap(el =>
                Array.from(el.attributes, attr => attr.name).filter(name =>
                    /^on/i.test(name) || ["style", "srcdoc"].includes(name))),
            bold: html.querySelector("strong").textContent,
            emphasis: html.querySelector("em").textContent,
            code: html.querySelector("code").textContent,
            unwrapped: html.querySelector("b").textContent,
            text: html.textContent,
            links: anchors.filter(a => a !== footnote).map(a =>
                [a.textContent, a.getAttribute("href")]),
            footnoteWorks: html.contains(target) && target.textContent === "Note body",
            postAnchorPreserved: document.querySelectorAll("#note").length === 1 &&
                document.getElementById("note").textContent === "Post anchor",
            images: Array.from(html.querySelectorAll("img"), el => [el.src, el.alt]),
            plainText: plain.textContent,
            plainElements: plain.childElementCount,
        };
        const output = document.createElement("pre");
        output.id = "test-result";
        output.textContent = JSON.stringify(result);
        document.body.appendChild(output);
    }, 50);
});
</script>
"""
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "content/post").mkdir(parents=True)
            (root / "content/post/comments.md").write_text(
                '+++\ntitle = "Comments fixture"\ndate = "2021-01-02"\n'
                'lw = "https://www.lesswrong.com/posts/Post1/slug"\n+++\n' + probe)
            data = root / "data"
            data.mkdir()
            (data / "data.json").write_text("[]")
            (data / "voverrides.json").write_text("{}")
            (data / "comments.json").write_text(json.dumps({"post/comments.md": {
                "sources": [{"type": "lw", "replyUrl": "https://www.lesswrong.com/posts/Post1/slug"},
                            {"type": "bsky", "replyUrl": "https://bsky.app/profile/iter.ca/post/abc"}],
                "comments": [
                    {"source": "lw", "url": "https://www.lesswrong.com/posts/Post1/slug", "html": html,
                     "depth": 0, "author": {"name": "Reader"}, "createdAt": "2026-01-01T00:00:00Z"},
                    {"source": "bsky", "url": "https://bsky.app/profile/reader.test/post/abc", "text": plain,
                     "depth": 0, "author": {"name": "Another reader"}, "createdAt": "2026-01-02T00:00:00Z"},
                ],
            }}))
            config = root / "config.json"
            config.write_text(json.dumps({"dataDir": str(data), "staticDir": []}))
            build = subprocess.run([
                "hugo", "-t", "smitop", "--enableGitInfo=false",
                "--config", f"{ROOT / 'config.toml'},{config}",
                "--contentDir", str(root / "content"),
                "--destination", str(root / "public"),
                "--cacheDir", str(root / "cache"),
            ], cwd=ROOT, capture_output=True, text=True, timeout=30)
            self.assertEqual(build.returncode, 0, build.stdout + build.stderr)
            # The page and all test data are local; fail DNS rather than contacting any external service.
            browser = subprocess.run([
                chrome, "--headless=new", "--no-sandbox", "--disable-background-networking",
                "--no-proxy-server", "--host-resolver-rules=MAP * ~NOTFOUND",
                f"--user-data-dir={root / 'chrome'}", "--virtual-time-budget=1000", "--dump-dom",
                (root / "public/post/comments/index.html").as_uri(),
            ], capture_output=True, text=True, timeout=30)
            self.assertEqual(browser.returncode, 0, browser.stderr)
            match = re.search(r'<pre id="test-result">([^<]+)</pre>', browser.stdout)
            self.assertIsNotNone(match, browser.stdout + browser.stderr)
            rendered = json.loads(unescape(match[1]))

        self.assertEqual(rendered["count"], 2)
        self.assertFalse(rendered["executed"])
        self.assertEqual(rendered["forbiddenTags"], [])
        self.assertEqual(rendered["forbiddenAttrs"], [])
        self.assertEqual(rendered["bold"], "bold & <literal>")
        self.assertEqual(rendered["emphasis"], "emphasis")
        self.assertEqual(rendered["code"], "x < y")
        self.assertEqual(rendered["unwrapped"], "unwrapped")
        self.assertIn("$x < y$", rendered["text"])
        self.assertNotIn("rendered math", rendered["text"])
        self.assertEqual(rendered["links"], [
            ["unsafe javascript", None], ["unsafe encoded", None], ["unsafe data", None],
            ["https", "https://safe.example/path?a=1&b=2"],
            ["relative", "https://www.lesswrong.com/relative#section"],
            ["mail", "mailto:reader@example.invalid"],
        ])
        self.assertTrue(rendered["footnoteWorks"])
        self.assertTrue(rendered["postAnchorPreserved"])
        self.assertEqual(rendered["images"], [["https://www.lesswrong.com/safe.png", "A & B"]])
        self.assertEqual(rendered["plainText"], plain)
        self.assertEqual(rendered["plainElements"], 0)


if __name__ == "__main__":
    unittest.main()
