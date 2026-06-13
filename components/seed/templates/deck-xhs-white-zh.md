---
slug: packs/design-pack/templates/deck-xhs-white-zh
type: template
lang: zh
category: slides
title: "白底杂志风 Deck"
title_en: "White Editorial Deck"
description: "可同时发小红书图文与横版 PPT 双用的白底杂志风,用来讲 NevoFlux 与 GBrain 的故事。"
tags: [editorial, rainbow, macaron, 模板]
sample_image: packs/design-pack/assets/templates/deck-xhs-white.svg
source: html-anything/deck-xhs-white
---

## 设计指导

一套白底「杂志风」演示模板,设计为可以一稿两用:既能当作小红书竖排图文,也能当作横版 PPT。语气偏编辑化、有观点,靠超大标题和「每页只有一个强重点」来组织内容。

### 布局
- 纯白背景 + 顶部一条细的 10 色彩虹 bar,固定在每一页顶端。
- 80-110px 的 display 大标题 + 紫 -> 蓝 -> 绿 -> 橙 -> 粉的渐变文字,渐变只打在关键词上。
- 一组马卡龙软卡片(粉 / 紫 / 蓝 / 绿 / 橙),用于分组内容、网格和行动项。
- 黑底白字的 `.xw-focus` pill 用来标出最重要的那个词,再配一个大块引用(`.xw-hero` / `.xw-quote`)收住每页的金句。

