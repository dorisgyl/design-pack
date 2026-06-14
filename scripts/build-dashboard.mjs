// build-dashboard.mjs — generate the pre-built design-pack selection dashboard.
//
// Recursively reads the seed pages, extracts a lightweight bilingual catalog,
// inlines a per-template PNG thumbnail (rendered by render-thumbs.mjs; falls back
// to a generated SVG placeholder), and emits a single self-contained
// components/canvas-app/dist/index.html. The dashboard has an EN / 中文 toggle.
//
// Also the reference implementation of design-curate's rebuild step.
import { readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPage } from './frontmatter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SEED_DIR = join(ROOT, 'components', 'seed');
const THUMBS = join(ROOT, 'components', 'canvas-app', 'thumbs');
const OUT_DIR = join(ROOT, 'components', 'canvas-app', 'dist');
const OUT_FILE = join(OUT_DIR, 'index.html');

function xmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

// Fallback SVG thumbnail (tokened gradient card with the title) for templates
// that have no rendered PNG (e.g. the original primitives with no example.html).
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
    '<rect x="28" y="60" width="320" height="26" rx="8" fill="#0b0d10" opacity="0.82"/>' +
    '<rect x="28" y="100" width="300" height="12" rx="6" fill="#5b6470" opacity="0.5"/>' +
    '<text x="28" y="278" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#0b0d10">' +
    t +
    '</text>' +
    '</svg>';
  return 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64');
}

function templateThumb(id, title) {
  // Prefer the optimized JPEG (keeps the inlined dashboard small); fall back to
  // PNG, then to a generated SVG placeholder.
  for (const [ext, mime] of [['jpg', 'image/jpeg'], ['png', 'image/png']]) {
    const p = join(THUMBS, id + '.' + ext);
    if (existsSync(p) && statSync(p).size > 0) {
      return 'data:' + mime + ';base64,' + readFileSync(p).toString('base64');
    }
  }
  return svgThumb(title);
}

function buildCatalog() {
  const pages = [];
  for (const file of walk(SEED_DIR).sort()) {
    const { data } = readPage(file);
    if (data.slug && data.type) pages.push(data);
  }
  // Index zh siblings by their base (en) slug so we can attach the zh text.
  const zhBySlug = {};
  for (const d of pages) {
    if (d.lang === 'zh') zhBySlug[d.slug.replace(/-zh$/, '')] = d;
  }
  const items = [];
  for (const d of pages) {
    if (d.lang === 'zh') continue; // zh pages are retrieval-only; merged into the en card
    const zh = zhBySlug[d.slug];
    const id = d.slug.split('/').pop();
    const item = {
      slug: d.slug,
      type: d.type,
      category: d.category || '',
      collection: d.collection || '',
      // Explicit per-language fields win; otherwise fall back to the page title /
      // the zh sibling. Single-language items (e.g. English-only guides) leave the
      // other language empty and the dashboard falls back at display time.
      title_en: d.title_en || d.title || id,
      title_zh: d.title_zh || (zh && zh.title) || '',
      desc_en: d.description_en || d.description || '',
      desc_zh: d.description_zh || (zh && zh.description) || '',
    };
    if (d.type === 'template') item.thumbnail = templateThumb(id, item.title_en);
    items.push(item);
  }
  return items;
}

