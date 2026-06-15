---
slug: packs/design-pack/templates/workflow-diagram
type: template
lang: en
category: flowchart
title: "Workflow Diagram"
title_zh: "工作流程图"
description: "A two-phase node-and-arrow workflow diagram: absolutely-positioned cards linked by an SVG path layer, with color-coded nodes, phase containers, and labeled edges."
tags: [flowchart, diagram, workflow, svg, 流程图, template]
sample_image: packs/design-pack/assets/templates/workflow-diagram.svg
source: user/workflow-diagram
---

## Design guidance

A precise, hand-routed flowchart built from three stacked layers on a fixed-size canvas — the reliable
way to draw a diagram in plain HTML/CSS/SVG without a graph library.

Structure
- **Fixed canvas** (`1000×520`) inside a `max-width` wrapper with `overflow-x:auto`, so the diagram
  stays pixel-accurate on desktop and scrolls horizontally on mobile.
- **Three layers**, by `z-index`:
  - Phase containers (`.phase-box`, `z-index:1`) — light rounded rectangles that group the steps.
  - SVG line layer (`.svg-layer`, `z-index:10`, `pointer-events:none`) — all the connectors and
    arrowheads, so clicks pass through to the nodes beneath.
  - Node cards (`.node-card`, `z-index:20`) — absolutely-positioned, colour-bordered boxes with an
    optional inline icon; edge labels (`.line-label`, `z-index:15`) sit just above the lines.
- **Color system** — one accent per role (here: amber = execution, blue = judgment, slate = global /
  verdict). Nodes, their connecting paths, and arrowheads share the role colour.

