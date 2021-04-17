const fetch = require("node-fetch");

(async () => {
    const userData = await (await fetch("https://hacker-news.firebaseio.com/v0/user/smitop.json")).json();
    const posts = userData.submitted;
    for (postId of posts) {
        const post = await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)).json();
        let data = {
            Type: "hn",
            HNType: post.type,
            Verbose: 1,
            Date: { Unix: post.time },
            Comments: post.descendants || 0,
            Uri: `https://news.ycombinator.com/item?id=${postId}`,
            Id: `hn-post-${postId}`,
        }
        if (post.title) data.Title = post.title;
        if (post.score) data.Score = post.score;
        if (post.text) data.Text = post.text;
        console.log(JSON.stringify(data));
    }
})();