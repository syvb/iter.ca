+++
date = "2026-04-28T00:00:00Z"
description = "How to bet on the end of the world"
tags = ["ai"]
title = "Loans are bets on doom"
image = "/post/doom-loans/dia2.svg"
image_alt = "Cash flow diagram: a green \"+$100 now\" bar on the left, a taller red \"−$200 in 10 years\" bar on the right, on a shared timeline."
verbose = 1
+++

Some people want to bet on the end of the world. Or that we will live in a post-scarcity utopia where money doesn’t matter (and so nobody cares about bets being repaid anymore); economically these two scenarios are pretty similar (in both cases we live in a world where money isn’t useful anymore) so I’ll refer to both of these as “doom” in this post. The obvious way to bet on doom would be “in 10 years you pay me $X if the world exists, otherwise I pay you $Y”. But this doesn’t work, because the bet is part of the world, so if the world end it doesn’t get paid. (I think most of what I’ve written here has been documented before but I wanted to make a post that explains this better.)

The cash flows of that bet I described look like this:
![+$100 if doom (never happens), else -$100](/post/doom-loans/dia2.svg)

Let’s revise the betting scheme a bit to fix the problem. How about “Non-doomer pays doomer $100 today; doomer agrees to pay non-doomer $200 in 10 years”. This solves the timing issue by having the winnings prepaid to the doomer, and the non-doomer gets their money back in the future, once it’s determined they won. But it introduces counterparty risk: presumably the doomer plans on *spending* the prepaid winnings now (because money isn’t useful after the world ends), so there’s a significant risk of non-payment in the non-doom scenario.

Illustrating the cash flows with a diagram:

![+$100 today, -$200 in 10 years](/post/doom-loans/dia2.svg)

If you look at that cash flow diagram for a while, you might realize that this bet looks a lot like a loan. Indeed, this bet is equivalent to the non-doomer loaning the doomer $100 at a 7.18% APR, with all of the interest deferred until the end of the loan term.

Conveniently this exact loan structure is one that many financial institutions already provide today! A *balloon payment loan* is a kind of loan where you get all of the principal today, and don’t pay anything until the end of the loan term, when you repay all of the principal plus interest accumulated over the entire term of the loan. Technically “balloon payment loan” more often refers to when you pay interest along the way, and only repay the principal at the end; these arrangements are pretty similar.

Balloon payment loans still have issues with counterparty risk. With a normal loan, if the counterparty defaults part-way through the loan you’ve still at least gotten some of the principal back and some interest; balloon payment loans require your counterparty to be solvent for the entire loan term to get anything back. As such most balloon payment loans are in the form of mortgages secured against land. So if you want to bet on doom and own land, maybe consider getting a balloon payment mortgage on it? There are fewer banks that offer it now, because balloon payment mortgages contributed to the 2008 financial crisis, but it is still possible to get them from smaller institutions.

Conclusion: maybe if you think the world will end soonish you should get a mortgage that defers interest/principal as much as you can? idk?
