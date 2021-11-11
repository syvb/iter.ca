+++
date = "2021-11-15T00:00:00Z"
description = "I analyze hundreds of publically available hostnames."
tags = ["tailscale"]
title = "What hostnames do people use?"
toc = true
draft = true
+++

## Explanation

Browsers have been increasingly pushing for higher HTTPS adoption in recent times. Many browsers now display a "Not secure" indicator for websites that still use HTTP. For the most part, this is a good thing: HTTPS provides better privacy and security for users. However, it presents an issue for internal websites that are always accessed over a secure underlying transport layer anyways. The most commons secure transport layer is the loopback address: since the traffic never leaves your computer, there is no risk of someone intercepting your traffic. As such, `localhost` [is special cased to be treated a secure origin in Chromium](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features#TOC-Definitions-) and other browsers.

Another case of when the underlying transport layer already provides transport security is when the host is accessed over a virtual private network (VPN) that provides sufficent security. [Tailscale](https://tailscale.com/) is one such VPN solution. When the Tailscale daemon is running, it [attempts to set the local DNS server](https://tailscale.com/blog/sisyphean-dns-client-linux/) to `100.100.100.100`, and handles DNS traffic to that address locally, resolving certain special domains to [CGNAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) addresses that are used for actually identifying hosts.

```bash
# querying tailscaled's internal DNS server
$ dig @100.100.100.100 +short pop1.xerus-coho.ts.net
100.96.112.51

# querying public DNS server
$ dig @9.9.9.9 +short pop1.xerus-coho.ts.net
# [no addresses found]
```
{{<rawhtml>}}<br>{{</rawhtml>}}

When visiting websites hosted on nodes in one's internal Tailnet in a browser, they are not treated as a secure origin -- *even though they are*! Tailscale encrypts traffic as it is sent through the network using the public key of the recieving node. But since VPNs are completely transparent to the browser, it just doesn't know that the underlying transport layer is secure.

## The data

## Interesting results
