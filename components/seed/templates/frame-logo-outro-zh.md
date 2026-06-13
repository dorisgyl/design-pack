---
slug: packs/design-pack/templates/frame-logo-outro-zh
type: template
lang: zh
category: video
title: "品牌 Logo 收尾帧"
title_en: "NevoFlux Logo Outro Frame"
description: "视频片尾收尾帧：几何块拼装 NevoFlux logo + glow bloom + 品牌名 / tagline / CTA 揭示。"
tags: [logo, outro, branding, end-card, frame, 模板]
sample_image: packs/design-pack/assets/templates/frame-logo-outro.svg
source: html-anything/frame-logo-outro
---

## 设计指导

意图
- 视频结尾的品牌 reveal 帧：logo 分块拼装 + glow bloom + tagline 上浮 + CTA。整帧做成一次性 freeze（不 loop），是观众看到的最后一画面。

画布
- 1920x1080（16:9），黑色 `#08090c` 或品牌深色背景；加微妙 vignette `radial-gradient(...)` 让中心更亮。

布局
- 中心 Logo：用纯 CSS / 内联 SVG 绘制，由 4-8 个几何块（圆 / 方 / 三角 / hairline）组成。
  - 入场动画：每个块从屏幕外滑入（±100px 不同方向）+ scale 1.4 -> 1.0 + opacity 0 -> 1，错峰约 80ms；总时长约 1.2s。
  - 入场完成后，整个 logo 加 glow bloom（`filter: drop-shadow(0 0 24px <accent>40)`）；同时一道 shimmer `mask-image` 横扫 logo（约 500ms）。
- 品牌名：logo 下方 6-8% 位置，大字（Inter Tight / SF Pro Display，48-72px，weight 700，letter-spacing -0.02em），入场为 typewriter 或 fade-up，在 logo bloom 之后（约 1.4s）开始。
- Tagline：品牌名下方一行（24-28px，weight 400，opacity 0.7），约 1.8s fade in。
- 底部 CTA + 元数据：双行底部 row，例如 `nevoflux.dev - @nevoflux - 2026`，11px uppercase，letter-spacing 0.16em，颜色 opacity 约 0.4，hairline 分隔。

调色 - 4 选 1，不混用
- Midnight Indigo - bg `#08090c`，accent `#7c5cff`（霓虹紫蓝 glow）。[本帧采用]
- Solar Amber - bg `#0e0a08`，accent `#ffb547`（暖琥珀）。
- Forest Mint - bg `#0a1410`，accent `#5fb38a`（薄荷绿）。
- Bone & Ink - bg `#f1efea`，accent `#0a0a0b`（无 neon，走 editorial 风，glow 改成阴影）。

