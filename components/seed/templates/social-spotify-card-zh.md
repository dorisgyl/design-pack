---
slug: packs/design-pack/templates/social-spotify-card-zh
type: template
lang: zh
category: card
title: "Spotify 正在播放卡"
title_en: "NevoFlux Now-Playing Card"
description: "Spotify 风格的正在播放卡片(封面 + 进度条 + 播放控制),用于视频叠加和创作者首屏区。"
tags: [spotify, music, now-playing, card, overlay, 模板]
sample_image: packs/design-pack/assets/templates/social-spotify-card.svg
source: html-anything/social-spotify-card
---

## 设计指导

意图
- 把一首歌、一段播客、或一段个人介绍渲染成 Spotify 风格的正在播放卡片。它适合视频叠加、About 页面或创作者首屏。这里被改用于展示 NevoFlux:把浏览器、GBrain、Canvas 应用和 agent SDK 作为"正在播放"的"曲目"。

画布 - 两个尺寸
- 横版视频叠加:1280×720,卡片居中或浮动在左下角。
- 紧凑横条 widget:600×200,可嵌入到任何首屏。

卡片结构
- 外框:圆角 12-16px;背景用从专辑封面提取的暗色渐变(例如 `linear-gradient(135deg, #1e3264 0%, #0d1f3d 100%)`)或经典暗色 `#121212`;边缘有 1px 微妙的边框。
- 左侧:专辑封面用 CSS 渐变加上大字 monogram 或抽象几何描绘(绝不外链图片),圆角 6px,60-200px 方形。
- 右侧:
  - 顶部标签 `NOW PLAYING`(大写,字距 0.14em,11px,绿色 `#1DB954`)。
  - 歌名 / 标题(Inter / Spotify Circular,22-28px,weight 700,白色)。
  - 艺人 / 副标(16px,weight 400,opacity 0.7)。
  - 进度条:4px 高,圆角,灰色背景加白色 fill(`width: 38%`);两端时间戳如 `1:24 / 3:42`(mono,11px,灰)。
  - 控制行:上一首 / 播放-暂停 / 下一首图标(内联 SVG,24px,白色 fill),以及较小的随机播放 / 循环图标。
- 右上角:Spotify 风格 logo(内联 SVG,绿色 `#1DB954` 圆加三道白色波纹)。
- 可选:右下角小型音波动效(3 个 bar 由 `@keyframes` 驱动)。

字体
- 主:`Spotify Circular`,回退到 `Inter` / `Inter Tight`,weight 400 / 700。
- 数字:同一主字体,不要过度使用 mono。

