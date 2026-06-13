---
slug: packs/design-pack/templates/experiment-readout-zh
type: template
lang: zh
category: data
title: "实验复盘"
title_en: "NevoFlux Experiment Readout"
description: "把 A/B 或产品实验转成行动建议:假设 + 指标 + 结果 + 解释 + 决策。"
tags: [experiment, ab-test, growth, product, data, 实验, 复盘, 模板]
sample_image: packs/design-pack/assets/templates/experiment-readout.svg
source: html-anything/experiment-readout
---
## 设计指导

这不是普通数据报告,也不是 dashboard。目标是回答一个问题:"这个实验说明了什么,我们下一步应该上线、停止、继续跑,还是重新设计?"

适合输入:
- A/B test、增长实验、定价实验、onboarding 改版、功能灰度、邮件实验。
- 可以是 markdown、CSV、表格粘贴或混合记录。

必须输出的结构:
1. Header:实验名称、owner、日期、实验状态、decision。
2. Hypothesis:原始假设,必须改写成可验证句式。
3. Setup:audience、variant、duration、sample size、primary metric、guardrail metrics。
4. Result snapshot:primary metric lift、absolute delta、sample、confidence / caveat。
5. Metric table:Control vs Variant,primary + secondary + guardrail。
6. Interpretation:解释结果为什么发生,区分 signal、noise、unknown。
7. Decision:Ship / iterate / extend / stop 四选一,并给理由。
8. Follow-up experiments:2-4 个下一步实验,每个包含 hypothesis、expected impact、effort。
9. Instrumentation notes:数据缺口、埋点问题、样本偏差。

设计要求:
- 产品数据团队风格:清楚、可信、行动导向。
- 首屏必须有大号 decision badge 和 primary metric delta。
- 图表可以用 CSS / SVG / Chart.js;如果用 Chart.js,canvas 外层必须固定高度。
- 不要把结果包装得过度确定;小样本或缺少显著性时必须明确 caveat。

风格模板(选一种,不要三种混用):浅色 product-readout(默认,适合 PM / growth / leadership)、研究实验室 lab-notebook(early-stage、定性 + 定量混合、需要保留 caveat 的探索实验)、深色 growth-console(增长团队、实时指标、漏斗 / activation / conversion)。没有指定时优先用 product-readout;材料强调研究过程和不确定性时用 lab-notebook;材料强调增长指标、漏斗或实时监控时用 growth-console。

