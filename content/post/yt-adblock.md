+++
date = "2025-06-20T00:00:00Z"
description = "How I wrote filter rules for YouTube"
tags = ["programming", "youtube"]
title = "YouTube’s new anti-adblock measures"
+++

Over the past few months, YouTube has been trying another round of anti-adblock measures. Currently the anti-adblock stuff is being A/B tested, and one of my accounts is in the experimental group. I wrote a filter that partially avoids one of the anti-adblock measures, fake buffering, on uBlock Origin (and Brave browser, since it uses the same filter rules). (It's already in the default filter lists, you don't need to manually add the filter.)

One thing that people have ran into is "fake buffering", where videos will take a while to load due to a lot of buffering, but only at the very start of the video (there's no mid-video fake buffering). As I'll explain, the fake buffering is 80% of the length of the ads you would've seen, so even with fake buffering you're still saving time using an adblocker.

## Context

InnerTube is YouTube’s first party internal API that the web client and mobile apps use to interact with videos and get details about them. InnerTube endpoints look like `https://www.youtube.com/youtubei/`. One of those endpoints is `/youtubei/v1/player`, which the web client calls when you click on a video to get data about the URL and GVS stream URLs.

GVS (Google Video Services) is a service that serves video streams for YouTube, Google Drive, and Google Photos. To stream a video from GVS, you need to get a GVS `/videoplayback` URL from InnerTube (or the Drive/Photos internal API). GVS URLs are signed and have an expiry time (usually 6 hours), so you can’t construct them on your own, you need to get one from InnerTube. One weird thing about GVS is that it isn’t only hosted from Google’s data center: ISPs can put [Google Global Cache](https://support.google.com/interconnect/answer/9058809) servers in their infrastructure so that they can serve YouTube videos without needing to send traffic outside the ISP’s network (only public/unlisted YouTube videos are served by GGC; private YT videos and Drive/Photos videos are always served from Google data centers). GVS URLs look like `https://rr1---sn-gvbxgn-tt1e6.googlevideo.com/videoplayback?expire=1750321185&...` (but with a lot more query parameters).

Originally the web client streamed video by just using some query parameters to the GVS URL to specify what range of video it wanted, and GVS responded with the video contents for that range. But for complicated reasons, YouTube decided to improve on this with SABR (Server ABR (Adaptive Bit Rate)), which is YouTube’s proprietary binary protocol for streaming video data, which is better at avoiding buffering than today’s open formats (e.g. MPEG-DASH). One thing that SABR supports is the server sending a backoff to the client, instructing the client to wait some amount of time before trying again instead of sending video/audio data.

## The source of fake buffering

What’s happening is that InnerTube is providing GVS streams that will give a backoff of 80% of the ad duration for ads for the first `/videoplayback` request (for the content video, not the ads), so for example if the ad is 15 seconds you’ll get 12 seconds of backoff when blocking ads. If you have an unskippable 6 second ad AND a 15 second unskippable ad together the backoff will be 16.8 seconds. To be clear this isn’t server-side ad insertion; the ad and content streams are still separate (YouTube *is* doing a server-side ad insertion experiment, but that’s separate from fake buffering). The “Experiencing interruptions” dialogs are likely triggered by long backoffs from GVS.

This backoff *always* happen if you're in the A/B test, regardless of if YouTube thinks you're using an adblocker. You just don't notice it if you're not blocking ads, because the web client starts loading the content video while the ad plays, so the only difference for non-ad-blocking users is that the content video doesn't start buffering until the ad is 80% over.

I’ve seen claims online that YouTube is “DAMAGING Computers By SPIKING CPU Usage If You Use Ad Block”. This is completely false; YouTube doesn’t use CPU usage waiting for the backoff to expire (and even if they used a spinloop to implement the wait, maxing a single core for \<30 seconds won’t damage any CPU).

## Become unadvertisable

How can you avoid getting backoffed until the unskippable ad is over? Don’t get served an ad in the first place. If you set the <code>playbackContext.<wbr>contentPlaybackContext.<wbr>isInlinePlaybackNoAd</code> property in player requests to true, InnerTube won’t serve you any ads and thus won’t include any backoff in the GVS streams.

We can write a filter rule that makes it so whenever the web client stringifies JSON bound for a server request, we add `"isInlinePlaybackNoAd":true` to the stringified JSON.

```adb
www.youtube.com##+js(trusted-replace-outbound-text, JSON.stringify, 'contentPlaybackContext":{', 'contentPlaybackContext":{"isInlinePlaybackNoAd":true,', condition, 'contentPlaybackContext')
```

How did I know to set that property? It’s referenced in the frontend JavaScript, so I could have spent a bunch of time reading all that. But there’s an easier way \- while the web client interacts with InnerTube using JSON, that JSON API is actually generated from a Protocol Buffers definition, and there’s a way you can extract most of the underlying protobuf definition. I used [req2proto](https://github.com/ddd/req2proto), which is a tool to extract protobuf definitions from Google’s internal APIs to get the full definitions used in the `/youtubei/v1/player` call, and used that to find the `isInlinePlaybackNoAd` property.

This method only works for warm navigation, where you’ve already loaded the YouTube single page app and are clicking around within it. When you navigate directly to a watch page, the YouTube backend embeds a player response directly into the page as `ytInitialPlayerResponse`. Since the player request is made on the backend, we can’t set `isInlinePlaybackNoAd` on it.  One way to fix this for cold loads is to just remove that initial data to force YouTube to make a player request we can control (but see below before using these):

```adb
www.youtube.com##+js(set, ytInitialData, undefined) ! bad idea, see below
www.youtube.com##+js(set, ytInitialPlayerResponse, undefined) ! bad idea!
```

This approach has some problems though, so you might not want to use it:

* It completely breaks livestreams, and probably some other things I haven’t tested  
* It causes the video player to briefly flash  
* It slows the page loading time

## Bypassing the locker script

So that filter kinda worked, but sometimes uBlock Origin wasn’t hooking `JSON.stringify`. I investigated further and it turns out YouTube is running an A/B test where sometimes they add this to the frontend HTML as the very first thing in the `<head>` tag:  
```html
<script id="bc-def" nonce="[variable]">'use strict';function a(b,c){try{Object.defineProperty(b,c,{writable:!1,configurable:!1})}catch(d){}}a(window,"fetch");a(window,"JSON");a(window.JSON,"stringify");a(window.JSON,"parse");a(window,"Array");a(Array.prototype,"push");a(Array.prototype,"forEach");try{const b=document.getElementById("bc-def");b&&b.remove()}catch(b){};
</script>
```

This locks a few global objects by using `Object.defineProperty` to set them as non-writable, which prevents later code from overwriting them with a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that alters their behaviour. So uBlock Origin can only proxy JSON.stringify if it can run before this locker script does. On Firefox this is easily resolvable \- you can use a [HTML filter](https://github.com/gorhill/ublock/wiki/static-filter-syntax#html-filters) to filter out the script tag from the source HTML before the page even starts being parsed. But that relies on extension APIs that Chromium doesn’t support.

The “fix” for the locker script so far is to hook `Object.assign` instead of `JSON.stringify`. `Object.assign` is another function that handles the request body before it gets fetched. It would be nice if there was a way to actually defuse the locker script, instead of working around it. The version of the filter that hooks `Object.assign` instead is more complicated because uBO's scriptlets don't let you replace text on a key of an object, so the filter in uBO's filter list injects this JS:

```js
(() => {
    const e = {
        apply: (e, n, arguments) => {
            let t = Reflect.apply(e, n, arguments);
            return 3 === arguments.length && t?.body && "string" == typeof t.body && !t.body.includes(`"isInlinePlaybackNoAd":true`) && (t.body = t.body.replace(`"contentPlaybackContext":{`, `"contentPlaybackContext":{"isInlinePlaybackNoAd":true,`)), t
        }
    };
    window.Object.assign = new Proxy(window.Object.assign, e)
})();
```

Thanks to the [uAssets](https://github.com/uBlockOrigin/uAssets/) maintainers for helping with that.

## Useful resources

- [Information about GVS playback URLs](https://tyrrrz.me/blog/reverse-engineering-youtube-revisited)  
- [Blog post with some details about YT internals](https://brutecat.com/articles/youtube-creator-emails) 

If you have any questions for me you can DM me on Discord as `@moreloops`.
