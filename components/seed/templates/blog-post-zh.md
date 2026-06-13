---
slug: packs/design-pack/templates/blog-post-zh
type: template
lang: zh
category: article
title: "博客长文"
title_en: "Blog Post (NevoFlux Long-Form)"
description: "杂志感长文模板，含 masthead、hero、figures、pull quote 与作者署名。"
tags: [blog, essay, case study, 长文, 模板]
sample_image: packs/design-pack/assets/templates/blog-post.svg
source: html-anything/blog-post
---

## 设计指导

一篇真正的长文章（≥ 600 字），排版以 typography 为主：约 70% 文字、20% 图、10% chrome。

布局：
- Masthead（刊物名 + 日期）。
- Hero（大标题 + 副标 + 作者署名 + 阅读时间）。
- 正文（单栏 65ch，含 figures、pull quotes、行内引用）。
- Author bio 卡片。
- Related posts（3 张卡）。

设计细节：
- Pull quote 用大号 serif 斜体 + 左侧色条。
- Figures 自带 caption（italic，smaller）。
- 代码块：圆角 + 深色 + 语言标签。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>我们为什么把 GBrain 重写成本地优先的知识图谱 — NevoFlux</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 18px/1.65 Georgia, 'Iowan Old Style', serif; }
    .wrap { max-width: 680px; margin: 0 auto; padding: 56px 28px 96px; }
    nav.top { font-family: -apple-system, system-ui, sans-serif; font-size: 13px; color: var(--muted); margin-bottom: 56px; }
    nav.top a { color: inherit; text-decoration: none; }
    .eyebrow { font-family: -apple-system, system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 14px; }
    h1 { font-size: clamp(36px, 5vw, 52px); line-height: 1.1; letter-spacing: -0.015em; margin: 0 0 20px; }
    .byline { font-family: -apple-system, system-ui, sans-serif; font-size: 14px; color: var(--muted); margin: 0 0 40px; display: flex; align-items: center; gap: 12px; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--accent); opacity: 0.18; }
    .lede { font-size: 22px; line-height: 1.5; color: var(--fg); margin: 0 0 40px; font-style: italic; }
    .hero-figure { aspect-ratio: 16/9; background: linear-gradient(135deg, var(--accent), #6b6964); border-radius: 8px; margin-bottom: 48px; opacity: 0.85; }
    p { margin: 24px 0; }
    p:first-of-type::first-letter { float: left; font-size: 64px; line-height: 0.9; padding: 6px 10px 0 0; font-weight: 600; color: var(--accent); }
    h2 { font-size: 28px; letter-spacing: -0.01em; margin: 56px 0 12px; line-height: 1.2; }
    blockquote { margin: 40px 0; padding: 0 32px; font-size: 24px; line-height: 1.4; color: var(--fg); border-left: 3px solid var(--accent); font-style: italic; }
    code { font-family: ui-monospace, monospace; background: var(--surface); border: 1px solid var(--border); padding: 1px 5px; border-radius: 4px; font-size: 0.85em; }
    pre { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px 18px; overflow-x: auto; font: 14px/1.55 ui-monospace, monospace; }
    figure.numbers { font-family: -apple-system, system-ui, sans-serif; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 40px -24px; padding: 28px 24px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    figure.numbers .stat .value { font-family: Georgia, serif; font-size: 38px; letter-spacing: -0.01em; line-height: 1; }
    figure.numbers .stat .label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 6px; }
    .endnote { font-family: -apple-system, system-ui, sans-serif; font-size: 13px; color: var(--muted); margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--border); }
    .endnote a { color: var(--accent); text-decoration: none; }
  </style>
</head>
<body>
  <article class="wrap" data-od-id="article">
    <nav class="top"><a href="#">← NevoFlux 博客</a></nav>
    <div class="eyebrow">工程</div>
    <h1>我们为什么把 GBrain 重写成本地优先的知识图谱</h1>
    <div class="byline">
      <div class="avatar"></div>
      <span>作者 Mira Hassan · 2026 年 4 月 22 日 · 阅读约 8 分钟</span>
    </div>
    <p class="lede">两年来，GBrain 只是远端向量库之上的一层薄缓存。后来重度用户开始整天驻留在 NevoFlux 浏览器里，那些我们一直礼貌性忽略的往返延迟，终于变成了无法再忽略的工单。</p>
    <div class="hero-figure" data-od-id="hero-figure"></div>

    <p>这个决定并不突然。在承认数据真正告诉我们什么之前，我们已经盯着召回延迟的分布漂移看了半年。P50 检索很漂亮，P99 却像一部恐怖片。那些 GBrain 里塞着 30 GB 抓取页面、Canvas 应用状态和 agent 对话记录的用户，正是写工单的人。</p>

    <p>重写整个知识层，听上去正是初创公司被劝告永远不要碰的那类项目。我们还是做了。下面是过程、让我们意外的地方，以及如果重来我会改的部分。</p>

    <h2>导火索：我们修不好的往返</h2>
    <p>远端向量库很出色，但它本质上是一种取舍。热路径上每一次 GBrain 查询都要发起一次网络调用去做 embedding 和排序——在我们的规模下，对浏览器里的重度用户来说，这个调用频繁到把 P99 检索拖过了 50ms。</p>

    <p>我们试过常规手段：用 <code>LRU</code> 缓存 embedding、调小 <code>topK</code> 预算、在 agent 循环里批量查询。它们各自帮上一点忙，但都没能把延迟压到 20ms 以下，而我们在意的工作流需要 5ms 以内。</p>

    <blockquote>"我们没法在网络上修好它。把索引留在设备上，就能修好。"</blockquote>

    <p>我们的资深工程师 Sasha 在十月的一次会议上说了这句话。他是对的。问题不在于是否离开远端向量库，而在于用什么替代它，以及 SDK 里有多少能保留下来。</p>

    <h2>保留什么；舍弃什么</h2>
    <p>Canvas 应用原样保留。pack 注册表仍留在云端。而那段在你浏览时于热循环里做语义检索的代码——它变成了随 NevoFlux 运行时一起下发的本地优先图索引。边界收敛成单一的 SDK 接口，配上一套小而克制的协议。</p>

    <figure class="numbers">
      <div class="stat"><div class="value">38ms → 4ms</div><div class="label">P99 GBrain 召回</div></div>
      <div class="stat"><div class="value">62%</div><div class="label">内存下降</div></div>
      <div class="stat"><div class="value">11 周</div><div class="label">从 RFC 到上线</div></div>
    </figure>

    <p>上面的数字是真实的、来自生产环境。但脱离上下文也会误导：本地优先的改写不仅去掉了往返，还顺手拆掉了一层我们从第一个 GBrain MVP 起就一直背着的抽象。</p>

    <h2>如果重来，我会怎么改</h2>
    <p>一件事：SDK 边界。为了对称，我们选了 <code>FFI</code> 绑定——当各处都只有一套运行时时，让 agent 调进索引感觉很自然。但绑定的繁文缛节很脆，在我们写出一层一次性兜底的封装之前，就因为生命周期错误吃了两次生产事故。</p>

    <p>如果今天重新开始，我会直接从 pack schema 生成绑定。教训不是 <em>别自己写绑定</em>；而是 <em>一旦跨过运行时这条线，就把边界当成一个对外 API 来对待</em>。</p>

    <div class="endnote">NevoFlux 正在招募喜欢写这类文章的工程师。<a href="#">查看在招岗位 →</a></div>
  </article>
</body>
</html>
```

## 用法

- `nav.top`——masthead / 返回刊物的链接。
- `.eyebrow`——标题上方的栏目或分类标签。
- `h1` + `.byline` + `.lede`——hero 区块：标题、作者/日期/阅读时间，以及斜体导语。
- `.hero-figure`——头图占位（CSS 渐变；可替换为内联 SVG 或 `<img>`）。
- `p` / `h2`——单栏 65ch 正文；首段自动套用首字下沉。
- `blockquote`——带色条的 pull quote。
- `figure.numbers`——三栏数据条（数值 + 标签）。
- `.endnote`——结尾行动号召。
