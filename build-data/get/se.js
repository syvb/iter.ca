// "This is not considered a secret, and may be safely embed in client side code or distributed binaries"
const KEY = "8TxspKDh8c))qWIuZj6cYQ((";

const fs = require("fs");

async function get(path) {
    const res = await fetch(`https://api.stackexchange.com/2.2/${path}&key=${KEY}`);
    const body = await res.json();
    if (!res.ok || !Array.isArray(body.items)) throw new Error(`${path}: HTTP ${res.status} ${JSON.stringify(body)}`);
    if (body.backoff) await new Promise((resolve, reject) => setTimeout(resolve, body.backoff * 1000));
    return body;
}

async function getPosts() {
    const accsData = await get(`users/13986849/associated?pagesize=100`);
    const accs = accsData.items.filter(acc => acc.question_count > 0 || acc.answer_count > 0);
    accs.sort();
    const siteData = await get(`sites?pagesize=10000&filter=!6Oe4s8rnMURKD`);
    if (accs.length > 28) {
        console.error("Can't process SE since more than 30 items and request limit is 30 req/s");
        // should implement delay between requests
        return [];
    }
    accs.push({site_url: "https://meta.stackoverflow.com", user_id: 10113238}); // https://meta.stackexchange.com/q/371659/828089
    const rows = [];
    for (const acc of accs) {
        let siteId = siteData.items.filter(site => site.site_url === acc.site_url)[0];
        if (!siteId) {
            console.error("WARN: couldn't find site info for", acc);
            break;
        }
        siteId = siteId.api_site_parameter;
        let posts;
        let page = 1;
        do {
            // filter is unsafe! okay because we escape later
            posts = await get(`users/${acc.user_id}/posts?order=desc&sort=activity&site=${siteId}&filter=4F_y7HR4C9TWBKXX&pagesize=100&page=${page}`);
            posts.items.forEach(post => {
                rows.push({
                    Type: "SePost",
                    Id: `se-${siteId}-${post.post_id}`,
                    Title: post.title,
                    Uri: `${post.link}/${acc.user_id}`, // append user ID to get tracking right
                    Date: { Unix: post.creation_date },
                    Text: post.body_markdown,
                    Verbose: 1,
                });
            });
            page++;
        } while (posts.has_more)
    }
    // the API lists posts by activity, which swaps posts with the same activity time between regens
    // (such as a question and its self-answer), so order them by creation date, then Id, newest first
    return rows.sort((a, b) => b.Date.Unix - a.Date.Unix || (a.Id < b.Id ? 1 : -1));
}

(async () => {
    // the Stack Exchange API sometimes answers with an error instead of posts, and an IP ban lasts
    // 30 seconds to a few minutes (https://api.stackexchange.com/docs/throttle), so retry once, then keep the last regen's posts
    const rows = await getPosts().catch(async err => {
        console.error(`SE: ${err.message}, retrying in 60 seconds`);
        await new Promise(resolve => setTimeout(resolve, 60000));
        return getPosts();
    }).catch(err => {
        // a workflow command is one line, and a JSON error quotes the start of the page
        console.error(`::warning::SE: ${err.message.replace(/\n/g, " ")}, keeping the posts from data/data.json`);
    });
    if (!rows) {
        JSON.parse(fs.readFileSync("../../data/data.json", "utf-8"))
            .filter(item => item.Type === "SePost")
            .forEach(item => console.log(JSON.stringify(item)));
        return;
    }
    rows.forEach(row => console.log(JSON.stringify(row)));
})();
