// build-dashboard.mjs — generate the pre-built design-pack selection dashboard.
//
// Reads the seed pages, extracts a lightweight catalog from their frontmatter,
// generates an SVG thumbnail for each template, and emits a single
// self-contained components/canvas-app/dist/index.html (no external URLs).
//
// This is also the REFERENCE IMPLEMENTATION of design-curate's rebuild step:
// at runtime the agent does the same thing, but pulls real template images via
// GBrain file_url instead of generating SVG placeholders.
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPage } from './frontmatter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SEED_DIR = join(ROOT, 'components', 'seed');
const OUT_DIR = join(ROOT, 'components', 'canvas-app', 'dist');
const OUT_FILE = join(OUT_DIR, 'index.html');

const TYPE_DIRS = ['requirements', 'specs', 'templates'];
const TYPE_LABEL = { requirement: '设计要求', spec: '设计规范', template: '模板' };

function xmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Deterministic SVG thumbnail: tokened gradient card with the template title.
function svgThumb(title) {
  const t = xmlEscape(title);
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#3b5bff" stop-opacity="0.22"/>' +
    '<stop offset="1" stop-color="#6f86ff" stop-opacity="0.06"/>' +
    '</linearGradient></defs>' +
    '<rect width="480" height="300" fill="#f7f8fa"/>' +
    '<rect width="480" height="300" fill="url(#g)"/>' +
    '<rect x="28" y="28" width="220" height="14" rx="7" fill="#3b5bff" opacity="0.55"/>' +
    '<rect x="28" y="60" width="320" height="26" rx="8" fill="#0b0d10" opacity="0.82"/>' +
    '<rect x="28" y="100" width="300" height="12" rx="6" fill="#5b6470" opacity="0.5"/>' +
    '<rect x="28" y="120" width="240" height="12" rx="6" fill="#5b6470" opacity="0.5"/>' +
    '<rect x="28" y="168" width="120" height="40" rx="10" fill="#3b5bff"/>' +
    '<rect x="160" y="168" width="110" height="40" rx="10" fill="none" stroke="#e3e6eb" stroke-width="2"/>' +
    '<text x="28" y="278" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#0b0d10">' +
    t +
    '</text>' +
    '</svg>';
  return 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64');
}

function buildCatalog() {
  const items = [];
  for (const sub of TYPE_DIRS) {
    const dir = join(SEED_DIR, sub);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
      const { data } = readPage(join(dir, file));
      const item = {
        slug: data.slug,
        type: data.type,
        title: data.title,
        description: data.description,
        tags: data.tags || [],
      };
      if (data.type === 'template') item.thumbnail = svgThumb(data.title);
      items.push(item);
    }
  }
  return items;
}

const TOKENS_CSS = `
  :root{
    --bg:#fff; --surface:#f7f8fa; --surface-2:#eef0f4; --text:#0b0d10; --text-muted:#5b6470;
    --border:#e3e6eb; --primary:#3b5bff; --primary-contrast:#fff;
    --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-6:24px;
    --space-8:32px; --space-12:48px;
    --radius-sm:6px; --radius-md:10px; --radius-lg:16px; --radius-full:9999px;
    --shadow-sm:0 1px 2px rgba(16,24,40,.06); --shadow-md:0 4px 12px rgba(16,24,40,.08);
    --font-sans:system-ui,-apple-system,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif;
  }
  @media (prefers-color-scheme: dark){
    :root{ --bg:#0b0d10; --surface:#15181d; --surface-2:#1d2128; --text:#f2f4f7;
      --text-muted:#9aa4b2; --border:#2a2f37; --primary:#6f86ff; --primary-contrast:#0b0d10; }
  }`;

