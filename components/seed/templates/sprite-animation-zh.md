---
slug: packs/design-pack/templates/sprite-animation-zh
type: template
lang: zh
category: poster
title: "像素动画解说"
title_en: "NevoFlux Sprite Animation"
description: "像素美术加 kinetic 字体的解说单帧, 纯 CSS 循环可录视频, 这里讲述 NevoFlux 的起源节点。"
tags: [pixel, 8-bit, retro, explainer, 模板]
sample_image: packs/design-pack/assets/templates/sprite-animation.svg
source: html-anything/sprite-animation
---

## 设计指导

模板: 像素 / 8-bit 动画解说。

意图
- 教育型动画的单帧海报, 纯 CSS keyframes 循环, 不用 JS, 可以干净地录成视频。

布局
- 整幅米色舞台 (full-bleed cream stage)。
- 醒目的大字数字 / 大号数字锚定一角。
- 中心一个像素艺术 mascot (内联 SVG 或纯 CSS 绘制)。
- kinetic 中文 display 大字 (随动画进出)。
- 底部 timeline 飘带一直向左滚动。

设计细节
- 动画全部用 @keyframes, 不依赖 JS。
- 复古调色板: 红 / 米 / 墨绿。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux, 2021 — 像素动画</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+JP:wght@500;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
  <style>
    :root {
      --paper: #f5efe2;
      --paper-2: #ede4d0;
      --ink: #181612;
      --accent: #d92b1c;
      --muted: #6f6a60;
      --serif: 'DM Serif Display', 'Iowan Old Style', Georgia, serif;
      --jp: 'Noto Serif JP', serif;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
      --pixel: 'Press Start 2P', monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; }
    body {
      min-height: 100vh;
      background: #1a1816;
      color: var(--ink);
      font: 14px/1.5 -apple-system, system-ui, sans-serif;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
    }

    .stage {
      width: min(1280px, 100%);
      aspect-ratio: 16 / 9;
      position: relative;
      overflow: hidden;
      background: var(--paper);
      background-image:
        radial-gradient(rgba(120,90,40,0.06) 1px, transparent 1px),
        radial-gradient(rgba(120,90,40,0.04) 1px, transparent 1px);
      background-size: 4px 4px, 7px 7px;
      background-position: 0 0, 2px 3px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.05);
      border-radius: 4px;
    }
    .stage::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.04) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.05) 100%);
      pointer-events: none;
    }

    /* top bar */
    .topbar { position: absolute; top: 0; left: 0; right: 0; padding: 22px 32px; display: flex; justify-content: space-between; align-items: center; font: 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; }
    .topbar .slug { display: inline-flex; align-items: center; gap: 10px; }
    .topbar .slug .jp { font-family: var(--jp); font-weight: 700; color: var(--ink); letter-spacing: 0.05em; text-transform: none; font-size: 13px; }
    .topbar .slug .en { color: var(--muted); }
    .topbar .progress { display: inline-flex; align-items: center; gap: 12px; }
    .topbar .progress .dots { display: inline-flex; gap: 4px; }
    .topbar .progress .dots i { width: 6px; height: 6px; border-radius: 50%; background: var(--ink); display: inline-block; opacity: 0.18; }
    .topbar .progress .dots i.on { opacity: 1; }
    .topbar .rec { display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border: 1px solid var(--ink); color: var(--ink); }
    .topbar .rec::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: blink 1.2s steps(2) infinite; }
    @keyframes blink { 50% { opacity: 0.2; } }

    /* big year */
    .year { position: absolute; left: 6%; bottom: 14%; font: 700 200px/0.85 var(--serif); color: var(--ink); letter-spacing: -0.03em; }
    .year .num { display: inline-block; position: relative; }
    .year .num .glitch {
      position: absolute; left: 0; top: 0; color: var(--accent);
      clip-path: inset(0 0 70% 0);
      animation: glitch 4s steps(8) infinite;
      mix-blend-mode: multiply;
    }
    @keyframes glitch {
      0%, 88%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0,0); opacity: 0; }
      89% { clip-path: inset(20% 0 60% 0); transform: translate(2px, -1px); opacity: 0.7; }
      91% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 1px); opacity: 0.7; }
      94% { clip-path: inset(40% 0 40% 0); transform: translate(1px, 0); opacity: 0.6; }
      97% { clip-path: inset(0 0 100% 0); transform: translate(0,0); opacity: 0; }
    }
    .year .jp-suffix { font-family: var(--jp); font-weight: 700; font-size: 0.6em; vertical-align: 0.16em; margin-left: 0.04em; }

    .year-label { position: absolute; left: 6%; bottom: calc(14% + 200px + 12px); font: 11px/1.2 var(--mono); letter-spacing: 0.22em; color: var(--muted); text-transform: uppercase; }
    .year-label::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--ink); vertical-align: middle; margin-right: 10px; opacity: 0.5; }

    /* sprite card */
    .sprite-stack {
      position: absolute; right: 12%; top: 22%;
      display: flex; flex-direction: column; align-items: center; gap: 22px;
      animation: bob 2.4s ease-in-out infinite;
    }
    @keyframes bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .sprite-card {
      width: 168px; height: 252px;
      background: var(--paper-2);
      border: 4px solid var(--ink);
      border-radius: 10px;
      box-shadow: 8px 8px 0 var(--ink);
      position: relative;
      padding: 12px;
      display: flex; flex-direction: column; align-items: center;
      image-rendering: pixelated;
    }
    .sprite-card::before, .sprite-card::after {
      content: ''; position: absolute; left: 8px; right: 8px; height: 4px; background: var(--ink);
    }
    .sprite-card::before { top: 14px; }
    .sprite-card::after { bottom: 14px; }

    .sprite-card svg { display: block; image-rendering: pixelated; shape-rendering: crispEdges; margin-top: 18px; }

    .sprite-tag { font-family: var(--jp); font-weight: 700; font-size: 28px; color: var(--accent); margin-top: auto; line-height: 1; letter-spacing: 0.06em; }
    .sprite-tag small { display: block; font-family: var(--mono); font-weight: 500; font-size: 10px; color: var(--muted); letter-spacing: 0.18em; margin-top: 4px; text-transform: uppercase; }

    /* kinetic kana */
    .kana { position: absolute; right: 6%; top: 12%; font-family: var(--jp); font-weight: 700; font-size: 96px; color: var(--ink); line-height: 1; letter-spacing: 0; }
    .kana span { display: inline-block; opacity: 0; animation: kana-in 4s ease-in-out infinite; }
    .kana span:nth-child(1) { animation-delay: 0s; }
    .kana span:nth-child(2) { animation-delay: 0.4s; }
    @keyframes kana-in {
      0% { opacity: 0; transform: translateY(-12px); }
      18%, 78% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(8px); }
    }

    /* caption block */
    .caption {
      position: absolute; left: 6%; right: 50%; bottom: 6%;
      font: 12px/1.5 var(--mono); color: var(--ink);
      letter-spacing: 0.04em;
      max-width: 32ch;
    }
    .caption strong { display: block; font-family: var(--serif); font-weight: 400; font-style: italic; font-size: 18px; letter-spacing: -0.005em; margin-bottom: 6px; color: var(--ink); }

    /* tick ribbon */
    .ribbon {
      position: absolute; left: 0; right: 0; bottom: 0;
      height: 36px;
      background: var(--ink);
      color: var(--paper);
      overflow: hidden;
      display: flex; align-items: center;
    }
    .ribbon-track {
      display: inline-flex; gap: 64px;
      padding: 0 32px;
      animation: scroll-left 22s linear infinite;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ribbon-track .tick { display: inline-flex; align-items: center; gap: 8px; font: 11px/1 var(--mono); letter-spacing: 0.22em; }
    .ribbon-track .tick .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
    .ribbon-track .tick .label { color: var(--paper); }
    .ribbon-track .tick .note { color: rgba(245,239,226,0.55); text-transform: uppercase; }
    @keyframes scroll-left {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    /* corner registration marks */
    .reg { position: absolute; width: 14px; height: 14px; border: 1px solid var(--ink); opacity: 0.35; }
    .reg.tl { top: 14px; left: 14px; border-right: none; border-bottom: none; }
    .reg.tr { top: 14px; right: 14px; border-left: none; border-bottom: none; }
    .reg.bl { bottom: 50px; left: 14px; border-right: none; border-top: none; }
    .reg.br { bottom: 50px; right: 14px; border-left: none; border-top: none; }

    @media (max-width: 900px) {
      .year { font-size: 120px; bottom: 18%; }
      .year-label { bottom: calc(18% + 120px + 8px); }
      .kana { font-size: 64px; }
      .sprite-stack { right: 8%; top: 26%; }
      .sprite-card { width: 124px; height: 184px; }
    }
  </style>
</head>
<body>
  <div class="stage" data-od-id="stage">

    <span class="reg tl"></span>
    <span class="reg tr"></span>
    <span class="reg bl"></span>
    <span class="reg br"></span>

    <div class="topbar" data-od-id="topbar">
      <div class="slug">
        <span class="jp">起源的一帧</span>
        <span class="en">EP. 01 · NEVOFLUX 起源</span>
      </div>
      <div class="progress">
        <span class="dots"><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <span>01 / 12</span>
        <span class="rec">REC</span>
      </div>
    </div>

    <div class="kana" data-od-id="kana"><span>知</span><span>核</span></div>

    <div class="year-label" data-od-id="year-label">第 01 章 · 一个带大脑的浏览器</div>
    <div class="year" data-od-id="year">
      <span class="num">
        2021
        <span class="glitch" aria-hidden="true">2021</span>
      </span><span class="jp-suffix">年</span>
    </div>

    <div class="sprite-stack" data-od-id="sprite">
      <div class="sprite-card">
        <!-- GBrain 知识节点像素图 — pixel-art neuron card -->
        <svg width="120" height="160" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" aria-label="GBrain 知识节点">
          <!-- background -->
          <rect x="0" y="0" width="24" height="32" fill="#f5efe2"/>
          <!-- header band -->
          <rect x="3" y="2" width="18" height="10" fill="#1a1614"/>
          <!-- spark / cursor -->
          <rect x="14" y="4" width="5" height="5" fill="#f7c95b"/>
          <rect x="13" y="5" width="1" height="3" fill="#f7c95b"/>
          <rect x="19" y="5" width="1" height="3" fill="#f7c95b"/>
          <!-- node core (red) -->
          <rect x="9" y="14" width="6" height="2" fill="#d92b1c"/>
          <rect x="7" y="16" width="10" height="2" fill="#d92b1c"/>
          <rect x="6" y="18" width="12" height="2" fill="#d92b1c"/>
          <rect x="7" y="20" width="10" height="2" fill="#d92b1c"/>
          <rect x="9" y="22" width="6" height="2" fill="#d92b1c"/>
          <!-- node highlights -->
          <rect x="10" y="15" width="2" height="1" fill="#ff6b5e"/>
          <rect x="8" y="17" width="2" height="1" fill="#ff6b5e"/>
          <rect x="14" y="19" width="2" height="1" fill="#ff6b5e"/>
          <!-- center -->
          <rect x="11" y="18" width="2" height="2" fill="#f7c95b"/>
          <!-- synapse links -->
          <rect x="11" y="24" width="2" height="6" fill="#3b6b3b"/>
          <rect x="8" y="26" width="3" height="2" fill="#3b6b3b"/>
          <rect x="13" y="27" width="3" height="2" fill="#3b6b3b"/>
        </svg>
        <div class="sprite-tag">知<small>GBRAIN · 知识库</small></div>
      </div>
    </div>

    <div class="caption" data-od-id="caption">
      <strong>NevoFlux 最初是一个会记忆的浏览器。</strong>
      你打开的每个页面都会喂给本地知识库 GBrain。Canvas 应用与
      agent SDK 还要再过 <em>两</em> 年才会面世。
    </div>

    <div class="ribbon" data-od-id="ribbon">
      <div class="ribbon-track">
        <div class="tick"><span class="dot"></span><span class="label">2021</span><span class="note">GBRAIN · 浏览器内核</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2022</span><span class="note">CANVAS 应用</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2023</span><span class="note">AGENT SDK</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2024</span><span class="note">PACK 注册表</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2025</span><span class="note">设计技能</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2026</span><span class="note">DESIGN PACK 1.0</span></div>
        <div class="tick"><span class="dot"></span><span class="label">现在</span><span class="note">万物皆可造</span></div>

        <div class="tick"><span class="dot"></span><span class="label">2021</span><span class="note">GBRAIN · 浏览器内核</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2022</span><span class="note">CANVAS 应用</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2023</span><span class="note">AGENT SDK</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2024</span><span class="note">PACK 注册表</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2025</span><span class="note">设计技能</span></div>
        <div class="tick"><span class="dot"></span><span class="label">2026</span><span class="note">DESIGN PACK 1.0</span></div>
        <div class="tick"><span class="dot"></span><span class="label">现在</span><span class="note">万物皆可造</span></div>
      </div>
    </div>

  </div>
</body>
</html>
```

## 用法

- `topbar` slug / progress: 集数标签、步骤圆点、`NN / NN` 计数器和闪烁的 REC 徽标。把 `.on` 类加在某个圆点上表示当前步骤。
- `kana`: 两个进出动画的 display 大字 - 换成你的焦点词 (这里是 GBrain 的"知核")。
- `year-label` + `year`: 章节说明和醒目的大字数字 (一个里程碑年份)。红色 `.glitch` 层是同一个数字的镜像, 用来做闪烁效果, 两份内容必须保持一致。
- `sprite-stack` / `sprite-card`: 上下浮动的像素 mascot。把内联 SVG 换成你自己的像素图, 并更新 `sprite-tag` 的大字和它的小标题。
- `caption`: 解说段落 - 一个斜体 `strong` 引言加一句补充说明。
- `ribbon`: 滚动的时间线。每个 `.tick` 有一个标签和一条备注; 整组复制一次 (轨道是双份的, 这样循环才能无缝)。
