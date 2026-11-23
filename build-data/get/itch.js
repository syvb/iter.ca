process.env.TZ = "Etc/Utc"; // don't have date differences on CI

const fs = require("fs");

const TOKEN = fs.readFileSync("tokens/itch.txt", "utf-8").trim();

async function getGames() {
    const res = await fetch(`https://itch.io/api/1/${TOKEN}/my-games`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!Array.isArray(body.games)) throw new Error(`no games, errors ${JSON.stringify(body.errors)}`);
    return body.games;
}

(async () => {
    // itch.io sometimes serves an HTML page instead of JSON for a while, so retry once, then keep the last regen's games
    const games = await getGames().catch(async err => {
        console.error(`Itch: ${err.message}, retrying in 30 seconds`);
        await new Promise(resolve => setTimeout(resolve, 30000));
        return getGames();
    }).catch(err => {
        // a workflow command is one line, and a JSON error quotes the start of the page
        console.error(`::warning::Itch: ${err.message.replace(/\n/g, " ")}, keeping the games from data/data.json`);
    });
    if (!games) {
        JSON.parse(fs.readFileSync("../../data/data.json", "utf-8"))
            .filter(item => item.Type === "itch")
            .forEach(item => console.log(JSON.stringify(item)));
        return;
    }
    games.forEach(game => {
        if (!game.published) return;
        console.log(JSON.stringify({
            Type: "itch",
            ItchType: game.classification,
            Id: `itch-${game.id}`,
            Text: game.short_text,
            Thumb: game.cover_url,
            Date: { Unix: (new Date(game.published_at)).valueOf() / 1000 },
            Uri: game.url,
            Title: game.title
        }));
    });
})();
