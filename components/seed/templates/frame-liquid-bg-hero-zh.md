---
slug: packs/design-pack/templates/frame-liquid-bg-hero-zh
type: template
lang: zh
category: poster
title: "流体背景 Hero 帧"
title_en: "Liquid Background Hero"
description: "WebGL 风流体置换背景 + 顶部叠加金句,适合视频片头 / landing hero / 海报。"
tags: [liquid, fluid, background, hero, html-in-canvas, vfx, 模板]
sample_image: packs/design-pack/assets/templates/frame-liquid-bg-hero.svg
source: html-anything/frame-liquid-bg-hero
---

## 设计指导

流体感、WebGL 质感的背景,顶部叠一句巨型金句。可作为视频片头帧、SaaS landing 顶部 hero,或海报底图。"流体"效果用 CSS / canvas 退化绘制,确保单文件可双击打开。灵感来自 hyperframes 的 vfx-liquid-background。

### 画布
- 1920×1080(横)或 1080×1920(竖),二选一。背景占满整帧。

### 流体背景 — 三种实现,按用户偏好选
1. CSS 多层 radial-gradient 错位呼吸(最稳,默认推荐):
   - 3-5 个大椭圆 `radial-gradient(...)`,颜色取自调色板。
   - 每个椭圆套 `@keyframes`,做平移 + scale + hue-rotate,周期 8-14s,错峰;整个画面叠 `mix-blend-mode: screen` 或 `overlay`。
   - 顶层加 1 层 `backdrop-filter: blur(80px)` 让边缘更糊。
2. Canvas + simple perlin noise(中阶):
   - 约 80 行 inline JS,用 `requestAnimationFrame` 画 metaballs 或 simplex noise field。
   - 性能允许时启用;`prefers-reduced-motion` 时降回静态帧。
3. WebGL fragment shader(高阶,慎用):
   - 用 CDN 引 `regl`,或 inline plain WebGL。
   - shader 在单个 quad 上跑 domain-warp noise,只用一个 `u_time` uniform。

### 顶层文字层
- 居中或左下:一句巨型金句(5-7vw,衬线或粗 sans),字体用 `Source Serif Pro` / `Inter Tight` / `Manrope Black`。
- 文字色按背景明暗取 paper white `#fafaf8` 或 ink;加 `mix-blend-mode: difference`,让它在任何流体颜色上都可读。
- 副标用小 sans,opacity 0.7,一行。
- 底部可选 CTA chip 或 hairline + 元数据 row。

### 调色 — 4 选 1,不要彩虹
- 🌅 Solar Peach — `#ffb18a` + `#f78b4c` + `#d97757`,暖橙桃。
- 🌊 Ocean Aqua — `#5ac8fa` + `#0a84ff` + `#1e3a8a`,海蓝。
- 🌌 Aurora Violet — `#a78bfa` + `#7c5cff` + `#1e1b4b`,极光紫。
- 🌿 Forest Mint — `#86efac` + `#34d399` + `#065f46`,苔森林。

