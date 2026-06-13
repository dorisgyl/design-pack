---
slug: packs/design-pack/templates/resume-modern-zh
type: template
lang: zh
category: resume
title: "极简简历"
title_en: "NevoFlux Modern Resume"
description: "为打印或导出 PDF 设计的极简单页 A4 简历，采用两栏布局并高亮关键数据。"
tags: [resume, cv, 简历, template, 模板]
sample_image: packs/design-pack/assets/templates/resume-modern.svg
source: html-anything/resume-modern
---
## 设计指导

一份干净、极简的单页简历，按 A4 尺寸排版，既能在屏幕上清晰阅读，也能干净地导出为 PDF 或纸质文件。

布局：
- 容器模拟 A4 页面：`w-[210mm] min-h-[297mm] mx-auto`，内边距约 16-20mm。
- 顶部放置巨大的姓名（`text-4xl`），下方一行联系方式（邮箱 / 电话 / 城市 / GitHub / LinkedIn），中间用细竖线分隔。
- 主体可选两栏：左栏（约 60%）放主线（经历 / 项目 / 教育），右栏（约 40%）放副线（技能 / 语言 / 获奖）。
- 章节标题采用 small caps 风格，上方带一条短 accent 线（`w-8 h-0.5`）。
- 每条经历展示公司 + 职位 + 时间区间（右对齐），下方跟 1-3 条以动词开头的 bullet。

