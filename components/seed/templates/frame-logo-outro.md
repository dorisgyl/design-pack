---
slug: packs/design-pack/templates/frame-logo-outro
type: template
lang: en
category: video
title: "NevoFlux Logo Outro Frame"
title_zh: "品牌 Logo 收尾帧"
description: "An end-card frame that assembles the NevoFlux logo from geometric pieces, blooms a glow, and reveals the brand name + tagline + CTA."
tags: [logo, outro, branding, end-card, frame, template]
sample_image: packs/design-pack/assets/templates/frame-logo-outro.svg
source: html-anything/frame-logo-outro
---

## Design guidance

Intent
- A brand reveal frame for the end of a video: the logo snaps together from pieces, a glow blooms, the brand name rises, and a CTA settles in. Built as a single freeze frame (no loop), it is the last thing a viewer sees.

Canvas
- 1920x1080 (16:9). Black `#08090c` or a deep brand color background, with a subtle vignette `radial-gradient(...)` so the center reads brighter.

Layout
- Center logo: drawn in pure CSS / inline SVG from 4-8 geometric pieces (circles / squares / triangles / hairlines).
  - Entrance: each piece slides in from off-canvas (+/-100px from different directions) with scale 1.4 -> 1.0 and opacity 0 -> 1, staggered ~80ms; total ~1.2s.
  - Once assembled, the whole logo gets a glow bloom (`filter: drop-shadow(0 0 24px <accent>40)`) while a shimmer `mask-image` sweeps across it (~500ms).
- Brand name: 6-8% below the logo, large type (Inter Tight / SF Pro Display, 48-72px, weight 700, letter-spacing -0.02em); enters as a typewriter or fade-up after the logo blooms (~1.4s).
- Tagline: one line under the brand name (24-28px, weight 400, opacity 0.7), fading in around 1.8s.
- Bottom CTA + metadata: a two-line bottom row, e.g. `nevoflux.dev - @nevoflux - 2026`, 11px uppercase, letter-spacing 0.16em, opacity ~0.4, separated by hairlines.

Palette - pick one, do not mix
- Midnight Indigo - bg `#08090c`, accent `#7c5cff` (neon violet-blue glow). [used here]
- Solar Amber - bg `#0e0a08`, accent `#ffb547` (warm amber).
- Forest Mint - bg `#0a1410`, accent `#5fb38a` (mint green).
- Bone & Ink - bg `#f1efea`, accent `#0a0a0b` (no neon, editorial; glow becomes shadow).

