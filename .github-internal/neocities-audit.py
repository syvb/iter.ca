"""Compare a prepared build with Neocities using only its read-only list endpoint."""

import argparse
import hashlib
import json
import os
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import quote
from urllib.request import Request, urlopen
from zipfile import ZipFile, ZIP_DEFLATED


def audit(directory, remote):
    local = {}
    for path in sorted(directory.rglob("*")):
        if path.is_file():
            data = path.read_bytes()
            local[path.relative_to(directory).as_posix()] = {
                "size": len(data), "sha1_hash": hashlib.sha1(data).hexdigest(),
            }
    deployed = {file["path"]: file for file in remote if not file["is_directory"]}
    common = local.keys() & deployed.keys()
    return {
        "built": local,
        "deployed": deployed,
        "deployed_only": sorted(deployed.keys() - local.keys()),
        "build_only": sorted(local.keys() - deployed.keys()),
        "changed": sorted(path for path in common
                          if local[path]["sha1_hash"] != deployed[path]["sha1_hash"]),
        "identical": sorted(path for path in common
                            if local[path]["sha1_hash"] == deployed[path]["sha1_hash"]),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--check", action="store_true", help="Fail if deployment differs")
    parser.add_argument("--allow-extra", action="store_true", help="Allow retained files after a fast deploy")
    args = parser.parse_args()
    directory, output = args.directory, args.output
    if not directory.is_dir() or not any(directory.rglob("*")):
        raise ValueError("Build directory is missing or empty")
    request = Request("https://neocities.org/api/list", headers={
        "Authorization": "Bearer " + os.environ["NEOCITIES_API_TOKEN"],
    }, method="GET")
    with urlopen(request, timeout=120) as response:
        remote = json.load(response)
    if remote.get("result") != "success":
        raise ValueError("Neocities file listing failed")
    report = audit(directory, remote["files"])
    report["checked_at"] = datetime.now(timezone.utc).isoformat()
    report["commit"] = os.environ.get("GITHUB_SHA")
    report["event"] = os.environ.get("GITHUB_EVENT_NAME")
    output.mkdir(parents=True, exist_ok=True)
    (output / "diff.json").write_text(json.dumps(report, indent=2) + "\n")
    lines = [
        "# Neocities vs prepared build",
        "",
        f"Built: {len(report['built'])} files; deployed: {len(report['deployed'])} files.",
        "",
        "Read-only comparison; no remote files were changed or deleted by this audit.",
        "Deployed-only means absent from this build, not necessarily unrecoverable from Git history.",
        "Push/workflow_run builds may skip subrepos.sh; use a manual audit for the full build.",
        "The JSON artifact includes both inventories, sizes, and SHA-1 hashes.",
        "",
        f"Identical: {len(report['identical'])} files.",
    ]
    for key, title in [("deployed_only", "Deployed only"), ("build_only", "Build only"),
                       ("changed", "Different content")]:
        lines.extend(["", f"## {title}: {len(report[key])} files", "", "```text"])
        lines.extend(report[key] or ["(none)"])
        lines.append("```")
    markdown = "\n".join(lines) + "\n"
    (output / "diff.md").write_text(markdown)
    print(markdown)
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
            summary.write(markdown)
    if os.environ.get("EXPECTED_DELETIONS"):
        expected = json.loads(os.environ["EXPECTED_DELETIONS"])
        if not isinstance(expected, list) or any(not isinstance(path, str) for path in expected):
            raise ValueError("EXPECTED_DELETIONS must be a JSON array of paths")
        if sorted(expected) != report["deployed_only"]:
            raise ValueError("Deployed-only paths differ from the reviewed deletion list; refusing deployment")
    if os.environ.get("BACKUP_ORPHANS") == "true" and report["deployed_only"]:
        with ZipFile(output / "deployed-only.zip", "w", ZIP_DEFLATED) as backup:
            for path in report["deployed_only"]:
                with urlopen("https://iter.ca/" + quote(path), timeout=120) as response:
                    data = response.read()
                if hashlib.sha1(data).hexdigest() != report["deployed"][path]["sha1_hash"]:
                    raise ValueError(f"Backup hash mismatch for {path}; refusing deployment")
                backup.writestr(path, data)
    if args.check and (report["build_only"] or report["changed"] or
                       (report["deployed_only"] and not args.allow_extra)):
        raise ValueError("Deployed files do not match the prepared build")


if __name__ == "__main__":
    main()
