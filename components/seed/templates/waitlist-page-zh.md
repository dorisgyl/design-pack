---
slug: packs/design-pack/templates/waitlist-page-zh
type: template
lang: zh
category: prototype
title: "等候名单页"
title_en: "NevoFlux Waitlist Page"
description: "极简产品预发布落地页,含邮箱捕获、logo 与装饰图层,用于早鸟等候名单。"
tags: [waitlist, launch, 预发布, 模板]
sample_image: packs/design-pack/assets/templates/waitlist-page.svg
source: html-anything/waitlist-page
---
## 设计指导

为新产品或早鸟内测做一张极简等候页。意图:整张页面只有一个目标——捕获邮箱、营造期待感。

布局:
- 居中布局:品牌 logo(左上角)+ 一行 tagline + 大字 hero,把"做什么"说清楚。
- 邮箱捕获:姓名 input + 邮箱 input + 提交按钮,合并成一个 pill 风格的整行。
- 表单下方主要靠装饰带承托;如需佐证,可保留三个可选的小卖点(icon + 一行字)。
- 底部:founders note 与社交链接,这里以滚动跑马灯(ticker)呈现。

设计细节:
- 装饰:SVG 渐变 mesh / 噪点纹理、透视网格地面、一排卷线(coil)、一条点缀色横条,以及一颗星轨。
- 成功提交后给一个微动效(表单被替换为 ✓ / 确认文案)。
- 暖橘底色,正文统一用深墨色,搭配珊瑚色点缀;标题采用粗体几何无衬线字体。
- 尊重 `prefers-reduced-motion`(跑马灯停止),并在 600px 以下将表单折叠为单列堆叠。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NevoFlux — 即将上线</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #FDE8DF;
      --fg: #1A1410;
      --color-ink: #1A1410;
      --accent: #1A1410;
      --deco: #E8835A;
      --deco-logo: #E8522A;
      --deco-stripe: #F5A623;
      --input-border: rgba(196, 169, 154, 0.38);
      --success: #2D6A4F;
      --btn-label: #FDE8DF;
      --ticker-bg: rgba(0, 0, 0, 0.9);
      --ticker-fg: rgba(255, 255, 255, 0.9);
      --deco-stroke: rgba(0, 0, 0, 0.12);
      --logo-shadow: rgba(0, 0, 0, 0.08);
      --font-body: 'DM Sans', sans-serif;
      --font-display: 'Syne', sans-serif;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      height: 100%;
      overflow-x: hidden;
    }
    .logo {
      position: absolute;
      top: 20px;
      left: 24px;
      display: flex;
      align-items: center;
      gap: 14px;
      z-index: 10;
    }
    .logo-container {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--deco-logo) 0%, var(--deco) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 0 2px 8px var(--logo-shadow);
    }
    .logo-svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 2px;
    }
    .logo-text {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .logo-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 18px;
      letter-spacing: -0.02em;
      color: var(--color-ink);
    }
    .logo-dot {
      font-size: 10px;
      color: var(--deco-logo);
      opacity: 0.6;
    }
    body {
      font-family: var(--font-body);
      background-color: var(--bg);
      color: var(--fg);
      display: flex;
      flex-direction: column;
      min-height: 100svh;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .upper {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 24px 40px;
      position: relative;
      z-index: 2;
    }
    .headline {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(56px, 8vw, 96px);
      letter-spacing: -0.03em;
      line-height: 1.0;
      color: var(--fg);
      text-align: center;
      max-width: 900px;
      margin: 0 auto 22px;
    }
    .subtext {
      font-size: clamp(15px, 1.5vw, 18px);
      font-weight: 400;
      line-height: 1.6;
      color: var(--fg);
      max-width: 420px;
      margin-bottom: 44px;
    }
    .form-row {
      display: flex;
      gap: 8px;
      width: 100%;
      max-width: 560px;
      justify-content: center;
    }
    .form-row input {
      flex: 1;
      min-width: 0;
      padding: 14px 18px;
      font-family: var(--font-body);
      font-size: 15px;
      color: var(--color-ink);
      background: transparent;
      border: 1.5px solid var(--input-border);
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-row input::placeholder {
      color: var(--input-border);
    }
    .form-row input:focus {
      border-color: var(--fg);
      outline: 2px solid var(--fg);
      outline-offset: 2px;
    }
    .form-row button {
      flex-shrink: 0;
      padding: 14px 22px;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 500;
      color: var(--btn-label);
      background: var(--accent);
      border: none;
      border-radius: 2px;
      cursor: pointer;
      white-space: nowrap;
      transition: opacity 0.15s, transform 0.1s;
    }
    .form-row button:hover {
      opacity: 0.85;
    }
    .form-row button:active {
      transform: scale(0.98);
    }
    .success-msg {
      display: none;
      margin-top: 18px;
      font-size: 15px;
      font-weight: 500;
      color: var(--success);
    }
    .success-msg.visible {
      display: block;
    }
    .deco-section {
      flex: 1;
      position: relative;
      overflow: hidden;
      min-height: 25vh;
      display: flex;
      flex-direction: column;
    }
    .coil-row {
      display: block;
      width: 100%;
      height: 60px;
      flex-shrink: 0;
      background: var(--bg);
    }
    .stripe {
      width: 100%;
      height: 14px;
      background: var(--deco-stripe);
      flex-shrink: 0;
    }
    .grid-floor {
      flex: 1;
      position: relative;
      background-color: var(--deco);
      min-height: 80px;
    }
    .grid-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .ticker-wrap {
      width: 100%;
      overflow: hidden;
      background: var(--ticker-bg);
      padding: 10px 0;
      flex-shrink: 0;
    }
    .ticker-track {
      display: flex;
      gap: 24px;
      white-space: nowrap;
      animation: ticker-scroll 20s linear infinite;
    }
    .ticker-unit {
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--ticker-fg);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-right: -12px;
    }
    .ticker-star {
      color: var(--deco-stripe);
      margin-right: 4px;
    }
    @keyframes ticker-scroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    @media (prefers-reduced-motion: reduce) {
      .ticker-track {
        animation: none;
      }
    }
    @media (max-width: 600px) {
      .logo {
        left: 16px;
        top: 16px;
        gap: 10px;
      }
      .logo-container {
        width: 40px;
        height: 40px;
      }
      .logo-name {
        font-size: 14px;
      }
      .upper {
        padding: 30px 16px;
        flex: 0 0 50vh;
      }
      .form-row {
        flex-direction: column;
        align-items: stretch;
      }
      .form-row input,
      .form-row button {
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <div class="logo">
    <div class="logo-container">
      <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="var(--deco-logo)"/>
        <text x="50" y="60" font-family="'DM Sans', sans-serif" font-size="42" font-weight="700" text-anchor="middle" fill="var(--btn-label)" letter-spacing="-1">Nf</text>
      </svg>
    </div>
    <div class="logo-text">
      <span class="logo-name">NevoFlux</span>
      <span class="logo-dot">·</span>
    </div>
  </div>

  <section class="upper">
    <h1 class="headline">NevoFlux<br>即将上线</h1>
    <p class="subtext">让知识替你干活的浏览器——GBrain 帮你记住一切,Canvas 应用自动生成,剩下的交给智能体来跑。</p>

    <form class="form-row" id="waitlist-form">
      <input type="text" name="firstname" placeholder="名字" autocomplete="given-name">
      <input type="email" name="email" placeholder="工作邮箱" autocomplete="email" required>
      <button type="submit">申请抢先体验</button>
    </form>
    <p class="success-msg" id="success-msg" role="status">你已加入 GBrain 抢先体验名单!我们会尽快联系你。</p>
  </section>

  <div class="deco-section">

    <svg class="coil-row" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" style="stroke: var(--deco-stroke);" stroke-width="1.5">
        <path d="M 9,60 A 41,30 0 0 1 91,60"/>
        <path d="M 94,60 A 41,30 0 0 1 176,60"/>
        <path d="M 179,60 A 41,30 0 0 1 261,60"/>
        <path d="M 264,60 A 41,30 0 0 1 346,60"/>
        <path d="M 349,60 A 41,30 0 0 1 431,60"/>
        <path d="M 434,60 A 41,30 0 0 1 516,60"/>
        <path d="M 519,60 A 41,30 0 0 1 601,60"/>
        <path d="M 604,60 A 41,30 0 0 1 686,60"/>
        <path d="M 689,60 A 41,30 0 0 1 771,60"/>
        <path d="M 774,60 A 41,30 0 0 1 856,60"/>
        <path d="M 859,60 A 41,30 0 0 1 941,60"/>
        <path d="M 944,60 A 41,30 0 0 1 1026,60"/>
        <path d="M 1029,60 A 41,30 0 0 1 1111,60"/>
        <path d="M 1114,60 A 41,30 0 0 1 1196,60"/>
        <path d="M 1199,60 A 41,30 0 0 1 1281,60"/>
        <path d="M 1284,60 A 41,30 0 0 1 1366,60"/>
        <path d="M 1369,60 A 41,30 0 0 1 1451,60"/>
      </g>
    </svg>

    <div class="stripe"></div>

    <div class="grid-floor">
      <svg class="grid-svg" viewBox="0 0 1280 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <g style="stroke: var(--deco-stroke);" stroke-width="1" fill="none">
          <line x1="640" y1="0" x2="0"    y2="400"/>
          <line x1="640" y1="0" x2="128"  y2="400"/>
          <line x1="640" y1="0" x2="256"  y2="400"/>
          <line x1="640" y1="0" x2="384"  y2="400"/>
          <line x1="640" y1="0" x2="512"  y2="400"/>
          <line x1="640" y1="0" x2="640"  y2="400"/>
          <line x1="640" y1="0" x2="768"  y2="400"/>
          <line x1="640" y1="0" x2="896"  y2="400"/>
          <line x1="640" y1="0" x2="1024" y2="400"/>
          <line x1="640" y1="0" x2="1152" y2="400"/>
          <line x1="640" y1="0" x2="1280" y2="400"/>
          <line x1="0" y1="80"  x2="1280" y2="80"/>
          <line x1="0" y1="160" x2="1280" y2="160"/>
          <line x1="0" y1="240" x2="1280" y2="240"/>
          <line x1="0" y1="320" x2="1280" y2="320"/>
          <line x1="0" y1="390" x2="1280" y2="390"/>
        </g>
      </svg>
    </div>
  </div>

  <div class="ticker-wrap" aria-hidden="true">
    <div class="ticker-track">
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
      <span class="ticker-unit">即将上线 <span class="ticker-star">✳</span></span>
    </div>
  </div>

  <script>
    document.getElementById('waitlist-form').addEventListener('submit', function(e) {
      e.preventDefault();
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }
      this.style.display = 'none';
      document.getElementById('success-msg').classList.add('visible');
    });
  </script>
</body>
</html>
```

## 用法

待填充的槽位:
- Logo —— 把 `logo-svg` 中的字母组合与 `logo-name` 替换为正在发布的产品或子品牌(某个 pack、Canvas 应用或设计技能)。
- 大标题 —— 保持两行短句,点出产品名并传达"即将上线"。
- 副文案 —— 一句话说清做什么(GBrain 知识库、Canvas 应用、智能体/SDK)。
- 表单 —— 调整输入字段与按钮文案(如"申请抢先体验""加入内测");提交校验通过后显示成功文案。
- 跑马灯 —— 把重复的"即将上线"替换为你自己的发布短语;保留足够数量以填满 50% 的滚动循环。
- 装饰(卷线、横条、网格地面)纯属视觉元素 —— 通过 `--deco*` 系列 CSS 变量改色即可,无需填充内容。
