---
slug: packs/design-pack/templates/social-x-post-card-zh
type: template
lang: zh
category: card
title: "X (Twitter) 帖子卡"
title_en: "NevoFlux X / Twitter Post Card"
description: "一张拟真度极高的 X (Twitter) 帖子卡, 带互动数据 (点赞 / 转推 / 浏览量), 适配视频叠加或图卡分享。"
tags: [twitter, x, social, card, overlay, 模板]
sample_image: packs/design-pack/assets/templates/social-x-post-card.svg
source: html-anything/social-x-post-card
---

## 设计指导

意图
- 把一段推文内容 (或用户的金句) 渲染成一张拟真度极高的 X 帖子卡片, 用于视频叠加、推特发图、知识沉淀。Inspired by hyperframes x-post。

画布
- 1280×720 或 1080×1080。暗背景 `#0f1419`/`#000` 或亮背景 `#ffffff` (按 X 主题)。卡片居中, 阴影柔和。

卡片结构
- 外框: 圆角 16px, 1px border `#2f3336` (dark) / `#eff3f4` (light), 内边距 16px。
- 顶部 row: 头像 (48×48 圆形, 用 CSS gradient 占位) + 用户名 + handle `@username` + verified 蓝勾 + 时间 (mono, 12px, 灰)。
- 正文: 17-22px, 字重 400; 链接用 X 蓝 `#1d9bf0`; hashtag 与 mention 同色; 段落间空 0.6em。
- 可选: 引用卡 (小卡内嵌, 灰底, 圆角 12px)。
- 可选: 1 张图 (CSS 渐变 + 描述占位, 不能外链图片), 比例 16:9, 圆角 12px。
- 互动 row: 4 个 icon + 数字 (回复 / 转推 / 引用 / 点赞), icon 用 inline SVG (X 官方风格), 灰色, hover 时变色。
- 顶部右上 X logo 单线 SVG。
- 浏览量 row: 眼睛图标 + 数字 (小字)。

字体
- 西文: `Chirp` (X 的字体) → fallback `Inter` 或 `Segoe UI`。
- 中文: `Noto Sans SC` / `PingFang SC`。
- 数字: 同主字体, 不用 mono。

