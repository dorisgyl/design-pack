---
slug: packs/design-pack/templates/deck-swiss-international
type: template
lang: en
category: slides
title: "Swiss International Deck"
title_zh: "瑞士国际主义 Deck"
description: "Swiss International grid deck for cool, rational product, analysis, and methodology storytelling about NevoFlux."
tags: [swiss, grid, international, ikb, editorial, facts, template]
sample_image: packs/design-pack/assets/templates/deck-swiss-international.svg
source: html-anything/deck-swiss-international
---

## Design guidance

Swiss International deck. The intent is fact, product, analysis, and methodology expression - extremely calm, rational, and academic, with no hand-drawn marks, noise, or decoration. Inspired by the op7418/guizang-ppt Style B.

### Palettes (pick exactly ONE, never mix, never edit the hex)
- Klein Blue (IKB) - accent `#002FA7`, paper `#fafaf8`, ink `#0a0a0a`. Business / AI / design scenarios.
- Lemon Yellow - accent `#FFD500`, paper `#f7f5ee` (soft cream), ink `#0a0a0a`. Young / retail / sports. Text must stay black (never white).
- Lemon Green / Neon - accent `#C5E803`, paper `#f7f5ee`, ink `#0a0a0a`. Sustainability / tech startup / Gen-Z brands. Text must stay black.
- Safety Orange - accent `#FF6B35`, paper `#f7f5ee`, ink `#0a0a0a`. Industrial / automotive / urgent messaging. Text is white + bold >= 600.

### Layout pool (22 reusable layouts - never invent or remodel a layout)
The number of slides is driven by the content - keep going until every user point is covered (short content starts at 6-10 slides; long content should far exceed that, and the same layout may repeat across chapters).
- S01 Cover - full-screen accent + ASCII breathing dot field + reversed-out title + metadata chrome (date / № / topic).
- S02 Vertical Timeline - left dashed axis + dots; right node = year + KPI + description.
- S03 Statement - 9.6vw centered giant type + large left whitespace + bottom hairline + annotation.
- S04 Six Cells - 2x3 grid, each cell: icon + number + short title + one-line description.
- S05 Three Sub-cards - left hero title + right three horizontally stacked gray cards.
- S06 KPI Tower - 4 columns of variable-height blue bars; icon on top; big number + label at the bottom.
- S07 H-Bar Chart - horizontal ranking bars, width reflects the data, figure at the end.
- S08 Duo Compare - vertical divider; left Before / right After.
- S09 Closing Manifesto - left IKB block + ASCII dot field + manifesto; right white panel + 3 bullet points.
- S10 Dot Matrix Statement - centered manifesto + corner geometric dot / ring matrix.
- S11 Horizontal Timeline - top headline, mid hairline axis, evenly spaced nodes, step names below each node.
- S12 Manifesto + Ink Banner - top half headline + explanation; bottom half full-width black banner + reversed-out small text.
- S13 Three Forces Cards - left ink hero block; right 3 gray cards, each: big number + text.
- S14 Loop Diagram - left numbered steps; right SVG concentric rings; "LOOP" label in the center.
- S15 Image Matrix + Hero Stat - 4x3 equal-height cards (12 items) + bottom summary big number + label.
- S16 Multi-card Brief - 3x2 micro cards; lead text top-left, footnote bottom-right, one card accent-highlighted.
- S17 System Diagram - left headline + 3 description blocks; right SVG three concentric circles + outer labels.
- S18 Why Now - 3 columns, each: category label + headline + description + bottom number (last column accent).
- S19 Four Cards - top accent hairline + headline + 4 equal-width cards (metadata / title / body).
- S20 Stacked KPI Ledger - vertical rows + hairline dividers; big number left / label center / icon right.
- S21 Tech Spec Sheet - left title block / center 3 KPI hairlines / right variable-height bars / bottom data.
- S22 Image Hero - top 60% full-width image + white title block overlay; bottom 40% explanation + 3-column KPI.

