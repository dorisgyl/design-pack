---
slug: packs/design-pack/templates/doc-kami-parchment-zh
type: template
lang: zh
category: doc
title: "Kami 羊皮纸文档"
title_en: "Kami Parchment Document"
description: "暖羊皮纸底 + 墨蓝单色 accent + 单一衬线字体的编辑级排印模板，用于 NevoFlux 的 one-pager、报告、信函与 changelog。"
tags: [kami, parchment, serif, editorial, report, letter, one-pager, 模板]
sample_image: packs/design-pack/assets/templates/doc-kami-parchment.svg
source: html-anything/doc-kami-parchment
---

## 设计指导

一个严肃排版文档模板：one-pager / 长报告 / 信函 / 简历 / 财报 / changelog / portfolio。Inspired by tw93/kami。强调"写得像被排过版的纸"，不是 dashboard，不是网页。

### 硬性视觉签名 — 不许改
- **画布**：暖羊皮纸 `#f5f4ed`（永远不用纯白 `#fff`）。次级背景 `#efeee5`。
- **墨色**：主文字 `#1f1d18`（近黑暖灰，不用纯黑 `#000`）。次文字 `#6b665b`。
- **唯一色彩**：墨蓝 `#1B365D` —— 所有 accent（链接、tag 描边、重点数字、引用左 rule）只能用这一个色，严禁多色。
- **字体**：一种语言一种衬线，全文不混用：
  - 英文：`Charter`（fallback：`Source Serif Pro`、`Iowan Old Style`）
  - 中文：`TsangerJinKai02 W04`（fallback：`Noto Serif SC`）
  - 日文：`YuMincho`（fallback：`Noto Serif JP`）
  - Body 400，Heading 500（不要 700/800/900）。
- **行高**：标题 1.1–1.3，紧凑正文 1.4–1.45，阅读型正文 1.5–1.55。
- **绝不**：drop-shadow / blur / 圆角 >= 8px / 渐变 / 霓虹色 / rgba（用 solid hex）。
- **细节**：tag 用 solid hex 背景方块（因为 WeasyPrint 不渲染 rgba 好）；单线几何 icon；边缘 1px hairline `#d4d1c5` rule，长度受控不到边。

### 可选文档类型 — 按用户内容判断
- **One-Pager** —— 顶 logotype（Charter italic）+ 标题 + lede + 3 列要点 + 底脚 metadata。
- **Long Doc** —— 封面页（大标题 + 副标 + 作者 + 日期）-> 目录（kicker + page no.）-> 章节（folio 顶角 + section rule + body）-> 注释脚注 + 文末 colophon。
- **Letter** —— 抬头地址 + 日期 + 收件人 + 正文（左对齐，段间空 1.5em）+ 署名 + 签名占位线。
- **Portfolio** —— 项目 hero（大标题 + sub）+ 1 张全幅图（用 CSS 块绘制占位）+ 项目描述 + 角色 / 时间 / stack 元数据 row。
- **Resume** —— 顶部姓名（大字）+ tagline 一行 + contact row + 主要 section：experience（公司 / 时间 / 职位 / bullets）+ skills + education。
- **Slides** —— keynote 风，页数由用户内容决定（短内容 6 页起步，长内容应更多），每页满铺羊皮纸，大标题 + lede + 角标 page no.，简洁到只有"被印出来"的感觉。
- **Equity Report** —— 公司名 + ticker + Q × 年份 + key metrics row（revenue / margin / yoy）+ body 分析 + 图表（SVG 单色折线）。
- **Changelog** —— 版本号（Charter italic 大字）+ 日期 + 改动列表（Added / Changed / Fixed），单 rule 分隔。

