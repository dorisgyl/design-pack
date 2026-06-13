---
slug: packs/design-pack/templates/competitive-teardown
type: template
lang: en
category: doc
title: "Competitive Teardown (NevoFlux War Room)"
title_zh: "竞品拆解"
description: "Turn scattered competitor material into an actionable product-strategy report: positioning map, feature matrix, pricing read, and opportunity windows."
tags: [competitive, teardown, strategy, product, 竞品, 拆解, template]
sample_image: packs/design-pack/assets/templates/competitive-teardown.svg
source: html-anything/competitive-teardown
---

## Design guidance

This template is neither an article, a PRD, nor a pitch deck. Its job is to convert messy competitor material into one decision-ready product-strategy report that helps the team answer: "Where exactly do we differ from them, and how should we play the next move?"

Good inputs: competitor sites, pricing pages, changelogs, user reviews, sales feedback, and internal research notes. Two to six competitors works best; with a single competitor, output a single-competitor deep dive. Tables, bullets, link excerpts, interview notes, and screenshot captions are all welcome.

Required structure:
1. Header: market / product category / report date / one-line conclusion.
2. Executive takeaway: the three most important judgments, each with an explicit "so what".
3. Positioning map: a 2x2 quadrant or coordinate chart showing where competitors sit. Axis labels must come from the user's content, not boilerplate words.
4. Competitor cards: one card per competitor with target user, core promise, pricing signal, primary strength, and visible weakness.
5. Feature matrix: rows are key capabilities, columns are competitors plus an "Us / Opportunity" column; use the marks (strong / partial / missing) plus a short note on coverage.
6. Pricing / packaging read: price tiers, free trial, limits, and enterprise sales motion.
7. UX / messaging notes: four to six observable details pulled from source material, never generic.
8. Opportunity windows: three windows, each with why now, target segment, first move, and risk.
9. Recommended moves: 30 / 90 / 180-day action plan.

Visual requirements:
- Strategy-consulting and product war-room feel: high information density, fast to scan, clear charts.
- Restrained palette: ink / paper / muted blue / signal amber, or similar professional tones.
- The feature matrix must read horizontally; on small screens it can collapse into stacked cards.
- Do not turn it into a marketing landing page or an ordinary article.

