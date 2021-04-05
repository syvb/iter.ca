while read id
do
    curl https://i.ytimg.com/vi/${id}/mqdefault.jpg > ../../static/yt-thumbs/${id}.jpg
done < yt.txt
jpegoptim -s ../../static/yt-thumbs/*.jpg
