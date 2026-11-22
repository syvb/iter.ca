// The rest of a tag after its name, to its end: its attributes, whose quoted values can have a ">" in them, as the alt
// texts of LessWrong's images do.
const ATTRS = String.raw`(?:[^>"']|"[^"]*"|'[^']*')*>`;
// A tag that starts or ends a block of text. LessWrong splits words across other tags, so only these become spaces.
const BLOCK_TAG = new RegExp(`</?(?:${[
    "address", "article", "aside", "blockquote", "br", "dd", "details", "div", "dl", "dt", "figcaption", "figure",
    "h[1-6]", "hr", "li", "ol", "p", "pre", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "tr",
    "ul",
].join("|")})\\b${ATTRS}`, "gi");
const FORMULA = new RegExp(String.raw`<mjx-container\b(${ATTRS})[\s\S]*?</mjx-container>`, "g");

// The text of HTML, such as a LessWrong post's, still with its HTML entities, which the search index decodes. A formula
// is its TeX source between $s, since MathJax draws it from CSS (in a <style> in the post) and leaves no text.
// Attributes, such as an image's alt text, aren't text.
module.exports = function plainText(html) {
    return html
        .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
        .replace(FORMULA, (formula, attrs) => {
            const tex = attrs.match(/\saria-label="([^"]*)"/);
            return tex ? ` $${tex[1]}$ ` : " ";
        })
        .replace(BLOCK_TAG, " ")
        .replace(new RegExp(`<${ATTRS}`, "g"), "")
        .replace(/\s+/g, " ")
        .trim();
};
