## Regeneration

NEVER manually regenerate `data/data.json` or run `regen.sh`. Regeneration is handled entirely by GitHub Actions (see `.github/workflows/regen.yml`). It runs automatically on pushes to `notes/` and on a daily schedule.

## Building

Don't run `hugo` directly (no `hugo build`, `hugo server`, version checks, etc.).
