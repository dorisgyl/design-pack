---
slug: packs/design-pack/templates/flowai-team-dashboard-zh
type: template
lang: zh
category: dashboard
title: "FlowAI 团队管理"
title_en: "NevoFlux Team Dashboard"
description: "三个标签页的团队管理后台:成员、详情、活动日志,含角色图表与 CSV 导出。"
tags: [flowai, team, members, 模板]
sample_image: packs/design-pack/assets/templates/flowai-team-dashboard.svg
source: html-anything/flowai-team-dashboard
---
## 设计指导

FlowAI 流动美学的单页团队管理后台。意图:用于管理在 NevoFlux 工作区里搭建内容的成员(GBrain 编辑者、Canvas 应用搭建者、智能体 / SDK 开发者)的运营控制台,面向桌面端(目标宽度 1440)。

布局:
- 顶部三个标签页:团队成员 / 团队详情 / 活动日志。
- 一行 KPI 统计,概览工作区(成员数、当前在线、已发布 Canvas 应用、智能体运行次数)。
- 成员表格,含头像、角色与状态。
- 角色分布柱状图。
- 在线状态区块,以及每位成员的活动迷你折线图。
- 头部贡献者面板。

设计细节:
- 暖色、低对比度的中性背景,搭配白色卡片表面,并克制地使用单一强调色(激活标签、按钮、图表填充)。支持明暗切换,通过翻转根节点上的 CSS 自定义属性实现。
- 头像为带首字母的渐变圆形,使页面自包含、无需外部图片。
- 迷你折线图带悬停提示,面板支持点击放大(点击时面板放大,通过切换 CSS 类实现)。
- CSV 导出按钮完全在前端将成员表序列化为可下载文件(无服务端、无外部 URL)。
- 表格使用浅色上边框、大写列头,以及小巧的状态药丸标签(在线 / 离开 / 离线)。
- 图表与迷你折线均为内联 SVG 叠加柔和渐变,不从网络拉取任何资源。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — 团队后台</title>
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
      <div class="brand"><span class="mark"></span> NevoFlux · 团队</div>
      <div class="right">
        <button class="btn-icon" id="themeBtn" title="切换主题">◐</button>
        <button class="btn-secondary" onclick="exportCSV()">导出 CSV</button>
        <button class="btn-primary">+ 邀请成员</button>
      </div>
    </div>

    <div class="tabs" data-od-id="tabs">
      <button class="tab active" data-tab="members">团队成员</button>
      <button class="tab" data-tab="details">团队详情</button>
      <button class="tab" data-tab="log">活动日志</button>
    </div>

    <!-- 标签页 1:团队成员 -->
    <section class="panel-page active" data-page="members">
      <div class="kpis" data-od-id="kpis">
        <div class="kpi"><div class="label">团队成员</div><div class="value">24</div><div class="delta up">本月 +3</div></div>
        <div class="kpi"><div class="label">当前在线</div><div class="value">9</div><div class="delta up">较上午 9 点 +2</div></div>
        <div class="kpi"><div class="label">已发布 Canvas 应用</div><div class="value">61</div><div class="delta up">环比 +12.4%</div></div>
        <div class="kpi"><div class="label">智能体运行 · 7 天</div><div class="value">48.2K</div><div class="delta down">周环比 -1.8%</div></div>
      </div>

      <div class="grid-2">
        <div class="panel" data-od-id="member-table" onclick="zoom(this)">
          <div class="panel-head"><h3>成员</h3><span class="hint">点击放大 · 从工具栏导出</span></div>
          <table id="memberTable">
            <thead><tr><th>成员</th><th>角色</th><th>GBrain 编辑</th><th>状态</th></tr></thead>
            <tbody>
              <tr>
                <td><div class="member"><span class="avatar a1">AR</span><div><div class="name">Ava Reyes</div><div class="email">ava@nevoflux.io</div></div></div></td>
                <td>工作区所有者</td><td>1,204</td><td><span class="pill online">在线</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a2">KO</span><div><div class="name">Kenji Ota</div><div class="email">kenji@nevoflux.io</div></div></div></td>
                <td>GBrain 编辑者</td><td>842</td><td><span class="pill online">在线</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a3">ML</span><div><div class="name">Mara Lindqvist</div><div class="email">mara@nevoflux.io</div></div></div></td>
                <td>Canvas 搭建者</td><td>517</td><td><span class="pill away">离开</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a4">DI</span><div><div class="name">Diego Ibarra</div><div class="email">diego@nevoflux.io</div></div></div></td>
                <td>智能体 / SDK 开发</td><td>396</td><td><span class="pill online">在线</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a5">PN</span><div><div class="name">Priya Nair</div><div class="email">priya@nevoflux.io</div></div></div></td>
                <td>Pack 维护者</td><td>288</td><td><span class="pill offline">离线</span></td>
              </tr>
              <tr>
                <td><div class="member"><span class="avatar a6">TW</span><div><div class="name">Theo Wolff</div><div class="email">theo@nevoflux.io</div></div></div></td>
                <td>设计技能负责人</td><td>233</td><td><span class="pill away">离开</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="panel" data-od-id="role-chart" onclick="zoom(this)">
          <div class="panel-head"><h3>角色分布</h3><span class="hint">24 名成员</span></div>
          <div class="role-bars">
            <div class="role-row"><span>GBrain 编辑者</span><span class="bar-track"><span class="bar-fill" style="width:78%"></span></span><span>9</span></div>
            <div class="role-row"><span>Canvas 搭建者</span><span class="bar-track"><span class="bar-fill" style="width:60%"></span></span><span>7</span></div>
            <div class="role-row"><span>智能体 / SDK</span><span class="bar-track"><span class="bar-fill" style="width:42%"></span></span><span>5</span></div>
            <div class="role-row"><span>Pack 维护者</span><span class="bar-track"><span class="bar-fill" style="width:17%"></span></span><span>2</span></div>
            <div class="role-row"><span>所有者</span><span class="bar-track"><span class="bar-fill" style="width:9%"></span></span><span>1</span></div>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="panel" data-od-id="activity-sparklines" onclick="zoom(this)">
          <div class="panel-head"><h3>活动 · 近 14 天</h3><span class="hint">悬停折线查看峰值日</span></div>
          <div class="spark-row">
            <div class="who"><div class="member"><span class="avatar a1">AR</span><span class="name">Ava Reyes</span></div></div>
            <div class="spark"><span class="tip">峰值:142 次编辑</span><svg viewBox="0 0 280 34" preserveAspectRatio="none"><polyline fill="none" stroke="var(--accent)" stroke-width="2" points="0,26 20,22 40,24 60,16 80,18 100,10 120,14 140,8 160,12 180,6 200,10 220,4 240,8 260,3 280,6"/></svg></div>
          </div>
          <div class="spark-row">
            <div class="who"><div class="member"><span class="avatar a2">KO</span><span class="name">Kenji Ota</span></div></div>
            <div class="spark"><span class="tip">峰值:96 次编辑</span><svg viewBox="0 0 280 34" preserveAspectRatio="none"><polyline fill="none" stroke="var(--accent)" stroke-width="2" points="0,20 20,24 40,18 60,22 80,14 100,18 120,12 140,16 160,10 180,14 200,12 220,8 240,12 260,9 280,11"/></svg></div>
          </div>
          <div class="spark-row">
            <div class="who"><div class="member"><span class="avatar a4">DI</span><span class="name">Diego Ibarra</span></div></div>
            <div class="spark"><span class="tip">峰值:74 次运行</span><svg viewBox="0 0 280 34" preserveAspectRatio="none"><polyline fill="none" stroke="var(--accent)" stroke-width="2" points="0,28 20,26 40,28 60,20 80,24 100,18 120,22 140,16 160,20 180,14 200,18 220,16 240,12 260,16 280,12"/></svg></div>
          </div>
        </div>

        <div class="panel" data-od-id="presence-contrib" onclick="zoom(this)">
          <div class="panel-head"><h3>在线状态</h3><span class="hint">9 人在线</span></div>
          <div class="presence">
            <span class="dot"><i class="on"></i> Ava</span>
            <span class="dot"><i class="on"></i> Kenji</span>
            <span class="dot"><i class="aw"></i> Mara</span>
            <span class="dot"><i class="on"></i> Diego</span>
            <span class="dot"><i class="off"></i> Priya</span>
            <span class="dot"><i class="aw"></i> Theo</span>
          </div>
          <div class="panel-head" style="margin-top:18px"><h3>头部贡献者</h3><span class="hint">本周</span></div>
          <div class="contrib"><span class="rank">1</span><span class="avatar a1">AR</span><span class="meta"><span class="n">Ava Reyes</span><br><span class="s">GBrain 编辑 + 4 个 Canvas 应用</span></span><span class="score">142</span></div>
          <div class="contrib"><span class="rank">2</span><span class="avatar a2">KO</span><span class="meta"><span class="n">Kenji Ota</span><br><span class="s">GBrain 编辑 + 2 个 pack</span></span><span class="score">96</span></div>
          <div class="contrib"><span class="rank">3</span><span class="avatar a4">DI</span><span class="meta"><span class="n">Diego Ibarra</span><br><span class="s">智能体 SDK + 74 次运行</span></span><span class="score">74</span></div>
        </div>
      </div>
    </section>

    <!-- 标签页 2:团队详情 -->
    <section class="panel-page" data-page="details">
      <div class="grid-2">
        <div class="panel" style="cursor:default">
          <div class="panel-head"><h3>工作区</h3></div>
          <div class="field"><span class="k">工作区名称</span><span>Aurora Studio</span></div>
          <div class="field"><span class="k">套餐</span><span>团队版 · 24 席位</span></div>
          <div class="field"><span class="k">创建时间</span><span>2025-03-04</span></div>
          <div class="field"><span class="k">区域</span><span>eu-west</span></div>
          <div class="field"><span class="k">所有者</span><span>Ava Reyes</span></div>
        </div>
        <div class="panel" style="cursor:default">
          <div class="panel-head"><h3>本周期用量</h3></div>
          <div class="field"><span class="k">已索引 GBrain 来源</span><span>1,820</span></div>
          <div class="field"><span class="k">已发布 Canvas 应用</span><span>61</span></div>
          <div class="field"><span class="k">智能体运行次数</span><span>48,210</span></div>
          <div class="field"><span class="k">已安装 packs</span><span>14</span></div>
          <div class="field"><span class="k">设计技能</span><span>9</span></div>
        </div>
      </div>
      <div class="panel" style="cursor:default">
        <div class="panel-head"><h3>成员与权限</h3></div>
        <div class="detail-grid">
          <div class="field"><span class="k">工作区所有者</span><span>1</span></div>
          <div class="field"><span class="k">GBrain 编辑者</span><span>9</span></div>
          <div class="field"><span class="k">Canvas 搭建者</span><span>7</span></div>
          <div class="field"><span class="k">智能体 / SDK 开发</span><span>5</span></div>
          <div class="field"><span class="k">Pack 维护者</span><span>2</span></div>
          <div class="field"><span class="k">待处理邀请</span><span>3</span></div>
        </div>
      </div>
    </section>

    <!-- 标签页 3:活动日志 -->
    <section class="panel-page" data-page="log">
      <div class="panel" style="cursor:default">
        <div class="panel-head"><h3>活动日志</h3><span class="hint">均为本地时间</span></div>
        <div class="log-item"><span class="time">14:14</span><span class="what"><b>Ava Reyes</b> 发布了 Canvas 应用 <b>新手引导流程</b></span></div>
        <div class="log-item"><span class="time">13:48</span><span class="what"><b>Kenji Ota</b> 索引了新的 GBrain 来源 <b>product-specs/</b></span></div>
        <div class="log-item"><span class="time">13:32</span><span class="what"><b>Diego Ibarra</b> 将智能体 SDK 接入了 <b>support-bot</b></span></div>
        <div class="log-item"><span class="time">12:51</span><span class="what"><b>Mara Lindqvist</b> 安装了 <b>design-pack</b></span></div>
        <div class="log-item"><span class="time">12:07</span><span class="what"><b>Theo Wolff</b> 新增了设计技能 <b>flowai-team-dashboard</b></span></div>
        <div class="log-item"><span class="time">11:20</span><span class="what"><b>Priya Nair</b> 发布了 pack 版本 <b>v2.3.0</b></span></div>
        <div class="log-item"><span class="time">10:02</span><span class="what"><b>Ava Reyes</b> 向工作区邀请了 <b>3 名成员</b></span></div>
      </div>
    </section>
  </div>

  <script>
    // 标签页切换
    document.querySelectorAll('.tab').forEach(function (t) {
      t.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('active'); });
        document.querySelectorAll('.panel-page').forEach(function (p) { p.classList.remove('active'); });
        t.classList.add('active');
        document.querySelector('[data-page="' + t.dataset.tab + '"]').classList.add('active');
      });
    });
    // 明暗切换
    document.getElementById('themeBtn').addEventListener('click', function () {
      var r = document.documentElement;
      r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    // 点击放大面板
    function zoom(el) { el.classList.toggle('zoom'); }
    // 前端导出成员表为 CSV
    function exportCSV() {
      var rows = [['成员', '邮箱', '角色', 'GBrain 编辑', '状态']];
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

## 用法

- `topbar` — 品牌标识,以及主题切换、CSV 导出按钮和「邀请成员」主操作。
- `tabs` — 三个标签页(团队成员 / 团队详情 / 活动日志);激活标签以强调色下划线标示,仅显示其对应的 `panel-page`。
- `kpis` — 3-5 个概览工作区的 KPI 卡片;每个含大写 `label`、较大的 `value`,以及 `delta`(`up` 绿色、`down` 红色)。
- `member-table` — 每行一名成员,含渐变 `avatar`、角色、一项指标,以及状态 `pill`(`online` / `away` / `offline`)。点击面板放大;导出按钮在前端将这些行序列化为 CSV。
- `role-chart` — 角色分布柱状图;按百分比设置每个 `bar-fill` 的宽度,右侧填写数量。
- `activity-sparklines` — 每位成员的内联 SVG 迷你折线;替换 `polyline` 的点即可改变形态,编辑 `tip` 文本即为悬停提示。
- `presence-contrib` — 在线状态圆点(`on` / `aw` / `off`)与头部贡献者排行。
- 标签页 2(`details`)放置工作区元信息、用量计数与权限拆分;标签页 3(`log`)为带时间戳的活动流,每条一个 `log-item`。
