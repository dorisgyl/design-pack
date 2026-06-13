---
slug: packs/design-pack/templates/deck-magazine-web
type: template
lang: en
category: slides
title: "NevoFlux Magazine Web Deck"
title_zh: "杂志风网页 PPT"
description: "An editorial e-ink magazine-style horizontal-swipe HTML slide deck with serif display type and a fluid cover."
tags: [magazine, editorial, e-ink, horizontal swipe, template]
sample_image: packs/design-pack/assets/templates/deck-magazine-web.svg
source: html-anything/deck-magazine-web
---

## Design guidance

A horizontal-swipe HTML deck styled like an electronic magazine crossed with an e-ink reader. Warm parchment surfaces carry an ink-blue chromatic accent; serif display type is used at a single weight with no italic.

Layout:
- Cover — large serif display headline over a deep ink-blue surface (a fluid / gradient cover treatment).
- Chapter divider — a full dark interstitial that opens each section with a large number, a serif title, and a short lede.
- Stats / big-number page — one or more oversized figures, each paired with a one-line explanation.
- Image / content grid — content slides splitting head and body into a two-column grid.
- Quote page — a Sunday-paper pull quote with attribution.

Design details:
- Type: a serif display family (Playfair / Noto Serif SC class, here Source Serif 4) for display, paired with a sans body (Inter / Source Sans 3 class) and a mono for labels and counters.
- Macro type tokens are scaled up versus a print baseline; letter-spacing is tightened to suit.
- Single chromatic accent (ink blue); tag tints are solid hex, never rgba.
- Navigation: keyboard left / right to move between slides, dot nav, wheel and touch swipe, and an Esc overview grid; the active slide stays in sync with the host.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='utf-8' />
<meta name='viewport' content='width=device-width, initial-scale=1' />
<title>NevoFlux · kami deck — Vol. 01 / Issue Nº 26</title>
<meta name='description' content='NevoFlux as a kami slide deck. Warm parchment with ink-blue cover and chapter slides, serif at one weight, no italic.' />
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
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <span class='eyebrow'>The agentic browser · Nº 01</span>
      <h1>A browser that <span class='hl'>thinks</span> with you.</h1>
      <p class='tagline'>NevoFlux pairs a local-first browser with a GBrain knowledge base and Canvas apps — driven by your own coding agent.</p>
      <div class='meta'>
        <span>Local-first · runs on your laptop</span>
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
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <p class='num'>01</p>
      <h2>Why the browser is the agent.</h2>
      <p class='lede'>Because everything you research, read, and build already lives in tabs — and that context deserves to become memory, not noise.</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>02 / 09</span>
    </div>
  </section>

  <!-- ===== 03 · CONTENT ===== -->
  <section class='slide s-content' data-slide-kind='content'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='head'>
        <p class='num'>01.1</p>
        <h2>What it is.</h2>
        <p class='lede'>A browser with a memory and an agent built in.</p>
      </div>
      <div class='body'>
        <p>
          NevoFlux is an <strong>agentic browser with a built-in knowledge base</strong>. As you browse, the <strong>GBrain</strong> indexes what matters into a local knowledge graph. The agent reads <code>GBrain</code>, runs against your open pages, and builds <strong>Canvas apps</strong> — dashboards, readers, briefs — straight onto the page.
        </p>
        <ul class='dash'>
          <li>GBrain — pages, notes, and clips become a queryable knowledge graph.</li>
          <li>Canvas — generate interactive apps in place, not in another tab.</li>
          <li>Agent SDK — drive the browser from your own <code>cwd</code> and scripts.</li>
        </ul>
        <div class='tag-row'>
          <span class='tag'>Apache-2.0</span>
          <span class='tag'>Local-first</span>
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
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='head'>
        <p class='num'>01.2</p>
        <h2>How it feels.</h2>
        <p class='lede'>Research that compounds, instead of evaporating with each closed tab.</p>
      </div>
      <div class='body'>
        <p>
          Open a few sources and ask. The agent pulls context from GBrain, reasons over your live tabs, and writes a Canvas app onto the page. <strong>Every clip and citation is something you can open.</strong>
        </p>
        <p>
          Packs add new skills and design systems on demand, and re-runs are deterministic — same query, same workspace, same result.
        </p>
        <ul class='dash'>
          <li>Browse → GBrain captures pages, clips, and notes into the graph.</li>
          <li>Ask → the agent reasons over live tabs plus your knowledge base.</li>
          <li>Build → a Canvas app lands on the page, sourced and re-runnable.</li>
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
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='head'>
        <p class='num'>01.3</p>
        <h2>By the numbers.</h2>
      </div>
      <div class='grid'>
        <div class='stat'>
          <div class='v'>48</div>
          <div class='l'>Design skills</div>
          <div class='s'>file-based, shippable today, drop into any pack.</div>
        </div>
        <div class='stat'>
          <div class='v'>12</div>
          <div class='l'>Packs</div>
          <div class='s'>portable bundles of skills, tokens, and Canvas apps.</div>
        </div>
        <div class='stat'>
          <div class='v'>1</div>
          <div class='l'>GBrain</div>
          <div class='s'>one local knowledge graph across every tab and session.</div>
        </div>
        <div class='stat'>
          <div class='v'>3</div>
          <div class='l'>Commands</div>
          <div class='s'>from <code>git clone</code> to first Canvas app, locally.</div>
        </div>
      </div>
      <p class='caption'>NevoFlux v0.2.0 · Apache-2.0 · MMXXVI · figures as of Issue Nº 26.</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>05 / 09</span>
    </div>
  </section>

  <!-- ===== 06 · CHAPTER (dark) ===== -->
  <section class='slide s-chapter dark' data-slide-kind='chapter'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <p class='num'>02</p>
      <h2>What ships next.</h2>
      <p class='lede'>Q2 2026 — shared GBrain, multi-tenant packs, and a hardened agent SDK. The roadmap is public.</p>
    </div>
    <div class='slide-foot'>
      <span>NevoFlux · MMXXVI</span>
      <span class='counter'>06 / 09</span>
    </div>
  </section>

  <!-- ===== 07 · QUOTE ===== -->
  <section class='slide s-quote' data-slide-kind='quote'>
    <div class='slide-chrome'>
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <blockquote>
        NevoFlux turned a week of scattered browser tabs into a single living knowledge base — and then built the dashboard for us, right on the page.
      </blockquote>
      <div class='author'>
        <span class='glyph'>m</span>
        <p>
          Mina Kovac
          <span>Head of Research · North Form</span>
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
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <span class='eyebrow'>Start building · Nº 03</span>
      <h2>Give your browser a memory and an agent.</h2>
      <p class='body'>
        Star the repo, install a pack, or run <code>nevoflux dev</code> tonight. Three commands and the GBrain is yours.
      </p>
      <div class='actions'>
        <a class='btn btn-primary' href='#start'>Star on GitHub</a>
        <a class='btn btn-ghost' href='#issues'>Open an issue</a>
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
      <span class='left'><span class='mark'>NF</span> <b>NevoFlux</b> · Vol. 01 / Issue Nº 26</span>
      <span class='right'>NevoFlux · kami deck</span>
    </div>
    <div class='slide-inner'>
      <div class='word'>Nevo<span class='hl'>Flux.</span></div>
      <p class='colophon'>Apache-2.0 · MMXXVI · Local-first · GBrain · Canvas · Composed in kami</p>
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

## Usage

Each `<section class='slide ...'>` is one slide; fill them in order:

- Cover (`s-cover`) — eyebrow, `h1` display headline (wrap one word in `<span class='hl'>` for the accent tint), tagline, and the meta line.
- Chapter (`s-chapter`) — section number, `h2` title, short lede. Use one before each major section.
- Content (`s-content`) — head column (`num`, `h2`, lede) plus a body column with paragraphs, a `ul.dash` list, and optional `.tag` chips.
- Stats (`s-stats`) — up to four `.stat` cells, each with a big value `.v`, a label `.l`, and a one-line note `.s`; plus a mono caption.
- Quote (`s-quote`) — one pull quote and an author block (initial glyph, name, role).
- CTA (`s-cta`) — eyebrow, headline, body, and two buttons (`btn-primary`, `btn-ghost`); links are placeholder anchors, keep them internal.
- End (`s-end`) — the closing wordmark and a colophon line.

Keep the `.slide-chrome`, `.slide-foot`, and `counter` strips in sync (`NN / 09`), and update `data-slide-kind` if you add or remove slides. Navigation (keyboard, dots, wheel, touch, Esc overview) is wired by the inline script; no external assets or URLs are required.
