---
slug: packs/design-pack/templates/motion-frames-zh
type: template
lang: zh
category: video
title: "动效英雄帧"
title_en: "NevoFlux Motion Frames"
description: "纯 CSS 可循环动效组合: 旋转字环、地球仪、计时器、视差标签, 适合 NevoFlux 视频片头或落地页 hero。"
tags: [motion, title card, loop, video poster, 模板]
sample_image: packs/design-pack/assets/templates/motion-frames.svg
source: html-anything/motion-frames
---

## 设计指导

意图
- 一帧带循环动效的 hero, 可作为视频片头或落地页大图。

布局
- 旋转字环 (SVG + `transform` 驱动的同心圆), 编辑感标签围绕外环一起旋转。
- 中心一个缓慢自转的地球仪 (或抽象几何)。
- 等宽字体的计时器 / 信号线 (JS 可有可无, 纯 CSS 即可承载)。
- 四角浮动的视差标签 (期号、meta 信息块、上下 chrome 横轨)。

设计细节
- 全部为纯 CSS 动效, 流畅且可无缝循环, 不依赖任何媒体文件或外部资源。
- 暖纸底色上做电影感、编辑感调色, 只用一个霓虹质感 accent (此处烧橙 `#c0563b`), 仅点在焦点圆点与一个 accent 词上。
- 留白要充足, 让字环与地球仪说话; 标题通过 `letter-spacing` 缓动入场一次。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>检索每一个来源 — NevoFlux</title>
  <style>
    :root {
      --paper: #f3eee5;
      --ink: #1a1816;
      --muted: #7a766c;
      --accent: #c0563b;
      --serif: 'Cormorant Garamond', 'Iowan Old Style', Georgia, serif;
      --mono: ui-monospace, 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; height: 100%; }
    body { background: var(--paper); color: var(--ink); font: 14px/1.5 -apple-system, system-ui, sans-serif; overflow: hidden; }
    main {
      position: relative;
      width: 100vw;
      height: 100vh;
      background:
        radial-gradient(circle at 50% 50%, rgba(26,24,22,0.04), transparent 70%),
        radial-gradient(circle, rgba(26,24,22,0.10) 1px, transparent 1.4px) 0 0 / 28px 28px,
        var(--paper);
      overflow: hidden;
    }

    .chrome { position: absolute; left: 36px; right: 36px; font: 10px/1.4 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; }
    .chrome.top { top: 28px; display: flex; justify-content: space-between; align-items: center; }
    .chrome.top .right { display: flex; align-items: center; gap: 22px; }
    .chrome.top .rule { width: 60px; height: 1px; background: var(--ink); opacity: 0.6; }
    .chrome.bot { bottom: 28px; display: flex; justify-content: space-between; align-items: center; }

    .stage {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
    }
    .composition {
      position: relative;
      width: min(78vh, 78vw);
      aspect-ratio: 1 / 1;
    }

    .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1px solid rgba(26,24,22,0.45);
      animation: spin 60s linear infinite;
    }
    .ring.r2 {
      inset: 4%;
      border-color: rgba(26,24,22,0.30);
      animation-duration: 90s;
      animation-direction: reverse;
    }
    .ring.r3 {
      inset: 10%;
      border-color: rgba(26,24,22,0.22);
      border-style: dashed;
      animation-duration: 180s;
    }
    .ring.r4 {
      inset: 18%;
      border-color: rgba(26,24,22,0.12);
      animation-duration: 36s;
    }

    .ring-labels { position: absolute; inset: 0; animation: spin 60s linear infinite; }
    .ring-labels span {
      position: absolute;
      left: 50%; top: 50%;
      font: 12px/1 var(--serif);
      font-style: italic;
      color: var(--ink);
      letter-spacing: 0.02em;
      transform-origin: 0 0;
      white-space: nowrap;
    }
    .ring-labels span.l1 { transform: rotate(-12deg) translate(0, -49vh); }
    .ring-labels span.l2 { transform: rotate(34deg) translate(0, -49vh); }
    .ring-labels span.l3 { transform: rotate(78deg) translate(0, -49vh); }
    .ring-labels span.l4 { transform: rotate(132deg) translate(0, -49vh); }
    .ring-labels span.l5 { transform: rotate(178deg) translate(0, -49vh); }
    .ring-labels span.l6 { transform: rotate(224deg) translate(0, -49vh); }
    .ring-labels span.l7 { transform: rotate(266deg) translate(0, -49vh); }
    .ring-labels span.l8 { transform: rotate(312deg) translate(0, -49vh); }
    .ring-labels span i { display: inline-block; transform: rotate(0deg); /* counter rotation handled inside */ }

    .globe {
      position: absolute;
      inset: 22%;
      border-radius: 50%;
      animation: spin 38s linear infinite reverse;
      transform-style: preserve-3d;
    }
    .globe svg { width: 100%; height: 100%; display: block; }

    .focal-dot {
      position: absolute;
      left: 50%; top: 50%;
      width: 7px; height: 7px;
      background: var(--accent);
      border-radius: 50%;
      transform: translate(-50%,-50%);
      animation: pulse 2.6s ease-in-out infinite;
      box-shadow: 0 0 0 0 rgba(192,86,59,0.35);
    }

    .meta-tl { position: absolute; top: 96px; left: 56px; font: 10px/1.5 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; }
    .meta-tl b { display: block; color: var(--ink); margin-bottom: 4px; letter-spacing: 0.12em; }
    .issue { position: absolute; top: 96px; right: 56px; font: 9px/1.3 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-align: right; text-transform: uppercase; }
    .issue .num { font: 18px/1 var(--serif); font-style: italic; color: var(--ink); display: block; letter-spacing: 0; margin-bottom: 4px; }

    .headline {
      position: absolute;
      bottom: 80px;
      left: 0; right: 0;
      text-align: center;
      font: 38px/1.1 var(--serif);
      letter-spacing: -0.005em;
      animation: type-in 1.4s cubic-bezier(.2,.7,.2,1) both;
    }
    .headline .em { font-style: italic; color: var(--ink); }
    .headline .accent { font-style: italic; color: var(--accent); padding-left: 4px; padding-right: 4px; }
    .baseline { position: absolute; bottom: 56px; left: 36px; right: 36px; height: 1px; background: rgba(26,24,22,0.25); }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(192,86,59,0.45); transform: translate(-50%,-50%) scale(1); }
      50% { box-shadow: 0 0 0 18px rgba(192,86,59,0); transform: translate(-50%,-50%) scale(1.25); }
    }
    @keyframes type-in {
      from { opacity: 0; letter-spacing: 0.06em; }
      to { opacity: 1; letter-spacing: -0.005em; }
    }
    @media (max-width: 900px) {
      .meta-tl { left: 20px; }
      .issue { right: 20px; }
      .headline { font-size: 28px; }
    }
  </style>
