// Which Buttondown emails are iter.ca updates, which regen (buttondown.js) copies to iter.ca and the Set up newsletter
// drafts workflow (buttondown-drafts.js) gets ready to send: those whose subject starts "iter.ca update #N" and whose
// archive is public. Each one's copy is at updateUrl(N).
exports.UPDATE_SUBJECT = /^iter\.ca update #(\d+)\b/i;
exports.PUBLIC_ARCHIVE = ["enabled", "archive_only"];
exports.updateNumber = subject => {
    const number = subject?.match(exports.UPDATE_SUBJECT)?.[1];
    return number && Number(number);
};
exports.updateUrl = number => `https://iter.ca/update/${number}/`;
