---
slug: packs/design-pack/templates/social-carousel-zh
type: template
lang: zh
category: card
title: "社交媒体三联"
title_en: "NevoFlux Social Carousel"
description: "三张 1080×1080 方形卡片, 标题跨张串联成一句话, 每张带品牌 mark 与 1/3 编号。"
tags: [instagram, linkedin, thread, carousel, 三联, 模板]
sample_image: packs/design-pack/assets/templates/social-carousel.svg
source: html-anything/social-carousel
---

## 设计指导

布局
- 三张 1080×1080 方形卡片。display headline 跨越三张, 让它们读起来像一句连续的话。
- Card 1: headline 开头 + 品牌 mark + 编号 `1/3`。
- Card 2: headline 中段 + 视觉重点 + 编号 `2/3`。
- Card 3: headline 结尾 + CTA + loop icon + 编号 `3/3`。

设计细节
- 整组使用统一的一套调色板, 卡片之间渐进切换, 让三张感觉像同一个序列。
- 三个 headline 拼起来构成完整的一句话。
- 字体保持极简且大号; 让纯 CSS 的背景插画承载氛围。每张卡片既能独立成立, 也能在 Instagram、LinkedIn 或 X 上作为三联系列连播。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>浏览它。装进大脑。循环它。 — NevoFlux 三联</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --stage: #0a0a0a;
      --stage-2: #141414;
      --paper: #f4ede0;
      --serif: 'Instrument Serif', 'Iowan Old Style', Georgia, serif;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.04), transparent 70%),
        var(--stage);
      color: #f4ede0;
      font: 14px/1.5 -apple-system, system-ui, sans-serif;
    }

    .stage {
      max-width: 1280px; margin: 0 auto; padding: 60px 32px 80px;
    }
    .stage-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 36px; }
    .stage-head h1 { margin: 0; font: italic 700 36px/1 var(--serif); letter-spacing: -0.005em; }
    .stage-head h1 em { font-style: normal; }
    .stage-head h1 .dot { color: #a4a09a; }
    .stage-head .lede { margin: 8px 0 0; font: 11px/1.6 var(--mono); color: rgba(244,237,224,0.5); letter-spacing: 0.06em; max-width: 60ch; text-transform: uppercase; }
    .stage-head .badge { font: 10.5px/1 var(--mono); padding: 7px 10px; border: 1px solid rgba(244,237,224,0.3); color: rgba(244,237,224,0.7); letter-spacing: 0.18em; flex-shrink: 0; }

    .row { display: flex; gap: 22px; justify-content: center; align-items: stretch; flex-wrap: wrap; }

    .card {
      width: clamp(280px, 30vw, 380px);
      aspect-ratio: 1 / 1;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.06);
      box-shadow: 0 30px 60px rgba(0,0,0,0.45);
      position: relative;
      overflow: hidden;
      color: #ffffff;
    }
    .card .scrim {
      position: absolute; inset: 0;
      background:
        linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%);
      pointer-events: none;
    }
    .card .top { position: absolute; top: 18px; left: 18px; right: 18px; display: flex; justify-content: space-between; align-items: flex-start; }
    .card .brand { display: inline-flex; align-items: center; gap: 6px; padding: 6px 9px; background: rgba(255,255,255,0.10); backdrop-filter: blur(6px); border-radius: 999px; }
    .card .brand .name { font: italic 700 13px/1 var(--serif); }
    .card .brand .dot { width: 5px; height: 5px; background: var(--paper); border-radius: 50%; opacity: 0.9; }
    .card .index { font: 11px/1.4 var(--mono); color: rgba(255,255,255,0.85); letter-spacing: 0.16em; text-align: right; padding: 6px 10px; background: rgba(0,0,0,0.30); backdrop-filter: blur(4px); border-radius: 4px; }

    .card .lockup { position: absolute; left: 22px; right: 22px; bottom: 78px; }
    .card .lockup h2 { margin: 0; font: 700 60px/1 var(--serif); letter-spacing: -0.005em; color: #ffffff; }
    .card .lockup h2 em { font-style: italic; }
    .card .lockup h2 .accent { font-style: italic; }

    .card .footer { position: absolute; left: 22px; right: 22px; bottom: 22px; display: flex; justify-content: space-between; align-items: center; }
    .card .footer .caption { font: 10.5px/1.4 var(--mono); color: rgba(255,255,255,0.85); letter-spacing: 0.14em; text-transform: uppercase; max-width: 70%; }
    .card .loop { font: 10.5px/1 var(--mono); padding: 6px 8px; border: 1px solid rgba(255,255,255,0.55); border-radius: 4px; color: rgba(255,255,255,0.85); letter-spacing: 0.18em; }

    /* Card 1 — dawn meadow, blue sky */
    .card.c1 {
      background:
        linear-gradient(180deg, #5b8cb6 0%, #92aebd 32%, #b0a679 50%, #6f8a4d 70%, #2a4a2a 100%),
        #4a6a8a;
    }
    .card.c1 .figure {
      position: absolute; left: 50%; top: 56%;
      width: 80px; height: 200px;
      transform: translate(-50%, 0);
      background:
        radial-gradient(ellipse 30px 14px at 50% 30%, #2a1f15 0%, #2a1f15 60%, transparent 70%),
        linear-gradient(180deg, #2a1f15 0%, #4a3018 22%, #6a3a1a 60%, transparent 100%);
      filter: drop-shadow(0 6px 8px rgba(0,0,0,0.35));
      clip-path: polygon(35% 0%, 65% 0%, 78% 26%, 70% 60%, 70% 100%, 30% 100%, 30% 60%, 22% 26%);
      opacity: 0.92;
    }

    /* Card 2 — forest dusk, warm orange center */
    .card.c2 {
      background:
        radial-gradient(ellipse 80% 50% at 50% 100%, #f49255 0%, #c95a30 35%, transparent 60%),
        radial-gradient(ellipse 80% 80% at 50% 90%, rgba(255,180,120,0.5), transparent 60%),
        linear-gradient(180deg, #1c2a25 0%, #2a3a30 30%, #4a3a26 70%, #2a1a14 100%);
    }
    .card.c2 .trees {
      position: absolute; left: 0; right: 0; top: 0; bottom: 0;
    }
    .card.c2 .trees::before, .card.c2 .trees::after {
      content: ''; position: absolute; bottom: 0; width: 50%; height: 70%;
      background:
        radial-gradient(circle at 20% 90%, #0f1a14 6px, transparent 7px),
        radial-gradient(circle at 50% 88%, #0f1a14 8px, transparent 9px),
        radial-gradient(circle at 80% 92%, #0f1a14 6px, transparent 7px);
    }
    .card.c2 .trees::before { left: 0; background:
      linear-gradient(180deg, transparent 0%, transparent 30%, rgba(15,26,20,0.85) 30%, #0f1a14 100%);
      mask: radial-gradient(ellipse 60% 90% at 50% 100%, black 70%, transparent 100%);
    }
    .card.c2 .trees::after { right: 0; background:
      linear-gradient(180deg, transparent 0%, transparent 36%, rgba(15,26,20,0.85) 36%, #0f1a14 100%);
      mask: radial-gradient(ellipse 60% 90% at 50% 100%, black 70%, transparent 100%);
    }
    .card.c2 .figure {
      position: absolute; left: 52%; top: 56%; width: 56px; height: 130px;
      transform: translate(-50%, 0);
      background: linear-gradient(180deg, #2a1810 0%, #4a2818 100%);
      clip-path: polygon(40% 0%, 60% 0%, 70% 22%, 70% 56%, 65% 100%, 35% 100%, 30% 56%, 30% 22%);
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
    }

    /* Card 3 — pink ridge / mountain */
    .card.c3 {
      background:
        linear-gradient(180deg, #1b1e3a 0%, #4a3956 28%, #c9627e 60%, #d57f86 75%, #b8d2d8 100%);
    }
    .card.c3 .ridge {
      position: absolute; inset: 0;
      background:
        linear-gradient(180deg, transparent 60%, rgba(60,30,40,0.4) 80%, rgba(40,20,30,0.7) 100%);
    }
    .card.c3 .ridge::before {
      content: ''; position: absolute; left: 0; right: 0; bottom: 24%;
      height: 30%;
      background:
        linear-gradient(180deg, #b3526a 0%, #7a3148 100%);
      clip-path: polygon(0% 60%, 12% 30%, 22% 50%, 36% 18%, 50% 40%, 60% 22%, 72% 48%, 86% 26%, 100% 50%, 100% 100%, 0% 100%);
    }
    .card.c3 .ridge::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0;
      height: 32%;
      background: linear-gradient(180deg, #2a1f2a 0%, #1a1018 100%);
      clip-path: polygon(0% 50%, 8% 20%, 18% 38%, 30% 8%, 44% 32%, 56% 12%, 68% 36%, 82% 18%, 100% 40%, 100% 100%, 0% 100%);
    }
    .card.c3 .figure {
      position: absolute; right: 18%; bottom: 14%; width: 30px; height: 56px;
      background: #1a0d12;
      clip-path: polygon(35% 0%, 65% 0%, 75% 30%, 60% 100%, 40% 100%, 25% 30%);
      filter: drop-shadow(0 4px 4px rgba(0,0,0,0.4));
    }

    @media (max-width: 1180px) {
      .row { flex-direction: column; align-items: center; }
      .card { width: min(96vw, 480px); }
      .card .lockup h2 { font-size: 56px; }
    }
  </style>
</head>
<body>
  <div class="stage" data-od-id="stage">
    <div class="stage-head">
      <div>
        <h1>浏览它<span class="dot">.</span> 装进<em>大脑</em><span class="dot">.</span></h1>
        <p class="lede">1080×1080 · NevoFlux 浏览器三联 · 极简字体。投放到 Instagram、LinkedIn 或 X —— 每条帖子既能独立成立, 也能作为三联系列连播。</p>
      </div>
      <span class="badge">系列 · 01 → 03</span>
    </div>

    <div class="row" data-od-id="cards">

      <article class="card c1" data-od-id="card-1">
        <div class="figure"></div>
        <div class="scrim"></div>
        <div class="top">
          <div class="brand"><span class="dot"></span><span class="name">NevoFlux</span></div>
          <div class="index">01 · 浏览</div>
        </div>
        <div class="lockup"><h2>浏览它<em>.</em></h2></div>
        <div class="footer">
          <div class="caption">打开任意标签页 —— 浏览器正在为你留意。</div>
          <div class="loop">1× LOOP</div>
        </div>
      </article>

      <article class="card c2" data-od-id="card-2">
        <div class="trees"></div>
        <div class="figure"></div>
        <div class="scrim"></div>
        <div class="top">
          <div class="brand"><span class="dot"></span><span class="name">NevoFlux</span></div>
          <div class="index">02 · 装进大脑</div>
        </div>
        <div class="lockup"><h2><span class="accent">装进大脑</span><br/><em>存入 GBrain.</em></h2></div>
        <div class="footer">
          <div class="caption">一段剪藏 —— 存进你的知识库。</div>
          <div class="loop">1× LOOP</div>
        </div>
      </article>

      <article class="card c3" data-od-id="card-3">
        <div class="ridge"></div>
        <div class="figure"></div>
        <div class="scrim"></div>
        <div class="top">
          <div class="brand"><span class="dot"></span><span class="name">NevoFlux</span></div>
          <div class="index">03 · 循环它</div>
        </div>
        <div class="lockup"><h2>循环它<br/><em>在 Canvas 里.</em></h2></div>
        <div class="footer">
          <div class="caption">把你存下的内容变成一个 Canvas 应用。</div>
          <div class="loop">1× LOOP</div>
        </div>
      </article>

    </div>
  </div>
</body>
</html>
```

## 用法

- `stage-head h1`: 联系表视图的引导标题; 保持两段短句, 用 `.dot` 句点连接。
- `stage-head .lede`: 一行大写 mono 文字, 说明格式与投放渠道。`badge`: 系列范围, 例如 `系列 · 01 → 03`。
- 每个 `.card` 是一帧 1080×1080。填满三个槽位:
  - `.brand .name`: pill 中展示的品牌 mark (此处为 "NevoFlux")。
  - `.index`: 帧编号加一个单词动词, 例如 `01 · 浏览`。
  - `.lockup h2`: headline 片段。把强调词包进 `<em>` 或 `<span class="accent">`; 三个片段必须拼成一句话 ("浏览它。装进大脑, 存入 GBrain。在 Canvas 里循环它。")。
  - `.footer .caption`: 一行简短的大写 mono 说明文字, 描述该帧的视觉。
  - `.loop`: loop 徽标; 保持为 `1× LOOP`。
- `.figure`、`.trees` 与 `.ridge` 形状是纯 CSS 背景插画 —— 保留它们来承载氛围与卡片之间的调色板渐变。
