---
slug: packs/design-pack/templates/deck-tech-sharing-zh
type: template
lang: zh
category: slides
title: "技术分享 Deck"
title_en: "NevoFlux Tech Sharing Deck"
description: "GitHub-dark 暗色工程分享 Deck，JetBrains Mono 终端代码块，含 agenda 与 Q&A，面向 NevoFlux 内部技术分享。"
tags: [tech talk, conference, engineering, 模板]
sample_image: packs/design-pack/assets/templates/deck-tech-sharing.svg
source: html-anything/deck-tech-sharing
---

## 设计指导

面向工程内部分享或会议 talk 的 deck，整体偏代码、暗色风格。

### 布局
- Cover（议题 + 讲者 + handle）。
- Agenda 页。
- 正文页若干（代码块 + 关键观点）。
- Demo 页（terminal 截图）。
- Q&A 页。

### 设计细节
- GitHub-dark 配色 + JetBrains Mono：背景 `#0d1117`，卡面 `#161b22` / `#1c2230`，正文 `#e6edf3` / `#8b949e`，强调色 `#7ee787`（绿）、`#79c0ff`（蓝）、`#ff7b72`（红）、`#d2a8ff`（紫）。
- kicker 使用 JetBrains Mono，前缀一个 `>` 提示符；分节标签写成文件名样式（`agenda.toml`、`mini-runtime.ts`）。
- 终端卡片带窗口标题栏：三个红黄绿圆点 + 文件名；代码用 `.kw` / `.fn` / `.str` / `.cmt` / `.num` 这几个 span 着色。
- Agenda 行是虚线分隔的 mono 行：绿色序号 + 议题 + 时长。
- 16:9 比例。单文件自包含，无外链——所有图形都用 CSS 渐变或内联标记实现。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>NevoFlux 如何调度 Agent 任务 · Tech Sharing</title>
<style>/* html-ppt :: shared webfonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@200;300;400;500;600;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

</style>
<style>/* html-ppt :: base.css — reset + shared tokens + layout primitives */
/* Default tokens. Themes in assets/themes/*.css override the :root block. */
:root {
  --bg: #ffffff;
  --bg-soft: #f7f7f8;
  --surface: #ffffff;
  --surface-2: #f2f2f4;
  --border: rgba(0,0,0,.08);
  --border-strong: rgba(0,0,0,.16);
  --text-1: #111216;
  --text-2: #55596a;
  --text-3: #8a8f9e;
  --accent: #3b6cff;
  --accent-2: #7a5cff;
  --accent-3: #ff5c8a;
  --good: #1aaf6c;
  --warn: #f5a524;
  --bad:  #e0445a;
  --grad: linear-gradient(135deg,#3b6cff,#7a5cff 55%,#ff5c8a);
  --grad-soft: linear-gradient(135deg,#eef2ff,#f5ecff 55%,#ffeef5);
  --radius: 18px;
  --radius-sm: 12px;
  --radius-lg: 26px;
  --shadow: 0 10px 30px rgba(18,24,40,.08), 0 2px 6px rgba(18,24,40,.04);
  --shadow-lg: 0 24px 60px rgba(18,24,40,.14), 0 6px 16px rgba(18,24,40,.06);
  --font-sans: 'Inter','Noto Sans SC',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  --font-serif: 'Playfair Display','Noto Serif SC',Georgia,serif;
  --font-mono: 'JetBrains Mono','IBM Plex Mono',SFMono-Regular,Menlo,monospace;
  --font-display: var(--font-sans);
  --letter-tight: -.03em;
  --letter-normal: -.01em;
  --ease: cubic-bezier(.4,0,.2,1);
}

*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--bg);color:var(--text-1);
  font-family:var(--font-sans);font-weight:400;line-height:1.6;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  letter-spacing:var(--letter-normal)}
img,svg,video{max-width:100%;display:block}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
code,kbd,pre,samp{font-family:var(--font-mono)}

/* ================= SLIDE SYSTEM ================= */
.deck{position:relative;width:100vw;height:100vh;overflow:hidden;background:var(--bg)}
.slide{
  position:absolute;inset:0;
  display:flex;flex-direction:column;justify-content:center;
  padding:72px 96px;
  box-sizing:border-box;
  opacity:0;pointer-events:none;
  transition:opacity .5s var(--ease), transform .5s var(--ease);
  transform:translateX(30px);
  overflow:hidden;
}
.slide.is-active{opacity:1;pointer-events:auto;transform:translateX(0);z-index:2}
.slide.is-prev{transform:translateX(-30px)}

