---
slug: packs/design-pack/templates/finance-report
type: template
lang: en
category: finance
title: "NevoFlux Quarterly Report"
title_zh: "季度财报"
description: "A single-page financial-style report: masthead, hero KPIs, revenue/cost charts, a P&L summary table, top accounts, and an outlook."
tags: [financial, p&l, mrr, 财报, template]
sample_image: packs/design-pack/assets/templates/finance-report.svg
source: html-anything/finance-report
---

## Design guidance

A finance-oriented single-page report that pairs hard numbers and charts with short written insight. Intent: a polished, print-like quarterly report viewed on desktop (long page).

Layout, top to bottom:

- **Masthead**: company name, quarter, and report title on the left; a status badge (e.g. Confidential) on the right. Separated from the body by a heavy bottom rule.
- **Lede paragraph**: one muted summary sentence framing the quarter.
- **Hero KPIs**: a strip of 4 KPI cards. Each card carries an uppercase mono label, a large serif value, and a colored delta line (green up / red down / muted flat).
- **Charts row**: a wide revenue chart (inline SVG area + trend line, plus a dashed plan line) beside a narrower operating-cost panel built from labeled horizontal bars.
- **P&L summary table**: zebra-friendly table with a mono numeric alignment, per-period columns, colored QoQ / YoY deltas, and a bold totals row separated by a heavy top border.
- **Top accounts table**: customer rows with a gradient logo chip, plan, region, ARR, and a colored status pill (green / amber / red).
- **Outlook**: a two-column block — a large pull-quote on the left, a CFO sign-off paragraph with guidance on the right.
- **Footer**: mono, uppercase confidentiality line plus a page marker.

Design details:

