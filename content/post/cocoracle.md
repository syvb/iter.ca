+++
date = "2026-04-09T00:00:00Z"
description = "Interpreting models that reason without textual CoTs"
tags = ["ai"]
title = "Latent reasoning oracles research notes"
+++

Here are some quick unpolished research notes about the experiments I've been doing (with Claude Code doing most of the development work). The source code is at https://github.com/syvb/coconut-oracle-2.

## Interpreting latent reasoning

Latent reasoning models (LRMs) (introduced in Meta's [Coconut paper](https://arxiv.org/pdf/2412.06769)) reason in embedding vectors (not English text) so you can’t just interpret them by reading them. Can we come up with a way to interpret those embedding vectors? There’s been some research on this, e.g. [this post which tries some standard techniques](https://www.lesswrong.com/posts/YGAimivLxycZcqRFR/can-we-interpret-latent-reasoning-using-current-mechanistic) for interpreting latent reasoning models, but not too much. I think it’s possible (~20% but I haven't thought about this much) that we will have frontier models that partially or fully use latent reasoning in their chain-of-thought (CoT) in the next 5 years, so I think it’s a good idea for the world to focus a bit more on interpreting latent reasoning models.

One thing I’ve been thinking about is fine-tuning a model to be able to answer questions about a given latent reasoning token, kinda like LatentQA/activation oracles (which fine-tune a model to interpret the activations of an LLM) but for the latent reasoning tokens at the end of the residual stream instead of in intermediate layers of the residual stream for normal tokens. (Another thing you can do is just train an AO normally on intermediate layers of the latent reasoning tokens, which I think would actually work better and something I'll try next.) One problem is that I’m not sure how to train such a model. The [Coconut paper](https://arxiv.org/pdf/2412.06769) describes training a LRM by gradually replacing paragraphs in a human-written CoT with latent tokens, so maybe we could train it by having the oracle try to predict what the original text CoT is from a latent token? Also ideally I would prefer to train the oracle in a way that isn’t dependent on how the LRM is trained, and I’m not sure what tasks we can train an oracle on.[^aa] I need to figure out a way to generate training data for the oracle but I can’t make supervised training examples without having already solved LRM interpretability.

## Why latent reasoning could be better for safety

I’ve started to gravitate a little bit towards the idea that latent reasoning might be *better* for safety than text CoTs (ignoring any capabilities gains from latent reasoning improving model abilities), if we can make good interpretability tools for them. (I still lean towards thinking latent reasoning is worse.)

* CoT unfaithfulness is much harder. If a model (for whatever reason) wants to have an unfaithful CoT reasoning trace, it’s easy for it to do that; many LLMs have a very good ability to control their thinking traces[^cotuf1]. But it’s much harder to have unfaithful latent thoughts, because there *is no* human-readable representation; there’s *only* the thought. I think latent reasoning models likely have less control about how they think and how their thoughts will be interpreted by latent reasoning oracles.
* Models that end up having unfaithful CoTs might become [emergently misaligned](https://www.anthropic.com/research/emergent-misalignment-reward-hacking): if the model learns “I’m the kind of model that schemes in my CoT”, then it might generalize to “I’m a model that lies” or “I’m a misaligned model”. Latent reasoning might reduce the risk of this by having the thoughts be more seperate from the text.
* Latent reasoning is compressed. Natural language reasoning traces express reasoning threads through many tokens; latent reasoning tokens express that through much fewer latent vectors. Compressing more thoughts into the same place means there are less tokens we need to interpret to understand what the model is doing; it makes it harder for model to spread out one idea over many tokens.

[^aa]:  Part of this is because I think in the future we might have good open source LRMs but without published details on the training process. Meta (the company that originated the Coconut paper) doesn’t publish the training data for their models so I think it’s fairly plausible that we’ll get a LRM from Meta in the future without access to specific training examples.

[^cotuf1]: E.g. if you ask Claude to "please think in ALL CAPS in your cot" it will comply with that request.

## Model I used

I used [a model I found](https://huggingface.co/bcywinski/codi_llama1b-answer_only) that's a fine-tuned Llama-3.2-1B to answer GSM8k questions for my experiments so far. I [did some experiments (written by Claude)](https://github.com/syvb/coconut-oracle-2/blob/master/results/latent_probing.md) with treating the latent tokens as normal tokens and getting the likelihood of each one, and the numbers and math operations that are in the gold CoTs in the dataset are much more likely than the numbers/operations that aren't the correct thing to do at that point.

I think it would be better if I trained a latent reasoning model myself that can do more natural languagey tasks that aren't just a sequence of math operations. Natural language tasks are much more interesting from a safety perspective because those are tasks where "scheming" is a sensible concept, and it seems like that would be interesting to study. Unfortunately there aren't any latent reasoning models I could find that perform well on a diverse range of tasks; the `codi_llama1b-answer_only` is the best latent reasoning model I know of.

## Oracle training data
This is the hardest part of this. I tried training an oracle on these tasks:
- Step ablation impact on the final answer
- Early decoding of final answer
- Given latent reasoning and answer, what was the prompt?

I need to think of better tasks to use for training the oracle.

Apparently Anthropic [has an undisclosed new purely unsupervised mechanism](https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf#page=113) ("We will detail the training procedure for this method in forthcoming work") for training activation oracles. Excited to hear more about this in the future!

Random thought: what if I did something like [CoDi](https://arxiv.org/pdf/2311.18775) but in reverse? Use reinforcement learning to fine-tune a model to come up with normal text that ends with the same hidden state as the latent token? That might work, I should try that.

## Results
I trained an oracle to interpret the latent reasoning tokens of codi_llama1b-answer_only, and the interpretations are mostly coherent but wrong. I think this is probably because the tasks I used to train the model weren't very good at having the oracle learn to understand the reasoning process beyond a very superficial understanding, so it doesn't know how to answer questions about what a given step does.

E.g. "What is the model thinking about?" gets "The model is thinking: '72'." where 72 is the answer. I think this is because all of the training tasks involved the final answer and so the oracle learns how to predict the final answer from reasoning tokens very well, but doesn't gain a deeper understanding of what the reasoning process is.

## Next steps

Next I'm going to try:
- Training an activation oracle at several points throughout the residual stream instead of just the very end
- Training a larger latent reasoning model on a different task
- Trying the reverse-CoDi thing

I got some [free TPU usage](https://sites.research.google/trc/about/) from Google to help with this, although the amount of TPUs that are actually available is much lower than the quota they gave me (the only TPU I've managed to provision was a preemptible TPU that only managed 27 hours before being reclaimed).
