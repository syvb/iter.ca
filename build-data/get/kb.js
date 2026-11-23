// get the pages of my notes site, kb.iter.ca, which only search has (themes/smitop/layouts/index.searchindex.json)

process.env.TZ = "Etc/Utc"; // don't have date differences on CI
const plainText = require("./plaintext");

const SITE = "https://kb.iter.ca";
// pages that aren't notes
const SKIP = new Set(["public/pages/kbitercatests.html"]);

async function get(url) {
    const res = await fetch(url);
    // a failed fetch would drop pages, so fail the regen to keep the last data
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return res;
}

(async () => {
    // Each page's title, by its file, such as public/journals/2024-04-19.html, which is at /journals/2024-04-19. (Its
    // slug has _ for -, which is a 404.)
    const manifest = await (await get(`${SITE}/manifest.json`)).json();
    if (!Object.keys(manifest).length) throw new Error(`${SITE}/manifest.json has no pages`);
    for (const [file, { title }] of Object.entries(manifest)) {
        if (SKIP.has(file)) continue;
        const path = file.replace(/^public\//, "").replace(/\.html$/, "");
        const res = await get(`${SITE}/${path}`);
        const article = (await res.text()).match(/<article>([\s\S]*)<\/article>/);
        if (!title || !article) throw new Error(`${SITE}/${path} has no title or no <article>`);
        // a journal is the day it's named for; a page has no date, so it's when it last changed
        const journal = path.startsWith("journals/");
        const date = Date.parse(journal ? path.slice("journals/".length) : res.headers.get("last-modified"));
        if (isNaN(date)) throw new Error(`${SITE}/${path} has no date`);
        console.log(JSON.stringify({
            Type: "kb",
            KbType: journal ? "journal" : "page",
            Id: `kb-${path.replace("/", "-")}`,
            Title: title,
            // The page's text, without its title (the <h1> in its <header>) or the "public: true" that every page has.
            // As a LessWrong post's (lw.js), it's FullText, since no stream shows it.
            FullText: plainText(article[1]
                .replace(/<header>[\s\S]*?<\/header>/, "")
                .replace(/<span class="attr-name">public:<\/span>\s*<span class="attr-value">[^<]*<\/span>/g, "")),
            Date: { Unix: date / 1000 },
            Uri: `${SITE}/${path}`,
            Verbose: 2,
        }));
    }
})();
