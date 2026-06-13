---
slug: packs/design-pack/templates/card-xiaohongshu-zh
type: template
lang: zh
category: card
title: "小红书图文卡片"
title_en: "Xiaohongshu Card (NevoFlux Carousel)"
description: "小红书风格的可滑动知识卡片合集, 适合把 NevoFlux 干货截图发小红书 / 朋友圈。"
tags: [xhs, 小红书, carousel, 图文, 模板]
sample_image: packs/design-pack/assets/templates/card-xiaohongshu.svg
source: html-anything/card-xiaohongshu
---

## 设计指导

布局
- 输出 N 张连续卡片, 每张 `width:1080px`、`3/4` 比例, 用 flex 纵向排列, 方便整体截图也方便单张截图。N 由内容信息量决定: 短内容 3-6 张起步, 长内容应更多 (小红书单帖最多 18 图, 通常 9 张以内最佳); 一张卡只承载一个核心观点。
- 第一张是封面: 巨大的标题 + 1 行副标题 + 一个吸引人的标签 (类似 "建议收藏" / "干货预警")。
- 中间几张展开正文, 每张一个核心观点, 配 emoji + 短句 + 1-2 个例子。
- 最后一张是总结 + 行动号召 (关注 / 收藏 / 评论)。

设计细节
- 配色: 选择柔和的莫兰迪色或粉色系; 元素圆润, 大量留白。
- 字号大、行距宽、对比强 (小红书在手机上看, 小字根本看不清)。
- 每张卡片右下角小水印 (作者名 / 日期)。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>5 个让 NevoFlux 用得更顺手的小习惯</title>
<style>
  body { margin:0; background:#f3eee5; font-family:'Noto Sans SC',sans-serif; padding:36px 0; -webkit-font-smoothing:antialiased; }
  .deck { display:flex; flex-direction:column; align-items:center; gap:24px; }
  .card { width:1080px; max-width:96vw; aspect-ratio:3/4; border-radius:32px; overflow:hidden; position:relative; padding:80px 64px; display:flex; flex-direction:column; box-shadow:0 24px 60px -20px rgba(0,0,0,0.18); }
  .c1 { background:linear-gradient(160deg,#f7d2c2 0%,#f3a98a 100%); color:#3a1d10; }
  .c2 { background:linear-gradient(160deg,#fff7e6 0%,#ffe4b8 100%); color:#3a2e10; }
  .c3 { background:linear-gradient(160deg,#e8f0e3 0%,#bcd6b3 100%); color:#1f3a1f; }
  .c4 { background:linear-gradient(160deg,#e7e8f5 0%,#bec1e8 100%); color:#1d1f4a; }
  .c5 { background:linear-gradient(160deg,#fce7f0 0%,#f5b3ce 100%); color:#4a1b34; }
  .c6 { background:linear-gradient(160deg,#fff8e1 0%,#f7c99b 100%); color:#3a2210; }
  .c7 { background:linear-gradient(160deg,#15140f 0%,#3a2620 100%); color:#fafaf7; }
  .badge { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:999px; background:rgba(255,255,255,0.55); backdrop-filter:blur(8px); font-size:18px; font-weight:600; align-self:flex-start; }
  .num { font-family:Georgia, serif; font-style:italic; font-size:120px; font-weight:700; line-height:0.9; opacity:0.85; margin-bottom:24px; }
  h2 { font-size:64px; font-weight:900; line-height:1.1; letter-spacing:-0.01em; margin:0 0 32px; }
  .body { font-size:30px; font-weight:500; line-height:1.55; opacity:0.85; max-width:24ch; }
  .watermark { position:absolute; bottom:32px; right:36px; font-size:16px; opacity:0.55; font-weight:500; }
  .pageno { position:absolute; top:36px; right:44px; font-family:'Inter',sans-serif; font-size:18px; font-weight:600; opacity:0.45; letter-spacing:0.08em; }
  .hero { font-size:120px; font-weight:900; line-height:1.0; letter-spacing:-0.025em; margin:0; }
</style>
</head>
<body>
<div class="deck">

  <div class="card c1">
    <div class="pageno">01 / 07</div>
    <div class="badge">⚡ 建议收藏 · 干货预警</div>
    <div style="margin:auto 0">
      <div style="font-size:24px; font-weight:600; opacity:0.7; margin-bottom:18px">NevoFlux 重度用户 · 必看</div>
      <h2 class="hero">5 个让<br/>NevoFlux<br/>更顺手的<br/><span style="color:#9c2a25">小习惯</span></h2>
    </div>
    <div style="font-size:22px; opacity:0.65; font-weight:500">滑动看 →</div>
    <div class="watermark">@NevoFlux · 5/11</div>
  </div>

  <div class="card c2">
    <div class="pageno">02 / 07</div>
    <div class="num">01</div>
    <h2>先喂<br/>GBrain</h2>
    <p class="body">提问前, 先把资料丢进 <strong>GBrain</strong> 知识库。有依据的回答, 胜过花哨的 prompt。</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c3">
    <div class="pageno">03 / 07</div>
    <div class="num">02</div>
    <h2>让 agent 看见<br/>你的格式</h2>
    <p class="body">贴 markdown / CSV 之前, 先告诉它 <strong>"按 X 这套 pack 的风格输出"</strong>。<br/><br/>给一个具体的设计 skill, 比 50 个形容词管用。</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c4">
    <div class="pageno">04 / 07</div>
    <div class="num">03</div>
    <h2>用 pack,<br/>别每次重写</h2>
    <p class="body">把好用的流程存成 Canvas 应用。NevoFlux 直接选 pack 就行 ——<br/><br/><strong>世界级设计 system</strong> 现成的。</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c5">
    <div class="pageno">05 / 07</div>
    <div class="num">04</div>
    <h2>二次编辑<br/>跑 diff</h2>
    <p class="body">重新生成不是从 0 开始。改完内容<strong>只发 diff</strong>, 让 agent 在已有 HTML 上微调 ——<br/><br/>省 80% token + 保持设计风格。</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c6">
    <div class="pageno">06 / 07</div>
    <div class="num">05</div>
    <h2>复用<br/>本地 session</h2>
    <p class="body">不用 API Key, 让 NevoFlux agent 跑本地 SDK session。<br/><br/><strong>0 边际成本</strong>, 速度比远程 API 快得多。</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c7">
    <div class="pageno">07 / 07</div>
    <div style="margin:auto 0">
      <div style="font-size:24px; font-weight:600; color:#e9b94a; margin-bottom:24px">看完别走 ✨</div>
      <h2 class="hero" style="color:#fafaf7">工具不是<br/>越多越好,<br/><span style="color:#e9b94a">流程顺</span><br/>才是真的好用。</h2>
    </div>
    <div style="display:flex; gap:14px; font-size:22px; font-weight:600">
      <span style="padding:10px 22px; background:#e9b94a; color:#15140f; border-radius:999px">关注</span>
      <span style="padding:10px 22px; background:rgba(255,255,255,0.12); color:#fafaf7; border-radius:999px; border:1px solid rgba(255,255,255,0.2)">收藏</span>
      <span style="padding:10px 22px; background:rgba(255,255,255,0.12); color:#fafaf7; border-radius:999px; border:1px solid rgba(255,255,255,0.2)">分享</span>
    </div>
    <div class="watermark" style="color:rgba(255,255,255,0.5)">@NevoFlux · 每周浏览器 agent 实战</div>
  </div>

</div>
</body>
</html>
```

## 用法

- `.deck` 承载纵向卡片栈。增删 `.card` 块来设定 N (短内容 3-6 张起步, 9 张以内最佳); 一张卡只讲一个观点。
- 封面卡 (`.c1`): 填写 `.badge` (收藏 / 预警钩子)、副标题行和 `.hero` 大标题; 保留 "滑动看" 提示。
- 正文卡 (`.c2`-`.c6`): 设置 `.num` 序号、`h2` 观点和 `.body` 正文 (一个核心点 + 1-2 个例子; 用 `<strong>` 强调)。
- 收尾卡 (`.c7`): 总结句、`.hero` 金句, 以及 关注 / 收藏 / 分享 行动按钮。
- 每张卡都要更新 `.pageno` (NN / 总数) 和右下角 `.watermark` (作者名 / 日期)。
- 配色按卡片用 `.c1`-`.c7` 渐变类切换 —— 柔和莫兰迪 / 粉色系; 全程 CSS 渐变, 自包含, 无外链。
