+++
date = "2021-12-16T00:00:00Z"
description = "The Zopfli compression engine provides very good compression ratios."
tags = ["png", "compression"]
title = "Zopfli is *really* good at compressing PNGs"
+++

Recently I wondered what PNG compression engine was the best.
I had been using [pngcrush](https://pmt.sourceforge.io/pngcrush/) out of habit, but was there a better compressor out there?
As it turns out, yes.
Some initial digging revealed that [PNGOUT](http://advsys.net/ken/util/pngout.htm) was apparently pretty good.
While it was originally created for Windows, there are [ports available for other operating systems](https://www.jonof.id.au/kenutils.html).
Unfortunately, PNGOUT (and those ports) are under [a non-free license](http://advsys.net/ken/utils.htm#pngoutkziplicense), and ["The source code for these tools is not public. Don't bother asking."](https://www.jonof.id.au/kenutils.html).
So: is PNGOUT the best compression engine? Let's find out!

### Testing the engines
I compared 10 PNG compression engines:
[zopflipng](https://github.com/google/zopfli),
[pngout](http://advsys.net/ken/utils.htm),
[FFmpeg](https://ffmpeg.org/),
[pngcrush](https://pmt.sourceforge.io/pngcrush/),
[imagemagick](https://imagemagick.org/index.php),
[optipng](http://optipng.sourceforge.net/),
[oxipng](https://github.com/shssoichiro/oxipng),
[ImageWorsener](https://entropymine.com/imageworsener/),
[AdvanceCOMP](https://www.advancemame.it/comp-readme), and
[pngrewrite](https://entropymine.com/jason/pngrewrite/).
For engines that supported it, I set the compression amount to the highest possible.
I also turned off the optimization where you just do nothing if your attempt to compress the image makes it bigger, since that's a boring optimization that everyone implements anyways.
I only measured how much the engines could compress input files: I didn't measure how long that took.
For images that are served a lot, compression that takes a long time is worth it, since you can compress it up-front to get savings over time.
Maybe in the future I'll factor in the speed of performing the compression.

I sourced test images from:
- Popular images on [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page)
- Popular images on [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) with the "Convert to SVG" tag
- The [pngsuite](http://www.schaik.com/pngsuite/), a suite of images for testing PNG implementations

In total, this amounted to 336 test images.

### The results
I was quite suprised at the results I got once I finished adding support for all engines to my test harness.
The best engine, by a long shot, was [Zopfli](https://github.com/google/zopfli), a compression engine by Google.
It only supports compressing images, so you have to use something else to decompress them.
[They say](https://github.com/google/zopfli/blob/831773bc28e318b91a3255fa12c9fcde1606058b/README#L1-L2):

> Zopfli Compression Algorithm is a compression library programmed in C to perform
> very good, but slow, deflate or zlib compression.

And it is indeed very good: it blows all of the other compression engines out of the water.
Just look at [the comparision table of how each engine does on each image](/pngcomp/): Zopfli is almost always the best.
On average, it can shave 33.4% off of images, while the runner-up, PNGOUT, can only do 17.86%! (yes, some engines indeed make images worse on average, usually due to weird images in the pngsuite being hard to compress):

![A bar chart of the compression rates of various engines. zopflipng has the best at -33.40%.](/png-engine-rates.svg)

(it was a real pain to get [LibreOffice Calc](https://www.libreoffice.org/discover/calc/) to make that chart, the chart interface is not remotely intuitive)

Of the engines, ImageMagick, and FFmpeg were never the best engine to compress an image.
The best pngrewrite, optipng, and oxipng could do is tie for best with Zopfli (and usually they do much worse).
ImageWorsener, PNGOUT, pngcrush, and AdvanceCOMP could sometimes beat Zopfli, but are usually only a few percent better, and only occasionally: Zopfli is the best 87% of the time. The images it tends to be a bit worse on are typically "weird" images that are hard to compress.

So Zopfli is *really* good. You should use it to compress your images! The catch, of course, is that it's very slow. Running Zopfli on all user-generated content might not be a good idea, but compressing your static images can help save a lot of bandwidth! And you *can* save bandwidth: all of the (valid) images in the test suite could be further compressed by at least one engine, and there was [only one image](https://commons.wikimedia.org/wiki/File:VisualEditor_Cite_Pulldown-en.png) that Zopfli was unable to shrink further.

### Nix
The [Nix](https://nixos.org/) package manager was quite useful for performing this analysis. [nixpkgs](https://github.com/NixOS/nixpkgs) had almost all of the engines I needed, already up-to-date. There wasn't any messing around with dependencies! The one compression engine that nixpkgs any didn't have, [pngrewrite](https://entropymine.com/jason/pngrewrite/), was super-simple to use: I just wrote [a short expression](https://github.com/Smittyvb/pngcomp/blob/master/tester/pngrewrite/default.nix) to tell Nix how to build it, and Nix handled everything else for me. Take a look at [the `*.nix` files in the test harness](https://github.com/Smittyvb/pngcomp/search?l=nix) for more details.
