---
slug: packs/design-pack/templates/doc-kami-parchment
type: template
lang: en
category: doc
title: "Kami Parchment Document"
title_zh: "Kami 羊皮纸文档"
description: "Warm parchment, single-ink-blue accent, single-serif editorial typesetting for serious one-pagers, reports, letters, and changelogs about NevoFlux."
tags: [kami, parchment, serif, editorial, report, letter, one-pager, template]
sample_image: packs/design-pack/assets/templates/doc-kami-parchment.svg
source: html-anything/doc-kami-parchment
---

## Design guidance

A serious, typeset-on-paper document template: one-pager / long report / letter / resume / equity report / changelog / portfolio. Inspired by tw93/kami. The goal is copy that reads like it was put through a print typesetter, not a dashboard and not a web page.

### Hard visual signature (do not change)
- **Canvas**: warm parchment `#f5f4ed` (never pure white `#fff`). Secondary background `#efeee5`.
- **Ink**: primary text `#1f1d18` (a near-black warm grey, not pure black `#000`). Secondary text `#6b665b`.
- **The one and only color**: ink blue `#1B365D` — every accent (links, tag outlines, key figures, the left rule of a quote) uses only this single color. Never mix in more colors.
- **Type**: one serif per language, never mixed across the document:
  - English: `Charter` (fallback: `Source Serif Pro`, `Iowan Old Style`)
  - Chinese: `TsangerJinKai02 W04` (fallback: `Noto Serif SC`)
  - Japanese: `YuMincho` (fallback: `Noto Serif JP`)
  - Body 400, Heading 500 (no 700/800/900).
- **Line height**: titles 1.1–1.3, tight body 1.4–1.45, reading body 1.5–1.55.
- **Never**: drop shadow / blur / corner radius >= 8px / gradients / neon colors / rgba (use solid hex).
- **Details**: tags use a solid hex background block (rgba does not render well in WeasyPrint); single-line geometric icons; a 1px hairline `#d4d1c5` rule at edges, kept to a controlled length so it never reaches the page edge.

### Optional document types (choose by the user's content)
- **One-Pager** — top logotype (Charter italic) + title + lede + 3-column highlights + footer metadata.
- **Long Doc** — cover page (large title + subtitle + author + date) -> table of contents (kicker + page no.) -> chapters (folio top corner + section rule + body) -> annotation footnotes + closing colophon.
- **Letter** — letterhead address + date + recipient + body (left aligned, 1.5em between paragraphs) + sign-off + signature placeholder line.
- **Portfolio** — project hero (large title + sub) + one full-width image (drawn as a CSS block placeholder) + project description + role / time / stack metadata row.
- **Resume** — name at the top (large) + one-line tagline + contact row + main sections: experience (company / time / role / bullets) + skills + education.
- **Slides** — keynote style, page count decided by the user's content (short content starts at 6 pages, longer content should use more), each page filling the parchment, large title + lede + corner page no., spare enough to feel "printed."
- **Equity Report** — company name + ticker + Q x year + key metrics row (revenue / margin / yoy) + body analysis + chart (single-color SVG line).
- **Changelog** — version number (Charter italic, large) + date + change list (Added / Changed / Fixed), separated by a single rule.

