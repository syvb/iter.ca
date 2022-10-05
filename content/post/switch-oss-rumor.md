+++
date = "2021-07-31T05:00:00Z"
description = "Nintendo's website wasn't updated because of a big update, but because I asked them to."
tags = ["programming"]
title = "Accidentally causing a Switch rumor"
+++

Recently I stumbled upon [this Reddit post](https://old.reddit.com/r/GamingLeaksAndRumours/comments/nzr7qb/nintendo_oss_webpage_updated_new_switch_and_wii_u/) in a subreddit for gaming rumors while trying to find information about Nintendo's OSS code. This is a page on Nintendo's website with some source code that they are obligated to release[^1]:

[^1]: Not that you can actually _do_ anything with the source code other than look at it. The source code needs to be statically linked against the Nintendo Switch SDK to compile, and the only way to get your hands on the Switch SDK is to become a licensed Switch developer (which involves signing a NDA).

> The Nintendo OSS "Open Source Software" webpage is rarely updated unless a high-profile OS release occurs. It usually takes months for small updates to have  source published (like v12.0.0 for example, still not there).
>
> The page was updated sometime this weekend to add the text "or later version" to "Nintendo Switch [Ver. 11.0.0]" and "Wii U [Ver 5.5.2]". This is such a minor update it seems unlikely that devs would bother tidying this page unless they anticipate adding more to it soon. (ie: adding OSS for new software/hardware).
>
> Current page: https://www.nintendo.co.jp/support/oss/index.html
>
> Cached page before this page was updated (Most recent I could find, June 5th): https://webcache.googleusercontent.com/search?q=cache:B8KOgxP1BxkJ:https://www.nintendo.co.jp/support/oss/index.html+&cd=2&hl=en&ct=clnk&gl=us
>
> Take as a grain of salt, but devs usually don't update low-profile webpages for no reason, especially the same weekend as E3.

This was not a result of Nintendo tidying up their page while preparing for something. *I* was the person who instigated that change. Around a week earlier, I also noticed that "v12.0.0 for example, [was] still not there". Nintendo OSS code has given me [one great blog post before](/post/switch-oss/), and I was getting desperate for some content. Instead of doing nothing, I emailed Nintendo of America legal's department to see what was up. A bit of digging turned up that their email address was
{{<rawhtml>}}noalegal [a<span style="font-size:1px">mo</span>t] noa.nintendo.com,{{</rawhtml>}} and so I asked them:

> Hi there! I am trying to find the OSS (open source software) included in version 12.0 of the Nintendo Switch system software. It seems that https://www.nintendo.co.jp/support/oss/ only goes up to version 11.0, how could I get the OSS for version 12.0?

Five days later, I got a reply (in all italics for whatever reason):

> *Thank you for your inquiry about the open source software in version 12.0 of the Nintendo Switch console.  The OSS has not changed since version 11.0.0.  The Nintendo open source software source code webpage has been updated to reflect this more clearly, indicating that the software made available is for version 11.0.0 and later.*
>
> *Best regards,*
>
> *Legal Department*
>
> *Nintendo of America Inc.*

This wasn't the devs randomly tidying up a page, they did it because I asked them about it. So I guess the moral of the story is that most gaming rumors are wrong (to be fair, the post _did_ say to take it with a grain of salt). People will notice random things that Nintendo does and assume that there is some deeper reason for it. Things are usually not done for deeper reasons. Also yay I caused a gaming rumor!

(also Switch OSS for 12.1.0 is now out! does seem moderately interesting, [check it out](https://github.com/reswitched/switch-oss).) 
