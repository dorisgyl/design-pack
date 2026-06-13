---
slug: packs/design-pack/templates/blog-post
type: template
lang: en
category: article
title: "Blog Post (NevoFlux Long-Form)"
title_zh: "博客长文"
description: "A magazine-style long-form article template with masthead, hero, figures, pull quote and author byline."
tags: [blog, essay, case study, 长文, template]
sample_image: packs/design-pack/assets/templates/blog-post.svg
source: html-anything/blog-post
---

## Design guidance

A real long-form article of 600+ words, with layout driven primarily by typography:
roughly 70% text, 20% figures, 10% chrome.

Layout:
- Masthead (publication name + date).
- Hero (large headline + subhead + author byline + reading time).
- Body copy (single 65ch column, with figures, pull quotes and inline citations).
- Author bio card.
- Related posts (3 cards).

Design details:
- Pull quotes use a large italic serif with a colored bar on the left.
- Figures carry their own caption (italic, smaller).
- Code blocks: rounded corners + dark surface + language label.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Why we rebuilt GBrain as a local-first knowledge graph — NevoFlux</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 18px/1.65 Georgia, 'Iowan Old Style', serif; }
    .wrap { max-width: 680px; margin: 0 auto; padding: 56px 28px 96px; }
    nav.top { font-family: -apple-system, system-ui, sans-serif; font-size: 13px; color: var(--muted); margin-bottom: 56px; }
    nav.top a { color: inherit; text-decoration: none; }
    .eyebrow { font-family: -apple-system, system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 14px; }
    h1 { font-size: clamp(36px, 5vw, 52px); line-height: 1.1; letter-spacing: -0.015em; margin: 0 0 20px; }
    .byline { font-family: -apple-system, system-ui, sans-serif; font-size: 14px; color: var(--muted); margin: 0 0 40px; display: flex; align-items: center; gap: 12px; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--accent); opacity: 0.18; }
    .lede { font-size: 22px; line-height: 1.5; color: var(--fg); margin: 0 0 40px; font-style: italic; }
    .hero-figure { aspect-ratio: 16/9; background: linear-gradient(135deg, var(--accent), #6b6964); border-radius: 8px; margin-bottom: 48px; opacity: 0.85; }
    p { margin: 24px 0; }
    p:first-of-type::first-letter { float: left; font-size: 64px; line-height: 0.9; padding: 6px 10px 0 0; font-weight: 600; color: var(--accent); }
    h2 { font-size: 28px; letter-spacing: -0.01em; margin: 56px 0 12px; line-height: 1.2; }
    blockquote { margin: 40px 0; padding: 0 32px; font-size: 24px; line-height: 1.4; color: var(--fg); border-left: 3px solid var(--accent); font-style: italic; }
    code { font-family: ui-monospace, monospace; background: var(--surface); border: 1px solid var(--border); padding: 1px 5px; border-radius: 4px; font-size: 0.85em; }
    pre { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px 18px; overflow-x: auto; font: 14px/1.55 ui-monospace, monospace; }
    figure.numbers { font-family: -apple-system, system-ui, sans-serif; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 40px -24px; padding: 28px 24px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    figure.numbers .stat .value { font-family: Georgia, serif; font-size: 38px; letter-spacing: -0.01em; line-height: 1; }
    figure.numbers .stat .label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 6px; }
    .endnote { font-family: -apple-system, system-ui, sans-serif; font-size: 13px; color: var(--muted); margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--border); }
    .endnote a { color: var(--accent); text-decoration: none; }
  </style>
</head>
<body>
  <article class="wrap" data-od-id="article">
    <nav class="top"><a href="#">← NevoFlux blog</a></nav>
    <div class="eyebrow">Engineering</div>
    <h1>Why we rebuilt GBrain as a local-first knowledge graph</h1>
    <div class="byline">
      <div class="avatar"></div>
      <span>By Mira Hassan · April 22, 2026 · 8 min read</span>
    </div>
    <p class="lede">For two years GBrain was a thin cache over a remote vector store. Then power users started living inside the NevoFlux browser all day, and the round-trip latency we'd been politely ignoring turned into bug reports we couldn't ignore.</p>
    <div class="hero-figure" data-od-id="hero-figure"></div>

    <p>The decision wasn't sudden. We'd been watching the recall latency distribution drift for six months before we admitted what the data was telling us. P50 lookups were great. P99 was a horror movie. Users whose GBrain held 30 GB of crawled pages, Canvas app state and agent transcripts were the ones writing in.</p>

    <p>Rebuilding the entire knowledge layer sounds like the kind of project a startup is told never to do. We did it anyway. Here's how it went, what surprised us, and the parts I'd do differently.</p>

    <h2>The trigger: round-trips we couldn't fix</h2>
    <p>A remote vector store is brilliant. It is also, fundamentally, a tradeoff. Every GBrain query on the hot path made a network call to embed and rank — and at our scale, for a heavy user inside the browser, that call ran often enough that the P99 retrieval crept past 50ms.</p>

    <p>We tried the usual fixes: caching embeddings with an <code>LRU</code>, tuning the <code>topK</code> budget, batching lookups in the agent loop. They each helped a little. None of them got us under 20ms, and the workflows we cared about needed under 5.</p>

    <blockquote>"We can't fix this over the network. We can fix it by keeping the index on the device."</blockquote>

    <p>Our staff engineer Sasha said this in a meeting in October. He was right. The question wasn't whether to leave the remote store. It was what to replace it with, and how much of the SDK we could keep.</p>

    <h2>What we kept; what we threw out</h2>
    <p>The Canvas apps stayed as-is. The pack registry stayed in the cloud. The bit that does semantic retrieval in a hot loop while you browse — that became a local-first graph index shipped inside the NevoFlux runtime. The boundary became a single SDK surface with a small, opinionated protocol.</p>

    <figure class="numbers">
      <div class="stat"><div class="value">38ms → 4ms</div><div class="label">P99 GBrain recall</div></div>
      <div class="stat"><div class="value">62%</div><div class="label">Memory drop</div></div>
      <div class="stat"><div class="value">11 weeks</div><div class="label">From RFC to ship</div></div>
    </figure>

    <p>The numbers above are real and from production. They are also misleading without context: the local-first port doesn't just remove the round-trip, it also removes a layer of abstraction we'd been carrying since the first GBrain MVP.</p>

    <h2>What I'd do differently</h2>
    <p>One thing: the SDK boundary. We chose <code>FFI</code> bindings for symmetry — the agent calling into the index feels right when you already have one runtime everywhere. But the binding ceremony is brittle, and we ate two production incidents from lifetime mistakes before we wrote a wrapper layer that handled them once.</p>

    <p>If I were starting today, I'd generate the bindings from the pack schema. The lesson isn't <em>don't write your own bindings</em>; it's <em>treat the boundary like an external API the moment you cross the runtime line</em>.</p>

    <div class="endnote">NevoFlux is hiring engineers who like writing this kind of post. <a href="#">See open roles →</a></div>
  </article>
</body>
</html>
```

## Usage

- `nav.top` — masthead / back link to the publication.
- `.eyebrow` — section or category label above the headline.
- `h1` + `.byline` + `.lede` — hero block: title, author/date/read-time, and the italic standfirst.
- `.hero-figure` — lead image placeholder (CSS gradient; swap for an inline SVG or `<img>`).
- `p` / `h2` — body copy in a single 65ch column; the first paragraph gets the drop cap.
- `blockquote` — pull quote with the accent bar.
- `figure.numbers` — three-up stat strip (value + label).
- `.endnote` — closing call-to-action.
