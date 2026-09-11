## Regeneration

NEVER manually regenerate `data/data.json` or run `regen.sh`. Regeneration is handled entirely by GitHub Actions (see `.github/workflows/regen.yml`). It runs automatically on pushes to `notes/` and on a daily schedule.

## Adding posts

When adding posts (notes in `notes/`), use Toronto time for the `Date` field.

## Building

Don't run `hugo` directly (no `hugo build`, `hugo server`, version checks, etc.).

## Images and static files

`static/ext/` is gitignored and regenerated from external URLs by `subrepos.sh`; never put files there by hand. Check in locally-authored images (screenshots, charts) directly under `static/` (e.g. `static/foo.png`, referenced as `/foo.png`).
