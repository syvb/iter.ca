const fs = require("fs");

const notes = fs.readdirSync(__dirname + "/../../notes").map(note => note.replace(/\.txt$/, ""));
notes.forEach(id => {
    const data = fs.readFileSync(`${__dirname}/../../notes/${id}.txt`, "utf-8");
    let text = "";
    let inHeader = true;
    let header = {
        Type: "note",
        Id: `note-${id}`,
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
    if (header.Date) {
        // make timezone agnostic (https://stackoverflow.com/a/39209842/14004262)
        let date = new Date(header.Date);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        date = new Date(date.getTime() - userTimezoneOffset);
        header.Date = { Unix: date.valueOf() / 1000 };
    }
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