### 设计准则
- "Composed pages, not dashboards." 不要堆 KPI 卡，不要堆 emoji 图标，不要 hero gradient。
- "Ring or whisper only, no hard drop shadows." 阴影只能是 `0 0 0 1px #d4d1c5` 这种 hairline 描边。
- 文字层级靠**衬线对比 + 字号 + 留白**，不靠颜色。
- 单文件 HTML，用 Tailwind CDN；全文中英混排时加盘古之白；不要外链图片，占位用 paper-tint 色块 + 1px ink 描边。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>Kami 羊皮纸 · NevoFlux 工作笔记 №26</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+SC:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body {
    font-family: 'Source Serif Pro', 'Noto Serif SC', Georgia, serif;
    background: #f5f4ed;
    color: #1f1d18;
  }
  .ink-blue { color: #1B365D; }
  .meta { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
  .rule { border-color: #d4d1c5; }
  .display { font-family: 'Source Serif Pro', 'Noto Serif SC', Georgia, serif; }
  .h1-display { font-size: clamp(48px, 7vw, 96px); line-height: 1.05; letter-spacing: -0.01em; font-weight: 500; }
  .tag { display: inline-block; padding: 3px 10px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; background: #efeee5; color: #1B365D; }
</style>
</head>
<body class="min-h-screen">
  <div class="max-w-[920px] mx-auto px-10 py-14">

    <!-- top folio rule -->
    <header class="flex items-baseline justify-between border-b rule pb-3 text-[11px] meta uppercase tracking-[0.18em]" style="color:#6b665b">
      <span>NEVOFLUX · 工作笔记</span>
      <span>Vol. 01 · Issue №26 · MMXXVI</span>
      <span>Apache-2.0</span>
    </header>

    <!-- kicker -->
    <div class="mt-12 flex items-baseline gap-3">
      <span class="tag">Studio Letter</span>
      <span class="meta text-[11px] uppercase tracking-[0.18em]" style="color:#6b665b">智能体浏览器 · GBrain · Canvas</span>
    </div>

    <!-- hero headline -->
    <h1 class="display h1-display mt-4">
      会<span style="font-style:italic" class="ink-blue">记忆</span>的浏览器，<br/>
      把内容排在暖纸上。
    </h1>

    <!-- lede -->
    <p class="mt-8 text-[20px] leading-relaxed max-w-[680px]" style="color:#3a382f">
      NevoFlux 是一款内置智能体的浏览器：它替你阅读、记忆并动手构建——你浏览过的每一页都汇入本地知识库 GBrain，而它拼装出的每一个 Canvas 应用，都由智能体亲手排版。纯白只是屏幕的惯性，不是出版的传统。纸是有温度的，字也一样。
    </p>

    <!-- 3 columns -->
    <section class="mt-14 grid grid-cols-3 gap-10 border-t rule pt-10">
      <article>
        <div class="meta text-[10px] uppercase tracking-[0.18em] ink-blue">01 · Pillar</div>
        <h2 class="display text-[24px] font-semibold mt-2 leading-snug">GBrain<br/>会记得。</h2>
        <p class="mt-3 text-[14.5px] leading-relaxed" style="color:#3a382f">读过的每一页都化作可被召回的记忆。知识库就在你本机——没有云端密钥，不外泄。</p>
      </article>
      <article>
        <div class="meta text-[10px] uppercase tracking-[0.18em] ink-blue">02 · Pillar</div>
        <h2 class="display text-[24px] font-semibold mt-2 leading-snug">智能体<br/>会动手。</h2>
        <p class="mt-3 text-[14.5px] leading-relaxed" style="color:#3a382f">一句提示，SDK 便拼出一个 Canvas 应用——一份 deck、一份报告、一件工具——连上 GBrain，几秒即成。</p>
      </article>
      <article>
        <div class="meta text-[10px] uppercase tracking-[0.18em] ink-blue">03 · Pillar</div>
        <h2 class="display text-[24px] font-semibold mt-2 leading-snug">Packs 与 skills，<br/>逐页排印。</h2>
        <p class="mt-3 text-[14.5px] leading-relaxed" style="color:#3a382f">设计 skill 以 pack 形式发布。每一个都是被排版出来的，而非拼贴出来的——一页应当有被印出来的质感。</p>
      </article>
    </section>

    <!-- pull quote -->
    <blockquote class="mt-14 border-l-2 pl-5 italic" style="border-color:#1B365D">
      <p class="text-[22px] leading-snug max-w-[620px]" style="color:#1f1d18">
        "浏览器应当先你一步去思考——并递给你一份你真想打印出来的东西。"
      </p>
      <footer class="mt-3 text-[12.5px] meta uppercase tracking-[0.16em]" style="color:#6b665b">—— NevoFlux Studio · 2026</footer>
    </blockquote>

    <!-- colophon -->
    <footer class="mt-16 pt-6 border-t rule flex items-baseline justify-between text-[11px] meta uppercase tracking-[0.18em]" style="color:#6b665b">
      <span>Set in Source Serif Pro &amp; IBM Plex Mono</span>
      <span>nevoflux.local</span>
      <span>№26 / 26</span>
    </footer>
  </div>
</body>
</html>
```

## 用法

一页编辑级 one-pager。按顺序填入各槽位，保持所有 CSS、class 名与尺寸不变——只替换可见文字。

- **顶部 folio rule**（`header`）：左侧刊名，中间卷 / 期 / 年份，右侧许可或状态。
- **kicker**（`.tag` + meta 行）：文档类型短标签，加一行定位或主题串。
- **hero 标题**（`.h1-display`）：两行写出主旨；把一个关键词包进 `.ink-blue` 斜体，作为唯一 accent。
- **lede**：一段编辑式正文（限宽 680px），引入主题。
- **3 列**：三根支柱，每根带编号 meta 标签、两行 `.display` 标题、一行正文。
- **pull quote**（`blockquote`）：一句可引用的话，带墨蓝斜体左 rule，下接署名 footer。
- **colophon**（`footer`）：字体署名、域名与收尾 folio。
- 墨蓝 `#1B365D` 始终是唯一 accent 色，不要引入第二个色相。不外链图片——占位用 paper-tint 色块加 1px ink 描边。