/* single-page standalone (used when a layout file is opened directly) */
body.single .slide{position:relative;width:100vw;height:100vh;opacity:1;transform:none;pointer-events:auto}

/* ================= TYPOGRAPHY ================= */
.eyebrow{font-size:13px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--text-3)}
.kicker{font-size:14px;font-weight:600;color:var(--accent);letter-spacing:.08em;text-transform:uppercase}
h1.title,.h1{font-family:var(--font-display);font-size:72px;line-height:1.05;font-weight:800;letter-spacing:var(--letter-tight);margin:0 0 18px;color:var(--text-1)}
h2.title,.h2{font-family:var(--font-display);font-size:54px;line-height:1.1;font-weight:700;letter-spacing:var(--letter-tight);margin:0 0 14px}
h3,.h3{font-size:32px;line-height:1.2;font-weight:600;letter-spacing:var(--letter-normal);margin:0 0 10px}
h4,.h4{font-size:22px;line-height:1.3;font-weight:600;margin:0 0 8px}
.lede{font-size:22px;line-height:1.55;color:var(--text-2);font-weight:300;max-width:62ch}
.dim{color:var(--text-2)}
.dim2{color:var(--text-3)}
.mono{font-family:var(--font-mono)}
.serif{font-family:var(--font-serif)}
.gradient-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}

/* ================= LAYOUT PRIMITIVES ================= */
.stack>*+*{margin-top:14px}
.row{display:flex;gap:24px;align-items:center}
.row.wrap{flex-wrap:wrap}
.grid{display:grid;gap:24px}
.g2{grid-template-columns:repeat(2,1fr)}
.g3{grid-template-columns:repeat(3,1fr)}
.g4{grid-template-columns:repeat(4,1fr)}
.center{display:flex;align-items:center;justify-content:center;text-align:center}
.fill{flex:1}
.sp-t{padding-top:24px}.sp-b{padding-bottom:24px}
.mt-s{margin-top:8px}.mt-m{margin-top:18px}.mt-l{margin-top:32px}
.mb-s{margin-bottom:8px}.mb-m{margin-bottom:18px}.mb-l{margin-bottom:32px}

/* ================= CARDS ================= */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:26px 28px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.card-soft{background:var(--surface-2);border:1px solid var(--border)}
.card-outline{background:transparent;border:1.5px solid var(--border-strong);box-shadow:none}
.card-accent{background:var(--surface);border-top:3px solid var(--accent)}
.card-hover{transition:transform .3s var(--ease),box-shadow .3s var(--ease)}
.card-hover:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}

.pill{display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:500;
  background:var(--surface-2);color:var(--text-2);border:1px solid var(--border)}
.pill-accent{background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent);border-color:color-mix(in srgb,var(--accent) 28%,transparent)}

/* ================= BARS / DIVIDERS ================= */
.divider{height:1px;background:var(--border);width:100%}
.divider-accent{height:3px;width:72px;background:var(--accent);border-radius:2px}

/* ================= CHROME (header/footer/progress) ================= */
.deck-header{position:absolute;top:24px;left:40px;right:40px;display:flex;align-items:center;justify-content:space-between;
  font-size:12px;color:var(--text-3);letter-spacing:.12em;text-transform:uppercase;z-index:10;pointer-events:none}
.deck-footer{position:absolute;bottom:24px;left:40px;right:40px;display:flex;align-items:center;justify-content:space-between;
  font-size:12px;color:var(--text-3);z-index:10;pointer-events:none}
.slide-number::before{content:attr(data-current)}
.slide-number::after{content:" / " attr(data-total)}
.progress-bar{position:fixed;left:0;right:0;bottom:0;height:3px;background:transparent;z-index:20}
.progress-bar > span{display:block;height:100%;width:0;background:var(--accent);transition:width .3s var(--ease)}

/* ================= PRESENTER / OVERVIEW ================= */
.notes{display:none!important}
.notes-overlay{position:fixed;inset:auto 0 0 0;max-height:42vh;background:rgba(20,22,30,.95);color:#e8ebf4;
  padding:20px 32px;font-size:16px;line-height:1.6;border-top:1px solid rgba(255,255,255,.1);transform:translateY(100%);
  transition:transform .3s var(--ease);z-index:40;overflow:auto;font-family:var(--font-sans)}
