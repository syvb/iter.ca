+++
date = "2026-11-15T10:30:35-08:00"
description = "One-click UXSS issue with uBlock Origin on Firefox through element picker"
tags = ["security", "programming"]
title = "Universal XSS in uBlock Origin from website-driven element picker"
bsky = "https://bsky.app/profile/iter.ca/post/3n2epijpcm22r"
+++

Earlier this month I found a one-click universal XSS issue with uBlock Origin (the MV2 Firefox version, although a similar but less problematic issue also affected the MV3 version, uBO Lite), where a malicious website could trick the extension into adding arbitrary trusted filters. Trusted filters can inject JavaScript code into pages, and so the malicious website could create a trusted filter on another website and run arbitrary JS in the context of any site. This issue is fixed now; you can read [the GitHub advisory](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2) for some more details.

GPT-5.6 Sol did most of the hard work of finding the issue. I figured there might be some kind of UXSS from filter injection, so I asked it to take a look, and it found the issue. I then checked and verified the issue it proposed. I wrote all of the prose in this post myself; Claude wrote most of the code for the PoC.


## The issue

uBlock Origin has an element picker that you can pull up by right-clicking on the page. You can use this to create a filter rule to block an element on the page without leaving the page.

![uBO element picker](/ubo-epicker.png)

The element picker is implemented by injecting an iframe to a URL like `moz-extension://76b2331a-894c-4d25-8b89-fcce37e79cc4/web_accessible_resources/epicker-ui.html`. That page can talk to the extension background script and tell it to add filters.

Basically the attack here is:
1. Figure out the element picker URL
2. Create our own invisible (opacity 0) iframe that embeds it
3. Drive the picker to put the filter we want in it
4. Position the invisible iframe to trick the user into pressing the invisible "Create" button

### Figuring out the element picker URL

On Firefox, the only information we needed to figure out was the extension internal UUID which is random per-installation. 

On the default setup uBO has a `lootdest.*##+js(no-fetch-if, adsbygoogle, war:googlesyndication_adsbygoogle.js)` filter rule (from uAssets), which hooks `fetch`. From inside the `fetch` hook, it makes an XHR request to `moz-extension://<extension UUID>/web_accessible_resources/googlesyndication_adsbygoogle.js` and returns the response from that as the fetch body, instead of actually making the request. The filter rule is intended to replace a network request for JS from an ad server with a dummy script that has the correct API but doesn't do anything.

But the attacker website can itself hook the XHR made from inside the `no-fetch-if` hook to extract the random extension UUID.

```js
const origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(m, url, ...a) {
    const e = /^moz-extension:\/\/[^/]+/.exec(url);
    if (e) {
        e[0] // <- has the extension UUID!
    }
    return origOpen.call(this, m, url, ...a);
};
```

Then the attacker website can run `fetch('/adsbygoogle.js').catch(() => {});` to trigger the filter, and make their hooked XHR run. Note that there are several ways that the extension internal UUID could be leaked; it's not just this one filter rule.


### Creating an iframe

Then you can use that to iframe the element picker. Given an iframe element in the page, you just set its src to `` `moz-extension://${origin}/web_accessible_resources/epicker-ui.html` ``.

### Sending messages to it

Now we can drive the element picker. We can create a MessageChannel and do `iframe.contentWindow.postMessage({ what: 'epickerStart' }, '*', [ch.port2]);` to send it to the picker iframe. Then we talk to it: it sends us a `start` message, we send it a `showDialog` message with a filter and a `resultsetDetails` message[^rsd] to enable the create button and set `opt`.

[^rsd]: Originally I sent that message in reply to a `dialogSetFilter` message from the picker, but it turns out you can just send it right away instead of waiting to reply.

Normally the picker restricts what filters you can enter, and doesn't let you add scriptlet filters. But there's a trick we can do to add arbitrary filters. There's an `opt` field we set in the second message which is normally the type of network request to match (like `image`), and gets appended to the filter with a `$` if set, like `$image`. But since we control it, we can put a newline in it and make it `"image\ngoogle.com##+js(trusted-rpnt, script, ...)"` to inject an arbitrary trusted filter that injects a script.[^amfn]

[^amfn]: Assuming the shown filter is a network filter.

This is where the main issue is - the element picker shouldn't accept messages from the attacker. One of the fixes was having a secret password that the real element picker gets from the content script, that the element picker sends in the initial postMessage.

### Getting the click

I didn't bother actually implementing this, but malicious websites could overlay stuff on top of the embedded element picker or make it invisible by setting the iframe opacity to 0. So as long as the website can get the user to click on the page, it can add arbitrary trusted filters for arbitrary domains.

Filters added by the element picker are always treated as trusted (at least until a recompile), which is why it can add a trusted filter. If the user later changes their custom filters it would cause a recompile, clearing the filter trust. But in practice the attacker could just immediately open the victim webpage, so this doesn't help much.
