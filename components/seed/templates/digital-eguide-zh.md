---
slug: packs/design-pack/templates/digital-eguide-zh
type: template
lang: zh
category: article
title: "电子指南"
title_en: "NevoFlux Digital E-Guide"
description: "双页跨页电子指南：封面 + 课程页（含 pull-quote 与步骤列表），creator lead-magnet 风格。"
tags: [eguide, lookbook, lead magnet, playbook, 模板]
sample_image: packs/design-pack/assets/templates/digital-eguide.svg
source: html-anything/digital-eguide
---

## 设计指导

- 意图：creator brand 的 lead-magnet 风格，一封面页 + 一内页跨页排列，像翻开的一本书。
- 布局
  - Page 1 封面：display 大标题 + 作者 + "What's inside" 数据 + TOC teaser。
  - Page 2 内页：lesson 正文 + pull-quote + 步骤列表，结尾加一个练习提示框。
- 设计细节
  - lifestyle / creator brand 调子，柔和米色纸张配灰粉色底。
  - 两页 side-by-side 横向排列，各自微微旋转一点角度，像平摊开的书。
  - 大标题用 serif display 字体，正文用 serif body 字体，eyebrow、页码、标签用 mono 字体。
  - accent 红 + 暖橙用来高亮关键词、圆形贴纸和首字下沉。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux 实战指南 — GBrain 与 Canvas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=DM+Serif+Text:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --backdrop: #d8c8c0;
      --paper: #faf3ea;
      --paper-2: #f4ecdf;
      --ink: #1f1c14;
      --muted: #837964;
      --rule: #d3c9b3;
      --accent: #c44a47;
      --accent-2: #e07d52;
      --serif: 'Cormorant Garamond', 'Iowan Old Style', Georgia, serif;
      --serif-body: 'DM Serif Text', Georgia, serif;
      --sans: -apple-system, system-ui, 'Inter', sans-serif;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background:
        radial-gradient(ellipse 80% 60% at 50% 20%, #e8d4cc, transparent 70%),
        radial-gradient(ellipse 60% 60% at 80% 90%, #c79a8e, transparent 70%),
        var(--backdrop);
      font: 14px/1.55 var(--serif-body);
      padding: 60px 40px;
      display: flex; gap: 36px; justify-content: center; align-items: flex-start;
      flex-wrap: wrap;
    }

    .page {
      width: 540px; min-height: 740px;
      background: var(--paper);
      border-radius: 4px;
      padding: 44px 44px 36px;
      box-shadow: 0 30px 60px rgba(31,28,20,0.18), 0 4px 8px rgba(31,28,20,0.06);
      position: relative;
    }
    .page.left { transform: rotate(-0.6deg); }
    .page.right { transform: rotate(0.6deg); background: var(--paper-2); }

    .eyebrow {
      font: 10.5px/1 var(--mono);
      letter-spacing: 0.22em;
      color: var(--muted);
      text-transform: uppercase;
      display: flex; justify-content: space-between; align-items: center;
      padding-bottom: 22px;
      border-bottom: 1px solid var(--rule);
    }
    .eyebrow .left, .eyebrow .right { display: flex; align-items: center; gap: 10px; }
    .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

    /* Cover */
    .cover h1.title {
      font-family: var(--serif);
      font-weight: 700;
      font-size: clamp(60px, 7.5vw, 92px);
      line-height: 0.96;
      letter-spacing: -0.01em;
      margin: 32px 0 8px;
      color: var(--ink);
    }
    .cover h1.title .creator { color: var(--accent); font-style: italic; }
    .cover h1.title .amp { color: var(--accent-2); font-style: italic; font-weight: 500; padding: 0 6px; }
    .cover h1.title .guide { font-style: italic; font-weight: 500; }
    .cover h1.title .format { font-style: italic; font-weight: 500; padding-right: 4px; }

    .cover .author { font: 12px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; margin: 16px 0 18px; display: flex; align-items: center; gap: 10px; }
    .cover .author b { color: var(--ink); font-weight: 500; }

    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding: 18px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin: 22px 0 28px; }
    .stat .num { font: 700 36px/1 var(--serif); letter-spacing: -0.005em; }
    .stat .lbl { font: 10px/1.4 var(--mono); color: var(--muted); letter-spacing: 0.16em; text-transform: uppercase; margin-top: 6px; max-width: 16ch; }

    .cover h2.inside { font: italic 700 36px/1 var(--serif); margin: 14px 0 14px; letter-spacing: -0.005em; }
    .cover h2.inside em { font-style: italic; color: var(--accent); }

    .toc { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 36px; }
    .toc .item { display: flex; align-items: baseline; gap: 6px; font: 14.5px/1.4 var(--serif-body); }
    .toc .item .name { font-style: italic; color: var(--ink); }
    .toc .item .leader { flex: 1; border-bottom: 1px dotted var(--muted); transform: translateY(-2px); margin: 0 4px; }
    .toc .item .pn { font: 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.06em; }

    .cover-footer { position: absolute; left: 44px; right: 44px; bottom: 28px; display: flex; justify-content: space-between; align-items: center; font: 10.5px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; padding-top: 14px; border-top: 1px solid var(--rule); }
    .sticker { position: absolute; top: 280px; right: 44px; width: 92px; height: 92px; border-radius: 50%; background: var(--accent-2); transform: rotate(8deg); display: grid; place-items: center; color: #fff; font: italic 700 14px/1.1 var(--serif); text-align: center; padding: 10px; }
    .sticker::after { content: ''; position: absolute; inset: 6px; border: 1px dashed rgba(255,255,255,0.5); border-radius: 50%; }

    /* Spread */
    .spread h2.head { font: italic 700 44px/1 var(--serif); letter-spacing: -0.005em; margin: 32px 0 6px; max-width: 18ch; }
    .spread h2.head .accent { color: var(--accent); }
    .spread .deck { font: italic 16px/1.5 var(--serif-body); color: var(--muted); margin: 0 0 22px; max-width: 50ch; }

    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-top: 14px; border-top: 1px solid var(--rule); }
    .columns p { margin: 0 0 14px; font: 14.5px/1.6 var(--serif-body); color: var(--ink); }
    .columns p:first-letter { font-family: var(--serif); font-size: 38px; line-height: 0.85; padding: 4px 6px 0 0; float: left; font-weight: 700; color: var(--accent); font-style: italic; }
    .steps { display: flex; flex-direction: column; gap: 10px; }
    .steps .row { display: grid; grid-template-columns: 28px 1fr; gap: 10px; align-items: baseline; padding: 8px 0; border-bottom: 1px dashed var(--rule); }
    .steps .row .n { font: 700 12px/1 var(--mono); color: var(--accent); letter-spacing: 0.08em; }
    .steps .row .body { font: 14px/1.45 var(--serif-body); }
    .steps .row .body b { color: var(--ink); font-weight: 700; font-style: italic; }

    .pullquote {
      position: absolute; right: -16px; top: 280px;
      width: 250px;
      padding: 18px 22px;
      background: var(--paper);
      border: 1px solid var(--rule);
      border-radius: 4px;
      box-shadow: 0 8px 18px rgba(31,28,20,0.10);
      font: italic 700 22px/1.2 var(--serif);
      color: var(--ink);
      transform: rotate(2.4deg);
    }
    .pullquote .open { font-size: 56px; line-height: 0.4; color: var(--accent); display: block; height: 24px; }
    .pullquote .by { font: 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.14em; text-transform: uppercase; font-weight: 400; font-style: normal; margin-top: 14px; display: block; }

    .exercise { margin-top: 18px; padding: 14px 16px; border: 1px solid var(--accent); border-radius: 4px; background: rgba(196,74,71,0.05); display: flex; gap: 14px; align-items: center; }
    .exercise .label { font: 10.5px/1 var(--mono); color: var(--accent); letter-spacing: 0.2em; text-transform: uppercase; padding: 6px 8px; border: 1px solid var(--accent); }
    .exercise .text { font: italic 14px/1.4 var(--serif-body); color: var(--ink); }

    .spread-footer { position: absolute; left: 44px; right: 44px; bottom: 28px; display: flex; justify-content: space-between; align-items: center; font: 10.5px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; padding-top: 14px; border-top: 1px solid var(--rule); }

    @media (max-width: 1180px) {
      .pullquote { right: 16px; }
      .page { width: 92vw; max-width: 540px; }
    }
  </style>
