+++
date = "2026-11-09T00:00:00Z"
description = "I made a Bayesian network thing"
tags = ["math"]
title = "Modeling with Bayesian networks"
+++

Recently I've been thinking about modeling things, and I've found [Bayesian networks](https://en.wikipedia.org/wiki/Bayesian_network) (BNs) to be a useful way of helping me work out probability estimates for things. Unfortunately I couldn't find any good software for creating them, so I created a [BN modeling tool](https://iter.ca/bn/) myself (really, Claude did). I've written this mostly to explain how BNs work and why I find them interesting.

I've found playing with BNs to be somewhat helpful for getting a more intuitive feel for Bayesian probability, and how it works in various scenarios. I've found being able to click around and see what would happen if you change numbers useful for understanding Bayesian probability, and for checking if my model works how I would expect.

## Bayesian networks

A binary Bayesian network is a collection of nodes that represent true/false propositions with conditional probability tables (CPTs), which are connected with arrows (which can't form a cycle). We can use the BN to find the probabilities of all nodes, given the evidence that any set of nodes are true/false.

A node X with no arrows pointing into it has just a prior probability, P(X). A node X with one arrow coming in from Y has a probability for if Y is true, P(X | Y), and a probability for if Y is false, P(X | ¬Y). With two arrows, from Y and Z, the table has four probabilities, for each combination of Y/Z being true/false. In general, you have a 2^n probabilities (where n is the number of arrows pointing in), one for each combination of inputs.

Here's an example BN for diagnosing a houseplant:

<div data-bn-embed="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-houseplant.svg&amp;image-first&amp;page-scroll&amp;cpts" style="position: relative; height: 520px; background: light-dark(#f6f7f9, #16191f); color-scheme: light dark; border: 1px solid light-dark(#d9dde3, #353b47); border-radius: 8px; max-height: 100svh; overflow: hidden;">
  <a href="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-houseplant.svg&amp;image-first&amp;page-scroll&amp;cpts" target="_blank" rel="noopener" style="display: block; height: 100%;"><img src="https://iter.ca/bn-houseplant.svg" alt="Dying houseplant" style="display: block; width: 100%; height: 100%; object-fit: contain;"></a>
  <script src="https://iter.ca/bn/js/embed.js" async></script>
</div>

Given all the CPTs, we can calculate the probability of every node in the network. (I don't fully understand the process myself for more complex cases, but for simple networks you just (recursively) find the probability for each of the parents, then use the CPT to work out the probability for each set of conditions.)

We can expand the definition of BNs beyond binary true/false propositions to include nodes that have exactly one state among fixed options - for example, when modeling the Monty Hall problem we could have a node with options "Door 1", "Door 2", and "Door 3". You can convert a BN with several-state nodes into one with only binary proposition nodes (by making one node for each possible state), so when reasoning about BNs it's usually helpful to only think about the binary-state-network case.

### Evidence

With a Bayesian network, you can set evidence on nodes, so you can update the probabilities of the rest of the network given that you've learned some information. This affects the probability downstream nodes you point to by changing how likely each row in the child's CPT is, and affects nodes that point to you by propagating the information backwards (for causal networks, the fact that something happens gives you evidence you're in a world where the things that cause the thing to happen have occurred).

Note that getting evidence for a node with arrows going into it *isn't* the same as changing the node's CPT to make it 100% likely! Changing the CPT of a node doesn't affect the probabilities of its parents, but getting evidence for the node does.

In this example (based on Pearl's burglary alarm) notice how when conditioning on an alarm, getting evidence for one cause reduces the probability of the other cause: it explains away the other potential cause of the alarm. But when you don't know if the alarm is triggered, one cause doesn't affect the probability of the other at all.

<div data-bn-embed="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-burglary-alarm.svg&amp;image-first&amp;page-scroll&amp;cpts" style="position: relative; height: 500px; background: light-dark(#f6f7f9, #16191f); color-scheme: light dark; border: 1px solid light-dark(#d9dde3, #353b47); border-radius: 8px; max-height: 100svh; overflow: hidden;">
  <a href="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-burglary-alarm.svg&amp;image-first&amp;page-scroll&amp;cpts" target="_blank" rel="noopener" style="display: block; height: 100%;"><img src="https://iter.ca/bn-burglary-alarm.svg" alt="Burglary alarm" style="display: block; width: 100%; height: 100%; object-fit: contain;"></a>
  <script src="https://iter.ca/bn/js/embed.js" async></script>
</div>

## Monty Hall problem

Here's the Monty Hall problem modeled as a BN. This is another case of *explaining away* from above: without evidence for what door the host opened, your choice doesn't affect what door has a car. But when you condition on a common effect (by clicking on one of the "host opens" options), the probability of a given door having a car changes.

As you can see, when you choose door 3 and try toggling between the two doors the host can choose from, the probabilities for the other doors go from 33% each to 0% and 67%. Averaged across the two host options each door has a 33% chance of having a car.

<div data-bn-embed="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-monty-hall.svg&amp;image-first&amp;page-scroll&amp;cpts" style="position: relative; height: 600px; background: light-dark(#f6f7f9, #16191f); color-scheme: light dark; border: 1px solid light-dark(#d9dde3, #353b47); border-radius: 8px; max-height: 100svh; overflow: hidden;">
  <a href="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-monty-hall.svg&amp;image-first&amp;page-scroll&amp;cpts" target="_blank" rel="noopener" style="display: block; height: 100%;"><img src="https://iter.ca/bn-monty-hall.svg" alt="Monty Hall" style="display: block; width: 100%; height: 100%; object-fit: contain;"></a>
  <script src="https://iter.ca/bn/js/embed.js" async></script>
</div>

## Interventions

### Causal Bayesian networks

Up to this point it hasn't mattered if the arrows in a network represented causal links or not. Indeed, you can reverse an arrow in a Bayesian network and find a CPT that keeps all the probabilities, as long as you don't create a cycle (although you might need to add more arrows); the network will still work the same way (i.e. having the same probabilities for all sets of evidence) after reversing the arrow.

If we restrict ourselves to BNs where the arrows represent causality (so the sources *cause* the destination to happen), we can see what would happen if we intervened and caused something to happen, *without* also affecting the node's parents.

### Intervening

When we get evidence for a node, we're also implicitly getting evidence for the node's parents. For example if we get evidence that "crime X was reported in a newspaper", then P(crime X was committed) goes up. But that's not because newspaper reporting caused the crime, it's because in worlds where the newspaper reports on the crime it's more likely the crime occurred. If we want to know the effect of the newspaper reporting, we have to *intervene*, by not propagating the information backwards.

We can use Pearl's do operator to see what the causal effect of making a node happen is. The do operator is like setting evidence, but it also severs the arrows going into the node, so that we don't go backwards and learn that the causes of something are more likely because the thing they caused happens.

Intervening is the same as changing the CPT to make the state have 100% probability, because the do operator stops information from going backwards through the arrows pointing to the node.

### Wet grass

Here's a standard example: You live in a very rainy area where it rains 80% of the time. Rain has a 99% chance of wetting your grass and your sprinkler has an 80% chance of wetting your grass. You run your sprinkler 80% of the time when it isn't raining, and 20% of the time when it is. In this network, conditioning on the sprinkler running *decreases* the probability that your grass is wet, since in worlds where you run the sprinkler it's probably not raining.

We can figure out how much turning on the sprinkler affects the probability the grass is wet by intervening! If you switch to intervening (by clicking the "Intervene" button), it cuts the arrow from the rain node to the sprinkler node, which stops evidence from flowing upwards. This gives us the result that we'd expect: turning on the sprinkler increases the probability that the grass is wet.

<div data-bn-embed="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-wet-grass.svg&amp;image-first&amp;page-scroll&amp;cpts" style="position: relative; height: 700px; background: light-dark(#f6f7f9, #16191f); color-scheme: light dark; border: 1px solid light-dark(#d9dde3, #353b47); border-radius: 8px; max-height: 100svh; overflow: hidden;">
  <a href="https://iter.ca/bn/?view&amp;src=https%3A%2F%2Fiter.ca%2Fbn-wet-grass.svg&amp;image-first&amp;page-scroll&amp;cpts" target="_blank" rel="noopener" style="display: block; height: 100%;"><img src="https://iter.ca/bn-wet-grass.svg" alt="Wet grass" style="display: block; width: 100%; height: 100%; object-fit: contain;"></a>
  <script src="https://iter.ca/bn/js/embed.js" async></script>
</div>

## Conclusion

Thanks for learning a little bit about BNs with me :). I think they're a pretty interesting way to think about probability, and they might be useful for modeling things. I'm pretty new to using BNs myself so I might have gotten some stuff wrong.
