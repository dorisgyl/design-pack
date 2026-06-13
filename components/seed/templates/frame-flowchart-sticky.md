---
slug: packs/design-pack/templates/frame-flowchart-sticky
type: template
lang: en
category: video
title: "Sticky Flowchart Frame"
title_zh: "便利贴流程图帧"
description: "A whiteboard-style frame that draws a flow or system as sticky notes joined by hand-drawn SVG curves, for onboarding and operations videos."
tags: [flowchart, diagram, sticky, whiteboard, frame, template]
sample_image: packs/design-pack/assets/templates/frame-flowchart-sticky.svg
source: html-anything/frame-flowchart-sticky
---
## Design guidance

Template: Sticky Flowchart Frame.

Intent: render a process, system, or workflow as a "whiteboard + sticky notes" picture. It suits onboarding videos, operations walk-throughs, and system-architecture explainers. The look is a casual brainstorm board, not a corporate dashboard.

Canvas: 1920x1080. Background is a warm cream board (`#f4ede1`) or a cool grey board (`#f0f2f4`), overlaid with a very faint grid (`rgba(0,0,0,0.04)`) so it reads as a real whiteboard.

Sticky notes (nodes):
- Each node is one ~240x180px sticky note. Distribute four color sets at random: yellow `#fcd34d`, peach `#fca5a5`, mint `#a7f3d0`, sky `#a5b4fc`.
- Give each note a slight, uneven rotation (`transform: rotate(+-2deg)`), a soft drop shadow (`drop-shadow(0 6px 14px rgba(0,0,0,0.12))`), and a strip of "tape" across the top (`linear-gradient(...)`).
- Node content: one emoji or single-line inline SVG icon, a large title (16-20px), and one line of description (12px).
- Node typography is handwritten: `Kalam` / `Caveat` / `Patrick Hand` (for Chinese use `LXGW WenKai Screen` or similar).

Connectors (SVG):
- Join nodes with `<path>` Bezier curves. Stroke `#2a2a2a`, width 2.5, `stroke-linecap: round`. Use a solid line (`stroke-dasharray: 0`) for the main flow and a dashed line (`8 6`) for a conditional branch.
- End each connector with `marker-end`: a small black triangular arrowhead.
- Complex flows can fork (two lines leaving one node) or merge (two lines entering one node).

Optional touches:
- A top caption in a small uppercase sans label, e.g. "FLOW - MIGRATION - 2026".
- On hover, lift a node: raise the shadow and `scale(1.05)` via a CSS transition.
- A decorative "cursor" (inline `<svg>` arrow plus a name tag) floating beside a node, mimicking a Figma collaboration cursor.

Design details:
- Use at least 5 nodes and at most 12.
- Do not center-align every node; keep a hand-placed, casual feel, but make sure connectors stay clear and do not cross.
- Forbidden: full-screen dark backgrounds, neon colors, enterprise dashboard styling.
- Fonts must feel handwritten; do not use Inter or serif faces for the notes.
- Single-file HTML, no external icon library (use inline SVG).
- Fill the notes with the real flow content; node text comes straight from the source material.

