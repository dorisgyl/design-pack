---
slug: packs/design-pack/templates/deck-pitch-zh
type: template
lang: zh
category: slides
title: "投资人 Pitch Deck"
title_en: "NevoFlux Investor Pitch Deck"
description: "10 页融资 deck：白底 + 蓝紫渐变 hero、traction 柱状图、$X.XM 融资额页面，可直接拿去 seed 轮。"
tags: [pitch, investor, seed, vc, 模板]
sample_image: packs/design-pack/assets/templates/deck-pitch.svg
source: html-anything/deck-pitch
---

## 设计指导

10 页投资人 ready 的 fundraising deck。意图是一份可直接拿去 seed 轮路演的完整叙事。

### 布局（每页一个节拍）
- Cover —— Logo + Tagline + 轮次 / $Ask。
- Problem · Solution · Why Now。
- Product —— 截图占位。
- Market size —— TAM / SAM / SOM。
- Traction —— 柱状图配大数字。
- Business model。
- Go-to-market。
- Team。
- Ask —— $4.5M-style 融资额页面。
- Thanks / Contact。

### 设计细节
- 白底（`#ffffff`）+ 蓝→紫→品红渐变 hero（`#3b5bff` → `#7a46ff` → `#d94cff`）；封面铺一层柔和渐变底 + 一个模糊渐变光球（blob）。
- 大留白（slide padding `88px 112px`）、超大 display 字号（`.h1` 86px / 900，`.h2` 62px / 800），每页内容页右下角有一个巨大的幽灵编号。
- 数字（`.metric`）与封面 / 结尾的 `.mega` 用渐变做裁切文字填充；结尾页复用封面渐变底。
- 卡片白底 + 细边框 + 柔和阴影；pill 标注能力集；traction 柱子为渐变填充，柱顶是数值、柱底是月份。
- Ask 页翻转为整块渐变盒、白字、重投影。
- 字体：正文 / display 用 Inter / Noto Sans SC，大号衬线问句用 Playfair Display，等宽用 JetBrains Mono。hero 文案配轻快的 fade-up 动画。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>NevoFlux · Pitch Deck</title>
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
<style>/* pitch-deck — classic YC/VC pitch */
.tpl-pitch-deck{
  --bg:#ffffff;--bg-soft:#f6f7fb;--surface:#ffffff;--surface-2:#f2f4fa;
  --border:rgba(20,25,60,.08);--border-strong:rgba(20,25,60,.18);
  --text-1:#0d1130;--text-2:#4a5070;--text-3:#8a90ad;
  --accent:#3b5bff;--accent-2:#7a46ff;--accent-3:#d94cff;
  --grad:linear-gradient(135deg,#3b5bff 0%,#7a46ff 55%,#d94cff 100%);
  --grad-soft:linear-gradient(135deg,#eef1ff,#f4edff 55%,#fbedff);
  --radius:20px;--radius-lg:28px;
  --shadow:0 14px 40px rgba(20,25,60,.08),0 2px 8px rgba(20,25,60,.04);
  font-family:'Inter','Noto Sans SC',sans-serif;
}
.tpl-pitch-deck .slide{padding:88px 112px}
.tpl-pitch-deck .kicker{color:var(--accent);font-weight:700}
.tpl-pitch-deck .h1{font-size:86px;line-height:1.02;font-weight:900;letter-spacing:-.035em}
.tpl-pitch-deck .h2{font-size:62px;font-weight:800;letter-spacing:-.03em}
.tpl-pitch-deck .mega{font-size:180px;font-weight:900;line-height:.95;letter-spacing:-.05em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.tpl-pitch-deck .mega-sub{font-size:28px;color:var(--text-2);margin-top:18px}
.tpl-pitch-deck .cover-bg{position:absolute;inset:0;background:var(--grad-soft);z-index:-1}
.tpl-pitch-deck .cover-blob{position:absolute;right:-140px;top:-140px;width:560px;height:560px;border-radius:50%;background:var(--grad);filter:blur(8px);opacity:.35;z-index:-1}
.tpl-pitch-deck .brand-dot{display:inline-block;width:14px;height:14px;border-radius:50%;background:var(--grad);margin-right:10px;vertical-align:middle}
.tpl-pitch-deck .brand{font-weight:800;font-size:22px;letter-spacing:-.02em}
.tpl-pitch-deck .card{border-radius:var(--radius)}
.tpl-pitch-deck .num-tag{font-family:'Inter',sans-serif;font-size:14px;font-weight:700;color:var(--accent);letter-spacing:.12em}
.tpl-pitch-deck .big-q{font-family:'Playfair Display',serif;font-size:56px;line-height:1.15;font-weight:700;letter-spacing:-.02em;max-width:22ch}
.tpl-pitch-deck .metric{display:flex;flex-direction:column;gap:6px}
.tpl-pitch-deck .metric .n{font-size:72px;font-weight:900;letter-spacing:-.035em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1}
.tpl-pitch-deck .metric .l{color:var(--text-2);font-size:16px}
.tpl-pitch-deck .team-card{text-align:center;padding:32px 20px}
.tpl-pitch-deck .avatar{width:96px;height:96px;border-radius:50%;margin:0 auto 14px;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:32px}
.tpl-pitch-deck .ask-box{background:var(--grad);color:#fff;padding:56px 64px;border-radius:var(--radius-lg);box-shadow:0 30px 70px rgba(59,91,255,.35)}
.tpl-pitch-deck .ask-box .h2{color:#fff}
.tpl-pitch-deck .ask-box .dim{color:rgba(255,255,255,.85)}
.tpl-pitch-deck .traction-bar{display:flex;align-items:flex-end;gap:14px;height:240px;margin-top:24px}
.tpl-pitch-deck .traction-bar .bar{flex:1;background:var(--grad);border-radius:8px 8px 0 0;position:relative;min-height:20px}
.tpl-pitch-deck .traction-bar .bar span{position:absolute;bottom:-28px;left:0;right:0;text-align:center;font-size:13px;color:var(--text-3)}
.tpl-pitch-deck .traction-bar .bar em{position:absolute;top:-28px;left:0;right:0;text-align:center;font-size:14px;font-weight:700;font-style:normal;color:var(--text-1)}
.tpl-pitch-deck .section-num{font-size:220px;font-weight:900;line-height:.9;color:var(--surface-2);position:absolute;right:72px;bottom:40px;z-index:0;letter-spacing:-.05em}
.tpl-pitch-deck .slide > *{position:relative;z-index:1}
.tpl-pitch-deck .deck-footer{color:var(--text-3)}

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-pitch-deck">
<div class="deck">

  <!-- 1. Cover -->
  <section class="slide" data-title="Cover">
    <div class="cover-bg"></div>
    <div class="cover-blob"></div>
    <div style="position:absolute;top:56px;left:112px"><span class="brand-dot"></span><span class="brand">NevoFlux</span></div>
    <p class="kicker">Seed 轮 · 2026</p>
    <h1 class="h1 anim-fade-up" data-anim="fade-up">会记忆的<br><span class="gradient-text">智能体浏览器</span>。</h1>
    <p class="lede mt-m">一个工作台，让本地智能体、你的 GBrain 知识库和实时 Canvas 应用，取代十几个互不相通的标签页。</p>
    <div class="deck-footer"><span>Samuel Ananke · CEO</span><span class="slide-number" data-current="1" data-total="10"></span></div>
  </section>

  <!-- 2. Problem -->
  <section class="slide" data-title="Problem">
    <span class="section-num">01</span>
    <p class="num-tag">PROBLEM</p>
    <h2 class="h2 mt-s">知识工作者淹没在<br>40+ 个标签页里,转头就忘。</h2>
    <div class="grid g3 mt-l">
      <div class="card"><h4>上下文丢失</h4><p class="dim">资料、对话和文档散落在各个标签页和应用里。没人记得你昨天学到了什么。</p></div>
      <div class="card"><h4>智能体是瞎子</h4><p class="dim">通用 AI 助手看不到你的页面、文件和历史,每次对话都从零开始。</p></div>
      <div class="card"><h4>每周浪费 11 小时</h4><p class="dim">在反复查找、重读、重新解释,而不是真正去构建。</p></div>
    </div>
  </section>

  <!-- 3. Solution -->
  <section class="slide" data-title="Solution">
    <span class="section-num">02</span>
    <p class="num-tag">SOLUTION</p>
    <h2 class="h2 mt-s">NevoFlux 是你浏览一切的<br><span class="gradient-text">同一颗大脑</span>。</h2>
    <p class="lede mt-m">读一个页面 → 进入 GBrain → 智能体随时调用 → 自动产出一个 Canvas 应用 → 整个工作台保持同步。在一个浏览器里。无需复制粘贴。</p>
    <div class="row mt-l">
      <span class="pill pill-accent">GBrain</span>
      <span class="pill pill-accent">智能体</span>
      <span class="pill pill-accent">Canvas</span>
      <span class="pill pill-accent">Packs</span>
      <span class="pill pill-accent">SDK</span>
    </div>
  </section>

  <!-- 4. Product -->
  <section class="slide" data-title="Product">
    <span class="section-num">03</span>
    <p class="num-tag">PRODUCT</p>
    <h2 class="h2 mt-s">围绕"待办任务"(jobs to be done)而生。</h2>
    <div class="grid g2 mt-l">
      <div class="card card-hover"><h4>记住一切</h4><p class="dim">GBrain 把每个页面、笔记和文件收进一个私密、本地的知识库,你可以用大白话直接查询。</p></div>
      <div class="card card-hover"><h4>替你行动</h4><p class="dim">智能体读取当前标签页、调用工具,基于你自己的上下文完成多步骤任务。</p></div>
      <div class="card card-hover"><h4>即刻构建</h4><p class="dim">Canvas 把一句提示词变成实时小应用——仪表盘、表单、查看器——就在浏览器里。</p></div>
      <div class="card card-hover"><h4>用 Pack 扩展</h4><p class="dim">安装设计技能和 Pack,或用 SDK 发布你自己的。浏览器随时学会新本领。</p></div>
    </div>
  </section>

  <!-- 5. Market -->
  <section class="slide" data-title="Market">
    <span class="section-num">04</span>
    <p class="num-tag">MARKET</p>
    <h2 class="h2 mt-s">浏览器就是新的操作系统。</h2>
    <div class="grid g3 mt-l">
      <div class="metric"><div class="n">14 亿</div><div class="l">每天在浏览器里工作的知识工作者</div></div>
      <div class="metric"><div class="n">$920 亿</div><div class="l">TAM · AI 生产力 + 浏览器工具</div></div>
      <div class="metric"><div class="n">21%</div><div class="l">至 2030 年的复合增长率</div></div>
    </div>
    <p class="lede mt-l">研究者、构建者、分析师、运营者——每天活在 30 个标签页里的人,一直在等一个真正能跟他们一起思考的浏览器。</p>
  </section>

  <!-- 6. Business model -->
  <section class="slide" data-title="Business Model">
    <span class="section-num">05</span>
    <p class="num-tag">BUSINESS MODEL</p>
    <h2 class="h2 mt-s">固定订阅 + Pack 市场抽成。</h2>
    <div class="grid g3 mt-l">
      <div class="card"><h4>个人版</h4><div class="metric mt-s"><div class="n" style="font-size:56px">$19</div><div class="l">/ 月 · GBrain + 智能体,本地运行</div></div></div>
      <div class="card card-accent"><h4>专业版</h4><div class="metric mt-s"><div class="n" style="font-size:56px">$49</div><div class="l">/ 月 · Canvas、SDK、团队同步</div></div></div>
      <div class="card"><h4>+ 市场</h4><div class="metric mt-s"><div class="n" style="font-size:56px">20%</div><div class="l">付费 Pack 与技能的抽成</div></div></div>
    </div>
    <p class="dim mt-l">混合 LTV $2,160 · 当前漏斗下 CAC 回收期 6 个月。</p>
  </section>

  <!-- 7. Traction -->
  <section class="slide" data-title="Traction">
    <span class="section-num">06</span>
    <p class="num-tag">TRACTION</p>
    <h2 class="h2 mt-s">6 个月,月环比增长 41%。</h2>
    <div class="traction-bar mt-l">
      <div class="bar" style="height:18%"><em>$7k</em><span>10月</span></div>
      <div class="bar" style="height:30%"><em>$13k</em><span>11月</span></div>
      <div class="bar" style="height:44%"><em>$20k</em><span>12月</span></div>
      <div class="bar" style="height:62%"><em>$31k</em><span>1月</span></div>
      <div class="bar" style="height:82%"><em>$46k</em><span>2月</span></div>
      <div class="bar" style="height:100%"><em>$64k</em><span>3月</span></div>
    </div>
    <p class="dim mt-l" style="margin-top:48px">3,180 付费用户 · NPS 74 · 净留存 121%</p>
  </section>

  <!-- 8. Team -->
  <section class="slide" data-title="Team">
    <span class="section-num">07</span>
    <p class="num-tag">TEAM</p>
    <h2 class="h2 mt-s">都在大规模产品上交付过。</h2>
    <div class="grid g3 mt-l">
      <div class="card team-card"><div class="avatar">SA</div><h4>Samuel Ananke</h4><p class="dim">CEO · 前浏览器平台负责人。9 年运行时与扩展经验。</p></div>
      <div class="card team-card"><div class="avatar">RP</div><h4>Raj Patel</h4><p class="dim">CTO · 前搜索基础设施。在 1000 万用户规模上做过本地检索。</p></div>
      <div class="card team-card"><div class="avatar">EK</div><h4>Elena Kim</h4><p class="dim">设计负责人 · 前 Notion。打造了 Canvas 应用系统。</p></div>
    </div>
  </section>

  <!-- 9. Ask -->
  <section class="slide" data-title="The Ask">
    <p class="num-tag">THE ASK</p>
    <div class="ask-box mt-m">
      <h2 class="h2">融资 $5M seed 轮。</h2>
      <p class="lede" style="color:rgba(255,255,255,.9);max-width:60ch">18 个月跑道,达到 $4M ARR。45% 工程、30% 增长、15% 本地模型研发、10% 跑道缓冲。</p>
      <div class="row mt-l" style="gap:40px">
        <div><div style="font-size:44px;font-weight:900">$5M</div><div class="dim">SAFE · 投后估值上限 $32M</div></div>
        <div><div style="font-size:44px;font-weight:900">18 个月</div><div class="dim">至 Series A 的跑道</div></div>
        <div><div style="font-size:44px;font-weight:900">$4M</div><div class="dim">本轮 close 时 ARR 目标</div></div>
      </div>
    </div>
  </section>

  <!-- 10. Thanks -->
  <section class="slide center tc" data-title="Thanks">
    <div class="cover-bg"></div>
    <div>
      <div class="mega">谢谢。</div>
      <p class="mega-sub">samuel@nevoflux.com · nevoflux.com/investors</p>
      <div class="row mt-l" style="justify-content:center;gap:24px">
        <span class="pill pill-accent">聊一聊</span>
        <span class="pill">Deck v4.2 · 2026 年 4 月</span>
      </div>
    </div>
  </section>

</div>

</body></html>
```

## 用法

一份 10 页的 deck,每个 `section.slide` 一个节拍;只替换可见文本,保持全部 CSS、类名、尺寸与结构不变。

- 封面(第 1 页):设置 `.brand` 品牌名、`.kicker` 轮次 / 年份、`.h1` slogan(用 `.gradient-text` 包一段做渐变点缀)、`.lede` 一句话,以及 footer 署名 + `data-total` 总页数。
- 章节页(第 2-8 页):每页有一个巨大幽灵编号 `.section-num`、一个 `.num-tag` 标签、一个 `.h2` 标题,内容为 `.card` 网格、`.metric` 大数字,或 `.traction-bar` 柱状图(设置每根柱子的 `height:%`、`<em>` 数值、`<span>` 月份)。
- Ask(第 9 页):`.ask-box` 是整块渐变高亮——在 `.h2` 写融资额,`.lede` 写资金用途,三组数值 / 标签对。
- Thanks(第 10 页):`.mega` 结尾词、`.mega-sub` 联系方式,以及结尾的 pill。
- 保持自包含——无外部 URL;渐变与模糊光球 `.cover-blob` 都是纯 CSS。
