---
slug: packs/design-pack/templates/workflow-diagram-zh
type: template
lang: zh
category: flowchart
title: "工作流程图"
title_en: "Workflow Diagram"
description: "双阶段「节点 + 箭头」流程图:绝对定位卡片 + SVG 连线层,节点分色、阶段容器、连线带标签。"
tags: [flowchart, diagram, workflow, svg, 流程图, 模板]
sample_image: packs/design-pack/assets/templates/workflow-diagram.svg
source: user/workflow-diagram
---

## 设计指导

在固定尺寸画布上用三层叠放精确手绘的流程图——不依赖图形库,用纯 HTML/CSS/SVG 可靠地画图。

结构
- **固定画布**(`1000×520`),外层 `max-width` 容器加 `overflow-x:auto`:桌面像素级精确,移动端横向滚动。
- **三层**(按 `z-index`):
  - 阶段容器(`.phase-box`,`z-index:1`)——浅色圆角矩形,把步骤分组。
  - SVG 连线层(`.svg-layer`,`z-index:10`,`pointer-events:none`)——所有连接线与箭头,点击穿透到下方节点。
  - 节点卡片(`.node-card`,`z-index:20`)——绝对定位、彩色描边的盒子,可带内联图标;连线标签
    (`.line-label`,`z-index:15`)压在线条之上。
- **配色系统**——每种角色一个强调色(此例:橙=执行,蓝=评审,灰=全局/裁决)。节点、其连线、箭头共用角色色。

连线
- 每条边是一个 SVG `<path>`,用 `L`(直线)与 `Q`(圆角)命令做整洁的正交走线,箭头复用
  `<use href="#arrowhead-…">` 并 `rotate()` 放在终点。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>工作流程图</title>
    <style>
        :root {
            --bg-color: #fafaf9;
            --phase-border: #e2e8f0;
            --phase-text: #64748b;
            --yellow-main: #d7973d;   /* 执行 / 代码 */
            --blue-main: #4b77c5;     /* 评审 / 证据 */
            --slate-main: #5b6876;    /* 裁决 / 全局流向 */
            --text-main: #1e293b;
            --text-muted: #64748b;
            --shadow-sm: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
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
            <!-- 1. 阶段容器 -->
            <div class="phase-box" style="left: 40px; top: 40px; width: 440px; height: 440px;">
                <div class="phase-title">执行阶段</div>
            </div>
            <div class="phase-box" style="left: 520px; top: 40px; width: 440px; height: 440px;">
                <div class="phase-title">评审阶段</div>
            </div>

            <!-- 2. SVG 连线 + 箭头 -->
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

            <!-- 3. 连线标签 -->
            <div class="line-label" style="left: 110px; top: 270px; width: 80px;">修改并迭代</div>
            <div class="line-label" style="left: 450px; top: 275px;">提交评审</div>
            <div class="line-label" style="left: 475px; top: 65px;">继续</div>
            <div class="line-label" style="left: 875px; top: 185px; width: 80px;">审阅与分析</div>
            <div class="line-label" style="left: 715px; top: 430px;">完成</div>

            <!-- 4. 节点卡片 -->
            <div class="node-card node-yellow" style="left: 160px; top: 130px; width: 200px; height: 60px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                执行者 Agent
            </div>
            <div class="node-card node-yellow" style="left: 310px; top: 270px; width: 120px; height: 60px;">代码</div>
            <div class="node-card node-blue" style="left: 590px; top: 130px; width: 220px; height: 60px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                评估者 Agent
            </div>
            <div class="node-card node-blue" style="left: 800px; top: 240px; width: 120px; height: 60px;">证据</div>
            <div class="node-card node-slate" style="left: 640px; top: 330px; width: 120px; height: 60px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--slate-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
                裁决
            </div>
        </div>
    </div>
</body>
</html>
```

## 用法

- **画布**——把 `.diagram-canvas` 设为你的图尺寸(此例 `1000×520`),所有节点/标签/连线坐标都相对它;
  外层 `overflow-x:auto` 处理小屏。
- **加节点**——放一个 `.node-card.node-<color>`,用内联 `left/top/width/height`,可选内联 `<svg>` 图标。
- **连两个节点**——加一条 SVG `<path>`(`L`=直线,`Q`=圆角)从一个节点边连到另一个,再在终点放
  `<use href="#arrowhead-…" transform="translate(x,y) rotate(deg)">` 箭头。
- **给连线加标签**——在该 path 中点附近放一个 `.line-label`。
- **角色配色**——每种角色固定一个强调色,节点描边、连线 stroke、箭头三处共用。