Design details
- Never use an external logo image; the logo must be pure CSS / inline SVG geometry.
- Drive entrances with `@keyframes` + `animation-delay`; allow `prefers-reduced-motion` to disable them.
- Fonts: Latin `Inter Tight` / `SF Pro Display` / `Manrope`; CJK `Noto Sans SC` weight 700.
- Always use the supplied brand name + tagline; fall back to "NevoFlux" / "The browser that remembers what you meant" if none is given.
- Single-file HTML; the whole animation freezes when done (no loop) since this is a video end-card.
- An optional 5px ribbon (accent color) at the top reinforces brand recognition.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Logo Outro · NevoFlux</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;800;900&family=Inter:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body {
    font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif;
    background: radial-gradient(circle at 50% 45%, #1a1535 0%, #08090c 70%);
    color:#f5f5f7;
    margin:0;
    min-height:100vh;
    overflow:hidden;
  }
  .accent { color:#7c5cff; }
  .ribbon { background:#7c5cff; }
  @keyframes pieceIn { 0% { opacity:0; transform: scale(1.4) translate(var(--dx, 0), var(--dy, 0)) } 100% { opacity:1; transform: scale(1) translate(0,0) } }
  @keyframes glow { from { filter: drop-shadow(0 0 0 transparent) } to { filter: drop-shadow(0 0 32px rgba(124,92,255,0.6)) } }
  .piece { animation: pieceIn 1s cubic-bezier(.34,1.56,.64,1) both; }
  .piece:nth-child(1){--dx:-80px;--dy:-40px;animation-delay:0s}
  .piece:nth-child(2){--dx:60px;--dy:-50px;animation-delay:.08s}
  .piece:nth-child(3){--dx:-40px;--dy:50px;animation-delay:.16s}
  .piece:nth-child(4){--dx:70px;--dy:40px;animation-delay:.24s}
  .piece:nth-child(5){--dx:0;--dy:-70px;animation-delay:.32s}
  .logo-wrap { animation: glow .8s ease-out 1.1s both; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: translateY(0) } }
  .brand { animation: fadeUp .8s ease-out 1.4s both; }
  .tagline { animation: fadeUp .8s ease-out 1.7s both; }
  .meta { animation: fadeUp .6s ease-out 2.1s both; }
  /* shimmer */
  @keyframes shimmer { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
  .shimmer {
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%);
    background-size: 200% 100%;
    -webkit-background-clip:text; background-clip:text; color:transparent;
    animation: shimmer 1.8s ease-out 1.9s 1 both;
  }
</style>
</head>
<body class="flex flex-col items-center justify-center relative">
  <div class="ribbon absolute top-0 left-0 right-0" style="height:4px"></div>

  <!-- logo -->
  <div class="logo-wrap relative" style="width:140px;height:140px">
    <svg viewBox="0 0 140 140" class="absolute inset-0">
      <!-- 5 geometric pieces forming an "N" -->
      <rect class="piece" x="20" y="20" width="20" height="100" fill="#7c5cff"/>
      <rect class="piece" x="100" y="20" width="20" height="100" fill="#7c5cff"/>
      <rect class="piece" x="32" y="20" width="20" height="80" fill="#f5f5f7" transform="rotate(-32 42 60)"/>
      <circle class="piece" cx="30" cy="20" r="10" fill="#7c5cff"/>
      <circle class="piece" cx="110" cy="120" r="10" fill="#f5f5f7"/>
    </svg>
  </div>

  <!-- brand -->
  <h1 class="brand mt-10 font-black tracking-[-0.02em] leading-[0.95]" style="font-size:84px">
    <span class="shimmer">NevoFlux</span>
  </h1>

  <!-- tagline -->
  <p class="tagline mt-4 text-[24px] opacity-70 font-medium">
    The browser that <em class="not-italic accent">remembers what you meant</em>
  </p>

  <!-- CTA / meta -->
  <div class="meta mt-12 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] opacity-50">
    <span>nevoflux.dev</span>
    <span class="opacity-40">·</span>
    <span>@nevoflux</span>
    <span class="opacity-40">·</span>
    <span>2026</span>
  </div>

  <!-- corner timecode -->
  <div class="absolute bottom-8 right-12 text-[10px] font-mono opacity-30 uppercase tracking-[0.18em]">END · 00:03:21</div>
  <div class="absolute bottom-8 left-12 text-[10px] font-mono opacity-30 uppercase tracking-[0.18em]">FRAME · LOGO-OUTRO</div>
</body>
</html>
```

## Usage

- ribbon: the 4px accent bar across the top; recolor it to match the chosen palette.
- logo (`.logo-wrap` SVG): swap the 5 `.piece` shapes to spell your mark; they animate in order via `:nth-child` delays. Keep it pure SVG, never an external image.
- brand (`.shimmer`): the product name, here "NevoFlux". The shimmer sweep runs once after the logo bloom.
- tagline: one line under the brand; wrap the phrase to emphasize in `<em class="not-italic accent">` to pick up the accent color.
- meta: the bottom CTA row - domain, handle, year. Edit the three spans.
- corner timecode: the two `font-mono` corners ("END · 00:03:21" and "FRAME · LOGO-OUTRO") set the video-frame mood; adjust or remove.
- The whole sequence freezes once finished (no loop) because this is an end-card; entrances respect `prefers-reduced-motion` if you add the media query.
