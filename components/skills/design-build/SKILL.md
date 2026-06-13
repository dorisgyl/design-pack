---
name: design-build
description: Generate UI from design-pack's requirements, specs, and templates. Use when a message starts with [design-pack:build] (sent by the design-pack dashboard), or when the user asks in the sidebar to build/generate something using design-pack's specs/templates (a landing page, pricing page, component, HTML, …). Retrieves the design bases from the user's knowledge base (gbrain), then generates a new Canvas artifact.
version: "0.1.0"
author: "design-pack"
tags: [design-pack, design, generate, canvas, gbrain]
enabled: true
triggers:
  - "design-pack:build"
  - "用 design-pack"
  - "用设计规范生成"
  - "按规范做个"
  - "按设计规范生成"
allowed_tools:
  - tool_search
  - tool_call_dynamic
---

# design-build — retrieve design bases and generate UI

Retrieve the relevant design bases (requirements / specs / templates) from the design-pack
knowledge base, combine them with the user's request, and generate a new Canvas artifact
(usually HTML). Shared by the dashboard and the sidebar.

## Tools

GBrain tools are reached via `tool_search` (query: `brain` / 知识库 / a topic) then
`tool_call_dynamic(name, args)`. The names used below are confirmed against the daemon tool
list (`get_page`, `query`, `search`, `list_pages`). Canvas artifacts are created with the
`create_artifact` tool (ambient — same one the `app` skill uses).

## Two input shapes

**A. Dashboard message** (structured, starts with the marker):
```
[design-pack:build]
selected:
- packs/design-pack/specs/color-system
- packs/design-pack/templates/landing-hero
prompt:
<user input>
```
Parse the slug list under `selected:` (may be empty) and the free text after `prompt:`.

**B. Sidebar free text** (no marker), e.g. "use design-pack's color spec to build a SaaS hero".
No explicit slugs — rely on semantic retrieval.

## Retrieve (Guide Fetch)

One flow for both input shapes:

1. **Fetch selected pages**: for each `selected` slug call `get_page`.
   - A slug that misses (not found) → skip it and continue; do NOT abort on a single miss.
2. **Semantic expansion** (always): call `query` with the user `prompt` (hybrid vector+keyword,
   default/balanced) scoped to the `packs/design-pack/` namespace, to surface relevant
   requirements/specs/templates the user did not explicitly select.
   - `query` returns nothing → fall back to `search` (keyword full-text) once.
3. **Merge bases**: combine (1) and (2), grouped by type — requirements (hard constraints),
   specs (tokens/rules), templates (reusable structure). De-duplicate.
   - If both (1) and (2) are empty → tell the user plainly "no design-pack bases were found,
     generating from your prompt only", then continue.

## Generate

Treat the merged bases as a binding design system, combine with the user's request, and ship:

- Use `create_artifact` with `content_type: "text/html"` to open a new **standalone canvas**.
- **Honor requirement pages** (e.g. [[accessibility-baseline]], [[responsive-baseline]]):
  contrast, visible focus, semantic tags, mobile-first, and **no external URLs** (the iframe
  sandbox blocks CDNs/external resources — inline all CSS/JS).
- **Apply spec tokens** (color / type / spacing) instead of ad-hoc values.
- **Reuse template structures** as the skeleton, then rewrite copy and details to fit the request.
- The generated canvas must also be self-contained, with no external URLs and no inline event
  handlers (use `addEventListener`).

## Report

- After `create_artifact` returns, tell the user which bases were used (list the slugs), what
  was generated, and that the canvas opened.
- **Note**: the agent finishing its turn ≠ the artifact was created. Confirm `create_artifact`
  actually succeeded before reporting "done"; otherwise report the error honestly.

## Edge cases & fallbacks

- Retrieval tools unavailable / name mismatch → re-confirm names with `tool_search`; if still
  unavailable, tell the user and degrade to "generate from the request only, no design-pack bases".
- User gave only a `prompt`, selected nothing → normal; rely on `query`/`search`.
- User selected pages but the `prompt` is vague → confirm the target artifact (page / component /
  email, …) in one line before generating.
