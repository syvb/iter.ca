+++
date = "2026-07-07T00:00:00-04:00"
description = "you can malleate Git signatures but it's not that bad"
tags = ["programming", "git", "security"]
title = "Malleating Git commit signatures"
verbose = 1
+++

Recently there was [an article published about how you can malleate Git commit signatures (*Git Hash Chain Malleability*)](https://arxiv.org/pdf/2607.02820): given a signed commit A, anyone can create a new signed commit A’ that is identical in all respects except that it has a different (still valid) signature and therefore also a different commit hash.

Despite what the article says, I don't think this is actually a real-world problem: the malleated commit must still be identical aside from the signature, so you can’t use this to create a verified commit with a different source tree or commit message. None of the proposed attacks in the “Impact” section seem to have any meaningful real-world impact. The case where you have a blocklist of commit hashes (and also verify commit signatures, presumably to some trusted list of people) is the most realistic but still pretty far-fetched (if some of their previous signed commits are bad and you need to blocklist them so you don't use them, it seems like there's a big risk they'll sign another bad commit in the future?).

For this to actually be an issue it would have to let you actually affect the commit in some way other than changing the signature. For example a few years ago I discovered [CVE-2023-2030](https://docs.gitlab.com/releases/patches/patch-release-gitlab-16-7-2-released/#commit-signature-validation-ignores-headers-after-signature) in GitLab, where the issue was that GitLab didn’t include commit headers after the signature but before the commit message in text that’s verified by the signature, which let an attacker add additional commit metadata (e.g. author/encoding) to a normal signed commit while GitLab still treated it as valid (I actually mentioned malleability as an aside in my [bug report](https://gitlab.com/gitlab-org/gitlab/-/work_items/407252) to GitLab but I didn't consider it an issue). I also previously found an issue with [GitHub’s server-side commit-signing flow](https://iter.ca/post/gh-sig-pwn/) that let me create commits with any author that GitHub showed as verified; that was an issue with how the GitHub web flow parsed commits before signing them.

## Malleating commits the easy way
So the paper I linked does some fancy math and signature format stuff to malleate the signature itself, but you don’t actually need to know anything about cryptography or the signature format to malleate a Git commit. Zooming out, Git stores commits as text files in its content-addressed file system like this:

```
tree be0788944df13c5d170e050f2fe178360c3df5a5
parent 7fd1a60b01f91b314f59955a4e4d4e80d8edf11d
author loops <me@iter.ca> 1678388328 -0500
committer loops <me@iter.ca> 1678388328 -0500
gpgsig -----BEGIN PGP SIGNATURE-----
 
 iQIzBAABCgAdFiEEK6cyil0jdmW2bZPmDXSPTJUzsugFAmQKLGgACgkQDXSPTJUz
 sujfNQ/+L8biEVPPOkHzImRlJPGRZ3um2Na3kZrl1KlZmunlSlAIt/vhkYmsuSlj
 [...]
 5EITvupqhzDpeIjgSyY2D2SRBaeXjAUyVH5wPckD8ulorU7vmwLXTLTR/FH3KQZp
 oz1XcwmBOSrPY9NaSjqDq5TsQx7TklhpfMk2sFFNsJLGbwX2lMU=
 =756m
 -----END PGP SIGNATURE-----

First line of commit message

Extended commit body
blah blah blah
```

Git verifies the signature by removing the gpgsig header line (including the indented text after it), and checking that it’s a valid signature for the remaining text. (This is where GitLab previously had an issue: they removed everything between `gpgsig` and `\n\n`, incorrectly *also* removing headers after the gpgsig block[^wnp]).

Crucially, the signature isn’t stored as binary data (because commits are stored as plain text) but encoded into the [PEM format](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) first. The first line of a PEM block (after the \-\-\-\-\-BEGIN) is metadata that gets ignored when you parse the PEM (although GPG requires that it has a colon in it so it's in a key-value format), but we can write whatever we want there. This lets us malleate commits by changing the PEM metadata. You can also do this by adding newlines in the middle of the Base64ed signature since PEM doesn’t require newlines to be in the standard format.

So if you change the commit to be:

```
...
gpgsig -----BEGIN PGP SIGNATURE-----
 Comment: arbitrary text
 iQIzBAABCgAdFiEEK6cyil0jdmW2bZPmDXSPTJUzsugFAmQKLGgACgkQDXSPTJUz
...
```

It will still be valid but have a different commit hash, and so you've malleated the commit without even touching the signature.

[^wnp]: Git itself always puts the `gpgsig` header as the last one, so only attacker-created commits would trigger this behavior.
