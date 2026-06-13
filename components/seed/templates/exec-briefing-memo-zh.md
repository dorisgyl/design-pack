---
slug: packs/design-pack/templates/exec-briefing-memo-zh
type: template
lang: zh
category: doc
title: "高管决策简报"
title_en: "Executive Briefing Memo (NevoFlux Decision One-Pager)"
description: "把零散的产品、销售、财务信号压成一页可拍板的决策 memo:决策 + 推荐 + 证据 + 权衡。"
tags: [executive, briefing, memo, decision, strategy, 简报, 决策, 模板]
sample_image: packs/design-pack/assets/templates/exec-briefing-memo.svg
source: html-anything/exec-briefing-memo
---

## 设计指导

这不是会议纪要、不是周报、不是 PRD。它的唯一目标是帮助决策者在 3 分钟内理解问题并拍板。

适合的输入:长会议记录、调研材料、战略讨论、销售反馈、产品数据、投资备忘。用户可能给很多碎片信息;你要提炼成一个明确的 decision frame。

必须输出的结构:
1. Memo header:主题、owner、audience、date、decision deadline。
2. Decision needed:用一句话写清楚需要拍板的问题。
3. Recommendation:明确建议,不要写"可以考虑"。必须包含 confidence level。
4. Why now:为什么现在需要决定,不决定的代价是什么。
5. Key facts:5–7 个事实证据,每条标注来源类型(sales / product / finance / customer / ops)。
6. Tradeoff table:Option A / Option B / Option C,对比 upside、cost、risk、reversibility。
7. Risks & mitigations:3–5 个风险,每个给缓解动作。
8. Decision path:approve / reject / ask for more evidence 三种路径各自的下一步。
9. Next actions:owner、due date、expected artifact。

设计要求:
- 像顶级咨询公司的 one-page decision memo:克制、清楚、密度高。
- 首屏必须直接呈现 decision + recommendation,不要先铺陈背景。
- 使用强层级:大号结论、紧凑证据卡、对比表、状态 pill。
- 不要做成长文章;不要做成 deck;不要写空泛的商业黑话。

可选风格(选一种,不要混用):
- 默认:浅色高管 memo,适合 CEO/CFO/CRO、运营、产品决策。
- 深色 command center:适合紧急决策、风险处置、incident、go/no-go、launch gate。
- 正式 board paper:适合董事会、投资人、合规、预算审批。
如果用户没有指定风格,优先使用默认浅色 memo;如果材料强调紧急、风险、行动指挥,使用深色 command center;如果材料面向董事会或正式审批,使用 board paper。

