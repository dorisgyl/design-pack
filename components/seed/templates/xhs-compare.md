---
slug: packs/design-pack/templates/xhs-compare
type: template
lang: en
category: xhs-card
title: "XHS Carousel · Compare (✕ / ✓)"
title_zh: "小红书图文 · 对比页（✕ / ✓）"
description: "Two-column before/after comparison: a muted '✕ most people' column and an accent-tinted '✓ pros' column, three points each. 1080×1440."
description_zh: "两栏对比：左为弱化的'✕ 多数人'，右为强调色浅底的'✓ 高手'，各三条。1080×1440。"
tags: [xhs-card, social, carousel, notion-card, 小红书图文, template]
sample_image: packs/design-pack/assets/templates/xhs-compare.png
source: design-pack/xhs-compare
---
## Design guidance

Tint only the column you want chosen; leave the other a quiet grey. Keep the two columns parallel — same number of points, same phrasing length — so the contrast itself is the message. Three points per side reads fastest.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>XHS Carousel · Compare</title>
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

  /* 对比页 (compare) — 两栏，右栏强调 */
  .h2{margin-top:46px;font-size:84px;font-weight:800;line-height:1.16;letter-spacing:-.01em;}
  .cmp{margin-top:72px;display:grid;grid-template-columns:1fr 1fr;gap:30px;}
  .col{border-radius:var(--radius);padding:48px 42px;}
  .col .ch{font-size:42px;font-weight:800;display:flex;align-items:center;gap:18px;}
  .col .ch i{font-style:normal;width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;}
  .col ul{list-style:none;margin-top:40px;display:flex;flex-direction:column;gap:34px;}
  .col li{font-size:37px;line-height:1.45;padding-left:36px;position:relative;}
  .col li::before{content:"";position:absolute;left:0;top:18px;width:16px;height:16px;border-radius:50%;}
  .bad{background:var(--panel);border:1px solid var(--line);}
  .bad .ch{color:var(--sub);} .bad .ch i{background:#f1efe9;color:var(--faint);}
  .bad li{color:#6b665d;} .bad li::before{background:var(--faint);}
  .good{background:var(--accent-soft);border:1px solid #cfe3da;}
  .good .ch{color:var(--accent);} .good .ch i{background:var(--accent);color:#fff;}
  .good li{color:#234b41;font-weight:500;} .good li::before{background:var(--accent);}
</style>
</head>
<body>
  <div class="eyebrow">Compare · skip three years of detours</div>
  <h2 class="h2">Same note-taking<br>the gap is in <span class="mark">this one step</span></h2>
  <div class="cmp">
    <div class="col bad">
      <div class="ch"><i>✕</i>Most people</div>
      <ul>
        <li>Folders by app feature</li>
        <li>Never opened again</li>
        <li>More piled up, more chaos</li>
      </ul>
    </div>
    <div class="col good">
      <div class="ch"><i>✓</i>Pros</div>
      <ul>
        <li>Sorted by "how I'll use it"</li>
        <li>Review the inbox weekly</li>
        <li>Old notes reused often</li>
      </ul>
    </div>
  </div>
  <div class="foot"><span><b>@FieldNotes</b></span><span>4 / 5</span></div>
</body>
</html>

```
