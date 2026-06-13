---
slug: packs/design-pack/templates/web-proto-editorial-zh
type: template
lang: zh
category: prototype
title: "Editorial 原型"
title_en: "NevoFlux Editorial Prototype"
description: "Editorial 极简风网页原型:暖色单色画布、衬线标题、grotesque 正文、1px 细线、超大留白与环境微动效。"
tags: [editorial, minimalist, serif, 模板]
sample_image: packs/design-pack/assets/templates/web-proto-editorial.svg
source: html-anything/web-proto-editorial
---
## 设计指导

一种杂志感的极简网页原型,以克制与大量留白为底色,辅以细微的微动效。

布局:
- 暖色单色画布 —— 单一的近白纸张色调,绝不用纯白,搭配安静的墨色与柔和灰。
- 三种字体声部:衬线字体作标题(serif display),grotesque(新怪诞无衬线)作正文,等宽字体作元信息标签、快捷键与 eyebrow 小标。
- 仅使用 1px 细线边框 —— 没有阴影、没有厚重卡片。结构由细线规则与不规则 bento 网格的接缝勾勒。
- 极柔和的 chip —— 浅淡、低饱和的色块(红/蓝/绿/黄),仅作标签点缀,克制使用。
- 超大留白(macro-whitespace)—— 大段区块内边距、非对称 hero、元素之间留足空气。
- 环境微动效(ambient micro-motion)—— 通过 IntersectionObserver 做入场显现(位移 + 淡入),尊重 reduced-motion。不使用滚动监听。

