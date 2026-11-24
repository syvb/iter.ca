// Gets the iter.ca updates drafted or scheduled in Buttondown ready to send, for the Set up newsletter drafts workflow.
// It checks each one for what would keep it from being copied to iter.ca right once it's sent, and for broken links to
// iter.ca. Then it sets each one that passes to have its copy as its canonical URL, as regen does for a sent update once
// its copy is up, so its archive page on Buttondown redirects there from the start. It exits 1 if any has a problem,
// and leaves that one as it was. With CHECK_ONLY=true, it changes nothing.

const { PUBLIC_ARCHIVE, updateNumber, updateUrl } = require("./updates");

const API = "https://api.buttondown.email/v1";
const headers = { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}` };
const CHECK_ONLY = process.env.CHECK_ONLY === "true";

// A message on the workflow run's page (and in its log).
const annotate = (level, message) =>
    console.log(`::${level}::${message.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A")}`);

(async () => {
    const emails = [];
    for (let url = `${API}/emails`; url;) {
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`Buttondown couldn't list the emails: ${res.status}`);
        const page = await res.json();
        emails.push(...page.results.filter(email => email.status !== "deleted"));
        url = page.next;
    }
    const numbered = emails.filter(email => updateNumber(email.subject));
    const drafts = emails.filter(email => ["draft", "scheduled"].includes(email.status));
    let failed = false;
    for (const email of drafts) {
        const name = `"${email.subject}"`;
        const number = updateNumber(email.subject);
        const problems = [];
        if (!number) {
            if (!/^iter\.ca update\b/i.test(email.subject ?? "")) {
                console.log(`Skipped ${name}, which isn't an iter.ca update`);
                continue;
            }
            problems.push(`its subject doesn't start "iter.ca update #N", so it won't be copied to iter.ca`);
        } else {
            // Regen fails on two copied emails with one number.
            for (const other of numbered) {
                if (other !== email && updateNumber(other.subject) === number) {
                    problems.push(`"${other.subject}" (${other.status}) is #${number} too`);
                }
            }
            if (number > 1 && !numbered.some(other => updateNumber(other.subject) === number - 1)) {
                problems.push(`no email is #${number - 1}`);
            }
            if (!PUBLIC_ARCHIVE.includes(email.archival_mode)) {
                problems.push(`its archive is "${email.archival_mode}", not public, so it won't be copied to iter.ca`);
            }
            // what regen copies to iter.ca
            const res = await fetch(`${API}/emails/${email.id}/renders?target=html`, { headers });
            if (!res.ok) {
                problems.push(`Buttondown couldn't render it for the web (${res.status}), which regen needs to copy it`);
            } else {
                const links = new Set([...(await res.json()).content.matchAll(/\shref="(https:\/\/iter\.ca\/[^"]*)"/g)]
                    .map(match => match[1].replaceAll("&amp;", "&")));
                // its own copy is up once regen has copied it
                links.delete(updateUrl(number));
                for (const link of links) {
                    const res = await fetch(link, { method: "HEAD" }).catch(error => ({ status: error.message }));
                    if (!res.ok) problems.push(`its link to ${link} is broken (${res.status})`);
                }
            }
        }
        if (problems.length > 0) {
            failed = true;
            for (const problem of problems) annotate("error", `${name}: ${problem}`);
            continue;
        }
        const url = updateUrl(number);
        const after = `once it's sent, run Regen to copy it there sooner than its next daily run`;
        if (email.canonical_url === url) {
            annotate("notice", `${name} is ready, with ${url} as its canonical URL; ${after}`);
        } else if (CHECK_ONLY) {
            annotate("notice", `${name} is ready, but for its canonical URL, which would be set to ${url}`);
        } else {
            const res = await fetch(`${API}/emails/${email.id}`, {
                method: "PATCH",
                headers: { ...headers, "Content-Type": "application/json" },
                body: JSON.stringify({ canonical_url: url }),
            });
            if (res.ok) {
                annotate("notice", `${name} is ready: set its canonical URL to ${url}; ${after}`);
            } else {
                failed = true;
                // Buttondown says why, such as that the API key can only read emails
                annotate("error", `${name}: Buttondown couldn't set its canonical URL to ${url} (${res.status}: ${
                    (await res.text()).slice(0, 300)})`);
            }
        }
    }
    if (!drafts.some(email => /^iter\.ca update\b/i.test(email.subject ?? ""))) {
        annotate("notice", "There are no drafted or scheduled iter.ca updates");
    }
    process.exitCode = failed ? 1 : 0;
})();
