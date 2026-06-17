---
slug: packs/design-pack/icons/agent-retrieval
type: spec
collection: icons
dashboard: false
title: "Paper-figure icons — Agents & retrieval"
title_en: "Paper-figure icons — Agents & retrieval"
title_zh: "论文图图标 — 智能体与检索"
description: "Agent loops, planners, tools, memory, multi-agent, RAG, rerankers, and context."
description_en: "Agent loops, planners, tools, memory, multi-agent, RAG, rerankers, and context."
description_zh: "智能体循环、规划器、工具、记忆、多智能体、RAG、重排与上下文。"
tags: [paper-figure, icon, svg, primitive, agent-retrieval, 论文图, 图标]
license: "MIT-0 primitives; Tabler MIT / Lucide ISC where noted"
---

# Paper-figure icons — Agents & retrieval / 论文图图标 — 智能体与检索

Recolorable, library-free SVG primitives for CS paper figures. `design-build` retrieves these to compose figures: copy the `<svg>` and (for `currentColor` icons) set `color:` to the module's role colour. Each lists its connector **ports** (normalised x,y) for wiring edges. Provenance: curated MIT-0 vector primitives.

> 可重新着色的、零依赖 SVG 基元。复制 `<svg>`,`currentColor` 图标可用 `color:` 改成角色色;`ports` 为连线锚点 (归一化坐标)。

## ai.agent.planner.executor.loop / 规划-执行循环 — `ai.agent.planner.executor.loop.ppt_primitive.v1`
**meaning**: ai.agent.planner.executor.loop / 规划-执行循环 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><rect x="36" y="34" width="54" height="38" rx="8" fill="#F8FAFC"/><rect x="150" y="34" width="54" height="38" rx="8" fill="#F8FAFC"/><rect x="92" y="102" width="56" height="30" rx="8" fill="#F8FAFC"/><line x1="90" y1="53" x2="148" y2="53" /><polyline points="141.11406378396845,57.072331326002974 148,53 141.11406378396845,48.927668673997026"/><line x1="176" y1="74" x2="138" y2="100" /><polyline points="141.38343316083876,92.7506979614492 138,100 145.98259315834932,99.47254718858002"/><line x1="100" y1="100" x2="64" y2="74" /><polyline points="71.96659698192246,74.73029619170849 64,74 67.19797393492404,81.33300502601399"/><path d="M64 34 C88 14 152 14 176 34" /></svg>
```

## ai.agent.tool.router / 工具路由 — `ai.agent.tool.router.ppt_primitive.v1`
**meaning**: ai.agent.tool.router / 工具路由 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><circle cx="60" cy="80" r="18" /><rect x="130" y="28" width="54" height="28" rx="6" fill="#F8FAFC"/><rect x="130" y="66" width="54" height="28" rx="6" fill="#F8FAFC"/><rect x="130" y="104" width="54" height="28" rx="6" fill="#F8FAFC"/><line x1="78" y1="80" x2="128" y2="42" /><polyline points="124.98177745886973,49.4088010293308 128,42 120.05357836843544,42.92432854191726"/><line x1="78" y1="80" x2="128" y2="80" /><polyline points="121.11406378396845,84.07233132600297 128,80 121.11406378396845,75.92766867399703"/><line x1="78" y1="80" x2="128" y2="118" /><polyline points="120.05357836843544,117.07567145808274 128,118 124.98177745886973,110.5911989706692"/></svg>
```

## ai.agent.memory.read.write / 记忆读写 — `ai.agent.memory.read.write.ppt_primitive.v1`
**meaning**: ai.agent.memory.read.write / 记忆读写 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><rect x="54" y="40" width="34" height="80" rx="7" fill="#F8FAFC"/><rect x="98" y="40" width="34" height="80" rx="7" fill="#F8FAFC"/><rect x="142" y="40" width="34" height="80" rx="7" fill="#F8FAFC"/><path d="M62 60h18M62 80h18M62 100h18M106 60h18M106 80h18M106 100h18M150 60h18M150 80h18M150 100h18" /></svg>
```

## ai.agent.react.trace / ReAct 推理轨迹 — `ai.agent.react.trace.ppt_primitive.v1`
**meaning**: ai.agent.react.trace / ReAct 推理轨迹 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><rect x="34" y="58" width="30" height="44" rx="7" fill="#F8FAFC"/><rect x="78" y="58" width="30" height="44" rx="7" fill="#F8FAFC"/><rect x="122" y="58" width="30" height="44" rx="7" fill="#F8FAFC"/><rect x="166" y="58" width="30" height="44" rx="7" fill="#F8FAFC"/><line x1="65" y1="80" x2="76" y2="80" /><polyline points="69.11406378396845,84.07233132600297 76,80 69.11406378396845,75.92766867399703"/><line x1="109" y1="80" x2="120" y2="80" /><polyline points="113.11406378396845,84.07233132600297 120,80 113.11406378396845,75.92766867399703"/><line x1="153" y1="80" x2="164" y2="80" /><polyline points="157.11406378396845,84.07233132600297 164,80 157.11406378396845,75.92766867399703"/><path d="M49 112h130" /></svg>
```

