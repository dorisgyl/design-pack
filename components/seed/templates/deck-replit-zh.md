---
slug: packs/design-pack/templates/deck-replit-zh
type: template
lang: zh
category: slides
title: "Replit Slides 风 Deck"
title_en: "Replit Slides Deck for NevoFlux"
description: "Replit Slides 主题风格的单文件横向滑动 Deck，用于讲述 NevoFlux 产品故事。"
tags: [replit, themed, memo, 模板]
sample_image: packs/design-pack/assets/templates/deck-replit.svg
source: html-anything/deck-replit
---

## 设计指导

Replit Slides 风的单文件 horizontal-swipe deck。意图是产品 keynote：只选 1 套主题，严禁混用。

### 布局
- 只选一套主题：helix / holm / vance / bevel / world-dark / world-mint / atlas / bluehouse。
- 结构：cover + agenda + N 个 content + 收尾。N 由【用户内容】长度决定，完整覆盖每个要点。短内容 6-10 张起步，长内容应更多。

### 设计细节
- 每套主题有完整调色板 + 字体 + accent，不要混用。
- 单文件自包含：不许外链图片 URL —— 装饰用 CSS 渐变与内联 SVG 描绘。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Slides · World Mint</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;800;900&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Inter',system-ui,sans-serif; background:#020405; margin:0; color:#e7fff0; }
  .deck { display:grid; gap:24px; padding:24px; }
  .slide { width:100%; aspect-ratio:16/9; max-width:1280px; margin:0 auto; position:relative; overflow:hidden; }
  .mint-bg {
    background:
      radial-gradient(ellipse at 80% 0%, rgba(0,255,170,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 0% 100%, rgba(0,210,140,0.18) 0%, transparent 50%),
      linear-gradient(135deg, #04150f 0%, #0a2a1d 60%, #04241a 100%);
  }
  .mint { color:#7ffec8; }
  .mono { font-family:'JetBrains Mono', ui-monospace, monospace; }
  .chip { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; }
  .pill { background: rgba(127,254,200,0.1); color:#7ffec8; padding:3px 10px; border-radius:999px; }
  .ring { border:1px solid rgba(127,254,200,0.35); }
</style>
</head>
<body>
<div class="deck">

  <!-- COVER -->
  <section class="slide mint-bg">
    <div class="absolute inset-0 p-14 flex flex-col justify-between">
      <header class="flex items-baseline justify-between chip opacity-70 mono">
        <span>NEVOFLUX · SLIDES — WORLD MINT</span>
        <span>№01 / 12</span>
        <span>2026</span>
      </header>

      <div>
        <div class="pill chip mono inline-block">Deck · 产品 keynote</div>
        <h1 class="mt-6 font-black tracking-[-0.02em] leading-[0.95]" style="font-size:clamp(48px,7vw,128px);color:#e7fff0">
          会思考的浏览器,<br/>就在<span class="mint">本地。</span>
        </h1>
        <p class="mt-6 text-[24px] opacity-80 font-medium max-w-[720px] leading-snug">
          一个 GBrain 知识库。Canvas 应用随取随用。零云端密钥。
        </p>
      </div>

      <footer class="flex items-baseline justify-between chip opacity-70 mono">
        <span>NEVOFLUX.APP</span>
        <span class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full" style="background:#7ffec8;box-shadow:0 0 12px #7ffec8"></span>
          <span>LIVE · 本地浏览器</span>
        </span>
        <span>~ S W I P E ~</span>
      </footer>
    </div>
  </section>

  <!-- AGENDA -->
  <section class="slide mint-bg">
    <div class="absolute inset-0 p-14 flex flex-col justify-between">
      <header class="flex items-baseline justify-between chip opacity-70 mono">
        <span>WORLD MINT — AGENDA</span>
        <span>№02 / 12</span>
        <span>5 SCENES</span>
      </header>

      <div>
        <div class="chip mono mint">— 议程</div>
        <h2 class="mt-2 font-black tracking-[-0.02em] leading-[1.0]" style="font-size:clamp(36px,4.6vw,72px);color:#e7fff0">
          五个短场景,<br/>
          <span class="mint">一个浏览器</span>。
        </h2>
      </div>

      <div class="grid grid-cols-5 gap-5">
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">01</div>
          <div class="mt-2 font-bold leading-snug">浏览器即工作台</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">标签页是一层。NevoFlux 是一种习惯。</p>
        </article>
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">02</div>
          <div class="mt-2 font-bold leading-snug">为什么 GBrain 取胜</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">记忆、信任、速度。三者都要。</p>
        </article>
        <article class="ring rounded-2xl p-4" style="background:rgba(127,254,200,0.06)">
          <div class="mono text-[22px] font-bold mint">03</div>
          <div class="mt-2 font-bold leading-snug">Agent · SDK · packs</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">一套 SDK，所有 Canvas 应用，就这样。</p>
        </article>
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">04</div>
          <div class="mt-2 font-bold leading-snug">现场演示 · ⌘+Enter</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">CSV → Canvas 应用，80 秒。</p>
        </article>
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">05</div>
          <div class="mt-2 font-bold leading-snug">开放问题</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">设计技能能否做成社区库?</p>
        </article>
      </div>

      <footer class="flex items-baseline justify-between chip opacity-60 mono">
        <span>STYLE — WORLD MINT (NEON SANS)</span>
        <span>USE ← / → TO NAVIGATE</span>
        <span>5 / 12</span>
      </footer>
    </div>
  </section>

</div>
</body>
</html>
```

## 用法

本 seed 内含 deck 的两种 slide —— cover 与 agenda。按需复制并重复使用 content slide，覆盖完整故事。

- 页眉 row（`.chip.mono`）：设置主题标签（`NEVOFLUX · SLIDES — WORLD MINT`）、页码（`№01 / 12`）与年份 / 场景数。
- Cover：`.pill` 是 deck 类型标签，`.font-black` 大 `<h1>` 是论点（把关键词包进 `.mint` 得到霓虹点缀），段落是一句副标题。footer 放品牌、live 状态点与 swipe 提示。
- Agenda：五张 `article` 卡各填一个编号、一个短标题与一行注释；用 `rgba(127,254,200,0.06)` 背景高亮重点卡。
- 从设计指导中只选一套主题，应用其调色板 / 字体 / accent，严禁混用。保持全部 CSS、类名、尺寸与结构不变，只替换可见文本。
