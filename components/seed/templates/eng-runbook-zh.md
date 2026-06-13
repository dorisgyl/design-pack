---
slug: packs/design-pack/templates/eng-runbook-zh
type: template
lang: zh
category: doc
title: "工程 Runbook"
title_en: "Engineering Runbook"
description: "单页 on-call 运维手册:服务概述、告警表、看板、可拷贝命令、值班轮值与事故清单。"
tags: [runbook, ops, oncall, sre, 模板]
sample_image: packs/design-pack/assets/templates/eng-runbook.svg
source: html-anything/eng-runbook
---
## 设计指导

意图:一份可直接拷贝命令的单页 runbook,供工程 on-call 在压力下快速浏览使用。

布局:
- 服务概述(拓扑 + 依赖)
- 告警表(severity / 阈值 / runbook 链接)
- 看板链接卡片
- 常用操作(等宽代码块,一键复制)
- 值班轮值(本周 + 下周)
- 事故响应清单

设计细节:
- 深色文档风格页面(最大宽度约 1100px),中性安静的背景与"纸面"面板。
- 薄荷绿强调色表示健康/正常,琥珀色表示警告,红色表示严重等级。
- 面包屑、元信息、表头、依赖行以及所有命令片段均使用等宽字体,使命令读起来像终端文本。
- 头部包含面包屑、大号展示标题、负责人/版本/复审元信息以及状态药丸标签。
- 每个 section 标题前以等宽字体标注编号索引(01–05)。
- 两栏摘要(描述面板 + 依赖列表);窄屏时折叠为单栏。
- 严重等级标签(SEV-1/2/3)按色彩区分;操作卡片各自附带"使用时机"说明。
- 两栏事故清单配编号步骤徽章;宽度小于 880px 时折叠为单栏。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux GBrain 服务 · Runbook</title>
<style>
  :root {
    --bg: #0c0e14;
    --paper: #14171f;
    --paper-2: #1c2030;
    --ink: #eaecf3;
    --muted: #8b94ad;
    --line: #262b3b;
    --accent: #6ee7b7;
    --accent-soft: rgba(110,231,183,0.1);
    --warn: #fbbf24;
    --danger: #f87171;
    --display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 14px; line-height: 1.6; }
  .page { max-width: 1100px; margin: 0 auto; padding: 32px 28px 64px; }

  /* Header */
  .head { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 24px; border-bottom: 1px solid var(--line); margin-bottom: 28px; }
  .head-left { display: flex; flex-direction: column; gap: 6px; }
  .crumb { font-family: var(--mono); font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
  h1 { font-family: var(--display); font-size: 36px; margin: 4px 0; font-weight: 700; letter-spacing: -0.02em; }
  .head-meta { font-family: var(--mono); font-size: 11.5px; color: var(--muted); }
  .head-meta span { color: var(--accent); }
  .pill {
    display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px;
    font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
  }
  .pill.tier { background: var(--accent-soft); color: var(--accent); border: 1px solid rgba(110,231,183,0.3); }
  .pill .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

  section { margin-top: 40px; }
  h2 { font-family: var(--display); font-size: 22px; margin: 0 0 14px; letter-spacing: -0.005em; font-weight: 700; }
  h2 .index { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-right: 12px; vertical-align: middle; }

  /* Summary */
  .summary { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
  .panel { padding: 22px 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
  .panel p { margin: 0 0 12px; }
  .panel p:last-child { margin: 0; }
  .deps h3 { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 0 0 10px; font-weight: 500; }
  .deps ul { padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; font-family: var(--mono); font-size: 12.5px; }
  .deps li { display: flex; justify-content: space-between; padding: 8px 12px; background: var(--paper-2); border-radius: 6px; }
  .deps li .ok { color: var(--accent); }
  .deps li .warn { color: var(--warn); }

  /* Tables */
  table { width: 100%; border-collapse: collapse; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
  th, td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--line); font-size: 13px; vertical-align: top; }
  th { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); background: var(--paper-2); }
  tr:last-child td { border-bottom: none; }
  td.code, .panel code { font-family: var(--mono); }
  .sev { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 4px; font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
  .sev-1 { background: rgba(248,113,113,0.15); color: var(--danger); }
  .sev-2 { background: rgba(251,191,36,0.15); color: var(--warn); }
  .sev-3 { background: rgba(110,231,183,0.15); color: var(--accent); }

  /* Procedure cards */
  .procs { display: flex; flex-direction: column; gap: 14px; }
  .proc { padding: 18px 22px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
  .proc-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  .proc-head h3 { margin: 0; font-family: var(--display); font-size: 17px; }
  .proc-head .when { font-family: var(--mono); font-size: 11px; color: var(--muted); }
  pre { background: var(--paper-2); border: 1px solid var(--line); border-radius: 8px; padding: 14px 16px; overflow-x: auto; font-family: var(--mono); font-size: 12.5px; line-height: 1.6; color: #cdd6f4; margin: 8px 0 0; }
  pre .cmt { color: var(--muted); }
  pre .var { color: var(--warn); }
  pre .ok { color: var(--accent); }

  /* On-call */
  .rota { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

  /* Checklist */
  .checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .step { padding: 18px 20px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; display: flex; gap: 16px; align-items: flex-start; }
  .step-num { flex: 0 0 36px; width: 36px; height: 36px; border-radius: 50%; background: var(--accent); color: var(--bg); display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-family: var(--display); font-size: 16px; }
  .step h4 { margin: 0 0 6px; font-family: var(--display); font-size: 15px; }
  .step p { margin: 0; color: var(--muted); font-size: 13px; }
  .step code { font-family: var(--mono); background: var(--paper-2); padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--accent); }

  footer { margin-top: 56px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11.5px; color: var(--muted); }

  @media (max-width: 880px) {
    .summary, .checklist { grid-template-columns: 1fr; }
    h1 { font-size: 26px; }
  }
</style>
</head>
<body>
<div class="page">
  <header class="head">
    <div class="head-left">
      <div class="crumb">NevoFlux / 平台 / GBrain</div>
      <h1>gbrain-service</h1>
      <div class="head-meta">负责团队 <span>@knowledge-platform</span> · v4.7.2 · 上次复审 2025-10-14</div>
    </div>
    <span class="pill tier"><span class="dot"></span>Tier 0 · 生产关键</span>
  </header>

  <section>
    <h2><span class="index">01</span>服务概述</h2>
    <div class="summary">
      <div class="panel">
        <p><strong>gbrain-service</strong> 负责为所有 NevoFlux 入口 —— 桌面浏览器、Canvas 应用与 Agent SDK —— 摄取、索引并提供 GBrain 知识库。它管理文档库、向量嵌入索引,以及为每次 Agent 回答提供依据的检索 API。</p>
        <p>若 <code>gbrain-service</code> 宕机,浏览器将退化为无依据回答,Canvas 应用也无法查询 packs。已缓存的检索结果在其 TTL(15 分钟)内仍可使用,但不会有新的索引或检索发生。</p>
      </div>
      <div class="panel deps">
        <h3>依赖</h3>
        <ul>
          <li><span>Postgres · gbrain-db</span><span class="ok">健康</span></li>
          <li><span>Redis · retrieval-cache</span><span class="ok">健康</span></li>
          <li><span>Vector · embeddings-index</span><span class="ok">健康</span></li>
          <li><span>Agent SDK · grounding-api</span><span class="warn">降级</span></li>
          <li><span>Pager · oncall.nevoflux</span><span class="ok">健康</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2><span class="index">02</span>可能把你叫醒的告警</h2>
    <table>
      <thead><tr><th>告警</th><th>严重等级</th><th>含义</th><th>首步响应</th></tr></thead>
      <tbody>
        <tr>
          <td class="code">gbrain.query_5xx_rate &gt; 1%</td>
          <td><span class="sev sev-1">SEV-1</span></td>
          <td>检索接口返回错误。Agent 回答退化为无依据。</td>
          <td>检查 Postgres 与向量索引看板。若上次部署在 30 分钟内则回滚。</td>
        </tr>
        <tr>
          <td class="code">gbrain.retrieval_lag_p95 &gt; 800ms</td>
          <td><span class="sev sev-2">SEV-2</span></td>
          <td>检索路径变慢。浏览器回答与 Canvas 应用开始卡顿。</td>
          <td>检查 Redis CPU 与连接数。必要时扩容只读副本。</td>
        </tr>
        <tr>
          <td class="code">gbrain.ingest_failure &gt; 10/min</td>
          <td><span class="sev sev-2">SEV-2</span></td>
          <td>Pack 摄取失败。通常是解析错误或嵌入超时。</td>
          <td>检查嵌入 worker 队列。将摄取切换至备用区域。</td>
        </tr>
        <tr>
          <td class="code">gbrain.index_rebuild_errors &gt; 0</td>
          <td><span class="sev sev-1">SEV-1</span></td>
          <td>向量索引无法重建分段。新文档不可检索;已有文档正常。</td>
          <td>呼叫平台团队。未经工程师确认勿从零重建索引。</td>
        </tr>
        <tr>
          <td class="code">gbrain.audit_writer_backlog &gt; 5k</td>
          <td><span class="sev sev-3">SEV-3</span></td>
          <td>审计日志写入器开始积压。影响合规。</td>
          <td>手动排空。开工单即可;无需深夜处理。</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2><span class="index">03</span>常用操作</h2>
    <div class="procs">
      <div class="proc">
        <div class="proc-head"><h3>部署新版本</h3><span class="when">在工作时间内执行</span></div>
        <p>部署采用蓝绿方式。脚本会等待连续两次健康检查通过后再切流。</p>
<pre><span class="cmt"># 部署 gbrain-service v4.7.3 到生产环境</span>
$ nf deploy gbrain-service --tag <span class="var">v4.7.3</span> --env production

<span class="cmt"># 等待连续两次健康检查(约 90 秒),然后切流。</span>
$ nf deploy promote gbrain-service --env production
<span class="ok">→ 流量已切换: 10% / 50% / 100%</span></pre>
      </div>
      <div class="proc">
        <div class="proc-head"><h3>回滚到上一个稳定版本</h3><span class="when">部署后错误率 &gt; 1% 时使用</span></div>
<pre><span class="cmt"># 回滚到上一个已切流版本,无需重新构建。</span>
$ nf deploy rollback gbrain-service --env production
<span class="ok">→ 已在 38 秒内回滚至 v4.7.2</span></pre>
      </div>
      <div class="proc">
        <div class="proc-head"><h3>重建某个 pack 的索引</h3><span class="when">安排在低峰期;会重建嵌入</span></div>
<pre><span class="cmt"># 1. 对当前嵌入索引打快照</span>
$ nf gbrain snapshot embeddings-index --tag <span class="var">$(date +%Y%m%d)</span>

<span class="cmt"># 2. 触发指定 pack 的全量重建索引</span>
$ nf gbrain reindex --pack <span class="var">&lt;pack-slug&gt;</span>

<span class="cmt"># 3. 验证完成后,清理上一个快照</span>
$ nf gbrain prune-snapshot embeddings-index --tag <span class="var">&lt;old-tag&gt;</span> --days 30</pre>
      </div>
      <div class="proc">
        <div class="proc-head"><h3>排空审计日志积压</h3><span class="when">audit_writer_backlog 告警触发时使用</span></div>
<pre>$ nf exec gbrain-service -- bin/audit-drain --batch <span class="var">5000</span>
<span class="ok">→ 12 秒内排空 4,812 条;积压现为 0</span></pre>
      </div>
    </div>
  </section>

  <section>
    <h2><span class="index">04</span>值班轮值 · 本月</h2>
    <table class="rota">
      <thead><tr><th>周次</th><th>主值班</th><th>副值班</th><th>升级后备</th></tr></thead>
      <tbody>
        <tr><td>10/27 – 11/02</td><td>Devon Park</td><td>Priya Banerjee</td><td>Sasha Lin</td></tr>
        <tr><td>11/03 – 11/09</td><td>Caleb Renner</td><td>Devon Park</td><td>Sasha Lin</td></tr>
        <tr><td>11/10 – 11/16</td><td>Priya Banerjee</td><td>Caleb Renner</td><td>Mira Reddy</td></tr>
        <tr><td>11/17 – 11/23</td><td>Sasha Lin</td><td>Priya Banerjee</td><td>Mira Reddy</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2><span class="index">05</span>事故响应 —— 前 30 分钟</h2>
    <div class="checklist">
      <div class="step">
        <div class="step-num">1</div>
        <div><h4>5 分钟内确认告警。</h4><p>在 <code>#incidents-gbrain</code> 中输入 <code>/ack</code>。机器人停止重复呼叫并标记当前值班。</p></div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div><h4>开启事故频道。</h4><p>运行 <code>/incident open gbrain-service "&lt;简短标题&gt;"</code>。机器人创建专用频道并呼叫副值班。</p></div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div><h4>发布状态快照。</h4><p>用一句话说明客户影响、已知信息以及下一步排查方向。每 10 分钟更新一次。</p></div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div><h4>先缓解再诊断。</h4><p>若怀疑近期部署,先回滚。若向量索引降级,对依据回答而言<em>绝不</em>能返回过期结果 —— 升级给平台团队。</p></div>
      </div>
      <div class="step">
        <div class="step-num">5</div>
        <div><h4>交接或解除。</h4><p>若 30 分钟内无法解决,交接给副值班。恢复后用 <code>/incident close</code> 关闭;事故复盘需在 5 个工作日内提交。</p></div>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux 知识平台 · runbook v3.2</span>
    <span>来源: ops-docs/gbrain-service.md</span>
  </footer>
</div>
</body>
</html>
```

## 用法

按顺序填写各 section:
- 头部:面包屑(组织 / 域 / 服务)、服务名作为标题、负责团队 handle、版本、上次复审日期,以及等级/状态药丸标签。
- 01 服务概述:一段说明服务做什么,另一段说明宕机后的影响范围;右侧列出依赖及其健康/降级状态。
- 02 告警表:每行一个告警 —— 指标/阈值表达式、SEV 标签(1/2/3)、含义与首步响应。
- 03 常用操作:每张卡片一个 runbook 操作,附"使用时机"说明与可拷贝命令块(用 cmt/var/ok 三个 span 标注注释、变量与成功输出)。
- 04 值班轮值:周次范围,含主值班、副值班与升级后备。
- 05 事故清单:前 30 分钟的编号步骤。
- 页脚:左侧为平台/runbook 版本,右侧为来源文档路径。
