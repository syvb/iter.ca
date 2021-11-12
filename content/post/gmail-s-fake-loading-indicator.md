+++
date = "2020-07-04T00:00:00Z"
description = "Gmail's loading progress bar doesn't *actually* measure the progress of loading."
tags = ["google"]
title = "Gmail's fake loading indicator"
+++

Whenever I visit Gmail, I see its loading indicator for a fraction of a second before it loads:

![A looping image of an envelope opening, with the text "Loading Gmail" below it](/gmail-load-fast.gif)

Here's what it looks like when I artifically make my network connection dial-up speed, preventing Gmail from loading within a reasonable time (it would take several minutes for Gmail to actually load, but you couldn't tell that from the loading bar):

![A looping image of an envelope opening, with the text "Loading Gmail" below it. A loading bar appears, which fills up quickly at first, but then slows down, and eventually stops moving entirely.](/gmail-load-slow.gif)

Some investigation reveals that Gmail's loading bar **isn't an actual loading bar**! In fact, it's progress is controlled by a CSS animation that makes it start fast, then slow down, then just stand still until Gmail is loaded. This defeats the point of a loading bar: it's supposted to give an estimate of progress, not fill up at a rate entirely unrelated to actual loading!
