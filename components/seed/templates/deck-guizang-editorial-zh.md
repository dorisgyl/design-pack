---
slug: packs/design-pack/templates/deck-guizang-editorial-zh
type: template
lang: zh
category: slides
title: "贵赞编辑墨水 Deck"
title_en: "Guizang Editorial E-Ink Deck"
description: "电子杂志 x 电子墨水风格的幻灯片版式，用于围绕 NevoFlux 的叙事、观点与设计分享。"
tags: [editorial, e-ink, magazine, narrative, guizang, 模板]
sample_image: packs/design-pack/assets/templates/deck-guizang-editorial.svg
source: html-anything/deck-guizang-editorial
---

## 设计指导

电子杂志 x 电子墨水 Deck。意图是叙事、观点、分享、个人风格表达。墨纸印刷感，不要科技感。Inspired by op7418/guizang-ppt Style A。

### 调色板（5 选 1，严禁改 hex、严禁混用）
- 墨水经典 Monocle（默认 / 通用商业 / 科技）—— ink `#0a0a0b`, paper `#f1efea`, paper-tint `#e8e5de`, ink-tint `#18181a`。
- 靛蓝瓷 Indigo Porcelain（科技 / 研究 / 数据）—— ink `#0a1f3d`, paper `#f1f3f5`, paper-tint `#e4e8ec`, ink-tint `#152a4a`。
- 森林墨 Forest Ink（自然 / 可持续 / 文化）—— ink `#1a2e1f`, paper `#f5f1e8`, paper-tint `#ece7da`, ink-tint `#253d2c`。
- 牛皮纸 Kraft Paper（怀旧 / 人文 / 文学）—— ink `#2a1e13`, paper `#eedfc7`, paper-tint `#e0d0b6`, ink-tint `#3a2a1d`。
- 沙丘 Dune（艺术 / 设计 / 时尚）—— ink `#1f1a14`, paper `#f0e6d2`, paper-tint `#e3d7bf`, ink-tint `#2d2620`。

### 布局（10 个磁带式版式池，可复用）
版式数量由内容决定，完整覆盖每个要点。短内容 6-12 张起步，长内容应更多（同一版式可在不同章节重复使用）。
- L01 Hero Cover —— 居中大字 hero typography + kicker + subtitle + lead paragraph + 底部元数据 row。
- L02 Act Divider —— kicker + 8.5-10vw 巨大 headline + 一句引言；章节切换可反色（ink ↔ paper）。
- L03 Big Numbers Grid —— 3x2 数据卡（label / 大数字 / 注释）。
- L04 Quote + Image —— 左 kicker + headline + body + callout；右 16:10 图（基线对齐 baseline 不是 top）。
- L05 Image Grid —— 3x2 或 3x1 等高图网格（26vh 或 22vh）；严格统一高度。
- L06 Pipeline / Flow —— 横向编号步骤组，每步 №X + 标题 + 描述；支持键盘逐步推进。
- L07 Hero Question —— 7vw 全屏单一问句，按语义断行，周围极简。
- L08 Big Quote —— 5.8vw 巨大衬线引文 + 英文翻译 + 署名 + 日期。
- L09 Before / After —— 1:1 split；左列 opacity .55（旧 / before）；右列 full brightness（新 / after）。
- L10 Mixed Media —— 8:4 比例；左大段文字（kicker / headline / body / callout）+ 右 3:4 竖图作辅助。

