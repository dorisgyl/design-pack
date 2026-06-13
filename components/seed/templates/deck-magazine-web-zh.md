---
slug: packs/design-pack/templates/deck-magazine-web-zh
type: template
lang: zh
category: slides
title: "杂志风网页 PPT"
title_en: "NevoFlux Magazine Web Deck"
description: "电子杂志 × 电子墨水风的横向翻页 HTML 演示文稿，衬线 display 标题搭配流体封面。"
tags: [magazine, editorial, e-ink, horizontal swipe, 模板]
sample_image: packs/design-pack/assets/templates/deck-magazine-web.svg
source: html-anything/deck-magazine-web
---

## 设计指导

一套横向翻页的 HTML 演示文稿，整体走电子杂志 × 电子墨水的调性。温暖的米纸底色配上一抹墨蓝主色；衬线 display 字体只用一个字重，且不使用斜体。

布局:
- 封面 (Cover) —— 衬线 display 大标题压在深墨蓝底面上(流体 / 渐变封面处理)。
- 章节幕封页 (Chapter) —— 整页深色过场,用大号编号 + 衬线标题 + 一句引言开启每个章节。
- 数据大字报页 (Stats) —— 一个或多个巨大数字,每个搭配一句解释。
- 图片网格 / 内容页 (Content) —— 内容页把标题列与正文列拆成两栏网格。
- 金句页 (Quote) —— Sunday-paper(周日报刊)风格的引文加署名。

设计细节:
- 字体: display 用衬线字族(Playfair / Noto Serif SC 一类,此处为 Source Serif 4);正文用无衬线(Inter / 思源黑体一类,此处为 Source Sans 3);标签与计数用等宽字体。
- 宏观字号相对印刷基线放大;字间距相应收紧。
- 单一主色(墨蓝);标签底色一律用纯 hex,绝不用 rgba。
- 导航: 键盘 ← / → 翻页、圆点导航、滚轮与触摸滑动,以及 Esc 缩略图总览;当前页与宿主保持同步。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang='zh'>
<head>
<meta charset='utf-8' />
<meta name='viewport' content='width=device-width, initial-scale=1' />
<title>NevoFlux · kami deck — 第 01 卷 / 第 26 期</title>
<meta name='description' content='以 kami 幻灯片形式呈现的 NevoFlux。温暖米纸底色,墨蓝封面与章节页,衬线只用一个字重,不使用斜体。' />
<link rel='preconnect' href='https://fonts.googleapis.com' />
<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
<link href='https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap' rel='stylesheet' />
<style>
/*
 * kami-deck — single-file slide deck stylesheet.
 *
 * Kami token language (warm parchment, ink-blue accent, serif at one
 * weight, no italic) — but laid out as a horizontal swipe deck. Macro
 * tokens are scaled × ~1.6 vs. print baseline; letter-spacing scaled
 * × ~0.6 (per design-systems/kami/DESIGN.md §3).
 *
 * Navigation model is borrowed from skills/guizang-ppt — same flex
 * track + transform translateX, same key/wheel/touch handlers.
 */

:root {
  /* surface */
  --parchment: #f5f4ed;
  --ivory: #faf9f5;
  --warm-sand: #e8e6dc;
  --deep-dark: #141413;

  /* brand (single chromatic accent) */
  --brand: #1B365D;
  --brand-light: #2D5A8A;

  /* text */
  --near-black: #141413;
  --dark-warm: #3d3d3a;
  --olive: #504e49;
  --stone: #6b6a64;

  /* border */
  --border: #e8e6dc;
  --border-soft: #e5e3d8;

  /* tag tints (solid hex, NEVER rgba) */
  --tag-08: #EEF2F7;
  --tag-14: #E4ECF5;
  --tag-22: #D0DCE9;

  /* type */
  --serif: 'Source Serif 4', Charter, Georgia, Palatino, 'Times New Roman', serif;
  --sans: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, Monaco, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 100%; height: 100%;
  overflow: hidden;
  background: var(--parchment);
  color: var(--near-black);
  font-family: var(--serif);
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
strong { font-weight: 500; }

/* ---------- deck flex track ---------- */
#deck {
  position: fixed; inset: 0;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 5;
  will-change: transform;
}
.slide {
  width: 100vw; height: 100vh;
  flex: 0 0 100vw;
  position: relative;
  padding: 80px 96px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--parchment);
  color: var(--near-black);
}
.slide.dark {
  background: var(--brand);
  color: var(--ivory);
}
.slide-inner {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: center;
  gap: 24px;
  position: relative;
  min-height: 0;
}

