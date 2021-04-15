echo [
>&2 echo "Generating notes"
node notes.js | sed 's/$/,/'
>&2 echo "Generating YT data"
node yt.js | sed 's/$/,/'
>&2 echo "Generating HN data"
node hn.js | sed 's/$/,/'
>&2 echo "Generating Scratch project data"
node scrprojs.js | sed 's/$/,/'
>&2 echo "pngcrushing Scratch thumbnails"
for png in `ls ../../static/scr-thumbs/*.png`;
do
    pngcrush -brute "$png" temp.png 2> /dev/null
    mv -f temp.png $png
done;
>&2 echo "Generating SE data"
node se.js | sed 's/$/,/'
>&2 echo "Writing final note"
cat <<EOF
{"Type":"note","Date":{"Unix":1615179600},"Title":"First note","Text":"\nIf you are reading this, then I've sucessfully set up my notes system. This is for notes with less content than full blog posts.\n\n", "Verbose": 1, "Id": "allsh-first-note"}
EOF
echo ]
>&2 echo "Done generating data"
