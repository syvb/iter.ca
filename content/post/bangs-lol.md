+++
date = "2022-12-235T00:00:00Z"
description = "Using service workers to evaluate !bangs before they hit a server"
tags = ["programming", "search"]
title = "Evaluating !bangs faster with Service Workers"
draft = true
+++

[DuckDuckGo](https://duckduckgo.com/) has [a neat feature](https://duckduckgo.com/bang) wherein you can search for "cute cats !g", and it will automatically redirect you to a Google search for cats. There are [lots of bangs available](https://duckduckgo.com/bang#bangs-list), which makes it pretty useful when searching for things.

!bangs have some drawbacks over searching directly with the ultimate search provider though:
- The DuckDuckGo server can see the contents of search
- The search is slower since it needs to go through DuckDuckGo's servers

Can we do better? Yes! The [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker) allows us to run a JS-based worker that essentially functions as a proxy between all pages that try to connect to the server. We can intercept requests locally and respond with a redirect before the request is sent to the server. DuckDuckGo could use a ServiceWorker to intercerpt searches with !bangs client-side, and redirect them directly to their ultimate location.

I wrote [a demo](https://bangs.lol) of how such a system could be implemented.

If you want to try out my demo, [go try it out](https://bangs.lol/) for instructions to try it out with your browser. It would be neat if DuckDuckGo used a Service Worker on their search endpoint to obviate the need for this though!
