+++
date = "2026-04-06T00:00:00Z"
description = "Cost to move the price matters not volume"
tags = ["crypto"]
title = "Judge prediction markets by depth, not volume"
+++

A lot of prediction market platforms (e.g. Polymarket, Kalshi) display the total volume traded on the market (since the market was created) very prominently. I think this is a bad metric to judge how good/useful their prediction markets are though; it doesn’t provide you with much useful information. Just because a market has had a lot of volume in the past doesn’t mean that the current price is a good indication of how likely an event is. A market might have had a lot of volume months ago but be thinly traded now.

I think a much better metric to judge markets by is “cost to move the market 2 percentage points” (or 5% for less liquid markets). This tells you how much other people are currently willing to bet against you. Unfortunately none of the major prediction markets surface this metric anywhere; you have to manually triangulate the cost by trying a bunch of numbers in the market buy field. This is sometimes called “2% depth” but that can also refer to the amount of liquidity on the order book within 2% of the current price.

The cost to move the price n% tells you how much other people are willing to bet against people who disagree with the market price. I think this is a really important thing to know, and high market depth provides a pretty strong signal that the market price is accurate. It also directly tells you how much it would cost to manipulate the market by buying it up/down.

Depth is inherently a time-bound metric; market makers can pull their orders at any time (or have all of their orders filled from a big price swing). It’s important to keep that in mind when looking at prediction market prices.

Volume on prediction markets is fairly easy to manipulate with wash trading. This is essentially impossible for blockchain-based markets like Polymarket to stop because they can’t link wallet addresses to a persistent identity. Polymarket is particularly bad because they are rumored to be having a token airdrop in the future. It’s not clear how they would distribute tokens, but there are a lot of metrics they might use which might inadvertently reward wash trading. Centralized platforms like Kalshi do identity verification which makes wash trading harder.

{{% sidenote %}}
Another interesting metric is open interest, which is essentially the total amount of money at stake across all positions, or the total number of YES shares (or NO shares, because the number of YES and NO shares is the same). But this metric is pretty easy to pump up since you can split $X of collateral into X YES and X NO and just hold both YES and NO shares.
{{% /sidenote %}}
