---
slug: packs/design-pack/templates/pm-spec
type: template
lang: en
category: doc
title: "Product Spec / PRD (NevoFlux One-Pager)"
title_zh: "PRD / 产品 Spec"
description: "A single-page product requirements doc: problem, success metrics, scope, user stories, design notes, rollout, and open questions."
tags: [prd, spec, 需求, product, template]
sample_image: packs/design-pack/assets/templates/pm-spec.svg
source: html-anything/pm-spec
---

## Design guidance

Intent: a single-page product requirements document with a clear, scannable structure. It is not a deck and not a long essay — a reviewer should be able to read top to bottom and understand the problem, the bet, and the plan.

Required layout, in order:
- Title bar with a status pill (draft / approved / shipped) plus owner, last-updated, and reviewer count.
- A large title and a one-paragraph summary stating the bet in plain language.
- A meta row: squad, engineering lead, design lead, target launch, and effort estimate.
- Problem & why now: what hurts today and for whom, paired with a customer quote.
- Goals & non-goals: an explicit "what ships" list and an explicit "leaving for later" list.
- Success metrics: three to five KPIs with baseline, target, and how each is measured.
- User stories: a few personas in Given/When/Then or "As a … I want … so that …" form.
- Design notes: rollout milestones, each phase shipping behind a flag (a placeholder mockup belongs here when needed).
- Open questions: assigned, each with an owner avatar and a due date.

