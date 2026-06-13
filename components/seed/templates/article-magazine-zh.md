---
slug: packs/design-pack/templates/article-magazine-zh
type: template
lang: zh
category: article
title: "杂志文章"
title_en: "NevoFlux Magazine Article"
description: "Substack / Medium 高级感长文排版，适合 NevoFlux 博客、公众号与更新日志长文。"
tags: [blog, essay, newsletter, 公众号, 博客, 文章, 模板]
sample_image: packs/design-pack/assets/templates/article-magazine.svg
source: html-anything/article-magazine
---

## 设计指导

- 顶部 hero：大标题（text-5xl/6xl）+ 可选副标题 + 作者 / 阅读时间 / 日期元数据。
- 正文：单栏，最大宽度约 700px，居中。段落 `text-lg leading-relaxed text-neutral-700 dark:text-neutral-300`。
- H2 / H3 标题用 serif 字体，让正文与标题有视觉对比。
- 引用块使用左侧粗 accent 色边线 + 斜体。
- 代码块：圆角 + 深色背景 + 浅色文字，显示语言标签。
- 列表项使用自定义 bullet（小方块 / accent 圆点）。
- 章节之间用 `<hr>` 分隔，但样式做成中央居中的小 ornament。
- 文末加一个简单的 "如果觉得有用，欢迎转发" 行动卡片。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>上线 GBrain 之后, 我们不再写文档, 改成直接交付 Canvas 应用</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;600&family=Noto+Serif+SC:wght@500;700;900&display=swap" rel="stylesheet">
<style>
  :root { --ink:#1a1a1a; --paper:#fafaf7; --line:#e7e5e0; --mute:#6b6760; --accent:#b8553a; --twitter:#1d9bf0; }
  body { font-family:'Inter','Noto Sans SC',sans-serif; background:var(--paper); color:var(--ink); -webkit-font-smoothing:antialiased; }
  .serif { font-family:'Noto Serif SC',Georgia,serif; }
  .ornament { display:flex; align-items:center; justify-content:center; gap:14px; margin:48px 0; color:var(--mute); }
  .ornament::before, .ornament::after { content:""; flex:1; max-width:60px; height:1px; background:var(--line); }
  .article p { font-size:1.0625rem; line-height:1.8; color:#262421; margin:1.1em 0; max-width:65ch; }
  .article h2 { font-family:'Noto Serif SC',serif; font-size:1.875rem; font-weight:700; margin:2.4em 0 0.8em; letter-spacing:-0.01em; }
  .article blockquote { border-left:3px solid var(--accent); padding:0 0 0 20px; margin:1.6em 0; font-style:italic; color:var(--mute); font-family:'Noto Serif SC',serif; font-size:1.0625rem; line-height:1.7; }
  .article a { color:var(--accent); text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1px; }
  .grain::before { content:""; position:fixed; inset:0; pointer-events:none; opacity:0.4; background-image:radial-gradient(circle at 12% 18%, rgba(106,92,56,0.05), transparent 45%), radial-gradient(circle at 88% 72%, rgba(106,92,56,0.04), transparent 50%); }
</style>
</head>
<body class="grain">
<article class="article max-w-[720px] mx-auto px-6 pt-20 pb-32">

  <!-- Source banner — clearly attributes the inspiration -->
  <a href="#" class="!no-underline group block mb-10 rounded-2xl border border-[var(--line)] bg-white/70 hover:bg-white transition-colors p-4 flex items-start gap-4">
    <div class="shrink-0 w-10 h-10 rounded-full bg-[var(--twitter)] grid place-items-center text-white">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </div>
    <div class="min-w-0 flex-1">
      <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--mute)] mb-1">灵感来自 / Source</div>
      <div class="text-[14px] font-medium text-[var(--ink)] leading-snug">NevoFlux 团队关于 "在代理时代, 知识库应该以应用而不是静态文档的形式交付" 的内部纪要</div>
      <div class="text-[12px] text-[var(--mute)] mt-1 break-all group-hover:text-[var(--accent)] transition-colors">nevoflux.com/notes/gbrain-over-docs  ↗</div>
    </div>
  </a>

  <div class="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--accent)] mb-5">Essay · 2026.05 · 评论 / 延伸</div>
  <h1 class="serif text-[3rem] leading-[1.08] font-black tracking-tight mb-5">
    上线 <a href="#" class="italic font-bold !no-underline" style="color:var(--accent)">GBrain</a> 之后,<br/>
    我们不再写文档, 改成直接交付 Canvas 应用
  </h1>
  <p class="text-[1.125rem] leading-relaxed text-[var(--mute)] font-light max-w-[60ch] mb-8">
    简而言之: 在 NevoFlux 浏览器与代理时代, 一堆静态文档这个 "中间态" 已经撑不住了 —— 一个由 GBrain 驱动的实时 Canvas 应用, 才是读者真正会用的最终形态。
  </p>
  <div class="flex items-center gap-3 text-[12px] text-[var(--mute)] pb-12 border-b border-[var(--line)]">
    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#c96442] to-[#e9b94a]"></div>
    <span class="font-medium text-[var(--ink)]">陈漫</span>
    <span>·</span><span>5 月 11 日</span>
    <span>·</span><span>4 分钟阅读</span>
  </div>

  <h2>让我点头的三个观察</h2>
  <p><span class="serif font-bold text-[1.5rem] float-left mr-2 leading-none mt-1.5" style="color:var(--accent)">第</span>一, 我们对写文档的爱, 主要是写起来爽。但读者从来没投过票。读者拿到的永远是某个 wiki 渲染器吐出来的结果 —— 而那个渲染器属于平台, 不属于你。</p>
  <p>第二, 真要回答一个问题, 一摞文档输了。把同事丢进一个陌生仓库, wiki 搜索返回十篇半过期的页面。GBrain 索引同样的素材, 在工作发生的地方一次性内联给出答案。</p>
  <p>第三, Notion / Confluence / 共享盘 / README —— 每一个界面解释和排序你知识的方式都不一样。你写一份, 5 个地方得重排 5 次。<strong class="font-semibold text-[var(--ink)]">放进 GBrain 一次, NevoFlux 代理就在每个 Canvas 应用和 pack 里一致地还原它</strong>。</p>

  <h2>但文档太难维护, 这是真的</h2>
  <p>写 <code class="px-1.5 py-0.5 rounded bg-[#f0ece5] text-[0.92em] font-mono text-[#7a3d27]">## 又一个标题</code> 写到想吐, 这是事实。之前没人愿意花成本维护文档, 因为同一处改动, 改代码 30 秒, 把文档同步到所有地方 30 分钟。</p>
  <blockquote>变量是 —— NevoFlux 代理把这 30 分钟降回 30 秒了。<br/>你做改动, SDK 把它同步进 GBrain。你管最终形态, 代理管啰嗦的接线细节。</blockquote>

  <h2>我们顺手做了一个工具</h2>
  <p>灵感来自那份内部纪要, 加上大量自用打磨, 我们做了 <a href="#">NevoFlux Packs</a>。把 GBrain 指向你的源（代码 / CSV / JSON / 一个设计 skill）, 选一个模板 (杂志、PPT、海报、小红书、数据报告 …), 按 ⌘+Enter —— 本地代理在你<strong class="font-semibold text-[var(--ink)]">已经登录</strong>的 NevoFlux session 里跑, 几秒后 Canvas 面板里就是一份可以直接放进任何工作区的应用。</p>
  <p>不需要 API Key, 不浪费 token (二次编辑只跑 diff)。</p>

  <h2>结论</h2>
  <p>如果你也觉得 "写一份文档, 再手动粘进五个工具" 这件事浪费了你的人生 —— 看一眼团队纪要, 看一眼一个 pack 如何复用同一个设计 skill, 然后试试任何一个能把原始知识自动升格成实时可查询应用的工具。</p>

  <div class="ornament"><span class="serif italic">·  ·  ·</span></div>

  <div class="rounded-2xl border border-[var(--line)] bg-white/60 p-6 mt-12 flex items-start gap-4">
    <div class="text-2xl shrink-0">📩</div>
    <div>
      <div class="font-semibold text-[var(--ink)] mb-1">题图致敬: 纪要里那个 "一切都是 Canvas 应用" 的瞬间。</div>
      <div class="text-[13px] text-[var(--mute)]">阅读原始纪要 → <a href="#" style="color:var(--accent)">nevoflux.com/notes/gbrain-over-docs</a></div>
    </div>
  </div>
</article>
</body>
</html>
```

## 用法

- `Source banner`（顶部卡片）：可选的来源 / "灵感来自" 链接。替换眼标、一句话描述与末尾的 URL 标签, 也可整张移除。
- `eyebrow` 行（`Essay · … · 评论`）：标题上方的导语 —— 分类、日期、类型。
- `h1` 标题：大号 serif 主标题；内联的 accent `<a>` 用于高亮产品名（如 GBrain）。
- `subhead` 段落：紧贴标题下方的一句话摘要。
- `meta` 行：作者头像（CSS 渐变）、作者名、日期、阅读时间。
- 正文章节：每个 `<h2>` 引出一节, 在其后填入 `<p>` 段落。首段使用首字下沉 span。用 `<blockquote>` 放金句, 用内联 `<code>` 放短代码片段。
- `ornament`：居中的章节分隔小装饰 —— 保持原样即可。
- 文末 CTA 卡片：结尾的 "转发 / 阅读原文" 行动块 —— 编辑标题与末尾链接标签。