/* ---------- per-slide chrome strip ---------- */
.slide-chrome {
  position: absolute;
  top: 28px; left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 96px;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--stone);
  z-index: 4;
  pointer-events: none;
}
.slide.dark .slide-chrome { color: rgba(250, 249, 245, 0.55); }
.slide-chrome b { color: var(--near-black); font-weight: 500; }
.slide.dark .slide-chrome b { color: var(--ivory); }
.slide-chrome .left { display: inline-flex; align-items: center; gap: 12px; }
.slide-chrome .right {
  display: inline-flex; align-items: center; gap: 12px;
  font-variant-numeric: tabular-nums;
}
.slide-chrome .mark {
  width: 22px; height: 22px;
  border-radius: 50%;
  border: 1px solid currentColor;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0;
  opacity: 0.85;
}
.slide-foot {
  position: absolute;
  bottom: 28px; left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 96px;
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.4px;
  color: var(--stone);
  font-variant-numeric: tabular-nums;
  z-index: 4;
  pointer-events: none;
}
.slide.dark .slide-foot { color: rgba(250, 249, 245, 0.55); }
.slide-foot .counter {
  font-family: var(--mono);
  letter-spacing: 0.04em;
  color: var(--near-black);
  background: var(--ivory);
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
}
.slide.dark .slide-foot .counter {
  color: var(--ivory);
  background: rgba(250, 249, 245, 0.08);
  border-color: rgba(250, 249, 245, 0.22);
}

/* ---------- progress bar ---------- */
.deck-progress {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 2px;
  background: rgba(27, 54, 93, 0.08);
  z-index: 30;
}
.deck-progress .bar {
  height: 100%;
  background: var(--brand);
  width: 0%;
  transition: width 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}

/* ---------- dot nav ---------- */
#nav {
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  gap: 9px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(245, 244, 237, 0.78);
  border: 1px solid var(--border);
  backdrop-filter: blur(8px);
}
#nav .dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(27, 54, 93, 0.22);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 0;
  padding: 0;
}
#nav .dot:hover {
  background: rgba(27, 54, 93, 0.5);
  transform: scale(1.15);
}
#nav .dot.active {
  background: var(--brand);
  width: 22px;
  border-radius: 999px;
}

#hint {
  position: fixed;
  bottom: 36px; right: 28px;
  z-index: 30;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--stone);
  opacity: 0.75;
}

/* ---------- COVER slide (dark) ---------- */
.s-cover .slide-inner {
  grid-template-columns: 1fr;
  text-align: left;
  align-content: center;
  gap: 28px;
  max-width: 980px;
}
.s-cover .eyebrow {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: rgba(250, 249, 245, 0.65);
}
.s-cover h1 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(60px, 7vw, 110px);
  line-height: 1.05;
  letter-spacing: -1.2px;
  color: var(--ivory);
  margin: 0;
}
.s-cover h1 .hl { color: #B5C8DC; }
.s-cover .tagline {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 21px;
  color: rgba(250, 249, 245, 0.75);
  max-width: 50ch;
  line-height: 1.45;
}
.s-cover .meta {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: rgba(250, 249, 245, 0.6);
  font-variant-numeric: tabular-nums;
}
.s-cover .meta .rule {
  width: 56px; height: 1px;
  background: rgba(250, 249, 245, 0.4);
  display: inline-block;
}

/* ---------- CHAPTER divider (dark) ---------- */
.s-chapter .slide-inner {
  grid-template-columns: 1fr;
  text-align: center;
  align-content: center;
  gap: 36px;
}
.s-chapter .num {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(64px, 8vw, 130px);
  color: rgba(250, 249, 245, 0.55);
  letter-spacing: -0.5px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.s-chapter h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(48px, 5.4vw, 84px);
  line-height: 1.1;
  letter-spacing: -0.6px;
  color: var(--ivory);
  margin: 0 auto;
  max-width: 22ch;
}
.s-chapter .lede {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 19px;
  color: rgba(250, 249, 245, 0.7);
  max-width: 42ch;
  margin: 0 auto;
  line-height: 1.5;
  letter-spacing: 0.05em;
}

/* ---------- CONTENT slide ---------- */
.s-content .slide-inner {
  grid-template-columns: 1fr 2.4fr;
  gap: 56px;
  align-content: center;
}
.s-content.layout-full .slide-inner { grid-template-columns: 1fr; max-width: 980px; }
.s-content .head { display: flex; flex-direction: column; gap: 16px; }
.s-content .num {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.4px;
  color: var(--brand);
  font-variant-numeric: tabular-nums;
}
.s-content h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.1;
  letter-spacing: 0.4px;
  color: var(--near-black);
  margin: 0;
  max-width: 14ch;
}
.s-content .lede {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 15px;
  color: var(--olive);
  max-width: 28ch;
  line-height: 1.5;
}
.s-content .body { display: flex; flex-direction: column; gap: 18px; }
.s-content .body p {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 17px;
  line-height: 1.55;
  color: var(--dark-warm);
  max-width: 64ch;
}
.s-content .body p strong { color: var(--near-black); font-weight: 500; }
.s-content .body code {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--brand);
  background: var(--tag-08);
  padding: 1px 6px;
  border-radius: 3px;
}
.s-content ul.dash {
  list-style: none; padding: 0; margin: 4px 0 0;
  display: flex; flex-direction: column; gap: 10px;
}
.s-content ul.dash li {
  position: relative; padding-left: 18px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  color: var(--dark-warm);
}
.s-content ul.dash li::before {
  content: '\2013';
  position: absolute; left: 0;
  color: var(--brand);
}
.s-content .body .tag-row { margin-top: 4px; }
.s-content .tag {
  display: inline-block;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--brand);
  background: var(--tag-14);
  letter-spacing: 0.4px;
}

