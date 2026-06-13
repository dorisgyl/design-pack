// validate-pack.mjs — design-pack invariant checks (stand-in for `nevoflux pack
// validate`, which needs the daemon). Built-ins only; minimal TOML scanning via
// regex for the specific fields we declare. Exits non-zero on any failure.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPage } from './frontmatter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (m) => errors.push(m);

// --- read pack.toml ---
const tomlPath = join(ROOT, 'pack.toml');
if (!existsSync(tomlPath)) {
  console.error('FAIL: pack.toml not found');
  process.exit(1);
}
const toml = readFileSync(tomlPath, 'utf8');

const scalar = (key) => {
  const m = new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, 'm').exec(toml);
  return m ? m[1] : null;
};
const name = scalar('name');
const namespace = scalar('namespace');
const artifactId = scalar('artifact_id');
const filesFrom = scalar('files_from');

// protected prefixes: prefixes = ["a/", "b/"]
const protM = /prefixes\s*=\s*\[([^\]]*)\]/.exec(toml);
const prefixes = protM
  ? protM[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
  : [];

// seeds: each [[components.seed]] has slug + from
const seeds = [];
const seedRe = /\[\[components\.seed\]\]\s*([\s\S]*?)(?=\n\[|\n*$)/g;
let sm;
while ((sm = seedRe.exec(toml))) {
  const block = sm[1];
  const slug = /slug\s*=\s*"([^"]+)"/.exec(block)?.[1];
  const from = /from\s*=\s*"([^"]+)"/.exec(block)?.[1];
  if (slug && from) seeds.push({ slug, from });
}

// --- structural checks ---
if (!name) fail('pack.name missing');
if (!namespace) fail('pack.namespace missing');
if (!artifactId) fail('dashboard.artifact_id missing');
if (name && artifactId && !artifactId.startsWith(name))
  fail(`dashboard.artifact_id "${artifactId}" must start with pack name "${name}"`);
if (!seeds.length) fail('no [[components.seed]] entries found');
if (!prefixes.length) fail('[components.protected] prefixes missing');

const noTraversal = (p, label) => {
  if (p && (p.includes('..') || /^([A-Za-z]:[\\/]|[\\/])/.test(p)))
    fail(`${label} must be a relative path without "..": ${p}`);
};
noTraversal(filesFrom, 'dashboard.files_from');

// --- per-seed checks ---
const VALID_TYPES = new Set(['requirement', 'spec', 'template']);
for (const { slug, from } of seeds) {
  noTraversal(from, `seed from (${slug})`);
  if (namespace && !slug.startsWith(namespace))
    fail(`seed slug "${slug}" not under namespace "${namespace}"`);
  if (!prefixes.some((p) => slug.startsWith(p)))
    fail(`seed slug "${slug}" not covered by any protected prefix (Seed ⊆ Protected)`);

  const abs = join(ROOT, from);
  if (!existsSync(abs)) {
    fail(`seed file missing: ${from}`);
    continue;
  }
  const { data } = readPage(abs);
  for (const req of ['slug', 'type', 'title', 'description']) {
    if (!data[req]) fail(`${from}: frontmatter missing "${req}"`);
  }
  if (data.slug && data.slug !== slug)
    fail(`${from}: frontmatter slug "${data.slug}" != pack.toml slug "${slug}"`);
  if (data.type && !VALID_TYPES.has(data.type))
    fail(`${from}: invalid type "${data.type}"`);
  if (data.type === 'template' && !data.sample_image)
    fail(`${from}: template must declare sample_image`);
}

// --- skills ---
for (const skill of ['design-build', 'design-curate']) {
  const p = join(ROOT, 'components', 'skills', skill, 'SKILL.md');
  if (!existsSync(p)) {
    fail(`skill missing: components/skills/${skill}/SKILL.md`);
    continue;
  }
  const { data } = readPage(p);
  if (!data.name) fail(`${skill}/SKILL.md: frontmatter missing "name"`);
  if (!data.description) fail(`${skill}/SKILL.md: frontmatter missing "description"`);
}

// --- dashboard self-containment ---
const dash = join(ROOT, filesFrom || 'components/canvas-app/dist', 'index.html');
if (!existsSync(dash)) {
  fail('dashboard not built: components/canvas-app/dist/index.html (run build-dashboard.mjs)');
} else {
  const html = readFileSync(dash, 'utf8');
  if (/\bhttps?:\/\//.test(html)) fail('dashboard contains external http(s) URL (sandbox blocks it)');
  if (/(?:src|href)\s*=\s*["']\/\//.test(html)) fail('dashboard contains protocol-relative resource URL');
}

// --- report ---
if (errors.length) {
  console.error(`design-pack: FAIL (${errors.length})`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
const counts = seeds.reduce((a, s) => {
  const t = s.slug.split('/')[2];
  a[t] = (a[t] || 0) + 1;
  return a;
}, {});
console.log(
  `design-pack: PASS (${seeds.length} seeds [${Object.entries(counts)
    .map(([k, v]) => `${v} ${k}`)
    .join(', ')}], 2 skills, dashboard self-contained)`
);
