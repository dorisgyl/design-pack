---
slug: packs/design-pack/templates/finance-report-zh
type: template
lang: zh
category: finance
title: "季度财报"
title_en: "NevoFlux Quarterly Report"
description: "财务风格的单页报告:报头、核心 KPI、增长/成本图表、损益概要表、重点客户与下季展望。"
tags: [financial, p&l, mrr, 财报, 模板]
sample_image: packs/design-pack/assets/templates/finance-report.svg
source: html-anything/finance-report
---

## 设计指导

一份财务向的单页报告,把硬性数字、图表与简短的文字洞察结合在一起。意图:在桌面端查看的、接近印刷质感的季度报告(长页面)。

自上而下的布局:

- **报头(masthead)**:左侧放公司名、季度与报告标题;右侧放一个状态徽章(如「内部」)。下方用一条粗分隔线与正文隔开。
- **导语(lede)**:一句灰色的概述,定调本季度。
- **核心 KPI**:一排 4 张 KPI 卡片。每张卡片包含大写等宽小标签、衬线大数字,以及带颜色的环比/同比变化(绿色上升 / 红色下降 / 灰色持平)。
- **图表行**:左侧一张较宽的增长图(内联 SVG 面积 + 趋势线,外加一条虚线计划线),右侧一块较窄的「使用去向」面板,由带标签的水平条组成。
- **概要表格**:斑马纹友好的表格,数字用等宽字体右对齐,按周期分列,环比/同比变化带颜色,底部有一行加粗的合计行,用一条粗上边框分隔。
- **重点客户表**:每行一个带渐变 logo 色块的工作区,含套餐、地区、活跃席位与带颜色的状态药丸(绿 / 黄 / 红)。
- **展望(outlook)**:两栏布局——左侧一句大号引言,右侧是负责人签名段落与下季指引。
- **页脚(footer)**:等宽、大写的保密提示行加页码标记。

设计细节:

