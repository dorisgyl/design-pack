---
slug: packs/design-pack/templates/wireframe-sketch
type: template
lang: en
category: prototype
title: "Wireframe Sketch"
title_zh: "手绘线框图"
description: "A lo-fi, hand-drawn wireframe board for exploring NevoFlux screen layouts before pixel-perfect design."
tags: [wireframe, lo-fi, sketch, 草稿, 手绘, template]
sample_image: packs/design-pack/assets/templates/wireframe-sketch.svg
source: html-anything/wireframe-sketch
---
## Design guidance

Template: Hand-drawn Wireframe.

Intent: whiteboard / pre-draft wireframe exploration. Use it for the early stage when you are sketching screen ideas and comparing variants, before committing to high-fidelity design.

Layout:
- Graph-paper background.
- Multiple tab labels (variant tabs across the top).
- Scribbled chart placeholders with hatched fills.
- Sticky-note annotations (yellow, rotated just slightly).

Design details:
- Fonts: Caveat / Architects Daughter (or Patrick Hand) — handwritten, not crisp.
- Do not align everything perfectly; keep a loose, hand-placed feel with gentle rotations.
- Keep fidelity low: boxes, scribbles, and notes stand in for real components.

## Template (HTML)
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux Studio — Wireframe v0.1</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Patrick+Hand&family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --paper: #fbf6ec;
      --paper-tint: #f5eedf;
      --ink: #2b2620;
      --pencil: #4d473d;
      --rule: #c8bfa9;
      --grid: #e3d8b8;
      --accent: #d8482b;
      --highlight: #f9d27c;
      --note-yellow: #fff19a;
      --note-pink: #ffd5c9;
      --serif: 'DM Serif Display', 'Iowan Old Style', Georgia, serif;
      --hand: 'Patrick Hand', 'Caveat', cursive;
      --hand-bold: 'Caveat', 'Patrick Hand', cursive;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      background:
        radial-gradient(circle, rgba(43,38,32,0.04) 1px, transparent 1.4px) 0 0 / 22px 22px,
        var(--paper);
      font: 16px/1.5 var(--hand);
    }
    .page { padding: 32px 48px 56px; max-width: 1320px; margin: 0 auto; }

    .head { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: end; padding-bottom: 14px; border-bottom: 2px solid var(--ink); }
    .head h1 { font: 800 56px/1 var(--serif); margin: 0; letter-spacing: -0.005em; display: flex; align-items: center; gap: 18px; }
    .head h1 em { font-style: italic; }
    .pin { display: inline-flex; align-items: center; gap: 8px; font: 12px/1 var(--mono); padding: 6px 10px; border: 1.5px dashed var(--accent); color: var(--accent); transform: rotate(-2.2deg); letter-spacing: 0.18em; background: var(--paper); }
    .pin .x { width: 6px; height: 6px; background: var(--accent); transform: rotate(45deg); }
    .head .sub { font: 18px/1.4 var(--hand); color: var(--pencil); }
    .head .meta { font: 11px/1.4 var(--mono); color: var(--pencil); letter-spacing: 0.14em; text-align: right; text-transform: uppercase; }
    .head .meta b { color: var(--ink); }

    .tabs { display: flex; gap: 8px; padding: 18px 0 12px; flex-wrap: wrap; }
    .tab { font: 16px/1 var(--hand); padding: 10px 14px; display: inline-flex; align-items: center; gap: 8px; color: var(--pencil); position: relative; transform: rotate(-0.4deg); }
    .tab .num { font: 11px/1 var(--mono); color: var(--pencil); padding: 4px 6px; border: 1.5px solid var(--pencil); letter-spacing: 0.06em; }
    .tab.active { color: var(--ink); }
    .tab.active::before { content: ''; position: absolute; left: -2px; right: -2px; top: 4px; bottom: 6px; background: var(--highlight); transform: skew(-8deg); z-index: -1; opacity: 0.85; }
    .tab.active .num { border-color: var(--ink); color: var(--ink); }
    .tab .glyph { width: 14px; height: 14px; border: 1.5px solid currentColor; display: inline-block; }

    .canvas {
      position: relative;
      background:
        repeating-linear-gradient(0deg, var(--grid) 0 1px, transparent 1px 24px),
        repeating-linear-gradient(90deg, var(--grid) 0 1px, transparent 1px 24px),
        var(--paper-tint);
      border: 3px solid var(--ink);
      border-radius: 14px;
      padding: 26px 26px 32px;
      box-shadow: 6px 8px 0 -4px rgba(43,38,32,0.18);
    }
    .canvas .section-label { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .canvas h2 { font: 800 30px/1 var(--serif); margin: 0; }
    .canvas .pill { font: 12px/1 var(--mono); padding: 5px 9px; border: 1.5px solid var(--pencil); border-radius: 999px; color: var(--pencil); letter-spacing: 0.12em; transform: rotate(1.2deg); }
    .canvas .lede { font: 17px/1.5 var(--hand); color: var(--pencil); margin: 0 0 18px; max-width: 70ch; }

    .browser { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border: 2px solid var(--pencil); border-radius: 999px; background: var(--paper); margin-bottom: 16px; }
    .browser .dots { display: flex; gap: 6px; }
    .browser .dots span { width: 11px; height: 11px; border-radius: 50%; border: 1.5px solid var(--pencil); }
    .browser .url { flex: 1; font: 14px/1 var(--hand); color: var(--pencil); }
    .browser .user { font: 14px/1 var(--hand); color: var(--pencil); }

    .layout { display: grid; grid-template-columns: 200px 1fr; gap: 22px; }
    aside.nav { padding: 10px 0; }
    aside.nav .brand { font: 800 28px/1 var(--serif); font-style: italic; padding: 4px 6px; border-bottom: 2px solid var(--ink); display: inline-block; margin-bottom: 18px; }
    aside.nav ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
    aside.nav li { font: 17px/1.2 var(--hand); display: flex; align-items: center; gap: 10px; padding: 6px 6px; position: relative; }
    aside.nav li .square { width: 14px; height: 14px; border: 1.5px solid var(--pencil); display: inline-block; flex-shrink: 0; }
    aside.nav li.active { color: var(--ink); }
    aside.nav li.active::before {
      content: ''; position: absolute; left: -4px; right: -8px; top: 4px; bottom: 6px;
      background: var(--highlight); opacity: 0.6; transform: skew(-6deg); z-index: -1;
    }

    .greeting { font: 14px/1.4 var(--hand); color: var(--pencil); }
    .name { font: 800 28px/1 var(--serif); font-style: italic; margin: 2px 0 4px; }
    .toggle-row { display: inline-flex; gap: 6px; padding: 4px; border: 1.5px solid var(--pencil); border-radius: 999px; }
    .toggle-row .tag { font: 13px/1 var(--hand); padding: 6px 10px; border-radius: 999px; color: var(--pencil); }
    .toggle-row .tag.active { background: var(--highlight); color: var(--ink); }

    .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 16px 0; }
    .kpi { border: 2px solid var(--pencil); border-radius: 10px; padding: 14px; background: var(--paper); position: relative; }
    .kpi .label { font: 13px/1 var(--mono); color: var(--pencil); letter-spacing: 0.14em; text-transform: uppercase; }
    .kpi .value { font: 800 44px/1 var(--serif); margin-top: 8px; color: var(--accent); }
    .kpi .value.ink { color: var(--ink); }
    .kpi .small { font: 12px/1.4 var(--hand); color: var(--pencil); margin-top: 6px; }
    .kpi.tilt-1 { transform: rotate(-0.6deg); }
    .kpi.tilt-2 { transform: rotate(0.4deg); }
    .kpi.tilt-3 { transform: rotate(-0.2deg); }
    .kpi.tilt-4 { transform: rotate(0.7deg); }

    .panels { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
    .panel { border: 2px solid var(--pencil); border-radius: 10px; padding: 14px; background: var(--paper); position: relative; }
    .panel h3 { font: 700 16px/1 var(--mono); letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 14px; color: var(--pencil); display: flex; align-items: center; gap: 8px; }
    .panel h3 .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); }
    .panel svg.scribble { width: 100%; height: 160px; display: block; }

    .sticky {
      position: absolute;
      padding: 10px 12px;
      font: 16px/1.3 var(--hand);
      box-shadow: 4px 6px 0 -2px rgba(43,38,32,0.18);
      max-width: 220px;
    }
    .sticky.sn1 { top: 20px; right: 30px; background: var(--note-yellow); transform: rotate(2.4deg); }
    .sticky.sn2 { top: 380px; right: 90px; background: var(--note-pink); transform: rotate(-3.2deg); }
    .sticky .tape { position: absolute; top: -10px; left: 30px; width: 70px; height: 18px; background: rgba(43,38,32,0.18); transform: rotate(-4deg); }
    .sticky b { font-family: var(--hand-bold); font-weight: 700; }

    .events { padding: 12px 14px; border: 2px dashed var(--pencil); border-radius: 10px; margin-top: 14px; background: var(--paper); }
    .events .label { font: 13px/1 var(--mono); letter-spacing: 0.14em; color: var(--accent); text-transform: uppercase; margin-bottom: 6px; }
    .events .lines span { display: block; height: 8px; background: var(--pencil); opacity: 0.18; border-radius: 4px; margin: 6px 0; }
    .events .lines span:nth-child(1) { width: 80%; }
    .events .lines span:nth-child(2) { width: 60%; }
    .events .lines span:nth-child(3) { width: 70%; }

    .next-step { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 2px solid var(--accent); border-radius: 10px; background: var(--paper); margin-top: 14px; }
    .next-step .head { font: 13px/1 var(--mono); letter-spacing: 0.16em; color: var(--accent); text-transform: uppercase; }
    .next-step ul { padding: 0 0 0 18px; margin: 6px 0 0; font: 15px/1.4 var(--hand); color: var(--ink); }

    @media (max-width: 1000px) {
      .layout { grid-template-columns: 1fr; }
      .kpis { grid-template-columns: 1fr 1fr; }
      .panels { grid-template-columns: 1fr; }
      .sticky.sn1 { display: none; }
      .sticky.sn2 { display: none; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="head" data-od-id="head">
      <h1><em>NevoFlux · Studio</em>
        <span class="pin"><span class="x"></span>WIREFRAME v0.1</span>
      </h1>
      <div class="sub">Home canvas layout exploration — 4 variants + a re-tidy of the current screen</div>
      <div class="meta"><b>DATE</b> 2026-06-13 · <b>DEVICE</b> DESKTOP 1440 · <b>FIDELITY</b> LOW</div>
    </div>

    <div class="tabs" data-od-id="tabs">
      <div class="tab"><span class="glyph"></span><span class="num">00</span>ALL</div>
      <div class="tab"><span class="glyph"></span><span class="num">01</span>A · Tidy (current screen base)</div>
      <div class="tab active"><span class="glyph"></span><span class="num">02</span>B · Dashboard (KPI)</div>
      <div class="tab"><span class="glyph"></span><span class="num">03</span>C · Timeline (next renders)</div>
      <div class="tab"><span class="glyph"></span><span class="num">04</span>D · Hands-on building</div>
    </div>

    <div class="canvas" data-od-id="canvas">
      <div class="section-label">
        <h2>B · Dashboard</h2>
        <span class="pill">DATA-FORWARD</span>
      </div>
      <p class="lede">KPIs at the very top. "Where am I right now" at a glance → details scroll below.</p>

      <div class="browser" data-od-id="browser"><div class="dots"><span></span><span></span><span></span></div><div class="url">app.nevoflux.dev / studio / dashboard</div><div class="user">sam.builder</div></div>

      <div class="layout">
        <aside class="nav" data-od-id="sidebar">
          <span class="brand">NevoFlux</span>
          <ul>
            <li class="active"><span class="square"></span>Dashboard</li>
            <li><span class="square"></span>GBrain</li>
            <li><span class="square"></span>Canvas apps</li>
            <li><span class="square"></span>Packs</li>
            <li><span class="square"></span>Agent &amp; SDK</li>
          </ul>
        </aside>

        <div data-od-id="main">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;">
            <div>
              <div class="greeting">Welcome back</div>
              <div class="name">sam.builder <span style="font-size:18px;color:var(--pencil);">workspace</span></div>
            </div>
            <div class="toggle-row">
              <span class="tag">Week</span>
              <span class="tag active">Month</span>
              <span class="tag">All time</span>
            </div>
          </div>

          <div class="kpis" data-od-id="kpis">
            <div class="kpi tilt-1"><div class="label">Plan tier</div><div class="value">Pro</div><div class="small">Studio plan</div></div>
            <div class="kpi tilt-2"><div class="label">GBrain docs</div><div class="value ink" style="color:#3b6e8e;">312</div><div class="small">↑ +28 vs last month</div></div>
            <div class="kpi tilt-3"><div class="label">Next render</div><div class="value">1 day</div><div class="small">06/14 10:00</div></div>
            <div class="kpi tilt-4"><div class="label">Pack coverage</div><div class="value ink" style="color:#3b6e8e;">62%</div><div class="small">▰▰▰▰▰▱▱▱</div></div>
          </div>

          <div class="panels" data-od-id="panels">
            <div class="panel" data-od-id="chart">
              <h3><span class="dot"></span>CHART · Renders per week</h3>
              <svg class="scribble" viewBox="0 0 480 160" aria-hidden="true">
                <path d="M 14 142 L 460 142" stroke="#4d473d" stroke-width="1.6" fill="none"/>
                <path d="M 14 14 L 14 142" stroke="#4d473d" stroke-width="1.6" fill="none"/>
                <path d="M 18 110 C 80 96, 130 102, 180 92 S 280 60, 340 50 S 440 32, 460 22"
                  stroke="#d8482b" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="80" cy="98" r="4" fill="#d8482b"/>
                <circle cx="200" cy="86" r="4" fill="#d8482b"/>
                <circle cx="320" cy="56" r="4" fill="#d8482b"/>
                <circle cx="440" cy="28" r="4" fill="#d8482b"/>
              </svg>
            </div>
            <div class="panel" data-od-id="bars">
              <h3><span class="dot"></span>USAGE · By surface</h3>
              <svg class="scribble" viewBox="0 0 320 160" aria-hidden="true">
                <defs>
                  <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#2b2620" stroke-width="1.6"/>
                  </pattern>
                </defs>
                <path d="M 14 142 L 306 142" stroke="#4d473d" stroke-width="1.6" fill="none"/>
                <rect x="30" y="60" width="38" height="82" fill="url(#hatch)" stroke="#2b2620" stroke-width="1.4"/>
                <rect x="86" y="38" width="38" height="104" fill="url(#hatch)" stroke="#2b2620" stroke-width="1.4"/>
                <rect x="142" y="78" width="38" height="64" fill="url(#hatch)" stroke="#2b2620" stroke-width="1.4"/>
                <rect x="198" y="22" width="38" height="120" fill="url(#hatch)" stroke="#2b2620" stroke-width="1.4"/>
                <rect x="254" y="50" width="38" height="92" fill="url(#hatch)" stroke="#2b2620" stroke-width="1.4"/>
                <text x="14" y="158" font-family="IBM Plex Mono, monospace" font-size="11" fill="#4d473d">Browser / GBrain / Canvas / Packs / SDK</text>
              </svg>
            </div>
          </div>

          <div class="events" data-od-id="events">
            <div class="label">📣 Updates (latest 3)</div>
            <div class="lines"><span></span><span></span><span></span></div>
          </div>

          <div class="next-step" data-od-id="next-step">
            <div class="head">● NEXT STEP / what to do next</div>
            <ul>
              <li>Connect a GBrain source to finish setup</li>
              <li>Try the "dashboard" pack on 10 sample docs</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sticky sn1" data-od-id="sticky-1"><div class="tape"></div>Make it the screen you want to open on day one</div>
      <div class="sticky sn2" data-od-id="sticky-2"><div class="tape"></div><b>page-1 / 5</b><br/>Keep the whitespace breezy.<br/>Density ≈ variant B.</div>
    </div>
  </div>
</body>
</html>
```

## Usage

- Header (`.head`): left is the project title with a dashed `.pin` status chip (e.g. WIREFRAME v0.1); center `.sub` is a one-line goal; right `.meta` holds DATE / DEVICE / FIDELITY tokens.
- Variant tabs (`.tabs`): one `.tab` per layout option; the `.active` tab gets the highlighter swipe. Renumber the `.num` chips as you add or drop variants.
- Canvas (`.canvas`): the graph-paper board for one variant. `h2` + `.pill` name the variant; `.lede` states its idea in a sentence.
- Browser bar (`.browser`): fake address (`.url`) and signed-in user (`.user`).
- Sidebar (`aside.nav`): `.brand` plus the product nav; mark the current screen `li.active`.
- KPI row (`.kpis`): four `.kpi` cards, each with `.label`, `.value` (add `.ink` for a non-accent number), and a `.small` caption. The `.tilt-*` classes give each card a slight rotation.
- Panels (`.panels`): two scribble placeholders — a line `CHART` and a hatched-bar `USAGE` SVG. Relabel the `h3` and adjust the SVG paths/bars to taste.
- `.events` is a dashed "updates" stub with grey filler lines; `.next-step` is the red call-to-action list of next actions.
- Sticky notes (`.sticky.sn1` / `.sn2`): yellow and pink annotations with tape; keep them short and slightly rotated. They hide below 1000px.
