---
slug: packs/design-pack/templates/vfx-text-cursor-zh
type: template
lang: zh
category: video
title: "VFX 文字光标"
title_en: "NevoFlux VFX Text Cursor Frame"
description: "视频开场 / Hero 帧, 光标逐字打出一句 NevoFlux 金句, 配闪烁光标、二元像散伪影与定向光斑。"
tags: [vfx, text, cursor, chromatic, reveal, frame, 模板]
sample_image: packs/design-pack/assets/templates/vfx-text-cursor.svg
source: html-anything/vfx-text-cursor
---

## 设计指导

意图
- 视频开场 / Hero 帧 —— 光标在画布上"打字", 文字逐字浮现, 后面拖着彩色像散尾迹 + 定向光斑。用来在片头逐字揭示一句 NevoFlux 金句。

画布
- 1920×1080 (16:9), 背景用暗哑黑 `#06070a` 或 `#0a0d12` (带暖偏蓝); 加微妙 vignette 暗角。

内容
- 一句金句 (中英不限), 居中, 字号 6-8vw, weight 700, 字体 `Inter Tight` / `Source Sans 3` / `Noto Sans SC`。
- 逐字揭示, 每个字符 80ms 间隔; 当前字符后面跟着一个光标 `▍` (或细 vertical bar)。
- 已揭示文字默认白色 `#f5f5f7`, opacity 1; 即将揭示位置加 chromatic ghost: 一份 `text-shadow: 2px 0 #ff3b6f, -2px 0 #00d4ff`, 在 reveal 瞬间出现, 200ms 内收敛回正常。
- 光标本身: 16px 宽矩形, 颜色 = accent (取 1: hot pink `#ff3b6f` / cyan `#00d4ff` / amber `#ffb547`), 闪烁 `@keyframes` 1.0s 周期; 后面拖一条 60-120px 的 motion blur trail (径向渐变到透明)。

光斑 / 射线
- 在打字位置附近随机生成 3-5 道定向光斑 (light leak): 用 `linear-gradient(45deg, transparent, accent20, transparent)` 的细长矩形 + `mix-blend-mode: screen`, 不规则角度。
- 当文字打完, 整段文字加 0.5s shimmer sweep (光带横扫)。

字段
- 顶部 caption (大写, letterspace 0.18em, 11px, opacity 0.5): 例如 `FRAME 01 · OPENING`。
- 文字底下副标 (24-28px, opacity 0.6): 来源 / 章节。
- 右下角 timecode (`00:03:21`, mono)。

设计细节
- 绝不用多色彩虹 chromatic; 只用一组二元像散 (一个 hot pink `#ff3b6f` + 一个 cyan `#00d4ff`), 不要 R/G/B 全色。
- 字体: 西文 `Inter Tight` Bold; 中文 `Noto Sans SC` Bold; 严禁衬线。
- 动效用 `@keyframes` + JS 计时器 (`setTimeout` 逐字), 可被 `prefers-reduced-motion` 关闭 (直接显示所有字)。
- 必须用真实金句; 不要捏造。
- 单文件 HTML, 除链接字体外不引入任何外部资源。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux VFX 文字光标 · 开场</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700;800;900&family=Noto+Sans+SC:wght@400;700;900&family=JetBrains+Mono&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Noto Sans SC',system-ui,sans-serif; background:#06070a; color:#f5f5f7; margin:0; min-height:100vh; overflow:hidden; position:relative; }
  .vignette { position:absolute; inset:0; background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.8) 100%); z-index:1; }
  .grain { position:absolute; inset:0; opacity:0.06; mix-blend-mode:overlay; pointer-events:none; z-index:2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); }
  .mono { font-family:'JetBrains Mono',ui-monospace,monospace; }
  .chip { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; }
  @keyframes blink { 0%, 50% { opacity:1 } 51%, 100% { opacity:0 } }
  .cursor { display:inline-block; width:18px; height:1.05em; background:#ff3b6f; margin-left:6px; vertical-align:text-bottom; animation: blink 1s steps(1) infinite;
    box-shadow: 0 0 24px #ff3b6f, 0 0 8px #ff3b6f, 60px 0 80px rgba(255,59,111,0.6); }
  .chroma {
    text-shadow:
      3px 0 #00d4ff,
      -3px 0 #ff3b6f,
      0 0 40px rgba(255,59,111,0.3);
  }
  .text-line { position:relative; }
  /* directional light leaks */
  .ray { position:absolute; mix-blend-mode:screen; pointer-events:none; z-index:1; }
  .ray-1 { top:30%; left:-10%; width:60%; height:6px; transform:rotate(-12deg); background:linear-gradient(90deg, transparent, rgba(255,59,111,0.6), transparent); filter: blur(8px); }
  .ray-2 { top:55%; right:-10%; width:50%; height:4px; transform:rotate(15deg); background:linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent); filter: blur(6px); }
  .ray-3 { top:70%; left:10%; width:40%; height:3px; transform:rotate(-8deg); background:linear-gradient(90deg, transparent, rgba(255,181,71,0.5), transparent); filter: blur(5px); }
