---
slug: packs/design-pack/templates/social-reddit-card-zh
type: template
lang: zh
category: card
title: "Reddit 帖子卡"
title_en: "Reddit Post Card"
description: "拟真 Reddit 帖子卡 + 上下投票 + 评论数, 适合视频叠加 / 故事分享。"
tags: [reddit, social, card, overlay, story, 模板]
sample_image: packs/design-pack/assets/templates/social-reddit-card.svg
source: html-anything/social-reddit-card
---

## 设计指导

**模板: Reddit 帖子卡**

**意图.** 把一段故事 / 提问 / 段子, 渲染成 Reddit 帖子卡片, 用于视频叠加、社媒故事分享。Inspired by hyperframes reddit-post。

**画布.** 1280×720 (视频叠加) 或 800×600 (单卡分享); 背景透明或暗色 `#0b1416`。

**卡片结构.**
- 外框: 圆角 16px, bg 白 `#ffffff` (light) 或 `#1a1a1b` (dark, 推荐 video overlay), border 1px `#edeff1` / `#343536`。
- 左侧 **vote rail** (40-56px 宽):
  - 上箭头 ▲ (16px, `#878a8c`, hover 变橙 `#ff4500`)。
  - 票数 (Inter, 17px, weight 700, 居中, 颜色: 0 灰 / 正橙 / 负蓝); 大数字用 `12.3k` 格式。
  - 下箭头 ▼ (hover 变蓝 `#7193ff`)。
- 主体区:
  - 顶部 meta row: 子版块图标 (CSS 圆形 + 字母) + `r/subreddit` (粗) + `· Posted by u/username · 3h` (小字灰)。
  - **标题** (Inter / IBM Plex Sans, 22-28px, weight 500, dark text)。
  - 内容: 16px body 或 引用块或 1 张图 (CSS 渐变占位)。
  - 底部 action row: 💬 `1.2k Comments` · 🏆 Awards · ⤴️ Share · ⋯ icon。
- 顶部右上角 Reddit Snoo logo (内联 SVG, 橙色 `#ff4500`)。

**字体.**
- 主: `IBM Plex Sans` → fallback `Inter`, weight 400/500/700。
- 数字: 同主字体。
- 中文: `Noto Sans SC`。

**设计细节.**
- Light mode: bg `#fff`, text `#1c1c1c`, secondary `#7c7c7c`。
- Dark mode (推荐): bg `#1a1a1b`, text `#d7dadc`, secondary `#818384`, border `#343536`。
- 票数颜色: 正 = `#ff4500`, 负 = `#7193ff`, 0 = `#878a8c`。
- 标题点击区可加微妙背景 hover。
- 严禁外链图片; 图片占位用 CSS 渐变 + 描述。
- 必须用用户提供的内容; 自动生成合理的 subreddit / username / 票数。
- 单文件 HTML; icon 内联 SVG (上下箭头、评论气泡、奖杯)。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>Reddit Post · r/NevoFlux</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'IBM Plex Sans','Noto Sans SC',system-ui,sans-serif; background: radial-gradient(circle at 30% 20%, #1a2026 0%, #050507 80%); }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-12">
  <article class="w-[720px] rounded-2xl flex" style="background:#1a1a1b;border:1px solid #343536;box-shadow:0 30px 60px -20px rgba(0,0,0,0.6)">
    <!-- vote rail -->
    <aside class="w-12 py-4 flex flex-col items-center gap-1.5 shrink-0" style="background:#161617;border-right:1px solid #343536;border-top-left-radius:1rem;border-bottom-left-radius:1rem">
      <button class="text-[#878a8c] hover:text-[#ff4500]"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M12 4l8 10h-5v6h-6v-6H4z"/></svg></button>
      <span class="font-bold text-[15px]" style="color:#ff4500">12.3k</span>
      <button class="text-[#878a8c] hover:text-[#7193ff]"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M12 20l-8-10h5V4h6v6h5z"/></svg></button>
    </aside>
    <!-- body -->
    <div class="flex-1 p-5 min-w-0" style="color:#d7dadc">
      <!-- meta -->
      <div class="flex items-center gap-2 text-[12px]" style="color:#818384">
        <div class="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style="background:#ff4500">r/</div>
        <span class="font-bold" style="color:#d7dadc">r/NevoFlux</span>
        <span>·</span>
        <span>Posted by u/canvas_builder · 4小时前</span>
        <span class="ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded" style="background:#272729;color:#d7dadc">今日学到</span>
      </div>
      <!-- title -->
      <h1 class="mt-3 text-[22px] font-medium leading-snug" style="color:#d7dadc">今日学到: NevoFlux 浏览器在生成 Canvas 应用前, 会先读完我整个 GBrain 知识库</h1>
      <!-- body -->
      <p class="mt-3 text-[15px] leading-relaxed" style="color:#d7dadc">
        我把一年的会议记录和需求文档全塞进了 GBrain, 然后让 NevoFlux 里的智能体"做一个 Canvas 应用, 帮我把没拍板的决策都列出来"。它精准地拉到了相关上下文, 顺手用 SDK 接好, 一次就跑出了一个能用的 pack。
      </p>
      <p class="mt-3 text-[15px] leading-relaxed" style="color:#d7dadc">少切几十个标签页, 多发几个版本。design-pack 我愿意再装一次, 10/10。</p>
      <!-- actions -->
      <div class="mt-4 flex items-center gap-3 text-[12.5px] font-semibold" style="color:#818384">
        <button class="flex items-center gap-1.5 hover:text-[#d7dadc] px-2 py-1 rounded hover:bg-[#272729]">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4l4 4 4-4h4a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
          <span>1.2k 评论</span>
        </button>
        <button class="flex items-center gap-1.5 hover:text-[#d7dadc] px-2 py-1 rounded hover:bg-[#272729]">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/></svg>
          <span>7 奖章</span>
        </button>
        <button class="flex items-center gap-1.5 hover:text-[#d7dadc] px-2 py-1 rounded hover:bg-[#272729]">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M18 8a3 3 0 11-2.83-3H15l-7 4-1.17-1A3 3 0 113 11l5-3-4-3a3 3 0 11.83-1.83L9 6l7-4z"/></svg>
          <span>分享</span>
        </button>
        <button class="ml-auto px-2 py-1 rounded hover:bg-[#272729]">⋯</button>
      </div>
    </div>
  </article>
</body>
</html>
```

## 用法

- **Vote rail (投票栏)** — 设置票数及颜色 (`#ff4500` 正 / `#7193ff` 负 / `#878a8c` 零); 大数字用 `12.3k` 简写格式。
- **Meta row (元信息行)** — 填写子版块 (`r/NevoFlux`)、发帖人 (`u/username`)、时间, 以及小标签徽章 (`今日学到`、`讨论` 等)。
- **标题** — 帖子主标题, 是整张卡片的核心。
- **正文段落** — 一段或多段短文; 需要时可换成引用块或 CSS 渐变图片占位。
- **Action row (操作行)** — 评论数、奖章、分享, 以及末尾的 `⋯` 更多按钮; 指标数值可自行调整。
- 保持单文件、内联 SVG 图标、无外链图片 URL。
