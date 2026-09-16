+++
date = "2026-09-16T00:00:00Z"
description = "Training a meta-model to read future tokens off an activation"
tags = ["ai"]
title = "future oracles"
image = "/future-oracle-sizes.svg"
image_alt = "Line chart of fraction correct vs. tokens ahead for future oracles on three Qwen3 model sizes, decaying from about 0.8 to under 0.1."
+++

How accurately can you predict future tokens given an activation of an LLM? It seems interesting to know how far in advance an LLM is planning output tokens. There's some work from 2023, [Future Lens](https://future.baulab.info), that tries to answer with a few methods, most interestingly by training a soft prompt (i.e. learning soft tokens to put at the beginning to get the model to predict future tokens given an injected activation). But now we live in the glorious meta-modeling future: can I train something like an [Activation Oracle](https://arxiv.org/pdf/2512.15674) to read out future tokens given a past activation? It turns out I can; I call this meta-model a **future oracle**.

I think this is kinda a weird thing to do. Given an activation, you can probably extract the context pretty well (since the previous tokens are very useful for predicting the next one), and if you have the context you can predict future tokens by just running the model itself. So a perfect reader should be able to do near perfect on the task of guessing future tokens given an activation. But here we're not using a perfect reader, we're using a LoRA fine-tune of the model itself.

I think with future oracles we should maybe get something like a way to kinda understand the extent LLMs are planning ahead, and seeing *what* they're planning ahead. But I'm pretty unsure about this!

I did this research fairly quickly over a few days (mostly with Claude), and I probably made mistakes, please take everything I say with a grain of salt. I mostly did this research as a part of looking into making [NLAs](https://transformer-circuits.pub/2026/nla/) with explanations that are more causally linked to the activation; I don't think future oracles are super useful for interpretability by themselves. Future oracles seem to be better than the future lens (given matched training compute), in large part because there are more learnable parameters, but I didn't compare them thoroughly enough to be confident about that.

## Training it

It was pretty straightforward to train a future oracle:

1. I took activations from the layer 67% of the way through Qwen3 8B/1.7B/0.6B on random [FineWeb](https://huggingface.co/datasets/HuggingFaceFW/fineweb) tokens.
2. I generated a continuation of 9 tokens given that FineWeb context (with greedy sampling)
3. I distilled a LoRA for ~2.5 epochs of 205k positions from 5.5k FineWeb documents where the activation was injected as a token (i.e. I replaced the output of the embed matrix with the activation[^cbw653qd6um]) and the model wrote just the continuation (i.e. I trained the model to match the logits of the continuation given the activation)[^c4f8kqkhe38]

I used [EasyNLA](https://github.com/asherps/EasyNLA) for most of the training code; you can see [my (entirely Claude-written) code here](https://github.com/syvb/EasyNLA/tree/sv/future-rl) if you want specifics.

## Using it

You can try [my online demo](https://huggingface.co/spaces/syvb/future-oracle).

For example, here the future oracle reads out the other multiplicand correctly, but not the answer.

![Diagram: for the prompt "Q: What is 17 times 24? A: 17 times", Qwen3-8B will say " 24 is 408." The future oracle reads " 24 equals 576." off a layer 24 activation, getting 5 of 9 tokens right.](/future-oracle-example.svg)

Here's the fraction of positions where the future oracle is right[^56p3u53is5l], across continuations[^r5fhjjanj2n] from random points in held-out[^up9fyqm596i] FineWeb documents (you can get ~5% by always guessing " the"):

![Line chart of fraction correct vs. tokens ahead (1 to 9) for future oracles on Qwen3-8B, 1.7B, and 0.6B. All three decay from roughly 0.8 at one token ahead to below 0.1 by nine tokens ahead, with the larger models consistently higher.](/future-oracle-sizes.svg)

## Fin

I did everything on base models; it would be fun to do this for chat-tuned models too. Probably the most interesting would be to scale it up to larger models and longer continuations. It also might be interesting to try training it on other layers; I just chose 2/3 of the way through because that's common in meta-models but it would probably be interesting to either train the future oracle to accept any layer as input, or train one for each layer.

Thanks to Alibaba for open-sourcing the Qwen3 series of models!

[^cbw653qd6um]: And scaled it by a constant to roughly match the norm of the layer the activation came from

[^c4f8kqkhe38]: I also told the model how many tokens (1 to 9) to continue with, and distilled the model to output that continuation, then EOS. In hindsight I shouldn't have done this and should have just distilled the continuation; it wasn't actually helpful to have the model learn to end after a given number of tokens.

[^56p3u53is5l]: Specifically: the FO continuation's most likely token is the same as the model's actual continuation's most likely token at that position

[^r5fhjjanj2n]: In this graph I didn't teacher-force the correct prefix: it shows the % of the time the nth token is correct after I sample 9 tokens from the FO.

[^up9fyqm596i]: Although Alibaba might have pre-trained on arbitrary FineWeb documents (they haven't disclosed where the pre-training data came from)
