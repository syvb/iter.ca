import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

let linkrefs = {
    [Deno.args[0]]: ["root"]
};

let queue = [Deno.args[0]];

function handleLinks(links: string[], origin: string) {
    links.forEach(link => {
        if (!link) return;
        link = new URL(link, origin).href;
        if (!link.startsWith("http")) return;
        const alreadyQueued = Boolean(linkrefs[link]);
        linkrefs[link] = linkrefs[link] || [];
        linkrefs[link].push(origin);
        // don't crawl out of initial origin
        if (!alreadyQueued && ((new URL(origin)).hostname.endsWith("smitop.com"))) {
            queue.push(link);
        }
    });
}

(async function main() {
    let cur = queue.pop();
    while (cur) {
        console.log("checking", cur);
        let res;
        try {
            res = await fetch(cur, {
                headers: {
                    "User-Agent": "debreak2/1.0 (debreak2@smitop.com)"
                }
            });
        } catch (e) {
            console.log("FETCH-FAILURE", cur);
            cur = queue.pop();
            continue;
        }
        if (res.status !== 200) {
            console.log("BAD-STATUS", cur, res.status, (await res.text()).replace(/\s/g, "").slice(0, 50));
            cur = queue.pop();
            continue;
        }
        const html = await res.text();
        let doc;
        try {
            doc = new DOMParser().parseFromString(html, "text/html")!;
        } catch (e) {
            cur = queue.pop();
            console.log("failed to get html for", cur);
            continue;
        }
        handleLinks([...doc.querySelectorAll("a[href]")].map(x => (x as any).attributes["href"]), cur);
        cur = queue.pop();
        await new Promise(resolve => setTimeout(() => resolve(undefined), 50));
    }
    console.log(JSON.stringify(linkrefs));
})();
