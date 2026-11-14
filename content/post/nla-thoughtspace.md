+++
date = "2026-11-13T20:28:46-08:00"
description = "quick NLA thoughts"
tags = ["ai"]
title = "How I think of NLA explanations"
+++

[Natural language autoencoders](https://transformer-circuits.pub/2026/nla/index.html) (I assume you've read that) are pretty interesting things! But NLA explanations are kinda weird, so I figured it might be useful to write about them.

I think there are some things about NLAs that many people don't realize, and it's hard to get a good mental model of what NLA explanations actually are. I'm not perfect here, but I hope this quick post gives you a bit of a better intuition for NLA explanations, or at least an understanding of how *I* think of them. 

## Thoughtspace
In some sense the thoughts "I want to eat pasta" and "I don't want to eat pasta" are very different thoughts: they describe two opposite scenarios, and it doesn't make sense to simultaneously think both of them. But if you imagine a kind of "thoughtspace" where you cluster similar thoughts together based on how similar they are, they're pretty close to each other: both relate to if you want to eat pasta, both involve your culinary preferences, both are about a thing you want, both involve thinking about food, both are things you might think about at lunch time, etc. So you'd probably expect the activations of an LLM to be pretty similar between those two thoughts, at least if you assume LLM activations are organized like that. In contrast, "I want to eat pasta" and "There exist exactly eight prime numbers" are far in thoughtspace and you'd expect them to be represented very differently in LLM activations.

Activations are basically points in thoughtspace, and the AV is trained to verbalize complex activations into text. But language models have very complex thoughts, so any text the AV writes is necessarily a simplification. The AV is rewarded during RL for writing explanations that the AR can map to a similar point in thoughtspace, not for writing explanations that are truthful. It would be really convenient if the AV was rewarded for writing explanations that were faithful instead of close.

The point I'm making here is that it helps the AV to describe the thought accurately – it makes the reward go up, because being accurate is pretty helpful for the AR – but the AV isn't perfect and it might fail in weird ways, and incorrect explanations might not be that bad. This section is kinda a way to partially explain some of the [results from this post](https://www.lesswrong.com/posts/Q5fwBiZCwHGeKucmo/three-pieces-of-evidence-that-the-nla-reconstructor-does-not).

(I'm unsure how to best think of the *change* to the residual stream each attention and MLP layer does. With the description above I guess it's kind of a "change to the current thought"? I'm not sure how to think about this.)


## Making better NLAs is hard

It might be useful to have a kind of NLA where the AV's explanations are more useful for behavioral prediction. This is hard though, and I haven't figured out a better way to reward AVs that actually works.

The obvious ways of doing better NLAs don't work out of the box. The obvious thing to try is something like "patch the AR(AV(h)) back into the LLM to continue generating, then score the AV based on how well the logits of the patched-LLM match the actual logits". I tried doing this for a bit but I couldn't get it to work right.

I've also tried working on NLAs for interpreting the change to the residual stream from a single attention head or MLP, but I haven't figured out how to do that in a way that works.

## Misc thoughts
- There's an interesting parallel between NLA explanations and reasoning model CoTs
- "NLA psychology" seems somewhat interesting to think about more
- Maybe the AR should be a smaller/worse model than the AV to force the AV to make more understandable explanations

## Fin
I think NLAs are really interesting, and might be really useful if we can make them Actually Good.
