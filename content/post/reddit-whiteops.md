+++
date = "2020-07-08T05:00:00+00:00"
description = "But hey, at least Reddit gets less ad fraud!"
tags = ["internet", "whiteops", "reddit"]
title = "Reddit's website uses DRM for fingerprinting"
image = "/reddit-drm.png"
image_alt = "Reddit asking for permission to use DRM"
+++

Recently, I was using a page on Reddit (i.e. the main redesign domain, not [old.reddit.com](https://old.reddit.com)), when I saw a yellow bar from Firefox:

![Reddit asking for permission to use DRM](/reddit-drm.png)

Why did Reddit want to use DRM? This pop-up was appearing on all pages, even on pages with no audio or video. To find out, I did a bunch of source code analysis and found out.

Reddit's source code uses bundling and minification, but I was able to infer that in `./src/reddit/index.tsx`, a script was conditionally loaded into the page. If the `show_white_ops` A/B test flag was set, then it loaded another script: https://s.udkcrj.com/ag/386183/clear.js. That script loads https://s.udkcrj.com/2/4.71.0/main.js (although it appears to test for a browser bug involving running JSON.parse with null bytes, and sometimes loads https://s.udkcrj.com/2/4.71.0/JSON-main.js instead, but I haven't analyzed this file (it looks fairly similar though), and also does nothing if due to *another* browser bug, `!("a" == "a"[0])` evaluates to true).

The purpose of all of this appears to be both fingerprinting and preventing ad fraud. I've determined that `udkcrj.com` belongs to [White Ops](https://www.whiteops.com/). (edit: they have recently rebranded to HUMAN) I have infered this from the name of Reddit's feature flag, and mentions of  White Ops which is a "global leader in bot mitigation, bot prevention, and fraud protection". They appear to do this by collecting **tons** of data about the browser, and analyzing it. I must say, their system is quite impressive.

Back to the DRM issue, it appears that the script is checking what DRM solutions are available, but not actually using them. However, just checking is enough to trigger Firefox into displaying the DRM popup. Specfically, it looks for Widevine, PlayReady, Clearkey, and Adobe Primetime.

`main.js` does a bunch of other interesting things, but there's so many that I've written [a whole seperate blog post](/post/whiteops-data/) about all of the ones I found. Here are some highlights:
- Contains what appears to be a Javascript engine JIT exploit/bug, `"haha jit go brrrrr"` appears in a part of the code that appears to be doing something weird with math operations.
- Has an obfuscated reference to `res://ieframe.dll/acr.js`, which can be used to exploit old Internet Explorer versions (I think)
- Many checks for various global variables and other indicators of headless and automated browsers.
- Sends data to `vprza.com` and `minkatu.com`.
- Checks if devtools is open
- Detects installed text to speech voices
- Checks if browsers have floating point errors when rounding 0.49999999999999994 and 2^52
- Detects if some Chrome extensions are installed
- Checks if function bodies that are implemented in the browser contain `[native code]` when stringified
  - it get's kinda meta, it checks if `toString` *itself* is implemented in native code (although it doesn't go any levels deeper than data)
- Checks for Apple Pay support

Weird. Thanks for reading.