</style>
</head>
<body class="flex flex-col items-center justify-center relative">

  <header class="absolute top-12 left-12 right-12 flex items-baseline justify-between chip opacity-50 z-10 mono">
    <span>FRAME 01 · OPENING</span>
    <span>NEVOFLUX · TEXT CURSOR</span>
    <span>00:03:21</span>
  </header>

  <!-- light rays -->
  <div class="ray ray-1"></div>
  <div class="ray ray-2"></div>
  <div class="ray ray-3"></div>

  <main class="relative z-10 text-center max-w-[1280px] px-12">
    <h1 class="chroma font-black leading-[1.05] tracking-[-0.02em]" style="font-size:clamp(48px,7vw,108px)">
      浏览器不再是标签页坟场,<br/>
      <span style="color:#ff3b6f">GBrain</span> 把它<br/>
      变成你的知识库<span class="cursor"></span>
    </h1>
    <p class="mt-10 text-[22px] opacity-60 font-medium">
      —— NevoFlux 设计包, 2026
    </p>
  </main>

  <div class="vignette"></div>
  <div class="grain"></div>

  <footer class="absolute bottom-12 left-12 right-12 flex items-baseline justify-between chip opacity-40 z-10 mono">
    <span>NEVOFLUX · VFX-TEXT-CURSOR</span>
    <span>HOT PINK × CYAN CHROMATIC</span>
    <span>REC ●</span>
  </footer>
</body>
</html>
```

## 用法

- `header` (顶部): 左侧 caption (`FRAME 01 · OPENING`), 中间帧标签 (`NEVOFLUX · TEXT CURSOR`), 右侧时间码。替换成你自己的片段信息。
- 主 `<h1>`: 要逐字打出的金句。保留 `.chroma` 制造二元像散伪影, 末尾的 `<span class="cursor">` 是闪烁光标。把一个关键词 (此处 `GBrain`) 用 hot pink `#ff3b6f` 高亮; 必须用真实文案, 不要占位符。按需调整换行 `<br/>`, 让逐字揭示收尾干净。
- 标题下副标 `<p>`: 来源 / 署名 / 章节 (此处 `NevoFlux 设计包, 2026`)。
- 三条 `.ray` 光斑 (hot pink、cyan、amber) 是不规则角度的装饰性定向射线; 可保留作纹理, 也可挪到打字位置附近。
- `footer`: 左侧产品标签, 中间像散配方说明, 右侧 `REC ●` 录制指示。
- `.vignette` 与 `.grain` 全是纯 CSS / 内联 SVG 噪点 —— 除链接字体外无任何外部资源。要做成真正"打字"的帧, 用 `setTimeout` 循环逐字揭示 `<h1>` 文字, 并在 `prefers-reduced-motion` 下退回一次性显示整句金句。