Connectors
- Each edge is an SVG `<path>` using `L` (straight) and `Q` (rounded corner) commands for clean
  orthogonal routing, plus a reusable `<use href="#arrowhead-…">` placed and `rotate()`-d at the head.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workflow Diagram</title>
    <style>
        :root {
            --bg-color: #fafaf9;
            --phase-border: #e2e8f0;
            --phase-text: #64748b;
            --yellow-main: #d7973d;   /* execution / code */
            --blue-main: #4b77c5;     /* judgment / evidence */
            --slate-main: #5b6876;    /* verdict / global flow */
            --text-main: #1e293b;
            --text-muted: #64748b;
            --shadow-sm: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .diagram-wrapper { width: 100%; max-width: 1000px; overflow-x: auto; background-color: var(--bg-color);
            border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #f1f1f1; }
        .diagram-canvas { position: relative; width: 1000px; height: 520px; margin: 0 auto; }
        .svg-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; pointer-events: none; }
        .path-line { fill: none; stroke-width: 1.5; stroke-linecap: round; }
        .phase-box { position: absolute; border: 1.5px solid var(--phase-border); border-radius: 16px; z-index: 1; }
        .phase-title { position: absolute; top: 20px; width: 100%; text-align: center; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; color: var(--phase-text); }
        .node-card { position: absolute; background: #ffffff; border: 2px solid; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 500; font-size: 16px; color: var(--text-main); box-shadow: var(--shadow-sm); z-index: 20; }
        .node-yellow { border-color: var(--yellow-main); }
        .node-blue { border-color: var(--blue-main); }
        .node-slate { border-color: var(--slate-main); }
        .line-label { position: absolute; font-size: 13px; color: var(--text-muted); font-weight: 500; z-index: 15; line-height: 1.3; }
    </style>
</head>
<body>
    <div class="diagram-wrapper">
        <div class="diagram-canvas">
            <!-- 1. Phase containers -->
            <div class="phase-box" style="left: 40px; top: 40px; width: 440px; height: 440px;">
                <div class="phase-title">EXECUTION PHASE</div>
            </div>
            <div class="phase-box" style="left: 520px; top: 40px; width: 440px; height: 440px;">
                <div class="phase-title">JUDGMENT PHASE</div>
            </div>

            <!-- 2. SVG connectors + arrowheads -->
            <svg class="svg-layer" viewBox="0 0 1000 520">
                <defs>
                    <g id="arrowhead-yellow"><polygon points="-5,-4 5,0 -5,4" fill="var(--bg-color)" stroke="var(--yellow-main)" stroke-width="1.5" stroke-linejoin="round"/></g>
                    <g id="arrowhead-blue"><polygon points="-5,-4 5,0 -5,4" fill="var(--bg-color)" stroke="var(--blue-main)" stroke-width="1.5" stroke-linejoin="round"/></g>
                    <g id="arrowhead-slate"><polygon points="-5,-4 5,0 -5,4" fill="var(--bg-color)" stroke="var(--slate-main)" stroke-width="1.5" stroke-linejoin="round"/></g>
                </defs>
                <path class="path-line" stroke="var(--yellow-main)" d="M 260 190 L 260 290 Q 260 300 270 300 L 310 300" />
                <use href="#arrowhead-yellow" transform="translate(285, 300) rotate(0)" />
                <path class="path-line" stroke="var(--yellow-main)" d="M 430 300 L 530 300 Q 540 300 540 290 L 540 170 Q 540 160 550 160 L 590 160" />
                <use href="#arrowhead-yellow" transform="translate(510, 300) rotate(0)" />
                <path class="path-line" stroke="var(--yellow-main)" d="M 370 330 L 370 380 Q 370 390 360 390 L 110 390 Q 100 390 100 380 L 100 170 Q 100 160 110 160 L 160 160" />
                <use href="#arrowhead-yellow" transform="translate(100, 280) rotate(-90)" />
                <path class="path-line" stroke="var(--blue-main)" d="M 700 190 L 700 330" />
                <use href="#arrowhead-blue" transform="translate(700, 260) rotate(90)" />
                <path class="path-line" stroke="var(--blue-main)" d="M 810 160 L 850 160 Q 860 160 860 170 L 860 240" />
                <use href="#arrowhead-blue" transform="translate(860, 205) rotate(90)" />
                <path class="path-line" stroke="var(--slate-main)" d="M 700 130 L 700 100 Q 700 90 690 90 L 270 90 Q 260 90 260 100 L 260 130" />
                <use href="#arrowhead-slate" transform="translate(480, 90) rotate(180)" />
                <path class="path-line" stroke="var(--slate-main)" d="M 700 390 L 700 480" />
                <use href="#arrowhead-slate" transform="translate(700, 440) rotate(90)" />
            </svg>

            <!-- 3. Edge labels -->
            <div class="line-label" style="left: 115px; top: 270px; width: 70px;">Changes & Iterates</div>
            <div class="line-label" style="left: 450px; top: 275px;">Submit for Review</div>
            <div class="line-label" style="left: 470px; top: 65px;">Continue</div>
            <div class="line-label" style="left: 875px; top: 185px; width: 80px;">Reviews & Analyzes</div>
            <div class="line-label" style="left: 715px; top: 430px;">Finish</div>

            <!-- 4. Node cards -->
            <div class="node-card node-yellow" style="left: 160px; top: 130px; width: 200px; height: 60px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Executor Agent
            </div>
            <div class="node-card node-yellow" style="left: 310px; top: 270px; width: 120px; height: 60px;">Code</div>
            <div class="node-card node-blue" style="left: 590px; top: 130px; width: 220px; height: 60px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Evaluator Agent
            </div>
            <div class="node-card node-blue" style="left: 800px; top: 240px; width: 120px; height: 60px;">Evidence</div>
            <div class="node-card node-slate" style="left: 640px; top: 330px; width: 120px; height: 60px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--slate-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                Verdict
            </div>
        </div>
    </div>
</body>
</html>
```

## Usage

- **Canvas** — size the `.diagram-canvas` to your diagram (here `1000×520`); every node/label/path
  coordinate is relative to it. The wrapper's `overflow-x:auto` handles small screens.
- **Add a node** — drop a `.node-card.node-<color>` with inline `left/top/width/height` and an optional
  inline `<svg>` icon.
- **Connect two nodes** — add an SVG `<path>` (`L` = straight, `Q` = rounded corner) from one node edge
  to another, then a `<use href="#arrowhead-…" transform="translate(x,y) rotate(deg)">` at the head.
- **Label an edge** — a `.line-label` positioned near the midpoint of its path.
- **Roles** — keep one accent colour per role; reuse it on the node border, its path stroke, and arrowhead.
