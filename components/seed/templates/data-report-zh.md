---
slug: packs/design-pack/templates/data-report-zh
type: template
lang: zh
category: data
title: "数据可视化报告"
title_en: "NevoFlux Data Visualization Report"
description: "把 CSV/Excel/JSON 指标转成精美、自包含的可视化报告页。"
tags: [data, report, chart, 数据, 报告, 模板]
sample_image: packs/design-pack/assets/templates/data-report.svg
source: html-anything/data-report
---

## 设计指导

一个面向桌面的长报告页,把解析后的数据渲染成干净、专业的看板。布局自上而下:

- **头部**: 报告标题 + 时间区间 + 一句话数据来源说明。
- **KPI 卡片网格**: 3–5 个最重要的指标。每张卡片显示数值 + 同比 / 环比变化 + 一条迷你趋势线。
- **主图表区**: 至少 2 个图表 (柱状 / 折线 / 饼 / 散点),使用 Chart.js 或 ECharts (jsDelivr CDN 引入),数据来自解析的用户输入。
- **图表容器必须有固定高度**: 每个 `<canvas>` 外层包一个 `<div style="position:relative;height:NNNpx">` (KPI 迷你图 ~40px,主图表 ~240–280px)。当 Chart.js 使用 `responsive:true, maintainAspectRatio:false` 而父容器没有显式高度时,会陷入 ResizeObserver 死循环,图表无限增高直至卡死浏览器。**绝对不要**直接给 canvas 写 `height=` 属性当布局,那只是初始值。
- **数据表格**: 用户原始数据节选,使用 `<table>` + 现代化样式 (斑马纹、行 hover、sticky 表头)。
- **洞察块**: 3–5 条文字洞察,每条用 emoji 开头,像产品周报。
- **方法论**: 底部一个可折叠的 `<details>` 区,说明各指标定义。
- **配色克制专业**: 主色 1 + 中性色阶,图表用一组协调的调色板。
- **必须解析用户提供的实际数据**,不要捏造。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 数据周报 · 2025 年 5 月</title>
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
        <h1 class="text-4xl font-extrabold tracking-tight">NevoFlux 数据周报 · 2025 年 5 月</h1>
      </div>
      <div class="text-xs text-[#5a564e] text-right">
        <div>来源: <span class="font-semibold text-[#15140f]">产品分析</span></div>
        <div>截止 <span class="font-mono text-[#15140f]">2025-05-11</span></div>
      </div>
    </div>
    <p class="mt-3 text-sm text-[#5a564e] max-w-2xl leading-relaxed">本周关键指标全部向好。浏览器 MAU 同比增长 184%,Canvas 转化与 Agent 失败率双双改善。</p>
  </header>

  <section class="section mb-10">
    <h2>核心指标 · KPI</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">浏览器 MAU</div>
        <div class="text-3xl font-extrabold num">23,950</div>
        <div class="text-xs mt-2"><span class="delta-up">▲ 16.0%</span> <span class="text-[#5a564e]">vs 上月</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi1"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">GBrain 已索引文档</div>
        <div class="text-3xl font-extrabold num">4,250</div>
        <div class="text-xs mt-2"><span class="delta-up">▲ 15.5%</span> <span class="text-[#5a564e]">vs 上月</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi2"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">Canvas 应用发布</div>
        <div class="text-3xl font-extrabold num">2,418 <span class="text-base text-[#5a564e]">/ 10.1%</span></div>
        <div class="text-xs mt-2"><span class="delta-up">▲ 18.5%</span> <span class="text-[#5a564e]">vs 上月</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi3"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0] shadow-[0_1px_0_#f0ece5]">
        <div class="text-[11px] font-semibold uppercase tracking-wider text-[#5a564e] mb-2">Agent 任务失败率</div>
        <div class="text-3xl font-extrabold num">1.8%</div>
        <div class="text-xs mt-2"><span class="delta-up">▼ 0.1pp</span> <span class="text-[#5a564e]">vs 上月</span></div>
        <div class="mt-3" style="position:relative;height:40px"><canvas id="kpi4"></canvas></div>
      </div>
    </div>
  </section>

  <section class="section mb-10">
    <h2>趋势 · Growth</h2>
    <div class="grid lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-sm font-semibold mb-3">浏览器 MAU & Canvas 应用增长</div>
        <div style="position:relative;height:260px"><canvas id="chart-main"></canvas></div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-sm font-semibold mb-3">Agent 失败率 · 月度</div>
        <div style="position:relative;height:260px"><canvas id="chart-churn"></canvas></div>
      </div>
    </div>
  </section>

  <section class="section mb-10">
    <h2>明细 · Raw data</h2>
    <div class="rounded-2xl border border-[#e7e5e0] overflow-hidden bg-white">
      <table>
        <thead><tr><th>月份</th><th class="text-right">浏览器 MAU</th><th class="text-right">已索引文档</th><th class="text-right">Canvas 应用</th><th class="text-right">失败率</th></tr></thead>
        <tbody id="rows"></tbody>
      </table>
    </div>
  </section>

  <section class="section mb-10">
    <h2>洞察 · Insights</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-3xl mb-2">📈</div>
        <div class="font-semibold mb-1.5">浏览器 MAU 半年增长 184%</div>
        <div class="text-sm text-[#5a564e] leading-relaxed">主要来自开发者社区的自然口碑,单条爆款 pack 演示带来 8k+ 新安装。</div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-3xl mb-2">🧩</div>
        <div class="font-semibold mb-1.5">Canvas 转化 7.3% → 10.1%</div>
        <div class="text-sm text-[#5a564e] leading-relaxed">design-pack 设计技能贡献最大。新引导流程 + 30 天试用是关键。</div>
      </div>
      <div class="rounded-2xl bg-white p-5 border border-[#e7e5e0]">
        <div class="text-3xl mb-2">🎯</div>
        <div class="font-semibold mb-1.5">Agent 失败率 3.4% → 1.8%</div>
        <div class="text-sm text-[#5a564e] leading-relaxed">GBrain 检索升级上线后,SDK 在长任务上的有据回答率几乎翻倍。</div>
      </div>
    </div>
  </section>

  <details class="mt-12 rounded-xl border border-[#e7e5e0] bg-white p-5">
    <summary class="cursor-pointer text-sm font-semibold text-[#5a564e] flex items-center justify-between">
      方法论 · Methodology <span class="text-[#5a564e]">▾</span>
    </summary>
    <div class="text-xs text-[#5a564e] leading-relaxed mt-3 max-w-3xl">
      浏览器 MAU = 30 天内至少打开一次 NevoFlux 的去重用户。Canvas 应用 = 当月从 Canvas 发布的应用数。Agent 任务失败率 = Agent/SDK 运行中以不可恢复错误结束的比例。数据来自产品分析,已剔除测试账号与 bot。
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
      {label:'浏览器 MAU', data:data.map(d=>d.mau), backgroundColor:'rgba(201,100,66,0.18)', borderColor:'#c96442', borderWidth:1.5, borderRadius:4, yAxisID:'y'},
      {label:'Canvas 应用', type:'line', data:data.map(d=>d.paying), borderColor:'#1f7a3a', backgroundColor:'#1f7a3a', tension:0.35, borderWidth:2.5, pointRadius:3, yAxisID:'y'},
    ]
  },
  options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom',labels:{usePointStyle:true,boxWidth:8}}}, scales:{x:{grid:{display:false}},y:{grid:{color:'#f0ece5'}, ticks:{callback:v=>v.toLocaleString()}}} }
});

