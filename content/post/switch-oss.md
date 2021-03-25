+++
date = "2021-03-14T05:00:00Z"
description = ""
tags = ["programming"]
title = "Interesting things in Nintendo's OSS code"
+++

The Nintendo Switch (called the Nintendo NX during development and called the NX in the source code) has some open source parts, and Nintendo very kindly allows the source code for these parts to be viewed. They don't make it easy though: you have figure out how to download [a ZIP file from a Japanese website](https://www.nintendo.co.jp/support/oss/). I've [put it on GitHub](https://github.com/Smittyvb/switch-oss) if you want to take a look easily. The source code is almost entirely just the code behind the browser in the Nintendo Switch, although it's not exactly easy to load this browser in the first place without [instructions on how to do so](https://www.lifewire.com/access-nintendo-switch-web-browser-4583984). I'm fairly suprised that Nintendo went through all the effort to include a whole browser in the Switch despite only being used when someone's on a Wi-Fi network that require login -- not exactly a common scenario, given that most of the time Switches will be connected to personal networks without any such weird portals. According to the source code, the name of the browser is "NetFront Browser NX". NetFront appears to be the creator of this browser.

It's not actually possible to run the NetFront Browser NX locally, because it depends on the Switch SDK, which you have to sign an NDA with Nintendo to even get a chance of being able to use.

I've picked out some things that are at least moderately interesting from the OSS source code. Most of the changes Nintendo has done are really mundane, and I've left those out. These mundane things are mostly renaming `main` functions to Nintendo's preferred naming convention (I think they have some sort of testing framework that looks for `testMain`).

Something that happens across all these directories is the use of the `nxLog*` family of functions, which are like `printf` but slightly different to suit the Switch's needs.

## `src_0.16.0` and `src_1.16.10`
I'm not actually sure what or why these directories were included. All of the files in these directories start with a licence that is definitely *not* open-source:
```cpp
/*--------------------------------------------------------------------------------*
  Copyright (C)Nintendo. All rights reserved.

  These coded instructions, statements, and computer programs contain
  information of Nintendo and/or its licensed developers and are protected
  by national and international copyright laws.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *--------------------------------------------------------------------------------*/
```

But if we take a look anyways, it seems like given the weird Assembly and C++ code this is providing the glue for Webkit to work on the Switch OS. Also it seems to imply that the browser is compiled with [musl](https://musl.libc.org/).

## `nss`
Looks like Nintendo is a fan of static linking (`nss/lib/freebl/loader.c`):
```cpp
/*  On NNSDK we statically link all of our libs, so we don't really need to
    load anything or do the symbol redirection done on other platforms.  */
```

They increase the `DEFAULT_OCSP_CACHE_SIZE` from 64 to 1000 on the Switch because I guess more caching is good?

In `nss/cmd/certutil/keystuff.c` they change certificate generation to use the current time (`PR_Now()`) instead of actual randomness to create certificates. I sure hope certificates generated this way were only used for testing...
```cpp
#ifdef NN_NINTENDO_SDK
/*  Rather than take key input, use a psuedo-RNG  */
#define XOR_SHIFT_STAR_64_SPECIAL_VAL   (2685821657736338717ULL)

static PRUint64 xorShiftStar64State = 0;

static PRUint64 genPsRandXorShiftStar() {
    if (xorShiftStar64State == 0) {
        xorShiftStar64State = PR_Now();
    }

    xorShiftStar64State ^= xorShiftStar64State >> 12;
    xorShiftStar64State ^= xorShiftStar64State << 25;
    xorShiftStar64State ^= xorShiftStar64State >> 27;
    return xorShiftStar64State * XOR_SHIFT_STAR_64_SPECIAL_VAL;
}

#endif
```

## `webkit_1.16.10`
The only interesting things here are that the CSS media queries `-webkit-nintendo-switch-device-console` and `-webkit-nintendo-switch-device-handheld` are added. They can be used to detect the if the switch is docked or not. Neat!

## `WKC_0.16.0`/`WKC_1.16.10`
This appears to be the code that takes the libraries and makes them into an actual browser, with the needed UI, and platform integrations. It looks like many of the files here were written for the sole purpose of being used in the Switch browser. Searching for most of the lines in these files turns up only repos with the Switch source code. They have a lot of code `ifdef`ed behind things like `WKC_CUSTOMER_PATCH_0304674`: it appears that NetFront has other clients, and these patches are just for Nintendo (or maybe Nintendo and also some other clients?)

Looks like they're taking a step in the right direction here and disabling support for the outdated SSLv2 and SSLv3 protocols at compile time!
```cpp
#if defined(SSL_OP_NO_SSLv2) && !defined(OPENSSL_NO_SSL2)
#define OPENSSL_SUPPORT_SSLv2
#undef OPENSSL_SUPPORT_SSLv2 // NX never support SSLv2
#endif
#if defined(SSL_OP_NO_SSLv3) && !defined(OPENSSL_NO_SSL3)
#define OPENSSL_SUPPORT_SSLv3
#undef OPENSSL_SUPPORT_SSLv3 // NX never support SSLv3
#endif
```

The Switch browser appears to be one of the first with support for Web NFC, presumably using the NFC reader in the Switch. Neat!

Let me know if you find any other interesting things in the source!
