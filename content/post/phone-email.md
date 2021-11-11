+++
date = "2021-11-30T00:00:00Z"
description = "How visual voicemail systems work"
tags = ["tailscale"]
title = "The Phone app has an email client"
draft = true
+++

<!--
TODO:
- iphone
-->

[_Zawinski's Law_](https://en.wikipedia.org/wiki/Jamie_Zawinski#Notable_quotes) states: 
> Every program attempts to expand until it can read mail. Those programs which cannot so expand are replaced by ones which can.

This is true of the _Phone_ apps on Android and iOS, which both have an integrated IMAP client, used to interact with visual voicemail.

How normal voicemail works (expandable)
- Mobile carriers support _forwarding numbers_[^fornum]: when a call isn't picked up after a certain number of rings, the call is forwarded to another number. This is how voicemail works on on mobile phones: on-device voicemail wouldn't be able to handle calls when the phone is turned off, so if you want to be able to get voicemail without an always-on phone you need to forward calls to an external service. Mobile carriers almost universally provide a voicemail service for their customers that works as such a forwarding number.
[^fornum]: There are actually multiple types of forwarding that vary under what conditions the call is forwarded.

Without visual voicemail, voicemail recipients have to check their voicemail by calling a specified number and interacting with the system using the dial pad. SIM cards can store a voice mail number on them, and this number can be changed (although not all operating systems actually provide a mechanism for doing so). Dialer apps on smartphones support holding the 1 key to call this number, eliminating the need to remember it.

Navigating a voicemail system using a dial pad is fairly clunky and annoying. Visual voicemail provides a more convenient way to check one's voicemail that works in addition to calling in. With visual voicemail, you can interact with your voicemail without needing to call your voicemail number. Visual voicemail is supported by many carriers, although it is common for them to charge an additional fee for the luxury of more convenient and accessible usage.

[screenshot of voicemail]

The [visual voicemail standard](https://www.gsma.com/newsroom/wp-content/uploads//TS.46-v2.0.pdf) implemented by the Android Phone app sends voicemail messages using IMAP. When visual voicemail is enabled by the carriers, information about the visual voicemail server is sent using binary SMS messages. The server address is sent as a DNS name, which in practice tends to resolve to a `10.*.*.*` IP that can only be accessed over mobile data. Some carriers zero-rate data charges for traffic to their internal IPs.

Metadata about the messages, such as information about the caller, is encoded into headers of the messages transmitted over IMAP. The message itself is an attachment. The spec has a few example messages, but they got a bit mangled when typed into a word processor and converted to a PDF. Here's Example C, a typical voicemail message, unmangled:

```eml
Return-Path: <>
Received: from msuic1 (10.106.145.31) by MIPS.SITE1 (MIPS Email Server) id 45879DD300000196 for 11210@vi.com; Tue, 19 Dec 2006 12:12:09 +0200
subject: voice mail
MIME-Version: 1.0 (Voice Version 2.0)
Message-Id: <31.24.2326006@msu31_24>
Content-Type: Multipart/ voice-message; boundary="------------Boundary-00=_90NIQYRXFQQMYJ0CCJD0"
From: 771004@vi.com
To: 771000@vi.com
Content-Duration: 17
Message-Context: voice-message
Date: Tue, 19 Dec 2006 10:12:09 +0000 (UTC)
--------------Boundary-00=_90NIQYRXFQQMYJ0CCJD0
Content-Type: Text/Plain
Content-Transfer-Encoding: 7bit
click on attachment
--------------Boundary-00=_90NIQYRXFQQMYJ0CCJD0
Content-Type: audio/amr
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="vm.amr"
Content-Duration: 17
[message attachment]
--------------Boundary-00=_90NIQYRXFQQMYJ0CCJD0--
```
In that message, the sender and receiver are both identified by email addresses (`771004@vi.com` and `771000@vi.com`). The local part of the emails are the phone numbers of the parties, and the domain is one owned by the telecom provider. Number emails aren't just used for visual voicemail: most carriers support sending emails to the number emails, and convert it into a SMS sent to the reciever.[^numeml] For example, you can send an email to [`[number]@vtext.com`](https://www.verizon.com/support/text-messaging-faqs/#itemtext-from-email) to send an SMS to a Verizon phone from the comfort of your email client. (and for some reason you have to use `vzwpix.com` instead if you want to "include an attachment, like a picture or emoji", because just having one domain for everything and acting differently based on message content would be too hard for Verizon).

 The message audio is stored in an `.amr` file, which is [a file format](https://en.wikipedia.org/wiki/Adaptive_Multi-Rate_audio_codec) specifically optimized for compressing human speech, and has wide adoption.
[^numeml]: And some, like mine, send a message saying that you need to upgrade to a plan with number email support to be able to view the message.

Visual voicemail is a good example of reusing existing, well-tested, protocols when possible, instead of coming up with a new domain specific protocol. Voicemails fit fairly well onto the model of IMAP, so it makes sense to reuse the IMAP protocol for them.
