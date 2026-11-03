#!/bin/bash
set -euo pipefail

# https://github.com/syvb/pngcomp/releases/tag/0.0.1
tmp="$(mktemp index.html.tmp.XXXXXX)"
trap 'rm -f "$tmp"' EXIT
for attempt in 1 2 3 4; do
    if wget --tries=1 --timeout=60 -O "$tmp" "https://github.com/syvb/pngcomp/releases/download/0.0.1/comp.html" && [[ -s "$tmp" ]]; then
        mv -f "$tmp" index.html
        exit 0
    fi
    if (( attempt < 4 )); then
        sleep "$((2 ** attempt))"
    fi
done
echo "pngcomp download failed" >&2
exit 1
