---
slug: packs/design-pack/templates/pm-spec-zh
type: template
lang: zh
category: doc
title: "PRD / 产品 Spec"
title_en: "Product Spec / PRD (NevoFlux One-Pager)"
description: "单页产品需求文档:问题 + 成功指标 + 范围 + user stories + 设计 + 发布 + 待解决问题。"
tags: [prd, spec, 需求, product, 模板]
sample_image: packs/design-pack/assets/templates/pm-spec.svg
source: html-anything/pm-spec
---

## 设计指导

意图:一页结构清晰的产品需求文档。它不是 deck,也不是长文章 —— 评审者应该能从上到下读完,理解问题、押注和计划。

必须输出的结构(按顺序):
- 标题栏 + 状态 pill(draft / approved / shipped),并带 owner、最后更新时间、reviewer 数量。
- 大号标题 + 一段 summary,用平实语言说清这次的押注。
- meta row:squad、engineering lead、design lead、target launch、effort 估算。
- Problem & why now:今天哪里痛、对谁痛,搭配一条用户引述。
- Goals & non-goals:明确"本期交付"清单 + 明确"留到以后"清单。
- Success metrics:3–5 个 KPI,每个带 baseline、target,以及如何度量。
- User stories:几个 persona,用 Given/When/Then 或"As a … I want … so that …"句式。
- Design notes:发布里程碑,每个阶段都在 flag 后面发布(需要时这里放占位 mockup)。
- Open questions:已分配,每条带 owner 头像和 due date。

