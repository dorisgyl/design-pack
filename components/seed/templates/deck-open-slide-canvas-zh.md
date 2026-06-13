---
slug: packs/design-pack/templates/deck-open-slide-canvas-zh
type: template
lang: zh
category: slides
title: "1920 画布自由 Deck"
title_en: "Open-Slide 1920 Canvas Deck"
description: "锁死 1920x1080 画布,像写 React 组件一样按内容自由排布每一页,不绑模板。"
tags: [canvas, open-slide, freeform, 1920, react, 模板]
sample_image: packs/design-pack/assets/templates/deck-open-slide-canvas.svg
source: html-anything/deck-open-slide-canvas
---

## 设计指导

给一个固定 1920x1080 画布 + 极强的类型 / 调色约束,让 agent 像写 React 组件一样按内容自由排布每一页,而不被模板束缚。适合不想被模板框住的场景:个人作品集、奇特演讲、艺术 / 设计课 deck。灵感来自 1weiho/open-slide。

### 硬性技术规格
- 画布:每页严格 `width: 1920px; height: 1080px;`,用 `transform: scale(...)` 适配视窗(默认 `scale(0.7)` 居中)。
- 绝对禁止 overflow:每页内容必须 fit in 1920x1080,不许出现滚动条。
- 字号 type scale(px):`2xs:18 · xs:22 · sm:28 · md:36 · lg:48 · xl:64 · 2xl:88 · 3xl:120 · 4xl:160 · 5xl:220`。
- 边距 padding:96 / 128 / 160 三档之一。
- 每页一个 `<section class="slide" data-slide-id="<n>">`。

### 调色板(每个 deck 选 1 套,全程不改)
- Ash & Lime —— bg `#f1efea`,ink `#161616`,accent `#c5e803`。
- Sea Indigo —— bg `#0a0e1a`,ink `#f5f5f7`,accent `#5ac8fa`。
- Mate Mocha —— bg `#1a1411`,ink `#f5e9d6`,accent `#d97757`。
- Pearl Rose —— bg `#fdf6f3`,ink `#1a1015`,accent `#ff5d8f`。

### 布局自由度(这是核心)
- 不强制模板,每页根据内容性质自选布局:cover / question / quote / image-text / 三列 / 五列 / 列表 / 数据卡 / 满版图。
- 但每页必须遵守一条规则:视觉重心只有 1 个 —— 一句金句、一个数字、一张图,不要"什么都强调"。
- 不许塞两段平等的文字;真要并列就上 3 列等权重网格。

### 字体
- 西文:`Inter Tight`(display)+ `Inter`(body);或 `Source Serif Pro`(editorial 风时)。
- 中文:`Noto Sans SC`(sans 风)或 `Noto Serif SC`(editorial 风);不混 sans + serif。
- mono:`JetBrains Mono` 给数据 / 时间戳。

### 设计细节
- 严禁 emoji 装饰(内容里的允许);严禁多色彩虹;accent 只用一个色。
- 严禁套用 lucide / feather 等通用库的 SVG icon(自己写 inline SVG)。
- 加键盘 ← / → 切换 + hash 同步;角标固定:右下 `No.N/M`,左下 deck title。
- 必须用真实内容;严禁 lorem ipsum。
- 单文件 HTML;Tailwind CDN;不要外链图片。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 自由画布 · 一句问题</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif; background:#020306; margin:0; min-height:100vh; }
  .slide-frame { width:1280px; height:720px; transform:scale(0.78); transform-origin: top left; }
  .canvas { background:#0a0e1a; color:#f5f5f7; }
  .accent { color:#5ac8fa; }
  .mono { font-family:'JetBrains Mono',ui-monospace,monospace; }
  /* hairline diag bg */
  .grain {
    background-image:
      radial-gradient(circle at 20% 80%, rgba(90,200,250,0.10) 0%, transparent 50%),
      radial-gradient(circle at 80% 30%, rgba(124,92,255,0.08) 0%, transparent 55%);
  }
</style>
</head>
<body class="p-10 overflow-hidden">
<div class="slide-frame canvas grain relative">
  <div class="absolute inset-0 p-32 flex flex-col justify-between">
    <header class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-60">
      <span>NEVOFLUX · DECK · OPEN-SLIDE CANVAS</span>
      <span>SEA INDIGO</span>
      <span>№05 / 12</span>
    </header>

    <div>
      <div class="mono text-[12px] uppercase tracking-[0.22em] accent">Question 03</div>
      <h1 class="mt-6 font-black leading-[0.95] tracking-[-0.025em]" style="font-size:120px">
        当浏览器能用一句话<br/>
        生成一个 <span class="accent">Canvas 应用</span>,<br/>
        你还在 <em class="not-italic" style="font-family:'Source Serif Pro',serif;font-style:italic;font-weight:500">手搓</em> 什么?
      </h1>
      <p class="mt-10 text-[28px] opacity-70 max-w-[820px] leading-snug">
        哪一步,值得交给 GBrain 与 Agent 接管?
      </p>
    </div>

    <footer class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-50">
      <span>1920 × 1080 · CANVAS · KBD ← →</span>
      <span class="accent">nevoflux · gbrain 知识库</span>
      <span>00 : 03 : 21</span>
    </footer>
  </div>
</div>
</body>
</html>
```

## 用法

本 seed 是一张 Sea Indigo 调色的画布单页,用"一句问题"布局 —— 只留一个视觉重心,不让任何元素与它争夺注意力。

- 顶部 header(mono):填 deck 面包屑(`NEVOFLUX · DECK · OPEN-SLIDE CANVAS`)、当前调色板名、角标 folio(`No.05 / 12`)。
- kicker(`.accent` mono):给本页打标签,如 `Question 03`。
- 标题(`<h1>`,120px):唯一的视觉重心句 —— 按语义换行,把关键词包进 `.accent`;最多保留一个 serif 斜体 accent。
- 副句:一句简短的追问或铺垫;绝不再加第二段等权重的文字。
- 底部 footer(mono):左侧画布规格 + 切换提示,中间 accent 标签 / 出处,右侧时间戳。
- 从设计指导里只选一套调色板,把对应 hex 应用到 `.canvas` / `.accent`;不要混用。保持全部 CSS、class 名、尺寸、结构不变 —— 只替换可见文字。
