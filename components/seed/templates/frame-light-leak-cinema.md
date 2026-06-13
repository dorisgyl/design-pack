---
slug: packs/design-pack/templates/frame-light-leak-cinema
type: template
lang: en
category: video
title: "NevoFlux Light-Leak Cinematic Frame"
title_zh: "胶片漏光电影帧"
description: "A single cinematic title frame with film light-leak, 35mm grain, and a letterbox crop for NevoFlux opening shots and chapter cards."
tags: [cinema, film, light-leak, grain, letterbox, frame, template]
sample_image: packs/design-pack/assets/templates/frame-light-leak-cinema.svg
source: html-anything/frame-light-leak-cinema
---

## Design guidance

A warm-orange light-leak cinematic frame: film light-leak + 35mm grain + large serif type, classic celluloid texture. Use it as the opening single frame for a documentary, a short film, or a video chapter card. Inspired by hyperframes light-leak.

### Canvas
- **2.39:1 letterbox** (recommended): 1920x800, with 140px black bars (`#000`) top and bottom.
- Or 16:9: 1920x1080, no letterbox.

### Background
- Base layer: a deep warm tone (deep red-brown `#1a0d08` / dark green `#0a1410` / blue-violet `#0d0e1a`), or a depicted scene (CSS gradients faking sky / interior / exterior).
- **Light leak**: 2-3 large `radial-gradient(ellipse at top right, #ffb547 0%, transparent 50%)` plus 1 bottom `linear-gradient(to top, #d97757 0%, transparent 30%)`; pick warm orange / peach / rose / dim yellow - **never cold blue**.
- **35mm grain**: a full-screen SVG turbulence noise layer at 14% opacity with `mix-blend-mode: overlay`; can also be set via `background-image: url("data:image/svg+xml,...feTurbulence...")`.
- Optional: one `feDisplacementMap` pass to fake film wobble (use sparingly).

### Type
- Centered or lower-left: large serif (Source Serif Pro / Playfair Display / EB Garamond) at 5-8vw, weight 500 italic; color warm white `#f5e9d6` or cream.
- Subtitle (24-28px) on one line, opacity 0.7, same serif.
- Corner caption (uppercase, letterspacing 0.18em, 10-11px, mono, opacity 0.5): e.g. "REEL 03 . CH I . 1985".
- Bottom timecode + filming location + date (mono, opacity 0.4).

### Optional extras
- "Film scratches": a few 1-2px vertical white lines at opacity 0.2 with irregular spacing (multiple inset `box-shadow`s or several `<div>`s).
- "Film perforations": inside the letterbox bars, evenly spaced small white squares (CSS `repeating-linear-gradient`).
- Entrance motion: the whole frame goes from underexposed (brightness 0.3) to normal within 800ms; the light-leak position drifts slowly on a 12s cycle.

### Design details
- Never exceed 4 hues (deep background + 2 warm leak colors + cream text).
- Forbidden: blue-violet light leaks (they break the celluloid feel), emoji, neon colors, geometric dashboard ornaments.
- Chinese: `Noto Serif SC` italic does not exist, so use `Noto Serif SC` regular with wider letterspacing.
- Always use the user-supplied title; auto-estimate plausible "year / chapter / location" metadata (but keep the source as user content).
- Single-file HTML; disable motion with `prefers-reduced-motion`.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Light Leak Cinema · REEL 03</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Source+Serif+Pro:ital,wght@0,400;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Source Serif Pro','Noto Serif SC',Georgia,serif; background:#000; margin:0; min-height:100vh; }
  .frame {
    position:relative; width:100%; max-width:1600px; aspect-ratio: 2.39 / 1; margin:0 auto;
    background:#1a0d08;
    overflow:hidden;
  }
  .scene {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse at 78% 18%, #ffb547 0%, transparent 38%),
      radial-gradient(ellipse at 90% 30%, #ff7e3f 0%, transparent 30%),
      linear-gradient(180deg, transparent 60%, #d97757 110%),
      radial-gradient(ellipse at 30% 60%, #2a1410 0%, transparent 60%),
      linear-gradient(135deg, #1a0d08 0%, #28140c 50%, #0a0502 100%);
  }
  .grain { position:absolute; inset:0; opacity:0.14; mix-blend-mode:overlay; pointer-events:none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"); }
  /* scratches */
  .scratch { position:absolute; top:0; bottom:0; width:1px; background:#f5e9d6; opacity:0.18; }
  .vignette { position:absolute; inset:0; background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.6) 100%); }
  .perfs {
    position:absolute; left:0; right:0; height:6px;
    background-image: repeating-linear-gradient(90deg, #f5e9d6 0 8px, transparent 8px 24px);
    opacity:0.5;
  }
  .cream { color:#f5e9d6; }
  .mono { font-family:'IBM Plex Mono',monospace; }
  .display { font-family:'EB Garamond','Noto Serif SC',serif; }
  .chip { font-size:10.5px; letter-spacing:0.22em; text-transform:uppercase; }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-6" style="background:#000">
  <div class="frame">
    <div class="scene"></div>

    <!-- scratches -->
    <div class="scratch" style="left:14%;height:38%"></div>
    <div class="scratch" style="left:42%;height:60%;top:20%;opacity:0.12"></div>
    <div class="scratch" style="left:71%;height:30%;top:55%"></div>

    <!-- letterbox bars - actually built into aspect ratio container; perfs on top -->

    <!-- top caption -->
    <header class="absolute top-6 left-10 right-10 flex items-baseline justify-between chip mono cream opacity-70 z-10">
      <span>REEL 03 · CH I · MMXXVI</span>
      <span>The Year We Shipped GBrain</span>
      <span>00:03:21</span>
    </header>

    <!-- main text -->
    <main class="absolute z-10 cream" style="left:8%; bottom:18%; max-width:60%">
      <div class="chip mono opacity-70">Reel III · Title</div>
      <h1 class="display mt-3 leading-[1.05] italic font-medium" style="font-size:clamp(40px,5.5vw,84px); color:#f5e9d6">
        The Year We<br/>
        <span style="font-style:italic">Shipped</span> NevoFlux.
      </h1>
      <p class="display mt-4 italic opacity-80 text-[22px]">
        A short film about a browser that remembers, in fourteen reels.
      </p>
    </main>

    <!-- bottom right meta -->
    <footer class="absolute bottom-6 left-10 right-10 flex items-baseline justify-between chip mono cream opacity-50 z-10">
      <span>NEVOFLUX · GBRAIN BUILD 0.9</span>
      <span>CAPTURED IN CANVAS · PROXY 1080P</span>
      <span>FRAME · LIGHT-LEAK-CINEMA</span>
    </footer>

    <div class="grain"></div>
    <div class="vignette"></div>
  </div>
</body>
</html>
```

## Usage

- **Top caption (header)**: three mono slots - left is reel/chapter/year metadata, center is the working title or episode name (here "The Year We Shipped GBrain"), right is a timecode.
- **Title block (main)**: the kicker chip ("Reel III . Title"), the big serif italic headline (your NevoFlux title; keep the `<span style="font-style:italic">` accent on one word), and a one-line italic subtitle.
- **Footer**: three mono slots - left is build/version or location, center is a capture-medium note, right is the frame/template id. Keep it lowercase-data, opacity 0.5.
- **Decoration**: `.scratch`, `.grain`, and `.vignette` are pure decoration - leave them in place; only swap visible text.
- Keep within 4 hues; do not add cold-blue leaks or emoji. Swap copy only; CSS and structure stay unchanged.
