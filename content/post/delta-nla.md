+++
date = "2026-09-11T00:00:00Z"
description = "What I'm thinking about and planning to work on over the next few weeks"
tags = ["ai"]
title = "Thoughts on interpreting residual updates"
+++

I'm doing some LLM interpretability research, and it seemed like it might be useful to describe what I'm thinking about right now and what I plan on working on over the next few weeks. I'm still pretty metamodel-pilled (and I assume you're familiar with natural language autoencoders here). I'm pretty uncertain about everything in this post, please don't take anything here too seriously.

I've been thinking about using metamodels to interpret residual updates (the activation at one layer minus the activation at an earlier layer; I'll call these "deltas") for a while. If I made something like [natural language autoencoders](https://transformer-circuits.pub/2026/nla/) (I assume you've already read that for this post) but for deltas, then I could go as far as getting a meaningful English explanation of what an individual layer, or even an individual attention head is "thinking" about.

Unfortunately this is pretty hard to do; the obvious thing (just train an NLA but on deltas instead of activations) doesn't work because:

- The residual stream gets updated in ways that are linearly predictable from just earlier activations. At first I expected that you shouldn't be able to predict future residual changes: if the residual stream is going to update in some predictable way, shouldn't the earlier layer MLP just make that change at the earlier layer? But I did some vibe-research and apparently you can partially predict the delta at layer n+1 from the delta at layer n. (I did this on GPT-2 medium but probably generalizes?)

    <img src="/gpt2-delta-predictability.png" alt="Line chart">

    Claude explains why I'm wrong:

    > Your argument is an efficient-markets argument: any predictable component would be "arbitraged" into an earlier layer. That needs a force that rewards consolidation. The loss doesn't: two networks whose layer contributions sum to the same thing have the same logits, so "layer n writes v, layer n+1 writes v" and "layer n writes 2v" are equally good.

    This creates the problem that a delta NLA might just learn to do the same thing as a normal NLA (at least without a large amount of training), because describing the current state is useful for understanding changes to the state. One thing I've considered is giving the earlier activation to the AR, so that just describing the state at the earlier vector doesn't help at all. Also I could try to have the NLA reconstruct the part of the delta that can't be linearly reconstructed from the previous delta.

    (As an aside, I wonder if we could just train LLMs to try to make it so you can't predict future deltas. I don't think this would hurt model capabilities much: splitting the delta over multiple updates actually probably doesn't *help* the model much but is probably more of a neutral action? Unsure though.)

- It's not clear how you'd warmstart such a model.
    - I've tried synthesizing warmstart data by giving a bunch of interpretability-related stuff to an LLM (e.g. logit lens, attention patterns), but I didn't like the outputs much.
    - Maybe I could just have Claude write out a made-up list of computation steps and what % of the way through the layers it would be done at. But probably the made-up list will be pretty different from what the model is actually doing??
        - fable 5.1 gives me "This request was blocked as it seems to violate Anthropic's Terms of Service restrictions on reverse engineering or duplicating model outputs" error lol
- Residual stream updates are messy and hard to verbalize. Individual layers, and even individual attention heads probably change the residual stream in ways that are really difficult to easily explain. Models probably represent things internally in really unintuitive ways, and so the English verbalization of the change would have to oversimplify the complex internal representation. And with NLAs, there's no incentive for the AV to ever *explain* the complex internal representation, because the AR already knows that complexity! (or if not would learn quickly)

I've been thinking about this for a while; hopefully I'll be able to figure out a way to do this that actually works!
