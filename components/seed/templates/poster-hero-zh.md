---
slug: packs/design-pack/templates/poster-hero-zh
type: template
lang: zh
category: poster
title: "营销海报"
title_en: "NevoFlux Launch Poster"
description: "9:16 竖版发布 / 分享海报,强视觉冲击 —— 渐变 mesh + 噪点纹理 + 二维码占位,用于宣布 NevoFlux 新版本。"
tags: [poster, 海报, 朋友圈, 模板]
sample_image: packs/design-pack/assets/templates/poster-hero.svg
source: html-anything/poster-hero
---

## 设计指导

- 竖版海报 / 朋友圈分享图,主打强视觉冲击。
- 布局:
  - 容器 `1080 × 1920`(9:16),居中,整屏渐变 / mesh 背景。
  - 上部约 30% 留白:左侧一个大写小标签,右侧一个大字符或抽象几何图形。
  - 中部主标题占据视觉中心(超大号、font-black 字重),下方配一句话副标题。
  - 信息卡片区放 3-5 条核心要点,每条为图标 + 短标题 + 一句补充说明。
  - 底部右下角放品牌 / 二维码(用内联 SVG 占位),并附一行安装命令与账号。
- 设计细节:
  - 使用大胆的色彩:多层渐变背景(暖琥珀色过渡到深紫 / 靛蓝),文字用白色,搭配一个对比色作高亮词。
  - 用 SVG 做装饰性元素(二维码),用 CSS 圆点图案做噪点 / 颗粒纹理。
  - 字体:紧凑的几何无衬线体做主标题,衬线斜体做高亮词,等宽字体做命令行。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 1.0 发布海报</title>
