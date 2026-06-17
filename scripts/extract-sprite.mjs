// extract-sprite.mjs — pull a set of concept icons from the source vector library as an
// inline <symbol> sprite (id + viewBox + inner markup), for hand-authored templates.
// Usage: node scripts/extract-sprite.mjs out.svg token:id token:id ...
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LIB = (process.env.ICON_LIB || '').split('\\').join('/');
if (!LIB) {
  console.error('Set ICON_LIB to the source vector-library path.');
  process.exit(1);
}
const CARD_DIRS = ['icon_cards', 'neural_network_ppt_primitives/cards', 'paper_derived_icon_cards'];

const index = new Map();
for (const d of CARD_DIRS) {
  const abs = join(LIB, d);
  if (!existsSync(abs)) continue;
  for (const n of readdirSync(abs)) {
    if (n.endsWith('.json')) { const s = n.slice(0, -5); if (!index.has(s)) index.set(s, join(abs, n)); }
  }
}
function resolveStem(tok) {
  let best = null;
  for (const s of index.keys()) if (s === tok || s.startsWith(tok + '.')) if (!best || s.length < best.length) best = s;
  return best;
}
function symbolFor(tok, id) {
  const stem = resolveStem(tok);
  if (!stem) return `<!-- MISSING ${tok} -->`;
  const card = JSON.parse(readFileSync(index.get(stem), 'utf8'));
  const f = card.files || {};
  const rel = f.tight_svg || f.ppt_safe_svg || f.raw_svg;
  let s = readFileSync(join(LIB, rel), 'utf8').replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  const vb = (s.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24';
  const inner = s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/>\s+</g, '><').trim();
  return `<symbol id="${id}" viewBox="${vb}">${inner}</symbol>`;
}

const [outFile, ...pairs] = process.argv.slice(2);
const out = pairs.map((p) => { const [tok, id] = p.split(':'); return symbolFor(tok, id); }).join('\n');
writeFileSync(outFile, out, 'utf8');
console.log(out);