### Design details (absolute rules)
- Right angles only: `border-radius: 0` everywhere. A rounded corner is an instant violation.
- 1px hairline borders, black or accent; no shadow / gradient / blur whatsoever.
- 16-column grid: `grid-template-columns: repeat(16, 1fr); gap: 0`.
- Fonts: Inter Tight (Latin display) / Inter (body) / Noto Sans SC (Chinese) / JetBrains Mono (data); no serifs, no decorative typefaces.
- Extreme type contrast: cover uses 9.6vw display, body 14-16px, label 11px uppercase with letter-spacing 0.08em.
- Keyboard left / right to switch + hash sync; fixed corner marks: `№N/N` bottom-right, topic label bottom-left.
- No fabrication: numbers must come from real input, and bar heights must scale to the real data.
- Output a single HTML file with no external image URLs; render decorative geometry (ASCII matrix / concentric circles) with pure CSS or inline SVG.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux · Swiss International 2026</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter Tight','Inter','Noto Sans SC',system-ui,sans-serif; background:#0a0a0a; color:#fafaf8; margin:0; }
  .slide { width:100%; aspect-ratio:16/9; max-width:1280px; margin:0 auto; position:relative; overflow:hidden; }
  .ikb { background:#002FA7; color:#fafaf8; }
  .paper { background:#fafaf8; color:#0a0a0a; }
  .mono { font-family:'JetBrains Mono', ui-monospace, monospace; }
  .hairline-b { border-bottom:1px solid currentColor; }
  .hairline-t { border-top:1px solid currentColor; }
  /* ASCII dot field */
  .ascii { font-family:'JetBrains Mono', monospace; font-size:11px; line-height:1; letter-spacing:6px; opacity:0.2; }
  .bar { width:60px; background:#002FA7; }
  .deck { display:grid; gap:24px; padding:24px; }
</style>
</head>
<body>
<div class="deck">

  <!-- S01 Cover · Full IKB -->
  <section class="slide ikb">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em]">
        <span>NEVOFLUX — 2026 PRODUCT ROADMAP</span>
        <span>S01 / 22</span>
        <span>2026.05.11</span>
      </header>
      <!-- ascii dot matrix top-right -->
      <pre class="absolute top-20 right-12 ascii">▒▓█▓▒░░▒▓█▓▒
▒▒▓█▓▒░░▒▓█▓▒
░▒▓█▓▒░░▒▓█▓▒
░░▒▓█▓▒░░▒▓█▓
▒░░▒▓█▓▒░░▒▓
▒▒░░▒▓█▓▒░░▒</pre>
      <div>
        <div class="mono text-[12px] uppercase tracking-[0.18em] opacity-80">№01 · THE AGENTIC BROWSER</div>
        <h1 class="mt-3 font-black leading-[0.95] tracking-[-0.02em]" style="font-size:clamp(48px,7.5vw,124px)">
          A browser<br/>that builds<br/>and remembers.
        </h1>
        <p class="mt-5 max-w-[640px] text-[15px] opacity-90 leading-snug">
          The NevoFlux browser · a local GBrain knowledge base · the agent builds Canvas apps · zero cloud keys · ships self-contained HTML.
        </p>
      </div>
      <footer class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-70 hairline-t pt-3">
        <span>NEVOFLUX.STUDIO</span>
        <span>LOCAL-FIRST · ON-DEVICE · OFFLINE-READY</span>
        <span>VOL. 01</span>
      </footer>
    </div>
  </section>

  <!-- S06 KPI Tower · paper bg, 4 IKB bars -->
  <section class="slide paper">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em]">
        <span>KPI TOWER — Q1-Q4 OUTLOOK</span>
        <span>S06 / 22</span>
        <span>FY 2026</span>
      </header>
      <div>
        <div class="mono text-[12px] uppercase tracking-[0.18em]" style="color:#002FA7">№06 · GROWTH METRICS</div>
        <h2 class="mt-2 font-black leading-[1] tracking-[-0.02em]" style="font-size:clamp(36px,4.8vw,80px)">
          Four bars, one aim ——<br/>
          the most <span style="color:#002FA7">trusted</span> local browser.
        </h2>
      </div>
      <!-- bars -->
      <div class="grid grid-cols-4 gap-10 items-end mt-6">
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><rect x="4" y="4" width="4" height="16"/><rect x="10" y="8" width="4" height="12"/><rect x="16" y="2" width="4" height="18"/></svg>
          </div>
          <div class="bar mx-auto" style="height:60px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">75</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">Design skills · now</div>
        </div>
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><circle cx="12" cy="12" r="9" fill="none" stroke="#002FA7" stroke-width="2"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div class="bar mx-auto" style="height:140px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">17</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">Canvas apps · shipped</div>
        </div>
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/></svg>
          </div>
          <div class="bar mx-auto" style="height:230px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">25K</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">GBrain notes · indexed</div>
        </div>
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><path d="M5 3l10 9-10 9z"/></svg>
          </div>
          <div class="bar mx-auto" style="height:280px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">0</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">Cloud keys · required</div>
        </div>
      </div>
      <footer class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-60 hairline-t pt-3 mt-4">
        <span>SOURCE — NEVOFLUX INTERNAL ANALYTICS / 2026-04</span>
        <span>NEVOFLUX.STUDIO</span>
        <span>№06 / 22</span>
      </footer>
    </div>
  </section>

</div>
</body>
</html>
```

## Usage

This seed ships two of the 22 reusable layouts (S01 Cover + S06 KPI Tower); clone and repeat layouts from the pool to cover your full story.

- Pick exactly one palette from the guidance and apply its hex to `.ikb` (accent) and `.paper`; never mix palettes or edit the hex. Keep all CSS, class names, sizing, and structure unchanged - swap only the visible text.
- Corner chrome: the `mono` header row holds the topic label (`NEVOFLUX — ...`), the slide marker (`S01 / 22`), and the date; the footer hairline row repeats the studio mark and `№N / 22`.
- S01 Cover (`.slide.ikb`): set the kicker (`№01 · ...`), the big `h1` hero headline (line-broken by meaning), and the lead paragraph; keep the ASCII dot field as pure-text decoration.
- S06 KPI Tower (`.slide.paper`): fill the four columns with an inline-SVG icon, a `.bar` whose height scales to the real figure, the big `mono` number, and an uppercase label. Numbers must be real - do not fabricate, and keep bar heights proportional to the data.
