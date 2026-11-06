// Render a social preview card (an HTML page sized 1200×630) to a PNG with headless Chrome.
// Usage: node og/gen.js og/home.html static/ext/og-home.png   (CHROME overrides the browser binary)
const { execFileSync } = require('child_process');
const path = require('path');

const [src, out] = process.argv.slice(2).map((p) => path.resolve(p));
const chrome = process.env.CHROME || ['google-chrome', 'chromium', 'chromium-browser'].find((c) => {
  try { execFileSync('which', [c], { stdio: 'ignore' }); return true; } catch { return false; }
});
if (!chrome) throw new Error('no Chrome found; set CHROME');
execFileSync(chrome, [
  '--headless=new', '--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1200,630', '--virtual-time-budget=5000', '--allow-file-access-from-files',
  `--screenshot=${out}`, 'file://' + src,
], { stdio: 'inherit' });
