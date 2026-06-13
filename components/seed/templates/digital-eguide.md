---
slug: packs/design-pack/templates/digital-eguide
type: template
lang: en
category: article
title: "NevoFlux Digital E-Guide"
title_zh: "电子指南"
description: "A two-page spread digital e-guide: cover + lesson page with pull-quote and step list, styled as a creator lead magnet."
tags: [eguide, lookbook, lead magnet, playbook, template]
sample_image: packs/design-pack/assets/templates/digital-eguide.svg
source: html-anything/digital-eguide
---

## Design guidance

- Intent: a creator-brand lead-magnet feel — one cover page and one inner page laid out side by side like an open book.
- Layout
  - Page 1 (cover): a display title + author line + a "What's inside" stats row + a table-of-contents teaser.
  - Page 2 (spread): the lesson body + a floating pull-quote + a numbered step list, closed with an exercise callout.
- Design details
  - Lifestyle / creator-brand tone, soft warm beige paper on a dusty backdrop.
  - The two pages sit side-by-side horizontally, each tilted a fraction of a degree, like a real book opened flat.
  - Serif display type for the big headings, a serif body face for copy, and a mono face for eyebrows, page numbers and labels.
  - Accent red + warm orange highlight key words, the round sticker, and the drop-cap.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>The NevoFlux Field Guide — GBrain &amp; Canvas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=DM+Serif+Text:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --backdrop: #d8c8c0;
      --paper: #faf3ea;
      --paper-2: #f4ecdf;
      --ink: #1f1c14;
      --muted: #837964;
      --rule: #d3c9b3;
      --accent: #c44a47;
      --accent-2: #e07d52;
      --serif: 'Cormorant Garamond', 'Iowan Old Style', Georgia, serif;
      --serif-body: 'DM Serif Text', Georgia, serif;
      --sans: -apple-system, system-ui, 'Inter', sans-serif;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background:
        radial-gradient(ellipse 80% 60% at 50% 20%, #e8d4cc, transparent 70%),
        radial-gradient(ellipse 60% 60% at 80% 90%, #c79a8e, transparent 70%),
        var(--backdrop);
      font: 14px/1.55 var(--serif-body);
      padding: 60px 40px;
      display: flex; gap: 36px; justify-content: center; align-items: flex-start;
      flex-wrap: wrap;
    }

    .page {
      width: 540px; min-height: 740px;
      background: var(--paper);
      border-radius: 4px;
      padding: 44px 44px 36px;
      box-shadow: 0 30px 60px rgba(31,28,20,0.18), 0 4px 8px rgba(31,28,20,0.06);
      position: relative;
    }
    .page.left { transform: rotate(-0.6deg); }
    .page.right { transform: rotate(0.6deg); background: var(--paper-2); }

    .eyebrow {
      font: 10.5px/1 var(--mono);
      letter-spacing: 0.22em;
      color: var(--muted);
      text-transform: uppercase;
      display: flex; justify-content: space-between; align-items: center;
      padding-bottom: 22px;
      border-bottom: 1px solid var(--rule);
    }
    .eyebrow .left, .eyebrow .right { display: flex; align-items: center; gap: 10px; }
    .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

    /* Cover */
    .cover h1.title {
      font-family: var(--serif);
      font-weight: 700;
      font-size: clamp(60px, 7.5vw, 92px);
      line-height: 0.96;
      letter-spacing: -0.01em;
      margin: 32px 0 8px;
      color: var(--ink);
    }
    .cover h1.title .creator { color: var(--accent); font-style: italic; }
    .cover h1.title .amp { color: var(--accent-2); font-style: italic; font-weight: 500; padding: 0 6px; }
    .cover h1.title .guide { font-style: italic; font-weight: 500; }
    .cover h1.title .format { font-style: italic; font-weight: 500; padding-right: 4px; }

    .cover .author { font: 12px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; margin: 16px 0 18px; display: flex; align-items: center; gap: 10px; }
    .cover .author b { color: var(--ink); font-weight: 500; }

    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding: 18px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin: 22px 0 28px; }
    .stat .num { font: 700 36px/1 var(--serif); letter-spacing: -0.005em; }
    .stat .lbl { font: 10px/1.4 var(--mono); color: var(--muted); letter-spacing: 0.16em; text-transform: uppercase; margin-top: 6px; max-width: 16ch; }

    .cover h2.inside { font: italic 700 36px/1 var(--serif); margin: 14px 0 14px; letter-spacing: -0.005em; }
    .cover h2.inside em { font-style: italic; color: var(--accent); }

    .toc { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 36px; }
    .toc .item { display: flex; align-items: baseline; gap: 6px; font: 14.5px/1.4 var(--serif-body); }
    .toc .item .name { font-style: italic; color: var(--ink); }
    .toc .item .leader { flex: 1; border-bottom: 1px dotted var(--muted); transform: translateY(-2px); margin: 0 4px; }
    .toc .item .pn { font: 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.06em; }

    .cover-footer { position: absolute; left: 44px; right: 44px; bottom: 28px; display: flex; justify-content: space-between; align-items: center; font: 10.5px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; padding-top: 14px; border-top: 1px solid var(--rule); }
    .sticker { position: absolute; top: 280px; right: 44px; width: 92px; height: 92px; border-radius: 50%; background: var(--accent-2); transform: rotate(8deg); display: grid; place-items: center; color: #fff; font: italic 700 14px/1.1 var(--serif); text-align: center; padding: 10px; }
    .sticker::after { content: ''; position: absolute; inset: 6px; border: 1px dashed rgba(255,255,255,0.5); border-radius: 50%; }

    /* Spread */
    .spread h2.head { font: italic 700 44px/1 var(--serif); letter-spacing: -0.005em; margin: 32px 0 6px; max-width: 18ch; }
    .spread h2.head .accent { color: var(--accent); }
    .spread .deck { font: italic 16px/1.5 var(--serif-body); color: var(--muted); margin: 0 0 22px; max-width: 50ch; }

    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-top: 14px; border-top: 1px solid var(--rule); }
    .columns p { margin: 0 0 14px; font: 14.5px/1.6 var(--serif-body); color: var(--ink); }
    .columns p:first-letter { font-family: var(--serif); font-size: 38px; line-height: 0.85; padding: 4px 6px 0 0; float: left; font-weight: 700; color: var(--accent); font-style: italic; }
    .steps { display: flex; flex-direction: column; gap: 10px; }
    .steps .row { display: grid; grid-template-columns: 28px 1fr; gap: 10px; align-items: baseline; padding: 8px 0; border-bottom: 1px dashed var(--rule); }
    .steps .row .n { font: 700 12px/1 var(--mono); color: var(--accent); letter-spacing: 0.08em; }
    .steps .row .body { font: 14px/1.45 var(--serif-body); }
    .steps .row .body b { color: var(--ink); font-weight: 700; font-style: italic; }

    .pullquote {
      position: absolute; right: -16px; top: 280px;
      width: 250px;
      padding: 18px 22px;
      background: var(--paper);
      border: 1px solid var(--rule);
      border-radius: 4px;
      box-shadow: 0 8px 18px rgba(31,28,20,0.10);
      font: italic 700 22px/1.2 var(--serif);
      color: var(--ink);
      transform: rotate(2.4deg);
    }
    .pullquote .open { font-size: 56px; line-height: 0.4; color: var(--accent); display: block; height: 24px; }
    .pullquote .by { font: 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.14em; text-transform: uppercase; font-weight: 400; font-style: normal; margin-top: 14px; display: block; }

    .exercise { margin-top: 18px; padding: 14px 16px; border: 1px solid var(--accent); border-radius: 4px; background: rgba(196,74,71,0.05); display: flex; gap: 14px; align-items: center; }
    .exercise .label { font: 10.5px/1 var(--mono); color: var(--accent); letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 8px; border: 1px solid var(--accent); }
    .exercise .text { font: italic 14px/1.4 var(--serif-body); color: var(--ink); }

    .spread-footer { position: absolute; left: 44px; right: 44px; bottom: 28px; display: flex; justify-content: space-between; align-items: center; font: 10.5px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; padding-top: 14px; border-top: 1px solid var(--rule); }

    @media (max-width: 1180px) {
      .pullquote { right: 16px; }
      .page { width: 92vw; max-width: 540px; }
    }
  </style>
