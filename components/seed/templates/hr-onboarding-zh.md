---
slug: packs/design-pack/templates/hr-onboarding-zh
type: template
lang: zh
category: doc
title: "新员工入职页"
title_en: "NevoFlux Onboarding Plan"
description: "单页入职计划:欢迎首屏、首日日程、首周时间线、30/60/90 天里程碑、资源清单与「搞定标准」核对清单。"
tags: [onboarding, 入职, first week, 模板]
sample_image: packs/design-pack/assets/templates/hr-onboarding.svg
source: html-anything/hr-onboarding
---
## 设计指导

一张长长的单页入职计划。意图:新员工打开一次,就能立刻知道自己的第一周——乃至前 90 天——该怎么过。

布局(自上而下):
- 欢迎首屏(封面):姓名、岗位、入职日、直属经理与入职 buddy,搭配一个圆形姓名首字母头像。
- 首日日程:首日的两栏时间线(时间 + 事项)。
- 首周时间线:周一到周五五张日卡,每天两项活动。
- 30 / 60 / 90 天里程碑:三张检查点卡片,每张三条产出。
- 资源 +「你设置好了当且仅当…」:两栏面板网格——一个可收藏的资源清单,和一个带可勾选方框的完成核对清单。
- 页脚:归属团队 + 模板版本信息。

