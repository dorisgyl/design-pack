---
slug: packs/design-pack/templates/deck-swiss-international-zh
type: template
lang: zh
category: slides
title: "瑞士国际主义 Deck"
title_en: "Swiss International Deck"
description: "瑞士国际主义网格版式，用于围绕 NevoFlux 的冷静、理性的产品、分析与方法论表达。"
tags: [swiss, grid, international, ikb, editorial, facts, 模板]
sample_image: packs/design-pack/assets/templates/deck-swiss-international.svg
source: html-anything/deck-swiss-international
---

## 设计指导

瑞士国际主义 Deck（Swiss International）。意图是事实、产品、分析、方法论表达。极度冷静、理性、学院派，没有任何手绘 / 噪点 / 装饰。Inspired by op7418/guizang-ppt-skill Style B。

### 主题（只能从下面 4 套二选一，不许混用、不许改 hex）
- 🔵 Klein Blue (IKB) —— accent `#002FA7`, paper `#fafaf8`, ink `#0a0a0a`。商业 / AI / 设计场景。
- 🟡 Lemon Yellow —— accent `#FFD500`, paper `#f7f5ee`（淡奶油）, ink `#0a0a0a`。年轻 / 零售 / 体育。文字必须用黑色（不能白色）。
- 🟢 Lemon Green / Neon —— accent `#C5E803`, paper `#f7f5ee`, ink `#0a0a0a`。可持续 / 科技初创 / Gen-Z 品牌。文字必须用黑色。
- 🟠 Safety Orange —— accent `#FF6B35`, paper `#f7f5ee`, ink `#0a0a0a`。工业 / 汽车 / 紧急消息。文字用白色 + bold ≥ 600。

### 布局（22 个可复用版式池，不许新增或改造版式；数量由内容决定，把用户内容完整覆盖完为止；短内容 6-10 张起步，长内容应远超此范围，同一版式可在不同章节重复使用）
- S01 Cover —— 全屏 accent + ASCII 呼吸点阵 + 反白标题 + 元数据 chrome（date / № / topic）。
- S02 Vertical Timeline —— 左侧虚线轴 + 圆点；右侧节点 = 年份 + KPI + 描述。
- S03 Statement —— 9.6vw 居中巨字 + 左侧大段留白 + 底部 hairline + 注释。
- S04 Six Cells —— 2×3 网格，每格：icon + 编号 + 短标题 + 单行描述。
- S05 Three Sub-cards —— 左侧 hero 标题 + 右侧 3 张水平堆叠的灰色卡。
- S06 KPI Tower —— 4 列变高蓝色柱状；柱顶 icon；柱底大数字 + 标签。
- S07 H-Bar Chart —— 水平排名横条，宽度反映数据，末端标数字。
- S08 Duo Compare —— 垂直分割线；左 Before / 右 After。
- S09 Closing Manifesto —— 左 IKB 块 + ASCII 点阵 + 宣言；右白底 + 3 条要点。
- S10 Dot Matrix Statement —— 居中宣言 + 角落几何点矩阵 / 圆环矩阵。
- S11 Horizontal Timeline —— 顶部 headline，中部 hairline 轴，等距节点，节点下方步骤名。
- S12 Manifesto + Ink Banner —— 上半 headline + 解释；下半全宽黑色横幅 + 反白小字。
- S13 Three Forces Cards —— 左 ink hero 块；右 3 张灰色卡，每卡：大数字 + 文本。
- S14 Loop Diagram —— 左编号步骤；右 SVG 同心环；中心 “LOOP” 标签。
- S15 Image Matrix + Hero Stat —— 4×3 等高卡片（12 项）+ 底部 summary 大数字 + 标签。
- S16 Multi-card Brief —— 3×2 微卡；主文左上，注脚右下，单卡 accent 高亮。
- S17 System Diagram —— 左 headline + 3 段描述；右 SVG 三同心圆 + 外部标签。
- S18 Why Now —— 3 列，每列：category label + headline + 描述 + 底部数字（最后一列 accent）。
- S19 Four Cards —— 顶部 accent hairline + headline + 4 张等宽卡（元数据 / 标题 / 正文）。
- S20 Stacked KPI Ledger —— 垂直行 + hairline 分隔；左大数字 / 中标签 / 右 icon。
- S21 Tech Spec Sheet —— 左标题块 / 中 3 个 KPI hairline / 右变高柱 / 底数据。
- S22 Image Hero —— 上 60% 全宽图 + 白色标题块覆盖；下 40% 解释 + 3 列 KPI。

