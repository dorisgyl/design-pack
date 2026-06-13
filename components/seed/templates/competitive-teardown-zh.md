---
slug: packs/design-pack/templates/competitive-teardown-zh
type: template
lang: zh
category: doc
title: "竞品拆解"
title_en: "Competitive Teardown (NevoFlux War Room)"
description: "把零散的竞品资料转成可决策的产品战略报告:定位图 + 功能矩阵 + 价格对比 + 机会窗口。"
tags: [competitive, teardown, strategy, product, 竞品, 拆解, 模板]
sample_image: packs/design-pack/assets/templates/competitive-teardown.svg
source: html-anything/competitive-teardown
---

## 设计指导

这不是文章、不是 PRD、也不是 pitch deck。目标是把多个竞品的杂乱资料转成一份可决策的产品战略报告,帮团队回答:"我们和它们到底差在哪里,下一步该怎么打?"

适合的输入:竞品官网、定价页、changelog、用户评论、销售反馈、内部调研笔记。2–6 个竞品最合适;如果只给一个竞品,就输出单竞品 deep dive。可以包含表格、bullet、链接摘录、访谈记录、截图说明。

必须输出的结构:
1. Header:市场 / 产品类别 / 报告日期 / 结论一句话。
2. Executive takeaway:3 条最重要判断,每条必须包含 "so what"。
3. Positioning map:用 2×2 象限或坐标图表现竞品定位。坐标轴必须来自用户内容,不要套模板词。
4. Competitor cards:每个竞品一张卡,包含 target user、core promise、pricing signal、primary strength、visible weakness。
5. Feature matrix:行是关键能力,列是竞品 +「Us / Opportunity」;用 ✓ / △ / — 表达覆盖度,并用短注释说明。
6. Pricing / packaging read:价格层级、免费试用、限制项、企业销售动作。
7. UX / messaging notes:从用户材料中抽取 4–6 条可观察细节,不要泛泛而谈。
8. Opportunity windows:3 个机会窗口,每个包含 why now、target segment、first move、risk。
9. Recommended moves:近期 30 天 / 90 天 / 180 天行动建议。

设计要求:
- 战略咨询 + 产品战情室风格:信息密度高、扫描快、图表清楚。
- 使用克制的配色:ink / paper / muted blue / signal amber 或类似专业色。
- Feature matrix 必须横向可读;小屏可变成 stacked cards。
- 不要做成营销落地页,不要做成普通文章。

