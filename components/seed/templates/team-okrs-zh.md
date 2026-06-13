---
slug: packs/design-pack/templates/team-okrs-zh
type: template
lang: zh
category: dashboard
title: "团队 OKR 追踪"
title_en: "NevoFlux Team OKRs"
description: "季度 OKR 追踪页:季度 banner、3 个目标及关键结果进度条、负责人、状态药丸,以及右侧一览侧栏。"
tags: [okr, objectives, key results, 目标, 模板]
sample_image: packs/design-pack/assets/templates/team-okrs.svg
source: html-anything/team-okrs
---
## 设计指导

一个一眼即可看出进度的 OKR 追踪页。意图:在单页桌面视图(目标宽度 1440)上呈现本季度的整体进展。

布局:
- 顶部为季度 banner(Q? + 主题),右侧给出整体百分比。
- 主区域纵向堆叠 3 个目标卡片/列,每个目标包含一组关键结果(KR)。
- 每个关键结果配一条进度条,加上数值、负责人头像和状态药丸。
- 右侧 “本季度一览” 侧栏汇总整体状态。

设计细节:
- 低对比度的中性背景,搭配白色卡片表面,并克制地使用单一蓝色强调色。
- 季度 banner 为深色斜向渐变,右侧是大号浅蓝色百分比数字。
- 目标卡片带有等宽大写编号、标题、负责人头像(渐变填充),以及带颜色的状态药丸(进展顺利 / 有风险 / 已偏离)。
- 关键结果进度条是细圆角轨道,渐变填充随状态切换颜色(蓝 / 琥珀 / 红),使页面自包含、无需外部资源。
- 侧栏使用虚线分隔、等宽数字、带涨跌幅的本周变动项,以及一个着色的阻塞提示框。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux · FY25 Q4 OKR</title>
<style>
  :root {
    --bg: #f5f6f9;
    --paper: #ffffff;
    --ink: #161924;
    --muted: #5d6678;
    --line: #e3e6ee;
    --accent: #2c4ee8;
    --accent-soft: #eaeefe;
    --positive: #1f8a5a;
    --warn: #b58522;
    --danger: #b13b3b;
    --display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 14px; line-height: 1.55; }
  .app { display: grid; grid-template-columns: 1fr 320px; min-height: 100vh; }
  main { padding: 28px 32px 56px; min-width: 0; }
  aside.side { padding: 28px 28px 56px; background: var(--paper); border-left: 1px solid var(--line); }

  .crumb { font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .quarter-banner { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 24px; padding: 28px 32px; background: linear-gradient(135deg, var(--ink), #2a3050); color: white; border-radius: 16px; margin: 6px 0 28px; }
  .quarter-banner h1 { margin: 6px 0 4px; font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
  .quarter-banner .meta { color: rgba(255,255,255,0.72); font-size: 13.5px; }
  .qb-progress { text-align: right; }
  .qb-progress .num { font-size: 56px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; color: #b3c0ff; }
  .qb-progress .label { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.6); margin-top: 4px; }

  /* Objective cards */
  .objectives { display: flex; flex-direction: column; gap: 16px; }
  .obj { background: var(--paper); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
  .obj-head { padding: 22px 26px; border-bottom: 1px solid var(--line); display: grid; grid-template-columns: 1fr auto auto; gap: 18px; align-items: center; }
  .obj-title { display: flex; flex-direction: column; gap: 4px; }
  .obj-num { font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .obj-name { font-size: 19px; font-weight: 600; letter-spacing: -0.005em; line-height: 1.35; max-width: 60ch; }
  .obj-owner { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); }
  .av { width: 30px; height: 30px; border-radius: 50%; color: white; font-size: 11.5px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
  .av-mr { background: linear-gradient(135deg, #d6336c, #ff7a9b); }
  .av-pb { background: linear-gradient(135deg, #b58522, #f1b13a); }
  .av-dp { background: linear-gradient(135deg, #2c4ee8, #6e85ff); }
  .pill { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; font-family: var(--mono); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
  .pill .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .pill.on-track { background: rgba(31,138,90,0.12); color: var(--positive); }
  .pill.at-risk { background: rgba(181,133,34,0.12); color: var(--warn); }
  .pill.off-track { background: rgba(177,59,59,0.12); color: var(--danger); }

  .krs { padding: 8px 0; }
  .kr { display: grid; grid-template-columns: 1fr 200px 110px; gap: 18px; padding: 16px 26px; border-top: 1px solid var(--line); align-items: center; }
  .kr:first-child { border-top: none; }
  .kr-name { font-size: 14px; }
  .kr-name strong { display: block; font-weight: 500; }
  .kr-name small { color: var(--muted); display: block; margin-top: 2px; font-family: var(--mono); font-size: 11px; }
  .kr-bar { height: 8px; background: var(--bg); border-radius: 999px; overflow: hidden; position: relative; }
  .kr-fill { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--accent), #6e85ff); }
  .kr-fill.warn { background: linear-gradient(90deg, var(--warn), #f1b13a); }
  .kr-fill.danger { background: linear-gradient(90deg, var(--danger), #d8625e); }
  .kr-pct { font-family: var(--mono); font-size: 13px; font-weight: 600; text-align: right; }

  /* Sidebar */
  aside.side h3 { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 22px 0 12px; font-weight: 500; }
  aside.side h3:first-child { margin-top: 0; }
  .stat { display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px dashed var(--line); font-size: 13.5px; }
  .stat:first-of-type { border-top: none; padding-top: 4px; }
  .stat strong { font-family: var(--mono); }
  .stat strong.up { color: var(--positive); }
  .stat strong.down { color: var(--danger); }

  .mover { display: grid; grid-template-columns: 30px 1fr auto; gap: 10px; padding: 10px 0; border-top: 1px dashed var(--line); font-size: 13px; align-items: center; }
  .mover:first-of-type { border-top: none; padding-top: 0; }
  .mover .delta { font-family: var(--mono); font-size: 11.5px; color: var(--positive); }
  .mover .delta.down { color: var(--danger); }

  .blocker { padding: 16px; background: rgba(177,59,59,0.06); border: 1px solid rgba(177,59,59,0.2); border-radius: 10px; margin-top: 10px; }
  .blocker strong { color: var(--danger); }
  .blocker p { margin: 6px 0 0; font-size: 12.5px; color: var(--muted); }

  @media (max-width: 1080px) {
    .app { grid-template-columns: 1fr; }
    aside.side { border-left: none; border-top: 1px solid var(--line); }
    .obj-head { grid-template-columns: 1fr; }
    .kr { grid-template-columns: 1fr; }
    .kr-pct { text-align: left; }
  }
</style>
</head>
<body>
<div class="app">
  <main>
    <div class="crumb">NevoFlux / OKR / FY25 / Q4</div>
    <div class="quarter-banner">
      <div>
        <h1>FY25 Q4 · NevoFlux</h1>
        <div class="meta">2025 年 10 月 14 日 → 12 月 31 日 · 负责人 帕克 · 3 个目标 · 9 个关键结果</div>
      </div>
      <div class="qb-progress">
        <div class="num">42%</div>
        <div class="label">季度完成度 · 已过 47% 时间</div>
      </div>
    </div>

    <section class="objectives">
      <article class="obj">
        <div class="obj-head">
          <div class="obj-title"><span class="obj-num">目标 1</span><span class="obj-name">让 NevoFlux 浏览器成为智能体团队买家的必选项。</span></div>
          <div class="obj-owner"><span class="av av-mr">MR</span>瑞迪</div>
          <span class="pill on-track"><span class="dot"></span>进展顺利</span>
        </div>
        <div class="krs">
          <div class="kr">
            <div class="kr-name"><strong>转化 3 个停滞中的平台试点(3 选 3)</strong><small>GBrain 配额阻塞 · 销售:帕克</small></div>
            <div class="kr-bar"><span class="kr-fill" style="width: 67%"></span></div>
            <div class="kr-pct">3 中 2</div>
          </div>
          <div class="kr">
            <div class="kr-name"><strong>GBrain 达到 SOC 2 Type II 就绪</strong><small>控制项:已实现 14 / 16</small></div>
            <div class="kr-bar"><span class="kr-fill" style="width: 88%"></span></div>
            <div class="kr-pct">88%</div>
          </div>
          <div class="kr">
            <div class="kr-name"><strong>上线工作区 SSO + 智能体令牌作用域</strong><small>M3 于 12 月 2 日交付 · 帕克</small></div>
            <div class="kr-bar"><span class="kr-fill" style="width: 60%"></span></div>
            <div class="kr-pct">60%</div>
          </div>
        </div>
      </article>

      <article class="obj">
        <div class="obj-head">
          <div class="obj-title"><span class="obj-num">目标 2</span><span class="obj-name">把新工作区做出第一个 Canvas 应用的时间缩短一半。</span></div>
          <div class="obj-owner"><span class="av av-dp">DP</span>帕克</div>
          <span class="pill at-risk"><span class="dot"></span>有风险</span>
        </div>
        <div class="krs">
          <div class="kr">
            <div class="kr-name"><strong>首个 Canvas 应用中位时长 ≤ 30 分钟</strong><small>基线 72 分钟 · 当前 47 分钟</small></div>
            <div class="kr-bar"><span class="kr-fill warn" style="width: 64%"></span></div>
            <div class="kr-pct">64%</div>
          </div>
          <div class="kr">
            <div class="kr-name"><strong>新工作区激活率 ≥ 50%</strong><small>当前 38% · 上季度 29%</small></div>
            <div class="kr-bar"><span class="kr-fill warn" style="width: 76%"></span></div>
            <div class="kr-pct">76%</div>
          </div>
          <div class="kr">
            <div class="kr-name"><strong>GBrain 上手引导包全量上线至 100%</strong><small>当前为 25% 实验</small></div>
            <div class="kr-bar"><span class="kr-fill warn" style="width: 25%"></span></div>
            <div class="kr-pct">25%</div>
          </div>
        </div>
      </article>

      <article class="obj">
        <div class="obj-head">
          <div class="obj-title"><span class="obj-num">目标 3</span><span class="obj-name">让智能体 SDK 对每位 Canvas 构建者都如原生般顺手。</span></div>
          <div class="obj-owner"><span class="av av-pb">PB</span>班纳吉</div>
          <span class="pill off-track"><span class="dot"></span>已偏离</span>
        </div>
        <div class="krs">
          <div class="kr">
            <div class="kr-name"><strong>SDK 构建的 Canvas 应用占比 ≥ 35%</strong><small>当前 22% · 上季度 19%</small></div>
            <div class="kr-bar"><span class="kr-fill danger" style="width: 22%"></span></div>
            <div class="kr-pct">22%</div>
          </div>
          <div class="kr">
            <div class="kr-name"><strong>重做 SDK 与设计技能相关界面</strong><small>11 月 1 日锁定范围 · 已开始构建</small></div>
            <div class="kr-bar"><span class="kr-fill danger" style="width: 18%"></span></div>
            <div class="kr-pct">18%</div>
          </div>
          <div class="kr">
            <div class="kr-name"><strong>包市场评分 ≥ 4.6(当前 4.2)</strong><small>10 周滚动,需要持续的发布节奏</small></div>
            <div class="kr-bar"><span class="kr-fill danger" style="width: 10%"></span></div>
            <div class="kr-pct">10%</div>
          </div>
        </div>
      </article>
    </section>
  </main>

  <aside class="side">
    <h3>本季度一览</h3>
    <div class="stat"><span>进展顺利的目标</span><strong class="up">3 中 1</strong></div>
    <div class="stat"><span>达标的关键结果</span><strong>9 中 4</strong></div>
    <div class="stat"><span>剩余天数</span><strong>78 中 53</strong></div>
    <div class="stat"><span>风险评分</span><strong class="down">中等</strong></div>

    <h3>本周变动 Top</h3>
    <div class="mover"><span class="av av-mr" style="width:24px;height:24px;font-size:9.5px;">MR</span><span>平台试点 #2 — 已转化</span><span class="delta">+33%</span></div>
    <div class="mover"><span class="av av-dp" style="width:24px;height:24px;font-size:9.5px;">DP</span><span>激活率 · GBrain 漏斗</span><span class="delta">+9 pp</span></div>
    <div class="mover"><span class="av av-pb" style="width:24px;height:24px;font-size:9.5px;">PB</span><span>SDK 快速上手完成度</span><span class="delta down">−2.4%</span></div>

    <h3>阻塞项</h3>
    <div class="blocker">
      <strong>智能体 SDK 的目标 3 已偏离。</strong>
      <p>有两名工程师被借调去攻坚 SSO。要么从目标 3 中砍掉设计技能相关界面,要么在 11 月 4 日前用外包补位。本周五前需要决策。</p>
    </div>
  </aside>
</div>
</body>
</html>
```

## 用法

- **季度 banner**:在 `h1` 中设置季度标签与主题,在 `.meta` 中填日期范围 / 负责人 / 数量,在 `.qb-progress .num` 中填整体进度,并在 `.label` 中补一行上下文。
- **目标**:每个 `.obj` 是一个目标。填写 `.obj-num`、`.obj-name`、负责人头像(`.av` 缩写 + 渐变类)和 `.obj-owner` 姓名,并选择状态药丸(`on-track` / `at-risk` / `off-track`)。
- **关键结果**:每个 `.kr` 是一个 KR——`strong` 为结果,`small` 为等宽副注,`.kr-fill` 的宽度加颜色类(`warn` / `danger`)驱动进度条,`.kr-pct` 为右对齐数值。
- **侧栏**:`.stat` 行用于一览汇总(`up` / `down` 决定数值颜色),`.mover` 行用于本周变动并带 `.delta`(负值加 `down`),`.blocker` 提示框承载当前风险。
