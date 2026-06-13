// Minimal dependency-free YAML-frontmatter reader for design-pack's flat schema.
// Supports scalars (string/number/bool) and simple inline arrays [a, b, c].
// Intentionally NOT a full YAML parser — the seed schema is deliberately flat.
import { readFileSync } from 'node:fs';

export function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let [, key, val] = kv;
    val = val.trim();
    if (/^\[.*\]$/.test(val)) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, '');
      if (val === 'true' || val === 'false') data[key] = val === 'true';
      else if (val !== '' && !Number.isNaN(Number(val))) data[key] = Number(val);
      else data[key] = val;
    }
  }
  return { data, body: m[2] };
}

export function readPage(path) {
  return parseFrontmatter(readFileSync(path, 'utf8'));
}
