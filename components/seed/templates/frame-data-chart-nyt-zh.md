---
slug: packs/design-pack/templates/frame-data-chart-nyt-zh
type: template
lang: zh
category: video
title: "NYT 风数据图表帧"
title_en: "NevoFlux NYT-Style Data Chart Frame"
description: "把一段数据或一句结论做成《纽约时报》专栏感的单帧编辑级图表,适合视频片段或分享卡。"
tags: [data, chart, nyt, editorial, frame, 模板]
sample_image: packs/design-pack/assets/templates/frame-data-chart-nyt.svg
source: html-anything/frame-data-chart-nyt
---

## 设计指导

把一段数据(CSV / JSON / 一句结论)做成《纽约时报》专栏感的单帧/动画图表,适合视频片段或推特卡。

**画布**:1920×1080,暖白底 `#f7f5ee` 或墨黑底 `#0e0e0e` 二选一;文字色和背景相反。

**布局**

- **顶部 kicker**(11px uppercase letterspace 0.14em,颜色 = accent 红 `#a91d1d` 或 mint `#5fb38a`):数据来源 + 类目,如 "GBRAIN · MONTHLY KNOWLEDGE QUERIES · 2018–2026"。
- **大字标题**(Source Serif Pro / Cheltenham / Playfair,5.6vw,italic 副标可选):一句结论。**结论必须从数据中提炼**,不是描述图。
- **图表区**(占画布 55–65%):
  - 折线:1–2 条线,主线 ink 实心 2.5px,次线 dashed 1.5px;数据点用 6px 实心圆;关键点旁标注 `2024 · 412M` 黑色 mono 小字。
  - 柱状:全部 ink 单色或加 1 道 accent 高亮柱;柱顶大数字;柱底类目斜体(Cheltenham italic)。
  - 范围带(range band):浅灰填充 `#e6e2d2` 包络 + 中线 ink。
- **底部 source + footnote**(10px mono,opacity 0.6):"Source:NevoFlux 遥测数据 · Chart by NevoFlux"。
- **错峰揭示动画**:标题 fade-in(0s),kicker(200ms),折线 stroke-dashoffset 1.2s ease-out(400ms),数据标签依次 100ms 间隔。可被 `prefers-reduced-motion` 关闭。

**设计细节**

