---
slug: packs/design-pack/templates/web-proto-brutalist
type: template
lang: en
category: prototype
title: "NevoFlux Brutalist Prototype"
title_zh: "Brutalist 原型"
description: "A Swiss industrial-print brutalist web prototype: single-word grotesque type, viewport-bleeding giant numerals, hazard-red accents and ASCII ornament — used here as a NevoFlux field bulletin."
tags: [brutalist, swiss, industrial, hairline, template]
sample_image: packs/design-pack/assets/templates/web-proto-brutalist.svg
source: html-anything/web-proto-brutalist
---

## Design guidance

- Swiss Industrial Print attitude: not soft, not friendly — heavy authority and editorial discipline.
- Newsprint canvas (warm off-white paper) divided by 1px hairline rules; thick 4px rules separate the major registers.
- Monolithic black grotesque headlines (Archivo Black), with viewport-bleeding giant numerals as the dominant graphic element.
- Hazard-red accent used sparingly for emphasis, status dots, and inline punctuation, plus ASCII ornament (brackets, `///`, `>>>`).
- Sections are labelled with minimal numeric indexing; monospace (JetBrains Mono) carries all the metadata, labels and tabular data.
- Layout registers, top to bottom: a register strip of meta fields, a bordered nav, a split hero (giant numeral + meta column), an abstract / lead block with drop cap and a credits rail, a numbered manifest of theses, a 1px-grid index table, a type specimen, a hatched hazard alert block, and a colophon.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NEVOFLUX FIELD UNIT 04 // INSTRUMENT FOR THE AGENTIC WEB</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --paper: #F4F4F0;
      --paper-2: #EAE8E3;
      --ink: #060606;
      --ink-soft: #1A1A18;
      --hazard: #E61919;
      --rule: #060606;
      --display: 'Archivo Black', 'Neue Haas Grotesk', 'Inter', sans-serif;
      --sans: 'Archivo', 'Inter', system-ui, sans-serif;
      --mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: var(--paper);
      color: var(--ink);
      font-family: var(--sans);
      font-size: 15px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: "tnum", "ss01";
    }
    a { color: inherit; text-decoration: none; }
    a:hover { background: var(--ink); color: var(--paper); }

    .mono { font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px; }
    .mono-md { font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.08em; font-size: 13px; }
    .red { color: var(--hazard); }
    .ink { color: var(--ink); }

    hr.rule { border: 0; border-top: 1px solid var(--ink); margin: 0; }
    hr.thick { border: 0; border-top: 4px solid var(--ink); margin: 0; }
    hr.hazard { border: 0; border-top: 1px solid var(--hazard); margin: 0; }

    /* ========= TOP REGISTER STRIP ========= */
    .strip {
      border-top: 1px solid var(--ink);
      border-bottom: 1px solid var(--ink);
      padding: 8px 22px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 22px;
      font-family: var(--mono);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 11px;
    }
    .strip > div { display: flex; gap: 8px; align-items: baseline; white-space: nowrap; overflow: hidden; }
    .strip b { color: var(--ink); }
    .strip span { color: var(--ink-soft); }

    /* ========= NAV ========= */
    .nav {
      padding: 14px 22px;
      display: flex; align-items: baseline; justify-content: space-between;
      border-bottom: 4px solid var(--ink);
    }
    .brand {
      font-family: var(--display); font-size: 22px; letter-spacing: -0.04em; line-height: 1; text-transform: uppercase;
    }
    .brand sup { font-family: var(--mono); font-size: 9px; letter-spacing: 0.18em; font-weight: 400; vertical-align: top; margin-left: 4px; color: var(--hazard); }
    .nav ul { list-style: none; display: flex; gap: 18px; margin: 0; padding: 0; }
    .nav ul a {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      padding: 4px 7px; border: 1px solid var(--ink);
    }
    .nav .meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }

    /* ========= HERO ========= */
    .hero {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      border-bottom: 1px solid var(--ink);
    }
    .hero .num {
      font-family: var(--display);
      font-size: clamp(220px, 36vw, 540px);
      line-height: 0.78;
      letter-spacing: -0.07em;
      padding: 24px 0 0 22px;
      color: var(--ink);
      position: relative;
      overflow: visible;
    }
    .hero .num::after {
      content: '®';
      font-size: 0.18em; letter-spacing: 0; vertical-align: top;
      color: var(--hazard); margin-left: 6px;
    }
    .hero .meta-col {
      border-left: 1px solid var(--ink);
      padding: 22px;
      display: flex; flex-direction: column; gap: 22px;
      font-family: var(--mono);
    }
    .hero .meta-col h2 {
      font-family: var(--display); font-size: clamp(38px, 4.5vw, 64px); line-height: 0.9; letter-spacing: -0.03em;
      text-transform: uppercase; margin: 0;
    }
    .hero .meta-col p { font-family: var(--sans); font-size: 14px; line-height: 1.55; margin: 0; max-width: 38ch; text-align: justify; }
    .meta-row { display: grid; grid-template-columns: 8ch 1fr; gap: 12px; padding: 10px 0; border-top: 1px solid var(--ink); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; }
    .meta-row b { color: var(--hazard); font-weight: 500; }

    .ascii-frame {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      display: flex; align-items: center; gap: 10px;
      padding: 6px 0; color: var(--ink);
    }
    .ascii-frame::before { content: '['; color: var(--hazard); }
    .ascii-frame::after { content: ']'; color: var(--hazard); }

    /* ========= ABSTRACT / LEAD ========= */
    .abstract {
      padding: 56px 22px;
      display: grid;
      grid-template-columns: 8ch 1fr 30ch;
      gap: 32px;
      border-bottom: 1px solid var(--ink);
    }
    .abstract .label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hazard); padding-top: 6px; }
    .abstract .body {
      font-family: var(--sans); font-size: 22px; line-height: 1.4; letter-spacing: -0.012em;
      max-width: 50ch;
    }
    .abstract .body span.drop {
      font-family: var(--display); font-size: 64px; line-height: 0.85; float: left;
      margin: 4px 10px -4px 0; letter-spacing: -0.04em; text-transform: uppercase;
    }
    .abstract .credits { font-family: var(--mono); font-size: 10.5px; line-height: 1.7; text-transform: uppercase; letter-spacing: 0.1em; }
    .abstract .credits hr { margin: 8px 0; border: 0; border-top: 1px solid var(--ink); }
    .abstract .credits b { color: var(--hazard); font-weight: 500; }

    /* ========= MANIFEST (numbered theses) ========= */
    .manifest { padding: 56px 22px; border-bottom: 4px solid var(--ink); }
    .manifest h2 {
      font-family: var(--display);
      font-size: clamp(56px, 8vw, 120px);
      line-height: 0.86;
      letter-spacing: -0.05em;
      text-transform: uppercase;
      margin: 0 0 28px;
      max-width: 16ch;
    }
    .manifest h2 em { font-style: normal; color: var(--hazard); }
    .thesis-list { display: grid; grid-template-columns: 1fr; }
    .thesis {
      display: grid;
      grid-template-columns: 6ch 1fr 14ch;
      gap: 32px;
      padding: 22px 0;
      border-top: 1px solid var(--ink);
      align-items: baseline;
    }
    .thesis:last-child { border-bottom: 1px solid var(--ink); }
    .thesis .num {
      font-family: var(--display); font-size: 44px; line-height: 0.9; letter-spacing: -0.04em;
    }
    .thesis .num small { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; vertical-align: top; }
    .thesis h3 {
      font-family: var(--display); font-size: clamp(22px, 2.4vw, 32px); line-height: 1.05;
      letter-spacing: -0.025em; text-transform: uppercase; margin: 0 0 8px; max-width: 28ch;
    }
    .thesis p { margin: 0; font-size: 14px; line-height: 1.55; max-width: 56ch; color: var(--ink-soft); }
    .thesis .tag {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      text-align: right; color: var(--hazard);
    }

    /* ========= INDEX (1px grid) ========= */
    .index-section { border-bottom: 1px solid var(--ink); }
    .index-head {
      padding: 22px;
      display: flex; justify-content: space-between; align-items: baseline; gap: 24px;
      border-bottom: 1px solid var(--ink);
    }
    .index-head h2 { font-family: var(--display); font-size: clamp(28px, 3vw, 40px); letter-spacing: -0.03em; text-transform: uppercase; line-height: 1; margin: 0; }
    .index-head .meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    .index-grid {
      display: grid;
      grid-template-columns: 4ch 1.3fr 1fr 1fr 0.8fr 0.8fr;
      gap: 1px;
      background: var(--ink);
      font-family: var(--mono);
      font-size: 11.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .index-grid > div { background: var(--paper); padding: 12px 14px; }
    .index-grid .header { background: var(--ink); color: var(--paper); font-weight: 500; }
    .index-grid .right { text-align: right; }
    .index-grid .red { color: var(--hazard); }

    /* ========= SPECIMEN ========= */
    .specimen { border-bottom: 4px solid var(--ink); padding: 56px 22px; }
    .specimen-head { display: flex; justify-content: space-between; align-items: baseline; gap: 22px; margin-bottom: 22px; padding-bottom: 14px; border-bottom: 1px solid var(--ink); }
    .specimen-head h2 { font-family: var(--display); font-size: 28px; letter-spacing: -0.03em; text-transform: uppercase; margin: 0; line-height: 1; }
    .specimen-head .meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    .spec-row {
      display: grid;
      grid-template-columns: 12ch 1fr 12ch;
      align-items: baseline;
      gap: 22px;
      padding: 14px 0;
      border-bottom: 1px solid var(--ink);
    }
    .spec-row .label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hazard); }
    .spec-row .glyph { font-family: var(--display); letter-spacing: -0.04em; line-height: 0.95; text-transform: uppercase; }
    .spec-row .glyph.s1 { font-size: clamp(36px, 5vw, 64px); }
    .spec-row .glyph.s2 { font-size: clamp(60px, 9vw, 120px); }
    .spec-row .glyph.s3 { font-size: clamp(120px, 16vw, 220px); }
    .spec-row .stats { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; text-align: right; line-height: 1.6; }

    /* ========= ALERT BLOCK ========= */
    .alert {
      border-bottom: 1px solid var(--ink);
      padding: 22px;
      display: grid;
      grid-template-columns: 18ch 1fr;
      gap: 28px;
      background:
        repeating-linear-gradient(135deg, transparent 0 14px, rgba(230,25,25,0.06) 14px 28px);
    }
    .alert .label { font-family: var(--display); font-size: 28px; letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; color: var(--hazard); border: 2px solid var(--hazard); padding: 10px 12px; align-self: start; }
    .alert .body { font-family: var(--sans); font-size: 15.5px; line-height: 1.5; max-width: 64ch; }
    .alert .body strong { background: var(--ink); color: var(--paper); padding: 0 4px; font-weight: 500; }

    /* ========= COLOPHON ========= */
    .colophon {
      padding: 32px 22px 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      line-height: 1.85;
      border-top: 1px solid var(--ink);
    }
    .colophon dl { display: grid; grid-template-columns: 16ch 1fr; gap: 6px 16px; margin: 0; }
    .colophon dt { color: var(--hazard); }
    .colophon dd { margin: 0; }
    .colophon .credit { font-family: var(--display); font-size: 38px; letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; color: var(--ink); }
    .colophon .credit small { display: block; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; margin-top: 8px; color: var(--ink-soft); }

    /* ========= RESPONSIVE ========= */
    @media (max-width: 880px) {
      .strip { grid-template-columns: 1fr 1fr; gap: 8px 22px; }
      .strip > div:nth-child(n+5) { display: none; }
      .nav ul { display: none; }
      .hero { grid-template-columns: 1fr; }
      .hero .num { font-size: 36vw; }
      .hero .meta-col { border-left: none; border-top: 1px solid var(--ink); }
      .abstract { grid-template-columns: 1fr; }
      .thesis { grid-template-columns: 6ch 1fr; }
      .thesis .tag { display: none; }
      .index-grid { grid-template-columns: 4ch 1fr 1fr; font-size: 10px; }
      .index-grid > div:nth-child(6n+4),
      .index-grid > div:nth-child(6n+5),
      .index-grid > div:nth-child(6n) { display: none; }
      .alert { grid-template-columns: 1fr; }
      .colophon { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="strip">
    <div><b>VOL.</b><span>04 / FIELD UNIT</span></div>
    <div><b>ISS.</b><span>2026 · MAY · QRTLY</span></div>
    <div><b>BUILD</b><span>NEVOFLUX 4.0</span></div>
    <div><b>CHANNEL</b><span>STABLE</span></div>
    <div><b>STATUS</b><span class="red">⬤ AGENT ONLINE</span></div>
  </div>

  <header class="nav" data-od-id="topnav">
    <span class="brand">NEVOFLUX/FIELD/04<sup>® EST 2026</sup></span>
    <ul>
      <li><a href="#abstract">[ ABSTRACT ]</a></li>
      <li><a href="#manifest">[ MANIFEST ]</a></li>
      <li><a href="#index">[ INDEX ]</a></li>
      <li><a href="#specimen">[ SPECIMEN ]</a></li>
    </ul>
    <span class="meta">BUILD NO. <span class="red">04 / 0731</span></span>
  </header>

  <section class="hero" data-od-id="hero">
    <div class="num">04</div>
    <div class="meta-col">
      <span class="ascii-frame">AGENTIC RUNTIME · FOR THE WEB</span>
      <h2>An instrument for the&nbsp;agentic&nbsp;web<span class="red">.</span></h2>
      <p>NevoFlux Field Unit 04 is the quarterly release note: a browser that thinks. GBrain reads your sources, the agent acts across tabs, and Canvas turns a prompt into a running app. Issued to the stable channel — set in Archivo Black &amp; JetBrains Mono, measured twice before it ships.</p>
      <div>
        <div class="meta-row"><b>BROWSER</b><span>NEVOFLUX 4.0</span></div>
        <div class="meta-row"><b>KNOWLEDGE</b><span>GBRAIN · LOCAL INDEX</span></div>
        <div class="meta-row"><b>RUNTIME</b><span>AGENT SDK · TOOL-USE</span></div>
        <div class="meta-row"><b>CANVAS</b><span>PROMPT → APP · INSTANT</span></div>
        <div class="meta-row"><b>PACKS</b><span>2,400 / REGISTERED</span></div>
      </div>
    </div>
  </section>

  <section class="abstract" id="abstract" data-od-id="abstract">
    <div class="label">[ ABSTRACT ]<br>///</div>
    <div class="body">
      <span class="drop">T</span>he browser has stopped reading like a tool and started behaving like a teammate. NevoFlux 4.0 is a small, stubborn argument for that idea — practical, technical, and quietly aggressive: GBrain remembers your context, the agent does the clicking, and Canvas ships the app while you keep one line of thought.
    </div>
    <div class="credits">
      <hr>
      <b>SHIPPED BY</b><br>
      GBRAIN · KNOWLEDGE<br>
      AGENT · RUNTIME<br>
      CANVAS · APPS<br>
      SDK · TOOLS<br>
      PACKS · SKILLS<br>
      <hr>
      <b>FILED UNDER</b><br>
      Agent · Browser<br>
      Knowledge · Canvas<br>
      Infrastructure
    </div>
  </section>

  <section class="manifest" id="manifest" data-od-id="manifest">
    <h2>Six theses on a <em>thinking</em> browser<span class="red">.</span></h2>
    <div class="thesis-list">
      <div class="thesis">
        <div class="num">01<small>/06</small></div>
        <div>
          <h3>The tab is not a dead end. It is a workspace.</h3>
          <p>A user does not want forty open tabs. They want the agent to read across all of them, hold the context in GBrain, and hand back one answer they can trust longer than nine words.</p>
        </div>
        <div class="tag">>>> AGENT</div>
      </div>
      <div class="thesis">
        <div class="num">02<small>/06</small></div>
        <div>
          <h3>Memory is not a feature. It is the wage of attention.</h3>
          <p>Re-explain your project on every prompt and you pay in repetition. Let GBrain index your sources once and you pay in time, which is what you wanted back.</p>
        </div>
        <div class="tag">>>> GBRAIN</div>
      </div>
      <div class="thesis">
        <div class="num">03<small>/06</small></div>
        <div>
          <h3>If the model is not the strongest signal in the loop, the loop is wrong.</h3>
          <p>Buttons, panels, chrome — all answer to the agent. If the agent cannot finish the task on a 320-pixel screen at noon, neither can the rest of the product.</p>
        </div>
        <div class="tag">>>> RUNTIME</div>
      </div>
      <div class="thesis">
        <div class="num">04<small>/06</small></div>
        <div>
          <h3>A pack is a contract, not a costume.</h3>
          <p>A design pack either keeps the contract — typography, grid, tokens — or it breaks it once, deliberately, with the loudest component on the page. Drift through it and the output stops looking intentional.</p>
        </div>
        <div class="tag">>>> PACKS</div>
      </div>
      <div class="thesis">
        <div class="num">05<small>/06</small></div>
        <div>
          <h3>Canvas is a citation, not a chorus.</h3>
          <p>If a prompt must become an app, it must do so because the work calls it forth. A generated screen that nobody asked for is the equivalent of underlining every word.</p>
        </div>
        <div class="tag">>>> CANVAS</div>
      </div>
      <div class="thesis">
        <div class="num">06<small>/06</small></div>
        <div>
          <h3>The SDK is the only surface you are allowed to over-build.</h3>
          <p>Make the tool-use layer weigh something. Make it the thing the developer reaches for. Then leave the rest of the browser quiet.</p>
        </div>
        <div class="tag">>>> SDK</div>
      </div>
    </div>
  </section>

  <section class="index-section" id="index" data-od-id="index">
    <div class="index-head">
      <h2>Index of release 04 <span class="red">///</span></h2>
      <span class="meta">8 ENTRIES · BUILD 4.0 — 4.1</span>
    </div>
    <div class="index-grid">
      <div class="header">№</div><div class="header">FEATURE</div><div class="header">OWNER</div><div class="header">DEPT.</div><div class="header right">VER.</div><div class="header right">BUILD</div>

      <div>01</div><div>GBRAIN LOCAL INDEX</div><div>H. Naitō</div><div class="red">KNOW</div><div class="right">4.0</div><div class="right">12 MS</div>
      <div>02</div><div>AGENT TAB ORCHESTRATION</div><div>Q. Albrecht</div><div>AGENT</div><div class="right">4.0</div><div class="right">18 MS</div>
      <div>03</div><div>CANVAS PROMPT-TO-APP</div><div>M. Andrejević</div><div class="red">CANVAS</div><div class="right">4.0</div><div class="right">14 MS</div>
      <div>04</div><div>THE LATENCY DIET</div><div>P. Nwachukwu</div><div>INFRA</div><div class="right">4.0</div><div class="right">22 MS</div>
      <div>05</div><div>DESIGN PACK TOKENS</div><div>L. Arroyave</div><div class="red">PACKS</div><div class="right">4.0</div><div class="right">11 MS</div>
      <div>06</div><div>TOOL-USE SDK</div><div>Q. Albrecht</div><div>SDK</div><div class="right">4.1</div><div class="right">19 MS</div>
      <div>07</div><div>SKILL REGISTRY</div><div>H. Naitō</div><div class="red">PACKS</div><div class="right">4.1</div><div class="right">7 MS</div>
      <div>08</div><div>OFFLINE RECALL, QUIETLY</div><div>L. Arroyave</div><div class="red">KNOW</div><div class="right">4.1</div><div class="right">15 MS</div>
    </div>
  </section>

  <section class="specimen" id="specimen" data-od-id="specimen">
    <div class="specimen-head">
      <h2>Specimen ///</h2>
      <span class="meta">ARCHIVO BLACK · 1 STYLE · 1 WEIGHT</span>
    </div>
    <div class="spec-row">
      <span class="label">36 / 64</span>
      <div class="glyph s1">A QUIET BROWSER IS A LOUD AGENT.</div>
      <div class="stats">tracking −0.04em<br>leading 0.95<br>case upper</div>
    </div>
    <div class="spec-row">
      <span class="label">60 / 120</span>
      <div class="glyph s2">PROMPT THE WEB.</div>
      <div class="stats">tracking −0.05em<br>leading 0.88<br>case upper</div>
    </div>
    <div class="spec-row">
      <span class="label">120 / 220</span>
      <div class="glyph s3">04®</div>
      <div class="stats">tracking −0.06em<br>leading 0.78<br>register glyph</div>
    </div>
  </section>

  <section class="alert" data-od-id="alert">
    <div class="label">!! GET<br>NEVOFLUX 04</div>
    <div class="body">
      NevoFlux 4.0 rolls to the stable channel on <strong>14 JUNE 2026</strong>. Install the browser <strong>free / forever</strong>, or join the Pro ring with full GBrain indexing at <strong>$60 / year</strong>. Pro includes unlimited Canvas apps, the agent SDK with tool-use, every design pack rendered to the same token grid, and offline recall of your whole GBrain. <span class="red">>>> DOWNLOAD · SHIP 14.JUN</span>
    </div>
  </section>

  <footer class="colophon" data-od-id="colophon">
    <dl>
      <dt>SET IN</dt><dd>Archivo Black · JetBrains Mono · Archivo</dd>
      <dt>BROWSER</dt><dd>NevoFlux 4.0 · stable channel</dd>
      <dt>KNOWLEDGE</dt><dd>GBrain local index · offline recall</dd>
      <dt>RUNTIME</dt><dd>Agent SDK · tool-use · 32 tools</dd>
      <dt>PACKS</dt><dd>2,400 registered · 14 design skills</dd>
      <dt>RIGHTS</dt><dd>CC BY-NC-ND 4.0 · except pack authors</dd>
    </dl>
    <div>
      <div class="credit">NEVOFLUX&nbsp;04<small>® / BUILD 2026 · BORDEAUX · FR / © NEVOFLUX EDITIONS</small></div>
    </div>
  </footer>
</body>
</html>
```

## Usage

- `.strip` — top register strip of meta fields: swap in build / channel / status values; the last cell carries the red status dot.
- `.nav` — brand wordmark plus monospace nav links and a build number. Keep it to four section anchors.
- `.hero` — left cell is one viewport-bleeding numeral; the right meta column holds the headline, lead paragraph, and a stack of `.meta-row` label/value pairs (BROWSER, KNOWLEDGE, RUNTIME, CANVAS, PACKS).
- `.abstract` — lead paragraph with a `.drop` cap, plus a monospace credits rail (SHIPPED BY / FILED UNDER).
- `.manifest` — six numbered theses; each is a `.num` / heading+body / `.tag` triplet. Keep theses short and declarative.
- `.index-section` — a 1px-grid table. Columns: №, FEATURE, OWNER, DEPT., VER., BUILD. Use `.red` on the dept cell for emphasis.
- `.specimen` — type specimen showing the display face at three sizes; the third row is the register glyph.
- `.alert` — hatched hazard call-to-action; bold spans invert to ink. End with a red `>>>` action line.
- `.colophon` — a definition list of credits plus the large display credit block.
