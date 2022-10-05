const fs = require("fs");
const { execSync } = require("child_process");
const nodemailer = require("nodemailer");

const now = Date.now() + 86400000 * 2;

function getDates(path, text) {
    console.error(path);
    return text.split(" ")
        .filter(word => word.startsWith("check:"))
        .map(date => new Date(date.split(":")[1]))
        .filter(date => date.valueOf() <= now)
        .map(date => `- \`${path.slice(2)}\` should be checked at ${date.toLocaleDateString("en-CA")}`);
}

const files = [].concat.apply([], execSync("find -type f")
    .toString("utf8")
    .trim()
    .split("\n")
    .filter(line => !line.startsWith("./.git/") && !line.startsWith("./ci/"))
    .map(path => getDates(path, fs.readFileSync(path, "utf-8"))))
    .join("\n");

const today = new Date;
const tom = new Date;
tom.setDate(tom.getDate() + 1);

function getNotes(date) {
    try {
        return fs.readFileSync(`self/days/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}.md`).toString("utf-8").trim()
    } catch (e) { return "none"; }
}

const email =
`Good morning!

Notes for today:
${getNotes(today)}

Notes for tommorrow:
${getNotes(tom)}

Stale checks:
${files}`;
console.log(email);

const trans = nodemailer.createTransport({
  host: "box.smitop.com",
  port: 465,
  secure: true,
  auth: {
    user: "bot@smitop.com",
    pass: process.env.BOT_PW.trim(),
  },
});
trans.sendMail({from:"bot@smitop.com",to:"me@smitop.com",subject:"Daily email",text:email}, console.log);
