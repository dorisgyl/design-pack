---
slug: packs/design-pack/templates/video-hyperframes
type: template
lang: en
category: video
title: "NevoFlux Hyperframes Video"
title_zh: "Hyperframes 视频脚本"
description: "A Hyperframes / Remotion-compatible sequential-frame animation that auto-plays - a cinematic NevoFlux story script ready to render to mp4."
tags: [video, hyperframes, remotion, 视频, template]
sample_image: packs/design-pack/assets/templates/video-hyperframes.svg
source: html-anything/video-hyperframes
---

## Design guidance

Intent
- A short, cinematic video script told as a run of full-screen frames. Each frame carries exactly one shot / one idea, auto-advances, and stays Remotion / Hyperframes-renderable so it can become an mp4 later.

Layout
- Output N sequential `<section class="frame">` elements, each `1920×1080` (full viewport). N is driven by the information density of your content - short scripts start at 6-10 frames, longer scripts use more, and every frame holds only one shot / concept.
- Each frame expresses a single shot or concept: text plus a visual composition (centered / golden-ratio / rule-of-thirds).
- Frame 1 is the hook (one data point / one counter-intuitive claim / one question). Frames 2..N are the argument. The last frame is the conclusion plus a CTA.
- A small progress bar sits in a corner, and the frame index / counter shows in the top-left.

Design details
- Type is huge (`text-9xl`-scale headlines) - one sentence per frame, never a wall of text.
- One unified cinematic palette: a dark background plus a single neon accent color, used sparingly.
- A top-of-file JavaScript block auto-plays the deck: it advances to the next frame every few seconds (per-frame `data-duration`), and also supports click / arrow-key control plus a play-pause toggle.
- Each frame ends with a hidden marker comment for downstream rendering, and the file closes with a single `<!-- HYPERFRAMES_META: ... -->` JSON block carrying each frame's `duration` / `transition` / `scene` summary, used to convert to Remotion.
- Fully self-contained: no media files, gradients and glows are pure CSS.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Hyperframes · NevoFlux story</title>
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
  <div class="label">Observation</div>
  <h1>80% of your browser tabs<br/>are <span class="em">dead context</span>.</h1>
</section>

<section class="frame" data-duration="3000">
  <div class="num">FRAME 02 / 08</div>
  <h1 style="font-size:128px">Not because<br/><span class="em">you read too much</span>.</h1>
</section>

<section class="frame" data-duration="3000">
  <div class="num">FRAME 03 / 08</div>
  <h1 style="font-size:128px">But because nothing<br/><span class="em">remembers</span> it.</h1>
</section>

<section class="frame" data-duration="4000">
  <div class="num">FRAME 04 / 08</div>
  <div class="label" style="color:#e9b94a">The fix</div>
  <h1 style="font-size:140px">NevoFlux turns pages<br/>into a <span class="em">knowledge base</span>.</h1>
</section>

<section class="frame grid-bg" data-duration="4000">
  <div class="num">FRAME 05 / 08</div>
  <div class="label">The stack</div>
  <h1 style="font-size:88px; max-width:24ch">
    Browser = <span style="color:#c96442">GBrain</span><br/>
    + <span style="color:#e9b94a">Canvas apps</span><br/>
    + <span style="color:#6c3aa6">the agent SDK</span>
  </h1>
</section>

<section class="frame" data-duration="5000">
  <div class="num">FRAME 06 / 08</div>
  <div class="glow" style="background:#e9b94a; bottom:-300px; right:-200px"></div>
  <h1 style="font-size:120px">One <span class="em">browser</span><br/>indexes, recalls,<br/>and builds.</h1>
</section>

<section class="frame" data-duration="5000">
  <div class="num">FRAME 07 / 08</div>
  <div class="label" style="color:#e9b94a">Action</div>
  <h1 style="font-size:160px"><span class="em">Packs + skills,</span><br/>one shortcut:<br/><span style="font-family:'JetBrains Mono',monospace; font-style:normal; color:#fff">⌘+Enter</span></h1>
</section>

<section class="frame" data-duration="3000">
  <div class="num">FRAME 08 / 08 · CTA</div>
  <div class="glow" style="background:#c96442; top:50%; left:50%; transform:translate(-50%,-50%); opacity:0.6"></div>
  <h1 style="font-size:96px">Try NevoFlux →</h1>
  <div style="font-family:'JetBrains Mono',monospace; font-size:24px; margin-top:36px; opacity:0.85">nevoflux.app/get-started</div>
</section>

<div class="controls">
  <button id="prev" title="Previous frame">‹</button>
  <button id="play" title="Play / pause">⏸</button>
  <button id="next" title="Next frame">›</button>
  <span id="counter" style="opacity:0.55">01 / 08</span>
</div>

<!-- HYPERFRAMES_META: {"frames":[
  {"i":1,"duration":3000,"transition":"fade","scene":"Hook: 80% of your tabs are dead context"},
  {"i":2,"duration":3000,"transition":"fade","scene":"Not because you read too much"},
  {"i":3,"duration":3000,"transition":"fade","scene":"But because nothing remembers it"},
  {"i":4,"duration":4000,"transition":"fade","scene":"NevoFlux turns pages into a knowledge base"},
  {"i":5,"duration":4000,"transition":"fade","scene":"Browser = GBrain + Canvas apps + agent SDK"},
  {"i":6,"duration":5000,"transition":"fade","scene":"One browser indexes, recalls, and builds"},
  {"i":7,"duration":5000,"transition":"fade","scene":"Packs + skills, ⌘+Enter"},
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

## Usage

- Frame count: emit one `<section class="frame">` per shot. Start at 6-10 frames for a short script and add more for longer ones - one idea per frame, never a paragraph.
- `.num` (top-left): the frame index / total, e.g. `FRAME 01 / 08`, with an optional role tag (`HOOK`, `CTA`).
- Frame 01 `.hook`: the opener - one data point or counter-intuitive claim. Keep the `.em` accent word for the punch.
- Frames 02-03: the tension / problem beats (`Not because… / But because…`).
- Frame 04 `.label` (accent): the turn - introduce NevoFlux as the fix.
- Frame 05 `.grid-bg`: the "stack" formula, the three accent colors (`#c96442` / `#e9b94a` / `#6c3aa6`) mapping to GBrain / Canvas apps / agent SDK.
- Frames 06-07: payoff plus the action beat (`Packs + skills` and the `⌘+Enter` shortcut).
- Frame 08 `.cta`: the close - a short call to action plus a self-contained URL string (no link element).
- `data-duration` (ms) on each frame drives auto-advance and the top progress bar; mirror the same values in the `<!-- HYPERFRAMES_META: … -->` JSON so a downstream Remotion render stays in sync.
- Controls: `‹ / ⏸ / ›` plus arrow-keys and space (play/pause) are wired in the JS - leave them intact. All glows and grids are pure CSS, no external assets.