设计细节
- 配色 light: bg `#fff`, text `#0f1419`, secondary `#536471`, border `#eff3f4`, accent `#1d9bf0`。
- 配色 dark (推荐, 视频叠加用): bg `#000`, text `#e7e9ea`, secondary `#71767b`, border `#2f3336`, accent `#1d9bf0`。
- 数字格式化: 1.2K / 4.5M (不要原始 1234)。
- 内容必须来自用户输入, 不能编造推文。
- 若用户输入是数据 → 自动总结成一句"金句"推文 (≤ 280 字符)。
- 单文件 HTML; icon 内联 SVG; 不要任何外部图片 URL。
- 可选: 卡片背后加微妙径向高光 `radial-gradient(...)` 增加视频叠加的可读性。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>X 帖子卡 · 浏览器是新的知识库</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter','Noto Sans SC',system-ui,sans-serif; background: radial-gradient(circle at 50% 30%, #1a1f2e 0%, #050507 70%); color: #e7e9ea; }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-12">
  <article class="w-[640px] rounded-2xl p-5" style="background:#000;border:1px solid #2f3336;box-shadow:0 30px 60px -20px rgba(0,0,0,0.6)">
    <!-- header -->
    <header class="flex items-start gap-3">
      <div class="w-12 h-12 rounded-full shrink-0" style="background:linear-gradient(135deg,#ff7e5f 0%,#feb47b 100%)"></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1 flex-wrap">
          <span class="font-bold">NevoFlux</span>
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="#1d9bf0"><path d="M22.5 12.5c0-1.6-.9-3-2.2-3.8.4-.2.7-.5 1-.8.4-.6.6-1.3.6-2 0-1.7-1.4-3-3-3-.5 0-1 .1-1.4.3-.4-1.3-1.6-2.2-3-2.2-1.7 0-3 1.3-3 3 0 .3 0 .5.1.8C9.1.7 7.7 0 6 0 4 0 2.5 1.5 2.5 3.5c0 .9.3 1.7.9 2.3-.5.2-1 .5-1.4.9C.5 7.5 0 8.7 0 10c0 1.6.9 3 2.2 3.7-.7.7-1.2 1.7-1.2 2.8 0 2 1.5 3.5 3.5 3.5.8 0 1.6-.3 2.2-.7.5 1.4 1.7 2.4 3.3 2.4 1.4 0 2.6-.9 3-2.1.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3 0-.5-.1-.9-.3-1.3 1.6-.2 2.8-1.6 2.8-3.3 0-1.1-.5-2-1.3-2.6.8-.6 1.3-1.6 1.3-2.7zm-12.6 4.8l-3.6-3.6 1.6-1.6 2 2 4.6-4.6 1.6 1.6-6.2 6.2z"/></svg>
          <span class="text-[#71767b] text-[14px]">@nevoflux</span>
          <span class="text-[#71767b]">·</span>
          <span class="text-[#71767b] text-[14px]">14 小时</span>
          <div class="ml-auto text-[#71767b]"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></div>
        </div>
        <p class="mt-2 text-[17px] leading-snug">你打开的每个标签页, 关掉的那一刻就被遗忘了。NevoFlux 浏览器把它们全部留在 <span style="color:#1d9bf0">GBrain</span> 里 —— 一个住在浏览器内部的知识库。</p>
        <p class="mt-3 text-[17px] leading-snug">向 GBrain 提一个问题, agent 会从你真正读过的内容里作答, 再当场为你搭一个 <span style="color:#1d9bf0">Canvas 应用</span>。浏览器不再只是一个阅读器, 而变成了工作台。</p>
        <p class="mt-3 text-[15px] text-[#71767b]">2026/05/11 · X for Web</p>
      </div>
    </header>
    <!-- engagement -->
    <div class="mt-4 flex items-center justify-between text-[#71767b] text-[13px] max-w-[440px]">
      <button class="flex items-center gap-1.5 hover:text-[#1d9bf0]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M1.75 4c-.97 0-1.75.78-1.75 1.75v12.5c0 .97.78 1.75 1.75 1.75h13.5c.97 0 1.75-.78 1.75-1.75V14h-1.5v4.25H1.5V5.75h17V8h1.5V5.75c0-.97-.78-1.75-1.75-1.75H1.75z"/><path d="M11.6 9.4l1.7 2.3-1.7 2.3h2.7l1.7-2.3-1.7-2.3z"/></svg>
        <span>482</span>
      </button>
      <button class="flex items-center gap-1.5 hover:text-[#00ba7c]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M4.5 3.88l4.4 4.4H5v8.83H1V19h6v-2.5H8V8.28zm15 8.13h-1V21H10v-2.5h7V12h1l-4 .5-4-4.5zm-9 6.5h-1V8H6V6h6v12.51z"/></svg>
        <span>1.2K</span>
      </button>
      <button class="flex items-center gap-1.5 hover:text-[#f91880]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M16.7 5c-2 0-3.5 1.6-4.7 3-1.2-1.4-2.7-3-4.7-3C4.4 5 2 7.4 2 10.4c0 2.3 1 4.6 4 7.4 1.8 1.7 4 3.4 4.7 3.9.4.3.9.3 1.3 0 .8-.5 3-2.3 4.7-3.9 3-2.8 4-5 4-7.4 0-3-2.4-5.4-4-5.4z"/></svg>
        <span style="color:#f91880">12.3K</span>
      </button>
      <button class="flex items-center gap-1.5 hover:text-[#1d9bf0]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M8 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <span>2.1M</span>
      </button>
      <button class="hover:text-[#1d9bf0]"><svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M12 2.5l-4 4h3v7h2v-7h3l-4-4z"/><path d="M3 14v6h18v-6h-2v4H5v-4z"/></svg></button>
    </div>
  </article>
</body>
</html>
```

## 用法

- 头像: 48×48 的圆形是纯 CSS 渐变占位 —— 绝不外链图片。替换渐变色标即可匹配你的品牌。
- 用户名 + handle: 加粗的名字 (`NevoFlux`)、蓝色 verified 勾 SVG, 以及 `@nevoflux` handle。时间戳保持简短 (`14 小时`)。
- 正文段落: 推文文案, 17px。把链接、hashtag 和产品名 (`GBrain`、`Canvas 应用`) 包进 `style="color:#1d9bf0"` 以套用 X 蓝强调色。
- 来源行: 正文下方那行灰色小字 `2026/05/11 · X for Web`。
- 互动 row: 四个 icon 按钮配格式化的数字 (回复 482 / 转推 1.2K / 点赞 12.3K / 浏览量 2.1M)。始终格式化为 1.2K / 4.5M, 不用原始数字。点赞数染成粉色以示"已赞"; 其余 hover 时变色。
- 所有 icon 均为 X 官方风格的内联 SVG; 保持卡片单文件、无外部 URL。
