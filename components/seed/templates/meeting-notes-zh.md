---
slug: packs/design-pack/templates/meeting-notes-zh
type: template
lang: zh
category: doc
title: "会议纪要"
title_en: "Meeting Notes"
description: "长页面会议纪要:标题、出席、议程、决议、待办事项与下次会议。"
tags: [minutes, meeting, "1:1", 纪要, 模板]
sample_image: packs/design-pack/assets/templates/meeting-notes.svg
source: html-anything/meeting-notes
---

## 设计指导

一份现代会议纪要文档,强调待办事项(action items)。整体呈现为信纸宽度、可向下滚动的长页面。

自上而下的布局:

- **标题栏(Title bar)** —— 会议名,加上日期/时间/地点/记录人的元信息行,以及一排出席者头像(缺席者另附"请假"说明)。
- **议程清单(Agenda checklist)** —— 每一项为一行,含复选框(完成时填充)、标题、一行说明文字与时间段。
- **决议区块(Decisions block)** —— 一张柔和的圆角卡片,带彩色左边框,如实记录达成的共识。
- **待办事项表(Action items table)** —— 列为 事项 / 负责人(头像 + 姓名) / 截止 / 状态,并配彩色状态药丸(待办 / 进行中 / 受阻 / 完成)。
- **遗留问题 + 下次会议** —— 双栏网格,内含带边框的面板。
- **页脚(Footer)** —— 一条等宽字体条带,标注文档版本与归档位置。

