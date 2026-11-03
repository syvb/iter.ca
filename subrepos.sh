#!/usr/bin/env bash

set -euo pipefail

require_file() {
    if [[ ! -f "$1" || ! -s "$1" ]]; then
        echo "Missing or empty generated file: $1" >&2
        return 1
    fi
}

fetch() (
    local out="$1" url="$2"
    local tmp attempt
    tmp="$(mktemp "${out}.tmp.XXXXXX")"
    trap 'rm -f "$tmp"' EXIT
    for attempt in 1 2 3 4; do
        # Commons requires an identifying agent; avoid bursts on shared CI IPs.
        if [[ "$url" == https://upload.wikimedia.org/* ]]; then
            sleep 1
        fi
        if wget --user-agent='iter.ca-asset-bot/1.0 (https://github.com/syvb/iter.ca)' \
            --tries=1 --timeout=60 -O "$tmp" "$url" && [[ -s "$tmp" ]]; then
            mv -f "$tmp" "$out"
            return 0
        fi
        if (( attempt < 4 )); then
            sleep "$((15 * 2 ** (attempt - 1)))"
        fi
    done
    echo "Download failed: $url" >&2
    return 1
)

fetch_compressed() (
    local out="$1" url="$2"
    local tmp
    tmp="$(mktemp -d "${out}.tmp.XXXXXX")"
    trap 'rm -rf "$tmp"' EXIT
    fetch "$tmp/input" "$url"
    convert "$tmp/input" -define jpeg:extent=1MB "jpg:$tmp/output"
    mv -f "$tmp/output" "$out"
)

(

cd static

mkdir -p ext music
fetch music/unsudden-movements.flac 'https://archive.org/download/unsudden-movements/unsudden-movements.flac'
# Keep the original deployed (misspelled) URL working too.
cp music/unsudden-movements.flac music/unsuddentmovements.flac

rm -rf transform-playground
git clone https://github.com/syvb/transform-playground.git
rm -rf transform-playground/.git

rm -rf bn
git clone https://github.com/syvb/bayesian-network.git bn
rm -rf bn/.git

(
    rm -rf segme segmerepo
    git clone https://github.com/syvb/segme.git segmerepo
    cd segmerepo
    wasm-pack build -t no-modules
    mv pkg public
)
mv segmerepo/public segme
rm -rf segmerepo

(
    cd ext
    rm -f ./*.{jpg,svg}
    fetch Circuit-playground-sideview.jpg https://upload.wikimedia.org/wikipedia/commons/4/4a/Circuit-playground-sideview.jpg
    convert Circuit-playground-sideview.jpg -resize 611x 611px-Circuit-playground-sideview.jpg
    fetch Adam7-mul.svg https://upload.wikimedia.org/wikipedia/commons/6/66/Adam7-mul.svg
    fetch Tennis-points.svg https://upload.wikimedia.org/wikipedia/commons/b/bc/Tennis-points.svg
    fetch HAP-ac2-Ports.jpg https://upload.wikimedia.org/wikipedia/commons/b/b2/HAP-ac2-Ports.jpg
    fetch GTG-initial.png https://upload.wikimedia.org/wikipedia/commons/d/d6/GTG-initial.png
    fetch Atan2definition.svg https://upload.wikimedia.org/wikipedia/commons/a/ad/Atan2definition.svg
    fetch rust-format.pdf 'https://archive.org/download/rust-format/rust-format.pdf'
    fetch rust-format.fig 'https://archive.org/download/rust-format/rust-format.fig'
    fetch PXL_20260401_021311254.RAW-01.COVER_pixelated.jpg 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_021311254.RAW-01.COVER_pixelated.jpg'
    fetch PXL_20260401_032729461.RAW-01.COVER.jpg 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032729461.RAW-01.COVER.jpg'
    fetch PXL_20260401_032801897.RAW-01.COVER.jpg 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032801897.RAW-01.COVER.jpg'
    fetch PXL_20260401_032815315.RAW-01.COVER.jpg 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032815315.RAW-01.COVER.jpg'
    fetch PXL_20260401_032826782.RAW-01.COVER.jpg 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032826782.RAW-01.COVER.jpg'
    fetch_compressed inds-main.jpg 'https://gist.github.com/user-attachments/assets/4d86b7a6-4776-4813-9f42-835a830a72fc'
    fetch_compressed bad-math-poster.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55190563458&secret=29ceebc973'
    fetch_compressed andon-bathroom.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55209483742&secret=761fa0744d'
    fetch_compressed andon-soap.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55210534958&secret=05a592313a'
    fetch_compressed andon-storage.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55209483707&secret=cd6e0aa8c1'
    fetch sessions-floor-3.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55240095850&secret=4f19325fca'
    fetch sessions-book-table.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239836408&secret=5f60675dcf'
    fetch sessions-test-card-front.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239836468&secret=6bb51b3ebe'
    fetch sessions-test-card-back.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55238789602&secret=856e8ed328'
    fetch sessions-game-play.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55238789622&secret=52c3d89a97'
    fetch sessions-game-terminal.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239935584&secret=4686c091a1'
    fetch sessions-lobby.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239691891&secret=7b77a2f12d'
    fetch sessions-lunch.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55240095980&secret=defddec9be'
    fetch sessions-lunch-menu.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239691946&secret=f5943efd04'
    fetch sessions-outside.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55238789552&secret=64f4e617b8'
    fetch sessions-terminal-devices.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239836443&secret=e3fcb4a34f'
    fetch sessions-posthog.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239691781&secret=19f1442acf'
    fetch_compressed lighthaven-night.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55241304261&secret=64d147b08b'
)

rm -rf fmat
mkdir -p fmat
cd ../binformats
# The Rust helper doesn't check conversion exit statuses. Never accept stale PNGs.
rm -rf public/png
BINFORMATS_URI_PREFIX="/fmat/" cargo run gen_png .
for name in idat-raw idat defiltered inter-idat inter-{1..7}; do
    require_file "public/png/$name.png"
done
# The helper also ignores failures removing its intermediate PPM files.
find public/png -type f -name '*.ppm' -delete
cp -r public/* ../static/fmat/
cd ../static
rm -f fmat/*/index.html

(
    cd pngcomp
    ./gen.sh
)

for entrypoint in transform-playground/index.html bn/index.html segme/index.html \
    segme/pkg/segme.js segme/pkg/segme_bg.wasm pngcomp/index.html; do
    require_file "$entrypoint"
done

)
