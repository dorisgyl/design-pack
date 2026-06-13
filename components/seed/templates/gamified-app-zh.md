---
slug: packs/design-pack/templates/gamified-app-zh
type: template
lang: zh
category: mobile
title: "游戏化 App 多屏"
title_en: "Gamified App — NevoFlux Quests"
description: "RPG 风格习惯养成 App 的三屏手机界面:封面、带 XP 条的今日任务、任务详情,置于暗色舞台之上。"
tags: [gamified, habit, rpg, quest, xp, 模板]
sample_image: packs/design-pack/assets/templates/gamified-app.svg
source: html-anything/gamified-app
---
## 设计指导

一套游戏化、类 RPG 的 Quest UI。意图:把习惯养成 App 呈现为暗色舞台上并排的三个 iPhone 手机框。

布局:
- Frame 1:封面 / 海报。
- Frame 2:今日任务,加上 XP ribbon 与等级进度条。
- Frame 3:任务详情(子任务与奖励)。

设计细节:
- 醒目的 quest tile 采用柔和的渐变色块、等级 ribbon,以及底部 tab bar。
- 暗色舞台背景配暖色径向光晕,让手机框看起来像产品展示。
- 每个手机都是自包含的框架(刘海、状态栏、圆角屏幕),不引用任何外部资源 —— 只用渐变与内联图形。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — 每日任务,帮你交付更好的软件</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --stage: #0e0d0c;
      --stage-2: #1a1714;
      --paper: #ffffff;
      --ink: #1a1714;
      --muted: #6c6660;
      --line: #ebe6dd;
      --accent: #e98425;
      --accent-2: #ff6b3d;
      --tile-1: #ffe9bf;
      --tile-2: #ffe1d9;
      --tile-3: #f3e6ff;
      --tile-4: #d2eecb;
      --tile-5: #d6e7ff;
      --tile-6: #ffd6f1;
      --serif: 'Instrument Serif', 'Iowan Old Style', Georgia, serif;
      --sans: 'Inter', -apple-system, system-ui, sans-serif;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(233,132,37,0.18), transparent 70%),
        radial-gradient(ellipse 70% 50% at 50% 110%, rgba(255,255,255,0.04), transparent 70%),
        var(--stage);
      color: #f5efe4;
      font: 14px/1.5 var(--sans);
    }

    .stage-bar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 24px 36px;
      font: 11px/1 var(--mono);
      color: rgba(245,239,228,0.5);
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
    .stage-bar .word { font-family: var(--serif); font-style: italic; font-size: 22px; color: #f5efe4; letter-spacing: 0; text-transform: none; }

    .phones {
      display: flex; gap: 28px; justify-content: center; padding: 12px 32px 56px;
      flex-wrap: wrap;
    }
    .phone {
      width: 360px; height: 760px;
      background: #050403;
      border-radius: 56px;
      padding: 12px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.45), inset 0 0 0 2px rgba(255,255,255,0.04);
      flex-shrink: 0;
      position: relative;
    }
    .phone::before {
      content: '';
      position: absolute; top: 22px; left: 50%; transform: translateX(-50%);
      width: 116px; height: 30px; background: #050403; border-radius: 999px; z-index: 5;
    }
    .screen { width: 100%; height: 100%; background: var(--paper); border-radius: 44px; overflow: hidden; display: flex; flex-direction: column; color: var(--ink); }
    .status { display: flex; justify-content: space-between; align-items: center; padding: 14px 26px 6px; font: 600 14px/1 var(--sans); }
    .status .right { display: flex; gap: 6px; align-items: center; font-size: 12px; }

    /* Phone 1 — cover */
    .cover { background: var(--ink); color: #fef9ee; height: 100%; display: flex; flex-direction: column; }
    .cover .status { color: #fef9ee; }
    .cover .body { flex: 1; padding: 40px 28px 0; display: flex; flex-direction: column; }
    .cover .eyebrow { display: inline-flex; align-items: center; gap: 6px; font: 10.5px/1 var(--mono); letter-spacing: 0.18em; color: rgba(254,249,238,0.6); padding: 6px 9px; border: 1px solid rgba(254,249,238,0.22); border-radius: 999px; align-self: flex-start; margin-bottom: 26px; }
    .cover .eyebrow .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
    .cover h1 { font: italic 800 56px/1 var(--serif); margin: 0 0 16px; letter-spacing: -0.005em; max-width: 12ch; }
    .cover h1 .accent { color: var(--accent); font-style: italic; }
    .cover p.lede { color: rgba(254,249,238,0.62); font-size: 14.5px; line-height: 1.55; margin: 0 0 18px; }
    .cover .tip { font: 11px/1.5 var(--mono); color: rgba(254,249,238,0.4); border-top: 1px dashed rgba(254,249,238,0.2); padding-top: 12px; }
    .cover .tip b { color: rgba(254,249,238,0.7); font-weight: 500; }
    .cover .next-peek { margin-top: auto; height: 92px; background: #211d18; border-top-left-radius: 26px; border-top-right-radius: 26px; padding: 14px 22px; display: flex; align-items: center; gap: 10px; color: rgba(254,249,238,0.6); font: 11px/1.4 var(--mono); letter-spacing: 0.16em; text-transform: uppercase; }
    .cover .next-peek .swatch { width: 36px; height: 36px; border-radius: 8px; background: var(--accent); flex-shrink: 0; }

    /* Phone 2 — quests dashboard */
    .home { display: flex; flex-direction: column; height: 100%; padding: 0; }
    .home .head { padding: 14px 22px 6px; display: flex; justify-content: space-between; align-items: center; }
    .home .head h2 { margin: 0; font: 700 18px/1.2 var(--sans); letter-spacing: -0.005em; }
    .home .head .bell { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,107,61,0.10); color: var(--accent-2); display: grid; place-items: center; font: 700 11px/1 var(--sans); }
    .level-ribbon {
      margin: 8px 14px 12px;
      padding: 12px 14px;
      background: linear-gradient(135deg, #1a1714 0%, #2b251f 100%);
      color: #f5efe4; border-radius: 16px;
      display: grid; grid-template-columns: 38px 1fr auto; gap: 12px; align-items: center;
    }
    .level-ribbon .lv { width: 38px; height: 38px; border-radius: 12px; background: var(--accent); display: grid; place-items: center; font: 700 14px/1 var(--mono); color: #1a1714; }
    .level-ribbon .meta .label { font: 10px/1 var(--mono); letter-spacing: 0.16em; color: rgba(245,239,228,0.5); text-transform: uppercase; }
    .level-ribbon .meta .name { font: 700 14px/1.2 var(--sans); margin-top: 4px; }
    .level-ribbon .xp { font: 600 12px/1 var(--mono); color: rgba(245,239,228,0.7); }
    .level-ribbon .bar { grid-column: 1 / -1; height: 6px; background: rgba(245,239,228,0.10); border-radius: 999px; overflow: hidden; margin-top: 8px; }
    .level-ribbon .bar > span { display: block; width: 66%; height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2)); }

    .home .sub { padding: 0 22px 10px; font: 12.5px/1.4 var(--sans); color: var(--muted); display: flex; align-items: center; gap: 8px; }
    .home .sub .pill { font: 10.5px/1 var(--mono); padding: 4px 8px; border-radius: 999px; background: var(--ink); color: #f5efe4; letter-spacing: 0.06em; }

    .quests { padding: 4px 14px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; overflow: hidden; }
    .q { border-radius: 18px; padding: 12px; min-height: 110px; position: relative; display: flex; flex-direction: column; gap: 6px; }
    .q .glyph { width: 28px; height: 28px; border-radius: 8px; background: rgba(0,0,0,0.10); color: var(--ink); display: grid; place-items: center; font: 700 13px/1 var(--sans); }
    .q .title { font: 700 13.5px/1.3 var(--sans); color: var(--ink); margin: 0; }
    .q .meta { font: 11px/1.4 var(--sans); color: var(--ink); opacity: 0.7; }
    .q .xp { position: absolute; bottom: 10px; right: 10px; font: 700 11px/1 var(--mono); padding: 4px 7px; border-radius: 999px; background: var(--ink); color: #f5efe4; letter-spacing: 0.06em; }
    .q.q1 { background: var(--tile-2); }
    .q.q1 .glyph { background: #ff7a52; color: white; }
    .q.q2 { background: var(--tile-1); }
    .q.q2 .glyph { background: #f0b54a; color: white; }
    .q.q3 { background: var(--tile-3); }
    .q.q3 .glyph { background: #b08bf2; color: white; }
    .q.q4 { background: var(--tile-4); }
    .q.q4 .glyph { background: #6cba5b; color: white; }
    .q.q5 { background: var(--tile-6); }
    .q.q5 .glyph { background: #e76aae; color: white; }
    .q.q6 { background: var(--tile-5); }
    .q.q6 .glyph { background: #4a86e9; color: white; }

    /* Phone 3 — quest detail */
    .detail { display: flex; flex-direction: column; height: 100%; }
    .detail .topbar { display: flex; align-items: center; gap: 10px; padding: 8px 22px 6px; font: 13px/1 var(--sans); color: var(--muted); }
    .detail .topbar .back { width: 28px; height: 28px; border-radius: 50%; background: var(--line); display: grid; place-items: center; }
    .hero { margin: 8px 14px 14px; padding: 22px 20px 24px; border-radius: 24px; background: linear-gradient(160deg, #ffd2bb 0%, #ff7a52 100%); color: var(--ink); position: relative; overflow: hidden; }
    .hero .badge { display: inline-flex; align-items: center; gap: 6px; font: 10.5px/1 var(--mono); padding: 5px 8px; border-radius: 999px; background: rgba(0,0,0,0.10); letter-spacing: 0.16em; text-transform: uppercase; }
    .hero h2 { font: italic 700 30px/1.05 var(--serif); margin: 12px 0 6px; max-width: 12ch; }
    .hero p { font: 14px/1.5 var(--sans); color: rgba(26,23,20,0.75); margin: 0; max-width: 30ch; }
    .hero .stamp { position: absolute; right: 18px; top: 18px; font: 700 11px/1 var(--mono); padding: 6px 8px; background: rgba(255,255,255,0.7); border-radius: 999px; color: var(--ink); letter-spacing: 0.08em; }

    .steps { padding: 4px 22px 12px; }
    .steps h3 { font: 700 11px/1 var(--mono); letter-spacing: 0.18em; color: var(--muted); margin: 12px 0 8px; text-transform: uppercase; }
    .step { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-top: 1px solid var(--line); }
    .step .check { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--line); flex-shrink: 0; display: grid; place-items: center; font: 700 11px/1 var(--sans); color: white; }
    .step.done .check { background: var(--accent); border-color: var(--accent); }
    .step.done .check::after { content: '✓'; }
    .step.done .name { color: var(--muted); text-decoration: line-through; }
    .step .name { font: 14px/1.3 var(--sans); }
    .step .meta { font: 11px/1 var(--mono); color: var(--muted); margin-left: auto; letter-spacing: 0.06em; }

    .detail .start {
      margin: auto 18px 12px; padding: 14px; border-radius: 999px;
      background: var(--ink); color: #f5efe4; text-align: center;
      font: 600 14px/1 var(--sans); letter-spacing: 0.06em;
    }

    /* Tab bar shared */
    .tabbar {
      margin-top: auto; display: grid; grid-template-columns: repeat(5, 1fr);
      padding: 10px 14px 26px; border-top: 1px solid var(--line); background: var(--paper);
    }
    .tab { display: flex; flex-direction: column; align-items: center; gap: 4px; font: 9.5px/1 var(--mono); color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
    .tab .icon { width: 22px; height: 22px; border-radius: 6px; background: var(--line); }
    .tab.active { color: var(--accent); }
    .tab.active .icon { background: var(--accent); }
    .tab.center .icon { background: var(--ink); color: #f5efe4; display: grid; place-items: center; font: 700 16px/1 var(--sans); border-radius: 50%; }

    @media (max-width: 1180px) {
      .phones { gap: 18px; }
      .phone { width: 320px; height: 700px; }
      .cover h1 { font-size: 46px; }
    }
  </style>
</head>
<body>
  <div class="stage-bar" data-od-id="stage-bar">
    <span>HI-FI PROTOTYPE · IPHONE</span>
    <span class="word">nevoflux<span style="color:var(--accent);">.</span></span>
    <span>3 SCREENS · LIGHT MODE</span>
  </div>

  <div class="phones" data-od-id="phones">

    <!-- Phone 1 — cover -->
    <div class="phone" data-od-id="phone-cover">
      <div class="screen cover">
        <div class="status"><span>9:41</span><span class="right">·· 5G · 100%</span></div>
        <div class="body">
          <span class="eyebrow"><span class="dot"></span>HI-FI PROTOTYPE · IPHONE</span>
          <h1>每日任务,<span class="accent">交付</span>更好的软件。</h1>
          <p class="lede">NevoFlux 把你早就打算去做的事 —— 给 GBrain 知识库收录一个来源、上线一个 Canvas 应用、复盘一次 agent 运行、打磨一个设计包 —— 变成一份每日任务清单。完成它们、赚取 XP,看着你的工作区不断升级。</p>
          <p class="tip">点击任务可打开详情。完成第 6 个任务即可触发升级时刻。在工具栏切换 <b>[theme]</b> 可切换主题与布局。</p>
          <div class="next-peek"><div class="swatch"></div>下一屏 — 今日任务</div>
        </div>
      </div>
    </div>

    <!-- Phone 2 — quests dashboard -->
    <div class="phone" data-od-id="phone-home">
      <div class="screen home">
        <div class="status"><span>9:41</span><span class="right">·· 5G · 100%</span></div>
        <div class="head">
          <h2>早上好,Sam</h2>
          <div class="bell">×3</div>
        </div>
        <div class="level-ribbon" data-od-id="level-ribbon">
          <div class="lv">14</div>
          <div class="meta"><div class="label">LEVEL</div><div class="name">构建者 · Lv 14</div></div>
          <div class="xp">1648 / 2480</div>
          <div class="bar"><span></span></div>
        </div>
        <div class="sub">8 个任务待办 · 今日可赚 <span class="pill">430 XP</span></div>

        <div class="quests" data-od-id="quests">
          <div class="q q1">
            <div class="glyph">G</div>
            <p class="title">GBrain</p>
            <div class="meta">向知识库收录 3 篇新文档</div>
            <span class="xp">+90</span>
          </div>
          <div class="q q2">
            <div class="glyph">C</div>
            <p class="title">Canvas</p>
            <div class="meta">上线新手引导 Canvas 应用</div>
            <span class="xp">+60</span>
          </div>
          <div class="q q3">
            <div class="glyph">A</div>
            <p class="title">Agent</p>
            <div class="meta">复盘昨晚的 agent 运行</div>
            <span class="xp">+50</span>
          </div>
          <div class="q q4">
            <div class="glyph">P</div>
            <p class="title">Packs</p>
            <div class="meta">发布分析包 v2</div>
            <span class="xp">+70</span>
          </div>
          <div class="q q5">
            <div class="glyph">D</div>
            <p class="title">Design</p>
            <div class="meta">为讲义套用一个设计包技能</div>
            <span class="xp">+40</span>
          </div>
          <div class="q q6">
            <div class="glyph">S</div>
            <p class="title">SDK</p>
            <div class="meta">为 agent SDK 接入一个工具</div>
            <span class="xp">+30</span>
          </div>
        </div>

        <div class="tabbar" data-od-id="tabbar-home">
          <div class="tab active"><div class="icon"></div>今日</div>
          <div class="tab"><div class="icon"></div>GBrain</div>
          <div class="tab center"><div class="icon">+</div>&nbsp;</div>
          <div class="tab"><div class="icon"></div>统计</div>
          <div class="tab"><div class="icon"></div>我的</div>
        </div>
      </div>
    </div>

    <!-- Phone 3 — detail -->
    <div class="phone" data-od-id="phone-detail">
      <div class="screen detail">
        <div class="status"><span>9:41</span><span class="right">·· 5G · 100%</span></div>
        <div class="topbar"><div class="back">←</div>QUEST · 01 / 08</div>
        <div class="hero">
          <span class="stamp">+90 XP</span>
          <span class="badge">— GBRAIN · 收录</span>
          <h2>20 分钟,壮大你的大脑。</h2>
          <p>一个简短、可重复的收录环节 —— 添加三个来源、为它们打标签,并在 NevoFlux 浏览器里跑一次验证查询。Sam,这个月你已经完成 11 次了。</p>
        </div>
        <div class="steps" data-od-id="steps">
          <h3>今日微任务</h3>
          <div class="step done"><div class="check"></div><div class="name">打开 GBrain 面板</div><div class="meta">+5 XP</div></div>
          <div class="step"><div class="check"></div><div class="name">添加 3 个新来源</div><div class="meta">+30 XP</div></div>
          <div class="step"><div class="check"></div><div class="name">打标签并分组</div><div class="meta">+30 XP</div></div>
          <div class="step"><div class="check"></div><div class="name">跑一次验证查询</div><div class="meta">+25 XP</div></div>
        </div>
        <div class="start">开始任务</div>
        <div class="tabbar" data-od-id="tabbar-detail">
          <div class="tab active"><div class="icon"></div>今日</div>
          <div class="tab"><div class="icon"></div>GBrain</div>
          <div class="tab center"><div class="icon">+</div>&nbsp;</div>
          <div class="tab"><div class="icon"></div>统计</div>
          <div class="tab"><div class="icon"></div>我的</div>
        </div>
      </div>
    </div>

  </div>
</body>
</html>
```

## 用法

- `stage-bar` —— 顶部舞台标签;居中的 `word` 是 NevoFlux 文字标识。
- `phone-cover` —— Frame 1 海报:`eyebrow` 标签胶囊、大号衬线 `h1` 标题(把其中一个词包进 `.accent`)、一段 `lede` 引言、一行等宽 `tip`,以及预告下一屏的 `next-peek` 条。
- `phone-home` —— Frame 2 仪表盘:问候 `head`、`level-ribbon`(等级数字、名称、XP 分数,`.bar > span` 的宽度即进度)、一行 `sub` 概要,以及 6 格 `quests` 网格(`q1`–`q6` 分别决定每格的渐变与 glyph 颜色)。
- 每个 `.q` 格子包含一个单字母 `glyph`、一个 `title`、一行 `meta`,以及一个 `xp` 奖励徽章。
- `phone-detail` —— Frame 3 任务详情:`topbar` 返回行、渐变 `hero`(徽章、标题、说明、`stamp` 奖励)、一份 `steps` 微任务清单(给某个 `.step` 加上 `done` 类即标记为完成),以及一个 `start` 行动按钮。
- `tabbar` —— 共用的 5 格底部导航;`center` 格是圆形的添加按钮。
