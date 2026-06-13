---
slug: packs/design-pack/templates/poster-hero
type: template
lang: en
category: poster
title: "NevoFlux Launch Poster"
title_zh: "营销海报"
description: "A 9:16 vertical launch / share poster with high visual impact — gradient mesh, grain texture and a QR placeholder — for announcing NevoFlux releases."
tags: [poster, 海报, 朋友圈, template]
sample_image: packs/design-pack/assets/templates/poster-hero.svg
source: html-anything/poster-hero
---

## Design guidance

- Vertical poster / social-share image (think a moments or status share) built for strong visual impact.
- Layout:
  - Container is `1080 x 1920` (9:16), centered, with a full-bleed gradient / mesh background.
  - Leave the top ~30% airy: a small uppercase label on the left and one large glyph or abstract geometric mark on the right.
  - The main headline owns the visual center (huge, font-black weight) with a one-line subtitle underneath.
  - An information block of 3-5 core points, each an icon plus a short title and one supporting line.
  - Bottom-right corner carries the brand / QR code (use an inline SVG placeholder) plus a one-line install command and handle.
- Design details:
  - Use bold color: a layered gradient background (warm amber bleeding into deep violet / indigo), white text with a single contrasting accent color for highlighted words.
  - Use SVG for decorative elements (the QR mark) and a CSS dot pattern for noise / grain texture.
  - Type: a tight geometric sans for the display headline, a serif italic for the accent word, and a mono face for the command line.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 1.0 Launch Poster</title>
<style>
  body { margin:0; background:#0a0a0a; font-family:'Inter Tight','Noto Sans SC',sans-serif; display:grid; place-items:center; padding:24px 0; }
  .poster { position:relative; width:1080px; max-width:96vw; aspect-ratio:9/16; border-radius:32px; overflow:hidden; color:#fff;
    background:
      radial-gradient(ellipse at 80% 0%, rgba(233,185,74,0.55), transparent 55%),
      radial-gradient(ellipse at 20% 100%, rgba(108,58,166,0.5), transparent 55%),
      linear-gradient(135deg,#c96442 0%,#15140f 60%,#1a0e2b 100%);
    display:flex; flex-direction:column; padding:80px 70px;
    box-shadow:0 40px 120px -20px rgba(0,0,0,0.7);
  }
  .grain { position:absolute; inset:0; pointer-events:none; opacity:0.18; background-image:radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px); background-size:3px 3px; }
  .label { font-size:13px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase; opacity:0.85; }
  .glyph { width:120px; height:120px; border-radius:32px; display:grid; place-items:center; background:rgba(255,255,255,0.08); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.18); }
  h1 { font-family:'Inter Tight',sans-serif; font-weight:900; font-size:148px; line-height:0.95; letter-spacing:-0.04em; margin:0; }
  .em { font-family:Georgia, 'Noto Serif SC', serif; font-weight:700; font-style:italic; color:#e9b94a; }
  .feature { display:flex; align-items:flex-start; gap:18px; }
  .feature .ic { width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.12); display:grid; place-items:center; font-size:22px; flex-shrink:0; }
  .feature .t { font-size:22px; font-weight:600; }
  .feature .d { font-size:15px; opacity:0.7; line-height:1.55; margin-top:4px; }
  .qr { width:120px; height:120px; border-radius:14px; background:#fff; padding:12px; }
  .qr svg { width:100%; height:100%; }
</style>
</head>
<body>
<div class="poster">
  <div class="grain"></div>

  <div style="display:flex; align-items:center; justify-content:space-between">
    <div class="label">RELEASE · 2026.06</div>
    <div class="glyph">
      <div style="font-family:Georgia,serif; font-style:italic; font-size:78px; font-weight:700; color:#fff">N</div>
    </div>
  </div>

  <div style="margin:auto 0; flex:none">
    <div class="label" style="margin-bottom:24px">v1.0 · Now Available</div>
    <h1>Nevo<br/><span class="em">Flux</span></h1>
    <div style="font-size:30px; font-weight:500; opacity:0.92; margin-top:36px; max-width:560px; line-height:1.35">
      The browser that turns any knowledge into<br/>
      a living <span class="em" style="color:#e9b94a">GBrain</span>, driven by its own agent.
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr; gap:18px; margin:48px 0 32px">
    <div class="feature"><div class="ic">🧠</div><div><div class="t">GBrain knowledge base</div><div class="d">Every page you read becomes recallable, linked memory</div></div></div>
    <div class="feature"><div class="ic">🎨</div><div><div class="t">Canvas apps + design skills</div><div class="d">Build live tools and posters from a prompt</div></div></div>
    <div class="feature"><div class="ic">🤖</div><div><div class="t">Built-in agent &amp; SDK</div><div class="d">Automate the browser, extend it with your own packs</div></div></div>
    <div class="feature"><div class="ic">📦</div><div><div class="t">Install a pack, ship instantly</div><div class="d">Templates, skills and flows, ready to paste</div></div></div>
  </div>

  <div style="display:flex; align-items:center; gap:24px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.18)">
    <div class="qr">
      <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
        <rect width="33" height="33" fill="#fff"/>
        <g fill="#0a0a0a">
          <rect x="2" y="2" width="9" height="9" fill="none" stroke="#0a0a0a" stroke-width="2"/>
          <rect x="5" y="5" width="3" height="3"/>
          <rect x="22" y="2" width="9" height="9" fill="none" stroke="#0a0a0a" stroke-width="2"/>
          <rect x="25" y="5" width="3" height="3"/>
          <rect x="2" y="22" width="9" height="9" fill="none" stroke="#0a0a0a" stroke-width="2"/>
          <rect x="5" y="25" width="3" height="3"/>
          <rect x="13" y="2" width="2" height="2"/><rect x="17" y="2" width="2" height="2"/>
          <rect x="13" y="6" width="2" height="2"/><rect x="15" y="9" width="2" height="2"/>
          <rect x="2" y="13" width="2" height="2"/><rect x="6" y="13" width="2" height="2"/>
          <rect x="13" y="13" width="2" height="2"/><rect x="17" y="13" width="2" height="2"/><rect x="21" y="13" width="2" height="2"/>
          <rect x="13" y="17" width="2" height="2"/><rect x="19" y="15" width="2" height="2"/>
          <rect x="22" y="17" width="2" height="2"/><rect x="26" y="17" width="2" height="2"/>
          <rect x="13" y="21" width="2" height="2"/><rect x="17" y="21" width="2" height="2"/>
          <rect x="22" y="22" width="2" height="2"/><rect x="26" y="26" width="2" height="2"/>
          <rect x="22" y="29" width="2" height="2"/><rect x="29" y="22" width="2" height="2"/>
        </g>
      </svg>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace; font-size:14px; opacity:0.95">$ pnpm dlx nevoflux</div>
      <div style="font-size:14px; opacity:0.7; margin-top:6px">github.com/nevoflux/nevoflux</div>
    </div>
  </div>
</div>
</body>
</html>
```

## Usage

- `.label` (top-left): release / date kicker — keep it short and uppercase.
- `.glyph` (top-right): one brand letter or abstract mark.
- Center block: the availability `.label`, the `h1` headline (split across two lines with the accent word in `.em`), and the one-line subtitle.
- `.feature` rows: 3-5 core points, each an emoji `.ic`, a `.t` title and a `.d` supporting line — swap in your own product highlights.
- Footer: the `.qr` SVG placeholder plus the mono install command and repo / handle line.
- Stays self-contained: gradient and dot-pattern backgrounds, inline SVG QR, no external URLs. Adjust the gradient stops and `--accent` color (`#e9b94a`) to re-skin.