Design details:
- Read like a calm, high-density internal spec: serif display headings, a sans body, a mono accent for labels and metadata.
- Keep the surface light: white panels on a soft grey page, thin hairline borders, one accent color (indigo) used sparingly for pills, targets, and story emphasis.
- Use real-feeling sample data — concrete numbers, dates, and names — so the structure reads as a finished spec, not a blank skeleton.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Spec — GBrain semantic memory for NevoFlux</title>
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
      <span>Owner · Devon Park</span>
      <span>Updated · 22 Oct 2025</span>
      <span>Reviewers · 4</span>
    </div>
  </header>

  <h1>GBrain semantic memory for the NevoFlux browser.</h1>
  <p class="summary">Give GBrain a semantic memory layer so the in-browser agent can recall what a user has read, clipped, and built across Canvas apps — turning NevoFlux from a tab that forgets into a knowledge base that compounds, and unblocking three pinned design-partner workspaces.</p>

  <div class="meta-row">
    <span><strong>Squad</strong>GBrain Knowledge</span>
    <span><strong>Engineering lead</strong>Priya Banerjee</span>
    <span><strong>Design lead</strong>Sasha Lin</span>
    <span><strong>Target launch</strong>End Q4 (Dec 18)</span>
    <span><strong>Effort</strong>~6 eng-weeks</span>
  </div>

  <section>
    <h2>Problem<small>What hurts today, and for whom.</small></h2>
    <div class="problem">
      <div class="panel">
        <p>Today GBrain answers from the current page only. The moment a user closes a tab, the context is gone — the agent re-reads the same docs, re-derives the same facts, and can't connect what was clipped on Monday to the Canvas app built on Thursday. For power users running research across dozens of sources, the browser feels stateless.</p>
        <p>It also blocks our pack story: design skills and agent SDK flows assume the agent "knows" the user's working set. Without durable memory, every pack run starts cold, and the value of building inside NevoFlux instead of a plain tab is hard to feel.</p>
      </div>
      <div class="quote">
        <div class="body">"We clip and build all day, but GBrain forgets between sessions. Give it real memory and NevoFlux becomes our team's second brain."</div>
        <div class="author">— Maya Reddy · Head of Research, Pioneer Robotics</div>
      </div>
    </div>
  </section>

  <section>
    <h2>Goals &amp; non-goals<small>What this spec ships, and what we're explicitly leaving for later.</small></h2>
    <div class="goals">
      <div class="goal-list">
        <h3><span class="tick yes">✓</span>Goals</h3>
        <ul>
          <li>Semantic memory store for clips, pages, and Canvas app state across sessions.</li>
          <li>GBrain recall API the in-browser agent and packs can query by topic.</li>
          <li>Per-workspace memory with explicit, user-visible "what GBrain remembers" controls.</li>
          <li>Memory hooks in the agent SDK so packs can read and write working-set context.</li>
          <li>Audit trail for memory writes, edits, and deletions.</li>
        </ul>
      </div>
      <div class="goal-list">
        <h3><span class="tick no">×</span>Non-goals</h3>
        <ul>
          <li>Cross-workspace memory sharing (separate trust + permissions spec).</li>
          <li>On-device model fine-tuning — recall stays retrieval-based for now.</li>
          <li>Full browsing-history capture; we index clips and opened Canvas apps only.</li>
          <li>Third-party memory connectors (future, owned by the SDK team).</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>Success metrics<small>We'll judge this launch on the numbers below at the 30 / 60 / 90 day marks.</small></h2>
    <table>
      <thead><tr><th>Metric</th><th>Baseline</th><th>Target (90d)</th><th>How we measure</th></tr></thead>
      <tbody>
        <tr><td>Design-partner workspaces unblocked by memory gap</td><td>0 of 3</td><td class="target">3 of 3</td><td>Partner motion notes + activated workspace count</td></tr>
        <tr><td>GBrain recall used in agent answers</td><td>n/a</td><td class="target">≥ 55%</td><td>gbrain.recall_hit events / agent queries</td></tr>
        <tr><td>Repeat re-reads of the same source (rolling 30d)</td><td>~38% of queries</td><td class="target">≤ 12%</td><td>dedup ratio in retrieval logs</td></tr>
        <tr><td>Packs that read working-set context</td><td>n/a</td><td class="target">≥ 20 packs</td><td>SDK memory-hook adoption telemetry</td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>User stories<small>Three personas, three motions.</small></h2>
    <div class="stories">
      <div class="story">
        <div class="story-num">1</div>
        <div class="story-text">As a <strong>researcher</strong>, I want GBrain to remember what I clipped last week, so that the agent answers from my working set instead of starting cold.</div>
      </div>
      <div class="story">
        <div class="story-num">2</div>
        <div class="story-text">As a <strong>Canvas app builder</strong>, I want my app to read the user's GBrain context, so that the app feels aware of what they've been reading without me re-piping it.</div>
      </div>
      <div class="story">
        <div class="story-num">3</div>
        <div class="story-text">As a <strong>workspace admin</strong>, I want to see and clear exactly what GBrain remembers, so that I can keep memory inside our data and trust boundaries.</div>
      </div>
    </div>
  </section>

  <section>
    <h2>Rollout milestones<small>Four phases. Each phase ships behind a flag.</small></h2>
    <div class="timeline">
      <div class="step">
        <span class="badge">M1 · Nov 4</span>
        <h4>Memory store</h4>
        <div class="meta">2 eng-weeks</div>
        <ul><li>Clip + page indexing</li><li>Embedding pipeline</li><li>Audit log entries</li></ul>
      </div>
      <div class="step">
        <span class="badge">M2 · Nov 18</span>
        <h4>Recall API</h4>
        <div class="meta">1.5 eng-weeks</div>
        <ul><li>Topic + recency query</li><li>GBrain answer wiring</li><li>Rate limiting</li></ul>
      </div>
      <div class="step">
        <span class="badge">M3 · Dec 2</span>
        <h4>SDK hooks + admin controls</h4>
        <div class="meta">2 eng-weeks</div>
        <ul><li>Pack memory read/write</li><li>"What GBrain remembers" panel</li><li>Per-workspace policy</li></ul>
      </div>
      <div class="step">
        <span class="badge">M4 · Dec 18</span>
        <h4>GA + comms</h4>
        <div class="meta">0.5 eng-weeks</div>
        <ul><li>Changelog + email</li><li>Docs + pack examples</li><li>Partner enablement</li></ul>
      </div>
    </div>
  </section>

  <section>
    <h2>Open questions<small>Assigned. We need answers by Friday Oct 31 to keep the date.</small></h2>
    <div class="questions">
      <div class="question">
        <p>Should GBrain auto-capture every clip, or only items the user explicitly pins to memory?</p>
        <span class="assignee"><span class="avatar">DP</span>Devon Park · Oct 28</span>
      </div>
      <div class="question">
        <p>Memory retention window: 30 days, 90 days, or admin-configurable per workspace?</p>
        <span class="assignee"><span class="avatar">PB</span>Priya Banerjee · Oct 29</span>
      </div>
      <div class="question">
        <p>Do packs get raw recall results, or a summarized working-set context the agent has already ranked?</p>
        <span class="assignee"><span class="avatar">SL</span>Sasha Lin · Oct 30</span>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux GBrain Knowledge · spec-gbrain-memory</span>
    <span>v0.4 · 22 October 2025</span>
  </footer>
</div>
</body>
</html>
```

## Usage

Fill the sections top to bottom; the first screen sets the bet:
- Title bar: breadcrumb, status pill (draft / approved / shipped), and owner / updated / reviewers metadata.
- Title + summary: state the product bet in one paragraph of plain language.
- Meta row: squad, engineering lead, design lead, target launch, and effort — one line each.
- Problem: a panel describing what hurts today and for whom, paired with a real-feeling customer quote.
- Goals & non-goals: two lists — what ships now (green tick) and what is explicitly deferred (grey cross).
- Success metrics: three to five KPIs, each with baseline, target, and a measurement method. Mark any estimate.
- User stories: a few personas in "As a … I want … so that …" form, with the persona bolded.
- Rollout milestones: four phases, each with a date badge, effort estimate, and a short checklist; each ships behind a flag.
- Open questions: each assigned to an owner avatar with a due date.
If a number is unknown, keep the row but label it n/a or "estimate" rather than dropping it.
