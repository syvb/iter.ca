+++
date = "2026-04-05T00:00:00Z"
description = "My personal place with all my notes/journals"
tags = ["life"]
title = "My personal memex setup"
toc = 1
+++

I have a personal *memex* (also called a personal knowledge base or Zettelkasten) – a single place where I keep all my daily journals and notes. I have 630 daily journal pages[^1] and 271 other pages. Originally I started using [Roam Research](https://roamresearch.com) in March 2020 (while I was in high school) but I stopped using it in 2021\. In 2024 I got back into it and started using [Logseq](http://logseq.com) (which is open source) and imported my old Roam notes. I have a public version of my memex at [kb.iter.ca](https://kb.iter.ca/) but most of my notes aren’t public.

## Usefulness

### Event notes

The majority of my note-taking is taking notes on what gets discussed at various events I go to in Toronto, mostly the local AI safety events. I find that taking notes is helpful for internalizing what's being said. I very rarely end up referring to those notes later though; almost all of the information in them is easier for me to find through web searches or LLMs.

### Ideas

I jot down any good ideas that pop into my mind in my knowledge base. It’s helpful to have tags so that I can categorize them and easily see all the ideas I have in a given category. This is helpful but not *that* helpful, mostly because I don’t have that many good ideas that I want to use in the future.

### Life tracking

I also use it to record the events I go to and places I visit. Not super useful for me but I can make most of this public and let other people see what I’ve been up to if they really want to know. Sometimes I use it like Twitter but for thoughts nobody cares about.

### Life planning

I use it to plan what stuff I want to do during the year with pages that I update as I work on my plans. Pretty useful to have all of that in one place instead of having to search through my Google Docs to find the right document.

### Searching

Logseq lets you search through notes, but recently I’ve started defaulting to using Claude Code for more complicated queries since it’s pretty good at finding notes that don’t use the exact words you’re thinking of, because Logseq stores notes as just directories of Markdown files.

## My Logseq setup

I just use Logseq out of the box without any fancy plugins. I track all of my notes in a private GitHub repo. Logseq doesn’t have great support for Git, on mobile you have to use Termux shortcuts to commit/push/pull from your remote Git repo. I use [export-logseq-notes](https://github.com/dimfeld/export-logseq-notes) to extract all of the blocks labelled “Public” and generate the HTML for the public website which gets deployed on Neocities.

## Website integration

I plan on integrating the content from my memex into this website eventually, instead of having it live on a separate subdomain. Right now the content for my blog posts and [a few random pages](https://iter.ca/p/) are separate from my memex; I might merge that into my knowledge base so I can manage everything in Logseq.

## Fin

Overall having a memex isn’t as useful as I originally thought it would be, but it’s still a fairly useful place for me track my notes and activities.

[^1]:  With more than 50 characters 
