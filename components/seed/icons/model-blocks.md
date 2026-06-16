---
slug: packs/design-pack/icons/model-blocks
type: spec
collection: icons
dashboard: false
title: "Paper-figure icons — Model blocks"
title_en: "Paper-figure icons — Model blocks"
title_zh: "论文图图标 — 模型模块"
description: "Encoders, decoders, attention, MoE, adapters, latent spaces, and core NN blocks."
description_en: "Encoders, decoders, attention, MoE, adapters, latent spaces, and core NN blocks."
description_zh: "编码器、解码器、注意力、MoE、适配器、隐空间等核心神经网络模块。"
tags: [paper-figure, icon, svg, primitive, model-blocks, 论文图, 图标]
license: "MIT-0 (paper-framework-figure-studio-pro); Tabler MIT / Lucide ISC where noted"
---

# Paper-figure icons — Model blocks / 论文图图标 — 模型模块

Recolorable, library-free SVG primitives for CS paper figures. `design-build` retrieves these to compose figures: copy the `<svg>` and (for `currentColor` icons) set `color:` to the module's role colour. Each lists its connector **ports** (normalised x,y) for wiring edges. Provenance: paper-framework-figure-studio-pro vector library (MIT-0).

> 可重新着色的、零依赖 SVG 基元。复制 `<svg>`,`currentColor` 图标可用 `color:` 改成角色色;`ports` 为连线锚点 (归一化坐标)。

## Embedding representation / 嵌入 embedding — `model.embedding.tabler_outline.v1`
**meaning**: Embedding representation / 嵌入 embedding · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg  xmlns="http://www.w3.org/2000/svg"   viewBox="2 2 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-icon-id="model.embedding.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="18.5" cy="5.5" r=".5" fill="currentColor" /><circle cx="11.5" cy="11.5" r=".5" fill="currentColor" /><circle cx="7.5" cy="16.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="14.5" r=".5" fill="currentColor" /><path d="M3 3v16a2 2 0 0 0 2 2h16" /></svg>
```

## Attention or focus mechanism / 注意力 — `model.attention.tabler_outline.v1`
**meaning**: Attention or focus mechanism / 注意力 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.attention.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.5 12a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" /><path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 3l0 2" /><path d="M3 12l2 0" /><path d="M12 19l0 2" /><path d="M19 12l2 0" /></svg>
```

## Transformer encoder / feature extractor / Transformer 编码器 — `model.transformer.encoder.lucide_outline.v1`
**meaning**: Transformer encoder / feature extractor / Transformer 编码器 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg  xmlns="http://www.w3.org/2000/svg"   viewBox="1 1 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-icon-id="model.transformer.encoder.lucide_outline.v1" data-source="lucide-static" width="40" height="40"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /><rect x="14" y="2" width="8" height="8" rx="1" /></svg>
```

## Transformer decoder / generator / Transformer 解码器 — `model.transformer.decoder.lucide_outline.v1`
**meaning**: Transformer decoder / generator / Transformer 解码器 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg  xmlns="http://www.w3.org/2000/svg"   viewBox="2 2 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-icon-id="model.transformer.decoder.lucide_outline.v1" data-source="lucide-static" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" /></svg>
```

## Layer stack or model depth / 层堆叠 (×N) — `model.layers.stack.tabler_outline.v1`
**meaning**: Layer stack or model depth / 层堆叠 (×N) · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.layers.stack.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" /><path d="M4 10a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" /></svg>
```

## Generic model module / 通用模块块 — `model.module.block.tabler_outline.v1`
**meaning**: Generic model module / 通用模块块 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.module.block.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>
```

## Mixture-of-experts module / 混合专家 MoE — `model.moe.tabler_outline.v1`
**meaning**: Mixture-of-experts module / 混合专家 MoE · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.moe.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
```

## Router or gating module / 路由器 router — `model.router.tabler_outline.v1`
**meaning**: Router or gating module / 路由器 router · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.router.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" /><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" /></svg>
```

