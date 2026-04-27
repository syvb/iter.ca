+++
date = "2026-04-26T00:00:00Z"
description = "it's a mysterious hedge fund"
tags = ["ai"]
title = "What is Value Aligned Research Advisors?"
+++


Value Aligned Research Advisors (or VARA) is a shadowy private investment fund. Despite managing ~$9.94 billion in assets, there’s very little coverage of the fund (which doesn’t have a website, or any other public-facing information about it), and nobody has tried to understand what their investment strategy is. They have only a few people involved with running the fund, and the head office they list in filings is a duplex in Princeton, New Jersey. As a large institutional investor, VARA is required to file a [13F form that discloses its holdings in public companies](https://13f.info/13f/000196356526000002-value-aligned-research-advisors-llc-q4-2025) and a [form ADV](https://adviserinfo.sec.gov/firm/summary/319135) which discloses some info about the fund. (It’s possible it has stakes in private or non-ADR foreign companies[^adr] which aren't disclosed on a 13F, but the total fund value is around the total value disclosed in the 13F so such stakes can’t be a significant portion of the fund.)

[^adr]: The reason I know about the holdings in TSMC (a Taiwanese company) is because VARA holds it through ADRs. But it's possible there are other foreign companies VARA holds directly.

From [what little I could find about VARA online](https://www.google.com/search?q=site%3Alesswrong.com+%22vara%22) and looking at the people who run it, it seems the operators and investors are mostly effective altruism-adjacent people who think that there will be a lot of scaling up of compute used for AI in the nearish future.

I looked at VARA's filings to try to understand what its strategy is.

## What is the investment strategy?
### AI compute
They have a lot of holdings in companies in the AI compute and infrastructure supply chain. The three largest holdings (call options on Nvidia, TSMC, and Alphabet) are all involved in producing GPUs (or TPUs). They also have many holdings in smaller companies involved with compute-related things like energy delivery and electronics manufacturing. I think the idea here is that hyper-scalers will have larger training runs, which will increase demand for the companies involved in the AI compute supply chain.

It has a lot of holdings in cryptocurrency-mining companies, presumably because they have a lot of compute infrastructure that can be repurposed for AI. Indeed, many of their crypto holdings have already started pivoting to AI.

### Lumentum
Lumentum is the 5th biggest holding (at $432 million, 4.3% of fund); it’s interesting VARA is investing so much in a relatively obscure company. Lumentum makes hardware that’s used for optical networking in data centers. Maybe the idea is that as models get larger, moving data around large clusters will be more important (because you can't fit everything into one GPU) and so Lumentum’s technology will be really important? I don’t fully understand the logic here.

### Puts
VARA has a few put options (betting *against* a company). Most of them seem to be for hedging against a long/call position. The largest is a $394M put on TSMC, presumably to hedge against risks from China-Taiwan tensions escalating. They also have puts on large holdings, presumably to mitigate risk from them.

There are puts on AAPL ($72M) and Qualcomm ($54M) without any corresponding long positions. Not sure what’s going on there.

### What the brochure says
The [brochure attached to their form ADV](https://files.adviserinfo.sec.gov/IAPD/Content/Common/crd_iapd_Brochure.aspx?BRCHR_VRSN_ID=1039509) say they primarily invest in

> equities using both long and short positions, as well as equity options, of companies in the Artificial Intelligence (“AI”) space

And “VARA does not trade cryptocurrencies”, although it does have exposure through crypto-mining companies. It mentions "Artificial Intelligence takeover attempts" as a potential risk factor from its investments. There’s a *Global Conflicts* section that discusses risk from the Russia/Ukraine and Israel/Palestine conflicts, but despite the fund’s second biggest holding being in TSMC, it omits any mention of a potential China/Taiwan conflict?

## Fin
Idk how to conclude this, I guess you should feel more enlightened now that you have the knowledge of VARA invests?

{{% sidenote %}}
I don’t mean this post as financial advice! Even if you think VARA has a good investment strategy, I can only see what their investments on a delay: 13F forms disclose what the investments were at a given point in time, and VARA probably changes its holdings in response to current events. And the 13F form says the direction (call/put) and value of the options holdings but not what the strike prices or expiry are, so you couldn’t exactly replicate their holdings if you wanted to.
{{% /sidenote %}}