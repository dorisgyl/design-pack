---
slug: packs/design-pack/templates/deck-replit
type: template
lang: en
category: slides
title: "Replit Slides Deck for NevoFlux"
title_zh: "Replit Slides 风 Deck"
description: "A Replit Slides themed single-file horizontal-swipe deck for telling the NevoFlux product story."
tags: [replit, themed, memo, template]
sample_image: packs/design-pack/assets/templates/deck-replit.svg
source: html-anything/deck-replit
---

## Design guidance

A Replit Slides style single-file horizontal-swipe deck. The intent is a product keynote: pick exactly ONE theme and never mix it with another.

### Layout
- Pick one theme: helix / holm / vance / bevel / world-dark / world-mint / atlas / bluehouse.
- Structure: cover + agenda + N content slides + a closer. N is driven by the length of the user content - cover every key point. Short content starts at 6-10 slides; longer content should use more.

### Design details
- Each theme has its own complete palette + font + accent. Do not mix themes.
- Self-contained single file: no external image URLs - render decoration with CSS gradients and inline SVG.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Slides · World Mint</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;800;900&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet" />
<style>
  body { font-family:'Inter Tight','Inter',system-ui,sans-serif; background:#020405; margin:0; color:#e7fff0; }
  .deck { display:grid; gap:24px; padding:24px; }
  .slide { width:100%; aspect-ratio:16/9; max-width:1280px; margin:0 auto; position:relative; overflow:hidden; }
  .mint-bg {
    background:
      radial-gradient(ellipse at 80% 0%, rgba(0,255,170,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 0% 100%, rgba(0,210,140,0.18) 0%, transparent 50%),
      linear-gradient(135deg, #04150f 0%, #0a2a1d 60%, #04241a 100%);
  }
  .mint { color:#7ffec8; }
  .mono { font-family:'JetBrains Mono', ui-monospace, monospace; }
  .chip { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; }
  .pill { background: rgba(127,254,200,0.1); color:#7ffec8; padding:3px 10px; border-radius:999px; }
  .ring { border:1px solid rgba(127,254,200,0.35); }
</style>
</head>
<body>
<div class="deck">

  <!-- COVER -->
  <section class="slide mint-bg">
    <div class="absolute inset-0 p-14 flex flex-col justify-between">
      <header class="flex items-baseline justify-between chip opacity-70 mono">
        <span>NEVOFLUX · SLIDES — WORLD MINT</span>
        <span>№01 / 12</span>
        <span>2026</span>
      </header>

      <div>
        <div class="pill chip mono inline-block">Deck · Product keynote</div>
        <h1 class="mt-6 font-black tracking-[-0.02em] leading-[0.95]" style="font-size:clamp(48px,7vw,128px);color:#e7fff0">
          A browser that<br/>thinks at <span class="mint">the edge.</span>
        </h1>
        <p class="mt-6 text-[24px] opacity-80 font-medium max-w-[720px] leading-snug">
          One GBrain knowledge base. Canvas apps on demand. Zero cloud keys.
        </p>
      </div>

      <footer class="flex items-baseline justify-between chip opacity-70 mono">
        <span>NEVOFLUX.APP</span>
        <span class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full" style="background:#7ffec8;box-shadow:0 0 12px #7ffec8"></span>
          <span>LIVE · LOCAL BROWSER</span>
        </span>
        <span>~ S W I P E ~</span>
      </footer>
    </div>
  </section>

  <!-- AGENDA -->
  <section class="slide mint-bg">
    <div class="absolute inset-0 p-14 flex flex-col justify-between">
      <header class="flex items-baseline justify-between chip opacity-70 mono">
        <span>WORLD MINT — AGENDA</span>
        <span>№02 / 12</span>
        <span>5 SCENES</span>
      </header>

      <div>
        <div class="chip mono mint">— Agenda</div>
        <h2 class="mt-2 font-black tracking-[-0.02em] leading-[1.0]" style="font-size:clamp(36px,4.6vw,72px);color:#e7fff0">
          Five short scenes,<br/>
          <span class="mint">one browser</span>.
        </h2>
      </div>

      <div class="grid grid-cols-5 gap-5">
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">01</div>
          <div class="mt-2 font-bold leading-snug">The browser becomes the workspace</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">Tabs are a layer. NevoFlux is a habit.</p>
        </article>
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">02</div>
          <div class="mt-2 font-bold leading-snug">Why GBrain wins</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">Memory, trust, speed. Pick three.</p>
        </article>
        <article class="ring rounded-2xl p-4" style="background:rgba(127,254,200,0.06)">
          <div class="mono text-[22px] font-bold mint">03</div>
          <div class="mt-2 font-bold leading-snug">Agent · SDK · packs</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">One SDK, every Canvas app, that's it.</p>
        </article>
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">04</div>
          <div class="mt-2 font-bold leading-snug">Live demo · ⌘+Enter</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">CSV → Canvas app in 80 seconds.</p>
        </article>
        <article class="ring rounded-2xl p-4">
          <div class="mono text-[22px] font-bold mint">05</div>
          <div class="mt-2 font-bold leading-snug">Open questions</div>
          <p class="mt-1.5 text-[12px] opacity-70 leading-snug">Design skills as a community lib?</p>
        </article>
      </div>

      <footer class="flex items-baseline justify-between chip opacity-60 mono">
        <span>STYLE — WORLD MINT (NEON SANS)</span>
        <span>USE ← / → TO NAVIGATE</span>
        <span>5 / 12</span>
      </footer>
    </div>
  </section>

</div>
</body>
</html>
```

## Usage

This seed ships two of the deck's slide types - cover and agenda. Clone and repeat content slides to cover your full story.

- Header row (`.chip.mono`): set the theme tag (`NEVOFLUX · SLIDES — WORLD MINT`), the slide number (`№01 / 12`), and the year / scene count.
- Cover slide: the `.pill` is the deck kind label, the big `.font-black` `<h1>` is the thesis (wrap a key word in `.mint` for the neon accent), and the paragraph is the one-line subtitle. The footer holds the brand, a live status dot, and the swipe hint.
- Agenda slide: fill each of the five `article` cards with a number, a short title, and a one-line note; highlight the focus card with the `rgba(127,254,200,0.06)` background.
- Pick exactly one theme from the guidance and apply its palette / font / accent; never mix themes. Keep all CSS, class names, sizing, and structure unchanged - only swap the visible text.
