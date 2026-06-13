---
slug: packs/design-pack/templates/frame-macos-notification-zh
type: template
lang: zh
category: card
title: "macOS 通知横幅"
title_en: "NevoFlux macOS Notification Banner"
description: "拟真 macOS 磨砂玻璃通知横幅，含 app icon、标题与正文，适合视频角标叠加与发布预告。"
tags: [macos, notification, banner, overlay, frame, 模板]
sample_image: packs/design-pack/assets/templates/frame-macos-notification.svg
source: html-anything/frame-macos-notification
---

## 设计指导

把一段公告 / 消息 / 提示渲染成 macOS Big Sur+ 风格的通知横幅，适合视频角落叠加、产品发布预告、社媒图。

画布 — 两种用法
- 视频叠加 1920x1080：通知放右上角，周围透明。
- 单独 banner 480x120：居中输出。

横幅结构
- 外框：圆角 14px（macOS Big Sur 标准），480x120（或更长 480x180 含正文），12-16px 内边距。
- 背景：**磨砂玻璃**效果 — `background: rgba(245,245,247,0.78)` 加 `backdrop-filter: blur(40px) saturate(180%)`；暗色版用 `rgba(28,28,30,0.78)`。
- 边框：1px `rgba(0,0,0,0.06)`（亮色）/ `rgba(255,255,255,0.08)`（暗色）；顶部加 1px 亮 highlight `rgba(255,255,255,0.5)`。
- 阴影：`0 10px 40px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)`。

内容
- 左侧：**App icon**（44x44，圆角 10px，CSS 渐变 + 1 个 emoji 或 monogram 字母，**不用外链图片**）。
- 中间：
  - 顶部 row：App 名（SF Pro 13px，weight 600）+ `now` 或具体时间（12px，opacity 0.6），两端对齐。
  - 标题（15px，weight 600，1 行截断）。
  - 正文（13px，weight 400，1-2 行截断，line-height 1.35）。
- 右侧（可选）：action button "Open" 或 "Reply"（胶囊形，浅灰底）。

字体
- 主：`SF Pro Text` → fallback `Inter` / `system-ui`；中文用 `PingFang SC` / `Noto Sans SC`。

可选附加
- 多条通知堆叠：第一条在前，后面 2 条向后向下递缩（scale 0.96 + opacity 0.6 + translateY）。
- 入场动效：从屏幕外右侧滑入 `transform: translateX(110%)→0`，200ms ease-out；可被 `prefers-reduced-motion` 关闭。
- 右上角控制 chip "Clear"（hover 显示，默认 opacity 0）。

设计细节
- 亮色模式背景白磨砂，暗色模式（推荐视频用）几乎黑磨砂。
- icon 不能用外链 emoji 图片，用 unicode emoji 或 CSS 绘制几何。
- 必须用用户提供的内容；标题 + 正文清晰来自用户输入。
- 单文件 HTML，注意 `backdrop-filter` 在 Safari 需要 `-webkit-` 前缀。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>macOS Notification · 构建完成</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body {
    font-family: 'Inter','Noto Sans SC','PingFang SC',system-ui,sans-serif;
    background:
      linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%),
      radial-gradient(circle at 80% 20%, rgba(255,200,150,0.3) 0%, transparent 50%);
    background-blend-mode: screen;
    min-height: 100vh;
  }
  .frost {
    background: rgba(28,28,30,0.78);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  @keyframes slideIn { from { transform: translateX(120%); opacity:0 } to { transform: translateX(0); opacity:1 } }
  .notif-1 { animation: slideIn .4s ease-out; }
  .notif-2 { transform: translateY(-12px) scale(0.96); opacity: 0.7; }
  .notif-3 { transform: translateY(-24px) scale(0.92); opacity: 0.4; }
</style>
</head>
<body class="flex flex-col items-end justify-start gap-3 p-12 text-white">
  <!-- top stacked notifs -->
  <div class="frost rounded-2xl w-[420px] p-3 flex gap-3 items-center notif-3">
    <div class="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl" style="background:linear-gradient(135deg,#6d5efc,#3a2fb8)">🧠</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between"><span class="text-[13px] font-semibold">GBrain</span><span class="text-[11px] opacity-60">2m ago</span></div>
      <div class="text-[12.5px] truncate opacity-80">已为知识库新增 24 个页面索引</div>
    </div>
  </div>
  <div class="frost rounded-2xl w-[420px] p-3 flex gap-3 items-center notif-2">
    <div class="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl" style="background:linear-gradient(135deg,#0f0f12,#2a2a35)">◧</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between"><span class="text-[13px] font-semibold">Canvas</span><span class="text-[11px] opacity-60">1m ago</span></div>
      <div class="text-[12.5px] truncate opacity-80">应用已发布 · 8 个文件已同步到工作区</div>
    </div>
  </div>
  <!-- main, in-focus notif -->
  <div class="frost rounded-2xl w-[420px] p-3 flex gap-3 items-center notif-1">
    <div class="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl shrink-0" style="background:linear-gradient(135deg,#ff7849,#d97757)">N</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <span class="text-[13px] font-semibold">NevoFlux</span>
        <span class="text-[11px] opacity-60">now</span>
      </div>
      <div class="text-[14px] font-semibold leading-tight mt-0.5">构建完成 · 设计包已安装</div>
      <div class="text-[12.5px] opacity-80 leading-snug mt-0.5">31.2 KB · 12 个设计技能 · 已在右侧预览面板渲染。点击打开 agent，一键发布到 Canvas。</div>
    </div>
    <button class="text-[11px] font-semibold px-2.5 py-1 rounded-full ml-1 shrink-0" style="background:rgba(255,255,255,0.12)">打开</button>
  </div>
</body>
</html>
```

## 用法

- App icon（每行左侧）：CSS 渐变方块 + 单个 emoji 或字母 monogram。按来源应用替换渐变与字符（GBrain、Canvas、NevoFlux 的 "N"）。
- App 名 + 时间（顶部 row）：发送应用名与相对时间，如 `now` 或 `2m ago`。
- 标题：通知的主标题，保持 1 行。
- 正文：1-2 行辅助说明 — 发生了什么、下一步做什么。
- action button（聚焦行右侧）：主操作，如 "打开" 或 "回复"；只要标题横幅时可移除。
- `.notif-1` 是聚焦横幅（滑入入场）；`.notif-2` / `.notif-3` 是其后递缩堆叠的横幅。只需单条横幅时去掉堆叠即可。
