---
slug: packs/design-pack/templates/article-magazine
type: template
lang: en
category: article
title: "NevoFlux Magazine Article"
title_zh: "杂志文章"
description: "A premium Substack / Medium style long-form article layout for NevoFlux blog posts, newsletters and changelog essays."
tags: [blog, essay, newsletter, 公众号, 博客, 文章, template]
sample_image: packs/design-pack/assets/templates/article-magazine.svg
source: html-anything/article-magazine
---

## Design guidance

- Top hero: a large title (text-5xl / text-6xl) with an optional subtitle, plus a metadata row carrying author, reading time and date.
- Body: a single column, roughly 700px max width, centered. Paragraphs use `text-lg leading-relaxed text-neutral-700 dark:text-neutral-300`.
- H2 / H3 headings use a serif typeface so the headings contrast visually with the sans-serif body copy.
- Blockquotes use a thick accent-colored left border plus italics.
- Code blocks: rounded corners, dark background, light text, with a visible language label.
- List items use a custom bullet (small square / accent dot).
- Sections are separated by an `<hr>`, styled as a small centered ornament rather than a plain line.
- Close the article with a simple "if you found this useful, please share" call-to-action card.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>After we shipped GBrain, we stopped writing docs and started shipping Canvas apps</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;600&family=Noto+Serif+SC:wght@500;700;900&display=swap" rel="stylesheet">
<style>
  :root { --ink:#1a1a1a; --paper:#fafaf7; --line:#e7e5e0; --mute:#6b6760; --accent:#b8553a; --twitter:#1d9bf0; }
  body { font-family:'Inter','Noto Sans SC',sans-serif; background:var(--paper); color:var(--ink); -webkit-font-smoothing:antialiased; }
  .serif { font-family:'Noto Serif SC',Georgia,serif; }
  .ornament { display:flex; align-items:center; justify-content:center; gap:14px; margin:48px 0; color:var(--mute); }
  .ornament::before, .ornament::after { content:""; flex:1; max-width:60px; height:1px; background:var(--line); }
  .article p { font-size:1.0625rem; line-height:1.8; color:#262421; margin:1.1em 0; max-width:65ch; }
  .article h2 { font-family:'Noto Serif SC',serif; font-size:1.875rem; font-weight:700; margin:2.4em 0 0.8em; letter-spacing:-0.01em; }
  .article blockquote { border-left:3px solid var(--accent); padding:0 0 0 20px; margin:1.6em 0; font-style:italic; color:var(--mute); font-family:'Noto Serif SC',serif; font-size:1.0625rem; line-height:1.7; }
  .article a { color:var(--accent); text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1px; }
  .grain::before { content:""; position:fixed; inset:0; pointer-events:none; opacity:0.4; background-image:radial-gradient(circle at 12% 18%, rgba(106,92,56,0.05), transparent 45%), radial-gradient(circle at 88% 72%, rgba(106,92,56,0.04), transparent 50%); }
</style>
</head>
<body class="grain">
<article class="article max-w-[720px] mx-auto px-6 pt-20 pb-32">

  <!-- Source banner — clearly attributes the inspiration -->
  <a href="#" class="!no-underline group block mb-10 rounded-2xl border border-[var(--line)] bg-white/70 hover:bg-white transition-colors p-4 flex items-start gap-4">
    <div class="shrink-0 w-10 h-10 rounded-full bg-[var(--twitter)] grid place-items-center text-white">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </div>
    <div class="min-w-0 flex-1">
      <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--mute)] mb-1">Inspired by / Source</div>
      <div class="text-[14px] font-medium text-[var(--ink)] leading-snug">The NevoFlux team note on "in the agent era, your knowledge base ships as apps, not as static docs"</div>
      <div class="text-[12px] text-[var(--mute)] mt-1 break-all group-hover:text-[var(--accent)] transition-colors">nevoflux.com/notes/gbrain-over-docs  ↗</div>
    </div>
  </a>

  <div class="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--accent)] mb-5">Essay · 2026.05 · Commentary / Extended</div>
  <h1 class="serif text-[3rem] leading-[1.08] font-black tracking-tight mb-5">
    After we shipped <a href="#" class="italic font-bold !no-underline" style="color:var(--accent)">GBrain</a>,<br/>
    we stopped writing docs and started shipping Canvas apps
  </h1>
  <p class="text-[1.125rem] leading-relaxed text-[var(--mute)] font-light max-w-[60ch] mb-8">
    The short version: in the era of agents and the NevoFlux browser, a pile of static docs is just an "intermediate state" — a live Canvas app backed by GBrain is the real deliverable your readers actually use.
  </p>
  <div class="flex items-center gap-3 text-[12px] text-[var(--mute)] pb-12 border-b border-[var(--line)]">
    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#c96442] to-[#e9b94a]"></div>
    <span class="font-medium text-[var(--ink)]">Mira Chen</span>
    <span>·</span><span>May 11</span>
    <span>·</span><span>4 min read</span>
  </div>

  <h2>Three observations that made me nod</h2>
  <p><span class="serif font-bold text-[1.5rem] float-left mr-2 leading-none mt-1.5" style="color:var(--accent)">O</span>ne, our love of writing docs is mostly about how good it feels to write them. The reader never got a vote. What the reader receives is whatever some wiki renderer spat out — and that renderer belongs to the platform, not to you.</p>
  <p>Two, when it comes to actually answering a question, a folder of docs loses. Drop a teammate into a fresh repo and a wiki search returns ten half-stale pages. GBrain indexes the same material and answers in one shot, inline, where the work happens.</p>
  <p>Three, Notion / Confluence / a shared drive / a README — every surface renders and ranks your knowledge differently. Write it once and you re-format it five times. <strong class="font-semibold text-[var(--ink)]">Put it in GBrain once, and the NevoFlux agent serves it back consistently in every Canvas app and pack</strong>.</p>

  <h2>But docs really are tedious to keep alive</h2>
  <p>Writing <code class="px-1.5 py-0.5 rounded bg-[#f0ece5] text-[0.92em] font-mono text-[#7a3d27]">## yet another heading</code> until you want to scream is a fact of life. Nobody wanted to pay the upkeep cost, because the same change takes 30 seconds to make and 30 minutes to document everywhere.</p>
  <blockquote>The variable is — the NevoFlux agent drops those 30 minutes back to 30 seconds.<br/>You write the change, the SDK syncs it into GBrain. You own the final shape, the agent handles the tedious wiring.</blockquote>

  <h2>So we built a small tool for it</h2>
  <p>Inspired by that internal note, plus a lot of dogfooding, we built <a href="#">NevoFlux Packs</a>. Point GBrain at your source (code, CSV, JSON, a design skill), pick a template (magazine, slides, poster, social card, data report …), press ⌘+Enter — the local agent runs inside your <strong class="font-semibold text-[var(--ink)]">already signed-in</strong> NevoFlux session, and a few seconds later the Canvas panel holds a ready-to-ship app you can drop into any workspace.</p>
  <p>No API key, no wasted tokens (a re-edit only runs the diff).</p>

  <h2>The takeaway</h2>
  <p>If you also feel that "write a doc, then manually re-paste it into five tools" has been quietly burning your life — read the team note, look at how a pack reuses a single design skill, then try anything that promotes your raw knowledge into a live, queryable app.</p>

  <div class="ornament"><span class="serif italic">·  ·  ·</span></div>

  <div class="rounded-2xl border border-[var(--line)] bg-white/60 p-6 mt-12 flex items-start gap-4">
    <div class="text-2xl shrink-0">📩</div>
    <div>
      <div class="font-semibold text-[var(--ink)] mb-1">Cover art is a nod to that "everything is a Canvas app" moment in the note.</div>
      <div class="text-[13px] text-[var(--mute)]">Read the original note → <a href="#" style="color:var(--accent)">nevoflux.com/notes/gbrain-over-docs</a></div>
    </div>
  </div>
</article>
</body>
</html>
```

## Usage

- `Source banner` (top card): optional attribution / "inspired by" link. Swap the eyebrow, the one-line description, and the trailing URL label, or remove the card entirely.
- `eyebrow` row (`Essay · … · Commentary`): kicker line above the title — category, date, type.
- `h1` title: large serif headline; the inline accent `<a>` is for highlighting a product name (e.g. GBrain).
- `subhead` paragraph: one-sentence summary directly under the title.
- `meta` row: author avatar (CSS gradient), author name, date, reading time.
- Body sections: each `<h2>` introduces a section; fill the following `<p>` paragraphs. The first paragraph uses a drop-cap span. Use `<blockquote>` for the pull quote and inline `<code>` for short code fragments.
- `ornament`: centered section divider — leave as-is.
- Closing CTA card: the "share / read original" action block at the end — edit the headline and the trailing link label.