### 设计细节
- 严禁:多色彩虹(>4 个色相)、PowerPoint 渐变、霓虹荧光叠加。
- 字体:中文用 `Noto Serif SC`(display)/ `Noto Sans SC`(副标)。
- 严禁外链图片;全部 CSS + SVG + 可选 canvas。
- 必须用用户提供的金句 / 标题;如果用户输入是数据 → 提炼一句 ≤ 18 字的金句。
- 单文件 HTML,可被 `prefers-reduced-motion` 关动效。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 流体 Hero · 极光紫</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700;800;900&family=Noto+Sans+SC:wght@400;700;900&family=Source+Serif+Pro:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif; background:#1e1b4b; margin:0; min-height:100vh; overflow:hidden; color:#fafaf8; position:relative; }
  .blob { position:absolute; border-radius:50%; mix-blend-mode:screen; filter:blur(70px); will-change: transform; }
  @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(80px,-60px) scale(1.15) } }
  @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1.1) } 50% { transform: translate(-100px,40px) scale(0.9) } }
  @keyframes float3 { 0%,100% { transform: translate(0,0) scale(0.95) } 50% { transform: translate(50px,80px) scale(1.2) } }
  .b1 { width:600px; height:600px; background:#a78bfa; top:-100px; left:-100px; animation: float1 12s ease-in-out infinite; }
  .b2 { width:520px; height:520px; background:#7c5cff; top:30%; right:-100px; animation: float2 10s ease-in-out infinite; }
  .b3 { width:480px; height:480px; background:#ec4899; bottom:-100px; left:30%; animation: float3 14s ease-in-out infinite; }
  .b4 { width:380px; height:380px; background:#06b6d4; top:60%; left:10%; animation: float1 16s ease-in-out infinite; opacity:0.6 }
  .text-diff { mix-blend-mode: difference; color:#fafaf8; }
  .chip { font-family:'Inter Tight',sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; }
  .serif-em { font-family:'Source Serif Pro',serif; font-style:italic; font-weight:600; }
  /* faint grid overlay */
  body::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 64px 64px; z-index:1;
  }
  @media (prefers-reduced-motion: reduce) {
    .blob { animation: none }
  }
</style>
</head>
<body class="flex flex-col items-center justify-center p-16">

  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
  <div class="blob b4"></div>

  <header class="absolute top-12 left-12 right-12 flex items-baseline justify-between chip opacity-70 z-10">
    <span class="text-diff">NEVOFLUX · 帧 · 流体 HERO</span>
    <span class="text-diff">AURORA VIOLET</span>
    <span class="text-diff">2026 · 1920 × 1080</span>
  </header>

  <main class="relative z-10 text-center max-w-[1100px]">
    <h1 class="text-diff font-black leading-[0.95] tracking-[-0.03em]" style="font-size:clamp(48px,7.5vw,128px)">
      最好的浏览器, <span class="serif-em">是</span><br/>
      帮你把应用写出来的那一个。
    </h1>
    <p class="mt-8 text-diff opacity-80 text-[24px] font-medium">
      NevoFlux · 一句话生成 Canvas 应用, 由 GBrain 知识库托底
    </p>
    <div class="mt-10 inline-flex items-center gap-3 text-[13px] font-semibold chip px-5 py-2 rounded-full text-diff" style="border:1px solid rgba(255,255,255,0.4)">
      ⌘ 打开一个 NevoFlux Canvas
    </div>
  </main>

  <footer class="absolute bottom-12 left-12 right-12 flex items-baseline justify-between chip opacity-60 z-10">
    <span class="text-diff">FRAME-LIQUID-BG-HERO</span>
    <span class="text-diff">PREFERS-REDUCED-MOTION SAFE</span>
    <span class="text-diff">NEVOFLUX.AI</span>
  </footer>
</body>
</html>
```

## 用法

极光紫(Aurora Violet)配色的单文件 hero 帧:四个高斯模糊、screen 混合的流体球在背后呼吸,前景叠一行 `mix-blend-mode: difference` 巨型标题,再盖一层极淡网格。

- 流体球(`.b1`-`.b4`):流体层。保留四个球、模糊、`screen` 混合与错峰的 `floatN` 动画;只在换配色时替换 hex 颜色。
- 顶部 chip 行:设置面包屑(`NEVOFLUX · 帧 · 流体 HERO`)、配色名、日期 / 画布规格。
- 标题(`<h1>`):关于 NevoFlux 的那句巨型金句 — 按语义断行,把一个强调词包进 `.serif-em`(衬线斜体重音)。
- 副标(`<p>`):一行支撑文案,opacity 0.8 — 浏览器、GBrain 知识库、Canvas 应用、agent / SDK、packs 或设计 skills。
- CTA chip:发丝边胶囊里一句简短行动召唤。
- 底部 chip 行:模板 id、`PREFERS-REDUCED-MOTION SAFE` 标记、品牌域名。
- 所有 CSS、类名、尺寸、流体球结构与 `prefers-reduced-motion` 规则保持不变 — 只改可见文字。
