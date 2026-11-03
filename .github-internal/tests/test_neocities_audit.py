"""Exercise the audit entry point without credentials or writes to Neocities."""

from contextlib import redirect_stdout
import io
import json
import os
from pathlib import Path
import runpy
import tempfile
import unittest
from unittest.mock import patch
from zipfile import ZipFile


SCRIPT = Path(__file__).resolve().parents[1] / "neocities-audit.py"
ABC_SHA1 = "a9993e364706816aba3e25717850c26c9cd0d89d"


class NeocitiesAuditTest(unittest.TestCase):
    def test_inventory_content_diff_and_read_only_request(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            build, output, summary = root / "public", root / "audit", root / "summary.md"
            (build / "nested").mkdir(parents=True)
            for name in ["nested/same.txt", "changed.txt", ".hidden", "new.txt"]:
                (build / name).write_bytes(b"abc")
            remote = [
                {"path": name, "is_directory": False, "size": 3, "sha1_hash": sha}
                for name, sha in [("nested/same.txt", ABC_SHA1), (".hidden", ABC_SHA1),
                                  ("changed.txt", "66b27417d37e024c46526c2f6d358a754fc552f3"),
                                  ("old.txt", ABC_SHA1)]
            ]
            remote.append({"path": "nested", "is_directory": True})

            def listing(request, timeout):
                self.assertEqual(request.get_method(), "GET")
                self.assertEqual(request.full_url, "https://neocities.org/api/list")
                self.assertIsNone(request.data)
                return io.BytesIO(json.dumps({"result": "success", "files": remote}).encode())

            stdout = io.StringIO()
            with patch.dict(os.environ, NEOCITIES_API_TOKEN="test-secret",
                            GITHUB_STEP_SUMMARY=str(summary), GITHUB_SHA="fixture"), \
                    patch("sys.argv", [str(SCRIPT), str(build), str(output)]), \
                    patch("urllib.request.urlopen", side_effect=listing), redirect_stdout(stdout):
                runpy.run_path(str(SCRIPT), run_name="__main__")
            report = json.loads((output / "diff.json").read_text())
            self.assertEqual(report["deployed_only"], ["old.txt"])
            self.assertEqual(report["build_only"], ["new.txt"])
            self.assertEqual(report["changed"], ["changed.txt"])
            self.assertEqual(report["identical"], [".hidden", "nested/same.txt"])
            self.assertEqual(report["built"][".hidden"], {"size": 3, "sha1_hash": ABC_SHA1})
            self.assertEqual(len(report["deployed"]), 4)
            self.assertEqual(report["commit"], "fixture")
            markdown = (output / "diff.md").read_text()
            self.assertEqual(summary.read_text(), markdown)
            self.assertIn("old.txt", stdout.getvalue())
            self.assertNotIn("test-secret", "".join(p.read_text() for p in output.iterdir()))

    def test_api_error_does_not_publish_a_false_inventory(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            build, output = root / "public", root / "audit"
            build.mkdir()
            (build / "index.html").write_text("Hello")
            with patch.dict(os.environ, NEOCITIES_API_TOKEN="test-secret"), \
                    patch("sys.argv", [str(SCRIPT), str(build), str(output)]), \
                    patch("urllib.request.urlopen", return_value=io.BytesIO(
                        b'{"result":"error","message":"invalid credentials"}')):
                with self.assertRaisesRegex(ValueError, "listing failed"):
                    runpy.run_path(str(SCRIPT), run_name="__main__")
            self.assertFalse(output.exists())

    def test_verification_cleanup_guard_and_backups(self):
        cases = [
            ("exact", [], False, False, None, False),
            ("changed", [], False, False, "do not match", False),
            ("missing", [], False, False, "do not match", False),
            ("changed", ["--allow-extra"], False, False, "do not match", False),
            ("missing", ["--allow-extra"], False, False, "do not match", False),
            ("extra", [], False, False, "do not match", False),
            ("extra", ["--allow-extra"], False, False, None, False),
            ("extra", ["--allow-extra"], True, False, "reviewed deletion list", False),
            ("extra", ["--allow-extra"], True, True, None, False),
            ("extra", ["--allow-extra"], True, True, "Backup hash mismatch", True),
        ]
        for kind, flags, guarded, backup, error, corrupt in cases:
            with self.subTest(kind=kind, flags=flags, guarded=guarded, backup=backup,
                              corrupt=corrupt), tempfile.TemporaryDirectory() as temp:
                root = Path(temp)
                build, output = root / "public", root / "audit"
                build.mkdir()
                (build / "index.html").write_bytes(b"abc")
                remote = [{"path": "index.html", "is_directory": False, "size": 3,
                           "sha1_hash": ABC_SHA1}]
                if kind == "changed":
                    remote[0]["sha1_hash"] = "66b27417d37e024c46526c2f6d358a754fc552f3"
                elif kind == "missing":
                    remote = []
                elif kind == "extra":
                    remote.append({"path": "old.txt", "is_directory": False,
                                   "size": 3, "sha1_hash": ABC_SHA1})

                def response(request, timeout):
                    if isinstance(request, str):
                        self.assertEqual(request, "https://iter.ca/old.txt")
                        return io.BytesIO(b"xyz" if corrupt else b"abc")
                    return io.BytesIO(json.dumps({"result": "success", "files": remote}).encode())

                env = dict(NEOCITIES_API_TOKEN="test", GITHUB_STEP_SUMMARY="",
                           BACKUP_ORPHANS="true" if backup else "false",
                           EXPECTED_DELETIONS=json.dumps(["old.txt"] if backup else []) if guarded else "")
                with patch.dict(os.environ, env), \
                        patch("sys.argv", [str(SCRIPT), str(build), str(output), "--check", *flags]), \
                        patch("urllib.request.urlopen", side_effect=response), redirect_stdout(io.StringIO()):
                    if error:
                        with self.assertRaisesRegex(ValueError, error):
                            runpy.run_path(str(SCRIPT), run_name="__main__")
                    else:
                        runpy.run_path(str(SCRIPT), run_name="__main__")
                if backup and not error:
                    with ZipFile(output / "deployed-only.zip") as archive:
                        self.assertEqual(archive.namelist(), ["old.txt"])
                        self.assertEqual(archive.read("old.txt"), b"abc")


if __name__ == "__main__":
    unittest.main()
