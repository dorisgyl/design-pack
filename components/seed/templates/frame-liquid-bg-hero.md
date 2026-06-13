---
slug: packs/design-pack/templates/frame-liquid-bg-hero
type: template
lang: en
category: poster
title: "Liquid Background Hero"
title_zh: "流体背景 Hero 帧"
description: "A WebGL-style liquid displacement background with an overlaid one-liner, for video intros, landing heroes, and posters."
tags: [liquid, fluid, background, hero, html-in-canvas, vfx, template]
sample_image: packs/design-pack/assets/templates/frame-liquid-bg-hero.svg
source: html-anything/frame-liquid-bg-hero
---

## Design guidance

A liquid, WebGL-feeling background overlaid with a single giant quote. Works as a video opening frame, the top hero of a SaaS landing page, or a poster base. The "fluid" look is achieved with CSS / canvas fallbacks so the whole thing stays a single file you can open by double-clicking. Inspired by hyperframes' vfx-liquid-background.

### Canvas
- Either 1920x1080 (landscape) or 1080x1920 (portrait) - pick one. The background fills the frame.

### Liquid background - three implementations, choose by preference
1. CSS multi-layer radial-gradient offset breathing (most robust, the default):
   - 3-5 large ellipses via `radial-gradient(...)`, colors taken from the palette.
   - Wrap each ellipse in a `@keyframes` that translates + scales + hue-rotates, with an 8-14s period, staggered out of phase; blend the whole frame with `mix-blend-mode: screen` or `overlay`.
   - Add one top layer of `backdrop-filter: blur(80px)` to soften the edges.
2. Canvas + simple perlin noise (intermediate):
   - About 80 lines of inline JS drawing metaballs or a simplex noise field with `requestAnimationFrame`.
   - Enable it where performance allows; fall back to a static frame under `prefers-reduced-motion`.
3. WebGL fragment shader (advanced, use with care):
   - Pull `regl` from a CDN or write plain inline WebGL.
   - The shader runs domain-warp noise on a single quad with one `u_time` uniform.

### Top text layer
- Centered or bottom-left: one giant one-liner (5-7vw, serif or bold sans), using `Source Serif Pro` / `Inter Tight` / `Manrope Black`.
- Use paper white `#fafaf8` or ink for the text depending on background brightness; add `mix-blend-mode: difference` so it stays legible over any fluid color.
- One sub-line in small sans at opacity 0.7.
- An optional CTA chip or a hairline + metadata row at the bottom.

### Palettes - pick ONE, no rainbows
- Solar Peach - `#ffb18a` + `#f78b4c` + `#d97757`, warm orange-peach.
- Ocean Aqua - `#5ac8fa` + `#0a84ff` + `#1e3a8a`, sea blue.
- Aurora Violet - `#a78bfa` + `#7c5cff` + `#1e1b4b`, aurora purple.
- Forest Mint - `#86efac` + `#34d399` + `#065f46`, mossy forest.

