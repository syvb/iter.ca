"""Exercise the workflow's real fast/full selection against push histories."""

import os
from pathlib import Path
import subprocess
import tempfile
import textwrap
import unittest


WORKFLOW = Path(__file__).resolve().parents[1] / "workflows/neocities.yml"


class GenerationModeTest(unittest.TestCase):
    def test_fast_posts_and_complete_regenerations(self):
        workflow = WORKFLOW.read_text()
        step = workflow.split("      - name: Choose full or fast generation\n", 1)[1]
        script = textwrap.dedent(step.split("        run: |\n", 1)[1].split("      - name:", 1)[0])
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)

            def git(*args):
                return subprocess.check_output(["git", *args], cwd=root, text=True).strip()

            git("init", "-q")
            git("config", "user.name", "Fixture")
            git("config", "user.email", "fixture@example.invalid")
            (root / "post.md").write_text("First post")
            git("add", ".")
            git("commit", "-qm", "Baseline")
            baseline = git("rev-parse", "HEAD")
            (root / "post.md").write_text("Another post")
            git("commit", "-qam", "Publish post")
            post = git("rev-parse", "HEAD")
            (root / "subrepos.sh").write_text("Generation changed")
            git("add", ".")
            git("commit", "-qm", "Update generation")
            (root / "post.md").write_text("Latest post")
            git("commit", "-qam", "Another post")
            multi_commit_push = git("rev-parse", "HEAD")
            for event, before, head, full in [
                ("push", baseline, post, "false"),
                ("push", post, multi_commit_push, "true"),
                ("push", "0" * 40, post, "true"),
                ("workflow_run", "", multi_commit_push, "false"),
                ("schedule", "", post, "true"),
                ("workflow_dispatch", "", post, "true"),
            ]:
                with self.subTest(event=event, before=before):
                    output = root / "output"
                    output.write_text("")
                    result = subprocess.run(["bash", "-euo", "pipefail", "-c", script], cwd=root,
                                            env=dict(os.environ, EVENT_NAME=event, BEFORE=before,
                                                     GITHUB_SHA=head, GITHUB_OUTPUT=str(output)),
                                            capture_output=True, text=True)
                    self.assertEqual(result.returncode, 0, result.stderr)
                    self.assertEqual(output.read_text(), f"full={full}\n")


if __name__ == "__main__":
    unittest.main()
