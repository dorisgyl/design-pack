---
slug: packs/design-pack/templates/eng-runbook
type: template
lang: en
category: doc
title: "Engineering Runbook"
title_zh: "工程 Runbook"
description: "A single-page on-call runbook: service overview, alerts table, dashboards, copy-paste procedures, on-call rotation, and incident checklist."
tags: [runbook, ops, oncall, sre, template]
sample_image: packs/design-pack/assets/templates/eng-runbook.svg
source: html-anything/eng-runbook
---
## Design guidance

Intent: a single, copy-paste-friendly runbook page that an on-call engineer can scan under pressure.

Layout:
- Service overview (topology + dependencies)
- Alerts table (severity / threshold / runbook link)
- Dashboard link cards
- Common procedures (monospace code blocks, one-click copy)
- On-call rotation (this week + next week)
- Incident response checklist

Design details:
- Dark, document-style page (max width ~1100px) with a quiet neutral background and "paper" panels.
- Mint-green accent for healthy/OK states, amber for warnings, red for critical severity.
- Monospace (mono) font for crumbs, metadata, table headers, dependency rows, and all command snippets so commands read as terminal text.
- A header with a breadcrumb, a large display title, owner/version/review metadata, and a status pill.
- Numbered section indices (01–05) in mono before each section heading.
- Two-column summary (description panel + dependency list); single column on narrow screens.
- Severity chips (SEV-1/2/3) colour-coded; procedure cards each carry a "when to use" note.
- A two-column incident checklist with numbered step badges; collapses to one column under 880px.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux GBrain Service · Runbook</title>
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
      <div class="crumb">NevoFlux / Platform / GBrain</div>
      <h1>gbrain-service</h1>
      <div class="head-meta">Owned by <span>@knowledge-platform</span> · v4.7.2 · Last reviewed 14 Oct 2025</div>
    </div>
    <span class="pill tier"><span class="dot"></span>Tier 0 · production-critical</span>
  </header>

  <section>
    <h2><span class="index">01</span>Service summary</h2>
    <div class="summary">
      <div class="panel">
        <p><strong>gbrain-service</strong> ingests, indexes, and serves the GBrain knowledge base for every NevoFlux surface — the desktop browser, Canvas apps, and the agent SDK. It owns the document store, the vector embeddings index, and the retrieval API that grounds every agent answer.</p>
        <p>If <code>gbrain-service</code> is down, the browser falls back to ungrounded answers and Canvas apps cannot query packs. Already-cached retrievals keep working for their TTL (15 minutes) but no fresh indexing or search happens.</p>
      </div>
      <div class="panel deps">
        <h3>Dependencies</h3>
        <ul>
          <li><span>Postgres · gbrain-db</span><span class="ok">healthy</span></li>
          <li><span>Redis · retrieval-cache</span><span class="ok">healthy</span></li>
          <li><span>Vector · embeddings-index</span><span class="ok">healthy</span></li>
          <li><span>Agent SDK · grounding-api</span><span class="warn">degraded</span></li>
          <li><span>Pager · oncall.nevoflux</span><span class="ok">healthy</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2><span class="index">02</span>Alerts you might wake up to</h2>
    <table>
      <thead><tr><th>Alert</th><th>Severity</th><th>What it means</th><th>First response</th></tr></thead>
      <tbody>
        <tr>
          <td class="code">gbrain.query_5xx_rate &gt; 1%</td>
          <td><span class="sev sev-1">SEV-1</span></td>
          <td>Retrieval endpoint returning errors. Agent answers fall back to ungrounded.</td>
          <td>Check Postgres + vector index dashboards. Roll back last deploy if &lt; 30 min old.</td>
        </tr>
        <tr>
          <td class="code">gbrain.retrieval_lag_p95 &gt; 800ms</td>
          <td><span class="sev sev-2">SEV-2</span></td>
          <td>Search path is slow. Browser answers and Canvas apps feel sluggish.</td>
          <td>Inspect Redis CPU + connection count. Scale read replicas if needed.</td>
        </tr>
        <tr>
          <td class="code">gbrain.ingest_failure &gt; 10/min</td>
          <td><span class="sev sev-2">SEV-2</span></td>
          <td>Pack ingestion is failing. Often parser errors or embedding timeouts.</td>
          <td>Check the embeddings worker queue. Failover ingest to the backup region.</td>
        </tr>
        <tr>
          <td class="code">gbrain.index_rebuild_errors &gt; 0</td>
          <td><span class="sev sev-1">SEV-1</span></td>
          <td>Vector index can't rebuild segments. New docs unsearchable; existing OK.</td>
          <td>Page the platform team. Do not reindex from scratch without an engineer.</td>
        </tr>
        <tr>
          <td class="code">gbrain.audit_writer_backlog &gt; 5k</td>
          <td><span class="sev sev-3">SEV-3</span></td>
          <td>Audit log writer is falling behind. Compliance impact.</td>
          <td>Drain manually. Open a ticket; not a wake-up.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2><span class="index">03</span>Common procedures</h2>
    <div class="procs">
      <div class="proc">
        <div class="proc-head"><h3>Deploy a new version</h3><span class="when">Use during business hours</span></div>
        <p>Deploys are blue/green. The script waits for two consecutive healthchecks before promoting traffic.</p>
