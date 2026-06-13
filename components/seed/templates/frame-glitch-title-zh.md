---
slug: packs/design-pack/templates/frame-glitch-title-zh
type: template
lang: zh
category: video
title: "故障艺术标题帧"
title_en: "NevoFlux Glitch Title Frame"
description: "数字故障 / 像散偏移 / 数据腐败风格的单帧标题, 适合 NevoFlux 视频转场与 cyberpunk hero。"
tags: [glitch, cyberpunk, title, transition, vfx, frame, 模板]
sample_image: packs/design-pack/assets/templates/frame-glitch-title.svg
source: html-anything/frame-glitch-title
---

## 设计指导

布局
- 画布 1920x1080 (16:9)。背景用近黑 `#070708` 或 CRT 暗灰 `#0d0e10`; 叠加 56px 网格 (约 5% 透明) + 横向 scanlines 扫描线 (约 8% 透明, 2px 间隔)。
- 主标题居中, 6-9vw, 字重 800/900, 字体用 `Space Grotesk Bold` / `Inter Tight Black` / `JetBrains Mono Bold`。

主标题
- 主层颜色 `#f5f5f7`; 后面再套两层伪影:
  - cyan `#00f0ff`, translate(`-3px`, `1px`)。
  - magenta `#ff2bd6`, translate(`3px`, `-1px`)。
- 整层用 clip-path 切成 5-8 段, 每段配一个 `@keyframes`, 随机 translateX 在 -10px 到 10px 之间, 持续 80-160ms, 错峰播放, 营造 "data corruption" 像散效果。
- 每隔约 1.5s 触发一次"重故障" — 整个标题被横向 smear 一帧, 用 `filter: url(#displacementFilter)` 或简单的 CSS 平移实现。

附加层
- 顶部一行 caption (大写 mono, 11px, 透明 0.6), 例如 `>> SIGNAL_LOCKED · CH-04 · 14:32:08`。
- 标题下面一行副标 (24-28px, mono, 透明 0.7), 偶发被 `̶▒̶` 字符替换 (假乱码)。
- 四角随机点缀 `█▓▒░` ASCII 噪点 chunks。
- 底部放 timecode (mono, 透明 0.4)。
- 整画面叠一层 noise grain (`background-image: url("data:image/svg+xml,...turbulence...")`), 透明 6%, `mix-blend-mode: overlay`。

SVG 滤镜 (可选)
- 定义 `<filter id="rgbShift">`, 用 `feColorMatrix` + `feOffset` + `feMerge` 把 R/G/B 三通道偏移; 在故障瞬间对整层应用 `filter: url(#rgbShift)`。

