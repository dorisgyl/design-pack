---
slug: packs/design-pack/templates/mockup-device-3d-zh
type: template
lang: zh
category: poster
title: "iPhone × MacBook 立体展架"
title_en: "NevoFlux Device 3D Showcase"
description: "iPhone + MacBook 仿 GLTF 静态展架,屏幕内嵌真实 NevoFlux HTML 内容,玻璃镜头折射,360° 转盘构图。"
tags: [device, mockup, iphone, macbook, html-in-canvas, product, 模板]
sample_image: packs/design-pack/assets/templates/mockup-device-3d.svg
source: html-anything/mockup-device-3d
---

## 设计指导

- 意图:产品发布、App 演示、设计稿展示。把真实的 NevoFlux UI 内容渲染进 iPhone / MacBook "屏幕"里,周围用 CSS 3D transform 模拟 GLTF 模型的玻璃 / 高光 / 折射。
- 硬性构图:
  - 画布:1920×1080,暖灰渐变背景(`#1a1a22 → #08080c` 的 radial-gradient),底部带一层压暗的反射地面。
  - iPhone 15 Pro 模型:左侧 / 中部,`rotateY(-14deg) rotateX(4deg) translateZ(40px)`;边框为钛金属银(实心金属渐变框)+ 屏幕圆角 46px;屏幕内嵌 iframe-like div,按移动端视口(375×812)真实渲染 NevoFlux 的 HTML 内容。
  - MacBook Pro 14"(可选第二台):右侧,略小,`rotateY(10deg)`;上盖屏幕嵌入桌面视口内容(按 1440×900 缩放);底座键盘 / trackpad 用 CSS 阴影线条绘制(不画键帽细节)。
  - 玻璃 / 镜头光斑:顶部加 2-3 个 `radial-gradient(ellipse, rgba(255,255,255,…))` 的椭圆高光,模拟 morphing glass lens。
  - 地面反射:设备下方一层柔和的 radial 阴影,读起来像镜面地板。
- 屏幕内容来源:
  - 用户提供文本 / 数据 → 自动渲染成一个 mock app 界面(顶部 status bar + 标题 + body + 底部 tab bar 或 home indicator)。
  - 用户提供 HTML → 原样嵌入屏幕 div 内(注意用 transform 缩放,使其适配屏幕宽高)。
  - 屏幕内 UI 用 Tailwind,字号按移动端真实尺寸(text-sm / text-base,不要 text-9xl)。
- 可选附加元素:
  - 右下角 "product slug" 角标:大 logo + 一行 tagline + 一行 hairline 副标。
  - 顶部一行 caption(小字号、低透明度 sans):产品 codename / 日期 / 版本。
  - 可选 8s CSS 转盘:`@keyframes turntable` rotateY -12 ↔ 12,ease-in-out infinite alternate;并遵循 `prefers-reduced-motion`。
- 设计细节:
  - 绝不使用外部 mockup 图片 URL(任何 unsplash / dribbble link),全部用 CSS / SVG 绘制设备。
  - 字体:设备外的 caption / logo 用 `Inter Tight` / `SF Pro` 风格;设备内根据内容自适应。
  - 背景可选 4 套调色:charcoal / pearl / midnight blue / mocha;不要彩虹渐变。
  - 单文件 HTML;不要用 srcdoc 嵌套 iframe(容易出问题),改用 `<div class="screen">` + Tailwind 渲染内容。
  - 必须用真实产品数据填充屏幕内容,严禁 lorem ipsum 或 "Your text here"。

