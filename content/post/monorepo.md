+++
date = "2026-04-15T00:00:00Z"
description = "I've had a monorepo since 2019 with a bunch of stuff"
tags = ["programming"]
title = "My personal monorepo"
+++

[Monorepos](https://en.wikipedia.org/wiki/Monorepo). They're pretty cool! So cool that I have had one for myself since 2019 where I have a bunch of loosely related things that are useful for running my life. Originally it was just for my blog's content, but it's grown a lot more since then.

## What's in my monorepo

There's a lot!

- The source code for this blog (which is generated with a custom Hugo template that takes full advantage of the Go templating language (which is Turing complete!)), including all posts and pages
    - I use GitHub Actions to deploy this blog to Neocities on every commit that changes blog content
- Scripts for fetching my posts across different services (e.g. Stack Exchange, Buttondown, YouTube) to aggregate them into [the stream of everything I do](https://iter.ca/stream/me/) on my blog
    - I use GitHub Actions to automatically run those scripts and update the streams on my blog
- My NixOS configuration
- Scripts I want to share across all machines I use
- Site content for a few smaller sites I own (e.g. my URL shortener, [sm4.ca](https://sm4.ca/))
- A bunch of financial records
    - I used to track every single financial transaction I made (down to individual credit card purchases) with [Beancount](https://github.com/beancount/beancount/), but eventually this became far too much work for the value I got so I stopped doing this.
    - I also have scripts for munging all of my cryptocurrency transactions for my taxes; I used to be able to fully generate my tax return from my monorepo (by having it download PDFs from the CRA website and filling in the fillable PDF fields), but eventually I caved and started using normal tax software.
- various other random stuff


## How useful is this?

Somewhat useful? There's nothing I couldn't do with a bunch of separate repos, but I've found it helpful to not need to deal with a bunch of separate small repos for the varying random things I do. When I set up a new machine, I can clone my single monorepo and have everything I need to start working from it.

Increasingly I've been working from cloud VMs a lot more (partly to sandbox coding agents, partly because I need a lot of GPUs to run my experiments). I haven't gotten this entirely working yet, but eventually I plan on making it so I can automatically set up a cloud VM with all of my Nix configuration and dotfiles just by running a script in my monorepo. 

## Syncing with a public repo

I have a lot of private content in my personal monorepo, but I also want to let people peer inside how some of it works (e.g. the source code for my website). So I have [a GitHub Action](https://github.com/syvb/iter.ca/blob/master/.github-internal/workflows/sync-with-public.yml) that automatically deletes various directories from the repo on every commit, then commits/pushes the redacted version to a different repo.

One problem with this workflow is that it makes accepting pull requests a bit harder, because I have to replicate them on my private repo as well. This is a little annoying, but I rarely get PRs for my blog so it's not really a problem.

## Fin

My personal monorepo has grown over the years, accumulating a bunch of random stuff I've been up to. I like that I have it all in one place.
