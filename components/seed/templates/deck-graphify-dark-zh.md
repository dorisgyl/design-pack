---
slug: packs/design-pack/templates/deck-graphify-dark-zh
type: template
lang: zh
category: slides
title: "暗底图谱 Deck"
title_en: "Graphify Dark Deck"
description: "深夜渐变 + 漂浮 orbs + SVG 力导向知识图谱 + JetBrains Mono 代码页的暗色发布 Deck。"
tags: [graph, dev tool, ai, cli, 模板]
sample_image: packs/design-pack/assets/templates/deck-graphify-dark.svg
source: html-anything/deck-graphify-dark
---

## 设计指导

一套面向 AI-native / 知识图谱 / 开发者工具发布场景的暗色演示 Deck。整体氛围是深夜渐变叠加玻璃拟物。

布局：
- **封面 (Cover)**：`#06060c → #0e1020` 渐变背景 + 漂浮模糊 orbs + 真实跑出来的 SVG 力导向知识图谱铺在标题之后。
- **章节分隔页 (Section)**：超大标题，其中一个关键词用动画彩虹或暖色渐变文字填充。
- **代码 / CLI 页**：JetBrains Mono 等宽字体，在暗色代码框里做语法高亮（注释 / 关键字 / 字符串 / 函数四种颜色），配一行带光晕的命令。
- **玻璃拟物卡片页 (Glassmorphism)**：半透明磨砂面板（`backdrop-filter: blur`），分暖、蓝、绿三种色调，用于特性网格与指标。

设计细节：
- 配色 token 全部作用在 `.tpl-graphify-dark-graph` 下；暖沙、天蓝、薄荷绿、玫红、紫色点缀落在近黑背景上。
- 每页右上角带页码（`01 / 08`），三个环境 orbs 以缓慢的 drift 关键帧浮动。
- 大数字指标使用 120px、weight-900 的字号配渐变文字填充。
- 比例为 16:9；当 runtime 缺失时，静态预览回退会让每一页都保持可见。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NevoFlux GBrain 知识图谱</title>
<style>/* html-ppt :: shared webfonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@200;300;400;500;600;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

</style>
<style>/* html-ppt :: base.css — reset + shared tokens + layout primitives */
/* Default tokens. Themes in assets/themes/*.css override the :root block. */
:root {
  --bg: #ffffff;
  --bg-soft: #f7f7f8;
  --surface: #ffffff;
  --surface-2: #f2f2f4;
  --border: rgba(0,0,0,.08);
  --border-strong: rgba(0,0,0,.16);
  --text-1: #111216;
  --text-2: #55596a;
  --text-3: #8a8f9e;
  --accent: #3b6cff;
  --accent-2: #7a5cff;
  --accent-3: #ff5c8a;
  --good: #1aaf6c;
  --warn: #f5a524;
  --bad:  #e0445a;
  --grad: linear-gradient(135deg,#3b6cff,#7a5cff 55%,#ff5c8a);
  --grad-soft: linear-gradient(135deg,#eef2ff,#f5ecff 55%,#ffeef5);
  --radius: 18px;
  --radius-sm: 12px;
  --radius-lg: 26px;
  --shadow: 0 10px 30px rgba(18,24,40,.08), 0 2px 6px rgba(18,24,40,.04);
  --shadow-lg: 0 24px 60px rgba(18,24,40,.14), 0 6px 16px rgba(18,24,40,.06);
  --font-sans: 'Inter','Noto Sans SC',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  --font-serif: 'Playfair Display','Noto Serif SC',Georgia,serif;
  --font-mono: 'JetBrains Mono','IBM Plex Mono',SFMono-Regular,Menlo,monospace;
  --font-display: var(--font-sans);
  --letter-tight: -.03em;
  --letter-normal: -.01em;
  --ease: cubic-bezier(.4,0,.2,1);
}

*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--bg);color:var(--text-1);
  font-family:var(--font-sans);font-weight:400;line-height:1.6;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  letter-spacing:var(--letter-normal)}
img,svg,video{max-width:100%;display:block}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
code,kbd,pre,samp{font-family:var(--font-mono)}

