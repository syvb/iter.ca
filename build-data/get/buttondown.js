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

// Each publicly archived "iter.ca update #N" email is copied to the site as content/update/N.html, at iter.ca/update/N/,
// and its item links there. Buttondown stays the source of truth: every regen rewrites the directory, so an edited,
// renamed, or deleted email changes its copy too.
const UPDATES = "../../content/update";
const UPDATE_SUBJECT = /^iter\.ca update #(\d+)\b/i;
const PUBLIC_ARCHIVE = ["enabled", "archive_only"];

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };
const decodeEntities = text => text.replace(/&(?:#(\d+)|#x([\da-f]+)|(\w+));/gi, (entity, dec, hex, name) =>
    dec ? String.fromCodePoint(dec) : hex ? String.fromCodePoint(parseInt(hex, 16)) : ENTITIES[name.toLowerCase()] ?? entity);

// What a link to a copy shows of it, as Buttondown's archive did: the email's description, or else the start of its
// text before its first heading (or of all of it, if that's none), cut at a word to about what a search result shows.
function description(email, render) {
    if (email.description) return email.description;
    const text = decodeEntities(partText(render.split(/<h[1-6]\b/i)[0], true) || partText(render, true));
    return text.length <= 160 ? text : text.slice(0, 161).replace(/\s+\S*$/, "").replace(/[,;:]$/, "") + "…";
}

(async () => {
    const pages = new Map();
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
                const number = email.subject?.match(UPDATE_SUBJECT)?.[1];
                if (number && PUBLIC_ARCHIVE.includes(email.archival_mode)) {
                    // Two emails can't share a page, and keeping either would leave the other's link on the wrong
                    // email, so the regen fails before anything is written, until one is renamed in Buttondown.
                    const other = pages.get(Number(number));
                    if (other) {
                        throw new Error(`"${other.subject}" and "${email.subject}" are both update #${Number(number)}`);
                    }
                    item.Uri = `https://iter.ca/update/${Number(number)}/`;
                    pages.set(Number(number), email);
                }
                console.log(JSON.stringify(item));
            });
            url = res.next;
        }
    }
    // A copy is Buttondown's own rendering of the email, as its archive shows it, whether it's written in Markdown or
    // HTML: a bare link on a line of its own is a card for the page it links to, or the tweet. All of them are fetched
    // before any is written, so a failed fetch leaves the copies as they were.
    const renders = new Map();
    for (const [number, email] of pages) {
        const res = await fetch(`https://api.buttondown.email/v1/emails/${email.id}/renders?target=html`, {
            headers: { Authorization: `Token ${TOKEN}` },
        });
        if (!res.ok) throw new Error(`Buttondown couldn't render "${email.subject}": ${res.status}`);
        renders.set(number, (await res.json()).content.trim());
    }
    fs.rmSync(UPDATES, { recursive: true, force: true });
    fs.mkdirSync(UPDATES, { recursive: true });
    for (const [number, email] of pages) {
        const render = renders.get(number);
        // Its preview image is the one Buttondown's archive had, else its first image. iter.ca shows a copy of each
        // Buttondown image in it (partials/buttondown-images.html).
        const image = email.image || render.match(/<img\b[^>]*?\ssrc="([^"]+)"/i)?.[1].replaceAll("&amp;", "&");
        // JSON strings are TOML strings. With no layout of its own, a copy is shown as a post is, which ends with the
        // newsletter's subscribe link. It's listed on /update/ only: the site's other lists have its item instead.
        const frontMatter = [
            `title = ${JSON.stringify(email.subject)}`,
            `date = ${JSON.stringify(new Date(email.publish_date).toISOString())}`,
            `description = ${JSON.stringify(description(email, render))}`,
            ...(image ? [`image = ${JSON.stringify(image)}`] : []),
            `type = "post"`,
            `[_build]`,
            `list = "local"`,
        ];
        fs.writeFileSync(`${UPDATES}/${number}.html`, `+++\n${frontMatter.join("\n")}\n+++\n${render}\n`);
    }
    // Once iter.ca serves a copy, its email's canonical URL in Buttondown is set to the copy, which makes Buttondown's
    // archive page for the email redirect there and its archive and RSS link there. Not before then, or the redirect
    // would go to a page that isn't up yet: a new issue's copy is set a regen after the one that makes it. Setting one
    // can fail without failing the regen; the next regen tries again.
    for (const [number, email] of pages) {
        const url = `https://iter.ca/update/${number}/`;
        if (email.canonical_url === url) continue;
        try {
            if (!(await fetch(url, { method: "HEAD" })).ok) continue;
            const res = await fetch(`https://api.buttondown.email/v1/emails/${email.id}`, {
                method: "PATCH",
                headers: { Authorization: `Token ${TOKEN}`, "Content-Type": "application/json" },
                body: JSON.stringify({ canonical_url: url }),
            });
            if (!res.ok) throw new Error(`status ${res.status}`);
        } catch (error) {
            console.error(`::warning::Couldn't set the canonical URL of "${email.subject}" in Buttondown: ${error.message}`);
        }
    }
})();
