echo [
node notes.js | sed 's/$/,/'
node yt.js | sed 's/$/,/'
cat <<EOF
{"type":"note","date":1,"title":"First note","html":"This is the first feed item."}
EOF
echo ]
