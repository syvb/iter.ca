+++
date = "2024-06-24T00:00:00Z"
description = "I broke my mail server by forgetting to update a DNS record"
tags = ["programming", "email"]
title = "Resolving an email deliverability mystery"
ai = "claude-3.5-sonnet"
+++

<!-- tl;dr: I forgot to update a TLSA record so I couldn't receive emails from ProtonMail or Microsoft. -->

As a self-hosted email enthusiast, I recently encountered a weird issue with my email server. I run my own mail server, using [Mail-in-a-Box](https://mailinabox.email/) (which uses Postfix as the mail transfer agent) with some modifications I made myself.

Someone sent me an email from ProtonMail, but I never received it. To investigate, I created a test account on ProtonMail and tried sending emails to my email addresses at several providers. I received all of them except for the one I sent to my own mail server.

## The investigation

I checked my Postfix logs (at `/var/log/mail.log`) and saw that I was indeed getting connections from ProtonMail (and it was trying from 3 different IPs!), but it was disconnecting without sending any mail:

```
Jun 23 19:18:00 box postfix/smtpd[31194]: connect from mail-40141.protonmail.ch[185.70.40.141]
Jun 23 19:18:00 box postfix/smtpd[31194]: disconnect from mail-40141.protonmail.ch[185.70.40.141] ehlo=1 starttls=1 quit=1 commands=3
Jun 23 19:18:01 box postfix/smtpd[31194]: connect from mail-0201.mail-europe.com[51.77.79.158]
Jun 23 19:18:02 box postfix/smtpd[31194]: disconnect from mail-0201.mail-europe.com[51.77.79.158] ehlo=1 starttls=1 quit=1 commands=3
Jun 23 19:18:02 box postfix/smtpd[31194]: connect from mail-41103.protonmail.ch[185.70.41.103]
Jun 23 19:18:03 box postfix/smtpd[31194]: disconnect from mail-41103.protonmail.ch[185.70.41.103] ehlo=1 starttls=1 quit=1 commands=3
```

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

The TLS handshake was completing successfully, and the ProtonMail mail server was able to speak enough TLS to send a `QUIT` command, but it wasn't delivering any mail - it was just immediately quitting. What could be causing this behavior?

## Maybe it was caused by the Let's Encrypt certificate?

At first, I thought ProtonMail didn't like the Let's Encrypt certificate I was using. I noticed that many large email providers don't use Let's Encrypt for their SMTP servers—maybe that's the problem? I did some more testing, and found that [MXroute](http://mxroute.com/) could receive emails from ProtonMail despite using Let's Encrypt, so I tentatively ruled out the certificate issuer as being the problem.

## It was DNS

After Googling for `"ehlo=1 startftls=1 quit=1 commands=3"` (which is how Postfix logs a TLS connection with 3 commands and a quit) I found several results that mentioned incorrect TLSA records as causing the problem.

TLSA records are part of DANE (DNS-based Authentication of Named Entities), which allows specifying which TLS certificate should be used by a service in DNS. If the TLSA record corresponds to the wrong certificate, some mail servers quit the SMTP transaction after the TLS handshake. DANE is only useful if the DNS zone is signed with DNSSEC (or the client has some other means of ensuring the DNS records are authentic); otherwise an attacker that can MITM the SMTP connection could just MITM the DNS lookup as well.

DANE isn't very useful in most cases - mail transfer agents already verify that the certificate domain matches the mail server domain, so it only provides extra security against rogue certificate authorities.

### The solution

I checked my TLSA record and found that it was indeed outdated. I updated the record in my DNS provider (Cloudflare) to have the correct key, and my test emails from ProtonMail started flowing in!

### Why didn't I notice this earlier?

I did get some emails about this when it broke. The first was from a Mail-in-a-Box monitoring script on 2023-07-19, but it sends a lot of status check change emails so I didn't really pay attention to that. I got one the next day from the [DNSSEC and SMTP DANE TLS adoption survey](https://stats.dnssec-tools.org/explore/), which I really should have paid attention to.

### How did this break?

I don't really know. I think I updated some APT packages around when it broke? It's not clear to me if I need to update the TLSA record every time I get a new certificate from Let's Encrypt.

## On TLSA checking

Most email providers don't check TLSA records - AFAIK ProtonMail, and (sometimes?) Outlook (but maybe not MS Exchange Email?) are the only major email providers that check it. Should more email providers be doing these checks? I don't know, probably?