// The dashboard's own runtime script. NOTE: no template literals / no `${` here,
// so it nests cleanly inside this builder's template literal below.
const APP_JS = `
  var statusEl = document.getElementById('status');
  var streamEl = document.getElementById('stream');
  var sendBtn = document.getElementById('send');
  var promptEl = document.getElementById('prompt');
  var errEl = document.getElementById('err');
  var hasSDK = typeof window.NevofluxSDK !== 'undefined' && NevofluxSDK.agent;

  function selectedSlugs(){
    var out = [];
    var boxes = document.querySelectorAll('input[type=checkbox][data-slug]:checked');
    for (var i=0;i<boxes.length;i++) out.push(boxes[i].getAttribute('data-slug'));
    return out;
  }
  function setSelectedCount(){
    var n = selectedSlugs().length;
    document.getElementById('selcount').textContent = n ? (n + ' 项已选') : '未选(将由 agent 语义检索)';
  }
  function buildMessage(slugs, prompt){
    var lines = ['[design-pack:build]', 'selected:'];
    for (var i=0;i<slugs.length;i++) lines.push('- ' + slugs[i]);
    lines.push('prompt:');
    lines.push(prompt);
    return lines.join('\\n');
  }

  document.addEventListener('change', function(e){
    if (e.target && e.target.matches('input[type=checkbox][data-slug]')) setSelectedCount();
  });
  setSelectedCount();

  if (!hasSDK){
    statusEl.textContent = '当前不在 NevoFlux 环境(NevofluxSDK 不可用)——可预览界面,但无法发送。';
    statusEl.classList.add('warn');
  }

  sendBtn.addEventListener('click', async function(){
    errEl.textContent = '';
    var prompt = promptEl.value.trim();
    if (!prompt){ errEl.textContent = '请先在下方输入要生成的内容。'; promptEl.focus(); return; }
    if (!hasSDK){ errEl.textContent = '无 NevofluxSDK,无法发送(请在 NevoFlux 中打开本看板)。'; return; }

    var slugs = selectedSlugs();
    var msg = buildMessage(slugs, prompt);
    sendBtn.disabled = true; streamEl.textContent = ''; statusEl.classList.remove('warn');
    statusEl.textContent = '发送中…';
    try{
      var result = await NevofluxSDK.agent.chat(msg, {
        onState: function(s){ statusEl.textContent = '状态: ' + (s && s.status ? s.status : ''); },
        onStream: function(c){ if (c && c.delta){ streamEl.textContent += c.delta; streamEl.scrollTop = streamEl.scrollHeight; } }
      });
      statusEl.textContent = '完成 ✓ 生成的设计已作为新画布打开。';
      if (result && result.text && !streamEl.textContent) streamEl.textContent = result.text;
    }catch(err){
      statusEl.classList.add('warn');
      statusEl.textContent = '出错: ' + (err && err.message ? err.message : err);
    }finally{
      sendBtn.disabled = false;
    }
  });
`;

