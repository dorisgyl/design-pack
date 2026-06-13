---
slug: packs/design-pack/templates/deck-open-slide-canvas
type: template
lang: en
category: slides
title: "Open-Slide 1920 Canvas Deck"
title_zh: "1920 画布自由 Deck"
description: "A locked 1920x1080 canvas deck where each slide is composed freely, React-component style, with no fixed template."
tags: [canvas, open-slide, freeform, 1920, react, template]
sample_image: packs/design-pack/assets/templates/deck-open-slide-canvas.svg
source: html-anything/deck-open-slide-canvas
---

## Design guidance

A fixed 1920x1080 canvas plus strong type and color constraints, letting the agent lay out each slide freely - like writing a React component - instead of being boxed in by a template. Built for cases that should not feel template-bound: a personal portfolio, an unusual talk, a design / art-class deck. Inspired by 1weiho/open-slide.

### Hard technical specs
- Canvas: every slide is strictly `width: 1920px; height: 1080px;`, fit to the viewport with `transform: scale(...)` (default `scale(0.7)`, centered).
- Overflow is absolutely forbidden: each slide's content must fit inside 1920x1080 - no scrollbars.
- Type scale (px): `2xs:18 - xs:22 - sm:28 - md:36 - lg:48 - xl:64 - 2xl:88 - 3xl:120 - 4xl:160 - 5xl:220`.
- Padding: one of three steps - 96 / 128 / 160.
- Each slide is a `<section class="slide" data-slide-id="<n>">`.

### Palettes (pick ONE per deck, never change mid-deck)
- Ash & Lime - bg `#f1efea`, ink `#161616`, accent `#c5e803`.
- Sea Indigo - bg `#0a0e1a`, ink `#f5f5f7`, accent `#5ac8fa`.
- Mate Mocha - bg `#1a1411`, ink `#f5e9d6`, accent `#d97757`.
- Pearl Rose - bg `#fdf6f3`, ink `#1a1015`, accent `#ff5d8f`.

### Layout freedom - this is the core
- No forced template. Each slide picks its own layout based on the nature of its content: cover / question / quote / image-text / three-column / five-column / list / data card / full-bleed image.
- But every slide must obey one rule: there is exactly ONE visual focal point - a single line, a single number, a single image. Do not emphasize everything.
- Never stack two equally weighted paragraphs; if you truly need parallel items, use a 3-column grid of equal weight.

### Fonts
- Latin: `Inter Tight` (display) + `Inter` (body); or `Source Serif Pro` for an editorial feel.
- CJK: `Noto Sans SC` (sans) or `Noto Serif SC` (editorial); never mix sans + serif.
- Mono: `JetBrains Mono` for data / timestamps.

### Design details
- No emoji decoration (emoji inside actual content is fine); no rainbow of colors; use a single accent only.
- Do not pull SVG icons from generic libraries like lucide / feather - hand-write inline SVG.
- Add keyboard left / right navigation with hash sync; fixed corner marks - bottom-right `No.N/M`, bottom-left the deck title.
- Use the user's real content; never use lorem ipsum.
- Single-file HTML; Tailwind CDN; never hot-link images.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Open-Slide Canvas - One Question</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif; background:#020306; margin:0; min-height:100vh; }
  .slide-frame { width:1280px; height:720px; transform:scale(0.78); transform-origin: top left; }
  .canvas { background:#0a0e1a; color:#f5f5f7; }
  .accent { color:#5ac8fa; }
  .mono { font-family:'JetBrains Mono',ui-monospace,monospace; }
  /* hairline diag bg */
  .grain {
    background-image:
      radial-gradient(circle at 20% 80%, rgba(90,200,250,0.10) 0%, transparent 50%),
      radial-gradient(circle at 80% 30%, rgba(124,92,255,0.08) 0%, transparent 55%);
  }
</style>
</head>
<body class="p-10 overflow-hidden">
<div class="slide-frame canvas grain relative">
  <div class="absolute inset-0 p-32 flex flex-col justify-between">
    <header class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-60">
      <span>NEVOFLUX · DECK · OPEN-SLIDE CANVAS</span>
      <span>SEA INDIGO</span>
      <span>№05 / 12</span>
    </header>

    <div>
      <div class="mono text-[12px] uppercase tracking-[0.22em] accent">Question 03</div>
      <h1 class="mt-6 font-black leading-[0.95] tracking-[-0.025em]" style="font-size:120px">
        When the browser can<br/>
        build a <span class="accent">Canvas app</span><br/>
        from one <em class="not-italic" style="font-family:'Source Serif Pro',serif;font-style:italic;font-weight:500">prompt</em>.
      </h1>
      <p class="mt-10 text-[28px] opacity-70 max-w-[820px] leading-snug">
        What does your team still keep doing by hand?
      </p>
    </div>

    <footer class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-50">
      <span>1920 × 1080 · CANVAS · KBD ← →</span>
      <span class="accent">nevoflux · gbrain knowledge base</span>
      <span>00 : 03 : 21</span>
    </footer>
  </div>
</div>
</body>
</html>
```

## Usage

This seed is a single canvas slide in the Sea Indigo palette, using the "one question" layout - one focal line, nothing competing with it.

- Header (mono, top): set the deck breadcrumb (`NEVOFLUX · DECK · OPEN-SLIDE CANVAS`), the active palette name, and the folio mark (`No.05 / 12`).
- Kicker (`.accent` mono): label the slide, e.g. `Question 03`.
- Headline (`<h1>`, 120px): the single focal sentence - break it by meaning and wrap the key word in `.accent`; keep one serif italic accent at most.
- Sub-line: one short follow-up question or framing line; never add a second equal-weight paragraph.
- Footer (mono): canvas spec + nav hint on the left, an accent label / source in the middle, a timestamp on the right.
- Pick exactly one palette from the guidance and apply its hex to `.canvas` / `.accent`; do not mix palettes. Keep all CSS, class names, sizing, and structure unchanged - only swap the visible text.
