---
slug: packs/design-pack/templates/prototype-web-zh
type: template
lang: zh
category: prototype
title: "Web 产品原型"
title_en: "NevoFlux Web Prototype"
description: "可点击、可运行的 Web 原型，含导航、英雄区、特性、CTA —— 一个高保真的 SaaS 风格落地页。"
tags: [prototype, landing, 原型, 模板]
sample_image: packs/design-pack/assets/templates/prototype-web.svg
source: html-anything/prototype-web
---
## 设计指导

输出一个完整、可点击的产品落地页，让人觉得"明天就能上线"。

各区块，按顺序：
- 顶部导航 —— logo + 导航链接 + CTA 按钮。
- 英雄区 —— 大标题 + 副标题 + 双 CTA + 一个可视化占位块。
- 特性区 —— 3 到 6 个特性卡。
- 工作原理 —— 带编号的步骤。
- 社会认同 —— logo 墙或用户评价。
- 价格 —— 可选，通常三档。
- 页脚。

设计细节：
- 拥抱现代 SaaS 趋势：大字号、柔和渐变、glassmorphism 玻璃拟态卡片，以及滚动到视图的入场动画（纯 CSS 即可）。
- 响应式：移动端单栏，桌面端多栏。至少处理 `md:` 断点。
- 添加交互：导航滚动变色，特性卡 hover 浮起，FAQ 可手风琴展开（使用 `<details>`）。
- 这是一个高保真原型 —— 它应该看起来已经可以上线，而不是线框图。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux —— AI 与你共建的浏览器</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { margin:0; font-family:'Inter Tight','Noto Sans SC',sans-serif; background:#fafaf7; color:#15140f; -webkit-font-smoothing:antialiased; }
  .accent { color:#c96442; }
  .glass { background:rgba(255,255,255,0.7); backdrop-filter:blur(14px); border:1px solid rgba(21,20,15,0.06); }
  .grad-text { background:linear-gradient(120deg,#15140f 0%,#c96442 60%,#e9b94a 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .gradient-bg { background:radial-gradient(ellipse at 20% 0%, rgba(201,100,66,0.18), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(233,185,74,0.15), transparent 55%); }
  details summary::-webkit-details-marker { display:none; }
  details summary { cursor:pointer; list-style:none; }
  .card-rise { transition:transform 0.25s ease, box-shadow 0.25s ease; }
  .card-rise:hover { transform:translateY(-4px); box-shadow:0 30px 60px -30px rgba(21,20,15,0.2); }
</style>
</head>
<body>

<nav class="sticky top-0 z-30 glass">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="#" class="flex items-center gap-2.5 font-bold tracking-tight">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c96442] to-[#e9b94a] grid place-items-center text-white font-black">N</div>
      <span>NevoFlux</span>
    </a>
    <div class="hidden md:flex items-center gap-7 text-sm text-[#5a564e]">
      <a href="#features" class="hover:text-[#15140f]">特性</a>
      <a href="#how" class="hover:text-[#15140f]">工作原理</a>
      <a href="#voices" class="hover:text-[#15140f]">创造者</a>
      <a href="#pricing" class="hover:text-[#15140f]">价格</a>
    </div>
    <div class="flex items-center gap-2">
      <a href="#" class="hidden sm:inline text-sm font-medium text-[#5a564e] hover:text-[#15140f] px-3 py-2">登录</a>
      <a href="#cta" class="text-sm font-semibold bg-[#15140f] text-white px-4 py-2 rounded-full hover:bg-[#2a2620] transition-colors">免费下载 →</a>
    </div>
  </div>
</nav>

<section class="gradient-bg pt-24 pb-32 px-6">
  <div class="max-w-5xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#e7e5e0] text-xs font-medium text-[#5a564e] mb-7">
      <span class="w-1.5 h-1.5 rounded-full bg-[#c96442]"></span>
      v1.0 · 800+ 个团队已构建 12,000+ 个 Canvas 应用
    </div>
    <h1 class="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
      让 <span class="grad-text">AI</span><br class="md:hidden"/> 构建你从不想手动接线的 <span class="italic font-bold" style="font-family:Georgia,serif">那 80%</span><br/>应用的浏览器
    </h1>
    <p class="text-lg md:text-xl text-[#5a564e] max-w-2xl mx-auto leading-relaxed mb-10">
      仪表盘 · 内部工具 · 爬虫 · 数据应用 · 个人站点 ——<br/>
      NevoFlux 把一句提示词变成一个运行中的 Canvas 应用，扎根于你的 GBrain 知识库。
    </p>
    <div class="flex items-center justify-center gap-3">
      <a href="#cta" class="inline-flex items-center gap-2 bg-[#c96442] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#b25737] transition-colors shadow-[0_14px_32px_-16px_rgba(201,100,66,0.85)]">
        免费下载 · 无需信用卡 →
      </a>
      <a href="#how" class="inline-flex items-center gap-2 bg-white border border-[#e7e5e0] font-medium text-[#15140f] px-6 py-3 rounded-full hover:border-[#15140f]/40 transition-colors">
        ▶ 观看 90 秒演示
      </a>
    </div>
    <div class="mt-14 mx-auto max-w-3xl">
      <div class="rounded-2xl bg-white shadow-[0_50px_100px_-30px_rgba(21,20,15,0.25)] border border-[#e7e5e0] p-2">
        <div class="rounded-xl bg-[#15140f] aspect-video grid place-items-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-20" style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px); background-size:32px 32px;"></div>
          <div class="text-center relative z-10">
            <div class="text-7xl mb-3">▶</div>
            <div class="text-white/60 text-sm">点击播放 · 90 秒</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="features" class="py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">特性 · Features</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">不是更多功能 —— 而是更顺的流程。</h2>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">✦</div>
          <div class="text-lg font-bold mb-2">智能体构建</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">用一行话描述应用；NevoFlux 智能体在几秒内交付一个可运行的 Canvas 应用。</div>
        </div>
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">⌗</div>
          <div class="text-lg font-bold mb-2">GBrain 记忆</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">每个应用都扎根于你的 GBrain 知识库 —— 笔记、文档和已保存的页面。</div>
        </div>
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">↗</div>
          <div class="text-lg font-bold mb-2">包与技能</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">安装设计包与技能，然后在每个 Canvas 中复用世界级模板。</div>
        </div>
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">◐</div>
          <div class="text-lg font-bold mb-2">隐私优先</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">智能体与 SDK 优先本地运行 —— 你的数据永不离开你的设备。</div>
        </div>
      
    </div>
  </div>
</section>

<section id="how" class="py-24 px-6 bg-[#f4f1ec] border-y border-[#e7e5e0]">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-16">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">工作原理 · How it works</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">三步，十秒。</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      
        <div>
          <div class="text-5xl font-extrabold accent" style="font-family:Georgia,serif;font-style:italic">01</div>
          <div class="text-xl font-bold mt-2 mb-1.5">描述它</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">输入一句提示词，拖入一个 CSV，或把智能体指向 GBrain 中已有的页面。</div>
        </div>
      
        <div>
          <div class="text-5xl font-extrabold accent" style="font-family:Georgia,serif;font-style:italic">02</div>
          <div class="text-xl font-bold mt-2 mb-1.5">选一个包</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">从世界级设计包中选择：仪表盘 / 演示稿 / 卡片 / 报告 / 落地页。</div>
        </div>
      
        <div>
          <div class="text-5xl font-extrabold accent" style="font-family:Georgia,serif;font-style:italic">03</div>
          <div class="text-xl font-bold mt-2 mb-1.5">按下 ⌘+Enter</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">本地智能体开始运行，几秒后一个实时的 Canvas 应用在你身旁打开。</div>
        </div>
      
    </div>
  </div>
</section>

<section id="voices" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">创造者 · Voices</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">800+ 个小团队在这里构建。</h2>
    </div>
    <div class="grid md:grid-cols-2 gap-5">
      <div class="p-7 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-2xl accent mb-3">"</div>
        <div class="text-lg font-medium leading-snug mb-5">不用为验证一个想法就搭一整套技术栈。一句提示词，Canvas 应用就上线了，扎根于我们的 GBrain。</div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#c96442] to-[#e9b94a]"></div>
          <div><div class="font-semibold">Maya R.</div><div class="text-xs text-[#5a564e]">创始人 · 早期数据创业公司</div></div>
        </div>
      </div>
      <div class="p-7 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-2xl accent mb-3">"</div>
        <div class="text-lg font-medium leading-snug mb-5">我们的内部工具从两周的工单变成了一个下午。智能体构建应用，SDK 接好数据。</div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c3aa6] to-[#2348b8]"></div>
          <div><div class="font-semibold">Dev K.</div><div class="text-xs text-[#5a564e]">工程负责人 · SaaS 团队</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="pricing" class="py-24 px-6 bg-[#f4f1ec] border-y border-[#e7e5e0]">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">价格 · Pricing</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">小团队也负担得起。</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-5">
      <div class="p-8 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-sm font-semibold text-[#5a564e] mb-2">个人版</div>
        <div class="text-5xl font-extrabold tracking-tight">¥0</div>
        <div class="text-xs text-[#5a564e] mt-1 mb-6">永久免费</div>
        <ul class="space-y-2 text-sm text-[#262421] mb-6">
          <li>· 每月 5 个 Canvas 应用</li><li>· 核心设计包</li><li>· 本地智能体访问</li>
        </ul>
        <button class="w-full py-2.5 rounded-full border border-[#15140f]/15 hover:border-[#15140f]/40 font-medium text-sm">开始</button>
      </div>
      <div class="p-8 rounded-2xl bg-[#15140f] text-white border border-[#15140f] ring-2 ring-[#c96442]/30 relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#c96442] text-white text-[10px] font-bold tracking-wider">热门</div>
        <div class="text-sm font-semibold opacity-70 mb-2">专业版</div>
        <div class="text-5xl font-extrabold tracking-tight">¥9<span class="text-base opacity-60 font-medium">/月</span></div>
        <div class="text-xs opacity-60 mt-1 mb-6">无限量，团队协作</div>
        <ul class="space-y-2 text-sm opacity-90 mb-6">
          <li>· 无限 Canvas 应用</li><li>· 5 人团队 · 共享 GBrain</li><li>· 优先支持</li>
        </ul>
        <button class="w-full py-2.5 rounded-full bg-[#c96442] hover:bg-[#b25737] font-semibold text-sm">升级到专业版</button>
      </div>
      <div class="p-8 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-sm font-semibold text-[#5a564e] mb-2">团队版</div>
        <div class="text-5xl font-extrabold tracking-tight">¥24<span class="text-base text-[#5a564e] font-medium">/席位/月</span></div>
        <div class="text-xs text-[#5a564e] mt-1 mb-6">企业级管控</div>
        <ul class="space-y-2 text-sm text-[#262421] mb-6">
          <li>· 无限席位</li><li>· SSO / 审计日志</li><li>· 专属客户成功经理</li>
        </ul>
        <button class="w-full py-2.5 rounded-full border border-[#15140f]/15 hover:border-[#15140f]/40 font-medium text-sm">联系销售</button>
      </div>
    </div>
  </div>
</section>

<section id="cta" class="py-32 px-6 text-center">
  <h2 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">构建更多，接线更少。</h2>
  <p class="text-lg text-[#5a564e] mb-8">免费下载，无需信用卡，90 秒即可上线。</p>
  <a href="#" class="inline-flex items-center gap-2 bg-[#c96442] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#b25737] transition-colors shadow-[0_14px_32px_-16px_rgba(201,100,66,0.85)]">
    立即开始 →
  </a>
</section>

<footer class="border-t border-[#e7e5e0] py-10 px-6">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#5a564e]">
    <div class="flex items-center gap-2.5">
      <div class="w-7 h-7 rounded-md bg-gradient-to-br from-[#c96442] to-[#e9b94a] grid place-items-center text-white text-xs font-black">N</div>
      <span class="font-semibold text-[#15140f]">NevoFlux</span>
      <span class="opacity-50">© 2026</span>
    </div>
    <div class="flex gap-5">
      <a href="#" class="hover:text-[#15140f]">隐私</a>
      <a href="#" class="hover:text-[#15140f]">条款</a>
      <a href="#" class="hover:text-[#15140f]">联系</a>
    </div>
  </div>
</footer>

</body>
</html>
```

## 用法

- `nav` —— 品牌标识、区块锚点（特性 / 工作原理 / 创造者 / 价格），以及主要的下载 CTA。
- `hero` —— 带指标的眉标徽章、大号渐变标题、副标题、双 CTA，以及一个视频/可视化占位块。
- `features` —— 四个 `card-rise` 卡片；按能力替换字形、标题和一行文案。
- `how` —— 三个带编号的步骤（描述 / 选一个包 / 运行）。
- `voices` —— 两个评价卡片；替换引文、渐变头像、姓名和角色。
- `pricing` —— 三档（个人版 / 专业版 / 团队版）；编辑价格、计费周期和特性条目。中间一档带有高亮的"热门"边框。
- `cta` —— 收尾标题 + 副标题 + 单个按钮。
- `footer` —— 品牌标识、版权和法律链接。
- 所有图像都是 CSS 渐变或文本字形，因此页面保持自包含，没有外部图片 URL。
