---
slug: packs/design-pack/templates/xhs-cover
type: template
lang: en
category: xhs-card
title: "XHS Carousel · Cover (hook)"
title_zh: "小红书图文 · 封面（钩子）"
description: "Opening cover for a 小红书 knowledge carousel: an oversized hook headline with a single highlighter mark, an eyebrow label, a one-line promise, and a save prompt — 1080×1440, Notion-card style."
description_zh: "小红书干货轮播的封面页：超大钩子标题（仅一处荧光笔强调）+ 眉标 + 一句承诺 + 收藏提示——1080×1440，Notion 卡片风。"
tags: [xhs-card, social, carousel, notion-card, 小红书图文, template]
sample_image: packs/design-pack/assets/templates/xhs-cover.png
source: design-pack/xhs-cover
---
## Design guidance

The cover earns the tap. Keep one idea, set it huge, and highlight only the single payoff word. Lock the visual master here (the shared `:root` block — bg / ink / one accent / type); every later page copies it verbatim so the set reads as one carousel. Swap the copy, keep the structure; never add a second accent colour.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>XHS Carousel · Cover</title>
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
    <div class="eyebrow">Productivity · Field Notes</div>
    <h1 class="hero">Make your<br>notes <span class="mark">compound</span></h1>
    <p class="dek">5 Notion workflows<br>so past-you <b>does the heavy lifting</b></p>
    <div class="tag">Save ↗ you'll reuse it</div>
  </div>
  <div class="foot"><span><b>@FieldNotes</b></span><span>1 / 5</span></div>
</body>
</html>

```
