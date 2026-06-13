---
slug: packs/design-pack/templates/dashboard-zh
type: template
lang: zh
category: dashboard
title: "管理后台仪表板"
title_en: "NevoFlux Admin Dashboard"
description: "单页管理/分析仪表板:固定侧栏、顶栏、KPI 网格,以及一到两张图表。"
tags: [dashboard, admin, analytics, 模板]
sample_image: packs/design-pack/assets/templates/dashboard.svg
source: html-anything/dashboard
---
## 设计指导

标准的管理/分析仪表板单页。意图:面向桌面端(目标宽度 1440)的简洁运营控制台。

布局:
- 固定的左侧栏,包含 logo、导航列表,以及用户/工作区底部信息。
- 顶栏,放置标题与操作项(时间范围、主操作按钮)。
- 主区域以 3-5 个 KPI 卡片网格开场。
- 一到两张主图表(折线 / 柱状 / 区域)。
- 底部为近期动态列表。

设计细节:
- 暖色、低对比度的中性背景,搭配白色卡片表面,并克制地使用单一强调色(按钮、图表描边)。
- KPI 卡片显示大写标签、较大的数值,以及一行小幅变化值,绿色表示上升、红色表示下降。
- 图表使用占位的 SVG 折线叠加柔和渐变,使页面自包含、无需外部资源。
- 表格使用浅色上边框、大写列头,以及小巧的状态药丸标签。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — 工作区概览</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff; --good: #2f7d4a; --bad: #b53a2a;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 14px/1.5 -apple-system, system-ui, sans-serif; display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
    .sidebar { background: var(--surface); border-right: 1px solid var(--border); padding: 16px; }
    .brand { font-weight: 600; padding: 8px 10px 18px; }
    .nav { display: flex; flex-direction: column; gap: 2px; }
    .nav a { padding: 7px 10px; border-radius: 6px; color: var(--fg); text-decoration: none; }
    .nav a.active { background: var(--bg); font-weight: 500; }
    .nav a:hover { background: var(--bg); }
    .nav .group-label { font-size: 11px; color: var(--muted); padding: 14px 10px 6px; text-transform: uppercase; letter-spacing: 0.06em; }
    main { padding: 0 28px 56px; }
    .topbar { padding: 16px 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
    .topbar h1 { font-size: 20px; margin: 0; letter-spacing: -0.01em; }
    .topbar .right { display: flex; align-items: center; gap: 12px; color: var(--muted); }
    button { font: inherit; cursor: pointer; padding: 7px 13px; border-radius: 6px; }
    .btn-primary { background: var(--accent); color: white; border: 1px solid var(--accent); }
    .btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--border); }
    .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
    @media (max-width: 900px) { .kpis { grid-template-columns: repeat(2, 1fr); } }
    .kpi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; }
    .kpi .label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .kpi .value { font-size: 28px; letter-spacing: -0.02em; }
    .kpi .delta { font-size: 12px; margin-top: 4px; }
    .kpi .delta.up { color: var(--good); }
    .kpi .delta.down { color: var(--bad); }
    .panel { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 16px; }
    .panel h3 { margin: 0 0 16px; font-size: 14px; font-weight: 500; }
    .chart { height: 240px; background: linear-gradient(180deg, rgba(201,100,66,0.06), transparent); border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
    .chart svg { width: 100%; height: 100%; display: block; }
    .panels-row { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
    @media (max-width: 900px) { .panels-row { grid-template-columns: 1fr; } }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px 6px; border-top: 1px solid var(--border); }
    th { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; }
    .pill { display: inline-block; font-size: 11px; padding: 2px 8px; border-radius: 999px; background: var(--bg); border: 1px solid var(--border); }
    .pill.good { color: var(--good); border-color: rgba(47,125,74,0.3); }
    .pill.bad { color: var(--bad); border-color: rgba(181,58,42,0.3); }
  </style>
</head>
<body>
  <aside class="sidebar" data-od-id="sidebar">
    <div class="brand">◐ NevoFlux</div>
    <nav class="nav">
      <a href="#" class="active">概览</a>
      <a href="#">GBrain</a>
      <a href="#">Canvas 应用</a>
      <a href="#">Agent 运行</a>
      <span class="group-label">工作区</span>
      <a href="#">资源包</a>
      <a href="#">成员</a>
      <a href="#">账单</a>
      <a href="#">设置</a>
    </nav>
  </aside>
  <main>
    <div class="topbar" data-od-id="topbar">
      <h1>概览 · 2026 年 4 月</h1>
      <div class="right">
        <button class="btn-secondary">最近 30 天 ▾</button>
        <button class="btn-primary">+ 新建 Canvas 应用</button>
      </div>
    </div>

    <div class="kpis" data-od-id="kpis">
      <div class="kpi"><div class="label">Agent 运行</div><div class="value">48.2K</div><div class="delta up">环比 +12.4%</div></div>
      <div class="kpi"><div class="label">活跃工作区</div><div class="value">3,184</div><div class="delta up">本月 +204</div></div>
      <div class="kpi"><div class="label">运行失败率</div><div class="value">2.1%</div><div class="delta down">+0.4 pp</div></div>
      <div class="kpi"><div class="label">GBrain P95 查询</div><div class="value">182 ms</div><div class="delta up">-23 ms</div></div>
    </div>

    <div class="panels-row">
      <div class="panel" data-od-id="chart-panel">
        <h3>Agent 运行 · 30 天</h3>
        <div class="chart">
          <svg viewBox="0 0 600 240" preserveAspectRatio="none">
            <polyline fill="none" stroke="#c96442" stroke-width="2" points="0,180 30,170 60,150 90,160 120,140 150,120 180,130 210,110 240,90 270,100 300,80 330,70 360,80 390,60 420,50 450,60 480,40 510,30 540,40 570,20 600,10" />
          </svg>
        </div>
      </div>
      <div class="panel" data-od-id="signups-panel">
        <h3>新增工作区</h3>
        <table>
          <thead><tr><th>工作区</th><th>套餐</th><th>状态</th></tr></thead>
          <tbody>
            <tr><td>Atlas Labs</td><td>团队版</td><td><span class="pill good">活跃</span></td></tr>
            <tr><td>Cobalt</td><td>专业版</td><td><span class="pill good">活跃</span></td></tr>
            <tr><td>Meridian</td><td>团队版</td><td><span class="pill bad">试用</span></td></tr>
            <tr><td>Aperture</td><td>企业版</td><td><span class="pill good">活跃</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel" data-od-id="recent-events">
      <h3>近期动态</h3>
      <table>
        <thead><tr><th>时间</th><th>工作区</th><th>事件</th><th>套餐</th></tr></thead>
        <tbody>
          <tr><td>下午 2:14</td><td>Acme Co</td><td>发布了 Canvas 应用</td><td>团队版</td></tr>
          <tr><td>下午 1:48</td><td>Northwind</td><td>索引了 GBrain 数据源</td><td>专业版</td></tr>
          <tr><td>下午 1:32</td><td>Globex</td><td>安装了 design-pack</td><td>个人版</td></tr>
          <tr><td>下午 12:51</td><td>Initech</td><td>接入了 agent SDK</td><td>团队版</td></tr>
        </tbody>
      </table>
    </div>
  </main>
</body>
</html>
```

## 用法

- `brand` — 侧栏中的 NevoFlux logo / 产品名。
- `nav` — 主要分区(概览、GBrain、Canvas 应用、Agent 运行),以及一个「工作区」分组(资源包、成员、账单、设置)。
- `topbar` — 页面标题,加上时间范围控件与主操作按钮。
- `kpis` — 3-5 个 KPI 卡片;每张卡片包含大写 `label`、较大的 `value`,以及 `delta`(加 `up` 类为绿色,`down` 类为红色)。
- `chart-panel` — 主图表;修改 SVG `polyline` 的点坐标即可重塑趋势线,无需外部数据。
- `signups-panel` — 新增工作区的紧凑表格,带状态 `pill`(`good` / `bad`)。
- `recent-events` — 底部动态列表;每行一条近期事件。
