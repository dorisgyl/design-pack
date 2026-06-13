---
slug: packs/design-pack/templates/ppt-keynote-zh
type: template
lang: zh
category: slides
title: "Keynote 风格 PPT"
title_en: "Keynote-style Slides"
description: "面向 NevoFlux 的苹果 Keynote 级别幻灯片，一屏一卡，键盘左右切换。"
tags: [slides, deck, presentation, 幻灯片, 演讲, 模板]
sample_image: packs/design-pack/assets/templates/ppt-keynote.svg
source: html-anything/ppt-keynote
---

## 设计指导

苹果 Keynote 级别的幻灯片：一屏一卡，键盘左右切换。

### 布局
- 每张幻灯片是一个 `<section class="slide">`，整体宽 1280 高 720，居中显示，背景渐变。
- 单页内容极简：大标题 + 1-3 行支持文字；或一张数据图；或一句金句。
- 字号：标题用大号 semibold、紧字距；副标题用更克制的中性灰字号。
- 第一页是封面（主题 + 演讲者 / 日期），最后一页是 "Thanks." 或行动号召。
- 顶部右上角放小指示器：当前页 / 总页数。

### 设计细节
- 加一段 JavaScript 监听 ArrowLeft / ArrowRight / 空格键切换 slide，同时维护 hash（如 `#/3`）。
- 每页之间用 fade-in 动画。
- 保持留白，数据卡片用 grid 布局对齐，颜色克制。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux · 产品介绍</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  body { margin:0; background:#0a0a0a; font-family:'Inter Tight','Noto Sans SC',sans-serif; }
  .deck { display:flex; flex-direction:column; align-items:center; gap:32px; padding:40px 0; }
  .slide { position:relative; width:1280px; max-width:96vw; aspect-ratio:16/9; border-radius:18px; overflow:hidden; box-shadow:0 30px 80px -20px rgba(0,0,0,0.7); display:flex; flex-direction:column; padding:64px 80px; color:#0a0a0a; background:#fafaf7; }
  .slide.dark { background:#15140f; color:#fafaf7; }
  .slide.brand { background:linear-gradient(135deg,#c96442 0%,#e9b94a 100%); color:#fff; }
  .slide .num { position:absolute; top:24px; right:32px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.18em; opacity:0.55; }
  .slide .eyebrow { font-size:12px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; opacity:0.65; margin-bottom:20px; }
  .slide h1 { font-size:84px; font-weight:800; line-height:1.05; letter-spacing:-0.025em; margin:0; }
  .slide h2 { font-size:64px; font-weight:700; line-height:1.1; letter-spacing:-0.02em; margin:0 0 24px; }
  .slide p { font-size:24px; line-height:1.5; opacity:0.78; max-width:65ch; }
  .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:auto; }
  .card { padding:28px; border-radius:14px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08); }
  .card .k { font-size:48px; font-weight:700; letter-spacing:-0.02em; margin-bottom:8px; }
  .card .l { font-size:14px; opacity:0.65; }
</style>
</head>
<body>
<div class="deck">

  <section class="slide brand">
    <span class="num">01 / 07</span>
    <div class="eyebrow">Product · 2026</div>
    <h1 style="margin-top:auto">Nevo<em style="font-family:Georgia,serif;font-style:italic;font-weight:400">Flux</em></h1>
    <p style="font-size:28px; opacity:0.95; margin-top:24px">智能体浏览器，把任何文档、数据，用本地 AI agent 配合你的 GBrain 知识库，一键转成世界级好看的 HTML。</p>
    <div style="margin-top:auto; display:flex; align-items:center; gap:16px; font-size:14px; opacity:0.85">
      <div style="width:32px;height:32px;border-radius:999px;background:rgba(255,255,255,0.25);display:grid;place-items:center;font-family:Georgia,serif;font-style:italic;font-weight:600">N</div>
      <span>Samuel Pan · 5 月 11 日</span>
    </div>
  </section>

  <section class="slide">
    <span class="num">02 / 07</span>
    <div class="eyebrow" style="color:#c96442">问题</div>
    <h2>知识易写，<br/>但<span style="color:#c96442">发出去就丑</span>。</h2>
    <ul style="font-size:24px; line-height:2; opacity:0.78; list-style:none; padding:0">
      <li>· 笔记截图发出去, 默认是 14px 压缩 jpg</li>
      <li>· 复制到内容平台, 排版被彻底重写</li>
      <li>· 博客、社交、文档各家规则不一</li>
    </ul>
  </section>

  <section class="slide dark">
    <span class="num">03 / 07</span>
    <div class="eyebrow" style="color:#e9b94a">方案</div>
    <h2 style="font-size:96px; margin-top:auto; margin-bottom:auto">
      任何输入 →<br/>
      <span style="font-family:Georgia,serif;font-style:italic;font-weight:600;color:#e9b94a">世界级 HTML</span>
    </h2>
    <p style="font-size:22px;opacity:0.6">由本地运行的 NevoFlux agent 与 SDK 驱动, 0 API Key, 复用你已付费的调用、边际成本为零。</p>
  </section>

  <section class="slide">
    <span class="num">04 / 07</span>
    <div class="eyebrow">三个核心</div>
    <h2>三件让它好用的事</h2>
    <div class="grid3" style="grid-template-columns:repeat(3,1fr); gap:20px">
      <div class="card" style="background:#f4f1ec; border-color:#e7e5e0; color:#15140f">
        <div style="font-size:36px; margin-bottom:14px">🧠</div>
        <div style="font-weight:600; font-size:18px; margin-bottom:6px">GBrain 知识库</div>
        <div style="font-size:14px; opacity:0.7; line-height:1.6">让每次渲染都基于你索引过的文档、数据与上下文</div>
      </div>
      <div class="card" style="background:#f4f1ec; border-color:#e7e5e0; color:#15140f">
        <div style="font-size:36px; margin-bottom:14px">🎨</div>
        <div style="font-weight:600; font-size:18px; margin-bottom:6px">设计 packs</div>
        <div style="font-size:14px; opacity:0.7; line-height:1.6">PPT · 简历 · 海报 · 卡片 · 数据报告 等技能, 拿来即用</div>
      </div>
      <div class="card" style="background:#f4f1ec; border-color:#e7e5e0; color:#15140f">
        <div style="font-size:36px; margin-bottom:14px">🖼️</div>
        <div style="font-weight:600; font-size:18px; margin-bottom:6px">Canvas 应用</div>
        <div style="font-size:14px; opacity:0.7; line-height:1.6">在 NevoFlux Canvas 里渲染、微调、直接发布</div>
      </div>
    </div>
  </section>

  <section class="slide dark">
    <span class="num">05 / 07</span>
    <div class="eyebrow" style="color:#e9b94a">数据</div>
    <h2>已经在跑</h2>
    <div class="grid3">
      <div class="card"><div class="k" style="color:#e9b94a">80<span style="font-size:24px">s</span></div><div class="l">生成 31KB 可交付页面</div></div>
      <div class="card"><div class="k" style="color:#e9b94a">9</div><div class="l">套 pack 里的设计技能</div></div>
      <div class="card"><div class="k" style="color:#e9b94a">8</div><div class="l">个本地 agent 适配</div></div>
    </div>
  </section>

  <section class="slide">
    <span class="num">06 / 07</span>
    <div class="eyebrow" style="color:#c96442">为什么是现在</div>
    <h2 style="font-size:56px; margin-top:auto; margin-bottom:auto">
      顶尖团队不再发原始 markdown,<br/>
      <span style="font-family:Georgia,serif;font-style:italic;font-weight:600;color:#c96442">他们直接发 HTML。</span>
    </h2>
    <p>HTML 是面向读者的最终形态, agent 让"过度打磨"不再是成本。</p>
  </section>

  <section class="slide brand">
    <span class="num">07 / 07</span>
    <h1 style="margin:auto 0; font-size:120px">Thanks.</h1>
    <div style="display:flex; align-items:flex-end; justify-content:space-between; font-size:18px">
      <div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:16px; opacity:0.85">$ nevoflux dev</div>
        <div style="opacity:0.85; margin-top:6px">→ http://localhost:3000 → ⌘+Enter</div>
      </div>
      <div style="opacity:0.7">nevoflux.app/design-pack</div>
    </div>
  </section>

</div>
<script>
  // ←/→ scroll between slides; current implementation just smooth-scrolls
  const slides=document.querySelectorAll('.slide');
  let i=0;
  document.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight') i=Math.min(i+1, slides.length-1);
    else if(e.key==='ArrowLeft') i=Math.max(i-1,0);
    else return;
    slides[i].scrollIntoView({behavior:'smooth', block:'center'});
  });
</script>
</body>
</html>
```

## 用法

- `.slide.brand` — 渐变封面页与收尾页。封面：`.eyebrow` 小标 + `h1` 品牌字标 + 一行 `p` 导语 + 演讲者 / 日期；收尾：大号 "Thanks." `h1` + 命令行 + 链接。
- `.slide`（默认浅色）— 内容页：`.eyebrow` 标签 + 承载单一核心信息的 `h2` + 一段列表或短文。
- `.slide.dark` — 深色金句页 / 数据页，用于制造对比（方案金句、数据三连）。
- `.grid3` + `.card` — 三张对齐卡片。指标用 `.card .k` 放大数字、`.card .l` 放说明；功能块用 emoji + 加粗标题 + 一行描述。
- `.num` — 右上角 `NN / 总数` 指示器；增删页面时记得同步更新。
- 复制 slide 以适配你的内容（一页一个核心信息，至多一张图）。左右方向键导航会自动适配新的页数。
