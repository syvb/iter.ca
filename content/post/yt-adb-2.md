+++
date = "2026-09-21T00:00:00Z"
description = "fun adblock filter rules!"
tags = ["programming", "youtube"]
title = "Patching protobufs poetically"
+++

Last year I wrote about [ad-blocking on YouTube](https://iter.ca/post/yt-adblock/) by modifying network requests. Since then the original filter stopped working, and it's been changed several times. Today I'm going to write about a uBlock Origin filter rule that doesn't work anymore, but was pretty fun to implement.

## the main filter

The filter (split over multiple lines for readability, but actual one is a single line):

```adb
www.youtube.com##+js(
    trusted-replace-outbound-text,
    JSON.stringify,
    "params":",
    "params":"yAEB,
    condition,
    /("contentPlaybackContext":{".*\,"params":"|"params":".*"contentPlaybackContext":{")/
)
```

This hooks the `JSON.stringify` global function to replace the string `"params":"` in the output with `"params":"yAEB` if the regex matches. The regex matches when the output from JSON.stringify is a JSON object that contains a `contentPlaybackContext` key and a `params` key.

## why this works

So when you click on a video on YouTube, the client makes a POST request to `www.youtube.com/youtubei/v1/player` to load data for that video and update the page. (I explain this more in [my last post](https://iter.ca/post/yt-adblock/)). We want to make it so we don't get served any ads, and we can do that by modifying the body that gets POSTed to that endpoint. The body is a JSON object that gets stringified before being sent, so we can modify the POST body before it gets sent. I avoid messing with requests that aren't to the player endpoint with the regex that looks for a `contentPlaybackContext` field.

`params` is a field in the JSON object in the player request, which contains a base64-encoded protocol buffer (protobuf). You can kinda read the data in a protobuf without knowing the schema: the protobuf wire format is mostly a mapping of field IDs to values, and you can look at the data even if you don't know what the field IDs mean. I used [this website](https://protobuf-decoder.netlify.app) to inspect protobufs, but there are several options. I looked at a bunch of requests and found that player requests from the inline player[^ip] had field 25 set to 1. So I tried manually setting field 25 to 1 (probably a boolean field, where 1 is true) in the params field on normal player requests and saw that I didn't get served any ads!

[^ip]: a YouTube feature where it shows you a video preview when you hover over a video on the homepage or watch next feed

The protobuf wire format has the nice property that you can append two protocol buffers together and get a valid protocol buffer. (If there are duplicate scalar fields the earlier one is ignored.) Base64 has the property that you can prepend one base64 string to another base64 string, as long as the earlier doesn't have padding (the `=` at the end when the data isn't a multiple of 3 bytes).

So we can make a protobuf message that sets field 25 to 1 and base64 encode it (this gives `yAEB`), and then prepend it to the params field to ensure requests we send don't get ads!

## why do it this way

Mostly because it's simple and doesn't interfere with anything else. Doing string surgery is messy, but avoiding it would have involved injecting custom JavaScript into the page to intercept and rewrite JSON.stringify calls, which seemed like it would have been more messy to me. Newer uBlock Origin extensions have a `trusted-json-edit-xhr-request` scriptlet that removes the need for this specific trick.

This also has the nice property of being idempotent; since the protobuf wire format allows duplicate fields and just ignores earlier ones, it's fine if the filter gets run multiple times if it's in multiple sources or multiple extensions try to do this. (Although using multiple adblocking extensions is bad and not supported.)


## other stuff

Not all requests have a `params` field, so there was actually a second very similar filter rule that handled that case as well. 
