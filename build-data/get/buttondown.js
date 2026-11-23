process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fs = require("fs");
const plainText = require("./plaintext");

const TOKEN = fs.readFileSync("tokens/buttondown.txt", "utf-8").trim();

// A heading's text, without its tags or Markdown links.
const headingText = raw => raw
    .replace(/<[^>]*>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

// A block (a paragraph or list item) of a part of an email that doesn't end a sentence, as a list item often doesn't.
const UNENDED = /[^.!?…:;,]["'’”)]*$/;

// The text of part of an email: its blocks (HTML paragraphs and list items, or lines of Markdown) run together, with
// a comma between two where the first doesn't end a sentence. Figures, with their captions, aren't part of it. HTML
// entities are left in, as in an item's Text.
function partText(part, html) {
    part = part.replace(/<figure\b[\s\S]*?<\/figure>/gi, "");
    const blocks = html
        ? part.split(/<\/(?:p|li|h[1-6]|blockquote|pre|div)>/i)
        : part.split("\n").map(line => line
            .replace(/^\s*(?:#{1,6}|>|[-*+]|\d+\.)\s+/, "")
            .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
            .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
            .replace(/(^|\W)(\*\*|__|\*|_|`)(?=\S)(.+?)(?<=\S)\2(?!\w)/g, "$1$3"));
    return blocks.map(plainText).filter(Boolean)
        .reduce((text, block) => text ? text + (UNENDED.test(text) ? ", " : " ") + block : block, "");
}

(async () => {
    for (const status of ["sent", "in_flight"]) {
        let url = `https://api.buttondown.email/v1/emails?status=${status}`;
        while (url) {
            const res = await (await fetch(url, {
                headers: { Authorization: `Token ${TOKEN}` },
            })).json();
            res.results.forEach(email => {
                const body = email.body || "";
                // The email's sections, from its HTML (<h1> to <h3>) or Markdown (# to ###) headings, each up to the
                // next heading. Before the first is the intro, which is just a greeting when there are any.
                const html = /<\/(?:p|li|h[1-6]|div)>/i.test(body);
                let found = [...body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)];
                if (found.length === 0) found = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)];
                const sections = found.map((m, i) => ({
                    heading: headingText(m[1]),
                    part: body.slice(m.index + m[0].length, found[i + 1]?.index ?? body.length),
                }));
                const intro = body.slice(0, found[0]?.index ?? body.length);
                const headings = [];
                const seen = new Set();
                for (const { heading } of sections) {
                    if (heading && !seen.has(heading.toLowerCase())) {
                        seen.add(heading.toLowerCase());
                        headings.push(heading);
                    }
                }
                // The homepage previews an issue by its first section with text in it, past the greeting and the list
                // of posts that the homepage already has.
                const excerpt = [...sections.filter(s => !/\bposts\b/i.test(s.heading)).map(s => s.part), intro]
                    .map(part => partText(part, html))
                    .find(Boolean);
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
                if (excerpt) item.Excerpt = excerpt;
                console.log(JSON.stringify(item));
            });
            url = res.next;
        }
    }
})();
