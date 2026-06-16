---
slug: packs/design-pack/icons/graph-vision
type: spec
collection: icons
dashboard: false
title: "Paper-figure icons — Graphs & 3D / vision"
title_en: "Paper-figure icons — Graphs & 3D / vision"
title_zh: "论文图图标 — 图与三维/视觉"
description: "Graph topologies, GNNs, knowledge/causal graphs, 3D scenes, NeRF, splatting, BEV."
description_en: "Graph topologies, GNNs, knowledge/causal graphs, 3D scenes, NeRF, splatting, BEV."
description_zh: "图拓扑、GNN、知识/因果图、三维场景、NeRF、高斯泼溅、BEV。"
tags: [paper-figure, icon, svg, primitive, graph-vision, 论文图, 图标]
license: "MIT-0 (paper-framework-figure-studio-pro); Tabler MIT / Lucide ISC where noted"
---

# Paper-figure icons — Graphs & 3D / vision / 论文图图标 — 图与三维/视觉

Recolorable, library-free SVG primitives for CS paper figures. `design-build` retrieves these to compose figures: copy the `<svg>` and (for `currentColor` icons) set `color:` to the module's role colour. Each lists its connector **ports** (normalised x,y) for wiring edges. Provenance: paper-framework-figure-studio-pro vector library (MIT-0).

> 可重新着色的、零依赖 SVG 基元。复制 `<svg>`,`currentColor` 图标可用 `color:` 改成角色色;`ports` 为连线锚点 (归一化坐标)。

## Single graph node / 图节点 — `graph.node.tabler_outline.v1`
**meaning**: Single graph node / 图节点 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="graph.node.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
```

## Graph edge or connector / 图边 — `graph.edge.tabler_outline.v1`
**meaning**: Graph edge or connector / 图边 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="graph.edge.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M16 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7.5 16.5l9 -9" /></svg>
```

## Directed acyclic graph / 有向无环图 DAG — `graph.dag.tabler_outline.v1`
**meaning**: Directed acyclic graph / 有向无环图 DAG · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="graph.dag.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2" /><path d="M12 12l0 4" /></svg>
```

## Hierarchy or tree structure / 层次结构 — `graph.hierarchy.tabler_outline.v1`
**meaning**: Hierarchy or tree structure / 层次结构 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="graph.hierarchy.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" /><path d="M15 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" /><path d="M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" /><path d="M12 9l0 3" /></svg>
```