- **绝不**:使用 chart.js / d3 库(除非 jsdelivr CDN 引入);推荐手写 SVG,不超过 80 行 inline。
- 字体:标题 `Source Serif Pro` 或 `Cheltenham`(无则用 `Playfair Display`);body `IBM Plex Sans` 或 `Inter`;数据标签 `IBM Plex Mono`。
- 1 个主色(ink)+ 1 个 accent(NYT red `#a91d1d` / 编辑 mint `#5fb38a` / 暖橙 `#d97757` 三选一)。
- Y 轴刻度仅 hairline + 3–4 个 tick,标签在轴外侧 mono 字。
- 严禁 grid 全屏铺线、阴影、3D 立体柱;严禁 emoji。
- 必须用用户提供的数据。如果输入是文本结论,自动估算合理坐标(但要标注 "schematic");如果是 CSV/JSON,直接绘制。
- 单文件 HTML;数据点旁注释格式:`<text class="annot">2024 · 412M</text>`。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NYT Chart · NevoFlux GBrain 知识查询 2018–2026</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  body { font-family:'IBM Plex Sans','Noto Sans SC',system-ui,sans-serif; background:#f7f5ee; color:#1a1a1a; margin:0; }
  .serif { font-family:'Source Serif Pro',Georgia,serif; }
  .mono { font-family:'IBM Plex Mono',ui-monospace,monospace; }
  .nyt-red { color:#a91d1d; }
  .nyt-red-fill { fill:#a91d1d; }
  .kicker { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; }
  @keyframes draw { from { stroke-dashoffset: 1000 } to { stroke-dashoffset: 0 } }
  .line { stroke-dasharray:1000; animation: draw 1.4s ease-out forwards; animation-delay: .4s; opacity:0; animation-fill-mode: forwards; }
  .line { animation: draw 1.4s ease-out .4s forwards, fadeIn .1s linear .4s forwards; }
  @keyframes fadeIn { to { opacity:1 } }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-12">
  <article class="w-[1280px] max-w-full">
    <header class="flex items-baseline justify-between">
      <div class="kicker nyt-red font-semibold">GBRAIN · MONTHLY KNOWLEDGE QUERIES · 2018–2026</div>
      <div class="kicker opacity-60 mono">FRAME 04 · CHART</div>
    </header>

    <h1 class="serif mt-3 leading-[1.05] font-medium" style="font-size:clamp(36px,4.4vw,68px)">
      GBrain 知识查询量在 <span class="nyt-red italic">2024 之后</span> 进入两段抛物线 ——<br/>
      第一段由 NevoFlux 浏览器推动,第二段由 Canvas 应用与 agent SDK 普及。
    </h1>

    <!-- chart -->
    <svg viewBox="0 0 1100 460" class="mt-8 w-full">
      <!-- y axis hairlines -->
      <g stroke="#1a1a1a" stroke-width="0.5" opacity="0.25">
        <line x1="60" y1="60" x2="1040" y2="60"/>
        <line x1="60" y1="180" x2="1040" y2="180"/>
        <line x1="60" y1="300" x2="1040" y2="300"/>
        <line x1="60" y1="420" x2="1040" y2="420"/>
      </g>
      <!-- y labels -->
      <g class="mono" font-size="11" fill="#1a1a1a" opacity="0.6">
        <text x="20" y="64">640M</text>
        <text x="20" y="184">420M</text>
        <text x="20" y="304">210M</text>
        <text x="20" y="424">0</text>
      </g>
      <!-- area band -->
      <path d="M 60 410 L 180 405 L 300 395 L 420 380 L 540 355 L 660 320 L 780 270 L 900 195 L 1020 90 L 1020 420 L 60 420 Z" fill="#a91d1d" opacity="0.06"/>
      <!-- main line -->
      <polyline class="line" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"
        points="60,410 180,405 300,395 420,380 540,355 660,320 780,270 900,195 1020,90" />
      <!-- accent inflection -->
      <polyline fill="none" stroke="#a91d1d" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="6 5"
        points="780,270 900,195 1020,90" />
      <!-- data points -->
      <g>
        <circle cx="60" cy="410" r="4" fill="#1a1a1a"/>
        <circle cx="180" cy="405" r="4" fill="#1a1a1a"/>
        <circle cx="300" cy="395" r="4" fill="#1a1a1a"/>
        <circle cx="420" cy="380" r="4" fill="#1a1a1a"/>
        <circle cx="540" cy="355" r="4" fill="#1a1a1a"/>
        <circle cx="660" cy="320" r="4" fill="#1a1a1a"/>
        <circle cx="780" cy="270" r="6" class="nyt-red-fill"/>
        <circle cx="900" cy="195" r="6" class="nyt-red-fill"/>
        <circle cx="1020" cy="90" r="6" class="nyt-red-fill"/>
      </g>
      <!-- annotations -->
      <g class="mono" font-size="11" fill="#1a1a1a">
        <text x="784" y="250">2024 · 310M</text>
        <text x="894" y="175" class="nyt-red-fill">2025 · 468M</text>
        <text x="1010" y="70" class="nyt-red-fill" text-anchor="end">2026 · 640M</text>
      </g>
      <!-- inflection callout -->
      <g class="serif" font-style="italic" fill="#a91d1d">
        <text x="800" y="380" font-size="14">⤴ 拐点</text>
        <text x="800" y="398" font-size="14">Canvas 应用普及</text>
      </g>
      <!-- x labels -->
      <g class="mono" font-size="11" fill="#1a1a1a" opacity="0.6">
        <text x="60" y="445" text-anchor="middle">'18</text>
        <text x="180" y="445" text-anchor="middle">'19</text>
        <text x="300" y="445" text-anchor="middle">'20</text>
        <text x="420" y="445" text-anchor="middle">'21</text>
        <text x="540" y="445" text-anchor="middle">'22</text>
        <text x="660" y="445" text-anchor="middle">'23</text>
        <text x="780" y="445" text-anchor="middle">'24</text>
        <text x="900" y="445" text-anchor="middle">'25</text>
        <text x="1020" y="445" text-anchor="middle">'26</text>
      </g>
    </svg>

    <footer class="mt-3 flex items-baseline justify-between mono text-[10.5px] opacity-60">
      <span>Source · NevoFlux GBrain 遥测数据, 2026-05</span>
      <span>Chart by NevoFlux</span>
      <span>NYT-STYLE · FRAME-DATA-CHART-NYT</span>
    </footer>
  </article>
</body>
</html>
```

## 用法

- **kicker**:用大写填数据来源与类目(来源系统、指标名、年份区间)。右侧 `FRAME 04 · CHART` 保留为帧标识。
- **标题**:从数据中提炼一句结论,用 accent 红 `<span>` 高亮关键短语。不要描述图,而要说明它证明了什么。
- **图表 SVG**:把主 `polyline` 的 `points`(以及配套的面积带 `path`、数据点 circle、accent 拐点段)替换为真实序列。Y 轴 hairline/标签与 X 轴标签是仅有的固定骨架,刻度标签按你的量纲调整。
- **标注**:在关键拐点旁放 2–3 个 mono 注释,格式为 `2024 · 310M`;accent 注释用 `nyt-red-fill`。
- **拐点说明**:一行斜体衬线小字,指向序列的转折点。
- **页脚**:数据来源 + "Chart by NevoFlux" + 模板 id,均为 10.5px mono 低透明度。
