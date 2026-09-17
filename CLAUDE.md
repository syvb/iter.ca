## Regeneration

NEVER manually regenerate `data/data.json` or run `regen.sh`. Regeneration is handled entirely by GitHub Actions (see `.github/workflows/regen.yml`). It runs automatically on pushes to `notes/` and on a daily schedule.

## Adding posts

When adding posts (notes in `notes/`), use Toronto time for the `Date` field.

## Building

Don't run `hugo` directly (no `hugo build`, `hugo server`, version checks, etc.).

## Images and static files

`static/ext/` is gitignored and regenerated from external URLs by `subrepos.sh`; never put files there by hand. Check in locally-authored images (screenshots, charts) directly under `static/` (e.g. `static/foo.png`, referenced as `/foo.png`).

## Post content

When turning a note or draft into a post, NEVER edit the prose yourself: no rewording, capitalization, punctuation, or added articles. Only change structure (front matter, markdown formatting, image tags) and say what you changed.

## Comments

A post gets a comment section from a single front matter param pointing at the Bluesky thread for it:

```toml
bsky = "https://bsky.app/profile/iter.ca/post/<rkey>"
```

That param is the whole change; nothing else needs editing. `themes/smitop/layouts/post/single.html` renders `#comments` only when `.Params.bsky` is set, and its inline script fetches `https://i--435e5bde84d411f196151607ee4eb77e.web.val.run/?bsky=<url>`, which resolves the thread and returns `{comments, sources}`.

Given a Bluesky URL, confirm which post it belongs to from the link embed instead of guessing from the text:

```sh
did=$(curl -sS "https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=iter.ca" | jq -r .did)
curl -sS "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://$did/app.bsky.feed.post/<rkey>&depth=0" \
  | jq '{text: .thread.post.record.text, link: .thread.post.record.embed.external.uri}'
```

The embed's `link` is the `iter.ca/post/<name>/` URL, which maps to `content/post/<name>.md`.

To find the most recent post:

```sh
grep -H '^date = ' content/post/*.md | sort -t'"' -k2 -r | head -5
```

Verify by curling the comments endpoint with the new URL; a URL it can't resolve comes back with no `sources` entry. `"comments": []` just means no replies yet, which is normal for a fresh post.