</head>
<body>
  <article class="page left cover" data-od-id="cover">
    <div class="eyebrow">
      <div class="left"><span class="dot"></span>FIELD GUIDE FOR BUILDERS ON NEVOFLUX</div>
      <div class="right">2026 EDITION</div>
    </div>

    <h1 class="title">The <span class="creator">NevoFlux</span> Field <span class="amp">&amp;</span> <span class="format">Canvas</span> <span class="guide">guide</span></h1>

    <div class="author">— BY <b>NEVOFLUX</b> · DEVELOPER RELATIONS · 18 / 04 / 2026</div>

    <div class="stats">
      <div class="stat"><div class="num">16</div><div class="lbl">GBrain recipes</div></div>
      <div class="stat"><div class="num">38</div><div class="lbl">Canvas do's &amp; don'ts</div></div>
      <div class="stat"><div class="num">1</div><div class="lbl">Pack, zero boilerplate</div></div>
    </div>

    <h2 class="inside">What's <em>inside.</em></h2>

    <div class="toc" data-od-id="toc">
      <div class="item"><span class="name">Open your browser</span><span class="leader"></span><span class="pn">04</span></div>
      <div class="item"><span class="name">Feed the GBrain</span><span class="leader"></span><span class="pn">12</span></div>
      <div class="item"><span class="name">Ship a Canvas app</span><span class="leader"></span><span class="pn">18</span></div>
      <div class="item"><span class="name">Wire up the agent</span><span class="leader"></span><span class="pn">24</span></div>
      <div class="item"><span class="name">Publish a pack</span><span class="leader"></span><span class="pn">32</span></div>
      <div class="item"><span class="name">Design with skills</span><span class="leader"></span><span class="pn">40</span></div>
    </div>

    <div class="sticker">FOR YOUR FIRST PACK</div>
    <div class="cover-footer"><span>OPEN YOUR BROWSER</span><span>01 / 64</span></div>
  </article>

  <article class="page right spread" data-od-id="spread">
    <div class="eyebrow">
      <div class="left"><span class="dot"></span>CHAPTER 02 · GBRAIN</div>
      <div class="right">3 — RULES, 1 — EXERCISE</div>
    </div>

    <h2 class="head">Feed it like you know it —<br/><span class="accent">only cleaner.</span></h2>
    <p class="deck">Your knowledge already exists, scattered across tabs and notes. The work is to drop what the agent can't use, then store what's left in the shape it can retrieve. Three small rules and one Sunday-morning exercise.</p>

    <div class="columns">
      <p>A good GBrain has the recall of a search engine and the judgement of an editor. Most builders pick one and stop. Open your knowledge base and read a chunk aloud. The passages you stumble over are the ones the agent will too — split them.</p>
      <div class="steps">
        <div class="row"><span class="n">01</span><span class="body"><b>One idea per chunk.</b> If two facts share a paragraph, split it so retrieval stays precise.</span></div>
        <div class="row"><span class="n">02</span><span class="body"><b>Drop the noise.</b> Nav bars, cookie banners, "click here" — they pad the index, then they drown the signal.</span></div>
        <div class="row"><span class="n">03</span><span class="body"><b>Title every source.</b> A clear heading is the handle the agent grabs when it cites you back.</span></div>
        <div class="row"><span class="n">04</span><span class="body"><b>Ask it once.</b> Always. The agent's first answer is the editor of your GBrain.</span></div>
      </div>
    </div>

    <div class="pullquote" data-od-id="pullquote">
      <span class="open">"</span>
      Specificity is the unlock — store what only your browser saw.
      <span class="by">— NEVOFLUX · CHAPTER 02</span>
    </div>

    <div class="exercise" data-od-id="exercise">
      <span class="label">EXERCISE</span>
      <span class="text">Re-index your last three saved pages without the words <em>just</em>, <em>maybe</em>, or <em>etc.</em> Keep the chunks that still answer a question.</span>
    </div>

    <div class="spread-footer"><span>FEED THE GBRAIN</span><span>18 / 64</span></div>
  </article>
</body>
</html>
```

## Usage

- `eyebrow` row (both pages): mono kicker line — left label + right edition/meta. Page 2's right slot carries the "rules / exercise" count.
- Cover `h1.title`: large serif headline. The `.creator` / `.amp` / `.format` / `.guide` spans carry the accent colors — keep the inline structure, swap the words.
- `author` line: byline in mono caps — name, role, date.
- `stats` row: three "What's inside" metrics — `.num` is the big figure, `.lbl` the small caption.
- `toc` grid: six table-of-contents teasers — `.name` (chapter) + `.pn` (page number); the dotted `.leader` fills the gap automatically.
- `sticker`: round accent badge, top-right of the cover.
- Spread `h2.head`: the lesson headline; the `.accent` span colors the second line.
- `deck`: one-paragraph intro under the headline.
- `columns`: left `<p>` is the lesson body (first letter becomes a drop-cap automatically); right `.steps` is the numbered rule list — `.n` is the index, `.body b` the bolded lead-in.
- `pullquote`: floating quote card — edit the line and the `.by` attribution.
- `exercise`: the closing callout — `.label` is the tag, `.text` the task.
- `*-footer`: running footer — section name + page count. Keep CSS gradients / inline shapes as-is; no external images.