设计细节:衬线标题搭配无衬线正文,标签与时间戳采用柔和的等宽字体,留白充足,单一强调色用于决议与"进行中"状态。头像为以首字母生成的渐变圆形。在窄屏下,双栏网格会折叠为单栏。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux 核心组周会 · 10月14日纪要</title>
<style>
  :root {
    --bg: #fafaf8;
    --paper: #ffffff;
    --ink: #1a1d24;
    --muted: #5d6371;
    --line: #e8e9ed;
    --accent: #2c5fae;
    --accent-soft: #e8efff;
    --positive: #2c8a4f;
    --warn: #b58522;
    --danger: #b13b3b;
    --display: 'Charter', Georgia, serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 14.5px; line-height: 1.6; }
  .page { max-width: 920px; margin: 24px auto; padding: 48px 56px 64px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }

  header.head { border-bottom: 1px solid var(--line); padding-bottom: 22px; margin-bottom: 28px; }
  .crumb { font-family: var(--mono); font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  h1 { font-family: var(--display); font-size: 32px; margin: 6px 0 14px; letter-spacing: -0.005em; font-weight: 700; }
  .meta-row { display: flex; gap: 28px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
  .meta-row strong { color: var(--ink); display: block; font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; font-weight: 500; }

  .attendees { display: flex; align-items: center; gap: 14px; margin-top: 18px; padding: 14px 16px; background: var(--bg); border-radius: 8px; }
  .attendees-label { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
  .av-row { display: flex; }
  .av { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--paper); margin-left: -8px; font-size: 11px; font-weight: 700; color: white; display: inline-flex; align-items: center; justify-content: center; }
  .av:first-child { margin-left: 0; }
  .a-dp { background: linear-gradient(135deg, #2c5fae, #6e9bf0); }
  .a-mr { background: linear-gradient(135deg, #d6336c, #ff7a9b); }
  .a-pb { background: linear-gradient(135deg, #b58522, #f1b13a); }
  .a-ca { background: linear-gradient(135deg, #1a8e8e, #56c1c1); }
  .a-sl { background: linear-gradient(135deg, #5b3df0, #a991ff); }
  .away { color: var(--muted); font-size: 12.5px; }

  section { margin-top: 36px; }
  h2 { font-family: var(--display); font-size: 21px; margin: 0 0 14px; letter-spacing: -0.005em; }

  /* Agenda */
  .agenda { display: flex; flex-direction: column; gap: 8px; }
  .agenda-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; border-radius: 6px; background: var(--bg); }
  .agenda-item .check { flex: 0 0 18px; width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid var(--ink); display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: transparent; margin-top: 2px; }
  .agenda-item.done .check { background: var(--positive); border-color: var(--positive); color: white; }
  .agenda-item .body { flex: 1; }
  .agenda-item .body strong { font-weight: 600; }
  .agenda-item .body small { color: var(--muted); display: block; margin-top: 2px; font-size: 12.5px; }
  .agenda-item .time { font-family: var(--mono); font-size: 11px; color: var(--muted); padding-top: 3px; }

  /* Decisions */
  .decisions { padding: 22px 24px; background: var(--accent-soft); border-left: 3px solid var(--accent); border-radius: 6px; }
  .decisions h3 { font-family: var(--display); font-size: 15px; margin: 0 0 12px; color: var(--accent); }
  .decisions ul { padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
  .decisions li::marker { color: var(--accent); }

  /* Action items */
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); font-size: 13.5px; }
  th { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); font-weight: 500; }
  tr:last-child td { border-bottom: none; }
  td.owner { display: flex; align-items: center; gap: 8px; }
  .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; font-family: var(--mono); font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
  .pill-todo { background: var(--bg); color: var(--muted); border: 1px solid var(--line); }
  .pill-progress { background: rgba(44,95,174,0.12); color: var(--accent); }
  .pill-blocked { background: rgba(177,59,59,0.12); color: var(--danger); }
  .pill-done { background: rgba(44,138,79,0.12); color: var(--positive); }

  /* Open + next */
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .panel { padding: 20px 22px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; }
  .panel h3 { font-family: var(--display); font-size: 16px; margin: 0 0 8px; }
  .panel p { color: var(--muted); margin: 0; font-size: 13.5px; line-height: 1.55; }
  .next-meeting { display: flex; flex-direction: column; gap: 4px; font-size: 13.5px; margin-top: 10px; }
  .next-meeting strong { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); display: block; font-weight: 500; }

  footer { margin-top: 40px; padding-top: 18px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11.5px; color: var(--muted); }

  @media (max-width: 700px) {
    .page { padding: 28px 24px; margin: 0; border-radius: 0; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<div class="page">
  <header class="head">
    <div class="crumb">NevoFlux / 核心组 / 周会</div>
    <h1>NevoFlux 核心组周会 · W42</h1>
    <div class="meta-row">
      <span><strong>日期</strong>2025年10月14日 星期二</span>
      <span><strong>时间</strong>10:00 – 11:00 PT</span>
      <span><strong>地点</strong>NevoFlux Canvas 会议室 · core-weekly</span>
      <span><strong>记录</strong>朴德文</span>
    </div>
    <div class="attendees">
      <span class="attendees-label">出席</span>
      <div class="av-row">
        <span class="av a-dp" title="朴德文">DP</span>
        <span class="av a-mr" title="米拉·雷迪">MR</span>
        <span class="av a-pb" title="普里娅·班纳吉">PB</span>
        <span class="av a-ca" title="迦勒·雷纳">CA</span>
        <span class="av a-sl" title="林莎莎">SL</span>
      </div>
      <span class="away">请假 —— 阿尔瓦罗·M.(年假)</span>
    </div>
  </header>

  <section>
    <h2>议程</h2>
    <div class="agenda">
      <div class="agenda-item done">
        <div class="check">✓</div>
        <div class="body"><strong>Sprint 38 冲刺中检查</strong><small>逐列过看板,重置卡住的任务。</small></div>
        <div class="time">10:00 · 15m</div>
      </div>
      <div class="agenda-item done">
        <div class="check">✓</div>
        <div class="body"><strong>GBrain 入库工作流 —— M2 风险</strong><small>嵌入流水线文案评审是当前阻塞依赖。</small></div>
        <div class="time">10:15 · 10m</div>
      </div>
      <div class="agenda-item done">
        <div class="check">✓</div>
        <div class="body"><strong>Canvas 激活指标回顾</strong><small>首个应用率环比提升 9 个百分点;复盘空白画布优化。</small></div>
        <div class="time">10:25 · 10m</div>
      </div>
      <div class="agenda-item done">
        <div class="check">✓</div>
        <div class="body"><strong>Pioneer 智能体 SDK 评审准备</strong><small>为周四的会议拉合作伙伴入会。</small></div>
        <div class="time">10:35 · 10m</div>
      </div>
      <div class="agenda-item done">
        <div class="check">✓</div>
        <div class="body"><strong>Q4 路线图先睹为快</strong><small>德文分享拟定形态;我们投票选出前三大主题。</small></div>
        <div class="time">10:45 · 12m</div>
      </div>
      <div class="agenda-item">
        <div class="check"></div>
        <div class="body"><strong>自由讨论 —— 其他事项</strong><small>转为异步处理 —— 见 #core-squad。</small></div>
        <div class="time">10:57 · 3m</div>
      </div>
    </div>
  </section>

  <section>
    <h2>决议</h2>
    <div class="decisions">
      <h3>已正式达成的共识</h3>
      <ul>
        <li><strong>M2(GBrain 重建索引步骤)</strong> 仍定于 11月18日,除非流水线评审拖过周三下班前;由德文负责升级处理。</li>
        <li><strong>空白画布实验</strong> 再观察 24 小时后,于周四全量上线至 100%;无需追加对照组。</li>
        <li><strong>Q4 主题</strong>:(1)企业级浏览器(SSO + 审计),(2)Canvas 上手 2.0,(3)设计技能的 Pack 市场。由莎莎撰写单页说明。</li>
        <li><strong>周会形式</strong>:从下周起,演示改为周五异步视频;周二只做决议 + 看板。</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>待办事项</h2>
    <table>
      <thead><tr><th>事项</th><th>负责人</th><th>截止</th><th>状态</th></tr></thead>
      <tbody>
        <tr>
          <td>将嵌入流水线评审升级给莎莎 + GBrain 负责人</td>
          <td class="owner"><span class="av a-dp">DP</span>德文</td>
          <td>10月15日 周三</td>
          <td><span class="pill pill-progress">进行中</span></td>
        </tr>
        <tr>
          <td>将空白画布全量上线至 100%(含监控窗口)</td>
          <td class="owner"><span class="av a-mr">MR</span>米拉</td>
          <td>10月16日 周四</td>
          <td><span class="pill pill-todo">待办</span></td>
        </tr>
        <tr>
          <td>与合作伙伴团队协同准备 Pioneer 智能体 SDK 会议</td>
          <td class="owner"><span class="av a-pb">PB</span>普里娅</td>
          <td>10月16日 周四</td>
          <td><span class="pill pill-todo">待办</span></td>
        </tr>
        <tr>
          <td>撰写 Q4 三大主题单页说明(3 份)</td>
          <td class="owner"><span class="av a-sl">SL</span>莎莎</td>
          <td>10月20日 周一</td>
          <td><span class="pill pill-todo">待办</span></td>
        </tr>
        <tr>
          <td>Pack 构建积压看板</td>
          <td class="owner"><span class="av a-ca">CA</span>迦勒</td>
          <td>10月21日 周二</td>
          <td><span class="pill pill-blocked">受阻 · 等待指标 ACL</span></td>
        </tr>
        <tr>
          <td>将周会形式切换为演示放周五</td>
          <td class="owner"><span class="av a-dp">DP</span>德文</td>
          <td>10月20日 周一</td>
          <td><span class="pill pill-done">完成</span></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>遗留问题与下次会议</h2>
    <div class="grid">
      <div class="panel">
        <h3>遗留问题</h3>
        <p>Q4 的 Pack 市场启动会是否邀请客户参加(Pioneer 会赞成),还是首场会议保持内部?</p>
        <p style="margin-top: 8px;">周五的演示视频是否限制在 5 分钟以内,还是不设上限?</p>
      </div>
      <div class="panel">
        <h3>下次会议</h3>
        <div class="next-meeting"><strong>日期</strong>2025年10月21日 星期二</div>
        <div class="next-meeting"><strong>时间</strong>10:00 – 11:00 PT · Canvas 会议室</div>
        <div class="next-meeting"><strong>预读</strong>莎莎的 Q4 单页说明(周一下班前)</div>
        <div class="next-meeting"><strong>记录</strong>米拉·雷迪(轮值)</div>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux 核心组 · 纪要 v1</span>
    <span>归档于 #core-squad · 2025年10月15日</span>
  </footer>
</div>
</body>
</html>
```

## 用法

需填写的区块 / 槽位:

- **页眉** —— 面包屑(组织 / 团队 / 周期)、会议标题,以及元信息行:日期、时间、地点、记录人。替换出席者头像(首字母 + `a-*` 渐变类)与缺席者的"请假"说明。
- **议程** —— 每个议题一个 `.agenda-item`;加上 `done` 类即可填充其复选框。每项含标题(`strong`)、一行说明(`small`)与时间段。
- **决议** —— 已达成结论的列表;每条以加粗主题词开头。
- **待办事项** —— 表格每行一个任务:事项、负责人(头像 + 姓名)、截止,以及状态药丸(`pill-todo`、`pill-progress`、`pill-blocked`、`pill-done`)。
- **遗留问题与下次会议** —— 左侧面板放未决问题,右侧面板放下次会议的 日期 / 时间 / 预读 / 记录人。
- **页脚** —— 文档版本与归档位置。
