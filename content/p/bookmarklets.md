+++
Title = "My bookmarklets"
+++

These are various bookmarklets I use. You can drag them to your bookmarks bar, then click to activate them when desired.

- **<a href="javascript:(function () { function amplifyMedia(mediaElem, multiplier) { var context = new (window.AudioContext || window.webkitAudioContext), result = { context: context, source: context.createMediaElementSource(mediaElem), gain: context.createGain(), media: mediaElem, amplify: function(multiplier) { result.gain.gain.value = multiplier; }, getAmpLevel: function() { return result.gain.gain.value; } }; result.source.connect(result.gain); result.gain.connect(context.destination); result.amplify(multiplier); return result; } amplifyMedia(document.querySelector(&quot;.html5-main-video&quot;), 3.5); })()">Amplify YouTube</a>** - makes the currently playing YouTube video 3.5x louder, for poorly volume adjusted videos
- **<a href="javascript:void open(&quot;https://web.archive.org/save/&quot; + location.href, &quot;toolbar=no,width=10,height=10&quot;);">Archive</a>** - archive the current page in [the Wayback Machine](https://web.archive.org/)
- **<a href="javascript:document.head.innerHTML+='&lt;style&gt;*{color:black!important;background:white!important}&lt;/style&gt;';void 0">Color 🡒 light</a>** - for low contrast websites, try to force it to be black and white so I can read it easily
- **<a href="javascript:document.head.innerHTML+='&lt;style&gt;*{color:white!important;background:black!important}&lt;/style&gt;';void 0">Color 🡒 dark</a>** - as above, but dark mode
- **<a href="javascript:(document.head||document.children[0]).innerHTML+='<style>*{outline: 1px solid red !important}</style>';void 0">Debug bounds</a>** - shows box boundaries
