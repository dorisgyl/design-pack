---
slug: packs/design-pack/templates/deck-presenter-mode
type: template
lang: en
category: slides
title: "Presenter Mode Deck"
title_zh: "演讲者模式 Deck"
description: "A slide deck for speakers who fear forgetting their lines, with per-slide verbatim speaker notes and a popup teleprompter."
tags: [presenter, notes, 提词, teleprompter, template]
sample_image: packs/design-pack/assets/templates/deck-presenter-mode.svg
source: html-anything/deck-presenter-mode
---

## Design guidance

A presenter-focused deck for speakers who are afraid of losing their place. Every slide carries a verbatim script alongside a popup teleprompter, so you always know what to say next.

### Layout
- Each slide ends with an `<aside class="notes">` block holding a 150-300 word verbatim script (hidden from the audience view).
- A small toolbar sits at the bottom-right: press `T` to cycle themes, press `S` to open the presenter popup.
- The presenter popup shows four magnetic cards: CURRENT (current slide) / NEXT (next slide preview) / SCRIPT (verbatim notes) / TIMER.

### Design details
- The default theme is tokyo-night; five themes ship in total (including a light one): tokyo-night, dracula, catppuccin-mocha, nord, corporate-clean.
- The audience window stays a normal deck view; speaker notes are hidden via `.notes{display:none}` and only surface in the presenter popup.
- Keep notes conversational, not literary - they are prompts you glance at, not a passage to read aloud.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en" data-themes="tokyo-night,dracula,catppuccin-mocha,nord,corporate-clean">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Presenter Mode Deck · NevoFlux</title>
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
<style data-theme="tokyo-night">/* theme: tokyo-night */
:root{
  --bg:#1a1b26;--bg-soft:#16161e;--surface:#24283b;--surface-2:#2f334d;
  --border:rgba(192,202,245,.12);--border-strong:rgba(192,202,245,.24);
  --text-1:#c0caf5;--text-2:#a9b1d6;--text-3:#565f89;
  --accent:#7aa2f7;--accent-2:#bb9af7;--accent-3:#7dcfff;
  --good:#9ece6a;--warn:#e0af68;--bad:#f7768e;
  --grad:linear-gradient(135deg,#7aa2f7,#bb9af7 55%,#f7768e);
  --grad-soft:linear-gradient(135deg,#24283b,#2f334d);
  --radius:12px;--radius-sm:8px;--radius-lg:20px;
  --shadow:0 10px 30px rgba(0,0,0,.45);
  --shadow-lg:0 24px 62px rgba(0,0,0,.6);
  --font-sans:'Inter','Noto Sans SC',sans-serif;
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
<style>/* tpl-presenter-mode-reveal · scoped styles
 * Presenter-mode demo deck. Inherits tokens from active theme.
 * Minimal overrides — focus is on content + notes structure.
 */

.tpl-presenter-mode-reveal .slide {
  padding: 72px 96px;
}

.tpl-presenter-mode-reveal .kicker {
  font-family: var(--font-mono, monospace);
  font-size: 13px;
  color: var(--text-3);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 18px 0;
}

.tpl-presenter-mode-reveal .h1 {
  font-size: clamp(44px, 5.6vw, 76px);
  line-height: 1.12;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
}

.tpl-presenter-mode-reveal .h2 {
  font-size: clamp(32px, 3.6vw, 48px);
  line-height: 1.22;
  letter-spacing: -0.01em;
  margin: 0 0 28px 0;
}

.tpl-presenter-mode-reveal .lede {
  font-size: 20px;
  line-height: 1.55;
  color: var(--text-2);
}

.tpl-presenter-mode-reveal .mono {
  font-family: var(--font-mono, monospace);
  font-size: 0.9em;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
  color: var(--accent, #58a6ff);
}

.tpl-presenter-mode-reveal .accent {
  color: var(--accent, #f0883e);
  font-weight: 700;
}

.tpl-presenter-mode-reveal .speaker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
}
.tpl-presenter-mode-reveal .speaker .av {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent, #58a6ff), #bc8cff);
}
.tpl-presenter-mode-reveal .speaker b {
  display: block;
  font-size: 16px;
}
.tpl-presenter-mode-reveal .speaker span {
  font-size: 13px;
  color: var(--text-3);
}

/* Agenda rows */
.tpl-presenter-mode-reveal .agenda-row {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 14px 18px;
  border: 1px solid var(--border, rgba(255,255,255,0.1));
  border-radius: 10px;
  margin-bottom: 10px;
  background: var(--surface, rgba(255,255,255,0.03));
}
.tpl-presenter-mode-reveal .agenda-row .num {
  font-family: var(--font-mono, monospace);
  font-size: 14px;
  color: var(--accent, #58a6ff);
  font-weight: 700;
}
.tpl-presenter-mode-reveal .agenda-row .t {
  font-size: 17px;
  font-weight: 500;
  color: var(--text-1);
}
.tpl-presenter-mode-reveal .agenda-row .d {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: var(--text-3);
}

/* Cards */
.tpl-presenter-mode-reveal .card {
  background: var(--surface, rgba(255,255,255,0.03));
  border: 1px solid var(--border, rgba(255,255,255,0.1));
  border-radius: 12px;
  padding: 22px 24px;
}
.tpl-presenter-mode-reveal .card-accent {
  border-top: 3px solid var(--accent, #58a6ff);
}
.tpl-presenter-mode-reveal .card h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: var(--text-1);
}
.tpl-presenter-mode-reveal .card .dim {
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* Feature rows (presenter view features) */
.tpl-presenter-mode-reveal .feature-row {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
}
.tpl-presenter-mode-reveal .feature-row:last-child { border-bottom: none; }
.tpl-presenter-mode-reveal .feature-row .num {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  flex-shrink: 0;
}
.tpl-presenter-mode-reveal .feature-row b {
  display: block;
  font-size: 17px;
  margin-bottom: 4px;
  color: var(--text-1);
}
.tpl-presenter-mode-reveal .feature-row .dim {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.55;
  margin: 0;
}
.tpl-presenter-mode-reveal .blue { color: #58a6ff; }
.tpl-presenter-mode-reveal .green { color: #3fb950; }
.tpl-presenter-mode-reveal .orange { color: #f0883e; }
.tpl-presenter-mode-reveal .purple { color: #bc8cff; }
.tpl-presenter-mode-reveal .red { color: #f85149; }

/* Rule rows (3 铁律) */
.tpl-presenter-mode-reveal .rule-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 20px;
  align-items: start;
  padding: 18px 22px;
  border: 1px solid var(--border, rgba(255,255,255,0.1));
  border-radius: 12px;
  margin-bottom: 14px;
  background: var(--surface, rgba(255,255,255,0.03));
}
.tpl-presenter-mode-reveal .rule-row .num {
  font-size: 28px;
  font-weight: 800;
  font-family: var(--font-mono, monospace);
  line-height: 1;
}
.tpl-presenter-mode-reveal .rule-row b {
  display: block;
  font-size: 18px;
  margin-bottom: 6px;
  color: var(--text-1);
}
.tpl-presenter-mode-reveal .rule-row .dim {
  font-size: 15px;
  color: var(--text-2);
  line-height: 1.6;
  margin: 0;
}

/* Code block */
.tpl-presenter-mode-reveal .code-block {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px 26px;
  font-family: var(--font-mono, "SF Mono", monospace);
  font-size: 15px;
  line-height: 1.8;
  color: #e6edf3;
  white-space: pre-wrap;
  text-align: left;
}
.tpl-presenter-mode-reveal .code-block .comment { color: #8b949e; }
.tpl-presenter-mode-reveal .code-block .cmd { color: #3fb950; font-weight: 600; }
.tpl-presenter-mode-reveal .code-block .flag { color: #f0883e; }

/* Stack helper */
.tpl-presenter-mode-reveal .stack > * + * { margin-top: 0; }

/* Grid helpers */
.tpl-presenter-mode-reveal .grid { display: grid; gap: 20px; }
.tpl-presenter-mode-reveal .grid.g2 { grid-template-columns: 1fr 1fr; }
.tpl-presenter-mode-reveal .grid.g3 { grid-template-columns: repeat(3, 1fr); }

.tpl-presenter-mode-reveal .mt-m { margin-top: 20px; }
.tpl-presenter-mode-reveal .mt-l { margin-top: 32px; }
.tpl-presenter-mode-reveal .mt-s { margin-top: 10px; }
.tpl-presenter-mode-reveal .tc { text-align: center; }

</style>
<style>
/* Static-preview fallback (runtime.js is absent — keep every slide visible) */
.deck{height:auto;min-height:100vh;overflow:visible}
.slide{position:relative;inset:auto;opacity:1;pointer-events:auto;transform:none;height:100vh;page-break-after:always}
.deck-header,.deck-footer,.slide-number,.progress-bar,.notes-overlay,.overview{pointer-events:none}
.notes{display:none!important}
</style></head>
<body class="tpl-presenter-mode-reveal">
<div class="deck">

  <!-- ============ 1. COVER ============ -->
  <section class="slide" data-title="Cover">
    <p class="kicker">presenter-mode / demo</p>
    <h1 class="h1 anim-fade-up" data-anim="fade-up">How to demo<br><span style="background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent">NevoFlux</span> without losing your place</h1>
    <p class="lede mt-m">Press <span class="mono">S</span> for presenter view · <span class="mono">T</span> to switch themes · <span class="mono">← →</span> to navigate</p>
    <div class="speaker">
      <div class="av"></div>
      <div><b>@samuel</b><span>product walkthrough · 30 min</span></div>
    </div>
    <div class="deck-footer">
      <span class="mono">#nevoflux #gbrain #canvas #presenter</span>
      <span class="slide-number" data-current="1" data-total="6"></span>
    </div>
    <aside class="notes">
      <p>Hi everyone, welcome to today's NevoFlux walkthrough. I'm Samuel, and I want to talk about something most demos get wrong: <strong>how to walk a live audience through a product like NevoFlux without freezing on stage</strong>.</p>
      <p>Before we start, a quick note about this deck itself: it's an HTML slide built in NevoFlux's design-pack with presenter mode turned on. What you're seeing is the audience view, but on my screen I have something completely different - the current slide, the next slide, a full verbatim script, and a timer, all on one display.</p>
      <p>Why bother? Because the hardest part of demoing the NevoFlux browser, GBrain, and Canvas apps live isn't the slides - it's <strong>blanking on the transition between them</strong>. Today's talk is both the content and the demo: I'll keep presenter mode open the whole time.</p>
      <p>We have about 30 minutes across five parts. Interrupt me any time. Let's go.</p>
    </aside>
  </section>

  <!-- ============ 2. AGENDA ============ -->
  <section class="slide" data-title="Agenda">
    <p class="kicker">agenda</p>
    <h2 class="h2">Five things we'll cover today</h2>
    <div class="stack mt-l">
      <div class="agenda-row"><span class="num">01</span><span class="t">Why a polished demo deck still isn't enough</span><span class="d">~5min</span></div>
      <div class="agenda-row"><span class="num">02</span><span class="t">What presenter view actually needs to show</span><span class="d">~6min</span></div>
      <div class="agenda-row"><span class="num">03</span><span class="t">Writing a script that doesn't sound read</span><span class="d">~8min</span></div>
      <div class="agenda-row"><span class="num">04</span><span class="t">Live demo · the NevoFlux design-pack deck skill</span><span class="d">~8min</span></div>
      <div class="agenda-row"><span class="num">05</span><span class="t">Takeaways + Q&amp;A</span><span class="d">~3min</span></div>
    </div>
    <aside class="notes">
      <p>Let's run through today's agenda first.</p>
      <p>Part one, I want to convince you that <strong>"a pretty deck does not equal a good demo."</strong> I've sat through plenty of polished NevoFlux pitches where the presenter froze the moment they opened GBrain live.</p>
      <p>Part two is about presenter view. The tooling out there varies a lot - Keynote, PowerPoint, reveal.js each have their own take - but I'll give you my answer for what design logic actually works when you're demoing a browser and its Canvas apps.</p>
      <p>Part three is today's <em>core</em> - the script. People assume a script means writing down every word. Wrong. The point of a script is to let you <strong>glance once and keep going</strong>, and that changes how you write it.</p>
      <p>Part four is a live demo of the NevoFlux design-pack deck skill - how to ship a scripted deck in 30 minutes.</p>
      <p>Then we wrap up and take questions. OK, into part one.</p>
    </aside>
  </section>

  <!-- ============ 3. PROBLEM ============ -->
  <section class="slide" data-title="Problem">
    <p class="kicker">// part 01 · problem</p>
    <h2 class="h2">Building a deck and<br>demoing it are <span class="accent">two skills</span>.</h2>
    <div class="grid g3 mt-l">
      <div class="card card-accent">
        <h4>✅ A good deck</h4>
        <p class="dim">Consistent theme, clean layout, clear charts, restrained motion. That's the quality of a <strong>static artifact</strong>.</p>
      </div>
      <div class="card card-accent">
        <h4>❌ A good demo</h4>
        <p class="dim">Coherent flow, steady pace, no filler, fielding questions, adjusting tempo live while GBrain loads.</p>
      </div>
      <div class="card card-accent">
        <h4>💡 The gap</h4>
        <p class="dim">The first is <strong>desk work</strong>; the second needs you to <strong>glance at a slide and already know your next line</strong>.</p>
      </div>
    </div>
    <aside class="notes">
      <p>Let me open with a take that might be controversial - <strong>building a NevoFlux deck and demoing it live are two completely different skills</strong>.</p>
      <p>Look at the left card. "A good deck" means what? Consistent theme, clean layout, clear charts, restrained motion - all <em>static-artifact</em> quality you can judge offline.</p>
      <p>The middle card is different. "A good demo" means coherent flow, steady pace, no "umm," fielding questions, and adjusting tempo on the fly - say, while a GBrain query or a Canvas app loads. That's <strong>live skill</strong>, and it has almost nothing to do with how pretty the deck is.</p>
      <p>The key line is on the right - a great presenter essentially <strong>glances at the slide and already knows the next sentence</strong>. That doesn't come from memorizing or winging it. It comes from a <em>well-designed teleprompter system</em>.</p>
      <p>The next 25 minutes are built around exactly that problem.</p>
    </aside>
  </section>

  <!-- ============ 4. SOLUTION ============ -->
  <section class="slide" data-title="Presenter View">
    <p class="kicker">// part 02 · presenter view</p>
    <h2 class="h2">Presenter view needs <span class="accent">four panels</span></h2>
    <div class="grid g2 mt-l">
      <div>
        <div class="feature-row"><span class="num blue">①</span><div><b>Current slide, large</b><p class="dim">Over half the view, so one glance tells you exactly what the audience sees right now.</p></div></div>
        <div class="feature-row"><span class="num green">②</span><div><b>Next slide preview</b><p class="dim">Prep your transition early so you never blank on "what comes after the GBrain slide."</p></div></div>
      </div>
      <div>
        <div class="feature-row"><span class="num orange">③</span><div><b>Script panel</b><p class="dim">Large type, high contrast, scrollable - this is what the presenter is actually reading.</p></div></div>
        <div class="feature-row"><span class="num purple">④</span><div><b>Timer + slide number</b><p class="dim">Knowing how long you've talked and how many slides remain is your whole sense of pace.</p></div></div>
      </div>
    </div>
    <aside class="notes">
      <p>Presenter mode should give you four panels. I'll rank them by importance.</p>
      <p>Panel one, <strong>the current slide, large</strong>. It has to take up more than half the view because it's your sync anchor with the audience - whatever they see on the NevoFlux Canvas, your head needs to match.</p>
      <p>Panel two, <strong>the next slide preview</strong>. People don't get why this matters, so let me explain: the stickiest moment in a demo isn't any single slide, it's <em>the two seconds while you flip to the next one</em>. If you can already see what's next, the transition writes itself.</p>
      <p>Panel three, <strong>the script panel</strong> - today's focus, I'll cover it next. One hard rule for now: the type must be large, contrast high, and it must scroll. You only catch it in your <em>peripheral vision</em>, so small text is useless.</p>
      <p>Panel four, <strong>the timer and slide number</strong>. How long you've talked, how many slides remain - your whole sense of pace rides on it. Keynote nails this; reveal.js defaults are too vague.</p>
      <p>All four are non-negotiable. This deck has all four built in - press S and try it.</p>
    </aside>
  </section>

  <!-- ============ 5. SCRIPT ============ -->
  <section class="slide" data-title="Script">
    <p class="kicker">// part 03 · script</p>
    <h2 class="h2">The <span class="accent">3 laws</span> of a good script</h2>
    <div class="stack mt-l">
      <div class="rule-row">
        <span class="num red">01</span>
        <div>
          <b>It's not a word-for-word script, it's a <span class="accent">prompt signal</span></b>
          <p class="dim">Bold the core points, break out the transitions, list the numbers and names clearly - <em>so one glance keeps you going</em>.</p>
        </div>
      </div>
      <div class="rule-row">
        <span class="num red">02</span>
        <div>
          <b><span class="accent">150-300 words</span> per slide, no more, no less</b>
          <p class="dim">Under 150 and the prompt is too thin; over 300 and you'll never finish reading it. Budget 2-3 minutes per slide.</p>
        </div>
      </div>
      <div class="rule-row">
        <span class="num red">03</span>
        <div>
          <b>Write it the way you <span class="accent">talk</span>, not the way you write</b>
          <p class="dim">"Therefore" becomes "so"; "the aforementioned feature" becomes "this feature." Read it aloud - it should sound like speech.</p>
        </div>
      </div>
    </div>
    <aside class="notes">
      <p>Now the core part - how to write the script. I've boiled it down to three laws.</p>
      <p><strong>Law one, a script is not a speech transcript.</strong> People hear "script" and assume they should write every word down. Wrong. If you read off a script, the audience spots it instantly and trust collapses.</p>
      <p>The real job of a script is to be a <em>prompt signal</em> - bold the core points, break the transitions into their own lines, list numbers and product names like "GBrain" or "Canvas" clearly. Then you <strong>glance and keep going</strong>, but the words coming out are still yours.</p>
      <p><strong>Law two, keep it to 150-300 words per slide.</strong> That's a number I settled on after a dozen demos. Under 150 and the prompt runs dry mid-sentence; over 300 and you can't scan it in time. At 2-3 minutes per slide, that range fits perfectly.</p>
      <p><strong>Law three, write the way you talk.</strong> This is where most people trip. You write "therefore," you'll say "so"; you write "the aforementioned feature," you'll say "this feature." <em>Read it aloud as you write</em> - if it isn't clunky, you're good.</p>
      <p>Put the three together and demoing NevoFlux suddenly feels comfortable.</p>
    </aside>
  </section>

  <!-- ============ 6. DEMO + CLOSING ============ -->
  <section class="slide" data-title="Demo & Close">
    <p class="kicker">// part 04-05 · demo + close</p>
    <h2 class="h2">Now <span class="accent">you can do it too</span></h2>
    <div class="code-block mt-m">
<span class="comment"># add the NevoFlux design-pack</span>
<span class="cmd">nevo</span> pack add <span class="flag">design-pack</span>

<span class="comment"># copy the presenter-mode deck template</span>
<span class="cmd">nevo</span> deck new <span class="flag">--template presenter-mode</span> my-demo
<span class="cmd">nevo</span> open my-demo/index.html

<span class="comment"># keyboard controls</span>
<span class="flag">S</span>  <span class="comment">→ open presenter view</span>
<span class="flag">T</span>  <span class="comment">→ switch theme (5 presets)</span>
<span class="flag">← →</span> <span class="comment">→ navigate slides</span>
<span class="flag">R</span>  <span class="comment">→ reset timer</span>
    </div>
    <p class="lede mt-m tc">The key is: <strong>write a 150-300 word script in each &lt;aside class="notes"&gt; block</strong>.</p>
    <div class="deck-footer">
      <span class="mono">#thanks · Q&amp;A</span>
      <span class="slide-number" data-current="6" data-total="6"></span>
    </div>
    <aside class="notes">
      <p>Finally, let me show how the skill works so you don't have to dig around yourself.</p>
      <p>Step one, add the NevoFlux design-pack - one command. Step two, spin up a new deck from the <code>presenter-mode</code> template into your own project. Step three, open the HTML and press S.</p>
      <p>The keyboard controls are listed here. <strong>S opens presenter view, T switches theme, arrow keys navigate, R resets the timer.</strong> Five themes ship by default - tokyo-night, dracula, catppuccin-mocha, nord, corporate-clean - covering both dark technical demos and light business reviews.</p>
      <p>The most important step - <em>in the <code>&lt;aside class="notes"&gt;</code> at the bottom of every slide, actually write a 150-300 word script</em>. That's the real deliverable of this whole method. The NevoFlux agent can draft it for you, but you must read it through once and check it sounds like something you'd actually say.</p>
      <p>That's all from me. If your next demo reminds you of this "presenter view plus script" combo, and it flows better than before - that's the win I'm after. Thank you, questions now.</p>
    </aside>
  </section>

</div>

<div style="position:fixed;bottom:12px;left:12px;font-size:11px;color:#484f5866;z-index:100;pointer-events:none">
  S presenter view · T switch theme · ← → navigate · F fullscreen · O overview · R reset timer
</div>


</body>
</html>
```

## Usage

- Cover slide: set the talk title, the gradient highlight word, the speaker handle (`.speaker b`) and subtitle, and the footer hashtags.
- Agenda slide: fill each `.agenda-row` with a number, a topic, and a rough duration.
- Problem slide: three `.card-accent` cards contrasting the deck-vs-demo gap.
- Presenter-view slide: four `.feature-row` panels (current / next / script / timer).
- Script slide: three `.rule-row` laws for writing speaker notes.
- Demo + closing slide: the `.code-block` install/keyboard reference plus the closing lede.
- Every slide ends with an `<aside class="notes">` carrying a 150-300 word verbatim script - hidden from the audience, shown in the presenter popup (press `S`). Press `T` to cycle the five themes.
