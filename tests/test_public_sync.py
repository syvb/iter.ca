"""Exercise the workflow's real sync against disposable Git repositories."""

import os
from pathlib import Path
import subprocess
import tempfile
import textwrap
import unittest


WORKFLOW = Path(__file__).resolve().parents[1] / ".github/workflows/sync-with-public.yml"


class PublicSyncTest(unittest.TestCase):
    def test_privacy_exclusions_commit_metadata_and_repeat_sync(self):
        private_files = [f"{directory}/private.txt" for directory in (
            "work", "self", "selfdata", "270", "chromelol", "bin", "consulting", ".private",
        )] + [
            "content/post/draft-private.md", "content/post/draft-bundle/index.md",
            "content/post/unprefixed.md", "content/post/unprefixed-bundle/index.md",
            "content/post/unprefixed-bundle/private.svg",
            "static/audit.log", "static/projects.toml",
            "static/private.png", "static/private.js", "static/private.eml", "static/private.html",
        ] + [f"static/{directory}/private.txt" for directory in (
            "scr-thumbs", "yt-thumbs", "uploads", "start", "dct-stimulus-playground", "miniposts",
        )]
        public_files = {path: f"Public fixture: {path}\n" for path in (
            "content/post/published.md", "content/post/bundle/index.md", "content/post/drafting.md",
            "notes/public.txt", "static/public.svg", "static/public.css",
            "static/project/index.html", "static/project/app.js", "static/project/image.png",
            ".agents/setup", "static/ext/README.md",
        )}
        # Ignores a file the private repo force-added, which must still be published.
        public_files[".gitignore"] = "/static/ext\n"
        # Only front matter makes a post without the draft- prefix a draft; after it, draft = true is just text.
        public_files["content/post/drafting.md"] = '+++\ntitle = "Drafting"\ndraft = false\n+++\ndraft = true\n'
        drafts = {"content/post/unprefixed.md": '+++\ntitle = "Unprefixed"\ndraft = true\n+++\nPrivate fixture\n',
                  "content/post/unprefixed-bundle/index.md": "+++\ndraft=true\n+++\n"}
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
                for name, text in {**dict.fromkeys(private_files, "Private fixture\n"), **drafts,
                                   **public_files}.items():
                    path = source / name
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_text(text)
                run("git", "add", "-f", ".", cwd=source)
                message = subject + ("\n\n" + "\n\n".join(body) if body else "")
                run("git", "commit", "--author=" + author, "--date=2026-10-07T23:45:12-04:00",
                    "-F", "-", cwd=source, input=message)
                source_hash = run("git", "rev-parse", "HEAD", cwd=source)
                init(public)
                (public / ".github-internal/.github").mkdir(parents=True)
                (public / ".github-internal/.github/stale.yml").write_text("Old nested workflow\n")
                (public / ".github-internal/stale.yml").write_text("Deleted source workflow\n")
                (public / ".github-internal/sync.yml").write_text("Outdated workflow\n")
                (public / ".agents").mkdir()
                (public / ".agents/stale").write_text("Deleted source setup script\n")
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
                # Inspect the published commit, not just the sync's working directory.
                published = set(run("git", "ls-tree", "-r", "--name-only", "master", cwd=remote).splitlines())
                self.assertEqual(published, set(public_files) | {"README.md", ".github-internal/sync.yml"})
                for name, text in {**public_files, "README.md": "Public readme\n"}.items():
                    self.assertEqual(run("git", "show", f"master:{name}", cwd=remote), text.strip())
                public_hash = run("git", "rev-parse", "master", cwd=remote)
                run("bash", "-eo", "pipefail", "-c", script)
                self.assertEqual(run("git", "rev-parse", "master", cwd=remote), public_hash)


if __name__ == "__main__":
    unittest.main()
