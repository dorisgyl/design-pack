---
slug: packs/design-pack/templates/paper-method-framework-zh
type: template
lang: zh
category: paper-figure
title: "论文图 · 方法框架（中心枢纽）"
title_zh: "论文图 · 方法框架（中心枢纽）"
description: "方法总览图：一个占主导地位的中心枢纽（所提模型）+ 卫星模块——输入从左侧汇入，输出从右侧引出，变量标在辐条上。"
tags: [paper-figure, diagram, central-core, svg, 论文图, template]
sample_image: packs/design-pack/assets/templates/paper-method-framework.png
source: paper-framework-figure-studio-pro/paper-method-framework
---
## 设计说明

当论文的主旨是"一切围绕这个核心"时用 **central_core（中心枢纽）** 语法。中央放一个大枢纽节点，卫星呈辐射布局；辐条承载变量。输入箭头朝内、输出朝外。枢纽视觉权重最强（实心 + 光晕）。

## 模板（HTML）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Method framework — central core</title>
<style>
  :root{
    --bg-color:#fafbff; --ink:#1f2937; --muted:#6b7280; --spoke:#64748b;
    --blue:#2f6fdb; --teal:#159e87; --amber:#d7973d; --purple:#6b4fc4; --navy:#23357a;
    --shadow:0 3px 8px -2px rgba(31,41,55,.10),0 1px 3px -1px rgba(31,41,55,.06);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
  .diagram-wrapper{width:100%;max-width:1000px;overflow-x:auto;background:var(--bg-color);border-radius:14px;box-shadow:0 10px 25px rgba(0,0,0,.05);border:1px solid #eef1f7;}
  .diagram-canvas{position:relative;width:1000px;height:520px;margin:0 auto;}
  .title-pill{position:absolute;top:18px;left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;font-size:13.5px;font-weight:600;padding:7px 20px;border-radius:999px;box-shadow:var(--shadow);z-index:30;}
  .halo{position:absolute;left:368px;top:140px;width:264px;height:264px;border-radius:50%;background:radial-gradient(circle,rgba(47,111,219,.10),rgba(47,111,219,0) 70%);z-index:1;}
  .svg-layer{position:absolute;inset:0;width:100%;height:100%;z-index:5;pointer-events:none;}
  .node{position:absolute;background:#fff;border:1.6px solid;border-radius:12px;display:flex;align-items:center;gap:11px;padding:0 14px;box-shadow:var(--shadow);z-index:20;}
  .ic{flex:0 0 26px;width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
  .tx{display:flex;flex-direction:column;line-height:1.25;}
  .ml{font-size:13.5px;font-weight:600;color:var(--ink);}
  .ms{font-size:10px;color:var(--muted);}
  .b-blue{border-color:var(--blue);} .b-teal{border-color:var(--teal);}
  .b-amber{border-color:var(--amber);} .b-purple{border-color:var(--purple);}
  /* hub */
  .hub{position:absolute;left:416px;top:220px;width:168px;height:104px;background:var(--navy);color:#fff;
    border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;
    box-shadow:0 8px 20px -4px rgba(35,53,122,.45);z-index:22;}
  .hub .ic{width:30px;height:30px;}
  .hub b{font-size:15px;font-weight:700;}
  .hub span{font-size:10.5px;opacity:.82;}
  .line-label{position:absolute;font-size:12px;color:#475569;font-weight:500;z-index:18;background:var(--bg-color);padding:0 3px;}
  .mvar{font-family:Georgia,serif;font-style:italic;color:var(--ink);}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="ic-core" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/></symbol>
<symbol id="ic-dataset" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"/><path d="M4 6v6a8 3 0 0 0 16 0v-6"/><path d="M4 12v6a8 3 0 0 0 16 0v-6"/></symbol>
<symbol id="ic-encoder" viewBox="1 1 22 22"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></symbol>
<symbol id="ic-mem" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3"/><path d="M4 6v6c0 1.43 2.67 2.627 6.243 2.927"/><path d="M20 10.5v-4.5"/><path d="M4 12v6c0 1.546 3.12 2.82 7.128 2.982"/><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138"/></symbol>
<symbol id="ic-decoder" viewBox="2 2 20 20"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/></symbol>
<symbol id="ic-head" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2"/><path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592"/><path d="M7 10h-.01"/></symbol>
<symbol id="ic-metric" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M13.41 10.59l2.59 -2.59"/><path d="M7 12a5 5 0 0 1 5 -5"/></symbol>
</defs></svg>

<div class="diagram-wrapper">
  <div class="diagram-canvas">
    <div class="title-pill">方法框架 — 中心模型（输入 ▸ 核心 ▸ 输出）</div>
    <div class="halo"></div>

    <svg class="svg-layer" viewBox="0 0 1000 520">
      <defs><g id="ah"><polygon points="-5,-4 5,0 -5,4" fill="var(--bg-color)" stroke="var(--spoke)" stroke-width="1.6" stroke-linejoin="round"/></g></defs>
      <g stroke="var(--spoke)" stroke-width="1.6" fill="none">
        <path d="M172 272 L500 272"/>
        <path d="M300 150 L500 272"/>
        <path d="M300 394 L500 272"/>
        <path d="M500 272 L700 150"/>
        <path d="M500 272 L828 272"/>
        <path d="M500 272 L700 394"/>
      </g>
      <!-- input arrowheads (into hub) -->
      <use href="#ah" transform="translate(416,272)"/>
      <use href="#ah" transform="translate(421,224) rotate(31.4)"/>
      <use href="#ah" transform="translate(421,320) rotate(-31.4)"/>
      <!-- output arrowheads (into satellite) -->
      <use href="#ah" transform="translate(621,198) rotate(-31.4)"/>
      <use href="#ah" transform="translate(744,272)"/>
      <use href="#ah" transform="translate(621,346) rotate(31.4)"/>
    </svg>

    <!-- edge labels -->
    <div class="line-label" style="left:330px;top:256px;"><span class="mvar">x</span></div>
    <div class="line-label" style="left:366px;top:196px;">特征</div>
    <div class="line-label" style="left:366px;top:340px;">上下文</div>
    <div class="line-label" style="left:588px;top:196px;">logits</div>
    <div class="line-label" style="left:636px;top:256px;"><span class="mvar">ŷ</span></div>
    <div class="line-label" style="left:592px;top:340px;">分数</div>

    <!-- hub -->
    <div class="hub"><svg class="ic"><use href="#ic-core"/></svg><b>核心方法</b><span>所提模型</span></div>

    <!-- satellites -->
    <div class="node b-blue"   style="left:88px;top:241px;width:168px;color:var(--blue);"><svg class="ic"><use href="#ic-dataset"/></svg><div class="tx"><span class="ml">输入数据</span><span class="ms">语料 · 信号</span></div></div>
    <div class="node b-teal"   style="left:216px;top:119px;width:168px;color:var(--teal);"><svg class="ic"><use href="#ic-encoder"/></svg><div class="tx"><span class="ml">编码器</span><span class="ms">表征</span></div></div>
    <div class="node b-amber"  style="left:216px;top:363px;width:168px;color:var(--amber);"><svg class="ic"><use href="#ic-mem"/></svg><div class="tx"><span class="ml">检索</span><span class="ms">记忆 · 上下文</span></div></div>
    <div class="node b-purple" style="left:616px;top:119px;width:168px;color:var(--purple);"><svg class="ic"><use href="#ic-decoder"/></svg><div class="tx"><span class="ml">解码器</span><span class="ms">生成</span></div></div>
    <div class="node b-purple" style="left:744px;top:241px;width:168px;color:var(--purple);"><svg class="ic"><use href="#ic-head"/></svg><div class="tx"><span class="ml">预测</span><span class="ms">任务头</span></div></div>
    <div class="node b-amber"  style="left:616px;top:363px;width:168px;color:var(--amber);"><svg class="ic"><use href="#ic-metric"/></svg><div class="tx"><span class="ml">评测</span><span class="ms">指标</span></div></div>
  </div>
</div>
</body>
</html>

```
