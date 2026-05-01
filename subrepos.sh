#!/usr/bin/env bash

(

cd static || exit

rm -rf transform-playground
git clone https://github.com/syvb/transform-playground.git
rm -rf transform-playground/.git

(
    rm -rf segme segmerepo
    git clone https://github.com/syvb/segme.git segmerepo
    cd segmerepo || exit
    wasm-pack build -t no-modules
    mv pkg public
)
mv segmerepo/public segme
rm -rf segmerepo

(
    cd ext || exit
    rm ./*.{jpg,svg}
    wget https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circuit-playground-sideview.jpg/611px-Circuit-playground-sideview.jpg
    wget https://upload.wikimedia.org/wikipedia/commons/4/4a/Circuit-playground-sideview.jpg
    wget https://upload.wikimedia.org/wikipedia/commons/6/66/Adam7-mul.svg
    wget https://upload.wikimedia.org/wikipedia/commons/b/bc/Tennis-points.svg
    wget https://upload.wikimedia.org/wikipedia/commons/b/b2/HAP-ac2-Ports.jpg
    wget https://upload.wikimedia.org/wikipedia/commons/d/d6/GTG-initial.png
    wget https://upload.wikimedia.org/wikipedia/commons/a/ad/Atan2definition.svg
    wget 'https://archive.org/download/rust-format/rust-format.pdf'
    wget 'https://archive.org/download/rust-format/rust-format.fig'
    wget 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_021311254.RAW-01.COVER_pixelated.jpg'
    wget 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032729461.RAW-01.COVER.jpg'
    wget 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032801897.RAW-01.COVER.jpg'
    wget 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032815315.RAW-01.COVER.jpg'
    wget 'https://archive.org/download/lifelogging-2026-03-31/PXL_20260401_032826782.RAW-01.COVER.jpg'
    wget -O inds-main-orig.png 'https://gist.github.com/user-attachments/assets/4d86b7a6-4776-4813-9f42-835a830a72fc'
    convert inds-main-orig.png -define jpeg:extent=1MB inds-main.jpg
    rm inds-main-orig.png
    wget -O bad-math-poster-orig.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55190563458&secret=29ceebc973'
    convert bad-math-poster-orig.jpg -define jpeg:extent=1MB bad-math-poster.jpg
    rm bad-math-poster-orig.jpg
    wget -O andon-bathroom-orig.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55209483742&secret=761fa0744d'
    convert andon-bathroom-orig.jpg -define jpeg:extent=1MB andon-bathroom.jpg
    rm andon-bathroom-orig.jpg
    wget -O andon-soap-orig.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55210534958&secret=05a592313a'
    convert andon-soap-orig.jpg -define jpeg:extent=1MB andon-soap.jpg
    rm andon-soap-orig.jpg
    wget -O andon-storage-orig.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55209483707&secret=cd6e0aa8c1'
    convert andon-storage-orig.jpg -define jpeg:extent=1MB andon-storage.jpg
    rm andon-storage-orig.jpg
    wget -O sessions-floor-3.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55240095850&secret=4f19325fca'
    wget -O sessions-book-table.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239836408&secret=5f60675dcf'
    wget -O sessions-test-card-front.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239836468&secret=6bb51b3ebe'
    wget -O sessions-test-card-back.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55238789602&secret=856e8ed328'
    wget -O sessions-game-play.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55238789622&secret=52c3d89a97'
    wget -O sessions-game-terminal.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239935584&secret=4686c091a1'
    wget -O sessions-lobby.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239691891&secret=7b77a2f12d'
    wget -O sessions-lunch.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55240095980&secret=defddec9be'
    wget -O sessions-lunch-menu.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239691946&secret=f5943efd04'
    wget -O sessions-outside.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55238789552&secret=64f4e617b8'
    wget -O sessions-terminal-devices.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239836443&secret=e3fcb4a34f'
    wget -O sessions-posthog.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55239691781&secret=19f1442acf'
    wget -O lighthaven-night-orig.jpg 'https://www.flickr.com/photo_download.gne?size=o&id=55241304261&secret=64d147b08b'
    convert lighthaven-night-orig.jpg -define jpeg:extent=1MB lighthaven-night.jpg
    rm lighthaven-night-orig.jpg
)

rm -rf fmat
mkdir -p fmat
cd ../binformats || exit
BINFORMATS_URI_PREFIX="/fmat/" cargo run gen_png .
cp -r public/* ../static/fmat/
cd ../static || exit
rm fmat/*/index.html

(
    cd pngcomp || exit
    ./gen.sh
)

)