设计细节:
- 浮动胶囊导航,贴近顶部 sticky,带磨砂背景模糊与一道细线边框。
- 非对称 hero:等宽 eyebrow chip、超大衬线标题(用斜体作弱化点缀)、柔和导语,以及主按钮 + 链接按钮配快捷键提示。
- Bento 网格采用 6 列轨道与不规则单元(hero/tall/wide/small),细线接缝、等宽区块编号、柔和 chip。
- 「它不是什么」对照区块:左侧一句衬线陈述,右侧成对的 Doesn't / Does 行,否定项用删除线呈现。
- 定价区:三档由细线分隔,其中一档标注「recommended」,价格用衬线、元信息带等宽风格。
- 等宽页脚:地点、版本、年份与安静的链接。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux —— 让 agent 与你一起搭建的安静浏览器</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --canvas: #FBFBFA;
      --surface: #FFFFFF;
      --ink: #1A1A19;
      --muted: #787774;
      --hairline: #EAEAEA;
      --pale-red-bg: #FDEBEC; --pale-red-fg: #9F2F2D;
      --pale-blue-bg: #E1F3FE; --pale-blue-fg: #1F6C9F;
      --pale-green-bg: #EDF3EC; --pale-green-fg: #346538;
      --pale-yellow-bg: #FBF3DB; --pale-yellow-fg: #956400;
      --display: 'Instrument Serif', 'Newsreader', 'Lyon Text', Georgia, serif;
      --sans: 'Inter Tight', 'Switzer', 'SF Pro Display', system-ui, sans-serif;
      --mono: 'JetBrains Mono', 'Geist Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: var(--canvas);
      color: var(--ink);
      font-family: var(--sans);
      font-size: 16px;
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 0 32px; }

    /* ============ NAV (floating pill) ============ */
    .nav {
      position: sticky; top: 16px; z-index: 50;
      margin: 16px auto 0;
      display: flex; align-items: center; justify-content: space-between;
      max-width: 920px;
      padding: 10px 14px 10px 20px;
      background: rgba(251,251,250,0.78);
      backdrop-filter: saturate(140%) blur(16px);
      -webkit-backdrop-filter: saturate(140%) blur(16px);
      border: 1px solid var(--hairline);
      border-radius: 999px;
    }
    .nav .brand { font-family: var(--display); font-size: 22px; letter-spacing: -0.01em; }
    .nav .brand em { font-style: italic; color: var(--muted); }
    .nav ul { list-style: none; display: flex; gap: 22px; margin: 0; padding: 0; }
    .nav ul a { color: var(--ink); text-decoration: none; font-size: 13.5px; font-weight: 500; }
    .nav ul a:hover { color: var(--muted); }
    .nav .cta {
      font: 500 13px/1 var(--sans);
      padding: 9px 14px; border-radius: 999px;
      background: var(--ink); color: var(--canvas);
      border: 1px solid var(--ink);
      transition: transform 200ms cubic-bezier(0.16,1,0.3,1);
    }
    .nav .cta:active { transform: scale(0.98); }

    /* ============ HERO (asymmetric, eyebrow + serif display) ============ */
    .hero { padding: 96px 0 80px; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted);
      padding: 5px 11px; border: 1px solid var(--hairline);
      border-radius: 999px; background: var(--surface);
    }
    .eyebrow .dot { width: 6px; height: 6px; border-radius: 999px; background: var(--pale-green-fg); }
    .hero h1 {
      font-family: var(--display);
      font-size: clamp(48px, 7vw, 96px);
      line-height: 1.02;
      letter-spacing: -0.025em;
      margin: 22px 0 0;
      max-width: 16ch;
      font-weight: 400;
    }
    .hero h1 em { font-style: italic; color: var(--muted); }
    .hero .lede {
      font-size: 18.5px; color: var(--muted);
      max-width: 52ch; margin: 24px 0 36px;
      line-height: 1.55;
    }
    .hero .actions { display: flex; gap: 12px; align-items: center; }
    .btn {
      font: 500 14px/1 var(--sans);
      padding: 13px 22px; border-radius: 8px;
      cursor: pointer; transition: transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease;
    }
    .btn-primary { background: var(--ink); color: var(--canvas); border: 1px solid var(--ink); }
    .btn-primary:hover { background: #2A2A28; }
    .btn-primary:active { transform: scale(0.98); }
    .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--hairline); }
    .btn-link { background: transparent; border: none; color: var(--ink); padding: 13px 0; font: 500 14px/1 var(--sans); cursor: pointer; }
    .btn-link::after { content: ' →'; color: var(--muted); }

    .keystroke {
      font-family: var(--mono); font-size: 11.5px;
      padding: 3px 7px; border: 1px solid var(--hairline);
      border-radius: 4px; background: var(--surface);
      color: var(--muted);
    }

    /* ============ BENTO (uneven grid, hairline only) ============ */
    .bento {
      padding: 72px 0;
      border-top: 1px solid var(--hairline);
    }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-auto-rows: minmax(180px, auto);
      gap: 0;
      border: 1px solid var(--hairline);
      background: var(--hairline);
    }
    .bento-grid > .cell {
      background: var(--surface);
      padding: 28px 30px;
    }
    .cell--hero { grid-column: span 4; grid-row: span 2; padding: 36px 40px; }
    .cell--tall { grid-column: span 2; grid-row: span 2; }
    .cell--wide { grid-column: span 4; }
    .cell--small { grid-column: span 2; }
    .cell h3 { font-family: var(--display); font-size: 26px; font-weight: 400; letter-spacing: -0.02em; margin: 0 0 8px; line-height: 1.15; }
    .cell h4 { font-size: 14px; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.005em; }
    .cell p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.6; max-width: 38ch; }
    .cell .num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 22px; }

    .chip {
      display: inline-block; font-family: var(--mono); font-size: 10.5px;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 3px 8px; border-radius: 999px; margin-right: 6px;
    }
    .chip--green { background: var(--pale-green-bg); color: var(--pale-green-fg); }
    .chip--blue { background: var(--pale-blue-bg); color: var(--pale-blue-fg); }
    .chip--red { background: var(--pale-red-bg); color: var(--pale-red-fg); }
    .chip--yellow { background: var(--pale-yellow-bg); color: var(--pale-yellow-fg); }

    .doclines {
      font-family: var(--mono); font-size: 11.5px; color: var(--muted); line-height: 1.85;
      border-top: 1px dashed var(--hairline); padding-top: 14px; margin-top: 20px;
    }
    .doclines b { color: var(--ink); font-weight: 500; }

    /* ============ CONTRAST BLOCK (no card, hairline only) ============ */
    .contrast {
      padding: 88px 0;
      border-top: 1px solid var(--hairline);
    }
    .contrast .columns {
      display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
    }
    .contrast h2 {
      font-family: var(--display); font-size: clamp(34px, 4.4vw, 56px);
      line-height: 1.05; letter-spacing: -0.025em; margin: 0;
      max-width: 14ch; font-weight: 400;
    }
    .contrast .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--hairline); margin-top: 24px; }
    .contrast .pair > div { padding: 22px 0; border-bottom: 1px solid var(--hairline); }
    .contrast .pair > div + div { border-left: 1px solid var(--hairline); padding-left: 22px; }
    .contrast .pair > div:nth-child(odd) { padding-right: 22px; }
    .contrast .pair .label { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); margin-bottom: 8px; }
    .contrast .pair p { margin: 0; font-size: 14.5px; line-height: 1.55; }
    .contrast .pair .strike { color: var(--muted); text-decoration: line-through; text-decoration-thickness: 1px; }

    /* ============ PRICING band (no card overuse) ============ */
    .pricing { padding: 88px 0; border-top: 1px solid var(--hairline); }
    .pricing-head { display: flex; justify-content: space-between; align-items: end; gap: 32px; margin-bottom: 36px; }
    .pricing-head h2 { font-family: var(--display); font-size: clamp(32px, 4vw, 48px); margin: 0; font-weight: 400; letter-spacing: -0.02em; line-height: 1.05; max-width: 18ch; }
    .pricing-head p { color: var(--muted); margin: 0; max-width: 38ch; font-size: 14.5px; }
    .tiers { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--hairline); }
    .tier { padding: 32px 28px; }
    .tier + .tier { border-left: 1px solid var(--hairline); }
    .tier h3 { font-family: var(--display); font-size: 24px; font-weight: 400; margin: 0 0 4px; letter-spacing: -0.01em; }
    .tier .sub { color: var(--muted); font-size: 13px; margin: 0 0 18px; }
    .tier .price { font-family: var(--display); font-size: 44px; letter-spacing: -0.025em; line-height: 1; margin-bottom: 18px; font-weight: 400; }
    .tier .price small { font-family: var(--sans); font-size: 13px; color: var(--muted); margin-left: 6px; }
    .tier ul { list-style: none; padding: 0; margin: 0 0 24px; }
    .tier ul li { font-size: 13.5px; padding: 8px 0; border-top: 1px solid var(--hairline); color: var(--ink); }
    .tier ul li:first-child { border-top: none; }
    .tier ul li::before { content: '— '; color: var(--muted); }
    .tier .btn { width: 100%; }
    .tier--highlight { background: var(--canvas); position: relative; }
    .tier--highlight::after {
      content: 'recommended';
      position: absolute; top: 16px; right: 16px;
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--pale-green-fg); background: var(--pale-green-bg);
      padding: 3px 8px; border-radius: 999px;
    }

    /* ============ FOOTER ============ */
    footer {
      border-top: 1px solid var(--hairline);
      padding: 32px 0;
      font-family: var(--mono); font-size: 11.5px; color: var(--muted);
      letter-spacing: 0.04em;
    }
    footer .row { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    footer a { color: var(--muted); text-decoration: none; }
    footer a:hover { color: var(--ink); }

    /* ============ RESPONSIVE ============ */
    @media (max-width: 880px) {
      .nav ul { display: none; }
      .bento-grid { grid-template-columns: 1fr; }
      .cell--hero, .cell--tall, .cell--wide, .cell--small { grid-column: span 1; grid-row: auto; }
      .contrast .columns, .pricing-head, .tiers { grid-template-columns: 1fr; display: block; }
      .tier + .tier { border-left: none; border-top: 1px solid var(--hairline); }
      .pricing-head p { margin-top: 12px; }
    }

    /* ============ MOTION (entry, subtle) ============ */
    .reveal { opacity: 0; transform: translateY(12px); transition: opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1); }
    .reveal.is-in { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
    }
  </style>