new Chart(document.getElementById('chart-churn'), {
  type:'line',
  data:{ labels:data.map(d=>d.month), datasets:[{label:'失败率 %', data:data.map(d=>(d.churn*100).toFixed(2)), borderColor:'#9c2a25', backgroundColor:'rgba(156,42,37,0.08)', tension:0.4, borderWidth:2.5, fill:true, pointRadius:3}] },
  options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}},y:{grid:{color:'#f0ece5'}, ticks:{callback:v=>v+'%'}, beginAtZero:true}} }
});
</script>

</body>
</html>
```

## 用法

- **头部**: 设置报告标题、时间区间 / "截止"日期,以及数据来源标签。
- **KPI 网格**: 3–5 张卡片。每张需要指标名、当前数值、相对上一周期的变化 (`delta-up` / `delta-down`),以及一条迷你趋势线 canvas (`kpi1`–`kpi4`,在脚本中接好)。
- **趋势图表**: 一个宽图 (`chart-main`,柱状 + 叠加折线) 和一个聚焦图 (`chart-churn`)。保留每个 canvas 外层的固定高度容器。
- **明细表格**: 由脚本中的 `data` 数组填充 —— 替换为解析后的用户数据集;列由 `<thead>` 标签驱动。
- **洞察**: 3 条 emoji 开头的总结,讲清"变化了什么、为什么"。
- **方法论**: 可折叠的各指标定义,让数字可被审计。
