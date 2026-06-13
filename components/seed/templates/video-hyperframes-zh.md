---
slug: packs/design-pack/templates/video-hyperframes-zh
type: template
lang: zh
category: video
title: "Hyperframes 视频脚本"
title_en: "NevoFlux Hyperframes Video"
description: "Hyperframes / Remotion 兼容的连续帧动画, 可自动播放 - 一段电影感的 NevoFlux 故事脚本, 可直接渲染成 mp4。"
tags: [video, hyperframes, remotion, 视频, 模板]
sample_image: packs/design-pack/assets/templates/video-hyperframes.svg
source: html-anything/video-hyperframes
---

## 设计指导

意图
- 一段简短、电影感的视频脚本, 以一连串全屏帧来讲述。每一帧只承载一个镜头 / 一个概念, 自动播放, 并保持 Remotion / Hyperframes 可渲染, 之后可转成 mp4。

布局
- 输出 N 个连续 `<section class="frame">`, 每个 `1920×1080` (满屏)。N 由【用户内容】的信息密度决定 - 短脚本 6-10 帧起步, 长脚本应更多, 每帧只承载一个镜头 / 概念。
- 每帧表达一个镜头 / 概念: 文字 + 视觉构图 (中央构图 / 黄金分割 / 三分法)。
- 第 1 帧是 hook (一个数据 / 一个反常识 / 一个问题), 第 2-N 帧是论证, 最后一帧是结论 + CTA。
- 角落显示一条进度条, 左上角显示帧序号 / 计数器。