const STR = {
  zh: {
    h1: '设计依据选择',
    lead: '勾选要应用的要求 / 规范 / 模板 / 指南,在下方写明要生成的内容,发送给 agent。agent 会据此检索 GBrain 并生成一个新画布。',
    filter: '筛选(标题 / 描述 / 分类)…',
    prompt: '例如:做一个 SaaS 数据分析产品的落地页,深色主题,强调“十分钟上手”。',
    send: '生成 →',
    ready: '就绪',
    sending: '发送中…',
    done: '完成 ✓ 生成的设计已作为新画布打开。',
    noSel: '未选(将由 agent 语义检索)',
    selN: ' 项已选',
    matchN: ' 项匹配',
    needPrompt: '请先在下方输入要生成的内容。',
    noSDK: '当前不在 NevoFlux 环境(NevofluxSDK 不可用)——可预览界面,但无法发送。',
    noSDKSend: '无 NevofluxSDK,无法发送(请在 NevoFlux 中打开本看板)。',
    toggle: 'EN',
    groups: {
      '设计要求': '设计要求', '设计规范': '设计规范', '设计品味 (taste)': '设计品味 (taste)',
      '工作流 / 产出 (workflow)': '工作流 / 产出 (workflow)', '模板': '模板',
    },
    tmplPrefix: '模板 · ', guidePrefix: '指南 · ',
  },
  en: {
    h1: 'Pick design bases',
    lead: 'Select the requirements / specs / templates / guides to apply, describe what to generate below, and send it to the agent. It retrieves from GBrain and generates a new canvas.',
    filter: 'Filter (title / description / category)…',
    prompt: 'e.g. a landing page for a SaaS analytics product, dark theme, emphasize “ten-minute onboarding”.',
    send: 'Generate →',
    ready: 'Ready',
    sending: 'Sending…',
    done: 'Done ✓ the generated design opened as a new canvas.',
    noSel: 'Nothing selected (the agent will retrieve semantically)',
    selN: ' selected',
    matchN: ' matches',
    needPrompt: 'Please enter what to generate below first.',
    noSDK: 'Not running in NevoFlux (NevofluxSDK unavailable) — preview only, cannot send.',
    noSDKSend: 'No NevofluxSDK; cannot send (open this board inside NevoFlux).',
    toggle: '中文',
    groups: {
      '设计要求': 'Requirements', '设计规范': 'Specs', '设计品味 (taste)': 'Design taste',
      '工作流 / 产出 (workflow)': 'Workflow / output', '模板': 'Templates',
    },
    tmplPrefix: 'Templates · ', guidePrefix: 'Guides · ',
  },
};

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

