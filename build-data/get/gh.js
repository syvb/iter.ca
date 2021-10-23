// get github PRs

process.env.TZ = "Etc/Utc"; // don't have date differences on CI
const fetch = require("node-fetch");

(async () => {
    /*
        {
        "url": "https://api.github.com/repos/rust-lang/rust/issues/87500",
        "repository_url": "https://api.github.com/repos/rust-lang/rust",
        "labels_url": "https://api.github.com/repos/rust-lang/rust/issues/87500/labels{/name}",
        "comments_url": "https://api.github.com/repos/rust-lang/rust/issues/87500/comments",
        "events_url": "https://api.github.com/repos/rust-lang/rust/issues/87500/events",
        "html_url": "https://github.com/rust-lang/rust/pull/87500",
        "id": 953408109,
        "node_id": "MDExOlB1bGxSZXF1ZXN0Njk3NDU1MDMz",
        "number": 87500,
        "title": "Document math behind MIN/MAX consts on integers",
        "user": {
            "login": "Smittyvb",
            "id": 10530973,
            "node_id": "MDQ6VXNlcjEwNTMwOTcz",
            "avatar_url": "https://avatars.githubusercontent.com/u/10530973?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Smittyvb",
            "html_url": "https://github.com/Smittyvb",
            "followers_url": "https://api.github.com/users/Smittyvb/followers",
            "following_url": "https://api.github.com/users/Smittyvb/following{/other_user}",
            "gists_url": "https://api.github.com/users/Smittyvb/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Smittyvb/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Smittyvb/subscriptions",
            "organizations_url": "https://api.github.com/users/Smittyvb/orgs",
            "repos_url": "https://api.github.com/users/Smittyvb/repos",
            "events_url": "https://api.github.com/users/Smittyvb/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Smittyvb/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [
            {
            "id": 583437191,
            "node_id": "MDU6TGFiZWw1ODM0MzcxOTE=",
            "url": "https://api.github.com/repos/rust-lang/rust/labels/S-waiting-on-bors",
            "name": "S-waiting-on-bors",
            "color": "d3dddd",
            "default": false,
            "description": "Status: Waiting on bors to run and complete tests. Bors will change the label on completion."
            }
        ],
        "state": "closed",
        "locked": false,
        "assignee": {
            "login": "kennytm",
            "id": 103023,
            "node_id": "MDQ6VXNlcjEwMzAyMw==",
            "avatar_url": "https://avatars.githubusercontent.com/u/103023?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/kennytm",
            "html_url": "https://github.com/kennytm",
            "followers_url": "https://api.github.com/users/kennytm/followers",
            "following_url": "https://api.github.com/users/kennytm/following{/other_user}",
            "gists_url": "https://api.github.com/users/kennytm/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/kennytm/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/kennytm/subscriptions",
            "organizations_url": "https://api.github.com/users/kennytm/orgs",
            "repos_url": "https://api.github.com/users/kennytm/repos",
            "events_url": "https://api.github.com/users/kennytm/events{/privacy}",
            "received_events_url": "https://api.github.com/users/kennytm/received_events",
            "type": "User",
            "site_admin": false
        },
        "assignees": [
            {
            "login": "kennytm",
            "id": 103023,
            "node_id": "MDQ6VXNlcjEwMzAyMw==",
            "avatar_url": "https://avatars.githubusercontent.com/u/103023?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/kennytm",
            "html_url": "https://github.com/kennytm",
            "followers_url": "https://api.github.com/users/kennytm/followers",
            "following_url": "https://api.github.com/users/kennytm/following{/other_user}",
            "gists_url": "https://api.github.com/users/kennytm/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/kennytm/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/kennytm/subscriptions",
            "organizations_url": "https://api.github.com/users/kennytm/orgs",
            "repos_url": "https://api.github.com/users/kennytm/repos",
            "events_url": "https://api.github.com/users/kennytm/events{/privacy}",
            "received_events_url": "https://api.github.com/users/kennytm/received_events",
            "type": "User",
            "site_admin": false
            }
        ],
        "milestone": {
            "url": "https://api.github.com/repos/rust-lang/rust/milestones/85",
            "html_url": "https://github.com/rust-lang/rust/milestone/85",
            "labels_url": "https://api.github.com/repos/rust-lang/rust/milestones/85/labels",
            "id": 7000387,
            "node_id": "MI_kwDOAAsO6M4AatFD",
            "number": 85,
            "title": "1.56.0",
            "description": null,
            "creator": {
            "login": "rustbot",
            "id": 47979223,
            "node_id": "MDQ6VXNlcjQ3OTc5MjIz",
            "avatar_url": "https://avatars.githubusercontent.com/u/47979223?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/rustbot",
            "html_url": "https://github.com/rustbot",
            "followers_url": "https://api.github.com/users/rustbot/followers",
            "following_url": "https://api.github.com/users/rustbot/following{/other_user}",
            "gists_url": "https://api.github.com/users/rustbot/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/rustbot/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/rustbot/subscriptions",
            "organizations_url": "https://api.github.com/users/rustbot/orgs",
            "repos_url": "https://api.github.com/users/rustbot/repos",
            "events_url": "https://api.github.com/users/rustbot/events{/privacy}",
            "received_events_url": "https://api.github.com/users/rustbot/received_events",
            "type": "User",
            "site_admin": false
            },
            "open_issues": 1,
            "closed_issues": 124,
            "state": "open",
            "created_at": "2021-07-24T07:40:14Z",
            "updated_at": "2021-08-01T14:16:39Z",
            "due_on": null,
            "closed_at": null
        },
        "comments": 3,
        "created_at": "2021-07-27T01:11:14Z",
        "updated_at": "2021-07-28T19:26:07Z",
        "closed_at": "2021-07-28T19:26:03Z",
        "author_association": "CONTRIBUTOR",
        "active_lock_reason": null,
        "draft": false,
        "pull_request": {
            "url": "https://api.github.com/repos/rust-lang/rust/pulls/87500",
            "html_url": "https://github.com/rust-lang/rust/pull/87500",
            "diff_url": "https://github.com/rust-lang/rust/pull/87500.diff",
            "patch_url": "https://github.com/rust-lang/rust/pull/87500.patch"
        },
        "body": "Currently the documentation for `[integer]::{MIN, MAX}` doesn't explain where the constants come from. This documents how the values of those constants are related to powers of 2.",
        "performed_via_github_app": null,
        "score": 1.0
        },
    */
    // merged PRs
    for (let i = 0; i < 8; i++) { // never try to fetch too many pages, cause rate limits
        const res = await (await fetch(`https://api.github.com/search/issues?sort=created&page=${i}&per_page=1000&q=is:merged%20is:pr%20author:Smittyvb%20archived:false%20-user:Smittyvb`)).json();
        res.items.forEach(iss => {
            console.log(JSON.stringify({
                Type: "gh-pr",
                Id: `gh-pr-${iss.id}`,
                CommentCount: iss.comments,
                Text: iss.body,
                Date: { Unix: (new Date(iss.closed_at)).valueOf() / 1000 },
                Uri: iss.html_url,
                Title: iss.title,
                Verbose: 1,
                GhIssueNumber: iss.number,
                GhRepo: iss.url.split("/").slice(4,6).join("/"),
            }));
        });
        if (res.items.length !== 100) break;
    }
})();
