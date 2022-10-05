process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fetch = require("node-fetch");
const fs = require("fs");

(async () => {
    // just hardcode page 1 and 2
    const p1 = await (await fetch("https://api.scratch.mit.edu/users/smitop/projects?limit=40&offset=0")).json();
    const p2 = await (await fetch("https://api.scratch.mit.edu/users/smitop/projects?limit=40&offset=40")).json();

    const projs = p1.concat(p2);
    projs.forEach(async proj => {
        console.log(JSON.stringify({
            Type: "scrproj",
            Title: proj.title,
            Id: `scr${proj.id}`,
            Text: proj.description.slice(0, 150),
            Thumb: `/scr-thumbs/${proj.id}.png`,
            Uri: `https://scratch.mit.edu/projects/${proj.id}/`,
            Date: { Unix: (new Date(proj.history.shared)).valueOf() / 1000 },
            Verbose: 1,
        }));
    });
})();