### Design principles
- "Composed pages, not dashboards." Do not stack KPI cards, do not pile on emoji icons, no hero gradient.
- "Ring or whisper only, no hard drop shadows." A shadow may only be a hairline outline like `0 0 0 1px #d4d1c5`.
- Text hierarchy comes from **serif contrast + type size + whitespace**, not from color.
- Single-file HTML using the Tailwind CDN; add pangu spacing where Chinese and English mix; no external image links — use a paper-tint color block + 1px ink outline for placeholders.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Kami Parchment · NevoFlux Field Notes №26</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+SC:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  body {
    font-family: 'Source Serif Pro', 'Noto Serif SC', Georgia, serif;
    background: #f5f4ed;
    color: #1f1d18;
  }
  .ink-blue { color: #1B365D; }
  .meta { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
  .rule { border-color: #d4d1c5; }
  .display { font-family: 'Source Serif Pro', 'Noto Serif SC', Georgia, serif; }
  .h1-display { font-size: clamp(48px, 7vw, 96px); line-height: 1.05; letter-spacing: -0.01em; font-weight: 500; }
  .tag { display: inline-block; padding: 3px 10px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; background: #efeee5; color: #1B365D; }
</style>
</head>
<body class="min-h-screen">
  <div class="max-w-[920px] mx-auto px-10 py-14">

    <!-- top folio rule -->
    <header class="flex items-baseline justify-between border-b rule pb-3 text-[11px] meta uppercase tracking-[0.18em]" style="color:#6b665b">
      <span>NEVOFLUX · Field Notes</span>
      <span>Vol. 01 · Issue №26 · MMXXVI</span>
      <span>Apache-2.0</span>
    </header>

    <!-- kicker -->
    <div class="mt-12 flex items-baseline gap-3">
      <span class="tag">Studio Letter</span>
      <span class="meta text-[11px] uppercase tracking-[0.18em]" style="color:#6b665b">The agentic browser · GBrain · Canvas</span>
    </div>

    <!-- hero headline -->
    <h1 class="display h1-display mt-4">
      A browser that <span style="font-style:italic" class="ink-blue">remembers</span><br/>
      and writes on warm paper.
    </h1>

    <!-- lede -->
    <p class="mt-8 text-[20px] leading-relaxed max-w-[680px]" style="color:#3a382f">
      NevoFlux is the browser whose built-in agent reads, remembers, and builds for you — every page you visit feeds GBrain, its local knowledge base, and any Canvas app it assembles is typeset by the agent itself. Pure white is a screen affordance, not a publishing convention. Paper has temperature, and so does type.
    </p>

    <!-- 3 columns -->
    <section class="mt-14 grid grid-cols-3 gap-10 border-t rule pt-10">
      <article>
        <div class="meta text-[10px] uppercase tracking-[0.18em] ink-blue">01 · Pillar</div>
        <h2 class="display text-[24px] font-semibold mt-2 leading-snug">GBrain<br/>remembers.</h2>
        <p class="mt-3 text-[14.5px] leading-relaxed" style="color:#3a382f">Every page you read becomes recall. The knowledge base lives on your machine — no cloud keys, no leak.</p>
      </article>
      <article>
        <div class="meta text-[10px] uppercase tracking-[0.18em] ink-blue">02 · Pillar</div>
        <h2 class="display text-[24px] font-semibold mt-2 leading-snug">The agent<br/>builds.</h2>
        <p class="mt-3 text-[14.5px] leading-relaxed" style="color:#3a382f">From one prompt the SDK assembles a Canvas app — a deck, a report, a tool — wired to GBrain, ready in seconds.</p>
      </article>
      <article>
        <div class="meta text-[10px] uppercase tracking-[0.18em] ink-blue">03 · Pillar</div>
        <h2 class="display text-[24px] font-semibold mt-2 leading-snug">Packs &amp; skills,<br/>composed.</h2>
        <p class="mt-3 text-[14.5px] leading-relaxed" style="color:#3a382f">Design skills ship as packs. Each one is typeset, not assembled — a page that should feel printed.</p>
      </article>
    </section>

    <!-- pull quote -->
    <blockquote class="mt-14 border-l-2 pl-5 italic" style="border-color:#1B365D">
      <p class="text-[22px] leading-snug max-w-[620px]" style="color:#1f1d18">
        "The browser should think before you do — and hand you something you'd actually want to print."
      </p>
      <footer class="mt-3 text-[12.5px] meta uppercase tracking-[0.16em]" style="color:#6b665b">— NevoFlux Studio · 2026</footer>
    </blockquote>

    <!-- colophon -->
    <footer class="mt-16 pt-6 border-t rule flex items-baseline justify-between text-[11px] meta uppercase tracking-[0.18em]" style="color:#6b665b">
      <span>Set in Source Serif Pro &amp; IBM Plex Mono</span>
      <span>nevoflux.local</span>
      <span>№26 / 26</span>
    </footer>
  </div>
</body>
</html>
```

## Usage

A single-page editorial one-pager. Fill the slots in order, keeping all CSS, class names, and sizing unchanged — swap only the visible text.

- **Top folio rule** (`header`): journal name on the left, volume / issue / year in the middle, license or status on the right.
- **Kicker** (`.tag` + meta line): a short label for the document type plus a one-line locator or subject string.
- **Hero headline** (`.h1-display`): the thesis in two lines; wrap one key word in `.ink-blue` italic for the single accent.
- **Lede**: one editorial paragraph (capped at 680px) introducing the subject.
- **3 columns**: three pillars, each with a numbered meta label, a two-line `.display` heading, and a one-line body.
- **Pull quote** (`blockquote`): one quotable line with an italic ink-blue left rule, plus an attribution footer.
- **Colophon** (`footer`): typeface credit, domain, and the closing folio.
- Keep the ink-blue `#1B365D` as the only accent color; do not introduce a second hue. No external image URLs — use paper-tint blocks with a 1px ink outline for any placeholder.
