---
slug: packs/design-pack/templates/experiment-readout
type: template
lang: en
category: data
title: "NevoFlux Experiment Readout"
title_zh: "实验复盘"
description: "Turns an A/B or product experiment into an action recommendation: hypothesis + metrics + result + interpretation + decision."
tags: [experiment, ab-test, growth, product, data, 实验, 复盘, template]
sample_image: packs/design-pack/assets/templates/experiment-readout.svg
source: html-anything/experiment-readout
---
## Design guidance

This is not an ordinary data report or a dashboard. The goal is to answer one question: "What did this experiment tell us, and what should we do next — ship, stop, keep running, or redesign?"

Good inputs:
- A/B tests, growth experiments, pricing experiments, onboarding redesigns, feature rollouts, email experiments.
- Source material can be markdown, CSV, a pasted table, or mixed notes.

Required output structure:
1. Header: experiment name, owner, dates, experiment status, and the decision.
2. Hypothesis: the original hypothesis, rewritten as a testable statement.
3. Setup: audience, variants, duration, sample size, primary metric, and guardrail metrics.
4. Result snapshot: primary metric lift, absolute delta, sample, and any confidence or caveat.
5. Metric table: Control vs Variant for the primary, secondary, and guardrail metrics.
6. Interpretation: explain why the result happened, separating signal, noise, and unknowns.
7. Decision: pick exactly one of ship / iterate / extend / stop, with a reason.
8. Follow-up experiments: 2-4 next steps, each with a hypothesis, expected impact, and effort.
9. Instrumentation notes: data gaps, tracking issues, and sample bias.

Design details:
- Product-data-team style: clear, credible, and action-oriented.
- The first screen must carry a large decision badge and the primary metric delta.
- Charts can be CSS / SVG / Chart.js; if you use Chart.js, give the canvas wrapper a fixed height.
- Do not wrap results as more certain than they are; with a small sample or no significance, state the caveat explicitly.

Style variants (pick one, do not mix three): a light product-readout (default, for PM / growth / leadership), a research lab-notebook (early-stage, qualitative + quantitative, caveat-heavy exploration), or a dark growth-console (real-time metrics, funnel / activation / conversion). Default to product-readout; use lab-notebook when the material stresses research process and uncertainty; use growth-console when it stresses growth metrics, funnels, or live monitoring.

