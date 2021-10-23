const fetch = require("node-fetch");
const fs = require("fs");

const TOKEN = fs.readFileSync("tokens/itch.txt", "utf-8").trim();

(async () => {
    const res = await (await fetch(`https://itch.io/api/1/${TOKEN}/my-games`)).json();
    res.games.forEach(game => {
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
