---
slug: packs/design-pack/templates/docs-page-zh
type: template
lang: zh
category: doc
title: "技术文档页"
title_en: "NevoFlux Docs Page"
description: "三栏文档页:侧导航 + 正文 + 右侧目录(TOC)。"
tags: [docs, api, tutorial, guide, 模板]
sample_image: packs/design-pack/assets/templates/docs-page.svg
source: html-anything/docs-page
---
## 设计指导

API / 教程文档单页,优先长读体验。意图:面向桌面端(目标宽度 1440)的参考或指南页面。

布局:
- 起始侧(inline-start)导航:分组的章节,固定吸附。
- 正文:含代码块、callout 提示框与表格的文章正文。
- 末尾侧(inline-end)目录:固定吸附,带 scroll-spy 高亮当前标题。
- 顶栏放置搜索、版本选择器与主题切换。

设计细节:
- 代码块:圆角 + 深色/浅染底色 + 语言标签 + 复制按钮。
- callout 提示框分三色:info / warn / danger。
- 暖色、低对比度的中性配色,搭配白色卡片表面,并使用单一强调色用于当前导航项、callout 左侧描边线与当前目录项。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux 文档 — 快速开始</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff; --code-bg: #f4f4f2;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 15px/1.6 -apple-system, system-ui, sans-serif; }
    .topbar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; }
    .topbar .brand { font-weight: 600; }
    .topbar input { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--border); width: 280px; font: inherit; background: var(--bg); }
    .layout { display: grid; grid-template-columns: 240px minmax(0, 1fr) 220px; gap: 0; min-height: calc(100vh - 50px); }
    @media (max-width: 1024px) { .layout { grid-template-columns: 220px 1fr; } .toc { display: none; } }
    @media (max-width: 720px) { .layout { grid-template-columns: 1fr; } .sidebar { display: none; } }
    .sidebar { padding: 24px 16px; border-right: 1px solid var(--border); overflow-y: auto; font-size: 14px; }
    .sidebar .group { margin-bottom: 22px; }
    .sidebar .group-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; padding: 0 8px 8px; }
    .sidebar a { display: block; color: var(--fg); text-decoration: none; padding: 5px 8px; border-radius: 6px; }
    .sidebar a:hover { background: var(--surface); }
    .sidebar a.active { background: var(--accent); color: white; }
    article { padding: 40px 56px 80px; max-width: 760px; }
    .crumbs { color: var(--muted); font-size: 13px; margin-bottom: 12px; }
    h1 { font-size: 36px; letter-spacing: -0.02em; margin: 0 0 12px; }
    .lede { color: var(--muted); font-size: 17px; margin: 0 0 32px; }
    h2 { font-size: 22px; letter-spacing: -0.01em; margin: 40px 0 12px; }
    h3 { font-size: 16px; margin: 24px 0 8px; }
    p { margin: 12px 0; }
    code { font-family: ui-monospace, monospace; background: var(--code-bg); padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
    pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; overflow-x: auto; font-size: 13px; line-height: 1.55; }
    pre code { background: transparent; padding: 0; }
    .callout { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 8px; padding: 14px 18px; margin: 20px 0; font-size: 14px; }
    .callout .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin-bottom: 4px; }
    .toc { padding: 40px 24px 24px; font-size: 13px; border-left: 1px solid var(--border); }
    .toc .toc-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 10px; }
    .toc a { display: block; color: var(--muted); text-decoration: none; padding: 4px 0; }
    .toc a.active { color: var(--accent); font-weight: 500; }
    .pager { display: flex; justify-content: space-between; gap: 12px; margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--border); }
    .pager a { flex: 1; text-decoration: none; color: var(--fg); padding: 12px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
    .pager a small { display: block; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
  </style>
</head>
<body>
  <header class="topbar" data-od-id="topbar">
    <span class="brand">◰ NevoFlux 文档</span>
    <input placeholder="搜索 · ⌘K" />
  </header>
  <div class="layout">
    <nav class="sidebar" data-od-id="sidebar">
      <div class="group">
        <div class="group-label">快速上手</div>
        <a href="#" class="active">快速开始</a>
        <a href="#">核心概念</a>
        <a href="#">身份认证</a>
      </div>
      <div class="group">
        <div class="group-label">GBrain</div>
        <a href="#">索引数据源</a>
        <a href="#">语义搜索</a>
        <a href="#">Canvas 应用</a>
      </div>
      <div class="group">
        <div class="group-label">Agent SDK</div>
        <a href="#">安装</a>
        <a href="#">配置</a>
        <a href="#">命令</a>
      </div>
    </nav>
    <article data-od-id="article">
      <div class="crumbs">文档 › 快速上手 › 快速开始</div>
      <h1>快速开始</h1>
      <p class="lede">在五分钟内发布你的第一个 Canvas 应用。agent SDK 是最快的路径;NevoFlux 浏览器与 API 客户端都封装了同一套 GBrain 引擎。</p>
      <h2 id="install">1. 安装 SDK</h2>
      <p>agent SDK 以单个二进制文件的形式发布,支持 macOS、Linux 与 Windows。</p>
<pre><code># macOS · Homebrew
brew install nevoflux

# Linux · curl
curl -fsSL https://get.nevoflux.dev | sh</code></pre>
      <p>验证安装:</p>
<pre><code>nevoflux --version
# nevoflux 0.6.4</code></pre>
      <h2 id="auth">2. 身份认证</h2>
      <p>使用你的 NevoFlux 账号登录。令牌保存在 <code>~/.config/nevoflux/credentials</code>。</p>
<pre><code>nevoflux auth login
# → 打开你的浏览器
# ✓ 已登录为 you@example.com</code></pre>
      <div class="callout">
        <div class="label">提示</div>
        在没有浏览器的服务器上,使用 <code>nevoflux auth login --device</code> 走设备码登录流程。
      </div>
      <h2 id="index">3. 索引一个 GBrain 数据源</h2>
      <p>选择一个本地文件夹或代码仓库,将其关联到一个 GBrain 知识库。NevoFlux 会监听变更,并在后台对更新过的文档重新生成向量。</p>
<pre><code>cd ~/projects
nevoflux init my-team
nevoflux gbrain index</code></pre>
      <h3>排除文件</h3>
      <p>在被索引文件夹的根目录添加一个 <code>.nevofluxignore</code>,语法与 <code>.gitignore</code> 相同:</p>
<pre><code>node_modules/
*.log
build/</code></pre>
      <h2 id="next">4. 下一步去哪</h2>
      <p>阅读 <a href="#">Canvas 应用</a> 了解 NevoFlux 如何把一个 GBrain 变成可交互的界面,或直接跳到 <a href="#">SDK 参考</a> 查看完整命令列表。</p>
      <div class="pager">
        <a href="#"><small>← 上一篇</small>核心概念</a>
        <a href="#" style="text-align: right;"><small>下一篇 →</small>Canvas 应用</a>
      </div>
    </article>
    <aside class="toc" data-od-id="toc">
      <div class="toc-label">本页内容</div>
      <a href="#install" class="active">1. 安装 SDK</a>
      <a href="#auth">2. 身份认证</a>
      <a href="#index">3. 索引一个 GBrain 数据源</a>
      <a href="#next">4. 下一步去哪</a>
    </aside>
  </div>
</body>
</html>
```

## 用法

- `topbar` — 品牌标识,加上搜索输入框(带 `⌘K` 提示),并留出版本选择器 / 主题切换的位置。
- `sidebar` — 分组导航;每个 `group` 含一个 `group-label` 与若干链接。用 `active` 类标记当前页面。
- `article` — 长读正文:`crumbs` 面包屑、`h1` + `lede`,然后是 `h2`/`h3` 章节。每个 `h2` 带一个 `id`,供目录引用。
- `pre` / `code` — 代码块;用开头的注释行标注语言。行内 `code` 用于文件名与参数。
- `callout` — 方框提示;原模板自带一种强调样式 — 复制描边色即可派生 info / warn / danger 三种变体。
- `pager` — 文章底部的上一篇 / 下一篇链接。
- `toc` — 本页内容列表;`id` 必须与正文 `h2` 锚点一致,当前项加 `active` 类。
