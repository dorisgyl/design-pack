---
slug: packs/design-pack/templates/frame-glitch-title
type: template
lang: en
category: video
title: "NevoFlux Glitch Title Frame"
title_zh: "故障艺术标题帧"
description: "A single-frame cyberpunk hero / video transition with digital-glitch chromatic-aberration title, tuned for NevoFlux launch frames."
tags: [glitch, cyberpunk, title, transition, vfx, frame, template]
sample_image: packs/design-pack/assets/templates/frame-glitch-title.svg
source: html-anything/frame-glitch-title
---

## Design guidance

Layout
- Canvas is 1920x1080 (16:9). Background is near-black `#070708` or a dark CRT grey `#0d0e10`. Overlay a 56px grid (about 5% opacity) plus horizontal scanlines (about 8% opacity, 2px spacing).
- The main title is centered, 6-9vw, weight 800/900, in `Space Grotesk Bold` / `Inter Tight Black` / `JetBrains Mono Bold`.

Main title
- Front layer is `#f5f5f7`. Behind it stack two ghost layers:
  - cyan `#00f0ff` translated (`-3px`, `1px`).
  - magenta `#ff2bd6` translated (`3px`, `-1px`).
- Slice the whole layer with `clip-path` into 5-8 bands; each band runs a `@keyframes` that randomly translates X from -10px to 10px over 80-160ms, staggered, to fake "data corruption" chromatic aberration.
- Every ~1.5s trigger a "hard glitch" - the entire title smears horizontally for one frame, via `filter: url(#displacementFilter)` or a simple CSS shift.

Supporting layers
- A caption line across the top (uppercase mono, 11px, opacity 0.6), e.g. `>> SIGNAL_LOCKED · CH-04 · 14:32:08`.
- One subtitle line under the title (24-28px, mono, opacity 0.7), occasionally swapped with `̶▒̶`-style characters (fake glitch text).
- Scatter `█▓▒░` ASCII noise chunks into the corners.
- A timecode at the bottom (mono, opacity 0.4).
- Lay a noise-grain layer over the whole frame (`background-image: url("data:image/svg+xml,...turbulence...")`), opacity 6%, `mix-blend-mode: overlay`.

SVG filter (optional)
- Define `<filter id="rgbShift">` using `feColorMatrix` + `feOffset` + `feMerge` to offset the R/G/B channels; apply `filter: url(#rgbShift)` on the layer during glitch moments.

