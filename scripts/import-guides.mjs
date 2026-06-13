// import-guides.mjs — one-shot importer: modern-web-guidance guides → design-pack seeds.
//
// Reads every guide markdown, derives frontmatter (title from the H1, description
// from the first paragraph, type=spec, category=source folder), and writes a seed
// page under components/seed/guides/<category>/<name>.md. Idempotent: clears and
// regenerates the guides seed tree on each run.
//
// Usage: node scripts/import-guides.mjs [path-to-guides-dir]
import { readdirSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_SRC =
  'C:/Users/Docker/nevoflux/others/modern-web-guidance/skills/modern-web-guidance/guides';
const SRC = resolve(process.argv[2] || DEFAULT_SRC);
const OUT = join(ROOT, 'components', 'seed', 'guides');
const NS = 'packs/design-pack/guides';

if (!existsSync(SRC)) {
  console.error(`source guides dir not found: ${SRC}`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

// Strip inline markdown so a paragraph reads cleanly as a one-line description.
function stripMd(s) {
  return s
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .trim();
}

// YAML-safe scalar: collapse whitespace, drop backslashes, quote, escape inner ".
function clean(s) {
  return String(s).replace(/\s+/g, ' ').replace(/\\/g, '').replace(/"/g, "'").trim();
}

function firstSentence(s, cap = 180) {
  const m = /^(.+?[.。!?])(\s|$)/.exec(s);
  let d = m && m[1].length >= 30 ? m[1] : s;
  if (d.length > cap) d = d.slice(0, cap - 1).replace(/\s+\S*$/, '') + '…';
  return d.trim();
}

function titleAndDesc(raw, fallbackTitle) {
  const lines = raw.split(/\r?\n/);
  let title = fallbackTitle;
  let ti = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = /^#\s+(.+?)\s*$/.exec(lines[i]);
    if (m) {
      title = m[1];
      ti = i;
      break;
    }
  }
  let desc = '';
  for (let i = ti + 1; i < lines.length; i++) {
    const l = lines[i].trim();
    const para = desc.length > 0;
    if (!l || /^#{1,6}\s/.test(l) || /^(```|<|[-*]\s|\d+\.\s|\|)/.test(l)) {
      if (para) break;
      else continue;
    }
    desc += (desc ? ' ' : '') + l;
    if (desc.length > 240) break;
  }
  desc = desc ? firstSentence(stripMd(desc)) : title;
  return { title: clean(title), desc: clean(desc) };
}

function main() {
  rmSync(OUT, { recursive: true, force: true });
  const files = walk(SRC).sort();
  let count = 0;
  const perCat = {};
  for (const file of files) {
    const category = basename(dirname(file));
    const name = basename(file, '.md');
    const raw = readFileSync(file, 'utf8');
    const { title, desc } = titleAndDesc(raw, name.replace(/-/g, ' '));
    const slug = `${NS}/${category}/${name}`;
    const fm =
      '---\n' +
      `slug: ${slug}\n` +
      'type: spec\n' +
      `title: "${title}"\n` +
      `description: "${desc}"\n` +
      `tags: [${category}, guide, modern-web]\n` +
      `category: ${category}\n` +
      '---\n\n';
    const dest = join(OUT, category, `${name}.md`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, fm + raw, 'utf8');
    perCat[category] = (perCat[category] || 0) + 1;
    count++;
  }
  console.log(`imported ${count} guides → components/seed/guides/`);
  console.log(
    Object.entries(perCat)
      .sort()
      .map(([k, v]) => `  ${k}: ${v}`)
      .join('\n')
  );
}

main();
