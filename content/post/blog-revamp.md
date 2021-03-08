+++
date = "2020-06-16T04:00:00+00:00"
description = "How I improved this blog a bunch."
tags = ["meta", "hugo"]
title = "How I improved this blog"

+++

I've recently made many improvements to this blog. This post will go into those changes, and how I implemented them.

## Merging smitop.com and blog.smitop.com
Before these changes, I had two sites: smitop.com and blog.smitop.com. smitop.com was a pure static site, and blog.smitop.com was a static site generated with [Hugo](https://gohugo.io/). Now, it's just one site, smitop.com, generated with Hugo. All of the static content is in Hugo's `static` directory. I use [Cloudflare Workers](https://workers.cloudflare.com/). Here's the worker script I use to redirect requests to the old blog.smitop.com domain to smitop.com. Since the URL structure for blog posts is the same, we just do a 301 redirect to the root domain with the same path:
```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

const ROOT = "https://smitop.com";

async function handleRequest(request) {
  try {
    const urlObj = new URL(request.url);
    return new Response("", {status: 301, headers: {location: ROOT + urlObj.pathname}});
  } catch (e) {
    return new Response("", {status: 301, headers: {location: ROOT}});
  }
}
```

There's probably a way to do this without using Workers, but I decided to use Workers since they seem cool.

## Styling
My blog has gone from almost completely unstyled, to fairly consistent styling. I use the [Barlow](https://fonts.google.com/specimen/Barlow) font for headings, and [Mukta Vaani](https://fonts.google.com/specimen/Mukta+Vaani) for everything else. I use a custom Hugo theme I wrote just for this blog to give me complete control.

## Deploys
While this hasn't changed, I use [Travis CI](https://travis-ci.com/) builds commits to `master`, and deploys them to [Surge](https://surge.sh/).

## Open source
It's open source now! I actually have two repos for this blog, [a public one](https://github.com/Smittyvb/smitop.com) and a private one. The private one contains my unpublished blog posts and some other non-public things. I use GitHub Actions to sync the two repos automatically.
