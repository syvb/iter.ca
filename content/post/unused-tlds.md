+++
date = "2022-05-12T00:00:00Z"
description = "Some new TLDs have very few registrations"
tags = ["programming", "domains"]
title = "TLDs nobody uses"
draft = true
+++

[nTLDStats](https://ntldstats.com/tld/) is a great website for getting statistics about new TLDs. It has information about the breakdown of registrations for new generic top-level domains. It doesn't have information for country code TLDs or older TLDs though, so it's not entirely complete. 

There are 274 new TLDs tied for last place, which nTLDStats lists as all having a single domain.
All new TLDs are required to have at least one registered domain: `nic.[tld]`.
Usually this domain hosts information about the TLD, or just redirects to the website for the registry.
Some TLDs also appear to have a `icann-sla-monitoring.[tld]`, used by ICANN to verify the TLD works.
nTLDStats lists some domains with a `nic` and `icann-sla-monitoring` domain as only having 1 domain.
I don't know why nTLDStats miscounts there: they don't fully explain their data sources, so I don't know what causes this.

A bunch of unused TLDs only have `nic`/`icann-sla-monitoring` domains.
These are mostly [brand gTLDs](https://icannwiki.org/Brand_TLD).
There are four [country code TLDs that are entirely unused](https://en.wikipedia.org/wiki/Country_code_top-level_domain#Lists) (without even a `nic.`) - [.bv](https://en.wikipedia.org/wiki/.bv), [.bl](https://en.wikipedia.org/wiki/.bl), [.sj](https://en.wikipedia.org/wiki/.sj), and [.mf](https://en.wikipedia.org/wiki/.mf).
These are all for overseas territories of Sweeden and France, where the relevant government decided against running a ccTLD for these jurisdictions.

XX nowruz

[Nowruz](https://en.wikipedia.org/wiki/Nowruz) is an Asian holiday

XX bad registrar

If you try to register certain trademarked strings with the `.nowruz` registry, it won't let you:

```bash
$ whois google.nowruz
Domain Name: google.nowruz
Domain Status: Prohibited String - Object Cannot Be Registered
```
{{<rawhtml>}}<br>{{</rawhtml>}}

`google.X` is either blocked or registered for all TLDs, except for `google.kyoto` which could be registered by anyone who has an address in [Kyoto, Japan](https://en.wikipedia.org/wiki/Kyoto).
