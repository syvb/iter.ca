const fetch = require("node-fetch");
const fs = require("fs");

const ids = fs.readFileSync(__dirname + "/yt.txt", "utf-8").trim().split("\n");
ids.forEach(async id => {
    const oemb = `https://www.youtube.com/oembed?url=https%3A//youtube.com/watch%3Fv%3D${id}&format=json`;
    const data = await (await fetch(oemb)).json();
    const wpage = await (await fetch(`https://www.youtube.com/watch?v=${id}`, {
        headers: {
            "Accept": "text/html",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
        }
    })).text();
    console.log(JSON.stringify({
        type: "video",
        thumb: data.thumbnail_url,
        uri: `https://youtube.com/watch?v=${id}`,
        title: data.title,
        date: (new Date(wpage.match(/<meta itemprop="uploadDate" content="([\d-]+)">/)[1])).valueOf()
    }));
});
