---
slug: packs/design-pack/templates/frame-light-leak-cinema-zh
type: template
lang: zh
category: video
title: "胶片漏光电影帧"
title_en: "NevoFlux Light-Leak Cinematic Frame"
description: "胶片漏光 + 35mm 颗粒 + letterbox 的单帧电影封面，用于 NevoFlux 的开场镜头与章节卡。"
tags: [cinema, film, light-leak, grain, letterbox, frame, 模板]
sample_image: packs/design-pack/assets/templates/frame-light-leak-cinema.svg
source: html-anything/frame-light-leak-cinema
---

## 设计指导

胶片漏光电影帧：胶片漏光 + 35mm 颗粒 + 衬线大字，古典胶片质感。用作纪录片 / 个人短片 / 视频章节卡的开场单帧——暖橙漏光 + 35mm 颗粒 + 衬线大字。Inspired by hyperframes light-leak。

### 画布
- **2.39:1 letterbox**（推荐）：1920×800，上下黑边各 140px（`#000`）。
- 或 16:9：1920×1080，无 letterbox。

### 背景
- 底层：深暖色（深红棕 `#1a0d08` / 墨绿 `#0a1410` / 蓝紫 `#0d0e1a`）或场景描绘（CSS gradient 模拟天空 / 室内 / 室外）。
- **胶片漏光（Light Leak）**：2-3 个大 `radial-gradient(ellipse at top right, #ffb547 0%, transparent 50%)` + 1 个底部 `linear-gradient(to top, #d97757 0%, transparent 30%)`；颜色取暖橙 / 桃 / 玫红 / 暗黄，**不要冷蓝**。
- **35mm Grain**：全屏覆盖 SVG turbulence noise 图层，opacity 14%，`mix-blend-mode: overlay`；也可用 `background-image: url("data:image/svg+xml,...feTurbulence...")`。
- 可选：1 道 `feDisplacementMap` 模拟胶片摆动（慎用）。

### 文字
- 中央或左下：大字衬线（Source Serif Pro / Playfair Display / EB Garamond）5-8vw，weight 500 italic；颜色暖白 `#f5e9d6` 或 cream。
- 副标（24-28px）一行，opacity 0.7，同样衬线。
- 角落 caption（uppercase letterspace 0.18em，10-11px，mono，opacity 0.5）："REEL 03 · CH I · 1985"。
- 底部 timecode + 拍摄地 + 日期（mono，opacity 0.4）。

### 可选附加
- "胶片划痕"：几条 1-2px 竖向白线，opacity 0.2，不规则间距（用 `box-shadow` 多重 inset 或多个 `<div>`）。
- "胶片齿孔"：letterbox 黑边内，等距小白方块（CSS `repeating-linear-gradient`）。
- 入场动效：整画面从 underexposed（brightness 0.3）→ normal，800ms 内；漏光位置缓慢漂移 12s 一个周期。

