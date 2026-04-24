+++
title = "LLMs are pretty good at making slideshows now"
description = "I've used LLM agents to make slideshows and they're good"
tags = ["ai"]
date = "2026-04-23T00:00:00Z"
+++


I’ve used various LLM agents to make slideshows for me in the last few months, and they’ve gotten very good at it.

## What works
Here are three things I’ve found work well for improving slideshow creation with LLM agents to allow them to edit the slides better:
1. Give the agent a way to see what the slides look like.
	- Otherwise it ends up making slides with overflowing text or misaligned elements that you have to keep telling it to fix.
2. Let the agent update the slideshow as a text file that defines everything.
	- Having everything in one file that the agent can directly edit as text works much better than making tool calls to a slideshow API or browser use tools with a slideshow editor.
3. Tell the agent to be creative with slide design.
	- Telling the agent to be more creative with how it does things seems to help a bit.

## Various agents
Here are my thoughts on various LLM agents I’ve tried for making slideshows.

### Claude Design
[Claude Design](https://claude.ai/design) is a new thing from Anthropic that lets you use Claude to make creative visual works as HTML pages. It implements all of the principles I described above, and it can make very good slideshows just from some notes you give it. Claude Design is *really good* at making interesting, unique slideshow designs. I was pretty surprised at how good it is at making creative ideas for slide formats; it is better than me at designing them.

Here's an example slideshow I had Claude Design create (you should be able to click on it, then use arrow keys to navigate); you can view the frame's source if you want to see how Claude implemented it:

{{< rawhtml >}}
<iframe src="/pta-slideshow/" style="
    width: calc(100vw - 16px);
    max-width: 45rem;
    aspect-ratio: 16 / 9;
    border: 0;
" loading="lazy" title="Plain-text Accounting slideshow made with Claude Design"></iframe>
{{< /rawhtml >}}

Claude Design has built-in support for making slideshows, and it seems Anthropic created a new library that implements a `<deck-stage>` custom element for Claude Design to use with slideshow creation (with integrations in the Claude Design UI for exporting as a PPTX file).

One problem is that the rate limits for Claude Design are separate from your main limits, and pretty low. Like making a single 10-slide show from 1 prompt uses ~10% of your weekly Claude Design usage quota. I don’t know why they have a separate, lower quota for Claude Design.

### Claude Code writing LaTeX
I’ve also had good experiences from telling Claude Code to write a slideshow in LaTeX with Beamer, although this requires more setup and manual work. Also Claude Code will make a few mistakes writing the slideshow LaTeX, but it can fix those itself from the error messages it sees when it tries to compile it.

### Claude in Chrome
I tried using Claude in Chrome to make a slideshow with Google Slides, and it worked but the slideshow was pretty uninspired. I think a large part of this might be that making it look good would require Claude having a better grasp of the Google Slides interface, which is difficult to interact using just browser use.

### Gemini in Google Slides
Google Slides has a Gemini integration that you can access from the Gemini icon in the top right when editing a slideshow (you can’t use it from gemini.google.com). Unfortunately it’s not very good. Despite the fact that it has direct access to edit Google Slides (instead of going through browser use), it’s still worse than Claude in Chrome. Gemini can only edit/create one slide at a time and seems to avoid even planning multiple slides at once. The first time I tried to use it, Gemini accidentally deleted the slide I was looking at instead of creating a slide. It also isn't very good at making creative designs.
