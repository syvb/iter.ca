echo [
node notes.js | sed 's/$/,/'
node yt.js | sed 's/$/,/'
cat <<EOF
{"Type":"note","Date":{"Unix":"1"},"Title":"First note","Text":"This is the first feed item."}
EOF
echo ]