## Gating mechanism / 门控 gate — `model.gate.tabler_outline.v1`
**meaning**: Gating mechanism / 门控 gate · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.gate.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>
```

## Adapter module / 适配器 / LoRA — `model.adapter.tabler_outline.v1`
**meaning**: Adapter module / 适配器 / LoRA · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.adapter.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M6 4v4" /><path d="M6 12v8" /><path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 4v10" /><path d="M12 18v2" /><path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M18 4v1" /><path d="M18 9v11" /></svg>
```

## Latent space or distribution map / 隐空间 / 表征 — `model.latent.space.tabler_outline.v1`
**meaning**: Latent space or distribution map / 隐空间 / 表征 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.latent.space.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M3 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M9 17l5 -1.5" /><path d="M6.5 8.5l7.81 5.37" /><path d="M7 7l8 -1" /></svg>
```

## Memory bank / 记忆库 / KV 缓存 — `model.memory.bank.tabler_outline.v1`
**meaning**: Memory bank / 记忆库 / KV 缓存 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.memory.bank.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" /><path d="M4 6v6c0 1.43 2.67 2.627 6.243 2.927" /><path d="M20 10.5v-4.5" /><path d="M4 12v6c0 1.546 3.12 2.82 7.128 2.982" /><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" /></svg>
```

## Generator module / 生成器 — `model.generator.tabler_outline.v1`
**meaning**: Generator module / 生成器 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.generator.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 21l15 -15l-3 -3l-15 15l3 3" /><path d="M15 6l3 3" /><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /></svg>
```

## Neural model or learned intelligence / 神经网络主干 — `model.neural.brain.tabler_outline.v1`
**meaning**: Neural model or learned intelligence / 神经网络主干 · **use**: architecture, method_framework, scene_spec_icon_slot · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  data-icon-id="model.neural.brain.tabler_outline.v1" data-source="@tabler/icons" width="40" height="40"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
```

