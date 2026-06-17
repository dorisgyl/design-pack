---
slug: packs/design-pack/templates/xhs-cover-zh
type: template
lang: zh
category: xhs-card
title: "小红书图文 · 封面（钩子）"
title_zh: "小红书图文 · 封面（钩子）"
description: "小红书干货轮播的封面页：超大钩子标题（仅一处荧光笔强调）+ 眉标 + 一句承诺 + 收藏提示——1080×1440，Notion 卡片风。"
tags: [xhs-card, social, carousel, notion-card, 小红书图文, template]
sample_image: packs/design-pack/assets/templates/xhs-cover.png
source: design-pack/xhs-cover
---
## 设计说明

封面决定点不点开。只放一个观点、做到极大，只给最关键的一个词上荧光笔。在这里锁定视觉母版（共享的 `:root` 块——底色 / 墨色 / 单一强调色 / 字体）；后面每一页逐字照抄，整组才像一套。换文案、不换结构；永远不要加第二个强调色。

## 模板（HTML）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>小红书图文 · 封面</title>
<style>
  /* ===== 视觉母版 (master) — 5 张卡逐字相同，design-build 跨页盖章 ===== */
  :root{
    --w:1080px; --h:1440px;
    --paper:#FCFCFB; --panel:#FFFFFF;
    --ink:#1E1B16; --sub:#8A847A; --faint:#B7B1A6; --line:#EDEAE2;
    --accent:#15705C; --accent-soft:#E6F0EC; --mark:#FCE39A;
    --pad:92px; --radius:28px;
    --sans:"PingFang SC","Microsoft YaHei","Hiragino Sans GB","Source Han Sans SC","Noto Sans CJK SC",sans-serif;
    --serif:"Songti SC","Source Han Serif SC","SimSun",serif;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{width:var(--w);height:var(--h);}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);
    padding:var(--pad);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;}
  .eyebrow{display:inline-flex;align-items:center;gap:18px;font-size:27px;font-weight:700;letter-spacing:.1em;color:var(--accent);}
  .eyebrow::before{content:"";width:48px;height:4px;background:var(--accent);border-radius:2px;}
  .mark{background:linear-gradient(180deg,transparent 54%,var(--mark) 54%,var(--mark) 93%,transparent 93%);padding:0 .06em;}
  .foot{position:absolute;left:var(--pad);right:var(--pad);bottom:60px;display:flex;justify-content:space-between;align-items:center;font-size:25px;color:var(--sub);border-top:1px solid var(--line);padding-top:28px;}
  .foot b{color:var(--ink);font-weight:600;}
  /* ===== 母版结束 ===== */

  /* 封面 (cover) */
  .cover{height:100%;display:flex;flex-direction:column;}
  .hero{margin-top:118px;font-size:142px;font-weight:800;line-height:1.1;letter-spacing:-.02em;}
  .dek{margin-top:54px;font-size:44px;font-weight:500;line-height:1.5;color:#4a463f;}
  .dek b{color:var(--ink);font-weight:700;}
  .tag{margin-top:auto;margin-bottom:150px;align-self:flex-start;
    background:var(--accent-soft);color:var(--accent);font-size:30px;font-weight:700;
    padding:18px 34px;border-radius:999px;}
</style>
</head>
<body>
  <div class="cover">
    <div class="eyebrow">效率手账 · 干货合集</div>
    <h1 class="hero">把笔记<br>用出<span class="mark">复利效应</span></h1>
    <p class="dek">5 个 Notion 工作流<br>让过去的你，<b>帮现在的你省力</b></p>
    <div class="tag">收藏 ↗ 反复用得上</div>
  </div>
  <div class="foot"><span><b>@效率手账</b></span><span>1 / 5</span></div>
</body>
</html>

```