</head>
<body>
  <article class="page left cover" data-od-id="cover">
    <div class="eyebrow">
      <div class="left"><span class="dot"></span>NEVOFLUX 构建者实战指南</div>
      <div class="right">2026 版</div>
    </div>

    <h1 class="title">这本 <span class="creator">NevoFlux</span> 的 <span class="format">Canvas</span> <span class="guide">实战指南</span></h1>

    <div class="author">— 出品 <b>NEVOFLUX</b> · 开发者关系 · 18 / 04 / 2026</div>

    <div class="stats">
      <div class="stat"><div class="num">16</div><div class="lbl">GBrain 配方</div></div>
      <div class="stat"><div class="num">38</div><div class="lbl">Canvas 该做与不该做</div></div>
      <div class="stat"><div class="num">1</div><div class="lbl">一个 Pack 零样板</div></div>
    </div>

    <h2 class="inside">里面有 <em>什么.</em></h2>

    <div class="toc" data-od-id="toc">
      <div class="item"><span class="name">打开浏览器</span><span class="leader"></span><span class="pn">04</span></div>
      <div class="item"><span class="name">喂养 GBrain</span><span class="leader"></span><span class="pn">12</span></div>
      <div class="item"><span class="name">交付一个 Canvas 应用</span><span class="leader"></span><span class="pn">18</span></div>
      <div class="item"><span class="name">接上 Agent</span><span class="leader"></span><span class="pn">24</span></div>
      <div class="item"><span class="name">发布一个 Pack</span><span class="leader"></span><span class="pn">32</span></div>
      <div class="item"><span class="name">用 skill 做设计</span><span class="leader"></span><span class="pn">40</span></div>
    </div>

    <div class="sticker">献给你的第一个 PACK</div>
    <div class="cover-footer"><span>打开浏览器</span><span>01 / 64</span></div>
  </article>

  <article class="page right spread" data-od-id="spread">
    <div class="eyebrow">
      <div class="left"><span class="dot"></span>第 02 章 · GBRAIN</div>
      <div class="right">3 — 条规则, 1 — 个练习</div>
    </div>

    <h2 class="head">像懂它一样喂它 —<br/><span class="accent">只是更干净。</span></h2>
    <p class="deck">你的知识其实早就存在，散落在一堆标签页和笔记里。要做的是把 agent 用不上的部分丢掉，再把剩下的存成它能检索到的形状。三条小规则，一个周日早晨的练习。</p>

    <div class="columns">
      <p>好的 GBrain，既有搜索引擎的召回，也有编辑的判断。大多数构建者只挑一头就停下了。打开你的知识库，把一段念出来，那些你会卡壳的句子，agent 同样会卡——把它们拆开。</p>
      <div class="steps">
        <div class="row"><span class="n">01</span><span class="body"><b>一段一个想法。</b> 如果两个事实挤在同一段里，拆开，让检索更精准。</span></div>
        <div class="row"><span class="n">02</span><span class="body"><b>丢掉噪声。</b> 导航栏、Cookie 提示、"点击这里"——它们撑大索引，然后淹没信号。</span></div>
        <div class="row"><span class="n">03</span><span class="body"><b>给每个来源起标题。</b> 清晰的标题，就是 agent 引用你时抓住的把手。</span></div>
        <div class="row"><span class="n">04</span><span class="body"><b>先问它一次。</b> 永远。Agent 的第一个回答，就是你 GBrain 的编辑。</span></div>
      </div>
    </div>

    <div class="pullquote" data-od-id="pullquote">
      <span class="open">"</span>
      具体，才是钥匙——存下只有你的浏览器看到过的东西。
      <span class="by">— NEVOFLUX · 第 02 章</span>
    </div>

    <div class="exercise" data-od-id="exercise">
      <span class="label">练习</span>
      <span class="text">把你最近保存的三个页面重新索引，去掉 <em>就</em>、<em>大概</em>、<em>等等</em> 这类词。留下那些仍然能回答一个问题的 chunk。</span>
    </div>

    <div class="spread-footer"><span>喂养 GBRAIN</span><span>18 / 64</span></div>
  </article>
