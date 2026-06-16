---
slug: packs/design-pack/specs/cs-paper-figure-method
type: spec
title: "CS 论文框架图画法 (CS Paper Framework Figure Method)"
title_en: "CS Paper Framework Figure — Method"
title_zh: "CS 论文框架图画法"
description: "How to design a faithful, reviewer-first CS paper framework figure: figure type × layout grammar, edge-label-first connectors, semantic-vs-visual separation, and the HTML/SVG build technique."
description_en: "How to design a faithful, reviewer-first CS paper framework figure: pick the figure type × layout grammar, keep variables on edges, separate semantics from visuals, and build it as editable HTML/SVG."
description_zh: "如何设计一张忠实、reviewer 友好的 CS 论文框架图:选图类型 × 版式语法,变量走连线,语义与视觉分离,用可编辑 HTML/SVG 实现。"
tags: [paper-figure, diagram, academic, method, 论文图, spec]
---

# CS Paper Framework Figure — Method

How to design and build a **research-paper framework figure** (architecture, pipeline, method
overview, agent workflow, system/data-flow, mechanism…) that a reviewer reads correctly at a glance
and that never contradicts the paper. Pairs with the `模板 · 论文图 / Templates · Paper Figure`
templates, which implement these patterns as editable HTML/SVG.

> Scope: paper framework figures only — **not** posters, slides, covers, or marketing visuals.

## 1. Choose along four axes

A good figure is one explicit choice on each axis, not a default.

- **Figure type** (narrative role): `method_framework` · `architecture` · `pipeline_process` ·
  `agent_workflow` · `system_data_flow` · `mechanism_intuition` · `case_walkthrough` · `evidence_board`.
  Pick the one that answers the reader's main question about the paper.
- **Layout grammar** (skeleton): `block_pipeline` (left→right stages) · `central_core` (hub + satellites) ·
  `swimlanes` (roles/phases as lanes) · `graph_network` (nodes + typed edges) · `layer_stack`
  (bottom-up layers) · `storyboard` (sequential panels) · `matrix_map` (rows × columns) ·
  `zoom_callouts` (overview + detail inset).
- **Reader role & density**: main-message vs parts-and-flow vs idea-to-model vs over-time; sparse vs
  dense. Match density to the figure's job — an overview figure is sparse, a mechanism figure can be denser.
- **Visual style**: `clean_flat` · `formal_schematic` · `minimal_line` · `blueprint` ·
  `scientific_illustration` · `isometric_3d` · `interface_metaphor` · `infographic_board`.
  One style per figure; keep it consistent with the venue.

## 2. Craft gates (non-negotiable)

- **Source-faithful.** Every box, arrow, symbol, variable, and label must be grounded in the paper /
  given material, or derived by stated logic. No decorative or "looks-smooth" arrows. Unsupported,
  contradictory, or ambiguous elements are bugs.
- **Edge-label-first.** Variables / metrics / weights / thresholds / probabilities / losses / model
  params go **on connectors, ports, forks/merges, or tags** — never as peer module boxes. Boxes are
  modules; edges carry the quantities that flow between them.
- **Semantic-vs-visual separation.** Decide the logical graph (what connects to what, with what
  meaning) first; then lay it out. Don't let a pretty layout invent or drop edges.
- **One symbol = one meaning.** A given symbol / colour / line style / icon must not stand for two
  different concepts, and two concepts must not be collapsed into one symbol unless it's an explicit,
  source-supported aggregate.
- **Modular, not fragmented.** Group at the module level the paper actually uses; don't shatter one
  module into a mini-algorithm, and don't merge distinct modules. Internal detail uses simple,
  recognizable motifs (model glyph, probability bar, threshold gate, merge/fork, score tag, light
  update loop) — not a second full algorithm inside the figure.
- **One canonical process.** Show one main path by default; use compact markers (`×N`, `…`) for
  repeats instead of duplicating lanes, unless the paper genuinely has distinct branches.
- **Reviewer-first-glance hierarchy.** The most important message reads first: clear reading order,
  one accent for the focal path, restrained background/context.
- **Color = role.** Assign one accent per role (e.g. execution / evaluation / control flow). A node,
  its outgoing edges, and its arrowheads share the role colour. Keep neutrals neutral.

## 3. Connectors

- For every arrow you must be able to point to evidence for **both** endpoints' meaning.
- Route orthogonally with rounded corners; bundle parallel edges between two modules into one unless
  distinct labeled quantities justify separate lines.
- Put the carried variable on the line / port / tag, not in a box.

## 4. Build technique (editable HTML/SVG)

The templates use a robust, library-free pattern (same as `workflow-diagram`):

- A **fixed-size canvas**; everything is absolutely positioned in its coordinate space, with an
  `overflow-x:auto` wrapper for small screens.
- **Three stacked layers** by `z-index`: phase/region containers → an SVG line layer
  (`pointer-events:none`, holds all `<path>` connectors and `<use>` arrowheads) → node cards →
  edge labels.
- Connectors are SVG `<path>` (`L` straight, `Q` rounded corner); arrowheads are a reusable
  `<defs>` glyph placed with `<use transform="translate() rotate()">`.
- This keeps figures **editable, scalable, and self-contained** — ideal for `design-build` to
  generate and for you to tweak.

Start from the matching `论文图` template for your figure type, then replace the generic example with
your paper's modules, edges, and labels — keeping every craft gate above.
