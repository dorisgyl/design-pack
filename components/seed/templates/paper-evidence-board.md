---
slug: packs/design-pack/templates/paper-evidence-board
type: template
lang: en
category: paper-figure
title: "Paper Figure · Evidence board (matrix map)"
title_zh: "论文图 · 证据板（矩阵表）"
description: "An evidence-board figure as a matrix: methods (rows) × benchmarks (columns) with scores, best-per-column stars, and the proposed method's row highlighted."
description_zh: "以矩阵呈现的证据板图：方法（行）× 基准（列）的分数表，逐列最优加星标，所提方法行高亮。"
tags: [paper-figure, diagram, matrix-map, svg, 论文图, template]
sample_image: packs/design-pack/assets/templates/paper-evidence-board.png
source: design-pack/paper-evidence-board
---
## Design guidance

Use the **matrix_map** grammar for comparison / ablation evidence: a clean rows × columns table, one accent row for "Ours", best-per-column marked. Keep numbers tabular and the legend explicit (↑ higher is better, ★ best). Scores here are placeholders.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Evidence board — matrix map</title>
<style>
  :root{
    --bg-color:#fafbff; --ink:#1f2937; --muted:#6b7280; --border:#e6e9f0;
    --blue:#2f6fdb; --blue-t:#eef3fe; --amber:#d7973d; --navy:#23357a; --green:#1a9e6a;
    --shadow:0 3px 8px -2px rgba(31,41,55,.10),0 1px 3px -1px rgba(31,41,55,.06);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
  .diagram-wrapper{width:100%;max-width:1000px;overflow-x:auto;background:var(--bg-color);border-radius:14px;box-shadow:0 10px 25px rgba(0,0,0,.05);border:1px solid #eef1f7;}
  .diagram-canvas{position:relative;width:1000px;height:520px;margin:0 auto;}
  .title-pill{position:absolute;top:24px;left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;font-size:13.5px;font-weight:600;padding:7px 20px;border-radius:999px;box-shadow:var(--shadow);z-index:30;}
  .matrix{position:absolute;left:170px;top:104px;width:660px;background:#fff;border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);z-index:20;}
  .row{display:grid;grid-template-columns:228px 108px 108px 108px 108px;}
  .row>div{height:58px;display:flex;align-items:center;justify-content:center;border-top:1px solid var(--border);font-size:13.5px;color:var(--ink);font-variant-numeric:tabular-nums;}
  .row>div:first-child{justify-content:flex-start;padding-left:18px;gap:9px;font-weight:600;}
  .hrow>div{height:52px;border-top:none;background:#f2f5fc;color:var(--navy);font-weight:700;font-size:12.5px;}
  .hrow .up{font-size:10px;color:var(--muted);margin-left:3px;}
  .ic{flex:0 0 20px;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;color:var(--muted);}
  .dim{color:var(--muted);font-weight:500;}
  .best{font-weight:700;color:var(--green);}
  .star{color:var(--amber);font-size:11px;vertical-align:super;margin-left:1px;}
  .ours{background:var(--blue-t);}
  .ours>div{border-top:1px solid #cfe0fb;}
  .ours>div:first-child{color:var(--blue);}
  .ours .ic{color:var(--blue);}
  .legend{position:absolute;left:170px;top:454px;width:660px;display:flex;gap:20px;align-items:center;font-size:11.5px;color:var(--muted);z-index:20;}
  .legend b{color:var(--amber);}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="ic-ours" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/></symbol>
<symbol id="ic-dot" viewBox="-1 -1 26 26"><path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/></symbol>
</defs></svg>

<div class="diagram-wrapper">
  <div class="diagram-canvas">
    <div class="title-pill">Evidence board — methods × benchmarks</div>

    <div class="matrix">
      <div class="row hrow">
        <div>Method</div>
        <div>NLU<span class="up">↑</span></div>
        <div>Vision<span class="up">↑</span></div>
        <div>QA<span class="up">↑</span></div>
        <div>Avg<span class="up">↑</span></div>
      </div>
      <div class="row">
        <div><svg class="ic"><use href="#ic-dot"/></svg>Baseline</div>
        <div class="dim">72.1</div><div class="dim">68.4</div><div class="dim">70.2</div><div class="dim">70.2</div>
      </div>
      <div class="row">
        <div><svg class="ic"><use href="#ic-dot"/></svg>Prior work A</div>
        <div>78.5</div><div>74.0</div><div>76.1</div><div>76.2</div>
      </div>
      <div class="row">
        <div><svg class="ic"><use href="#ic-dot"/></svg>Prior SOTA</div>
        <div>81.3</div><div>79.8</div><div>80.0</div><div>80.4</div>
      </div>
      <div class="row ours">
        <div><svg class="ic"><use href="#ic-ours"/></svg>Ours</div>
        <div class="best">84.7<span class="star">★</span></div>
        <div class="best">82.1<span class="star">★</span></div>
        <div class="best">83.5<span class="star">★</span></div>
        <div class="best">83.4<span class="star">★</span></div>
      </div>
    </div>

    <div class="legend">
      <span><b>★</b> best per column</span>
      <span>↑ higher is better</span>
      <span style="color:#94a3b8;">scores are illustrative placeholders</span>
    </div>
  </div>
</div>
</body>
</html>

```