<pre><span class="cmt"># Deploy gbrain-service v4.7.3 to production</span>
$ nf deploy gbrain-service --tag <span class="var">v4.7.3</span> --env production

<span class="cmt"># Wait for two consecutive healthchecks (~90 s), then promote.</span>
$ nf deploy promote gbrain-service --env production
<span class="ok">→ traffic shifted: 10% / 50% / 100%</span></pre>
      </div>
      <div class="proc">
        <div class="proc-head"><h3>Roll back to last known good</h3><span class="when">Use when error rate &gt; 1% post-deploy</span></div>
<pre><span class="cmt"># Rolls back to the previously promoted version, no rebuild.</span>
$ nf deploy rollback gbrain-service --env production
<span class="ok">→ rolled back to v4.7.2 in 38 s</span></pre>
      </div>
      <div class="proc">
        <div class="proc-head"><h3>Reindex a pack</h3><span class="when">Schedule off-peak; rebuilds embeddings</span></div>
<pre><span class="cmt"># 1. Snapshot the current embeddings index</span>
$ nf gbrain snapshot embeddings-index --tag <span class="var">$(date +%Y%m%d)</span>

<span class="cmt"># 2. Trigger a full reindex for the named pack</span>
$ nf gbrain reindex --pack <span class="var">&lt;pack-slug&gt;</span>

<span class="cmt"># 3. After verification, prune the previous snapshot</span>
$ nf gbrain prune-snapshot embeddings-index --tag <span class="var">&lt;old-tag&gt;</span> --days 30</pre>
      </div>
      <div class="proc">
        <div class="proc-head"><h3>Drain audit-log backlog</h3><span class="when">Use when audit_writer_backlog alert fires</span></div>
<pre>$ nf exec gbrain-service -- bin/audit-drain --batch <span class="var">5000</span>
<span class="ok">→ drained 4,812 entries in 12 s; backlog now 0</span></pre>
      </div>
    </div>
  </section>

  <section>
    <h2><span class="index">04</span>On-call rotation · this month</h2>
    <table class="rota">
      <thead><tr><th>Week</th><th>Primary</th><th>Secondary</th><th>Backup (escalation)</th></tr></thead>
      <tbody>
        <tr><td>Oct 27 – Nov 02</td><td>Devon Park</td><td>Priya Banerjee</td><td>Sasha Lin</td></tr>
        <tr><td>Nov 03 – Nov 09</td><td>Caleb Renner</td><td>Devon Park</td><td>Sasha Lin</td></tr>
        <tr><td>Nov 10 – Nov 16</td><td>Priya Banerjee</td><td>Caleb Renner</td><td>Mira Reddy</td></tr>
        <tr><td>Nov 17 – Nov 23</td><td>Sasha Lin</td><td>Priya Banerjee</td><td>Mira Reddy</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2><span class="index">05</span>Incident response — first 30 minutes</h2>
    <div class="checklist">
      <div class="step">
        <div class="step-num">1</div>
        <div><h4>Acknowledge the page within 5 min.</h4><p>Type <code>/ack</code> in <code>#incidents-gbrain</code>. The bot stops re-paging and tags the on-call.</p></div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div><h4>Open the incident channel.</h4><p>Run <code>/incident open gbrain-service "&lt;short title&gt;"</code>. The bot creates a dedicated channel and pages the secondary.</p></div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div><h4>Post a status snapshot.</h4><p>Customer-impact in one line, what you know, what you're checking next. Re-post every 10 minutes.</p></div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div><h4>Mitigate before you diagnose.</h4><p>If a recent deploy is suspect, roll back. If the vector index is degraded, serving stale results is <em>never</em> the answer for grounding — escalate to the platform team.</p></div>
      </div>
      <div class="step">
        <div class="step-num">5</div>
        <div><h4>Hand off or stand down.</h4><p>If you can't resolve in 30 min, hand to the secondary. When healthy, close with <code>/incident close</code>; postmortem is owed within 5 business days.</p></div>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux Knowledge Platform · runbook v3.2</span>
    <span>Source: ops-docs/gbrain-service.md</span>
  </footer>
</div>
</body>
</html>
```

## Usage

Fill these sections in order:
- Header: breadcrumb (org / domain / service), service name as the title, owner handle, version, last-reviewed date, and the tier/status pill.
- 01 Service summary: one paragraph on what the service does and a second on blast radius if it is down; list dependencies with a healthy/degraded status on the right.
- 02 Alerts table: one row per alert — the metric/threshold expression, a SEV chip (1/2/3), what it means, and the first response.
- 03 Common procedures: one card per runbook procedure with a "when to use" note and a copy-paste command block (use the cmt/var/ok spans for comments, variables, and success output).
- 04 On-call rotation: week ranges with primary, secondary, and escalation backup.
- 05 Incident checklist: numbered first-30-minute steps.
- Footer: platform/runbook version on the left, source doc path on the right.
