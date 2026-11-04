#!/usr/bin/env bash
set -euo pipefail

cd build-data/get || exit
temp=$(mktemp ../../data/data.json.tmp.XXXXXX)
trap 'rm -f "$temp"' EXIT
./all.sh > "$temp"
node -e 'JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))' "$temp"
mv "$temp" ../../data/data.json
