// import-taste.mjs — one-shot importer: taste-skill/skills → design-pack specs.
//
// Reads each skill's SKILL.md (YAML frontmatter name/description + body) and writes
// a spec seed page under components/seed/specs/<collection>/<id>.md with design-pack
// frontmatter. Skills are classified into two collections:
//   - taste     → aesthetic/design-taste systems  → specs/taste/
//   - workflow  → output/asset-generation process  → specs/workflow/
// The original SKILL body is kept; a sibling DESIGN.md (if any) is appended.
// Idempotent: clears and regenerates both collection trees on each run.
//
// Usage: node scripts/import-taste.mjs [path-to-taste-skill/skills]
import { readdirSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './frontmatter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_SRC = 'C:/Users/Docker/nevoflux/others/taste-skill/skills';
const SRC = resolve(process.argv[2] || DEFAULT_SRC);
const SPECS = join(ROOT, 'components', 'seed', 'specs');
const NS = 'packs/design-pack/specs';

// Output/asset-generation skills — separated from aesthetic "taste" systems.
const WORKFLOW = new Set([
  'output-skill',
  'image-to-code-skill',
  'imagegen-frontend-web',
  'imagegen-frontend-mobile',
]);
const collectionOf = (id) => (WORKFLOW.has(id) ? 'workflow' : 'taste');

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
  return s.toLowerCase().replace(/\b([a-z])/g, (m, c) => c.toUpperCase());
}

function deriveTitle(body, fallback) {
  const m = /^#\s+(.+?)\s*$/m.exec(body);
  const raw = m ? m[1] : fallback.replace(/-/g, ' ');
  return clean(titleCaseIfShouting(raw));
}

function main() {
  rmSync(join(SPECS, 'taste'), { recursive: true, force: true });
  rmSync(join(SPECS, 'workflow'), { recursive: true, force: true });

  const dirs = readdirSync(SRC)
    .map((n) => join(SRC, n))
    .filter((p) => statSync(p).isDirectory() && existsSync(join(p, 'SKILL.md')))
    .sort();

  const counts = { taste: 0, workflow: 0 };
  for (const dir of dirs) {
    const id = basename(dir);
    const collection = collectionOf(id);
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
      `slug: ${NS}/${collection}/${id}\n` +
      'type: spec\n' +
      `collection: ${collection}\n` +
      `title: "${title}"\n` +
      `description: "${description}"\n` +
      `tags: [${collection}, design, ${data.name || id}]\n` +
      `source: taste-skill/${id}\n` +
      '---\n\n';

    const dest = join(SPECS, collection, `${id}.md`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, fm + content + '\n', 'utf8');
    console.log(`  [${collection}] ${id}  →  "${title}"`);
    counts[collection]++;
  }
  console.log(
    `imported ${counts.taste + counts.workflow} skills → specs/taste (${counts.taste}), specs/workflow (${counts.workflow})`
  );
}

main();
