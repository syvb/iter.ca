// Renders static/avatar/oct-still.webp: the picture that stands in for the homepage's octahedron until it's first
// hovered or touched. It's the first frame oct.js draws, captured at 2× (the most the canvas draws at) by running
// oct.js on a page with the homepage's stylesheet in headless Chrome, so the canvas takes over from it invisibly.
// Rerun it after changing how the gem looks at rest (in oct.js, or its size in style.css).
// Usage: node static/avatar/gen-still.js   (CHROME overrides the browser binary; needs ImageMagick)
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path'), { pathToFileURL } = require('url');

const chrome = process.env.CHROME || ['google-chrome', 'chromium', 'chromium-browser'].find((c) => {
  try { execFileSync('which', [c], { stdio: 'ignore' }); return true; } catch { return false; }
});
if (!chrome) throw new Error('no Chrome found; set CHROME');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'oct-still-')), page = path.join(tmp, 'still.html');
const url = (p) => pathToFileURL(path.join(__dirname, p)).href;
fs.writeFileSync(page, `<!doctype html>
<html class="oct">
<link rel="stylesheet" href="${url('../style.css')}">
<div id="oct-box"><img id="oct-still" alt=""><canvas id="oct"></canvas><div id="oct-hit"></div><canvas id="sparks"></canvas></div>
<script>
  // keep the frame readable after it's shown
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, opts) { return getContext.call(this, type, { ...opts, preserveDrawingBuffer: true }); };
</script>
<script src="${url('oct.js')}"></script>
<script>
  document.getElementById('oct-hit').dispatchEvent(new PointerEvent('pointerenter'));
  // only a gem that set up has drawn: oct.js removes the still picture once it has, and turns the gem off (removing
  // "oct") if it can't, leaving a blank canvas that mustn't replace the picture
  setTimeout(() => {
    const drawn = document.documentElement.classList.contains('oct') && !document.getElementById('oct-still');
    document.body.textContent = drawn ? 'STILL ' + document.getElementById('oct').toDataURL() : 'the gem did not set up';
  });
</script>
`);
const dom = execFileSync(chrome, [
  '--headless=new', '--no-sandbox', '--force-device-scale-factor=2', '--enable-unsafe-swiftshader', '--use-angle=swiftshader',
  '--virtual-time-budget=5000', '--dump-dom', 'file://' + page,
], { maxBuffer: 64 << 20 }).toString();
fs.rmSync(tmp, { recursive: true });
const m = dom.match(/STILL data:image\/png;base64,([A-Za-z0-9+/=]+)/);
if (!m) throw new Error('the gem didn\'t render:\n' + dom.slice(0, 2000));
// lossy at 90 is a third the size of lossless (about 10KB), and differs only by a slight blur along the gem's edges
execFileSync('magick', ['png:-', '-quality', '90', '-define', 'webp:alpha-quality=100', '-define', 'webp:use-sharp-yuv=true',
  '-define', 'webp:method=6', path.join(__dirname, 'oct-still.webp')], { input: Buffer.from(m[1], 'base64') });