- Warm paper background with a white report card, thin neutral borders, and a soft drop shadow.
- One teal accent color used for the chart stroke, bar fills, accent text, and the logo gradient; everything else is a neutral ink/muted scale.
- A serif display face for headings, company name, and KPI values; a system sans for body; a monospace face for labels, numbers, and meta.
- Charts are placeholder inline SVG (area + polylines) and CSS bars so the page stays fully self-contained with no external assets.
- Tables use light row borders, uppercase mono column headers, right-aligned mono numbers, and small status pills.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux — Q3 Product Report</title>
<style>
  :root {
    --bg: #f7f6f2;
    --paper: #ffffff;
    --ink: #11141a;
    --muted: #5f6573;
    --line: #e6e3dd;
    --line-strong: #c8c2b6;
    --accent: #1f6e8c;
    --accent-soft: #e7f0f4;
    --positive: #1f8c5c;
    --negative: #b13b3b;
    --display: 'Iowan Old Style', 'Charter', 'Iowan', Georgia, serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    font-size: 14px;
    line-height: 1.55;
  }
  .page {
    max-width: 980px;
    margin: 32px auto;
    padding: 56px 64px;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 24px 60px rgba(28,27,26,0.06);
  }
  header.masthead { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 18px; border-bottom: 2px solid var(--ink); margin-bottom: 28px; }
  .mast-left { display: flex; flex-direction: column; gap: 6px; }
  .mast-co { font-family: var(--display); font-size: 32px; letter-spacing: -0.01em; font-weight: 700; }
  .mast-meta { font-family: var(--mono); font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .mast-badge {
    font-family: var(--mono); font-size: 11px; padding: 5px 10px; border-radius: 4px;
    border: 1px solid var(--ink); color: var(--ink); text-transform: uppercase; letter-spacing: 0.08em;
  }

  h2 { font-family: var(--display); font-size: 19px; margin: 36px 0 14px; letter-spacing: -0.005em; font-weight: 700; }
  h2 .accent { color: var(--accent); }
  .lede { color: var(--muted); max-width: 64ch; }

  /* KPI strip */
  .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 8px 0 28px; }
  .kpi { padding: 16px 18px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .kpi .label { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
  .kpi .value { font-family: var(--display); font-size: 28px; font-weight: 700; margin-top: 6px; line-height: 1; letter-spacing: -0.01em; }
  .kpi .delta { font-family: var(--mono); font-size: 11.5px; margin-top: 6px; }
  .delta.up { color: var(--positive); }
  .delta.down { color: var(--negative); }
  .delta.flat { color: var(--muted); }

  /* Charts */
  .chart-row { display: grid; grid-template-columns: 1.6fr 1fr; gap: 14px; }
  .card { padding: 18px 20px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .card h3 { margin: 0 0 4px; font-size: 14px; font-weight: 600; }
  .card .sub { font-size: 12px; color: var(--muted); }
  .chart svg { width: 100%; height: 200px; display: block; margin-top: 8px; }
  .legend { display: flex; gap: 14px; font-size: 11.5px; color: var(--muted); margin-top: 6px; }
  .legend .swatch { display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 6px; vertical-align: middle; }
  .legend .a { background: var(--accent); }
  .legend .b { background: var(--ink); opacity: 0.6; }

  /* Bars */
  .bars { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
  .bar-row { display: grid; grid-template-columns: 110px 1fr 60px; gap: 10px; align-items: center; font-size: 12.5px; }
  .bar-row .label { color: var(--muted); }
  .bar-track { background: var(--accent-soft); border-radius: 4px; height: 10px; position: relative; overflow: hidden; }
  .bar-fill { background: var(--accent); height: 100%; border-radius: 4px; }
  .bar-value { font-family: var(--mono); font-size: 11.5px; text-align: right; color: var(--ink); }

  /* Tables */
  table { width: 100%; border-collapse: collapse; margin-top: 6px; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); font-size: 13px; vertical-align: middle; }
  th { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); border-bottom: 1px solid var(--line-strong); }
  td.num, th.num { text-align: right; font-family: var(--mono); }
  tr.total td { font-weight: 700; border-top: 2px solid var(--ink); border-bottom: none; padding-top: 14px; }
  .badge { display: inline-block; padding: 2px 8px; font-size: 11px; border-radius: 999px; font-weight: 500; }
  .badge.green { background: #e7f4ee; color: var(--positive); }
  .badge.amber { background: #fbf0d6; color: #8a6912; }
  .badge.red { background: #f7e1e1; color: var(--negative); }
  .logo { display: inline-flex; width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg, var(--accent), #2c98c5); margin-right: 10px; vertical-align: middle; }

  /* Outlook */
  .outlook { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
  .outlook .quote { padding: 18px; background: var(--accent-soft); border-left: 3px solid var(--accent); border-radius: 6px; font-family: var(--display); font-size: 16px; line-height: 1.5; }
  .outlook .signoff { font-size: 13px; color: var(--muted); }
  .outlook .signoff strong { color: var(--ink); display: block; font-family: var(--display); font-size: 16px; margin-bottom: 2px; }
  footer { margin-top: 40px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

  @media (max-width: 760px) {
    .page { padding: 32px 24px; margin: 0; border-radius: 0; }
    .kpis { grid-template-columns: 1fr 1fr; }
    .chart-row { grid-template-columns: 1fr; }
    .outlook { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<div class="page">
  <header class="masthead">
    <div class="mast-left">
      <div class="mast-meta">NevoFlux · Q3 FY25</div>
      <div class="mast-co">Quarterly Product Report</div>
      <div class="mast-meta">Prepared by Product Ops · Issued 14 October 2025</div>
    </div>
    <div class="mast-badge">Internal</div>
  </header>

  <p class="lede">Q3 closed ahead of plan on adoption and engagement. The NevoFlux browser passed 8.4M monthly active sessions, GBrain knowledge bases grew faster than ever, and Canvas apps shipped by the community more than doubled. SMB activation remains the watch item heading into Q4.</p>

  <h2>Headline KPIs</h2>
  <div class="kpis">
    <div class="kpi">
      <div class="label">Monthly active sessions</div>
      <div class="value">8.42M</div>
      <div class="delta up">▲ 14.6% QoQ</div>
    </div>
    <div class="kpi">
      <div class="label">New GBrain bases</div>
      <div class="value">184k</div>
      <div class="delta up">▲ 22.0% QoQ</div>
    </div>
    <div class="kpi">
      <div class="label">Agent task success</div>
      <div class="value">82%</div>
      <div class="delta up">▲ 3 pp YoY</div>
    </div>
    <div class="kpi">
      <div class="label">Canvas apps shipped</div>
      <div class="value">27k</div>
      <div class="delta up">▲ 4k QoQ</div>
    </div>
  </div>

  <h2>Adoption & usage</h2>
  <div class="chart-row">
    <div class="card">
      <h3>Active sessions · trailing 12 months</h3>
      <div class="sub">Millions, monthly</div>
      <div class="chart">
        <svg viewBox="0 0 720 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.32"/>
              <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polygon fill="url(#lg)" points="20,180 20,150 80,140 140,128 200,118 260,110 320,98 380,92 440,80 500,72 560,60 620,52 680,40 700,40 700,180" />
          <polyline fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"
            points="20,150 80,140 140,128 200,118 260,110 320,98 380,92 440,80 500,72 560,60 620,52 680,40" />
          <polyline fill="none" stroke="#11141a" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="3 3"
            points="20,165 80,158 140,150 200,142 260,134 320,128 380,122 440,116 500,108 560,102 620,96 680,90" />
          <circle cx="680" cy="40" r="3.5" fill="var(--accent)"/>
        </svg>
        <div class="legend">
          <span><span class="swatch a"></span>Active sessions</span>
          <span><span class="swatch b"></span>Plan</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Where usage goes</h3>
      <div class="sub">Sessions share, Q3</div>
      <div class="bars">
        <div class="bar-row"><span class="label">GBrain</span><div class="bar-track"><div class="bar-fill" style="width: 78%"></div></div><span class="bar-value">3.1M</span></div>
        <div class="bar-row"><span class="label">Canvas apps</span><div class="bar-track"><div class="bar-fill" style="width: 60%"></div></div><span class="bar-value">2.4M</span></div>
        <div class="bar-row"><span class="label">Agent / SDK</span><div class="bar-track"><div class="bar-fill" style="width: 36%"></div></div><span class="bar-value">1.4M</span></div>
        <div class="bar-row"><span class="label">Packs</span><div class="bar-track"><div class="bar-fill" style="width: 28%"></div></div><span class="bar-value">1.1M</span></div>
        <div class="bar-row"><span class="label">Design skills</span><div class="bar-track"><div class="bar-fill" style="width: 18%"></div></div><span class="bar-value">680k</span></div>
      </div>
    </div>
  </div>

  <h2>Engagement summary</h2>
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th class="num">Q3 FY25</th>
        <th class="num">Q2 FY25</th>
        <th class="num">Δ QoQ</th>
        <th class="num">Q3 FY24</th>
        <th class="num">Δ YoY</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Monthly active sessions</td><td class="num">8.42M</td><td class="num">7.34M</td><td class="num" style="color: var(--positive);">+14.6%</td><td class="num">5.92M</td><td class="num" style="color: var(--positive);">+42.2%</td></tr>
      <tr><td>GBrain queries / session</td><td class="num">11.5</td><td class="num">10.2</td><td class="num" style="color: var(--positive);">+12.7%</td><td class="num">8.1</td><td class="num" style="color: var(--positive);">+42.0%</td></tr>
      <tr><td>Canvas apps shipped</td><td class="num">27.0k</td><td class="num">23.0k</td><td class="num" style="color: var(--positive);">+17.5%</td><td class="num">18.5k</td><td class="num" style="color: var(--positive);">+45.8%</td></tr>
      <tr><td>Agent runs / week</td><td class="num">4.02M</td><td class="num">3.18M</td><td class="num" style="color: var(--positive);">+26.4%</td><td class="num">2.66M</td><td class="num" style="color: var(--positive);">+51.1%</td></tr>
      <tr class="total"><td>Daily active developers</td><td class="num">289k</td><td class="num">170k</td><td class="num" style="color: var(--positive);">+70.0%</td><td class="num">108k</td><td class="num" style="color: var(--positive);">+167.5%</td></tr>
    </tbody>
  </table>

  <h2>Top workspaces</h2>
  <table>
    <thead>
      <tr>
        <th>Workspace</th>
        <th>Plan</th>
        <th>Region</th>
        <th class="num">Active seats</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><span class="logo"></span>Pioneer Robotics</td><td>Enterprise</td><td>EMEA</td><td class="num">612</td><td><span class="badge green">Renewed</span></td></tr>
      <tr><td><span class="logo"></span>Atlas Cooperative</td><td>Enterprise</td><td>APAC</td><td class="num">486</td><td><span class="badge green">Expanded</span></td></tr>
      <tr><td><span class="logo"></span>Foundry Group</td><td>Team Plus</td><td>NA</td><td class="num">320</td><td><span class="badge amber">In renewal</span></td></tr>
      <tr><td><span class="logo"></span>Voltage Co.</td><td>Enterprise</td><td>NA</td><td class="num">298</td><td><span class="badge green">Renewed</span></td></tr>
      <tr><td><span class="logo"></span>Lattice Health</td><td>Team Plus</td><td>EMEA</td><td class="num">214</td><td><span class="badge red">At risk</span></td></tr>
    </tbody>
  </table>

  <h2>Outlook · Q4</h2>
  <div class="outlook">
    <div class="quote">"We're entering Q4 with the strongest roadmap of the year — GBrain multi-base linking, native Canvas sharing, and an open agent SDK — and the team to ship it without slowing down."</div>
    <div class="signoff">
      <strong>Mira Okafor, Head of Product</strong>
      We expect 9.1–9.4M monthly active sessions, 200–220k new GBrain bases, and agent task success holding above 80%. The two open items are SMB activation (we'll publish an onboarding revamp with the November update) and the EMEA edge rollout, which moves to GA in mid-November.
    </div>
  </div>

  <footer>
    <span>NevoFlux · Q3 FY25 · Internal use only</span>
    <span>Page 1 of 1</span>
  </footer>
</div>
</body>
</html>
```

## Usage

Fill these slots, keeping the structure and classes intact:

- **Masthead** (`.masthead`): set the product/team name, the quarter (`Q3 FY25`), the report title, the prepared-by/issued line, and the right-hand badge (`Internal`, `Confidential`, `Draft`).
- **Lede** (`.lede`): one sentence summarizing the quarter and naming the watch item.
- **Hero KPIs** (`.kpis` / `.kpi`): four cards, each an uppercase `label`, a big `value`, and a `delta` (`up` / `down` / `flat`) — change the arrow and color class to match direction.
- **Adoption chart** (`.chart svg`): edit the `points` on the area `polygon`, the solid `polyline` (actual), and the dashed `polyline` (plan); update the legend labels.
- **Usage bars** (`.bars` / `.bar-row`): one row per area; set `bar-fill` `width:%` and the `bar-value` number.
- **Engagement table**: one row per metric across period columns; color each delta cell with `var(--positive)` / `var(--negative)`. The last `tr.total` row is the bold headline metric.
- **Top workspaces table**: one row per account with a `.logo` chip, plan, region, count, and a status `badge` (`green` / `amber` / `red`).
- **Outlook** (`.outlook`): a pull-`quote` on the left and a `signoff` (name + guidance paragraph) on the right.
- **Footer**: confidentiality line and page marker.

All visuals are inline SVG / CSS, so the page is fully self-contained — no external URLs or assets required.