function renderHtml(catalog) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>design-pack · 设计依据选择</title>
<style>
${TOKENS_CSS}
  *{ box-sizing:border-box; }
  body{ margin:0; font-family:var(--font-sans); background:var(--bg); color:var(--text);
    padding:var(--space-6); }
  header.top{ max-width:1100px; margin:0 auto var(--space-6); }
  h1{ font-size:1.563rem; margin:0 0 var(--space-2); }
  .lead{ color:var(--text-muted); margin:0; line-height:1.5; }
  main{ max-width:1100px; margin:0 auto; }
  .group{ margin:var(--space-8) 0 var(--space-4); font-size:.8rem; font-weight:600;
    letter-spacing:.04em; text-transform:uppercase; color:var(--text-muted); }
  .cards{ display:grid; gap:var(--space-4); grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); }
  .card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg);
    padding:var(--space-4); display:flex; flex-direction:column; gap:var(--space-2);
    cursor:pointer; transition:border-color .15s, box-shadow .15s; }
  .card:has(input:checked){ border-color:var(--primary); box-shadow:var(--shadow-md); }
  .card__row{ display:flex; align-items:flex-start; gap:var(--space-3); }
  .card input{ margin-top:3px; width:18px; height:18px; accent-color:var(--primary); flex:none; }
  .card__title{ font-weight:600; line-height:1.3; }
  .card__desc{ color:var(--text-muted); font-size:.875rem; line-height:1.5; margin:0; }
  .thumb{ width:100%; aspect-ratio:8/5; object-fit:cover; border-radius:var(--radius-md);
    border:1px solid var(--border); background:var(--surface-2); }
  .composer{ position:sticky; bottom:0; margin-top:var(--space-8);
    background:var(--bg); border-top:1px solid var(--border);
    padding:var(--space-4) 0 var(--space-2); }
  .composer .meta{ display:flex; justify-content:space-between; align-items:center;
    color:var(--text-muted); font-size:.8rem; margin-bottom:var(--space-2); }
  textarea{ width:100%; min-height:84px; resize:vertical; padding:var(--space-3);
    border:1px solid var(--border); border-radius:var(--radius-md); background:var(--surface);
    color:var(--text); font:inherit; }
  textarea:focus-visible{ outline:2px solid var(--primary); outline-offset:1px; }
  .bar{ display:flex; gap:var(--space-3); align-items:center; margin-top:var(--space-3); }
  button#send{ min-height:44px; padding:0 var(--space-6); border:none; border-radius:var(--radius-md);
    background:var(--primary); color:var(--primary-contrast); font-weight:600; cursor:pointer; }
  button#send:disabled{ opacity:.55; cursor:default; }
  button#send:focus-visible{ outline:2px solid var(--text); outline-offset:2px; }
  #err{ color:#c0392b; font-size:.875rem; min-height:1.2em; }
  #status{ color:var(--text-muted); font-size:.875rem; }
  #status.warn{ color:#a66a00; }
  #stream{ white-space:pre-wrap; font-family:ui-monospace,Consolas,monospace; font-size:.8rem;
    color:var(--text-muted); max-height:180px; overflow:auto; margin-top:var(--space-2); }
</style>
</head>
<body>
<header class="top">
  <h1>设计依据选择</h1>
  <p class="lead">勾选要应用的要求 / 规范 / 模板,在下方写明要生成的内容,发送给 agent。agent 会据此检索 GBrain 并生成一个新画布。</p>
</header>
<main id="app"></main>

<div class="composer">
  <div class="meta"><span id="selcount"></span><span id="status">就绪</span></div>
  <textarea id="prompt" placeholder="例如:做一个 SaaS 数据分析产品的落地页,深色主题,强调‘十分钟上手’。"></textarea>
  <div class="bar">
    <button id="send">生成 →</button>
    <span id="err"></span>
  </div>
  <pre id="stream"></pre>
</div>

<script>
  var CATALOG = ${JSON.stringify(catalog)};
  var TYPE_LABEL = ${JSON.stringify(TYPE_LABEL)};
  (function renderCatalog(){
    var app = document.getElementById('app');
    var order = ['requirement','spec','template'];
    order.forEach(function(type){
      var items = CATALOG.filter(function(it){ return it.type === type; });
      if (!items.length) return;
      var h = document.createElement('div'); h.className='group'; h.textContent = TYPE_LABEL[type] || type;
      app.appendChild(h);
      var grid = document.createElement('div'); grid.className='cards';
      items.forEach(function(it){
        var card = document.createElement('label'); card.className='card';
        if (it.thumbnail){
          var img = document.createElement('img'); img.className='thumb'; img.src = it.thumbnail;
          img.alt = it.title + ' 样例'; card.appendChild(img);
        }
        var row = document.createElement('div'); row.className='card__row';
        var cb = document.createElement('input'); cb.type='checkbox'; cb.setAttribute('data-slug', it.slug);
        var box = document.createElement('div');
        var t = document.createElement('div'); t.className='card__title'; t.textContent = it.title;
        var d = document.createElement('p'); d.className='card__desc'; d.textContent = it.description || '';
        box.appendChild(t); box.appendChild(d);
        row.appendChild(cb); row.appendChild(box);
        card.appendChild(row);
        grid.appendChild(card);
      });
      app.appendChild(grid);
    });
  })();
${APP_JS}
</script>
</body>
</html>
`;
}

function main() {
  const catalog = buildCatalog();
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, renderHtml(catalog), 'utf8');
  console.log(
    `built dashboard with ${catalog.length} catalog items → components/canvas-app/dist/index.html`
  );
}

main();
