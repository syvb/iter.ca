const fs = require("fs");

const notes = fs.readdirSync(__dirname + "/../../notes").map(note => note.replace(/\.txt$/, ""));
notes.forEach(id => {
    const data = fs.readFileSync(`${__dirname}/../../notes/${id}.txt`, "utf-8");
    let text = "";
    let inHeader = true;
    let header = {
        type: "note",
    };
    data.split("\n").forEach(line => {
        if (!inHeader) {
            text += line + "\n";
            return;
        }
        const matches = line.matchAll(/^(\w+)=(.+)/gm);
        inHeader = false;
        for (match of matches) {
            inHeader = true;
            header[match[1]] = match[2];
        }
        if (!inHeader) {
            text += line + "\n";
            return;
        }
    });
    if (header.date) header.date = (new Date(header.date)).valueOf();
    if (header.name) {
        header.title = header.name;
        delete header.name;
    }
    header.html = text;
    console.log(header);
});
