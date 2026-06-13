---
slug: packs/design-pack/templates/exec-briefing-memo
type: template
lang: en
category: doc
title: "Executive Briefing Memo (NevoFlux Decision One-Pager)"
title_zh: "高管决策简报"
description: "Compress scattered product, sales, and finance signals into one page a leader can sign off on: decision, recommendation, evidence, and tradeoffs."
tags: [executive, briefing, memo, decision, strategy, 简报, 决策, template]
sample_image: packs/design-pack/assets/templates/exec-briefing-memo.svg
source: html-anything/exec-briefing-memo
---

## Design guidance

This is not meeting minutes, a weekly status report, or a PRD. Its single job is to help a decision-maker understand the problem and make the call in under three minutes.

Good inputs: long meeting transcripts, research material, strategy discussions, sales feedback, product usage data, investment memos. The user may hand you a pile of fragments; your job is to distill them into one clear decision frame.

Required structure:
1. Memo header: subject, owner, audience, date, and decision deadline.
2. Decision needed: state the question to be decided in a single sentence.
3. Recommendation: a clear recommendation, not "we could consider". It must include a confidence level.
4. Why now: why the decision is needed now and what the cost of not deciding is.
5. Key facts: five to seven pieces of evidence, each tagged with a source type (sales / product / finance / customer / ops).
6. Tradeoff table: Option A / Option B / Option C compared on upside, cost, risk, and reversibility.
7. Risks & mitigations: three to five risks, each with a mitigating action.
8. Decision path: the next step for each of approve / reject / ask for more evidence.
9. Next actions: owner, due date, and expected artifact.

Visual requirements:
- Read like a top consulting firm's one-page decision memo: restrained, clear, high density.
- The first screen must surface the decision and recommendation directly; do not open with background.
- Use strong hierarchy: a large conclusion, compact evidence cards, a comparison table, and status pills.
- Do not turn it into a long article or a deck, and do not write vague business jargon.

Style variants (pick one, do not mix):
- Default: a light-paper executive memo, suited to CEO/CFO/CRO, operations, and product decisions.
- Dark command center: for urgent decisions, risk response, incidents, go/no-go, and launch gates.
- Formal board paper: for the board, investors, compliance, and budget approval.
If the user does not specify a style, prefer the default light memo; use the dark command center when the material stresses urgency, risk, or action; use the board paper when it is aimed at the board or formal approval.

Content integrity:
- Do not invent numbers, customers, budgets, or dates.
- If a key input is missing, list it under "Evidence gaps" but still give a provisional recommendation based on the evidence you have.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Executive Briefing Memo · GBrain Enterprise</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#111827;--muted:#667085;--paper:#faf9f5;--line:#e4dfd4;--red:#a84332;--green:#1f7a58;--blue:#254f9c}
    *{box-sizing:border-box} body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,"Noto Sans SC",system-ui,sans-serif}
    .page{max-width:1120px;margin:0 auto;padding:40px 26px 54px}.box{border:1px solid var(--line);background:rgba(255,255,255,.72);border-radius:6px}
    .label{font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:800;color:var(--muted)}.pill{border-radius:999px;padding:6px 10px;font-size:11px;font-weight:800}
    table{width:100%;border-collapse:collapse} th,td{border-bottom:1px solid var(--line);padding:13px;text-align:left;vertical-align:top;font-size:13px} th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
  </style>
