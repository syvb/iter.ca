const fs = require("fs");

let links = require("../data/sm4.json");
fs.readdirSync("../content/post")
    .filter(x => !x.startsWith("draft"))
    .map(x => x.split(".")[0])
    .forEach(link => {
        links["/" + link] = `https://smitop.com/post/${link}/`
    });

for (const link in links) {
    const dest = links[link];
    try {
        fs.mkdirSync(`${__dirname}/public/${link}`);
    } catch (e) {
        if (e.code !== "EEXIST") throw e;
    }
    fs.writeFileSync(`${__dirname}/public/${link}/index.html`, `<!doctype html><html><head><meta charset="utf-8"><title>Redirecting...</title><link rel="canonical" href="${dest}"><meta http-equiv="refresh" content="0; url=${dest}"></head><body>Redirecting to <a href="${dest}">${dest}</a></body></html>`)
}

fs.copyFileSync(__dirname + "/index.html", __dirname + "/public/index.html")
fs.copyFileSync(__dirname + "/dots.html", __dirname + "/public/dots.html")
