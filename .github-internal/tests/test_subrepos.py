"""Run all asset generation in disposable checkouts, without network or builds."""

import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]
PNG_NAMES = ["idat-raw", "idat", "defiltered", "inter-idat"] + [
    f"inter-{i}" for i in range(1, 8)
]
STUB = r'''#!/usr/bin/env python3
import hashlib
import os
from pathlib import Path
import sys


def write_output(path, data):
    if path != os.environ.get("OMIT_OUTPUT"):
        Path(path).write_text("" if path == os.environ.get("EMPTY_OUTPUT") else data)


command = Path(sys.argv[0]).name
args = sys.argv[1:]
match = os.environ.get("FAIL_MATCH", "")
fail = command == os.environ.get("FAIL_COMMAND") and match in " ".join(args)
if command == "wget":
    output = Path(args[args.index("-O") + 1])
    output.write_bytes(b"partial download")
    url = args[-1]
    state = Path(os.environ["STUB_STATE"]) / hashlib.sha1(url.encode()).hexdigest()
    attempts = int(state.read_text()) if state.exists() else 0
    state.write_text(str(attempts + 1))
    if fail or attempts < int(os.environ.get("TRANSIENT_FAILURES", "0")):
        sys.exit(1)
    empty_match = os.environ.get("EMPTY_DOWNLOAD_MATCH", "")
    empty = (empty_match and empty_match in url) or attempts < int(
        os.environ.get("EMPTY_ATTEMPTS", "0"))
    output.write_bytes(b"" if empty else b"downloaded fixture")
elif fail:
    sys.exit(1)
elif command == "git":
    target = args[2] if len(args) > 2 else args[1].rsplit("/", 1)[-1].removesuffix(".git")
    Path(target, ".git").mkdir(parents=True)
    if target == "segmerepo":
        Path(target, "public").mkdir()
        write_output(target + "/public/index.html", "segme fixture")
    else:
        write_output(target + "/index.html", "project fixture")
elif command == "wasm-pack":
    Path("pkg").mkdir()
    write_output("pkg/segme.js", "wasm loader fixture")
    write_output("pkg/segme_bg.wasm", "wasm fixture")
elif command == "cargo":
    Path("public/png").mkdir(parents=True)
    Path("public/png/index.html").write_text("unused index")
    for name in ["idat-raw", "idat", "defiltered", "inter-idat"] + [
            "inter-" + str(i) for i in range(1, 8)]:
        write_output("public/png/" + name + ".png", "binformats fixture")
        Path("public/png/" + name + ".ppm").write_text("intermediate fixture")
elif command == "convert":
    Path(args[-1].removeprefix("jpg:")).write_text("converted fixture")
elif command != "sleep":
    raise RuntimeError(command)
'''


class SubreposTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "static/pngcomp").mkdir(parents=True)
        (self.root / "binformats/public").mkdir(parents=True)
        (self.root / "binformats/public/.gitkeep").touch()
        shutil.copy2(ROOT / "subrepos.sh", self.root)
        shutil.copy2(ROOT / "static/pngcomp/gen.sh", self.root / "static/pngcomp")
        tools = self.root / "tools"
        tools.mkdir()
        for command in ["wget", "git", "wasm-pack", "cargo", "convert", "sleep"]:
            stub = tools / command
            stub.write_text(STUB)
            stub.chmod(0o755)
        state = self.root / "state"
        state.mkdir()
        self.env = dict(os.environ, PATH=f"{tools}:{os.environ['PATH']}",
                        STUB_STATE=str(state), FAIL_COMMAND="", FAIL_MATCH="",
                        TRANSIENT_FAILURES="0", OMIT_OUTPUT="", EMPTY_OUTPUT="",
                        EMPTY_DOWNLOAD_MATCH="", EMPTY_ATTEMPTS="0")

    def generate(self, **env):
        return subprocess.run(["bash", "subrepos.sh"], cwd=self.root,
                              env=dict(self.env, **env), capture_output=True,
                              text=True, timeout=30)

    def test_clean_checkout_and_transient_download_failures(self):
        result = self.generate(TRANSIENT_FAILURES="1", EMPTY_ATTEMPTS="2")
        self.assertEqual(result.returncode, 0, result.stderr)
        static = self.root / "static"
        for name in ["music/unsudden-movements.flac", "music/unsuddentmovements.flac",
                     "pngcomp/index.html", "ext/Circuit-playground-sideview.jpg",
                     "ext/Adam7-mul.svg", "ext/rust-format.pdf"]:
            self.assertEqual((static / name).read_bytes(), b"downloaded fixture", name)
        for name in ["ext/611px-Circuit-playground-sideview.jpg", "ext/inds-main.jpg",
                     "ext/lighthaven-night.jpg"]:
            self.assertEqual((static / name).read_text(), "converted fixture", name)
        self.assertTrue((static / "segme/pkg/segme.js").is_file())
        for name in PNG_NAMES:
            self.assertEqual((static / f"fmat/png/{name}.png").read_text(),
                             "binformats fixture")
        self.assertFalse((static / "fmat/png/index.html").exists())
        self.assertEqual(list((static / "fmat").rglob("*.ppm")), [])
        self.assertTrue((self.root / "binformats/public/.gitkeep").is_file())
        self.assertEqual(list(static.rglob("*.tmp.*")), [])

    def test_successful_cargo_cannot_hide_missing_or_empty_pngs(self):
        for name in PNG_NAMES:
            for mode in ["OMIT_OUTPUT", "EMPTY_OUTPUT"]:
                with self.subTest(name=name, mode=mode):
                    # A prior complete build must not satisfy the current run.
                    png = self.root / f"binformats/public/png/{name}.png"
                    png.parent.mkdir(parents=True, exist_ok=True)
                    png.write_text("stale complete image")
                    result = self.generate(**{mode: f"public/png/{name}.png"})
                    self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
                    self.assertIn(f"public/png/{name}.png", result.stderr)
                    self.assertTrue((self.root / "binformats/public/.gitkeep").is_file())

    def test_missing_or_empty_project_entrypoints_fail_generation(self):
        for path in ["transform-playground/index.html", "bn/index.html",
                     "segmerepo/public/index.html", "pkg/segme.js", "pkg/segme_bg.wasm"]:
            for mode in ["OMIT_OUTPUT", "EMPTY_OUTPUT"]:
                with self.subTest(path=path, mode=mode):
                    result = self.generate(**{mode: path})
                    self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
                    self.assertIn("Missing or empty generated file:", result.stderr)

    def test_exit_zero_empty_downloads_fail_without_replacing_existing_files(self):
        for match, path in [("unsudden-movements.flac", "music/unsudden-movements.flac"),
                            ("comp.html", "pngcomp/index.html")]:
            with self.subTest(path=path):
                output = self.root / "static" / path
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_bytes(b"previous complete download")
                result = self.generate(EMPTY_DOWNLOAD_MATCH=match)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual(output.read_bytes(), b"previous complete download")
                self.assertEqual(list((self.root / "static").rglob("*.tmp.*")), [])

    def test_any_failed_generation_makes_the_whole_run_fail(self):
        cases = [
            ("wget", "unsudden-movements.flac"),
            ("git", "transform-playground.git"),
            ("git", "bayesian-network.git"),
            ("git", "segme.git"),
            ("wasm-pack", ""),
            ("wget", "Circuit-playground-sideview.jpg"),
            ("convert", "-resize"),
            ("wget", "4d86b7a6-4776-4813-9f42-835a830a72fc"),
            ("convert", "jpeg:extent"),
            ("cargo", ""),
            ("wget", "comp.html"),
        ]
        for command, match in cases:
            with self.subTest(command=command, match=match):
                result = self.generate(FAIL_COMMAND=command, FAIL_MATCH=match)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual(list((self.root / "static").rglob("*.tmp.*")), [])

    def test_failed_music_download_preserves_existing_file(self):
        music = self.root / "static/music/unsudden-movements.flac"
        music.parent.mkdir()
        music.write_bytes(b"previous complete music")
        result = self.generate(FAIL_COMMAND="wget", FAIL_MATCH="unsudden-movements.flac")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(music.read_bytes(), b"previous complete music")

    def test_failed_pngcomp_download_preserves_existing_file(self):
        index = self.root / "static/pngcomp/index.html"
        index.write_text("previous complete page")
        result = self.generate(FAIL_COMMAND="wget", FAIL_MATCH="comp.html")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(index.read_text(), "previous complete page")
        self.assertEqual(list(index.parent.glob("*.tmp.*")), [])


if __name__ == "__main__":
    unittest.main()
