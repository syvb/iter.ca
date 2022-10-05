process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fetch = require("node-fetch");
const fs = require("fs");

(async () => {
    const res = await (await fetch(`https://api.observablehq.com/documents/@smitop`)).json();
    res.forEach(nb => {
        console.log(JSON.stringify({
            Type: "observable",
            Id: `observable-${nb.id}`,
            Title: nb.title,
            Thumb: `/observablethumbs/${nb.thumbnail}.jpg`,
            Date: { Unix: (new Date(nb.publish_time)).valueOf() / 1000 },
            Uri: `https://observablehq.com/@${nb.owner.login}/${nb.slug}`,
        }));
    });
})();