内容真实性:
- 只使用用户提供的竞品、价格、功能、评论。缺失信息用 "not found in source" 或 "unknown" 标注。
- 不要发明市场份额、ARR、客户名、定价数字。
- 如果用户资料明显不足,仍然输出报告,但在 "Evidence gaps" 中列出缺口。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>竞品拆解 · AI 浏览器工作台</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#162033;--muted:#667085;--paper:#f7f4ec;--line:#ded7ca;--blue:#1d4ed8;--amber:#c47b25;--green:#28715f}
    *{box-sizing:border-box} body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,"Noto Sans SC",system-ui,sans-serif}
    .page{max-width:1180px;margin:0 auto;padding:42px 28px 56px}.hair{border:1px solid var(--line);background:rgba(255,255,255,.54)}
    .pill{border:1px solid var(--line);border-radius:999px;padding:6px 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
    .grid-bg{background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:32px 32px}
    .matrix th,.matrix td{border-bottom:1px solid var(--line);padding:14px;text-align:left;vertical-align:top}.matrix th{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}.matrix td{font-size:13px}
  </style>
</head>
<body>
  <main class="page">
    <section class="hair grid-bg rounded-[6px] p-7">
      <div class="flex flex-wrap items-center gap-2 mb-8">
        <span class="pill">竞品拆解</span><span class="pill">AI 浏览器工作台</span><span class="pill">2026-05-28</span>
      </div>
      <div class="grid md:grid-cols-[1.25fr_.75fr] gap-8 items-end">
        <div>
          <p class="text-sm font-bold text-[var(--blue)] mb-3">NevoFlux 不该卷通用 AI 浏览器,而要拥有会沉淀成应用的知识库。</p>
          <h1 class="text-5xl md:text-7xl font-extrabold leading-[.92] tracking-tight">比的是沉淀,不是浏览。</h1>
        </div>
        <div class="hair rounded-[6px] p-5 bg-[#fffaf0]">
          <div class="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-3">核心判断</div>
          <ol class="space-y-3 text-sm leading-6">
            <li><b>1.</b> Arc 占住顺滑的标签与空间管理;Dia 与 Perplexity 占住"总结即答"式浏览。</li>
            <li><b>2.</b> NevoFlux 的切入点是 GBrain:每读一个网页都会沉淀成可复用的知识库与 Canvas 应用。</li>
            <li><b>3.</b> 未来 90 天要跑通"阅读 → GBrain → Canvas 应用"闭环,而不是去追每一个浏览场景。</li>
          </ol>
        </div>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <article class="hair rounded-[6px] p-5 bg-white/70"><div class="text-xs text-[var(--muted)] mb-2">Arc</div><h2 class="text-2xl font-extrabold">有主张的浏览器</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">擅长用空间、配置与标签管理,让浏览器感觉私人而安静。</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><div class="text-xs text-[var(--muted)] mb-2">Dia</div><h2 class="text-2xl font-extrabold">对话原生浏览器</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">侧边栏智能体,能对当前页和打开的标签做总结、起草与操作。</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><div class="text-xs text-[var(--muted)] mb-2">Perplexity</div><h2 class="text-2xl font-extrabold">答案引擎</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">带引用的回答与研究线程很强;最擅长一次性的问答。</p></article>
    </section>

    <section class="grid lg:grid-cols-[.9fr_1.1fr] gap-5 mt-5">
      <div class="hair rounded-[6px] p-6 bg-[#fbfaf6]">
        <div class="flex justify-between text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-4"><span>定位图</span><span>源自调研笔记</span></div>
        <div class="relative h-[360px] border border-[var(--line)] bg-white">
          <div class="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-[var(--line)]"></div>
          <div class="absolute top-1/2 left-0 right-0 border-t border-dashed border-[var(--line)]"></div>
          <div class="absolute left-3 top-3 text-xs text-[var(--muted)]">沉淀长期知识</div>
          <div class="absolute right-3 bottom-3 text-xs text-[var(--muted)]">一次性浏览</div>
          <div class="absolute left-[18%] bottom-[26%] rounded-full bg-[#e8eefc] px-3 py-2 text-sm font-bold text-[var(--blue)]">Arc</div>
          <div class="absolute right-[13%] top-[42%] rounded-full bg-[#fff1dc] px-3 py-2 text-sm font-bold text-[var(--amber)]">Dia</div>
          <div class="absolute right-[22%] bottom-[24%] rounded-full bg-[#ecfdf5] px-3 py-2 text-sm font-bold text-[var(--green)]">Perplexity</div>
          <div class="absolute left-[42%] top-[18%] rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-bold text-white shadow-lg">NevoFlux 切入点</div>
        </div>
      </div>
      <div class="hair rounded-[6px] bg-white/70 overflow-hidden">
        <table class="matrix w-full">
          <thead><tr><th>能力</th><th>Arc</th><th>Dia</th><th>Perplexity</th><th>NevoFlux 机会</th></tr></thead>
          <tbody>
            <tr><td><b>安静的标签与空间管理</b></td><td>✓ 强</td><td>△ 基础</td><td>— 网页应用</td><td>不正面硬刚</td></tr>
            <tr><td><b>页面总结与对话</b></td><td>△ 插件式</td><td>✓ 强</td><td>✓ 强</td><td>做到及格线,但不作为主打</td></tr>
            <tr><td><b>持久化 GBrain 知识库</b></td><td>未发现</td><td>△ 会话记忆</td><td>△ 线程</td><td><b>核心切入点</b></td></tr>
            <tr><td><b>把知识变成 Canvas 应用</b></td><td>未发现</td><td>未发现</td><td>未发现</td><td><b>核心切入点</b></td></tr>
            <tr><td><b>智能体 / SDK 与 packs</b></td><td>未发现</td><td>△ 内置智能体</td><td>△ API</td><td>开放 pack 与设计技能生态</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-4 mt-5">
      <article class="hair rounded-[6px] p-5 bg-white/70"><span class="pill">30 天</span><h3 class="mt-4 text-xl font-extrabold">围绕 GBrain 打包</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">把核心对象重命名为采集、来源、笔记、知识簇,让它们随浏览不断生长。</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><span class="pill">90 天</span><h3 class="mt-4 text-xl font-extrabold">交付 Canvas 应用</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">让 GBrain 知识生成 Canvas 应用与看板,并可导出到智能体 SDK 和 packs。</p></article>
      <article class="hair rounded-[6px] p-5 bg-white/70"><span class="pill">180 天</span><h3 class="mt-4 text-xl font-extrabold">开放 pack 生态</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">只在能加深"阅读到应用"闭环的地方接入设计技能和可分享的 packs,而非盲目对齐。</p></article>
    </section>
  </main>
</body>
</html>
```

## 用法

- Header 药丸:报告类型、市场 / 类别、报告日期。
- Hero:蓝色一句话结论 + 大标题点明切入点;右侧方框「核心判断」放 3 条带 "so what" 的判断。
- 竞品卡:每个竞品一张卡(标签、短标题、一句话定位)。增删卡片直接改三列栅格即可。
- 定位图:修改两个坐标轴标签和绝对定位的竞品药丸;深色药丸标注 NevoFlux 的切入点。
- 功能矩阵:行是能力,列是竞品 + NevoFlux 机会列。用 ✓ / △ / — 表达覆盖度,缺口标为「未发现」或「unknown」。
- 行动卡:30 / 90 / 180 天计划;每张保持一个标题加一句话首步动作。
