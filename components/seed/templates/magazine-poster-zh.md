---
slug: packs/design-pack/templates/magazine-poster-zh
type: template
lang: zh
category: poster
title: "杂志风海报"
title_en: "NevoFlux Magazine Poster"
description: "报纸社论风格的竖版长图海报——大字 serif 主标题 + 双栏正文 + 编号 sections，适合 NevoFlux 发布宣言与功能盘点。"
tags: [magazine, newsprint, editorial, manifesto, 模板]
sample_image: packs/design-pack/assets/templates/magazine-poster.svg
source: html-anything/magazine-poster
---

## 设计指导

- Newsprint 社论风格的竖版长图海报——读起来要像一整版报纸。
- 布局：
  - Dateline 顶栏（publication / date / issue 期号）。
  - 超大号 serif 主标题（含一个 strike-through 划掉词 + 一个斜体 accent 强调词）。
  - 主标题下方的斜体 deck（导语）段落。
  - 双栏正文，拆成 6 个编号 sections，每个含小编号 kicker + 小标题 + 1-2 段正文 + pull-quote。
  - 底部署名行 + 小 ornament / pro-tip 块。
- 设计细节：
  - 纸感：暖灰 cream 背景 + 细 dot pattern，黑字墨色。
  - 字体：Playfair Display（标题）+ IBM Plex Serif / Iowan（正文）+ JetBrains Mono / IBM Plex Mono（标签）。
  - 单一暖色 accent（陶土橙）用于斜体强调词、编号 kicker、分隔线与引用边线。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>现在你不需要 wiki 也能交付一个活的知识库了 — NevoFlux Dispatch</title>
  <style>
    :root {
      --paper: #f3eee2;
      --ink: #1f1c17;
      --muted: #6e6a5d;
      --rule: #d3cdbe;
      --accent: #b85a3a;
      --tint: #ece5d3;
      --serif-display: 'Playfair Display', 'Iowan Old Style', Georgia, serif;
      --serif-body: 'Iowan Old Style', 'Charter', Georgia, serif;
      --mono: 'IBM Plex Mono', ui-monospace, 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; color: var(--ink);
      background:
        radial-gradient(circle, rgba(31,28,23,0.05) 1px, transparent 1.4px) 0 0 / 16px 16px,
        var(--paper);
      font: 14px/1.55 var(--serif-body);
    }
    .page {
      max-width: 1180px;
      margin: 0 auto;
      padding: 36px 56px 48px;
    }

    .top-rule {
      display: flex; justify-content: space-between; align-items: center;
      font: 10.5px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--ink);
    }
    .eyebrow-row {
      padding: 14px 0 28px;
      font: 10.5px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1.headline {
      font-family: var(--serif-display);
      font-weight: 800;
      font-size: clamp(56px, 7vw, 96px);
      line-height: 0.98;
      letter-spacing: -0.012em;
      margin: 0 0 16px;
      max-width: 18ch;
    }
    h1.headline .strike { text-decoration: line-through; text-decoration-thickness: 3px; text-decoration-color: var(--ink); color: var(--ink); }
    h1.headline .accent { font-style: italic; color: var(--accent); font-weight: 700; }

    .deck {
      max-width: 78ch;
      font: italic 18px/1.45 var(--serif-body);
      color: var(--ink);
      margin: 0 0 22px;
    }
    .deck b { font-style: normal; color: var(--accent); font-weight: 600; padding: 0 4px; background: var(--tint); border-radius: 2px; }

    .accent-rule { width: 80px; height: 3px; background: var(--accent); margin: 6px 0 32px; }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px 56px;
      padding-top: 4px;
      border-top: 1px solid var(--rule);
    }
    .cell { padding: 28px 0 4px; border-bottom: 1px solid var(--rule); }
    .cell:nth-last-child(-n+2) { border-bottom: none; }
    .cell .num {
      font: 10.5px/1.4 var(--mono);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 6px;
      display: flex; align-items: center; gap: 10px;
    }
    .cell .num span.bar { display: inline-block; width: 20px; height: 1px; background: var(--accent); opacity: 0.6; }
    .cell h3 {
      font: 700 22px/1.2 var(--serif-display);
      letter-spacing: -0.005em;
      margin: 0 0 10px;
    }
    .cell p { margin: 0 0 14px; font-size: 15px; line-height: 1.55; max-width: 46ch; color: var(--ink); }
    .cell .quote {
      background: var(--tint);
      border-left: 2px solid var(--accent);
      padding: 10px 12px;
      font: 12px/1.55 var(--mono);
      color: var(--ink);
      max-width: 50ch;
    }
    .cell .quote::before { content: '"'; }
    .cell .quote::after { content: '"'; }

    .footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid var(--ink);
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 24px;
      align-items: center;
      font: 10.5px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .pro-tip {
      display: flex; gap: 12px; align-items: center;
      padding: 10px 14px;
      border: 1px solid var(--rule);
      background: var(--paper);
      max-width: 78%;
    }
    .pro-tip .badge { font: 9.5px/1 var(--mono); letter-spacing: 0.2em; padding: 6px 8px; border: 1px solid var(--ink); color: var(--ink); }
    .pro-tip .text { font: italic 13px/1.4 var(--serif-body); color: var(--ink); text-transform: none; letter-spacing: 0; }
    .pro-tip .text b { color: var(--accent); font-style: normal; font-weight: 600; }

    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .cell { border-bottom: 1px solid var(--rule); }
      .cell:last-child { border-bottom: none; }
      .page { padding: 24px 24px 32px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="top-rule" data-od-id="top-rule">
      <span>01 · NEVOFLUX DISPATCH</span>
      <span>13 · JUN · 2026</span>
    </div>
    <div class="eyebrow-row" data-od-id="eyebrow">— 来自 PACKS 团队</div>

    <h1 class="headline" data-od-id="headline">
      你不再需要 <span class="strike">wiki</span><br />
      也能交付一个<span class="accent">活的</span><br />
      知识库。
    </h1>

    <p class="deck" data-od-id="deck">
      这一周 NevoFlux 浏览器把原始源变成 Canvas 应用的六种方式 —— <b>GBrain 负责什么</b>、代理替你接什么线，以及让我们走到这一步的那几个 pack。
    </p>
    <div class="accent-rule"></div>

    <div class="grid" data-od-id="grid">
      <section class="cell" data-od-id="cell-1">
        <div class="num"><span class="bar"></span>01 · 索引</div>
        <h3>把 GBrain 指向你的源</h3>
        <p>丢进一个仓库、一个 CSV、一份 JSON 导出或一整个笔记文件夹。GBrain 在本地索引它，并在工作发生的地方内联给出答案。</p>
        <div class="quote">索引这个产品仓库加上 changelog。把支持问题内联回答，并引用文件名和行号。</div>
      </section>
      <section class="cell" data-od-id="cell-2">
        <div class="num"><span class="bar"></span>02 · CANVAS</div>
        <h3>交付应用，而不是静态文档</h3>
        <p>选一个模板，按 ⌘+Enter，Canvas 面板里就是一份可以直接交付的应用 —— 可点、合品牌、能放进任何工作区。</p>
        <div class="quote">把上手指南做成 Canvas 应用。五个步骤，深色模式，按用户保存进度。</div>
      </section>
      <section class="cell" data-od-id="cell-3">
        <div class="num"><span class="bar"></span>03 · SKILLS</div>
        <h3>一个设计 skill，所有 pack 复用</h3>
        <p>一个设计 skill 携带字体、配色与间距规范。每个复用它的 pack 产出的素材，天然就符合你的家族样式。</p>
        <div class="quote">复用 magazine-poster 这个 skill。做一个发布版。保留 cream 纸感和陶土橙 accent。</div>
      </section>
      <section class="cell" data-od-id="cell-4">
        <div class="num"><span class="bar"></span>04 · PACKS</div>
        <h3>模板与发布物料</h3>
        <p>一页纸、PPT、社交卡片、数据报告 —— 可编辑、合品牌，从同一份 GBrain 源里几分钟生成，而不是几天。</p>
        <div class="quote">从这条发布说明，做一张海报、一张 Twitter 卡片和一页数据报告。同样的事实，三种格式。</div>
      </section>
      <section class="cell" data-od-id="cell-5">
        <div class="num"><span class="bar"></span>05 · 代理</div>
        <h3>不需要 API Key，不浪费 token</h3>
        <p>本地代理在你已经登录的 NevoFlux session 里跑。二次编辑只跑 diff —— 你管最终形态，它管啰嗦的接线。</p>
        <div class="quote">只重做这一节。别重跑整个 pack。其余部分保持逐字节不变。</div>
      </section>
      <section class="cell" data-od-id="cell-6">
        <div class="num"><span class="bar"></span>06 · SDK</div>
        <h3>把它接进你的技术栈</h3>
        <p>pack 做完了？SDK 把它同步回 GBrain，也同步进你的工具。规范、tokens、组件 —— 团队之间没有翻译层。</p>
        <div class="quote">用 SDK 导出这个 pack。同步进 GBrain。把 Canvas 应用发布到我们的共享工作区。</div>
      </section>
    </div>

    <div class="footer" data-od-id="footer">
      <div class="pro-tip">
        <span class="badge">PRO TIP</span>
        <span class="text">别向 GBrain 要 <b>"一篇文档"。</b>要一种格式 —— <b>"一张海报"、"一个 Canvas 应用"、"一页数据报告"、"一张社交卡片"。</b>格式的具体度，才是解锁点。</span>
      </div>
      <div></div>
      <div>收藏 · 复用 SKILL · 本周交付一个</div>
    </div>
  </div>
</body>
</html>
```

## 用法

- `top-rule`（dateline 顶栏）：左侧是期号 + 刊名，右侧是日期。两个 span 都可编辑。
- `eyebrow-row`：顶栏下方的小号 mono kicker —— "来自 / 发布于" 那一行。
- `h1.headline`：超大号 serif 主标题。保留一个 `.strike` 划掉词（你要替换掉的东西）和一个斜体 `.accent` 强调词（落点），用 `<br />` 换行。
- `deck`：斜体导语句子。用 `<b>` 高亮关键短语（渲染为 accent 色小块）。
- 6 个 `.cell` 组成的 `grid`：每个含 `.num` kicker（编号 + 短标签）、`h3` 小标题、1-2 段 `<p>` 正文，以及一个 mono `.quote`（示例 prompt / 金句）。保持 6 个，双栏节奏才成立。
- `footer`：左侧 `.pro-tip` 块（badge + 一句话提示，含 accent `<b>` 词），右侧 mono 行动号召标签。
- 自包含：纸感由 CSS radial-gradient 点阵实现；无需任何外部字体、图片或 URL。
