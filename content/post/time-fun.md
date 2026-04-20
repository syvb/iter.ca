+++
date = "2026-04-19T00:00:00Z"
description = "Every hour of my time in 2021"
tags = ["life"]
title = "How I spent my time in 2021"
+++

Yesterday I saw fellow Inkhavener Nicky's [post about what she did on one day of her childhood](https://blog.sus.cat/p/i-will-waste-my-childhood-and-i-will). I *also* tracked how I spent my time as a child, but instead of for one day, [tracked what I was doing every ~45 minutes](https://iter.ca/post/tt-retro/) (sampled at random seconds, where each second had a 1 in 2700 chance of being sampled) from July 2020 to May 2023 (ages 15-18), with 33,235 data points in total. So I'm going to go bigger and give you a much more detailed breakdown of how I spent my time in 2021 specifically, when I was 16 years old for most of the year. I had Claude do most of the annoying data analysis work since there was so much data here.

In the underlying data, I tracked my time by assigning each ping a set of free-form tags. Here, I've assigned each ping to a general category by using a bag of heuristics about what the most "relevant" thing is. This does end up abstracting away some interesting details about the data: e.g. I often watched YouTube while eating food, and in the graphs in this post it just gets treated as "Eating" time.

## Graphs

First, here are some cool graphs Claude made (a sunburst chart and a stacked bar chart):

{{< rawhtml >}}
<style>
.tt-breakout {
  width: min(100vw, 1280px);
  max-width: 100vw;
  margin-left: calc((100% - min(100vw, 1280px)) / 2);
}
.tt-embed { width: 100%; border: 0; display: block; margin: 1em 0; }
</style>
<div class="tt-breakout">
  <iframe class="tt-embed" src="tagtime-2021-sunburst-v3.html" style="height: 760px;" loading="lazy" title="Sunburst of 2021 time categories"></iframe>
  <iframe class="tt-embed" src="tagtime-2021-monthly-v3.html" style="height: 620px;" loading="lazy" title="Monthly time breakdown for 2021"></iframe>
</div>
<script>
addEventListener("message", e => {
  if (!e.data || typeof e.data.ttH !== "number") return;
  for (const f of document.querySelectorAll("iframe.tt-embed")) {
    if (f.contentWindow === e.source) f.style.height = (e.data.ttH + 4) + "px";
  }
});
</script>
{{< /rawhtml >}}

## School
I only spent 1-2 hours per day doing high school on average. This was during the Covid lockdowns, so I did most of my learning remotely. My school work wasn't difficult, so I was able to get most of my assignments done pretty quickly. There were still some synchronous activities I did (e.g. lessons over video calls), but I was mostly able to not pay a lot of attention during them and focus on other stuff.

I'm pretty glad I was able to spend as little time as I did on high school. I don't like formal education systems, which tend to dictate too much of how you should learn (and what you should be learning about); I didn't get much actual value out of the formal classes in my high school education and I think it's good that I was able to waste relatively little time on them.

Unfortunately I had to go back to school in person for the first semester of the new school year that started in September 2021. Luckily I was able to avoid going to school again in 2022 (in my final semester) by front-loading 4 courses in the first semester and only taking two distance learning courses in the second semester.

{{% sidenote %}}
Technically I had to be enrolled in a third course in my second semester to maintain "full-time student status", so at first I was enrolled in some random geology class (because it was the first one in the list). I was told that Bad Things would happen if I was habitually absent (absent for 14 consecutive days) from a class though, so I had to show up once every 2 weeks. Later I got moved to a weird 0-credit course where I had to send an email about what I was doing every 2 weeks (I think this was supposed to be like virtual study hall?). Later still, I was dropped from the fake 0-credit course and told I could stop sending an email every 2 weeks.

I'm not entirely sure why I wasn't allowed to just be a part-time student from the start. I know that schools get funding based on full-time-equivalent students (so they would get half the funding if I was a part-time student), so perhaps this whole thing was some kind of scheme to get twice the government funding for me?
{{% /sidenote %}}

## Sleep

The "sleep" category counts all the time I was in bed (not just time actively sleeping), because I didn't have a way to track how exactly I slept. (I now have a smart watch that does track when I go to sleep and my sleep phases, which is nice for ensuring I get enough time asleep.) You can see it took a big hit when I had to go back to school :(

## Did I spend my time well?

I don't think I spent my time even close to optimally; I wish I had spent more time doing more self-directed learning and software development. I spent too much time watching YouTube and scrolling Hacker News, which was somewhat useful but pretty far from the best way I could have been using my time. I did some interesting projects related to machine learning, and I wish I had gone further with them. I spent too much time doing things that are fun and interesting in the short-term but didn't provide me with much long-term value; I wish I spent more time doing things like creating software and trying to deeply understand the world better.

During 2021, and even to a lesser extent today, I ended up not really planning out what I should do and often ended up aimlessly doing a bunch of different random stuff. I think trying different things is good to do, especially when you're young! But I also wish I was more thoughtful with how I spent my time and did more long-term planning to decide what would have been important to focus on. I feel like my life would be better if I spent more time planning out my long-term goals and spending more time re-evaluating how I can be on track to achieve them.
