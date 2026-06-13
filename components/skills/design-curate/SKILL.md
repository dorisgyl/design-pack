---
name: design-curate
description: Import or extend design-pack's requirements, specs, and templates, then rebuild the selection dashboard. Use when the user wants to add/import a spec, requirement, or template to design-pack, "add this design spec", or "extend design-pack". Writes pages into the gbrain knowledge base under packs/design-pack/, then regenerates the dashboard artifact.
version: "0.1.0"
author: "design-pack"
tags: [design-pack, design, import, curate, gbrain]
enabled: true
triggers:
  - "导入 design-pack"
  - "扩展 design-pack"
  - "新增设计规范"
  - "加个模板"
  - "把这份规范加进来"
allowed_tools:
  - tool_search
  - tool_call_dynamic
---

# design-curate — import/extend content and rebuild the dashboard

Write new design requirements/specs/templates into the `packs/design-pack/` namespace of the
knowledge base, then **rebuild the selection dashboard** so the new content shows up. The
dashboard is pre-generated with zero runtime queries, so **every import must rebuild it**.

## Tools

GBrain tools are reached via `tool_search` (query: `brain` / 知识库) then
`tool_call_dynamic(name, args)`. Names used below are confirmed against the daemon tool list:
`put_page`, `get_page`, `list_pages`, `file_upload` (params `path`, `page_slug`),
`file_url` (param `storage_path`). Canvas artifact tools: `create_artifact` (new),
`browser_read_artifact` / `browser_edit_artifact` (read/edit an existing artifact) — all ambient.

## 1. Shape the content

Each item becomes one gbrain page with the design-pack frontmatter schema:
```markdown
---
slug: packs/design-pack/<requirements|specs|templates>/<kebab-id>
type: <requirement | spec | template>
title: <short title (shown in the dashboard)>
description: <one-line purpose (shown in the dashboard)>
tags: [<...>]
sample_image: <file_url>      # templates only
---
<body: requirement clauses / full spec (tokens, do-don't) / template HTML fragment + usage>
```
- `slug` MUST live under `packs/design-pack/`, split by type into `requirements/`, `specs/`,
  `templates/`. Use a lowercase kebab `<id>`. Confirm title/description/type/tags with the user.

## 2. Write into gbrain

1. For each item call `put_page` (markdown + the frontmatter above). `put_page` chunks, embeds,
   and reconciles tags/links.
2. **Template sample images**:
   - Call `file_upload` (`path` = local image, `page_slug` = the template's slug) to store the
     image as a gbrain file.
   - Call `file_url` (`storage_path`) to get its reference, and write that into the page's
     `sample_image`.
   - Do NOT paste base64 into the page body — it pollutes chunks/embeddings and hurts retrieval.

## 3. Rebuild the dashboard (critical)

Mirror `scripts/build-dashboard.mjs` in the repo (the canonical reference implementation):

1. `list_pages` with the `packs/design-pack/` prefix; read each page's frontmatter (via
   `get_page` when needed).
2. Extract the **lightweight catalog**: `{slug, type, title, description, tags, collection?,
   category?, thumbnail?}`. Bodies do NOT go into the dashboard.
3. Templates: fetch the sample image via `file_url`, downscale to a **base64 thumbnail** inlined
   into the catalog (avoid bloating the artifact). Requirements/specs have no thumbnail.
4. Render the self-contained dashboard HTML (catalog grouped by type / collection / category, a
   filter box, checkbox selection, a prompt textarea, `agent.chat` send, `onStream` progress;
   **no external URLs**) — the same shape `build-dashboard.mjs` emits as `index.html`.
5. Update the installed `design-pack-board` artifact: prefer an in-place edit via
   `browser_read_artifact` + `browser_edit_artifact`; if the structure changed too much, recreate
   it with `create_artifact`. The `artifact_id` must stay `design-pack-board`.

## 4. Report & fallbacks

- Report each `put_page` / `file_upload` result.
- **Content written to gbrain but the rebuild failed** → not a total failure: the content is
  already retrievable by design-build; tell the user they can retry the rebuild.
- Image too large → downscale to a thumbnail on rebuild; the full image stays in gbrain.
- Validate after writing: every new slug under `packs/design-pack/`, valid `type`, templates have
  `sample_image`.
