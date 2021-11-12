+++
date = "2021-11-15T00:00:00Z"
description = "I analyze hundreds of publically available hostnames."
tags = ["tailscale"]
title = "What hostnames do people use?"
toc = true
draft = true
+++

## Getting the data

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

Tailscale offers a solution to this problem: the [`tailscale cert`](https://tailscale.com/kb/1153/enabling-https/), which provisions a [Let's Encrypt](https://letsencrypt.org/) certificate for your `ts.net` subsubdomain using a DNS challenge. The Tailscale client asks the Tailscale backend to update the DNS for a subdomain to prove ownership of the domain. The private key and certificate signing request are generated locally, so Tailscale servers never know your private key.

All certificates issued by [Let's Encrypt](https://letsencrypt.org/) are appended to a public [Certificate Transparency](https://certificate.transparency.dev/) log. Certificates are added to a tamper-evident Merkle tree (like a blockchain, except each certificate gets its own block) by certificate authorities after they are issued.Browser require that certain certificates appear in Certificate Transparency logs, and this includes the ones issued for `ts.net` subdomains. We can search through these Certificate Transparency logs to find all domains that have certificates issued for them. We can use this to find out what hostnames people are running `tailscale cert` on!

## The data

I got all `ts.net` subdomains listed in certificate transparency logs on {{<rawhtml>}}<time datetime="2021-10-18">October 18, 2021</time>{{</rawhtml>}}, and ontologized all of them. The data includes the 312 Tailscale users who used `tailscale cert`, and a total of 464 hostnames. This means that the average user has 1.49 hostnames exposed using `tailscale cert`. The most is `tailnet-cdb8` with 26, and in second place is `corp` with 9. `corp` appears to be used for services internal to Tailscale Inc. It shouldn't be possible for the Tailnet part of the domain to be `corp` -- it doesn't fit the allowed name structures, but Tailscale gave themselves the one and only vanity name.[^corp] Here are those hostnames in `corp`: `builds`, `bradfitz`, `paintest`, `tshello`, `test-builder`, `tsdev`, `changelog`, `bronzong`, and `pain`. One hopes that `pain` refers to [the French meaning](https://www.wordreference.com/fren/pain#articleWRD), not the English one.

[^corp]: More solid evidence for this: a Tailscale employee [explictly confirming this to be the case](https://github.com/tailscale/tailscale/pull/2709#issuecomment-905671082)

## Interesting results

Here's what the most popular categories I assigned are:
![Intended usage is 17.9%, Software running is 14.7%, Non-descriptive word is 13.4%, Random characters is 11.4%, Hardware is 8%, Made-up word is 5.4%, Default name is 4.3%, Human-like name is 4.3%, Hosting provider is 3.9%, OS name is 3%, Fictional thing is 2.8%, Hardware+Name is 1.9%, Non-English word is 1.7%, Physical location is 1.7%.](/tsnet/category-pie.svg)