### 设计细节（绝对铁律）
- 只用直角：全程 `border-radius: 0`。圆角 = 立刻违反。
- 1px hairline borders，黑色或 accent；严禁阴影 / 渐变 / blur。
- 16 列网格：`grid-template-columns: repeat(16, 1fr); gap: 0`。
- 字体：Inter Tight（Latin display）/ Inter（body）/ Noto Sans SC（中文）/ JetBrains Mono（数据）；严禁衬线、严禁装饰字体。
- 字号极端反差：cover 用 9.6vw display，body 14-16px，label 11px uppercase letterspacing 0.08em。
- 键盘 ← / → 切换 + hash 同步；角标固定：`№N/N` 右下，topic 标签左下。
- 不许编造：数字必须来自用户输入，图表柱高 = 真实数据按比例。
- 输出单文件 HTML，不用任何外部图片 URL；装饰几何（ASCII 矩阵 / 同心圆）用纯 CSS 或内联 SVG。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux · 瑞士国际主义 2026</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter Tight','Inter','Noto Sans SC',system-ui,sans-serif; background:#0a0a0a; color:#fafaf8; margin:0; }
  .slide { width:100%; aspect-ratio:16/9; max-width:1280px; margin:0 auto; position:relative; overflow:hidden; }
  .ikb { background:#002FA7; color:#fafaf8; }
  .paper { background:#fafaf8; color:#0a0a0a; }
  .mono { font-family:'JetBrains Mono', ui-monospace, monospace; }
  .hairline-b { border-bottom:1px solid currentColor; }
  .hairline-t { border-top:1px solid currentColor; }
  /* ASCII dot field */
  .ascii { font-family:'JetBrains Mono', monospace; font-size:11px; line-height:1; letter-spacing:6px; opacity:0.2; }
  .bar { width:60px; background:#002FA7; }
  .deck { display:grid; gap:24px; padding:24px; }
</style>
</head>
<body>
<div class="deck">

  <!-- S01 Cover · Full IKB -->
  <section class="slide ikb">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em]">
        <span>NEVOFLUX — 2026 产品路线</span>
        <span>S01 / 22</span>
        <span>2026.05.11</span>
      </header>
      <!-- ascii dot matrix top-right -->
      <pre class="absolute top-20 right-12 ascii">▒▓█▓▒░░▒▓█▓▒
▒▒▓█▓▒░░▒▓█▓▒
░▒▓█▓▒░░▒▓█▓▒
░░▒▓█▓▒░░▒▓█▓
▒░░▒▓█▓▒░░▒▓
▒▒░░▒▓█▓▒░░▒</pre>
      <div>
        <div class="mono text-[12px] uppercase tracking-[0.18em] opacity-80">№01 · 会思考的浏览器</div>
        <h1 class="mt-3 font-black leading-[0.95] tracking-[-0.02em]" style="font-size:clamp(48px,7.5vw,124px)">
          一个会动手<br/>又会记忆<br/>的浏览器。
        </h1>
        <p class="mt-5 max-w-[640px] text-[15px] opacity-90 leading-snug">
          NevoFlux 浏览器 · 本地 GBrain 知识库 · Agent 生成 Canvas 应用 · 0 云端密钥 · 输出自包含 HTML。
        </p>
      </div>
      <footer class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-70 hairline-t pt-3">
        <span>NEVOFLUX.STUDIO</span>
        <span>LOCAL-FIRST · 端侧运行 · 离线可用</span>
        <span>VOL. 01</span>
      </footer>
    </div>
  </section>

  <!-- S06 KPI Tower · paper bg, 4 IKB bars -->
  <section class="slide paper">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em]">
        <span>KPI TOWER — Q1-Q4 OUTLOOK</span>
        <span>S06 / 22</span>
        <span>FY 2026</span>
      </header>
      <div>
        <div class="mono text-[12px] uppercase tracking-[0.18em]" style="color:#002FA7">№06 · GROWTH METRICS</div>
        <h2 class="mt-2 font-black leading-[1] tracking-[-0.02em]" style="font-size:clamp(36px,4.8vw,80px)">
          四根柱子, 一个目标 ——<br/>
          做<span style="color:#002FA7">最被信任</span>的本地浏览器。
        </h2>
      </div>
      <!-- bars -->
      <div class="grid grid-cols-4 gap-10 items-end mt-6">
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><rect x="4" y="4" width="4" height="16"/><rect x="10" y="8" width="4" height="12"/><rect x="16" y="2" width="4" height="18"/></svg>
          </div>
          <div class="bar mx-auto" style="height:60px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">75</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">设计技能 · 现在</div>
        </div>
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><circle cx="12" cy="12" r="9" fill="none" stroke="#002FA7" stroke-width="2"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div class="bar mx-auto" style="height:140px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">17</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">Canvas 应用 · 已上线</div>
        </div>
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/></svg>
          </div>
          <div class="bar mx-auto" style="height:230px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">25K</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">GBrain 笔记 · 已索引</div>
        </div>
        <div class="text-center">
          <div class="mb-3 mx-auto" style="height:32px">
            <svg viewBox="0 0 24 24" class="w-7 h-7 mx-auto" fill="#002FA7"><path d="M5 3l10 9-10 9z"/></svg>
          </div>
          <div class="bar mx-auto" style="height:280px"></div>
          <div class="mt-3 mono text-[32px] font-bold" style="color:#002FA7">0</div>
          <div class="hairline-t mt-1 pt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">云端密钥 · 需要</div>
        </div>
      </div>
      <footer class="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.18em] opacity-60 hairline-t pt-3 mt-4">
        <span>SOURCE — NEVOFLUX 内部分析 / 2026-04</span>
        <span>NEVOFLUX.STUDIO</span>
        <span>№06 / 22</span>
      </footer>
    </div>
  </section>

</div>
</body>
</html>
```

## 用法

本 seed 内含 22 个可复用版式中的两个（S01 Cover + S06 KPI Tower）；从版式池中复制并重复使用，覆盖完整叙事。

- 从设计指导中只选一套主题，把对应 hex 应用到 `.ikb`（accent）与 `.paper`，严禁混用、严禁改 hex。保持全部 CSS、类名、尺寸与结构不变，只替换可见文本。
- 角标 chrome：`mono` 页眉行放 topic 标签（`NEVOFLUX — ...`）、页码标记（`S01 / 22`）与日期；底部 hairline 行重复工作室标识与 `№N / 22`。
- S01 Cover（`.slide.ikb`）：设置 kicker（`№01 · ...`）、大号 `h1` hero 标题（按语义断行）与 lead 段落；ASCII 点阵保持为纯文本装饰。
- S06 KPI Tower（`.slide.paper`）：四列各填一个内联 SVG icon、一根高度按真实数据缩放的 `.bar`、大号 `mono` 数字与一行 uppercase 标签。数字必须真实，不许编造，柱高须与数据成比例。
