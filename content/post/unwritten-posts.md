+++
date = "2026-04-10T00:00:00+00:00"
description = "Blog posts on the cutting room floor"
tags = ["meta"]
title = "Blog posts I won’t write"
+++

I’m doing Inkhaven (writing retreat where you have to write a blog post every day), so I’ve spent a while looking at my list of posts to write. Someone else [wrote about the posts from their list they won't write](https://aarongertler.com/posts-i-will-not-be-writing/) and this is such a good concept I’ll do the same.

## Too short

Here are some interesting things that I couldn’t get 500 words out of.

* Everyone uses the wrong MATLAB logo  
  * The MATLAB logo is non-free, so the [Wikipedia article for MATLAB](https://en.wikipedia.org/wiki/MATLAB) uses an open-source recreation of the function plot for the MATLAB logo. Lots of places use this open-source recreation instead of the real logo.  
* Debugging CSS with `outline`  
  * Make a bookmark with `javascript:(document.head||document.children[0]).innerHTML+='<style>*{outline:%201px%20solid%20red%20!important}</style>';void%200` and click on it to see all of the element bounds on a webpage.  
* Don't use `font-display: block`  
  * This blocks rendering text until the fonts load, which makes me sad :(  
* Here’s a bad math poster  
  * [Here’s a poster](/ext/bad-math-poster.jpg) I saw at a high school I was visiting in 2019 about attendence at math class. Ironically it makes multiple statistical errors (e.g. assuming correlation=causation, having a trendline mostly influenced by a few outliers).  
* It’s “Eastern Time” not “Eastern Standard Time”  
  * People write “Eastern Standard Time” even when they actually mean to use daylight savings time during that part of the year. There’s a name for that, “Eastern Time”. Drop the “Standard”\!  
* `DOMMatrix` is cool  
  * It’s a pretty cool web API but there’s just not enough content to write a full blog post about.  
*  How does Google Meet know the current CPU usage in a diagnostic menu?  
  * There’s no web API to do this, but Google Meet has a diagnostic menu where you can see the current CPU usage when on Chrome. Turns out there’s a [hidden built-in hangout\_services extension](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/resources/hangout_services/thunk.js) that provides this information.  
* How spam text messages know the first 4 digits of your credit card  
  * The first 4 digits are part of the bank identification number (BIN) so in Canada you can take the most common BIN and you’ll probably luck out often enough.  
* Automattic has funny names for their corporate entities  
  * The names: Ministry of Automattic Limited, Automattoque ULC, Ausomattic Pty Ltd, Bubblestorm Management Pty, Tatu Do Bem Tecnologia Ltda, Aut O'Mattic A8c Ireland Ltd

## Misc

* Getting Things GNOME\! will be the final task tracking app I use  
  * This aged poorly \- it was not the final tasking app I use, I ended up bouncing around a few other ones and currently I use Todoist  
* How does Google Forms locked mode work?  
  * You need a Google Workspace for Education account to test this; I added my list when I was in high school but I graduated 3.5 years ago so I can’t really test this anymore.
* XSLT is a good idea, actually
  * I thought about it more and it’s cool but not actually great.  
* How does MMS work?  
  * I started reading through 3GPP documentation of how MMS is implemented but it’s not *that* interesting.  
* *The AI Con* review  
  * I considered reading this book to review it but I don’t actually care it that much.  
* Generating art with code-davinci-002  
  * I really liked talking with this base model (the base model in between GPT-3 and GPT-3.5) when it was released but OpenAI removed it from the API 3 years ago so I can’t generate art with it anymore.