</head>
<body>
  <main data-od-id="stage">
    <div class="chrome top">
      <div>NEVOFLUX 实验室 — 4月17日 · 2026</div>
      <div class="right"><div class="rule"></div><div>GBRAIN 工作原理</div></div>
    </div>

    <div class="meta-tl">
      <b>27 · 浏览器 × GBRAIN</b>
      构建 · 2026
    </div>
    <div class="issue">
      <span class="num">9.4K</span>
      已索引来源
    </div>

    <div class="stage">
      <div class="composition" data-od-id="composition">
        <div class="ring r1"></div>
        <div class="ring r2"></div>
        <div class="ring r3"></div>
        <div class="ring r4"></div>

        <div class="globe" data-od-id="globe">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <radialGradient id="globeShade" cx="35%" cy="32%" r="78%">
                <stop offset="0%" stop-color="#fffaf0"/>
                <stop offset="60%" stop-color="#ece6da"/>
                <stop offset="100%" stop-color="#cfc8b9"/>
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="url(#globeShade)" stroke="rgba(26,24,22,0.35)" stroke-width="0.7"/>
            <g fill="none" stroke="rgba(26,24,22,0.40)" stroke-width="0.7">
              <ellipse cx="100" cy="100" rx="92" ry="20"/>
              <ellipse cx="100" cy="100" rx="92" ry="48"/>
              <ellipse cx="100" cy="100" rx="92" ry="78"/>
              <ellipse cx="100" cy="100" rx="20" ry="92"/>
              <ellipse cx="100" cy="100" rx="48" ry="92"/>
              <ellipse cx="100" cy="100" rx="78" ry="92"/>
            </g>
            <g fill="rgba(26,24,22,0.28)" stroke="rgba(26,24,22,0.55)" stroke-width="0.6">
              <path d="M 64 70 Q 78 58 96 64 L 110 78 Q 102 92 88 96 L 70 92 Q 60 84 64 70 Z"/>
              <path d="M 116 70 Q 138 64 156 80 Q 152 96 138 100 Q 124 96 116 86 Z"/>
              <path d="M 54 110 Q 72 110 84 124 Q 80 142 64 150 Q 50 138 54 110 Z"/>
              <path d="M 102 118 Q 124 112 146 126 Q 142 144 120 152 Q 102 144 102 118 Z"/>
              <path d="M 84 36 Q 98 32 112 38 L 108 50 Q 96 56 84 50 Z"/>
              <path d="M 80 158 Q 96 156 110 162 L 104 174 Q 90 174 80 168 Z"/>
            </g>
          </svg>
        </div>

        <div class="focal-dot"></div>
      </div>
    </div>

    <div class="ring-labels" data-od-id="ring-labels" aria-hidden="true">
      <!-- positioned around the outer ring; co-rotates with .ring -->
    </div>

    <div class="headline" data-od-id="headline">
      <span class="em">检索</span>每一个<span class="accent">来源。</span>
    </div>
    <div class="baseline"></div>

    <div class="chrome bot">
      <div>GBRAIN · 实时</div>
      <div>索引中 / 0001</div>
    </div>
  </main>
</body>
</html>
```

## 用法

- `chrome.top`: 左轨是日期 / 实验室标签 (`NEVOFLUX 实验室 — 日期`), 右轨是一条细线加一个短栏目标签 (如 `GBRAIN 工作原理`)。换成你自己的产品线。
- `meta-tl` (左上): 一行加粗标题 + 一行副标 — 此处为 NevoFlux 模块标识 (`浏览器 × GBRAIN` / `构建 · 2026`)。
- `issue` (右上): 一个大号斜体数字 (`.num`) + 一行大写说明 — 填入一个示意指标 (`9.4K` 已索引来源、已发布的 Canvas 应用数、pack 数量等)。
- `composition`: 四层 `.ring`、SVG `.globe` 与 `.focal-dot` 都是装饰 — 几何结构保持不动, 由它们承载循环动效。
- `ring-labels`: 可选地在内部加入 `<span class="l1">…</span>` 编辑感词条, 随外环一起旋转。
- `headline` (底部): 收尾金句。保留 `.em` / 普通 / `.accent` 三段结构 — 此处为 `检索 / 每一个 / 来源。`, accent 词为烧橙色。换成你自己的简短 hero 句。
- `chrome.bot`: 一对状态文案 (`GBRAIN · 实时` / `索引中 / 0001`)。全部为纯 CSS/SVG — 无任何外部 URL, 可无缝循环。
