---
slug: packs/design-pack/templates/kanban-board-zh
type: template
lang: zh
category: dashboard
title: "看板 / Kanban"
title_en: "NevoFlux Kanban Board"
description: "单页 Trello 风格看板:筛选栏、四列状态卡片(标签/头像)与冲刺脉搏侧边栏。"
tags: [kanban, trello, sprint, 看板, 模板]
sample_image: packs/design-pack/assets/templates/kanban-board.svg
source: html-anything/kanban-board
---
## 设计指导

类 Trello 的 Kanban 单页看板。意图:在桌面端(目标宽度 1440)查看的冲刺看板。

布局:
- 顶部 filter bar:负责人头像、标签 chip、搜索框。
- 四列:Backlog / In progress / In review / Done(待办 / 进行中 / 评审中 / 已完成)。
- 卡片包含:标签 / 标题 / due 或点数 / 头像 / issue 编号(以及评论数)。
- 可选 swimlanes(按 epic 或负责人分组)。
- 右侧侧边栏展示冲刺脉搏:完成进度、贡献榜、被阻塞工单提示。

设计细节:
- 暖色低对比中性背景,白色卡面,只用一种紫色强调色,克制使用。
- 不需要真正的拖拽,但卡片要看起来可拖(grab 光标、悬停浮起、虚线"新建卡片"占位)。
- 标签 tag 是小号大写等宽 chip,按类型(Feature / Bug / Design / Chore / Research)上色。
- 头像是带首字母的渐变圆;进度条是细长 pill,用强调色渐变填充。
- 全部自包含:仅用渐变与内联图形,无外部资源。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Canvas 小组 · 冲刺 12 看板</title>
<style>
  :root {
    --bg: #f7f7f9;
    --paper: #ffffff;
    --ink: #1a1d29;
    --muted: #5e6478;
    --line: #e5e7ee;
    --line-strong: #c8cdd9;
    --accent: #5b3df0;
    --accent-soft: #ece8ff;
    --pink: #d6336c;
    --teal: #1a8e8e;
    --amber: #b58522;
    --green: #2c8a4f;
    --display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 13.5px; line-height: 1.5; }
  .app { display: grid; grid-template-columns: 1fr 280px; min-height: 100vh; }
  main { padding: 18px 22px 32px; min-width: 0; }
  aside.sidebar { padding: 22px 24px; border-left: 1px solid var(--line); background: var(--paper); }

  /* Topbar */
  .topbar { display: flex; align-items: center; gap: 16px; padding-bottom: 16px; }
  .crumb { font-family: var(--mono); font-size: 11.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .sprint-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; background: var(--accent-soft); color: var(--accent); font-weight: 600; font-size: 11.5px; }
  .sprint-chip .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
  .topbar-spacer { flex: 1; }
  .topbar input.search { padding: 7px 10px; border: 1px solid var(--line); border-radius: 8px; font-size: 13px; max-width: 220px; background: var(--paper); }
  .icon-btn { padding: 6px 10px; background: var(--paper); border: 1px solid var(--line); border-radius: 8px; font-size: 12.5px; cursor: pointer; color: var(--muted); }

  .filterbar { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; margin-bottom: 14px; }
  .filter-label { font-family: var(--mono); font-size: 10.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-right: 6px; }
  .chip-row { display: flex; gap: 6px; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); font-size: 12px; color: var(--muted); cursor: pointer; }
  .chip.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  .chip .av { width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #a991ff); display: inline-block; }
  .filterbar .spacer { flex: 1; }
  .members { display: flex; }
  .members .av { width: 26px; height: 26px; border-radius: 50%; border: 2px solid var(--paper); margin-left: -8px; font-size: 10.5px; font-weight: 700; color: white; display: inline-flex; align-items: center; justify-content: center; }
  .members .av:first-child { margin-left: 0; }

  /* Board */
  .board { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; align-items: flex-start; }
  .col { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 12px; min-height: 460px; display: flex; flex-direction: column; gap: 10px; }
  .col-head { display: flex; align-items: center; justify-content: space-between; padding: 4px 4px 8px; border-bottom: 1px dashed var(--line); }
  .col-name { font-weight: 600; font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .col-name .swatch { width: 8px; height: 8px; border-radius: 50%; }
  .swatch.gray { background: var(--line-strong); }
  .swatch.violet { background: var(--accent); }
  .swatch.amber { background: var(--amber); }
  .swatch.green { background: var(--green); }
  .col-count { font-family: var(--mono); font-size: 10.5px; color: var(--muted); padding: 2px 6px; background: var(--bg); border-radius: 999px; }

  /* Cards */
  .card { padding: 12px 14px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; display: flex; flex-direction: column; gap: 10px; cursor: grab; transition: border-color 0.15s, box-shadow 0.15s; }
  .card:hover { border-color: var(--accent); box-shadow: 0 4px 12px rgba(91,61,240,0.06); }
  .card-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
  .tag-bug { background: rgba(214,51,108,0.12); color: var(--pink); }
  .tag-feat { background: rgba(91,61,240,0.12); color: var(--accent); }
  .tag-design { background: rgba(26,142,142,0.12); color: var(--teal); }
  .tag-chore { background: rgba(94,100,120,0.12); color: var(--muted); }
  .tag-research { background: rgba(181,133,34,0.12); color: var(--amber); }
  .card-title { font-size: 13.5px; font-weight: 500; line-height: 1.4; }
  .card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--muted); }
  .card-meta .left { display: flex; gap: 8px; align-items: center; }
  .av-sm { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #a991ff); color: white; font-size: 10px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
  .av-mira { background: linear-gradient(135deg, #d6336c, #ff7a9b); }
  .av-cale { background: linear-gradient(135deg, #1a8e8e, #56c1c1); }
  .av-pri { background: linear-gradient(135deg, #b58522, #f1b13a); }
  .av-dev { background: linear-gradient(135deg, #2c8a4f, #66c285); }
  .pts { font-family: var(--mono); padding: 2px 7px; border: 1px solid var(--line); border-radius: 999px; font-size: 10.5px; color: var(--muted); }
  .progress { height: 4px; background: var(--bg); border-radius: 999px; overflow: hidden; }
  .progress > span { display: block; height: 100%; background: var(--accent); border-radius: 999px; }
  .add-card { padding: 10px; border: 1px dashed var(--line-strong); border-radius: 8px; text-align: center; color: var(--muted); font-size: 12px; cursor: pointer; }
  .add-card:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }

  /* Sidebar */
  aside h4 { font-family: var(--display); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 0 0 10px; font-weight: 600; }
  .pulse { display: flex; flex-direction: column; gap: 14px; }
  .pulse-stat { display: flex; justify-content: space-between; font-size: 13px; }
  .pulse-stat strong { font-family: var(--mono); }
  .pulse-bar { height: 6px; background: var(--bg); border-radius: 999px; overflow: hidden; }
  .pulse-bar > span { display: block; height: 100%; background: linear-gradient(90deg, var(--accent), #a991ff); border-radius: 999px; }
  .top-list { display: flex; flex-direction: column; gap: 10px; }
  .top-row { display: grid; grid-template-columns: 28px 1fr auto; gap: 10px; align-items: center; font-size: 12.5px; }
  .pill-block { padding: 16px; border-radius: 10px; background: rgba(214,51,108,0.07); border: 1px solid rgba(214,51,108,0.2); }
  .pill-block strong { color: var(--pink); }

  @media (max-width: 1180px) {
    .app { grid-template-columns: 1fr; }
    aside.sidebar { border-left: none; border-top: 1px solid var(--line); }
    .board { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 720px) { .board { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<div class="app">
  <main>
    <div class="topbar">
      <span class="crumb">NevoFlux / Canvas 小组</span>
      <span class="sprint-chip"><span class="dot"></span>冲刺 12 · 第 6 / 10 天</span>
      <div class="topbar-spacer"></div>
      <input class="search" placeholder="搜索工单…" />
      <button class="icon-btn">⌘ 筛选</button>
      <button class="icon-btn">+ 新建</button>
    </div>

    <div class="filterbar">
      <span class="filter-label">成员</span>
      <div class="members">
        <span class="av av-mira">MR</span>
        <span class="av av-cale">CA</span>
        <span class="av av-pri">PB</span>
        <span class="av av-dev">DP</span>
        <span class="av" style="background: #c8cdd9; color: #5e6478;">+1</span>
      </div>
      <span class="filter-label" style="margin-left: 18px;">标签</span>
      <div class="chip-row">
        <span class="chip active">当前冲刺</span>
        <span class="chip">Bug</span>
        <span class="chip">功能</span>
        <span class="chip">调研</span>
      </div>
      <div class="spacer"></div>
      <span class="chip">分组 · 状态</span>
      <span class="chip">排序 · 优先级</span>
    </div>

    <div class="board">
      <div class="col">
        <div class="col-head"><div class="col-name"><span class="swatch gray"></span>待办</div><span class="col-count">5</span></div>
        <div class="card">
          <span class="card-tag tag-feat">功能</span>
          <div class="card-title">为 Canvas 应用画廊补充空状态插图</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-dev">DP</span><span class="pts">3 点</span></div><span>NF-241</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-design">设计</span>
          <div class="card-title">刷新 GBrain 数据源设置页的 token</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-mira">MR</span><span class="pts">2 点</span></div><span>NF-237</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-research">调研</span>
          <div class="card-title">访谈 5 位 pack 作者了解 agent SDK 上手体验</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-pri">PB</span><span class="pts">5 点</span></div><span>NF-225</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-chore">杂项</span>
          <div class="card-title">将旧版 GBrain 索引迁移到新 schema</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-cale">CA</span><span class="pts">3 点</span></div><span>NF-219</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-bug">Bug</span>
          <div class="card-title">pack 导出会丢掉 Canvas 应用名里的 emoji</div>
          <div class="card-meta"><div class="left"><span class="av-sm">+</span><span class="pts">1 点</span></div><span>NF-244</span></div>
        </div>
        <div class="add-card">+ 新建卡片</div>
      </div>

      <div class="col">
        <div class="col-head"><div class="col-name"><span class="swatch violet"></span>进行中</div><span class="col-count">4</span></div>
        <div class="card">
          <span class="card-tag tag-feat">功能</span>
          <div class="card-title">工作区设置里的 GBrain 数据源连接 UI</div>
          <div class="progress"><span style="width: 70%"></span></div>
          <div class="card-meta"><div class="left"><span class="av-sm av-dev">DP</span><span class="pts">5 点</span></div><span>NF-201</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-feat">功能</span>
          <div class="card-title">agent SDK 密钥 — 生成、复制、吊销</div>
          <div class="progress"><span style="width: 45%"></span></div>
          <div class="card-meta"><div class="left"><span class="av-sm av-pri">PB</span><span class="pts">3 点</span></div><span>NF-202</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-bug">Bug</span>
          <div class="card-title">修复 Canvas 命令栏的焦点陷阱回归</div>
          <div class="progress"><span style="width: 80%"></span></div>
          <div class="card-meta"><div class="left"><span class="av-sm av-cale">CA</span><span class="pts">2 点</span></div><span>NF-238</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-design">设计</span>
          <div class="card-title">design-pack 安装步骤 — 视觉 + 文案</div>
          <div class="progress"><span style="width: 30%"></span></div>
          <div class="card-meta"><div class="left"><span class="av-sm av-mira">MR</span><span class="pts">3 点</span></div><span>NF-205</span></div>
        </div>
      </div>

      <div class="col">
        <div class="col-head"><div class="col-name"><span class="swatch amber"></span>评审中</div><span class="col-count">3</span></div>
        <div class="card">
          <span class="card-tag tag-feat">功能</span>
          <div class="card-title">为 GBrain 重新索引事件补充审计日志</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-pri">PB</span><span class="pts">2 点</span></div><span>NF-198</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-design">设计</span>
          <div class="card-title">浏览器侧栏结构重排(左侧栏)</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-mira">MR</span><span class="pts">3 点</span></div><span>NF-189</span></div>
        </div>
        <div class="card">
          <span class="card-tag tag-bug">Bug</span>
          <div class="card-title">工作区切换器关闭时滚动位置被重置</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-cale">CA</span><span class="pts">1 点</span></div><span>NF-233</span></div>
        </div>
      </div>

      <div class="col">
        <div class="col-head"><div class="col-name"><span class="swatch green"></span>已完成</div><span class="col-count">6</span></div>
        <div class="card" style="opacity: 0.85;">
          <span class="card-tag tag-feat">功能</span>
          <div class="card-title">工作区 pack 发布策略(管理员)</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-dev">DP</span><span class="pts">5 点</span></div><span>NF-181</span></div>
        </div>
        <div class="card" style="opacity: 0.85;">
          <span class="card-tag tag-chore">杂项</span>
          <div class="card-title">将 agent SDK 升级到 4.2.0</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-cale">CA</span><span class="pts">1 点</span></div><span>NF-176</span></div>
        </div>
        <div class="card" style="opacity: 0.85;">
          <span class="card-tag tag-research">调研</span>
          <div class="card-title">Canvas 应用可用性测试(n=8)</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-pri">PB</span><span class="pts">3 点</span></div><span>NF-172</span></div>
        </div>
        <div class="card" style="opacity: 0.85;">
          <span class="card-tag tag-design">设计</span>
          <div class="card-title">design-pack token 审计</div>
          <div class="card-meta"><div class="left"><span class="av-sm av-mira">MR</span><span class="pts">2 点</span></div><span>NF-168</span></div>
        </div>
      </div>
    </div>
  </main>

  <aside class="sidebar">
    <div class="pulse">
      <div>
        <h4>冲刺脉搏</h4>
        <div class="pulse-stat"><span>已完成</span><strong>22 / 38 点</strong></div>
        <div class="pulse-bar" style="margin-top: 6px;"><span style="width: 58%"></span></div>
      </div>
      <div>
        <h4>贡献榜</h4>
        <div class="top-list">
          <div class="top-row"><span class="av-sm av-dev">DP</span><span>Devon Park</span><strong>9 点</strong></div>
          <div class="top-row"><span class="av-sm av-mira">MR</span><span>Mira Reddy</span><strong>5 点</strong></div>
          <div class="top-row"><span class="av-sm av-pri">PB</span><span>Priya Banerjee</span><strong>5 点</strong></div>
          <div class="top-row"><span class="av-sm av-cale">CA</span><span>Caleb Renner</span><strong>3 点</strong></div>
        </div>
      </div>
      <div>
        <h4>被阻塞</h4>
        <div class="pill-block">
          <strong>1 个工单待解阻塞。</strong>
          <p style="margin: 6px 0 0; color: var(--muted); font-size: 12.5px;">NF-205(design-pack 安装步骤)正在等待品牌组的文案评审。@Sasha 或将其退回待办。</p>
        </div>
      </div>
    </div>
  </aside>
</div>
</body>
</html>
```

## 用法

- `topbar` — 面包屑(工作区 / 小组)、冲刺 chip(编号 + 天数)、搜索框,以及筛选 / 新建按钮。
- `filterbar` — 成员头像(带首字母的渐变圆)、标签 chip(给某一个加 `active` 高亮),末尾是分组 / 排序 chip。
- `board` — 四个 `col` 块(待办 / 进行中 / 评审中 / 已完成);每个 `col-head` 含一个彩色 `swatch` 和 `col-count`。
- `card` — 单个工单:`card-tag`(`tag-feat` / `tag-bug` / `tag-design` / `tag-chore` / `tag-research`)、`card-title`、可选 `progress` 进度条、负责人 `av-sm`、`pts` 点数标记,以及 issue 编号。
- `add-card` — 列底部的虚线"新建卡片"占位。
- `sidebar` — 冲刺脉搏(完成进度条)、贡献榜列表,以及 `pill-block` 被阻塞工单提示。
