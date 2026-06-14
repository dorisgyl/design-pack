// render-thumbs.mjs — pre-render a sample thumbnail for each template from its
// source example.html, using headless Chrome/Edge. Output PNGs are committed
// under components/canvas-app/thumbs/<id>.png and base64-inlined by
// build-dashboard.mjs as the template card image.
//
// Usage: node scripts/render-thumbs.mjs [html-anything skills dir]
import { readdirSync, existsSync, mkdirSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(
  process.argv[2] || 'C:/Users/Docker/nevoflux/others/html-anything/next/src/lib/templates/skills'
);
const OUT = join(ROOT, 'components', 'canvas-app', 'thumbs');
const TMP = join(ROOT, '.thumb-profile');

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const browser = BROWSERS.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chrome/Edge found.');
  process.exit(1);
}
if (!existsSync(SRC)) {
  console.error(`source dir not found: ${SRC}`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

// 900x562 CSS viewport at 0.4 device-scale → 360x225 PNG (8:5; enough for ~300px cards,
// keeps the inlined dashboard small).
const WINDOW = '900,562';
const DSF = '0.4';

const ids = readdirSync(SRC)
  .filter((n) => {
    const d = join(SRC, n);
    return statSync(d).isDirectory() && existsSync(join(d, 'example.html'));
  })
  .sort();

let ok = 0;
const failed = [];
for (const id of ids) {
  const srcUrl = 'file:///' + join(SRC, id, 'example.html').replace(/\\/g, '/');
  const outPng = join(OUT, `${id}.png`);
  try {
    execFileSync(
      browser,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        `--user-data-dir=${TMP}`,
        '--force-device-scale-factor=' + DSF,
        '--window-size=' + WINDOW,
        '--default-background-color=FFFFFFFF',
        '--virtual-time-budget=2500',
        '--screenshot=' + outPng,
        srcUrl,
      ],
      { stdio: 'ignore', timeout: 30000 }
    );
    if (existsSync(outPng) && statSync(outPng).size > 0) {
      ok++;
      if (ok % 10 === 0) console.log(`  …${ok}/${ids.length}`);
    } else {
      failed.push(id);
    }
  } catch (e) {
    failed.push(id);
  }
}

rmSync(TMP, { recursive: true, force: true });
console.log(`rendered ${ok}/${ids.length} thumbnails → components/canvas-app/thumbs/`);
if (failed.length) console.log('failed: ' + failed.join(', '));