设计细节:
- 读起来像一份克制、高密度的内部 spec:衬线 display 标题、无衬线正文、mono 用于 label 和元信息。
- 表面保持轻:浅灰底上的白色面板、细发丝边框,一个强调色(靛蓝)克制地用在 pill、target 和 story 强调上。
- 用真实感的示例数据 —— 具体的数字、日期和人名 —— 让结构看起来像一份成稿,而不是空骨架。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Spec — NevoFlux GBrain 语义记忆</title>
<style>
  :root {
    --bg: #f5f7fa;
    --paper: #ffffff;
    --ink: #0e1322;
    --muted: #5a647a;
    --line: #e2e6ee;
    --line-strong: #c8cfdb;
    --accent: #4a36e3;
    --accent-soft: #ece8ff;
    --warn: #b8741a;
    --positive: #1f8a5a;
    --display: 'Charter', Georgia, serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 14.5px; line-height: 1.6; }
  .page { max-width: 1080px; margin: 28px auto; padding: 0 32px 64px; }

  header.top { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--line); margin-bottom: 28px; }
  .top-left { display: flex; align-items: center; gap: 14px; }
  .crumb { font-family: var(--mono); font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
  .pill.draft { background: var(--accent-soft); color: var(--accent); }
  .pill.dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .top-actions { display: flex; gap: 8px; font-size: 12.5px; color: var(--muted); }
  .top-actions span { padding: 4px 10px; border: 1px solid var(--line); border-radius: 8px; }

  h1 { font-family: var(--display); font-size: 42px; line-height: 1.06; letter-spacing: -0.015em; margin: 8px 0 8px; max-width: 22ch; font-weight: 700; }
  .summary { font-size: 17px; color: var(--muted); max-width: 64ch; margin: 0 0 28px; }
  .meta-row { display: flex; gap: 32px; margin: 14px 0 36px; padding: 16px 22px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; font-size: 13px; }
  .meta-row span strong { display: block; font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 4px; font-weight: 500; }

  section { margin-top: 40px; }
  h2 { font-family: var(--display); font-size: 24px; margin: 0 0 4px; letter-spacing: -0.005em; }
  h2 small { display: block; font-family: var(--body); font-size: 13px; color: var(--muted); font-weight: 400; margin-top: 4px; line-height: 1.5; letter-spacing: 0; }

  /* Problem */
  .problem { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; margin-top: 14px; }
  .panel { padding: 22px 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .quote { padding: 22px 24px; background: var(--accent-soft); border-left: 3px solid var(--accent); border-radius: 6px; }
  .quote .body { font-family: var(--display); font-size: 17px; line-height: 1.5; }
  .quote .author { font-family: var(--mono); font-size: 11.5px; color: var(--muted); margin-top: 12px; text-transform: uppercase; letter-spacing: 0.06em; }

  /* Goals */
  .goals { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }
  .goal-list { padding: 22px 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .goal-list h3 { font-family: var(--display); font-size: 16px; margin: 0 0 10px; }
  .goal-list h3 .tick { display: inline-flex; width: 18px; height: 18px; border-radius: 50%; align-items: center; justify-content: center; margin-right: 8px; font-size: 11px; }
  .goal-list h3 .tick.yes { background: var(--positive); color: white; }
  .goal-list h3 .tick.no { background: var(--line-strong); color: var(--muted); }
  .goal-list ul { padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 6px; font-size: 14px; }

  /* Metrics table */
  table { width: 100%; border-collapse: collapse; margin-top: 14px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
  th, td { padding: 12px 18px; text-align: left; font-size: 13.5px; border-bottom: 1px solid var(--line); }
  th { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); background: #f8fafd; }
  tr:last-child td { border-bottom: none; }
  td.target { font-family: var(--mono); color: var(--accent); font-weight: 600; }

  /* Stories */
  .stories { display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
  .story { padding: 18px 22px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: center; }
  .story-num { width: 30px; height: 30px; border-radius: 50%; background: var(--accent-soft); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: var(--mono); font-weight: 600; font-size: 13px; }
  .story-text { font-size: 14.5px; }
  .story-text strong { color: var(--accent); }

  /* Milestones */
  .timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 14px; }
  .step { padding: 18px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; position: relative; }
  .step .badge { display: inline-block; padding: 3px 8px; border-radius: 999px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; background: var(--accent-soft); color: var(--accent); }
  .step h4 { font-family: var(--display); font-size: 15px; margin: 0 0 6px; }
  .step .meta { font-family: var(--mono); font-size: 11px; color: var(--muted); margin-bottom: 8px; }
  .step ul { padding-left: 16px; margin: 0; font-size: 13px; display: flex; flex-direction: column; gap: 4px; }

  /* Open questions */
  .questions { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
  .question { padding: 16px 20px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: center; }
  .question p { margin: 0; font-size: 14px; }
  .assignee { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--muted); }
  .avatar { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #8473ff); color: white; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }

  footer { margin-top: 60px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

  @media (max-width: 880px) {
    .problem, .goals { grid-template-columns: 1fr; }
    .timeline { grid-template-columns: 1fr 1fr; }
    h1 { font-size: 32px; }
  }
</style>
</head>
<body>
<div class="page">
  <header class="top">
    <div class="top-left">
      <span class="crumb">NevoFlux / Specs / GBrain</span>
      <span class="pill draft"><span class="pill dot"></span>Draft v0.4</span>
    </div>
    <div class="top-actions">
      <span>Owner · 朴德文</span>
      <span>更新 · 2025-10-22</span>
      <span>评审人 · 4</span>
    </div>
  </header>

  <h1>给 NevoFlux 浏览器加上 GBrain 语义记忆。</h1>
  <p class="summary">为 GBrain 加一层语义记忆,让浏览器内的 agent 能记住用户读过、剪藏过、在 Canvas 应用里搭过的东西 —— 把 NevoFlux 从一个会遗忘的标签页,变成会复利的知识库,同时解锁三个已锁定的设计合作 workspace。</p>

  <div class="meta-row">
    <span><strong>Squad</strong>GBrain 知识库</span>
    <span><strong>研发负责人</strong>班纳吉</span>
    <span><strong>设计负责人</strong>林莎</span>
    <span><strong>目标上线</strong>Q4 末(12-18)</span>
    <span><strong>工作量</strong>约 6 人周</span>
  </div>

  <section>
    <h2>问题<small>今天哪里痛,对谁痛。</small></h2>
    <div class="problem">
      <div class="panel">
        <p>今天的 GBrain 只能基于当前页面作答。用户一关标签页,上下文就没了 —— agent 反复重读同一批文档、反复推导同样的事实,也无法把周一剪藏的内容,和周四搭的 Canvas 应用连起来。对那些跨几十个来源做研究的重度用户来说,浏览器是"无状态"的。</p>
        <p>这也卡住了我们的 pack 故事:设计 skill 和 agent SDK 流程都假设 agent "知道"用户的工作集。没有持久记忆,每次跑 pack 都从冷启动开始,在 NevoFlux 里搭东西、而不是在普通标签页里搭东西的价值就很难被感知。</p>
      </div>
      <div class="quote">
        <div class="body">"我们整天在剪藏、在搭东西,但 GBrain 跨会话就忘了。给它真正的记忆,NevoFlux 就成了我们团队的第二大脑。"</div>
        <div class="author">— 玛雅·雷迪 · Pioneer Robotics 研究负责人</div>
      </div>
    </div>
  </section>

  <section>
    <h2>目标 &amp; 非目标<small>这份 spec 交付什么,以及我们明确留到以后的部分。</small></h2>
    <div class="goals">
      <div class="goal-list">
        <h3><span class="tick yes">✓</span>目标</h3>
        <ul>
          <li>跨会话存储剪藏、页面和 Canvas 应用状态的语义记忆库。</li>
          <li>GBrain recall API:浏览器内 agent 和 pack 可按主题查询。</li>
          <li>按 workspace 隔离的记忆,带用户可见的"GBrain 记住了什么"控制项。</li>
          <li>agent SDK 里的记忆钩子,让 pack 能读写工作集上下文。</li>
          <li>记忆写入、编辑、删除的审计日志。</li>
        </ul>
      </div>
      <div class="goal-list">
        <h3><span class="tick no">×</span>非目标</h3>
        <ul>
          <li>跨 workspace 共享记忆(单独的信任 + 权限 spec)。</li>
          <li>端上模型微调 —— recall 当前仍走检索方案。</li>
          <li>完整浏览历史抓取;只索引剪藏和打开过的 Canvas 应用。</li>
          <li>第三方记忆连接器(以后做,归 SDK 团队)。</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>成功指标<small>我们会在 30 / 60 / 90 天三个节点,用下面这些数字评判这次发布。</small></h2>
    <table>
      <thead><tr><th>指标</th><th>基线</th><th>目标(90天)</th><th>如何度量</th></tr></thead>
      <tbody>
        <tr><td>因记忆缺口解锁的设计合作 workspace</td><td>0 / 3</td><td class="target">3 / 3</td><td>合作进展记录 + 激活 workspace 数</td></tr>
        <tr><td>agent 回答中用到 GBrain recall 的比例</td><td>n/a</td><td class="target">≥ 55%</td><td>gbrain.recall_hit 事件 / agent 查询数</td></tr>
        <tr><td>对同一来源的重复重读(滚动 30 天)</td><td>约 38% 的查询</td><td class="target">≤ 12%</td><td>检索日志中的去重率</td></tr>
        <tr><td>读取工作集上下文的 pack 数量</td><td>n/a</td><td class="target">≥ 20 个 pack</td><td>SDK 记忆钩子接入遥测</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>用户故事<small>三个 persona,三种动线。</small></h2>
    <div class="stories">
      <div class="story">
        <div class="story-num">1</div>
        <div class="story-text">作为<strong>研究者</strong>,我希望 GBrain 记得我上周剪藏过什么,这样 agent 就能基于我的工作集作答,而不是每次冷启动。</div>
      </div>
      <div class="story">
        <div class="story-num">2</div>
        <div class="story-text">作为 <strong>Canvas 应用作者</strong>,我希望应用能读取用户的 GBrain 上下文,这样应用就能感知到他们最近在读什么,而不用我再重新接一遍数据。</div>
      </div>
      <div class="story">
        <div class="story-num">3</div>
        <div class="story-text">作为 <strong>workspace 管理员</strong>,我希望能看到并清除 GBrain 究竟记住了什么,这样记忆就始终留在我们的数据和信任边界之内。</div>
      </div>
    </div>
  </section>

  <section>
    <h2>发布里程碑<small>四个阶段。每个阶段都在 flag 后面发布。</small></h2>
    <div class="timeline">
      <div class="step">
        <span class="badge">M1 · 11-04</span>
        <h4>记忆库</h4>
        <div class="meta">2 人周</div>
        <ul><li>剪藏 + 页面索引</li><li>embedding 流水线</li><li>审计日志</li></ul>
      </div>
      <div class="step">
        <span class="badge">M2 · 11-18</span>
        <h4>Recall API</h4>
        <div class="meta">1.5 人周</div>
        <ul><li>主题 + 时近查询</li><li>接入 GBrain 回答</li><li>限流</li></ul>
      </div>
      <div class="step">
        <span class="badge">M3 · 12-02</span>
        <h4>SDK 钩子 + 管理控制</h4>
        <div class="meta">2 人周</div>
        <ul><li>pack 记忆读写</li><li>"GBrain 记住了什么"面板</li><li>按 workspace 策略</li></ul>
      </div>
      <div class="step">
        <span class="badge">M4 · 12-18</span>
        <h4>GA + 宣发</h4>
        <div class="meta">0.5 人周</div>
        <ul><li>changelog + 邮件</li><li>文档 + pack 示例</li><li>合作方赋能</li></ul>
      </div>
    </div>
  </section>

  <section>
    <h2>待解决问题<small>已分配。需在 10 月 31 日(周五)前给出答案以保上线日期。</small></h2>
    <div class="questions">
      <div class="question">
        <p>GBrain 应该自动捕获每一条剪藏,还是只记用户明确"钉到记忆"的条目?</p>
        <span class="assignee"><span class="avatar">DP</span>朴德文 · 10-28</span>
      </div>
      <div class="question">
        <p>记忆保留窗口:30 天、90 天,还是按 workspace 可配置?</p>
        <span class="assignee"><span class="avatar">PB</span>班纳吉 · 10-29</span>
      </div>
      <div class="question">
        <p>pack 拿到的是原始 recall 结果,还是 agent 已经排过序的工作集上下文摘要?</p>
        <span class="assignee"><span class="avatar">SL</span>林莎 · 10-30</span>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux GBrain 知识库 · spec-gbrain-memory</span>
    <span>v0.4 · 2025 年 10 月 22 日</span>
  </footer>
</div>
</body>
</html>
```

## 用法

从上到下逐段填空;首屏奠定押注:
- 标题栏:面包屑、状态 pill(draft / approved / shipped),以及 owner / 更新时间 / 评审人 元信息。
- 标题 + summary:用一段平实语言写清这次的产品押注。
- meta row:squad、研发负责人、设计负责人、目标上线、工作量 —— 每项一行。
- 问题:一个面板写清今天哪里痛、对谁痛,搭配一条真实感的用户引述。
- 目标 & 非目标:两个列表 —— 本期交付(绿色对勾)和明确延后(灰色叉号)。
- 成功指标:3–5 个 KPI,每个带 baseline、target 和度量方式;估算值要标注。
- 用户故事:几个 persona,用"作为…我希望…这样…"句式,persona 加粗。
- 发布里程碑:四个阶段,每个带日期 badge、工作量估算和简短清单;每个都在 flag 后发布。
- 待解决问题:每条分配给一个 owner 头像,并带 due date。
某个数字未知时,保留该行,但标成 n/a 或"估算",不要直接删掉。
