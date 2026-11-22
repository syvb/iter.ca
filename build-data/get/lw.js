const fetch = require("node-fetch");

// themes/smitop/layouts/partials/date.html shows times from here on in San Francisco time, and earlier ones in UTC
const SF_TIMES_FROM = Date.parse("2026-11-11T00:00:00-08:00");
// Ids of the posts that were linked by notes in notes/, kept so feed readers don't show them again
const NOTE_IDS = {
    yQmzPMMeBLmGuZokr: "llm-hardware",
    WKt2mqJrsFuMiszed: "compute-multiplier-graph",
    CatAYdBDuGim6m3cd: "fdt-sacrificial-volunteer",
    nNYc5qddHXwdk5kix: "attention-head-nlas",
    em5wnA7gpQSvfsuxQ: "anthropic-litigation-docs",
    Hb5aCFtLuHc5uvAgX: "anthropic-corporate-structure",
    aWYQHh2pEFCLYh85C: "matryoshka-nlas",
    NazprRfWJ4qkwcSro: "nla-explanations-shortened",
    ahu9BCHPFDg9AJF75: "nla-explanations",
    JAYYFKYMwoq6zd4S3: "latent-reasoning",
    bkPLnkG5Lnh7G97LP: "meta-models-interpretability",
    xzPjd3ZF2oBK6ADFz: "cybersec-before-ai-rnd",
    pCB5SoDmkNxdeTsBH: "positive-sum",
    mYM9EAAhpbYDDmA3e: "claude-secret-goals",
};

(async () => {
    const res = await fetch("https://www.lesswrong.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `{ posts(input: {terms: {view: "userPosts", userId: "nDWrtEhgEPvoYqyyk", sortedBy: "new", limit: 1000}}) {
                results { _id title postedAt shortform isEvent url pageUrl }
            } }`,
        }),
    });
    // a failed, partial, or empty listing would drop posts from the site, so fail the regen to keep the last data
    const { data, errors } = await res.json();
    if (!res.ok || errors || !data.posts.results.length) {
        throw new Error(`LessWrong API: HTTP ${res.status}, errors ${JSON.stringify(errors)}`);
    }
    data.posts.results.forEach(post => {
        // skip the shortform container, events, and crossposts of posts on this site, which are linkposts to them
        if (post.shortform || post.isEvent || post.url?.startsWith("https://iter.ca/")) return;
        let date = Date.parse(post.postedAt);
        if (!post.title || !post.pageUrl || isNaN(date)) throw new Error(`LessWrong post ${post._id} is missing fields`);
        if (date < SF_TIMES_FROM) {
            // midnight UTC of the San Francisco date, which date.html shows as that date
            date = Date.parse(new Date(date).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }));
        }
        console.log(JSON.stringify({
            Type: "lw",
            Id: NOTE_IDS[post._id] ? `note-${NOTE_IDS[post._id]}` : `lw-${post._id}`,
            Title: post.title,
            Date: { Unix: Math.floor(date / 1000) },
            Uri: post.pageUrl,
            Verbose: 0,
        }));
    });
})();