/* ---------- STATS slide ---------- */
.s-stats .slide-inner { grid-template-columns: 1fr; gap: 48px; }
.s-stats .head { display: flex; flex-direction: column; gap: 18px; }
.s-stats .num {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.4px;
  color: var(--brand);
  font-variant-numeric: tabular-nums;
}
.s-stats h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(36px, 4.2vw, 60px);
  line-height: 1.1;
  letter-spacing: 0.4px;
  color: var(--near-black);
  max-width: 22ch;
  margin: 0;
}
.s-stats .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.s-stats .stat {
  padding: 32px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 1px solid var(--border-soft);
}
.s-stats .stat:last-child { border-right: 0; }
.s-stats .stat .v {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(48px, 6vw, 88px);
  line-height: 1;
  letter-spacing: -0.8px;
  color: var(--brand);
  font-variant-numeric: tabular-nums;
}
.s-stats .stat .l {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 15px;
  color: var(--near-black);
  margin-top: 8px;
}
.s-stats .stat .s {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 13px;
  color: var(--olive);
  line-height: 1.5;
  max-width: 28ch;
}
.s-stats .caption {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--stone);
  letter-spacing: 0.4px;
  font-variant-numeric: tabular-nums;
}

/* ---------- QUOTE slide ---------- */
.s-quote .slide-inner {
  grid-template-columns: 1fr;
  max-width: 1080px;
  gap: 36px;
  align-content: center;
}
.s-quote blockquote {
  border-left: 2px solid var(--brand);
  padding: 6px 0 6px 28px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(28px, 3.4vw, 42px);
  line-height: 1.35;
  color: var(--near-black);
  margin: 0;
  letter-spacing: 0.05em;
  max-width: 36ch;
}
.s-quote .author {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}
.s-quote .author .glyph {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--brand); color: var(--ivory);
  font-family: var(--serif); font-weight: 500;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0;
}
.s-quote .author p {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 14px;
  color: var(--near-black);
}
.s-quote .author p span {
  display: block;
  color: var(--olive);
  font-weight: 400;
  margin-top: 2px;
}

/* ---------- CTA slide ---------- */
.s-cta .slide-inner {
  grid-template-columns: 1fr;
  max-width: 980px;
  gap: 28px;
  align-content: center;
  text-align: left;
}
.s-cta .eyebrow {
  font-family: var(--sans);
  font-size: 12px; font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--brand);
}
.s-cta h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(48px, 5.4vw, 88px);
  line-height: 1.05;
  letter-spacing: -0.6px;
  color: var(--near-black);
  margin: 0;
}
.s-cta .body {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 17px;
  color: var(--dark-warm);
  max-width: 50ch;
  line-height: 1.55;
}
.s-cta .actions {
  display: inline-flex;
  gap: 12px;
  margin-top: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.s-cta .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.4px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
}
.s-cta .btn-primary {
  background: var(--brand);
  color: var(--ivory);
  box-shadow: 0 0 0 1px var(--brand);
}
.s-cta .btn-primary:hover { background: var(--brand-light); box-shadow: 0 0 0 1px var(--brand-light); }
.s-cta .btn-ghost {
  background: transparent;
  color: var(--brand);
  box-shadow: 0 0 0 1px var(--brand);
}
.s-cta .btn-ghost:hover { background: var(--tag-08); }

