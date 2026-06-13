---
slug: packs/design-pack/templates/flowai-team-dashboard
type: template
lang: en
category: dashboard
title: "NevoFlux Team Dashboard"
title_zh: "FlowAI 团队管理"
description: "Three-tab team management console: members, member details, and activity log, with a role chart and CSV export."
tags: [flowai, team, members, template]
sample_image: packs/design-pack/assets/templates/flowai-team-dashboard.svg
source: html-anything/flowai-team-dashboard
---
## Design guidance

A single-page team management admin console in the flowing NevoFlux aesthetic. Intent: an operations console for managing the people who build inside a NevoFlux workspace (GBrain editors, Canvas app builders, agent/SDK developers), viewed on desktop (target width 1440).

Layout:
- Three tabs across the top: Team Members / Team Details / Activity Log.
- A KPI stat row summarizing the workspace (members, online now, Canvas apps shipped, agent runs).
- A member table with avatar, role, and status.
- A role distribution bar chart.
- An online-presence block plus per-member activity sparklines.
- A top contributors panel.

Design details:
- Warm, low-contrast neutral background with white surfaces and a single accent color used sparingly (active tab, buttons, chart fills). Supports a light/dark toggle that flips CSS custom properties on the root.
- Avatars are gradient circles with initials so the page stays self-contained with no external images.
- Hover tooltips on sparklines and click-to-zoom panels (panels grow when clicked, implemented with a CSS class toggle).
- A CSV export button serializes the member table to a downloadable file entirely on the front end (no server, no external URL).
- Tables use light top borders, uppercase column headers, and small status pills (online / away / offline).
- Charts and sparklines are inline SVG over soft gradients, so nothing is fetched from the network.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — team dashboard</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --accent-soft: rgba(201,100,66,0.12);
      --surface: #ffffff; --surface-2: #f5f3f0;
      --good: #2f7d4a; --warn: #b58a2a; --bad: #b53a2a;
    }
    [data-theme="dark"] {
      --bg: #1a1916; --fg: #f2efe9; --muted: #9b988f; --border: #322f2a;
      --accent: #e07a52; --accent-soft: rgba(224,122,82,0.18);
      --surface: #232019; --surface-2: #2a261f;
      --good: #5fb37e; --warn: #d6a94a; --bad: #e0715f;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 14px/1.5 -apple-system, system-ui, sans-serif; }
    .shell { max-width: 1280px; margin: 0 auto; padding: 24px 28px 64px; }
    .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 18px; letter-spacing: -0.01em; }
    .brand .mark { width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg, var(--accent), #e9b08c); display: inline-block; }
    .topbar .right { display: flex; align-items: center; gap: 10px; }
    button { font: inherit; cursor: pointer; padding: 7px 13px; border-radius: 8px; }
    .btn-primary { background: var(--accent); color: #fff; border: 1px solid var(--accent); }
    .btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--border); }
    .btn-icon { background: var(--surface); color: var(--fg); border: 1px solid var(--border); width: 34px; height: 34px; padding: 0; border-radius: 8px; }
    .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
    .tab { padding: 10px 16px; border: 0; background: transparent; color: var(--muted); border-bottom: 2px solid transparent; border-radius: 0; }
    .tab.active { color: var(--fg); border-bottom-color: var(--accent); font-weight: 500; }
    .tab:hover { color: var(--fg); }
    .panel-page { display: none; }
    .panel-page.active { display: block; }
    .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    @media (max-width: 900px) { .kpis { grid-template-columns: repeat(2, 1fr); } }
    .kpi { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
    .kpi .label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .kpi .value { font-size: 28px; letter-spacing: -0.02em; }
    .kpi .delta { font-size: 12px; margin-top: 4px; }
    .kpi .delta.up { color: var(--good); }
    .kpi .delta.down { color: var(--bad); }
    .grid-2 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
    @media (max-width: 900px) { .grid-2 { grid-template-columns: 1fr; } }
    .panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; transition: box-shadow 0.18s ease, transform 0.18s ease; cursor: pointer; }
    .panel.zoom { box-shadow: 0 18px 40px rgba(0,0,0,0.14); transform: scale(1.01); cursor: zoom-out; }
    .panel-head { display: flex; justify-content: space-between; align-items: center; margin: 0 0 16px; }
    .panel-head h3 { margin: 0; font-size: 14px; font-weight: 600; }
    .panel-head .hint { font-size: 11px; color: var(--muted); }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 11px 6px; border-top: 1px solid var(--border); }
    th { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; }
    .member { display: flex; align-items: center; gap: 10px; }
    .avatar { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 600; flex: none; }
    .a1 { background: linear-gradient(135deg, #c96442, #e9b08c); }
    .a2 { background: linear-gradient(135deg, #4a7d9b, #9bc7e0); }
    .a3 { background: linear-gradient(135deg, #5a7d4a, #b0d69b); }
    .a4 { background: linear-gradient(135deg, #7d4a7d, #d69bd6); }
    .a5 { background: linear-gradient(135deg, #b58a2a, #e0c97a); }
    .a6 { background: linear-gradient(135deg, #4a5a7d, #9ba9d6); }
    .member .name { font-weight: 500; }
    .member .email { font-size: 12px; color: var(--muted); }
    .pill { display: inline-block; font-size: 11px; padding: 2px 9px; border-radius: 999px; background: var(--surface-2); border: 1px solid var(--border); }
    .pill.online { color: var(--good); border-color: rgba(47,125,74,0.35); }
    .pill.away { color: var(--warn); border-color: rgba(181,138,42,0.35); }
    .pill.offline { color: var(--muted); }
    .role-bars { display: flex; flex-direction: column; gap: 12px; }
    .role-row { display: grid; grid-template-columns: 130px 1fr 40px; align-items: center; gap: 10px; font-size: 13px; }
    .bar-track { height: 10px; background: var(--surface-2); border-radius: 999px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--accent), #e9b08c); }
    .presence { display: flex; flex-wrap: wrap; gap: 8px; }
    .dot { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 4px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface-2); }
    .dot i { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .dot i.on { background: var(--good); }
    .dot i.aw { background: var(--warn); }
    .dot i.off { background: var(--muted); }
    .spark-row { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-top: 1px solid var(--border); }
    .spark-row .who { width: 150px; }
    .spark { flex: 1; height: 34px; position: relative; }
    .spark svg { width: 100%; height: 100%; display: block; }
    .spark .tip { position: absolute; top: -26px; right: 0; background: var(--fg); color: var(--bg); font-size: 11px; padding: 2px 7px; border-radius: 6px; opacity: 0; transition: opacity 0.15s; pointer-events: none; }
    .spark:hover .tip { opacity: 1; }
    .contrib { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid var(--border); }
    .contrib:first-child { border-top: 0; }
    .contrib .rank { width: 22px; color: var(--muted); font-variant-numeric: tabular-nums; }
    .contrib .meta { flex: 1; }
    .contrib .meta .n { font-weight: 500; }
    .contrib .meta .s { font-size: 12px; color: var(--muted); }
    .contrib .score { font-variant-numeric: tabular-nums; font-weight: 600; }
    .log-item { display: flex; gap: 12px; padding: 12px 0; border-top: 1px solid var(--border); }
    .log-item:first-child { border-top: 0; }
    .log-item .time { width: 90px; color: var(--muted); font-size: 12px; flex: none; }
    .log-item .what b { font-weight: 600; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 700px) { .detail-grid { grid-template-columns: 1fr; } }
    .field { padding: 10px 0; border-top: 1px solid var(--border); display: flex; justify-content: space-between; gap: 16px; }
    .field:first-child { border-top: 0; }
    .field .k { color: var(--muted); }
  </style>
</head>
<body>
  <div class="shell">
    <div class="topbar" data-od-id="topbar">
      <div class="brand"><span class="mark"></span> NevoFlux · Team</div>
      <div class="right">
        <button class="btn-icon" id="themeBtn" title="Toggle theme">◐</button>
        <button class="btn-secondary" onclick="exportCSV()">Export CSV</button>
        <button class="btn-primary">+ Invite member</button>
      </div>
    </div>

    <div class="tabs" data-od-id="tabs">
      <button class="tab active" data-tab="members">Team Members</button>
      <button class="tab" data-tab="details">Team Details</button>
      <button class="tab" data-tab="log">Activity Log</button>
    </div>

    <!-- TAB 1: TEAM MEMBERS -->
    <section class="panel-page active" data-page="members">
      <div class="kpis" data-od-id="kpis">
        <div class="kpi"><div class="label">Team members</div><div class="value">24</div><div class="delta up">+3 this month</div></div>
        <div class="kpi"><div class="label">Online now</div><div class="value">9</div><div class="delta up">+2 since 9am</div></div>
        <div class="kpi"><div class="label">Canvas apps shipped</div><div class="value">61</div><div class="delta up">+12.4% MoM</div></div>
        <div class="kpi"><div class="label">Agent runs · 7d</div><div class="value">48.2K</div><div class="delta down">-1.8% WoW</div></div>
      </div>

      <div class="grid-2">
        <div class="panel" data-od-id="member-table" onclick="zoom(this)">
          <div class="panel-head"><h3>Members</h3><span class="hint">click to zoom · export from the toolbar</span></div>
          <table id="memberTable">
            <thead><tr><th>Member</th><th>Role</th><th>GBrain edits</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td><div class="member"><span class="avatar a1">AR</span><div><div class="name">Ava Reyes</div><div class="email">ava@nevoflux.io</div></div></div></td>
                <td>Workspace owner</td><td>1,204</td><td><span class="pill online">online</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a2">KO</span><div><div class="name">Kenji Ota</div><div class="email">kenji@nevoflux.io</div></div></div></td>
                <td>GBrain editor</td><td>842</td><td><span class="pill online">online</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a3">ML</span><div><div class="name">Mara Lindqvist</div><div class="email">mara@nevoflux.io</div></div></div></td>
                <td>Canvas builder</td><td>517</td><td><span class="pill away">away</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a4">DI</span><div><div class="name">Diego Ibarra</div><div class="email">diego@nevoflux.io</div></div></div></td>
                <td>Agent / SDK dev</td><td>396</td><td><span class="pill online">online</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a5">PN</span><div><div class="name">Priya Nair</div><div class="email">priya@nevoflux.io</div></div></div></td>
                <td>Pack maintainer</td><td>288</td><td><span class="pill offline">offline</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a6">TW</span><div><div class="name">Theo Wolff</div><div class="email">theo@nevoflux.io</div></div></div></td>
                <td>Design-skills lead</td><td>233</td><td><span class="pill away">away</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="panel" data-od-id="role-chart" onclick="zoom(this)">
          <div class="panel-head"><h3>Role distribution</h3><span class="hint">24 members</span></div>
          <div class="role-bars">
            <div class="role-row"><span>GBrain editors</span><span class="bar-track"><span class="bar-fill" style="width:78%"></span></span><span>9</span></div>
            <div class="role-row"><span>Canvas builders</span><span class="bar-track"><span class="bar-fill" style="width:60%"></span></span><span>7</span></div>
            <div class="role-row"><span>Agent / SDK devs</span><span class="bar-track"><span class="bar-fill" style="width:42%"></span></span><span>5</span></div>
            <div class="role-row"><span>Pack maintainers</span><span class="bar-track"><span class="bar-fill" style="width:17%"></span></span><span>2</span></div>
            <div class="role-row"><span>Owners</span><span class="bar-track"><span class="bar-fill" style="width:9%"></span></span><span>1</span></div>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="panel" data-od-id="activity-sparklines" onclick="zoom(this)">
          <div class="panel-head"><h3>Activity · last 14 days</h3><span class="hint">hover a line for the peak day</span></div>
          <div class="spark-row">
            <div class="who"><div class="member"><span class="avatar a1">AR</span><span class="name">Ava Reyes</span></div></div>
            <div class="spark"><span class="tip">peak: 142 edits</span><svg viewBox="0 0 280 34" preserveAspectRatio="none"><polyline fill="none" stroke="var(--accent)" stroke-width="2" points="0,26 20,22 40,24 60,16 80,18 100,10 120,14 140,8 160,12 180,6 200,10 220,4 240,8 260,3 280,6"/></svg></div>
          </div>
          <div class="spark-row">
            <div class="who"><div class="member"><span class="avatar a2">KO</span><span class="name">Kenji Ota</span></div></div>
            <div class="spark"><span class="tip">peak: 96 edits</span><svg viewBox="0 0 280 34" preserveAspectRatio="none"><polyline fill="none" stroke="var(--accent)" stroke-width="2" points="0,20 20,24 40,18 60,22 80,14 100,18 120,12 140,16 160,10 180,14 200,12 220,8 240,12 260,9 280,11"/></svg></div>
          </div>
          <div class="spark-row">
            <div class="who"><div class="member"><span class="avatar a4">DI</span><span class="name">Diego Ibarra</span></div></div>
            <div class="spark"><span class="tip">peak: 74 runs</span><svg viewBox="0 0 280 34" preserveAspectRatio="none"><polyline fill="none" stroke="var(--accent)" stroke-width="2" points="0,28 20,26 40,28 60,20 80,24 100,18 120,22 140,16 160,20 180,14 200,18 220,16 240,12 260,16 280,12"/></svg></div>
          </div>
        </div>

        <div class="panel" data-od-id="presence-contrib" onclick="zoom(this)">
          <div class="panel-head"><h3>Online presence</h3><span class="hint">9 online</span></div>
          <div class="presence">
            <span class="dot"><i class="on"></i> Ava</span>
            <span class="dot"><i class="on"></i> Kenji</span>
            <span class="dot"><i class="aw"></i> Mara</span>
            <span class="dot"><i class="on"></i> Diego</span>
            <span class="dot"><i class="off"></i> Priya</span>
            <span class="dot"><i class="aw"></i> Theo</span>
          </div>
          <div class="panel-head" style="margin-top:18px"><h3>Top contributors</h3><span class="hint">this week</span></div>
          <div class="contrib"><span class="rank">1</span><span class="avatar a1">AR</span><span class="meta"><span class="n">Ava Reyes</span><br><span class="s">GBrain edits + 4 Canvas apps</span></span><span class="score">142</span></div>
          <div class="contrib"><span class="rank">2</span><span class="avatar a2">KO</span><span class="meta"><span class="n">Kenji Ota</span><br><span class="s">GBrain edits + 2 packs</span></span><span class="score">96</span></div>
          <div class="contrib"><span class="rank">3</span><span class="avatar a4">DI</span><span class="meta"><span class="n">Diego Ibarra</span><br><span class="s">Agent SDK + 74 runs</span></span><span class="score">74</span></div>
        </div>
      </div>
    </section>

    <!-- TAB 2: TEAM DETAILS -->
    <section class="panel-page" data-page="details">
      <div class="grid-2">
        <div class="panel" style="cursor:default">
          <div class="panel-head"><h3>Workspace</h3></div>
          <div class="field"><span class="k">Workspace name</span><span>Aurora Studio</span></div>
          <div class="field"><span class="k">Plan</span><span>Team · 24 seats</span></div>
          <div class="field"><span class="k">Created</span><span>Mar 4, 2025</span></div>
          <div class="field"><span class="k">Region</span><span>eu-west</span></div>
          <div class="field"><span class="k">Owner</span><span>Ava Reyes</span></div>
        </div>
        <div class="panel" style="cursor:default">
          <div class="panel-head"><h3>Usage this cycle</h3></div>
          <div class="field"><span class="k">GBrain sources indexed</span><span>1,820</span></div>
          <div class="field"><span class="k">Canvas apps published</span><span>61</span></div>
          <div class="field"><span class="k">Agent runs</span><span>48,210</span></div>
          <div class="field"><span class="k">Packs installed</span><span>14</span></div>
          <div class="field"><span class="k">Design skills</span><span>9</span></div>
        </div>
      </div>
      <div class="panel" style="cursor:default">
        <div class="panel-head"><h3>Members &amp; permissions</h3></div>
        <div class="detail-grid">
          <div class="field"><span class="k">Workspace owners</span><span>1</span></div>
          <div class="field"><span class="k">GBrain editors</span><span>9</span></div>
          <div class="field"><span class="k">Canvas builders</span><span>7</span></div>
          <div class="field"><span class="k">Agent / SDK devs</span><span>5</span></div>
          <div class="field"><span class="k">Pack maintainers</span><span>2</span></div>
          <div class="field"><span class="k">Pending invites</span><span>3</span></div>
        </div>
      </div>
    </section>

    <!-- TAB 3: ACTIVITY LOG -->
    <section class="panel-page" data-page="log">
      <div class="panel" style="cursor:default">
        <div class="panel-head"><h3>Activity log</h3><span class="hint">all times local</span></div>
        <div class="log-item"><span class="time">2:14 pm</span><span class="what"><b>Ava Reyes</b> published the Canvas app <b>Onboarding Flow</b></span></div>
        <div class="log-item"><span class="time">1:48 pm</span><span class="what"><b>Kenji Ota</b> indexed a new GBrain source <b>product-specs/</b></span></div>
        <div class="log-item"><span class="time">1:32 pm</span><span class="what"><b>Diego Ibarra</b> connected the agent SDK to <b>support-bot</b></span></div>
        <div class="log-item"><span class="time">12:51 pm</span><span class="what"><b>Mara Lindqvist</b> installed the <b>design-pack</b></span></div>
        <div class="log-item"><span class="time">12:07 pm</span><span class="what"><b>Theo Wolff</b> added a design skill <b>flowai-team-dashboard</b></span></div>
        <div class="log-item"><span class="time">11:20 am</span><span class="what"><b>Priya Nair</b> released pack version <b>v2.3.0</b></span></div>
        <div class="log-item"><span class="time">10:02 am</span><span class="what"><b>Ava Reyes</b> invited <b>3 members</b> to the workspace</span></div>
      </div>
    </section>
  </div>

  <script>
    // Tab switching
    document.querySelectorAll('.tab').forEach(function (t) {
      t.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('active'); });
        document.querySelectorAll('.panel-page').forEach(function (p) { p.classList.remove('active'); });
        t.classList.add('active');
        document.querySelector('[data-page="' + t.dataset.tab + '"]').classList.add('active');
      });
    });
    // Light / dark toggle
    document.getElementById('themeBtn').addEventListener('click', function () {
      var r = document.documentElement;
      r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    // Click-to-zoom panels
    function zoom(el) { el.classList.toggle('zoom'); }
    // Front-end CSV export of the member table
    function exportCSV() {
      var rows = [['Member', 'Email', 'Role', 'GBrain edits', 'Status']];
      document.querySelectorAll('#memberTable tbody tr').forEach(function (tr) {
        var c = tr.querySelectorAll('td');
        rows.push([
          c[0].querySelector('.name').textContent,
          c[0].querySelector('.email').textContent,
          c[1].textContent, c[2].textContent,
          c[3].querySelector('.pill').textContent
        ]);
      });
      var csv = rows.map(function (r) {
        return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'nevoflux-team.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    }
  </script>
</body>
</html>
```

## Usage

- `topbar` — brand mark plus the theme toggle, the CSV export button, and the primary "Invite member" action.
- `tabs` — three tabs (Team Members / Team Details / Activity Log); the active tab is underlined with the accent color and only its `panel-page` is shown.
- `kpis` — 3-5 KPI cards summarizing the workspace; each has an uppercase `label`, a big `value`, and a `delta` (class `up` for green, `down` for red).
- `member-table` — one row per member with a gradient `avatar`, role, a metric, and a status `pill` (`online` / `away` / `offline`). Click the panel to zoom; the export button serializes these rows to CSV on the front end.
- `role-chart` — role distribution bars; set each `bar-fill` width as a percentage and the count on the right.
- `activity-sparklines` — per-member inline-SVG sparklines; swap the `polyline` points to reshape, and edit the `tip` text for the hover tooltip.
- `presence-contrib` — online-presence dots (`on` / `aw` / `off`) plus a ranked top-contributors list.
- Tab 2 (`details`) holds workspace metadata, usage counters, and a permissions breakdown; Tab 3 (`log`) is a timestamped activity feed, one `log-item` per event.