## Graph nodes and edges / 节点-边图 — `graph.nodes.edges.tabler_outline.v1`
**meaning**: Graph nodes and edges / 节点-边图 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="graph.nodes.edges.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" /><path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" /><path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" /><path d="M6 9h12" /><path d="M3 20h7" /><path d="M14 20h7" /><path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 15v3" /></svg>
```

## Paper-derived GNN message passing / GNN 消息传递 — `paper.derived.architecture.gnn.message.passing.paper_derived_outline.v1`
**meaning**: Paper-derived GNN message passing / GNN 消息传递 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="14" cy="17" r="4" fill="#ffffff"/><circle cx="32" cy="11" r="4" fill="#ffffff"/><circle cx="50" cy="19" r="4" fill="#ffffff"/><circle cx="21" cy="47" r="4" fill="#eef6ff"/><circle cx="45" cy="47" r="4" fill="#eef6ff"/><path d="M14 17L32 11"/><path d="M32 11L50 19"/><path d="M14 17L21 47"/><path d="M21 47L45 47"/><path d="M50 19L45 47"/><path d="M32 11L45 47"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived knowledge graph / 知识图谱 — `paper.derived.architecture.knowledge.graph.paper_derived_outline.v1`
**meaning**: Paper-derived knowledge graph / 知识图谱 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="14" cy="17" r="4" fill="#ffffff"/><circle cx="32" cy="11" r="4" fill="#ffffff"/><circle cx="50" cy="19" r="4" fill="#ffffff"/><circle cx="21" cy="47" r="4" fill="#eef6ff"/><circle cx="45" cy="47" r="4" fill="#eef6ff"/><path d="M14 17L32 11"/><path d="M32 11L50 19"/><path d="M14 17L21 47"/><path d="M21 47L45 47"/><path d="M50 19L45 47"/><path d="M32 11L45 47"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived causal graph / 因果图 — `paper.derived.architecture.causal.graph.paper_derived_outline.v1`
**meaning**: Paper-derived causal graph / 因果图 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="14" cy="17" r="4" fill="#ffffff"/><circle cx="32" cy="11" r="4" fill="#ffffff"/><circle cx="50" cy="19" r="4" fill="#ffffff"/><circle cx="21" cy="47" r="4" fill="#eef6ff"/><circle cx="45" cy="47" r="4" fill="#eef6ff"/><path d="M14 17L32 11"/><path d="M32 11L50 19"/><path d="M14 17L21 47"/><path d="M21 47L45 47"/><path d="M50 19L45 47"/><path d="M32 11L45 47"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived 3D scene graph / 三维场景图 — `paper.derived.architecture.scene.graph.3d.paper_derived_outline.v1`
**meaning**: Paper-derived 3D scene graph / 三维场景图 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="14" cy="17" r="4" fill="#ffffff"/><circle cx="32" cy="11" r="4" fill="#ffffff"/><circle cx="50" cy="19" r="4" fill="#ffffff"/><circle cx="21" cy="47" r="4" fill="#eef6ff"/><circle cx="45" cy="47" r="4" fill="#eef6ff"/><path d="M14 17L32 11"/><path d="M32 11L50 19"/><path d="M14 17L21 47"/><path d="M21 47L45 47"/><path d="M50 19L45 47"/><path d="M32 11L45 47"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived molecule graph / 分子图 — `paper.derived.architecture.molecule.graph.paper_derived_outline.v1`
**meaning**: Paper-derived molecule graph / 分子图 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="14" cy="17" r="4" fill="#ffffff"/><circle cx="32" cy="11" r="4" fill="#ffffff"/><circle cx="50" cy="19" r="4" fill="#ffffff"/><circle cx="21" cy="47" r="4" fill="#eef6ff"/><circle cx="45" cy="47" r="4" fill="#eef6ff"/><path d="M14 17L32 11"/><path d="M32 11L50 19"/><path d="M14 17L21 47"/><path d="M21 47L45 47"/><path d="M50 19L45 47"/><path d="M32 11L45 47"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived hypergraph motif / 超图 — `paper.derived.architecture.hypergraph.paper_derived_outline.v1`
**meaning**: Paper-derived hypergraph motif / 超图 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="14" cy="17" r="4" fill="#ffffff"/><circle cx="32" cy="11" r="4" fill="#ffffff"/><circle cx="50" cy="19" r="4" fill="#ffffff"/><circle cx="21" cy="47" r="4" fill="#eef6ff"/><circle cx="45" cy="47" r="4" fill="#eef6ff"/><path d="M14 17L32 11"/><path d="M32 11L50 19"/><path d="M14 17L21 47"/><path d="M21 47L45 47"/><path d="M50 19L45 47"/><path d="M32 11L45 47"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived NeRF ray field / NeRF 射线场 — `paper.derived.architecture.nerf.rays.paper_derived_outline.v1`
**meaning**: Paper-derived NeRF ray field / NeRF 射线场 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><path d="M16 25l18-10 16 10-18 10-16-10z" fill="#eef6ff"/><path d="M16 25v18l16 9 18-10V25" /><path d="M32 35v17" /><circle cx="20" cy="18" r="2" fill="#ffffff"/><circle cx="48" cy="16" r="2" fill="#ffffff"/><circle cx="52" cy="48" r="2" fill="#ffffff"/><path d="M20 18L34 15"/><path d="M48 16L50 25"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived Gaussian splatting / 3D 高斯泼溅 — `paper.derived.architecture.gaussian.splatting.paper_derived_outline.v1`
**meaning**: Paper-derived Gaussian splatting / 3D 高斯泼溅 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><path d="M16 25l18-10 16 10-18 10-16-10z" fill="#eef6ff"/><path d="M16 25v18l16 9 18-10V25" /><path d="M32 35v17" /><circle cx="20" cy="18" r="2" fill="#ffffff"/><circle cx="48" cy="16" r="2" fill="#ffffff"/><circle cx="52" cy="48" r="2" fill="#ffffff"/><path d="M20 18L34 15"/><path d="M48 16L50 25"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived BEV perception / BEV 鸟瞰感知 — `paper.derived.architecture.bev.perception.paper_derived_outline.v1`
**meaning**: Paper-derived BEV perception / BEV 鸟瞰感知 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><path d="M16 25l18-10 16 10-18 10-16-10z" fill="#eef6ff"/><path d="M16 25v18l16 9 18-10V25" /><path d="M32 35v17" /><circle cx="20" cy="18" r="2" fill="#ffffff"/><circle cx="48" cy="16" r="2" fill="#ffffff"/><circle cx="52" cy="48" r="2" fill="#ffffff"/><path d="M20 18L34 15"/><path d="M48 16L50 25"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived camera frustum geometry / 相机视锥 — `paper.derived.architecture.camera.frustum.paper_derived_outline.v1`
**meaning**: Paper-derived camera frustum geometry / 相机视锥 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><path d="M16 25l18-10 16 10-18 10-16-10z" fill="#eef6ff"/><path d="M16 25v18l16 9 18-10V25" /><path d="M32 35v17" /><circle cx="20" cy="18" r="2" fill="#ffffff"/><circle cx="48" cy="16" r="2" fill="#ffffff"/><circle cx="52" cy="48" r="2" fill="#ffffff"/><path d="M20 18L34 15"/><path d="M48 16L50 25"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived point-voxel fusion / 点-体素融合 — `paper.derived.architecture.point.voxel.fusion.paper_derived_outline.v1`
**meaning**: Paper-derived point-voxel fusion / 点-体素融合 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="8" y="14" width="14" height="14" rx="4" fill="#f8fafc"/><rect x="8" y="38" width="14" height="10" rx="4" fill="#f8fafc"/><path d="M22 21L32 32" /><path d="M32 32l-5-4M32 32l-5 4"/><path d="M22 43L32 32" /><path d="M32 32l-5-4M32 32l-5 4"/><circle cx="36" cy="32" r="6" fill="#eef6ff"/><path d="M42 32L55 32" /><path d="M55 32l-5-4M55 32l-5 4"/><path d="M12 22l4-4 4 6M12 42h6" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## ai.vision.vit.patch.encoder / ViT 图块编码 — `ai.vision.vit.patch.encoder.ppt_primitive.v1`
**meaning**: ai.vision.vit.patch.encoder / ViT 图块编码 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><rect x="32" y="34" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="56" y="34" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="80" y="34" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="104" y="34" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="32" y="58" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="56" y="58" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="80" y="58" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="104" y="58" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="32" y="82" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="56" y="82" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="80" y="82" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="104" y="82" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="32" y="106" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="56" y="106" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="80" y="106" width="20" height="20" rx="2" fill="#F8FAFC"/><rect x="104" y="106" width="20" height="20" rx="2" fill="#F8FAFC"/><line x1="126" y1="80" x2="154" y2="80" /><polyline points="147.11406378396845,84.07233132600297 154,80 147.11406378396845,75.92766867399703"/><rect x="160" y="42" width="42" height="76" rx="8" fill="#F8FAFC"/></svg>
```