/* ---------- END slide (dark) ---------- */
.s-end .slide-inner {
  grid-template-columns: 1fr;
  align-content: end;
  padding-bottom: 24px;
  text-align: left;
  gap: 18px;
  max-width: none;
}
.s-end .word {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(96px, 16vw, 240px);
  line-height: 1;
  letter-spacing: -1.2px;
  color: var(--ivory);
  white-space: nowrap;
  overflow-x: hidden;
}
.s-end .word .hl { color: #B5C8DC; }
.s-end .colophon {
  border-top: 1px solid rgba(250, 249, 245, 0.22);
  padding-top: 22px;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: rgba(250, 249, 245, 0.65);
  font-variant-numeric: tabular-nums;
}

/* ---------- ESC overview ---------- */
#overview {
  position: fixed; inset: 0;
  z-index: 100;
  background: rgba(245, 244, 237, 0.96);
  backdrop-filter: blur(12px);
  display: none;
  overflow-y: auto;
  padding: 60px 56px;
}
#overview .ov-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 32px;
  font-family: var(--sans); font-size: 11px;
  letter-spacing: 1.2px; text-transform: uppercase;
  color: var(--stone);
  font-variant-numeric: tabular-nums;
}
#overview .ov-head b { color: var(--near-black); font-weight: 500; }
#overview .ov-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
  max-width: 1280px;
  margin: 0 auto;
}
#overview .ov-card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: border-color 0.2s, transform 0.2s;
  background: var(--ivory);
}
#overview .ov-card:hover { border-color: var(--brand); transform: translateY(-2px); }
#overview .ov-card.active { border-color: var(--brand); border-width: 2px; }
#overview .ov-thumb {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
  pointer-events: none;
  background: var(--parchment);
}
#overview .ov-thumb .clone {
  width: 100vw; height: 100vh;
  transform: scale(0.18);
  transform-origin: top left;
  position: absolute;
  top: 0; left: 0;
  pointer-events: none;
}
#overview .ov-label {
  padding: 8px 12px;
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.4px; text-transform: uppercase;
  color: var(--stone);
  display: flex; justify-content: space-between; align-items: center;
  font-variant-numeric: tabular-nums;
}
#overview .ov-label b { color: var(--near-black); font-weight: 500; }

/* ---------- responsive ---------- */
@media (max-width: 1080px) {
  .slide { padding: 64px 56px; }
  .slide-chrome, .slide-foot { padding: 0 56px; }
  .s-content .slide-inner { grid-template-columns: 1fr; gap: 28px; }
}
@media (max-width: 640px) {
  .slide { padding: 44px 28px; }
  .slide-chrome, .slide-foot { padding: 0 28px; font-size: 9.5px; letter-spacing: 0.6px; }
  #hint { display: none; }
}
</style>
</head>
<body>