/* ================= SLIDE SYSTEM ================= */
.deck{position:relative;width:100vw;height:100vh;overflow:hidden;background:var(--bg)}
.slide{
  position:absolute;inset:0;
  display:flex;flex-direction:column;justify-content:center;
  padding:72px 96px;
  box-sizing:border-box;
  opacity:0;pointer-events:none;
  transition:opacity .5s var(--ease), transform .5s var(--ease);
  transform:translateX(30px);
  overflow:hidden;
}
.slide.is-active{opacity:1;pointer-events:auto;transform:translateX(0);z-index:2}
.slide.is-prev{transform:translateX(-30px)}

/* single-page standalone (used when a layout file is opened directly) */
body.single .slide{position:relative;width:100vw;height:100vh;opacity:1;transform:none;pointer-events:auto}

/* ================= TYPOGRAPHY ================= */
.eyebrow{font-size:13px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--text-3)}
.kicker{font-size:14px;font-weight:600;color:var(--accent);letter-spacing:.08em;text-transform:uppercase}
h1.title,.h1{font-family:var(--font-display);font-size:72px;line-height:1.05;font-weight:800;letter-spacing:var(--letter-tight);margin:0 0 18px;color:var(--text-1)}
h2.title,.h2{font-family:var(--font-display);font-size:54px;line-height:1.1;font-weight:700;letter-spacing:var(--letter-tight);margin:0 0 14px}
h3,.h3{font-size:32px;line-height:1.2;font-weight:600;letter-spacing:var(--letter-normal);margin:0 0 10px}
h4,.h4{font-size:22px;line-height:1.3;font-weight:600;margin:0 0 8px}
.lede{font-size:22px;line-height:1.55;color:var(--text-2);font-weight:300;max-width:62ch}
.dim{color:var(--text-2)}
.dim2{color:var(--text-3)}
.mono{font-family:var(--font-mono)}
.serif{font-family:var(--font-serif)}
.gradient-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}

/* ================= LAYOUT PRIMITIVES ================= */
.stack>*+*{margin-top:14px}
.row{display:flex;gap:24px;align-items:center}
.row.wrap{flex-wrap:wrap}
.grid{display:grid;gap:24px}
.g2{grid-template-columns:repeat(2,1fr)}
.g3{grid-template-columns:repeat(3,1fr)}
.g4{grid-template-columns:repeat(4,1fr)}
.center{display:flex;align-items:center;justify-content:center;text-align:center}
.fill{flex:1}
.sp-t{padding-top:24px}.sp-b{padding-bottom:24px}
.mt-s{margin-top:8px}.mt-m{margin-top:18px}.mt-l{margin-top:32px}
.mb-s{margin-bottom:8px}.mb-m{margin-bottom:18px}.mb-l{margin-bottom:32px}

/* ================= CARDS ================= */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:26px 28px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.card-soft{background:var(--surface-2);border:1px solid var(--border)}
.card-outline{background:transparent;border:1.5px solid var(--border-strong);box-shadow:none}
.card-accent{background:var(--surface);border-top:3px solid var(--accent)}
.card-hover{transition:transform .3s var(--ease),box-shadow .3s var(--ease)}
.card-hover:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}

.pill{display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:500;
  background:var(--surface-2);color:var(--text-2);border:1px solid var(--border)}
.pill-accent{background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent);border-color:color-mix(in srgb,var(--accent) 28%,transparent)}

/* ================= BARS / DIVIDERS ================= */
.divider{height:1px;background:var(--border);width:100%}
.divider-accent{height:3px;width:72px;background:var(--accent);border-radius:2px}

/* ================= CHROME (header/footer/progress) ================= */
.deck-header{position:absolute;top:24px;left:40px;right:40px;display:flex;align-items:center;justify-content:space-between;
  font-size:12px;color:var(--text-3);letter-spacing:.12em;text-transform:uppercase;z-index:10;pointer-events:none}
.deck-footer{position:absolute;bottom:24px;left:40px;right:40px;display:flex;align-items:center;justify-content:space-between;
  font-size:12px;color:var(--text-3);z-index:10;pointer-events:none}
