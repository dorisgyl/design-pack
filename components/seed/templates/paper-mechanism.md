---
slug: packs/design-pack/templates/paper-mechanism
type: template
lang: en
category: paper-figure
title: "Paper Figure · Mechanism (zoom callouts)"
title_zh: "论文图 · 机制（放大标注）"
description: "A mechanism-intuition figure: an overview strip of the whole model with one module highlighted and magnified into a detail inset that shows its internal mechanism."
description_zh: "机制直觉图：上方一条整体模型的总览带，其中一个模块被高亮并放大为细节插图，展示其内部机制。"
tags: [paper-figure, diagram, zoom-callouts, svg, 论文图, template]
sample_image: packs/design-pack/assets/templates/paper-mechanism.png
source: paper-framework-figure-studio-pro/paper-mechanism
---
## Design guidance

Use the **zoom_callouts** grammar to explain *how one part works*: a compact overview on top, a dashed magnifier from the focal module to a large inset, and the mechanism (here scaled dot-product attention) wired out inside. Density can be higher than an overview figure — but still one symbol = one meaning.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mechanism — zoom callouts</title>
<style>
  :root{
    --bg-color:#fafbff; --ink:#1f2937; --muted:#6b7280; --spoke:#64748b;
    --slate:#5b6876; --blue:#2f6fdb; --teal:#159e87; --red:#e0564f; --purple:#6b4fc4; --navy:#23357a;
    --shadow:0 3px 8px -2px rgba(31,41,55,.10),0 1px 3px -1px rgba(31,41,55,.06);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
  .diagram-wrapper{width:100%;max-width:1000px;overflow-x:auto;background:var(--bg-color);border-radius:14px;box-shadow:0 10px 25px rgba(0,0,0,.05);border:1px solid #eef1f7;}
  .diagram-canvas{position:relative;width:1000px;height:520px;margin:0 auto;}
  .title-pill{position:absolute;top:14px;left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;font-size:13.5px;font-weight:600;padding:7px 20px;border-radius:999px;box-shadow:var(--shadow);z-index:30;}
  .svg-layer{position:absolute;inset:0;width:100%;height:100%;z-index:12;pointer-events:none;}
  .ovb{position:absolute;height:48px;background:#fff;border:1.6px solid;border-radius:10px;display:flex;align-items:center;gap:8px;padding:0 10px;box-shadow:var(--shadow);z-index:20;font-size:12px;font-weight:600;color:var(--ink);}
  .ovb svg{flex:0 0 20px;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
  .ovb-focal{box-shadow:0 0 0 3px rgba(224,86,79,.18),var(--shadow);}
  .b-slate{border-color:var(--slate);color:var(--slate);} .b-teal{border-color:var(--teal);color:var(--teal);}
  .b-red{border-color:var(--red);color:var(--red);} .b-purple{border-color:var(--purple);color:var(--purple);} .b-blue{border-color:var(--blue);color:var(--blue);}
  .ovb .ml{color:var(--ink);}
  .inset{position:absolute;left:150px;top:178px;width:700px;height:292px;background:#fff;border:1.8px dashed var(--red);border-radius:16px;z-index:8;box-shadow:var(--shadow);}
  .inset-h{position:absolute;left:170px;top:192px;font-size:12px;font-weight:700;color:var(--red);z-index:12;}
  .inset-h span{color:var(--muted);font-weight:500;}
  .chip{position:absolute;height:34px;background:#fff;border:1.6px solid;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 12px;font-size:12.5px;font-weight:600;color:var(--ink);box-shadow:var(--shadow);z-index:20;}
  .chip.mono{font-family:Georgia,serif;font-style:italic;}
  .c-slate{border-color:var(--slate);} .c-blue{border-color:var(--blue);} .c-red{border-color:var(--red);} .c-purple{border-color:var(--purple);}
  .line-label{position:absolute;font-size:11px;color:#475569;font-weight:500;z-index:18;background:#fff;padding:0 3px;}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="ic-input" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 9l1 0"/><path d="M9 13l6 0"/><path d="M9 17l6 0"/></symbol>
<symbol id="ic-encoder" viewBox="1 1 22 22"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></symbol>
<symbol id="ic-attn" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 12a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor"/><path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 3l0 2"/><path d="M3 12l2 0"/><path d="M12 19l0 2"/><path d="M19 12l2 0"/></symbol>
<symbol id="ic-ffn" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"/><path d="M12 12l8 -4.5"/><path d="M12 12l0 9"/><path d="M12 12l-8 -4.5"/></symbol>
<symbol id="ic-out" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M12 7a5 5 0 1 0 5 5"/><path d="M13 3.055a9 9 0 1 0 7.941 7.945"/><path d="M15 6v3h3l3 -3h-3v-3l-3 3"/><path d="M15 9l-3 3"/></symbol>
</defs></svg>

<div class="diagram-wrapper">
  <div class="diagram-canvas">
    <div class="title-pill">Mechanism — zoom into one module (scaled dot-product attention)</div>

    <svg class="svg-layer" viewBox="0 0 1000 520">
      <defs>
        <g id="ah"><polygon points="-4.5,-4 4.5,0 -4.5,4" fill="var(--bg-color)" stroke="var(--spoke)" stroke-width="1.5" stroke-linejoin="round"/></g>
        <g id="ahr"><polygon points="-4.5,-4 4.5,0 -4.5,4" fill="#fff" stroke="var(--red)" stroke-width="1.5" stroke-linejoin="round"/></g>
        <g id="ahb"><polygon points="-4.5,-4 4.5,0 -4.5,4" fill="#fff" stroke="var(--blue)" stroke-width="1.5" stroke-linejoin="round"/></g>
      </defs>
      <!-- overview chevrons -->
      <g stroke="var(--spoke)" stroke-width="1.5" fill="none">
        <path d="M190 97 L208 97"/><path d="M360 97 L378 97"/><path d="M530 97 L548 97"/><path d="M700 97 L718 97"/>
      </g>
      <use href="#ah" transform="translate(208,97)"/><use href="#ah" transform="translate(378,97)"/>
      <use href="#ah" transform="translate(548,97)"/><use href="#ah" transform="translate(718,97)"/>
      <!-- zoom callout lines (focal block -> inset corners) -->
      <g stroke="var(--red)" stroke-width="1.4" fill="none" stroke-dasharray="4 4">
        <path d="M412 121 L150 178"/><path d="M528 121 L850 178"/>
      </g>
      <!-- mechanism wiring (blue inside inset) -->
      <g stroke="var(--blue)" stroke-width="1.5" fill="none">
        <path d="M245 352 L283 285"/><path d="M245 352 L283 352"/><path d="M245 352 L283 419"/>
        <path d="M355 285 L398 330"/><path d="M355 352 L398 340"/>
      </g>
      <g stroke="var(--red)" stroke-width="1.5" fill="none">
        <path d="M530 335 L558 335"/><path d="M680 335 L703 372"/>
      </g>
      <path d="M355 419 L640 419 L698 392" stroke="var(--blue)" stroke-width="1.5" fill="none"/>
      <path d="M820 388 L848 388" stroke="var(--purple)" stroke-width="1.6" fill="none"/>
      <use href="#ahb" transform="translate(283,285) rotate(-60)"/><use href="#ahb" transform="translate(283,352)"/><use href="#ahb" transform="translate(283,419) rotate(60)"/>
      <use href="#ahb" transform="translate(398,330) rotate(46)"/><use href="#ahb" transform="translate(398,340) rotate(-13)"/>
      <use href="#ahr" transform="translate(558,335)"/><use href="#ahr" transform="translate(703,372) rotate(52)"/>
      <use href="#ahb" transform="translate(698,392) rotate(-25)"/>
      <use href="#ahb" transform="translate(848,388) rotate(0)" fill="#fff" stroke="var(--purple)"/>
    </svg>

    <!-- overview strip -->
    <div class="ovb b-slate"  style="left:70px;top:73px;width:120px;"><svg><use href="#ic-input"/></svg><span class="ml">Input</span></div>
    <div class="ovb b-teal"   style="left:240px;top:73px;width:120px;"><svg><use href="#ic-encoder"/></svg><span class="ml">Encoder</span></div>
    <div class="ovb b-red ovb-focal" style="left:410px;top:73px;width:120px;"><svg><use href="#ic-attn"/></svg><span class="ml">Attention</span></div>
    <div class="ovb b-teal"   style="left:580px;top:73px;width:120px;"><svg><use href="#ic-ffn"/></svg><span class="ml">FFN</span></div>
    <div class="ovb b-purple" style="left:750px;top:73px;width:120px;"><svg><use href="#ic-out"/></svg><span class="ml">Output</span></div>

    <!-- inset (magnified mechanism) -->
    <div class="inset"></div>
    <div class="inset-h">Inside the attention block&nbsp;&nbsp;<span>— softmax(QKᵀ/√d)·V</span></div>

    <div class="chip c-slate mono" style="left:178px;top:335px;width:66px;">X</div>
    <div class="chip c-blue mono"  style="left:283px;top:268px;width:64px;">Q</div>
    <div class="chip c-blue mono"  style="left:283px;top:335px;width:64px;">K</div>
    <div class="chip c-blue mono"  style="left:283px;top:402px;width:64px;">V</div>
    <div class="chip c-red mono"   style="left:398px;top:318px;width:132px;">QKᵀ / √d</div>
    <div class="chip c-red"        style="left:558px;top:318px;width:122px;">softmax → α</div>
    <div class="chip c-purple mono" style="left:700px;top:371px;width:120px;">α · V</div>

    <!-- labels -->
    <div class="line-label" style="left:300px;top:300px;color:var(--blue);">project</div>
    <div class="line-label" style="left:556px;top:362px;color:var(--red);">weights</div>
    <div class="line-label" style="left:470px;top:402px;color:var(--blue);">values</div>
    <div class="line-label" style="left:826px;top:372px;color:var(--purple);">context</div>
  </div>
</div>
</body>
</html>

```
