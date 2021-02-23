const fetch = require("node-fetch");
const fs = require("fs");

const ids = fs.readFileSync(__dirname + "/yt.txt", "utf-8").trim().split("\n");
ids.forEach(async id => {
    const oemb = `https://www.youtube.com/oembed?url=https%3A//youtube.com/watch%3Fv%3D${id}&format=json`;
    const data = await (await fetch(oemb)).json();
    console.log(JSON.stringify({
        type: "video",
        thumb: data.thumbnail_url,
        uri: `https://youtube.com/watch?v=${id}`,
        title: data.title,
    }));
});