### Design details
- Forbidden: multi-color rainbows (more than 4 hues), PowerPoint-style gradients, neon fluorescent overlays.
- Fonts: for CJK use `Noto Serif SC` (display) / `Noto Sans SC` (sub-line).
- No external image links; everything is CSS + SVG + optional canvas.
- Always use the user's quote / title; if the input is data, distill it into a one-liner of <= 18 characters (CJK) or a short equivalent line.
- Single-file HTML, with motion disabled under `prefers-reduced-motion`.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Liquid Hero · Aurora Violet</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700;800;900&family=Noto+Sans+SC:wght@400;700;900&family=Source+Serif+Pro:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif; background:#1e1b4b; margin:0; min-height:100vh; overflow:hidden; color:#fafaf8; position:relative; }
  .blob { position:absolute; border-radius:50%; mix-blend-mode:screen; filter:blur(70px); will-change: transform; }
  @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(80px,-60px) scale(1.15) } }
  @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1.1) } 50% { transform: translate(-100px,40px) scale(0.9) } }
  @keyframes float3 { 0%,100% { transform: translate(0,0) scale(0.95) } 50% { transform: translate(50px,80px) scale(1.2) } }
  .b1 { width:600px; height:600px; background:#a78bfa; top:-100px; left:-100px; animation: float1 12s ease-in-out infinite; }
  .b2 { width:520px; height:520px; background:#7c5cff; top:30%; right:-100px; animation: float2 10s ease-in-out infinite; }
  .b3 { width:480px; height:480px; background:#ec4899; bottom:-100px; left:30%; animation: float3 14s ease-in-out infinite; }
  .b4 { width:380px; height:380px; background:#06b6d4; top:60%; left:10%; animation: float1 16s ease-in-out infinite; opacity:0.6 }
  .text-diff { mix-blend-mode: difference; color:#fafaf8; }
  .chip { font-family:'Inter Tight',sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; }
  .serif-em { font-family:'Source Serif Pro',serif; font-style:italic; font-weight:600; }
  /* faint grid overlay */
  body::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 64px 64px; z-index:1;
  }
  @media (prefers-reduced-motion: reduce) {
    .blob { animation: none }
  }
</style>
</head>
<body class="flex flex-col items-center justify-center p-16">

  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
  <div class="blob b4"></div>

  <header class="absolute top-12 left-12 right-12 flex items-baseline justify-between chip opacity-70 z-10">
    <span class="text-diff">NEVOFLUX · FRAME · LIQUID HERO</span>
    <span class="text-diff">AURORA VIOLET</span>
    <span class="text-diff">2026 · 1920 × 1080</span>
  </header>

  <main class="relative z-10 text-center max-w-[1100px]">
    <h1 class="text-diff font-black leading-[0.95] tracking-[-0.03em]" style="font-size:clamp(48px,7.5vw,128px)">
      The best browser <span class="serif-em">is</span><br/>
      the one that builds the app for you.
    </h1>
    <p class="mt-8 text-diff opacity-80 text-[24px] font-medium">
      NevoFlux · One prompt to a Canvas app, grounded in GBrain
    </p>
    <div class="mt-10 inline-flex items-center gap-3 text-[13px] font-semibold chip px-5 py-2 rounded-full text-diff" style="border:1px solid rgba(255,255,255,0.4)">
      ⌘ Open a NevoFlux Canvas
    </div>
  </main>

  <footer class="absolute bottom-12 left-12 right-12 flex items-baseline justify-between chip opacity-60 z-10">
    <span class="text-diff">FRAME-LIQUID-BG-HERO</span>
    <span class="text-diff">PREFERS-REDUCED-MOTION SAFE</span>
    <span class="text-diff">NEVOFLUX.AI</span>
  </footer>
</body>
</html>
```

## Usage

A single-file hero frame in the Aurora Violet palette: four blurred, screen-blended blobs breathe behind a giant `mix-blend-mode: difference` headline, with a faint grid overlay on top.

- Background blobs (`.b1`-`.b4`): the liquid layer. Keep four blobs, the blur, the `screen` blend, and the staggered `floatN` animations; only swap the hex colors if you change palette.
- Header chip row: set the breadcrumb (`NEVOFLUX · FRAME · LIQUID HERO`), the palette name, and the date / canvas spec.
- Headline (`<h1>`): the single giant one-liner about NevoFlux - break it by meaning and wrap one emphasized word in `.serif-em` (the serif italic accent).
- Sub-line (`<p>`): one supporting line at opacity 0.8 - the browser, GBrain knowledge base, Canvas apps, the agent / SDK, packs, or design skills.
- CTA chip: one short call to action inside the hairline pill.
- Footer chip row: template id, the `PREFERS-REDUCED-MOTION SAFE` note, and the brand domain.
- Keep all CSS, class names, sizing, blob structure, and the `prefers-reduced-motion` rule unchanged - only the visible text changes.
