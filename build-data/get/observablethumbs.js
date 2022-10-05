process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fetch = require("node-fetch");
const fs = require("fs");

(async () => {
    const res = await (await fetch(`https://api.observablehq.com/documents/@smitop`)).json();
    res.forEach(async nb => {
        const thumbBuf = await (await fetch(`https://static.observableusercontent.com/thumbnail/${nb.thumbnail}.jpg`)).buffer();
        fs.writeFileSync(`${__dirname}/../../static/observablethumbs/${nb.thumbnail}.jpg`, thumbBuf);
    });
})();
