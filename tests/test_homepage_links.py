"""Homepage links stay on the preview origin without changing external links."""

from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]


class Links(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.hrefs = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.hrefs.append(dict(attrs).get("href"))


class HomepageLinksTest(unittest.TestCase):
    def test_local_links_are_relative_and_external_links_are_unchanged(self):
        local = "/post/local/?a=1&b=2#section"
        external = "https://iter.ca.example.net/post/local/?a=1&b=2#section"
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "content/post").mkdir(parents=True)
            (root / "content/post/local.md").write_text(
                '+++\ntitle = "Local post"\ndate = "2021-01-02"\n+++\nBody.\n')
            (root / "data").mkdir()
            (root / "data/voverrides.json").write_text("{}")
            (root / "data/data.json").write_text(json.dumps([
                {"Type": "note", "Id": f"note-{i}", "Date": {"Unix": 1609459200},
                 "Verbose": 0, "Uri": uri, **title}
                for i, (uri, title) in enumerate([
                    ("https://iter.ca" + local, {"Title": "Local note"}),
                    ("https://iter.ca/post/local/#untitled", {}),
                    (external, {"Title": "External note"}),
                ])
            ]))
            config = root / "config.json"
            config.write_text(json.dumps({"dataDir": str(root / "data")}))
            result = subprocess.run([
                "hugo", "-t", "smitop", "--enableGitInfo=false",
                "--config", f"{ROOT / 'config.toml'},{config}",
                "--contentDir", str(root / "content"),
                "--destination", str(root / "public"),
                "--cacheDir", str(root / "cache"),
            ], cwd=ROOT, capture_output=True, text=True, timeout=30)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            hrefs = Links((root / "public/index.html").read_text()).hrefs

        self.assertIn("/post/local/", hrefs)
        self.assertIn(local, hrefs)
        self.assertIn("/post/local/#untitled", hrefs)
        self.assertIn(external, hrefs)
        self.assertFalse(any(href.startswith("https://iter.ca/") for href in hrefs))


if __name__ == "__main__":
    unittest.main()