内容真实性:
- 只使用用户提供的数据。不要捏造 p-value、confidence、样本量。
- 没有统计显著性信息时,用 "directional" / "inconclusive" / "needs more data" 表达。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>实验复盘 · GBrain 上手清单</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#102027;--muted:#667085;--paper:#f3f7f4;--line:#dbe5dd;--green:#16865a;--amber:#b7791f;--blue:#2563eb}
    *{box-sizing:border-box} body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,"Noto Sans SC",system-ui,sans-serif}
    .page{max-width:1160px;margin:0 auto;padding:40px 26px 56px}.card{border:1px solid var(--line);background:rgba(255,255,255,.76);border-radius:6px}
    .label{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}.pill{border-radius:999px;padding:6px 10px;font-size:11px;font-weight:800}
    table{width:100%;border-collapse:collapse} th,td{border-bottom:1px solid var(--line);padding:13px;text-align:left;font-size:13px} th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
    .bar{height:12px;border-radius:999px;background:#e5ebe7;overflow:hidden}.bar span{display:block;height:100%;border-radius:999px;background:var(--green)}
  </style>
</head>
<body>
  <main class="page">
    <section class="card p-7">
      <div class="flex flex-wrap justify-between gap-3 mb-7">
        <div class="flex flex-wrap gap-2"><span class="pill bg-[#e8f8ef] text-[var(--green)]">实验复盘</span><span class="pill bg-white border border-[var(--line)]">2026-05-06 → 2026-05-20</span><span class="pill bg-white border border-[var(--line)]">负责人:增长 PM</span></div>
        <span class="pill bg-[#fff7e6] text-[var(--amber)]">方向性结论,暂无 p 值</span>
      </div>
      <div class="grid md:grid-cols-[1fr_340px] gap-8 items-end">
        <div>
          <div class="label mb-2">决策</div>
          <h1 class="text-5xl md:text-6xl font-extrabold leading-[.95] tracking-tight">迭代后放量到 50%。</h1>
          <p class="mt-5 text-lg leading-8 text-[var(--muted)] max-w-3xl">GBrain 上手清单把 7 日激活率提升了 5.5 个绝对百分点,主要来自更多新工作区完成了首个知识源的索引。数据源连接这一步制造了支持工单压力,全量上线前需要先弱化。</p>
        </div>
        <div class="card p-5 bg-[#eefbf4]">
          <div class="label text-[var(--green)]">核心指标</div>
          <div class="mt-2 text-6xl font-extrabold">+5.5pp</div>
          <p class="mt-2 text-sm text-[var(--muted)]">7 日内激活:21.4% → 26.9%</p>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <div class="card p-5"><div class="label">假设</div><p class="mt-3 text-sm leading-6">引导式清单能帮新工作区完成首个 GBrain 知识源索引,并发布第一个 Canvas 应用。</p></div>
      <div class="card p-5"><div class="label">受众</div><p class="mt-3 text-sm leading-6">已邀请 2-20 名成员的新 NevoFlux 工作区。</p></div>
      <div class="card p-5"><div class="label">护栏指标</div><p class="mt-3 text-sm leading-6">支持工单从每 100 个工作区 6.2 升至 7.1;工作区删除率持平。</p></div>
    </section>

    <section class="grid lg:grid-cols-[1.05fr_.95fr] gap-5 mt-5">
      <div class="card overflow-hidden">
        <div class="p-5 border-b border-[var(--line)]"><div class="label">指标表</div></div>
        <table>
          <thead><tr><th>指标</th><th>对照组</th><th>实验组</th><th>解读</th></tr></thead>
          <tbody>
            <tr><td><b>激活率</b></td><td>21.4%</td><td>26.9%</td><td class="text-[var(--green)] font-bold">正向信号</td></tr>
            <tr><td><b>索引 GBrain 知识源</b></td><td>38.1%</td><td>47.4%</td><td>变化最大</td></tr>
            <tr><td><b>发布 Canvas 应用</b></td><td>44.8%</td><td>46.1%</td><td>小幅提升</td></tr>
            <tr><td><b>支持工单 / 100</b></td><td>6.2</td><td>7.1</td><td class="text-[var(--amber)] font-bold">需关注</td></tr>
            <tr><td><b>工作区删除率</b></td><td>4.8%</td><td>5.0%</td><td>护栏持平</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card p-5">
        <div class="label mb-5">激活漏斗变化</div>
        <div class="space-y-5">
          <div><div class="flex justify-between text-sm mb-2"><b>对照组激活</b><span>21.4%</span></div><div class="bar"><span style="width:21.4%"></span></div></div>
          <div><div class="flex justify-between text-sm mb-2"><b>实验组激活</b><span>26.9%</span></div><div class="bar"><span style="width:26.9%"></span></div></div>
          <div><div class="flex justify-between text-sm mb-2"><b>对照组索引知识源</b><span>38.1%</span></div><div class="bar"><span style="width:38.1%;background:var(--blue)"></span></div></div>
          <div><div class="flex justify-between text-sm mb-2"><b>实验组索引知识源</b><span>47.4%</span></div><div class="bar"><span style="width:47.4%;background:var(--blue)"></span></div></div>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <article class="card p-5"><span class="pill bg-[#e8f8ef] text-[var(--green)]">下一步上线</span><h3 class="mt-4 text-xl font-extrabold">放量到 50%</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">保持清单可见,但降低 GBrain 数据源连接环节的压力。</p></article>
      <article class="card p-5"><span class="pill bg-[#fff7e6] text-[var(--amber)]">修复摩擦</span><h3 class="mt-4 text-xl font-extrabold">拆分数据源步骤</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">增加"暂时跳过"和"稍后连接";工程评估 2 天。</p></article>
      <article class="card p-5"><span class="pill bg-[#eef2ff] text-[var(--blue)]">量化</span><h3 class="mt-4 text-xl font-extrabold">计算显著性</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">在 100% 全量前补上 p 值或贝叶斯判读。</p></article>
    </section>
  </main>
</body>
</html>
```

## 用法

- 头部 pill —— 复盘标签、实验日期区间、负责人;右侧琥珀色 pill 用来标注置信度 caveat(例如"方向性结论,暂无 p 值")。
- `决策`区块 —— 大号标题就是一句话决策(上线 / 迭代 / 延长 / 停止),下方段落用平实语言解释。
- `核心指标`卡 —— 唯一最重要的 delta(此处 `+5.5pp`),下面给出前 → 后的读数。
- 三张上下文卡 —— `假设`、`受众`、`护栏指标`,每张保持一到两句。
- `指标表` —— 每个指标一行(对照组 vs 实验组)并附简短`解读`;正向信号用绿色,需关注项用琥珀色。
- 漏斗区块 —— 水平条形;把每个 `span` 的 width 设为指标百分比,次要指标把 `background` 切换成 `var(--blue)`。
- 后续实验卡 —— 2-4 个下一步;pill 标明类型(下一步上线 / 修复摩擦 / 量化),正文给出动作和工作量。