## ai.agent.multi.role.swarm / 多角色协作 — `ai.agent.multi.role.swarm.ppt_primitive.v1`
**meaning**: ai.agent.multi.role.swarm / 多角色协作 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><circle cx="58" cy="52" r="10" fill="#FFFFFF"/><circle cx="120" cy="34" r="10" fill="#FFFFFF"/><circle cx="182" cy="52" r="10" fill="#FFFFFF"/><circle cx="84" cy="112" r="10" fill="#FFFFFF"/><circle cx="156" cy="112" r="10" fill="#FFFFFF"/><line x1="58" y1="52" x2="120" y2="34" opacity=".7"/><line x1="120" y1="34" x2="182" y2="52" opacity=".7"/><line x1="58" y1="52" x2="84" y2="112" opacity=".7"/><line x1="182" y1="52" x2="156" y2="112" opacity=".7"/><line x1="84" y1="112" x2="156" y2="112" opacity=".7"/><line x1="120" y1="34" x2="120" y2="82" opacity=".7"/><circle cx="120" cy="82" r="14" fill="#FFFFFF"/></svg>
```

## ai.agent.critic.reflection.loop / 批评-反思循环 — `ai.agent.critic.reflection.loop.ppt_primitive.v1`
**meaning**: ai.agent.critic.reflection.loop / 批评-反思循环 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M64 92 C64 40 176 40 176 92 C176 124 134 132 108 112" /><path d="M108 112l12 1M108 112l4 11" /></svg>
```

## ai.agent.guardrail.gateway / 安全护栏网关 — `ai.agent.guardrail.gateway.ppt_primitive.v1`
**meaning**: ai.agent.guardrail.gateway / 安全护栏网关 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><rect x="28" y="56" width="54" height="48" rx="8" fill="#F8FAFC"/><line x1="84" y1="80" x2="110" y2="80" /><polyline points="103.11406378396845,84.07233132600297 110,80 103.11406378396845,75.92766867399703"/><path d="M120 42 L160 62 V100 L120 122 L80 100 V62 Z" fill="#F8FAFC"/><line x1="162" y1="80" x2="210" y2="80" /><polyline points="203.11406378396845,84.07233132600297 210,80 203.11406378396845,75.92766867399703"/><path d="M113 80h14M120 73v14" /></svg>
```

## Paper-derived agent loop / 智能体闭环 — `paper.derived.architecture.agent.loop.paper_derived_outline.v1`
**meaning**: Paper-derived agent loop / 智能体闭环 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="32" cy="12" r="5" fill="#eef6ff"/><rect x="45" y="26" width="11" height="10" rx="4" fill="#f8fafc"/><rect x="25" y="44" width="14" height="8" rx="4" fill="#eef6ff"/><rect x="8" y="26" width="11" height="10" rx="4" fill="#f8fafc"/><path d="M36 15l11 11M50 36L39 44M25 48L17 36M16 26l12-10" /><path d="M47 26l-5-4M47 26l-5 4"/><path d="M39 44l-4-5M39 44l4-5"/><path d="M17 36l5-4M17 36l5 4"/><path d="M28 16l-4 5M28 16l4 5"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived tool-call block / 工具调用 — `paper.derived.architecture.tool.call.paper_derived_outline.v1`
**meaning**: Paper-derived tool-call block / 工具调用 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="32" cy="12" r="5" fill="#eef6ff"/><rect x="45" y="26" width="11" height="10" rx="4" fill="#f8fafc"/><rect x="25" y="44" width="14" height="8" rx="4" fill="#eef6ff"/><rect x="8" y="26" width="11" height="10" rx="4" fill="#f8fafc"/><path d="M36 15l11 11M50 36L39 44M25 48L17 36M16 26l12-10" /><path d="M47 26l-5-4M47 26l-5 4"/><path d="M39 44l-4-5M39 44l4-5"/><path d="M17 36l5-4M17 36l5 4"/><path d="M28 16l-4 5M28 16l4 5"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived multi-agent collaboration / 多智能体 — `paper.derived.architecture.multi.agent.paper_derived_outline.v1`
**meaning**: Paper-derived multi-agent collaboration / 多智能体 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="32" cy="12" r="5" fill="#eef6ff"/><rect x="45" y="26" width="11" height="10" rx="4" fill="#f8fafc"/><rect x="25" y="44" width="14" height="8" rx="4" fill="#eef6ff"/><rect x="8" y="26" width="11" height="10" rx="4" fill="#f8fafc"/><path d="M36 15l11 11M50 36L39 44M25 48L17 36M16 26l12-10" /><path d="M47 26l-5-4M47 26l-5 4"/><path d="M39 44l-4-5M39 44l4-5"/><path d="M17 36l5-4M17 36l5 4"/><path d="M28 16l-4 5M28 16l4 5"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Search / retriever / 检索 / 搜索 — `retrieval.search.tabler_outline.v1`
**meaning**: Search / retriever / 检索 / 搜索 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="retrieval.search.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
```

