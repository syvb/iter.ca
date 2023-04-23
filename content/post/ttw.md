+++
date = "2020-08-26T13:00:00+00:00"
description = "It randomly samples what you are doing"
tags = ["internet", "programming", "ttw"]
title = "TagTime Web: my stochastic time tracking web app"

+++

Recently I've been working on [TagTime Web](https://ttw.smitop.com) (my server, but you can host your own). It's an [open-source](https://github.com/syvb/ttw) web-based version of the original [TagTime](https://github.com/tagtime/TagTime). It uses _stochastic time tracking_, which randomly samples what you are doing through out the day (on average 45 minutes apart by default). [This page](http://messymatters.com/tagtime/) explains it quite well. I have also made [a video](https://www.youtube.com/watch?v=cJpE018QEkQ) about how this type of time tracking works, and a [demonstration video](https://www.youtube.com/watch?v=FwpF0fqh7uU).

Here are some features it has:
- Each tag gets a unique colour based on the name of it
- Tag autocomplete
- Dark mode
- Mobile support
- Offline support (it is a PWA)
- Filtering pings
- Charts!
    - ![Daily distribution](/ttw-dailydist.png)
    - ![Daily trend](/ttw-dailytrend.png)
    - ![Matrix](/ttw-matrix.png)

[Check it out!](https://ttw.smitop.com)
