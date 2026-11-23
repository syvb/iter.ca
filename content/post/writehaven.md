+++
date = "2026-11-23T13:32:07-08:00"
description = "Event where you have to write a lot of words"
tags = ["productivity", "writing"]
title = "Writehaven notes"
+++

[Inkhaven](https://www.inkhaven.blog/) is pretty cool – you have to write a 500 word blog post every day (or leave). But 500 words isn’t *that* many – if you can type 1 word every 2 seconds, you can hit your daily word count in just 17 minutes. What if we made Inkhaven but way more demanding? I did!

[Mikhail Samin](https://contact.ms/) and I ran two ~10 hours events that were kinda like a mini-Inkhaven, called Writehaven[^1] in London for. You had to write/edit at least 400 words per hour using our custom website that tracked everything, and if you failed you got kicked out. (Editing words also count to your total, and words still count if you deleted them after ~30 seconds.) This post has my thoughts on running/participating in that!

Overall I liked it a lot and I think we should probably run more events like this! Maybe we should even do some events where you have to do some task other than writing in hour-intervals – e.g. research – but it seems harder to operationalize that.

## Implementation
You just have to write 400 words every hour, prorated if you arrive partway through. (Food breaks don’t count, and basically make it so the time during the food break is a free period that extends the following hour.)

Mikhail vibed up a pretty good platform for running this on; I adapted it a bit for the second event.

## Thoughts from the first one
Overall I think the event was pretty good for helping me to write things!

Notes from right after the event:

- There's a really strong time pressure to write stuff, which I think was kinda bad for writing where I really wanted to contemplate the subject matter to make sure I was giving good takes? It seems like it would have been better for some of my writing if I could take some time to really think about it for a while. The existence of the break hour was helpful.
- The time pressure kinda disincentivizes writing posts that require a lot of reading other stuff
- I liked the font and heading style in the editor; having good UI for the editor was really nice
- At Inkhaven I thought writing a post a day was kinda hard. But now that I’ve been forced to write several in a day I think Inkhaven is actually not that hard. Probably in general I should just try harder at things, and maybe I can actually get more results out of myself than I think.
- Maybe there should have been slightly stronger incentives (beyond being kicked out) to avoid failing?
- We had food at like 3PM and 8PM iirc? Food should have been earlier in the day
- I think there maybe should have been something like the Winners Lounge in Inkhaven 2, where you can kick back for a bit once you’ve done your hourly writing
- I think the way breaks should have worked (instead of skipping an hour, or halving the word count for an hour) is breaks effectively extend the following hour by making it so words you write during the break count for the next hour

## Thoughts from the second one
For the second event, I made it so you can carry-over up to 200 words that exceeded your requirement for the last hour. This made things easier, and helped with the problem where writing any words once you hit your minimum felt wasted. Although I did feel less motivated to write once I hit 600 words, I don’t think it was that bad since it encouraged me to take breaks, and spend time doing research for my posts. I feel like it also reduced the pressure (relative to the last one), since once you got to the point where you had 200 words to start each hour, it was easier to hit the bare minimum requirement. I think the carry-over rule was positive, although I fear it might have made things *too* chill.

Overall I liked the second one too, although not as much as the first one. It probably would have been better if we had more people for the second one; I should've spent more time telling people about it and trying to draw people in.

## Conclusion
It might be a good idea for more people to run events like this! You can see [the source code](https://github.com/syvb/writehaven) for our software, although you might want to vibe up something that fits your needs better.

[^1]: I think this is what Inkhaven would have been called if there wasn’t something [Lightcone](https://www.lightconeinfrastructure.com)-specific named Writehaven. Luckily we’re very much not a part of Lightcone Infrastructure so we can name our parties whatever we want.