## Retrieved context / 检索上下文 — `retrieval.context.tabler_outline.v1`
**meaning**: Retrieved context / 检索上下文 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="retrieval.context.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 3v4a1 1 0 0 0 1 1h4" /><path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2" /><path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" /></svg>
```

## Reranking or sorting / 重排 — `retrieval.rerank.tabler_outline.v1`
**meaning**: Reranking or sorting / 重排 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="retrieval.rerank.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 9l4 -4l4 4m-4 -4v14" /><path d="M21 15l-4 4l-4 -4m4 4v-14" /></svg>
```

## Retriever module / 检索器 — `model.retriever.tabler_outline.v1`
**meaning**: Retriever module / 检索器 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.retriever.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
```

## Reranker module / 重排器 — `model.reranker.tabler_outline.v1`
**meaning**: Reranker module / 重排器 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.reranker.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l9 0" /><path d="M4 12l7 0" /><path d="M4 18l7 0" /><path d="M15 15l3 3l3 -3" /><path d="M18 6l0 12" /></svg>
```

## Paper-derived RAG retrieval flow / RAG 检索增强流程 — `paper.derived.architecture.rag.flow.paper_derived_outline.v1`
**meaning**: Paper-derived RAG retrieval flow / RAG 检索增强流程 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="6" y="24" width="10" height="14" rx="4" fill="#f8fafc"/><path d="M16 31L24 31" /><path d="M24 31l-5-4M24 31l-5 4"/><path d="M25 18c0-5 17-5 17 0v24c0 5-17 5-17 0V18z" fill="#eef6ff"/><path d="M25 18c0 5 17 5 17 0" /><path d="M42 31L51 31" /><path d="M51 31l-5-4M51 31l-5 4"/><rect x="51" y="23" width="7" height="16" rx="4" fill="#f8fafc"/><path d="M28 29h11M28 36h8" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived chunk-index retrieval / 文档分块索引 — `paper.derived.architecture.rag.chunk.index.paper_derived_outline.v1`
**meaning**: Paper-derived chunk-index retrieval / 文档分块索引 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="6" y="24" width="10" height="14" rx="4" fill="#f8fafc"/><path d="M16 31L24 31" /><path d="M24 31l-5-4M24 31l-5 4"/><path d="M25 18c0-5 17-5 17 0v24c0 5-17 5-17 0V18z" fill="#eef6ff"/><path d="M25 18c0 5 17 5 17 0" /><path d="M42 31L51 31" /><path d="M51 31l-5-4M51 31l-5 4"/><rect x="51" y="23" width="7" height="16" rx="4" fill="#f8fafc"/><path d="M28 29h11M28 36h8" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived KV cache memory / KV 缓存 — `paper.derived.architecture.kv.cache.paper_derived_outline.v1`
**meaning**: Paper-derived KV cache memory / KV 缓存 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><path d="M16 16c0-5 32-5 32 0v30c0 5-32 5-32 0V16z" fill="#eef6ff"/><path d="M16 16c0 5 32 5 32 0" /><path d="M21 28h22M21 36h22M21 44h14" /><rect x="9" y="23" width="8" height="8" rx="2" fill="#f8fafc"/><rect x="9" y="36" width="8" height="8" rx="2" fill="#f8fafc"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived context window assembly / 上下文窗口装配 — `paper.derived.architecture.context.window.paper_derived_outline.v1`
**meaning**: Paper-derived context window assembly / 上下文窗口装配 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><path d="M16 16c0-5 32-5 32 0v30c0 5-32 5-32 0V16z" fill="#eef6ff"/><path d="M16 16c0 5 32 5 32 0" /><path d="M21 28h22M21 36h22M21 44h14" /><rect x="9" y="23" width="8" height="8" rx="2" fill="#f8fafc"/><rect x="9" y="36" width="8" height="8" rx="2" fill="#f8fafc"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```