// Dashboard runtime script. NOTE: no template literals / no `${` here so it nests
// cleanly inside the builder's template literal below.
const APP_JS = `
  var lang = 'zh';
  var activeChip = 'all';
  var navById = {};
  var spyObserver = null;
  var statusEl = document.getElementById('status');
  var streamEl = document.getElementById('stream');
  var sendBtn = document.getElementById('send');
  var promptEl = document.getElementById('prompt');
  var errEl = document.getElementById('err');
  var filterEl = document.getElementById('filter');
  var hasSDK = typeof window.NevofluxSDK !== 'undefined' && NevofluxSDK.agent;
  var statusIsReady = true;

  function s(){ return STR[lang]; }

  var CHIPS = [
    { k:'all', zh:'全部', en:'All' },
    { k:'requirement', zh:'设计要求', en:'Requirements' },
    { k:'spec', zh:'设计规范', en:'Specs' },
    { k:'taste', zh:'设计品味', en:'Taste' },
    { k:'workflow', zh:'工作流', en:'Workflow' },
    { k:'template', zh:'模板', en:'Templates' },
    { k:'guide', zh:'指南', en:'Guides' }
  ];
  function chipKeyOf(it){
    if (it.type === 'requirement') return 'requirement';
    if (it.type === 'template') return 'template';
    if (it.collection === 'taste') return 'taste';
    if (it.collection === 'workflow') return 'workflow';
    if (it.type === 'spec' && it.category) return 'guide';
    return 'spec';
  }

  function groupKeyOf(it){
    if (it.type === 'requirement') return '设计要求';
    if (it.type === 'template') return it.category ? '模板 · ' + it.category : '模板';
    if (it.collection === 'taste') return '设计品味 (taste)';
    if (it.collection === 'workflow') return '工作流 / 产出 (workflow)';
    if (it.type === 'spec' && it.category) return '指南 · ' + it.category;
    return '设计规范';
  }
  function localizeGroup(key){
    var t = s();
    if (t.groups[key]) return t.groups[key];
    if (key.indexOf('模板 · ') === 0) return t.tmplPrefix + key.slice('模板 · '.length);
    if (key.indexOf('指南 · ') === 0) return t.guidePrefix + key.slice('指南 · '.length);
    return key;
  }
  function titleOf(it){ return lang === 'en' ? (it.title_en || it.title_zh) : (it.title_zh || it.title_en); }
  function subtitleOf(it){ var o = lang === 'en' ? it.title_zh : it.title_en; var p = titleOf(it); return o && o !== p ? o : ''; }
  function descOf(it){ return lang === 'en' ? (it.desc_en || it.desc_zh) : (it.desc_zh || it.desc_en); }

  function renderChips(){
    var bar = document.getElementById('chips');
    bar.textContent = '';
    CHIPS.forEach(function(c){
      var n = c.k === 'all' ? CATALOG.length : CATALOG.filter(function(it){ return chipKeyOf(it) === c.k; }).length;
      if (c.k !== 'all' && n === 0) return;
      var b = document.createElement('button'); b.type = 'button';
      b.className = 'chip' + (activeChip === c.k ? ' chip--on' : '');
      var lbl = document.createElement('span'); lbl.textContent = lang === 'en' ? c.en : c.zh;
      var cnt = document.createElement('span'); cnt.className = 'chip__n'; cnt.textContent = n;
      b.appendChild(lbl); b.appendChild(cnt);
      b.addEventListener('click', function(){ activeChip = c.k; renderChips(); applyFilter(); });
      bar.appendChild(b);
    });
  }

  function navHeader(nav, text){
    var hd = document.createElement('div'); hd.className = 'nav-head'; hd.textContent = text; nav.appendChild(hd);
  }

  function setupSpy(){
    if (spyObserver) spyObserver.disconnect();
    if (!('IntersectionObserver' in window)) return;
    spyObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        var link = navById[en.target.id];
        if (!link) return;
        var keys = Object.keys(navById);
        for (var i = 0; i < keys.length; i++) navById[keys[i]].classList.remove('navlink--active');
        link.classList.add('navlink--active');
      });
    }, { rootMargin: '-8% 0px -82% 0px', threshold: 0 });
    var secs = document.querySelectorAll('.group-sec');
    for (var i = 0; i < secs.length; i++) spyObserver.observe(secs[i]);
  }

  function renderCatalog(){
    var app = document.getElementById('app');
    var nav = document.getElementById('sidenav');
    app.textContent = ''; nav.textContent = ''; navById = {};
    var byGroup = {};
    CATALOG.forEach(function(it){ var k = groupKeyOf(it); (byGroup[k] = byGroup[k] || []).push(it); });
    var tmplCats = Object.keys(byGroup).filter(function(g){ return g.indexOf('模板 · ') === 0; }).sort();
    var guideCats = Object.keys(byGroup).filter(function(g){ return g.indexOf('指南 · ') === 0; }).sort();
    var order = ['设计要求', '设计规范', '设计品味 (taste)', '工作流 / 产出 (workflow)', '模板'].concat(tmplCats, guideCats);
    var tmplHdr = false, guideHdr = false;
    order.forEach(function(key, idx){
      var items = byGroup[key];
      if (!items || !items.length) return;
      var id = 'g' + idx;
      var sec = document.createElement('section'); sec.className = 'group-sec'; sec.id = id;
      var h = document.createElement('div'); h.className = 'group';
      h.textContent = localizeGroup(key) + ' (' + items.length + ')';
      sec.appendChild(h);
      var grid = document.createElement('div'); grid.className = 'cards';
      items.forEach(function(it){
        var card = document.createElement('label'); card.className = 'card';
        card.setAttribute('data-chip', chipKeyOf(it));
        card.setAttribute('data-search', (it.title_en + ' ' + (it.title_zh || '') + ' ' + (it.desc_en || '') + ' ' + (it.desc_zh || '') + ' ' + (it.category || '')).toLowerCase());
        if (it.thumbnail){
          var img = document.createElement('img'); img.className = 'thumb'; img.src = it.thumbnail;
          img.alt = titleOf(it); img.loading = 'lazy'; card.appendChild(img);
        }
        var row = document.createElement('div'); row.className = 'card__row';
        var cb = document.createElement('input'); cb.type = 'checkbox'; cb.setAttribute('data-slug', it.slug);
        if (window._dpSel && window._dpSel[it.slug]) cb.checked = true;
        var box = document.createElement('div');
        var t = document.createElement('div'); t.className = 'card__title'; t.textContent = titleOf(it);
        var d = document.createElement('p'); d.className = 'card__desc'; d.textContent = descOf(it) || ''; d.title = descOf(it) || '';
        box.appendChild(t); box.appendChild(d);
        row.appendChild(cb); row.appendChild(box);
        card.appendChild(row);
        grid.appendChild(card);
      });
      sec.appendChild(grid);
      app.appendChild(sec);

      // side nav entry (group the template/guide categories under sub-headers)
      var isT = key.indexOf('模板 · ') === 0, isG = key.indexOf('指南 · ') === 0;
      if (isT && !tmplHdr){ navHeader(nav, lang === 'en' ? 'Templates' : '模板'); tmplHdr = true; }
      if (isG && !guideHdr){ navHeader(nav, lang === 'en' ? 'Guides' : '指南'); guideHdr = true; }
      var label = (isT || isG) ? localizeGroup(key).replace(/^.*?·\\s*/, '') : localizeGroup(key);
      var link = document.createElement('a'); link.href = '#' + id;
      link.className = 'navlink' + ((isT || isG) ? ' navlink--sub' : '');
      var ln = document.createElement('span'); ln.textContent = label;
      var lc = document.createElement('span'); lc.className = 'navlink__n'; lc.textContent = items.length;
      link.appendChild(ln); link.appendChild(lc);
      link.addEventListener('click', function(e){
        e.preventDefault();
        var el = document.getElementById(this.getAttribute('href').slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      nav.appendChild(link);
      navById[id] = link;
    });
    setupSpy();
    applyFilter();
  }

  function selectedSlugs(){
    var out = [];
    var boxes = document.querySelectorAll('input[type=checkbox][data-slug]:checked');
    for (var i=0;i<boxes.length;i++) out.push(boxes[i].getAttribute('data-slug'));
    return out;
  }
  function setSelectedCount(){
    var n = selectedSlugs().length;
    document.getElementById('selcount').textContent = n ? (n + s().selN) : s().noSel;
  }
  function buildMessage(slugs, prompt){
    var lines = ['[design-pack:build]', 'selected:'];
    for (var i=0;i<slugs.length;i++) lines.push('- ' + slugs[i]);
    lines.push('prompt:'); lines.push(prompt);
    return lines.join('\\n');
  }
  function applyFilter(){
    var q = filterEl.value.trim().toLowerCase();
    var secs = document.querySelectorAll('.group-sec');
    var total = 0;
    secs.forEach(function(sec){
      var vis = 0;
      sec.querySelectorAll('.card').forEach(function(card){
        var okChip = activeChip === 'all' || card.getAttribute('data-chip') === activeChip;
        var okText = !q || card.getAttribute('data-search').indexOf(q) !== -1;
        var ok = okChip && okText;
        card.style.display = ok ? '' : 'none';
        if (ok) vis++;
      });
      sec.style.display = vis ? '' : 'none';
      var link = navById[sec.id];
      if (link) link.style.display = vis ? '' : 'none';
      total += vis;
    });
    document.getElementById('viscount').textContent = (q || activeChip !== 'all') ? (total + s().matchN) : '';
  }

  function applyChrome(){
    var t = s();
    document.getElementById('t-h1').textContent = t.h1;
    document.getElementById('t-lead').textContent = t.lead;
    filterEl.placeholder = t.filter;
    promptEl.placeholder = t.prompt;
    sendBtn.textContent = t.send;
    document.getElementById('lang-toggle').textContent = t.toggle;
    document.documentElement.lang = lang;
    if (statusIsReady){ statusEl.textContent = hasSDK ? t.ready : t.noSDK; }
    setSelectedCount();
  }

  // Preserve checkbox selection across language re-render.
  document.addEventListener('change', function(e){
    if (e.target && e.target.matches('input[type=checkbox][data-slug]')){
      window._dpSel = window._dpSel || {};
      window._dpSel[e.target.getAttribute('data-slug')] = e.target.checked;
      setSelectedCount();
    }
  });

  function setLang(l){ lang = l; applyChrome(); renderChips(); renderCatalog(); }

  document.getElementById('lang-toggle').addEventListener('click', function(){ setLang(lang === 'zh' ? 'en' : 'zh'); });
  filterEl.addEventListener('input', applyFilter);

  if (!hasSDK){ statusEl.classList.add('warn'); }

  sendBtn.addEventListener('click', async function(){
    errEl.textContent = '';
    var prompt = promptEl.value.trim();
    if (!prompt){ errEl.textContent = s().needPrompt; promptEl.focus(); return; }
    if (!hasSDK){ errEl.textContent = s().noSDKSend; return; }
    var slugs = selectedSlugs();
    var msg = buildMessage(slugs, prompt);
    sendBtn.disabled = true; streamEl.textContent = ''; statusEl.classList.remove('warn');
    statusIsReady = false; statusEl.textContent = s().sending;
    try{
      var result = await NevofluxSDK.agent.chat(msg, {
        onState: function(st){ statusEl.textContent = (st && st.status ? st.status : ''); },
        onStream: function(c){ if (c && c.delta){ streamEl.textContent += c.delta; streamEl.scrollTop = streamEl.scrollHeight; } }
      });
      statusEl.textContent = s().done;
      if (result && result.text && !streamEl.textContent) streamEl.textContent = result.text;
    }catch(err){
      statusEl.classList.add('warn');
      statusEl.textContent = (lang === 'en' ? 'Error: ' : '出错: ') + (err && err.message ? err.message : err);
    }finally{
      sendBtn.disabled = false; statusIsReady = true;
    }
  });

  applyChrome();
  renderChips();
  renderCatalog();
`;

