---
slug: packs/design-pack/templates/card-twitter
type: template
lang: en
category: card
title: "NevoFlux Twitter Share Card"
title_zh: "Twitter 分享卡"
description: "A 16:9 dark quote / data card sized for screenshots that drop straight into a tweet."
tags: [twitter, x, quote, 金句, template]
sample_image: packs/design-pack/assets/templates/card-twitter.svg
source: html-anything/card-twitter
---

## Design guidance

Layout
- Container is `w-[1600px] h-[900px]` (16:9). Pick a dark or light treatment based on the mood of the content.
- One central hero quote (`text-6xl`, `font-semibold`, kept to 2-3 lines).
- Below the quote: author byline plus an avatar placeholder and handle.
- A small label in the top-left corner indicating the type ("Insight" / "Data" / "Quote").
- A brand watermark in the bottom-right corner.

Design details
- Give the whole card a subtle texture (grid lines / noise / dot pattern).
- Use a soft gradient glow behind the content for depth, kept low-opacity so the text stays readable.
- Once screenshotted, the card should pair directly with a tweet: the visual must stay clean and punchy.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Twitter Share Card · Quote</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700;800&family=Noto+Serif+SC:wght@500;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  body { margin:0; background:#0a0a0a; font-family:'Inter Tight','Noto Sans SC',sans-serif; min-height:100vh; display:grid; place-items:center; padding:24px; }
  .card { width:1600px; max-width:96vw; aspect-ratio:16/9; border-radius:24px; overflow:hidden; position:relative;
    background:#15140f; color:#fafaf7; padding:80px; display:flex; flex-direction:column; justify-content:space-between;
    box-shadow:0 40px 100px -20px rgba(0,0,0,0.7);
  }
  .grid-pattern { position:absolute; inset:0; opacity:0.06; background-image:linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px); background-size:48px 48px; }
  .glow { position:absolute; width:680px; height:680px; border-radius:50%; filter:blur(140px); opacity:0.55; }
  .g1 { background:#c96442; top:-180px; left:-180px; }
  .g2 { background:#e9b94a; bottom:-260px; right:-200px; }
  .header { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .tag { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:999px; background:rgba(233,185,74,0.14); color:#e9b94a; font-size:13px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; border:1px solid rgba(233,185,74,0.25); }
  .quote { font-family:'Noto Serif SC',serif; font-size:96px; line-height:1.18; font-weight:700; letter-spacing:-0.02em; max-width:24ch; position:relative; z-index:2; margin-top:auto; margin-bottom:auto; }
  .quote .em { font-style:italic; color:#e9b94a; }
  .quote::before { content:"" "" "; font-family:Georgia,serif; font-size:140px; color:#e9b94a; position:absolute; top:-60px; left:-60px; opacity:0.3; line-height:1; }
  .footer { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .author { display:flex; align-items:center; gap:16px; }
  .avatar { width:56px; height:56px; border-radius:999px; background:linear-gradient(135deg,#c96442,#e9b94a); display:grid; place-items:center; font-family:Georgia,serif; font-style:italic; font-size:28px; font-weight:700; color:#fff; }
  .brand { display:flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:13px; opacity:0.55; }
  .brand .glyph { width:24px; height:24px; border-radius:6px; border:1px solid rgba(255,255,255,0.4); display:grid; place-items:center; font-family:Georgia,serif; font-style:italic; font-size:13px; font-weight:600; }
</style>
</head>
<body>
<div class="card">
  <div class="grid-pattern"></div>
  <div class="glow g1"></div>
  <div class="glow g2"></div>

  <div class="header">
    <div class="tag">✦ Quote</div>
    <div class="brand"><div class="glyph">N</div>NevoFlux</div>
  </div>

  <div class="quote">
    A browser remembers <span class="em">links</span>.<br/>
    NevoFlux remembers <span class="em">what you meant</span>.
  </div>

  <div class="footer">
    <div class="author">
      <div class="avatar">N</div>
      <div>
        <div style="font-size:18px; font-weight:600">Nova Reed</div>
        <div style="font-size:14px; opacity:0.55">@novareed · building GBrain, the knowledge base inside the browser</div>
      </div>
    </div>
    <div style="font-size:13px; opacity:0.45; font-family:'JetBrains Mono',monospace">2026.05</div>
  </div>
</div>
</body>
</html>
```

## Usage

- `tag` (top-left): the card type. Swap the label and emoji between "Quote", "Insight", and "Data".
- `brand` (top-right): the watermark glyph and product name; here the NevoFlux "N".
- `quote`: the hero line, 2-3 lines max. Wrap the words you want emphasized in `<span class="em">` to pick up the accent color.
- `author`: avatar initial, display name, and handle plus a one-line bio.
- `footer` date: short publish stamp in the bottom-right.
- The two `.glow` blobs and `.grid-pattern` are pure CSS; keep them for texture and depth.