设计细节：
- 不使用花哨颜色：黑 / 白 / 灰，外加单一 accent（深蓝或墨绿）。
- 数字成就用 accent 色加粗，让成果一眼可见。
- 包含 `@media print` 样式，隐藏不必要的修饰（页面阴影、纸张背景），同时打印时保留颜色。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>沧澜 · 简历</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { background:#e9e6df; font-family:'Inter','Noto Sans SC',sans-serif; color:#1a1a1a; padding:32px 0; -webkit-font-smoothing:antialiased; }
  .page { width:210mm; min-height:297mm; margin:0 auto; background:#fff; padding:18mm 16mm; box-shadow:0 30px 60px -20px rgba(0,0,0,0.18); }
  .accent { color:#1f4d8f; }
  .accent-bar { display:inline-block; width:24px; height:2px; background:#1f4d8f; vertical-align:middle; margin-right:10px; }
  .section h2 { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#1f4d8f; margin:0 0 14px; }
  .role { display:flex; justify-content:space-between; align-items:baseline; gap:12px; }
  .role .meta { font-size:11px; color:#6b6760; font-family:'Inter',sans-serif; white-space:nowrap; tabular-nums:auto; }
  ul.bullets { list-style:none; padding:0; margin:8px 0 16px; }
  ul.bullets li { position:relative; padding-left:14px; font-size:13px; line-height:1.65; color:#262421; margin-bottom:4px; }
  ul.bullets li::before { content:""; position:absolute; left:0; top:9px; width:5px; height:5px; background:#1f4d8f; border-radius:1px; }
  @media print { body { background:#fff; padding:0; } .page { box-shadow:none; } }
</style>
</head>
<body>
<div class="page">
  <header class="pb-7 mb-7" style="border-bottom:1px solid #e7e5e0">
    <h1 class="text-[42px] font-bold tracking-tight leading-none mb-3">沧澜</h1>
    <div class="text-[12.5px] text-[#1f4d8f] font-medium tracking-wide mb-3">高级 Agent 体验工程师 · NevoFlux 浏览器</div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-[#5a564e]">
      <span>📍 上海·徐汇</span><span class="opacity-30">|</span>
      <span>✉ canglan@nevoflux.com</span><span class="opacity-30">|</span>
      <span>github.com/canglan</span><span class="opacity-30">|</span>
      <span>linkedin.com/in/canglan</span>
    </div>
  </header>

  <section class="section mb-6">
    <h2><span class="accent-bar"></span>个人简介</h2>
    <p class="text-[13.5px] leading-[1.75] text-[#262421]">8 年 Agent 驱动产品打造经验；主导一款月活 5000 万+ 应用的设计系统重建，现专注于交付 NevoFlux 浏览器、其 GBrain 知识库，以及把本地 Agent 变成日常工具的 Canvas 应用。</p>
  </section>

  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-8">
      <section class="section mb-7">
        <h2><span class="accent-bar"></span>工作经历</h2>

        <div class="mb-5">
          <div class="role">
            <div><span class="font-semibold text-[14.5px]">NevoFlux</span> <span class="text-[#5a564e] text-[13px]">— 高级 Agent 体验工程师</span></div>
            <div class="meta">2023 年 6 月 - 至今</div>
          </div>
          <ul class="bullets">
            <li>从 0 到 1 设计并主导 NevoFlux 浏览器的 Canvas 应用版块；6 个月内达到 <span class="font-semibold accent">12k</span> 日活，内部 NPS 高达 <span class="font-semibold accent">68</span></li>
            <li>重构 GBrain 检索流程，让 Agent 基于实时知识库作答，线上零回归 <span class="font-semibold accent">0</span> 且索引速度提升 <span class="font-semibold accent">3.2×</span></li>
            <li>交付 design-pack 模板库，被 <span class="font-semibold accent">7</span> 个内部团队采用，月安装量达 <span class="font-semibold accent">80k+</span></li>
          </ul>
        </div>

        <div class="mb-5">
          <div class="role">
            <div><span class="font-semibold text-[14.5px]">北风商贸</span> <span class="text-[#5a564e] text-[13px]">— 产品工程师</span></div>
            <div class="meta">2020 年 7 月 - 2023 年 5 月</div>
          </div>
          <ul class="bullets">
            <li>主导内部运营控制台迁移到 NevoFlux Agent SDK，将任务耗时从 <span class="font-semibold accent">18s</span> 缩短到 <span class="font-semibold accent">2.4s</span></li>
            <li>搭建低代码 Canvas 应用引擎，支撑 <span class="font-semibold accent">30+</span> 个后台工作流，节省 <span class="font-semibold accent">800+</span> 人天</li>
            <li>带领团队将类型化 SDK 覆盖率从 <span class="font-semibold accent">53% → 92%</span>，同时指导 4 人小组</li>
          </ul>
        </div>

        <div class="mb-2">
          <div class="role">
            <div><span class="font-semibold text-[14.5px]">米拉实验室</span> <span class="text-[#5a564e] text-[13px]">— 前端实习生</span></div>
            <div class="meta">2019 年 6 月 - 2019 年 9 月</div>
          </div>
          <ul class="bullets">
            <li>将两个核心商户页面迁移到早期 Canvas 应用原型上</li>
            <li>撰写内部文章《Agent UI 设计的 5 个坏味道》，被收藏 200+ 次</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <h2><span class="accent-bar"></span>开源项目</h2>
        <ul class="bullets">
          <li><span class="font-semibold">html-anything</span> <span class="text-[#5a564e]">(1.2k ★)</span> — 借助本地 NevoFlux Agent 把任意文档变成漂亮的 HTML</li>
          <li><span class="font-semibold">gbrain-lite</span> <span class="text-[#5a564e]">(450 ★)</span> — 9KB 可嵌入检索客户端，查询比参考 SDK 快 1.7×</li>
        </ul>
      </section>
    </div>

    <div class="col-span-4">
      <section class="section mb-6">
        <h2><span class="accent-bar"></span>教育背景</h2>
        <div class="text-[13.5px] font-semibold mb-1">库珀州立大学</div>
        <div class="text-[12px] text-[#5a564e]">计算机科学 · 学士</div>
        <div class="text-[11.5px] text-[#5a564e] mt-1">2016 - 2020 · GPA 3.85 / 4.00</div>
      </section>

      <section class="section mb-6">
        <h2><span class="accent-bar"></span>核心技能</h2>
        <div class="flex flex-wrap gap-1.5">
          <span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">TypeScript</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Agent SDK</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">GBrain</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Canvas 应用</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Node.js</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">检索</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">设计系统</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">性能优化</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">协作</span>
        </div>
      </section>

      <section class="section mb-6">
        <h2><span class="accent-bar"></span>语言能力</h2>
        <ul class="text-[12px] text-[#262421] space-y-1.5">
          <li class="flex justify-between"><span>中文</span><span class="text-[#5a564e]">母语</span></li>
          <li class="flex justify-between"><span>英语</span><span class="text-[#5a564e]">专业级</span></li>
          <li class="flex justify-between"><span>日语</span><span class="text-[#5a564e]">N3</span></li>
        </ul>
      </section>

      <section class="section">
        <h2><span class="accent-bar"></span>兴趣爱好</h2>
        <p class="text-[12px] text-[#262421] leading-[1.7]">长跑（半马 1:42）· 摄影 · 街角咖啡馆侦探</p>
      </section>
    </div>
  </div>
</div>
</body>
</html>
```

## 用法

- `header` — 巨大的姓名、一行 accent 色的职位 / 标语，以及一行用淡色分隔线隔开的联系方式（城市 / 邮箱 / GitHub / LinkedIn）。
- `个人简介` — 1-2 句概述；先点明工作年限与当前关注方向。
- 左栏（`col-span-8`）— 主线：`工作经历`（每个角色一个区块，含公司、职位、右对齐的日期 `meta`，以及动词开头的 `bullets`）和 `开源项目`。
- 右栏（`col-span-4`）— 副线：`教育背景`、`核心技能`（accent 标签）、`语言能力` 和 `兴趣爱好`。
- 用 `<span class="font-semibold accent">…</span>` 包裹亮眼数字，让数据以 accent 色突出。
- 打印：`@media print` 去掉页面阴影和纸张背景；版式保持 A4，并保留颜色以便导出 PDF。
