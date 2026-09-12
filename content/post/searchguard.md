+++
date = "2026-01-01T00:00:00Z"
description = "Breaking all of the safety in Rust"
tags = ["programming", "google"]
title = "What SearchGuard is"
+++

So Google [sued](https://storage.courtlistener.com/recap/gov.uscourts.cand.461513/gov.uscourts.cand.461513.1.0.pdf) ([full docket](https://www.courtlistener.com/docket/72059948/google-llc-v-serpapi-llc/)) [SerpApi](https://serpapi.com/) (a company that scrapes Google search results). That lawsuit describes "a technological measure, known as SearchGuard, that restricts access to its search results pages" to prevent scrapers, which SerpApi circumvents to scrape search results.

This is an interesting case, because US courts have previously ruled that scraping public data is legal – in [*hiQ Labs v. LinkedIn
*](https://en.wikipedia.org/wiki/HiQ_Labs_v._LinkedIn) it was found that scraping LinkedIn's public profiles is illegal. So Google has come up with a novel legal theory for how SerpApi's scraping is illegal. Basically their argument is:

1. Google licenses some copyrighted images to display in some of their knowledge panels. For example, if you search "Willie Mays" then at the top you see an image Google licensed from Getty Images. Most of the content in search result pages isn't licensed to Google (Google's usage of website content is generally fair use), but they do have some licensed images in the search results pages.
2. SearchGuard is a technological protection measure (TPM), which is the term US copyright law uses for [DRM](https://en.wikipedia.org/wiki/Digital_rights_management) systems, because it controls accessed to those licensed images so that only non-scrapers can access them.
3. SerpApi is circumventing SearchGuard (because they manage to successfully scrape Google results).
4. It's usually illegal to circumvent TPMs in the US.

This is a really interesting legal argument! IMO the key questions it raises are:

- A TPM has to restrict access to copyrighted content. But Google results are available to the general public, without authentication, for free. It seems like a stretch to say that SearchGuard is restricting access to SERPs.
- If we assume that SearchGuard restricts access to search results, does it still count as a TPM? This is pretty fact-specific, so I analyze what it does below.

Google's argument doesn't seem great to me – <!--[^emda]-->the TPM argument seems like a stretch. (although they might provide more information in the future that would change my mind).

<!-- [^emda]: I wrote this emdash by hand, I'm not an LLM. -->

## What does SearchGuard actually do?

Google hypes up SearchGuard in the lawsuit, saying it's "the product of tens of thousands of person hours and millions of dollars of investment". But I think Google is including all of costs of making BotGuard in that claim. SearchGuard doesn't seem to be much beyond a simple application of BotGuard to search result pages. Unfortunately Google didn't clarify this in the lawsuit.

<!--

SerpApi [doesn't think it's been sued though?](https://searchengineland.com/google-sues-serpapi-466541)

> SerpApi has not been served with Google’s complaint, and prior to filing, Google did not contact us to raise any concerns or explore a constructive resolution.

This is because in California you file with the court, get a summons, *then* serve the defendant with that summons once the judge issues it.

-->