---
slug: packs/design-pack/templates/paper-system-dataflow-zh
type: template
lang: zh
category: paper-figure
title: "论文图 · 系统数据流（图网络）"
title_zh: "论文图 · 系统数据流（图网络）"
description: "以图网络呈现的系统/数据流图：服务与存储为节点，由带类型的边（request、route、读/写、query、event）以非线性布局连接。"
tags: [paper-figure, diagram, graph-network, svg, 论文图, template]
sample_image: packs/design-pack/assets/templates/paper-system-dataflow.png
source: paper-framework-figure-studio-pro/paper-system-dataflow
---
## 设计说明

当拓扑比顺序更重要时用 **graph_network（图网络）** 语法：节点有机摆放（非一行），由带类型、带标签的边连接。按角色着色（客户端 / 网关 / 服务 / 缓存 / 存储）。每个边标签说明流动的内容（request、event、query…）。

## 模板（HTML）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>System data flow — graph network</title>
<style>
  :root{
    --bg-color:#fafbff; --ink:#1f2937; --muted:#6b7280; --spoke:#64748b;
    --slate:#5b6876; --blue:#2f6fdb; --teal:#159e87; --amber:#d7973d; --purple:#6b4fc4; --navy:#23357a;
    --shadow:0 3px 8px -2px rgba(31,41,55,.10),0 1px 3px -1px rgba(31,41,55,.06);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
  .diagram-wrapper{width:100%;max-width:1000px;overflow-x:auto;background:var(--bg-color);border-radius:14px;box-shadow:0 10px 25px rgba(0,0,0,.05);border:1px solid #eef1f7;}
  .diagram-canvas{position:relative;width:1000px;height:520px;margin:0 auto;}
  .title-pill{position:absolute;top:16px;left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;font-size:13.5px;font-weight:600;padding:7px 20px;border-radius:999px;box-shadow:var(--shadow);z-index:30;}
  .svg-layer{position:absolute;inset:0;width:100%;height:100%;z-index:6;pointer-events:none;}
  .node{position:absolute;height:56px;background:#fff;border:1.6px solid;border-radius:10px;display:flex;align-items:center;gap:10px;padding:0 13px;box-shadow:var(--shadow);z-index:20;}
  .ic{flex:0 0 24px;width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
  .tx{display:flex;flex-direction:column;line-height:1.25;}
  .ml{font-size:13px;font-weight:600;color:var(--ink);} .ms{font-size:10px;color:var(--muted);}
  .b-slate{border-color:var(--slate);} .b-blue{border-color:var(--blue);} .b-teal{border-color:var(--teal);}
  .b-amber{border-color:var(--amber);} .b-purple{border-color:var(--purple);}
  .line-label{position:absolute;font-size:11.5px;color:#475569;font-weight:500;z-index:18;background:var(--bg-color);padding:0 4px;border-radius:4px;}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="ic-client" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19l18 0"/><path d="M5 7a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8"/></symbol>
<symbol id="ic-api" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5"/><path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5"/><path d="M3 21l2.5 -2.5"/><path d="M18.5 5.5l2.5 -2.5"/><path d="M10 11l-2 2"/><path d="M13 14l-2 2"/></symbol>
<symbol id="ic-svc" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"/><path d="M12 12l8 -4.5"/><path d="M12 12l0 9"/><path d="M12 12l-8 -4.5"/></symbol>
<symbol id="ic-server" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3"/><path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2"/><path d="M7 8l0 .01"/><path d="M7 16l0 .01"/></symbol>
<symbol id="ic-db" viewBox="-1 -1 26 26"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"/><path d="M4 6v6a8 3 0 0 0 16 0v-6"/><path d="M4 12v6a8 3 0 0 0 16 0v-6"/></symbol>
</defs></svg>

<div class="diagram-wrapper">
  <div class="diagram-canvas">
    <div class="title-pill">系统数据流 — 服务图（带类型的边）</div>

    <svg class="svg-layer" viewBox="0 0 1000 520">
      <defs>
        <g id="ah"><polygon points="-5,-4 5,0 -5,4" fill="var(--bg-color)" stroke="var(--spoke)" stroke-width="1.6" stroke-linejoin="round"/></g>
        <g id="ah-a"><polygon points="-5,-4 5,0 -5,4" fill="var(--bg-color)" stroke="var(--amber)" stroke-width="1.6" stroke-linejoin="round"/></g>
      </defs>
      <g stroke="var(--spoke)" stroke-width="1.6" fill="none">
        <path d="M130 260 L330 260"/>
        <path d="M330 260 L540 150"/>
        <path d="M330 260 L540 370"/>
        <path d="M540 150 L805 150"/>
        <path d="M540 150 L850 300"/>
        <path d="M540 370 L850 300"/>
      </g>
      <path d="M540 178 L540 342" stroke="var(--amber)" stroke-width="1.6" fill="none" stroke-dasharray="5 5"/>
      <use href="#ah" transform="translate(250,260)"/>
      <use href="#ah" transform="translate(469,187) rotate(-27.6)"/>
      <use href="#ah" transform="translate(469,333) rotate(27.6)"/>
      <use href="#ah" transform="translate(725,150)"/>
      <use href="#ah" transform="translate(778,265) rotate(25.8)"/>
      <use href="#ah" transform="translate(772,318) rotate(-12.7)"/>
      <use href="#ah-a" transform="translate(540,342) rotate(90)"/>
    </svg>

    <!-- edge labels -->
    <div class="line-label" style="left:212px;top:244px;">请求</div>
    <div class="line-label" style="left:404px;top:188px;">路由</div>
    <div class="line-label" style="left:404px;top:318px;">路由</div>
    <div class="line-label" style="left:636px;top:132px;">读 / 写</div>
    <div class="line-label" style="left:706px;top:214px;">查询</div>
    <div class="line-label" style="left:676px;top:352px;">写入</div>
    <div class="line-label" style="left:548px;top:252px;color:var(--amber);font-weight:600;">事件</div>

    <!-- nodes -->
    <div class="node b-slate"  style="left:55px;top:232px;width:150px;color:var(--slate);"><svg class="ic"><use href="#ic-client"/></svg><div class="tx"><span class="ml">客户端</span><span class="ms">请求</span></div></div>
    <div class="node b-blue"   style="left:255px;top:232px;width:150px;color:var(--blue);"><svg class="ic"><use href="#ic-api"/></svg><div class="tx"><span class="ml">API 网关</span><span class="ms">路由 · 鉴权</span></div></div>
    <div class="node b-teal"   style="left:465px;top:122px;width:150px;color:var(--teal);"><svg class="ic"><use href="#ic-svc"/></svg><div class="tx"><span class="ml">服务 A</span><span class="ms">计算</span></div></div>
    <div class="node b-teal"   style="left:465px;top:342px;width:150px;color:var(--teal);"><svg class="ic"><use href="#ic-svc"/></svg><div class="tx"><span class="ml">服务 B</span><span class="ms">工作节点</span></div></div>
    <div class="node b-amber"  style="left:730px;top:122px;width:150px;color:var(--amber);"><svg class="ic"><use href="#ic-server"/></svg><div class="tx"><span class="ml">缓存</span><span class="ms">热状态</span></div></div>
    <div class="node b-purple" style="left:775px;top:272px;width:150px;color:var(--purple);"><svg class="ic"><use href="#ic-db"/></svg><div class="tx"><span class="ml">存储</span><span class="ms">数据库</span></div></div>
  </div>
</div>
</body>
</html>

```
