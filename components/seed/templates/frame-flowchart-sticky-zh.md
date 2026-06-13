---
slug: packs/design-pack/templates/frame-flowchart-sticky-zh
type: template
lang: zh
category: video
title: "便利贴流程图帧"
title_en: "Sticky Flowchart Frame"
description: "白板风便利贴节点 + SVG 曲线连接,把流程或系统画成手写流程图,适合上手引导与运营讲解视频。"
tags: [flowchart, diagram, sticky, whiteboard, frame, 模板]
sample_image: packs/design-pack/assets/templates/frame-flowchart-sticky.svg
source: html-anything/frame-flowchart-sticky
---
## 设计指导

模板:便利贴流程图帧(Sticky Flowchart)。

意图:把一个流程 / 系统 / 工作流画成"白板 + 便利贴"的样子,适合上手引导视频、运营流程说明、系统架构讲解。整体是随手 brainstorm 的白板感,而不是企业 dashboard 风格。

画布:1920x1080。背景用米黄白板纸 `#f4ede1` 或冷灰白板 `#f0f2f4`;叠一层非常浅的网格 `rgba(0,0,0,0.04)`,让它有真实白板的质感。

节点(便利贴):
- 每个节点 = 一张约 240x180px 的便利贴,4 套颜色随机分配:黄 `#fcd34d` / 桃 `#fca5a5` / 薄荷 `#a7f3d0` / 天蓝 `#a5b4fc`。
- 便利贴有轻微且不一致的旋转(`transform: rotate(+-2deg)`)、柔和投影(`drop-shadow(0 6px 14px rgba(0,0,0,0.12))`)、顶部一条胶带装饰(`linear-gradient(...)`)。
- 节点内容:1 个 emoji 或单线 inline SVG 图标 + 大字标题(16-20px)+ 一行描述(12px)。
- 节点字体用手写感字体:`Kalam` / `Caveat` / `Patrick Hand`(中文用 `霞鹜文楷` 或 `LXGW WenKai Screen`)。

连接线(SVG):
- 用 `<path>` 贝塞尔曲线连接节点,stroke `#2a2a2a`,宽 2.5,`stroke-linecap: round`。主流程用实线(`stroke-dasharray: 0`),条件分支用虚线(`8 6`)。
- 每条连接线用 `marker-end` 收尾:黑色小三角箭头。
- 复杂流程可以分叉(一个节点连出 2 条)或合并(2 条进入同一节点)。

可选交互:
- 顶部一行小号大写 sans caption,例如 "FLOW - MIGRATION - 2026"。
- 鼠标 hover 节点时抬起:加深阴影 + `scale(1.05)`,用 CSS transition。
- 一个装饰"光标"(inline `<svg>` 箭头 + name tag)浮在某个节点旁,模拟 Figma 协作光标。

设计细节:
- 至少 5 个节点,最多 12 个。
- 不要把所有节点都居中对齐,要保留一点白板的"随手贴"感,但保证连接线清晰、不交叉。
- 严禁:全屏深色背景、霓虹色、企业 dashboard 风格。
- 字体必须有手写感,便利贴不要用 Inter / 衬线体。
- 单文件 HTML,不要外部图标库(用 inline SVG)。
- 用真实的流程内容填充便利贴;节点文字直接来自素材本身。

