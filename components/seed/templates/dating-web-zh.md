---
slug: packs/design-pack/templates/dating-web-zh
type: template
lang: zh
category: dashboard
title: "社区 / 配对数据墙"
title_en: "NevoFlux Signals Dashboard"
description: "面向 NevoFlux 工作区的杂志感数据墙：信号 ticker + 头条 KPI + 30 天活动柱状图 + 趋势区块。"
tags: [dating, community, consumer, 模板]
sample_image: packs/design-pack/assets/templates/dating-web.svg
source: html-anything/dating-web
---

## 设计指导

带消费产品气质的杂志式「数据墙」：衬线 display 字体搭配等宽字体的注释口吻，落在暖纸色调上，配以克制、有意为之的高亮色。

布局：
- 左侧导航栏（品牌、登录用户、分组链接列表、在线状态）。
- 顶部 ticker 横条，展示实时信号。
- 头条 KPI，采用 3 列统计网格。
- 30 天活动柱状图（内联 SVG，最后两根柱子用高亮色强调）。
- 趋势区块，配一段简短的编辑导语。

设计细节：
- 暖纸色背景（`--paper` / `--panel`），深墨色文字，柔和的发丝分隔线（`--rule`）。
- 单一高亮色（`--accent`，焦橙色）加上语义化的 good/bad；任何时候都不超过一种重色。
- 大号衬线 display 数字，启用等宽数字（`font-feature-settings: 'tnum'`）；等宽、大写、宽字距的标签。
- 用发丝边框分隔每个区域，而非卡片或阴影。
- 宽度小于 1100px 时由双列收起为单列；KPI 网格由三列降为两列。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux · 你的工作区，由你的智能体交付的成果来衡量</title>
  <style>
    :root {
      --paper: #f4ede0;
      --panel: #f9f3e7;
      --ink: #1f1c14;
      --muted: #7a7264;
      --rule: #d6cdb6;
      --accent: #c14a2b;
      --good: #406b3a;
      --bad: #b6422f;
      --serif-display: 'DM Serif Display', 'Iowan Old Style', Georgia, serif;
      --serif-body: 'DM Serif Text', 'Iowan Old Style', Georgia, serif;
      --mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font: 14px/1.55 var(--serif-body); }

    .ticker {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 28px;
      border-bottom: 1px solid var(--ink);
      font: 11px/1 var(--mono);
      color: var(--muted);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .ticker .left { display: flex; align-items: center; gap: 18px; }
    .ticker b { color: var(--ink); font-weight: 500; }

    .layout { display: grid; grid-template-columns: 232px 1fr; min-height: calc(100vh - 44px); }
    aside.rail {
      border-right: 1px solid var(--ink);
      padding: 22px 22px 22px 28px;
      display: flex; flex-direction: column; gap: 22px;
    }
    aside .brand { font: italic 800 30px/1 var(--serif-display); letter-spacing: -0.005em; }
    aside .brand .dot { color: var(--accent); }
    aside .user { display: flex; align-items: center; gap: 10px; }
    aside .avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--ink); color: var(--paper); display: grid; place-items: center; font: 700 12px/1 var(--mono); letter-spacing: 0.06em; }
    aside .user .meta { font: 13px/1.2 var(--mono); }
    aside .user .meta b { display: block; color: var(--ink); font-weight: 500; }
    aside .user .meta span { color: var(--muted); font-size: 11px; letter-spacing: 0.06em; }

    aside h4 { font: 11px/1 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; margin: 0 0 10px; }
    aside ul { list-style: none; padding: 0; margin: 0 0 14px; display: flex; flex-direction: column; gap: 4px; }
    aside li { display: flex; justify-content: space-between; align-items: center; padding: 5px 8px; border-radius: 4px; font: 15.5px/1.2 var(--serif-body); color: var(--ink); cursor: default; }
    aside li.active { background: rgba(193,74,43,0.10); color: var(--accent); font-weight: 600; }
    aside li.active::before { content: '●'; color: var(--accent); margin-right: 6px; font-size: 9px; }
    aside li .badge { background: var(--accent); color: var(--paper); font: 10px/1 var(--mono); padding: 3px 6px; border-radius: 999px; letter-spacing: 0.06em; }
    aside li .badge.gray { background: var(--ink); }

    aside .status {
      margin-top: auto;
      padding-top: 18px;
      border-top: 1px solid var(--rule);
      font: 11px/1.4 var(--mono);
      color: var(--muted);
      letter-spacing: 0.06em;
    }
    aside .status .live::before { content: '●'; color: #2f7d4a; margin-right: 6px; }

    main { padding: 30px 36px 44px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(120px, auto);
      gap: 22px 36px;
      margin-bottom: 36px;
    }
    .stat { padding: 4px 0 14px; border-bottom: 1px solid var(--rule); }
    .stat .label { font: 11px/1.4 var(--mono); color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 6px; }
    .stat .value {
      font: 800 56px/1.05 var(--serif-display);
      letter-spacing: -0.01em;
      font-feature-settings: 'tnum';
      margin-bottom: 6px;
    }
    .stat .value.good { color: var(--good); }
    .stat .value.bad { color: var(--bad); }
    .stat .value em { font-style: italic; font-weight: 400; }
    .stat .note { font: italic 13.5px/1.4 var(--serif-body); color: var(--muted); max-width: 32ch; }
    .stat .arrow { font-style: normal; color: var(--good); font-size: 14px; }

    .panel { padding: 18px 0 24px; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--rule); margin-bottom: 18px; }
    .panel-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 14px; }
    .panel-head h3 { margin: 0; font: italic 24px/1 var(--serif-display); letter-spacing: -0.005em; }
    .panel-head .meta { font: 11px/1.4 var(--mono); color: var(--muted); letter-spacing: 0.16em; text-transform: uppercase; max-width: 56ch; text-align: right; }
    .panel svg { width: 100%; height: 220px; display: block; }
    .panel .axis { display: flex; justify-content: space-between; font: 10px/1 var(--mono); color: var(--muted); letter-spacing: 0.1em; padding: 8px 4px 0; text-transform: uppercase; }

    .lower-panel .lede { font: italic 15px/1.55 var(--serif-body); color: var(--muted); margin: 0; max-width: 70ch; }
    .lower-panel .lede b { color: var(--ink); font-style: normal; font-weight: 600; }

    @media (max-width: 1100px) {
      .layout { grid-template-columns: 1fr; }
      aside.rail { border-right: none; border-bottom: 1px solid var(--ink); }
      .grid { grid-template-columns: repeat(2, 1fr); gap: 18px 28px; }
    }
  </style>
