---
slug: packs/design-pack/templates/weekly-update-zh
type: template
lang: zh
category: slides
title: "团队周报 Deck"
title_en: "Weekly Update Deck"
description: "为 NevoFlux 团队准备的 6-8 页横向滑动周报:已发布 / 进行中 / 阻塞 / 指标 / 求助。"
tags: [weekly, 周报, status, 模板]
sample_image: packs/design-pack/assets/templates/weekly-update.svg
source: html-anything/weekly-update
---

## 设计指导

一份 6-8 页的横向滑动幻灯片,采用团队周报的固定结构。每屏一页,左右键切换,URL hash 与当前页同步,方便分享某一页。

### 布局
- **封面(Cover)** —— 周次 + 团队 + 一句话主题。
- **已发布(Shipped)** —— 带编号的清单,每行标注 owner。
- **进行中(In flight)** —— 仍在推进的工作,用 owner 头像行展示(原版用头像行,也可换成进度条)。
- **阻塞(Blocked)** —— 一个红/暖色 callout,聚焦唯一卡住的事,并写明求助点。
- **指标(Metrics)** —— KPI 卡片网格,配迷你折线图与周环比 delta。
- **求助(Asks)** —— 下周的求助清单,每个团队一张卡片。
- **致谢(Thanks)** —— 简短收尾,附署名。

