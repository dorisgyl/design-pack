---
slug: packs/design-pack/templates/paper-architecture-zh
type: template
lang: zh
category: paper-figure
title: "论文图 · 架构图（分层堆叠）"
title_zh: "论文图 · 架构图（分层堆叠）"
description: "分层系统架构图：自上而下堆叠的带标签层（数据 ▸ 编码 ▸ 核心 ▸ 输出），每层放若干带图标的模块卡，数据沿层栈向下流动。"
tags: [paper-figure, diagram, layer-stack, svg, 论文图, template]
sample_image: packs/design-pack/assets/templates/paper-architecture.png
source: paper-framework-figure-studio-pro/paper-architecture
---
## 设计说明

架构图用 **layer_stack（分层堆叠）** 语法——它必须和线性 pipeline 看起来不一样。每条带子是一层（左侧色标 + 若干模块卡）；层间流向箭头沿列向下。每层一种强调色（颜色=角色）。模块图标用内联 `<symbol>` 雪碧图里可重着色的 Tabler `currentColor` 图标。把通用模块换成论文真实的层，重复用 `×N` 标记而不是复制块。

## 模板（HTML）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Architecture Figure — layer stack</title>
<style>
  :root{
    --bg-color:#fafbff; --ink:#1f2937; --muted:#6b7280;
    --blue:#2f6fdb; --blue-t:#eef3fe;
    --teal:#159e87; --teal-t:#e7f6f2;
    --red:#e0564f;  --red-t:#fdeceb;
    --purple:#6b4fc4; --purple-t:#f0ecfb;
    --shadow:0 3px 8px -2px rgba(31,41,55,.10),0 1px 3px -1px rgba(31,41,55,.06);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
  .diagram-wrapper{width:100%;max-width:1000px;overflow-x:auto;background:var(--bg-color);border-radius:14px;box-shadow:0 10px 25px rgba(0,0,0,.05);border:1px solid #eef1f7;}
  .diagram-canvas{position:relative;width:1000px;height:520px;margin:0 auto;}
  .title-pill{position:absolute;top:18px;left:50%;变换:translateX(-50%);background:#23357a;color:#fff;font-size:13.5px;font-weight:600;padding:7px 20px;border-radius:999px;box-shadow:var(--shadow);z-index:30;}
  .svg-layer{position:absolute;inset:0;width:100%;height:100%;z-index:25;pointer-events:none;}
  .band{position:absolute;left:154px;width:816px;height:86px;border-radius:12px;z-index:5;}
  .tab{position:absolute;left:38px;width:104px;height:86px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;color:#fff;z-index:8;box-shadow:var(--shadow);}
  .tab b{font-size:16px;font-weight:700;letter-spacing:.3px;}
  .tab span{font-size:10.5px;opacity:.85;}
  .mod{position:absolute;height:58px;background:#fff;border:1.6px solid;border-radius:10px;display:flex;align-items:center;gap:11px;padding:0 14px;box-shadow:var(--shadow);z-index:10;}
  .ic{flex:0 0 26px;width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
  .mod .tx{display:flex;flex-direction:column;line-height:1.25;}
  .mod .ml{font-size:13.5px;font-weight:600;color:var(--ink);}
  .mod .ms{font-size:10px;color:var(--muted);}
  .b-blue{border-color:var(--blue);} .b-teal{border-color:var(--teal);}
  .b-red{border-color:var(--red);}  .b-purple{border-color:var(--purple);}
</style>
</head>
<body>
<!-- icon sprite (real recolorable primitives from the design-pack icon library) -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="ic-dataset" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"/><path d="M4 6v6a8 3 0 0 0 16 0v-6"/><path d="M4 12v6a8 3 0 0 0 16 0v-6"/></symbol>
<symbol id="ic-split" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M7 8l0 8"/><path d="M9 18h6a2 2 0 0 0 2 -2v-5"/><path d="M14 14l3 -3l3 3"/></symbol>
<symbol id="ic-augment" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 21l15 -15l-3 -3l-15 15l3 3"/><path d="M15 6l3 3"/><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/></symbol>
<symbol id="ic-embed" viewBox="2 2 20 20"><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="18.5" cy="5.5" r=".5" fill="currentColor"/><circle cx="11.5" cy="11.5" r=".5" fill="currentColor"/><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="14.5" r=".5" fill="currentColor"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/></symbol>
<symbol id="ic-encoder" viewBox="1 1 22 22"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></symbol>
<symbol id="ic-pos" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 16l6 -7l5 5l5 -6"/><path d="M14 14a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M9 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M3 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M19 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></symbol>
<symbol id="ic-attn" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 12a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor"/><path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 3l0 2"/><path d="M3 12l2 0"/><path d="M12 19l0 2"/><path d="M19 12l2 0"/></symbol>
<symbol id="ic-experts" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"/><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M17 10h2a2 2 0 0 1 2 2v1"/><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M3 13v-1a2 2 0 0 1 2 -2h2"/></symbol>
<symbol id="ic-mem" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3"/><path d="M4 6v6c0 1.43 2.67 2.627 6.243 2.927"/><path d="M20 10.5v-4.5"/><path d="M4 12v6c0 1.546 3.12 2.82 7.128 2.982"/><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138"/></symbol>
<symbol id="ic-head" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2"/><path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592"/><path d="M7 10h-.01"/></symbol>
<symbol id="ic-decoder" viewBox="2 2 20 20"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/></symbol>
<symbol id="ic-loss" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M13.41 10.59l2.59 -2.59"/><path d="M7 12a5 5 0 0 1 5 -5"/></symbol>
</defs></svg>

<div class="diagram-wrapper">
  <div class="diagram-canvas">
    <div class="title-pill">系统架构 — 分层视图（数据 ▸ 输出）</div>

    <svg class="svg-layer" viewBox="0 0 1000 520">
      <defs><g id="ah"><polygon points="-4.5,-4 4.5,0 -4.5,4" fill="var(--bg-color)" stroke="#64748b" stroke-width="1.5" stroke-linejoin="round"/></g></defs>
      <g stroke="#64748b" stroke-width="1.5" fill="none">
        <path d="M292 146 L292 163"/><path d="M560 146 L560 163"/><path d="M828 146 L828 163"/>
        <path d="M292 252 L292 269"/><path d="M560 252 L560 269"/><path d="M828 252 L828 269"/>
        <path d="M292 358 L292 375"/><path d="M560 358 L560 375"/><path d="M828 358 L828 375"/>
      </g>
      <use href="#ah" 变换="translate(292,164) rotate(90)"/><use href="#ah" 变换="translate(560,164) rotate(90)"/><use href="#ah" 变换="translate(828,164) rotate(90)"/>
      <use href="#ah" 变换="translate(292,270) rotate(90)"/><use href="#ah" 变换="translate(560,270) rotate(90)"/><use href="#ah" 变换="translate(828,270) rotate(90)"/>
      <use href="#ah" 变换="translate(292,376) rotate(90)"/><use href="#ah" 变换="translate(560,376) rotate(90)"/><use href="#ah" 变换="translate(828,376) rotate(90)"/>
    </svg>

    <!-- LAYER 1 : DATA -->
    <div class="band" style="top:60px;background:var(--blue-t);"></div>
    <div class="tab" style="top:60px;background:var(--blue);"><b>数据</b><span>输入</span></div>
    <div class="mod b-blue" style="left:174px;top:74px;width:236px;color:var(--blue);"><svg class="ic"><use href="#ic-dataset"/></svg><div class="tx"><span class="ml">数据集</span><span class="ms">语料 · 信号</span></div></div>
    <div class="mod b-blue" style="left:442px;top:74px;width:236px;color:var(--blue);"><svg class="ic"><use href="#ic-split"/></svg><div class="tx"><span class="ml">分词 · 划分</span><span class="ms">训练 / 验证 / 测试</span></div></div>
    <div class="mod b-blue" style="left:710px;top:74px;width:236px;color:var(--blue);"><svg class="ic"><use href="#ic-augment"/></svg><div class="tx"><span class="ml">数据增广</span><span class="ms">变换</span></div></div>

    <!-- LAYER 2 : ENCODE -->
    <div class="band" style="top:166px;background:var(--teal-t);"></div>
    <div class="tab" style="top:166px;background:var(--teal);"><b>编码</b><span>表征</span></div>
    <div class="mod b-teal" style="left:174px;top:180px;width:236px;color:var(--teal);"><svg class="ic"><use href="#ic-embed"/></svg><div class="tx"><span class="ml">嵌入</span><span class="ms">向量化</span></div></div>
    <div class="mod b-teal" style="left:442px;top:180px;width:236px;color:var(--teal);"><svg class="ic"><use href="#ic-encoder"/></svg><div class="tx"><span class="ml">编码器 ×N</span><span class="ms">堆叠块</span></div></div>
    <div class="mod b-teal" style="left:710px;top:180px;width:236px;color:var(--teal);"><svg class="ic"><use href="#ic-pos"/></svg><div class="tx"><span class="ml">位置编码</span><span class="ms">顺序信号</span></div></div>

    <!-- LAYER 3 : CORE -->
    <div class="band" style="top:272px;background:var(--red-t);"></div>
    <div class="tab" style="top:272px;background:var(--red);"><b>核心</b><span>模型</span></div>
    <div class="mod b-red" style="left:174px;top:286px;width:236px;color:var(--red);"><svg class="ic"><use href="#ic-attn"/></svg><div class="tx"><span class="ml">注意力</span><span class="ms">重加权</span></div></div>
    <div class="mod b-red" style="left:442px;top:286px;width:236px;color:var(--red);"><svg class="ic"><use href="#ic-experts"/></svg><div class="tx"><span class="ml">专家 (MoE)</span><span class="ms">路由 · 融合</span></div></div>
    <div class="mod b-red" style="left:710px;top:286px;width:236px;color:var(--red);"><svg class="ic"><use href="#ic-mem"/></svg><div class="tx"><span class="ml">记忆</span><span class="ms">状态 · 缓存</span></div></div>

    <!-- LAYER 4 : OUTPUT -->
    <div class="band" style="top:378px;background:var(--purple-t);"></div>
    <div class="tab" style="top:378px;background:var(--purple);"><b>输出</b><span>输出头</span></div>
    <div class="mod b-purple" style="left:174px;top:392px;width:236px;color:var(--purple);"><svg class="ic"><use href="#ic-head"/></svg><div class="tx"><span class="ml">任务头</span><span class="ms">预测 ŷ</span></div></div>
    <div class="mod b-purple" style="left:442px;top:392px;width:236px;color:var(--purple);"><svg class="ic"><use href="#ic-decoder"/></svg><div class="tx"><span class="ml">解码器</span><span class="ms">生成</span></div></div>
    <div class="mod b-purple" style="left:710px;top:392px;width:236px;color:var(--purple);"><svg class="ic"><use href="#ic-loss"/></svg><div class="tx"><span class="ml">损失 ℒ</span><span class="ms">监督</span></div></div>
  </div>
</div>
</body>
</html>

```
