+++
date = "2026-04-03T00:00:00Z"
description = "how????!?"
tags = ["programming"]
title = "How the Claude Mythos leak happened"
+++

Last week Anthropic [had a CMS problem that exposed](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/) a draft blog post about a future model release, but the specifics about how the leak happened weren't published. The Fortune article says it got the post from Roy Paz and Alexandre Pauwels, and there is a [archived copy of the leak by M1Astra](https://m1astra-mythos.pages.dev) that has some clues about the origin, and I figured out what happened by doing some investigation after I saw the leak. (I did most of this because I was interested in verifying if the leak was real or not.)

## Anthropic's CMS

[Anthropic's website](https://www.anthropic.com/) has a lot of content in it; they use [Sanity.io](https://sanity.io) (a headless CMS) as a backend component to manage the content on their website. The pages themselves are rendered server-side; presumably they use a backend server which fetches content from Sanity and slots it into page templates.

The easiest way to tell the website uses Sanity is from the images which are hosted on URLs like `https://www-cdn.anthropic.com/images/4zrzovbb/website/87fb2c684ff3d95b4fa9edf208af33f467a8af5b-1000x1000.svg`; `www-cdn.anthropic.com` is basically a proxy to `cdn.sanity.io` that only allows fetching images from Anthropic's website. From that URL we can learn that the project ID for Anthropic's website is `4zrzovbb`.

You also could have figured out that they use Sanity by looking at the source code on M1Astra's copy of the post, which contains a GROQ query that fetches a document with ID `featureMythos`:

```js
const V1 = "{\r\n  \"query\": \"*[_id == \\\"featureMythos\\\"][0]\",\r\n  \"result\": {\r\n    \"_createdAt [...]
```

I saw this and figured the problem was probably something to do with the Sanity API.

## Sanity's API

By default Sanity allows unauthenticated access to read all the published content in a project through the API, so you can have your frontend dynamically fetch content from the CMS. Anthropic doesn't use this functionality though; the anthropic.com frontend never makes client-side API requests to the CMS.

I asked Claude to try making requests to the Sanity API endpoints under `https://4zrzovbb.apicdn.sanity.io/v2021-10-21/data/query/website` and it was able to fetch the underlying CMS content shown on Anthropic's website because Anthropic hadn't turned off unauthenticated read access. There's also a WebSockets endpoint that lets you stream all the changes in the CMS.

So I think what happened is that Anthropic published some content in the CMS but didn't add the relevant logic in the backend server to generate pages that use that CMS content, and someone who was monitoring the Sanity.io API (possibly through the WebSockets endpoint to see all changes?) saw the new article content. Interestingly, the article was created and last edited on March 13, but the leak didn't happen until March 26.

## Seeing deleted articles

I tried fetching the leaked article from the API at `/data/history/website/documents/featureMythos` and it failed because the article didn't exist. Presumably Anthropic deleted the article after they learned about the leak.

But it turns out Sanity always keeps article revisions for the project-wide retention period (defaults to 1 year for enterprise projects), and you can fetch the article content at a given revision ID or timestamp by setting `?revision=[id]` or `?time=[timestamp]` on API requests. Thus I was able to read the contents of the leaked article even after Anthropic thought they fixed it. Apparently you can't disable this behavior, [the docs say](https://www.sanity.io/docs/http-reference/history#getrevision):

> Current Access Control means if you're able to access the document today, you'll be able to access all the previous revisions of the document.

So anyone could read all revisions of all posts in Anthropic's CMS. I emailed Anthropic about this and they fixed it pretty quickly by disabling all unauthenticated access through the Sanity API. I told them about it March 26 at 10pm; they responded 9 minutes later and fixed it by the time I woke up next morning. If you use Sanity.io as a CMS it might be worth ensuring you either don't publish content you don't want public or disabling unauthenticated public access.