## Paper-derived encoder-decoder architecture / 编码器-解码器架构 — `paper.derived.architecture.encoder.decoder.paper_derived_outline.v1`
**meaning**: Paper-derived encoder-decoder architecture / 编码器-解码器架构 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="7" y="13" width="13" height="38" rx="4" fill="#f8fafc"/><rect x="25" y="22" width="14" height="20" rx="5" fill="#eef6ff"/><rect x="44" y="13" width="13" height="38" rx="4" fill="#f8fafc"/><path d="M20 32L25 32" /><path d="M25 32l-5-4M25 32l-5 4"/><path d="M39 32L44 32" /><path d="M44 32l-5-4M44 32l-5 4"/><path d="M11 20h5M11 27h5M11 34h5M11 41h5M48 20h5M48 27h5M48 34h5M48 41h5" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived transformer block motif / Transformer 块 — `paper.derived.architecture.transformer.block.paper_derived_outline.v1`
**meaning**: Paper-derived transformer block motif / Transformer 块 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="13" y="9" width="38" height="46" rx="7" fill="#eef6ff"/><rect x="19" y="15" width="26" height="9" rx="3" fill="#f8fafc"/><rect x="19" y="29" width="26" height="9" rx="3" fill="#f8fafc"/><rect x="19" y="43" width="26" height="6" rx="3" fill="#f8fafc"/><path d="M23 19h18M23 33h18M23 46h18" /><circle cx="17" cy="19" r="2" fill="#ffffff"/><circle cx="17" cy="33" r="2" fill="#ffffff"/><circle cx="17" cy="46" r="2" fill="#ffffff"/></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived U-Net skip architecture / U-Net 跳连 — `paper.derived.architecture.unet.skip.paper_derived_outline.v1`
**meaning**: Paper-derived U-Net skip architecture / U-Net 跳连 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="7" y="13" width="13" height="38" rx="4" fill="#f8fafc"/><rect x="25" y="22" width="14" height="20" rx="5" fill="#eef6ff"/><rect x="44" y="13" width="13" height="38" rx="4" fill="#f8fafc"/><path d="M20 32L25 32" /><path d="M25 32l-5-4M25 32l-5 4"/><path d="M39 32L44 32" /><path d="M44 32l-5-4M44 32l-5 4"/><path d="M11 20h5M11 27h5M11 34h5M11 41h5M48 20h5M48 27h5M48 34h5M48 41h5" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived diffusion denoise chain / 扩散去噪链 — `paper.derived.architecture.diffusion.chain.paper_derived_outline.v1`
**meaning**: Paper-derived diffusion denoise chain / 扩散去噪链 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="12" cy="32" r="4" fill="#ffffff"/><circle cx="22" cy="27" r="2.4" fill="#ffffff"/><circle cx="24" cy="38" r="2.2" fill="#ffffff"/><path d="M27 32L38 32" /><path d="M38 32l-5-4M38 32l-5 4"/><rect x="42" y="22" width="12" height="20" rx="4" fill="#eef6ff"/><path d="M43 16C32 9 18 12 12 22" stroke="#2f80ed" opacity="0.8"/><path d="M52 48C42 55 25 53 14 44" stroke="#2f80ed" opacity="0.8"/><path d="M46 28h4M46 33h4M46 38h3" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived selective scan block / Mamba / SSM 选择扫描 — `paper.derived.architecture.mamba.scan.paper_derived_outline.v1`
**meaning**: Paper-derived selective scan block / Mamba / SSM 选择扫描 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><rect x="8" y="24" width="8" height="16" rx="4" fill="#f8fafc"/><rect x="21" y="24" width="8" height="16" rx="4" fill="#f8fafc"/><rect x="34" y="24" width="8" height="16" rx="4" fill="#f8fafc"/><rect x="47" y="24" width="8" height="16" rx="4" fill="#f8fafc"/><path d="M10 18C20 8 43 8 54 18" stroke="#2f80ed" opacity="0.85"/><path d="M11 46h41" /><path d="M52 46l-5-4M52 46l-5 4"/><path d="M17 32h4M30 32h4M43 32h4" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## Paper-derived autoencoder bottleneck / 自编码器瓶颈 — `paper.derived.architecture.autoencoder.bottleneck.paper_derived_outline.v1`
**meaning**: Paper-derived autoencoder bottleneck / 自编码器瓶颈 · **use**: architecture, method_framework, scene_spec_icon_slot, visual_layout_reuse · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><g><circle cx="18" cy="21" r="2.3" fill="#ffffff"/><circle cx="24" cy="16" r="1.8" fill="#ffffff"/><circle cx="15" cy="29" r="1.7" fill="#ffffff"/><circle cx="43" cy="39" r="2.4" fill="#eef6ff"/><circle cx="49" cy="33" r="1.8" fill="#eef6ff"/><circle cx="39" cy="47" r="1.7" fill="#eef6ff"/><path d="M11 50C21 31 36 25 53 14" stroke="#2f80ed" opacity="0.85"/><path d="M10 36c9 8 21 10 37 5" /></g><circle cx="50" cy="14" r="4.5" fill="#2f80ed" opacity="0.16" stroke="none"/></svg>
```

## ai.attention.block.causal.mask / 因果掩码注意力 — `ai.attention.block.causal.mask.ppt_primitive.v1`
**meaning**: ai.attention.block.causal.mask / 因果掩码注意力 · **use**: PPT neural-network diagram, architecture stencil, scene_spec object prototype · **ports**: in (0,0.5) · out (1,0.5) · ctrl (0.5,0) · fb (0.5,1)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><rect x="42" y="28" width="156" height="112" rx="8" /><rect x="54" y="40" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="85" y="40" width="28" height="28" rx="2" fill="none" opacity=".28"/><rect x="116" y="40" width="28" height="28" rx="2" fill="none" opacity=".28"/><rect x="147" y="40" width="28" height="28" rx="2" fill="none" opacity=".28"/><rect x="54" y="71" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="85" y="71" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="116" y="71" width="28" height="28" rx="2" fill="none" opacity=".28"/><rect x="147" y="71" width="28" height="28" rx="2" fill="none" opacity=".28"/><rect x="54" y="102" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="85" y="102" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="116" y="102" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="147" y="102" width="28" height="28" rx="2" fill="none" opacity=".28"/><rect x="54" y="133" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="85" y="133" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="116" y="133" width="28" height="28" rx="2" fill="#F8FAFC"/><rect x="147" y="133" width="28" height="28" rx="2" fill="#F8FAFC"/></svg>
```