设计细节:
- 暖色纸张配色(米色背景、白色卡面、柔和的浅褐分隔线),只用一种暖橙强调色,复用于头像渐变、徽章、列表项标记与资源图标。
- 衬线标题字体用于封面大标题、章节标题、日名与里程碑标题;无衬线用于正文;等宽字体用于小标签、时间、日期与 meta 标注。
- 单一强调色的 12–16px 圆角卡片;完成的清单项翻转为绿色的「正向」状态。
- 响应式:小于 900px 时封面堆叠并居中,周网格降为两列,里程碑 / 资源网格收为单列。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>欢迎加入 NevoFlux —— Maya 的入职计划</title>
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
      <div class="eyebrow">入职计划 · 30/60/90</div>
      <h1>欢迎你,Maya。让你在 NevoFlux 的前 90 天走得从容而笃定。</h1>
      <div class="meta">
        <div><strong>岗位</strong>设计包工程师 · Canvas 小队</div>
        <div><strong>入职日</strong>2025 年 11 月 4 日 周一</div>
        <div><strong>直属经理</strong>Alvaro Méndez</div>
        <div><strong>入职 buddy</strong>Sasha Lin</div>
      </div>
    </div>
    <div class="cover-art">M</div>
  </div>

  <section>
    <h2>第 1 天 · 周一</h2>
    <p class="section-sub">踏实的一天。和团队喝杯咖啡、把 NevoFlux 浏览器在本地跑起来,并在下午 5 点前向某个设计包提交一次 commit。</p>
    <div class="day-one">
      <div class="schedule">
        <div class="schedule-row"><div class="time">09:00</div><div class="item"><strong>与 Alvaro 启动会</strong><span>欢迎、第一周走查、期望对齐。办公室 3 号会议室(或 NevoFlux 通话)。</span></div></div>
        <div class="schedule-row"><div class="time">10:00</div><div class="item"><strong>与 Devon 配置工作环境</strong><span>电脑、门禁卡、SSO、NevoFlux 浏览器、agent SDK、GitHub。请带两张有照片的证件。</span></div></div>
        <div class="schedule-row"><div class="time">11:30</div><div class="item"><strong>与 Sasha(buddy)喝咖啡</strong><span>那些没写下来的潜规则、遇事找谁的地图,以及哪家午饭好吃。</span></div></div>
        <div class="schedule-row"><div class="time">12:30</div><div class="item"><strong>团队午餐 · NevoFlux 餐厅</strong><span>整个 Canvas 小队都来。没有议程。</span></div></div>
        <div class="schedule-row"><div class="time">14:00</div><div class="item"><strong>阅读 &amp; 探索</strong><span>员工手册、上季度的设计包评审,以及 design-pack 的 GBrain。</span></div></div>
        <div class="schedule-row"><div class="time">16:00</div><div class="item"><strong>提交「我来了」PR</strong><span>把自己加进团队 Canvas 应用。算作你的第一次 commit。</span></div></div>
        <div class="schedule-row"><div class="time">17:00</div><div class="item"><strong>与 Alvaro 的当日收尾对齐</strong><span>15 分钟。哪里让人困惑,哪里不会。明天有需要就再来一次。</span></div></div>
      </div>
    </div>
  </section>

  <section>
    <h2>首周时间线</h2>
    <p class="section-sub">每天两项活动。其余都是加分项。</p>
    <div class="week">
      <div class="day">
        <div class="day-head"><div class="day-name">周一</div><div class="day-date">11月4日</div></div>
        <div class="activity"><span class="dot"></span><div><strong>启动会 + 配置环境</strong><small>Alvaro · 09:00</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>提交团队 Canvas PR</strong><small>可请 Sasha 评审</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">周二</div><div class="day-date">11月5日</div></div>
        <div class="activity"><span class="dot"></span><div><strong>设计包导览</strong><small>Yuko · 10:00</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>旁听一次 GBrain 索引</strong><small>11:00 与 Sam</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">周三</div><div class="day-date">11月6日</div></div>
        <div class="activity"><span class="dot"></span><div><strong>小队周会</strong><small>09:30</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>领一个上手任务</strong><small>从「适合新人」的任务列挑</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">周四</div><div class="day-date">11月7日</div></div>
        <div class="activity"><span class="dot"></span><div><strong>旁听设计包评审</strong><small>14:00。只听就好。</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>与隔级上级 1:1</strong><small>Avi · 16:00</small></div></div>
      </div>
      <div class="day">
        <div class="day-head"><div class="day-name">周五</div><div class="day-date">11月8日</div></div>
        <div class="activity"><span class="dot"></span><div><strong>周末复盘</strong><small>给 Alvaro 写 15 分钟小结</small></div></div>
        <div class="activity"><span class="dot"></span><div><strong>可选:全员 demo</strong><small>17:00 · 结束后小酌</small></div></div>
      </div>
    </div>
  </section>

  <section>
    <h2>30 · 60 · 90 天里程碑</h2>
    <p class="section-sub">每个检查点三条产出。我们会在对应的 1:1 上和 Alvaro 一起回顾。</p>
    <div class="milestones">
      <div class="milestone">
        <span class="badge">第 30 天</span>
        <h3>站稳脚跟</h3>
        <ul>
          <li>向某个设计包交付了一处小而完整、上线生效的改动。</li>
          <li>摸清了每个例会及其存在的理由。</li>
          <li>与每位跨职能伙伴见过面(agent、SDK、GBrain、增长)。</li>
        </ul>
      </div>
      <div class="milestone">
        <span class="badge">第 60 天</span>
        <h3>独当一面</h3>
        <ul>
          <li>主导新版 Canvas 入职流程的设计——你来掌管 spec。</li>
          <li>作为主讲人主持了你的第一次设计包评审。</li>
          <li>起草了一项流程改进,并在团队里发出来。</li>
        </ul>
      </div>
      <div class="milestone">
        <span class="badge">第 90 天</span>
        <h3>推动团队向前</h3>
        <ul>
          <li>交付了一个由你从想法 → 发布包全程主导的设计技能。</li>
          <li>带过一个人——哪怕只是非正式地。</li>
          <li>在全员会上抛出过一个犀利观点,还活着回来讲。</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2>值得收藏的东西</h2>
    <p class="section-sub">打开这些,在 NevoFlux 浏览器里收藏好,然后就可以忘掉这一页了。</p>
    <div class="grid-2">
      <div class="panel">
        <h3>资源</h3>
        <div class="resource"><div class="icon">📘</div><div><strong>NevoFlux 员工手册</strong></div><div class="meta">handbook.nf</div></div>
        <div class="resource"><div class="icon">💬</div><div><strong>#canvas-squad</strong></div><div class="meta">聊天</div></div>
        <div class="resource"><div class="icon">🎨</div><div><strong>设计包 v3.4</strong></div><div class="meta">GBrain</div></div>
        <div class="resource"><div class="icon">📊</div><div><strong>增长看板</strong></div><div class="meta">metrics.nf</div></div>
        <div class="resource"><div class="icon">💸</div><div><strong>薪酬与福利</strong></div><div class="meta">Rippling</div></div>
        <div class="resource"><div class="icon">📅</div><div><strong>入职日历</strong></div><div class="meta">cal.nf/onboard</div></div>
      </div>
      <div class="panel">
        <h3>你设置好了当且仅当…</h3>
        <div class="check done"><div class="box">✓</div><div><strong>电脑、SSO、门禁卡端到端都能用。</strong><span>包括 NevoFlux 浏览器、agent SDK、GitHub、1Password。</span></div></div>
        <div class="check done"><div class="box">✓</div><div><strong>你已经见过小队里的每一个人。</strong><span>咖啡、散步,还是 15 分钟通话——你定。</span></div></div>
        <div class="check"><div class="box"></div><div><strong>你已经提交了第一个 PR。</strong><span>再小也算数。Sasha 会帮你。</span></div></div>
        <div class="check"><div class="box"></div><div><strong>你能在日历上找到任何会议。</strong><span>并且知道哪些可以推掉。</span></div></div>
        <div class="check"><div class="box"></div><div><strong>你能放心地问「傻」问题。</strong><span>这是最重要的一条。我们认真的。</span></div></div>
      </div>
    </div>
  </section>

  <footer>
    <span>NevoFlux People Ops · 入职计划模板 v3.1</span>
    <span>更新于 2025 年 10 月</span>
  </footer>
</div>
</body>
</html>
```

## 用法

- `cover` —— 欢迎首屏:`eyebrow` 小标签、`h1` 问候语、一行 `meta`(岗位 / 入职日 / 直属经理 / buddy),以及 `cover-art` 姓名首字母头像(替换那个字母)。
- `day-one` / `schedule` —— 首日时间线;每个 `schedule-row` 由 `time` + `item`(加粗标题 + 灰字细节)组成,可自由增删行。
- `week` —— 五张 `day` 日卡(周一到周五);每张含 `day-head`(日名 + 日期)和两条 `activity`(圆点 + 加粗标题 + `small` 备注)。
- `milestones` —— 三张 `milestone` 卡;每张含一个 `badge`(第 30/60/90 天)、一个 `h3` 主题,以及一个含三条产出的 `ul`。
- `grid-2` —— 两个面板:一个「资源」列表(`resource` = 图标 + 名称 + 等宽 `meta` 标签),和一个「你设置好了当且仅当…」核对清单(`check`,已完成项加 `check done` 显示 ✓ 方框)。
- `footer` —— 左侧归属团队,右侧模板版本 / 更新日期。
- 所有视觉元素纯 CSS 实现(渐变头像、彩色方框),无任何外链或图片。
