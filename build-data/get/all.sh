#!/usr/bin/env bash

echo [
>&2 echo "Generating notes"
node notes.js | sed 's/$/,/'
>&2 echo "Generating GitHub data"
node gh.js | sed 's/$/,/'
>&2 echo "Generating YT data"
node yt.js | sed 's/$/,/'
>&2 echo "Generating HN data"
node hn.js | sed 's/$/,/'
>&2 echo "Generating Itch data"
node itch.js | sed 's/$/,/'
>&2 echo "Generating Scratch project data"
node scrprojs.js | sed 's/$/,/'
>&2 echo "Generating SE data"
node se.js | sed 's/$/,/'
>&2 echo "Generating Observable data"
node observable.js | sed 's/$/,/'
>&2 echo "Writing final note"
cat <<EOF
{"Type":"note","Date":{"Unix":1615179600},"Title":"First note","Text":"\nIf you are reading this, then I've sucessfully set up my notes system. This is for notes with less content than full blog posts.\n\n", "Verbose": 1, "Id": "allsh-first-note"}
EOF
echo "]"
>&2 echo "Done generating data"
