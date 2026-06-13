---
slug: packs/design-pack/templates/hr-onboarding
type: template
lang: en
category: doc
title: "NevoFlux Onboarding Plan"
title_zh: "新员工入职页"
description: "Single-page onboarding plan: welcome hero, day-1 schedule, first-week timeline, 30/60/90 milestones, resources, and done-when checklist."
tags: [onboarding, 入职, first week, template]
sample_image: packs/design-pack/assets/templates/hr-onboarding.svg
source: html-anything/hr-onboarding
---
## Design guidance

A long, single-page onboarding plan. Intent: a new hire opens it once and immediately knows how their first week — and first 90 days — should go.

Layout (top to bottom):
- Welcome hero (cover): name, role, start date, manager, and onboarding buddy, with a round monogram avatar.
- Day 1 schedule: a two-column timeline (time + item) for the first day.
- First-week timeline: five day cards (Mon–Fri), two activities each.
- 30 / 60 / 90 day milestones: three checkpoint cards, three outcomes each.
- Resources + "you're set when…": a two-panel grid — a bookmarkable resource list and a done-when checklist with checkable boxes.
- Footer with the owning team and a template version line.

Design details:
- Warm paper palette (cream background, white surfaces, soft tan lines) with a single warm-orange accent reused for the avatar gradient, badges, bullet markers, and resource icons.
- A serif display face for the cover headline, section headings, day names, and milestone titles; a sans body; a mono face for eyebrows, times, dates, and meta labels.
- Rounded 12–16px cards on a single accent; completed checklist items flip to a green positive state.
- Responsive: below 900px the cover stacks and centers, the week grid drops to two columns, and the milestones / resource grid collapse to one column.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Welcome to NevoFlux — Maya's Onboarding Plan</title>
<style>
  :root {
    --bg: #fbf9f4;
    --paper: #ffffff;
    --ink: #14110e;
    --muted: #6b6760;
    --line: #ece6d8;
    --accent: #c2521a;
    --accent-soft: #fbe6d6;
    --positive: #2c8a4f;
    --display: 'Georgia', 'Times New Roman', serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 14.5px; line-height: 1.55; }
  .wrap { max-width: 1080px; margin: 28px auto; padding: 0 32px 64px; }

  /* Cover */
  .cover { padding: 36px 40px; background: var(--ink); color: var(--paper); border-radius: 16px; display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }
  .cover .eyebrow { font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-soft); }
  .cover h1 { font-family: var(--display); font-size: 38px; line-height: 1.05; letter-spacing: -0.01em; margin: 8px 0 12px; }
  .cover .meta { display: flex; gap: 28px; font-size: 13px; color: rgba(255,255,255,0.74); }
  .cover .meta strong { color: var(--paper); display: block; font-weight: 600; font-size: 14px; }
  .cover-art { width: 130px; height: 130px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #ec8b5b); display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 56px; color: var(--paper); }

  section { margin-top: 44px; }
  h2 { font-family: var(--display); font-size: 22px; margin: 0 0 6px; letter-spacing: -0.005em; }
  .section-sub { color: var(--muted); margin: 0 0 18px; font-size: 13.5px; }

  /* Day 1 */
  .day-one { padding: 24px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
  .schedule { display: grid; grid-template-columns: 110px 1fr; gap: 0; }
  .schedule-row { display: contents; }
  .schedule-row .time { padding: 12px 0; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 12px; color: var(--muted); }
  .schedule-row .item { padding: 12px 0; border-top: 1px solid var(--line); }
  .schedule-row:first-child .time, .schedule-row:first-child .item { border-top: none; }
  .schedule-row .item strong { display: block; font-weight: 600; }
  .schedule-row .item span { color: var(--muted); font-size: 13px; }

  /* Week timeline */
  .week { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
  .day { padding: 16px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; display: flex; flex-direction: column; gap: 12px; min-height: 200px; }
  .day-head { display: flex; justify-content: space-between; align-items: baseline; }
  .day-name { font-family: var(--display); font-size: 16px; font-weight: 700; }
  .day-date { font-family: var(--mono); font-size: 11px; color: var(--muted); }
  .activity { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; }
  .activity .dot { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); margin-top: 6px; }
  .activity small { display: block; color: var(--muted); margin-top: 2px; font-size: 11.5px; }

  /* 30/60/90 */
  .milestones { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .milestone { padding: 22px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
  .milestone .badge { display: inline-block; font-family: var(--mono); font-size: 11px; padding: 3px 10px; border-radius: 999px; background: var(--accent-soft); color: var(--accent); letter-spacing: 0.06em; margin-bottom: 10px; }
  .milestone h3 { font-family: var(--display); font-size: 18px; margin: 0 0 12px; }
  .milestone ul { padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; }
  .milestone li::marker { color: var(--accent); }

  /* Resources & checklist */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .panel { padding: 22px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
  .panel h3 { font-family: var(--display); font-size: 17px; margin: 0 0 12px; }
  .resource { display: grid; grid-template-columns: 28px 1fr auto; gap: 10px; padding: 10px 0; border-top: 1px solid var(--line); align-items: center; font-size: 13.5px; }
  .resource:first-of-type { border-top: none; padding-top: 0; }
  .resource .icon { width: 28px; height: 28px; background: var(--accent-soft); border-radius: 7px; color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; }
  .resource .meta { color: var(--muted); font-family: var(--mono); font-size: 11px; }
  .check { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-top: 1px dashed var(--line); }
  .check:first-of-type { border-top: none; padding-top: 0; }
  .check .box { flex: 0 0 18px; width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid var(--ink); display: inline-flex; align-items: center; justify-content: center; font-weight: 700; color: transparent; }
  .check.done .box { background: var(--positive); border-color: var(--positive); color: var(--paper); }
  .check strong { display: block; font-weight: 600; }
  .check span { color: var(--muted); font-size: 12.5px; }

  footer { margin-top: 56px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); }

  @media (max-width: 900px) {
    .cover { grid-template-columns: 1fr; text-align: center; }
    .cover-art { margin: 0 auto; }
    .week { grid-template-columns: 1fr 1fr; }
    .milestones { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="cover">
    <div>
      <div class="eyebrow">Onboarding plan · 30/60/90</div>
      <h1>Welcome, Maya. Let's make your first 90 days on NevoFlux feel deliberate.</h1>
      <div class="meta">
        <div><strong>Role</strong>Design Pack Engineer · Canvas squad</div>
        <div><strong>Start date</strong>Mon, 4 November 2025</div>
        <div><strong>Manager</strong>Alvaro Méndez</div>
        <div><strong>Onboarding buddy</strong>Sasha Lin</div>
      </div>
    </div>
    <div class="cover-art">M</div>
  </div>

  <section>
    <h2>Day 1 · Monday</h2>
    <p class="section-sub">A grounded day. Coffee with the team, the NevoFlux browser running locally, and one shipped commit to a design pack by 5pm.</p>
    <div class="day-one">
      <div class="schedule">
        <div class="schedule-row"><div class="time">09:00</div><div class="item"><strong>Kickoff with Alvaro</strong><span>Welcome, week-one walkthrough, expectations chat. Office Room 3 (or NevoFlux call).</span></div></div>
        <div class="schedule-row"><div class="time">10:00</div><div class="item"><strong>Workspace setup with Devon</strong><span>Laptop, badge, SSO, NevoFlux browser, agent SDK, GitHub. Bring two photo IDs.</span></div></div>
        <div class="schedule-row"><div class="time">11:30</div><div class="item"><strong>Coffee with Sasha (buddy)</strong><span>The unwritten rules, who-to-ask map, where the good lunch spots are.</span></div></div>
        <div class="schedule-row"><div class="time">12:30</div><div class="item"><strong>Team lunch · NevoFlux cafeteria</strong><span>Whole Canvas squad joins. No agenda.</span></div></div>
        <div class="schedule-row"><div class="time">14:00</div><div class="item"><strong>Read &amp; explore</strong><span>Handbook, last quarter's pack reviews, and the design-pack GBrain.</span></div></div>
        <div class="schedule-row"><div class="time">16:00</div><div class="item"><strong>Ship "I exist" PR</strong><span>Add yourself to the team Canvas app. Counts as your first commit.</span></div></div>
        <div class="schedule-row"><div class="time">17:00</div><div class="item"><strong>End-of-day check-in with Alvaro</strong><span>15 min. What was confusing, what wasn't. Repeat tomorrow if useful.</span></div></div>
      </div>
    </div>
  </section>

  <section>
    <h2>First week timeline</h2>
    <p class="section-sub">Two activities per day. Anything else is bonus.</p>
    <div class="week">
      <div class="day">
        <div class="day-head"><div class="day-name">Mon</div><div class="day-date">Nov 4</div></div>
        <div class="activity"><span class="dot"></span><div><strong>Kickoff + setup</strong><small>Alvaro · 09:00</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>Ship team-Canvas PR</strong><small>Sasha can review</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">Tue</div><div class="day-date">Nov 5</div></div>
        <div class="activity"><span class="dot"></span><div><strong>Design-pack tour</strong><small>Yuko · 10:00</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>Shadow a GBrain indexing session</strong><small>11:00 with Sam</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">Wed</div><div class="day-date">Nov 6</div></div>
        <div class="activity"><span class="dot"></span><div><strong>Squad weekly</strong><small>09:30</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>Pick a starter ticket</strong><small>From the "good first issues" lane</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">Thu</div><div class="day-date">Nov 7</div></div>
        <div class="activity"><span class="dot"></span><div><strong>Pack review attendance</strong><small>14:00. Just listen.</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>1:1 with skip-level</strong><small>Avi · 16:00</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">Fri</div><div class="day-date">Nov 8</div></div>
        <div class="activity"><span class="dot"></span><div><strong>End-of-week retro</strong><small>15-min note to Alvaro</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>Optional: All-hands demo</strong><small>17:00 · drinks after</small></div></div>
      </div>
    </div>
  </section>

  <section>
    <h2>30 · 60 · 90 day milestones</h2>
    <p class="section-sub">Three outcomes per checkpoint. We'll review each at the matching 1:1 with Alvaro.</p>
    <div class="milestones">
      <div class="milestone">
        <span class="badge">Day 30</span>
        <h3>Find your footing</h3>
        <ul>
          <li>Shipped one small, end-to-end change to a design pack in production.</li>
          <li>Mapped every recurring meeting and why it exists.</li>
          <li>Met with each cross-functional partner (agent, SDK, GBrain, growth).</li>
        </ul>
      </div>
      <div class="milestone">
        <span class="badge">Day 60</span>
        <h3>Own a feature</h3>
        <ul>
          <li>Driving design on the new Canvas onboarding flow — own the spec.</li>
          <li>Ran your first pack review as the presenter.</li>
          <li>Drafted one process improvement and posted it for the team.</li>
        </ul>
      </div>
      <div class="milestone">
        <span class="badge">Day 90</span>
        <h3>Move the team forward</h3>
        <ul>
          <li>Shipped a design skill you led from idea → released pack.</li>
          <li>Mentored someone — even informally.</li>
          <li>Shared one hot take in all-hands and lived to tell.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>Things to bookmark</h2>
    <p class="section-sub">Open these, save them in your NevoFlux browser, then forget about this page.</p>
    <div class="grid-2">
      <div class="panel">
        <h3>Resources</h3>
        <div class="resource"><div class="icon">📘</div><div><strong>NevoFlux Handbook</strong></div><div class="meta">handbook.nf</div></div>
        <div class="resource"><div class="icon">💬</div><div><strong>#canvas-squad</strong></div><div class="meta">Chat</div></div>
        <div class="resource"><div class="icon">🎨</div><div><strong>Design Pack v3.4</strong></div><div class="meta">GBrain</div></div>
        <div class="resource"><div class="icon">📊</div><div><strong>Growth dashboard</strong></div><div class="meta">metrics.nf</div></div>
        <div class="resource"><div class="icon">💸</div><div><strong>Payroll &amp; benefits</strong></div><div class="meta">Rippling</div></div>
        <div class="resource"><div class="icon">📅</div><div><strong>Onboarding calendar</strong></div><div class="meta">cal.nf/onboard</div></div>
      </div>
      <div class="panel">
        <h3>You're set when…</h3>
        <div class="check done"><div class="box">✓</div><div><strong>Laptop, SSO, and badge work end-to-end.</strong><span>Includes NevoFlux browser, agent SDK, GitHub, 1Password.</span></div></div>
        <div class="check done"><div class="box">✓</div><div><strong>You've met everyone on the squad.</strong><span>Coffee, walk, or 15-min call — your call.</span></div></div>
        <div class="check"><div class="box"></div><div><strong>You've shipped your first PR.</strong><span>Even tiny ones count. Sasha will help.</span></div></div>
        <div class="check"><div class="box"></div><div><strong>You can find any meeting on the calendar.</strong><span>And know which ones you can decline.</span></div></div>
        <div class="check"><div class="box"></div><div><strong>You feel comfortable asking dumb questions.</strong><span>This is the most important one. We mean it.</span></div></div>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux People Ops · Onboarding plan template v3.1</span>
    <span>Updated October 2025</span>
  </footer>
</div>
</body>
</html>
```

## Usage

- `cover` — welcome hero: `eyebrow` tag, `h1` greeting, a `meta` row of role / start date / manager / buddy, and a `cover-art` monogram (swap the single letter).
- `day-one` / `schedule` — first-day timeline; each `schedule-row` is a `time` + an `item` (bold title + muted detail). Add or remove rows freely.
- `week` — five `day` cards (Mon–Fri); each has a `day-head` (name + date) and two `activity` rows (dot + bold title + `small` meta).
- `milestones` — three `milestone` cards; each has a `badge` (Day 30/60/90), an `h3` theme, and a `ul` of three outcomes.
- `grid-2` — two panels: a `Resources` list (`resource` = icon + name + mono `meta` label) and a "You're set when…" checklist (`check`, plus `check done` for completed items with a ✓ box).
- `footer` — owning team on the left, template version / updated date on the right.
- All visuals are CSS-only (gradient avatar, colored boxes); no external URLs or images.
