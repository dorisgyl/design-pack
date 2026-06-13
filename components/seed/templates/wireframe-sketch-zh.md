---
slug: packs/design-pack/templates/wireframe-sketch-zh
type: template
lang: zh
category: prototype
title: "手绘线框图"
title_en: "Wireframe Sketch"
description: "用手绘风格的低保真线框板探索 NevoFlux 页面布局,适合精细设计前的草稿阶段。"
tags: [wireframe, lo-fi, sketch, 草稿, 手绘, 模板]
sample_image: packs/design-pack/assets/templates/wireframe-sketch.svg
source: html-anything/wireframe-sketch
---
## 设计指导

模板:手绘 Wireframe。

意图:白板 / 草稿前阶段的 wireframe 探索。用于刚开始勾画页面想法、对比多个方案的早期阶段,还没进入高保真设计之前。

布局:
- Graph-paper(方格纸)背景。
- 多 tab labels(顶部的 variants 方案标签)。
- scribbled chart placeholders(潦草的图表占位)+ hatched fills(斜线填充)。
- Sticky-note annotations(黄色便利贴,轻微旋转一点点)。

设计细节:
- 字体:Caveat / Architects Daughter(或 Patrick Hand)——手写感,不要太工整。
- 不要规规矩矩地对齐;保留松散、手摆出来的感觉,带一点点旋转。
- 保持低保真:用方框、涂鸦和便利贴代替真实组件即可。

## 模板 (HTML)
```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux 工作台 — 线框图 v0.1</title>
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
      <h1><em>NevoFlux · 工作台</em>
        <span class="pin"><span class="x"></span>WIREFRAME v0.1</span>
      </h1>
      <div class="sub">首页画布的布局探索 — 4 个方案 + 现有界面的重新梳理</div>
      <div class="meta"><b>DATE</b> 2026-06-13 · <b>DEVICE</b> DESKTOP 1440 · <b>FIDELITY</b> LOW</div>
    </div>

    <div class="tabs" data-od-id="tabs">
      <div class="tab"><span class="glyph"></span><span class="num">00</span>全部</div>
      <div class="tab"><span class="glyph"></span><span class="num">01</span>A · 梳理型 (现有界面)</div>
      <div class="tab active"><span class="glyph"></span><span class="num">02</span>B · 仪表盘 (KPI)</div>
      <div class="tab"><span class="glyph"></span><span class="num">03</span>C · 时间线 (下次渲染)</div>
      <div class="tab"><span class="glyph"></span><span class="num">04</span>D · 动手搭建型</div>
    </div>

    <div class="canvas" data-od-id="canvas">
      <div class="section-label">
        <h2>B · 仪表盘</h2>
        <span class="pill">DATA-FORWARD</span>
      </div>
      <p class="lede">把 KPI 放在最上方。「我现在在哪一步」一眼看清 → 详情往下滚动。</p>

      <div class="browser" data-od-id="browser"><div class="dots"><span></span><span></span><span></span></div><div class="url">app.nevoflux.dev / studio / dashboard</div><div class="user">sam.builder</div></div>

      <div class="layout">
        <aside class="nav" data-od-id="sidebar">
          <span class="brand">NevoFlux</span>
          <ul>
            <li class="active"><span class="square"></span>仪表盘</li>
            <li><span class="square"></span>GBrain 知识库</li>
            <li><span class="square"></span>Canvas 应用</li>
            <li><span class="square"></span>设计包</li>
            <li><span class="square"></span>Agent 与 SDK</li>
          </ul>
        </aside>

        <div data-od-id="main">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;">
            <div>
              <div class="greeting">欢迎回来</div>
              <div class="name">sam.builder <span style="font-size:18px;color:var(--pencil);">的工作区</span></div>
            </div>
            <div class="toggle-row">
              <span class="tag">本周</span>
              <span class="tag active">本月</span>
              <span class="tag">累计</span>
            </div>
          </div>

          <div class="kpis" data-od-id="kpis">
            <div class="kpi tilt-1"><div class="label">套餐档位</div><div class="value">Pro</div><div class="small">工作室版</div></div>
            <div class="kpi tilt-2"><div class="label">GBrain 文档</div><div class="value ink" style="color:#3b6e8e;">312</div><div class="small">↑ +28 较上月</div></div>
            <div class="kpi tilt-3"><div class="label">下次渲染</div><div class="value">1 天</div><div class="small">06/14 10:00</div></div>
            <div class="kpi tilt-4"><div class="label">设计包覆盖</div><div class="value ink" style="color:#3b6e8e;">62%</div><div class="small">▰▰▰▰▰▱▱▱</div></div>
          </div>

          <div class="panels" data-od-id="panels">
            <div class="panel" data-od-id="chart">
              <h3><span class="dot"></span>CHART · 每周渲染量</h3>
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
              <h3><span class="dot"></span>USAGE · 各模块用量</h3>
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
                <text x="14" y="158" font-family="IBM Plex Mono, monospace" font-size="11" fill="#4d473d">浏览器 / GBrain / Canvas / 设计包 / SDK</text>
              </svg>
            </div>
          </div>

          <div class="events" data-od-id="events">
            <div class="label">📣 动态 (最近 3 条)</div>
            <div class="lines"><span></span><span></span><span></span></div>
          </div>

          <div class="next-step" data-od-id="next-step">
            <div class="head">● NEXT STEP / 接下来要做</div>
            <ul>
              <li>接入一个 GBrain 数据源,完成初始化</li>
              <li>用「仪表盘」设计包在 10 份样例文档上试跑</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sticky sn1" data-od-id="sticky-1"><div class="tape"></div>做成第一天就想打开的界面</div>
      <div class="sticky sn2" data-od-id="sticky-2"><div class="tape"></div><b>page-1 / 5</b><br/>留白要舒服。<br/>密度大概到 B 案这种程度。</div>
    </div>
  </div>
</body>
</html>
```

## 用法

- 头部(`.head`):左侧是项目标题加一个虚线 `.pin` 状态徽标(如 WIREFRAME v0.1);中间 `.sub` 是一句话目标;右侧 `.meta` 放 DATE / DEVICE / FIDELITY 这类标记。
- 方案标签(`.tabs`):每个布局方案一个 `.tab`,`.active` 的那个带高亮笔刷。增删方案时同步改 `.num` 编号。
- 画布(`.canvas`):某个方案的方格纸面板。`h2` + `.pill` 给方案命名;`.lede` 用一句话讲清它的思路。
- 浏览器条(`.browser`):假地址(`.url`)和登录用户(`.user`)。
- 侧边栏(`aside.nav`):`.brand` 加上产品导航;当前界面对应的 `li` 加 `active`。
- KPI 行(`.kpis`):四个 `.kpi` 卡片,每个含 `.label`、`.value`(加 `.ink` 表示非强调色数字)和一行 `.small` 说明。`.tilt-*` 让每张卡片有轻微旋转。
- 图表区(`.panels`):两个潦草占位 —— 一个折线 `CHART`,一个斜线柱状 `USAGE` 的 SVG。改 `h3` 标题、按需调整 SVG 路径/柱子即可。
- `.events` 是虚线「动态」占位,内部是灰色填充线;`.next-step` 是红框的下一步行动清单。
- 便利贴(`.sticky.sn1` / `.sn2`):黄色和粉色批注,带胶带;内容简短、轻微旋转。窗口小于 1000px 时隐藏。
