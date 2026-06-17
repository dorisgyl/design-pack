---
slug: packs/design-pack/templates/xhs-content
type: template
lang: en
category: xhs-card
title: "XHS Carousel · Content (steps / list)"
title_zh: "小红书图文 · 内容页（步骤 / 清单）"
description: "Interior content page: a section title, a numbered step list as Notion-style blocks, and one tinted callout for the takeaway. 1080×1440."
description_zh: "内页内容页：小标题 + Notion 块式编号步骤清单 + 一个浅底提示块收尾。1080×1440。"
tags: [xhs-card, social, carousel, notion-card, 小红书图文, template]
sample_image: packs/design-pack/assets/templates/xhs-content.png
source: design-pack/xhs-content
---
## Design guidance

Use for the 'how' pages. Numbers are for real sequences only — if the items aren't ordered, use plain bullets. Three to four blocks max per page; push overflow to the next page rather than shrinking type. The callout carries the one sentence a reader should screenshot.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>XHS Carousel · Content</title>
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

  /* 内容页 (content) — 步骤清单 + 提示块 */
  .h2{margin-top:46px;font-size:84px;font-weight:800;line-height:1.16;letter-spacing:-.01em;}
  .blocks{list-style:none;margin-top:68px;display:flex;flex-direction:column;gap:44px;}
  .blocks li{display:flex;gap:34px;align-items:flex-start;}
  .blocks .k{flex:0 0 76px;height:76px;border-radius:20px;background:var(--accent-soft);color:var(--accent);
    font-size:38px;font-weight:800;display:flex;align-items:center;justify-content:center;}
  .blocks b{display:block;font-size:46px;font-weight:700;line-height:1.3;}
  .blocks p{margin-top:10px;font-size:36px;line-height:1.55;color:#5b564e;}
  .callout{margin-top:64px;display:flex;gap:28px;align-items:flex-start;
    background:var(--panel);border:1px solid var(--line);border-left:8px solid var(--accent);
    border-radius:var(--radius);padding:44px 46px;box-shadow:0 18px 40px -28px rgba(30,27,22,.4);}
  .callout .ico{font-size:44px;color:var(--accent);line-height:1.1;}
  .callout p{font-size:38px;line-height:1.5;color:#3f3b35;}
  .callout b{color:var(--ink);font-weight:700;}
</style>
</head>
<body>
  <div class="eyebrow">Workflow 01 · Capture</div>
  <h2 class="h2">10 minutes a day<br>to empty your <span class="mark">inbox</span></h2>
  <ul class="blocks">
    <li><span class="k">1</span><div><b>Capture first, sort later</b><p>Everything lands in one inbox first — zero friction, so it actually gets written down.</p></div></li>
    <li><span class="k">2</span><div><b>Empty it at a set time</b><p>On your commute, file each scrap into its project — ten minutes to hit zero.</p></div></li>
    <li><span class="k">3</span><div><b>Filing is reviewing</b><p>The act of sorting is itself a low-cost review.</p></div></li>
  </ul>
  <div class="callout"><span class="ico">✦</span><p>It's not about capturing more — it's about <b>clearing to zero daily</b> — so the inbox stays trustworthy.</p></div>
  <div class="foot"><span><b>@FieldNotes</b></span><span>2 / 5</span></div>
</body>
</html>

```
