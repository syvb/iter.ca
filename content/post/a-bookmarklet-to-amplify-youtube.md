+++
date = 2019-11-15T05:00:00Z
description = "A bookmarlet to amplify YouTube videos."
tags = ["javascript", "youtube"]
title = "A bookmarklet to amplify YouTube"

+++
Want to amplify YouTube videos? Often when I'm watching one I'll find it isn't loud enough. That's when I use this bookmarklet.

Drag this to your bookmarks bar, and use it on a YouTube video:
{{< rawhtml >}}
<a href='javascript:(function () { function amplifyMedia(mediaElem, multiplier) { var context = new (window.AudioContext || window.webkitAudioContext), result = { context: context, source: context.createMediaElementSource(mediaElem), gain: context.createGain(), media: mediaElem, amplify: function(multiplier) { result.gain.gain.value = multiplier; }, getAmpLevel: function() { return result.gain.gain.value; } }; result.source.connect(result.gain); result.gain.connect(context.destination); result.amplify(multiplier); return result; } amplifyMedia(document.querySelector(".html5-main-video"), 3.5); })()'>Amplify YT</a>
{{< /rawhtml >}}
