---
slug: packs/design-pack/templates/data-report
type: template
lang: en
category: data
title: "NevoFlux Data Visualization Report"
title_zh: "数据可视化报告"
description: "Turn raw CSV/Excel/JSON metrics into a polished, self-contained visualization report page."
tags: [data, report, chart, 数据, 报告, template]
sample_image: packs/design-pack/assets/templates/data-report.svg
source: html-anything/data-report
---

## Design guidance

A long, desktop-oriented report page that renders parsed data into a clean, professional dashboard. Layout, top to bottom:

- **Header**: report title + time range + a short note on the data source.
- **KPI card grid**: 3–5 of the most important metrics. Each card shows the value, a year-over-year (or month-over-month) delta, and a tiny inline trend sparkline.
- **Main chart area**: at least two charts (bar / line / pie / scatter) drawn with Chart.js or ECharts (loaded from a jsDelivr CDN), fed from the parsed user data.
- **Fixed chart heights are mandatory**: wrap every `<canvas>` in a `<div style="position:relative;height:NNNpx">` (KPI sparkline ~40px, main charts ~240–280px). When Chart.js runs with `responsive:true, maintainAspectRatio:false` and the parent has no explicit height, it falls into a ResizeObserver feedback loop and grows the canvas endlessly until the browser hangs. **Never** rely on a raw `height=` attribute on the canvas for layout — that is only an initial value.
- **Data table**: an excerpt of the original rows in a `<table>` with modern styling (zebra striping, row hover, sticky header).
- **Insights block**: 3–5 short text takeaways, each led by an emoji, written like a product weekly update.
- **Methodology**: a collapsible `<details>` section at the bottom explaining definitions.
- **Restrained, professional palette**: one primary color plus a neutral scale; charts use a small coordinated palette.
- **Always parse the user's real data** — do not invent numbers.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Weekly Report · May 2025</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  body { background:#fafaf7; font-family:'Inter','Noto Sans SC',sans-serif; color:#15140f; -webkit-font-smoothing:antialiased; }
  .num { font-family:'Inter',sans-serif; font-feature-settings:'tnum' on; letter-spacing:-0.02em; }
  .section h2 { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#5a564e; margin:0 0 16px; }
  table { border-collapse:collapse; width:100%; font-size:13px; }
  thead th { background:#f4f1ec; text-align:left; padding:10px 14px; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#5a564e; position:sticky; top:0; }
  tbody td { padding:10px 14px; border-bottom:1px solid #e7e5e0; }
  tbody tr:nth-child(even) { background:#fbfaf7; }
  tbody tr:hover { background:#f4f1ec; }
  .delta-up { color:#1f7a3a; font-weight:600; }
  .delta-down { color:#9c2a25; font-weight:600; }
</style>
</head>
<body>

<div class="max-w-6xl mx-auto px-8 py-12">

  <header class="pb-7 mb-8 border-b border-[#e7e5e0]">
    <div class="flex items-baseline justify-between flex-wrap gap-3">
      <div>
        <div class="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-2">Weekly Report · Week 19</div>
        <h1 class="text-4xl font-extrabold tracking-tight">NevoFlux Weekly Report · May 2025</h1>
      </div>
      <div class="text-xs text-[#5a564e] text-right">
        <div>Source: <span class="font-semibold text-[#15140f]">Product Analytics</span></div>
        <div>As of <span class="font-mono text-[#15140f]">2025-05-11</span></div>
      </div>
    </div>
    <p class="mt-3 text-sm text-[#5a564e] max-w-2xl leading-relaxed">Every key metric is up this week. Browser MAU grew 184% year over year, while paid conversion and churn both improved.</p>
  </header>

  <section class="section mb-10">
    <h2>Core Metrics · KPI</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">Browser MAU</div>
        <div class="text-3xl font-extrabold num">23,950</div>
        <div class="text-xs mt-2"><span class="delta-up">▲ 16.0%</span> <span class="text-[#5a564e]">vs last month</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi1"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">GBrain Docs Indexed</div>
        <div class="text-3xl font-extrabold num">4,250</div>
        <div class="text-xs mt-2"><span class="delta-up">▲ 15.5%</span> <span class="text-[#5a564e]">vs last month</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi2"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">Canvas Apps Published</div>
        <div class="text-3xl font-extrabold num">2,418 <span class="text-base text-[#5a564e]">/ 10.1%</span></div>
        <div class="text-xs mt-2"><span class="delta-up">▲ 18.5%</span> <span class="text-[#5a564e]">vs last month</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi3"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">Agent Task Failure</div>
        <div class="text-3xl font-extrabold num">1.8%</div>
        <div class="text-xs mt-2"><span class="delta-up">▼ 0.1pp</span> <span class="text-[#5a564e]">vs last month</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi4"></canvas></div>
      </div>
    </div>
  </section>

  <section class="section mb-10">
    <h2>Trend · Growth</h2>
    <div class="grid lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-sm font-semibold mb-3">Browser MAU & Canvas Apps Growth</div>
        <div style="position:relative;height:260px"><canvas id="chart-main"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-sm font-semibold mb-3">Agent Task Failure · Monthly</div>
        <div style="position:relative;height:260px"><canvas id="chart-churn"></canvas></div>
      </div>
    </div>
  </section>

  <section class="section mb-10">
    <h2>Detail · Raw data</h2>
    <div class="rounded-2xl border border-[#e7e5e0] overflow-hidden bg-white">
      <table>
        <thead><tr><th>Month</th><th class="text-right">Browser MAU</th><th class="text-right">Docs Indexed</th><th class="text-right">Canvas Apps</th><th class="text-right">Task Failure</th></tr></thead>
        <tbody id="rows"></tbody>
      </table>
    </div>
  </section>

  <section class="section mb-10">
    <h2>Insights</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-3xl mb-2">📈</div>
        <div class="font-semibold mb-1.5">Browser MAU up 184% in six months</div>
        <div class="text-sm text-[#5a564e] leading-relaxed">Driven by organic word of mouth in dev communities; one viral pack walkthrough brought 8k+ new installs.</div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-3xl mb-2">🧩</div>
        <div class="font-semibold mb-1.5">Canvas adoption 7.3% → 10.1%</div>
        <div class="text-sm text-[#5a564e] leading-relaxed">The design-pack skills drove most of the lift. A new onboarding flow plus a 30-day trial were the key levers.</div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-3xl mb-2">🎯</div>
        <div class="font-semibold mb-1.5">Agent task failure 3.4% → 1.8%</div>
        <div class="text-sm text-[#5a564e] leading-relaxed">After the GBrain retrieval upgrade shipped, the SDK's grounded-answer rate nearly doubled on long tasks.</div>
      </div>
    </div>
  </section>

  <details class="mt-12 rounded-xl border border-[#e7e5e0] bg-white p-5">
    <summary class="cursor-pointer text-sm font-semibold text-[#5a564e] flex items-center justify-between">
      Methodology <span class="text-[#5a564e]">▾</span>
    </summary>
    <div class="text-xs text-[#5a564e] leading-relaxed mt-3 max-w-3xl">
      Browser MAU = de-duplicated users who opened NevoFlux at least once in 30 days. Canvas Apps = apps published from Canvas this month. Agent Task Failure = share of agent/SDK runs that ended in an unrecoverable error. Data comes from Product Analytics, with test accounts and bots excluded.
    </div>
  </details>

</div>

<script>
const data = [
  {month:'2024-09', mau:8420,  signups:1240, paying:612,  churn:0.034},
  {month:'2024-10', mau:9180,  signups:1380, paying:701,  churn:0.031},
  {month:'2024-11', mau:10240, signups:1610, paying:840,  churn:0.028},
  {month:'2024-12', mau:11800, signups:1890, paying:1012, churn:0.025},
  {month:'2025-01', mau:13620, signups:2240, paying:1218, churn:0.023},
  {month:'2025-02', mau:15440, signups:2680, paying:1455, churn:0.021},
  {month:'2025-03', mau:17890, signups:3120, paying:1722, churn:0.020},
  {month:'2025-04', mau:20640, signups:3680, paying:2041, churn:0.019},
  {month:'2025-05', mau:23950, signups:4250, paying:2418, churn:0.018},
];

document.getElementById('rows').innerHTML = data.map(d => `
  <tr>
    <td class="font-mono text-xs">${d.month}</td>
    <td class="text-right num">${d.mau.toLocaleString()}</td>
    <td class="text-right num">${d.signups.toLocaleString()}</td>
    <td class="text-right num">${d.paying.toLocaleString()}</td>
    <td class="text-right num">${(d.churn*100).toFixed(1)}%</td>
  </tr>
`).join('');

const sparkOpts = { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}}, elements:{point:{radius:0},line:{tension:0.4,borderWidth:2}} };
new Chart(document.getElementById('kpi1'), { type:'line', data:{labels:data.map(d=>d.month), datasets:[{data:data.map(d=>d.mau), borderColor:'#c96442', fill:false}]}, options:sparkOpts });
new Chart(document.getElementById('kpi2'), { type:'line', data:{labels:data.map(d=>d.month), datasets:[{data:data.map(d=>d.signups), borderColor:'#e9b94a', fill:false}]}, options:sparkOpts });
new Chart(document.getElementById('kpi3'), { type:'line', data:{labels:data.map(d=>d.month), datasets:[{data:data.map(d=>d.paying), borderColor:'#1f7a3a', fill:false}]}, options:sparkOpts });
new Chart(document.getElementById('kpi4'), { type:'line', data:{labels:data.map(d=>d.month), datasets:[{data:data.map(d=>d.churn*100), borderColor:'#2348b8', fill:false}]}, options:sparkOpts });

new Chart(document.getElementById('chart-main'), {
  type:'bar',
  data:{
    labels:data.map(d=>d.month),
    datasets:[
      {label:'Browser MAU', data:data.map(d=>d.mau), backgroundColor:'rgba(201,100,66,0.18)', borderColor:'#c96442', borderWidth:1.5, borderRadius:4, yAxisID:'y'},
      {label:'Canvas Apps', type:'line', data:data.map(d=>d.paying), borderColor:'#1f7a3a', backgroundColor:'#1f7a3a', tension:0.35, borderWidth:2.5, pointRadius:3, yAxisID:'y'},
    ]
  },
  options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom',labels:{usePointStyle:true,boxWidth:8}}}, scales:{x:{grid:{display:false}},y:{grid:{color:'#f0ece5'}, ticks:{callback:v=>v.toLocaleString()}}} }
});

new Chart(document.getElementById('chart-churn'), {
  type:'line',
  data:{ labels:data.map(d=>d.month), datasets:[{label:'Task Failure %', data:data.map(d=>(d.churn*100).toFixed(2)), borderColor:'#9c2a25', backgroundColor:'rgba(156,42,37,0.08)', tension:0.4, borderWidth:2.5, fill:true, pointRadius:3}] },
  options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}},y:{grid:{color:'#f0ece5'}, ticks:{callback:v=>v+'%'}, beginAtZero:true}} }
});
</script>

</body>
</html>
```

## Usage

- **Header**: set the report title, the time range / "as of" date, and the data source label.
- **KPI grid**: 3–5 cards. Each one needs a metric name, the current value, a delta vs the prior period (`delta-up` / `delta-down`), and a sparkline canvas (`kpi1`–`kpi4`) wired in the script.
- **Trend charts**: one wide chart (`chart-main`, bar + overlaid line) and one focused chart (`chart-churn`). Keep the fixed-height wrappers around each canvas.
- **Raw data table**: filled from the `data` array in the script — replace it with the parsed user dataset; columns are driven by the `<thead>` labels.
- **Insights**: 3 emoji-led takeaways summarizing what changed and why.
- **Methodology**: collapsible definitions for every metric so the numbers are auditable.
