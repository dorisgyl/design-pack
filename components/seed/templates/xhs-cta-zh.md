---
slug: packs/design-pack/templates/xhs-cta-zh
type: template
lang: zh
category: xhs-card
title: "小红书图文 · 结尾页（行动召唤）"
title_zh: "小红书图文 · 结尾页（行动召唤）"
description: "结尾页：一句温和的收束标题 + 点赞 / 收藏 / 关注三连（关注键用强调色）+ 下一篇预告。1080×1440。"
tags: [xhs-card, social, carousel, notion-card, 小红书图文, template]
sample_image: packs/design-pack/assets/templates/xhs-cta.png
source: design-pack/xhs-cta
---
## 设计说明

只要一个主行动，别要五个——强调色只给'关注'。给一个具体的回来理由（点名下一篇）。沿用封面的账号名和强调色，让最后一页收回封面打开的那个环。

## 模板（HTML）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>小红书图文 · 结尾页</title>
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

  /* 结尾页 (cta) — 行动召唤 */
  .ctawrap{height:100%;display:flex;flex-direction:column;padding-bottom:120px;}
  .h2{margin-top:130px;font-size:96px;font-weight:800;line-height:1.18;letter-spacing:-.01em;}
  .lead{margin-top:44px;font-size:42px;line-height:1.55;color:#4a463f;}
  .lead b{color:var(--ink);font-weight:700;}
  .acts{margin-top:auto;display:flex;gap:26px;}
  .acts span{flex:1;background:var(--panel);border:1px solid var(--line);border-radius:24px;
    padding:38px 0;text-align:center;font-size:38px;font-weight:700;color:var(--ink);}
  .acts span.go{background:var(--accent);color:#fff;border-color:var(--accent);}
  .acts i{font-style:normal;color:var(--accent);margin-right:14px;}
  .acts span.go i{color:#cdeee2;}
  .next{margin-top:40px;background:var(--accent-soft);border-radius:var(--radius);
    padding:38px 44px;font-size:36px;color:#234b41;line-height:1.5;}
  .next b{color:var(--accent);font-weight:800;}
</style>
</head>
<body>
  <div class="ctawrap">
    <div class="eyebrow">写在最后</div>
    <h2 class="h2">愿你的笔记<br>开始<span class="mark">复利生长</span></h2>
    <p class="lead">这套工作流，<b>抄进你的 Notion 就能用</b>。<br>觉得有用的话——</p>
    <div class="acts">
      <span><i>♡</i>点赞</span>
      <span><i>☆</i>收藏</span>
      <span class="go"><i>＋</i>关注</span>
    </div>
    <div class="next">下一篇拆解我的 <b>模板结构</b>，每周更新一次。</div>
  </div>
  <div class="foot"><span><b>@效率手账</b> · 每周更新</span><span>5 / 5</span></div>
</body>
</html>

```
