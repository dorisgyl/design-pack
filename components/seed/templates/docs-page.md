---
slug: packs/design-pack/templates/docs-page
type: template
lang: en
category: doc
title: "NevoFlux Docs Page"
title_zh: "技术文档页"
description: "Three-column documentation page: side nav + article body + right-hand table of contents."
tags: [docs, api, tutorial, guide, template]
sample_image: packs/design-pack/assets/templates/docs-page.svg
source: html-anything/docs-page
---
## Design guidance

A single-page API / tutorial document, optimized for a long-read experience. Intent: a reference or guide page viewed on desktop (target width 1440).

Layout:
- Inline-start navigation: grouped sections, sticky.
- Article body: prose with code blocks, callouts, and tables.
- Inline-end table of contents: sticky, with scroll-spy highlighting the active heading.
- Top bar with search, version selector, and theme toggle.

Design details:
- Code blocks: rounded corners, dark/tinted background, a language label, and a copy button.
- Callouts come in three colors: info / warn / danger.
- Warm, low-contrast neutral palette with white surfaces and a single accent color used for the active nav item, callout rule, and active TOC entry.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux docs — Quickstart</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff; --code-bg: #f4f4f2;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 15px/1.6 -apple-system, system-ui, sans-serif; }
    .topbar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; }
    .topbar .brand { font-weight: 600; }
    .topbar input { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--border); width: 280px; font: inherit; background: var(--bg); }
    .layout { display: grid; grid-template-columns: 240px minmax(0, 1fr) 220px; gap: 0; min-height: calc(100vh - 50px); }
    @media (max-width: 1024px) { .layout { grid-template-columns: 220px 1fr; } .toc { display: none; } }
    @media (max-width: 720px) { .layout { grid-template-columns: 1fr; } .sidebar { display: none; } }
    .sidebar { padding: 24px 16px; border-right: 1px solid var(--border); overflow-y: auto; font-size: 14px; }
    .sidebar .group { margin-bottom: 22px; }
    .sidebar .group-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; padding: 0 8px 8px; }
    .sidebar a { display: block; color: var(--fg); text-decoration: none; padding: 5px 8px; border-radius: 6px; }
    .sidebar a:hover { background: var(--surface); }
    .sidebar a.active { background: var(--accent); color: white; }
    article { padding: 40px 56px 80px; max-width: 760px; }
    .crumbs { color: var(--muted); font-size: 13px; margin-bottom: 12px; }
    h1 { font-size: 36px; letter-spacing: -0.02em; margin: 0 0 12px; }
    .lede { color: var(--muted); font-size: 17px; margin: 0 0 32px; }
    h2 { font-size: 22px; letter-spacing: -0.01em; margin: 40px 0 12px; }
    h3 { font-size: 16px; margin: 24px 0 8px; }
    p { margin: 12px 0; }
    code { font-family: ui-monospace, monospace; background: var(--code-bg); padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
    pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; overflow-x: auto; font-size: 13px; line-height: 1.55; }
    pre code { background: transparent; padding: 0; }
    .callout { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 8px; padding: 14px 18px; margin: 20px 0; font-size: 14px; }
    .callout .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin-bottom: 4px; }
    .toc { padding: 40px 24px 24px; font-size: 13px; border-left: 1px solid var(--border); }
    .toc .toc-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 10px; }
    .toc a { display: block; color: var(--muted); text-decoration: none; padding: 4px 0; }
    .toc a.active { color: var(--accent); font-weight: 500; }
    .pager { display: flex; justify-content: space-between; gap: 12px; margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--border); }
    .pager a { flex: 1; text-decoration: none; color: var(--fg); padding: 12px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
    .pager a small { display: block; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
  </style>
</head>
<body>
  <header class="topbar" data-od-id="topbar">
    <span class="brand">◰ NevoFlux docs</span>
    <input placeholder="Search · ⌘K" />
  </header>
  <div class="layout">
    <nav class="sidebar" data-od-id="sidebar">
      <div class="group">
        <div class="group-label">Getting started</div>
        <a href="#" class="active">Quickstart</a>
        <a href="#">Concepts</a>
        <a href="#">Authentication</a>
      </div>
      <div class="group">
        <div class="group-label">GBrain</div>
        <a href="#">Indexing sources</a>
        <a href="#">Semantic search</a>
        <a href="#">Canvas apps</a>
      </div>
      <div class="group">
        <div class="group-label">Agent SDK</div>
        <a href="#">Install</a>
        <a href="#">Configuration</a>
        <a href="#">Commands</a>
      </div>
    </nav>
    <article data-od-id="article">
      <div class="crumbs">Docs › Getting started › Quickstart</div>
      <h1>Quickstart</h1>
      <p class="lede">Ship your first Canvas app in under five minutes. The agent SDK is the fastest path; the NevoFlux browser and the API client all wrap the same GBrain engine.</p>
      <h2 id="install">1. Install the SDK</h2>
      <p>The agent SDK is distributed as a single binary for macOS, Linux, and Windows.</p>
<pre><code># macOS · Homebrew
brew install nevoflux

# Linux · curl
curl -fsSL https://get.nevoflux.dev | sh</code></pre>
      <p>Verify the install:</p>
<pre><code>nevoflux --version
# nevoflux 0.6.4</code></pre>
      <h2 id="auth">2. Authenticate</h2>
      <p>Sign in with your NevoFlux account. The token is stored in <code>~/.config/nevoflux/credentials</code>.</p>
<pre><code>nevoflux auth login
# → opens your browser
# ✓ Logged in as you@example.com</code></pre>
      <div class="callout">
        <div class="label">Note</div>
        On servers without a browser, use <code>nevoflux auth login --device</code> for a device-code flow.
      </div>
      <h2 id="index">3. Index a GBrain source</h2>
      <p>Pick a local folder or repo and link it to a GBrain knowledge base. NevoFlux watches it for changes and re-embeds updated documents in the background.</p>
<pre><code>cd ~/projects
nevoflux init my-team
nevoflux gbrain index</code></pre>
      <h3>Excluding files</h3>
      <p>Add a <code>.nevofluxignore</code> at the root of the indexed folder. Same syntax as <code>.gitignore</code>:</p>
<pre><code>node_modules/
*.log
build/</code></pre>
      <h2 id="next">4. Where to go next</h2>
      <p>Read <a href="#">Canvas apps</a> to learn how NevoFlux turns a GBrain into an interactive interface, or skip to the <a href="#">SDK reference</a> for the full command list.</p>
      <div class="pager">
        <a href="#"><small>← Previous</small>Concepts</a>
        <a href="#" style="text-align: right;"><small>Next →</small>Canvas apps</a>
      </div>
    </article>
    <aside class="toc" data-od-id="toc">
      <div class="toc-label">On this page</div>
      <a href="#install" class="active">1. Install the SDK</a>
      <a href="#auth">2. Authenticate</a>
      <a href="#index">3. Index a GBrain source</a>
      <a href="#next">4. Where to go next</a>
    </aside>
  </div>
</body>
</html>
```

## Usage

- `topbar` — brand mark plus a search input (with a `⌘K` hint) and room for a version selector / theme toggle.
- `sidebar` — grouped navigation; each `group` has a `group-label` and a list of links. Mark the current page with class `active`.
- `article` — the long-read body: a `crumbs` breadcrumb, `h1` + `lede`, then `h2`/`h3` sections. Each `h2` carries an `id` referenced by the TOC.
- `pre` / `code` — code blocks; keep the language hint in a leading comment line. `code` inline for filenames and flags.
- `callout` — boxed aside; the original ships one accent style — duplicate the rule color for info / warn / danger variants.
- `pager` — previous / next links at the foot of the article.
- `toc` — on-this-page list; the `id`s must match the article `h2` anchors, and the active entry gets class `active`.
