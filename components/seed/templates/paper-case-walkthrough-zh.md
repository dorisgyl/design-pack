---
slug: packs/design-pack/templates/paper-case-walkthrough-zh
type: template
lang: zh
category: paper-figure
title: "论文图 · 案例走查（分镜）"
title_zh: "论文图 · 案例走查（分镜）"
description: "以分镜呈现的案例走查图：顺序面板跟随一个样例端到端（输入 → 编码 → 匹配 → 预测），每格含一个图标场景和一句说明。"
tags: [paper-figure, diagram, storyboard, svg, 论文图, template]
sample_image: packs/design-pack/assets/templates/paper-case-walkthrough.png
source: design-pack/paper-case-walkthrough
---
## 设计说明

用 **storyboard（分镜）** 语法把一个具体样例走查一遍：从左到右的带框面板，每格是一个带编号的步骤、一个场景图标、一句说明，面板间用箭头连接。适合定性 / 案例研究类配图。

## 模板（HTML）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Case walkthrough — storyboard</title>
<style>
  :root{
    --bg-color:#fafbff; --ink:#1f2937; --muted:#6b7280; --spoke:#94a3b8;
    --blue:#2f6fdb; --blue-t:#eef3fe; --teal:#159e87; --teal-t:#e7f6f2;
    --amber:#d7973d; --amber-t:#fbf3e6; --purple:#6b4fc4; --purple-t:#f0ecfb; --navy:#23357a;
    --shadow:0 3px 8px -2px rgba(31,41,55,.10),0 1px 3px -1px rgba(31,41,55,.06);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
  .diagram-wrapper{width:100%;max-width:1000px;overflow-x:auto;background:var(--bg-color);border-radius:14px;box-shadow:0 10px 25px rgba(0,0,0,.05);border:1px solid #eef1f7;}
  .diagram-canvas{position:relative;width:1000px;height:520px;margin:0 auto;}
  .title-pill{position:absolute;top:18px;left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;font-size:13.5px;font-weight:600;padding:7px 20px;border-radius:999px;box-shadow:var(--shadow);z-index:30;}
  .svg-layer{position:absolute;inset:0;width:100%;height:100%;z-index:6;pointer-events:none;}
  .panel{position:absolute;top:108px;width:200px;height:316px;background:#fff;border:1.6px solid;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);z-index:20;display:flex;flex-direction:column;}
  .phead{height:48px;display:flex;align-items:center;gap:9px;padding:0 14px;color:#fff;font-weight:700;font-size:14px;}
  .pnum{flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:12px;}
  .pscene{flex:1;display:flex;align-items:center;justify-content:center;}
  .pscene svg{width:64px;height:64px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;}
  .pcap{padding:11px 14px 14px;font-size:11.5px;color:var(--ink);line-height:1.45;border-top:1px solid #eef1f7;}
  .pcap b{font-style:normal;}
  .mvar{font-family:Georgia,serif;font-style:italic;}
  .p-blue{border-color:var(--blue);} .p-blue .phead{background:var(--blue);} .p-blue .pscene{background:var(--blue-t);color:var(--blue);}
  .p-teal{border-color:var(--teal);} .p-teal .phead{background:var(--teal);} .p-teal .pscene{background:var(--teal-t);color:var(--teal);}
  .p-amber{border-color:var(--amber);} .p-amber .phead{background:var(--amber);} .p-amber .pscene{background:var(--amber-t);color:var(--amber);}
  .p-purple{border-color:var(--purple);} .p-purple .phead{background:var(--purple);} .p-purple .pscene{background:var(--purple-t);color:var(--purple);}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="ic-in" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 9l1 0"/><path d="M9 13l6 0"/><path d="M9 17l6 0"/></symbol>
<symbol id="ic-enc" viewBox="1 1 22 22"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></symbol>
<symbol id="ic-search" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M21 21l-6 -6"/></symbol>
<symbol id="ic-pred" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M12 7a5 5 0 1 0 5 5"/><path d="M13 3.055a9 9 0 1 0 7.941 7.945"/><path d="M15 6v3h3l3 -3h-3v-3l-3 3"/><path d="M15 9l-3 3"/></symbol>
</defs></svg>

<div class="diagram-wrapper">
  <div class="diagram-canvas">
    <div class="title-pill">案例走查 — 一个样例，端到端</div>

    <svg class="svg-layer" viewBox="0 0 1000 520">
      <defs><g id="ah"><polygon points="-6,-5 6,0 -6,5" fill="var(--bg-color)" stroke="var(--spoke)" stroke-width="1.8" stroke-linejoin="round"/></g></defs>
      <g stroke="var(--spoke)" stroke-width="1.8" fill="none">
        <path d="M254 266 L280 266"/><path d="M486 266 L512 266"/><path d="M718 266 L744 266"/>
      </g>
      <use href="#ah" transform="translate(281,266)"/><use href="#ah" transform="translate(513,266)"/><use href="#ah" transform="translate(745,266)"/>
    </svg>

    <div class="panel p-blue" style="left:52px;">
      <div class="phead"><span class="pnum">1</span>输入</div>
      <div class="pscene"><svg><use href="#ic-in"/></svg></div>
      <div class="pcap">一个查询样例 <span class="mvar">x</span> 进入 —— 例如"分类这份报告"。</div>
    </div>
    <div class="panel p-teal" style="left:284px;">
      <div class="phead"><span class="pnum">2</span>编码</div>
      <div class="pscene"><svg><use href="#ic-enc"/></svg></div>
      <div class="pcap">编码器将其映射为特征 <span class="mvar">h</span> = f(<span class="mvar">x</span>)。</div>
    </div>
    <div class="panel p-amber" style="left:516px;">
      <div class="phead"><span class="pnum">3</span>匹配</div>
      <div class="pscene"><svg><use href="#ic-search"/></svg></div>
      <div class="pcap">将 <span class="mvar">h</span> 与记忆 / 候选检索并比较。</div>
    </div>
    <div class="panel p-purple" style="left:748px;">
      <div class="phead"><span class="pnum">4</span>预测</div>
      <div class="pscene"><svg><use href="#ic-pred"/></svg></div>
      <div class="pcap">输出 <span class="mvar">ŷ</span> 及校准后的置信分数。</div>
    </div>
  </div>
</div>
</body>
</html>

```