.slide-number::before{content:attr(data-current)}
.slide-number::after{content:" / " attr(data-total)}
.progress-bar{position:fixed;left:0;right:0;bottom:0;height:3px;background:transparent;z-index:20}
.progress-bar > span{display:block;height:100%;width:0;background:var(--accent);transition:width .3s var(--ease)}

/* ================= PRESENTER / OVERVIEW ================= */
.notes{display:none!important}
.notes-overlay{position:fixed;inset:auto 0 0 0;max-height:42vh;background:rgba(20,22,30,.95);color:#e8ebf4;
  padding:20px 32px;font-size:16px;line-height:1.6;border-top:1px solid rgba(255,255,255,.1);transform:translateY(100%);
  transition:transform .3s var(--ease);z-index:40;overflow:auto;font-family:var(--font-sans)}
.notes-overlay.open{transform:translateY(0)}
.overview{position:fixed;inset:0;background:rgba(10,12,18,.92);backdrop-filter:blur(12px);z-index:50;
  display:none;padding:40px;overflow:auto}
.overview.open{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-content:start}
.overview .thumb{background:var(--surface);border:1px solid var(--border);border-radius:12px;
  aspect-ratio:16/9;overflow:hidden;cursor:pointer;position:relative;color:var(--text-1);padding:16px;
  font-size:11px;transition:transform .2s var(--ease)}
.overview .thumb:hover{transform:scale(1.04)}
.overview .thumb .n{position:absolute;top:8px;left:10px;font-weight:700;font-size:14px;color:var(--text-3)}
.overview .thumb .t{position:absolute;bottom:10px;left:14px;right:14px;font-weight:600;color:var(--text-1)}

/* ================= PRESENTER VIEW ================= */
/* Presenter view opens in a separate popup window (S key).
 * All presenter styles are self-contained in the popup HTML generated by runtime.js.
 * The audience window (this file) is NOT affected — it stays as normal deck view.
 * Only the .notes class below is needed to hide speaker notes from audience. */

/* ================= UTILITY ================= */
.hidden{display:none!important}
.nowrap{white-space:nowrap}
.tr{text-align:right}.tc{text-align:center}.tl{text-align:left}
.uppercase{text-transform:uppercase;letter-spacing:.12em}

/* ================= PRINT ================= */
@media print{
  .slide{position:relative;opacity:1!important;transform:none!important;page-break-after:always;height:100vh}
  .deck-header,.deck-footer,.progress-bar,.notes-overlay,.overview{display:none!important}
}