### 设计细节
- 颜色绝不超过 4 个色相（深背景 + 2 个暖漏光色 + 文字 cream）。
- 严禁：蓝紫漏光（违反胶片质感）、emoji、霓虹色、几何 dashboard 装饰。
- 中文：`Noto Serif SC` italic 不存在 → 用 `Noto Serif SC` regular + 字距加大。
- 必须用用户提供的标题；自动估算合理"年份 / 章节 / 地点"元数据（但来源用用户内容）。
- 单文件 HTML，用 `prefers-reduced-motion` 关动效。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 胶片漏光电影帧 · REEL 03</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Source+Serif+Pro:ital,wght@0,400;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Source Serif Pro','Noto Serif SC',Georgia,serif; background:#000; margin:0; min-height:100vh; }
  .frame {
    position:relative; width:100%; max-width:1600px; aspect-ratio: 2.39 / 1; margin:0 auto;
    background:#1a0d08;
    overflow:hidden;
  }
  .scene {
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse at 78% 18%, #ffb547 0%, transparent 38%),
      radial-gradient(ellipse at 90% 30%, #ff7e3f 0%, transparent 30%),
      linear-gradient(180deg, transparent 60%, #d97757 110%),
      radial-gradient(ellipse at 30% 60%, #2a1410 0%, transparent 60%),
      linear-gradient(135deg, #1a0d08 0%, #28140c 50%, #0a0502 100%);
  }
  .grain { position:absolute; inset:0; opacity:0.14; mix-blend-mode:overlay; pointer-events:none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"); }
  /* scratches */
  .scratch { position:absolute; top:0; bottom:0; width:1px; background:#f5e9d6; opacity:0.18; }
  .vignette { position:absolute; inset:0; background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.6) 100%); }
  .perfs {
    position:absolute; left:0; right:0; height:6px;
    background-image: repeating-linear-gradient(90deg, #f5e9d6 0 8px, transparent 8px 24px);
    opacity:0.5;
  }
  .cream { color:#f5e9d6; }
  .mono { font-family:'IBM Plex Mono',monospace; }
  .display { font-family:'EB Garamond','Noto Serif SC',serif; }
  .chip { font-size:10.5px; letter-spacing:0.22em; text-transform:uppercase; }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-6" style="background:#000">
  <div class="frame">
    <div class="scene"></div>

    <!-- scratches -->
    <div class="scratch" style="left:14%;height:38%"></div>
    <div class="scratch" style="left:42%;height:60%;top:20%;opacity:0.12"></div>
    <div class="scratch" style="left:71%;height:30%;top:55%"></div>

    <!-- letterbox bars - actually built into aspect ratio container; perfs on top -->

    <!-- top caption -->
    <header class="absolute top-6 left-10 right-10 flex items-baseline justify-between chip mono cream opacity-70 z-10">
      <span>REEL 03 · CH I · MMXXVI</span>
      <span>GBrain 上线的那一年</span>
      <span>00:03:21</span>
    </header>

    <!-- main text -->
    <main class="absolute z-10 cream" style="left:8%; bottom:18%; max-width:60%">
      <div class="chip mono opacity-70">Reel III · 标题</div>
      <h1 class="display mt-3 leading-[1.05] font-medium" style="font-size:clamp(40px,5.5vw,84px); color:#f5e9d6; letter-spacing:0.08em">
        我们上线<br/>
        <span>NevoFlux</span> 的那一年。
      </h1>
      <p class="display mt-4 opacity-80 text-[22px]" style="letter-spacing:0.06em">
        一部关于会记忆的浏览器的短片，共十四卷。
      </p>
    </main>

    <!-- bottom right meta -->
    <footer class="absolute bottom-6 left-10 right-10 flex items-baseline justify-between chip mono cream opacity-50 z-10">
      <span>NEVOFLUX · GBRAIN BUILD 0.9</span>
      <span>CAPTURED IN CANVAS · PROXY 1080P</span>
      <span>FRAME · LIGHT-LEAK-CINEMA</span>
    </footer>

    <div class="grain"></div>
    <div class="vignette"></div>
  </div>
</body>
</html>
```

## 用法

- **顶部 caption（header）**：三个 mono 槽位——左为 卷号/章节/年份 元数据，中为工作标题或集名（此处"GBrain 上线的那一年"），右为 timecode。
- **标题区（main）**：kicker chip（"Reel III · 标题"）、衬线大字主标题（你的 NevoFlux 标题），以及一行副标。中文不用 italic，改为 `letter-spacing` 字距加大。
- **footer**：三个 mono 槽位——左为版本号或地点，中为拍摄媒介说明，右为 frame/template id。保持小写数据感，opacity 0.5。
- **装饰**：`.scratch`、`.grain`、`.vignette` 为纯装饰，保留不动，只替换可见文字。
- 颜色控制在 4 个色相内，勿加冷蓝漏光或 emoji。仅替换文案，CSS 与结构保持不变。