## 模板 (HTML)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>NevoFlux 立体展架 · HTML-in-Canvas</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body {
    font-family:'Inter','Noto Sans SC',system-ui,sans-serif;
    background: radial-gradient(ellipse at 50% 40%, #1a1a22 0%, #08080c 70%);
    color:#f5f5f7;
    min-height:100vh;
    margin:0;
  }
  .stage { perspective: 1800px; }
  .iphone {
    width:280px; height:580px;
    border-radius:46px;
    background:linear-gradient(140deg,#3a3a40 0%,#a8a8ad 35%,#1f1f24 60%,#5a5a60 100%);
    padding:7px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 60px 80px -20px rgba(0,0,0,0.7);
    transform: rotateY(-14deg) rotateX(4deg) translateZ(40px);
    transform-style: preserve-3d;
  }
  .iphone-screen {
    width:100%; height:100%; border-radius:40px;
    background:#0a0a0e;
    overflow:hidden; position:relative;
    color:#f5f5f7;
  }
  .notch { position:absolute; top:6px; left:50%; transform:translateX(-50%); width:108px; height:28px; background:#000; border-radius:18px; z-index:5; }
  .lens {
    position:absolute; pointer-events:none;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 60%);
    mix-blend-mode: screen;
  }
  .mbp {
    width:520px;
    transform: rotateY(10deg) rotateX(-2deg) translateZ(-20px);
    transform-style: preserve-3d;
  }
  .mbp-screen {
    width:100%; height:320px;
    border-radius:14px 14px 4px 4px;
    background:linear-gradient(135deg,#222229 0%,#0a0a0e 100%);
    border: 12px solid #1a1a1f;
    border-bottom: 16px solid #1a1a1f;
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.7);
    overflow:hidden;
    position:relative;
    color:#f5f5f7;
  }
  .mbp-base {
    width:560px;
    height:14px;
    margin:-2px auto 0;
    background:linear-gradient(180deg,#3a3a40 0%,#1a1a1f 80%);
    border-radius:0 0 14px 14px;
    box-shadow: 0 30px 40px -20px rgba(0,0,0,0.8);
  }
  .mbp-notch {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:90px; height:8px; background:#000; border-radius:0 0 8px 8px; z-index:5;
  }
  .ground {
    position:absolute; bottom:0; left:50%; transform:translateX(-50%);
    width:1100px; height:140px;
    background: radial-gradient(ellipse at center top, rgba(0,0,0,0.6) 0%, transparent 70%);
  }
  .chip { font-size:10px; letter-spacing:0.16em; text-transform:uppercase; }
</style>
</head>
<body class="flex flex-col items-center justify-center p-14 min-h-screen relative overflow-hidden">

  <!-- caption -->
  <header class="absolute top-10 left-12 right-12 flex items-baseline justify-between chip opacity-60">
    <span>NEVOFLUX — CODENAME GBRAIN — v0.4</span>
    <span>2026 SPRING</span>
    <span>HTML-IN-CANVAS</span>
  </header>

  <!-- devices -->
  <div class="stage relative flex items-end gap-20" style="z-index:2">

    <!-- iPhone -->
    <div class="iphone relative">
      <div class="iphone-screen">
        <div class="notch"></div>
        <!-- status bar -->
        <div class="flex items-center justify-between px-7 pt-3 text-[10px] font-semibold relative" style="z-index:6">
          <span>9:41</span>
          <span class="flex items-center gap-1">▮▮▮▮ 5G</span>
        </div>
        <!-- header -->
        <div class="px-6 pt-10">
          <div class="chip opacity-60">新建 Canvas 应用</div>
          <h2 class="text-[22px] font-bold mt-1 leading-tight">杂志风网页<br/>翻页 PPT</h2>
        </div>
        <!-- template tile -->
        <div class="mx-6 mt-5 rounded-xl p-3 flex items-center gap-2.5" style="background:linear-gradient(135deg,#1a1a22,#222229);border:1px solid rgba(255,255,255,0.06)">
          <span class="text-xl">📰</span>
          <div class="flex-1">
            <div class="text-[12px] font-semibold">杂志风网页 PPT</div>
            <div class="text-[10px] opacity-60">16:9 横向翻页 · 9 帧</div>
          </div>
          <span class="text-[10px] opacity-50">✓</span>
        </div>
        <!-- input -->
        <div class="mx-6 mt-3 rounded-xl p-3" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);min-height:140px">
          <div class="text-[12px] opacity-90">// NevoFlux 2026 Q1 路线图</div>
          <div class="text-[11px] opacity-60 mt-1">- 上线 200 个新设计包模板</div>
          <div class="text-[11px] opacity-60">- 接入 28 个本地 GBrain agent</div>
          <div class="text-[11px] opacity-60">- 周活 12K → 80K</div>
        </div>
        <!-- CTA -->
        <div class="mx-6 mt-3 rounded-full py-3 text-center text-[13px] font-semibold" style="background:linear-gradient(135deg,#ff7849,#d97757);color:#08080c">⌘ + Enter 生成</div>
        <!-- tab bar -->
        <div class="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 backdrop-blur" style="background:rgba(10,10,14,0.85);border-top:1px solid rgba(255,255,255,0.06)">
          <span class="text-[10px] flex flex-col items-center gap-0.5" style="color:#ff7849">■<span>任务</span></span>
          <span class="text-[10px] flex flex-col items-center gap-0.5 opacity-60">▤<span>设计包</span></span>
          <span class="text-[10px] flex flex-col items-center gap-0.5 opacity-60">◌<span>设置</span></span>
        </div>
      </div>
      <!-- lens flares -->
      <div class="lens" style="top:-30px;left:-20px;width:160px;height:200px;transform:rotate(-20deg)"></div>
      <div class="lens" style="bottom:50px;right:-30px;width:120px;height:160px"></div>
    </div>

    <!-- MacBook -->
    <div class="mbp relative">
      <div class="mbp-screen">
        <div class="mbp-notch"></div>
        <!-- top bar -->
        <div class="flex items-center gap-1.5 px-3 py-1.5" style="background:#161620;border-bottom:1px solid rgba(255,255,255,0.06)">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="ml-3 chip opacity-50">localhost:3456 — NevoFlux</span>
        </div>
        <!-- 3-pane layout mini -->
        <div class="grid grid-cols-[1fr_1.4fr_1.4fr] gap-2 p-2 h-[260px]">
          <!-- sidebar -->
          <div class="rounded-md p-2 text-[10px] opacity-80" style="background:#1a1a25;border:1px solid rgba(255,255,255,0.04)">
            <div class="opacity-50 mb-1.5">任务 / 11</div>
            <div class="space-y-1">
              <div class="rounded px-1.5 py-1 truncate" style="background:rgba(255,120,73,0.18);color:#ff7849">● 杂志风网页 PPT</div>
              <div class="rounded px-1.5 py-1 truncate opacity-60">小红书图文卡</div>
              <div class="rounded px-1.5 py-1 truncate opacity-60">设备 3D 立体展架</div>
              <div class="rounded px-1.5 py-1 truncate opacity-60">Keynote PPT · 产品介绍</div>
            </div>
          </div>
          <!-- editor -->
          <div class="rounded-md p-2 text-[10px] opacity-90" style="background:#10101a;border:1px solid rgba(255,255,255,0.04);font-family:'JetBrains Mono',monospace">
            <div class="opacity-50">// GBrain 输入</div>
            <div class="mt-1"># NevoFlux 设计包 — 2026</div>
            <div class="opacity-70">## Q1-Q4 关键指标</div>
            <div class="opacity-70">- 模板: 75 → 200</div>
            <div class="opacity-70">- WAU: 12K → 80K</div>
            <div class="opacity-70">- Agents: 17 → 28</div>
            <div class="opacity-70">- Stars: 4.2K → 25K</div>
            <div class="mt-2 opacity-50">▍</div>
          </div>
          <!-- preview -->
          <div class="rounded-md overflow-hidden relative" style="background:#002FA7">
            <div class="absolute inset-0 p-3 text-white">
              <div class="chip opacity-80">№01 / 22</div>
              <div class="mt-2 font-black text-[16px] leading-tight">用一份来源<br/>生成会生长的<br/>知识库。</div>
              <div class="absolute bottom-2 left-3 right-3 flex justify-between chip opacity-70">
                <span>NEVOFLUX</span><span>DESIGN PACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mbp-base"></div>
      <!-- lens flares -->
      <div class="lens" style="top:-40px;right:60px;width:200px;height:140px;transform:rotate(10deg)"></div>
    </div>

  </div>

  <!-- ground reflection -->
  <div class="ground"></div>

  <!-- bottom slug -->
  <footer class="absolute bottom-10 left-12 right-12 flex items-baseline justify-between chip opacity-50">
    <span>NEVOFLUX.APP</span>
    <span>GLTF · LIVE-HTML SCREENS · TURNTABLE</span>
    <span>STAGE — 1920 × 1080</span>
  </footer>
</body>
</html>
```

## 用法

- `header` 顶部 caption:三段小字 mono —— 左侧是产品 codename / 版本,中间是季度,右侧是 "HTML-IN-CANVAS" 模式标签。逐段替换文字即可。
- iPhone `.iphone-screen`:移动端 mock app。需填的槽位有状态栏、`chip` kicker + `h2` 标题、模板卡片(图标 + 名称 + 元信息 + 勾选)、输入卡片(一行注释 + 3 行真实路线图要点)、橙色 CTA 胶囊按钮,以及底部 3 项 tab bar。
- MacBook `.mbp-screen`:桌面三栏迷你视图。填入顶栏 URL chip、侧栏任务列表(1 个橙色高亮项 + 其余置灰)、mono 编辑器区块(GBrain markdown 输入 + 4 行指标),以及蓝色预览卡片(kicker、标题、底部标签)。
- `.lens` 光斑与 `.ground` 反射都是纯 CSS —— 保持不动,它们负责营造 3D 玻璃质感。
- `footer` 角标:左侧域名,中间一行功能 hairline,右侧舞台尺寸。
- 自包含:每台设备都用 CSS 绘制(金属边框渐变、刘海、镜头光斑、镜面地板)。无任何外部 mockup 图片或素材 URL —— 仅保留 Tailwind 运行时与字体样式表,与源模板出厂状态一致。