设计细节
- 字号巨大 (`text-9xl` 级别标题), 一帧一句话即可, 不要堆砌。
- 配色统一一套电影感: 深色背景 + 1 个霓虹强调色, 克制使用。
- 顶部一段 JavaScript 自动播放: 每隔几秒切换到下一帧 (每帧的 `data-duration`), 也支持点击 / 方向键控制, 以及播放-暂停切换。
- 每帧底部加隐藏标记注释供后续渲染读取, 文件最后包含一段 `<!-- HYPERFRAMES_META: ... -->` JSON, 含每帧 `duration` / `transition` / `scene` 概要, 用于后续转 Remotion。
- 完全自包含: 无媒体文件, 渐变与光晕全部用纯 CSS。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>Hyperframes · NevoFlux 故事脚本</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;800;900&family=Noto+Sans+SC:wght@600;700;900&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  body { margin:0; background:#000; font-family:'Inter Tight','Noto Sans SC',sans-serif; color:#fff; -webkit-font-smoothing:antialiased; }
  .frame { position:fixed; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:96px; opacity:0; transition:opacity 0.6s ease; pointer-events:none; }
  .frame.active { opacity:1; pointer-events:auto; }
  .grid-bg::before { content:""; position:absolute; inset:0; opacity:0.08; background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px); background-size:64px 64px; }
  .glow { position:absolute; width:1000px; height:1000px; border-radius:50%; filter:blur(180px); pointer-events:none; }
  .num { position:absolute; top:48px; left:48px; font-family:'JetBrains Mono',monospace; font-size:14px; letter-spacing:0.18em; opacity:0.55; }
  .controls { position:fixed; bottom:32px; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:14px; padding:10px 18px; border-radius:999px; background:rgba(255,255,255,0.06); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.12); font-family:'JetBrains Mono',monospace; font-size:12px; z-index:50; }
  .controls button { background:none; border:none; color:#fff; cursor:pointer; opacity:0.7; }
  .controls button:hover { opacity:1; }
  .progress { position:fixed; top:0; left:0; height:3px; background:#e9b94a; transition:width 0.2s linear; z-index:50; }
  h1 { font-family:'Inter Tight',sans-serif; font-weight:900; line-height:0.95; letter-spacing:-0.04em; margin:0; text-align:center; }
  .hook  h1 { font-size:160px; }
  .em    { font-family:Georgia,serif; font-style:italic; font-weight:700; color:#e9b94a; }
  .label { font-size:14px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase; opacity:0.55; margin-bottom:32px; }
</style>
</head>
<body>

<div class="progress" id="progress" style="width:0%"></div>

<section class="frame active hook" data-duration="3000">
  <div class="num">FRAME 01 / 08 · HOOK</div>
  <div class="glow" style="background:#c96442; top:-200px; left:-200px"></div>
  <div class="label">观察</div>
  <h1>你 80% 的标签页,<br/>都是<span class="em">死掉的上下文</span>。</h1>
</section>

<section class="frame" data-duration="3000">
  <div class="num">FRAME 02 / 08</div>
  <h1 style="font-size:128px">不是因为<br/><span class="em">你读得太多</span>。</h1>
</section>

<section class="frame" data-duration="3000">
  <div class="num">FRAME 03 / 08</div>
  <h1 style="font-size:128px">是因为没有东西<br/>帮你 <span class="em">记住</span>。</h1>
</section>

<section class="frame" data-duration="4000">
  <div class="num">FRAME 04 / 08</div>
  <div class="label" style="color:#e9b94a">解</div>
  <h1 style="font-size:140px">NevoFlux 把网页,<br/>变成你的<span class="em">知识库</span>。</h1>
</section>

<section class="frame grid-bg" data-duration="4000">
  <div class="num">FRAME 05 / 08</div>
  <div class="label">三件套</div>
  <h1 style="font-size:88px; max-width:24ch">
    浏览器 = <span style="color:#c96442">GBrain</span><br/>
    + <span style="color:#e9b94a">Canvas 应用</span><br/>
    + <span style="color:#6c3aa6">Agent SDK</span>
  </h1>
</section>

<section class="frame" data-duration="5000">
  <div class="num">FRAME 06 / 08</div>
  <div class="glow" style="background:#e9b94a; bottom:-300px; right:-200px"></div>
  <h1 style="font-size:120px">一个 <span class="em">浏览器</span><br/>负责索引、回忆、<br/>还能动手做。</h1>
</section>

<section class="frame" data-duration="5000">
  <div class="num">FRAME 07 / 08</div>
  <div class="label" style="color:#e9b94a">行动</div>
  <h1 style="font-size:160px"><span class="em">包 + 设计技能,</span><br/>一个快捷键:<br/><span style="font-family:'JetBrains Mono',monospace; font-style:normal; color:#fff">⌘+Enter</span></h1>
</section>

<section class="frame" data-duration="3000">
  <div class="num">FRAME 08 / 08 · CTA</div>
  <div class="glow" style="background:#c96442; top:50%; left:50%; transform:translate(-50%,-50%); opacity:0.6"></div>
  <h1 style="font-size:96px">现在试试 NevoFlux →</h1>
  <div style="font-family:'JetBrains Mono',monospace; font-size:24px; margin-top:36px; opacity:0.85">nevoflux.app/get-started</div>
</section>

<div class="controls">
  <button id="prev" title="上一帧">‹</button>
  <button id="play" title="播放 / 暂停">⏸</button>
  <button id="next" title="下一帧">›</button>
  <span id="counter" style="opacity:0.55">01 / 08</span>
</div>

<!-- HYPERFRAMES_META: {"frames":[
  {"i":1,"duration":3000,"transition":"fade","scene":"Hook: 你 80% 的标签页都是死掉的上下文"},
  {"i":2,"duration":3000,"transition":"fade","scene":"不是因为你读得太多"},
  {"i":3,"duration":3000,"transition":"fade","scene":"是因为没有东西帮你记住"},
  {"i":4,"duration":4000,"transition":"fade","scene":"NevoFlux 把网页变成知识库"},
  {"i":5,"duration":4000,"transition":"fade","scene":"浏览器 = GBrain + Canvas 应用 + Agent SDK"},
  {"i":6,"duration":5000,"transition":"fade","scene":"一个浏览器负责索引、回忆、动手做"},
  {"i":7,"duration":5000,"transition":"fade","scene":"包 + 设计技能, ⌘+Enter"},
  {"i":8,"duration":3000,"transition":"fade","scene":"CTA: nevoflux.app/get-started"}
]} -->

<script>
const frames = Array.from(document.querySelectorAll('.frame'));
const total = frames.length;
const counter = document.getElementById('counter');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
let i = 0;
let playing = true;
let frameStart = Date.now();
let timer;

function show(n) {
  i = (n + total) % total;
  frames.forEach((f,k)=>f.classList.toggle('active', k===i));
  counter.textContent = String(i+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
  frameStart = Date.now();
  if (playing) schedule();
}
function schedule() {
  clearTimeout(timer);
  const d = Number(frames[i].dataset.duration) || 3000;
  timer = setTimeout(()=> show(i+1), d);
}
function tick() {
  const d = Number(frames[i].dataset.duration) || 3000;
  const pct = Math.min(1, (Date.now()-frameStart)/d) * 100;
  progress.style.width = pct + '%';
  requestAnimationFrame(tick);
}
document.getElementById('prev').onclick = ()=>show(i-1);
document.getElementById('next').onclick = ()=>show(i+1);
playBtn.onclick = ()=> { playing=!playing; playBtn.textContent = playing?'⏸':'▶'; if(playing){schedule(); frameStart=Date.now();} else clearTimeout(timer); };
document.addEventListener('keydown', e => {
  if (e.key==='ArrowRight') show(i+1);
  else if (e.key==='ArrowLeft') show(i-1);
  else if (e.key===' ') { e.preventDefault(); playBtn.click(); }
});
show(0);
tick();
</script>
</body>
</html>
```

## 用法

- 帧数量: 每个镜头输出一个 `<section class="frame">`。短脚本 6-10 帧起步, 长脚本再加 - 一帧一个想法, 别写成段落。
- `.num` (左上角): 帧序号 / 总数, 如 `FRAME 01 / 08`, 可附角色标签 (`HOOK`、`CTA`)。
- 第 01 帧 `.hook`: 开场 - 一个数据或一个反常识结论。保留 `.em` 强调词制造冲击。
- 第 02-03 帧: 张力 / 问题段落 (`不是因为… / 是因为…`)。
- 第 04 帧 `.label` (强调色): 转折 - 把 NevoFlux 作为解法引入。
- 第 05 帧 `.grid-bg`: "三件套" 公式, 三个强调色 (`#c96442` / `#e9b94a` / `#6c3aa6`) 对应 GBrain / Canvas 应用 / Agent SDK。
- 第 06-07 帧: 收益 + 行动段落 (`包 + 设计技能` 与 `⌘+Enter` 快捷键)。
- 第 08 帧 `.cta`: 收尾 - 一句简短的行动召唤 + 一个自包含的 URL 字符串 (不用链接元素)。
- 每帧的 `data-duration` (毫秒) 驱动自动切换与顶部进度条; 同样的数值要镜像写进 `<!-- HYPERFRAMES_META: … -->` JSON, 让后续 Remotion 渲染保持同步。
- 控制: `‹ / ⏸ / ›` 以及方向键和空格 (播放/暂停) 已在 JS 中接好 - 原样保留。所有光晕与网格均为纯 CSS, 无外部资源。