.notes-overlay.open{transform:translateY(0)}
.overview{position:fixed;inset:0;background:rgba(10,12,18,.92);backdrop-filter:blur(12px);z-index:50;
  display:none;padding:40px;overflow:auto}
.overview.open{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-content:start}
.overview .thumb{background:var(--surface);border:1px solid var(--border);border-radius:12px;
  aspect-ratio:16/9;overflow:hidden;cursor:pointer;position:relative;color:var(--text-1);padding:16px;
  font-size:11px;transition:transform .2s var(--ease)}
.overview .thumb:hover{transform:scale(1.04)}
.overview .thumb .n{position:absolute;top:8px;left:10px;font-weight:700;font-size:14px;color:var(--text-3)}
.overview .thumb .t{position:absolute;bottom:10px;left:14px;right:14px;font-weight:600;color:var(--text-1)}

/* ================= PRESENTER VIEW ================= */
/* Presenter view opens in a separate popup window (S key).
 * All presenter styles are self-contained in the popup HTML generated by runtime.js.
 * The audience window (this file) is NOT affected — it stays as normal deck view.
 * Only the .notes class below is needed to hide speaker notes from audience. */

/* ================= UTILITY ================= */
.hidden{display:none!important}
.nowrap{white-space:nowrap}
.tr{text-align:right}.tc{text-align:center}.tl{text-align:left}
.uppercase{text-transform:uppercase;letter-spacing:.12em}

/* ================= PRINT ================= */
@media print{
  .slide{position:relative;opacity:1!important;transform:none!important;page-break-after:always;height:100vh}
  .deck-header,.deck-footer,.progress-bar,.notes-overlay,.overview{display:none!important}
}

</style>
<style>/* html-ppt :: animations.css
 * Apply by adding class="anim-<name>" or data-anim="<name>".
 * Durations are deliberately snappy; tweak --anim-dur per element.
 */
:root{--anim-dur:.7s;--anim-ease:cubic-bezier(.4,0,.2,1)}