设计细节
- 经典暗色模式:`#121212` 背景,`#1DB954` accent,`#b3b3b3` 次要文字。
- 若输入是纯文本/标题,把"标题"当作歌名,把"副标/作者"当作艺人,时长默认 3:42。
- 若输入是音乐相关,直接对应映射。
- 绝不外链图片;封面用 CSS 渐变加文字 logo 或几何描绘构建。
- 微动效:音波动效用 `@keyframes`,可被 `prefers-reduced-motion` 关闭。
- 单文件 HTML。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 正在播放 · GBrain</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif; background: radial-gradient(circle at 30% 30%, #1a1a1f 0%, #050507 70%); }
  .cover {
    background:
      radial-gradient(circle at 30% 25%, #ffb1c3 0%, transparent 40%),
      radial-gradient(circle at 75% 70%, #6b46c1 0%, transparent 50%),
      linear-gradient(135deg, #1e1247 0%, #2c0f3f 100%);
  }
  .bar { background: rgba(255,255,255,0.18); }
  .bar-fill { background: #fff; }
  @keyframes wave { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
  .wave i { display:inline-block; width:3px; margin-right:2px; background:#1DB954; transform-origin:bottom; animation: wave 1s ease-in-out infinite; }
  .wave i:nth-child(2){animation-delay:.15s} .wave i:nth-child(3){animation-delay:.3s} .wave i:nth-child(4){animation-delay:.45s}
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-12">
  <div class="w-[640px] rounded-2xl p-6 flex gap-5 items-stretch" style="background:linear-gradient(135deg,#1e3264 0%,#0d1f3d 100%);border:1px solid rgba(255,255,255,0.08);box-shadow:0 30px 60px -20px rgba(0,0,0,0.6)">
    <!-- album cover -->
    <div class="cover w-44 h-44 rounded-md flex flex-col justify-between p-4 shrink-0 relative overflow-hidden">
      <div class="text-[10px] uppercase tracking-[0.22em] text-white/70 font-semibold">NevoFlux</div>
      <div class="text-white">
        <div class="text-[22px] font-bold leading-tight">GBrain<br/>回忆</div>
        <div class="text-[10px] opacity-70 mt-1">知识库 · v2.6</div>
      </div>
    </div>
    <!-- right -->
    <div class="flex-1 flex flex-col justify-between min-w-0">
      <div>
        <div class="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold" style="color:#1DB954">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.52 17.36a.75.75 0 01-1.03.25c-2.83-1.73-6.4-2.12-10.6-1.16a.75.75 0 11-.34-1.46c4.6-1.05 8.55-.6 11.72 1.34.36.22.47.69.25 1.03zm1.47-3.27a.94.94 0 01-1.29.3c-3.24-1.99-8.17-2.57-12-1.4a.94.94 0 11-.55-1.8c4.4-1.34 9.83-.7 13.55 1.6.45.27.6.86.29 1.3zm.13-3.4c-3.88-2.3-10.3-2.51-14.01-1.4a1.13 1.13 0 11-.66-2.16c4.27-1.3 11.36-1.04 15.81 1.6a1.13 1.13 0 11-1.14 1.96z"/></svg>
          <span>正在播放</span>
          <span class="wave ml-auto h-3 flex items-end"><i></i><i></i><i></i><i></i></span>
        </div>
        <h1 class="mt-3 text-white text-2xl font-bold leading-tight">向你的浏览器提问任何事</h1>
        <p class="text-white/70 text-base mt-1">NevoFlux Agent · GBrain 知识库</p>
      </div>
      <div class="mt-4">
        <div class="flex items-center gap-3 text-[11px] font-mono text-white/60">
          <span>1:24</span>
          <div class="flex-1 h-[3px] rounded-full bar relative">
            <div class="bar-fill h-full rounded-full" style="width:38%"></div>
            <div class="absolute w-2.5 h-2.5 rounded-full bg-white" style="left:38%;top:50%;transform:translate(-50%,-50%);"></div>
          </div>
          <span>3:42</span>
        </div>
        <!-- controls -->
        <div class="flex items-center justify-between mt-4 text-white">
          <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-60" fill="currentColor"><path d="M10 17l-5-5 5-5v3h7v4h-7v3z"/></svg>
          <div class="flex items-center gap-5">
            <svg viewBox="0 0 24 24" class="w-5 h-5 opacity-80" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            <button class="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <svg viewBox="0 0 24 24" class="w-5 h-5 opacity-80" fill="currentColor"><path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z"/></svg>
          </div>
          <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-60" fill="currentColor"><path d="M19 7v4l5-5-5-5v3a8 8 0 00-8 8 8 8 0 008 8v-2a6 6 0 010-12z"/></svg>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

## 用法

- `cover`(左侧):专辑封面图块。替换顶部标签(产品包 / 产品名)、大字 monogram 标题和小字说明行;保持为纯 CSS 渐变,不使用外链图片。
- `正在播放` 标签:绿色状态行;与右侧的 `.wave` 动效音波条搭配。
- `h1` 标题:即"曲目"——这里是 NevoFlux 的某个功能或能力标题。
- 副标段落:即"艺人"行——功能背后的界面或系统(agent、GBrain、Canvas、SDK)。
- 进度条:在 `.bar-fill` 上设置 `width`,并把手柄的 `left` 设为相同百分比;按需更新起止时间戳。
- 控制行:随机播放 / 上一首 / 播放-暂停 / 下一首 / 循环图标都是内联 SVG;保持原样以呈现播放控制外观。
