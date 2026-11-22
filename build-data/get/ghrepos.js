// get my public GitHub repositories, which only search has (themes/smitop/layouts/index.searchindex.json)

process.env.TZ = "Etc/Utc"; // don't have date differences on CI
const fetch = require("node-fetch");

const TOKEN = process.env.GITHUB_TOKEN || "";
// how much of a README search has: its start says what the repository is
const README_LENGTH = 2000;

(async () => {
    // GitHub's GraphQL API needs a token, even for public data
    if (!TOKEN) throw new Error("Getting GitHub repositories needs GITHUB_TOKEN");
    let after = null;
    do {
        // The token can read private repositories, such as this site's own, so only public ones are asked for and kept.
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: { Authorization: `bearer ${TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `query($after: String) { user(login: "syvb") {
                    repositories(first: 100, after: $after, privacy: PUBLIC, isFork: false, ownerAffiliations: OWNER) {
                        nodes { name description url createdAt isPrivate isFork
                            readme: object(expression: "HEAD:README.md") { ... on Blob { text } } }
                        pageInfo { hasNextPage endCursor }
                    }
                } }`,
                variables: { after },
            }),
        });
        // a failed or partial listing would drop repositories, so fail the regen to keep the last data
        const { data, errors } = await res.json();
        const repos = data?.user?.repositories;
        if (!res.ok || errors || !repos?.nodes.length) {
            throw new Error(`GitHub API: HTTP ${res.status}, errors ${JSON.stringify(errors)}`);
        }
        repos.nodes.forEach(repo => {
            if (repo.isPrivate || repo.isFork) return;
            let readme = repo.readme?.text || "";
            // cut between words
            if (readme.length > README_LENGTH) readme = readme.slice(0, README_LENGTH).replace(/\s+\S*$/, "");
            console.log(JSON.stringify({
                Type: "gh-repo",
                Id: `gh-repo-${repo.name}`,
                Title: repo.name,
                // Markdown
                Text: [repo.description, readme].filter(Boolean).join("\n\n"),
                Date: { Unix: Date.parse(repo.createdAt) / 1000 },
                Uri: repo.url,
                Verbose: 2,
            }));
        });
        after = repos.pageInfo.hasNextPage ? repos.pageInfo.endCursor : null;
    } while (after);
})();
