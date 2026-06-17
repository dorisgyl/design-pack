---
slug: packs/design-pack/templates/xhs-quote
type: template
lang: en
category: xhs-card
title: "XHS Carousel · Pull-quote"
title_zh: "小红书图文 · 金句页"
description: "A single big serif statement centred, with one highlighted phrase and an accent keyword, plus a small attribution. The 'screenshot-and-share' page. 1080×1440."
description_zh: "居中的一句大号衬线金句，含一处荧光笔短语和一个强调色关键词，配一行小注。用来被'截图转发'的页。1080×1440。"
tags: [xhs-card, social, carousel, notion-card, 小红书图文, template]
sample_image: packs/design-pack/assets/templates/xhs-quote.png
source: design-pack/xhs-quote
---
## Design guidance

Switch the display face to a serif here — it's the one page that should feel editorial, not UI. One sentence, two emphases max (a highlighter mark + an accent keyword). Everything else is whitespace. If the line needs more than two breaks to fit, it's too long.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>XHS Carousel · Quote</title>
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

  /* 金句页 (quote) — 衬线大字，留白叙事 */
  .qwrap{height:100%;display:flex;flex-direction:column;justify-content:center;padding-bottom:120px;}
  .qwrap .eyebrow{margin-bottom:96px;}
  .quote{font-family:var(--serif);font-size:104px;font-weight:600;line-height:1.4;letter-spacing:.01em;}
  .quote em{font-style:normal;color:var(--accent);}
  .src{margin-top:64px;font-size:36px;color:var(--sub);}
  .src::before{content:"";display:inline-block;width:54px;height:2px;background:var(--faint);vertical-align:middle;margin-right:22px;}
</style>
</head>
<body>
  <div class="qwrap">
    <div class="eyebrow">Pull-quote · one line to remember</div>
    <blockquote class="quote">Notes aren't a <span class="mark">warehouse</span> for the past,<br>they are an<br><em>asset</em> that compounds.</blockquote>
    <div class="src">The biggest lesson after three years of note-taking</div>
  </div>
  <div class="foot"><span><b>@FieldNotes</b></span><span>3 / 5</span></div>
</body>
</html>

```
