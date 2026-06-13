---
slug: packs/design-pack/templates/deck-product-launch-zh
type: template
lang: zh
category: slides
title: "产品发布 Keynote"
title_en: "NevoFlux Product Launch Deck"
description: "用于 NevoFlux 产品发布的 Keynote 风演示:暗色封面、暖橙到桃色渐变、特性卡、定价分级与收尾 CTA。"
tags: [launch, keynote, product, 模板]
sample_image: packs/design-pack/assets/templates/deck-product-launch.svg
source: html-anything/deck-product-launch
---

## 设计指导

用于发布新产品的 Keynote 风 deck,目标是营造旗舰产品发布会登台亮相的精致质感。

### 布局
- 封面 - 暗色背景配大字主题。
- 我们为何做这件事 - 抛出产品要解决的问题。
- 产品登场 - 产品名 + 一张 hero shot。
- 特性卡 - 3 到 6 张,覆盖核心能力。
- 定价分级 - 通常三档,中间一档高亮。
- CTA / 现已上线 - 用户证言 + 明确的行动召唤。

### 设计细节
- 主色:暖橙到桃色渐变(`#ff5a36` 到 `#ff8c5a` 到 `#ffb36b`)。
- 封面与 CTA 页为暗色,中间内容页为亮色。
- 标题用超大字号(900 字重),整页留白充裕。
- hero shot 是纯 CSS 渐变圆球,产品名居中嵌于其中,不依赖任何外部图片。
- 特性卡与步骤行使用圆角渐变图标块。
- 高亮("pro")定价卡反转为暗底并轻微放大。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>NevoFlux 2.0 · 发布</title>
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
<style>/* product-launch — modern announcement deck */
.tpl-product-launch{
  --bg:#ffffff;--bg-soft:#f5f5f7;--surface:#ffffff;--surface-2:#f2f2f6;
  --ink:#0a0a12;--ink-2:#3a3a44;
  --border:rgba(10,10,18,.08);--border-strong:rgba(10,10,18,.18);
  --text-1:#0a0a12;--text-2:#4a4a58;--text-3:#8a8a96;
  --accent:#ff5a36;--accent-2:#ff8c5a;--accent-3:#ffb36b;
  --grad:linear-gradient(120deg,#ff5a36 0%,#ff8c5a 60%,#ffb36b 100%);
  --radius:22px;--radius-lg:32px;
  --shadow:0 20px 60px rgba(10,10,18,.1);
  font-family:'Inter','Noto Sans SC',sans-serif;
}
.tpl-product-launch .slide{padding:80px 112px}
.tpl-product-launch .slide.dark{background:#0a0a12;color:#f5f5f7}
.tpl-product-launch .slide.dark .h1,.tpl-product-launch .slide.dark .h2,.tpl-product-launch .slide.dark h3,.tpl-product-launch .slide.dark h4{color:#fff}
.tpl-product-launch .slide.dark .lede,.tpl-product-launch .slide.dark .dim{color:rgba(245,245,247,.72)}
.tpl-product-launch .slide.dark .card{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);box-shadow:none;backdrop-filter:blur(20px)}
.tpl-product-launch .slide.dark .kicker{color:var(--accent-2)}
.tpl-product-launch .h1{font-size:96px;line-height:.98;font-weight:900;letter-spacing:-.045em}
.tpl-product-launch .h2{font-size:64px;font-weight:800;letter-spacing:-.035em}
.tpl-product-launch .hero-shot{position:absolute;right:-60px;top:50%;transform:translateY(-50%);width:640px;height:640px;border-radius:50%;background:var(--grad);filter:blur(2px);opacity:.85}
.tpl-product-launch .hero-shot::after{content:"";position:absolute;inset:80px;border-radius:40px;background:linear-gradient(160deg,rgba(255,255,255,.3),transparent 60%),#1a1a28;box-shadow:inset 0 2px 0 rgba(255,255,255,.2)}
.tpl-product-launch .hero-shot::before{content:"NevoFlux";position:absolute;inset:80px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:44px;font-weight:900;letter-spacing:-.02em;z-index:2;border-radius:40px}
.tpl-product-launch .brand{font-size:18px;font-weight:800;letter-spacing:-.02em}
.tpl-product-launch .feature-card{padding:40px 36px;border-radius:var(--radius-lg);background:var(--surface);border:1px solid var(--border);position:relative;overflow:hidden}
.tpl-product-launch .feature-card .icon{width:60px;height:60px;border-radius:18px;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-size:28px;font-weight:900;margin-bottom:20px}
.tpl-product-launch .step{display:flex;gap:24px;align-items:flex-start}
.tpl-product-launch .step .n{flex:none;width:56px;height:56px;border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:22px}
.tpl-product-launch .price-card{padding:40px 32px;border-radius:var(--radius-lg);border:1.5px solid var(--border);background:var(--surface);text-align:left}
.tpl-product-launch .price-card.pro{background:#0a0a12;color:#fff;border-color:#0a0a12;transform:scale(1.04);box-shadow:0 30px 80px rgba(255,90,54,.25)}
.tpl-product-launch .price-card.pro .dim{color:rgba(255,255,255,.7)}
.tpl-product-launch .price-card h4{font-size:16px;text-transform:uppercase;letter-spacing:.1em;color:var(--accent)}
.tpl-product-launch .price-card.pro h4{color:var(--accent-2)}
.tpl-product-launch .price-card .amount{font-size:64px;font-weight:900;letter-spacing:-.035em;margin:14px 0}
.tpl-product-launch .price-card ul{list-style:none;padding:0;margin:20px 0 0}
.tpl-product-launch .price-card li{padding:8px 0;font-size:15px;color:var(--text-2);border-top:1px solid var(--border)}
.tpl-product-launch .price-card.pro li{color:rgba(255,255,255,.8);border-color:rgba(255,255,255,.12)}
.tpl-product-launch .cta-btn{display:inline-block;padding:20px 40px;border-radius:999px;background:var(--grad);color:#fff;font-weight:700;font-size:20px;box-shadow:0 20px 50px rgba(255,90,54,.4)}
.tpl-product-launch .testimonial{max-width:44ch;font-family:'Playfair Display',serif;font-size:44px;line-height:1.25;font-weight:500;letter-spacing:-.01em}

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-product-launch">
<div class="deck">

  <!-- 1. Cover / hero -->
  <section class="slide dark" data-title="封面">
    <div class="hero-shot"></div>
    <div style="position:absolute;top:56px;left:112px" class="brand">◎ NevoFlux</div>
    <p class="kicker">发布 · 2026 年 4 月</p>
    <h1 class="h1 anim-fade-up" data-anim="fade-up">认识 NevoFlux 2.0。<br>你的浏览器,<br><span style="background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent">重新书写。</span></h1>
    <p class="lede mt-m" style="max-width:42ch">一个带有活的知识库的智能体浏览器,让每一个标签页都为你工作。</p>
    <div class="deck-footer"><span>nevoflux.app</span><span class="slide-number" data-current="1" data-total="8"></span></div>
  </section>

  <!-- 2. Introducing -->
  <section class="slide center tc" data-title="产品登场">
    <div>
      <p class="kicker">产品登场</p>
      <h1 class="h1" style="font-size:140px">NevoFlux 2.0</h1>
      <p class="lede" style="margin:24px auto;max-width:56ch">三年研究。重建的智能体运行时。一个会阅读、会记忆、会与你并肩行动的浏览器。</p>
    </div>
  </section>

  <!-- 3. Feature 1 -->
  <section class="slide" data-title="GBrain">
    <p class="kicker">01 · 记忆</p>
    <h2 class="h2">一个随你<br>不断生长的知识库。</h2>
    <div class="grid g3 mt-l">
      <div class="feature-card"><div class="icon">◆</div><h4>GBrain 采集</h4><p class="dim">你读过的每一页都会被提炼进你的私有 GBrain,用自然语言即可检索,数据永不离开本地。</p></div>
      <div class="feature-card"><div class="icon">◈</div><h4>语义召回</h4><p class="dim">问一句"那张定价图我在哪看过?",即可跳回原始页面,并高亮对应段落。</p></div>
      <div class="feature-card"><div class="icon">◐</div><h4>实时关联</h4><p class="dim">随着研究深入,GBrain 会自动把相关笔记、标签页与 Canvas 应用串联起来。</p></div>
    </div>
  </section>

  <!-- 4. Feature 2 -->
  <section class="slide dark" data-title="Canvas">
    <p class="kicker">02 · 画布</p>
    <h2 class="h2">把任意页面<br>变成一个应用。</h2>
    <div class="grid g3 mt-l">
      <div class="card"><h4>Canvas 应用</h4><p>在任意标签页投入一句提示,NevoFlux 立刻围绕页面内容生成一个可交互的小应用。</p></div>
      <div class="card"><h4>可复用区块</h4><p>把 Canvas 存为区块,跨站点复用:追踪器、摘要、计算器、仪表盘。</p></div>
      <div class="card"><h4>一键分享</h4><p>把 Canvas 应用导出为自包含页面。无需服务器,无需构建,无需账号。</p></div>
    </div>
  </section>

  <!-- 5. Feature 3 -->
  <section class="slide" data-title="智能体">
    <p class="kicker">03 · 智能体</p>
    <h2 class="h2">一个替你浏览的<br>智能体。</h2>
    <div class="grid g2 mt-l">
      <div class="feature-card"><div class="icon">✦</div><h4>多步任务</h4><p class="dim">交给它一个目标——比价机票、填写表单、收集资料——智能体会跨标签页执行,并随时汇报进度。</p></div>
      <div class="feature-card"><div class="icon">✧</div><h4>Agent SDK</h4><p class="dim">用几行 TypeScript 就能把你自己的工具接入智能体。本地优先、完全沙箱,密钥永不离开设备。</p></div>
    </div>
  </section>

  <!-- 6. How it works -->
  <section class="slide" data-title="如何运作">
    <p class="kicker">如何运作</p>
    <h2 class="h2">三步,即刻上手。</h2>
    <div class="stack mt-l" style="max-width:900px">
      <div class="step"><div class="n">1</div><div><h4>安装 NevoFlux 并登录</h4><p class="dim">导入书签与历史。GBrain 开始本地建立索引——任何数据都不会离开你的机器。</p></div></div>
      <div class="step"><div class="n">2</div><div><h4>添加一个包</h4><p class="dim">研究、设计、购物、开发。每个包都打包了 Canvas 应用、智能体技能与调优好的工作区。</p></div></div>
      <div class="step"><div class="n">3</div><div><h4>尽管浏览</h4><p class="dim">NevoFlux 会记住要紧的内容、按需构建应用、替你执行任务——持续不断。</p></div></div>
    </div>
  </section>

  <!-- 7. Pricing -->
  <section class="slide" data-title="定价">
    <p class="kicker">定价</p>
    <h2 class="h2">选择你的 NevoFlux。</h2>
    <div class="grid g3 mt-l" style="align-items:start">
      <div class="price-card">
        <h4>免费版</h4>
        <div class="amount">¥0</div>
        <p class="dim">完整浏览器,含本地 GBrain。</p>
        <ul><li>本地知识库</li><li>基础 Canvas 应用</li><li>1 个设计包</li></ul>
      </div>
      <div class="price-card pro">
        <h4>NevoFlux · 专业版</h4>
        <div class="amount">¥68<span style="font-size:24px;font-weight:600">/月</span></div>
        <p class="dim">全部能力,搭配完整智能体。</p>
        <ul><li>无限 Canvas 应用</li><li>智能体 · 多步任务</li><li>全部包与设计技能</li><li>跨设备 GBrain 同步</li></ul>
      </div>
      <div class="price-card">
        <h4>团队版</h4>
        <div class="amount">¥168<span style="font-size:24px;font-weight:600">/席</span></div>
        <p class="dim">为工作室与研究团队打造。</p>
        <ul><li>共享包库</li><li>Agent SDK 与私有工具</li><li>管理后台与 SSO</li></ul>
      </div>
    </div>
  </section>

  <!-- 8. Testimonial + CTA -->
  <section class="slide dark" data-title="发售">
    <p class="kicker">还有一件事</p>
    <div class="row" style="gap:80px;align-items:center">
      <div style="flex:1">
        <p class="testimonial">"这是第一个真正记得住我研究的浏览器。我再也不用开着四十个标签页了。"</p>
        <p class="dim mt-m">— 林婳,设计负责人 · 抢先体验</p>
      </div>
      <div style="flex:0 0 auto;text-align:center">
        <p class="dim mb-m">5 月 14 日上线 · 起步价</p>
        <div style="font-size:96px;font-weight:900;letter-spacing:-.04em">¥0</div>
        <a class="cta-btn mt-l" href="#">下载 NevoFlux 2.0 →</a>
        <p class="dim mt-m" style="font-size:13px">永久免费 · 本地优先 · 专业版 ¥68/月起</p>
      </div>
    </div>
  </section>

</div>

</body></html>
```

## 用法

- 第 1 页(封面,暗色):品牌标识、发布 kicker / 日期、主标题陈述与一行副标题。`.hero-shot` 圆球的产品名来自 CSS(`content:"NevoFlux"`)。
- 第 2 页(产品登场):产品名以超大字号呈现,加一段定位文案。
- 第 3-5 页(特性):每页一项能力,带编号 kicker;替换 `.icon` 字形与卡片文案。每页用 3 张卡(`g3`)或 2 张卡(`g2`)。
- 第 6 页(如何运作):三个带编号的 `.step` 行——每行保持一个动词引导的标题加一句短描述。
- 第 7 页(定价):三档 `.price-card`;给推荐档加 `.pro` 以反转并高亮。
- 第 8 页(CTA,暗色):左侧为证言引文,右侧为价格、`.cta-btn` 与补充小字。
- 自包含:无外部图片或链接。要改产品名,请修改标题、封面主标题以及 `.hero-shot::before` 的 `content` 值。