</head>
<body>

  <header class="nav" data-od-id="topnav">
    <span class="brand">NevoFlux<em> · 浏览器</em></span>
    <ul>
      <li><a href="#bento">能力面</a></li>
      <li><a href="#contrast">它不是什么</a></li>
      <li><a href="#pricing">方案</a></li>
      <li><a href="#changelog">更新日志</a></li>
    </ul>
    <button class="cta">打开浏览器</button>
  </header>

  <main>
    <section class="wrap hero reveal" data-od-id="hero">
      <span class="eyebrow"><span class="dot"></span>内测中 · build 0.4.7</span>
      <h1>一个让 agent <em>与你一起搭建</em>、而非替你搭建的安静浏览器。</h1>
      <p class="lede">NevoFlux 面向那些宁愿做出一个能跑的 Canvas 应用、也不想再多开一个标签页的人。向 agent 提出需求,用 GBrain 为它打底,看它草拟、运行、再打磨 —— 全程不必离开当前页面。</p>
      <div class="actions">
        <button class="btn btn-primary">申请体验</button>
        <button class="btn-link">阅读手册</button>
        <span class="keystroke">⌘ K</span>
      </div>
    </section>

    <section class="wrap bento reveal" id="bento" data-od-id="bento">
      <div class="bento-grid">
        <div class="cell cell--hero">
          <span class="num">01 / canvas</span>
          <span class="chip chip--green">Canvas</span>
          <h3>一块兼作工坊的 Canvas。</h3>
          <p>描述你想要什么,agent 便组装出一个可运行的 Canvas 应用 —— 可编辑、可运行、归你所有。固定一个面板进入专注,其余画布淡成一道细线。没有模板画廊、没有插件连连看 —— 只有你要的那个东西。</p>
          <div class="doclines">
            <b>↳</b> ⌘ ⇧ C   新建画布<br>
            <b>↳</b> ⌘ J     专注面板<br>
            <b>↳</b> ⌘ ⏎     交给 agent 运行
          </div>
        </div>
        <div class="cell cell--tall" data-od-id="bento-gbrain">
          <span class="num">02 / gbrain</span>
          <span class="chip chip--blue">GBrain</span>
          <h4 style="margin-top: 14px;">有据可依的回答,不再到处开标签页</h4>
          <p>把网页、文档与笔记丢进 GBrain,agent 便在行内引用它们,并锚定到原始出处。信任一个回答即可把它归档 —— 两周后再也不会陷入「这是哪来的」。</p>
        </div>
        <div class="cell cell--small" data-od-id="bento-export">
          <span class="num">03 / export</span>
          <h4>始终是开放文件</h4>
          <p>导出可往返:一个 Canvas 应用打开时,就是它发布时那份 HTML 与资源。</p>
        </div>
        <div class="cell cell--small" data-od-id="bento-history">
          <span class="num">04 / history</span>
          <span class="chip chip--yellow">审计</span>
          <h4 style="margin-top: 8px;">Git 级别的历史</h4>
          <p>每一次 agent 运行都是一次提交。三个快捷键即可对比一块 Canvas 的两个版本。</p>
        </div>
        <div class="cell cell--wide" data-od-id="bento-packs">
          <span class="num">05 / packs</span>
          <span class="chip chip--red">Packs & SDK</span>
          <h4 style="margin-top: 14px;">用 packs 扩展它,用 SDK 驱动它</h4>
          <p>装上一个设计 pack,它的 skills 便成为 agent 的「家族风格」。通过 NevoFlux SDK 从你自己的代码触达同一个 agent —— 构建 packs、交付 Canvas 应用、自动化运行。无需任何市场审批。</p>
        </div>
      </div>
    </section>

    <section class="wrap contrast reveal" id="contrast" data-od-id="contrast">
      <div class="columns">
        <h2>NevoFlux 不想做聊天机器人,也不想做 IDE,更不想做又一处标签页墓地。</h2>
        <div>
          <div class="pair">
            <div>
              <div class="label">Doesn't</div>
              <p class="strike">甩给你一大段文字,再让你复制粘贴到某个真正能用的地方。</p>
            </div>
            <div>
              <div class="label">Does</div>
              <p>搭出一个能跑的 Canvas 应用,可打开、可编辑、可交付。</p>
            </div>
            <div>
              <div class="label">Doesn't</div>
              <p class="strike">凭空捏造来源、伪造链接、总结它从未读过的页面。</p>
            </div>
            <div>
              <div class="label">Does</div>
              <p>把回答落在 GBrain 上,并引用你喂给它的那一页。</p>
            </div>
            <div>
              <div class="label">Doesn't</div>
              <p class="strike">把你的成果锁进只有本应用才能打开的格式里。</p>
            </div>
            <div>
              <div class="label">Does</div>
              <p>把普通文件写到磁盘,从磁盘读普通文件。就这么简单。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap pricing reveal" id="pricing" data-od-id="pricing">
      <div class="pricing-head">
        <h2>一档给创作者,一档给团队,其余都是销售电话的事。</h2>
        <p>免费试用十四天。我们不要你的信用卡,事后也不会给你发邮件 —— 除非你先来信。</p>
      </div>
      <div class="tiers">
        <div class="tier">
          <h3>Solo</h3>
          <p class="sub">给一位有主见的创作者。</p>
          <div class="price">¥9<small>/ 月</small></div>
          <ul>
            <li>无限 Canvas 应用</li>
            <li>本地优先、加密的 GBrain</li>
            <li>开放文件导出与导入</li>
            <li>三个设计 packs</li>
          </ul>
          <button class="btn btn-ghost">开始 Solo</button>
        </div>
        <div class="tier tier--highlight">
          <h3>Studio</h3>
          <p class="sub">给最多十二人的构建团队。</p>
          <div class="price">¥22<small>/ 席 / 月</small></div>
          <ul>
            <li>包含 Solo 全部</li>
            <li>共享 GBrain 与评审</li>
            <li>SDK 访问与自动化运行</li>
            <li>带 diff 历史的审计日志</li>
            <li>私有 pack 仓库</li>
          </ul>
          <button class="btn btn-primary">开始 Studio</button>
        </div>
        <div class="tier">
          <h3>Press</h3>
          <p class="sub">给平台方与大型组织。</p>
          <div class="price">面议<small>/ 联系我们</small></div>
          <ul>
            <li>SSO(SAML、OIDC)</li>
            <li>私有化部署</li>
            <li>定制 pack 流水线</li>
            <li>专属支持工程师</li>
          </ul>
          <button class="btn btn-ghost">开一个会话</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap row">
      <span>NevoFlux · Bordeaux, FR · v0.4.7 · 2026</span>
      <span>
        <a href="#">手册</a> · <a href="#">更新日志</a> · <a href="#">状态</a> · <a href="#">隐私</a>
      </span>
    </div>
  </footer>

  <script>
    // Intersection-observer reveal — never window scroll listeners.
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  </script>
</body>
</html>
```

## 用法

在保持结构与 CSS 不变的前提下,填充以下槽位:

- 导航 —— `.brand`(产品名 + 角色标签)、`ul a` 链接,以及 `.cta` 按钮文案。
- Hero —— `.eyebrow` 状态/版本 chip、`h1` 衬线标题(用 `<em>` 做斜体弱化点缀)、`.lede` 一段式价值主张,以及操作按钮 + `.keystroke` 快捷键提示。
- Bento —— 五个单元:一个 hero 单元(等宽编号 + chip + 衬线 `h3` + 段落 + `.doclines` 快捷键列表)、一个 tall 单元、两个 small 单元、一个 wide 单元。按功能替换 `.num` 编号、chip 颜色与文案。
- 对照区 —— `h2` 衬线陈述加成对的 Doesn't / Does 行。「Doesn't」文案保留 `.strike` 类。
- 定价 —— 三个 `.tier` 块;给中间一个加 `.tier--highlight` 即可获得「recommended」徽标。更新名称、副标题、价格、`ul` 虚线功能项与按钮。
- 页脚 —— 等宽一行:名称 · 地点 · 版本 · 年份,加上安静的链接。

所有视觉均为纯 CSS(渐变、浅色块、细线),没有任何外部图片。字体从 Google Fonts 加载,字体栈内含完整的系统回退。