### 设计细节
- 严禁：渐变 / drop-shadow / 圆角 / 圆形装饰 / blur / SVG 图标库 / emoji 装饰。
- 字体：Display 用 Playfair Display（英）/ Noto Serif SC（中）；Body 用 Inter / Noto Sans SC；编号 / 数字偶尔可用 italic 衬线。
- 杂志感细节：kicker 用 11px uppercase letterspacing 0.12em；folio 右下角 `01 / 12`；顶部细 hairline rule + 期刊 logo / topic。
- 不许：数据捏造、Lorem ipsum、占位图片 URL。所有图请用纯 CSS / SVG 内联描绘（色块 + 简笔）。
- 键盘 ← / → 切换；hash 同步；单文件 HTML。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 编辑墨水 · 章节封页</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600&family=Noto+Serif+SC:wght@400;500;700&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter','Noto Sans SC',system-ui,sans-serif; background:#0a0a0b; margin:0; }
  .deck { display:grid; gap:24px; padding:24px; }
  .slide { width:100%; aspect-ratio:16/9; max-width:1280px; margin:0 auto; position:relative; overflow:hidden; }
  .paper { background:#f1efea; color:#0a0a0b; }
  .ink { background:#0a0a0b; color:#f1efea; }
  .display { font-family:'Playfair Display','Noto Serif SC',serif; }
  .body-serif { font-family:'Playfair Display','Noto Serif SC',serif; font-style:italic; }
  .kicker { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; font-weight:500; }
  .hairline { border:0; border-top:1px solid currentColor; opacity:0.3; }
  .folio { font-feature-settings:'tnum'; font-variant-numeric:tabular-nums; }
</style>
</head>
<body>
<div class="deck">

  <!-- L02 Act Divider · ink reverse -->
  <section class="slide ink">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between kicker opacity-70">
        <span>NEVOFLUX 田野笔记 — Issue №26</span>
        <span>Act II</span>
        <span class="folio">04 / 12</span>
      </header>
      <div>
        <div class="kicker opacity-80">第二章</div>
        <h1 class="display mt-4 leading-[0.95]" style="font-size:clamp(64px,9vw,160px); font-weight:500;">
          为什么<br/>
          <span class="body-serif">浏览器</span>应当先于<br/>
          你开始思考。
        </h1>
      </div>
      <footer class="flex items-baseline justify-between kicker opacity-60">
        <span>BY NevoFlux Studio · 2026 SPRING</span>
        <span class="body-serif normal-case tracking-normal">A magazine for agentic browsing.</span>
      </footer>
    </div>
  </section>

  <!-- L03 Big Numbers Grid · paper -->
  <section class="slide paper">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between kicker" style="color:#3a382f">
        <span>NEVOFLUX 田野笔记 — Issue №26</span>
        <span>Numbers</span>
        <span class="folio">05 / 12</span>
      </header>
      <div>
        <div class="kicker" style="color:#6b665b">By the numbers</div>
        <h2 class="display mt-2 leading-[1.0]" style="font-size:clamp(36px,5vw,72px); font-weight:500;">
          四个数字, <span class="body-serif">一条线</span> —— 浏览器学会了干活。
        </h2>
      </div>
      <div class="grid grid-cols-4 gap-8 mt-4">
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">设计技能</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">75</div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f"><span class="body-serif">+16</span> 本次 pack 新增；封页、文档、Canvas 框架。</p>
        </article>
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">Canvas 应用</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">17</div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f">由 Agent 生成, 接入 <span class="body-serif">GBrain</span>, 零配置。</p>
        </article>
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">平均生成</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">80<span class="body-serif text-[40px]">s</span></div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f">一份杂志风 Deck, <span class="body-serif">31KB</span> 自包含 HTML。</p>
        </article>
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">云端密钥</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">0</div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f">全部跑在你<span class="body-serif">本地</span>的 NevoFlux 浏览器里。</p>
        </article>
      </div>
      <footer class="flex items-baseline justify-between kicker opacity-70" style="color:#3a382f">
        <span>Source: NevoFlux design-pack internal · 2026-05</span>
        <span class="body-serif normal-case tracking-normal">Set in Playfair &amp; Inter.</span>
      </footer>
    </div>
  </section>

</div>
</body>
</html>
```

## 用法

本 seed 内含十个磁带式版式中的两个；按需复制并重复使用，覆盖完整叙事。

- 顶部 hairline 页眉：设置期刊名（`NEVOFLUX 田野笔记 — Issue №...`）、章节标签，以及右下 folio（`04 / 12`）。
- L02 Act Divider（`.slide.ink`）：kicker 写章节标签，`.display` 大标题作为本章论点（把关键词包进 `.body-serif` 得到斜体衬线点缀），footer 放署名 / tagline。
- L03 Big Numbers Grid（`.slide.paper`）：四张 `article` 卡各填一个 kicker 标签、一个大数字、一行注释；标题保持一句编辑体。
- 从设计指导中只选一套调色板，把对应 hex 应用到 `.ink` / `.paper`，严禁混用。保持全部 CSS、类名、尺寸与结构不变，只替换可见文本。
