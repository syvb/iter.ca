## About

This is the my private monorepo. The primary thing this repo does is generate content for the iter.ca root domain. GitHub Actions syncs it with with [a public repo](https://github.com/syvb/iter.ca), with various stuff like drafts and some static files removed.

## Regeneration

You may run `./regen.sh` locally to test regeneration of `data/data.json`. Do not commit or push locally regenerated output; only the GitHub Action in `.github/workflows/regen.yml` should commit and push regeneration changes. Keep local test output out of commits without discarding pre-existing changes. The Action runs automatically on pushes to `notes/` and on a daily schedule, and can also be dispatched manually.

## Adding posts

When adding posts (notes in `notes/`), use Toronto time for the `Date` field.

## Adding LessWrong posts

A LessWrong post is linked as a note, not copied into `content/post/`. Add `notes/<short-name>.txt` (the filename becomes the `note-<short-name>` ID) with just this header and no body:

```
Date=Oct 7 2026
Title=Anthropic's corporate structure
Verbose=0
NoteType=Blog post
Uri=https://www.lesswrong.com/posts/Hb5aCFtLuHc5uvAgX/anthropic-s-corporate-structure
```

Always use `Verbose=0` for new LW notes; the homepage stream only shows `Verbose=0` items.

Take the title and date from the LW API instead of guessing from the URL slug:

```sh
curl -sS -X POST https://www.lesswrong.com/graphql -H 'Content-Type: application/json' \
  -d '{"query":"{ post(input: {selector: {_id: \"<postId>\"}}) { result { title slug postedAt } } }"}'
```

To find recent posts, list the user's posts newest first (the `/api/user/loops` Markdown page from https://www.lesswrong.com/api/SKILL.md also lists recent posts, but may lag behind a just-published post):

```sh
curl -sS -X POST https://www.lesswrong.com/graphql -H 'Content-Type: application/json' \
  -d '{"query":"{ posts(input: {terms: {view: \"userPosts\", userId: \"nDWrtEhgEPvoYqyyk\", sortedBy: \"new\", limit: 5}}) { results { _id title slug postedAt shortform } } }"}'
```

Skip `shortform: true` results (the shortform container, not a post), and skip posts whose `_id` already appears in a `Uri` under `notes/`.

`postedAt` is UTC; convert it to Toronto time for `Date` (e.g. `TZ=America/Toronto date -d <postedAt>`). Use the canonical `https://www.lesswrong.com/posts/<postId>/<slug>` URL for `Uri`.

## Building

You may run Hugo when a build or preview is useful, but skip it when it is not needed (for example, for documentation-only changes).

Only **Hugo 0.98.0 extended**, the exact version used in `.github/workflows/neocities.yml`, works for this site. Do not substitute another version or the non-extended build. On Linux x86-64, install and build from the repository root using the Action's commands:

```sh
curl -L https://github.com/gohugoio/hugo/releases/download/v0.98.0/hugo_extended_0.98.0_Linux-64bit.tar.gz > hugo.tar.gz
tar xvzf hugo.tar.gz
rm -rf public
./hugo -v -t smitop
```

The Action checks out full Git history for Hugo's Git data. If the checkout is shallow, fetch the full history before building. Fast builds skip `./subrepos.sh`; only run it when testing full asset generation, following the additional tool setup in the workflow (Node.js 22, stable Rust, wasm-pack, ImageMagick, zopfli, and Chrome for the social card).

## Images and static files

`static/ext/` is gitignored and regenerated from external URLs by `subrepos.sh`; never put files there by hand. Check in locally-authored images (screenshots, charts) directly under `static/` (e.g. `static/foo.png`, referenced as `/foo.png`).

## Post content

When turning a note or draft into a post, NEVER edit the prose yourself: no rewording, capitalization, punctuation, or added articles. Only change structure (front matter, markdown formatting, image tags) and say what you changed.

## Comments

A post gets a comment section from front matter params pointing at where it was shared: the Bluesky thread for it, its LessWrong crosspost, or both:

```toml
bsky = "https://bsky.app/profile/iter.ca/post/<rkey>"
lw = "https://www.lesswrong.com/posts/<postId>/<slug>"
```

Those params are the whole change; nothing else needs editing. Comments are baked in at build time: the deploy workflow runs `.github/bake-comments.py` before every Hugo build, fast or full. It reads `bsky` and `lw` from the front matter of the posts in `content/post/`, fetches each source, and writes `data/comments.json`, which maps a post's path under `content/` to `{comments, sources}` with both sources' threads mixed into one list by date. That file is gitignored; never commit it. `themes/smitop/layouts/post/single.html` renders `#comments` for a post with an entry there and embeds the entry in the page, so a page fetches nothing and its comments are as old as the last deploy (at most a day, from the daily build). LW comments also carry LW's rendered `html`, which the script passes through untrusted; the template's `appendSafe` rebuilds it from an allowlist of tags before display, and every other comment is shown as plain text.

The deploy also publishes the file as `https://iter.ca/comments.json`. When the script can't fetch a source, it prints a `::warning::` and keeps that source's comments from there, so an outage at build time doesn't empty a comment section. With nothing to keep, the source gets an `error` and the build goes on.

A local Hugo build has comment sections only if the script ran first (`python3 .github/bake-comments.py`); otherwise Hugo warns and leaves them out.

For `lw`, use the canonical LW URL of the crosspost (look up the post as in "Adding LessWrong posts").

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

Verify by running `python3 .github/bake-comments.py`, which prints each post's comment count; a URL it can't resolve gets a `::warning::` line and an `error` on its `sources` entry in `data/comments.json`. 0 comments just means no replies yet, which is normal for a fresh post.
