+++
date = "2021-11-15T00:00:00Z"
description = "I analyze hundreds of publically available hostnames."
tags = ["tailscale"]
title = "What hostnames do people use?"
toc = true
image = "/tsnet/category-pie.svg"
image_alt = "A pie chart of various hostname categories. Intended usage is 17.9%, Software running is 14.7%, Non-descriptive word is 13.4%, Random characters is 11.4%, Hardware is 8%, Made-up word is 5.4%, Default name is 4.3%, Human-like name is 4.3%, Hosting provider is 3.9%, OS name is 3%, Fictional thing is 2.8%, Hardware+Name is 1.9%, Non-English word is 1.7%, Physical location is 1.7%."
draft = true
+++

## Getting the data

Browsers have been increasingly pushing for higher HTTPS adoption in recent times. Many browsers now display a "Not secure" indicator for websites that still use HTTP. For the most part, this is a good thing: HTTPS provides better privacy and security for users. However, it presents an issue for internal websites that are always accessed over a secure underlying transport layer anyways. The most common secure transport layer is the loopback address: since the traffic never leaves your computer, there is no risk of someone intercepting your traffic. As such, `localhost` [is special cased to be treated a secure origin in Chromium](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features#TOC-Definitions-) and other browsers.

Another case of when the underlying transport layer already provides transport security is when the host is accessed over a virtual private network (VPN) that provides sufficent security. [Tailscale](https://tailscale.com/) is one such VPN solution. When the Tailscale daemon is running, it [attempts to set the local DNS server](https://tailscale.com/blog/sisyphean-dns-client-linux/) to `100.100.100.100`, and handles DNS traffic to that address locally, resolving certain special domains to [CGNAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) addresses that are used for aidentifying hosts.

```bash
# querying tailscaled's internal DNS server
$ dig @100.100.100.100 +short pop1.xerus-coho.ts.net
100.96.112.51

# querying public DNS server
$ dig @9.9.9.9 +short pop1.xerus-coho.ts.net
# [no addresses found]
```
{{<rawhtml>}}<br>{{</rawhtml>}}

When visiting websites hosted on nodes in one's Tailscale network (Tailnet) in a browser, they are not treated as a secure origin -- *even though they are*! Tailscale encrypts traffic as it is sent through the network using the public key of the recieving node. But since VPNs are completely transparent to the browser, it just doesn't know that the underlying transport layer is secure.

Tailscale offers a solution to this problem: the [`tailscale cert`](https://tailscale.com/kb/1153/enabling-https/), which provisions a [Let's Encrypt](https://letsencrypt.org/) certificate for your `ts.net` subsubdomain using a DNS challenge. The Tailscale client asks the Tailscale backend to update the DNS for a subdomain to prove ownership of the domain. The private key and certificate signing request are generated locally, so Tailscale servers never know your private key.

All certificates issued by [Let's Encrypt](https://letsencrypt.org/) are appended to a public [Certificate Transparency](https://certificate.transparency.dev/) log. Certificates are added to a tamper-evident Merkle tree (like a blockchain, except each certificate gets its own block) by certificate authorities after they are issued. Browsers require that certain certificates appear in Certificate Transparency logs, and this includes the ones issued for `ts.net` subdomains. We can search through these Certificate Transparency logs to find all domains that have certificates issued for them. We can use this to find out what hostnames people are running `tailscale cert` on! Keep in mind that this data is biased towards hostnames that people want to create certificates for, so it might not be representive of all hostnames.

## The data

I got all `ts.net` subdomains listed in certificate transparency logs on {{<rawhtml>}}<time datetime="2021-10-18">October 18, 2021</time>{{</rawhtml>}}, and ontologized all of them into a single category. In cases like `johnny-surface-laptop`, which include multiple categories, I used a category that combines the two: `OS+User` in this case. I probably have made some mistakes in collating the data. If you want to play with the data, you can grab [the spreadsheet as a CSV](/tsnet/ts.csv).

## Interesting results

The data includes the 312 Tailscale users who used `tailscale cert`, and a total of 464 hostnames. This means that the average user has 1.49 hostnames exposed using `tailscale cert`. First-level subdomains of `ts.net` represent Tailnets, and second-level subdomains are the actual hosts in Tailnets. The first-level subdomains have random labels, like `xerus-coho` to anonymize the Tailnet owner somewhat. The most is `tailnet-cdb8` with 26, and in second place is `corp` with 9. `corp` appears to be used for services internal to Tailscale Inc. It shouldn't be possible for the Tailnet part of the domain to be `corp` -- it doesn't fit the allowed name structures, but Tailscale gave themselves the one and only vanity name.[^corp] Here are those hostnames in `corp`: `builds`, `bradfitz`, `paintest`, `tshello`, `test-builder`, `tsdev`, `changelog`, `bronzong`, and `pain`(?).

[^corp]: More solid evidence for this: a Tailscale employee [explictly confirming this to be the case](https://github.com/tailscale/tailscale/pull/2709#issuecomment-905671082)

Here's what the most popular categories I assigned are:
![A pie chart of various hostname categories. Intended usage is 17.9%, Software running is 14.7%, Non-descriptive word is 13.4%, Random characters is 11.4%, Hardware is 8%, Made-up word is 5.4%, Default name is 4.3%, Human-like name is 4.3%, Hosting provider is 3.9%, OS name is 3%, Fictional thing is 2.8%, Hardware+Name is 1.9%, Non-English word is 1.7%, Physical location is 1.7%.](/tsnet/category-pie.svg)

Most hostnames describe how the host is intended to be used. More interesting are the 37% of names that are entirely unrelated to the intended use or hardware. This includes hostnames like:
- Non-descriptive words: `spike`, `slab`, `cardinal`
- Made-up words: `lois`, `gimli`, `thopter`
- Pokémon: `mewtwo`, `mew`, `bronzong`
- Random characters: `nas484e5d`, `otx82wn9xnzcygap6bsc`, `o25e62iw8ab88gg8`

Using a hostname unrelated to what is happening on the host allows for more flexibility if the use changes in the future. It makes less sense for virtual machines with a particular use determined at creation time.

Only 14.2% of hostnames have duplicates: 86% of hostnames are unique.

![A bar chart. raspberrypi at 11; pihole at 5; brix, monitoring, nuc, pi, pikvm, ubuntu at 3; code, ha, homeassistant, hub, kali, media-nas, nas, nextcloud, octopi, payments, pi4, pihole-1, pihole-2, pop-os, pve at 2](/tsnet/common-hostnames.svg)

[Raspberry Pi](https://www.raspberrypi.org/) related hostnames are suprisingly popular there.

### Shared-hostname graph
Two Tailnets have a line between them if they share a hostname:
{{<rawhtml>}}
<img src="/tsnet/shared-names.svg" alt="A diagram of various Tailnets, connected toeghetr. There are 2 large clusters and many smaller clusters." style="max-width:45rem">
{{</rawhtml>}}
The biggest clusters are networks with `raspberrypi`, the second largest is networks with `pihole`.
