---
slug: packs/design-pack/templates/vfx-text-cursor
type: template
lang: en
category: video
title: "NevoFlux VFX Text Cursor Frame"
title_zh: "VFX 文字光标"
description: "An opening / hero video frame that types a NevoFlux quote out character by character with a blinking cursor, chromatic ghost split, and directional light leaks."
tags: [vfx, text, cursor, chromatic, reveal, frame, template]
sample_image: packs/design-pack/assets/templates/vfx-text-cursor.svg
source: html-anything/vfx-text-cursor
---

## Design guidance

Intent
- A video opening / hero frame. A cursor "types" onto the canvas, the text surfaces character by character, dragging a colored chromatic-aberration trail and directional light leaks behind it. Use it to reveal a punchy NevoFlux quote at the start of a clip.

Canvas
- 1920x1080 (16:9). Background is a matte black `#06070a`, or `#0a0d12` (with a warm-blue lean). Add a subtle vignette.

Content
- One quote (Latin or CJK), centered, 6-8vw, weight 700, in `Inter Tight` / `Source Sans 3` / `Noto Sans SC`.
- Reveal it character by character, about 80ms between characters; the current character is followed by a cursor `▍` (or a thin vertical bar).
- Already-revealed text is white `#f5f5f7` at opacity 1; the position about to be revealed gets a chromatic ghost - a single `text-shadow: 2px 0 #ff3b6f, -2px 0 #00d4ff` at the reveal instant, settling back to normal within 200ms.
- The cursor itself: a 16px-wide rectangle, colored with the accent (pick one: hot pink `#ff3b6f` / cyan `#00d4ff` / amber `#ffb547`), blinking on a 1.0s `@keyframes` cycle, with a 60-120px motion-blur trail behind it (radial gradient to transparent).

Light leaks / rays
- Near the typing position, scatter 3-5 directional light leaks: thin elongated rectangles using `linear-gradient(45deg, transparent, accent20, transparent)` with `mix-blend-mode: screen`, set at irregular angles.
- When the line finishes typing, sweep a 0.5s shimmer across the whole block (a light band crossing left to right).

Fields
- Top caption (uppercase, letter-spacing 0.18em, 11px, opacity 0.5): e.g. `FRAME 01 · OPENING`.
- A subtitle under the text (24-28px, opacity 0.6): source / chapter.
- A timecode in the bottom-right (`00:03:21`, mono).

Design details
- Never use a full-rainbow chromatic split - use only a binary aberration (one hot pink `#ff3b6f` plus cyan `#00d4ff`), not full R/G/B.
- Fonts: Latin `Inter Tight` Bold; CJK `Noto Sans SC` Bold; no serifs.
- Drive motion with `@keyframes` plus a JS timer (`setTimeout` per character); it can be disabled under `prefers-reduced-motion` (show all characters at once).
- Use a real quote - do not fabricate filler.
- Single-file HTML; no external assets beyond the linked fonts.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux VFX Text Cursor · Opening</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700;800;900&family=Noto+Sans+SC:wght@400;700;900&family=JetBrains+Mono&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif; background:#06070a; color:#f5f5f7; margin:0; min-height:100vh; overflow:hidden; position:relative; }
  .vignette { position:absolute; inset:0; background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.8) 100%); z-index:1; }
  .grain { position:absolute; inset:0; opacity:0.06; mix-blend-mode:overlay; pointer-events:none; z-index:2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); }
  .mono { font-family:'JetBrains Mono',ui-monospace,monospace; }
  .chip { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; }
  @keyframes blink { 0%, 50% { opacity:1 } 51%, 100% { opacity:0 } }
  .cursor { display:inline-block; width:18px; height:1.05em; background:#ff3b6f; margin-left:6px; vertical-align:text-bottom; animation: blink 1s steps(1) infinite;
    box-shadow: 0 0 24px #ff3b6f, 0 0 8px #ff3b6f, 60px 0 80px rgba(255,59,111,0.6); }
  .chroma {
    text-shadow:
      3px 0 #00d4ff,
      -3px 0 #ff3b6f,
      0 0 40px rgba(255,59,111,0.3);
  }
  .text-line { position:relative; }
  /* directional light leaks */
  .ray { position:absolute; mix-blend-mode:screen; pointer-events:none; z-index:1; }
  .ray-1 { top:30%; left:-10%; width:60%; height:6px; transform:rotate(-12deg); background:linear-gradient(90deg, transparent, rgba(255,59,111,0.6), transparent); filter: blur(8px); }
  .ray-2 { top:55%; right:-10%; width:50%; height:4px; transform:rotate(15deg); background:linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent); filter: blur(6px); }
  .ray-3 { top:70%; left:10%; width:40%; height:3px; transform:rotate(-8deg); background:linear-gradient(90deg, transparent, rgba(255,181,71,0.5), transparent); filter: blur(5px); }
</style>
</head>
<body class="flex flex-col items-center justify-center relative">

  <header class="absolute top-12 left-12 right-12 flex items-baseline justify-between chip opacity-50 z-10 mono">
    <span>FRAME 01 · OPENING</span>
    <span>NEVOFLUX · TEXT CURSOR</span>
    <span>00:03:21</span>
  </header>

  <!-- light rays -->
  <div class="ray ray-1"></div>
  <div class="ray ray-2"></div>
  <div class="ray ray-3"></div>

  <main class="relative z-10 text-center max-w-[1280px] px-12">
    <h1 class="chroma font-black leading-[1.05] tracking-[-0.02em]" style="font-size:clamp(48px,7vw,108px)">
      Your browser stops being a<br/>
      tab graveyard, <span style="color:#ff3b6f">GBrain</span> turns it<br/>
      into a knowledge base<span class="cursor"></span>
    </h1>
    <p class="mt-10 text-[22px] opacity-60 font-medium">
      — NevoFlux, Design Pack 2026
    </p>
  </main>

  <div class="vignette"></div>
  <div class="grain"></div>

  <footer class="absolute bottom-12 left-12 right-12 flex items-baseline justify-between chip opacity-40 z-10 mono">
    <span>NEVOFLUX · VFX-TEXT-CURSOR</span>
    <span>HOT PINK × CYAN CHROMATIC</span>
    <span>REC ●</span>
  </footer>
</body>
</html>
```

## Usage

- `header` (top): left caption (`FRAME 01 · OPENING`), center frame label (`NEVOFLUX · TEXT CURSOR`), and a right-side timecode. Swap these for your own clip.
- Main `<h1>`: the quote to type out. Keep `.chroma` on it for the binary chromatic ghost, and the trailing `<span class="cursor">` for the blinking caret. Wrap one key word (here `GBrain`) in hot pink `#ff3b6f` for emphasis; use real copy, not filler. Adapt the line breaks (`<br/>`) so the reveal lands cleanly.
- Subtitle `<p>` under the title: source / attribution / chapter (here `NevoFlux, Design Pack 2026`).
- The three `.ray` light leaks (hot pink, cyan, amber) are decorative directional rays at irregular angles; keep them for texture or re-place them near your typing position.
- `footer`: left product label, center the chromatic recipe note, right a `REC ●` indicator.
- `.vignette` and `.grain` are pure CSS / inline-SVG noise - no external assets beyond the linked fonts. To make this a live "typing" frame, reveal the `<h1>` text character by character with a `setTimeout` loop and gate it behind `prefers-reduced-motion` (show the full quote at once when motion is reduced).
