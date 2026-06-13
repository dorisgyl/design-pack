---
slug: packs/design-pack/templates/web-proto-brutalist-zh
type: template
lang: zh
category: prototype
title: "Brutalist 原型"
title_en: "NevoFlux Brutalist Prototype"
description: "Swiss 工业印刷风 brutalist 网页原型：单字 grotesque、巨数字、hazard 红点缀与 ASCII 装饰，这里改写为 NevoFlux 的现场快报。"
tags: [brutalist, swiss, industrial, hairline, 模板]
sample_image: packs/design-pack/assets/templates/web-proto-brutalist.svg
source: html-anything/web-proto-brutalist
---

## 设计指导

- Swiss 工业印刷气质：不柔和、不友好，强权威感与编辑纪律。
- 报纸底色（暖白纸张）+ 1px hairline 分隔线；主区块之间用 4px 粗线分割。
- 单色黑 grotesque 巨标题（Archivo Black），以冲出视口的巨数字作为主视觉元素。
- Hazard 红仅在重点、状态圆点、行内标点处少量使用，配合 ASCII 装饰（方括号、`///`、`>>>`）。
- 章节用极简数字编号；所有元数据、标签、表格数据均使用 monospace（JetBrains Mono）。
- 自上而下的版面区块：元信息 register 条、带边框导航、左右分栏 hero（巨数字 + 元信息列）、带首字下沉与署名栏的 abstract / 导语块、编号 manifest 论点表、1px 网格 index 表、字体 specimen、斜线 hazard 警示块、版本说明 colophon。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NEVOFLUX 现场单元 04 // 面向 AGENT 网络的仪器</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --paper: #F4F4F0;
      --paper-2: #EAE8E3;
      --ink: #060606;
      --ink-soft: #1A1A18;
      --hazard: #E61919;
      --rule: #060606;
      --display: 'Archivo Black', 'Neue Haas Grotesk', 'Inter', sans-serif;
      --sans: 'Archivo', 'Inter', system-ui, sans-serif;
      --mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: var(--paper);
      color: var(--ink);
      font-family: var(--sans);
      font-size: 15px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      font-feature-settings: "tnum", "ss01";
    }
    a { color: inherit; text-decoration: none; }
    a:hover { background: var(--ink); color: var(--paper); }

    .mono { font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px; }
    .mono-md { font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.08em; font-size: 13px; }
    .red { color: var(--hazard); }
    .ink { color: var(--ink); }

    hr.rule { border: 0; border-top: 1px solid var(--ink); margin: 0; }
    hr.thick { border: 0; border-top: 4px solid var(--ink); margin: 0; }
    hr.hazard { border: 0; border-top: 1px solid var(--hazard); margin: 0; }

    /* ========= TOP REGISTER STRIP ========= */
    .strip {
      border-top: 1px solid var(--ink);
      border-bottom: 1px solid var(--ink);
      padding: 8px 22px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 22px;
      font-family: var(--mono);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 11px;
    }
    .strip > div { display: flex; gap: 8px; align-items: baseline; white-space: nowrap; overflow: hidden; }
    .strip b { color: var(--ink); }
    .strip span { color: var(--ink-soft); }

    /* ========= NAV ========= */
    .nav {
      padding: 14px 22px;
      display: flex; align-items: baseline; justify-content: space-between;
      border-bottom: 4px solid var(--ink);
    }
    .brand {
      font-family: var(--display); font-size: 22px; letter-spacing: -0.04em; line-height: 1; text-transform: uppercase;
    }
    .brand sup { font-family: var(--mono); font-size: 9px; letter-spacing: 0.18em; font-weight: 400; vertical-align: top; margin-left: 4px; color: var(--hazard); }
    .nav ul { list-style: none; display: flex; gap: 18px; margin: 0; padding: 0; }
    .nav ul a {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      padding: 4px 7px; border: 1px solid var(--ink);
    }
    .nav .meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }

    /* ========= HERO ========= */
    .hero {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      border-bottom: 1px solid var(--ink);
    }
    .hero .num {
      font-family: var(--display);
      font-size: clamp(220px, 36vw, 540px);
      line-height: 0.78;
      letter-spacing: -0.07em;
      padding: 24px 0 0 22px;
      color: var(--ink);
      position: relative;
      overflow: visible;
    }
    .hero .num::after {
      content: '®';
      font-size: 0.18em; letter-spacing: 0; vertical-align: top;
      color: var(--hazard); margin-left: 6px;
    }
    .hero .meta-col {
      border-left: 1px solid var(--ink);
      padding: 22px;
      display: flex; flex-direction: column; gap: 22px;
      font-family: var(--mono);
    }
    .hero .meta-col h2 {
      font-family: var(--display); font-size: clamp(38px, 4.5vw, 64px); line-height: 0.9; letter-spacing: -0.03em;
      text-transform: uppercase; margin: 0;
    }
    .hero .meta-col p { font-family: var(--sans); font-size: 14px; line-height: 1.55; margin: 0; max-width: 38ch; text-align: justify; }
    .meta-row { display: grid; grid-template-columns: 8ch 1fr; gap: 12px; padding: 10px 0; border-top: 1px solid var(--ink); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; }
    .meta-row b { color: var(--hazard); font-weight: 500; }

    .ascii-frame {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      display: flex; align-items: center; gap: 10px;
      padding: 6px 0; color: var(--ink);
    }
    .ascii-frame::before { content: '['; color: var(--hazard); }
    .ascii-frame::after { content: ']'; color: var(--hazard); }

    /* ========= ABSTRACT / LEAD ========= */
    .abstract {
      padding: 56px 22px;
      display: grid;
      grid-template-columns: 8ch 1fr 30ch;
      gap: 32px;
      border-bottom: 1px solid var(--ink);
    }
    .abstract .label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hazard); padding-top: 6px; }
    .abstract .body {
      font-family: var(--sans); font-size: 22px; line-height: 1.4; letter-spacing: -0.012em;
      max-width: 50ch;
    }
    .abstract .body span.drop {
      font-family: var(--display); font-size: 64px; line-height: 0.85; float: left;
      margin: 4px 10px -4px 0; letter-spacing: -0.04em; text-transform: uppercase;
    }
    .abstract .credits { font-family: var(--mono); font-size: 10.5px; line-height: 1.7; text-transform: uppercase; letter-spacing: 0.1em; }
    .abstract .credits hr { margin: 8px 0; border: 0; border-top: 1px solid var(--ink); }
    .abstract .credits b { color: var(--hazard); font-weight: 500; }

    /* ========= MANIFEST (numbered theses) ========= */
    .manifest { padding: 56px 22px; border-bottom: 4px solid var(--ink); }
    .manifest h2 {
      font-family: var(--display);
      font-size: clamp(56px, 8vw, 120px);
      line-height: 0.86;
      letter-spacing: -0.05em;
      text-transform: uppercase;
      margin: 0 0 28px;
      max-width: 16ch;
    }
    .manifest h2 em { font-style: normal; color: var(--hazard); }
    .thesis-list { display: grid; grid-template-columns: 1fr; }
    .thesis {
      display: grid;
      grid-template-columns: 6ch 1fr 14ch;
      gap: 32px;
      padding: 22px 0;
      border-top: 1px solid var(--ink);
      align-items: baseline;
    }
    .thesis:last-child { border-bottom: 1px solid var(--ink); }
    .thesis .num {
      font-family: var(--display); font-size: 44px; line-height: 0.9; letter-spacing: -0.04em;
    }
    .thesis .num small { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; vertical-align: top; }
    .thesis h3 {
      font-family: var(--display); font-size: clamp(22px, 2.4vw, 32px); line-height: 1.05;
      letter-spacing: -0.025em; text-transform: uppercase; margin: 0 0 8px; max-width: 28ch;
    }
    .thesis p { margin: 0; font-size: 14px; line-height: 1.55; max-width: 56ch; color: var(--ink-soft); }
    .thesis .tag {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
      text-align: right; color: var(--hazard);
    }

    /* ========= INDEX (1px grid) ========= */
    .index-section { border-bottom: 1px solid var(--ink); }
    .index-head {
      padding: 22px;
      display: flex; justify-content: space-between; align-items: baseline; gap: 24px;
      border-bottom: 1px solid var(--ink);
    }
    .index-head h2 { font-family: var(--display); font-size: clamp(28px, 3vw, 40px); letter-spacing: -0.03em; text-transform: uppercase; line-height: 1; margin: 0; }
    .index-head .meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    .index-grid {
      display: grid;
      grid-template-columns: 4ch 1.3fr 1fr 1fr 0.8fr 0.8fr;
      gap: 1px;
      background: var(--ink);
      font-family: var(--mono);
      font-size: 11.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .index-grid > div { background: var(--paper); padding: 12px 14px; }
    .index-grid .header { background: var(--ink); color: var(--paper); font-weight: 500; }
    .index-grid .right { text-align: right; }
    .index-grid .red { color: var(--hazard); }

    /* ========= SPECIMEN ========= */
    .specimen { border-bottom: 4px solid var(--ink); padding: 56px 22px; }
    .specimen-head { display: flex; justify-content: space-between; align-items: baseline; gap: 22px; margin-bottom: 22px; padding-bottom: 14px; border-bottom: 1px solid var(--ink); }
    .specimen-head h2 { font-family: var(--display); font-size: 28px; letter-spacing: -0.03em; text-transform: uppercase; margin: 0; line-height: 1; }
    .specimen-head .meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    .spec-row {
      display: grid;
      grid-template-columns: 12ch 1fr 12ch;
      align-items: baseline;
      gap: 22px;
      padding: 14px 0;
      border-bottom: 1px solid var(--ink);
    }
    .spec-row .label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hazard); }
    .spec-row .glyph { font-family: var(--display); letter-spacing: -0.04em; line-height: 0.95; text-transform: uppercase; }
    .spec-row .glyph.s1 { font-size: clamp(36px, 5vw, 64px); }
    .spec-row .glyph.s2 { font-size: clamp(60px, 9vw, 120px); }
    .spec-row .glyph.s3 { font-size: clamp(120px, 16vw, 220px); }
    .spec-row .stats { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; text-align: right; line-height: 1.6; }

    /* ========= ALERT BLOCK ========= */
    .alert {
      border-bottom: 1px solid var(--ink);
      padding: 22px;
      display: grid;
      grid-template-columns: 18ch 1fr;
      gap: 28px;
      background:
        repeating-linear-gradient(135deg, transparent 0 14px, rgba(230,25,25,0.06) 14px 28px);
    }
    .alert .label { font-family: var(--display); font-size: 28px; letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; color: var(--hazard); border: 2px solid var(--hazard); padding: 10px 12px; align-self: start; }
    .alert .body { font-family: var(--sans); font-size: 15.5px; line-height: 1.5; max-width: 64ch; }
    .alert .body strong { background: var(--ink); color: var(--paper); padding: 0 4px; font-weight: 500; }

    /* ========= COLOPHON ========= */
    .colophon {
      padding: 32px 22px 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      line-height: 1.85;
      border-top: 1px solid var(--ink);
    }
    .colophon dl { display: grid; grid-template-columns: 16ch 1fr; gap: 6px 16px; margin: 0; }
    .colophon dt { color: var(--hazard); }
    .colophon dd { margin: 0; }
    .colophon .credit { font-family: var(--display); font-size: 38px; letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; color: var(--ink); }
    .colophon .credit small { display: block; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; margin-top: 8px; color: var(--ink-soft); }

    /* ========= RESPONSIVE ========= */
    @media (max-width: 880px) {
      .strip { grid-template-columns: 1fr 1fr; gap: 8px 22px; }
      .strip > div:nth-child(n+5) { display: none; }
      .nav ul { display: none; }
      .hero { grid-template-columns: 1fr; }
      .hero .num { font-size: 36vw; }
      .hero .meta-col { border-left: none; border-top: 1px solid var(--ink); }
      .abstract { grid-template-columns: 1fr; }
      .thesis { grid-template-columns: 6ch 1fr; }
      .thesis .tag { display: none; }
      .index-grid { grid-template-columns: 4ch 1fr 1fr; font-size: 10px; }
      .index-grid > div:nth-child(6n+4),
      .index-grid > div:nth-child(6n+5),
      .index-grid > div:nth-child(6n) { display: none; }
      .alert { grid-template-columns: 1fr; }
      .colophon { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="strip">
    <div><b>卷.</b><span>04 / 现场单元</span></div>
    <div><b>期.</b><span>2026 · 五月 · 季刊</span></div>
    <div><b>构建</b><span>NEVOFLUX 4.0</span></div>
    <div><b>通道</b><span>稳定版</span></div>
    <div><b>状态</b><span class="red">⬤ 智能体在线</span></div>
  </div>

  <header class="nav" data-od-id="topnav">
    <span class="brand">NEVOFLUX/现场/04<sup>® 创于 2026</sup></span>
    <ul>
      <li><a href="#abstract">[ 摘要 ]</a></li>
      <li><a href="#manifest">[ 宣言 ]</a></li>
      <li><a href="#index">[ 索引 ]</a></li>
      <li><a href="#specimen">[ 样张 ]</a></li>
    </ul>
    <span class="meta">构建号 <span class="red">04 / 0731</span></span>
  </header>

  <section class="hero" data-od-id="hero">
    <div class="num">04</div>
    <div class="meta-col">
      <span class="ascii-frame">智能体运行时 · 面向网络</span>
      <h2>一台为 agent 网络打造的&nbsp;仪器<span class="red">.</span></h2>
      <p>NevoFlux 现场单元 04 是季度发布说明：一台会思考的浏览器。GBrain 读你的资料，智能体在多个标签页间执行，Canvas 把一句提示词变成可运行的应用。推送至稳定通道——以 Archivo Black 与 JetBrains Mono 排版，上线前量两遍。</p>
      <div>
        <div class="meta-row"><b>浏览器</b><span>NEVOFLUX 4.0</span></div>
        <div class="meta-row"><b>知识库</b><span>GBRAIN · 本地索引</span></div>
        <div class="meta-row"><b>运行时</b><span>AGENT SDK · 工具调用</span></div>
        <div class="meta-row"><b>CANVAS</b><span>提示词 → 应用 · 即时</span></div>
        <div class="meta-row"><b>PACKS</b><span>2,400 / 已注册</span></div>
      </div>
    </div>
  </section>

  <section class="abstract" id="abstract" data-od-id="abstract">
    <div class="label">[ 摘要 ]<br>///</div>
    <div class="body">
      <span class="drop">浏</span>览器已经不再像一件工具，而开始像一位队友。NevoFlux 4.0 就是为这个想法做的一份固执的小论证——务实、技术、并且安静地有侵略性：GBrain 记住你的上下文，智能体替你点击，Canvas 在你保持一条思路时把应用交付出来。
    </div>
    <div class="credits">
      <hr>
      <b>交付方</b><br>
      GBRAIN · 知识库<br>
      AGENT · 运行时<br>
      CANVAS · 应用<br>
      SDK · 工具<br>
      PACKS · 技能<br>
      <hr>
      <b>归档于</b><br>
      智能体 · 浏览器<br>
      知识库 · CANVAS<br>
      基础设施
    </div>
  </section>

  <section class="manifest" id="manifest" data-od-id="manifest">
    <h2>关于会<em>思考</em>浏览器的六条论点<span class="red">.</span></h2>
    <div class="thesis-list">
      <div class="thesis">
        <div class="num">01<small>/06</small></div>
        <div>
          <h3>标签页不是死胡同，而是工作台。</h3>
          <p>用户不想要四十个开着的标签页。他们想让智能体把这些页面通读一遍，把上下文存进 GBrain，再交回一个能信赖、长度远不止九个字的答案。</p>
        </div>
        <div class="tag">>>> 智能体</div>
      </div>
      <div class="thesis">
        <div class="num">02<small>/06</small></div>
        <div>
          <h3>记忆不是功能，而是注意力的工钱。</h3>
          <p>每次提示词都重新解释一遍项目，你付出的是重复。让 GBrain 一次性把资料建好索引，你付出的是时间——而这正是你想要拿回来的。</p>
        </div>
        <div class="tag">>>> GBRAIN</div>
      </div>
      <div class="thesis">
        <div class="num">03<small>/06</small></div>
        <div>
          <h3>如果模型不是这个回路里最强的信号，那回路就错了。</h3>
          <p>按钮、面板、外壳——一切都服从智能体。如果智能体在中午一块 320 像素的屏幕上都完不成任务，产品的其余部分也一样完不成。</p>
        </div>
        <div class="tag">>>> 运行时</div>
      </div>
      <div class="thesis">
        <div class="num">04<small>/06</small></div>
        <div>
          <h3>一个 pack 是契约，不是戏服。</h3>
          <p>一个设计 pack 要么守住契约——排版、网格、tokens——要么只有一次、刻意地用页面上最响亮的组件去打破它。一路漂移，产出就不再显得是有意为之。</p>
        </div>
        <div class="tag">>>> PACKS</div>
      </div>
      <div class="thesis">
        <div class="num">05<small>/06</small></div>
        <div>
          <h3>Canvas 是一处引用，不是一段合唱。</h3>
          <p>如果一句提示词必须变成应用，那也得是因为工作本身把它召唤出来。没人要的生成界面，等于把每个字都划上下划线。</p>
        </div>
        <div class="tag">>>> CANVAS</div>
      </div>
      <div class="thesis">
        <div class="num">06<small>/06</small></div>
        <div>
          <h3>SDK 是你唯一被允许过度打磨的那层。</h3>
          <p>让工具调用层有分量。让它成为开发者会去伸手抓的那一件东西。然后把浏览器的其余部分留得安静。</p>
        </div>
        <div class="tag">>>> SDK</div>
      </div>
    </div>
  </section>

  <section class="index-section" id="index" data-od-id="index">
    <div class="index-head">
      <h2>发布 04 索引 <span class="red">///</span></h2>
      <span class="meta">8 条 · 构建 4.0 — 4.1</span>
    </div>
    <div class="index-grid">
      <div class="header">№</div><div class="header">特性</div><div class="header">负责人</div><div class="header">部门</div><div class="header right">版本</div><div class="header right">构建</div>

      <div>01</div><div>GBRAIN 本地索引</div><div>H. Naitō</div><div class="red">知识</div><div class="right">4.0</div><div class="right">12 MS</div>
      <div>02</div><div>智能体标签页编排</div><div>Q. Albrecht</div><div>智能体</div><div class="right">4.0</div><div class="right">18 MS</div>
      <div>03</div><div>CANVAS 提示词转应用</div><div>M. Andrejević</div><div class="red">CANVAS</div><div class="right">4.0</div><div class="right">14 MS</div>
      <div>04</div><div>延迟瘦身计划</div><div>P. Nwachukwu</div><div>基建</div><div class="right">4.0</div><div class="right">22 MS</div>
      <div>05</div><div>设计 PACK TOKENS</div><div>L. Arroyave</div><div class="red">PACKS</div><div class="right">4.0</div><div class="right">11 MS</div>
      <div>06</div><div>工具调用 SDK</div><div>Q. Albrecht</div><div>SDK</div><div class="right">4.1</div><div class="right">19 MS</div>
      <div>07</div><div>技能注册表</div><div>H. Naitō</div><div class="red">PACKS</div><div class="right">4.1</div><div class="right">7 MS</div>
      <div>08</div><div>离线回忆，安静地</div><div>L. Arroyave</div><div class="red">知识</div><div class="right">4.1</div><div class="right">15 MS</div>
    </div>
  </section>

  <section class="specimen" id="specimen" data-od-id="specimen">
    <div class="specimen-head">
      <h2>样张 ///</h2>
      <span class="meta">ARCHIVO BLACK · 1 STYLE · 1 WEIGHT</span>
    </div>
    <div class="spec-row">
      <span class="label">36 / 64</span>
      <div class="glyph s1">安静的浏览器是响亮的智能体。</div>
      <div class="stats">tracking −0.04em<br>leading 0.95<br>case upper</div>
    </div>
    <div class="spec-row">
      <span class="label">60 / 120</span>
      <div class="glyph s2">给网络下指令。</div>
      <div class="stats">tracking −0.05em<br>leading 0.88<br>case upper</div>
    </div>
    <div class="spec-row">
      <span class="label">120 / 220</span>
      <div class="glyph s3">04®</div>
      <div class="stats">tracking −0.06em<br>leading 0.78<br>register glyph</div>
    </div>
  </section>

  <section class="alert" data-od-id="alert">
    <div class="label">!! 获取<br>NEVOFLUX 04</div>
    <div class="body">
      NevoFlux 4.0 将于 <strong>2026 年 6 月 14 日</strong> 推送至稳定通道。<strong>免费 / 永久</strong> 安装浏览器，或加入 Pro 订阅、解锁完整 GBrain 索引，<strong>$60 / 年</strong>。Pro 包含无限 Canvas 应用、带工具调用的 agent SDK、每一个按同一套 token 网格渲染的设计 pack，以及对整个 GBrain 的离线回忆。<span class="red">>>> 下载 · 6 月 14 日上线</span>
    </div>
  </section>

  <footer class="colophon" data-od-id="colophon">
    <dl>
      <dt>排版</dt><dd>Archivo Black · JetBrains Mono · Archivo</dd>
      <dt>浏览器</dt><dd>NevoFlux 4.0 · 稳定通道</dd>
      <dt>知识库</dt><dd>GBrain 本地索引 · 离线回忆</dd>
      <dt>运行时</dt><dd>Agent SDK · 工具调用 · 32 个工具</dd>
      <dt>PACKS</dt><dd>2,400 个已注册 · 14 个设计技能</dd>
      <dt>授权</dt><dd>CC BY-NC-ND 4.0 · pack 作者除外</dd>
    </dl>
    <div>
      <div class="credit">NEVOFLUX&nbsp;04<small>® / 构建 2026 · 波尔多 · FR / © NEVOFLUX EDITIONS</small></div>
    </div>
  </footer>
</body>
</html>
```

## 用法

- `.strip` — 顶部元信息 register 条：替换 构建 / 通道 / 状态 等值；最后一格放红色状态圆点。
- `.nav` — 品牌字标 + monospace 导航链接 + 构建号。保持四个章节锚点。
- `.hero` — 左格是一个冲出视口的巨数字；右侧元信息列放标题、导语段落，以及一组 `.meta-row` 标签/值（浏览器、知识库、运行时、CANVAS、PACKS）。
- `.abstract` — 带 `.drop` 首字下沉的导语段落，加 monospace 署名栏（交付方 / 归档于）。
- `.manifest` — 六条编号论点；每条是 `.num` / 标题+正文 / `.tag` 三段式。论点保持简短、陈述式。
- `.index-section` — 1px 网格表。列：№、特性、负责人、部门、版本、构建。部门格用 `.red` 强调。
- `.specimen` — 字体样张，展示 display 字体三种字号；第三行是 register 字符。
- `.alert` — 斜线 hazard 行动召唤；加粗 span 反白成 ink 底。结尾用红色 `>>>` 行动行。
- `.colophon` — 一份署名定义列表，加大号 display 署名块。
