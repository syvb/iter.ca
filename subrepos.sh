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
