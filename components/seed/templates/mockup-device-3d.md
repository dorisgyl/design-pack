---
slug: packs/design-pack/templates/mockup-device-3d
type: template
lang: en
category: poster
title: "NevoFlux Device 3D Showcase"
title_zh: "iPhone × MacBook 立体展架"
description: "A faux-GLTF iPhone + MacBook product showcase that renders real NevoFlux UI inside the screens, with CSS glass lens flares and a 360° turntable composition."
tags: [device, mockup, iphone, macbook, html-in-canvas, product, template]
sample_image: packs/design-pack/assets/templates/mockup-device-3d.svg
source: html-anything/mockup-device-3d
---

## Design guidance

- Intent: product launches, app demos and design-mock reveals. Render the real NevoFlux UI inside an iPhone / MacBook "screen", then surround it with CSS 3D transforms that fake a GLTF model's glass, highlights and refraction.
- Hard composition:
  - Canvas: 1920×1080. Warm-grey radial-gradient background (`#1a1a22 → #08080c`) with a darkened reflection ground at the bottom.
  - iPhone 15 Pro model: left / center, `rotateY(-14deg) rotateX(4deg) translateZ(40px)`; titanium-silver bezel (solid metallic gradient frame) with a 46px screen radius. The screen embeds an iframe-like div that renders real NevoFlux HTML at mobile viewport scale (375×812).
  - MacBook Pro 14" (optional second device): right side, slightly smaller, `rotateY(10deg)`; the lid embeds desktop-viewport content (scaled 1440×900); the base is drawn with CSS shadow lines (no key-cap detail).
  - Glass / lens flares: add 2-3 `radial-gradient(ellipse, rgba(255,255,255,…))` highlights up top to mimic a morphing glass lens.
  - Ground reflection: a soft radial shadow under the devices reads as a mirror floor.