## 模板 (HTML)
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>便利贴流程图 · NevoFlux 上手</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Patrick+Hand&family=Inter:wght@400;500;600&family=IBM+Plex+Mono&display=swap" rel="stylesheet" />
<style>
  body {
    font-family:'Patrick Hand','Caveat',cursive;
    background:
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px),
      #f4ede1;
    background-size: 40px 40px;
    color:#2a2a2a;
    min-height:100vh;
    margin:0;
  }
  .sticky {
    width:200px; min-height:150px;
    padding:14px 16px;
    box-shadow: 0 6px 14px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
    position:absolute;
    border-radius: 2px 2px 4px 4px;
  }
  .sticky::before {
    content:''; position:absolute; top:-8px; left:50%; transform:translateX(-50%) rotate(-2deg);
    width:80px; height:18px; background:rgba(255,255,255,0.6);
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .yellow { background:#fcd34d; transform: rotate(-1.5deg); }
  .peach { background:#fca5a5; transform: rotate(1.2deg); }
  .mint { background:#a7f3d0; transform: rotate(-0.8deg); }
  .sky { background:#a5b4fc; transform: rotate(2deg); }
  .sticky h3 { font-family:'Caveat',cursive; font-size:22px; font-weight:700; line-height:1.1; }
  .sticky p { font-family:'Patrick Hand',cursive; font-size:14px; line-height:1.3; margin-top:6px; opacity:0.85; }
  .num { font-family:'Caveat',cursive; font-weight:700; font-size:28px; line-height:1; }
  .mono { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; }
  .cursor-tag {
    position:absolute; transform: translate(-50%,-100%);
    background:#1a1a1a; color:#fff; font-family:'Inter',sans-serif; font-size:10px;
    padding:2px 8px; border-radius:10px; font-weight:600;
  }
</style>
</head>
<body class="relative overflow-hidden">
  <!-- header -->
  <header class="px-12 pt-10 flex items-baseline justify-between">
    <div class="mono opacity-70">FLOW · ONBOARDING · 2026</div>
    <h1 style="font-family:'Caveat',cursive;font-size:36px;font-weight:700">NevoFlux · 新用户上手</h1>
    <div class="mono opacity-70">FRAME-FLOWCHART-STICKY</div>
  </header>

  <!-- canvas -->
  <div class="relative" style="height:780px">

    <!-- SVG connectors layer -->
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1500 780" preserveAspectRatio="none" style="pointer-events:none">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#2a2a2a"/>
        </marker>
      </defs>
      <!-- 1 → 2 -->
      <path d="M 240 240 C 320 240, 360 240, 420 240" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 2 → 3 -->
      <path d="M 620 240 C 700 240, 740 240, 800 240" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 3 → 4 -->
      <path d="M 1000 240 C 1100 240, 1140 290, 1100 360 S 980 480, 880 480" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 4 → 5 -->
      <path d="M 680 480 C 580 480, 540 480, 480 480" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- 5 → 6 -->
      <path d="M 280 480 C 200 480, 160 540, 180 600 S 280 700, 380 700" fill="none" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)"/>
      <!-- branch: 2 → installer (dashed) -->
      <path d="M 520 320 C 520 400, 560 440, 700 440" fill="none" stroke="#2a2a2a" stroke-width="2" stroke-linecap="round" stroke-dasharray="8 6" marker-end="url(#arrow)"/>
    </svg>

    <!-- node 1: 打开浏览器 -->
    <div class="sticky yellow" style="top:160px; left:60px">
      <div class="num">01</div>
      <h3 class="mt-1">打开 NevoFlux 浏览器</h3>
      <p>进入主画布界面</p>
    </div>

    <!-- node 2: 接入 GBrain -->
    <div class="sticky peach" style="top:160px; left:420px">
      <div class="num">02</div>
      <h3 class="mt-1">接入 GBrain 知识库</h3>
      <p>几秒钟完成索引</p>
    </div>

    <!-- node 3: 选 pack -->
    <div class="sticky mint" style="top:160px; left:800px">
      <div class="num">03</div>
      <h3 class="mt-1">挑一个 pack</h3>
      <p>按场景浏览 75 个设计技能</p>
    </div>

    <!-- node 4: 粘内容 -->
    <div class="sticky sky" style="top:400px; left:680px">
      <div class="num">04</div>
      <h3 class="mt-1">粘 MD / CSV / 图</h3>
      <p>自动识别格式</p>
    </div>

    <!-- node 5: agent 渲染 -->
    <div class="sticky yellow" style="top:400px; left:280px">
      <div class="num">05</div>
      <h3 class="mt-1">⌘+Enter 渲染</h3>
      <p>Agent 流式刷新预览</p>
    </div>

    <!-- node 6: 发布 Canvas 应用 -->
    <div class="sticky mint" style="top:620px; left:380px">
      <div class="num">06</div>
      <h3 class="mt-1">发布 Canvas 应用</h3>
      <p>导出 PNG / HTML / 分享链接</p>
    </div>

    <!-- branch: 装 SDK -->
    <div class="sticky peach" style="top:400px; left:700px; transform:rotate(3deg); width:200px">
      <div class="num">⤳</div>
      <h3 class="mt-1">分支:装个 SDK</h3>
      <p>还没 agent? npm i @nevoflux/sdk</p>
    </div>

    <!-- cursor tag -->
    <div class="cursor-tag" style="top:280px; left:520px;">🟠 you</div>
  </div>

  <footer class="px-12 pb-6 flex items-baseline justify-between mono opacity-60">
    <span>FLOWCHART · WHITEBOARD STYLE · 6 NODES + 1 BRANCH</span>
    <span>nevoflux.dev/onboarding</span>
  </footer>
</body>
</html>
```

## 用法

- 页眉:左右两侧是大写 mono caption(流程标签、帧 id),中间是手写体标题。改成你要讲的流程即可。
- 节点:每张 `.sticky` 是一步。填 `.num`(步骤号或分支符号)、`h3`(动作)、`p`(一行说明)。节点保持 5-12 个,循环使用四个颜色类(`yellow` / `peach` / `mint` / `sky`)。
- 排布:节点通过内联 `top` / `left` 绝对定位在 1500x780 画布上。可以挪动以营造随手贴感,但要保证连接线清晰。
- 连接线:SVG 层里的每条 `<path>` 按坐标连接两个节点。实线是主流程,虚线是条件分支。挪动节点后记得同步更新 path 坐标。
- 光标标签:可选的 `.cursor-tag` 是装饰性协作光标,可移动或删除。
- 页脚:左侧是图的一行摘要,右侧是来源 / handle 字符串。
