process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fs = require("fs");

const TOKEN = fs.readFileSync("tokens/buttondown.txt", "utf-8").trim();

(async () => {
    for (const status of ["sent", "in_flight"]) {
        let url = `https://api.buttondown.email/v1/emails?status=${status}`;
        while (url) {
            const res = await (await fetch(url, {
                headers: { Authorization: `Token ${TOKEN}` },
            })).json();
            res.results.forEach(email => {
                const body = email.body || "";
                // Extract section headings from either HTML (<h2>/<h3>) or Markdown (## / ###) emails.
                const headings = [];
                const seen = new Set();
                const addHeading = raw => {
                    const clean = raw
                        .replace(/<[^>]*>/g, " ")
                        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                        .replace(/\s+/g, " ")
                        .trim();
                    if (clean && !seen.has(clean.toLowerCase())) {
                        seen.add(clean.toLowerCase());
                        headings.push(clean);
                    }
                };
                for (const m of body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)) addHeading(m[1]);
                if (headings.length === 0) {
                    for (const m of body.matchAll(/^#{1,3}\s+(.+)$/gm)) addHeading(m[1]);
                }
                // body is HTML; strip tags for a plain text summary
                const text = body
                    .replace(/<[^>]*>/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();
                const item = {
                    Type: "buttondown",
                    Id: `buttondown-${email.slug}`,
                    Title: email.subject,
                    Text: text,
                    Date: { Unix: (new Date(email.publish_date)).valueOf() / 1000 },
                    Uri: email.absolute_url,
                    Verbose: 0,
                };
                if (headings.length > 0) item.Headings = headings;
                console.log(JSON.stringify(item));
            });
            url = res.next;
        }
    }
})();
