---
slug: packs/design-pack/templates/deck-course-module-zh
type: template
lang: zh
category: slides
title: "课程 / 培训 Deck"
title_en: "NevoFlux Course Module Deck"
description: "暖纸背景配 Playfair 衬线,左侧学习目标常驻,内含 MCQ 自测页的教学 Deck。"
tags: [course, workshop, training, 教学, 模板]
sample_image: packs/design-pack/assets/templates/deck-course-module.svg
source: html-anything/deck-course-module
---

## 设计指导

用于教学 / workshop 的演示 Deck,核心是让学习目标在每一页持续可见。适合上手培训、内部课程与动手 workshop。

布局:
- 封面页(模块名 + 讲师)。
- 学习目标列表,固定在左侧侧栏,在每张正文页持续显示。
- 正文页(概念 + 例子)。
- MCQ 单选自测页。
- 收尾页 + 下一模块预告。

设计细节:
- 暖纸背景,标题使用 Playfair Display 衬线体。
- 学术但亲和的配色:青绿主色、琥珀辅色、陶土点缀色。
- 侧栏用圆点状态追踪进度(已完成 `●`、当前 `▸`、待学 `○`)。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>模块 04 · GBrain 检索 · NevoFlux 学院</title>
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
<style>/* course-module — academic but friendly */
.tpl-course-module{
  --bg:#fbfaf6;--bg-soft:#f4f1e8;--surface:#ffffff;--surface-2:#f6f3ea;
  --border:rgba(60,45,20,.12);--border-strong:rgba(60,45,20,.24);
  --text-1:#2a2418;--text-2:#5a5140;--text-3:#8a7f68;
  --accent:#2d7d6e;--accent-2:#d88a3a;--accent-3:#c4593f;
  --grad:linear-gradient(135deg,#2d7d6e,#4ea893);
  --radius:14px;--radius-lg:20px;
  --shadow:0 12px 30px rgba(60,45,20,.07);
  font-family:'Inter','Noto Sans SC',sans-serif;
}
.tpl-course-module .slide{padding:64px 80px;background:var(--bg);display:grid;grid-template-columns:260px 1fr;gap:56px;align-content:start}
.tpl-course-module .slide.full{grid-template-columns:1fr;display:flex;flex-direction:column;justify-content:center}
.tpl-course-module .sidebar{border-right:1px solid var(--border);padding-right:32px;position:relative}
.tpl-course-module .sidebar .brand{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--accent)}
.tpl-course-module .sidebar .brand::before{content:"✦ ";color:var(--accent-2)}
.tpl-course-module .sidebar h5{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--text-3);margin:32px 0 12px}
.tpl-course-module .obj-list{list-style:none;padding:0;margin:0;font-size:13px;color:var(--text-2);line-height:1.5}
.tpl-course-module .obj-list li{padding:8px 0 8px 22px;position:relative;border-bottom:1px dashed var(--border)}
.tpl-course-module .obj-list li::before{content:"○";position:absolute;left:0;top:8px;color:var(--accent)}
.tpl-course-module .obj-list li.done::before{content:"●";color:var(--accent)}
.tpl-course-module .obj-list li.current{color:var(--text-1);font-weight:700}
.tpl-course-module .obj-list li.current::before{content:"▸";color:var(--accent-2)}
.tpl-course-module .main{min-width:0}
.tpl-course-module .h1{font-family:'Playfair Display',serif;font-size:72px;line-height:1.02;font-weight:800;letter-spacing:-.02em;color:var(--text-1)}
.tpl-course-module .h2{font-family:'Playfair Display',serif;font-size:48px;line-height:1.1;font-weight:700;letter-spacing:-.015em;color:var(--text-1)}
.tpl-course-module h3,.tpl-course-module h4{color:var(--text-1)}
.tpl-course-module .kicker{color:var(--accent-2);font-size:12px;font-weight:700;letter-spacing:.14em}
.tpl-course-module .lede{font-size:20px;color:var(--text-2);line-height:1.7}
.tpl-course-module .callout{border-left:4px solid var(--accent-2);background:var(--surface-2);padding:20px 24px;border-radius:0 var(--radius) var(--radius) 0;margin-top:24px}
.tpl-course-module .callout b{color:var(--accent-2)}
.tpl-course-module .concept-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px 26px;box-shadow:var(--shadow)}
.tpl-course-module .concept-box h4{margin-top:0;color:var(--accent)}
.tpl-course-module .exercise{background:#fff8ed;border:1.5px dashed var(--accent-2);border-radius:var(--radius);padding:24px 28px}
.tpl-course-module .exercise::before{content:"✎ Exercise";display:block;font-size:12px;font-weight:700;letter-spacing:.12em;color:var(--accent-2);margin-bottom:10px;text-transform:uppercase}
.tpl-course-module .code{background:#2a2418;color:#f4f1e8;border-radius:var(--radius);padding:20px 24px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:1.7;overflow:auto}
.tpl-course-module .code .cmt{color:#8a7f68;font-style:italic}
.tpl-course-module .code .kw{color:#e8a770}
.tpl-course-module .code .str{color:#8ec6b2}
.tpl-course-module .mcq{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:18px 22px;margin-bottom:10px;display:flex;gap:14px;align-items:flex-start;cursor:pointer}
.tpl-course-module .mcq .letter{flex:none;width:28px;height:28px;border-radius:50%;border:2px solid var(--text-3);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:var(--text-2)}
.tpl-course-module .mcq.correct{border-color:var(--accent);background:rgba(45,125,110,.06)}
.tpl-course-module .mcq.correct .letter{border-color:var(--accent);background:var(--accent);color:#fff}
.tpl-course-module .pill-academic{display:inline-block;padding:4px 12px;border-radius:4px;background:var(--surface-2);border:1px solid var(--border);font-size:12px;color:var(--text-2);font-family:'JetBrains Mono',monospace}
.tpl-course-module .slide.full .h1{font-size:88px}
.tpl-course-module .deck-footer{color:var(--text-3)}

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-course-module">
<div class="deck">

  <!-- 1. Cover -->
  <section class="slide full" data-title="Cover">
    <p class="kicker">NEVOFLUX 学院 · 模块 04</p>
    <h1 class="h1 mt-s">GBrain 检索:每个答案<em>都附出处</em>。</h1>
    <p class="lede mt-l" style="max-width:62ch">本模块带你了解 NevoFlux 浏览器如何把你收藏的网页、笔记和 Canvas 应用沉淀成 GBrain 知识库,以及智能体如何让每个回答都扎根于你真正捕获过的内容。</p>
    <div class="row mt-l" style="gap:16px">
      <span class="pill-academic">约 45 分钟阅读</span>
      <span class="pill-academic">前置 · GBrain 基础、Pack</span>
      <span class="pill-academic">工具 · NevoFlux SDK</span>
    </div>
    <div class="deck-footer"><span>讲师 Maya Okonkwo · 开发者关系 · 2026</span><span class="slide-number" data-current="1" data-total="7"></span></div>
  </section>

  <!-- 2. Objectives -->
  <section class="slide" data-title="Objectives">
    <aside class="sidebar">
      <div class="brand">NEVOFLUX · M04</div>
      <h5>学习目标</h5>
      <ul class="obj-list">
        <li class="current">定义 GBrain 检索</li>
        <li>选对来源范围</li>
        <li>追踪有据回答</li>
        <li>调优分块 ↔ 召回</li>
        <li>判断何时该用检索</li>
      </ul>
      <h5>模块进度</h5>
      <p class="dim" style="font-size:13px">第 2 页 / 共 7 页 · 已学约 5 分钟</p>
    </aside>
    <div class="main">
      <p class="kicker">学习目标</p>
      <h2 class="h2 mt-s">学完本模块,你将能够……</h2>
      <div class="stack mt-l">
        <div class="concept-box"><h4>① 用一句话解释 GBrain 检索。</h4><p class="dim">"智能体在动笔前,先从知识库取出最相关的若干片段,再据此作答。"</p></div>
        <div class="concept-box"><h4>② 圈定查询范围,杜绝凭空捏造来源。</h4><p class="dim">每个有据回答都指回一个捕获过的网页、笔记或 Canvas 应用。</p></div>
        <div class="concept-box"><h4>③ 在纸上画出一条检索流水线。</h4><p class="dim">给定问题,勾勒 嵌入 → 检索 → 重排 → 作答。</p></div>
        <div class="concept-box"><h4>④ 把宽泛搜索改写为限定 Pack 的查询。</h4><p class="dim">并说明何时窄优于宽。</p></div>
      </div>
    </div>
  </section>

  <!-- 3. Concept -->
  <section class="slide" data-title="Concept">
    <aside class="sidebar">
      <div class="brand">NEVOFLUX · M04</div>
      <h5>学习目标</h5>
      <ul class="obj-list">
        <li class="done">定义 GBrain 检索</li>
        <li class="current">选对来源范围</li>
        <li>追踪有据回答</li>
        <li>调优分块 ↔ 召回</li>
        <li>判断何时该用检索</li>
      </ul>
      <h5>关键术语</h5>
      <p class="dim" style="font-size:13px">分块 · 嵌入 · 来源范围 · 重排</p>
    </aside>
    <div class="main">
      <p class="kicker">核心概念</p>
      <h2 class="h2 mt-s">永远是两个部分。</h2>
      <p class="lede mt-m">一次 GBrain 查询里恰好有两样东西:一个<b>来源范围</b>(去哪里找)和一个<b>检索步骤</b>(在智能体作答前取出哪些片段)。</p>
      <div class="callout">
        <b>经验法则。</b> 如果你说不出来源范围,就先别跑这条查询。先决定它该读哪个 Pack 或工作区。
      </div>
      <div class="grid g2 mt-l">
        <div class="concept-box"><h4>来源范围</h4><p class="dim">允许查询读取的那一片 GBrain——某个工作区、Pack 或收藏集。</p><p class="pill-academic">例如 <b>scope = "research-pack"</b></p></div>
        <div class="concept-box"><h4>检索步骤</h4><p class="dim">把问题嵌入,找出最近邻片段,只把这些交给智能体。</p><p class="pill-academic">例如 <b>top_k = 6</b></p></div>
      </div>
    </div>
  </section>

  <!-- 4. Example -->
  <section class="slide" data-title="Example">
    <aside class="sidebar">
      <div class="brand">NEVOFLUX · M04</div>
      <h5>学习目标</h5>
      <ul class="obj-list">
        <li class="done">定义 GBrain 检索</li>
        <li class="done">选对来源范围</li>
        <li class="current">追踪有据回答</li>
        <li>调优分块 ↔ 召回</li>
        <li>判断何时该用检索</li>
      </ul>
      <h5>动手试试</h5>
      <p class="dim" style="font-size:13px">打开一个 Canvas 应用,运行右侧片段,然后问 <code>ask("哪个 Pack 讲计费?")</code>。</p>
    </aside>
    <div class="main">
      <p class="kicker">实战示例</p>
      <h2 class="h2 mt-s">有据问答,7 行搞定。</h2>
      <div class="code mt-m"><pre style="margin:0"><span class="cmt"># gbrain.ask() 先检索,智能体再带引用作答</span>
<span class="kw">from</span> nevoflux <span class="kw">import</span> gbrain
<span class="kw">def</span> ask(q):
    hits = gbrain.search(q, scope=<span class="str">"design-pack"</span>, top_k=<span class="str">6</span>)
    <span class="kw">return</span> gbrain.answer(q, context=hits)   <span class="cmt"># 有据回答</span>

<span class="kw">print</span>(ask(<span class="str">"Pack 如何关联技能?"</span>))   <span class="cmt"># → 带引用的答案</span></pre></div>
      <div class="callout">
        <b>追踪这次调用。</b> 问题 → 嵌入(q) → 在 <code>design-pack</code> 中检索前 6 个片段 → 重排 → answer(q, context) → 附 6 条出处链接的回答 = <b>有据</b>。
      </div>
    </div>
  </section>

  <!-- 5. Exercise -->
  <section class="slide" data-title="Exercise">
    <aside class="sidebar">
      <div class="brand">NEVOFLUX · M04</div>
      <h5>学习目标</h5>
      <ul class="obj-list">
        <li class="done">定义 GBrain 检索</li>
        <li class="done">选对来源范围</li>
        <li class="done">追踪有据回答</li>
        <li class="current">调优分块 ↔ 召回</li>
        <li>判断何时该用检索</li>
      </ul>
      <h5>时长</h5>
      <p class="dim" style="font-size:13px">约 10 分钟 · 独立完成</p>
    </aside>
    <div class="main">
      <p class="kicker">练习 4.1</p>
      <h2 class="h2 mt-s">写一个 <em>scoped_ask(q, pack)</em>。</h2>
      <p class="lede mt-m">返回一个只读取单个 Pack 的有据回答——不许做全局 GBrain 搜索。</p>
      <div class="exercise mt-l">
        <p style="margin:0;font-size:18px;color:var(--text-1)"><b>你的任务</b></p>
        <ol style="color:var(--text-2);line-height:1.8;margin:10px 0 0">
          <li>设定来源范围。对 "design-pack" 而言 <code>scope</code> 等于什么?</li>
          <li>用 <code>gbrain.search</code> 取出前 6 个片段。</li>
          <li>测试:一个计费问题应当引用计费 Pack,而不是博客。</li>
          <li>加分:如果 Pack 为空会怎样?返回一个安全的"未找到来源"回复。</li>
        </ol>
      </div>
      <p class="dim mt-m" style="font-size:14px">卡住了?记住:来源范围就是那一小片已经含有答案的 GBrain。</p>
    </div>
  </section>

  <!-- 6. Check understanding -->
  <section class="slide" data-title="Check">
    <aside class="sidebar">
      <div class="brand">NEVOFLUX · M04</div>
      <h5>学习目标</h5>
      <ul class="obj-list">
        <li class="done">定义 GBrain 检索</li>
        <li class="done">选对来源范围</li>
        <li class="done">追踪有据回答</li>
        <li class="done">调优分块 ↔ 召回</li>
        <li class="current">判断何时该用检索</li>
      </ul>
      <h5>自测</h5>
      <p class="dim" style="font-size:13px">你应当答对 3/3。</p>
    </aside>
    <div class="main">
      <p class="kicker">检验你的理解</p>
      <h2 class="h2 mt-s">哪条查询会凭空捏造来源?</h2>
      <div class="mt-l">
        <div class="mcq"><div class="letter">A</div><div><b>ask(q, scope="design-pack", top_k=6)</b><p class="dim" style="font-size:13px;margin:4px 0 0">限定单个 Pack,并在作答前检索。有据。</p></div></div>
        <div class="mcq correct"><div class="letter">B</div><div><b>ask(q, context=None)</b><p class="dim" style="font-size:13px;margin:4px 0 0"><b style="color:var(--accent)">✓ 正确。</b> 没有检索、没有上下文——智能体凭记忆作答,可能编造来源。</p></div></div>
        <div class="mcq"><div class="letter">C</div><div><b>ask(q, scope="*", top_k=6)</b><p class="dim" style="font-size:13px;margin:4px 0 0">范围宽,但仍在整个 GBrain 中检索真实片段。有据,只是更吵。</p></div></div>
      </div>
    </div>
  </section>

  <!-- 7. Summary -->
  <section class="slide full" data-title="Summary">
    <p class="kicker">小结 · 模块 04</p>
    <h1 class="h1 mt-s">现在你已经能……</h1>
    <div class="grid g2 mt-l">
      <div class="concept-box"><h4>✓ 定义 GBrain 检索</h4><p class="dim">智能体在作答前先取出相关片段。</p></div>
      <div class="concept-box"><h4>✓ 安全地限定查询范围</h4><p class="dim">每个有据回答都指回一个真实来源。</p></div>
      <div class="concept-box"><h4>✓ 追踪检索流水线</h4><p class="dim">你能手动还原 嵌入 → 检索 → 重排 → 作答。</p></div>
      <div class="concept-box"><h4>✓ 判断何时该用</h4><p class="dim">知识类问题 → 用检索;纯排版 → 只用智能体。</p></div>
    </div>
    <div class="callout mt-l">
      <b>下一讲 · 模块 05。</b> 在 GBrain 上搭一个 Canvas 应用:我们会用上你刚学的一切——只不过是在一个真实运行的 NevoFlux 应用里,而非代码片段。
    </div>
  </section>

</div>

</body></html>
```

## 用法

- 封面页(`.slide.full`):填写模块 kicker、衬线 `h1` 标题、一段 lede 导语、三个 `pill-academic` 信息标签,以及页脚(讲师 + 页码)。
- 侧栏(`.sidebar`,每张正文页重复):编辑 `.brand`、`学习目标` 的 `.obj-list`,以及下方的辅助板块(关键术语 / 进度 / 时长)。把每个 `<li>` 的 class 在默认(待学)、`done`、`current` 之间切换以推进进度。
- 概念页:用 `.concept-box` 卡片、用 `.callout` 放经验法则,用 `.code` 代码块配 `.cmt` / `.kw` / `.str` span 上色。
- 练习页:在 `.exercise` 块(自动加上 "Exercise" 标签)里填任务与有序清单。
- 自测页:用 `.mcq` 行给出选项,正确项加 `.mcq.correct`。
- 小结页(`.slide.full`):四张回顾 `.concept-box` 卡片,加一个预告下一模块的 `.callout`。
- 若增删页面,记得同步 `data-current` / `data-total` 与总页数。整套 Deck 自包含,除 Google Fonts 的 `@import` 外无外部资源。
