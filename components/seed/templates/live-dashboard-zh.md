---
slug: packs/design-pack/templates/live-dashboard-zh
type: template
lang: zh
category: dashboard
title: "Notion 风团队仪表板"
title_en: "NevoFlux Live Team Dashboard"
description: "Notion 风团队动态总览:KPI 卡片 + 7 日 sparkline + 实时动态流 + 关联任务表,即使没有数据源也用 seed 数据兜底。"
tags: [notion, team, live, dashboard, 模板]
sample_image: packs/design-pack/assets/templates/live-dashboard.svg
source: html-anything/live-dashboard
---
## 设计指导

Notion 风格的团队动态总览。意图:一个实时状态看板,即使没有绑定数据源也能正常渲染——seed 数据作为兜底。适合作为桌面长页浏览。

布局:
- Header(团队/工作区名 + 时间窗,即面包屑加状态 pill)。
- KPI 卡片网格。
- 7 天 sparkline 趋势。
- 实时 activity feed(头像 + 动作 + 相对时间)。
- 关联数据库任务表(zebra 斑马行 + 状态 pill)。

设计细节:
- 模仿 Notion 观感:callout 高亮块、toggle 风格行、数据库表配色。
- 暖白底色、低对比中性墨色,单一蓝色强调色用于 sparkline、链接与主按钮。
- KPI 卡片包含大写标签、等宽数字的大号数值,以及绿/红的小号 delta 行。
- 状态 pill 使用柔和的浅色底(完成 / 进行中 / 阻塞 / 待办 / 评审中)。
- 未绑定 connector 时,live pill 保持灰色静态的「示例数据」徽标,避免误称已接入真实数据源;刷新仅对 seed 兜底数据做补间动画。
- 尊重 `prefers-reduced-motion`:动画、数值补间与行高亮均短路关闭。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux · 团队仪表板</title>
<style>
  :root {
    --bg: #ffffff;
    --bg-soft: #f7f6f3;
    --bg-hover: #efeeec;
    --ink: #37352f;
    --ink-2: #787774;
    --ink-3: #9b9a97;
    --line: #ececea;
    --line-strong: #d3d1cb;
    --accent: #2eaadc;
    --accent-ink: #0b6e91;
    --pill-done-bg: #dbeddb;       --pill-done-ink: #2b593f;
    --pill-progress-bg: #fdecc8;   --pill-progress-ink: #976d23;
    --pill-blocked-bg: #ffe2dd;    --pill-blocked-ink: #b13b2c;
    --pill-todo-bg: #e9e5e3;       --pill-todo-ink: #5a534f;
    --pill-review-bg: #d3e5ef;     --pill-review-ink: #1f5b78;
    --shadow-card: 0 1px 0 rgba(15,15,15,0.04), 0 1px 2px rgba(15,15,15,0.04);
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 10px;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
                 "Noto Sans", "PingFang SC", "Hiragino Sans GB", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }

  /* ---------- App shell ---------- */
  .app {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100vh;
  }

  /* ---------- Sidebar ---------- */
  .side {
    background: var(--bg-soft);
    border-right: 1px solid var(--line);
    padding: 14px 8px;
    user-select: none;
  }
  .ws {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 8px; border-radius: var(--radius-sm);
    cursor: pointer;
  }
  .ws:hover { background: var(--bg-hover); }
  .ws-icon {
    width: 22px; height: 22px; border-radius: 4px;
    background: linear-gradient(135deg,#1f1f1f,#3a3a3a);
    color: #fff; display: grid; place-items: center;
    font-weight: 600; font-size: 12px;
  }
  .ws-name { font-weight: 600; flex: 1; font-size: 14px; }
  .ws-caret { color: var(--ink-3); font-size: 12px; }

  .side-search {
    margin: 12px 4px 6px; padding: 5px 8px;
    color: var(--ink-3); font-size: 13px;
    display: flex; align-items: center; gap: 8px;
    border-radius: var(--radius-sm); cursor: pointer;
  }
  .side-search:hover { background: var(--bg-hover); }
  .side-search kbd {
    margin-left: auto; font-family: inherit; font-size: 11px;
    color: var(--ink-3); background: #fff; border: 1px solid var(--line);
    padding: 1px 5px; border-radius: 3px;
  }

  .side-section {
    margin-top: 14px; padding: 0 8px;
    color: var(--ink-3); font-size: 12px; letter-spacing: .02em;
    text-transform: uppercase;
  }
  .nav { margin-top: 4px; display: flex; flex-direction: column; gap: 1px; }
  .nav-item {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 8px; border-radius: var(--radius-sm);
    color: var(--ink); cursor: pointer;
  }
  .nav-item:hover { background: var(--bg-hover); }
  .nav-item.active { background: #e8e6e1; font-weight: 500; }
  .nav-icon { width: 18px; text-align: center; }
  .nav-caret { margin-left: auto; color: var(--ink-3); font-size: 10px; }

  /* ---------- Main ---------- */
  .main {
    display: flex; flex-direction: column;
    min-width: 0;
  }
  .topbar {
    height: 44px; padding: 0 16px;
    border-bottom: 1px solid var(--line);
    display: flex; align-items: center; gap: 12px;
    color: var(--ink-2); font-size: 13px;
  }
  .crumbs span:not(:last-child)::after {
    content: "/"; margin: 0 6px; color: var(--ink-3);
  }
  .topbar-spacer { flex: 1; }
  .pill-live {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 2px 8px 2px 6px; background: #fff;
    border: 1px solid var(--line-strong); border-radius: 999px;
    font-size: 12px; color: var(--ink-2);
  }
  .pill-live .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #2ecc71; box-shadow: 0 0 0 0 rgba(46,204,113,.55);
    animation: pulse 1.8s infinite;
  }
  .pill-live.stale .dot { background: #e6a23c; animation: none; }
  /* 「示例数据」——未绑定真实 connector。保持灰色静态,
     避免 artifact 误称拥有它实际并不具备的实时数据源。 */
  .pill-live.sample {
    background: var(--bg-soft); color: var(--ink-3);
    border-color: var(--line);
  }
  .pill-live.sample .dot {
    background: var(--ink-4); animation: none; box-shadow: none;
  }
  @keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(46,204,113,.55); }
    70%  { box-shadow: 0 0 0 7px rgba(46,204,113,0); }
    100% { box-shadow: 0 0 0 0 rgba(46,204,113,0); }
  }

  .page {
    padding: 56px max(80px, 8vw) 80px;
    max-width: 1100px;
    width: 100%;
    align-self: center;
  }
  .page-cover {
    height: 24px; /* keep airy like Notion default */
  }
  .page-emoji {
    font-size: 64px; line-height: 1;
    margin: -4px 0 12px; cursor: default;
  }
  h1.page-title {
    font-size: 40px; line-height: 1.15;
    font-weight: 700; letter-spacing: -0.01em;
    margin: 0 0 8px; color: var(--ink);
  }
  .page-meta {
    display: flex; align-items: center; gap: 14px;
    color: var(--ink-2); font-size: 13px; margin-bottom: 28px;
  }
  .page-meta .updated { display: inline-flex; align-items: center; gap: 6px; }
  .page-meta .updated .who {
    width: 18px; height: 18px; border-radius: 50%;
    background: #f1c40f; color: #5a4500;
    display: inline-grid; place-items: center;
    font-size: 11px; font-weight: 700;
  }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; font-size: 13px; color: var(--ink);
    background: #fff; border: 1px solid var(--line-strong);
    border-radius: var(--radius-sm); cursor: pointer;
    transition: background .15s ease, transform .15s ease;
  }
  .btn:hover { background: var(--bg-hover); }
  .btn .ico { width: 14px; height: 14px; display: inline-block; }
  .btn .ico.spin { animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .btn.primary { background: var(--accent); color: #fff; border-color: transparent; }
  .btn.primary:hover { background: var(--accent-ink); }
  .btn.ghost { border-color: transparent; }
  .btn.ghost:hover { background: var(--bg-hover); }

  /* ---------- Callout ---------- */
  .callout {
    background: var(--bg-soft);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    display: flex; gap: 12px; align-items: flex-start;
    margin: 10px 0 28px;
    color: var(--ink);
  }
  .callout .emj { font-size: 18px; line-height: 1.4; }
  .callout small { color: var(--ink-2); }

  /* ---------- KPI grid ---------- */
  .kpis {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1px; background: var(--line);
    border: 1px solid var(--line); border-radius: var(--radius-md);
    overflow: hidden; margin: 8px 0 32px;
  }
  .kpi {
    background: #fff; padding: 18px 20px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .kpi .label {
    color: var(--ink-2); font-size: 12px; letter-spacing: .03em;
    text-transform: uppercase; font-weight: 500;
  }
  .kpi .value {
    font-size: 32px; font-weight: 600; letter-spacing: -0.01em;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
    transition: color .25s ease;
  }
  .kpi .value.flash { color: var(--accent-ink); }
  .kpi .delta { font-size: 12px; color: var(--ink-2); }
  .kpi .delta.up   { color: #2b8a3e; }
  .kpi .delta.down { color: #c0392b; }
  .kpi .delta .arr { display: inline-block; width: 10px; }

  /* ---------- Section heading ---------- */
  h2.h {
    font-size: 18px; font-weight: 600;
    margin: 32px 0 8px; letter-spacing: -0.005em;
  }
  .h-sub { color: var(--ink-2); font-size: 13px; margin-bottom: 12px; }

  /* ---------- Two-col block ---------- */
  .two-col {
    display: grid; grid-template-columns: 1.1fr 1fr; gap: 24px;
    margin-bottom: 8px;
  }

  /* Sparkline card */
  .card {
    background: #fff; border: 1px solid var(--line);
    border-radius: var(--radius-md); padding: 16px 18px;
  }
  .card-title {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px; color: var(--ink-2); margin-bottom: 8px;
  }
  .card-title strong { color: var(--ink); font-weight: 600; }
  .spark { width: 100%; height: 120px; }
  .spark-axis { color: var(--ink-3); font-size: 11px; }
  .spark-fill { fill: rgba(46,170,220,.10); }
  .spark-line { fill: none; stroke: var(--accent); stroke-width: 2; }
  .spark-dot { fill: var(--accent); }
  .spark-grid line { stroke: var(--line); stroke-dasharray: 2 3; }

  /* Activity feed */
  .feed { display: flex; flex-direction: column; }
  .feed-row {
    display: flex; gap: 12px; padding: 10px 4px;
    border-bottom: 1px solid var(--line);
  }
  .feed-row:last-child { border-bottom: none; }
  .feed-row .av {
    flex: 0 0 26px; width: 26px; height: 26px; border-radius: 50%;
    display: grid; place-items: center;
    color: #fff; font-size: 11px; font-weight: 700;
  }
  .feed-row .body { flex: 1; min-width: 0; font-size: 13px; }
  .feed-row .body .who { font-weight: 600; }
  .feed-row .body .what { color: var(--ink); }
  .feed-row .body .target { color: var(--accent-ink); border-bottom: 1px dotted var(--accent); cursor: pointer; }
  .feed-row .time { color: var(--ink-3); font-size: 12px; flex: 0 0 auto; }
  .feed-row.new { background: rgba(46,170,220,.06); }
  .feed-row.new .body .who::before {
    content: "•"; color: var(--accent); margin-right: 6px;
  }

  /* ---------- Database table ---------- */
  .db {
    border: 1px solid var(--line); border-radius: var(--radius-md);
    overflow: hidden; margin-top: 4px;
    background: #fff;
  }
  .db-head, .db-row {
    display: grid;
    grid-template-columns: 32px 2.4fr 1fr 1fr 0.9fr 0.9fr;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
  }
  .db-head {
    background: var(--bg-soft); color: var(--ink-2);
    font-size: 12px; text-transform: uppercase; letter-spacing: .03em;
    font-weight: 500;
  }
  .db-row:last-child { border-bottom: none; }
  .db-row:hover { background: var(--bg-soft); }
  .db-row.changed { animation: rowflash 1.4s ease; }
  @keyframes rowflash {
    0% { background: rgba(46,170,220,.18); }
    100% { background: transparent; }
  }
  .db-cell.title { font-weight: 500; display: flex; align-items: center; gap: 6px; min-width: 0; }
  .db-cell.title .t { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .db-cell .pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 3px;
    font-size: 12px; font-weight: 500;
  }
  .pill.done     { background: var(--pill-done-bg);     color: var(--pill-done-ink); }
  .pill.progress { background: var(--pill-progress-bg); color: var(--pill-progress-ink); }
  .pill.blocked  { background: var(--pill-blocked-bg);  color: var(--pill-blocked-ink); }
  .pill.todo     { background: var(--pill-todo-bg);     color: var(--pill-todo-ink); }
  .pill.review   { background: var(--pill-review-bg);   color: var(--pill-review-ink); }

  .person {
    display: inline-flex; align-items: center; gap: 6px;
  }
  .person .av {
    width: 18px; height: 18px; border-radius: 50%;
    color: #fff; display: grid; place-items: center;
    font-size: 10px; font-weight: 700;
  }

  /* ---------- Footer ---------- */
  .footer {
    margin-top: 32px; padding-top: 16px;
    border-top: 1px solid var(--line);
    color: var(--ink-3); font-size: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .footer .key { font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                 background: var(--bg-soft); padding: 1px 5px; border-radius: 3px; color: var(--ink-2); }

  /* ---------- Toast ---------- */
  .toast {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: #1f1f1f; color: #fff; padding: 8px 14px;
    border-radius: 8px; font-size: 13px;
    opacity: 0; pointer-events: none;
    transition: opacity .2s ease, transform .2s ease;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(-2px); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }

  @media (max-width: 980px) {
    .app { grid-template-columns: 1fr; }
    .side { display: none; }
    .page { padding: 32px 20px 64px; }
    .kpis { grid-template-columns: repeat(2, 1fr); }
    .two-col { grid-template-columns: 1fr; }
    .db-head, .db-row { grid-template-columns: 24px 1.8fr 0.8fr 0.8fr; }
    .db-cell.due, .db-cell.priority { display: none; }
  }
</style>
</head>
<body>
<div class="app">

  <!-- ============ SIDEBAR ============ -->
  <!-- 侧边栏行是可交互的——每个可点击的 .ws / .side-search /
       .nav-item 都带有 role="button" + tabindex="0",以便键盘用户
       可以聚焦到它们。激活处理在下方脚本中接线。 -->
  <aside class="side">
    <div class="ws" role="button" tabindex="0">
      <div class="ws-icon">N</div>
      <div class="ws-name">NevoFlux 工作室</div>
      <div class="ws-caret">⌄</div>
    </div>

    <div class="side-search" role="button" tabindex="0">
      <span>🔎</span><span>搜索</span><kbd>⌘K</kbd>
    </div>
    <div class="side-search" role="button" tabindex="0">
      <span>⌚</span><span>更新</span>
    </div>
    <div class="side-search" role="button" tabindex="0">
      <span>⚙️</span><span>设置与成员</span>
    </div>

    <div class="side-section">工作区</div>
    <div class="nav">
      <div class="nav-item active" role="button" tabindex="0" aria-current="page">
        <span class="nav-icon">📊</span><span>团队仪表板</span>
      </div>
      <div class="nav-item" role="button" tabindex="0">
        <span class="nav-icon">✅</span><span>Agent 运行</span>
        <span class="nav-caret">›</span>
      </div>
      <div class="nav-item" role="button" tabindex="0">
        <span class="nav-icon">🧠</span><span>GBrain 知识库</span>
        <span class="nav-caret">›</span>
      </div>
      <div class="nav-item" role="button" tabindex="0">
        <span class="nav-icon">🎨</span><span>Canvas 应用</span>
      </div>
      <div class="nav-item" role="button" tabindex="0">
        <span class="nav-icon">📦</span><span>资源包 Packs</span>
      </div>
    </div>

    <div class="side-section">私有</div>
    <div class="nav">
      <div class="nav-item" role="button" tabindex="0"><span class="nav-icon">🗒️</span><span>构建日志</span></div>
      <div class="nav-item" role="button" tabindex="0"><span class="nav-icon">📥</span><span>收件箱</span></div>
    </div>

    <div class="side-section">连接</div>
    <div class="nav">
      <div class="nav-item" role="button" tabindex="0"><span class="nav-icon">🔌</span><span>GBrain · nevoflux.app</span></div>
    </div>
  </aside>

  <!-- ============ MAIN ============ -->
  <main class="main">

    <div class="topbar">
      <div class="crumbs">
        <span>NevoFlux 工作室</span>
        <span>工作区</span>
        <span>团队仪表板</span>
      </div>
      <div class="topbar-spacer"></div>
      <div class="pill-live sample" id="livePill" title="未绑定 connector —— 以下数值为 seed 兜底的示例数据">
        <span class="dot"></span>
        <span id="liveText">示例数据</span>
      </div>
    </div>

    <div class="page">
      <div class="page-cover"></div>
      <div class="page-emoji">📊</div>
      <h1 class="page-title">团队仪表板</h1>
      <div class="page-meta">
        <div class="updated">
          <span class="who">索</span>
          <span>最近编辑者 <strong>索拉·陈</strong></span>
        </div>
        <span>·</span>
        <span id="updatedAt">刚刚刷新</span>
        <span style="flex:1"></span>
        <button class="btn ghost" id="autoBtn" title="每 30 秒自动刷新">
          <span>⏱</span><span id="autoLbl">自动 · 开</span>
        </button>
        <button class="btn primary" id="refreshBtn" title="从 GBrain 拉取最新(示例模式 —— 刷新 seed 数据)">
          <span class="ico" id="refreshIco">↻</span>
          <span>从 GBrain 刷新</span>
        </button>
      </div>

      <div class="callout">
        <div class="emj">💡</div>
        <div>
          <div><strong>本页是运行在示例数据上的 Live Artifact。</strong>
          其结构与 <strong>NevoFlux 工作室</strong> 工作区通过 GBrain
          connector 返回的形态一致 —— 但下面的数值、姓名、任务与动态
          均为 seed 兜底的固定数据,而非真实工作区。</div>
          <small>当绑定 connector 后,该 pill 会切换为 <em>实时 · 已同步</em>,
          同一渲染器即可绘制真实数据。在此之前,刷新仅对 seed 兜底数据
          做补间,使实时行为在离线时仍可演示。</small>
        </div>
      </div>

      <!-- KPI -->
      <div class="kpis">
        <div class="kpi">
          <div class="label">任务总数</div>
          <div class="value" id="kTotal">142</div>
          <div class="delta up"><span class="arr">↑</span> 较上周 +6</div>
        </div>
        <div class="kpi">
          <div class="label">本周完成</div>
          <div class="value" id="kDone">23</div>
          <div class="delta up"><span class="arr">↑</span> 较上周 +4</div>
        </div>
        <div class="kpi">
          <div class="label">活跃成员</div>
          <div class="value" id="kPeople">11<span style="color:var(--ink-3); font-size:18px; font-weight:500"> / 14</span></div>
          <div class="delta">·  稳定</div>
        </div>
        <div class="kpi">
          <div class="label">待评审 Canvas 应用</div>
          <div class="value" id="kReview">7</div>
          <div class="delta down"><span class="arr">↓</span> 较上周 -2</div>
        </div>
      </div>

      <!-- Two col -->
      <div class="two-col">

        <div class="card">
          <div class="card-title">
            <strong>近 7 天新建任务</strong>
            <span id="sparkSum">合计 98</span>
          </div>
          <svg class="spark" viewBox="0 0 600 140" preserveAspectRatio="none" id="sparkSvg">
            <!-- grid -->
            <g class="spark-grid">
              <line x1="0" y1="35"  x2="600" y2="35"/>
              <line x1="0" y1="70"  x2="600" y2="70"/>
              <line x1="0" y1="105" x2="600" y2="105"/>
            </g>
            <path class="spark-fill" id="sparkFill" d=""></path>
            <path class="spark-line" id="sparkLine" d=""></path>
            <g id="sparkDots"></g>
            <g id="sparkLabels" class="spark-axis"></g>
          </svg>
        </div>

        <div class="card">
          <div class="card-title">
            <strong>最近动态</strong>
            <span>来自 <span style="color:var(--accent-ink)">GBrain</span></span>
          </div>
          <div class="feed" id="feed"></div>
        </div>

      </div>

      <!-- Database -->
      <h2 class="h">📋 任务 · 当前 Sprint</h2>
      <div class="h-sub">关联数据库 · 按 状态 ≠ 完成 过滤 · 按 更新时间 排序</div>
      <div class="db" id="db">
        <div class="db-head">
          <div></div>
          <div>名称</div>
          <div>状态</div>
          <div>负责人</div>
          <div class="db-cell due">截止</div>
          <div class="db-cell priority">优先级</div>
        </div>
        <!-- rows injected -->
      </div>

      <div class="footer">
        <span>来源:GBrain API · 工作区 <strong>nevoflux.app</strong></span>
        <span>·</span>
        <span>Connector <span class="key">gbrain.workspace</span></span>
        <span>·</span>
        <span id="footerTime"></span>
      </div>

    </div>
  </main>
</div>

<div class="toast" id="toast">已同步 —— 来自 GBrain 的 3 项变更</div>

<script>
(function(){
  // ---------- Fake data state ----------
  const PEOPLE = [
    { id: "索", name: "索拉·陈", color: "#f1c40f" },
    { id: "米", name: "米洛·朴", color: "#3498db" },
    { id: "林", name: "林·赵",   color: "#e67e22" },
    { id: "丹", name: "丹娜·托雷斯", color: "#9b59b6" },
    { id: "秋", name: "秋·中村", color: "#1abc9c" },
    { id: "拉", name: "拉维·帕特尔", color: "#e74c3c" }
  ];

  const ROW_POOL = [
    { icon: "🚀", title: "NevoFlux 浏览器 Q3 路线图规划",  status: "progress", who: "索", due: "5月12日", prio: "高" },
    { icon: "🎨", title: "Canvas 应用画廊 v2 规格",        status: "review",   who: "林", due: "5月14日", prio: "中" },
    { icon: "🐛", title: "修复大型 PDF 上 GBrain 索引超时", status: "blocked",  who: "米", due: "5月09日", prio: "高" },
    { icon: "📊", title: "Agent SDK 定价实验复盘",        status: "todo",     who: "丹", due: "5月18日", prio: "低" },
    { icon: "✍️", title: "发布博客草稿 · Live Artifacts",  status: "progress", who: "秋", due: "5月11日", prio: "高" },
    { icon: "🔐", title: "轮换 GBrain connector 令牌",     status: "todo",     who: "拉", due: "5月20日", prio: "中" },
    { icon: "🧪", title: "QA design-pack 上手流程",        status: "review",   who: "米", due: "5月16日", prio: "中" },
    { icon: "📦", title: "发布分析类设计 skill 资源包",    status: "progress", who: "林", due: "5月13日", prio: "低" }
  ];

  const ACTIVITY_TEMPLATES = [
    (p, t) => ({ who: p, action: "移动了", target: t, suffix: "至 完成",     icon: "✅" }),
    (p, t) => ({ who: p, action: "创建了",  target: t, suffix: "于 任务",   icon: "➕" }),
    (p, t) => ({ who: p, action: "评论了", target: t, suffix: "",       icon: "💬" }),
    (p, t) => ({ who: p, action: "更新了",  target: t, suffix: "的属性", icon: "✏️" }),
    (p, t) => ({ who: p, action: "分享了",   target: t, suffix: "至 GBrain 频道", icon: "🔗" }),
    (p, t) => ({ who: p, action: "添加了",    target: t, suffix: "至 Sprint",  icon: "📌" })
  ];

  const SEED_FEED = [
    { who: "索拉·陈", action: "移动了",  target: "NevoFlux 浏览器 Q3 路线图规划", suffix: "至 进行中", icon: "🚀", mins: 3 },
    { who: "米洛·朴", action: "评论了",  target: "修复大型 PDF 上 GBrain 索引超时", suffix: "",     icon: "💬", mins: 11 },
    { who: "林·赵",   action: "创建了",  target: "Canvas 应用画廊 v2 规格",       suffix: "于 文档", icon: "🎨", mins: 26 },
    { who: "秋·中村", action: "分享了",  target: "发布博客草稿 · Live Artifacts", suffix: "至 GBrain 频道", icon: "🔗", mins: 41 },
    { who: "丹娜·托雷斯", action: "更新了", target: "Agent SDK 定价实验复盘",     suffix: "的属性",   icon: "✏️", mins: 58 }
  ];

  let kpi = { total: 142, done: 23, people: 11, peopleAll: 14, review: 7 };
  let series = [8, 12, 15, 9, 18, 22, 14];
  let dayLabels = ["周三","周四","周五","周六","周日","周一","周二"];
  let lastRefresh = new Date();
  let autoOn = true;
  let autoTimer = null;

  // ---------- DOM refs ----------
  const $ = (id) => document.getElementById(id);
  const refreshBtn = $("refreshBtn");
  const refreshIco = $("refreshIco");
  const autoBtn = $("autoBtn");
  const autoLbl = $("autoLbl");
  const updatedAt = $("updatedAt");
  const liveText = $("liveText");
  const livePill = $("livePill");
  const toast = $("toast");
  const footerTime = $("footerTime");

  // ---------- Helpers ----------
  // 下方写入 innerHTML 的每个动态值都会经过 e():
  // 任务标题 / 动态字符串 / 人名都可能来自 connector 载荷,
  // 未转义的 innerHTML 是一个真实可用的 XSS 注入点。
  function e(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
  function avatar(personId) {
    const p = PEOPLE.find(x => x.id === personId);
    if (!p) return "";
    return `<span class="av" style="background:${e(p.color)}">${e(p.id)}</span>`;
  }
  function personChip(personId) {
    const p = PEOPLE.find(x => x.id === personId);
    if (!p) return "";
    return `<span class="person">${avatar(personId)}<span>${e(p.name)}</span></span>`;
  }
  function timeAgo(date) {
    const s = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (s < 5)   return "刚刚";
    if (s < 60)  return s + " 秒前";
    const m = Math.floor(s / 60);
    if (m < 60)  return m + " 分钟前";
    const h = Math.floor(m / 60);
    if (h < 24)  return h + " 小时前";
    return Math.floor(h/24) + " 天前";
  }
  function fmtDateTime(d) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
           " · " + d.toLocaleDateString([], { month: "short", day: "numeric" });
  }
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  // 减少动效门控。上方的 CSS @media 块已中和了
  // CSS 动画/过渡,但 tweenText() 会调度 JS rAF 更新,
  // flash() 会切换一个瞬态高亮类 —— 对于选择退出动效的
  // 用户,二者仍会继续运动,除非在此短路关闭。
  function reduceMotion() {
    return typeof window !== "undefined"
      && typeof window.matchMedia === "function"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function tween(el, from, to, ms = 600) {
    if (!el) return;
    if (from === to || reduceMotion()) {
      el.firstChild ? (el.childNodes[0].nodeValue = to) : (el.textContent = to);
      return;
    }
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (to - from) * eased);
      el.firstChild ? (el.childNodes[0].nodeValue = v) : (el.textContent = v);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- Render: KPI ----------
  function renderKpi(prev) {
    const flash = (el) => {
      if (!el || reduceMotion()) return;
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 700);
    };
    if (prev) {
      tweenText($("kTotal"),  prev.total,  kpi.total);   if (prev.total  !== kpi.total)  flash($("kTotal"));
      tweenText($("kDone"),   prev.done,   kpi.done);    if (prev.done   !== kpi.done)   flash($("kDone"));
      tweenText($("kReview"), prev.review, kpi.review);  if (prev.review !== kpi.review) flash($("kReview"));
      // people 渲染保留 html —— 数值是安全的,但仍让它们
      // 经过 e(),以便 connector 驱动的载荷可以沿相同路径
      // 流过而无需重新审视该标记。
      $("kPeople").innerHTML = e(kpi.people) + `<span style="color:var(--ink-3); font-size:18px; font-weight:500"> / ${e(kpi.peopleAll)}</span>`;
      if (prev.people !== kpi.people) flash($("kPeople"));
    } else {
      $("kTotal").textContent  = kpi.total;
      $("kDone").textContent   = kpi.done;
      $("kReview").textContent = kpi.review;
      $("kPeople").innerHTML   = e(kpi.people) + `<span style="color:var(--ink-3); font-size:18px; font-weight:500"> / ${e(kpi.peopleAll)}</span>`;
    }
  }
  function tweenText(el, from, to, ms = 600) {
    if (!el) return;
    if (from === to || reduceMotion()) { el.textContent = String(to); return; }
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (to - from) * eased);
      el.textContent = v;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- Render: sparkline ----------
  function renderSpark() {
    const W = 600, H = 140, padL = 24, padR = 16, padT = 10, padB = 24;
    const max = Math.max(...series, 1);
    const stepX = (W - padL - padR) / (series.length - 1);
    const pts = series.map((v, i) => {
      const x = padL + i * stepX;
      const y = padT + (1 - v / (max * 1.15)) * (H - padT - padB);
      return [x, y];
    });
    const linePath = "M " + pts.map(p => p.join(" ")).join(" L ");
    const fillPath = linePath + ` L ${pts[pts.length-1][0]} ${H - padB} L ${pts[0][0]} ${H - padB} Z`;
    $("sparkLine").setAttribute("d", linePath);
    $("sparkFill").setAttribute("d", fillPath);

    const dots = pts.map(([x,y]) => `<circle class="spark-dot" cx="${x}" cy="${y}" r="3"/>`).join("");
    $("sparkDots").innerHTML = dots;

    const labels = dayLabels.map((d, i) => {
      const x = padL + i * stepX;
      return `<text x="${x}" y="${H - 6}" text-anchor="middle">${d}</text>`;
    }).join("");
    $("sparkLabels").innerHTML = labels;

    $("sparkSum").textContent = "合计 " + series.reduce((a,b)=>a+b,0);
  }

  // ---------- Render: feed ----------
  let feed = SEED_FEED.map(x => ({...x, when: new Date(Date.now() - x.mins * 60 * 1000), id: cryptoRandomId() }));
  function cryptoRandomId() { return "f" + Math.random().toString(36).slice(2, 9); }
  function renderFeed(highlightId) {
    const el = $("feed");
    // 在减少动效下丢弃瞬态的 .new 高亮,使该行不会为选择
    // 退出动效的用户产生彩色背景脉冲。
    const effectiveHighlight = reduceMotion() ? null : highlightId;
    el.innerHTML = feed.slice(0, 6).map(item => {
      const initials = String(item.who||"").slice(0, 1);
      const color = personColor(item.who);
      const cls = item.id === effectiveHighlight ? "feed-row new" : "feed-row";
      const suffixHtml = item.suffix ? `<span class="what"> ${e(item.suffix)}</span>` : "";
      return `
        <div class="${cls}" data-id="${e(item.id)}">
          <span class="av" style="background:${e(color)}">${e(initials)}</span>
          <div class="body">
            <span class="who">${e(item.who)}</span>
            <span class="what"> ${e(item.action)}</span>
            <span class="target"> ${e(item.icon || "")} ${e(item.target)}</span>
            ${suffixHtml}
          </div>
          <div class="time" title="${e(item.when.toLocaleString())}">${e(timeAgo(item.when))}</div>
        </div>`;
    }).join("");
  }
  function personColor(name) {
    const p = PEOPLE.find(x => x.name === name);
    return p ? p.color : "#7f8c8d";
  }

  // ---------- Render: db rows ----------
  let rows = ROW_POOL.slice(0, 6).map((r, i) => ({...r, id: "r"+i, updated: Date.now() - (i+1)*1800000 }));
  function renderRows(changedId) {
    const head = document.querySelector(".db-head");
    const db = $("db");
    [...db.querySelectorAll(".db-row")].forEach(n => n.remove());
    const sorted = [...rows].sort((a,b) => b.updated - a.updated);
    const STATUS_LABEL = { done: "完成", progress: "进行中", blocked: "阻塞", todo: "待办", review: "评审中" };
    // 与 renderFeed 相同的减少动效门控:跳过 .changed
    // 行高亮类,以免为选择退出动效的用户绘制瞬态高亮
    //(rowflash CSS 动画已被上方 prefers-reduced-motion
    // @media 块中和,但该类仍会暗示意图)。
    const effectiveChanged = reduceMotion() ? null : changedId;
    sorted.forEach(r => {
      const div = document.createElement("div");
      div.className = "db-row" + (r.id === effectiveChanged ? " changed" : "");
      div.dataset.id = r.id;
      const statusKey = STATUS_LABEL[r.status] ? r.status : "todo";
      const statusLabel = STATUS_LABEL[statusKey];
      div.innerHTML = `
        <div class="db-cell">${e(r.icon)}</div>
        <div class="db-cell title"><span class="t">${e(r.title)}</span></div>
        <div class="db-cell"><span class="pill ${statusKey}">${e(statusLabel)}</span></div>
        <div class="db-cell">${personChip(r.who)}</div>
        <div class="db-cell due">${e(r.due)}</div>
        <div class="db-cell priority">${e(r.prio)}</div>
      `;
      db.appendChild(div);
    });
  }

  // ---------- Refresh logic (the live bit) ----------
  let busy = false;
  async function refresh({silent = false} = {}) {
    if (busy) return;
    busy = true;
    refreshIco.classList.add("spin");
    livePill.classList.remove("stale");
    liveText.textContent = "同步中…";

    // 模拟一次 GBrain API 调用的延迟。
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));

    const prev = {...kpi};
    const changes = [];

    // 朝合理方向变更状态。
    const newDone = Math.random() < 0.7 ? 1 : 0;
    if (newDone) {
      kpi.done   += 1;
      kpi.total  += Math.random() < 0.5 ? 1 : 0;
      // 将某行翻转为完成
      const candidates = rows.filter(r => r.status !== "done");
      if (candidates.length) {
        const r = rand(candidates);
        r.status = "done";
        r.updated = Date.now();
        changes.push({ kind: "row", id: r.id, row: r });
      }
    } else {
      // 新建一条全新任务
      const rest = ROW_POOL.filter(p => !rows.some(r => r.title === p.title));
      const tmpl = rest.length ? rand(rest) : rand(ROW_POOL);
      const r = { ...tmpl, id: "r" + Date.now(), status: "todo", updated: Date.now() };
      rows = [r, ...rows].slice(0, 8);
      kpi.total += 1;
      changes.push({ kind: "row", id: r.id, row: r });
    }

    if (Math.random() < 0.4) {
      kpi.review = Math.max(0, kpi.review + (Math.random() < 0.5 ? -1 : 1));
    }
    if (Math.random() < 0.25) {
      kpi.people = Math.min(kpi.peopleAll, Math.max(6, kpi.people + (Math.random() < 0.5 ? -1 : 1)));
    }

    // 序列移位:今日桶 +1~3
    series = series.slice();
    series[series.length - 1] = series[series.length - 1] + 1 + Math.floor(Math.random()*2);

    // 添加一条新的动态项
    const lastChange = changes[changes.length - 1];
    const person = rand(PEOPLE);
    const tmpl = rand(ACTIVITY_TEMPLATES);
    const targetTitle = lastChange ? lastChange.row.title : rand(ROW_POOL).title;
    const evt = tmpl(person.name, targetTitle);
    evt.when = new Date();
    evt.id = cryptoRandomId();
    feed = [evt, ...feed].slice(0, 8);

    lastRefresh = new Date();
    busy = false;
    refreshIco.classList.remove("spin");
    // 此处仅为 mock 模式 —— 保留「示例数据」徽标,
    // 使 artifact 永不误称已绑定真实 connector。
    liveText.textContent = "示例数据";
    livePill.classList.remove("stale");
    livePill.classList.add("sample");

    renderKpi(prev);
    renderSpark();
    renderFeed(evt.id);
    renderRows(lastChange ? lastChange.id : null);
    updateTimes();

    if (!silent) showToast("已刷新示例数据 · 移动 1 项任务,新增 1 条动态");
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function updateTimes() {
    updatedAt.textContent = "最近刷新 " + timeAgo(lastRefresh);
    footerTime.textContent = "最近同步 · " + fmtDateTime(lastRefresh);
    // 示例模式(未绑定 connector)是粘性的 —— artifact 永不
    // 对兜底数据声称「实时 · 已同步」。仅当连示例刷新循环
    // 都已许久未运行(例如自动刷新被暂停)时,pill 才会
    // 升级为「过期 · …」。
    if ((Date.now() - lastRefresh.getTime()) > 90 * 1000) {
      livePill.classList.add("stale");
      livePill.classList.remove("sample");
      liveText.textContent = "过期 · " + timeAgo(lastRefresh);
    } else {
      livePill.classList.remove("stale");
      livePill.classList.add("sample");
      liveText.textContent = "示例数据";
    }
  }

  // ---------- Keyboard activation for role=button divs ----------
  // .ws / .side-search / .nav-item 被样式化为可点击的行,但它们
  // 是 <div>,键盘用户默认无法操作。将 Enter/Space 映射为
  // 一次合成 click,并阻止 Space 的默认滚动。
  document.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const t = ev.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.getAttribute("role") !== "button") return;
    if (t.matches("button, a, input, select, textarea")) return;
    ev.preventDefault();
    t.click();
  });

  // ---------- Init ----------
  function init() {
    renderKpi();
    renderSpark();
    renderFeed();
    renderRows();
    updateTimes();
    // 「打开即刷新」—— artifact 挂载的那一刻。
    setTimeout(() => refresh({silent: true}), 600);
  }

  // ---------- Wire events ----------
  refreshBtn.addEventListener("click", () => refresh());
  autoBtn.addEventListener("click", () => {
    autoOn = !autoOn;
    autoLbl.textContent = "自动 · " + (autoOn ? "开" : "关");
    if (autoOn) startAuto(); else stopAuto();
  });
  function startAuto() { stopAuto(); autoTimer = setInterval(() => refresh({silent: true}), 30 * 1000); }
  function stopAuto() { if (autoTimer) clearInterval(autoTimer); autoTimer = null; }

  setInterval(updateTimes, 5 * 1000);

  // 每 15 秒刷新 feed 中的相对时间戳
  setInterval(() => renderFeed(), 15 * 1000);

  startAuto();
  init();
})();
</script>
</body>
</html>
```

## 用法

- `side` —— 侧边栏含工作区切换、搜索与导航。「工作区」分组列出团队仪表板、Agent 运行、GBrain 知识库、Canvas 应用与资源包 Packs;「连接」一行显示已绑定的 GBrain connector。
- `topbar` —— 面包屑加 live 状态 pill。在绑定真实 connector 前,pill 粘性保持 `sample`(灰色、静态);绑定后才会升级为「实时 · 已同步」或「过期 · …」。
- `page-meta` —— 「最近编辑者」行、`自动 · 开/关` 切换,以及主按钮「从 GBrain 刷新」。
- `callout` —— 声明本页运行在 seed 兜底数据上,而非真实工作区。
- `kpis` —— 四张 KPI 卡片(任务总数、本周完成、活跃成员、待评审 Canvas 应用);每张含大写 `label`、大号 `value` 与上/下 `delta`。
- `two-col` —— 左卡为 7 天 sparkline(修改 `series` 与 `dayLabels` 重塑曲线);右卡为 activity feed(`SEED_FEED`)。
- `db` —— 由 `ROW_POOL` 驱动的关联任务表;状态 pill 为 `done` / `progress` / `blocked` / `todo` / `review`。
- `PEOPLE` / `ROW_POOL` / `SEED_FEED` / `kpi` —— 脚本顶部的 seed 数据数组;改写它们即可替换全部姓名、任务与指标,而无需触碰标记。