内容真实性:
- 不要捏造数字、客户、预算、日期。
- 如果缺少关键信息,在"Evidence gaps"中列出,但仍给出基于现有证据的 provisional recommendation。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>高管决策简报 · GBrain 企业版</title>
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
        <div class="flex flex-wrap gap-2"><span class="pill bg-[#eef2ff] text-[var(--blue)]">高管简报</span><span class="pill bg-white border border-[var(--line)]">负责人:陈玛雅</span><span class="pill bg-white border border-[var(--line)]">截止:2026-06-14</span></div>
        <div class="label">受众:CEO / 产品负责人 / CFO</div>
      </div>
      <div class="grid lg:grid-cols-[1.15fr_.85fr] gap-8">
        <div>
          <div class="label mb-2">待决策问题</div>
          <h1 class="text-5xl md:text-6xl font-extrabold leading-[.95] tracking-tight">NevoFlux 是否在 Q3 推出 GBrain 企业版?</h1>
        </div>
        <div class="box p-5 bg-[#f0f8f4]">
          <div class="label mb-3 text-[var(--green)]">推荐动作</div>
          <h2 class="text-2xl font-extrabold">批准一个小范围的 GBrain 企业版预览。</h2>
          <p class="mt-3 text-sm leading-6 text-[var(--muted)]">先做 SSO、工作区审计日志、年度开票,以及安全问卷流程。暂缓自定义知识保留策略和完整的企业级 Agent 编排。</p>
          <div class="mt-5 flex gap-2"><span class="pill bg-white text-[var(--green)] border border-[#badbcc]">信心:中高</span><span class="pill bg-white text-[var(--ink)] border border-[var(--line)]">可逆</span></div>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-4 gap-4 mt-5">
      <div class="box p-5"><div class="label">企业需求</div><div class="mt-2 text-4xl font-extrabold">18</div><p class="text-sm text-[var(--muted)] mt-2">45 天内 GBrain 主动咨询</p></div>
      <div class="box p-5"><div class="label">大型工作区</div><div class="mt-2 text-4xl font-extrabold">7</div><p class="text-sm text-[var(--muted)] mt-2">500 席位以上团队</p></div>
      <div class="box p-5"><div class="label">潜在 ACV</div><div class="mt-2 text-4xl font-extrabold">$18k-35k</div><p class="text-sm text-[var(--muted)] mt-2">销售估算,尚未验证</p></div>
      <div class="box p-5"><div class="label">路线图成本</div><div class="mt-2 text-4xl font-extrabold">4-6 周</div><p class="text-sm text-[var(--muted)] mt-2">对 Canvas 应用 SDK 的延期风险</p></div>
    </section>

    <section class="grid lg:grid-cols-[1.1fr_.9fr] gap-5 mt-5">
      <div class="box overflow-hidden">
        <div class="p-5 border-b border-[var(--line)]"><div class="label">权衡对比表</div></div>
        <table>
          <thead><tr><th>方案</th><th>收益</th><th>成本</th><th>风险</th><th>可逆性</th></tr></thead>
          <tbody>
            <tr><td><b>2026 不做企业版</b></td><td>保住浏览器 + Agent 聚焦</td><td>18 条需求无人回应</td><td>错过市场信号</td><td>中</td></tr>
            <tr><td><b>GBrain 企业版预览</b></td><td>验证付费意愿</td><td>SSO + 审计日志 5 周</td><td>packs 团队支持压力</td><td>高</td></tr>
            <tr><td><b>完整企业版方案</b></td><td>更强的企业故事</td><td>保留策略、SCIM、SLA、CSM</td><td>动作过早</td><td>低</td></tr>
          </tbody>
        </table>
      </div>
      <div class="box p-5">
        <div class="label mb-4">风险与缓解</div>
        <div class="space-y-4 text-sm leading-6">
          <p><b>企业版分散注意力:</b>把范围限定在 SSO、审计日志、年度开票和安全问卷。</p>
          <p><b>定价不确定:</b>先以预览形式卖给前 3 家年度意向客户,再扩大范围。</p>
          <p><b>支持就绪度:</b>指定一名安全问卷负责人,并建立标准回复库。</p>
          <p><b>路线图延期:</b>在拿到 ACV 证据前,明确暂缓自定义知识保留策略。</p>
        </div>
      </div>
    </section>

    <section class="box p-6 mt-5">
      <div class="label mb-4">决策路径</div>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="border-l-4 border-[var(--green)] pl-4"><h3 class="font-extrabold">批准</h3><p class="text-sm text-[var(--muted)] mt-2">本周启动 GBrain 企业版预览的 spec;销售锁定 3 个设计伙伴工作区。</p></div>
        <div class="border-l-4 border-[var(--red)] pl-4"><h3 class="font-extrabold">拒绝</h3><p class="text-sm text-[var(--muted)] mt-2">保持自助式路线图;记录企业需求但不做定制承诺。</p></div>
        <div class="border-l-4 border-[var(--blue)] pl-4"><h3 class="font-extrabold">需要更多证据</h3><p class="text-sm text-[var(--muted)] mt-2">在 6 月 14 日前完成 10 个潜在客户访谈,验证年度合同意愿。</p></div>
      </div>
    </section>
  </main>
</body>
</html>
```

## 用法

从上到下逐个填充槽位,首屏要把整个决策讲完:
- 头部 pill:负责人、决策截止日、受众。每项保持一行。
- 待决策问题:一句话,写成 yes/no 或"选哪个方案"的问句。
- 推荐卡(绿色):真正的结论,加一个信心 pill 和一个可逆性 pill。
- 指标条(4 张卡):支撑结论的关键数字。任何估算都要标注"未验证"。
- 权衡对比表:每个方案一行;收益 / 成本 / 风险 / 可逆性 四列固定不变。
- 风险与缓解:每条风险都要配一个具体的缓解动作。
- 决策路径:批准 / 拒绝 / 需要证据各自的下一步,按绿 / 红 / 蓝配色。
如果缺少关键数字,保留卡片但标为估算或"未知",并仍给出基于现有证据的临时推荐。
