const fetch = require("node-fetch");

(async () => {
    const accsData = await (await fetch("https://api.stackexchange.com/2.2/users/17341075/associated")).json();
    const accs = accsData.items.filter(acc => acc.question_count > 0 || acc.answer_count > 0);
    const siteData = await (await fetch("https://api.stackexchange.com/2.2/sites?pagesize=10000&filter=!6Oe4s8rnMURKD")).json();
    if (accs.length > 28) {
        console.error("Can't process SE since more than 30 items and request limit is 30 req/s");
        // should implement delay between requests
        return;
    }
    accs.forEach(async acc => {
        let siteId = siteData.items.filter(site => site.site_url === acc.site_url)[0];
        if (!siteId) {
            console.error("WARN: couldn't find site info for", acc);
            return;
        }
        siteId = siteId.api_site_parameter;
        // TODO: paginate
        // filter is unsafe! okay because we escape later
        const posts = await (await fetch(`https://api.stackexchange.com/2.2/users/${acc.user_id}/posts?order=desc&sort=activity&site=${siteId}&filter=4F_y7HR4C9TWBKXX&pagesize=100`)).json();
        posts.items.forEach(post => {
            console.log(JSON.stringify({
                Type: "SePost",
                Id: `se-${siteId}-${post.post_id}`,
                Title: post.title,
                Uri: post.link,
                Date: { Unix: post.creation_date },
                Text: post.body_markdown,
                Verbose: 1,
            }))
        });
    });
})();