## Template (HTML)
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Sticky Flowchart · NevoFlux Onboarding</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Patrick+Hand&family=Inter:wght@400;500;600&family=IBM+Plex+Mono&display=swap" rel="stylesheet" />
<style>
  body {
    font-family:'Patrick Hand','Caveat',cursive;
    background:
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px),
      #f4ede1;
    background-size: 40px 40px;
    color:#2a2a2a;
    min-height:100vh;
    margin:0;
  }
  .sticky {
    width:200px; min-height:150px;
    padding:14px 16px;
    box-shadow: 0 6px 14px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
    position:absolute;
    border-radius: 2px 2px 4px 4px;
  }
  .sticky::before {
    content:''; position:absolute; top:-8px; left:50%; transform:translateX(-50%) rotate(-2deg);
    width:80px; height:18px; background:rgba(255,255,255,0.6);
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .yellow { background:#fcd34d; transform: rotate(-1.5deg); }
  .peach { background:#fca5a5; transform: rotate(1.2deg); }
  .mint { background:#a7f3d0; transform: rotate(-0.8deg); }
  .sky { background:#a5b4fc; transform: rotate(2deg); }
  .sticky h3 { font-family:'Caveat',cursive; font-size:22px; font-weight:700; line-height:1.1; }
  .sticky p { font-family:'Patrick Hand',cursive; font-size:14px; line-height:1.3; margin-top:6px; opacity:0.85; }
  .num { font-family:'Caveat',cursive; font-weight:700; font-size:28px; line-height:1; }
  .mono { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; }
  .cursor-tag {
    position:absolute; transform: translate(-50%,-100%);
    background:#1a1a1a; color:#fff; font-family:'Inter',sans-serif; font-size:10px;
    padding:2px 8px; border-radius:10px; font-weight:600;
  }
</style>
</head>
<body class="relative overflow-hidden">
  <!-- header -->
  <header class="px-12 pt-10 flex items-baseline justify-between">
    <div class="mono opacity-70">FLOW · ONBOARDING · 2026</div>
    <h1 style="font-family:'Caveat',cursive;font-size:36px;font-weight:700">NevoFlux · Getting Started</h1>
    <div class="mono opacity-70">FRAME-FLOWCHART-STICKY</div>
  </header>

  <!-- canvas -->
  <div class="relative" style="height:780px">

    <!-- SVG connectors layer -->
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1500 780" preserveAspectRatio="none" style="pointer-events:none">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#2a2a2a"/>
        </marker>
      </defs>
      <!-- 1 → 2 -->
      <path d="M 240 240 C 320 240, 360 240, 420 240" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 2 → 3 -->
      <path d="M 620 240 C 700 240, 740 240, 800 240" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 3 → 4 -->
      <path d="M 1000 240 C 1100 240, 1140 290, 1100 360 S 980 480, 880 480" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 4 → 5 -->
      <path d="M 680 480 C 580 480, 540 480, 480 480" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 5 → 6 -->
      <path d="M 280 480 C 200 480, 160 540, 180 600 S 280 700, 380 700" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- branch: 2 → installer (dashed) -->
      <path d="M 520 320 C 520 400, 560 440, 700 440" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 6" marker-end="url(#arrow)"/>
    </svg>

    <!-- node 1: open browser -->
    <div class="sticky yellow" style="top:160px; left:60px">
      <div class="num">01</div>
      <h3 class="mt-1">Open NevoFlux browser</h3>
      <p>Land on the home canvas</p>
    </div>

    <!-- node 2: connect GBrain -->
    <div class="sticky peach" style="top:160px; left:420px">
      <div class="num">02</div>
      <h3 class="mt-1">Connect GBrain</h3>
      <p>Index your knowledge base in seconds</p>
    </div>

    <!-- node 3: pick a pack -->
    <div class="sticky mint" style="top:160px; left:800px">
      <div class="num">03</div>
      <h3 class="mt-1">Pick a pack</h3>
      <p>Browse 75 design skills by scenario</p>
    </div>

    <!-- node 4: drop content -->
    <div class="sticky sky" style="top:400px; left:680px">
      <div class="num">04</div>
      <h3 class="mt-1">Drop MD / CSV / image</h3>
      <p>Format auto-detected</p>
    </div>

    <!-- node 5: agent renders -->
    <div class="sticky yellow" style="top:400px; left:280px">
      <div class="num">05</div>
      <h3 class="mt-1">⌘+Enter to render</h3>
      <p>Agent streams the live preview</p>
    </div>

    <!-- node 6: ship Canvas app -->
    <div class="sticky mint" style="top:620px; left:380px">
      <div class="num">06</div>
      <h3 class="mt-1">Ship a Canvas app</h3>
      <p>Export PNG / HTML / share link</p>
    </div>

    <!-- branch: install SDK -->
    <div class="sticky peach" style="top:400px; left:700px; transform:rotate(3deg); width:200px">
      <div class="num">⤳</div>
      <h3 class="mt-1">Branch: add the SDK</h3>
      <p>No agent yet? npm i @nevoflux/sdk</p>
    </div>

    <!-- cursor tag -->
    <div class="cursor-tag" style="top:280px; left:520px;">🟠 you</div>
  </div>

  <footer class="px-12 pb-6 flex items-baseline justify-between mono opacity-60">
    <span>FLOWCHART · WHITEBOARD STYLE · 6 NODES + 1 BRANCH</span>
    <span>nevoflux.dev/onboarding</span>
  </footer>
</body>
</html>
```

## Usage

- Header: left/right slots are uppercase mono captions (flow tag, frame id); center is the handwritten title. Set it to the flow you are explaining.
- Nodes: each `.sticky` is one step. Fill `.num` (step number or a branch glyph), `h3` (the action), and `p` (a one-line detail). Keep 5-12 nodes; rotate the four color classes (`yellow` / `peach` / `mint` / `sky`).
- Positioning: nodes are absolutely placed via inline `top` / `left` on the 1500x780 canvas. Move them for a hand-placed feel, but keep connectors readable.
- Connectors: each `<path>` in the SVG layer joins two nodes by coordinates. Solid lines are the main flow; the dashed path is the conditional branch. Update path coordinates whenever you move a node.
- Cursor tag: optional `.cursor-tag` is a decorative collaboration cursor; reposition or remove it.
- Footer: left is a one-line summary of the diagram; right is a source/handle string.
