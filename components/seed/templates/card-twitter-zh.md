---
slug: packs/design-pack/templates/card-twitter-zh
type: template
lang: zh
category: card
title: "Twitter 分享卡"
title_en: "NevoFlux Twitter Share Card"
description: "16:9 暗色金句 / 数据卡，截图即可直接配推文发出。"
tags: [twitter, x, quote, 金句, 模板]
sample_image: packs/design-pack/assets/templates/card-twitter.svg
source: html-anything/card-twitter
---

## 设计指导

布局
- 容器 `w-[1600px] h-[900px]`（16:9），暗色 / 亮色二选一，根据内容情绪决定。
- 中央一句 hero 金句（`text-6xl`，`font-semibold`，限 2-3 行）。
- 下方作者署名 + 头像占位 + handle。
- 左上角小标签（类型："Insight" / "Data" / "Quote"）。
- 右下角品牌水印。

设计细节
- 整张卡片有微妙的纹理（grid 网格 / noise / dot pattern）。
- 内容背后加一层柔和的渐变光晕营造层次，透明度压低以保证文字清晰。
- 截图后可直接配推文发出，视觉简洁有力。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>Twitter 分享卡 · 金句</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700;800&family=Noto+Serif+SC:wght@500;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  body { margin:0; background:#0a0a0a; font-family:'Inter Tight','Noto Sans SC',sans-serif; min-height:100vh; display:grid; place-items:center; padding:24px; }
  .card { width:1600px; max-width:96vw; aspect-ratio:16/9; border-radius:24px; overflow:hidden; position:relative;
    background:#15140f; color:#fafaf7; padding:80px; display:flex; flex-direction:column; justify-content:space-between;
    box-shadow:0 40px 100px -20px rgba(0,0,0,0.7);
  }
  .grid-pattern { position:absolute; inset:0; opacity:0.06; background-image:linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px); background-size:48px 48px; }
  .glow { position:absolute; width:680px; height:680px; border-radius:50%; filter:blur(140px); opacity:0.55; }
  .g1 { background:#c96442; top:-180px; left:-180px; }
  .g2 { background:#e9b94a; bottom:-260px; right:-200px; }
  .header { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .tag { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:999px; background:rgba(233,185,74,0.14); color:#e9b94a; font-size:13px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; border:1px solid rgba(233,185,74,0.25); }
  .quote { font-family:'Noto Serif SC',serif; font-size:96px; line-height:1.18; font-weight:700; letter-spacing:-0.02em; max-width:24ch; position:relative; z-index:2; margin-top:auto; margin-bottom:auto; }
  .quote .em { font-style:italic; color:#e9b94a; }
  .quote::before { content:"" "" "; font-family:Georgia,serif; font-size:140px; color:#e9b94a; position:absolute; top:-60px; left:-60px; opacity:0.3; line-height:1; }
  .footer { display:flex; align-items:center; justify-content:space-between; position:relative; z-index:2; }
  .author { display:flex; align-items:center; gap:16px; }
  .avatar { width:56px; height:56px; border-radius:999px; background:linear-gradient(135deg,#c96442,#e9b94a); display:grid; place-items:center; font-family:Georgia,serif; font-style:italic; font-size:28px; font-weight:700; color:#fff; }
  .brand { display:flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:13px; opacity:0.55; }
  .brand .glyph { width:24px; height:24px; border-radius:6px; border:1px solid rgba(255,255,255,0.4); display:grid; place-items:center; font-family:Georgia,serif; font-style:italic; font-size:13px; font-weight:600; }
</style>
</head>
<body>
<div class="card">
  <div class="grid-pattern"></div>
  <div class="glow g1"></div>
  <div class="glow g2"></div>

  <div class="header">
    <div class="tag">✦ Quote</div>
    <div class="brand"><div class="glyph">N</div>NevoFlux</div>
  </div>

  <div class="quote">
    浏览器只记得<span class="em">网址</span>，<br/>
    NevoFlux 记得你<span class="em">想做什么</span>。
  </div>

  <div class="footer">
    <div class="author">
      <div class="avatar">N</div>
      <div>
        <div style="font-size:18px; font-weight:600">Nova Reed</div>
        <div style="font-size:14px; opacity:0.55">@novareed · 在浏览器里造 GBrain 知识库的人</div>
      </div>
    </div>
    <div style="font-size:13px; opacity:0.45; font-family:'JetBrains Mono',monospace">2026.05</div>
  </div>
</div>
</body>
</html>
```

## 用法

- `tag`（左上角）：卡片类型。在 "Quote" / "Insight" / "Data" 之间切换标签和图标。
- `brand`（右上角）：水印图标与产品名，这里是 NevoFlux 的 "N"。
- `quote`：hero 金句，最多 2-3 行。想强调的词用 `<span class="em">` 包裹即可套上高亮色。
- `author`：头像首字母、显示名、handle 及一句话简介。
- `footer` 日期：右下角的简短发布时间戳。
- 两个 `.glow` 光斑与 `.grid-pattern` 均为纯 CSS，保留以营造纹理与层次。