### 设计细节
- 左 / 右方向键(以及 PageUp / PageDown)切换页面;底部导航圆点可直接跳到某一页。
- 横向 snap(`scroll-snap-type: x mandatory`),隐藏滚动条。
- 深色纸面配暖黄主色 + 紫色辅助色;面包屑、页码、标签用等宽字体。
- 每页带一个小面包屑(左上)和 `NN / total` 页码(右下)。
- 图表是内联 SVG 迷你折线 + 渐变填充,无任何外部资源或 URL。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux · 周报 · W24</title>
<style>
  :root {
    --bg: #0e0d12;
    --paper: #19171f;
    --paper-2: #221f2a;
    --ink: #f4f0e6;
    --muted: #a09aaf;
    --line: #2c2935;
    --accent: #ffcc4d;
    --accent-2: #b388ff;
    --display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --mono: ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--bg); color: var(--ink); font-family: var(--display); }
  body { overflow: hidden; }
  .deck {
    display: flex;
    width: 100vw; height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }
  .deck::-webkit-scrollbar { display: none; }
  .slide {
    flex: 0 0 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 56px 80px;
    scroll-snap-align: start;
    position: relative;
  }
  .slide-inner { width: 100%; max-width: 1100px; }
  .crumb {
    position: absolute; top: 24px; left: 32px;
    font-family: var(--mono); font-size: 11px; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .pageno {
    position: absolute; bottom: 24px; right: 32px;
    font-family: var(--mono); font-size: 11px; color: var(--muted);
  }
  .nav {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 6px; z-index: 5;
  }
  .nav .dot {
    width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2);
    cursor: pointer;
  }
  .nav .dot.active { background: var(--accent); }

  /* Cover */
  .cover { display: flex; flex-direction: column; gap: 28px; }
  .cover .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; background: var(--paper); border: 1px solid var(--line); align-self: flex-start; font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }
  .cover .badge .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
  .cover h1 { font-size: clamp(56px, 8vw, 110px); margin: 0; line-height: 0.96; letter-spacing: -0.03em; font-weight: 800; }
  .cover h1 em { font-style: normal; color: var(--accent); }
  .cover .meta { display: flex; gap: 36px; color: var(--muted); font-family: var(--mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }

  /* Headline */
  .headline { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; }
  .headline-num { font-size: clamp(120px, 18vw, 220px); line-height: 0.9; letter-spacing: -0.04em; font-weight: 800; color: var(--accent); }
  .headline-num small { display: block; font-size: 18px; color: var(--muted); font-weight: 400; letter-spacing: 0; margin-top: 12px; font-family: var(--mono); text-transform: uppercase; }
  .headline-text h2 { font-size: 44px; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 18px; font-weight: 700; }
  .headline-text p { color: var(--muted); font-size: 18px; max-width: 36ch; line-height: 1.5; }

  /* Section title */
  .section-title { font-size: clamp(32px, 4vw, 56px); margin: 0 0 36px; line-height: 1.05; letter-spacing: -0.02em; font-weight: 700; }
  .section-title em { font-style: normal; color: var(--accent); }

  /* Lists of items */
  .item-list { display: flex; flex-direction: column; gap: 14px; }
  .item { display: grid; grid-template-columns: auto 1fr auto; gap: 22px; align-items: center; padding: 22px 26px; background: var(--paper); border: 1px solid var(--line); border-radius: 14px; }
  .item-num { font-family: var(--mono); font-size: 12px; color: var(--muted); }
  .item-title { font-size: 22px; font-weight: 600; letter-spacing: -0.01em; }
  .item-meta { font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .av-row { display: flex; }
  .av { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--paper); margin-left: -8px; font-size: 11px; font-weight: 700; color: var(--bg); display: inline-flex; align-items: center; justify-content: center; background: var(--accent); }
  .av:first-child { margin-left: 0; }
  .av-2 { background: var(--accent-2); color: white; }
  .av-3 { background: #ff6f91; color: white; }

  /* Blocked */
  .blocked-block { padding: 36px 40px; background: linear-gradient(135deg, rgba(255,111,145,0.18), rgba(255,204,77,0.08)); border: 1px solid rgba(255,111,145,0.4); border-radius: 18px; }
  .blocked-block h3 { font-size: 28px; margin: 0 0 8px; letter-spacing: -0.01em; }
  .blocked-block p { color: var(--muted); margin: 0 0 18px; font-size: 16px; }
  .blocked-ask { display: inline-flex; padding: 10px 22px; background: var(--accent); color: var(--bg); border-radius: 999px; font-weight: 600; font-size: 14px; }

  /* Charts */
  .chart-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .chart { padding: 28px; background: var(--paper); border: 1px solid var(--line); border-radius: 16px; }
  .chart h4 { margin: 0 0 4px; font-size: 14px; font-weight: 600; }
  .chart .sub { font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .chart svg { width: 100%; height: 220px; display: block; margin-top: 16px; }
  .big-num { font-size: 72px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; color: var(--accent); margin-top: 16px; }
  .delta { font-family: var(--mono); font-size: 13px; color: var(--accent); margin-top: 8px; }
  .delta.warn { color: #ff6f91; }

  /* Asks */
  .asks { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .ask { padding: 28px; background: var(--paper); border: 1px solid var(--line); border-radius: 14px; display: flex; flex-direction: column; gap: 14px; }
  .ask .who { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 12px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; }
  .ask h3 { font-size: 22px; line-height: 1.25; margin: 0; letter-spacing: -0.01em; }
  .ask p { margin: 0; color: var(--muted); font-size: 14.5px; line-height: 1.5; }

  /* Closer */
  .closer { display: flex; flex-direction: column; gap: 28px; align-items: flex-start; }
  .closer h2 { font-size: clamp(44px, 6vw, 84px); margin: 0; line-height: 1.05; letter-spacing: -0.025em; font-weight: 800; }
  .closer h2 em { font-style: normal; color: var(--accent); }
  .closer p { color: var(--muted); font-size: 18px; max-width: 56ch; }
  .closer .signature { display: flex; align-items: center; gap: 14px; padding-top: 24px; border-top: 1px solid var(--line); width: 100%; }
  .closer .signature .av { width: 44px; height: 44px; font-size: 16px; }
  .closer .signature strong { display: block; font-size: 16px; }
  .closer .signature span { color: var(--muted); font-size: 13px; }

  @media (max-width: 760px) {
    .slide { padding: 48px 28px; }
    .headline { grid-template-columns: 1fr; }
    .chart-grid, .asks { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<div class="deck" id="deck">

  <!-- 1. 封面 -->
  <section class="slide">
    <span class="crumb">NevoFlux GBrain · 周报</span>
    <div class="slide-inner cover">
      <div class="badge"><span class="dot"></span>第 24 周 · 6/9 → 6/13</div>
      <h1>你好,第 <em>二十四</em> 周。</h1>
      <div class="meta">
        <span>作者 · Devon Park</span>
        <span>受众 · 小组 + 管理层</span>
        <span>5 分钟读完</span>
      </div>
    </div>
    <span class="pageno">01 / 08</span>
  </section>

  <!-- 2. 头条数字 -->
  <section class="slide">
    <span class="crumb">头条</span>
    <div class="slide-inner headline">
      <div class="headline-num">+22%<small>GBrain 新增收藏量 vs Q1 周均</small></div>
      <div class="headline-text">
        <h2>这一周,浏览器重新变快了。</h2>
        <p>Canvas 应用启动完成率上升 9 个百分点,收藏→答案从 1分12秒缩短到 47 秒,我们还交付了 Agent SDK 流式工作流的第一块。</p>
      </div>
    </div>
    <span class="pageno">02 / 08</span>
  </section>

  <!-- 3. 已发布 -->
  <section class="slide">
    <span class="crumb">已发布</span>
    <div class="slide-inner">
      <h2 class="section-title">已发布,<em>逐条来看</em>。</h2>
      <div class="item-list">
        <div class="item"><span class="item-num">01</span><span class="item-title">任意标签页一键收藏进 GBrain</span><span class="item-meta">NF-201 · Devon</span></div>
        <div class="item"><span class="item-num">02</span><span class="item-title">Canvas 应用空状态插画</span><span class="item-meta">NF-241 · Mira</span></div>
        <div class="item"><span class="item-num">03</span><span class="item-title">Agent 答案的引用溯源</span><span class="item-meta">NF-198 · Priya</span></div>
        <div class="item"><span class="item-num">04</span><span class="item-title">Pack 切换器滚动复位修复</span><span class="item-meta">NF-233 · Caleb</span></div>
      </div>
    </div>
    <span class="pageno">03 / 08</span>
  </section>

  <!-- 4. 进行中 -->
  <section class="slide">
    <span class="crumb">进行中</span>
    <div class="slide-inner">
      <h2 class="section-title">进行中,<em>即将落地</em>。</h2>
      <div class="item-list">
        <div class="item"><span class="item-num">01</span><span class="item-title">离线 GBrain 索引 —— 构建、同步、重建</span><div class="av-row"><span class="av">PB</span></div></div>
        <div class="item"><span class="item-num">02</span><span class="item-title">Agent SDK 流式步骤 —— 视觉 + 文案</span><div class="av-row"><span class="av av-2">MR</span><span class="av">SL</span></div></div>
        <div class="item"><span class="item-num">03</span><span class="item-title">Canvas 导航重构(左侧栏)</span><div class="av-row"><span class="av av-2">MR</span></div></div>
        <div class="item"><span class="item-num">04</span><span class="item-title">设计技能 backlog 看板</span><div class="av-row"><span class="av av-3">CA</span></div></div>
      </div>
    </div>
    <span class="pageno">04 / 08</span>
  </section>

  <!-- 5. 阻塞 -->
  <section class="slide">
    <span class="crumb">阻塞</span>
    <div class="slide-inner">
      <h2 class="section-title">有一件事 <em>卡住了</em>。</h2>
      <div class="blocked-block">
        <h3>Agent 流式步骤的设计技能文案评审。</h3>
        <p>Sasha 需要设计团队在周三下班前评审完新的 Canvas 文案,否则 v2.4 切版(6/25)会延期。文档已在 <code style="font-family: var(--mono);">#design-pack-reviews</code> 标注;只差有人过目。</p>
        <span class="blocked-ask">求助:设计团队 —— 请在周三前评审</span>
      </div>
    </div>
    <span class="pageno">05 / 08</span>
  </section>

  <!-- 6. 指标 -->
  <section class="slide">
    <span class="crumb">指标</span>
    <div class="slide-inner">
      <h2 class="section-title">有变化的 <em>指标</em>。</h2>
      <div class="chart-grid">
        <div class="chart">
          <h4>Canvas 启动率 · 近 4 周</h4>
          <div class="sub">越高越好</div>
          <svg viewBox="0 0 600 220" preserveAspectRatio="none">
            <defs><linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#ffcc4d" stop-opacity="0.4"/><stop offset="100%" stop-color="#ffcc4d" stop-opacity="0"/></linearGradient></defs>
            <polygon fill="url(#lg1)" points="20,210 20,160 110,150 200,140 290,124 380,108 470,80 560,52 580,52 580,210" />
            <polyline fill="none" stroke="#ffcc4d" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"
              points="20,160 110,150 200,140 290,124 380,108 470,80 560,52" />
            <circle cx="560" cy="52" r="5" fill="#ffcc4d"/>
          </svg>
          <div class="big-num">38%</div>
          <div class="delta">▲ 本周 +9 个百分点</div>
        </div>
        <div class="chart">
          <h4>收藏到答案 · 中位数</h4>
          <div class="sub">越低越好</div>
          <svg viewBox="0 0 600 220" preserveAspectRatio="none">
            <defs><linearGradient id="lg2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#b388ff" stop-opacity="0.4"/><stop offset="100%" stop-color="#b388ff" stop-opacity="0"/></linearGradient></defs>
            <polygon fill="url(#lg2)" points="20,210 20,60 110,72 200,90 290,108 380,124 470,148 560,164 580,164 580,210" />
            <polyline fill="none" stroke="#b388ff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"
              points="20,60 110,72 200,90 290,108 380,124 470,148 560,164" />
            <circle cx="560" cy="164" r="5" fill="#b388ff"/>
          </svg>
          <div class="big-num" style="color: #b388ff;">47 秒</div>
          <div class="delta">▼ 本周 −25 秒</div>
        </div>
      </div>
    </div>
    <span class="pageno">06 / 08</span>
  </section>

  <!-- 7. 求助 -->
  <section class="slide">
    <span class="crumb">求助</span>
    <div class="slide-inner">
      <h2 class="section-title">下周的 <em>求助</em>。</h2>
      <div class="asks">
        <div class="ask">
          <div class="who"><span class="av av-2">SL</span>设计</div>
          <h3>周三下班前评审 Agent 流式文案。</h3>
          <p>文档已在 <code style="font-family: var(--mono);">#design-pack-reviews</code> 标注。没有它,v2.4 会延迟发布,Pioneer 上线也会顺延。</p>
        </div>
        <div class="ask">
          <div class="who"><span class="av av-3">PB</span>平台</div>
          <h3>周四 14:00 一起演练离线索引重建。</h3>
          <p>30 分钟。我们想在下个迭代动共享索引前,先把 GBrain 迁移流程跑一遍。</p>
        </div>
        <div class="ask">
          <div class="who"><span class="av">DP</span>销售</div>
          <h3>把我们拉进 Pioneer 的 Pack 部署电话。</h3>
          <p>我们能现场回答 Agent SDK 相关问题,省一轮来回。</p>
        </div>
        <div class="ask">
          <div class="who"><span class="av av-2">MR</span>研究</div>
          <h3>下周五前,为 Canvas 搭建者研究招募 5 名用户。</h3>
          <p>优先现有 NevoFlux 用户。我们已在 GBrain 里备好招募表单。</p>
        </div>
      </div>
    </div>
    <span class="pageno">07 / 08</span>
  </section>

  <!-- 8. 收尾 -->
  <section class="slide">
    <span class="crumb">致谢</span>
    <div class="slide-inner closer">
      <h2>这就是 <em>本周</em>。</h2>
      <p>谢谢大家的专注。Agent SDK 的投入开始见效,Canvas 的工作落地得比我预期更扎实。特别感谢 Mira 的空状态设计 —— 小改动,却显著拉高了启动率。</p>
      <div class="signature">
        <span class="av">DP</span>
        <div><strong>Devon Park</strong><span>GBrain 小组负责人 · 在 #gbrain-squad 找我</span></div>
      </div>
    </div>
    <span class="pageno">08 / 08</span>
  </section>
</div>

<div class="nav" id="nav"></div>

<script>
  const deck = document.getElementById('deck');
  const slides = deck.querySelectorAll('.slide');
  const nav = document.getElementById('nav');
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => deck.scrollTo({ left: window.innerWidth * i, behavior: 'smooth' }));
    nav.appendChild(d);
  });
  function activeIndex() {
    return Math.round(deck.scrollLeft / window.innerWidth);
  }
  deck.addEventListener('scroll', () => {
    const idx = activeIndex();
    nav.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  }, { passive: true });
  document.addEventListener('keydown', (e) => {
    const idx = activeIndex();
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      const next = Math.min(slides.length - 1, idx + 1);
      deck.scrollTo({ left: window.innerWidth * next, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      const prev = Math.max(0, idx - 1);
      deck.scrollTo({ left: window.innerWidth * prev, behavior: 'smooth' });
    }
  });
</script>
</body>
</html>
```

## 用法

- **封面页**(`.cover`)—— `.badge` 填周次和日期区间,`h1` 写一句话主题(`<em>` 高亮周次),`.meta` 行放作者 / 受众 / 阅读时长。
- **头条页**(`.headline`)—— `.headline-num` 放本周最大的一个数字,配 `small` 说明;`.headline-text` 承载叙事 `h2` + 补充 `p`。
- **已发布 / 进行中**(`.item-list` + `.item`)—— 每行一项:`.item-num` 编号 + `.item-title` 标题,然后要么是 `.item-meta` owner 标签(已发布),要么是 `.av-row` owner 头像行(进行中)。用 `.av`、`.av-2`、`.av-3` 切换头像颜色。
- **阻塞页**(`.blocked-block`)—— 单个暖色 callout:`h3` 写阻塞点,`p` 写背景,`.blocked-ask` 写明确的求助。保持只有一项。
- **指标页**(`.chart-grid` + `.chart`)—— 每张卡片有标题、`.sub` 方向提示、内联 SVG 迷你折线、`.big-num` 和 `.delta`(负向变化加 `.warn`)。改 `points` 即可重塑折线。
- **求助页**(`.asks` + `.ask`)—— 每个团队一张卡:`.who`(头像 + 团队)、`h3` 请求、`p` 后果。
- **收尾页**(`.closer`)—— 一句大字 "这就是本周。",一段感谢 `p`,以及 `.signature`(头像 + 姓名 + 联系方式)。
- 页码(`.pageno`)和导航圆点是逐页的;增删页面时记得更新 `NN / total`。方向键 / PageUp / PageDown 与圆点都可导航。
