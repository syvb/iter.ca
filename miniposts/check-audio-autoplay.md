---
title: "Checking if a browser allows autoplay"
attrib: ["smitop"]
category: "web"
tags: ["programming", "web", "audio"]
---

Some web browsers block autoplay from occuring in video/audio content under some circumstances. Unfortately, there isn't an easy way to deterimine if autoplay works ahead of time. Here's how we can work around that to determine if autoplay is supported by trying to play a dummy audio file and checking what happens:

```js
async function autoplaySupported() {
    const objURL = await fetch("data:audio/wave;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAAAAA==")
        .then(x => x.blob())
        .then(x => URL.createObjectURL(x));
    const audEle = document.createElement("audio");
    audEle.src = objURL;
    let supported = true;
    try {
        await audEle.play();
    } catch (e) {
        supported = false;
    }
    audEle.pause();
    audEle.src = "about:blank";
    URL.revokeObjectURL(objURL);
    return supported;
}
```

We try to play an audio file. The audio file here is the shortest possible one I could create: it is one sample (~20 nanoseconds) of silence. We construct an object URI out of the data URL to make it work properly in Chrome. Then we try to play it and check if the browser errors out due to an autoplay block. After that we clean up after ourselves and get rid of the object URI and references to it. Note that When autoplay is blocked (and `false` is returned), some browsers may print a warning stating that autoplay was blocked to the console. The warning is harmless, but can't be supressed here.