Content honesty:
- Only use data the user supplied. Do not invent p-values, confidence, or sample sizes.
- When there is no significance information, say "directional" / "inconclusive" / "needs more data".

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Experiment Readout · GBrain Onboarding Checklist</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#102027;--muted:#667085;--paper:#f3f7f4;--line:#dbe5dd;--green:#16865a;--amber:#b7791f;--blue:#2563eb}
    *{box-sizing:border-box} body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,"Noto Sans SC",system-ui,sans-serif}
    .page{max-width:1160px;margin:0 auto;padding:40px 26px 56px}.card{border:1px solid var(--line);background:rgba(255,255,255,.76);border-radius:6px}
    .label{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}.pill{border-radius:999px;padding:6px 10px;font-size:11px;font-weight:800}
    table{width:100%;border-collapse:collapse} th,td{border-bottom:1px solid var(--line);padding:13px;text-align:left;font-size:13px} th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
    .bar{height:12px;border-radius:999px;background:#e5ebe7;overflow:hidden}.bar span{display:block;height:100%;border-radius:999px;background:var(--green)}
  </style>
</head>
<body>
  <main class="page">
    <section class="card p-7">
      <div class="flex flex-wrap justify-between gap-3 mb-7">
        <div class="flex flex-wrap gap-2"><span class="pill bg-[#e8f8ef] text-[var(--green)]">Experiment readout</span><span class="pill bg-white border border-[var(--line)]">2026-05-06 → 2026-05-20</span><span class="pill bg-white border border-[var(--line)]">Owner: Growth PM</span></div>
        <span class="pill bg-[#fff7e6] text-[var(--amber)]">Directional, no p-value yet</span>
      </div>
      <div class="grid md:grid-cols-[1fr_340px] gap-8 items-end">
        <div>
          <div class="label mb-2">Decision</div>
          <h1 class="text-5xl md:text-6xl font-extrabold leading-[.95] tracking-tight">Iterate and ship to 50%.</h1>
          <p class="mt-5 text-lg leading-8 text-[var(--muted)] max-w-3xl">The GBrain onboarding checklist increased 7-day activation by 5.5 absolute points, mostly by getting new workspaces to index their first knowledge source. The data-source connection step created support friction and should be softened before full rollout.</p>
        </div>
        <div class="card p-5 bg-[#eefbf4]">
          <div class="label text-[var(--green)]">Primary metric</div>
          <div class="mt-2 text-6xl font-extrabold">+5.5pp</div>
          <p class="mt-2 text-sm text-[var(--muted)]">Activation within 7 days: 21.4% → 26.9%</p>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <div class="card p-5"><div class="label">Hypothesis</div><p class="mt-3 text-sm leading-6">A guided checklist will help new workspaces index their first GBrain source and publish a first Canvas app.</p></div>
      <div class="card p-5"><div class="label">Audience</div><p class="mt-3 text-sm leading-6">New NevoFlux workspaces with 2-20 invited members.</p></div>
      <div class="card p-5"><div class="label">Guardrails</div><p class="mt-3 text-sm leading-6">Support tickets rose from 6.2 to 7.1 per 100 workspaces; workspace deletion stayed flat.</p></div>
    </section>

    <section class="grid lg:grid-cols-[1.05fr_.95fr] gap-5 mt-5">
      <div class="card overflow-hidden">
        <div class="p-5 border-b border-[var(--line)]"><div class="label">Metric table</div></div>
        <table>
          <thead><tr><th>Metric</th><th>Control</th><th>Variant</th><th>Read</th></tr></thead>
          <tbody>
            <tr><td><b>Activation</b></td><td>21.4%</td><td>26.9%</td><td class="text-[var(--green)] font-bold">Positive signal</td></tr>
            <tr><td><b>Index GBrain source</b></td><td>38.1%</td><td>47.4%</td><td>Largest movement</td></tr>
            <tr><td><b>Publish Canvas app</b></td><td>44.8%</td><td>46.1%</td><td>Minor lift</td></tr>
            <tr><td><b>Support tickets / 100</b></td><td>6.2</td><td>7.1</td><td class="text-[var(--amber)] font-bold">Watch</td></tr>
            <tr><td><b>Workspace deletion</b></td><td>4.8%</td><td>5.0%</td><td>Flat guardrail</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card p-5">
        <div class="label mb-5">Activation funnel movement</div>
        <div class="space-y-5">
          <div><div class="flex justify-between text-sm mb-2"><b>Control activation</b><span>21.4%</span></div><div class="bar"><span style="width:21.4%"></span></div></div>
          <div><div class="flex justify-between text-sm mb-2"><b>Variant activation</b><span>26.9%</span></div><div class="bar"><span style="width:26.9%"></span></div></div>
          <div><div class="flex justify-between text-sm mb-2"><b>Control source index</b><span>38.1%</span></div><div class="bar"><span style="width:38.1%;background:var(--blue)"></span></div></div>
          <div><div class="flex justify-between text-sm mb-2"><b>Variant source index</b><span>47.4%</span></div><div class="bar"><span style="width:47.4%;background:var(--blue)"></span></div></div>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <article class="card p-5"><span class="pill bg-[#e8f8ef] text-[var(--green)]">Ship next</span><h3 class="mt-4 text-xl font-extrabold">Roll out to 50%</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Keep the checklist visible, but reduce pressure around the GBrain data-source connection.</p></article>
      <article class="card p-5"><span class="pill bg-[#fff7e6] text-[var(--amber)]">Fix friction</span><h3 class="mt-4 text-xl font-extrabold">Split the data-source step</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Add "skip for now" and "connect later"; engineering estimates 2 days.</p></article>
      <article class="card p-5"><span class="pill bg-[#eef2ff] text-[var(--blue)]">Measure</span><h3 class="mt-4 text-xl font-extrabold">Calculate significance</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">Add a p-value or Bayesian read before 100% rollout.</p></article>
    </section>
  </main>
</body>
</html>
```

## Usage

- Header pills — the readout label, the experiment date range, and the owner; the right-hand amber pill carries the confidence caveat (e.g. "Directional, no p-value yet").
- `Decision` block — the large headline is the one-line decision (ship / iterate / extend / stop); the paragraph below explains it in plain language.
- `Primary metric` card — the single most important delta (here `+5.5pp`) with the before → after read underneath.
- Three context cards — `Hypothesis`, `Audience`, and `Guardrails`; keep each to one or two sentences.
- `Metric table` — one row per metric (Control vs Variant) with a short `Read` note; color the read green for a positive signal and amber for a watch item.
- Funnel block — horizontal bars; set each `span` width to the metric percentage and switch `background` to `var(--blue)` for secondary metrics.
- Follow-up cards — 2-4 next steps; the pill states the type (Ship next / Fix friction / Measure) and the body gives the action plus effort.
