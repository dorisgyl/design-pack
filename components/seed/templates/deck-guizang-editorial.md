---
slug: packs/design-pack/templates/deck-guizang-editorial
type: template
lang: en
category: slides
title: "Guizang Editorial E-Ink Deck"
title_zh: "贵赞编辑墨水 Deck"
description: "Editorial magazine x e-ink slide deck for narrative, opinion, and design storytelling about NevoFlux."
tags: [editorial, e-ink, magazine, narrative, guizang, template]
sample_image: packs/design-pack/assets/templates/deck-guizang-editorial.svg
source: html-anything/deck-guizang-editorial
---

## Design guidance

Editorial magazine x e-ink deck. The intent is narrative, opinion, sharing, and personal-voice expression with an ink-on-paper print feel rather than a high-tech look. Inspired by the op7418/guizang-ppt Style A.

### Palettes (pick ONE, never edit the hex, never mix)
- Ink Monocle (default / general business / tech) - ink `#0a0a0b`, paper `#f1efea`, paper-tint `#e8e5de`, ink-tint `#18181a`.
- Indigo Porcelain (tech / research / data) - ink `#0a1f3d`, paper `#f1f3f5`, paper-tint `#e4e8ec`, ink-tint `#152a4a`.
- Forest Ink (nature / sustainability / culture) - ink `#1a2e1f`, paper `#f5f1e8`, paper-tint `#ece7da`, ink-tint `#253d2c`.
- Kraft Paper (nostalgia / humanities / literature) - ink `#2a1e13`, paper `#eedfc7`, paper-tint `#e0d0b6`, ink-tint `#3a2a1d`.
- Dune (art / design / fashion) - ink `#1f1a14`, paper `#f0e6d2`, paper-tint `#e3d7bf`, ink-tint `#2d2620`.

### Layout pool (10 reusable cassette layouts)
Pick the number of slides based on the content - cover every key point. Short content starts at 6-12 slides; longer content should use more (the same layout may repeat across chapters).
- L01 Hero Cover - centered large hero typography + kicker + subtitle + lead paragraph + bottom metadata row.
- L02 Act Divider - kicker + huge 8.5-10vw headline + a one-line pull quote; chapter switches may invert colors (ink to paper).
- L03 Big Numbers Grid - 3x2 data cards (label / big number / annotation).
- L04 Quote + Image - left kicker + headline + body + callout; right 16:10 image (baseline aligned, not top).
- L05 Image Grid - 3x2 or 3x1 equal-height image grid (26vh or 22vh); strictly uniform height.
- L06 Pipeline / Flow - horizontal numbered step group, each step No.X + title + description; supports stepping via keyboard.
- L07 Hero Question - 7vw full-screen single question, line-broken by meaning, minimal surroundings.
- L08 Big Quote - 5.8vw huge serif quote + translation + attribution + date.
- L09 Before / After - 1:1 split; left column opacity .55 (old / before); right column full brightness (new / after).
- L10 Mixed Media - 8:4 ratio; left long-form text (kicker / headline / body / callout) + right 3:4 portrait image as support.