</head>
<body>
  <main class="page">
    <section class="box p-7">
      <div class="flex flex-wrap justify-between gap-3 mb-8">
        <div class="flex flex-wrap gap-2"><span class="pill bg-[#eef2ff] text-[var(--blue)]">Executive memo</span><span class="pill bg-white border border-[var(--line)]">Owner: Maya Chen</span><span class="pill bg-white border border-[var(--line)]">Deadline: 2026-06-14</span></div>
        <div class="label">Audience: CEO / Head of Product / CFO</div>
      </div>
      <div class="grid lg:grid-cols-[1.15fr_.85fr] gap-8">
        <div>
          <div class="label mb-2">Decision needed</div>
          <h1 class="text-5xl md:text-6xl font-extrabold leading-[.95] tracking-tight">Should NevoFlux ship a GBrain Enterprise tier in Q3?</h1>
        </div>
        <div class="box p-5 bg-[#f0f8f4]">
          <div class="label mb-3 text-[var(--green)]">Recommendation</div>
          <h2 class="text-2xl font-extrabold">Approve a narrow GBrain Enterprise Preview.</h2>
          <p class="mt-3 text-sm leading-6 text-[var(--muted)]">Ship SSO, workspace audit logs, annual invoicing, and a security questionnaire motion. Defer custom knowledge-retention controls and full enterprise agent orchestration.</p>
          <div class="mt-5 flex gap-2"><span class="pill bg-white text-[var(--green)] border border-[#badbcc]">Confidence: medium-high</span><span class="pill bg-white text-[var(--ink)] border border-[var(--line)]">Reversible</span></div>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-4 gap-4 mt-5">
      <div class="box p-5"><div class="label">Enterprise asks</div><div class="mt-2 text-4xl font-extrabold">18</div><p class="text-sm text-[var(--muted)] mt-2">inbound GBrain requests in 45 days</p></div>
      <div class="box p-5"><div class="label">Large workspaces</div><div class="mt-2 text-4xl font-extrabold">7</div><p class="text-sm text-[var(--muted)] mt-2">teams over 500 seats</p></div>
      <div class="box p-5"><div class="label">Potential ACV</div><div class="mt-2 text-4xl font-extrabold">$18k-35k</div><p class="text-sm text-[var(--muted)] mt-2">sales estimate, not proven</p></div>
      <div class="box p-5"><div class="label">Roadmap cost</div><div class="mt-2 text-4xl font-extrabold">4-6w</div><p class="text-sm text-[var(--muted)] mt-2">delay risk to Canvas apps SDK</p></div>
    </section>

    <section class="grid lg:grid-cols-[1.1fr_.9fr] gap-5 mt-5">
      <div class="box overflow-hidden">
        <div class="p-5 border-b border-[var(--line)]"><div class="label">Tradeoff table</div></div>
        <table>
          <thead><tr><th>Option</th><th>Upside</th><th>Cost</th><th>Risk</th><th>Reversibility</th></tr></thead>
          <tbody>
            <tr><td><b>No enterprise tier in 2026</b></td><td>Protects browser + agent focus</td><td>Leaves 18 asks unanswered</td><td>Missed market signal</td><td>Medium</td></tr>
            <tr><td><b>GBrain Enterprise Preview</b></td><td>Tests willingness to pay</td><td>5 weeks for SSO + audit logs</td><td>Support load on packs team</td><td>High</td></tr>
            <tr><td><b>Full Enterprise Plan</b></td><td>Stronger enterprise story</td><td>Retention controls, SCIM, SLA, CSM</td><td>Premature motion</td><td>Low</td></tr>
          </tbody>
        </table>
      </div>
      <div class="box p-5">
        <div class="label mb-4">Risks & mitigations</div>
        <div class="space-y-4 text-sm leading-6">
          <p><b>Enterprise distraction:</b> cap scope to SSO, audit logs, annual invoicing, and the security questionnaire.</p>
          <p><b>Pricing uncertainty:</b> sell as a preview to the first 3 annual prospects before expanding scope.</p>
          <p><b>Support readiness:</b> name one security questionnaire owner and build a canned response library.</p>
          <p><b>Roadmap delay:</b> explicitly defer custom knowledge-retention controls until ACV evidence exists.</p>
        </div>
      </div>
    </section>

    <section class="box p-6 mt-5">
      <div class="label mb-4">Decision path</div>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="border-l-4 border-[var(--green)] pl-4"><h3 class="font-extrabold">Approve</h3><p class="text-sm text-[var(--muted)] mt-2">Start the GBrain Enterprise Preview spec this week; sales identifies 3 design-partner workspaces.</p></div>
        <div class="border-l-4 border-[var(--red)] pl-4"><h3 class="font-extrabold">Reject</h3><p class="text-sm text-[var(--muted)] mt-2">Keep the self-serve roadmap; log enterprise asks but avoid custom commitments.</p></div>
        <div class="border-l-4 border-[var(--blue)] pl-4"><h3 class="font-extrabold">Need evidence</h3><p class="text-sm text-[var(--muted)] mt-2">Run 10 prospect calls and validate annual contract willingness by June 14.</p></div>
      </div>
    </section>
  </main>
</body>
</html>
```

## Usage

Fill the slots top to bottom; the first screen carries the whole decision:
- Header pills: owner, decision deadline, and audience line. Keep it to one line each.
- Decision needed: one sentence, phrased as a yes/no or which-option question.
- Recommendation card (green): the actual call plus a confidence pill and a reversibility pill.
- Metric strip (4 cards): the headline numbers that justify the call. Label any estimate as unproven.
- Tradeoff table: one row per option; keep the columns upside / cost / risk / reversibility fixed.
- Risks & mitigations: each risk paired with a concrete mitigating action.
- Decision path: the next step for approve / reject / need-evidence, color-coded green / red / blue.
If a key number is missing, keep the card but mark it as an estimate or "unknown", and still give a provisional recommendation.