设计细节
- 配色仅用: 黑 / 白 / cyan / magenta / 一点 amber 警告色; 严禁全彩虹。
- 字体: 西文 `Space Grotesk` 或 `JetBrains Mono` Bold; 中文 `Noto Sans Mono CJK SC` 或 `Noto Sans SC` Bold。
- 严禁 lorem ipsum; 必须用真实标题 + 副标。
- 动效用 `@keyframes`, 可被 `prefers-reduced-motion` 关闭 (退回静态 chromatic split)。
- 单文件 HTML。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 故障标题 · GBRAIN_ONLINE</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@700;900&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Space Grotesk','Noto Sans SC',sans-serif; background:#0d0e10; color:#f5f5f7; margin:0; min-height:100vh; overflow:hidden; position:relative; }
  .mono { font-family:'JetBrains Mono',monospace; }
  /* scanlines */
  body::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:3;
    background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px);
    mix-blend-mode: multiply; opacity:0.6;
  }
  /* grid */
  body::after {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:2;
    background-image: linear-gradient(rgba(0,255,180,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(0,255,180,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  /* grain */
  .grain { position:absolute; inset:0; opacity:0.1; mix-blend-mode:overlay; z-index:4; pointer-events:none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E"); }
  @keyframes glitch {
    0%, 92%, 100% { transform: translate(0,0); filter: none }
    93% { transform: translate(-6px, 1px); filter: url(#rgb) }
    94% { transform: translate(8px, -2px); filter: url(#rgb) }
    95% { transform: translate(-4px, 2px); }
    96% { transform: translate(4px, -1px); filter: url(#rgb) }
    97% { transform: translate(0,0) }
  }
  .glitch-host { position:relative; animation: glitch 4s infinite; }
  .layer { position:absolute; inset:0; mix-blend-mode:screen; }
  .layer-c { color:#00f0ff; transform: translate(-3px, 1px); }
  .layer-m { color:#ff2bd6; transform: translate(3px, -1px); }
  .vignette { position:absolute; inset:0; background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.7) 100%); z-index:5; pointer-events:none; }
  .ascii { font-family:'JetBrains Mono',monospace; letter-spacing:2px; line-height:1; }
  @media (prefers-reduced-motion: reduce) { .glitch-host { animation: none } }
</style>
</head>
<body class="flex flex-col items-center justify-center relative">

  <svg width="0" height="0" style="position:absolute">
    <defs>
      <filter id="rgb">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
        <feOffset in="SourceGraphic" dx="3" dy="0" result="r"/>
        <feOffset in="SourceGraphic" dx="-3" dy="0" result="b"/>
        <feMerge><feMergeNode in="r"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  </svg>

  <header class="absolute top-10 left-12 right-12 flex items-baseline justify-between mono text-[11px] opacity-70 z-10 tracking-[0.16em]">
    <span>&gt;&gt; GBRAIN_SYNC · 频道-04 · 14:32:08</span>
    <span>NEVOFLUX · 故障标题</span>
    <span>录制 ●</span>
  </header>

  <!-- ASCII chunks corners -->
  <pre class="ascii absolute top-24 left-12 text-[12px] opacity-30 z-10">█▓▒░ █▓▒░
▒▓█▓ ░▒▓
░▒▓█ ▓▒░░
▓▒░░ ▒▓█▓</pre>
  <pre class="ascii absolute bottom-24 right-12 text-[12px] opacity-30 z-10 text-right">█▓▒░ ▓▒░█
▒░░▓ ░▒▓█
▓▒░░ █▓▒░
░▒▓█ ▒░░▓</pre>

  <main class="relative z-10 text-center px-12">
    <div class="mono text-[14px] opacity-60 tracking-[0.22em] mb-6 uppercase">— 记忆流已上线 —</div>
    <div class="glitch-host relative inline-block">
      <h1 class="font-black tracking-[-0.02em] leading-[0.9]" style="font-size:clamp(80px,12vw,200px)">
        GBRAIN<br/>_ONLINE
      </h1>
      <h1 class="layer layer-c font-black tracking-[-0.02em] leading-[0.9]" style="font-size:clamp(80px,12vw,200px)">
        GBRAIN<br/>_ONLINE
      </h1>
      <h1 class="layer layer-m font-black tracking-[-0.02em] leading-[0.9]" style="font-size:clamp(80px,12vw,200px)">
        GBRAIN<br/>_ONLINE
      </h1>
    </div>
    <p class="mt-10 mono text-[16px] opacity-70 tracking-[0.16em]">
      04 · 知识库 · <span style="color:#ffb547">正̶̶在̷为̶你̶的̶浏̷览̶器̶建̶索̷引̶</span>
    </p>
  </main>

  <div class="grain"></div>
  <div class="vignette"></div>

  <footer class="absolute bottom-10 left-12 right-12 flex items-baseline justify-between mono text-[11px] opacity-50 z-10 tracking-[0.16em]">
    <span>NEVOFLUX / VFX</span>
    <span style="color:#ff2bd6">像散 · CYAN × MAGENTA</span>
    <span class="mono">⏵ 00:14:32:08</span>
  </footer>
</body>
</html>
```

## 用法

- `header` (顶部): 左侧状态行 (`GBRAIN_SYNC · 频道-xx · 时间码`), 中间帧标签, 右侧 `录制 ●` 指示。替换成你自己的频道与时间戳。
- 主标题: 三个 `<h1>` 必须一起改 — 主层加 cyan、magenta 两层伪影的文字必须完全一致, 否则色散会错位。示例为 `GBRAIN_ONLINE`; 换成你自己的简短两行大写标题 (例如某个 NevoFlux pack 或 Canvas 应用名)。
- 标题上方眉题 (`— 记忆流已上线 —`): 一行简短大写标语。
- 标题下方副标: 保留一段正常文字, 另一段用 amber `#ffb547` 的乱码字符包裹, 制造 "数据腐败" 效果。
- 四角的 ASCII `<pre>` chunks 与 `footer` 时间码均为装饰; 可保留作纹理, 也可按需重做。
- `.grain`、`.vignette`、网格/扫描线 `body::before`/`body::after` 以及 `#rgb` SVG 滤镜全部是纯 CSS/SVG — 无任何外部资源。动效在 `prefers-reduced-motion` 下自动关闭。
