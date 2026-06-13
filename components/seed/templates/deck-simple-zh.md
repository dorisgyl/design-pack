---
slug: packs/design-pack/templates/deck-simple-zh
type: template
lang: zh
category: slides
title: "通用 Simple Deck"
title_en: "Simple Deck"
description: "一套干净通用的横向滑动 HTML deck，用于 NevoFlux 的路演、概览与学习讲解。"
tags: [deck, simple, swipe, 模板]
sample_image: packs/design-pack/assets/templates/deck-simple.svg
source: html-anything/deck-simple
---

## 设计指导

干净、通用的横向滑动 deck，适合路演 / 概览 / 学习讲解。避免杂志腔调，保持朴素、实用。

### 布局
- 封面 + N 个内容页 + 收尾页。N 由内容长度决定，要完整覆盖每个要点：短内容从 6-10 页起步，长内容应更多。
- 每页一个核心信息 + 1 张图 / 1 个图表。
- 顶部（边角）放进度条 / 页码计数。

### 设计细节
- 键盘 ← / → 切换幻灯片，并与 hash 同步，让 URL 跟随当前页。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux · 投资人 deck — 2026 Q2</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --accent: #c96442; --surface: #ffffff;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; height: 100%; }
    body {
      background: var(--bg);
      color: var(--fg);
      font: 18px/1.5 -apple-system, system-ui, sans-serif;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
    }
    body::-webkit-scrollbar { display: none; }
    .slide {
      flex: 0 0 100vw;
      height: 100vh;
      scroll-snap-align: start;
      padding: 80px 96px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }
    .slide.title { background: var(--fg); color: var(--bg); }
    .eyebrow { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 28px; }
    .slide h1 { font-size: clamp(48px, 7vw, 96px); line-height: 1.05; letter-spacing: -0.025em; margin: 0 0 20px; max-width: 16ch; }
    .slide h2 { font-size: clamp(32px, 4vw, 48px); letter-spacing: -0.015em; margin: 0 0 20px; max-width: 20ch; }
    .slide .body { font-size: 22px; color: var(--muted); max-width: 56ch; }
    .slide.title .body { color: rgba(250,250,249,0.7); }
    .slide.big-stat .number { font-size: clamp(120px, 22vw, 280px); line-height: 0.9; letter-spacing: -0.04em; color: var(--accent); margin-bottom: 16px; font-weight: 600; }
    .slide.big-stat .caption { font-size: 24px; color: var(--muted); max-width: 24ch; }
    .quote-mark { font-family: Georgia, serif; font-size: 200px; line-height: 0.7; color: var(--accent); opacity: 0.18; margin-bottom: -40px; }
    .quote-text { font-family: Georgia, serif; font-size: 36px; line-height: 1.3; max-width: 26ch; margin: 0 0 28px; }
    .quote-author { font-size: 14px; color: var(--muted); }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 40px; }
    .grid-3 .pt { border-top: 2px solid var(--accent); padding-top: 16px; }
    .grid-3 .pt .h { font-size: 18px; font-weight: 500; margin: 0 0 8px; }
    .grid-3 .pt .p { color: var(--muted); margin: 0; font-size: 16px; }
    .counter { position: fixed; bottom: 24px; right: 32px; font-family: ui-monospace, monospace; font-size: 12px; color: var(--muted); background: var(--surface); padding: 4px 10px; border-radius: 999px; border: 1px solid #e6e4e0; }
    .hint { position: fixed; bottom: 24px; left: 32px; font-size: 11px; color: var(--muted); }
  </style>
</head>
<body>
  <section class="slide title" data-od-id="slide-1">
    <div class="eyebrow" style="color:#c96442;">NevoFlux · Series B · 2026 Q2</div>
    <h1>浏览器即工作台。</h1>
    <p class="body">一款 agent-native 浏览器，内置 GBrain 知识库。已服务 3,184 个付费团队。</p>
  </section>
  <section class="slide" data-od-id="slide-2">
    <div class="eyebrow">问题</div>
    <h2>你的知识散落在四十个标签页里。</h2>
    <p class="body">研究都发生在浏览器里，可其他工具都把它当成用完即弃。团队反复找回同一个页面、重读同一份文档，丢失了 agent 真正需要的上下文。浏览器什么都记不住。</p>
  </section>
  <section class="slide big-stat" data-od-id="slide-3">
    <div class="number">38×</div>
    <div class="caption">在真实客户工作负载下，从 GBrain 召回一条已保存来源，比手动翻标签页快 38 倍。</div>
  </section>
  <section class="slide" data-od-id="slide-4">
    <div class="eyebrow">为什么是现在</div>
    <h2>三股变化让这个市场成立。</h2>
    <div class="grid-3">
      <div class="pt"><h3 class="h">Agent 进入流程</h3><p class="p">工作正流经需要持久上下文的 agent。一个会遗忘的浏览器根本不成立。</p></div>
      <div class="pt"><h3 class="h">Canvas 应用</h3><p class="p">团队几个小时就能搭出内部 Canvas 应用。它们需要底层的知识库和 SDK，而不是又一个数据孤岛。</p></div>
      <div class="pt"><h3 class="h">Pack 与技能</h3><p class="p">设计 pack 与可复用技能，把一次性 prompt 变成可交付的产品。分发终于有了归处。</p></div>
    </div>
  </section>
  <section class="slide" data-od-id="slide-5">
    <div class="quote-mark">"</div>
    <p class="quote-text">NevoFlux 第一个月就回本了。我们本打算从零做一个内部知识工具——结果整个团队现在就住在浏览器里。</p>
    <p class="quote-author">— Mira Hassan，Northwind Studios CTO</p>
  </section>
  <section class="slide title" data-od-id="slide-6">
    <div class="eyebrow" style="color:#c96442;">融资</div>
    <h1>2200 万美元，把 agent-native 浏览器做出来。</h1>
    <p class="body">18 个月跑道，新增 14 人，扩展 GBrain SDK 与 Canvas 应用市场。</p>
  </section>

  <div class="counter" id="counter">1 / 6</div>
  <div class="hint">← / → 切换</div>

  <script>
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('counter');
    let active = 0;

    // Detect the real scroller — when body has `display: flex` + `overflow-x: auto`
    // the scroller can be body OR documentElement depending on the host (in
    // particular, the OD srcdoc iframe). Pick whichever actually overflows.
    function scroller() {
      if (document.body.scrollWidth > document.body.clientWidth + 1) return document.body;
      return document.scrollingElement || document.documentElement;
    }

    function go(i) {
      const next = Math.max(0, Math.min(slides.length - 1, i));
      active = next;
      counter.textContent = (next + 1) + ' / ' + slides.length;
      scroller().scrollTo({ left: next * window.innerWidth, behavior: 'smooth' });
    }
    function syncFromScroll() {
      const i = Math.round(scroller().scrollLeft / window.innerWidth);
      if (i !== active && i >= 0 && i < slides.length) {
        active = i;
        counter.textContent = (i + 1) + ' / ' + slides.length;
      }
    }
    function onKey(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(active + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(active - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
    }
    // Listen on both window and document in capture phase so the handler
    // fires regardless of which element holds focus inside the iframe.
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('keydown', onKey, true);
    // And listen for scroll on both surfaces — same reason.
    document.addEventListener('scroll', syncFromScroll, { passive: true, capture: true });
    window.addEventListener('scroll', syncFromScroll, { passive: true });

    // Auto-focus body so arrow keys work without a click.
    document.body.setAttribute('tabindex', '-1');
    document.body.style.outline = 'none';
    function focusDeck() { try { window.focus(); document.body.focus({ preventScroll: true }); } catch (_) {} }
    document.addEventListener('mousedown', focusDeck);
    window.addEventListener('load', focusDeck);
    focusDeck();
  </script>
</body>
</html>
```

## 用法

- `.slide.title` —— 深色封面页与收尾页。填写 `.eyebrow` 引导词、`h1` 主标题，以及一行 `.body` 导语。
- `.slide`（默认）—— 内容页：`.eyebrow` 标签、承载单一核心信息的 `h2` 标题，以及一段 `.body` 正文。
- `.slide.big-stat` —— 一个核心指标：`.number` 放数字，`.caption` 放说明。
- `.grid-3` —— 三个等权要点，每个是一个 `.pt` 块，内含 `.h` 标题与 `.p` 描述。
- 引言页 —— `.quote-mark`、`.quote-text` 放引言，`.quote-author` 放署名。
- 复制幻灯片以匹配内容长度；`#counter` 与方向键导航会自动按新数量更新。每页保持一个核心信息（最多一张图或一个图表）。
