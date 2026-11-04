"""Exercise stream importers and regeneration without network or real data writes."""

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]


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
        self.generators = ["notes", "gh", "yt", "hn", "itch", "scrprojs",
                           "se", "observable", "buttondown"]
        for name in self.generators:
            (self.get / f"{name}.js").write_text(
                f'console.log(JSON.stringify({{Id: "{name}"}}));\n')
        self.env = dict(os.environ, NODE_OPTIONS="")

    def importer(self, name, fetch):
        shutil.copy2(ROOT / f"build-data/get/{name}.js", self.get)
        module = self.get / "node_modules/node-fetch"
        module.mkdir(parents=True)
        (module / "index.js").write_text(fetch)
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
module.exports = async url => ({json: async () => url.includes("/user/")
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
module.exports = async url => {
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
