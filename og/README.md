# Open Graph cards

Editable `1200×630` HTML/CSS sources for Open Graph (`og:image`) social preview cards. Kept outside `content/` and `static/` so Hugo doesn't publish the source files directly; full builds (`./subrepos.sh`) render them with headless Chrome and compress the PNGs with `zopflipng` into gitignored `static/ext/`.

## Files

- `home.html` — card for the homepage (`layouts/_default/new-home.html`), published as `/ext/og-home.png`. Uses the self-hosted fonts in `static/new-home/fonts/`.
- `home-bg.jpg`, `home-oct.jpg` — static captures of the homepage's WebGL loss landscape (`1200×630`) and octahedron (`600×600`), since link-preview crawlers don't execute JavaScript.
- `gen.js` — renders a `1200×630` HTML file to a `1×` PNG via headless Chrome (`google-chrome`, `chromium`, or `chromium-browser`; set `CHROME` to override).

## Local preview and rendering

Open `og/home.html` directly in a browser window sized to `1200×630` to preview layout or text edits.

To render the PNG locally from the repo root (matching `subrepos.sh`):

```sh
node og/gen.js og/home.html static/ext/og-home-raw.png
zopflipng -y static/ext/og-home-raw.png static/ext/og-home.png
rm static/ext/og-home-raw.png
```

Pushes that modify `og/` trigger a full deploy in `.github/workflows/neocities.yml`; fast deploys skip `subrepos.sh` and leave the existing `/ext/og-home.png` on Neocities in place.
