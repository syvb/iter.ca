const fs = require("fs");

const notes = fs.readdirSync(__dirname + "/../../notes").map(note => note.replace(/\.txt$/, ""));
notes.forEach(id => {
    const data = fs.readFileSync(`${__dirname}/../../notes/${id}.txt`, "utf-8");
    let text = "";
    let inHeader = true;
    let header = {
        Type: "note",
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
    if (header.Date) header.Date = { Unix: (new Date(header.Date)).valueOf() / 1000 };
    if (header.Verbose) {
        header.Verbose = parseInt(header.Verbose, 10);
    } else {
        header.Verbose = 0;
    }
    if (header.Name) {
        header.Title = header.Name;
        delete header.Name;
    }
    header.Text = text;
    console.log(JSON.stringify(header));
});