<div id='deck'>

  <!-- ===== 01 · COVER (dark) ===== -->
  <section class='slide s-cover dark' data-slide-kind='cover'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <span class='eyebrow'>会思考的浏览器 · Nº 01</span>
      <h1>一个会和你一起<span class='hl'>思考</span>的浏览器。</h1>
      <p class='tagline'>NevoFlux 把本地优先的浏览器、GBrain 知识库与 Canvas 应用合为一体 —— 由你自己的编码 Agent 驱动。</p>
      <div class='meta'>
        <span>本地优先 · 运行在你的笔记本上</span>
        <span class='rule'></span>
        <span>MMXXVI · Apache-2.0</span>
      </div>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>01 / 09</span>
    </div>
  </section>

  <!-- ===== 02 · CHAPTER (dark) ===== -->
  <section class='slide s-chapter dark' data-slide-kind='chapter'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <p class='num'>01</p>
      <h2>为什么浏览器就是 Agent。</h2>
      <p class='lede'>因为你查阅、阅读、构建的一切早已活在标签页里 —— 这些上下文理应沉淀为记忆,而不是噪声。</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>02 / 09</span>
    </div>
  </section>

  <!-- ===== 03 · CONTENT ===== -->
  <section class='slide s-content' data-slide-kind='content'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='head'>
        <p class='num'>01.1</p>
        <h2>它是什么。</h2>
        <p class='lede'>一个内建记忆与 Agent 的浏览器。</p>
      </div>
      <div class='body'>
        <p>
          NevoFlux 是一款<strong>内建知识库的 Agent 浏览器</strong>。在你浏览时,<strong>GBrain</strong> 会把重要内容索引进本地知识图谱。Agent 读取 <code>GBrain</code>,在你打开的页面上运行,并直接在页面里搭建 <strong>Canvas 应用</strong> —— 仪表盘、阅读器、简报。
        </p>
        <ul class='dash'>
          <li>GBrain —— 页面、笔记与剪藏汇成一张可查询的知识图谱。</li>
          <li>Canvas —— 在原地生成交互式应用,不必另开标签页。</li>
          <li>Agent SDK —— 从你自己的 <code>cwd</code> 与脚本驱动浏览器。</li>
        </ul>
        <div class='tag-row'>
          <span class='tag'>Apache-2.0</span>
          <span class='tag'>本地优先</span>
          <span class='tag'>BYOK</span>
        </div>
      </div>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>03 / 09</span>
    </div>
  </section>

  <!-- ===== 04 · CONTENT ===== -->
  <section class='slide s-content' data-slide-kind='content'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='head'>
        <p class='num'>01.2</p>
        <h2>它用起来如何。</h2>
        <p class='lede'>让研究不断累积,而不是随着标签页关闭而蒸发。</p>
      </div>
      <div class='body'>
        <p>
          打开几个来源,然后发问。Agent 从 GBrain 取出上下文,在你的实时标签页上推理,并把一个 Canvas 应用写到页面上。<strong>每一条剪藏与引用都可以打开溯源。</strong>
        </p>
        <p>
          Packs 按需引入新的技能与设计系统,而重跑是确定的 —— 同样的问题、同样的工作区,得到同样的结果。
        </p>
        <ul class='dash'>
          <li>浏览 → GBrain 把页面、剪藏与笔记纳入图谱。</li>
          <li>发问 → Agent 在实时标签页与知识库之上一起推理。</li>
          <li>构建 → Canvas 应用落到页面上,带出处、可重跑。</li>
        </ul>
      </div>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>04 / 09</span>
    </div>
  </section>

  <!-- ===== 05 · STATS ===== -->
  <section class='slide s-stats' data-slide-kind='stats'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='head'>
        <p class='num'>01.3</p>
        <h2>用数字说话。</h2>
      </div>
      <div class='grid'>
        <div class='stat'>
          <div class='v'>48</div>
          <div class='l'>设计技能</div>
          <div class='s'>文件驱动,今天即可交付,可放入任意 Pack。</div>
        </div>
        <div class='stat'>
          <div class='v'>12</div>
          <div class='l'>Packs</div>
          <div class='s'>把技能、令牌与 Canvas 应用打包,随处可移植。</div>
        </div>
        <div class='stat'>
          <div class='v'>1</div>
          <div class='l'>GBrain</div>
          <div class='s'>跨越每个标签页与每次会话的一张本地知识图谱。</div>
        </div>
        <div class='stat'>
          <div class='v'>3</div>
          <div class='l'>条命令</div>
          <div class='s'>从 <code>git clone</code> 到第一个 Canvas 应用,全在本地。</div>
        </div>
      </div>
      <p class='caption'>NevoFlux v0.2.0 · Apache-2.0 · MMXXVI · 数据截至第 26 期。</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>05 / 09</span>
    </div>
  </section>

  <!-- ===== 06 · CHAPTER (dark) ===== -->
  <section class='slide s-chapter dark' data-slide-kind='chapter'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <p class='num'>02</p>
      <h2>接下来会发布什么。</h2>
      <p class='lede'>2026 年第二季度 —— 共享 GBrain、多租户 Packs,以及更稳固的 Agent SDK。路线图完全公开。</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>06 / 09</span>
    </div>
  </section>

  <!-- ===== 07 · QUOTE ===== -->
  <section class='slide s-quote' data-slide-kind='quote'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <blockquote>
        NevoFlux 把我们散落一周的浏览器标签页,变成了一座持续生长的知识库 —— 然后直接在页面上,为我们搭出了仪表盘。
      </blockquote>
      <div class='author'>
        <span class='glyph'>柯</span>
        <p>
          柯敏
          <span>研究负责人 · North Form</span>
        </p>
      </div>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>07 / 09</span>
    </div>
  </section>

  <!-- ===== 08 · CTA ===== -->
  <section class='slide s-cta' data-slide-kind='cta'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <span class='eyebrow'>开始构建 · Nº 03</span>
      <h2>给你的浏览器一份记忆,和一个 Agent。</h2>
      <p class='body'>
        给仓库点个 Star、安装一个 Pack,或今晚就运行 <code>nevoflux dev</code>。三条命令,GBrain 就归你所有。
      </p>
      <div class='actions'>
        <a class='btn btn-primary' href='#start'>在 GitHub 点 Star</a>
        <a class='btn btn-ghost' href='#issues'>提一个 issue</a>
      </div>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>08 / 09</span>
    </div>
  </section>

  <!-- ===== 09 · END (dark) ===== -->
  <section class='slide s-end dark' data-slide-kind='end'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · 第 01 卷 / 第 26 期</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='word'>Nevo<span class='hl'>Flux.</span></div>
      <p class='colophon'>Apache-2.0 · MMXXVI · 本地优先 · GBrain · Canvas · 由 kami 排印</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>09 / 09</span>
    </div>
  </section>

