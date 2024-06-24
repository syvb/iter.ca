+++
date = "2024-06-24T00:00:00Z"
description = "I broke my mail server by forgetting to update a DNS record"
tags = ["programming", "email"]
title = "Reolving an email deliverablity mystery"
ai = "claude-3.5-sonnet"
draft = true
+++

<!-- tl;dr: I forgot to update a TLSA record so I couldn't receive emails from ProtonMail or Microsoft. -->

As a self-hosted email enthusiast, I recently encountered a weird issue with my email server. I run my on mail server, using [Mail-in-a-Box](https://mailinabox.email/) (which uses Postfix as the mail transfer agent) with some modifications I made myself.

## The symptoms

So I didn't get an email someone sent me from ProtonMail. To investigate, I set up a test account and tried sending emails to various addresses, and I got all of them except for the one I sent to my own mail server.

At first I thought the problem might be on ProtonMail's end, given that emails were successfully reaching other providers. However, as we'll see, the issue was closer to home.

## The investigation

Since I run the mail server myself, I checked my Postfix logs (at `/var/log/mail.log`) and saw that I was indeed getting connections from ProtonMail:

```
Jun 23 19:18:00 box postfix/smtpd[31194]: connect from mail-40141.protonmail.ch[185.70.40.141]
Jun 23 19:18:00 box postfix/smtpd[31194]: disconnect from mail-40141.protonmail.ch[185.70.40.141] ehlo=1 starttls=1 quit=1 commands=3
Jun 23 19:18:01 box postfix/smtpd[31194]: connect from mail-0201.mail-europe.com[51.77.79.158]
Jun 23 19:18:02 box postfix/smtpd[31194]: disconnect from mail-0201.mail-europe.com[51.77.79.158] ehlo=1 starttls=1 quit=1 commands=3
Jun 23 19:18:02 box postfix/smtpd[31194]: connect from mail-41103.protonmail.ch[185.70.41.103]
Jun 23 19:18:03 box postfix/smtpd[31194]: disconnect from mail-41103.protonmail.ch[185.70.41.103] ehlo=1 starttls=1 quit=1 commands=3
```

So ProtonMail was connecting to my server, and failing to deliver any mail each time.

You can [configure Postfix to log full SMTP transactions](https://serverfault.com/a/419829/794150), so I added ProtonMail's IPs to the `debug_peer_list` and tried again. Here's the SMTP flow I extracted from the logs:

```
> 220 box.smitop.com ESMTP Hi, I'm a Mail-in-a-Box (Ubuntu/Postfix; see https://mailinabox.email/)
< mail-4327.protonmail.ch[185.70.43.27]: EHLO mail-4327.protonmail.ch
> 250-box.smitop.com
> 250-PIPELINING
> 250-STARTTLS
[... other capabilities omitted ...]
> 250 DSN
< STARTTLS
> 220 2.0.0 Ready to start TLS
[TLS handshake]
< QUIT
> 221 2.0.0 Bye
```

(I don't know why that log shows the response to the EHLO before the request)

The TLS handshake was completing successfully, and the ProtonMail mail server was able to speak enough TLS to send a `QUIT` command, but it wasn't delivering any mail. What could be causing this behavior?

## Maybe it was caused by the Let's Encrypt certificate?

At first I thought ProtonMail might not like the Let's Encrypt certificate I was using. I noticed that many large email providers don't use Let's Encrypt for their SMTP servers - maybe that's the problem? I did some more testing I found that [MXroute](http://mxroute.com/) could receive emails from ProtonMail despite using Let's Encrypt, so I tentatively ruled out the certificate as being the problem.

## It was DNS

After Googling for `"ehlo=1 starttls=1 quit=1 commands=3"` (which is how Postfix logs a TLS connection with 3 commands and a quit) I found several posts that mentioned incorrect TLSA records as causing the problem.

TLSA records are part of DANE (DNS-based Authentication of Named Entities), which allows domain owners to specify which TLS certificate should be used by a service. If the TLSA record is invalid or outdated, some mail servers refuse to continue the connection after the TLS handshake.

Only a few email providers, such as ProtonMail and Microsoft, actually check TLSA records. This explains why most of my test emails were getting through fine, while ProtonMail consistently failed.

### Why didn't I notice this earlier?

I did get some emails about this when it broke. The first from a Mail-in-a-Box monitoring script on 2023-07-19, but it sends a lot of status check change emails so I didn't really pay attention to that. I got one the next day from the [DNSSEC and SMTP DANE TLS adoption survey](https://stats.dnssec-tools.org/explore/), which I really should have paid attention to.

### How did this break?

I don't really know. I think I updated some APT packages around when it broke? It's not clear to me if I need to update the TLSA record every time I get a new certificate from Let's Encrypt.

## On TLSA checking

Most email providers don't check TLSA records - AFAIK ProtonMail, and (sometimes?) Outlook (but maybe not MS Exchange Email?) are the only major email providers that check it. The fact that only a few providers check TLSA records raises an interesting question: Should more email providers be doing these checks? Implementing DANE checks can enhance security by providing an additional layer of authentication for TLS certificates. This can help prevent man-in-the-middle attacks and improve the overall security of email communications.

On the other hand, as my experience shows, TLSA records can be a source of problems if not maintained correctly. Widespread adoption of TLSA checking could potentially lead to more delivery issues for self-hosted and smaller email servers where DNS records might not be as meticulously maintained. While increased security is always desirable, it needs to be balanced against practical considerations of maintenance and compatibility.

## The solution

I fixed my TLSA record in my DNS provider (Cloudflare), and my test emails ProtonMail started flowing in!

You probably shouldn't run your own mail server.