Content integrity:
- Use only the competitors, prices, features, and reviews the user provides. Mark missing information as "not found in source" or "unknown".
- Do not invent market share, ARR, customer names, or pricing figures.
- If the input is clearly thin, still ship the report but list the holes under "Evidence gaps".

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Competitive Teardown · AI Browser Workspaces</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#162033;--muted:#667085;--paper:#f7f4ec;--line:#ded7ca;--blue:#1d4ed8;--amber:#c47b25;--green:#28715f}
    *{box-sizing:border-box} body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,"Noto Sans SC",system-ui,sans-serif}
    .page{max-width:1180px;margin:0 auto;padding:42px 28px 56px}.hair{border:1px solid var(--line);background:rgba(255,255,255,.54)}
    .pill{border:1px solid var(--line);border-radius:999px;padding:6px 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
    .grid-bg{background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:32px 32px}
    .matrix th,.matrix td{border-bottom:1px solid var(--line);padding:14px;text-align:left;vertical-align:top}.matrix th{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}.matrix td{font-size:13px}
  </style>
</head>
<body>
  <main class="page">
    <section class="hair grid-bg rounded-[6px] p-7">
      <div class="flex flex-wrap items-center gap-2 mb-8">
        <span class="pill">Competitive teardown</span><span class="pill">AI browser workspaces</span><span class="pill">2026-05-28</span>
      </div>
      <div class="grid md:grid-cols-[1.25fr_.75fr] gap-8 items-end">
        <div>
          <p class="text-sm font-bold text-[var(--blue)] mb-3">NevoFlux should avoid generic AI-browser parity and own a living knowledge base that turns into apps.</p>
          <h1 class="text-5xl md:text-7xl font-extrabold leading-[.92] tracking-tight">Competing on synthesis, not browsing.</h1>
        </div>
        <div class="hair rounded-[6px] p-5 bg-[#fffaf0]">
          <div class="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-3">Executive takeaway</div>
          <ol class="space-y-3 text-sm leading-6">
            <li><b>1.</b> Arc owns delightful tab management; Dia and Perplexity own answer-and-summarize browsing.</li>
            <li><b>2.</b> NevoFlux's wedge is GBrain: every page you read compounds into a reusable knowledge base and Canvas apps.</li>
            <li><b>3.</b> The next 90 days should prove the read to GBrain to Canvas-app loop, not chase every browsing use case.</li>
          </ol>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <article class="hair rounded-[6px] p-5 bg-white/70"><div class="text-xs text-[var(--muted)] mb-2">Arc</div><h2 class="text-2xl font-extrabold">Opinionated browser</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Best at making the browser feel personal and calm with spaces, profiles, and tab hygiene.</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><div class="text-xs text-[var(--muted)] mb-2">Dia</div><h2 class="text-2xl font-extrabold">Chat-native browser</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">A sidebar agent that summarizes, drafts, and acts across the current page and open tabs.</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><div class="text-xs text-[var(--muted)] mb-2">Perplexity</div><h2 class="text-2xl font-extrabold">Answer engine</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Strong cited answers and research threads; strongest around one-off question-and-answer.</p></article>
    </section>

    <section class="grid lg:grid-cols-[.9fr_1.1fr] gap-5 mt-5">
      <div class="hair rounded-[6px] p-6 bg-[#fbfaf6]">
        <div class="flex justify-between text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-4"><span>Positioning map</span><span>derived from source notes</span></div>
        <div class="relative h-[360px] border border-[var(--line)] bg-white">
          <div class="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-[var(--line)]"></div>
          <div class="absolute top-1/2 left-0 right-0 border-t border-dashed border-[var(--line)]"></div>
          <div class="absolute left-3 top-3 text-xs text-[var(--muted)]">Builds lasting knowledge</div>
          <div class="absolute right-3 bottom-3 text-xs text-[var(--muted)]">One-off browsing</div>
          <div class="absolute left-[18%] bottom-[26%] rounded-full bg-[#e8eefc] px-3 py-2 text-sm font-bold text-[var(--blue)]">Arc</div>
          <div class="absolute right-[13%] top-[42%] rounded-full bg-[#fff1dc] px-3 py-2 text-sm font-bold text-[var(--amber)]">Dia</div>
          <div class="absolute right-[22%] bottom-[24%] rounded-full bg-[#ecfdf5] px-3 py-2 text-sm font-bold text-[var(--green)]">Perplexity</div>
          <div class="absolute left-[42%] top-[18%] rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-bold text-white shadow-lg">NevoFlux wedge</div>
        </div>
      </div>
      <div class="hair rounded-[6px] bg-white/70 overflow-hidden">
        <table class="matrix w-full">
          <thead><tr><th>Capability</th><th>Arc</th><th>Dia</th><th>Perplexity</th><th>NevoFlux opportunity</th></tr></thead>
          <tbody>
            <tr><td><b>Calm tab & space management</b></td><td>✓ strong</td><td>△ basic</td><td>— web app</td><td>Do not compete head-on</td></tr>
            <tr><td><b>Page summarize & chat</b></td><td>△ add-on</td><td>✓ strong</td><td>✓ strong</td><td>Match table stakes, do not lead with it</td></tr>
            <tr><td><b>Persistent GBrain knowledge base</b></td><td>not found</td><td>△ session memory</td><td>△ threads</td><td><b>Primary wedge</b></td></tr>
            <tr><td><b>Turn knowledge into Canvas apps</b></td><td>not found</td><td>not found</td><td>not found</td><td><b>Primary wedge</b></td></tr>
            <tr><td><b>Agent / SDK & packs</b></td><td>not found</td><td>△ built-in agent</td><td>△ API</td><td>Open the pack & design-skill ecosystem</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <article class="hair rounded-[6px] p-5 bg-white/70"><span class="pill">30 days</span><h3 class="mt-4 text-xl font-extrabold">Package around GBrain</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Rename core objects around captures, sources, notes, and knowledge clusters that grow as you browse.</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><span class="pill">90 days</span><h3 class="mt-4 text-xl font-extrabold">Ship Canvas apps</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Let GBrain knowledge generate Canvas apps and dashboards, with export to the agent SDK and packs.</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><span class="pill">180 days</span><h3 class="mt-4 text-xl font-extrabold">Open the pack ecosystem</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Add design skills and shareable packs only where they deepen the read-to-app loop, not as generic parity.</p></article>
    </section>
  </main>
</body>
</html>
```

## Usage

- Header pills: report type, market / category, and report date.
- Hero: a blue one-line conclusion plus a large headline framing the wedge; the boxed Executive takeaway holds the three "so what" judgments.
- Competitor cards: one card per competitor (label, short title, one-line read). Add or remove cards by editing the three-column grid.
- Positioning map: edit the two axis labels and the absolutely-positioned competitor pills; the dark pill marks the NevoFlux wedge.
- Feature matrix: rows are capabilities, columns are competitors plus the NevoFlux opportunity column. Use strong / partial / missing marks (✓ / △ / —) and mark gaps as "not found" or "unknown".
- Move cards: the 30 / 90 / 180-day plan; keep each to a title plus one-line first move.
