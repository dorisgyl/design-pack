// import-taste.mjs — one-shot importer: taste-skill/skills → design-pack specs.
//
// Reads each skill's SKILL.md (YAML frontmatter name/description + body), and writes
// a spec seed page under components/seed/specs/taste/<id>.md with design-pack
// frontmatter (type=spec, collection=taste). The original SKILL body is kept; a
// sibling DESIGN.md (if any) is appended. Idempotent: clears and regenerates the
// taste seed tree on each run.
//
// Usage: node scripts/import-taste.mjs [path-to-taste-skill/skills]
import { readdirSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './frontmatter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_SRC = 'C:/Users/Docker/nevoflux/others/taste-skill/skills';
const SRC = resolve(process.argv[2] || DEFAULT_SRC);
const OUT = join(ROOT, 'components', 'seed', 'specs', 'taste');
const NS = 'packs/design-pack/specs/taste';

if (!existsSync(SRC)) {
  console.error(`source taste-skill dir not found: ${SRC}`);
  process.exit(1);
}

// YAML-safe scalar: collapse whitespace, drop backslashes, escape inner " as '.
function clean(s) {
  return String(s).replace(/\s+/g, ' ').replace(/\\/g, '').replace(/"/g, "'").trim();
}

function titleCaseIfShouting(s) {
  if (/[a-z]/.test(s)) return s; // already has lowercase → keep as authored
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m, c) => c.toUpperCase());
}

function deriveTitle(body, fallback) {
  const m = /^#\s+(.+?)\s*$/m.exec(body);
  const raw = m ? m[1] : fallback.replace(/-/g, ' ');
  return clean(titleCaseIfShouting(raw));
}

function main() {
  rmSync(OUT, { recursive: true, force: true });
  const dirs = readdirSync(SRC)
    .map((n) => join(SRC, n))
    .filter((p) => statSync(p).isDirectory() && existsSync(join(p, 'SKILL.md')))
    .sort();

  let count = 0;
  for (const dir of dirs) {
    const id = basename(dir);
    const raw = readFileSync(join(dir, 'SKILL.md'), 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const title = deriveTitle(body, data.name || id);
    const description = clean(data.description || title);

    let content = body.trim();
    const designPath = join(dir, 'DESIGN.md');
    if (existsSync(designPath)) {
      content += '\n\n---\n\n## DESIGN.md\n\n' + readFileSync(designPath, 'utf8').trim();
    }

    const fm =
      '---\n' +
      `slug: ${NS}/${id}\n` +
      'type: spec\n' +
      'collection: taste\n' +
      `title: "${title}"\n` +
      `description: "${description}"\n` +
      `tags: [taste, design, ${data.name || id}]\n` +
      `source: taste-skill/${id}\n` +
      '---\n\n';

    const dest = join(OUT, `${id}.md`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, fm + content + '\n', 'utf8');
    console.log(`  ${id}  →  "${title}"`);
    count++;
  }
  console.log(`imported ${count} taste skills → components/seed/specs/taste/`);
}

main();
