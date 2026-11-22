// get my Bluesky posts and replies

process.env.TZ = "Etc/Utc"; // don't have date differences on CI
const fetch = require("node-fetch");
const fs = require("fs");

const ACTOR = "iter.ca";
const NOTES = `${__dirname}/../../notes`;

(async () => {
    // posts that a note in notes/ links to, which the stream and search have as that note
    const noted = new Set(fs.readdirSync(NOTES).map(note => {
        const uri = fs.readFileSync(`${NOTES}/${note}`, "utf-8").match(/^Uri=https:\/\/bsky\.app\/profile\/[^/]+\/post\/(\w+)\s*$/m);
        return uri?.[1];
    }));
    let cursor = "";
    do {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${ACTOR}`
            + `&filter=posts_with_replies&limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`);
        // a failed or partial listing would drop posts, so fail the regen to keep the last data
        if (!res.ok) throw new Error(`Bluesky API: HTTP ${res.status}`);
        const page = await res.json();
        page.feed.forEach(({ post, reason }) => {
            // a repost has a reason
            if (reason) return;
            const rkey = post.uri.split("/").pop();
            if (noted.has(rkey)) return;
            const date = Date.parse(post.record.createdAt);
            if (isNaN(date)) throw new Error(`Bluesky post ${post.uri} has no date`);
            console.log(JSON.stringify({
                Type: "bsky",
                BskyType: post.record.reply ? "reply" : "post",
                Id: `bsky-${rkey}`,
                Text: post.record.text,
                Date: { Unix: Math.floor(date / 1000) },
                Uri: `https://bsky.app/profile/${ACTOR}/post/${rkey}`,
                Verbose: 1,
            }));
        });
        cursor = page.feed.length ? page.cursor : "";
    } while (cursor);
})();
