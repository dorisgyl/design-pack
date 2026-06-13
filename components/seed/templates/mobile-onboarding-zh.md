---
slug: packs/design-pack/templates/mobile-onboarding-zh
type: template
lang: zh
category: mobile
title: "App 引导多屏"
title_en: "NevoFlux Mobile Onboarding"
description: "三个并排的 iPhone 框,展示移动端引导流程:启动页 / 价值主张 / 登录。"
tags: [onboarding, ios, signup, 引导, 模板]
sample_image: packs/design-pack/assets/templates/mobile-onboarding.svg
source: html-anything/mobile-onboarding
---
## 设计指导

模板:App 引导三屏。意图:把三个关键的移动端引导屏并排展示,让整个首次启动流程一眼可读。

布局:
- 手机 1 — 启动页:logo / 主视觉加一句标语。
- 手机 2 — 价值主张:一张插画、一句支撑文案、加圆点指示器。
- 手机 3 — 登录:邮箱 / Apple / Google 选项加主 CTA。

设计细节:
- 三个相同的手机框排在 CSS 网格中(`grid-template-columns: repeat(3, auto)`),每个是 44px 圆角的设备外壳,带 8px 深色边框、刘海和状态栏(9:41 · 5G)。
- 暖色画布配色:米色舞台背景,上下各一层柔和的径向渐变,单一暖橙强调色复用在插画、分页点和 CTA 字符上。
- 舞台标题和屏幕大标题用衬线展示字体;支撑文案与标签用无衬线正文字体。
- 每个手机正文共享同一套纵向节奏:顶部行(跳过 / 帮助)、主视觉或标题块、正文文案、随屏推进的三点分页器,以及贴近底部的 CTA 或登录选项堆叠。
- 所有插画都是内联 SVG(渐变"月亮"、带勾的卡片插画);无外部图片。
- 响应式:小于 1100px 时三屏堆叠为单列,每个手机宽度变为 92vw(最大 360px)。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux · 移动端引导</title>
<style>
  :root {
    --canvas: #efece4;
    --ink: #232118;
    --muted: #76715f;
    --accent: #c66e3a;
    --warm: #e8a76e;
    --display: 'Iowan Old Style', 'Charter', Georgia, serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--canvas); font-family: var(--body); color: var(--ink); }
  .stage {
    min-height: 100vh;
    padding: 56px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,167,110,0.35), transparent 70%),
      radial-gradient(ellipse 80% 50% at 50% 110%, rgba(198,110,58,0.16), transparent 70%),
      var(--canvas);
  }
  .stage h1 {
    font-family: var(--display);
    font-size: 28px;
    margin: 0;
    letter-spacing: -0.005em;
  }
  .stage p.lede { color: var(--muted); margin: 0; max-width: 50ch; text-align: center; }

  .phones {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 36px;
    align-items: center;
  }
  .phone {
    width: 320px;
    aspect-ratio: 9 / 19.5;
    background: #fff;
    border-radius: 44px;
    border: 8px solid #1a1814;
    overflow: hidden;
    position: relative;
    box-shadow:
      0 32px 60px rgba(28,27,26,0.18),
      0 12px 18px rgba(28,27,26,0.08);
    display: flex;
    flex-direction: column;
  }
  .phone .notch {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 100px; height: 22px;
    background: #1a1814;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    z-index: 5;
  }
  .statusbar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 24px 4px;
    font-size: 12.5px; font-weight: 600; color: var(--ink);
  }
  .statusbar .right { display: flex; gap: 6px; align-items: center; font-size: 11px; }
  .status-icon { display: inline-block; width: 14px; height: 8px; background: var(--ink); border-radius: 2px; }

  .phone-body {
    flex: 1;
    padding: 18px 24px 24px;
    display: flex;
    flex-direction: column;
  }
  .phone-top { display: flex; justify-content: flex-end; align-items: center; }
  .skip { font-size: 13px; color: var(--muted); }

  .hero { flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px 0; }
  .hero .art { width: 220px; height: 220px; }

  .copy { display: flex; flex-direction: column; gap: 10px; padding: 14px 4px; }
  .copy h2 { font-family: var(--display); font-size: 30px; line-height: 1.1; margin: 0; letter-spacing: -0.01em; font-weight: 700; }
  .copy p { color: var(--muted); margin: 0; font-size: 15px; line-height: 1.5; }

  .pager { display: flex; justify-content: center; gap: 6px; padding: 14px 0 8px; }
  .pager span { width: 6px; height: 6px; border-radius: 50%; background: rgba(35,33,24,0.18); }
  .pager span.active { width: 22px; background: var(--accent); border-radius: 999px; }

  .cta {
    background: var(--ink); color: #fef9ee;
    padding: 16px 22px; border-radius: 999px;
    text-align: center; font-weight: 600; font-size: 15px;
  }
  .alt { text-align: center; color: var(--muted); padding-top: 12px; font-size: 13px; }
  .alt a { color: var(--accent); font-weight: 600; }

  /* Phone 3 — sign-in */
  .signin-options { display: flex; flex-direction: column; gap: 10px; }
  .opt { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border: 1px solid rgba(35,33,24,0.12); border-radius: 14px; font-weight: 500; font-size: 14.5px; }
  .opt .glyph { width: 22px; height: 22px; border-radius: 50%; background: var(--ink); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; }
  .opt.apple .glyph { background: #000; }
  .opt.google .glyph { background: linear-gradient(135deg, #ea4335, #fbbc05, #34a853, #4285f4); }
  .opt.email .glyph { background: var(--accent); }

  .terms { font-size: 11px; color: var(--muted); text-align: center; padding-top: 14px; line-height: 1.5; }
  .terms a { color: var(--accent); }

  @media (max-width: 1100px) {
    .phones { grid-template-columns: 1fr; }
    .phone { width: 92vw; max-width: 360px; }
  }
</style>
</head>
<body>
<div class="stage">
  <h1>NevoFlux · 引导流程</h1>
  <p class="lede">三屏一气呵成,同一种语气。首次启动就把你的浏览器、GBrain 知识库和 Canvas 应用连在一起。</p>

  <div class="phones">
    <!-- Screen 1: welcome -->
    <div class="phone">
      <div class="notch"></div>
      <div class="statusbar"><span>9:41</span><div class="right"><span>5G</span><span class="status-icon"></span></div></div>
      <div class="phone-body">
        <div class="phone-top"><span class="skip">跳过</span></div>
        <div class="hero">
          <svg class="art" viewBox="0 0 220 220">
            <defs>
              <radialGradient id="moon1" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#fcebd0"/>
                <stop offset="100%" stop-color="#e8a76e"/>
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="78" fill="url(#moon1)"/>
            <circle cx="146" cy="92" r="14" fill="#fff" opacity="0.6"/>
            <circle cx="78" cy="74" r="3" fill="#c66e3a" opacity="0.7"/>
            <circle cx="60" cy="120" r="2" fill="#c66e3a" opacity="0.5"/>
            <circle cx="170" cy="140" r="2.5" fill="#c66e3a" opacity="0.6"/>
            <path d="M 30 200 Q 110 170 200 200 L 200 220 L 30 220 Z" fill="#c66e3a" opacity="0.18"/>
          </svg>
        </div>
        <div class="copy">
          <h2>会思考的浏览器。</h2>
          <p>NevoFlux 把你读过的每个页面都变成可检索的记忆。告别标签页混乱,也不再丢失链接——一个会替你记住的工作空间。</p>
        </div>
        <div class="pager"><span class="active"></span><span></span><span></span></div>
        <div class="cta">继续</div>
      </div>
    </div>

    <!-- Screen 2: value props -->
    <div class="phone">
      <div class="notch"></div>
      <div class="statusbar"><span>9:41</span><div class="right"><span>5G</span><span class="status-icon"></span></div></div>
      <div class="phone-body">
        <div class="phone-top"><span class="skip">跳过</span></div>
        <div class="hero">
          <svg class="art" viewBox="0 0 220 220">
            <rect x="38" y="48" width="144" height="100" rx="14" fill="#fff" stroke="#c66e3a" stroke-width="1.5"/>
            <rect x="56" y="68" width="56" height="6" rx="3" fill="#c66e3a"/>
            <rect x="56" y="84" width="100" height="4" rx="2" fill="#76715f" opacity="0.4"/>
            <rect x="56" y="96" width="80" height="4" rx="2" fill="#76715f" opacity="0.4"/>
            <rect x="56" y="116" width="40" height="20" rx="10" fill="#c66e3a"/>
            <circle cx="170" cy="160" r="22" fill="#e8a76e"/>
            <path d="M 162 160 L 168 166 L 178 154" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="copy">
          <h2>GBrain 会回答你。</h2>
          <p>用大白话提问,NevoFlux 智能体就会检索你保存的一切,并直接在 Canvas 应用里把答案草拟出来。</p>
        </div>
        <div class="pager"><span></span><span class="active"></span><span></span></div>
        <div class="cta">继续</div>
      </div>
    </div>

    <!-- Screen 3: sign in -->
    <div class="phone">
      <div class="notch"></div>
      <div class="statusbar"><span>9:41</span><div class="right"><span>5G</span><span class="status-icon"></span></div></div>
      <div class="phone-body">
        <div class="phone-top"><span class="skip">帮助</span></div>
        <div style="padding: 24px 0;">
          <h2 style="font-family: var(--display); font-size: 32px; margin: 0 0 8px; letter-spacing: -0.01em; line-height: 1.05; font-weight: 700;">同步你的 GBrain。</h2>
          <p style="margin: 0; color: var(--muted); font-size: 15px;">让知识库和 Pack 在每台设备上保持同步。我们绝不出售你的数据。</p>
        </div>
        <div class="signin-options">
          <div class="opt apple"><span class="glyph"></span>使用 Apple 继续</div>
          <div class="opt google"><span class="glyph"></span>使用 Google 继续</div>
          <div class="opt email"><span class="glyph">@</span>使用邮箱继续</div>
        </div>
        <div style="flex: 1;"></div>
        <div class="terms">继续即表示你同意 NevoFlux 的 <a>服务条款</a> 和 <a>隐私政策</a>。</div>
        <div class="pager"><span></span><span></span><span class="active"></span></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
```

## 用法

- `stage` — 米色背景:`h1` 流程标题,加一句 `lede` 概述三屏的文案。
- `phones` — 三列网格;每个 `phone` 都是自包含的设备框,含 `notch`、`statusbar` 和 `phone-body`。
- 第 1 屏(启动页)— `phone-top` 跳过链接、一个 `hero` 内联 SVG 标识、一个 `copy` 块(衬线 `h2` 标语 + 灰色 `p`)、`pager`(第一个点高亮),以及深色 `cta`。
- 第 2 屏(价值主张)— 结构相同;替换 SVG 插画和 `copy` 标题/文案,把高亮的 `pager` 点推进到中间。
- 第 3 屏(登录)— 一个标题块、一组 `signin-options` 选项(`opt apple` / `opt google` / `opt email`,各带一个 `glyph`)、一个撑开间距的 spacer、`terms` 条款行,以及 `pager`(最后一个点高亮)。
- 所有插画均为内联 SVG,品牌图标全用 CSS 实现;无外部 URL 或图片。