</div>

<div id='nav'></div>
<div id='hint'>← / → · esc · swipe</div>
<div class='deck-progress'><div class='bar'></div></div>

<script>
(function () {
  var deck = document.getElementById('deck');
  if (!deck) return;
  var slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
  var nav = document.getElementById('nav');
  var bar = document.querySelector('.deck-progress .bar');
  var total = slides.length;
  var idx = 0, lock = false;

  deck.style.width = (total * 100) + 'vw';

  slides.forEach(function (s, i) {
    var b = document.createElement('button');
    b.className = 'dot';
    b.dataset.i = i;
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.onclick = function () { go(i); };
    nav.appendChild(b);
  });

  /* Unthrottled state update. The interaction throttle (`lock`) only
     guards wheel/key/touch so a fast input burst doesn't overshoot the
     transition; host- and observer-driven sync must bypass it, otherwise
     a host message or restoreInitialSlide that lands inside the 700ms
     window after go(0) silently no-ops and the deck stays on slide 1
     while the host counter advances. */
  function applySlide(n) {
    idx = Math.max(0, Math.min(total - 1, n));
    deck.style.transform = 'translateX(' + (-idx * 100) + 'vw)';
    /* load-bearing: .slide.active is read by NevoFlux's host bridge
       (src/runtime/srcdoc.ts findActiveByClass) to drive the slide
       counter. No CSS targets it — do not remove. */
    slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    nav.querySelectorAll('.dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
    if (bar) bar.style.width = (((idx + 1) / total) * 100) + '%';
  }

  function go(n) {
    if (lock) return;
    applySlide(n);
    lock = true;
    setTimeout(function () { lock = false; }, 700);
  }

  /* ESC overview */
  var overviewOn = false;
  var ov = document.createElement('div');
  ov.id = 'overview';
  document.body.appendChild(ov);

  function buildOverview() {
    ov.innerHTML = '';
    var head = document.createElement('div');
    head.className = 'ov-head';
    head.innerHTML = '<span><b>Slide overview</b> · esc to close</span><span>' +
      String(idx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0') + '</span>';
    ov.appendChild(head);
    var grid = document.createElement('div');
    grid.className = 'ov-grid';
    slides.forEach(function (s, i) {
      var card = document.createElement('div');
      card.className = 'ov-card' + (i === idx ? ' active' : '');
      var thumb = document.createElement('div');
      thumb.className = 'ov-thumb';
      var clone = s.cloneNode(true);
      clone.className = clone.className + ' clone';
      clone.style.transform = 'scale(0.18)';
      thumb.appendChild(clone);
      var label = document.createElement('div');
      label.className = 'ov-label';
      label.innerHTML = '<b>' + String(i + 1).padStart(2, '0') + '</b><span>' +
        (s.dataset.slideKind || '') + '</span>';
      card.appendChild(thumb);
      card.appendChild(label);
      card.onclick = function () { toggleOverview(); go(i); };
      grid.appendChild(card);
    });
    ov.appendChild(grid);
  }

  function toggleOverview() {
    overviewOn = !overviewOn;
    if (overviewOn) { buildOverview(); ov.style.display = 'block'; }
    else { ov.style.display = 'none'; }
  }

  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); toggleOverview(); return; }
    if (overviewOn) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault(); go(idx + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
      e.preventDefault(); go(idx - 1);
    } else if (e.key === 'Home') {
      e.preventDefault(); go(0);
    } else if (e.key === 'End') {
      e.preventDefault(); go(total - 1);
    }
  });

  var wheelTO = null, wheelAcc = 0;
  addEventListener('wheel', function (e) {
    if (overviewOn) return;
    wheelAcc += e.deltaY + e.deltaX;
    if (Math.abs(wheelAcc) > 60) {
      go(idx + (wheelAcc > 0 ? 1 : -1));
      wheelAcc = 0;
    }
    clearTimeout(wheelTO);
    wheelTO = setTimeout(function () { wheelAcc = 0; }, 150);
  }, { passive: true });

  var tx = 0, ty = 0;
  addEventListener('touchstart', function (e) {
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  addEventListener('touchend', function (e) {
    if (overviewOn) return;
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(idx + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  /* Host-driven navigation: NevoFlux's host bridge classifies this deck
     as class-driven (because go() toggles .slide.active) but the visible
     slide is moved by deck.style.transform, which the bridge can't drive.
     Two cooperating handlers keep the deck in sync with the host:
       1. An nf:slide message listener routes host nav through go() and
          calls stopImmediatePropagation() so the bridge's own listener
          (registered after this one) doesn't run a second time and
          overshoot by re-reading the freshly-toggled .active class.
       2. A MutationObserver on each slide watches .active and pulls the
          deck transform onto the active index for class changes that
          don't come through a message — chiefly the bridge's
          restoreInitialSlide path, which calls setActive() directly. */
  addEventListener('message', function (e) {
    var data = e && e.data;
    if (!data || data.type !== 'nf:slide') return;
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    if (data.action === 'go' && typeof data.index === 'number') applySlide(data.index);
    else if (data.action === 'next') applySlide(idx + 1);
    else if (data.action === 'prev') applySlide(idx - 1);
    else if (data.action === 'first') applySlide(0);
    else if (data.action === 'last') applySlide(total - 1);
  });

  if (typeof MutationObserver !== 'undefined') {
    var syncFromActiveClass = function () {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList && slides[i].classList.contains('active') && i !== idx) {
          applySlide(i);
          return;
        }
      }
    };
    var mo = new MutationObserver(syncFromActiveClass);
    slides.forEach(function (s) { mo.observe(s, { attributes: true, attributeFilter: ['class'] }); });
  }

  applySlide(0);
})();
</script>
</body>
</html>
```

## 用法

每个 `<section class='slide ...'>` 就是一页,按顺序填入:

- 封面 (`s-cover`) —— eyebrow、`h1` display 大标题(把其中一个词包进 `<span class='hl'>` 以使用主色调)、tagline 以及 meta 信息行。
- 章节页 (`s-chapter`) —— 章节编号、`h2` 标题、一句引言。每个主要章节前放一页。
- 内容页 (`s-content`) —— 标题列(`num`、`h2`、lede)加上正文列,正文含段落、`ul.dash` 列表与可选的 `.tag` 标签。
- 数据页 (`s-stats`) —— 最多四个 `.stat` 单元格,每个含大数值 `.v`、标签 `.l` 与一句说明 `.s`;再加一行等宽 caption。
- 金句页 (`s-quote`) —— 一段引文与署名块(首字 glyph、姓名、职务)。
- CTA 页 (`s-cta`) —— eyebrow、标题、正文与两个按钮(`btn-primary`、`btn-ghost`);链接为占位锚点,保持站内。
- 收尾页 (`s-end`) —— 收尾字标与一行 colophon。

让 `.slide-chrome`、`.slide-foot` 与 `counter` 三处计数保持同步(`NN / 09`),若增删页面请同步更新 `data-slide-kind`。导航(键盘、圆点、滚轮、触摸、Esc 总览)由内联脚本接管;无需任何外部资源或 URL。