- 暖色纸张底色配白色报告卡,细中性边框与柔和投影。
- 全局只用一个青色强调色,用于图表描边、条形填充、强调文字与 logo 渐变;其余都是中性的墨色/灰色层次。
- 标题、公司名与 KPI 数值用衬线展示字体;正文用系统无衬线字体;标签、数字与元信息用等宽字体。
- 图表全部是占位用的内联 SVG(面积 + 折线)与 CSS 条形,页面完全自包含,不依赖任何外部资源。
- 表格使用浅色行边框、大写等宽列头、右对齐的等宽数字与小状态药丸。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux — 第三季度产品报告</title>
<style>
  :root {
    --bg: #f7f6f2;
    --paper: #ffffff;
    --ink: #11141a;
    --muted: #5f6573;
    --line: #e6e3dd;
    --line-strong: #c8c2b6;
    --accent: #1f6e8c;
    --accent-soft: #e7f0f4;
    --positive: #1f8c5c;
    --negative: #b13b3b;
    --display: 'Iowan Old Style', 'Charter', 'Iowan', Georgia, serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    font-size: 14px;
    line-height: 1.55;
  }
  .page {
    max-width: 980px;
    margin: 32px auto;
    padding: 56px 64px;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 24px 60px rgba(28,27,26,0.06);
  }
  header.masthead { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 18px; border-bottom: 2px solid var(--ink); margin-bottom: 28px; }
  .mast-left { display: flex; flex-direction: column; gap: 6px; }
  .mast-co { font-family: var(--display); font-size: 32px; letter-spacing: -0.01em; font-weight: 700; }
  .mast-meta { font-family: var(--mono); font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .mast-badge {
    font-family: var(--mono); font-size: 11px; padding: 5px 10px; border-radius: 4px;
    border: 1px solid var(--ink); color: var(--ink); text-transform: uppercase; letter-spacing: 0.08em;
  }

  h2 { font-family: var(--display); font-size: 19px; margin: 36px 0 14px; letter-spacing: -0.005em; font-weight: 700; }
  h2 .accent { color: var(--accent); }
  .lede { color: var(--muted); max-width: 64ch; }

  /* KPI strip */
  .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 8px 0 28px; }
  .kpi { padding: 16px 18px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .kpi .label { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
  .kpi .value { font-family: var(--display); font-size: 28px; font-weight: 700; margin-top: 6px; line-height: 1; letter-spacing: -0.01em; }
  .kpi .delta { font-family: var(--mono); font-size: 11.5px; margin-top: 6px; }
  .delta.up { color: var(--positive); }
  .delta.down { color: var(--negative); }
  .delta.flat { color: var(--muted); }

  /* Charts */
  .chart-row { display: grid; grid-template-columns: 1.6fr 1fr; gap: 14px; }
  .card { padding: 18px 20px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .card h3 { margin: 0 0 4px; font-size: 14px; font-weight: 600; }
  .card .sub { font-size: 12px; color: var(--muted); }
  .chart svg { width: 100%; height: 200px; display: block; margin-top: 8px; }
  .legend { display: flex; gap: 14px; font-size: 11.5px; color: var(--muted); margin-top: 6px; }
  .legend .swatch { display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 6px; vertical-align: middle; }
  .legend .a { background: var(--accent); }
  .legend .b { background: var(--ink); opacity: 0.6; }

  /* Bars */
  .bars { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
  .bar-row { display: grid; grid-template-columns: 110px 1fr 60px; gap: 10px; align-items: center; font-size: 12.5px; }
  .bar-row .label { color: var(--muted); }
  .bar-track { background: var(--accent-soft); border-radius: 4px; height: 10px; position: relative; overflow: hidden; }
  .bar-fill { background: var(--accent); height: 100%; border-radius: 4px; }
  .bar-value { font-family: var(--mono); font-size: 11.5px; text-align: right; color: var(--ink); }

  /* Tables */
  table { width: 100%; border-collapse: collapse; margin-top: 6px; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); font-size: 13px; vertical-align: middle; }
  th { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); border-bottom: 1px solid var(--line-strong); }
  td.num, th.num { text-align: right; font-family: var(--mono); }
  tr.total td { font-weight: 700; border-top: 2px solid var(--ink); border-bottom: none; padding-top: 14px; }
  .badge { display: inline-block; padding: 2px 8px; font-size: 11px; border-radius: 999px; font-weight: 500; }
  .badge.green { background: #e7f4ee; color: var(--positive); }
  .badge.amber { background: #fbf0d6; color: #8a6912; }
  .badge.red { background: #f7e1e1; color: var(--negative); }
  .logo { display: inline-flex; width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg, var(--accent), #2c98c5); margin-right: 10px; vertical-align: middle; }

  /* Outlook */
  .outlook { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
  .outlook .quote { padding: 18px; background: var(--accent-soft); border-left: 3px solid var(--accent); border-radius: 6px; font-family: var(--display); font-size: 16px; line-height: 1.5; }
  .outlook .signoff { font-size: 13px; color: var(--muted); }
  .outlook .signoff strong { color: var(--ink); display: block; font-family: var(--display); font-size: 16px; margin-bottom: 2px; }
  footer { margin-top: 40px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

  @media (max-width: 760px) {
    .page { padding: 32px 24px; margin: 0; border-radius: 0; }
    .kpis { grid-template-columns: 1fr 1fr; }
    .chart-row { grid-template-columns: 1fr; }
    .outlook { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<div class="page">
  <header class="masthead">
    <div class="mast-left">
      <div class="mast-meta">NevoFlux · 25 财年 Q3</div>
      <div class="mast-co">季度产品报告</div>
      <div class="mast-meta">产品运营出品 · 2025 年 10 月 14 日发布</div>
    </div>
    <div class="mast-badge">内部</div>
  </header>

  <p class="lede">第三季度在采用与活跃度上均超额完成计划。NevoFlux 浏览器月活会话突破 840 万,GBrain 知识库增长创历史新高,社区交付的 Canvas 应用数量翻倍有余。中小客户的激活率仍是进入 Q4 后需要重点关注的指标。</p>

  <h2>核心 KPI</h2>
  <div class="kpis">
    <div class="kpi">
      <div class="label">月活会话</div>
      <div class="value">842 万</div>
      <div class="delta up">▲ 环比 14.6%</div>
    </div>
    <div class="kpi">
      <div class="label">新增 GBrain 知识库</div>
      <div class="value">18.4 万</div>
      <div class="delta up">▲ 环比 22.0%</div>
    </div>
    <div class="kpi">
      <div class="label">智能体任务成功率</div>
      <div class="value">82%</div>
      <div class="delta up">▲ 同比 3 pp</div>
    </div>
    <div class="kpi">
      <div class="label">交付的 Canvas 应用</div>
      <div class="value">2.7 万</div>
      <div class="delta up">▲ 环比 4 千</div>
    </div>
  </div>

  <h2>采用与使用</h2>
  <div class="chart-row">
    <div class="card">
      <h3>活跃会话 · 近 12 个月</h3>
      <div class="sub">单位:百万,按月</div>
      <div class="chart">
        <svg viewBox="0 0 720 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.32"/>
              <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polygon fill="url(#lg)" points="20,180 20,150 80,140 140,128 200,118 260,110 320,98 380,92 440,80 500,72 560,60 620,52 680,40 700,40 700,180" />
          <polyline fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"
            points="20,150 80,140 140,128 200,118 260,110 320,98 380,92 440,80 500,72 560,60 620,52 680,40" />
          <polyline fill="none" stroke="#11141a" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="3 3"
            points="20,165 80,158 140,150 200,142 260,134 320,128 380,122 440,116 500,108 560,102 620,96 680,90" />
          <circle cx="680" cy="40" r="3.5" fill="var(--accent)"/>
        </svg>
        <div class="legend">
          <span><span class="swatch a"></span>活跃会话</span>
          <span><span class="swatch b"></span>计划</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>使用去向</h3>
      <div class="sub">会话占比,Q3</div>
      <div class="bars">
        <div class="bar-row"><span class="label">GBrain</span><div class="bar-track"><div class="bar-fill" style="width: 78%"></div></div><span class="bar-value">310 万</span></div>
        <div class="bar-row"><span class="label">Canvas 应用</span><div class="bar-track"><div class="bar-fill" style="width: 60%"></div></div><span class="bar-value">240 万</span></div>
        <div class="bar-row"><span class="label">智能体 / SDK</span><div class="bar-track"><div class="bar-fill" style="width: 36%"></div></div><span class="bar-value">140 万</span></div>
        <div class="bar-row"><span class="label">扩展包</span><div class="bar-track"><div class="bar-fill" style="width: 28%"></div></div><span class="bar-value">110 万</span></div>
        <div class="bar-row"><span class="label">设计技能</span><div class="bar-track"><div class="bar-fill" style="width: 18%"></div></div><span class="bar-value">68 万</span></div>
      </div>
    </div>
  </div>

  <h2>活跃度概要</h2>
  <table>
    <thead>
      <tr>
        <th>指标</th>
        <th class="num">25 财年 Q3</th>
        <th class="num">25 财年 Q2</th>
        <th class="num">环比 Δ</th>
        <th class="num">24 财年 Q3</th>
        <th class="num">同比 Δ</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>月活会话</td><td class="num">842 万</td><td class="num">734 万</td><td class="num" style="color: var(--positive);">+14.6%</td><td class="num">592 万</td><td class="num" style="color: var(--positive);">+42.2%</td></tr>
      <tr><td>每会话 GBrain 查询</td><td class="num">11.5</td><td class="num">10.2</td><td class="num" style="color: var(--positive);">+12.7%</td><td class="num">8.1</td><td class="num" style="color: var(--positive);">+42.0%</td></tr>
      <tr><td>交付的 Canvas 应用</td><td class="num">2.70 万</td><td class="num">2.30 万</td><td class="num" style="color: var(--positive);">+17.5%</td><td class="num">1.85 万</td><td class="num" style="color: var(--positive);">+45.8%</td></tr>
      <tr><td>每周智能体运行</td><td class="num">402 万</td><td class="num">318 万</td><td class="num" style="color: var(--positive);">+26.4%</td><td class="num">266 万</td><td class="num" style="color: var(--positive);">+51.1%</td></tr>
      <tr class="total"><td>日活开发者</td><td class="num">28.9 万</td><td class="num">17.0 万</td><td class="num" style="color: var(--positive);">+70.0%</td><td class="num">10.8 万</td><td class="num" style="color: var(--positive);">+167.5%</td></tr>
    </tbody>
  </table>

  <h2>重点工作区</h2>
  <table>
    <thead>
      <tr>
        <th>工作区</th>
        <th>套餐</th>
        <th>地区</th>
        <th class="num">活跃席位</th>
        <th>状态</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><span class="logo"></span>Pioneer Robotics</td><td>企业版</td><td>欧洲中东非</td><td class="num">612</td><td><span class="badge green">已续约</span></td></tr>
      <tr><td><span class="logo"></span>Atlas Cooperative</td><td>企业版</td><td>亚太</td><td class="num">486</td><td><span class="badge green">已扩容</span></td></tr>
      <tr><td><span class="logo"></span>Foundry Group</td><td>团队 Plus</td><td>北美</td><td class="num">320</td><td><span class="badge amber">续约中</span></td></tr>
      <tr><td><span class="logo"></span>Voltage Co.</td><td>企业版</td><td>北美</td><td class="num">298</td><td><span class="badge green">已续约</span></td></tr>
      <tr><td><span class="logo"></span>Lattice Health</td><td>团队 Plus</td><td>欧洲中东非</td><td class="num">214</td><td><span class="badge red">有流失风险</span></td></tr>
    </tbody>
  </table>

  <h2>展望 · Q4</h2>
  <div class="outlook">
    <div class="quote">「我们带着全年最强的路线图进入 Q4——GBrain 多库联动、原生 Canvas 共享与开放的智能体 SDK——并拥有不减速就能把它交付出来的团队。」</div>
    <div class="signoff">
      <strong>Mira Okafor,产品负责人</strong>
      我们预计月活会话达到 910–940 万,新增 GBrain 知识库 20–22 万,智能体任务成功率保持在 80% 以上。两个待办事项是:中小客户激活(将在 11 月更新中发布全新的引导流程)与欧洲中东非边缘节点的上线——后者将于 11 月中旬正式可用(GA)。
    </div>
  </div>

  <footer>
    <span>NevoFlux · 25 财年 Q3 · 仅限内部使用</span>
    <span>第 1 页 / 共 1 页</span>
  </footer>
</div>
</body>
</html>
```

## 用法

填写以下槽位,保持结构与类名不变:

- **报头**(`.masthead`):设置产品/团队名、季度(`25 财年 Q3`)、报告标题、出品/发布日期行,以及右侧徽章(`内部`、`机密`、`草稿`)。
- **导语**(`.lede`):用一句话概述本季度并点出需要关注的指标。
- **核心 KPI**(`.kpis` / `.kpi`):四张卡片,每张含大写 `label`、大号 `value` 与 `delta`(`up` / `down` / `flat`)——按变化方向更换箭头与颜色类。
- **采用图**(`.chart svg`):编辑面积 `polygon`、实线 `polyline`(实际值)与虚线 `polyline`(计划值)的 `points`,并更新图例文字。
- **使用条形**(`.bars` / `.bar-row`):每个方向一行,设置 `bar-fill` 的 `width:%` 与 `bar-value` 数字。
- **活跃度表格**:每个指标一行、按周期分列;用 `var(--positive)` / `var(--negative)` 给每个变化单元格上色。最后的 `tr.total` 行是加粗的头条指标。
- **重点工作区表格**:每个客户一行,含 `.logo` 色块、套餐、地区、席位数与状态 `badge`(`green` / `amber` / `red`)。
- **展望**(`.outlook`):左侧一句引言 `quote`,右侧 `signoff`(姓名 + 指引段落)。
- **页脚**:保密提示行与页码标记。

所有视觉元素均为内联 SVG / CSS,页面完全自包含——无需任何外部 URL 或资源。
