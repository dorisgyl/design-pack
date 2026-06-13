---
slug: packs/design-pack/templates/frame-data-chart-nyt
type: template
lang: en
category: video
title: "NevoFlux NYT-Style Data Chart Frame"
title_zh: "NYT 风数据图表帧"
description: "Turn one data series or a single takeaway into a New York Times-style editorial chart frame for video clips or share cards."
tags: [data, chart, nyt, editorial, frame, template]
sample_image: packs/design-pack/assets/templates/frame-data-chart-nyt.svg
source: html-anything/frame-data-chart-nyt
---

## Design guidance

Take a slice of data (CSV / JSON / a one-line conclusion) and render it as a single editorial chart frame with the feel of a New York Times column — suitable for a video segment or a tweet card.

**Canvas**: 1920×1080. Pick one of two backgrounds — warm white `#f7f5ee` or ink black `#0e0e0e`; the text color is the inverse of the background.

**Layout**

- **Top kicker** (11px, uppercase, letter-spacing 0.14em, color = accent red `#a91d1d` or mint `#5fb38a`): the data source plus category, e.g. "GBRAIN · MONTHLY KNOWLEDGE QUERIES · 2018–2026".
- **Big headline** (Source Serif Pro / Cheltenham / Playfair, ~5.6vw, optional italic subhead): a single conclusion. **The conclusion must be distilled from the data**, not a description of the chart.
- **Chart area** (occupies 55–65% of the canvas):
  - Line: 1–2 lines, main line solid ink 2.5px, secondary line dashed 1.5px; data points are 6px filled circles; key points carry a mono annotation such as `2024 · 412M` in small black text.
  - Bars: all single ink color, or one accent-highlighted bar; large number on top of each bar; italic category label (Cheltenham italic) under each bar.
  - Range band: a light gray fill `#e6e2d2` envelope with an ink center line.
- **Bottom source + footnote** (10px mono, opacity 0.6): "Source: NevoFlux telemetry · Chart by NevoFlux".
- **Staggered reveal animation**: headline fade-in (0s), kicker (200ms), line stroke-dashoffset 1.2s ease-out (400ms), data labels appearing in sequence at 100ms intervals. Must be disabled under `prefers-reduced-motion`.

**Design details**

- **Never** pull in chart.js / d3 libraries (unless via a jsDelivr CDN); prefer hand-written SVG, no more than ~80 inline lines.
- Fonts: headline `Source Serif Pro` or `Cheltenham` (fallback `Playfair Display`); body `IBM Plex Sans` or `Inter`; data labels `IBM Plex Mono`.
- One primary color (ink) plus one accent (pick from NYT red `#a91d1d` / editorial mint `#5fb38a` / warm orange `#d97757`).
- Y-axis ticks are hairlines only, with 3–4 ticks; labels sit outside the axis in mono type.
- Strictly no full-screen grid lines, no shadows, no 3D bars; strictly no emoji.
- Always use the user's data. If the input is a text conclusion, estimate reasonable coordinates automatically (but mark the chart "schematic"); if it is CSV/JSON, plot it directly.
- Single-file HTML; annotation format next to a data point: `<text class="annot">2024 · 412M</text>`.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NYT Chart · NevoFlux GBrain Queries 2018–2026</title>
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
      GBrain queries enter two parabolas <span class="nyt-red italic">after 2024</span> ——<br/>
      the first driven by the NevoFlux browser, the second by Canvas apps and the agent SDK.
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
        <text x="800" y="380" font-size="14">⤴ Inflection point</text>
        <text x="800" y="398" font-size="14">Canvas apps go mainstream</text>
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
      <span>Source · NevoFlux GBrain telemetry, 2026-05</span>
      <span>Chart by NevoFlux</span>
      <span>NYT-STYLE · FRAME-DATA-CHART-NYT</span>
    </footer>
  </article>
</body>
</html>
```

## Usage

- **Kicker**: set the data source and category in uppercase (e.g. source system, metric name, year range). Keep the right-hand `FRAME 04 · CHART` slug as the frame label.
- **Headline**: one distilled conclusion from the data, with the accent-red `<span>` highlighting the pivotal phrase. Do not describe the chart — state what it proves.
- **Chart SVG**: replace the `points` on the main `polyline` (and the matching area-band `path`, data-point circles, and accent inflection segment) with your real series. The y-axis hairlines/labels and x-axis labels are the only fixed scaffolding — adjust the tick labels to your scale.
- **Annotations**: 2–3 mono callouts next to the key inflection points in the `2024 · 310M` format; accent ones use `nyt-red-fill`.
- **Inflection callout**: a short italic serif note pointing at the turning point in the series.
- **Footer**: data source + "Chart by NevoFlux" + the template id, all 10.5px mono at low opacity.
