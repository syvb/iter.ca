process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fetch = require("node-fetch");
const fs = require("fs");

const TOKEN = fs.readFileSync("tokens/buttondown.txt", "utf-8").trim();

(async () => {
    let url = `https://api.buttondown.email/v1/emails?status=sent`;
    while (url) {
        const res = await (await fetch(url, {
            headers: { Authorization: `Token ${TOKEN}` },
        })).json();
        res.results.forEach(email => {
            // body is HTML; strip tags for a plain text summary
            const text = email.body
                .replace(/<[^>]*>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            console.log(JSON.stringify({
                Type: "buttondown",
                Id: `buttondown-${email.id}`,
                Title: email.subject,
                Text: text,
                Date: { Unix: (new Date(email.publish_date)).valueOf() / 1000 },
                Uri: email.absolute_url,
                Verbose: 0,
            }));
        });
        url = res.next;
    }
})();
