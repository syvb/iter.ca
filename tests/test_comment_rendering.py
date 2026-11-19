"""Exercise baked comments in a real browser. Like og/gen.js, requires Chrome or CHROME."""

import contextlib
import fcntl
import itertools
import json
import os
from pathlib import Path
import select
import shutil
import signal
import subprocess
import tempfile
import time
import unittest


ROOT = Path(__file__).resolve().parents[1]


def read_test_result(chrome, url, profile, timeout=30):
    """Open url in headless Chrome and return the text the page puts in #test-result.

    Chrome's --dump-dom has no timeout: it waits for the page's load event, then for a virtual-time budget
    that stops while any fetch is pending, and Chrome can hang on exit after printing. On CI one of these
    sometimes never finished. This drives Chrome over its DevTools pipe instead, waits in real time for
    the result alone, and then kills Chrome.
    """
    deadline = time.monotonic() + timeout
    commands, replies = os.pipe(), os.pipe()
    # Chrome reads commands from fd 3 and writes replies to fd 4. Its ends are first moved above 4, so
    # putting one in place can't close the other.
    theirs = [fcntl.fcntl(fd, fcntl.F_DUPFD_CLOEXEC, 5) for fd in (commands[0], replies[1])]
    ids = itertools.count(1)
    received = b""
    reply = None

    def send(method, session=None, **params):
        nonlocal received
        message = {"id": next(ids), "method": method, "params": params}
        if session:
            message["sessionId"] = session
        os.write(commands[1], json.dumps(message).encode() + b"\0")
        while True:
            while b"\0" not in received:
                wait = deadline - time.monotonic()
                if wait <= 0 or not select.select([replies[0]], [], [], wait)[0]:
                    raise TimeoutError
                chunk = os.read(replies[0], 1 << 16)
                if not chunk:
                    raise TimeoutError
                received += chunk
            line, received = received.split(b"\0", 1)
            answer = json.loads(line)
            if answer.get("id") == message["id"]:
                return answer

    with tempfile.TemporaryFile("w+") as log:
        # The page and all test data are local; fail DNS rather than contacting any external service.
        browser = subprocess.Popen([
            chrome, "--headless=new", "--no-sandbox", "--disable-background-networking",
            "--no-proxy-server", "--host-resolver-rules=MAP * ~NOTFOUND",
            f"--user-data-dir={profile}", "--remote-debugging-pipe", "about:blank",
        ], stdout=log, stderr=log, close_fds=False, start_new_session=True,
           preexec_fn=lambda: (os.dup2(theirs[0], 3), os.dup2(theirs[1], 4)))
        for fd in (commands[0], replies[1], *theirs):
            os.close(fd)
        try:
            target = send("Target.createTarget", url=url)["result"]["targetId"]
            session = send("Target.attachToTarget", targetId=target, flatten=True)["result"]["sessionId"]
            while time.monotonic() < deadline:
                reply = send("Runtime.evaluate", session, returnByValue=True,
                             expression='document.getElementById("test-result")?.textContent')
                text = reply.get("result", {}).get("result", {}).get("value")
                if text is not None:
                    return text
                time.sleep(0.05)
            raise TimeoutError
        except TimeoutError:
            log.seek(0)
            raise AssertionError(f"No #test-result within {timeout}s; last reply {reply}; Chrome's log:\n"
                                 + log.read()) from None
        finally:
            # Kill the renderers and other helpers too, so none still writes to the profile as it's deleted.
            with contextlib.suppress(ProcessLookupError):
                os.killpg(browser.pid, signal.SIGKILL)
            browser.wait()
            os.close(commands[1])
            os.close(replies[0])


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
            # the build fails without the homepage's lists
            (data / "homecols.toml").write_text('limit = 1\n[[columns]]\ntitle = "Everything"\nrest = true\n')
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
            rendered = json.loads(read_test_result(
                chrome, (root / "public/post/comments/index.html").as_uri(), root / "chrome"))

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
