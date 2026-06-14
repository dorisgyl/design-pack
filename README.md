# design-pack

[English](README.md) · [简体中文](README.zh-CN.md)

![design-pack — a design library inside your browser: pick, prompt, ship the UI](assets/poster.png)

**A design knowledge base and UI generator for the [NevoFlux browser](https://github.com/dorisgyl/nevoflux).**
It loads a large, curated library of modern design requirements, specs, templates, and web-platform
guides into the browser's GBrain knowledge base — then lets you pick what you need and have the agent
generate finished, on-brand UI from it, either from a visual dashboard or straight from the sidebar.

## What you get

- **A retrievable design library inside your browser**, stored in GBrain and searchable in English and 中文:
  - **~80 ready-to-use templates** — landing pages, pricing, hero & feature sections, decks/slides,
    social cards, dashboards, posters, resumes, docs, mobile screens, video frames… each with a real preview image.
  - **137 modern web-platform guides** — accessibility, CSS, forms, performance, user-experience,
    view transitions, anchor positioning, passkeys… concrete patterns, gotchas, and fallbacks.
  - **13 design-taste systems** — brutalist, minimalist, soft/premium, brand-kit, the anti-slop
    "tasteskill", plus image-to-code and image-generation workflows.
  - **Baseline requirements & specs** — accessibility (WCAG 2.2 AA), responsive, and a color / type /
    spacing design system.
- **A selection dashboard** (opens in *My Canvas*): browse everything grouped by type and category,
  jump to any group from a sticky side-nav, filter by type chips or free-text search, toggle
  **EN / 中文**, and preview a real thumbnail of every template.
- **One-click generation**: tick the requirements / specs / templates / guides you want, describe what
  to build, and the agent pulls the full design bases from GBrain and **generates a new Canvas app (HTML)**
  that follows them.
- **Works from the sidebar too** — just ask in chat ("use design-pack's color spec to build a SaaS hero");
  the same skill retrieves and generates.
- **Fully extensible** — import your own requirements, specs, or templates into GBrain and the dashboard
  rebuilds itself.

## What you can achieve

Ship interfaces that are **modern, accessible, responsive, and not templated** — faster:

- Turn a one-line brief into a real landing page, pricing page, deck, social card, or dashboard that
  already respects a design system.
- Generate UI that uses **current web-platform techniques** (from the guides) instead of dated patterns,
  with accessibility and responsiveness built in.
- Apply a chosen **aesthetic direction** (minimalist, brutalist, premium…) consistently.
- Keep a growing, **bilingual, team-shareable** design memory the agent can always pull from.

## The two skills

- **`design-build`** — retrieve + generate. Fetches the selected pages (`get_page`) and expands
  semantically (`query`), then generates a new Canvas artifact. Shared by the dashboard and the sidebar.
- **`design-curate`** — import / extend. Writes new requirements / specs / templates into
  `packs/design-pack/…` (uploading sample images) and rebuilds the dashboard.

## Install

On a machine running the NevoFlux daemon:

```bash
nevoflux pack validate pack.toml
nevoflux pack install pack.toml
```

## Develop / extend

```bash
node scripts/import-guides.mjs      # (re)import modern-web-guidance guides
node scripts/import-taste.mjs       # (re)import taste-skill skills
node scripts/render-thumbs.mjs      # render template preview thumbnails
node scripts/sync-pack-seeds.mjs    # sync pack.toml's seed list from seed/**
node scripts/build-dashboard.mjs    # rebuild the dashboard (dist/index.html)
node scripts/validate-pack.mjs      # invariant checks
```

Internals — the content model, the agent-side retrieval flow, and platform notes — live in
`docs/superpowers/specs/2026-06-13-design-pack-design.md`.

## Acknowledgements

design-pack stands on the shoulders of three excellent projects, and is mostly a NevoFlux-native
adaptation and re-hosting of their work:

- **[GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)** — the
  "semantic search + Guide Fetch" idea and the **137 web-platform guides** that form the technical
  backbone of this pack.
- **[taste-skill](https://github.com/Leonxlnx/taste-skill)** — the design-taste / anti-slop frontend
  skills (brutalist, minimalist, soft, tasteskill, brand-kit, image-gen…) that give the pack its
  **aesthetic direction**.
- **[html-anything](https://github.com/nexu-io/html-anything)** — the **~80 template skills**
  (`SKILL.md` + `example.html`) that became this pack's bilingual template library.

Heartfelt thanks to their authors. design-pack retrieves their content through GBrain and localizes it
for NevoFlux; all original credit belongs to these projects.