### Design details
- Forbidden: gradients / drop shadow / rounded corners / circular decoration / blur / SVG icon libraries / emoji decoration.
- Fonts: Display uses Playfair Display (EN) / Noto Serif SC (ZH); Body uses Inter / Noto Sans SC; numbering and figures may occasionally use italic serif.
- Magazine details: kicker at 11px uppercase, letter-spacing 0.12em; folio bottom-right like `01 / 12`; a thin hairline rule at top plus the journal logo / topic.
- No fabricated data, no Lorem ipsum, no placeholder image URLs. Render all imagery with pure CSS / inline SVG (color blocks + simple line work).
- Keyboard left / right to switch; hash sync; single-file HTML.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>NevoFlux Editorial E-Ink - Act Divider</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600&family=Noto+Serif+SC:wght@400;500;700&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter','Noto Sans SC',system-ui,sans-serif; background:#0a0a0b; margin:0; }
  .deck { display:grid; gap:24px; padding:24px; }
  .slide { width:100%; aspect-ratio:16/9; max-width:1280px; margin:0 auto; position:relative; overflow:hidden; }
  .paper { background:#f1efea; color:#0a0a0b; }
  .ink { background:#0a0a0b; color:#f1efea; }
  .display { font-family:'Playfair Display','Noto Serif SC',serif; }
  .body-serif { font-family:'Playfair Display','Noto Serif SC',serif; font-style:italic; }
  .kicker { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; font-weight:500; }
  .hairline { border:0; border-top:1px solid currentColor; opacity:0.3; }
  .folio { font-feature-settings:'tnum'; font-variant-numeric:tabular-nums; }
</style>
</head>
<body>
<div class="deck">

  <!-- L02 Act Divider · ink reverse -->
  <section class="slide ink">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between kicker opacity-70">
        <span>NEVOFLUX FIELD NOTES — Issue №26</span>
        <span>Act II</span>
        <span class="folio">04 / 12</span>
      </header>
      <div>
        <div class="kicker opacity-80">Chapter Two</div>
        <h1 class="display mt-4 leading-[0.95]" style="font-size:clamp(64px,9vw,160px); font-weight:500;">
          Why the<br/>
          <span class="body-serif">browser</span> should think<br/>
          before you do.
        </h1>
      </div>
      <footer class="flex items-baseline justify-between kicker opacity-60">
        <span>BY NevoFlux Studio · 2026 SPRING</span>
        <span class="body-serif normal-case tracking-normal">A magazine for agentic browsing.</span>
      </footer>
    </div>
  </section>

  <!-- L03 Big Numbers Grid · paper -->
  <section class="slide paper">
    <div class="absolute inset-0 p-12 flex flex-col justify-between">
      <header class="flex items-baseline justify-between kicker" style="color:#3a382f">
        <span>NEVOFLUX FIELD NOTES — Issue №26</span>
        <span>Numbers</span>
        <span class="folio">05 / 12</span>
      </header>
      <div>
        <div class="kicker" style="color:#6b665b">By the numbers</div>
        <h2 class="display mt-2 leading-[1.0]" style="font-size:clamp(36px,5vw,72px); font-weight:500;">
          Four numbers, <span class="body-serif">one thread</span> —— the browser learned to work.
        </h2>
      </div>
      <div class="grid grid-cols-4 gap-8 mt-4">
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">Design skills</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">75</div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f"><span class="body-serif">+16</span> in this pack; decks, docs, Canvas frames.</p>
        </article>
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">Canvas apps</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">17</div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f">Built by the agent, wired to <span class="body-serif">GBrain</span>, zero setup.</p>
        </article>
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">Avg. generation</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">80<span class="body-serif text-[40px]">s</span></div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f">One magazine-style deck, <span class="body-serif">31KB</span> self-contained HTML.</p>
        </article>
        <article class="border-t pt-4" style="border-color:#0a0a0b">
          <div class="kicker" style="color:#6b665b">Cloud keys</div>
          <div class="display mt-2" style="font-size:84px; font-weight:500; line-height:1;">0</div>
          <p class="mt-3 text-[13px] leading-snug" style="color:#3a382f">Everything runs in your <span class="body-serif">local</span> NevoFlux browser.</p>
        </article>
      </div>
      <footer class="flex items-baseline justify-between kicker opacity-70" style="color:#3a382f">
        <span>Source: NevoFlux design-pack internal · 2026-05</span>
        <span class="body-serif normal-case tracking-normal">Set in Playfair &amp; Inter.</span>
      </footer>
    </div>
  </section>

</div>
</body>
</html>
```

## Usage

This seed ships two of the ten cassette layouts; clone and repeat them to cover your full story.

- Top hairline header: set the journal name (`NEVOFLUX FIELD NOTES — Issue №...`), the act / section label, and the folio (`04 / 12`).
- L02 Act Divider (`.slide.ink`): use the kicker for the chapter label, the big `.display` headline as the chapter thesis (wrap a key word in `.body-serif` for the italic accent), and the footer for the byline / tagline.
- L03 Big Numbers Grid (`.slide.paper`): fill each of the four `article` cards with a kicker label, one big figure, and a one-line annotation; keep the headline to a single editorial sentence.
- Pick exactly one palette from the guidance and apply its hex to `.ink` / `.paper`; do not mix palettes. Keep all CSS, class names, sizing, and structure unchanged - only swap the visible text.