/* ---------- FADE DIRECTIONALS ---------- */
@keyframes kf-fade-up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
@keyframes kf-fade-down{from{opacity:0;transform:translateY(-32px)}to{opacity:1;transform:none}}
@keyframes kf-fade-left{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
@keyframes kf-fade-right{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
.anim-fade-up{animation:kf-fade-up var(--anim-dur) var(--anim-ease) both}
.anim-fade-down{animation:kf-fade-down var(--anim-dur) var(--anim-ease) both}
.anim-fade-left{animation:kf-fade-left var(--anim-dur) var(--anim-ease) both}
.anim-fade-right{animation:kf-fade-right var(--anim-dur) var(--anim-ease) both}

/* ---------- RISE / DROP / ZOOM / BLUR / GLITCH ---------- */
@keyframes kf-rise{from{opacity:0;transform:translateY(60px) scale(.97);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes kf-drop{from{opacity:0;transform:translateY(-60px) scale(.97)}to{opacity:1;transform:none}}
@keyframes kf-zoom{0%{opacity:0;transform:scale(.6)}60%{transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}
@keyframes kf-blur{from{opacity:0;filter:blur(18px)}to{opacity:1;filter:none}}
@keyframes kf-glitch{0%{opacity:0;transform:translateX(0);clip-path:inset(0 0 0 0)}
  20%{opacity:1;transform:translateX(-6px);clip-path:inset(20% 0 30% 0)}
  40%{transform:translateX(4px);clip-path:inset(50% 0 10% 0)}
  60%{transform:translateX(-3px);clip-path:inset(10% 0 60% 0)}
  80%{transform:translateX(2px);clip-path:inset(0 0 0 0)}
  100%{opacity:1;transform:none}}
.anim-rise-in{animation:kf-rise .9s var(--anim-ease) both}
.anim-drop-in{animation:kf-drop .8s var(--anim-ease) both}
.anim-zoom-pop{animation:kf-zoom .7s cubic-bezier(.22,1.3,.36,1) both}
.anim-blur-in{animation:kf-blur .8s var(--anim-ease) both}
.anim-glitch-in{animation:kf-glitch .8s steps(5,end) both}

/* ---------- TYPEWRITER ---------- */
.anim-typewriter{display:inline-block;overflow:hidden;white-space:nowrap;border-right:2px solid currentColor;
  width:0;animation:kf-type 2.4s steps(40,end) forwards, kf-caret 1s step-end infinite}
@keyframes kf-type{to{width:100%}}
@keyframes kf-caret{50%{border-color:transparent}}

/* ---------- GLOW / SHIMMER / GRADIENT-FLOW ---------- */
@keyframes kf-neon{0%,100%{text-shadow:0 0 8px var(--accent),0 0 20px var(--accent)}
  50%{text-shadow:0 0 16px var(--accent),0 0 40px var(--accent),0 0 80px var(--accent)}}
.anim-neon-glow{animation:kf-neon 2s ease-in-out infinite}

.anim-shimmer-sweep{position:relative;overflow:hidden}
.anim-shimmer-sweep::after{content:"";position:absolute;inset:0;
  background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);
  transform:translateX(-100%);animation:kf-shimmer 2.4s var(--anim-ease) infinite}
@keyframes kf-shimmer{to{transform:translateX(100%)}}

.anim-gradient-flow{background:linear-gradient(90deg,var(--accent),var(--accent-2,var(--accent)),var(--accent-3,var(--accent)),var(--accent));
  background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;
  animation:kf-gradflow 4s linear infinite}
@keyframes kf-gradflow{to{background-position:300% 0}}

/* ---------- STAGGER LIST ---------- */
.anim-stagger-list > *{opacity:0;animation:kf-rise .65s var(--anim-ease) both}
.anim-stagger-list > *:nth-child(1){animation-delay:.05s}
.anim-stagger-list > *:nth-child(2){animation-delay:.15s}
.anim-stagger-list > *:nth-child(3){animation-delay:.25s}
.anim-stagger-list > *:nth-child(4){animation-delay:.35s}
.anim-stagger-list > *:nth-child(5){animation-delay:.45s}
.anim-stagger-list > *:nth-child(6){animation-delay:.55s}
.anim-stagger-list > *:nth-child(7){animation-delay:.65s}
.anim-stagger-list > *:nth-child(8){animation-delay:.75s}
.anim-stagger-list > *:nth-child(n+9){animation-delay:.85s}

/* ---------- COUNTER-UP (JS-driven, marker class only) ---------- */
.counter{font-variant-numeric:tabular-nums}

/* ---------- SVG PATH DRAW ---------- */
.anim-path-draw path,.anim-path-draw line,.anim-path-draw polyline,.anim-path-draw circle,.anim-path-draw rect{
  stroke-dasharray:1000;stroke-dashoffset:1000;animation:kf-draw 2s var(--anim-ease) forwards}
@keyframes kf-draw{to{stroke-dashoffset:0}}

/* ---------- PARALLAX TILT (hover) ---------- */
.anim-parallax-tilt{transform-style:preserve-3d;transition:transform .4s var(--anim-ease)}
.anim-parallax-tilt:hover{transform:perspective(900px) rotateX(6deg) rotateY(-8deg) translateZ(10px)}

/* ---------- CARD FLIP 3D ---------- */
@keyframes kf-flip{from{transform:perspective(1200px) rotateY(-90deg);opacity:0}
  to{transform:perspective(1200px) rotateY(0);opacity:1}}
.anim-card-flip-3d{animation:kf-flip .9s var(--anim-ease) both;transform-style:preserve-3d;backface-visibility:hidden}

/* ---------- CUBE ROTATE 3D ---------- */
@keyframes kf-cube{from{transform:perspective(1200px) rotateX(20deg) rotateY(-90deg) translateZ(-200px);opacity:0}
  to{transform:perspective(1200px) rotateX(0) rotateY(0) translateZ(0);opacity:1}}
.anim-cube-rotate-3d{animation:kf-cube 1s var(--anim-ease) both}

/* ---------- PAGE TURN 3D ---------- */
@keyframes kf-pageturn{from{transform:perspective(1600px) rotateY(-85deg);transform-origin:left center;opacity:0}
  to{transform:perspective(1600px) rotateY(0);opacity:1}}
.anim-page-turn-3d{animation:kf-pageturn 1s var(--anim-ease) both;transform-origin:left center}

/* ---------- PERSPECTIVE ZOOM ---------- */
@keyframes kf-pzoom{from{opacity:0;transform:perspective(1400px) translateZ(-400px) rotateX(12deg)}
  to{opacity:1;transform:none}}
.anim-perspective-zoom{animation:kf-pzoom 1s var(--anim-ease) both}

/* ---------- MARQUEE SCROLL ---------- */
.anim-marquee-scroll{display:flex;gap:48px;white-space:nowrap;animation:kf-marquee 20s linear infinite}
@keyframes kf-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ---------- KEN BURNS ---------- */
@keyframes kf-kenburns{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.15) translate(-2%,-1%)}}
.anim-kenburns{animation:kf-kenburns 14s ease-in-out infinite alternate}

/* ---------- CONFETTI BURST (pseudo — pure CSS sparkles) ---------- */
.anim-confetti-burst{position:relative}
.anim-confetti-burst::before,.anim-confetti-burst::after{
  content:"";position:absolute;top:50%;left:50%;width:8px;height:8px;border-radius:50%;
  background:var(--accent);box-shadow:
    20px -30px 0 var(--accent-2,var(--accent)),-25px -20px 0 var(--accent-3,var(--accent)),
    30px 20px 0 var(--good,#1aaf6c),-30px 25px 0 var(--warn,#f5a524),
    40px -10px 0 var(--bad,#e0445a),-45px 0 0 var(--accent),
    10px 40px 0 var(--accent-2,var(--accent)),-15px -40px 0 var(--accent-3,var(--accent));
  opacity:0;animation:kf-confetti 1.2s var(--anim-ease) forwards}
.anim-confetti-burst::after{animation-delay:.15s;transform:rotate(45deg)}
@keyframes kf-confetti{0%{opacity:0;transform:scale(.2)}30%{opacity:1}100%{opacity:0;transform:scale(2.2)}}

/* ---------- SPOTLIGHT ---------- */
@keyframes kf-spot{0%{clip-path:circle(0% at 50% 50%)}100%{clip-path:circle(140% at 50% 50%)}}
.anim-spotlight{animation:kf-spot 1.1s var(--anim-ease) both}

/* ---------- MORPH SHAPE (SVG) ---------- */
.anim-morph-shape path{animation:kf-morph 6s ease-in-out infinite alternate}
@keyframes kf-morph{0%{d:path("M60,120 Q120,20 180,120 T300,120")}
  100%{d:path("M60,120 Q120,220 180,120 T300,120")}}

/* ---------- RIPPLE REVEAL ---------- */
@keyframes kf-ripple{0%{clip-path:circle(0% at 20% 80%);opacity:.4}
  100%{clip-path:circle(160% at 20% 80%);opacity:1}}
.anim-ripple-reveal{animation:kf-ripple 1.2s var(--anim-ease) both}

/* reduced motion */
@media (prefers-reduced-motion: reduce){
  [class*="anim-"]{animation:none!important;transition:none!important}
}

</style>
<style>/* tech-sharing — 技术分享 dark, code-forward */
.tpl-tech-sharing{
  --bg:#0d1117;--bg-soft:#161b22;--surface:#161b22;--surface-2:#1c2230;
  --border:rgba(139,148,158,.22);--border-strong:rgba(139,148,158,.4);
  --text-1:#e6edf3;--text-2:#8b949e;--text-3:#6e7681;
  --accent:#7ee787;--accent-2:#79c0ff;--accent-3:#ff7b72;
  --grad:linear-gradient(120deg,#7ee787 0%,#79c0ff 60%,#d2a8ff 100%);
  --radius:14px;--radius-lg:20px;
  --shadow:0 20px 60px rgba(0,0,0,.5);
  font-family:'Inter','Noto Sans SC',sans-serif;
}
.tpl-tech-sharing{background:#0d1117;color:var(--text-1)}
.tpl-tech-sharing .slide{padding:72px 96px;background:#0d1117;color:var(--text-1)}
.tpl-tech-sharing .slide::before{content:"";position:absolute;inset:0;background:
  radial-gradient(60% 50% at 90% 10%,rgba(121,192,255,.12),transparent 60%),
  radial-gradient(50% 50% at 10% 90%,rgba(126,231,135,.08),transparent 60%);
  pointer-events:none;z-index:0}
.tpl-tech-sharing .slide>*{position:relative;z-index:1}
.tpl-tech-sharing .h1{font-size:78px;line-height:1.03;font-weight:800;letter-spacing:-.03em;color:#fff}
.tpl-tech-sharing .h2{font-size:54px;font-weight:700;letter-spacing:-.025em;color:#fff}
.tpl-tech-sharing h3,.tpl-tech-sharing h4{color:#fff}
.tpl-tech-sharing .kicker{color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;text-transform:none;letter-spacing:.02em}
.tpl-tech-sharing .kicker::before{content:"> "}
.tpl-tech-sharing .mono{font-family:'JetBrains Mono','IBM Plex Mono',monospace}
.tpl-tech-sharing .terminal{background:#010409;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:'JetBrains Mono',monospace;font-size:15px;line-height:1.65}
.tpl-tech-sharing .terminal .bar{display:flex;align-items:center;gap:8px;padding:12px 16px;background:#161b22;border-bottom:1px solid var(--border);font-size:12px;color:var(--text-3)}
.tpl-tech-sharing .terminal .dot{width:12px;height:12px;border-radius:50%;background:#ff5f56}
.tpl-tech-sharing .terminal .dot:nth-child(2){background:#ffbd2e}
.tpl-tech-sharing .terminal .dot:nth-child(3){background:#27c93f}
.tpl-tech-sharing .terminal pre{margin:0;padding:24px 28px;color:#e6edf3;overflow:auto;max-height:440px}
.tpl-tech-sharing .kw{color:#ff7b72}
.tpl-tech-sharing .fn{color:#d2a8ff}
.tpl-tech-sharing .str{color:#a5d6ff}
.tpl-tech-sharing .cmt{color:#8b949e;font-style:italic}
.tpl-tech-sharing .num{color:#79c0ff}
.tpl-tech-sharing .card{background:var(--surface);border:1px solid var(--border);box-shadow:none}
.tpl-tech-sharing .card-accent{border-top:3px solid var(--accent)}
.tpl-tech-sharing .pill{background:var(--surface-2);color:var(--text-2);border-color:var(--border)}
.tpl-tech-sharing .pill-accent{background:rgba(126,231,135,.12);color:var(--accent);border-color:rgba(126,231,135,.35)}
.tpl-tech-sharing .tag{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:12px;background:var(--surface-2);border:1px solid var(--border);color:var(--text-2)}
.tpl-tech-sharing .agenda-row{display:flex;align-items:baseline;gap:24px;padding:18px 0;border-bottom:1px dashed var(--border);font-family:'JetBrains Mono',monospace}
.tpl-tech-sharing .agenda-row .num{color:var(--accent);flex:none;width:48px}
.tpl-tech-sharing .agenda-row .t{color:#fff;font-size:24px;flex:1;font-family:'Inter',sans-serif;font-weight:600}
.tpl-tech-sharing .agenda-row .d{color:var(--text-3);font-size:13px}
.tpl-tech-sharing .speaker{display:flex;align-items:center;gap:14px;margin-top:28px}
.tpl-tech-sharing .speaker .av{width:56px;height:56px;border-radius:50%;background:var(--grad)}
.tpl-tech-sharing .speaker b{display:block;color:#fff;font-size:18px}
.tpl-tech-sharing .speaker span{color:var(--text-3);font-size:13px;font-family:'JetBrains Mono',monospace}
.tpl-tech-sharing .lede{color:var(--text-2)}

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-tech-sharing">
<div class="deck">

  <!-- 1. Cover -->
  <section class="slide" data-title="Cover">
    <p class="kicker">tech-sharing / 2026-04-15</p>
    <h1 class="h1 anim-fade-up" data-anim="fade-up">NevoFlux 里<br>Agent 到底<span style="background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent">先干什么</span>?</h1>
    <p class="lede mt-m">从一次 <span class="mono">GBrain</span> 检索，到它构建出的 Canvas 应用,把 agent 循环讲清楚。</p>
    <div class="speaker"><div class="av"></div><div><b>@lewis</b><span>browser platform · 45 min + Q&amp;A</span></div></div>
    <div class="deck-footer"><span class="mono">#nevoflux #agent #gbrain</span><span class="slide-number" data-current="1" data-total="8"></span></div>
  </section>

  <!-- 2. Agenda -->
  <section class="slide" data-title="Agenda">
    <p class="kicker">agenda.toml</p>
    <h2 class="h2">今天的路线图</h2>
    <div class="stack mt-l">
      <div class="agenda-row"><span class="num">01</span><span class="t">Context: 浏览器为什么需要 agent</span><span class="d">~5min</span></div>
      <div class="agenda-row"><span class="num">02</span><span class="t">Deep dive 1: GBrain 与检索</span><span class="d">~12min</span></div>
      <div class="agenda-row"><span class="num">03</span><span class="t">Deep dive 2: agent 调度器</span><span class="d">~15min</span></div>
      <div class="agenda-row"><span class="num">04</span><span class="t">Code: 约 40 行写一个 Canvas 应用</span><span class="d">~8min</span></div>
      <div class="agenda-row"><span class="num">05</span><span class="t">Takeaways + Q&amp;A</span><span class="d">~5min</span></div>
    </div>
  </section>

  <!-- 3. Context -->
  <section class="slide" data-title="Context">
    <p class="kicker">// context</p>
    <h2 class="h2">问题：光靠一个对话框,<br>驱动不了整个浏览器。</h2>
    <div class="grid g3 mt-l">
      <div class="card card-accent"><h4>一次性 prompt</h4><p class="dim">问一次返回一段文字。不记得你的标签页,也没法在页面上动手。</p><span class="tag mt-s">❌ 太浅</span></div>
      <div class="card card-accent"><h4>写死的脚本宏</h4><p class="dim">网站一改版,脚本点击就崩。又脆又难维护。</p><span class="tag mt-s">😩 太脆</span></div>
      <div class="card card-accent"><h4>Agent + GBrain</h4><p class="dim">读你本地的知识库,规划步骤,边跑边构建 Canvas 应用。</p><span class="tag mt-s">✅ NevoFlux 选这个</span></div>
    </div>
  </section>

  <!-- 4. Deep dive 1 -->
  <section class="slide" data-title="Deep Dive 1">
    <p class="kicker">deep-dive · 1 / 2</p>
    <h2 class="h2">GBrain 其实就一个方法。</h2>
    <div class="grid g2 mt-l" style="align-items:start">
      <div>
        <p class="lede">你保存的一切——页面、笔记、packs——都会在本地 <span class="mono">GBrain</span> 里变成向量。Agent 只做一件事:<span class="mono">recall</span> 出最相关的片段,再据此作答。</p>
        <div class="mt-l">
          <span class="tag">embed(doc)</span> <span class="tag">recall(query)</span> <span class="tag">ground(answer)</span>
        </div>
      </div>
      <div class="terminal">
        <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span>gbrain.ts</span></div>
<pre><span class="kw">export interface</span> <span class="fn">GBrain</span> {
    <span class="fn">embed</span>(doc: Doc): Promise&lt;Vector&gt;;
    <span class="fn">recall</span>(
        query: <span class="kw">string</span>,
        k: <span class="kw">number</span>,
    ): Promise&lt;Chunk[]&gt;;
}

<span class="cmt">// recall() → 本地 top-k 片段,不走云端</span>
<span class="cmt">// ground() → 答案引用这些片段</span></pre>
      </div>
    </div>
  </section>

  <!-- 5. Deep dive 2 -->
  <section class="slide" data-title="Deep Dive 2">
    <p class="kicker">deep-dive · 2 / 2</p>
    <h2 class="h2">Agent 是个小小的任务调度器。</h2>
    <div class="grid g2 mt-l" style="align-items:start">
      <div>
        <p class="lede">Agent 循环 = 一个步骤队列。每个 tick 取出下一步,调用一个工具,再把结果喂回计划,直到目标完成。</p>
        <div class="stack mt-m">
          <div class="tag">✦ step queue · 256 slots</div>
          <div class="tag">✦ tool registry (read · click · build)</div>
          <div class="tag">✦ 每次规划前先 GBrain recall</div>
          <div class="tag">✦ 给实时应用留的 Canvas slot</div>
        </div>
      </div>
      <div class="card" style="padding:32px">
        <h4 class="mono" style="color:var(--accent-2)">agent tick loop</h4>
        <div class="stack mt-m" style="font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.9;color:var(--text-2)">
          <div><span style="color:var(--accent)">1.</span> 取出下一个已规划的步骤</div>
          <div><span style="color:var(--accent)">2.</span> 否则从 GBrain 检索上下文</div>
          <div><span style="color:var(--accent)">3.</span> 否则调用工具 (read / click / build)</div>
          <div><span style="color:var(--accent)">4.</span> 否则渲染进 Canvas 应用</div>
          <div><span style="color:var(--accent)">5.</span> 否则停下来,问用户</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Code example -->
  <section class="slide" data-title="Code">
    <p class="kicker">canvas-app.ts · ~40 LOC</p>
    <h2 class="h2">一个 agent 能构建的 Canvas 应用。</h2>
    <div class="terminal mt-m">
      <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span>src/app.ts</span></div>
<pre><span class="kw">import</span> { defineCanvas, useGBrain } <span class="kw">from</span> <span class="str">"@nevoflux/sdk"</span>;

<span class="kw">export default</span> <span class="fn">defineCanvas</span>({
    title: <span class="str">"阅读清单"</span>,
    <span class="kw">async</span> <span class="fn">setup</span>(ctx) {
        <span class="kw">const</span> brain = <span class="fn">useGBrain</span>(ctx);
        <span class="kw">const</span> items = <span class="kw">await</span> brain.<span class="fn">recall</span>(<span class="str">"本周保存的"</span>, <span class="num">12</span>);
        <span class="kw">return</span> { items };
    },
    <span class="fn">render</span>({ items }) {
        <span class="kw">return</span> items.<span class="fn">map</span>((it) =&gt; <span class="fn">Card</span>(it.title)); <span class="cmt">// 整个应用就这些</span>
    },
});</pre>
    </div>
  </section>

  <!-- 7. Takeaways -->
  <section class="slide" data-title="Takeaways">
    <p class="kicker">// takeaways</p>
    <h2 class="h2">三件事带回去。</h2>
    <div class="grid g3 mt-l">
      <div class="card card-accent"><h4>1 · GBrain 留在本地</h4><p class="dim">向量与检索都在你的浏览器里跑。没有云端 key,数据不出本机。</p></div>
      <div class="card card-accent"><h4>2 · 计划就是脉搏</h4><p class="dim">Agent 不盲目行动;每个 tick 都从新鲜的 GBrain 上下文重新规划。</p></div>
      <div class="card card-accent"><h4>3 · Canvas 才是输出</h4><p class="dim">别堆一坨纯文本。让 agent 用 <span class="mono">defineCanvas</span> 直接搭一个真应用。</p></div>
    </div>
    <p class="lede mt-l">延伸阅读:<span class="mono">docs.nevoflux.app/agent-loop</span> · <span class="mono">docs.nevoflux.app/gbrain</span></p>
  </section>

  <!-- 8. Q&A -->
  <section class="slide center tc" data-title="Q and A">
    <div>
      <div class="mono" style="font-size:120px;color:var(--accent);font-weight:800;letter-spacing:-.04em">?</div>
      <h2 class="h2">Questions?</h2>
      <p class="lede" style="margin:14px auto">github.com/nevoflux · @lewis on slack</p>
      <div class="row mt-l" style="justify-content:center">
        <span class="tag">slides: git.co/nf-deck</span>
        <span class="tag">code: git.co/nf-canvas</span>
      </div>
    </div>
  </section>

</div>

</body></html>
```

## 用法

填好以下分节与槽位;保持所有 CSS、类名、尺寸与结构不变——只替换可见文字。

- Cover(第 1 页):`.kicker` 是 `tech-sharing / 日期` 标记;`.h1` 是 talk 标题(把关键词包进渐变 `span` 里高亮);`.lede` 是一行副标题;`.speaker` 块放 handle、团队与时长;`.deck-footer` 放话题标签与 `data-current` / `data-total`。
- Agenda(第 2 页):设置 `agenda.toml` kicker、页面标题,每个议题一行 `.agenda-row`(序号 / 议题 / 时长)。
- Context(第 3 页):一句框定问题的标题,加三张 `.card.card-accent` 选项卡,每张以一个 `.tag` 结论收尾。
- Deep dive(第 4-5 页):左栏是文字讲解 + 内联 `.tag` 小标签;右栏是 `.terminal` 代码块或 `.card` 步骤列表。代码用 `.kw` / `.fn` / `.str` / `.cmt` / `.num` 这几个 span 着色。
- Code(第 6 页):一整宽的 `.terminal`,窗口标题栏里写文件名。
- Takeaways(第 7 页):三张 `.card.card-accent` 卡片,外加一行 `.lede` 延伸阅读。
- Q&A(第 8 页):居中的 `?` 字符、一个标题、你的联系方式,以及指向 slides / code 链接的 `.tag` 小标签。
