"""Exercise the workflow's real sync against disposable Git repositories."""

import os
from pathlib import Path
import subprocess
import tempfile
import textwrap
import unittest


WORKFLOW = Path(__file__).resolve().parents[1] / "workflows/sync-with-public.yml"


class PublicSyncTest(unittest.TestCase):
    def test_commit_metadata_and_repeat_sync(self):
        cases = [
            ("Amp <amp@ampcode.com>", "Publish feature", [
                "Private implementation details.",
                "Amp-Thread-ID: https://example.invalid/private-thread",
                "Co-authored-by: syvb <me@iter.ca>",
            ], ["Co-authored-by: syvb <me@iter.ca>"]),
            ("Claude <noreply@anthropic.com>", "Implement feature", [
                "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
                "Claude-Session: https://example.invalid/private-session",
            ], ["Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"]),
            ("Smitty <me@iter.ca>", "Merge feature (#269)", [
                "* First change",
                "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
                "* Second change",
                "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
                "Co-authored-by: Claude <noreply@anthropic.com>",
            ], [
                "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
                "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
                "Co-authored-by: Claude <noreply@anthropic.com>",
            ]),
            ("Regen script <actions@github.com>", "Automatic regen", [], []),
        ]
        workflow = WORKFLOW.read_text()
        script = textwrap.dedent(workflow.split("    - name: Do sync\n      run: |\n", 1)[1])
        for author, subject, body, credits in cases:
            with self.subTest(author=author), tempfile.TemporaryDirectory() as temp:
                root = Path(temp)
                env = {k: v for k, v in os.environ.items() if not k.startswith("GIT_")}
                env.update(GIT_CONFIG_GLOBAL=str(root / "gitconfig"), GIT_CONFIG_NOSYSTEM="1",
                           GITHUB_WORKSPACE=temp)

                def run(*args, cwd=root, input=None):
                    return subprocess.run(args, cwd=cwd, env=env, input=input,
                                          text=True, capture_output=True, check=True).stdout.strip()

                def init(path):
                    run("git", "init", "-b", "master", str(path))
                    run("git", "config", "user.name", "Fixture committer", cwd=path)
                    run("git", "config", "user.email", "fixture@example.invalid", cwd=path)

                source, public, remote = (root / name for name in
                                          ("smitop-blog", "smitop.com", "public.git"))
                init(source)
                (source / ".github").mkdir()
                (source / ".github/sync.yml").write_text(workflow)
                (source / "README.md").write_text("Private readme\n")
                (source / "README.public.md").write_text("Public readme\n")
                run("git", "add", ".", cwd=source)
                message = subject + ("\n\n" + "\n\n".join(body) if body else "")
                run("git", "commit", "--author=" + author, "--date=2026-10-07T23:45:12-04:00",
                    "-F", "-", cwd=source, input=message)
                source_hash = run("git", "rev-parse", "HEAD", cwd=source)
                init(public)
                (public / ".github-internal/.github").mkdir(parents=True)
                (public / ".github-internal/.github/stale.yml").write_text("Old nested workflow\n")
                (public / ".github-internal/stale.yml").write_text("Deleted source workflow\n")
                (public / ".github-internal/sync.yml").write_text("Outdated workflow\n")
                run("git", "add", ".", cwd=public)
                run("git", "commit", "-m", "Initial public commit", cwd=public)
                run("git", "init", "--bare", str(remote))
                run("git", "remote", "add", "origin", str(remote), cwd=public)
                run("git", "push", "-u", "origin", "master", cwd=public)

                run("bash", "-eo", "pipefail", "-c", script)
                self.assertEqual(run("git", "log", "-1", "--format=%an <%ae>", cwd=remote), author)
                self.assertEqual(run("git", "log", "-1", "--format=%aI", cwd=remote),
                                 "2026-10-07T23:45:12-04:00")
                self.assertEqual(run("git", "log", "-1", "--format=%cn <%ce>", cwd=remote),
                                 "syvb <me@iter.ca>")
                expected = f"{subject}\n\nThis commit was automatically generated from {source_hash}"
                if credits:
                    expected += "\n\n" + "\n".join(credits)
                self.assertEqual(run("git", "log", "-1", "--format=%B", cwd=remote), expected)
                self.assertEqual(run("git", "ls-tree", "-r", "--name-only", "master",
                                     "--", ".github-internal", cwd=remote), ".github-internal/sync.yml")
                self.assertEqual(run("git", "show", "master:.github-internal/sync.yml", cwd=remote),
                                 workflow.strip())
                public_hash = run("git", "rev-parse", "master", cwd=remote)
                run("bash", "-eo", "pipefail", "-c", script)
                self.assertEqual(run("git", "rev-parse", "master", cwd=remote), public_hash)


if __name__ == "__main__":
    unittest.main()