Design details
- Use only: black / white / cyan / magenta / a touch of amber as a warning color. No full rainbow.
- Fonts: Latin `Space Grotesk` or `JetBrains Mono` Bold; CJK `Noto Sans Mono CJK SC` or `Noto Sans SC` Bold.
- No lorem ipsum - always use a real title plus subtitle.
- Drive motion with `@keyframes`, disabled under `prefers-reduced-motion` (fall back to a static chromatic split).
- Single-file HTML.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Glitch Title · GBRAIN_ONLINE</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Space Grotesk',sans-serif; background:#0d0e10; color:#f5f5f7; margin:0; min-height:100vh; overflow:hidden; position:relative; }
  .mono { font-family:'JetBrains Mono',monospace; }
  /* scanlines */
  body::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:3;
    background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px);
    mix-blend-mode: multiply; opacity:0.6;
  }
  /* grid */
  body::after {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:2;
    background-image: linear-gradient(rgba(0,255,180,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(0,255,180,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  /* grain */
  .grain { position:absolute; inset:0; opacity:0.1; mix-blend-mode:overlay; z-index:4; pointer-events:none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E"); }
  @keyframes glitch {
    0%, 92%, 100% { transform: translate(0,0); filter: none }
    93% { transform: translate(-6px, 1px); filter: url(#rgb) }
    94% { transform: translate(8px, -2px); filter: url(#rgb) }
    95% { transform: translate(-4px, 2px); }
    96% { transform: translate(4px, -1px); filter: url(#rgb) }
    97% { transform: translate(0,0) }
  }
  .glitch-host { position:relative; animation: glitch 4s infinite; }
  .layer { position:absolute; inset:0; mix-blend-mode:screen; }
  .layer-c { color:#00f0ff; transform: translate(-3px, 1px); }
  .layer-m { color:#ff2bd6; transform: translate(3px, -1px); }
  .vignette { position:absolute; inset:0; background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.7) 100%); z-index:5; pointer-events:none; }
  .ascii { font-family:'JetBrains Mono',monospace; letter-spacing:2px; line-height:1; }
  @media (prefers-reduced-motion: reduce) { .glitch-host { animation: none } }
</style>
</head>
<body class="flex flex-col items-center justify-center relative">

  <svg width="0" height="0" style="position:absolute">
    <defs>
      <filter id="rgb">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
        <feOffset in="SourceGraphic" dx="3" dy="0" result="r"/>
        <feOffset in="SourceGraphic" dx="-3" dy="0" result="b"/>
        <feMerge><feMergeNode in="r"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  </svg>

  <header class="absolute top-10 left-12 right-12 flex items-baseline justify-between mono text-[11px] opacity-70 z-10 tracking-[0.16em]">
    <span>&gt;&gt; GBRAIN_SYNC · CH-04 · 14:32:08</span>
    <span>NEVOFLUX · GLITCH-TITLE</span>
    <span>REC ●</span>
  </header>

  <!-- ASCII chunks corners -->
  <pre class="ascii absolute top-24 left-12 text-[12px] opacity-30 z-10">█▓▒░ █▓▒░
▒▓█▓ ░▒▓
░▒▓█ ▓▒░░
▓▒░░ ▒▓█▓</pre>
  <pre class="ascii absolute bottom-24 right-12 text-[12px] opacity-30 z-10 text-right">█▓▒░ ▓▒░█
▒░░▓ ░▒▓█
▓▒░░ █▓▒░
░▒▓█ ▒░░▓</pre>

  <main class="relative z-10 text-center px-12">
    <div class="mono text-[14px] opacity-60 tracking-[0.22em] mb-6 uppercase">— Memory Stream Online —</div>
    <div class="glitch-host relative inline-block">
      <h1 class="font-black tracking-[-0.02em] leading-[0.9]" style="font-size:clamp(80px,12vw,200px)">
        GBRAIN<br/>_ONLINE
      </h1>
      <h1 class="layer layer-c font-black tracking-[-0.02em] leading-[0.9]" style="font-size:clamp(80px,12vw,200px)">
        GBRAIN<br/>_ONLINE
      </h1>
      <h1 class="layer layer-m font-black tracking-[-0.02em] leading-[0.9]" style="font-size:clamp(80px,12vw,200px)">
        GBRAIN<br/>_ONLINE
      </h1>
    </div>
    <p class="mt-10 mono text-[16px] opacity-70 tracking-[0.16em]">
      04 · KNOWLEDGE_BASE · <span style="color:#ffb547">i̶̶n̷d̶e̶x̶i̶n̶g̷ ̷y̷o̶u̶r̶ ̶b̷r̶o̶w̷s̶e̶r̶</span>
    </p>
  </main>

  <div class="grain"></div>
  <div class="vignette"></div>

  <footer class="absolute bottom-10 left-12 right-12 flex items-baseline justify-between mono text-[11px] opacity-50 z-10 tracking-[0.16em]">
    <span>NEVOFLUX / VFX</span>
    <span style="color:#ff2bd6">CHROMATIC · CYAN × MAGENTA</span>
    <span class="mono">⏵ 00:14:32:08</span>
  </footer>
</body>
</html>
```

## Usage

- `header` (top): left status line (`GBRAIN_SYNC · CH-xx · timecode`), center frame label, and a `REC ●` indicator. Swap to your own channel and timestamp.
- Main title: edit the three `<h1>` elements together - the front layer plus the cyan and magenta ghost layers must hold identical text or the chromatic split breaks. Here it reads `GBRAIN_ONLINE`; replace with your own short, ideally two-line, all-caps title (e.g. a NevoFlux pack or Canvas app name).
- Eyebrow line above the title (`— Memory Stream Online —`): a short uppercase tagline.
- Subtitle line under the title: keep one segment intact and one wrapped in amber `#ffb547` glitch characters for the "data corruption" effect.
- ASCII `<pre>` chunks and `footer` timecode are decorative; keep them for texture or restyle to taste.
- `.grain`, `.vignette`, the grid/scanline `body::before`/`body::after`, and the `#rgb` SVG filter are pure CSS/SVG - no external assets. Motion is disabled under `prefers-reduced-motion`.