</style>
<style>/* graphify-dark-graph — 暗底玻璃 + 力导向知识图谱 */
.tpl-graphify-dark-graph{
  --gd-bg:#06060c;
  --gd-bg2:#0e1020;
  --gd-text:#f0ece4;
  --gd-text2:#b0a99e;
  --gd-text3:#7a746c;
  --gd-warm:#e8a87c;
  --gd-blue:#7eb8da;
  --gd-green:#7ed3a4;
  --gd-rose:#d4a0b9;
  --gd-purple:#b8a4d6;
  --gd-danger:#e07070;
  background:var(--gd-bg);
  color:var(--gd-text);
  font-family:'Inter','Noto Sans SC',-apple-system,sans-serif;
  letter-spacing:-.01em;
}
.tpl-graphify-dark-graph .slide{background:linear-gradient(160deg,#08080f,#0e1020 50%,#08080f);color:var(--gd-text);padding:64px 88px;overflow:hidden}
.tpl-graphify-dark-graph .gd-ambient{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.tpl-graphify-dark-graph .gd-orb{position:absolute;border-radius:50%;filter:blur(110px);opacity:.35;animation:gdDrift 22s ease-in-out infinite alternate}
.tpl-graphify-dark-graph .gd-orb-1{width:520px;height:520px;background:radial-gradient(circle,rgba(126,184,218,.55),transparent 70%);top:-12%;left:-6%}
.tpl-graphify-dark-graph .gd-orb-2{width:460px;height:460px;background:radial-gradient(circle,rgba(232,168,124,.45),transparent 70%);top:55%;right:-8%;animation-delay:-6s}
.tpl-graphify-dark-graph .gd-orb-3{width:420px;height:420px;background:radial-gradient(circle,rgba(184,164,214,.4),transparent 70%);bottom:-8%;left:30%;animation-delay:-11s}
@keyframes gdDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(25px,-20px) scale(1.08)}}
.tpl-graphify-dark-graph .slide > *{position:relative;z-index:2}
.tpl-graphify-dark-graph .gd-snum{position:absolute;top:28px;right:40px;font-size:12px;letter-spacing:.25em;color:var(--gd-text3);z-index:3}
.tpl-graphify-dark-graph .gd-eyebrow{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--gd-text3);font-weight:500}
.tpl-graphify-dark-graph .gd-h1{font-size:74px;font-weight:800;line-height:1.08;letter-spacing:-.02em;margin:16px 0 10px;color:var(--gd-text)}
.tpl-graphify-dark-graph .gd-h2{font-size:52px;font-weight:700;line-height:1.12;margin:0 0 14px}
.tpl-graphify-dark-graph .gd-lede{font-size:22px;line-height:1.65;font-weight:300;color:var(--gd-text2);max-width:850px}
.tpl-graphify-dark-graph .gd-rainbow{background:linear-gradient(90deg,#ff0080,#ff4d00,#ff9900,#ffe600,#00c853,#0091ea,#6200ea,#ff0080);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gdRainbow 4s linear infinite}
@keyframes gdRainbow{0%{background-position:0% center}100%{background-position:200% center}}
.tpl-graphify-dark-graph .gd-grad{background:linear-gradient(135deg,var(--gd-warm),var(--gd-rose),var(--gd-purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.tpl-graphify-dark-graph .gd-accent{color:var(--gd-warm);font-weight:500}
.tpl-graphify-dark-graph .gd-green{color:var(--gd-green)}
.tpl-graphify-dark-graph .gd-blue{color:var(--gd-blue)}
.tpl-graphify-dark-graph .gd-dim{color:var(--gd-text2)}
.tpl-graphify-dark-graph .gd-mono{font-family:'JetBrains Mono',monospace}
.tpl-graphify-dark-graph .gd-glass{position:relative;overflow:hidden;border-radius:20px;padding:22px 26px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(20px) saturate(160%);box-shadow:0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.08)}
.tpl-graphify-dark-graph .gd-glass::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.05),transparent);pointer-events:none}
.tpl-graphify-dark-graph .gd-glass-warm{background:rgba(232,168,124,.06);border-color:rgba(232,168,124,.2)}
.tpl-graphify-dark-graph .gd-glass-green{background:rgba(126,211,164,.06);border-color:rgba(126,211,164,.2)}
.tpl-graphify-dark-graph .gd-glass-blue{background:rgba(126,184,218,.06);border-color:rgba(126,184,218,.2)}
.tpl-graphify-dark-graph .gd-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
.tpl-graphify-dark-graph .gd-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:24px}
.tpl-graphify-dark-graph .gd-tag{display:inline-block;border-radius:999px;padding:5px 14px;font-size:12px;font-weight:500;margin:2px 4px 2px 0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:var(--gd-text2)}
.tpl-graphify-dark-graph .gd-cmd{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;color:var(--gd-green);text-shadow:0 0 30px rgba(126,211,164,.45),0 0 60px rgba(126,211,164,.15);letter-spacing:-.01em}
.tpl-graphify-dark-graph .gd-big{font-size:120px;font-weight:900;letter-spacing:-.04em;line-height:1}
.tpl-graphify-dark-graph .gd-codebox{background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px 26px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.8;color:#d8d4c8}
.tpl-graphify-dark-graph .gd-codebox .cm{color:#6b6a62}
.tpl-graphify-dark-graph .gd-codebox .kw{color:var(--gd-warm)}
.tpl-graphify-dark-graph .gd-codebox .st{color:var(--gd-green)}
.tpl-graphify-dark-graph .gd-codebox .fn{color:var(--gd-blue)}

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-graphify-dark-graph">
<div class="deck">

  <!-- 1. COVER -->
  <section class="slide is-active">
    <div class="gd-ambient"><div class="gd-orb gd-orb-1"></div><div class="gd-orb gd-orb-2"></div><div class="gd-orb gd-orb-3"></div></div>
    <!-- live force-directed graph bg -->
    <svg viewBox="0 0 1600 900" style="position:absolute;inset:0;width:100%;height:100%;opacity:.38;z-index:1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#7eb8da" stroke-width="1" stroke-opacity=".5" fill="none">
        <line x1="300" y1="200" x2="520" y2="340"/>
        <line x1="520" y1="340" x2="780" y2="260"/>
        <line x1="780" y1="260" x2="1040" y2="420"/>
        <line x1="520" y1="340" x2="640" y2="560"/>
        <line x1="640" y1="560" x2="900" y2="620"/>
        <line x1="900" y1="620" x2="1040" y2="420"/>
        <line x1="1040" y1="420" x2="1260" y2="300"/>
        <line x1="1260" y1="300" x2="1380" y2="500"/>
        <line x1="900" y1="620" x2="1120" y2="720"/>
        <line x1="300" y1="200" x2="200" y2="420"/>
        <line x1="200" y1="420" x2="360" y2="640"/>
        <line x1="360" y1="640" x2="640" y2="560"/>
      </g>
      <g>
        <circle cx="300" cy="200" r="10" fill="#e8a87c"/>
        <circle cx="520" cy="340" r="14" fill="#7eb8da"/>
        <circle cx="780" cy="260" r="9" fill="#7ed3a4"/>
        <circle cx="1040" cy="420" r="18" fill="#b8a4d6"/>
        <circle cx="640" cy="560" r="11" fill="#d4a0b9"/>
        <circle cx="900" cy="620" r="12" fill="#e8a87c"/>
        <circle cx="1260" cy="300" r="8" fill="#7ed3a4"/>
        <circle cx="1380" cy="500" r="10" fill="#7eb8da"/>
        <circle cx="1120" cy="720" r="9" fill="#d4a0b9"/>
        <circle cx="200" cy="420" r="8" fill="#b8a4d6"/>
        <circle cx="360" cy="640" r="11" fill="#7eb8da"/>
      </g>
    </svg>
    <div class="gd-snum">01 / 08</div>
    <div style="margin-top:auto">
      <p class="gd-eyebrow">Tech Sharing · 纯干货</p>
      <h1 class="gd-h1" style="font-size:88px"><span class="gd-rainbow">在 NevoFlux 里手把手<br>搭建你的 GBrain 知识图谱</span></h1>
      <p class="gd-lede" style="margin-top:20px">一行命令 · 全多模态 · 诚实审计 —— <span class="gd-accent">把任何文件夹变成可导航的知识网络。</span></p>
      <p class="gd-eyebrow" style="margin-top:26px">↑ 背景就是 NevoFlux GBrain 真实跑出来的知识图谱</p>
    </div>
  </section>

  <!-- 2. SECTION DIVIDER -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-1"></div><div class="gd-orb gd-orb-2"></div></div>
    <div class="gd-snum">02 / 08</div>
    <div style="margin:auto 0">
      <div class="gd-eyebrow">Part 01</div>
      <h1 class="gd-h1" style="font-size:120px">为什么要 <span class="gd-grad">图谱</span>?</h1>
      <p class="gd-lede">folder → tree → graph，人类认知的下一步</p>
    </div>
  </section>

  <!-- 3. CONTENT — plugin grid -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-2"></div><div class="gd-orb gd-orb-3"></div></div>
    <div class="gd-snum">03 / 08</div>
    <p class="gd-eyebrow">Feature Map</p>
    <h2 class="gd-h2">一个浏览器，<span class="gd-grad">四件事</span></h2>
    <div class="gd-grid-4">
      <div class="gd-glass gd-glass-warm"><div style="font-size:30px">📂</div><h4 style="margin:10px 0 6px">Folder Ingest</h4><p class="gd-dim" style="font-size:13px;line-height:1.55">递归扫描任意路径，支持 md / pdf / 代码 / 图片</p></div>
      <div class="gd-glass gd-glass-blue"><div style="font-size:30px">🧠</div><h4 style="margin:10px 0 6px">Entity Extract</h4><p class="gd-dim" style="font-size:13px;line-height:1.55">用 Agent 抽概念、人物、事件、关系</p></div>
      <div class="gd-glass gd-glass-green"><div style="font-size:30px">🕸️</div><h4 style="margin:10px 0 6px">Force Graph</h4><p class="gd-dim" style="font-size:13px;line-height:1.55">力导向 Canvas 应用，点击即跳回原文</p></div>
      <div class="gd-glass"><div style="font-size:30px">🔍</div><h4 style="margin:10px 0 6px">Audit Trail</h4><p class="gd-dim" style="font-size:13px;line-height:1.55">每条边都能追溯到 source span</p></div>
    </div>
    <div class="gd-glass gd-glass-warm" style="margin-top:24px"><p style="font-size:18px;line-height:1.6">GBrain 不是「又一个 RAG」—— 它 <span class="gd-accent">把检索结果画出来，让你一眼就知道信息长什么样</span>。</p></div>
  </section>

  <!-- 4. CODE -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-1"></div></div>
    <div class="gd-snum">04 / 08</div>
    <p class="gd-eyebrow">One command</p>
    <h2 class="gd-h2">从 0 到图谱，<span class="gd-grad">大概 90 秒</span></h2>
    <p class="gd-cmd" style="margin:16px 0 22px">$ nevoflux gbrain build ~/notes --out ./graph</p>
    <pre class="gd-codebox"><span class="cm"># gbrain.config.yaml</span>
<span class="kw">ingest</span>:
  paths: [<span class="st">~/notes</span>, <span class="st">~/code/docs</span>]
  include: [<span class="st">"*.md"</span>, <span class="st">"*.pdf"</span>, <span class="st">"*.py"</span>]

<span class="kw">extract</span>:
  agent: <span class="st">nevoflux-sdk</span>
  schema: [<span class="st">concept</span>, <span class="st">person</span>, <span class="st">event</span>, <span class="st">relation</span>]

<span class="kw">render</span>:
  canvas: <span class="st">force-graph</span>
  audit: <span class="fn">true</span>     <span class="cm"># 每条边带 source span</span></pre>
  </section>

  <!-- 5. CHART — race diagram -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-3"></div></div>
    <div class="gd-snum">05 / 08</div>
    <p class="gd-eyebrow">Efficiency Race</p>
    <h2 class="gd-h2">没有 GBrain vs 有 GBrain</h2>
    <div style="max-width:900px;margin-top:30px">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div style="width:110px;text-align:right;font-weight:700;color:var(--gd-danger)">没有<br>GBrain</div>
        <div style="flex:1;position:relative;height:70px;background:rgba(224,112,112,.06);border:1px solid rgba(224,112,112,.2);border-radius:16px">
          <div style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:32px">🛵</div>
          <div style="position:absolute;left:72px;top:50%;transform:translateY(-50%);color:var(--gd-danger);font-size:14px">反复喂信息…整理…又忘了…</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="width:110px;text-align:right;font-weight:700;color:var(--gd-green)">有<br>GBrain</div>
        <div style="flex:1;position:relative;height:70px;background:rgba(126,211,164,.06);border:1px solid rgba(126,211,164,.25);border-radius:16px">
          <div style="position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:32px">🏎️</div>
          <div style="position:absolute;right:72px;top:50%;transform:translateY(-50%);color:var(--gd-green);font-size:14px">Agent 自己找 → 确认 → 干活!</div>
        </div>
      </div>
    </div>
    <div class="gd-grid-3" style="margin-top:36px">
      <div class="gd-glass gd-glass-warm"><div class="gd-big gd-grad">5×</div><p class="gd-dim" style="margin-top:6px">速度提升</p></div>
      <div class="gd-glass gd-glass-green"><div class="gd-big gd-grad">-80%</div><p class="gd-dim" style="margin-top:6px">重复喂信息</p></div>
      <div class="gd-glass gd-glass-blue"><div class="gd-big gd-grad">∞</div><p class="gd-dim" style="margin-top:6px">记忆持久化</p></div>
    </div>
  </section>

  <!-- 6. PIPELINE -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-2"></div></div>
    <div class="gd-snum">06 / 08</div>
    <p class="gd-eyebrow">Pipeline</p>
    <h2 class="gd-h2">端到端 <span class="gd-grad">4 步走</span></h2>
    <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:36px">
      <div class="gd-glass" style="flex:1;text-align:center"><div style="font-size:34px">📂</div><div style="font-weight:600;margin-top:8px">Scan</div><div class="gd-dim" style="font-size:13px">递归读文件</div></div>
      <div style="color:var(--gd-text3);font-size:24px">→</div>
      <div class="gd-glass gd-glass-blue" style="flex:1;text-align:center"><div style="font-size:34px">🔬</div><div style="font-weight:600;margin-top:8px">Extract</div><div class="gd-dim" style="font-size:13px">Agent 抽实体</div></div>
      <div style="color:var(--gd-text3);font-size:24px">→</div>
      <div class="gd-glass gd-glass-green" style="flex:1;text-align:center"><div style="font-size:34px">🕸️</div><div style="font-weight:600;margin-top:8px">Build</div><div class="gd-dim" style="font-size:13px">构图 + 去重</div></div>
      <div style="color:var(--gd-text3);font-size:24px">→</div>
      <div class="gd-glass gd-glass-warm" style="flex:1;text-align:center"><div style="font-size:34px">🎨</div><div style="font-weight:600;margin-top:8px">Render</div><div class="gd-dim" style="font-size:13px">交互式 Canvas 应用</div></div>
    </div>
    <div class="gd-glass" style="margin-top:32px"><p style="font-size:16px;line-height:1.6;color:var(--gd-text2)">每一步都有 audit log：你永远知道某个节点为什么存在、它来自哪个文件的哪一行。</p></div>
  </section>

  <!-- 7. CTA -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-1"></div><div class="gd-orb gd-orb-3"></div></div>
    <div class="gd-snum">07 / 08</div>
    <p class="gd-eyebrow">Try it tonight</p>
    <h2 class="gd-h1" style="font-size:80px">把文件夹 <span class="gd-grad">变成图谱</span></h2>
    <p class="gd-cmd" style="margin-top:22px">$ npm i -g @nevoflux/cli</p>
    <p class="gd-cmd" style="margin-top:10px;color:var(--gd-warm);text-shadow:0 0 30px rgba(232,168,124,.45)">$ nevoflux gbrain build ~/vault</p>
    <div style="margin-top:32px">
      <span class="gd-tag">#knowledge-graph</span>
      <span class="gd-tag">#gbrain</span>
      <span class="gd-tag">#nevoflux-agent</span>
      <span class="gd-tag">#canvas-app</span>
      <span class="gd-tag">#design-pack</span>
    </div>
  </section>

  <!-- 8. THANKS -->
  <section class="slide">
    <div class="gd-ambient"><div class="gd-orb gd-orb-2"></div></div>
    <div class="gd-snum">08 / 08</div>
    <div style="margin:auto 0;text-align:center">
      <div class="gd-big gd-rainbow" style="font-size:180px">Thanks.</div>
      <p class="gd-lede" style="margin:28px auto 0">nevoflux.dev/gbrain · 欢迎贡献 packs、Canvas 应用与设计 skills</p>
    </div>
  </section>

</div>

</body>
</html>
```

## 用法

- **第 1 页（封面）**：eyebrow 引导词、彩虹主标题、lede 描述，外加一行署名。背后的 SVG 是占位图谱——替换节点/边坐标与颜色即可贴合你的数据。
- **第 2 页（章节分隔）**：`Part` 标签加一个超大标题，其中一个关键词用渐变填充。
- **第 3 页（特性网格）**：四张 `gd-glass` 卡片（图标 · `h4` 标题 · 一句话描述），再加一张宽幅高亮卡承载定位语。
- **第 4 页（代码）**：一行带光晕的 `gd-cmd` 命令，加一个 `gd-codebox` 配置块，用 `.cm` / `.kw` / `.st` / `.fn` 四种 span 做高亮。
- **第 5 页（赛跑图）**：上下两条横向赛道（之前 / 之后），加三张大数字指标卡。
- **第 6 页（流水线）**：四个阶段卡片用箭头串联，末尾加一张说明卡。
- **第 7 页（CTA）**：安装/运行命令，外加一排 `gd-tag` 话题标签。
- **第 8 页（致谢）**：彩虹收尾，加一行链接/账号。
- 如果增减页面，记得同步页码（`gd-snum`）与 `01 / 08` 的总数。
