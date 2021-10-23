const fetch = require("node-fetch");
const fs = require("fs");

const ids = fs.readFileSync(__dirname + "/yt.txt", "utf-8").trim().split("\n");
(async () => {
    for (const id of ids) {
        const oemb = `https://www.youtube.com/oembed?url=https%3A//youtube.com/watch%3Fv%3D${id}&format=json`;
        const data = await (await fetch(oemb)).json();
        const wpage = await (await fetch(`https://www.youtube.com/watch?v=${id}`, {
            headers: {
                "Accept": "text/html",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
            }
        })).text();
        console.log(JSON.stringify({
            Type: "video",
            Thumb: `/yt-thumbs/${id}.jpg`,
            Uri: `https://youtube.com/watch?v=${id}`,
            Title: data.title,
            Date: { Unix: (new Date(wpage.match(/<meta itemprop="uploadDate" content="([\d-]+)">/)[1])).valueOf() / 1000 },
            Id: `yt-vid-${id}`,
        }));
    }
})();
