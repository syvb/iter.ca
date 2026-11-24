process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fs = require("fs");

async function getPage(offset) {
    const res = await fetch(`https://api.scratch.mit.edu/users/smitop/projects?limit=40&offset=${offset}`);
    const body = await res.json();
    if (!res.ok || !Array.isArray(body)) throw new Error(`offset ${offset}: HTTP ${res.status} ${JSON.stringify(body)}`);
    return body;
}

async function getProjects() {
    // just hardcode page 1 and 2
    return (await getPage(0)).concat(await getPage(40));
}

(async () => {
    // the Scratch API sometimes answers with an error instead of projects, so retry once, then keep the last regen's projects
    const projs = await getProjects().catch(async err => {
        console.error(`Scratch: ${err.message}, retrying in 30 seconds`);
        await new Promise(resolve => setTimeout(resolve, 30000));
        return getProjects();
    }).catch(err => {
        // a workflow command is one line, and a JSON error quotes the start of the page
        console.error(`::warning::Scratch: ${err.message.replace(/\n/g, " ")}, keeping the projects from data/data.json`);
    });
    if (!projs) {
        JSON.parse(fs.readFileSync("../../data/data.json", "utf-8"))
            .filter(item => item.Type === "scrproj")
            .forEach(item => console.log(JSON.stringify(item)));
        return;
    }
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