</head>
<body>
  <div class="ticker" data-od-id="ticker">
    <div class="left">
      <span>你的工作区，由你的智能体交付的成果来衡量</span>
      <span style="opacity:0.6;">·</span>
      <span>每小时同步</span>
    </div>
    <div>下一档位需 <b>2,080 篇 GBRAIN 文档</b></div>
  </div>

  <div class="layout">
    <aside class="rail" data-od-id="rail">
      <div class="brand">nevoflux<span class="dot">.</span></div>
      <div class="user">
        <div class="avatar">nf</div>
        <div class="meta"><b>@samuel</b><span>召回 22.9 · 第三档</span></div>
      </div>

      <div>
        <h4>今日</h4>
        <ul>
          <li>草稿 <span class="badge">3</span></li>
          <li>待审 <span class="badge">3</span></li>
          <li>队列 <span style="font:11px/1 var(--mono);color:var(--muted);">6</span></li>
          <li>通知 <span class="badge gray">12</span></li>
        </ul>
      </div>
      <div>
        <h4>你</h4>
        <ul>
          <li class="active">你的统计</li>
          <li>GBrain 与 包</li>
          <li>已归档 <span style="font:11px/1 var(--mono);color:var(--muted);">14</span></li>
          <li>设置</li>
        </ul>
      </div>
      <div>
        <h4>归档</h4>
        <ul>
          <li>历史发布</li>
          <li>陈旧 Canvas <span style="font:11px/1 var(--mono);color:var(--muted);">7</span></li>
        </ul>
      </div>

      <div class="status">
        <div class="live">在线 · 上次构建 11 分钟前</div>
        <div style="opacity:0.7;margin-top:2px;">nevoflux.v0.6.1</div>
      </div>
    </aside>

    <main data-od-id="main">
      <section class="grid" data-od-id="kpis">
        <div class="stat">
          <div class="label">GBrain 已索引文档</div>
          <div class="value"><em>1,842</em></div>
          <p class="note"><span class="arrow">↑</span> 本周 +41 · 增长健康。</p>
        </div>
        <div class="stat">
          <div class="label">24 小时智能体运行</div>
          <div class="value good">47</div>
          <p class="note">一天内由智能体交付的任务。</p>
        </div>
        <div class="stat">
          <div class="label">已安装的包</div>
          <div class="value"><em>14</em></div>
          <p class="note">4 启用 · 7 休眠 · 3 推荐。</p>
        </div>

        <div class="stat">
          <div class="label">召回命中率</div>
          <div class="value good">14%</div>
          <p class="note">高于同体量工作区的中位数。</p>
        </div>
        <div class="stat">
          <div class="label">已发布 Canvas 应用</div>
          <div class="value"><em>3</em></div>
          <p class="note">今年 7 个原型中的 3 个。你会收尾。</p>
        </div>
        <div class="stat">
          <div class="label">使用中的不稳定技能</div>
          <div class="value bad">4</div>
          <p class="note">尚可控。其中两个已标记待审。</p>
        </div>

        <div class="stat">
          <div class="label">共享设计 token</div>
          <div class="value"><em>214</em></div>
          <p class="note">你最大的一致性资产。</p>
        </div>
        <div class="stat">
          <div class="label">平均构建时长</div>
          <div class="value"><em>2.1<span style="font-size:32px;">s</span></em></div>
          <p class="note">够快。浏览器让 SDK 保持热态。</p>
        </div>
        <div class="stat">
          <div class="label">离线小时数</div>
          <div class="value bad">4</div>
          <p class="note">/ 本周 168。同步全程保持正常。</p>
        </div>
      </section>

      <section class="panel" data-od-id="bars">
        <div class="panel-head">
          <h3>智能体运行 — <em>近 30 天</em></h3>
          <div class="meta">↑ 持续上行 · 本月新增 3 个 CANVAS 应用 · 其中两个来自同一个包</div>
        </div>
        <svg viewBox="0 0 720 220" preserveAspectRatio="none" aria-hidden="true">
          <g fill="#1f1c14">
            <rect x="6"   y="170" width="14" height="50"></rect>
            <rect x="30"  y="158" width="14" height="62"></rect>
            <rect x="54"  y="146" width="14" height="74"></rect>
            <rect x="78"  y="172" width="14" height="48"></rect>
            <rect x="102" y="162" width="14" height="58"></rect>
            <rect x="126" y="138" width="14" height="82"></rect>
            <rect x="150" y="120" width="14" height="100"></rect>
            <rect x="174" y="148" width="14" height="72"></rect>
            <rect x="198" y="132" width="14" height="88"></rect>
            <rect x="222" y="108" width="14" height="112"></rect>
            <rect x="246" y="118" width="14" height="102"></rect>
            <rect x="270" y="154" width="14" height="66"></rect>
            <rect x="294" y="130" width="14" height="90"></rect>
            <rect x="318" y="100" width="14" height="120"></rect>
            <rect x="342" y="86"  width="14" height="134"></rect>
            <rect x="366" y="116" width="14" height="104"></rect>
            <rect x="390" y="138" width="14" height="82"></rect>
            <rect x="414" y="92"  width="14" height="128"></rect>
            <rect x="438" y="74"  width="14" height="146"></rect>
            <rect x="462" y="106" width="14" height="114"></rect>
            <rect x="486" y="84"  width="14" height="136"></rect>
            <rect x="510" y="124" width="14" height="96"></rect>
            <rect x="534" y="98"  width="14" height="122"></rect>
            <rect x="558" y="68"  width="14" height="152"></rect>
            <rect x="582" y="80"  width="14" height="140"></rect>
            <rect x="606" y="46"  width="14" height="174" fill="#c14a2b"></rect>
            <rect x="630" y="60"  width="14" height="160" fill="#c14a2b"></rect>
            <rect x="654" y="92"  width="14" height="128"></rect>
            <rect x="678" y="76"  width="14" height="144"></rect>
            <rect x="702" y="90"  width="14" height="130"></rect>
          </g>
        </svg>
        <div class="axis"><span>3月18</span><span>3月25</span><span>4月1</span><span>4月8</span><span>4月15</span><span>今天</span></div>
      </section>

      <section class="panel lower-panel" data-od-id="trend">
        <div class="panel-head">
          <h3>召回命中率 — <em>近 12 周</em></h3>
          <div class="meta">从 8% 稳步爬升至 14%。可归因于一次包安装（DESIGN-PACK，第 4 周）。</div>
        </div>
        <p class="lede">是真实的爬升，不是感觉。<b>一次包安装</b> 对召回命中率的提升，胜过四个月的提示词微调——继续用那个包喂养 GBrain，多索引，少猜测。</p>
      </section>
    </main>
  </div>
</body>
</html>
```

## 用法

- `ticker` — 实时信号横条；左侧是标语，右侧是下一档位目标。
- `rail` — 左侧导航：`brand`、登录 `user`（账号、召回比率、档位）、分组链接列表（今日 / 你 / 归档）配数量徽标，底部一行在线 `status`。
- `kpis` — 3x3 的头条统计网格。每个 `stat` 含等宽 `label`、衬线 display 的 `value`（加 `good` / `bad` 上色，数字包 `em` 变斜体）以及一段斜体 `note`。
- `bars` — 30 天活动图。柱高由 SVG `rect` 的 `y`/`height` 控制；给最近的柱子加 `fill="#c14a2b"` 以高亮。`axis` 标签随时间范围更新。
- `trend` — 收尾区块：`panel-head` 含大写的 `meta` 注释，加一段编辑导语 `lede`（加粗关键驱动因素）。
