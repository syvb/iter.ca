# 
+++
date = "2026-04-18T00:00:00Z"
description = "Rough notes that aren't really that interesting"
tags = ["ai", "programming"]
title = "Quick thoughts on meta-models for interpreting model weights"
+++

(These are some rough notes that I wrote up quickly; there are many more issues with this that I haven't documented or realized yet.)

Context: [activation oracles](https://arxiv.org/abs/2512.15674) (AOs) are fine-tuned LLMs that are trained to be able to answer questions about the meaning of activations from the middle of the residual stream of a language model. So e.g. you can ask "what is the secret word the model was told not to answer?" and the AO can answer that *just from some activations* from the middle of the residual stream of the target model. The activation oracle is fed the activation as a single token that essentially skips the normal embedding layer and directly injects the activation where the output from the embedding layer would normally be. So the AO must have the same model dimensionality (d_model) as the target model.

AOs are pretty neat, and [I'm really excited](https://www.lesswrong.com/posts/bkPLnkG5Lnh7G97LP/why-i-m-excited-about-meta-models-for-interpretability) about using them for interpretability. But I think we could go even bigger than just interpreting activations: what if we could train a "weight oracle" that could directly interpret model weights and answer questions about the model from those weights? I don't know if this is actually possible, but I have some thoughts on how I might go about investigating this.

I think making weight oracles that work will be much harder than making AOs that work, because the activations of a given model will tend to share the same structure, while model weights for different models have much less common structure, and probably use very different representations for the same concepts. This is a really annoying problem, and I don't have a good solution for it.

Also some other things:
- Model weights are much bigger than single activations, so weight oracles would require much more compute
- There are some parts of models that can be transformed without changing the model behavior (e.g. the order of attention heads), so the weight oracle should handle transformed models the same as the underlying one

## Why this might be good

It seems pretty useful to be able to directly interpret the weights of LLMs, instead of just looking at the activations in specific cases we think are important. Many current interpretability methods look at the model activations for a given input, instead of directly looking at the model weights. This makes these methods less effective for finding out if the LLM acts in a misaligned way but only in certain very specific circumstances, or has some very small chance of falling into a state we don't want. If we can directly interpret the model weights we can in principle understand *all* of the model's behaviors, instead of creating explanations for behaviors we have observed.

## Problem: fitting everything into the context, and managing attention

Problem: the weights of an LLM don't fit into its context window. Taking Llama-3.1-8B as an example for this section, it has 8 billion weights and only 131072 tokens of context (0.0016% of the weights). But we can get clever: activation oracles don't feed the activation as d_model separate tokens for each number, but as a single token with the activation injected after the embedding layer. We could try doing the same thing here, and smush a bunch of parameters into one d_model-sized embedding. This lets us put 4096x (Llama-3.1-8B's model dimensionality) the parameters in the context window, or 6.71% of the parameters, which still isn't enough. We could squeeze in more parameters through quantization or SVD, but that would involve losing some information which I would prefer not to do. 

Even if that scheme worked (e.g. for a model with a bigger context and less parameters), I don't think that would be a very good way of encoding the parameters. Language models usually have way more bits in the model dimensionality than are needed to just encode the tokens. Llama-3.1-8B has a vocab of 128K tokens (so log2(128K) ≈ 17 bits of information) and a model dimensionality of 4096, so the residual stream has much more bits than it needs to just represent the input tokens.

### The residual stream has much more information that just the tokens

Why is the residual stream so much bigger than the number of bits to represent tokens? It seems like it's pretty important that we give LLMs a lot of "room" in the residual stream to process information in the model: we want model to be able to write information about its understanding the input to the residual stream, and it needs enough space to be able to do that.

I think one important reason we shouldn't just scale up the tokenizer forever is that we want the attention mechanism to be able to attend to fine-grained parts of the input, and if tokens are too broad and span parts of text that are too semantically different, then the attention mechanism won't be able to attend to the specific, relevant parts that would be best.

### Learned decomposition

We want to encode the weights (which look very different from the normal embedding vectors of the model!) in a way that the model can understand. One approach I've been thinking about is having the oracle model learn a function that maps weights to multiple embeddings during training. I haven't thought this through enough to give a full description of how to implement this, but it seems pretty plausible that you could just do backprop to learn a function that maps a lot of weights to embeddings.

## Problem: training it

Ok how do we train this thing? I want a weight oracle to be able to answer questions about arbitrary models, but I don't have a bunch of labelled examples of fully-interpreted models to train the oracle on with supervised learning.

The best way I've thought of is to train a bunch of models to act in a specific pre-known way (answering based on some generated flow chart), and train the oracle to map model weights -> flowchart. There is [some research](https://arxiv.org/pdf/2410.00061) that trains a model to reverse-engineer a transformer model compiled from a [Tracr program](https://arxiv.org/pdf/2106.06981) (a weird programming language that lets you directly write programs that are compiled into model weights). It would be really interesting to try to generalize this to interpreting arbitrary models trained to emulate a flow chart.

Another approach might be to use traditional interpretability methods (e.g. linear probes) to get information about the target model, then train the oracle to be able to say things the linear probes would say from just the model weights, and hope that generalizes to a general understanding of the model.

I think this is the weakest part of my idea; I need to spend more time figuring out how to train a weight oracle (without labelled data from having already solved interpretability.)

## Fin

I'm probably going to start with experimenting with better ways of representing activations in inputs to activation oracles (e.g. learned decomposition) to learn about the best way to make inputs to oracle models. Idk what I'll do after that. [Loracles](https://github.com/ceselder/loracles) (from Celeste) are kinda like this but for LoRAs, and are pretty interesting. Also some papers on kinda related subjects that I haven't read yet: [*Equivariant Architectures for Learning in Deep Weight Spaces*](https://arxiv.org/pdf/2301.12780), [*Predicting Neural Network Accuracy from Weights*](https://arxiv.org/pdf/2002.11448).