</body>
</html>
```

## 用法

- `eyebrow` 行（两页）：mono 风格的 kicker——左边是标签，右边是版本 / 元信息。第二页右侧放"规则 / 练习"计数。
- 封面 `h1.title`：serif 大标题。`.creator` / `.amp` / `.format` / `.guide` 这几个 span 带 accent 颜色——保留内联结构，只换文字。
- `author` 行：mono 大写署名——名字、角色、日期。
- `stats` 行：三个 "What's inside" 数据——`.num` 是大数字，`.lbl` 是小说明。
- `toc` 网格：六条目录 teaser——`.name`（章节）+ `.pn`（页码）；中间的点线 `.leader` 会自动填充。
- `sticker`：封面右上角的圆形 accent 贴纸。
- 内页 `h2.head`：课程标题，`.accent` span 给第二行上色。
- `deck`：标题下方的一段引言。
- `columns`：左侧 `<p>` 是课程正文（首字会自动下沉成 drop-cap）；右侧 `.steps` 是编号步骤列表——`.n` 是序号，`.body b` 是加粗的引导词。
- `pullquote`：浮动引用卡片——改这句话和 `.by` 署名。
- `exercise`：结尾的练习提示框——`.label` 是标签，`.text` 是任务。
- `*-footer`：页脚 running footer——章节名 + 页码。CSS 渐变 / 内联图形保持原样，不引入外部图片。
