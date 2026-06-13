---
slug: packs/design-pack/templates/social-media-matrix-zh
type: template
lang: zh
category: dashboard
title: "社媒矩阵追踪面板"
title_en: "NevoFlux Social Matrix Tracker"
description: "电影感多平台分析看板:互动图表、悬浮洞察、区间对比、明暗主题切换。"
tags: [matrix, tracker, multi-platform, 模板]
sample_image: packs/design-pack/assets/templates/social-media-matrix.svg
source: html-anything/social-media-matrix
---
## 设计指导

电影感、数据密集的多平台社媒看板,用于同时追踪一个品牌在多个平台或渠道上的表现。意图:面向桌面长页的、富有沉浸感的暗色调分析控制台。

布局:
- Hero header,统一品牌、时间窗切换器与明暗主题切换。
- 多平台 KPI 矩阵,横向排平台、纵向排指标。
- 交互式图表,带悬浮 tooltip 与区间对比选区。
- 一个吸顶的洞察抽屉,展示关于悬浮或固定数据点的文字洞察。
- 一个 Top posts / Top items 网格。

设计细节:
- 明暗两套主题由 `data-theme` 驱动;二者共用同一组 CSS 变量,只是重新映射取值。
- 电影感背景:多层径向渐变、漂移的 conic-gradient 光球、胶片颗粒叠层与一道光带。不使用任何外部图片。
- 图表绘制在 `<canvas>` 上(折线、堆叠柱、环形、地域柱)外加一条内联 SVG 增长曲线,使整页完全自包含。
- 折线图支持 hover(详情)、click(固定一个点)、drag(区间统计)、Shift+Drag(保存多个区间做 A/B 对比)与 double-click(重置)。
- 所有数字均来自脚本中的一份小型 seed 数据集,因此即便尚未接入任何真实数据源,页面也能渲染出贴近真实的兜底数据。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NevoFlux 渠道矩阵看板</title>
  <style>
    :root {
      --bg0:#040612;
      --bg1:#070b1a;
      --panel:rgba(12,18,34,.66);
      --panel-2:rgba(10,15,30,.86);
      --line:rgba(163,180,220,.13);
      --line-strong:rgba(163,180,220,.24);
      --text:#edf2ff;
      --muted:#9ea9c5;
      --soft:#636f8b;
      --chip:rgba(18,25,47,.8);
      --hover:rgba(255,255,255,.06);
      --good:#68e4bd;
      --blue:#67b9ff;
      --violet:#9a86ff;
      --yellow:#f3d26e;
      --pink:#cc8cff;
      --danger:#ff7d94;
      --shadow:0 1px 0 rgba(255,255,255,.05) inset,0 18px 52px rgba(0,0,0,.45);
    }
    html[data-theme="light"] {
      --bg0:#ece7db;
      --bg1:#f8f4eb;
      --panel:rgba(255,255,255,.88);
      --panel-2:rgba(255,255,255,.97);
      --line:rgba(24,29,46,.1);
      --line-strong:rgba(24,29,46,.18);
      --text:#12182b;
      --muted:#65708a;
      --soft:#8d96ab;
      --chip:rgba(243,245,250,.97);
      --hover:rgba(8,14,30,.07);
      --good:#16976d;
      --blue:#2f8ec6;
      --violet:#7350ff;
      --yellow:#bf8f0d;
      --pink:#9b4ad5;
      --danger:#cf3e60;
      --shadow:0 1px 0 rgba(255,255,255,.8) inset,0 14px 38px rgba(20,30,60,.14);
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family:Inter,"SF Pro Display","Segoe UI",Arial,sans-serif;
      color:var(--text);
      background:
        radial-gradient(840px 460px at 88% -20%,rgba(126,104,255,.17),transparent 65%),
        radial-gradient(950px 520px at 10% -8%,rgba(90,196,255,.16),transparent 68%),
        linear-gradient(180deg,var(--bg1),var(--bg0));
      padding:20px;
      -webkit-font-smoothing:antialiased;
      overflow-y:auto;
    }

    .cinematic-bg{
      position:fixed;
      inset:-10% -5%;
      pointer-events:none;
      z-index:0;
      opacity:.92;
      filter:saturate(1.28) contrast(1.05);
      background:
        radial-gradient(420px 280px at 18% 20%,rgba(84,216,255,.22),transparent 70%),
        radial-gradient(500px 360px at 80% 12%,rgba(174,125,255,.2),transparent 70%),
        radial-gradient(520px 420px at 50% 85%,rgba(255,202,114,.15),transparent 72%);
      animation:bgDrift 15s ease-in-out infinite alternate;
    }
    .cinematic-bg::before,
    .cinematic-bg::after{
      content:"";
      position:absolute;
      width:40vw;
      height:40vw;
      border-radius:50%;
      filter:blur(28px);
      opacity:.22;
      mix-blend-mode:screen;
    }
    .cinematic-bg::before{left:8%;top:24%;background:conic-gradient(from 80deg,#4f83ff,#8b6dff,#df82ff,#58c4ff,#4f83ff);animation:orb1 18s linear infinite}
    .cinematic-bg::after{right:6%;bottom:8%;background:conic-gradient(from 180deg,#f1b04d,#d67dff,#68e4bd,#f1b04d);animation:orb2 20s linear infinite}
    .cinematic-bg .grain{
      position:absolute;inset:0;opacity:.12;mix-blend-mode:soft-light;pointer-events:none;
      background-image:radial-gradient(rgba(255,255,255,.35) .45px, transparent .45px);
      background-size:3px 3px;
    }
    .cinematic-bg .streak{
      position:absolute;inset:-20% -20% auto auto;width:75vw;height:35vh;pointer-events:none;
      transform:rotate(-8deg);
      background:linear-gradient(90deg,transparent,rgba(133,183,255,.16),rgba(216,140,255,.12),transparent);
      filter:blur(10px);
      animation:streakMove 9s ease-in-out infinite alternate;
    }

    @keyframes bgDrift{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,-18px,0)}}
    @keyframes orb1{to{transform:rotate(360deg)}}
    @keyframes orb2{to{transform:rotate(-360deg)}}
    @keyframes streakMove{from{transform:rotate(-8deg) translateX(-2%)}to{transform:rotate(-8deg) translateX(8%)}}

    .app{max-width:1540px;margin:0 auto;position:relative;z-index:2}
    .app::before{
      content:"";
      position:fixed;
      left:-8vw; bottom:-18vh;
      width:48vw; height:48vw;
      border-radius:50%;
      background:radial-gradient(circle,rgba(255,94,170,.14),rgba(125,80,255,.06) 45%,transparent 75%);
      filter:blur(8px);
      pointer-events:none;
      z-index:-1;
    }
    .topbar{display:flex;justify-content:space-between;align-items:center;padding:8px 2px 16px}
    .brand{display:flex;align-items:center;gap:12px;font-weight:700}
    .tag{font-size:10px;letter-spacing:1.7px;text-transform:uppercase;color:#d3f9ee;padding:5px 10px;border-radius:999px;background:linear-gradient(90deg,rgba(104,228,189,.35),rgba(103,185,255,.22),rgba(204,140,255,.26));border:1px solid rgba(220,240,255,.35);box-shadow:0 0 20px rgba(104,228,189,.28)}
    .user{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
    .avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#2e354d,#0e1222);border:1px solid var(--line-strong)}
    .chip{height:30px;border:1px solid var(--line-strong);background:var(--chip);color:var(--text);border-radius:999px;padding:0 12px;font-size:11px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;cursor:pointer;transition:.2s}
    .chip:hover{transform:translateY(-1px);background:var(--hover)}
    .chip.active{color:#fff;background:#0f152a;border-color:rgba(255,255,255,.2)}
    html[data-theme="light"] .chip.active{color:#fff;background:#111727;border-color:#111727}

    .frame{
      border:1px solid var(--line);
      background:linear-gradient(180deg,var(--panel),var(--panel-2));
      border-radius:18px;
      box-shadow:var(--shadow);
      padding:16px;
      backdrop-filter: blur(14px);
      position:relative;
      overflow:hidden;
      transform-style:preserve-3d;
      transition:transform .25s ease;
    }
    .frame::before{
      content:"";
      position:absolute;
      inset:-80px -60px auto auto;
      width:460px;
      height:460px;
      border-radius:50%;
      background:radial-gradient(circle,rgba(136,106,255,.22),transparent 70%);
      pointer-events:none;
      animation:glowMove 8s ease-in-out infinite alternate;
    }
    .frame::after{
      content:"";
      position:absolute;inset:0;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.08);
      background:linear-gradient(120deg,rgba(255,255,255,.08),transparent 34%,transparent 66%,rgba(143,193,255,.09));
      pointer-events:none;
      mix-blend-mode:screen;
    }
    .frame .aura{
      position:absolute;
      right:-120px;
      top:120px;
      width:300px;
      height:300px;
      border-radius:50%;
      background:radial-gradient(circle,rgba(209,138,255,.24),rgba(119,182,255,.16),transparent 68%);
      filter:blur(3px);
      animation:auraFloat 7s ease-in-out infinite alternate;
      pointer-events:none;
    }
    @keyframes glowMove{from{transform:translate3d(0,0,0)}to{transform:translate3d(-22px,14px,0)}}
    @keyframes auraFloat{from{transform:translateY(0) translateX(0)}to{transform:translateY(-18px) translateX(-14px)}}

    .headline{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding:4px 4px 14px;position:relative;z-index:2}
    .headline h1{
      margin:0;
      font-size:50px;
      line-height:1;
      font-family:"Cormorant Garamond",serif;
      font-weight:700;
      letter-spacing:-1px;
      background:linear-gradient(92deg,#ffffff 0%,#cce3ff 32%,#e4c7ff 66%,#ffe2ad 100%);
      -webkit-background-clip:text;
      background-clip:text;
      color:transparent;
      text-shadow:0 6px 26px rgba(118,166,255,.22);
    }
    .sub{margin-top:8px;color:var(--muted);font-size:13px}
    .actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
    .btn{height:34px;border-radius:10px;border:1px solid var(--line-strong);background:var(--chip);color:var(--text);font-size:12px;padding:0 12px;cursor:pointer;transition:.2s;box-shadow:0 0 0 rgba(113,169,255,0)}
    .btn:hover{transform:translateY(-1px);box-shadow:0 0 24px rgba(113,169,255,.28)}
    .btn.primary{background:#f2b93f;color:#0f1220;border-color:#f2b93f;font-weight:700}

    .search{margin:0 4px 14px;border:1px solid var(--line);border-radius:12px;height:42px;display:flex;align-items:center;padding:0 14px;color:var(--muted);background:linear-gradient(90deg,rgba(0,0,0,.18),rgba(76,96,160,.12),rgba(0,0,0,.12));position:relative;z-index:2}
    html[data-theme="light"] .search{background:rgba(255,255,255,.62)}

    .platforms,.kpis,.grid,.bottom,.deep-grid{position:relative;z-index:2}
    .platforms{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0 4px 14px}
    .platform{border:1px solid var(--line);border-radius:12px;padding:12px;background:linear-gradient(135deg,rgba(83,112,188,.14),rgba(199,135,255,.08) 45%,var(--panel));box-shadow:0 0 0 1px rgba(255,255,255,.03) inset}
    .platform .name{font-size:12px;color:var(--muted)}
    .platform b{display:block;margin-top:4px;font-size:18px}

    .kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0 4px 14px}
    .kpi{border:1px solid var(--line);border-radius:14px;background:linear-gradient(130deg,rgba(255,255,255,.05),rgba(103,185,255,.08),rgba(198,138,255,.08),rgba(255,255,255,.01));padding:14px;animation:fadeUp .45s ease both;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
    .kpi .label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}
    .kpi .value{margin-top:8px;font-size:44px;line-height:1;font-family:"Cormorant Garamond",serif}
    .kpi .delta{font-size:12px;color:var(--good)}

    .grid{display:grid;grid-template-columns:2fr 1.2fr;gap:10px;margin:0 4px 12px}
    .bottom{display:grid;grid-template-columns:1.1fr 1.3fr 1fr;gap:10px;margin:0 4px 12px}
    .deep-grid{display:grid;grid-template-columns:1.45fr 1fr;gap:10px;margin:0 4px 12px}
    .deep-stack{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .tri-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:0 4px 12px}

    .card{border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:14px;transition:.24s;animation:fadeUp .45s ease both;position:relative;overflow:hidden}
    .card::before{
      content:"";position:absolute;inset:auto -50% -1px -50%;height:2px;
      background:linear-gradient(90deg,transparent,rgba(109,186,255,.85),rgba(198,138,255,.95),transparent);
      opacity:0;transition:opacity .25s ease;
    }
    .card::after{
      content:"";
      position:absolute;
      inset:-40% auto auto -20%;
      width:180px; height:180px;
      background:radial-gradient(circle,rgba(137,172,255,.16),transparent 70%);
      pointer-events:none;
      transition:opacity .25s ease;
      opacity:.35;
    }
    .card:hover{transform:translateY(-3px);border-color:var(--line-strong);box-shadow:0 14px 28px rgba(0,0,0,.2), 0 0 0 1px rgba(255,255,255,.05) inset}
    .card:hover::before{opacity:.95}
    .card h3{margin:0;font-size:11px;letter-spacing:1.3px;text-transform:uppercase;color:var(--muted)}

    .chart{height:220px;margin-top:16px;position:relative;border-radius:10px;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,0))}
    .curve{position:absolute;inset:0}
    .legend{display:flex;gap:16px;margin-top:8px;color:var(--muted);font-size:11px;flex-wrap:wrap}
    .dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px}

    .post{margin-top:10px;border:1px solid var(--line);border-radius:12px;padding:12px;background:rgba(0,0,0,.15)}
    html[data-theme="light"] .post{background:rgba(0,0,0,.03)}
    .post .head{display:flex;justify-content:space-between;font-size:12px;color:var(--muted)}
    .post p{font-size:13px;line-height:1.55;margin:10px 0}
    .thumb{
      height:120px;border-radius:10px;
      background:
        radial-gradient(140px 70px at 70% 20%,rgba(255,255,255,.35),transparent 60%),
        radial-gradient(120px 90px at 20% 80%,rgba(86,212,255,.35),transparent 70%),
        linear-gradient(140deg,#1b2550,#6f89ff 48%,#cf7cff 78%,#ffbf6e 100%);
      animation:pulseLight 5s ease-in-out infinite;
      box-shadow:0 0 36px rgba(142,162,255,.34) inset, 0 8px 24px rgba(0,0,0,.22);
    }
    @keyframes pulseLight{0%,100%{filter:saturate(1)}50%{filter:saturate(1.2) brightness(1.08)}}

    .list .row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--line);font-size:12px}
    .list .row:last-child{border-bottom:0}
    .pill{font-size:10px;padding:3px 8px;border-radius:999px;border:1px solid var(--line-strong);text-transform:uppercase;letter-spacing:.8px}
    .pill.good{color:var(--good);background:rgba(104,228,189,.15)}
    .table .row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:6px;padding:10px 0;border-bottom:1px solid var(--line);font-size:12px}
    .table .head{color:var(--soft);font-size:10px;letter-spacing:1px;text-transform:uppercase}

    .theme-switch{display:inline-flex;align-items:center;gap:3px;padding:3px;border-radius:999px;border:1px solid var(--line-strong);background:var(--chip)}
    .theme-switch button{height:24px;border-radius:999px;border:0;padding:0 10px;background:transparent;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.8px;cursor:pointer}
    .theme-switch button.active{background:var(--hover);color:var(--text)}

    .canvas-wrap{height:220px;margin-top:12px}
    canvas{width:100%;height:100%;border:1px solid var(--line);border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0));cursor:crosshair}

    .bar-list{margin-top:10px;display:grid;gap:10px}
    .bar-item{font-size:12px}
    .bar-head{display:flex;justify-content:space-between;color:var(--muted);margin-bottom:6px}
    .track{height:8px;border-radius:999px;background:rgba(255,255,255,.06);overflow:hidden}
    .track span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--blue),var(--violet));animation:grow 1.1s ease both}
    @keyframes grow{from{width:0!important}}

    .heatmap{display:grid;grid-template-columns:repeat(12,1fr);gap:6px;margin-top:12px}
    .heatmap div{aspect-ratio:1;border-radius:6px;background:rgba(255,255,255,.08);animation:glint 2.6s ease-in-out infinite;cursor:pointer;transition:transform .15s ease, box-shadow .15s ease}
    .heatmap div:hover{transform:translateY(-2px) scale(1.08);box-shadow:0 0 0 1px rgba(255,255,255,.3) inset, 0 8px 16px rgba(0,0,0,.25)}
    .heatmap div:nth-child(odd){animation-delay:.3s}
    .heatmap div:nth-child(3n){animation-delay:.7s}
    @keyframes glint{0%,100%{opacity:.35}50%{opacity:1}}

    .footer-note{margin:8px 6px 2px;color:var(--soft);font-size:11px;text-align:right}
    .chart-tooltip{
      position:fixed;
      z-index:30;
      pointer-events:none;
      border:1px solid var(--line-strong);
      background:var(--panel-2);
      color:var(--text);
      padding:8px 10px;
      border-radius:10px;
      font-size:11px;
      line-height:1.35;
      box-shadow:0 10px 24px rgba(0,0,0,.28);
      backdrop-filter:blur(8px);
      opacity:0;
      transform:translateY(4px);
      transition:opacity .12s ease, transform .12s ease;
      white-space:nowrap;
    }
    .chart-tooltip.show{opacity:1;transform:translateY(0)}
    .insights-panel{
      position:sticky;
      top:12px;
      z-index:8;
      margin:0 4px 14px;
      border:1px solid var(--line);
      border-radius:12px;
      padding:10px 12px;
      background:linear-gradient(110deg,rgba(120,140,255,.16),rgba(182,132,255,.09) 45%,rgba(120,222,206,.06));
      backdrop-filter:blur(8px);
      display:grid;
      grid-template-columns:1.3fr 1fr 1fr 1.2fr;
      gap:10px;
      font-size:11px;
      box-shadow:0 10px 30px rgba(86,122,255,.22), 0 0 0 1px rgba(255,255,255,.05) inset;
    }
    .insights-panel .k{
      color:var(--soft);
      text-transform:uppercase;
      letter-spacing:1px;
      font-size:10px;
      margin-bottom:4px;
    }
    .insights-panel .v{color:var(--text)}
    .insights-panel b{font-size:13px}

    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

    @media (max-width:1260px){
      .kpis,.platforms{grid-template-columns:repeat(2,minmax(0,1fr))}
      .grid,.bottom,.deep-grid,.deep-stack,.tri-grid{grid-template-columns:1fr}
      .headline h1{font-size:38px}
      .insights-panel{grid-template-columns:1fr}
    }
  </style>