function renderHtml(catalog) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>design-pack</title>
<style>
${TOKENS_CSS}
  *{ box-sizing:border-box; }
  body{ margin:0; font-family:var(--font-sans); background:var(--bg); color:var(--text); padding:var(--space-6); }
  header.top{ max-width:1180px; margin:0 auto var(--space-4); }
  .topbar{ display:flex; justify-content:space-between; align-items:center; gap:var(--space-4); }
  h1{ font-size:1.563rem; margin:0; }
  .lang{ flex:none; min-height:34px; padding:0 var(--space-4); border:1px solid var(--border);
    border-radius:var(--radius-full); background:var(--surface); color:var(--text); font:inherit;
    font-weight:600; cursor:pointer; }
  .lang:hover{ border-color:var(--primary); }
  .lang:focus-visible{ outline:2px solid var(--primary); outline-offset:2px; }
  .lead{ color:var(--text-muted); margin:var(--space-2) 0 var(--space-3); line-height:1.5; }
  .toolbar{ display:flex; gap:var(--space-3); align-items:center; }
  #filter{ flex:1; padding:var(--space-3); border:1px solid var(--border); border-radius:var(--radius-md);
    background:var(--surface); color:var(--text); font:inherit; }
  #filter:focus-visible{ outline:2px solid var(--primary); outline-offset:1px; }
  #viscount{ color:var(--text-muted); font-size:.8rem; white-space:nowrap; }
  .chips{ display:flex; flex-wrap:wrap; gap:var(--space-2); margin-top:var(--space-3); }
  .chip{ display:inline-flex; align-items:center; gap:6px; min-height:30px; padding:0 var(--space-3);
    border:1px solid var(--border); border-radius:var(--radius-full); background:var(--surface);
    color:var(--text); font:inherit; font-size:.85rem; cursor:pointer; }
  .chip:hover{ border-color:var(--primary); }
  .chip--on{ background:var(--primary); color:var(--primary-contrast); border-color:var(--primary); }
  .chip__n{ font-size:.72rem; opacity:.65; }
  .chip--on .chip__n{ opacity:.85; }
  .layout{ max-width:1180px; margin:0 auto; display:grid; grid-template-columns:208px 1fr;
    gap:var(--space-8); align-items:start; }
  .sidenav{ position:sticky; top:var(--space-3); align-self:start; max-height:calc(100dvh - var(--space-8));
    overflow:auto; display:flex; flex-direction:column; gap:1px; }
  .nav-head{ font-size:.7rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
    color:var(--text-muted); margin:var(--space-3) 0 var(--space-1); padding:0 var(--space-2); }
  .navlink{ display:flex; justify-content:space-between; align-items:center; gap:var(--space-2);
    padding:6px var(--space-2); border-radius:var(--radius-sm); color:var(--text-muted);
    text-decoration:none; font-size:.85rem; line-height:1.25; }
  .navlink:hover{ background:var(--surface); color:var(--text); }
  .navlink--sub{ padding-left:var(--space-4); }
  .navlink--active{ background:var(--surface-2); color:var(--text); font-weight:600; }
  .navlink__n{ flex:none; font-size:.72rem; color:var(--text-muted); }
  main{ min-width:0; }
  .group-sec{ scroll-margin-top:var(--space-3); }
  .group-sec:first-child .group{ margin-top:0; }
  .group{ margin:var(--space-6) 0 var(--space-4); font-size:.8rem; font-weight:600;
    letter-spacing:.04em; text-transform:uppercase; color:var(--text-muted); }
  .cards{ display:grid; gap:var(--space-4); grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); }
  .card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg);
    padding:var(--space-4); display:flex; flex-direction:column; gap:var(--space-2);
    cursor:pointer; transition:border-color .15s, box-shadow .15s; }
  .card:has(input:checked){ border-color:var(--primary); box-shadow:var(--shadow-md); }
  .card__row{ display:flex; align-items:flex-start; gap:var(--space-3); }
  .card input{ margin-top:3px; width:18px; height:18px; accent-color:var(--primary); flex:none; }
  .card__title{ font-weight:600; line-height:1.3; }
  .card__title-zh{ color:var(--text-muted); font-size:.8rem; line-height:1.3; margin-top:1px; }
  .card__desc{ color:var(--text-muted); font-size:.875rem; line-height:1.5; margin:0;
    display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
  .thumb{ width:100%; aspect-ratio:8/5; object-fit:cover; object-position:top; border-radius:var(--radius-md);
    border:1px solid var(--border); background:var(--surface-2); }
  .composer{ position:sticky; bottom:0; max-width:1180px; margin:var(--space-8) auto 0; background:var(--bg);
    border-top:1px solid var(--border); padding:var(--space-4) 0 var(--space-2); }
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
  @media (max-width:820px){
    .layout{ grid-template-columns:1fr; }
    .sidenav{ display:none; }
  }
</style>
</head>
<body>
<header class="top">
  <div class="topbar">
    <h1 id="t-h1"></h1>
    <button id="lang-toggle" class="lang" type="button"></button>
  </div>
  <p class="lead" id="t-lead"></p>
  <div class="toolbar">
    <input id="filter" type="search" aria-label="filter"/>
    <span id="viscount"></span>
  </div>
  <div class="chips" id="chips"></div>
</header>
<div class="layout">
  <aside class="sidenav" id="sidenav" aria-label="sections"></aside>
  <main id="app"></main>
</div>

<div class="composer">
  <div class="meta"><span id="selcount"></span><span id="status"></span></div>
  <textarea id="prompt"></textarea>
  <div class="bar">
    <button id="send" type="button"></button>
    <span id="err"></span>
  </div>
  <pre id="stream"></pre>
</div>

<script>
  var CATALOG = ${JSON.stringify(catalog)};
  var STR = ${JSON.stringify(STR)};
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
  const byType = catalog.reduce((a, c) => ((a[c.type] = (a[c.type] || 0) + 1), a), {});
  const withThumb = catalog.filter((c) => c.thumbnail && c.thumbnail.startsWith('data:image/png')).length;
  console.log(
    `built dashboard: ${catalog.length} catalog items (${Object.entries(byType)
      .map(([k, v]) => `${v} ${k}`)
      .join(', ')}), ${withThumb} PNG thumbnails → components/canvas-app/dist/index.html`
  );
}

main();
