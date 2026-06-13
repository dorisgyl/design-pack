---
slug: packs/design-pack/templates/mobile-app-zh
type: template
lang: zh
category: mobile
title: "iPhone App 单屏"
title_en: "NevoFlux Mobile App Screen"
description: "在像素级 iPhone 15 Pro 边框里呈现的一屏移动 app 设计。"
tags: [mobile, ios, app, phone, 模板]
sample_image: packs/design-pack/assets/templates/mobile-app.svg
source: html-anything/mobile-app
---
## 设计指导

一个屏幕的移动 app 设计,放在像素级 iPhone 15 Pro frame 里。意图:把一屏 app 设计做成一张可信的手机截图。

布局:
- Status bar(时间 + 电池 + 信号)。
- App header(标题 / 头像 / 搜索)。
- Main content,围绕一个清晰的 archetype:feed / list / detail / form。
- Bottom tab bar(4-5 个 tab)。

设计细节:
- 使用真实的 dynamic island,顶部与底部保留 safe-area 留白。
- 手机边框是带柔和投影的圆角黑色外壳;内部屏幕有自己的大圆角并裁切溢出内容。
- 暖色、低对比度的中性背景,配白色卡面与单一强调色,用于主卡片、激活态和选中的 tab。
- 主卡片承载核心操作并使用屏幕上最大的字号;辅助区块(数据网格、列表行)保持安静、次要。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — GBrain 屏</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff;
    }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 32px; font: 14px/1.5 -apple-system, system-ui, sans-serif; color: var(--fg); }
    .frame { width: 390px; height: 844px; background: black; border-radius: 56px; padding: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.18); position: relative; }
    .frame::before { content: ''; position: absolute; top: 22px; left: 50%; transform: translateX(-50%); width: 124px; height: 36px; background: black; border-radius: 999px; z-index: 5; }
    .screen { width: 100%; height: 100%; background: var(--bg); border-radius: 44px; overflow: hidden; display: flex; flex-direction: column; }
    .status { padding: 14px 24px 6px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; }
    .status .right { display: flex; gap: 6px; align-items: center; }
    .header { padding: 56px 24px 24px; }
    .header .greeting { color: var(--muted); font-size: 14px; margin: 0 0 4px; }
    .header h1 { margin: 0; font-size: 22px; letter-spacing: -0.01em; }
    .timer-card { margin: 12px 24px; background: var(--accent); color: white; border-radius: 24px; padding: 28px 24px; text-align: center; }
    .timer-card .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.85; margin: 0 0 4px; }
    .timer-card .countdown { font-size: 64px; line-height: 1; letter-spacing: -0.03em; font-weight: 600; margin: 6px 0 18px; font-variant-numeric: tabular-nums; }
    .timer-card .progress { height: 6px; background: rgba(255,255,255,0.25); border-radius: 999px; overflow: hidden; margin-bottom: 16px; }
    .timer-card .progress > span { display: block; width: 38%; height: 100%; background: white; }
    .timer-card .actions { display: flex; gap: 10px; justify-content: center; }
    .timer-card button { font: inherit; cursor: pointer; padding: 10px 22px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.4); background: rgba(255,255,255,0.12); color: white; font-weight: 500; }
    .timer-card button.primary { background: white; color: var(--accent); border-color: white; }
    .section { padding: 18px 24px 0; }
    .section .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin: 0 0 10px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .stat { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px; }
    .stat .v { font-size: 22px; letter-spacing: -0.01em; line-height: 1; margin-bottom: 4px; }
    .stat .l { font-size: 11px; color: var(--muted); }
    .tasks { padding: 18px 24px 8px; }
    .task { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid var(--border); }
    .task:first-child { border-top: none; }
    .check { width: 20px; height: 20px; border: 1.5px solid var(--border); border-radius: 50%; flex-shrink: 0; }
    .task.done .check { background: var(--accent); border-color: var(--accent); }
    .task.done .check::after { content: '✓'; color: white; font-size: 13px; display: block; text-align: center; line-height: 18px; }
    .task .body { flex: 1; }
    .task .title { font-size: 14.5px; line-height: 1.3; }
    .task.done .title { color: var(--muted); text-decoration: line-through; }
    .task .meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
    .tabbar { margin-top: auto; display: grid; grid-template-columns: repeat(4, 1fr); padding: 10px 16px 28px; border-top: 1px solid var(--border); background: var(--surface); }
    .tab { text-align: center; color: var(--muted); font-size: 11px; padding: 6px 0; }
    .tab.active { color: var(--accent); font-weight: 500; }
    .tab .icon { font-size: 18px; line-height: 1; margin-bottom: 4px; }
  </style>
</head>
<body>
  <div class="frame" data-od-id="frame">
    <div class="screen">
      <div class="status"><span>9:41</span><span class="right">·· 5G · 100%</span></div>
      <div class="header" data-od-id="header">
        <p class="greeting">周二 · 4 月 22 日</p>
        <h1>还有两个 Pack 待索引。</h1>
      </div>
      <div class="timer-card" data-od-id="timer">
        <p class="label">正在索引 GBrain</p>
        <div class="countdown">15:42</div>
        <div class="progress"><span></span></div>
        <div class="actions">
          <button>跳过</button>
          <button class="primary">暂停</button>
        </div>
      </div>
      <div class="section" data-od-id="stats">
        <p class="label">今天</p>
        <div class="stats">
          <div class="stat"><div class="v">3</div><div class="l">Canvas 应用</div></div>
          <div class="stat"><div class="v">75</div><div class="l">已存网页</div></div>
          <div class="stat"><div class="v">2</div><div class="l">已同步 Pack</div></div>
        </div>
      </div>
      <div class="tasks" data-od-id="tasks">
        <p class="section label" style="padding: 0;">接下来</p>
        <div class="task done"><div class="check"></div><div class="body"><div class="title">索引 design-pack 技能</div><div class="meta">25 分钟 · 已完成</div></div></div>
        <div class="task"><div class="check"></div><div class="body"><div class="title">发布同步引擎 Canvas 应用</div><div class="meta">预计 2 个会话</div></div></div>
        <div class="task"><div class="check"></div><div class="body"><div class="title">把 Agent SDK 接入 GBrain</div><div class="meta">1 个会话</div></div></div>
      </div>
      <nav class="tabbar" data-od-id="tabbar">
        <div class="tab active"><div class="icon">🧠</div>GBrain</div>
        <div class="tab"><div class="icon">🎨</div>Canvas</div>
        <div class="tab"><div class="icon">📦</div>Packs</div>
        <div class="tab"><div class="icon">⚙</div>设置</div>
      </nav>
    </div>
  </div>
</body>
</html>
```

## 用法

填写以下槽位,保持布局不变:
- Status bar:保留 `9:41`、信号与电量,作为 iOS 标准示例值。
- Header:`greeting`(日期或上下文行)加上一句简短有力的 `h1`,描述当前状态。
- 主卡片(`.timer-card`):屏幕的核心 archetype —— 替换 `label`、大号 `countdown` 数值、`progress` 填充宽度,以及两个操作按钮(一个普通,一个 `.primary`)。
- 数据网格(`.stats`):三个小指标,每个由数值(`.v`)和标签(`.l`)组成。
- 列表(`.tasks`):每行含 `.title` 与 `.meta`;给某行加 `done` 类即显示勾选并加删除线。
- Tab bar(`.tabbar`):4 个 tab,只有一个带 `active`;每个由 emoji `icon` 加一个简短标签组成。
