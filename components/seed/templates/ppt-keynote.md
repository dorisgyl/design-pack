---
slug: packs/design-pack/templates/ppt-keynote
type: template
lang: en
category: slides
title: "Keynote-style Slides"
title_zh: "Keynote 风格 PPT"
description: "An Apple Keynote-grade slide deck for NevoFlux - one idea per screen, arrow-key navigation."
tags: [slides, deck, presentation, 幻灯片, 演讲, template]
sample_image: packs/design-pack/assets/templates/ppt-keynote.svg
source: html-anything/ppt-keynote
---

## Design guidance

An Apple Keynote-grade deck: one screen, one card, left/right arrow keys to move between slides.

### Layout
- Each slide is a single `<section class="slide">`, 1280 wide by 720 tall, centered, with a gradient background.
- Keep each slide minimal: a large headline plus 1-3 supporting lines; or a single data chart; or one punchy quote.
- Type scale: headline at a large semibold, tight-tracking size; subhead at a calmer, neutral-gray size.
- The first slide is the cover (topic + presenter / date); the last slide is "Thanks." or a call to action.
- A small indicator sits in the top-right corner: current slide / total slides.

### Design details
- Add a snippet of JavaScript that listens for ArrowLeft / ArrowRight / Space to switch slides, while keeping the hash in sync (e.g. `#/3`).
- Use a fade-in animation between slides.
- Preserve whitespace, align data cards on a grid, and keep the color palette restrained.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux · Product Overview</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  body { margin:0; background:#0a0a0a; font-family:'Inter Tight','Noto Sans SC',sans-serif; }
  .deck { display:flex; flex-direction:column; align-items:center; gap:32px; padding:40px 0; }
  .slide { position:relative; width:1280px; max-width:96vw; aspect-ratio:16/9; border-radius:18px; overflow:hidden; box-shadow:0 30px 80px -20px rgba(0,0,0,0.7); display:flex; flex-direction:column; padding:64px 80px; color:#0a0a0a; background:#fafaf7; }
  .slide.dark { background:#15140f; color:#fafaf7; }
  .slide.brand { background:linear-gradient(135deg,#c96442 0%,#e9b94a 100%); color:#fff; }
  .slide .num { position:absolute; top:24px; right:32px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.18em; opacity:0.55; }
  .slide .eyebrow { font-size:12px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; opacity:0.65; margin-bottom:20px; }
  .slide h1 { font-size:84px; font-weight:800; line-height:1.05; letter-spacing:-0.025em; margin:0; }
  .slide h2 { font-size:64px; font-weight:700; line-height:1.1; letter-spacing:-0.02em; margin:0 0 24px; }
  .slide p { font-size:24px; line-height:1.5; opacity:0.78; max-width:65ch; }
  .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:auto; }
  .card { padding:28px; border-radius:14px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08); }
  .card .k { font-size:48px; font-weight:700; letter-spacing:-0.02em; margin-bottom:8px; }
  .card .l { font-size:14px; opacity:0.65; }
</style>
</head>
<body>
<div class="deck">

  <section class="slide brand">
    <span class="num">01 / 07</span>
    <div class="eyebrow">Product · 2026</div>
    <h1 style="margin-top:auto">Nevo<em style="font-family:Georgia,serif;font-style:italic;font-weight:400">Flux</em></h1>
    <p style="font-size:28px; opacity:0.95; margin-top:24px">The agentic browser that turns any document or dataset into world-class HTML, powered by a local AI agent and your own GBrain knowledge base.</p>
    <div style="margin-top:auto; display:flex; align-items:center; gap:16px; font-size:14px; opacity:0.85">
      <div style="width:32px;height:32px;border-radius:999px;background:rgba(255,255,255,0.25);display:grid;place-items:center;font-family:Georgia,serif;font-style:italic;font-weight:600">N</div>
      <span>Samuel Pan · May 11</span>
    </div>
  </section>

  <section class="slide">
    <span class="num">02 / 07</span>
    <div class="eyebrow" style="color:#c96442">The problem</div>
    <h2>Your knowledge is easy to write,<br/>but <span style="color:#c96442">ugly the moment you ship it</span>.</h2>
    <ul style="font-size:24px; line-height:2; opacity:0.78; list-style:none; padding:0">
      <li>· Raw notes screenshot out as 14px compressed jpgs</li>
      <li>· Paste into a CMS and the layout gets rewritten</li>
      <li>· Every channel - blog, social, docs - has its own rules</li>
    </ul>
  </section>

  <section class="slide dark">
    <span class="num">03 / 07</span>
    <div class="eyebrow" style="color:#e9b94a">The approach</div>
    <h2 style="font-size:96px; margin-top:auto; margin-bottom:auto">
      Any input →<br/>
      <span style="font-family:Georgia,serif;font-style:italic;font-weight:600;color:#e9b94a">world-class HTML</span>
    </h2>
    <p style="font-size:22px;opacity:0.6">Driven by the NevoFlux agent and SDK running locally - no API key, zero marginal cost on the calls you already pay for.</p>
  </section>

  <section class="slide">
    <span class="num">04 / 07</span>
    <div class="eyebrow">Three pillars</div>
    <h2>Three things that make it work</h2>
    <div class="grid3" style="grid-template-columns:repeat(3,1fr); gap:20px">
      <div class="card" style="background:#f4f1ec; border-color:#e7e5e0; color:#15140f">
        <div style="font-size:36px; margin-bottom:14px">🧠</div>
        <div style="font-weight:600; font-size:18px; margin-bottom:6px">GBrain knowledge base</div>
        <div style="font-size:14px; opacity:0.7; line-height:1.6">Grounds every render in your own indexed docs, data, and context</div>
      </div>
      <div class="card" style="background:#f4f1ec; border-color:#e7e5e0; color:#15140f">
        <div style="font-size:36px; margin-bottom:14px">🎨</div>
        <div style="font-weight:600; font-size:18px; margin-bottom:6px">Design packs</div>
        <div style="font-size:14px; opacity:0.7; line-height:1.6">Slides · résumé · poster · cards · data report skills, ready to apply</div>
      </div>
      <div class="card" style="background:#f4f1ec; border-color:#e7e5e0; color:#15140f">
        <div style="font-size:36px; margin-bottom:14px">🖼️</div>
        <div style="font-weight:600; font-size:18px; margin-bottom:6px">Canvas apps</div>
        <div style="font-size:14px; opacity:0.7; line-height:1.6">Render, tweak, and ship straight from the NevoFlux Canvas</div>
      </div>
    </div>
  </section>

  <section class="slide dark">
    <span class="num">05 / 07</span>
    <div class="eyebrow" style="color:#e9b94a">Traction</div>
    <h2>Already running</h2>
    <div class="grid3">
      <div class="card"><div class="k" style="color:#e9b94a">80<span style="font-size:24px">s</span></div><div class="l">to a 31KB shippable page</div></div>
      <div class="card"><div class="k" style="color:#e9b94a">9</div><div class="l">design skills in the pack</div></div>
      <div class="card"><div class="k" style="color:#e9b94a">8</div><div class="l">local agents supported</div></div>
    </div>
  </section>

  <section class="slide">
    <span class="num">06 / 07</span>
    <div class="eyebrow" style="color:#c96442">Why now</div>
    <h2 style="font-size:56px; margin-top:auto; margin-bottom:auto">
      Great teams stopped shipping raw markdown,<br/>
      <span style="font-family:Georgia,serif;font-style:italic;font-weight:600;color:#c96442">they ship HTML instead.</span>
    </h2>
    <p>HTML is the reader-facing final form, and the agent makes "too much polish" no longer a cost.</p>
  </section>

  <section class="slide brand">
    <span class="num">07 / 07</span>
    <h1 style="margin:auto 0; font-size:120px">Thanks.</h1>
    <div style="display:flex; align-items:flex-end; justify-content:space-between; font-size:18px">
      <div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:16px; opacity:0.85">$ nevoflux dev</div>
        <div style="opacity:0.85; margin-top:6px">→ http://localhost:3000 → ⌘+Enter</div>
      </div>
      <div style="opacity:0.7">nevoflux.app/design-pack</div>
    </div>
  </section>

</div>
<script>
  // ←/→ scroll between slides; current implementation just smooth-scrolls
  const slides=document.querySelectorAll('.slide');
  let i=0;
  document.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight') i=Math.min(i+1, slides.length-1);
    else if(e.key==='ArrowLeft') i=Math.max(i-1,0);
    else return;
    slides[i].scrollIntoView({behavior:'smooth', block:'center'});
  });
</script>
</body>
</html>
```

## Usage

- `.slide.brand` — the gradient cover and closing slides. Cover: `.eyebrow` kicker, an `h1` brand wordmark, a one-line lead `p`, and a presenter / date footer. Closing: a big "Thanks." `h1` plus a command line and a URL.
- `.slide` (default, light) — a content slide: `.eyebrow` label, an `h2` heading carrying the single core idea, and a short list or paragraph.
- `.slide.dark` — a dark statement or data slide for contrast (the approach line, the traction numbers).
- `.grid3` + `.card` — three aligned cards. For metrics use `.card .k` for the big figure and `.card .l` for the caption; for feature blocks use an emoji, a bold title, and a one-line description.
- `.num` — the top-right `NN / total` indicator; update it per slide as you add or remove sections.
- Duplicate slides to fit your content (one idea, at most one chart per slide). Arrow-key navigation picks up the new count automatically.
