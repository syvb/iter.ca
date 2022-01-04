const fetch = require("node-fetch");

// "This is not considered a secret, and may be safely embed in client side code or distributed binaries"
const KEY = "8TxspKDh8c))qWIuZj6cYQ((";

(async () => {
    const accsData = await (await fetch(`https://api.stackexchange.com/2.2/users/13986849/associated?key=${KEY}&pagesize=100`)).json();
    const accs = accsData.items.filter(acc => acc.question_count > 0 || acc.answer_count > 0);
    accs.sort();
    const siteData = await (await fetch(`https://api.stackexchange.com/2.2/sites?key=${KEY}&pagesize=10000&filter=!6Oe4s8rnMURKD`)).json();
    if (accs.length > 28) {
        console.error("Can't process SE since more than 30 items and request limit is 30 req/s");
        // should implement delay between requests
        return;
    }
    accs.push({site_url: "https://meta.stackoverflow.com", user_id: 14004262}); // https://meta.stackexchange.com/q/371659/828089
    for (const acc of accs) {
        let siteId = siteData.items.filter(site => site.site_url === acc.site_url)[0];
        if (!siteId) {
            console.error("WARN: couldn't find site info for", acc);
            return;
        }
        siteId = siteId.api_site_parameter;
        // TODO: paginate
        // filter is unsafe! okay because we escape later
        const posts = await (await fetch(`https://api.stackexchange.com/2.2/users/${acc.user_id}/posts?key=${KEY}&order=desc&sort=activity&site=${siteId}&filter=4F_y7HR4C9TWBKXX&pagesize=100`)).json();
        if (posts.backoff) await new Promise((resolve, reject) => setTimeout(resolve, posts.backoff * 1000));
        posts.items.forEach(post => {
            console.log(JSON.stringify({
                Type: "SePost",
                Id: `se-${siteId}-${post.post_id}`,
                Title: post.title,
                Uri: `${post.link}/${acc.user_id}`, // append user ID to get tracking right
                Date: { Unix: post.creation_date },
                Text: post.body_markdown,
                Verbose: 1,
            }))
        });
    }
})();
