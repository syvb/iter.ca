+++
date = "2026-04-01T00:00:00Z"
description = "I tracked all my time for three years"
tags = ["ttw"]
title = "Tracking all my time, a retrospective"
+++

So several years ago I created a [time tracking system](https://github.com/syvb/ttw) that randomly pinged me and asked what I was doing at that moment, based on [TagTime](https://github.com/tagtime/TagTime). I used it from 2020 to 2023 and I don't think that it really delivered the benefits I was hoping for.

<!-- and I think I probably could have gotten most of the benefits with much less of the annoyance of having to randomly enter a few tags to describe what I’m doing. -->

A typical day would look something like this in my tagtime log (ignoring sleep):

```
1657713746 gh research                                [2022.07.13 05:02:26 WED]
1657720084 surfing yt                                 [2022.07.13 06:48:04 WED]
1657724783 music twitter prod                         [2022.07.13 08:06:23 WED]
1657725158 music gaming ethics                        [2022.07.13 08:12:38 WED]
1657727045 music research                             [2022.07.13 08:44:05 WED]
1657731187 afk walking food lunch                     [2022.07.13 09:53:07 WED]
1657735428 dis                                        [2022.07.13 11:03:48 WED]
1657741674 music twitter gaming prod                  [2022.07.13 12:47:54 WED]
1657741705 music twitter prod                         [2022.07.13 12:48:25 WED]
1657742489 music code codium belvi                    [2022.07.13 13:01:29 WED]
1657744316 music twitter prod                         [2022.07.13 13:31:56 WED]
1657750421 music research font                        [2022.07.13 15:13:41 WED]
1657751174 music dis                                  [2022.07.13 15:26:14 WED]
1657753452 afk food supper                            [2022.07.13 16:04:12 WED]
1657755435 afk food drink                             [2022.07.13 16:37:15 WED]
1657756622 music surfing                              [2022.07.13 16:57:02 WED]
1657757328 food snack surfing yt                      [2022.07.13 17:08:48 WED]
1657758308 music dis                                  [2022.07.13 17:25:08 WED]
1657762105 surfing wp                                 [2022.07.13 18:28:25 WED]
```

## Ontologies for time tracking data are hard

I never explicitly created an ontology for the tags to use for tracking my time, so it ended up growing to be kinda convoluted and hard to understand. My system let me enter whatever tags I wanted for a given ping, but I tried to be consistent with the past for data analysis. Having a weird ontology by itself isn't that bad when you use the system every day and understand it well, but I don't think I ended up tracking the things I actually cared about.

I think ultimately what I really cared about is "do I endorse this use of my time", and I didn't directly track that anywhere. Instead I ended up trying to infer it from what I was physically doing, so I ended up with rules like "YouTube (`yt`) is unproductive, unless I'm also eating food (`food`) at the same time". I should've just trusted myself to decide if I was using my time well or not and tracked that directly.

## I didn't actually do much data analysis

At first I thought I would be able to use all the data I collected to do cool data analyses and understand my life better. But I never really ended up using the time tracking data for much; it mostly just ended up sitting there. The one big thing I did use it for was a few [Beeminder](https://www.beeminder.com/) productivity goals which I think were actually pretty helpful to me! Mostly the goals were to limit unproductive time to under some daily limit. But I feel like my time tracking system was too much overhead for those goals; it probably would have been easier to just force myself to be productive by blocking time-wasters or making them inconvenient for me to use.

I think the main reason I didn't do too much data analysis is that the act of having to write down what I was doing at a given moment in the past made me aware of how I was spending my time; I got a pretty good appreciation for how much of my time I was wasting pretty quickly. I think that was probably the most valuable part of tracking my time! 

## AI?

We now have much more capable AI systems; could I use that to track my time better or get really good data analysis? I think really smart LLMs do have the potential to help here by letting me capture a lot more data and then extract a lot of information that would be useful for data analysis. I already track my heart rate, breathing rate, and location all the time using my smart watch/phone, maybe if I record my screen too and use an LLM to recursively summarize that data I could get really good insights? Not sure if this would be worth the effort.

I accidentally went to a VC/founders meetup yesterday[^a] and met someone whose startup was making a camera you would wear all the time and use Claude to summarize what you do and give you insights into it. This looked pretty cool but I had some privacy concerns with it, and also I happen to end up around people who wouldn't like our conversations being recorded often. They don't have a website but I took some pictures:

<details>
<summary>Pictures</summary>
<img src="/ext/PXL_20260401_021311254.RAW-01.COVER_pixelated.jpg" alt="someone wearing a bodycamera and holding a phone">
<img src="/ext/PXL_20260401_032801897.RAW-01.COVER.jpg" alt="Claude analyzing someone's time">
</details>

[^a]: It was at bar with a confusing layout that had multiple events at the same time.