<style>
  body { margin:0; background:#0a0a0a; font-family:'Inter Tight','Noto Sans SC',sans-serif; display:grid; place-items:center; padding:24px 0; }
  .poster { position:relative; width:1080px; max-width:96vw; aspect-ratio:9/16; border-radius:32px; overflow:hidden; color:#fff;
    background:
      radial-gradient(ellipse at 80% 0%, rgba(233,185,74,0.55), transparent 55%),
      radial-gradient(ellipse at 20% 100%, rgba(108,58,166,0.5), transparent 55%),
      linear-gradient(135deg,#c96442 0%,#15140f 60%,#1a0e2b 100%);
    display:flex; flex-direction:column; padding:80px 70px;
    box-shadow:0 40px 120px -20px rgba(0,0,0,0.7);
  }
  .grain { position:absolute; inset:0; pointer-events:none; opacity:0.18; background-image:radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px); background-size:3px 3px; }
  .label { font-size:13px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase; opacity:0.85; }
  .glyph { width:120px; height:120px; border-radius:32px; display:grid; place-items:center; background:rgba(255,255,255,0.08); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.18); }
  h1 { font-family:'Inter Tight',sans-serif; font-weight:900; font-size:148px; line-height:0.95; letter-spacing:-0.04em; margin:0; }
  .em { font-family:Georgia, 'Noto Serif SC', serif; font-weight:700; font-style:italic; color:#e9b94a; }
  .feature { display:flex; align-items:flex-start; gap:18px; }
  .feature .ic { width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.12); display:grid; place-items:center; font-size:22px; flex-shrink:0; }
  .feature .t { font-size:22px; font-weight:600; }
  .feature .d { font-size:15px; opacity:0.7; line-height:1.55; margin-top:4px; }
  .qr { width:120px; height:120px; border-radius:14px; background:#fff; padding:12px; }
  .qr svg { width:100%; height:100%; }
</style>
</head>
<body>
<div class="poster">
  <div class="grain"></div>

  <div style="display:flex; align-items:center; justify-content:space-between">
    <div class="label">RELEASE · 2026.06</div>
    <div class="glyph">
      <div style="font-family:Georgia,serif; font-style:italic; font-size:78px; font-weight:700; color:#fff">N</div>
    </div>
  </div>

  <div style="margin:auto 0; flex:none">
    <div class="label" style="margin-bottom:24px">v1.0 · 已发布 / Now Available</div>
    <h1>Nevo<br/><span class="em">Flux</span></h1>
    <div style="font-size:30px; font-weight:500; opacity:0.92; margin-top:36px; max-width:560px; line-height:1.35">
      把任何知识变成一座<span class="em" style="color:#e9b94a">活</span>的 GBrain,<br/>
      由它自带的 agent 驱动的浏览器。
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr; gap:18px; margin:48px 0 32px">
    <div class="feature"><div class="ic">🧠</div><div><div class="t">GBrain 知识库</div><div class="d">读过的每一页都成为可检索、可关联的记忆</div></div></div>
    <div class="feature"><div class="ic">🎨</div><div><div class="t">Canvas 应用 + 设计技能</div><div class="d">一句话生成可交互工具与海报</div></div></div>
    <div class="feature"><div class="ic">🤖</div><div><div class="t">内置 agent 与 SDK</div><div class="d">自动化浏览器,用你自己的 pack 扩展它</div></div></div>
    <div class="feature"><div class="ic">📦</div><div><div class="t">装个 pack,即刻发布</div><div class="d">模板、技能与流程,粘贴即用</div></div></div>
  </div>

  <div style="display:flex; align-items:center; gap:24px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.18)">
    <div class="qr">
      <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
        <rect width="33" height="33" fill="#fff"/>
        <g fill="#0a0a0a">
          <rect x="2" y="2" width="9" height="9" fill="none" stroke="#0a0a0a" stroke-width="2"/>
          <rect x="5" y="5" width="3" height="3"/>
          <rect x="22" y="2" width="9" height="9" fill="none" stroke="#0a0a0a" stroke-width="2"/>
          <rect x="25" y="5" width="3" height="3"/>
          <rect x="2" y="22" width="9" height="9" fill="none" stroke="#0a0a0a" stroke-width="2"/>
          <rect x="5" y="25" width="3" height="3"/>
          <rect x="13" y="2" width="2" height="2"/><rect x="17" y="2" width="2" height="2"/>
          <rect x="13" y="6" width="2" height="2"/><rect x="15" y="9" width="2" height="2"/>
          <rect x="2" y="13" width="2" height="2"/><rect x="6" y="13" width="2" height="2"/>
          <rect x="13" y="13" width="2" height="2"/><rect x="17" y="13" width="2" height="2"/><rect x="21" y="13" width="2" height="2"/>
          <rect x="13" y="17" width="2" height="2"/><rect x="19" y="15" width="2" height="2"/>
          <rect x="22" y="17" width="2" height="2"/><rect x="26" y="17" width="2" height="2"/>
          <rect x="13" y="21" width="2" height="2"/><rect x="17" y="21" width="2" height="2"/>
          <rect x="22" y="22" width="2" height="2"/><rect x="26" y="26" width="2" height="2"/>
          <rect x="22" y="29" width="2" height="2"/><rect x="29" y="22" width="2" height="2"/>
        </g>
      </svg>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace; font-size:14px; opacity:0.95">$ pnpm dlx nevoflux</div>
      <div style="font-size:14px; opacity:0.7; margin-top:6px">github.com/nevoflux/nevoflux</div>
    </div>
  </div>
</div>
</body>
</html>
```

## 用法

- `.label`(左上):发布 / 日期小标签,保持简短大写。
- `.glyph`(右上):一个品牌字母或抽象标记。
- 中部区块:可用状态 `.label`、`h1` 主标题(分两行,高亮词用 `.em`),以及一句话副标题。
- `.feature` 行:3-5 条核心要点,每条含 emoji 图标 `.ic`、标题 `.t` 与补充说明 `.d` —— 替换成你自己的产品亮点。
- 底部:`.qr` SVG 占位 + 等宽安装命令 + 仓库 / 账号行。
- 完全自包含:渐变与圆点图案背景、内联 SVG 二维码,无任何外部 URL。调整渐变色标与 `--accent`(`#e9b94a`)即可换肤。
