process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fs = require("fs");

async function get(url) {
    const res = await fetch(url);
    // a failed fetch would drop a notebook's text, so fail the regen to keep the last data
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return res.json();
}

// The text of a notebook's Markdown cells, without the code in their ${…}s (which Observable fills in when it runs),
// their links' URLs, their HTML tags, or Markdown's *, #, and ` marks.
function mdText(md) {
    return md
        .replace(/\$\{[^}]*\}/g, " ")
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/<\/?[a-z][^>]*>|[*#`]/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
}

(async () => {
    const res = await get(`https://api.observablehq.com/documents/@smitop`);
    for (const nb of res) {
        const doc = await get(`https://api.observablehq.com/document/@${nb.owner.login}/${nb.slug}`);
        console.log(JSON.stringify({
            Type: "observable",
            Id: `observable-${nb.id}`,
            Title: nb.title,
            Thumb: `/observablethumbs/${nb.thumbnail}.jpg`,
            Date: { Unix: (new Date(nb.publish_time)).valueOf() / 1000 },
            Uri: `https://observablehq.com/@${nb.owner.login}/${nb.slug}`,
            // The notebook's text, which site search finds it by (themes/smitop/layouts/index.searchindex.json). Not
            // Text, which the stream would show a summary of.
            FullText: doc.nodes.filter(node => node.mode === "md").map(node => mdText(node.value)).join(" "),
        }));
    }
})();
