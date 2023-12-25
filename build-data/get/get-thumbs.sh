#!/usr/bin/env bash

>&2 echo "Getting YouTube thumbnails"
while read -r id
do
    curl "https://i.ytimg.com/vi/${id}/mqdefault.jpg" > "../../static/yt-thumbs/${id}.jpg"
done < yt.txt
jpegoptim -s ../../static/yt-thumbs/*.jpg
>&2 echo "Getting Scratch thumbnails"
node scrthumbs.js
>&2 echo "pngcrushing Scratch thumbnails"
for png in ../../static/scr-thumbs/*.png;
do
    pngcrush -brute "$png" temp.png 2> /dev/null
    mv -f temp.png "$png"
done;
>&2 echo "Getting Observable thumbnails"
node observablethumbs.js
>&2 echo "optimizng Observable thumbnails"
jpegoptim -s ../../static/observablethumbs/*.jpg