</head>
<body>
  <div class="cinematic-bg"><div class="streak"></div><div class="grain"></div></div>
  <div class="app">
    <div class="topbar">
      <div class="brand">
        <span>NevoFlux</span>
        <span class="tag">数据分析</span>
      </div>
      <div class="user">
        <div class="theme-switch">
          <button id="darkBtn" class="active">暗色</button>
          <button id="lightBtn">亮色</button>
        </div>
        <button class="chip">7天</button>
        <button class="chip active">30天</button>
        <button class="chip">90天</button>
        <button class="chip">年初至今</button>
        <span style="font-size:12px;color:var(--muted)">工作区</span>
        <span class="avatar"></span>
      </div>
    </div>

    <div class="frame">
      <div class="aura"></div>
      <div class="headline">
        <div>
          <h1 id="title">本周你交付了 14 个 Canvas 应用。</h1>
          <div class="sub" id="subtitle">激活率环比上周提升 0.4%。你的头部应用达到了 420 万次智能体运行。</div>
        </div>
        <div class="actions">
          <button class="btn">导出报告</button>
          <button class="btn">自动摘要</button>
          <button class="btn primary">新建应用 +</button>
        </div>
      </div>

      <div class="search">在整个工作区中提问 — 上周表现最好的应用、来自认证成员的 GBrain 查询……</div>
      <div class="insights-panel" id="insightsPanel">
        <div><div class="k">洞察焦点</div><div class="v" id="insightFocus"><b>实时概览</b><br/>悬浮图表以查看详情。</div></div>
        <div><div class="k">固定数据点</div><div class="v" id="insightPin">无</div></div>
        <div><div class="k">区间对比</div><div class="v" id="insightRange">暂无激活区间</div></div>
        <div><div class="k">A/B 对比</div><div class="v" id="insightAB">用 Shift+拖拽 保存 2 个区间</div></div>
      </div>

      <div class="platforms" id="platforms"></div>
      <div class="kpis" id="kpis"></div>

      <div class="grid">
        <div class="card">
          <h3>工作区增长 - 30天</h3>
          <div style="font-size:54px;margin-top:10px;font-family:Cormorant Garamond,serif" id="growthValue">184.3K</div>
          <div class="sub" id="growthDelta">+4.2K 净新增</div>
          <div class="chart">
            <svg class="curve" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="var(--yellow)" />
                  <stop offset="100%" stop-color="var(--pink)" />
                </linearGradient>
              </defs>
              <path id="growthPath" d="M30 185 C120 165, 165 140, 250 130 C340 120, 430 90, 570 55" stroke="url(#lineGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="legend">
            <span><i class="dot" style="background:var(--yellow)"></i>设计包发布 +642</span>
            <span><i class="dot" style="background:var(--pink)"></i>爆款 Canvas 应用 +1.2K</span>
            <span><i class="dot" style="background:var(--blue)"></i>设计技能上线 +860</span>
          </div>
        </div>

        <div class="card">
          <h3>头部应用 - 本周</h3>
          <div class="post">
            <div class="head"><span>@nevoflux</span><span id="postPlatform">浏览器</span></div>
            <p id="postText">不再去拼接脆弱的脚本。开始交付由 GBrain 支撑的 Canvas 应用。我们的吞吐量在一个月内提升了 5 倍。</p>
            <div class="thumb"></div>
          </div>
          <div class="bar-list">
            <div class="bar-item"><div class="bar-head"><span>运行成功质量</span><span>82%</span></div><div class="track"><span style="width:82%"></span></div></div>
            <div class="bar-item"><div class="bar-head"><span>成员留存</span><span>67%</span></div><div class="track"><span style="width:67%"></span></div></div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="card list">
          <h3>待发布 + 草稿</h3>
          <div class="row"><span>Canvas 应用:知识前沿探索器</span><span class="pill good">已排期</span></div>
          <div class="row"><span>设计包:工作室设计技能</span><span class="pill">草稿</span></div>
          <div class="row"><span>文章:我们为何不再拼接脚本</span><span class="pill good">已排期</span></div>
          <div class="row"><span>案例研究:企业级 GBrain 落地</span><span class="pill">构想</span></div>
        </div>

        <div class="card table">
          <h3>渠道基准</h3>
          <div class="row head"><span>渠道</span><span>成员</span><span>增长</span><span>激活</span></div>
          <div class="row"><span>你 (NevoFlux)</span><span>610.4K</span><span style="color:var(--good)">+4.2%</span><span>6.8%</span></div>
          <div class="row"><span>GBrain 知识库</span><span>4.8M</span><span>+1.8%</span><span>5.4%</span></div>
          <div class="row"><span>Canvas 应用</span><span>2.2M</span><span>+2.4%</span><span>4.1%</span></div>
          <div class="row"><span>Agent SDK</span><span>850K</span><span>+1.2%</span><span>3.8%</span></div>
        </div>

        <div class="card list">
          <h3>激活率</h3>
          <div style="font-size:48px;margin:12px 0 4px;font-family:Cormorant Garamond,serif" id="engValue">4.8%</div>
          <div class="sub">本周构成</div>
          <div class="row"><span>运行</span><span>64%</span></div>
          <div class="row"><span>编辑</span><span>19%</span></div>
          <div class="row"><span>分享</span><span>12%</span></div>
          <div class="row"><span>收藏</span><span>5%</span></div>
        </div>
      </div>

      <div class="deep-grid">
        <div class="card">
          <h3>按小时活跃度 (UTC+8)</h3>
          <div class="canvas-wrap"><canvas id="hourChart" width="880" height="220"></canvas></div>
          <div class="sub">悬浮:详情 · 点击:固定点 · 拖拽:区间统计 · Shift+拖拽:保存多区间 · 双击:重置</div>
        </div>
        <div class="deep-stack">
          <div class="card">
            <h3>成员活跃热力图</h3>
            <div class="heatmap" id="heatmap"></div>
          </div>
          <div class="card">
            <h3>反馈构成</h3>
            <div class="canvas-wrap" style="height:152px"><canvas id="sentimentChart" width="420" height="152"></canvas></div>
          </div>
        </div>
      </div>

      <div class="deep-grid">
        <div class="card">
          <h3>应用组合表现</h3>
          <div class="canvas-wrap"><canvas id="mixChart" width="880" height="220"></canvas></div>
        </div>
        <div class="card list">
          <h3>趋势雷达</h3>
          <div class="row"><span>GBrain</span><span style="color:var(--good)">+28%</span></div>
          <div class="row"><span>Canvas 应用</span><span style="color:var(--good)">+19%</span></div>
          <div class="row"><span>设计包</span><span style="color:var(--good)">+15%</span></div>
          <div class="row"><span>#AgentSDK</span><span style="color:var(--danger)">-4%</span></div>
          <div class="row"><span>浏览器同步</span><span style="color:var(--danger)">-8%</span></div>
          <div class="row"><span>#公开构建</span><span style="color:var(--good)">+11%</span></div>
        </div>
      </div>

      <div class="deep-grid">
        <div class="card">
          <h3>跨渠道转化漏斗</h3>
          <div class="bar-list">
            <div class="bar-item"><div class="bar-head"><span>曝光</span><span>4.2M</span></div><div class="track"><span style="width:100%"></span></div></div>
            <div class="bar-item"><div class="bar-head"><span>工作区访问</span><span>428K</span></div><div class="track"><span style="width:41%"></span></div></div>
            <div class="bar-item"><div class="bar-head"><span>已激活</span><span>49K</span></div><div class="track"><span style="width:24%"></span></div></div>
            <div class="bar-item"><div class="bar-head"><span>付费席位</span><span>8.2K</span></div><div class="track"><span style="width:11%"></span></div></div>
          </div>
        </div>
        <div class="card">
          <h3>响应 SLA</h3>
          <div class="canvas-wrap" style="height:170px"><canvas id="slaChart" width="420" height="170"></canvas></div>
          <div class="sub">响应时间中位数:34分钟(目标 &lt; 45分钟)· 支持固定点与拖拽分析</div>
        </div>
      </div>

      <div class="tri-grid">
        <div class="card">
          <h3>收入 vs 算力成本</h3>
          <div class="canvas-wrap" style="height:190px"><canvas id="roiChart" width="420" height="190"></canvas></div>
          <div class="sub">跨智能体运营追踪盈利能力趋势。</div>
        </div>
        <div class="card">
          <h3>成员同期群留存</h3>
          <div class="canvas-wrap" style="height:190px"><canvas id="cohortChart" width="420" height="190"></canvas></div>
          <div class="sub">按同期群逐周观察留存质量。</div>
        </div>
        <div class="card">
          <h3>地域贡献占比</h3>
          <div class="canvas-wrap" style="height:190px"><canvas id="geoChart" width="420" height="190"></canvas></div>
          <div class="sub">各区域对总激活量的贡献。</div>
        </div>
      </div>

      <div class="footer-note">交互式预览 · 向下滚动查看更多洞察</div>
    </div>
  </div>

  <script>
    const data = {
      x:{title:"本周你交付了 14 个 Canvas 应用。",subtitle:"激活率环比上周提升 0.4%。你的头部应用达到了 420 万次智能体运行。",growth:"184.3K",growthDelta:"+4.2K 净新增",post:"不再去拼接脆弱的脚本。开始交付由 GBrain 支撑的 Canvas 应用。我们的吞吐量在一个月内提升了 5 倍。",postPlatform:"浏览器",eng:"4.8%",kpis:[["成员","184.3K","+4.18%"],["激活率","4.8%","+0.4%"],["运行 - 7天","12.8K","+18%"],["分享 - 7天","3.1K","+9%"]],platforms:[["浏览器","184.3K 成员","+2.1K"],["GBrain","42.7K 数据源","+1.6K"],["Canvas","287K 应用","+4.3K"],["Agent SDK","96.4K 调用","+1.9K"]]},
      linkedin:{title:"本周你交付了 6 个 GBrain 数据源。",subtitle:"激活率环比上周提升 0.6%。你的头部数据源达到了 98 万次智能体运行。",growth:"42.7K",growthDelta:"+1.6K 净新增",post:"我们用一个周末就把整个 wiki 索引进了 GBrain。没有管道,没有团队,只有一个工作区。",postPlatform:"GBrain",eng:"7.2%",kpis:[["数据源","42.7K","+3.7%"],["激活率","7.2%","+0.3%"],["查询 - 7天","6.4K","+10%"],["分享 - 7天","914","+9%"]],platforms:[["浏览器","184.3K 成员","+2.1K"],["GBrain","42.7K 数据源","+1.6K"],["Canvas","287K 应用","+4.3K"],["Agent SDK","96.4K 调用","+1.9K"]]},
      youtube:{title:"本周你交付了 3 个 Canvas 模板。",subtitle:"激活率环比上周提升 0.8%。你的头部模板达到了 180 万次智能体运行。",growth:"287K",growthDelta:"+4.3K 净新增",post:"我们用一个周末,借助 NevoFlux Canvas 和一份干净的 GBrain 索引,搭出了一个内部工具。",postPlatform:"Canvas",eng:"9.4%",kpis:[["应用","287K","+1.5%"],["激活率","9.4%","+0.6%"],["运行 - 7天","48.2K","+18%"],["分享 - 7天","2.2K","+9%"]],platforms:[["浏览器","184.3K 成员","+2.1K"],["GBrain","42.7K 数据源","+1.6K"],["Canvas","287K 应用","+4.3K"],["Agent SDK","96.4K 调用","+1.9K"]]},
      instagram:{title:"本周你交付了 9 条智能体流程。",subtitle:"激活率环比上周提升 0.5%。你的头部流程达到了 110 万次智能体运行。",growth:"96.4K",growthDelta:"+1.9K 净新增",post:"干净的 SDK,零胶水代码。每一次,简单都胜过过度工程。",postPlatform:"Agent SDK",eng:"6.1%",kpis:[["调用","96.4K","+2.01%"],["激活率","6.1%","+0.5%"],["运行 - 7天","22.8K","+18%"],["分享 - 7天","1.4K","+9%"]],platforms:[["浏览器","184.3K 成员","+2.1K"],["GBrain","42.7K 数据源","+1.6K"],["Canvas","287K 应用","+4.3K"],["Agent SDK","96.4K 调用","+1.9K"]]}
    };

    const ids = {
      title: document.getElementById('title'), subtitle: document.getElementById('subtitle'), growthValue: document.getElementById('growthValue'), growthDelta: document.getElementById('growthDelta'), postText: document.getElementById('postText'), postPlatform: document.getElementById('postPlatform'), kpis: document.getElementById('kpis'), platforms: document.getElementById('platforms'), engValue: document.getElementById('engValue')
    };

    function numberTween(el, toText){
      const target = parseFloat(toText.replace(/[^0-9.]/g,''));
      if(Number.isNaN(target)){el.textContent = toText; return;}
      const suffix = toText.replace(/[0-9.]/g,'');
      const start = 0;
      const t0 = performance.now();
      const dur = 700;
      function tick(t){
        const p = Math.min((t - t0)/dur,1);
        const v = start + (target - start) * (1 - Math.pow(1-p,3));
        el.textContent = (target >= 100 ? v.toFixed(1) : v.toFixed(1)) + suffix;
        if(p < 1) requestAnimationFrame(tick); else el.textContent = toText;
      }
      requestAnimationFrame(tick);
    }

    function renderNetwork(network){
      const d = data[network];
      ids.title.textContent = d.title;
      ids.subtitle.textContent = d.subtitle;
      numberTween(ids.growthValue, d.growth);
      ids.growthDelta.textContent = d.growthDelta;
      ids.postText.textContent = d.post;
      ids.postPlatform.textContent = d.postPlatform;
      numberTween(ids.engValue, d.eng);
      ids.platforms.innerHTML = d.platforms.map(p => `<div class="platform"><div class="name">${p[0]}</div><b>${p[1]}</b><div style="margin-top:5px;color:var(--good);font-size:12px">${p[2]}</div></div>`).join('');
      ids.kpis.innerHTML = d.kpis.map((k,i) => `<div class="kpi" style="animation-delay:${i*0.05}s"><div class="label">${k[0]}</div><div class="value">${k[1]}</div><div class="delta">${k[2]}</div></div>`).join('');
    }

    function setTheme(mode){
      document.documentElement.setAttribute('data-theme', mode);
      darkBtn.classList.toggle('active', mode === 'dark');
      lightBtn.classList.toggle('active', mode === 'light');
      drawAllCharts();
    }

    const chartState = {};
    const interactionState = {
      line: {
        hourChart: { pin: null, dragStart: null, dragEnd: null, dragging: false, ranges: [] },
        slaChart: { pin: null, dragStart: null, dragEnd: null, dragging: false, ranges: [] },
        roiChart: { pin: null, dragStart: null, dragEnd: null, dragging: false, ranges: [] },
        cohortChart: { pin: null, dragStart: null, dragEnd: null, dragging: false, ranges: [] }
      }
    };
    const insights = {
      focus: document.getElementById('insightFocus'),
      pin: document.getElementById('insightPin'),
      range: document.getElementById('insightRange'),
      ab: document.getElementById('insightAB')
    };
    let tooltipEl = null;
    function axisColor(){return getComputedStyle(document.documentElement).getPropertyValue('--line').trim();}
    function textColor(){return getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();}
    function mainTextColor(){return getComputedStyle(document.documentElement).getPropertyValue('--text').trim();}

    function ensureTooltip(){
      if(tooltipEl) return;
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'chart-tooltip';
      document.body.appendChild(tooltipEl);
    }
    function showTooltip(html, x, y){
      ensureTooltip();
      tooltipEl.innerHTML = html;
      // Position off-screen first so we can measure the actual size, then clamp inside the viewport
      tooltipEl.style.left = '-9999px';
      tooltipEl.style.top = '-9999px';
      tooltipEl.classList.add('show');
      const rect = tooltipEl.getBoundingClientRect();
      const margin = 8;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      let left = x + 14;
      let top = y + 14;
      if(left + rect.width + margin > vw) left = Math.max(margin, x - rect.width - 14);
      if(top + rect.height + margin > vh) top = Math.max(margin, y - rect.height - 14);
      if(left < margin) left = margin;
      if(top < margin) top = margin;
      tooltipEl.style.left = `${left}px`;
      tooltipEl.style.top = `${top}px`;
    }
    function hideTooltip(){
      if(!tooltipEl) return;
      tooltipEl.classList.remove('show');
    }
    function updateInsights(partial = {}){
      if(partial.focus !== undefined) insights.focus.innerHTML = partial.focus;
      if(partial.pin !== undefined) insights.pin.innerHTML = partial.pin;
      if(partial.range !== undefined) insights.range.innerHTML = partial.range;
      if(partial.ab !== undefined) insights.ab.innerHTML = partial.ab;
    }
    function calcRangeStats(st, range){
      const rs = Math.min(range[0], range[1]);
      const re = Math.max(range[0], range[1]);
      const seg = st.values.slice(rs, re + 1);
      const avg = seg.reduce((a,b)=>a+b,0) / seg.length;
      const variance = seg.reduce((a,b)=>a + Math.pow(b-avg,2),0) / seg.length;
      const volatility = Math.sqrt(variance);
      const peakVal = Math.max(...seg);
      const peakIndex = st.values.findIndex((v, idx)=> idx >= rs && idx <= re && v === peakVal);
      return {
        rs,
        re,
        avg,
        volatility,
        peakVal,
        peakLabel: st.labels[peakIndex] || st.labels[rs]
      };
    }
    function updateABInsight(id, st, ranges){
      if(!ranges || ranges.length < 2){
        updateInsights({ ab: '用 Shift+拖拽 保存 2 个区间' });
        return;
      }
      const a = calcRangeStats(st, ranges[ranges.length - 2]);
      const b = calcRangeStats(st, ranges[ranges.length - 1]);
      const avgDelta = a.avg === 0 ? 0 : ((b.avg - a.avg) / a.avg) * 100;
      const volDelta = a.volatility === 0 ? 0 : ((b.volatility - a.volatility) / a.volatility) * 100;
      const nMap = { hourChart:'按小时', slaChart:'SLA', roiChart:'ROI', cohortChart:'同期群' };
      updateInsights({
        ab: `<b>${nMap[id] || '指标'} A/B</b><br/>均值 ${avgDelta>=0?'+':''}${avgDelta.toFixed(1)}% · 波动 ${volDelta>=0?'+':''}${volDelta.toFixed(1)}%<br/>峰值 ${a.peakLabel}:${a.peakVal}${st.unit} -> ${b.peakLabel}:${b.peakVal}${st.unit}`
      });
    }

    function drawLineChart(id, arr, colorA, colorB, cfg = {}){
      const c = document.getElementById(id); if(!c) return;
      const ctx = c.getContext('2d'); const w = c.width; const h = c.height;
      ctx.clearRect(0,0,w,h);
      const padLeft = 42, padRight = 16, padTop = 18, padBottom = 26;
      // Guard against empty / single-point datasets so adapters that pass
      // sparse data don't divide by zero (NaN axis labels) or pick Infinity
      // as min/max
      if(!Array.isArray(arr) || arr.length === 0){
        ctx.fillStyle = textColor(); ctx.font = '11px Inter';
        ctx.fillText('暂无数据', padLeft, h / 2);
        chartState[id] = { type:'line', points: [], values: [], labels: [], unit: cfg.unit || '', decimals: cfg.decimals ?? 0, isShortSeries: true };
        return;
      }
      if(arr.length === 1){
        // Render a single dot + value label rather than crashing on `arr.length-1`
        const cx = (padLeft + w - padRight) / 2;
        const cy = (padTop + h - padBottom) / 2;
        ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI*2); ctx.fillStyle = colorA; ctx.fill();
        ctx.fillStyle = textColor(); ctx.font = '11px Inter';
        ctx.fillText(`${arr[0]}${cfg.unit || ''}`, cx + 10, cy + 4);
        chartState[id] = { type:'line', points: [{ x: cx, y: cy }], values: arr.slice(), labels: cfg.xLabels || ['1'], unit: cfg.unit || '', decimals: cfg.decimals ?? 0, isShortSeries: true };
        return;
      }
      const min = Math.min(...arr), max = Math.max(...arr);
      for(let i=0;i<5;i++){
        const y = padTop + (h-padTop-padBottom) * (i/4);
        const val = (max - ((max-min)*(i/4))).toFixed(cfg.decimals ?? 0);
        ctx.strokeStyle = axisColor(); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padLeft,y); ctx.lineTo(w-padRight,y); ctx.stroke();
        ctx.fillStyle = textColor(); ctx.font='10px Inter'; ctx.fillText(val, 6, y + 3);
      }
      ctx.fillStyle = textColor(); ctx.font='10px Inter';
      (cfg.xLabels || arr.map((_,i)=>String(i+1))).forEach((lb,i)=>{
        const x = padLeft + (w-padLeft-padRight)*(i/(arr.length-1));
        ctx.fillText(lb, x - 9, h - 8);
      });
      const pts = arr.map((_,i)=>({x:0, y:0}));
      for(let i=0;i<pts.length;i++){
        pts[i].x = padLeft + (w-padLeft-padRight)*(i/(arr.length-1));
        pts[i].y = h-padBottom-((arr[i]-min)/(Math.max(max-min,1)))*(h-padTop-padBottom);
      }
      const grad = ctx.createLinearGradient(0,0,w,0); grad.addColorStop(0,colorA); grad.addColorStop(1,colorB);
      ctx.strokeStyle = grad; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p,i)=> i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pts[0].x,h-padBottom); pts.forEach((p)=>ctx.lineTo(p.x,p.y)); ctx.lineTo(pts[pts.length-1].x,h-padBottom); ctx.closePath();
      const fill = ctx.createLinearGradient(0,padTop,0,h-padBottom); fill.addColorStop(0,'rgba(120,170,255,.24)'); fill.addColorStop(1,'rgba(120,170,255,0)');
      ctx.fillStyle = fill; ctx.fill();
      pts.forEach((p)=>{ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fillStyle=colorB;ctx.fill();});
      if(Array.isArray(cfg.savedRanges)){
        cfg.savedRanges.forEach((r,idx)=>{
          const rs = Math.min(r[0], r[1]);
          const re = Math.max(r[0], r[1]);
          if(pts[rs] && pts[re]){
            const x1 = pts[rs].x, x2 = pts[re].x;
            ctx.fillStyle = idx % 2 ? 'rgba(120,180,255,.1)' : 'rgba(255,220,130,.12)';
            ctx.fillRect(x1, padTop, x2 - x1, h - padTop - padBottom);
            ctx.strokeStyle = 'rgba(255,255,255,.18)';
            ctx.strokeRect(x1, padTop, x2 - x1, h - padTop - padBottom);
          }
        });
      }
      if(typeof cfg.rangeStart === 'number' && typeof cfg.rangeEnd === 'number'){
        const rs = Math.min(cfg.rangeStart, cfg.rangeEnd);
        const re = Math.max(cfg.rangeStart, cfg.rangeEnd);
        if(pts[rs] && pts[re]){
          const x1 = pts[rs].x, x2 = pts[re].x;
          ctx.fillStyle = 'rgba(255,255,255,.08)';
          ctx.fillRect(x1, padTop, x2 - x1, h - padTop - padBottom);
          ctx.strokeStyle = 'rgba(255,255,255,.25)';
          ctx.strokeRect(x1, padTop, x2 - x1, h - padTop - padBottom);
        }
      }
      if(typeof cfg.hoverIndex === 'number' && pts[cfg.hoverIndex]){
        const hp = pts[cfg.hoverIndex];
        ctx.strokeStyle = 'rgba(255,255,255,.35)';
        ctx.setLineDash([4,4]);
        ctx.beginPath(); ctx.moveTo(hp.x, padTop); ctx.lineTo(hp.x, h-padBottom); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(hp.x, hp.y, 6, 0, Math.PI*2); ctx.fillStyle = mainTextColor(); ctx.fill();
        ctx.beginPath(); ctx.arc(hp.x, hp.y, 3, 0, Math.PI*2); ctx.fillStyle = colorB; ctx.fill();
      }
      if(typeof cfg.pinIndex === 'number' && pts[cfg.pinIndex]){
        const pp = pts[cfg.pinIndex];
        ctx.beginPath(); ctx.arc(pp.x, pp.y, 8, 0, Math.PI*2); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fill();
        ctx.beginPath(); ctx.arc(pp.x, pp.y, 4, 0, Math.PI*2); ctx.fillStyle = '#ffd166'; ctx.fill();
      }
      chartState[id] = {
        type:'line',
        points: pts,
        values: arr,
        labels: cfg.xLabels || arr.map((_,i)=>String(i+1)),
        unit: cfg.unit || '',
        decimals: typeof cfg.decimals === 'number' ? cfg.decimals : 0,
        // guard against single-point datasets when an adapter passes one value
        isShortSeries: arr.length < 2
      };
    }

    function drawStackBars(id, hoverIndex = -1){
      const c = document.getElementById(id); if(!c) return;
      const ctx = c.getContext('2d'); const w=c.width,h=c.height;
      ctx.clearRect(0,0,w,h);
      const groups = [[42,28,16],[55,20,10],[48,30,14],[61,22,12],[50,32,18],[66,24,14]];
      const colors = ['#68e4bd','#67b9ff','#9a86ff'];
      const yTicks = [0,20,40,60,80];
      const gap = 18, bw = (w-70-gap*(groups.length-1))/groups.length;
      let x = 40;
      yTicks.forEach((tick,i)=>{
        const y = h - 30 - (i/4)*(h-56);
        ctx.strokeStyle = axisColor(); ctx.beginPath(); ctx.moveTo(36,y); ctx.lineTo(w-14,y); ctx.stroke();
        ctx.fillStyle = textColor(); ctx.font='10px Inter'; ctx.fillText(String(tick), 8, y+3);
      });
      const bars = [];
      groups.forEach(g=>{
        let y = h-30;
        const startX = x;
        g.forEach((v,idx)=>{
          const hh = v*2.1;
          ctx.fillStyle = colors[idx];
          ctx.fillRect(x,y-hh,bw,hh);
          y -= hh;
        });
        bars.push({x:startX, yTop:y, yBottom:h-30, w:bw, stack:g});
        x += bw + gap;
      });
      ctx.fillStyle = textColor(); ctx.font='11px Inter';
      const dayLabels = ['周一','周二','周三','周四','周五','周六'];
      dayLabels.forEach((d,i)=>ctx.fillText(d, 42+i*(bw+gap), h-10));
      if(hoverIndex >= 0 && bars[hoverIndex]){
        const b = bars[hoverIndex];
        ctx.strokeStyle = 'rgba(255,255,255,.45)';
        ctx.strokeRect(b.x-2, b.yTop-2, b.w+4, b.yBottom-b.yTop+4);
      }
      chartState[id] = { type:'stack', bars, labels: dayLabels };
    }

    function drawDonut(id, hoverIndex = -1){
      const c = document.getElementById(id); if(!c) return;
      const ctx = c.getContext('2d'); const w=c.width,h=c.height;
      ctx.clearRect(0,0,w,h);
      const vals=[58,28,14], labels=['正面','中性','负面'], colors=['#68e4bd','#67b9ff','#ff8aa3'];
      const total = vals.reduce((a,b)=>a+b,0);
      let start = -Math.PI/2;
      const cx = w/2, cy = h/2, radius = 52;
      const arcs = [];
      vals.forEach((v,i)=>{
        const ang = (v/total)*Math.PI*2;
        ctx.beginPath();
        ctx.arc(cx,cy,hoverIndex===i?radius+2:radius,start,start+ang);
        ctx.strokeStyle=colors[i];
        ctx.lineWidth=20;
        ctx.stroke();
        arcs.push({start, end:start+ang, value:v, label:labels[i], color:colors[i]});
        start += ang;
      });
      ctx.fillStyle = mainTextColor();
      const centerValue = hoverIndex >= 0 ? `${vals[hoverIndex]}%` : '58%';
      ctx.font='600 24px Inter'; ctx.fillText(centerValue, cx-22, cy+8);
      ctx.fillStyle = textColor(); ctx.font='10px Inter'; ctx.fillText(hoverIndex >= 0 ? labels[hoverIndex] : '正面', cx-24, cy+22);
      chartState[id] = { type:'donut', arcs, cx, cy, radius };
    }
    function drawGeoBars(id, hoverIndex = -1){
      const c = document.getElementById(id); if(!c) return;
      const ctx = c.getContext('2d'); const w = c.width, h = c.height;
      ctx.clearRect(0,0,w,h);
      const labels = ['美国','英国','德国','印度','东南亚'];
      const values = [38,22,14,18,8];
      const barH = 18, gap = 12, left = 60, top = 22, maxW = w - left - 24;
      ctx.fillStyle = textColor(); ctx.font = '11px Inter';
      const bars = [];
      labels.forEach((lb,i)=>{
        const y = top + i*(barH+gap);
        const ww = maxW * (values[i]/40);
        ctx.fillStyle = axisColor();
        ctx.fillRect(left, y, maxW, barH);
        ctx.fillStyle = hoverIndex===i ? '#8ec5ff' : '#67b9ff';
        ctx.fillRect(left, y, ww, barH);
        ctx.fillStyle = textColor();
        ctx.fillText(lb, 18, y+13);
        ctx.fillText(values[i] + '%', left + ww + 8, y+13);
        bars.push({x:left,y,w:ww,h:barH,label:lb,value:values[i]});
      });
      chartState[id] = { type:'geo', bars };
    }

    function buildHeatmap(){
      const box = document.getElementById('heatmap');
      if(!box || box.children.length) return;
      for(let i=0;i<72;i++){
        const cell = document.createElement('div');
        const a = 0.15 + Math.random()*0.85;
        cell.style.background = `rgba(120,170,255,${a.toFixed(2)})`;
        if(i%5===0) cell.style.background = `rgba(204,140,255,${(0.25 + Math.random()*0.7).toFixed(2)})`;
        if(i%7===0) cell.style.background = `rgba(104,228,189,${(0.2 + Math.random()*0.75).toFixed(2)})`;
        cell.title = `时段 ${i+1} · 活跃度 ${(42 + (i%13)*3)}%`;
        box.appendChild(cell);
      }
    }

    function bindChartInteractions(){
      const lineIds = ['hourChart','slaChart','roiChart','cohortChart'];
      lineIds.forEach((id)=>{
        const c = document.getElementById(id);
        if(!c || c.dataset.bound) return;
        c.dataset.bound = '1';
        const colorMap = {
          hourChart: ['#67b9ff','#cc8cff'],
          slaChart: ['#68e4bd','#67b9ff'],
          roiChart: ['#f3d26e','#cc8cff'],
          cohortChart: ['#68e4bd','#67b9ff']
        };
        const nameMap = {
          hourChart: '按小时活跃度',
          slaChart: '响应 SLA',
          roiChart: '收入 vs 成本',
          cohortChart: '同期群留存'
        };
        const colors = colorMap[id];
        const redraw = (extra = {})=>{
          const st = chartState[id];
          if(!st) return;
          const local = interactionState.line[id];
          drawLineChart(id, st.values, colors[0], colors[1], {
            xLabels: st.labels,
            unit: st.unit,
            decimals: st.decimals,
            pinIndex: local.pin,
            rangeStart: local.dragStart,
            rangeEnd: local.dragEnd,
            savedRanges: local.ranges,
            ...extra
          });
        };
        const nearestByMouse = (e)=>{
          const st = chartState[id]; if(!st) return -1;
          const rect = c.getBoundingClientRect();
          const mx = (e.clientX - rect.left) * (c.width / rect.width);
          let nearest = 0, minDist = Infinity;
          st.points.forEach((p,i)=>{ const d = Math.abs(p.x - mx); if(d < minDist){minDist = d; nearest = i;} });
          return nearest;
        };
        // Touch support — call the same logical handlers directly with a
        // plain pointer object instead of dispatching synthetic Events. This
        // avoids assigning to read-only Event fields (Event.target/etc.) which
        // would throw a TypeError before reaching the real handler.
        const buildPointer = (touch, originalEvent)=>({
          clientX: touch.clientX,
          clientY: touch.clientY,
          shiftKey: !!(originalEvent && originalEvent.shiftKey)
        });
        const handleTouchStart = (p)=>{
          const local = interactionState.line[id];
          const nearest = nearestByMouse(p);
          if(nearest < 0) return;
          local.dragStart = nearest;
          local.dragEnd = nearest;
          local.dragging = true;
          redraw();
        };
        const handleTouchMove = (p)=>{
          const st = chartState[id]; if(!st) return;
          const nearest = nearestByMouse(p);
          const local = interactionState.line[id];
          if(!local.dragging){
            redraw({ hoverIndex: nearest });
            updateInsights({
              focus: `<b>${nameMap[id]}</b><br/>${st.labels[nearest]} = ${st.values[nearest]}${st.unit}`
            });
            showTooltip(`<b>${st.labels[nearest]}</b><br/>数值: ${st.values[nearest]}${st.unit}`, p.clientX, p.clientY);
            return;
          }
          local.dragEnd = nearest;
          redraw();
          const rs = Math.min(local.dragStart, local.dragEnd);
          const re = Math.max(local.dragStart, local.dragEnd);
          const seg = st.values.slice(rs, re + 1);
          const avg = (seg.reduce((a,b)=>a+b,0) / seg.length).toFixed(1);
          updateInsights({
            focus: `<b>${nameMap[id]}</b><br/>正在选择 ${st.labels[rs]} - ${st.labels[re]}`,
            range: `均值 <b>${avg}${st.unit}</b>`
          });
          showTooltip(`<b>${st.labels[rs]} → ${st.labels[re]}</b><br/>均值: ${avg}${st.unit}`, p.clientX, p.clientY);
        };
        const handleTouchEnd = (p)=>{
          const st = chartState[id];
          const local = interactionState.line[id];
          if(!local.dragging) return;
          const moved = local.dragStart !== local.dragEnd;
          local.dragging = false;
          if(!moved){
            // tap-to-pin
            local.pin = local.pin === local.dragStart ? null : local.dragStart;
            local.dragStart = null;
            local.dragEnd = null;
            redraw({ hoverIndex: local.pin });
            if(local.pin !== null){
              updateInsights({ pin: `<b>${nameMap[id]} @ ${st.labels[local.pin]}</b><br/>${st.values[local.pin]}${st.unit}` });
              showTooltip(`<b>已固定: ${st.labels[local.pin]}</b><br/>数值: ${st.values[local.pin]}${st.unit}`, p.clientX, p.clientY);
            } else { updateInsights({ pin: '无' }); hideTooltip(); }
            return;
          }
          local.dragStart = null;
          local.dragEnd = null;
          redraw();
        };
        c.addEventListener('touchstart',(e)=>{
          if(!e.touches || e.touches.length === 0) return;
          e.preventDefault();
          handleTouchStart(buildPointer(e.touches[0], e));
        }, { passive: false });
        c.addEventListener('touchmove',(e)=>{
          if(!e.touches || e.touches.length === 0) return;
          e.preventDefault();
          handleTouchMove(buildPointer(e.touches[0], e));
        }, { passive: false });
        c.addEventListener('touchend',(e)=>{
          const t = (e.changedTouches && e.changedTouches[0]) || null;
          if(!t) return;
          e.preventDefault();
          handleTouchEnd(buildPointer(t, e));
        }, { passive: false });
        c.addEventListener('touchcancel',()=>{
          const local = interactionState.line[id];
          local.dragging = false;
          local.dragStart = null;
          local.dragEnd = null;
          hideTooltip();
          redraw({ hoverIndex: local.pin });
        });
        // Keyboard arrow keys: step through indices for accessibility (a11y).
        // Tab focus the canvas first, then ←/→ to move the pin one step.
        if(!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '0');
        c.addEventListener('keydown',(e)=>{
          const st = chartState[id]; if(!st || !st.points || st.points.length === 0) return;
          const local = interactionState.line[id];
          const last = st.points.length - 1;
          if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
            e.preventDefault();
            const cur = local.pin == null ? 0 : local.pin;
            const next = e.key === 'ArrowLeft' ? Math.max(0, cur - 1) : Math.min(last, cur + 1);
            local.pin = next;
            redraw({ hoverIndex: next });
            updateInsights({
              focus: `<b>${nameMap[id]}</b><br/>${st.labels[next]} = ${st.values[next]}${st.unit}`,
              pin: `<b>${nameMap[id]} @ ${st.labels[next]}</b><br/>${st.values[next]}${st.unit}`
            });
          } else if(e.key === 'Escape'){
            e.preventDefault();
            local.pin = null; local.dragStart = null; local.dragEnd = null; local.dragging = false;
            redraw();
            updateInsights({ pin: '无' });
            hideTooltip();
          }
        });
        c.addEventListener('mousedown',(e)=>{
          const local = interactionState.line[id];
          const nearest = nearestByMouse(e);
          if(nearest < 0) return;
          local.dragStart = nearest;
          local.dragEnd = nearest;
          local.dragging = true;
          redraw();
        });
        c.addEventListener('mousemove',(e)=>{
          const st = chartState[id]; if(!st) return;
          const nearest = nearestByMouse(e);
          const local = interactionState.line[id];
          if(local.dragging){
            local.dragEnd = nearest;
            redraw();
            const rs = Math.min(local.dragStart, local.dragEnd);
            const re = Math.max(local.dragStart, local.dragEnd);
            const seg = st.values.slice(rs, re + 1);
            const avg = (seg.reduce((a,b)=>a+b,0) / seg.length).toFixed(1);
            const peak = Math.max(...seg);
            const low = Math.min(...seg);
            updateInsights({
              focus: `<b>${nameMap[id]}</b><br/>正在选择 ${st.labels[rs]} - ${st.labels[re]}`,
              range: `均值 <b>${avg}${st.unit}</b> · 峰值 <b>${peak}${st.unit}</b> · 谷值 <b>${low}${st.unit}</b>`
            });
            showTooltip(`<b>${st.labels[rs]} → ${st.labels[re]}</b><br/>均值: ${avg}${st.unit} · 峰值: ${peak}${st.unit} · 谷值: ${low}${st.unit}`, e.clientX, e.clientY);
            return;
          }
          const prev = nearest > 0 ? st.values[nearest - 1] : st.values[nearest];
          const mom = prev === 0 ? 0 : ((st.values[nearest] - prev) / prev) * 100;
          const baseline = st.values.reduce((a,b)=>a+b,0) / st.values.length;
          const yoy = baseline === 0 ? 0 : ((st.values[nearest] - baseline) / baseline) * 100;
          redraw({ hoverIndex: nearest });
          updateInsights({
            focus: `<b>${nameMap[id]}</b><br/>${st.labels[nearest]} = ${st.values[nearest]}${st.unit}`,
            range: `环比 <b>${mom>=0?'+':''}${mom.toFixed(1)}%</b> · 对比基准 <b>${yoy>=0?'+':''}${yoy.toFixed(1)}%</b>`
          });
          showTooltip(`<b>${st.labels[nearest]}</b><br/>数值: ${st.values[nearest]}${st.unit}<br/>环比: ${mom>=0?'+':''}${mom.toFixed(1)}% · 对比基准: ${yoy>=0?'+':''}${yoy.toFixed(1)}%`, e.clientX, e.clientY);
        });
        c.addEventListener('mouseup',(e)=>{
          const st = chartState[id];
          const local = interactionState.line[id];
          if(!local.dragging) return;
          const moved = local.dragStart !== local.dragEnd;
          local.dragging = false;
          if(!moved){
            local.pin = local.pin === local.dragStart ? null : local.dragStart;
            local.dragStart = null;
            local.dragEnd = null;
            redraw({ hoverIndex: local.pin });
            if(local.pin !== null){
              const st = chartState[id];
              updateInsights({ pin: `<b>${nameMap[id]} @ ${st.labels[local.pin]}</b><br/>${st.values[local.pin]}${st.unit}` });
              showTooltip(`<b>已固定: ${st.labels[local.pin]}</b><br/>数值: ${st.values[local.pin]}${st.unit}`, e.clientX, e.clientY);
            } else { updateInsights({ pin: '无' }); hideTooltip(); }
            return;
          }
          if(e.shiftKey){
            local.ranges.push([local.dragStart, local.dragEnd]);
            if(local.ranges.length > 4) local.ranges.shift();
            const rs = Math.min(local.dragStart, local.dragEnd);
            const re = Math.max(local.dragStart, local.dragEnd);
            const seg = st.values.slice(rs, re + 1);
            const avg = (seg.reduce((a,b)=>a+b,0) / seg.length).toFixed(1);
            updateInsights({
              range: `已保存 #${local.ranges.length}: ${st.labels[rs]}-${st.labels[re]} · 均值 <b>${avg}${st.unit}</b>`
            });
            updateABInsight(id, st, local.ranges);
          }
          // Clear active drag state BEFORE redraw so the live overlay is
          // not painted onto the final frame (saved ranges still render
          // via local.ranges)
          local.dragStart = null;
          local.dragEnd = null;
          redraw();
        });
        c.addEventListener('mouseleave',()=>{
          const local = interactionState.line[id];
          // If the pointer leaves the canvas mid-drag we must abandon the
          // active range, otherwise a stale overlay sticks around until
          // the next interaction
          local.dragging = false;
          local.dragStart = null;
          local.dragEnd = null;
          hideTooltip();
          redraw({ hoverIndex: local.pin });
        });
        c.addEventListener('dblclick', ()=>{
          const local = interactionState.line[id];
          local.ranges = [];
          local.pin = null;
          local.dragStart = null;
          local.dragEnd = null;
          redraw();
          updateInsights({ pin: '无', range: '暂无激活区间', ab: '用 Shift+拖拽 保存 2 个区间', focus: '<b>实时概览</b><br/>悬浮图表以查看详情。' });
        });
      });

      const mix = document.getElementById('mixChart');
      if(mix && !mix.dataset.bound){
        mix.dataset.bound = '1';
        mix.addEventListener('mousemove',(e)=>{
          const st = chartState.mixChart; if(!st) return;
          const rect = mix.getBoundingClientRect();
          const mx = (e.clientX - rect.left) * (mix.width / rect.width);
          let hit = -1;
          st.bars.forEach((b,i)=>{ if(mx >= b.x && mx <= b.x + b.w) hit = i; });
          drawStackBars('mixChart', hit);
          if(hit >= 0){
            const s = st.bars[hit].stack;
            showTooltip(`<b>${st.labels[hit]}</b><br/>Canvas ${s[0]} · Agent ${s[1]} · GBrain ${s[2]}`, e.clientX, e.clientY);
            updateInsights({
              focus: `<b>应用组合 · ${st.labels[hit]}</b><br/>Canvas ${s[0]} · Agent ${s[1]} · GBrain ${s[2]}`
            });
          } else hideTooltip();
        });
        mix.addEventListener('mouseleave',()=>{ hideTooltip(); drawStackBars('mixChart'); });
      }

      const donut = document.getElementById('sentimentChart');
      if(donut && !donut.dataset.bound){
        donut.dataset.bound = '1';
        donut.addEventListener('mousemove',(e)=>{
          const st = chartState.sentimentChart; if(!st) return;
          const rect = donut.getBoundingClientRect();
          const mx = (e.clientX - rect.left) * (donut.width / rect.width);
          const my = (e.clientY - rect.top) * (donut.height / rect.height);
          const dx = mx - st.cx, dy = my - st.cy;
          const dist = Math.hypot(dx,dy);
          const angRaw = Math.atan2(dy,dx);
          const ang = angRaw < -Math.PI/2 ? angRaw + Math.PI*2 : angRaw;
          let hit = -1;
          st.arcs.forEach((a,i)=>{ if(dist > st.radius-14 && dist < st.radius+14 && ang >= a.start && ang <= a.end) hit = i; });
          drawDonut('sentimentChart', hit);
          if(hit >= 0){
            const a = st.arcs[hit];
            showTooltip(`<b>${a.label}</b><br/>占比: ${a.value}%`, e.clientX, e.clientY);
            updateInsights({
              focus: `<b>反馈 · ${a.label}</b><br/>占比: ${a.value}%`
            });
          } else hideTooltip();
        });
        donut.addEventListener('mouseleave',()=>{ hideTooltip(); drawDonut('sentimentChart'); });
      }
      const geo = document.getElementById('geoChart');
      if(geo && !geo.dataset.bound){
        geo.dataset.bound = '1';
        geo.addEventListener('mousemove',(e)=>{
          const st = chartState.geoChart; if(!st) return;
          const rect = geo.getBoundingClientRect();
          const mx = (e.clientX - rect.left) * (geo.width / rect.width);
          const my = (e.clientY - rect.top) * (geo.height / rect.height);
          let hit = -1;
          st.bars.forEach((b,i)=>{ if(mx>=b.x && mx<=b.x+b.w && my>=b.y && my<=b.y+b.h) hit = i; });
          drawGeoBars('geoChart', hit);
          if(hit >= 0){
            const b = chartState.geoChart.bars[hit];
            showTooltip(`<b>${b.label}</b><br/>激活占比: ${b.value}%`, e.clientX, e.clientY);
            updateInsights({ focus: `<b>地域贡献</b><br/>${b.label} 贡献了 ${b.value}% 的激活` });
          } else hideTooltip();
        });
        geo.addEventListener('mouseleave',()=>{ hideTooltip(); drawGeoBars('geoChart'); });
      }
      document.addEventListener('mouseup', ()=>{
        ['hourChart','slaChart','roiChart','cohortChart'].forEach((id)=>{
          const local = interactionState.line[id];
          if(local && local.dragging) local.dragging = false;
        });
      });
    }

    function drawAllCharts(){
      drawLineChart('hourChart',[21,18,25,33,42,54,48,59,64,58,52,46],'#67b9ff','#cc8cff',{
        xLabels:['00','02','04','06','08','10','12','14','16','18','20','22'],
        unit:'%',
        pinIndex: interactionState.line.hourChart.pin,
        rangeStart: interactionState.line.hourChart.dragStart,
        rangeEnd: interactionState.line.hourChart.dragEnd,
        savedRanges: interactionState.line.hourChart.ranges
      });
      drawStackBars('mixChart');
      drawDonut('sentimentChart');
      drawLineChart('slaChart',[28,40,36,31,42,35,30],'#68e4bd','#67b9ff',{
        xLabels:['周一','周二','周三','周四','周五','周六','周日'],
        unit:'m',
        pinIndex: interactionState.line.slaChart.pin,
        rangeStart: interactionState.line.slaChart.dragStart,
        rangeEnd: interactionState.line.slaChart.dragEnd,
        savedRanges: interactionState.line.slaChart.ranges
      });
      drawLineChart('roiChart',[1.2,1.4,1.3,1.7,1.9,2.1,2.4],'#f3d26e','#cc8cff',{
        xLabels:['W1','W2','W3','W4','W5','W6','W7'],
        unit:'x',
        pinIndex: interactionState.line.roiChart.pin,
        rangeStart: interactionState.line.roiChart.dragStart,
        rangeEnd: interactionState.line.roiChart.dragEnd,
        savedRanges: interactionState.line.roiChart.ranges,
        decimals:1
      });
      drawLineChart('cohortChart',[92,81,73,67,61,58,54],'#68e4bd','#67b9ff',{
        xLabels:['C1','C2','C3','C4','C5','C6','C7'],
        unit:'%',
        pinIndex: interactionState.line.cohortChart.pin,
        rangeStart: interactionState.line.cohortChart.dragStart,
        rangeEnd: interactionState.line.cohortChart.dragEnd,
        savedRanges: interactionState.line.cohortChart.ranges
      });
      drawGeoBars('geoChart');
    }

    const networks = ['x','linkedin','youtube','instagram'];
    let idx = 0;
    renderNetwork(networks[idx]);
    buildHeatmap();
    drawAllCharts();
    bindChartInteractions();
    updateInsights({
      focus: '<b>实时概览</b><br/>悬浮图表以查看详情。',
      pin: '无',
      range: '暂无激活区间',
      ab: '用 Shift+拖拽 保存 2 个区间'
    });

    setInterval(()=>{ idx = (idx + 1) % networks.length; renderNetwork(networks[idx]); }, 3600);

    const darkBtn = document.getElementById('darkBtn');
    const lightBtn = document.getElementById('lightBtn');
    darkBtn.addEventListener('click', ()=> setTheme('dark'));
    lightBtn.addEventListener('click', ()=> setTheme('light'));
    const frameEl = document.querySelector('.frame');
    window.addEventListener('mousemove',(e)=>{
      if(!frameEl) return;
      const x = (e.clientX / window.innerWidth - .5) * 6;
      const y = (e.clientY / window.innerHeight - .5) * -4;
      frameEl.style.transform = `perspective(1200px) rotateY(${x.toFixed(2)}deg) rotateX(${y.toFixed(2)}deg)`;
    });
    window.addEventListener('mouseleave',()=>{ if(frameEl) frameEl.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'; });
  </script>
</body>
</html>
```

## 用法

- `topbar / brand` — NevoFlux 品牌加一个 `数据分析` 标签;右侧放置主题切换器与时间窗 chips(`7天` / `30天` / `90天` / `年初至今`)。
- `headline` — hero 标题与副标题;两者都由脚本中的 `data` 映射按渠道重写(`title`、`subtitle`)。
- `actions` — 头部按钮(导出报告、自动摘要、主操作 `新建应用 +`)。
- `insights-panel` — 吸顶抽屉,包含四个槽位(`洞察焦点`、`固定数据点`、`区间对比`、`A/B 对比`),随你悬浮、固定或拖拽图表实时更新。
- `platforms`(`#platforms`)— 渠道矩阵(浏览器、GBrain、Canvas、Agent SDK);由 `data[...].platforms` 按 `[name, value, delta]` 渲染。
- `kpis`(`#kpis`)— 4 张指标卡,由 `data[...].kpis` 按 `[label, value, delta]` 渲染。
- `grid` — 左卡是 30 天工作区增长曲线(内联 SVG `path` 加一个图例);右卡是本周头部应用,带两条 `track` 进度条。
- `bottom` — 三张卡片:带状态 `pill` 的待发布 + 草稿列表、渠道基准表格,以及激活率构成。
- 图表 canvas — `hourChart`(按小时活跃度)、`mixChart`(堆叠应用组合)、`sentimentChart`(反馈环形图)、`slaChart`(响应 SLA)、`roiChart`(收入 vs 算力成本)、`cohortChart`(成员同期群留存)、`geoChart`(地域占比)。编辑 `drawAllCharts()` 中的数组即可重塑任一序列。
- 折线图的交互模型:悬浮查看详情、点击固定一个点、拖拽得到区间统计、Shift+拖拽 保存区间用于 A/B 对比、双击重置。
- seed `data` 对象驱动自动轮播的头部;替换其取值即可接入真实数字,同时保持布局不变。
```
```