设计细节
- 绝不用外链 logo 图片；logo 必须用纯 CSS / 内联 SVG 几何绘制。
- 入场动画用 `@keyframes` + `animation-delay`；可被 `prefers-reduced-motion` 关闭。
- 字体：西文 `Inter Tight` / `SF Pro Display` / `Manrope`；中文 `Noto Sans SC` weight 700。
- 必须用用户提供的品牌名 + tagline；若没有，跑 fallback "NevoFlux" / "记得你想做什么的浏览器"。
- 单文件 HTML；整个动画完成后 freeze（不要 loop，这是视频结尾帧）。
- 顶部可选 5px ribbon（accent 色）增加品牌识别。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>Logo Outro · NevoFlux</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;800;900&family=Inter:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body {
    font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif;
    background: radial-gradient(circle at 50% 45%, #1a1535 0%, #08090c 70%);
    color:#f5f5f7;
    margin:0;
    min-height:100vh;
    overflow:hidden;
  }
  .accent { color:#7c5cff; }
  .ribbon { background:#7c5cff; }
  @keyframes pieceIn { 0% { opacity:0; transform: scale(1.4) translate(var(--dx, 0), var(--dy, 0)) } 100% { opacity:1; transform: scale(1) translate(0,0) } }
  @keyframes glow { from { filter: drop-shadow(0 0 0 transparent) } to { filter: drop-shadow(0 0 32px rgba(124,92,255,0.6)) } }
  .piece { animation: pieceIn 1s cubic-bezier(.34,1.56,.64,1) both; }
  .piece:nth-child(1){--dx:-80px;--dy:-40px;animation-delay:0s}
  .piece:nth-child(2){--dx:60px;--dy:-50px;animation-delay:.08s}
  .piece:nth-child(3){--dx:-40px;--dy:50px;animation-delay:.16s}
  .piece:nth-child(4){--dx:70px;--dy:40px;animation-delay:.24s}
  .piece:nth-child(5){--dx:0;--dy:-70px;animation-delay:.32s}
  .logo-wrap { animation: glow .8s ease-out 1.1s both; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: translateY(0) } }
  .brand { animation: fadeUp .8s ease-out 1.4s both; }
  .tagline { animation: fadeUp .8s ease-out 1.7s both; }
  .meta { animation: fadeUp .6s ease-out 2.1s both; }
  /* shimmer */
  @keyframes shimmer { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
  .shimmer {
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%);
    background-size: 200% 100%;
    -webkit-background-clip:text; background-clip:text; color:transparent;
    animation: shimmer 1.8s ease-out 1.9s 1 both;
  }
</style>
</head>
<body class="flex flex-col items-center justify-center relative">
  <div class="ribbon absolute top-0 left-0 right-0" style="height:4px"></div>

  <!-- logo -->
  <div class="logo-wrap relative" style="width:140px;height:140px">
    <svg viewBox="0 0 140 140" class="absolute inset-0">
      <!-- 5 个几何块拼出 "N" -->
      <rect class="piece" x="20" y="20" width="20" height="100" fill="#7c5cff"/>
      <rect class="piece" x="100" y="20" width="20" height="100" fill="#7c5cff"/>
      <rect class="piece" x="32" y="20" width="20" height="80" fill="#f5f5f7" transform="rotate(-32 42 60)"/>
      <circle class="piece" cx="30" cy="20" r="10" fill="#7c5cff"/>
      <circle class="piece" cx="110" cy="120" r="10" fill="#f5f5f7"/>
    </svg>
  </div>

  <!-- brand -->
  <h1 class="brand mt-10 font-black tracking-[-0.02em] leading-[0.95]" style="font-size:84px">
    <span class="shimmer">NevoFlux</span>
  </h1>

  <!-- tagline -->
  <p class="tagline mt-4 text-[24px] opacity-70 font-medium">
    记得你<em class="not-italic accent">想做什么</em>的浏览器
  </p>

  <!-- CTA / meta -->
  <div class="meta mt-12 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] opacity-50">
    <span>nevoflux.dev</span>
    <span class="opacity-40">·</span>
    <span>@nevoflux</span>
    <span class="opacity-40">·</span>
    <span>2026</span>
  </div>

  <!-- corner timecode -->
  <div class="absolute bottom-8 right-12 text-[10px] font-mono opacity-30 uppercase tracking-[0.18em]">END · 00:03:21</div>
  <div class="absolute bottom-8 left-12 text-[10px] font-mono opacity-30 uppercase tracking-[0.18em]">FRAME · LOGO-OUTRO</div>
</body>
</html>
```

## 用法

- ribbon：顶部 4px accent 色条；按所选调色板换色。
- logo（`.logo-wrap` SVG）：替换 5 个 `.piece` 形状拼出你的标记，它们按 `:nth-child` 延迟依次入场。保持纯 SVG，绝不用外链图片。
- brand（`.shimmer`）：产品名，这里是 "NevoFlux"。shimmer 横扫在 logo bloom 之后跑一次。
- tagline：品牌名下方一行；想强调的词用 `<em class="not-italic accent">` 包裹即可套上 accent 高亮色。
- meta：底部 CTA 行 - 域名、handle、年份。编辑这三个 span 即可。
- corner timecode：两个 `font-mono` 角标（"END · 00:03:21" 与 "FRAME · LOGO-OUTRO"）营造视频帧氛围，可调整或删除。
- 整段动画完成后 freeze（不 loop），因为这是结尾帧；若加上 `prefers-reduced-motion` 媒体查询，入场动画会被尊重关闭。
