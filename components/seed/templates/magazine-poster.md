---
slug: packs/design-pack/templates/magazine-poster
type: template
lang: en
category: poster
title: "NevoFlux Magazine Poster"
title_zh: "杂志风海报"
description: "A Sunday-paper editorial poster — oversized serif headline, two-column body and numbered sections — for NevoFlux launch manifestos and feature roundups."
tags: [magazine, newsprint, editorial, manifesto, template]
sample_image: packs/design-pack/assets/templates/magazine-poster.svg
source: html-anything/magazine-poster
---

## Design guidance

- Newsprint editorial poster as a tall image — it should read like a full newspaper page.
- Layout:
  - Dateline top bar (publication / date / issue number).
  - Oversized serif headline with a strike-through word and an italic accent word.
  - Italic deck (standfirst) paragraph below the headline.
  - Two-column body laid out as 6 numbered sections, each with a small kicker number, a heading, 1-2 short paragraphs and a pull-quote.
  - Footer signature line plus a small ornament / pro-tip block.
- Design details:
  - Paper feel: warm cream background with a fine dot pattern, black ink type.
  - Type: Playfair Display (display) + IBM Plex Serif / Iowan body + JetBrains Mono / IBM Plex Mono for labels.
  - One warm accent color (terracotta) for the italic accent word, kicker numbers, rules and quote borders.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>You don't need a wiki to ship a living knowledge base anymore — NevoFlux Dispatch</title>
  <style>
    :root {
      --paper: #f3eee2;
      --ink: #1f1c17;
      --muted: #6e6a5d;
      --rule: #d3cdbe;
      --accent: #b85a3a;
      --tint: #ece5d3;
      --serif-display: 'Playfair Display', 'Iowan Old Style', Georgia, serif;
      --serif-body: 'Iowan Old Style', 'Charter', Georgia, serif;
      --mono: 'IBM Plex Mono', ui-monospace, 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; color: var(--ink);
      background:
        radial-gradient(circle, rgba(31,28,23,0.05) 1px, transparent 1.4px) 0 0 / 16px 16px,
        var(--paper);
      font: 14px/1.55 var(--serif-body);
    }
    .page {
      max-width: 1180px;
      margin: 0 auto;
      padding: 36px 56px 48px;
    }

    .top-rule {
      display: flex; justify-content: space-between; align-items: center;
      font: 10.5px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--ink);
    }
    .eyebrow-row {
      padding: 14px 0 28px;
      font: 10.5px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1.headline {
      font-family: var(--serif-display);
      font-weight: 800;
      font-size: clamp(56px, 7vw, 96px);
      line-height: 0.98;
      letter-spacing: -0.012em;
      margin: 0 0 16px;
      max-width: 18ch;
    }
    h1.headline .strike { text-decoration: line-through; text-decoration-thickness: 3px; text-decoration-color: var(--ink); color: var(--ink); }
    h1.headline .accent { font-style: italic; color: var(--accent); font-weight: 700; }

    .deck {
      max-width: 78ch;
      font: italic 18px/1.45 var(--serif-body);
      color: var(--ink);
      margin: 0 0 22px;
    }
    .deck b { font-style: normal; color: var(--accent); font-weight: 600; padding: 0 4px; background: var(--tint); border-radius: 2px; }

    .accent-rule { width: 80px; height: 3px; background: var(--accent); margin: 6px 0 32px; }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px 56px;
      padding-top: 4px;
      border-top: 1px solid var(--rule);
    }
    .cell { padding: 28px 0 4px; border-bottom: 1px solid var(--rule); }
    .cell:nth-last-child(-n+2) { border-bottom: none; }
    .cell .num {
      font: 10.5px/1.4 var(--mono);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 6px;
      display: flex; align-items: center; gap: 10px;
    }
    .cell .num span.bar { display: inline-block; width: 20px; height: 1px; background: var(--accent); opacity: 0.6; }
    .cell h3 {
      font: 700 22px/1.2 var(--serif-display);
      letter-spacing: -0.005em;
      margin: 0 0 10px;
    }
    .cell p { margin: 0 0 14px; font-size: 15px; line-height: 1.55; max-width: 46ch; color: var(--ink); }
    .cell .quote {
      background: var(--tint);
      border-left: 2px solid var(--accent);
      padding: 10px 12px;
      font: 12px/1.55 var(--mono);
      color: var(--ink);
      max-width: 50ch;
    }
    .cell .quote::before { content: '"'; }
    .cell .quote::after { content: '"'; }

    .footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid var(--ink);
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 24px;
      align-items: center;
      font: 10.5px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .pro-tip {
      display: flex; gap: 12px; align-items: center;
      padding: 10px 14px;
      border: 1px solid var(--rule);
      background: var(--paper);
      max-width: 78%;
    }
    .pro-tip .badge { font: 9.5px/1 var(--mono); letter-spacing: 0.2em; padding: 6px 8px; border: 1px solid var(--ink); color: var(--ink); }
    .pro-tip .text { font: italic 13px/1.4 var(--serif-body); color: var(--ink); text-transform: none; letter-spacing: 0; }
    .pro-tip .text b { color: var(--accent); font-style: normal; font-weight: 600; }

    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .cell { border-bottom: 1px solid var(--rule); }
      .cell:last-child { border-bottom: none; }
      .page { padding: 24px 24px 32px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="top-rule" data-od-id="top-rule">
      <span>01 · NEVOFLUX DISPATCH</span>
      <span>13 · JUN · 2026</span>
    </div>
    <div class="eyebrow-row" data-od-id="eyebrow">— FROM THE PACKS TEAM</div>

    <h1 class="headline" data-od-id="headline">
      You don't need <span class="strike">a wiki</span><br />
      to ship a <span class="accent">living</span><br />
      knowledge base.
    </h1>

    <p class="deck" data-od-id="deck">
      Six ways the NevoFlux browser turns raw source into Canvas apps this week — <b>what GBrain handles</b>, what the agent wires for you, and the exact packs that got us there.
    </p>
    <div class="accent-rule"></div>

    <div class="grid" data-od-id="grid">
      <section class="cell" data-od-id="cell-1">
        <div class="num"><span class="bar"></span>01 · INDEX</div>
        <h3>Point GBrain at your source</h3>
        <p>Drop in a repo, a CSV, a JSON export or a folder of notes. GBrain indexes it locally and answers inline, right where the work happens.</p>
        <div class="quote">Index this product repo plus the changelog. Answer support questions inline, cite the file and line.</div>
      </section>
      <section class="cell" data-od-id="cell-2">
        <div class="num"><span class="bar"></span>02 · CANVAS</div>
        <h3>Ship an app, not a static doc</h3>
        <p>Pick a template, press ⌘+Enter, and the Canvas panel holds a ready-to-ship app — tappable, on-brand, droppable into any workspace.</p>
        <div class="quote">Turn the onboarding guide into a Canvas app. Five steps, dark mode, progress saved per user.</div>
      </section>
      <section class="cell" data-od-id="cell-3">
        <div class="num"><span class="bar"></span>03 · SKILLS</div>
        <h3>One design skill, every pack</h3>
        <p>A design skill carries the type, color and spacing scale. Every pack that reuses it ships assets that already respect your house style.</p>
        <div class="quote">Reuse the magazine-poster skill. Build a launch variant. Keep the cream paper and terracotta accent.</div>
      </section>
      <section class="cell" data-od-id="cell-4">
        <div class="num"><span class="bar"></span>04 · PACKS</div>
        <h3>Templates &amp; launch collateral</h3>
        <p>One-pagers, slide decks, social cards, data reports — editable, on-brand, generated from the same GBrain source in minutes, not days.</p>
        <div class="quote">From this release note, build a poster, a Twitter card and a one-page data report. Same facts, three formats.</div>
      </section>
      <section class="cell" data-od-id="cell-5">
        <div class="num"><span class="bar"></span>05 · AGENT</div>
        <h3>No API key, no wasted tokens</h3>
        <p>The local agent runs inside your already signed-in NevoFlux session. A re-edit only runs the diff — you own the final shape, it handles the wiring.</p>
        <div class="quote">Re-edit just this section. Don't re-run the whole pack. Keep the rest byte-for-byte.</div>
      </section>
      <section class="cell" data-od-id="cell-6">
        <div class="num"><span class="bar"></span>06 · SDK</div>
        <h3>Wire it into your stack</h3>
        <p>Finished the pack? The SDK syncs it back into GBrain and into your tools. Specs, tokens, components — no translation layer between teams.</p>
        <div class="quote">Export this pack via the SDK. Sync it into GBrain. Publish the Canvas app to our shared workspace.</div>
      </section>
    </div>

    <div class="footer" data-od-id="footer">
      <div class="pro-tip">
        <span class="badge">PRO TIP</span>
        <span class="text">Don't ask GBrain for <b>"a doc."</b> Ask for a format — <b>"a poster", "a Canvas app", "a data report," "a social card."</b> Format specificity is the unlock.</span>
      </div>
      <div></div>
      <div>SAVE · REUSE THE SKILL · SHIP ONE THIS WEEK</div>
    </div>
  </div>
</body>
</html>
```

## Usage

- `top-rule` (dateline bar): issue number + publication name on the left, date on the right. Edit both spans.
- `eyebrow-row`: small mono kicker under the dateline — the "from / posted" line.
- `h1.headline`: oversized serif headline. Keep one `.strike` word (the thing you're replacing) and one italic `.accent` word (the payoff). Break lines with `<br />`.
- `deck`: the italic standfirst sentence. Highlight key phrases with `<b>` (rendered as accent chips).
- `grid` of 6 `.cell` sections: each has a `.num` kicker (number + short label), an `h3` heading, 1-2 `<p>` paragraphs and a mono `.quote` (an example prompt / pull-quote). Keep the count at 6 so the two-column rhythm holds.
- `footer`: a `.pro-tip` block on the left (badge + one-sentence tip with accent `<b>` words) and a mono call-to-action label on the right.
- Self-contained: paper texture is a CSS radial-gradient dot pattern; no external fonts, images or URLs are required.