- Screen content source:
  - Plain text / data in → auto-render a mock app UI (status bar + title + body + tab bar or home indicator).
  - HTML in → embed it verbatim inside the screen div (scale the transform so it fits the screen's width/height).
  - In-screen UI uses Tailwind; keep type at real mobile sizes (text-sm / text-base, never text-9xl).
- Optional extras:
  - Bottom-right product slug: large logo + one tagline line + a hairline subtitle.
  - Top caption row (small, low-opacity sans): product codename / date / version.
  - Optional 8s CSS turntable: `@keyframes turntable` rotateY -12 ↔ 12, ease-in-out infinite alternate; honor `prefers-reduced-motion`.
- Design details:
  - Never use an external mockup image URL (no unsplash / dribbble links) — draw every device entirely in CSS / SVG.
  - Fonts: captions / logo outside the device use an `Inter Tight` / `SF Pro` feel; in-screen type adapts to the content.
  - Background can use any of 4 palettes: charcoal / pearl / midnight blue / mocha — no rainbow gradients.
  - Single-file HTML; don't nest an iframe via srcdoc (it's flaky). Use a `<div class="screen">` rendered with Tailwind.
  - Fill the screens with real product data — no lorem ipsum, no "Your text here".

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Device 3D Showcase · HTML-in-Canvas</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body {
    font-family:'Inter','Noto Sans SC',system-ui,sans-serif;
    background: radial-gradient(ellipse at 50% 40%, #1a1a22 0%, #08080c 70%);
    color:#f5f5f7;
    min-height:100vh;
    margin:0;
  }
  .stage { perspective: 1800px; }
  .iphone {
    width:280px; height:580px;
    border-radius:46px;
    background:linear-gradient(140deg,#3a3a40 0%,#a8a8ad 35%,#1f1f24 60%,#5a5a60 100%);
    padding:7px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 60px 80px -20px rgba(0,0,0,0.7);
    transform: rotateY(-14deg) rotateX(4deg) translateZ(40px);
    transform-style: preserve-3d;
  }
  .iphone-screen {
    width:100%; height:100%; border-radius:40px;
    background:#0a0a0e;
    overflow:hidden; position:relative;
    color:#f5f5f7;
  }
  .notch { position:absolute; top:6px; left:50%; transform:translateX(-50%); width:108px; height:28px; background:#000; border-radius:18px; z-index:5; }
  .lens {
    position:absolute; pointer-events:none;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 60%);
    mix-blend-mode: screen;
  }
  .mbp {
    width:520px;
    transform: rotateY(10deg) rotateX(-2deg) translateZ(-20px);
    transform-style: preserve-3d;
  }
  .mbp-screen {
    width:100%; height:320px;
    border-radius:14px 14px 4px 4px;
    background:linear-gradient(135deg,#222229 0%,#0a0a0e 100%);
    border: 12px solid #1a1a1f;
    border-bottom: 16px solid #1a1a1f;
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.7);
    overflow:hidden;
    position:relative;
    color:#f5f5f7;
  }
  .mbp-base {
    width:560px;
    height:14px;
    margin:-2px auto 0;
    background:linear-gradient(180deg,#3a3a40 0%,#1a1a1f 80%);
    border-radius:0 0 14px 14px;
    box-shadow: 0 30px 40px -20px rgba(0,0,0,0.8);
  }
  .mbp-notch {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:90px; height:8px; background:#000; border-radius:0 0 8px 8px; z-index:5;
  }
  .ground {
    position:absolute; bottom:0; left:50%; transform:translateX(-50%);
    width:1100px; height:140px;
    background: radial-gradient(ellipse at center top, rgba(0,0,0,0.6) 0%, transparent 70%);
  }
  .chip { font-size:10px; letter-spacing:0.16em; text-transform:uppercase; }
</style>
</head>
<body class="flex flex-col items-center justify-center p-14 min-h-screen relative overflow-hidden">

  <!-- caption -->
  <header class="absolute top-10 left-12 right-12 flex items-baseline justify-between chip opacity-60">
    <span>NEVOFLUX — CODENAME GBRAIN — v0.4</span>
    <span>2026 SPRING</span>
    <span>HTML-IN-CANVAS</span>
  </header>

  <!-- devices -->
  <div class="stage relative flex items-end gap-20" style="z-index:2">

    <!-- iPhone -->
    <div class="iphone relative">
      <div class="iphone-screen">
        <div class="notch"></div>
        <!-- status bar -->
        <div class="flex items-center justify-between px-7 pt-3 text-[10px] font-semibold relative" style="z-index:6">
          <span>9:41</span>
          <span class="flex items-center gap-1">▮▮▮▮ 5G</span>
        </div>
        <!-- header -->
        <div class="px-6 pt-10">
          <div class="chip opacity-60">New Canvas app</div>
          <h2 class="text-[22px] font-bold mt-1 leading-tight">Magazine-style<br/>web deck</h2>
        </div>
        <!-- template tile -->
        <div class="mx-6 mt-5 rounded-xl p-3 flex items-center gap-2.5" style="background:linear-gradient(135deg,#1a1a22,#222229);border:1px solid rgba(255,255,255,0.06)">
          <span class="text-xl">📰</span>
          <div class="flex-1">
            <div class="text-[12px] font-semibold">Magazine web deck</div>
            <div class="text-[10px] opacity-60">16:9 paged · 9 frames</div>
          </div>
          <span class="text-[10px] opacity-50">✓</span>
        </div>
        <!-- input -->
        <div class="mx-6 mt-3 rounded-xl p-3" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);min-height:140px">
          <div class="text-[12px] opacity-90">// NevoFlux 2026 Q1 roadmap</div>
          <div class="text-[11px] opacity-60 mt-1">- Ship 200 new design-pack templates</div>
          <div class="text-[11px] opacity-60">- Wire in 28 local GBrain agents</div>
          <div class="text-[11px] opacity-60">- Weekly active 12K → 80K</div>
        </div>
        <!-- CTA -->
        <div class="mx-6 mt-3 rounded-full py-3 text-center text-[13px] font-semibold" style="background:linear-gradient(135deg,#ff7849,#d97757);color:#08080c">⌘ + Enter to build</div>
        <!-- tab bar -->
        <div class="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 backdrop-blur" style="background:rgba(10,10,14,0.85);border-top:1px solid rgba(255,255,255,0.06)">
          <span class="text-[10px] flex flex-col items-center gap-0.5" style="color:#ff7849">■<span>Tasks</span></span>
          <span class="text-[10px] flex flex-col items-center gap-0.5 opacity-60">▤<span>Packs</span></span>
          <span class="text-[10px] flex flex-col items-center gap-0.5 opacity-60">◌<span>Settings</span></span>
        </div>
      </div>
      <!-- lens flares -->
      <div class="lens" style="top:-30px;left:-20px;width:160px;height:200px;transform:rotate(-20deg)"></div>
      <div class="lens" style="bottom:50px;right:-30px;width:120px;height:160px"></div>
    </div>

    <!-- MacBook -->
    <div class="mbp relative">
      <div class="mbp-screen">
        <div class="mbp-notch"></div>
        <!-- top bar -->
        <div class="flex items-center gap-1.5 px-3 py-1.5" style="background:#161620;border-bottom:1px solid rgba(255,255,255,0.06)">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="ml-3 chip opacity-50">localhost:3456 — NevoFlux</span>
        </div>
        <!-- 3-pane layout mini -->
        <div class="grid grid-cols-[1fr_1.4fr_1.4fr] gap-2 p-2 h-[260px]">
          <!-- sidebar -->
          <div class="rounded-md p-2 text-[10px] opacity-80" style="background:#1a1a25;border:1px solid rgba(255,255,255,0.04)">
            <div class="opacity-50 mb-1.5">Tasks / 11</div>
            <div class="space-y-1">
              <div class="rounded px-1.5 py-1 truncate" style="background:rgba(255,120,73,0.18);color:#ff7849">● Magazine web deck</div>
              <div class="rounded px-1.5 py-1 truncate opacity-60">Xiaohongshu card</div>
              <div class="rounded px-1.5 py-1 truncate opacity-60">Device 3D showcase</div>
              <div class="rounded px-1.5 py-1 truncate opacity-60">Keynote deck · product intro</div>
            </div>
          </div>
          <!-- editor -->
          <div class="rounded-md p-2 text-[10px] opacity-90" style="background:#10101a;border:1px solid rgba(255,255,255,0.04);font-family:'JetBrains Mono',monospace">
            <div class="opacity-50">// GBrain input</div>
            <div class="mt-1"># NevoFlux Design Pack — 2026</div>
            <div class="opacity-70">## Q1-Q4 key metrics</div>
            <div class="opacity-70">- Templates: 75 → 200</div>
            <div class="opacity-70">- WAU: 12K → 80K</div>
            <div class="opacity-70">- Agents: 17 → 28</div>
            <div class="opacity-70">- Stars: 4.2K → 25K</div>
            <div class="mt-2 opacity-50">▍</div>
          </div>
          <!-- preview -->
          <div class="rounded-md overflow-hidden relative" style="background:#002FA7">
            <div class="absolute inset-0 p-3 text-white">
              <div class="chip opacity-80">№01 / 22</div>
              <div class="mt-2 font-black text-[16px] leading-tight">Ship a living<br/>knowledge base<br/>from one source.</div>
              <div class="absolute bottom-2 left-3 right-3 flex justify-between chip opacity-70">
                <span>NEVOFLUX</span><span>DESIGN PACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mbp-base"></div>
      <!-- lens flares -->
      <div class="lens" style="top:-40px;right:60px;width:200px;height:140px;transform:rotate(10deg)"></div>
    </div>

  </div>

  <!-- ground reflection -->
  <div class="ground"></div>

  <!-- bottom slug -->
  <footer class="absolute bottom-10 left-12 right-12 flex items-baseline justify-between chip opacity-50">
    <span>NEVOFLUX.APP</span>
    <span>GLTF · LIVE-HTML SCREENS · TURNTABLE</span>
    <span>STAGE — 1920 × 1080</span>
  </footer>
</body>
</html>
```

## Usage

- `header` caption: three small mono spans — product codename / version on the left, season in the middle, the "HTML-IN-CANVAS" mode label on the right. Edit each span.
- iPhone `.iphone-screen`: the mobile mock app. Slots to fill are the status bar, the `chip` kicker + `h2` title, the template tile (icon + name + meta + check), the input card (a comment line plus 3 bullet lines of real roadmap data), the orange CTA pill, and the 3-item tab bar.
- MacBook `.mbp-screen`: a desktop 3-pane mini view. Fill the top-bar URL chip, the sidebar task list (one active orange item + greyed siblings), the mono editor block (GBrain markdown input with 4 metric lines), and the blue preview slide (kicker, headline, footer labels).
- `.lens` flares and `.ground` reflection are pure CSS — leave them untouched; they sell the 3D glass look.
- `footer` slug: domain on the left, a feature hairline in the middle, the stage size on the right.
- Self-contained: every device is drawn in CSS (metallic frame gradients, notch, lens flares, mirror floor). No external mockup images or asset URLs — only the Tailwind runtime and font stylesheet, exactly as the source template ships.