### 设计细节
- 每页一个观点、一个重点。把渐变文字打在标题上,把黑底 `.xw-focus` pill(或彩色软重点变体)留给真正承载论点的词。
- 卡片保持安静:大写的标签 + 加粗的 `.main` 主句 + 一行 `.desc` 描述。让软色背景做区分,而不是靠重边框。
- 代码块是近黑底 + 等宽字体面板;用 `cm` / `kw` / `st` / `hl` 几个 span 分别给注释、键、字符串和高亮上色。
- 图表用内联 SVG 横向条;不引外部图表库、不引图片、不引外链。背景、渐变、条形全部用 CSS 或内联 SVG,整页完全自包含。
- 每页都带一个顶栏(彩虹圆点标签 + 页码)和一个页脚(布局名 + 页码),让整套像一本分页的杂志。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>白底杂志风 · NevoFlux Deck</title>
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
<style>/* xhs-white-editorial — 白底杂志风 */
.tpl-xhs-white-editorial{
  --xw-bg:#ffffff;
  --xw-ink:#111318;
  --xw-ink2:#475467;
  --xw-muted:#98a2b3;
  --xw-line:#eaecf3;
  --xw-purple:#7b61ff;
  --xw-pink:#ff5fa2;
  --xw-blue:#4e8cff;
  --xw-green:#17b26a;
  --xw-orange:#ff9d42;
  --xw-soft-purple:#f4efff;
  --xw-soft-pink:#fff0f6;
  --xw-soft-blue:#eef4ff;
  --xw-soft-green:#edfdf3;
  --xw-soft-orange:#fff5ea;
  background:var(--xw-bg);
  color:var(--xw-ink);
  font-family:'Inter','Noto Sans SC','PingFang SC',-apple-system,sans-serif;
}
.tpl-xhs-white-editorial .slide{background:#fff;padding:72px 88px}
.tpl-xhs-white-editorial .xw-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.tpl-xhs-white-editorial .xw-tag{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border:1px solid var(--xw-line);border-radius:999px;font-size:15px;color:var(--xw-ink2);background:#fff}
.tpl-xhs-white-editorial .xw-tag .dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(90deg,#7b61ff,#4e8cff,#17b26a,#ff9d42,#ff5fa2)}
.tpl-xhs-white-editorial .xw-page{font-size:14px;color:var(--xw-muted);letter-spacing:.1em}
.tpl-xhs-white-editorial .xw-kicker{font-size:18px;color:var(--xw-ink2);margin-top:6px;font-weight:500}
.tpl-xhs-white-editorial .xw-title{font-size:84px;line-height:1.02;letter-spacing:-2px;font-weight:850;margin:18px 0 0;color:var(--xw-ink)}
.tpl-xhs-white-editorial .xw-title-md{font-size:60px;line-height:1.05;letter-spacing:-1.5px;font-weight:800;margin:14px 0 0}
.tpl-xhs-white-editorial .xw-grad{background:linear-gradient(90deg,#7b61ff 0%,#4e8cff 25%,#17b26a 48%,#ff9d42 72%,#ff5fa2 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.tpl-xhs-white-editorial .xw-sub{font-size:24px;line-height:1.45;color:#1f2937;margin-top:22px;max-width:900px}
.tpl-xhs-white-editorial .xw-focus{display:inline-block;padding:6px 14px;border-radius:14px;background:#111318;color:#fff;font-weight:700}
.tpl-xhs-white-editorial .xw-focus-blue{display:inline-block;padding:6px 14px;border-radius:14px;background:var(--xw-soft-blue);color:#174ea6;font-weight:700}
.tpl-xhs-white-editorial .xw-focus-pink{display:inline-block;padding:6px 14px;border-radius:14px;background:var(--xw-soft-pink);color:#c11574;font-weight:700}
.tpl-xhs-white-editorial .xw-focus-orange{display:inline-block;padding:6px 14px;border-radius:14px;background:var(--xw-soft-orange);color:#b54708;font-weight:700}
.tpl-xhs-white-editorial .xw-focus-green{display:inline-block;padding:6px 14px;border-radius:14px;background:var(--xw-soft-green);color:#067647;font-weight:700}
.tpl-xhs-white-editorial .xw-hero{margin-top:28px;border:1px solid var(--xw-line);border-radius:28px;padding:30px 34px;background:linear-gradient(180deg,#fff 0%,#fcfcff 100%);box-shadow:0 18px 48px rgba(17,19,24,.08)}
.tpl-xhs-white-editorial .xw-quote{font-size:38px;line-height:1.3;font-weight:800;letter-spacing:-.5px}
.tpl-xhs-white-editorial .xw-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}
.tpl-xhs-white-editorial .xw-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:22px}
.tpl-xhs-white-editorial .xw-card{border:1px solid var(--xw-line);border-radius:24px;padding:24px 26px;box-shadow:0 10px 24px rgba(17,19,24,.04);background:#fff}
.tpl-xhs-white-editorial .xw-card.soft-purple{background:var(--xw-soft-purple)}
.tpl-xhs-white-editorial .xw-card.soft-pink{background:var(--xw-soft-pink)}
.tpl-xhs-white-editorial .xw-card.soft-blue{background:var(--xw-soft-blue)}
.tpl-xhs-white-editorial .xw-card.soft-green{background:var(--xw-soft-green)}
.tpl-xhs-white-editorial .xw-card.soft-orange{background:var(--xw-soft-orange)}
.tpl-xhs-white-editorial .xw-label{font-size:14px;font-weight:800;opacity:.7;margin-bottom:10px;letter-spacing:.08em;text-transform:uppercase}
.tpl-xhs-white-editorial .xw-card .main{font-size:28px;line-height:1.22;font-weight:850;letter-spacing:-.5px}
.tpl-xhs-white-editorial .xw-card .desc{font-size:16px;line-height:1.5;color:#475467;margin-top:12px}
.tpl-xhs-white-editorial .xw-steps{margin-top:18px}
.tpl-xhs-white-editorial .xw-step{display:flex;gap:18px;align-items:flex-start;margin:16px 0}
.tpl-xhs-white-editorial .xw-num{flex:0 0 48px;height:48px;border-radius:50%;background:#111318;color:#fff;display:grid;place-items:center;font-size:20px;font-weight:900}
.tpl-xhs-white-editorial .xw-txt{font-size:22px;line-height:1.45;font-weight:700}
.tpl-xhs-white-editorial .xw-codebox{background:#0f1117;color:#e4e2d8;border-radius:18px;padding:22px 26px;font-family:'JetBrains Mono',monospace;font-size:15px;line-height:1.75;margin-top:20px;border:1px solid #1f222c}
.tpl-xhs-white-editorial .xw-codebox .cm{color:#6b6a62}
.tpl-xhs-white-editorial .xw-codebox .kw{color:#c88f64}
.tpl-xhs-white-editorial .xw-codebox .st{color:#a8c292}
.tpl-xhs-white-editorial .xw-codebox .hl{color:#e9c58a;font-weight:600}
.tpl-xhs-white-editorial .xw-footer{position:absolute;left:88px;right:88px;bottom:44px;display:flex;justify-content:space-between;align-items:flex-end;font-size:13px;color:var(--xw-muted)}
.tpl-xhs-white-editorial .xw-topline{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7,#ec4899,#f43f5e,#f97316,#eab308,#22c55e,#06b6d4,#6366f1)}
.tpl-xhs-white-editorial .xw-pill{display:inline-block;padding:8px 16px;border-radius:999px;font-size:14px;font-weight:700;margin:0 8px 8px 0;background:#fff;border:1px solid var(--xw-line);color:#394150}
.tpl-xhs-white-editorial .xw-big-stat{font-size:96px;font-weight:900;letter-spacing:-4px;line-height:1}
.tpl-xhs-white-editorial .xw-big-stat small{font-size:22px;color:var(--xw-muted);font-weight:700;letter-spacing:0;margin-left:6px}

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-xhs-white-editorial">
<div class="deck">

  <!-- 1. COVER -->
  <section class="slide is-active">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>NevoFlux · 会思考的浏览器</div>
      <div class="xw-page">01 / 08</div>
    </div>
    <div class="xw-kicker">我越来越确定的一件事</div>
    <h1 class="xw-title">一个长了<br><span class="xw-grad">GBrain</span> 的浏览器</h1>
    <p class="xw-sub">NevoFlux 会记住你读过的一切。GBrain 知识库让每个标签页都 <span class="xw-focus">可搜索</span>、<span class="xw-focus">可关联</span>、<span class="xw-focus">可回想</span>。</p>
    <div class="xw-hero">
      <div class="xw-quote">浏览器不该只会 <span class="xw-focus-orange">打开网页</span> —<br>它应该 <span class="xw-focus">记得住、想得通</span>。</div>
    </div>
    <div class="xw-footer"><span>白底｜强重点｜杂志竖排</span><span>Cover · 01</span></div>
  </section>

  <!-- 2. SECTION DIVIDER -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>Chapter · 01</div>
      <div class="xw-page">02 / 08</div>
    </div>
    <div style="margin-top:120px">
      <div class="xw-kicker" style="font-size:20px;letter-spacing:.2em;text-transform:uppercase;color:#98a2b3">第一章</div>
      <h1 class="xw-title" style="font-size:110px;margin-top:20px">先认识 <span class="xw-grad">GBrain</span></h1>
      <p class="xw-sub" style="font-size:28px">你访问过的每个页面,都会变成 agent 能搜的记忆。</p>
    </div>
    <div class="xw-footer"><span>Section Divider</span><span>02 / 08</span></div>
  </section>

  <!-- 3. CONTENT — 4 card grid -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>NevoFlux 里都装了什么</div>
      <div class="xw-page">03 / 08</div>
    </div>
    <h2 class="xw-title-md">让浏览器 <span class="xw-grad">会思考</span> 的四层</h2>
    <div class="xw-grid-2">
      <div class="xw-card soft-pink"><div class="xw-label">GBrain</div><div class="main">采集 · 索引 · 回想</div><div class="desc">每个标签页都汇入一个可搜索的知识库</div></div>
      <div class="xw-card soft-blue"><div class="xw-label">Canvas</div><div class="main">搭应用 · 仪表盘 · 笔记</div><div class="desc">把你浏览到的东西变成一个实时 Canvas 应用</div></div>
      <div class="xw-card soft-green"><div class="xw-label">Agent</div><div class="main">规划 · 点击 · 自动化</div><div class="desc">agent 跨标签页帮你跑真实任务</div></div>
      <div class="xw-card soft-orange"><div class="xw-label">Packs</div><div class="main">技能 · 模板 · 工作流</div><div class="desc">设计 pack 一键给浏览器加上新能力</div></div>
    </div>
    <div class="xw-footer"><span>Content · Grid 2x2</span><span>03 / 08</span></div>
  </section>

  <!-- 4. STEPS -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>GBrain 到底怎么工作</div>
      <div class="xw-page">04 / 08</div>
    </div>
    <h2 class="xw-title-md">从一个标签页,到 <span class="xw-grad">可回想的记忆</span></h2>
    <div class="xw-steps">
      <div class="xw-step"><div class="xw-num">1</div><div class="xw-txt">你在浏览,NevoFlux 在本地把页面收下来</div></div>
      <div class="xw-step"><div class="xw-num">2</div><div class="xw-txt">GBrain 切块、向量化,并和你已有的知识连起来</div></div>
      <div class="xw-step"><div class="xw-num">3</div><div class="xw-txt">用大白话提问,agent 帮你把原文找回来</div></div>
      <div class="xw-step"><div class="xw-num">4</div><div class="xw-txt">把结果丢进一个 <span class="xw-focus">Canvas 应用</span></div></div>
    </div>
    <div class="xw-hero"><div class="xw-quote" style="font-size:30px">NevoFlux 让「<span class="xw-focus-blue">再找一次</span>」变便宜,<br>让「<span class="xw-focus">连起来、接着做</span>」变轻松。</div></div>
    <div class="xw-footer"><span>Content · Steps</span><span>04 / 08</span></div>
  </section>

  <!-- 5. CODE EXAMPLE -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>一个你今晚就能上线的设计技能</div>
      <div class="xw-page">05 / 08</div>
    </div>
    <h2 class="xw-title-md">不是写 prompt,<br>是写一个 <span class="xw-grad">设计技能</span></h2>
    <pre class="xw-codebox"><span class="cm"># packs/design-pack/skills/deck-xhs-white/SKILL.md</span>
<span class="kw">name</span>: <span class="st">deck-xhs-white</span>
<span class="kw">description</span>: <span class="st">"讲 NevoFlux GBrain 故事的白底杂志风 Deck。"</span>

<span class="kw">slots</span>:
  - <span class="hl">cover</span>:     <span class="st">"标题 + 渐变关键词 + 一个黑底重点 pill。"</span>
  - <span class="hl">grid</span>:      <span class="st">"四张马卡龙卡片 — GBrain、Canvas、Agent、Packs。"</span>
  - <span class="hl">steps</span>:     <span class="st">"从标签页到可回想记忆的编号流程。"</span>
  - <span class="hl">chart</span>:     <span class="st">"内联 SVG 条形 — 不引图片、不引外链。"</span></pre>
    <div class="xw-footer"><span>Content · Code Block</span><span>05 / 08</span></div>
  </section>

  <!-- 6. CHART — SVG bar -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>NevoFlux 帮你省在哪</div>
      <div class="xw-page">06 / 08</div>
    </div>
    <h2 class="xw-title-md">少点 <span class="xw-focus-pink">翻找</span>,多点 <span class="xw-focus-green">动手</span></h2>
    <svg viewBox="0 0 960 380" style="width:100%;max-width:1000px;margin-top:30px" xmlns="http://www.w3.org/2000/svg">
      <g font-family="Inter, sans-serif" font-size="16" fill="#475467">
        <!-- baseline -->
        <line x1="180" y1="330" x2="940" y2="330" stroke="#eaecf3" stroke-width="2"/>
        <!-- rows -->
        <g transform="translate(0,40)">
          <text x="170" y="30" text-anchor="end" font-weight="700" fill="#111">翻回旧标签页</text>
          <rect x="180" y="10" width="520" height="28" rx="14" fill="#fff0f6"/>
          <rect x="180" y="10" width="120" height="28" rx="14" fill="#ff5fa2"/>
          <text x="710" y="30" fill="#c11574" font-weight="700">-65% 耗时</text>
        </g>
        <g transform="translate(0,100)">
          <text x="170" y="30" text-anchor="end" font-weight="700" fill="#111">手动查资料</text>
          <rect x="180" y="10" width="520" height="28" rx="14" fill="#eef4ff"/>
          <rect x="180" y="10" width="200" height="28" rx="14" fill="#4e8cff"/>
          <text x="710" y="30" fill="#174ea6" font-weight="700">-40% 耗时</text>
        </g>
        <g transform="translate(0,160)">
          <text x="170" y="30" text-anchor="end" font-weight="700" fill="#111">做笔记</text>
          <rect x="180" y="10" width="520" height="28" rx="14" fill="#fff5ea"/>
          <rect x="180" y="10" width="320" height="28" rx="14" fill="#ff9d42"/>
          <text x="710" y="30" fill="#b54708" font-weight="700">持平</text>
        </g>
        <g transform="translate(0,220)">
          <text x="170" y="30" text-anchor="end" font-weight="700" fill="#111">GBrain 回想</text>
          <rect x="180" y="10" width="520" height="28" rx="14" fill="#edfdf3"/>
          <rect x="180" y="10" width="440" height="28" rx="14" fill="#17b26a"/>
          <text x="710" y="30" fill="#067647" font-weight="700">+85% 更快</text>
        </g>
        <g transform="translate(0,280)">
          <text x="170" y="30" text-anchor="end" font-weight="700" fill="#111">Canvas 搭建</text>
          <rect x="180" y="10" width="520" height="28" rx="14" fill="#f4efff"/>
          <rect x="180" y="10" width="500" height="28" rx="14" fill="#7b61ff"/>
          <text x="710" y="30" fill="#5b21b6" font-weight="700">+110% 产出</text>
        </g>
      </g>
    </svg>
    <div class="xw-footer"><span>Chart · Horizontal Bars</span><span>06 / 08</span></div>
  </section>

  <!-- 7. CTA -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>今晚就可以做的三件事</div>
      <div class="xw-page">07 / 08</div>
    </div>
    <h2 class="xw-title-md">别再收藏夹堆灰,<br>开始 <span class="xw-grad">记得住</span></h2>
    <div class="xw-grid-3">
      <div class="xw-card soft-purple"><div class="xw-label">Tonight</div><div class="main">打开<br>GBrain</div><div class="desc">让一天的浏览变成可搜索的记忆</div></div>
      <div class="xw-card soft-blue"><div class="xw-label">This week</div><div class="main">搭一个<br>Canvas 应用</div><div class="desc">让 agent 把你读到的东西拼成一个视图</div></div>
      <div class="xw-card soft-green"><div class="xw-label">This month</div><div class="main">装一个<br>设计 pack</div><div class="desc">把技能和模板装进来,出活更快</div></div>
    </div>
    <div class="xw-hero"><div class="xw-quote" style="font-size:32px">浏览器不再只是一扇窗,<br>而是 <span class="xw-focus">一个能往上搭的大脑</span>。</div></div>
    <div class="xw-footer"><span>CTA</span><span>07 / 08</span></div>
  </section>

  <!-- 8. THANKS -->
  <section class="slide">
    <div class="xw-topline"></div>
    <div class="xw-topbar">
      <div class="xw-tag"><span class="dot"></span>Thanks for reading</div>
      <div class="xw-page">08 / 08</div>
    </div>
    <div style="margin-top:100px">
      <div class="xw-big-stat xw-grad">谢谢<small> · NevoFlux</small></div>
      <p class="xw-sub" style="font-size:28px;margin-top:36px">如果你的标签页也总是不见了,欢迎在评论里告诉我——<br>你最想让浏览器帮你记住什么?</p>
      <div style="margin-top:40px">
        <span class="xw-pill">@nevoflux</span>
        <span class="xw-pill">白底杂志风 Deck</span>
        <span class="xw-pill">design-pack · full-deck</span>
      </div>
    </div>
    <div class="xw-footer"><span>End</span><span>08 / 08</span></div>
  </section>

</div>

</body>
</html>
```

## 用法

- 第 1 页(封面):大标题打上渐变关键词 + 一行 `.xw-sub`(配两三个黑底 `.xw-focus` pill),再用 `.xw-hero` 引用块收金句。
- 第 2 页(章节分隔):章节 kicker + 超大标题 + 一行副标题;每开新章节复用。
- 第 3 页(2x2 网格):四张 `.xw-card`(粉/蓝/绿/橙),每张一个大写 `.xw-label` + 加粗 `.main` + 一行 `.desc`。
- 第 4 页(步骤):用编号的 `.xw-step` 行表示线性流程,末尾用一个 `.xw-hero` 引用收尾。
- 第 5 页(代码):深色 `.xw-codebox`,用 `cm` / `kw` / `st` / `hl` 几个 span 给注释、键、字符串、高亮上色。
- 第 6 页(图表):内联 SVG 横向条;改条宽、填色和标签即可换成你的数据(不引外部图表库)。
- 第 7 页(行动号召):三张 `.xw-card` 行动项(Tonight / This week / This month)+ 一个收尾 `.xw-hero` 引用。
- 第 8 页(致谢):一个大号渐变标题词 + 一句收尾提问 + 几个 `.xw-pill` 标签(账号 / 模板名 / pack)。
- 每页只保留一个重点;所有 CSS、类名、结构保持不变,只改可见文字。
