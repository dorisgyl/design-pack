---
slug: packs/design-pack/templates/frame-macos-notification
type: template
lang: en
category: card
title: "NevoFlux macOS Notification Banner"
title_zh: "macOS 通知横幅"
description: "A frosted-glass macOS notification banner with app icon, title, and body copy for video overlays and launch teasers."
tags: [macos, notification, banner, overlay, frame, template]
sample_image: packs/design-pack/assets/templates/frame-macos-notification.svg
source: html-anything/frame-macos-notification
---

## Design guidance

Renders an announcement, message, or alert as a macOS Big Sur+ style notification banner. It works well as a corner overlay on video, a product-launch teaser, or a social image.

Canvas — two ways to use it
- Video overlay at 1920x1080: place the notification in the top-right corner with the surrounding area transparent.
- Standalone banner at 480x120: output it centered on its own.

Banner structure
- Outer frame: 14px corner radius (the macOS Big Sur standard), 480x120 (or up to 480x180 when it carries body copy), with 12-16px of padding.
- Background: a **frosted glass** effect — `background: rgba(245,245,247,0.78)` plus `backdrop-filter: blur(40px) saturate(180%)`; the dark variant uses `rgba(28,28,30,0.78)`.
- Border: 1px `rgba(0,0,0,0.06)` in light mode / `rgba(255,255,255,0.08)` in dark mode; add a 1px bright highlight `rgba(255,255,255,0.5)` along the top edge.
- Shadow: `0 10px 40px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)`.

Content
- Left: an **app icon** (44x44, 10px corner radius, built from a CSS gradient plus a single emoji or monogram letter — **never an external image**).
- Middle:
  - Top row: app name (SF Pro 13px, weight 600) plus `now` or a concrete time (12px, opacity 0.6), justified to both ends.
  - Title (15px, weight 600, truncated to one line).
  - Body (13px, weight 400, truncated to 1-2 lines, line-height 1.35).
- Right (optional): an action button such as "Open" or "Reply" (capsule shape, light-gray fill).

Typography
- Primary: `SF Pro Text`, falling back to `Inter` / `system-ui`; for Chinese use `PingFang SC` / `Noto Sans SC`.

Optional extras
- Stacked notifications: the first sits in front, the two behind recede with `scale 0.96` + `opacity 0.6` + a downward `translateY`.
- Entrance motion: slide in from off-screen right with `transform: translateX(110%)→0` over 200ms ease-out; allow `prefers-reduced-motion` to disable it.
- A top-right control chip "Clear" that appears on hover (default opacity 0).

Design details
- Light mode uses a white frosted background; dark mode (recommended for video) is an almost-black frosted background.
- The icon must not use an externally hosted emoji image — draw it with a unicode emoji or CSS geometry.
- Always use the supplied content; the title and body should read clearly from the user's input.
- Single-file HTML, and remember Safari needs the `-webkit-` prefix on `backdrop-filter`.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>macOS Notification · Build Complete</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body {
    font-family: 'Inter','Noto Sans SC','PingFang SC',system-ui,sans-serif;
    background:
      linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%),
      radial-gradient(circle at 80% 20%, rgba(255,200,150,0.3) 0%, transparent 50%);
    background-blend-mode: screen;
    min-height: 100vh;
  }
  .frost {
    background: rgba(28,28,30,0.78);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  @keyframes slideIn { from { transform: translateX(120%); opacity:0 } to { transform: translateX(0); opacity:1 } }
  .notif-1 { animation: slideIn .4s ease-out; }
  .notif-2 { transform: translateY(-12px) scale(0.96); opacity: 0.7; }
  .notif-3 { transform: translateY(-24px) scale(0.92); opacity: 0.4; }
</style>
</head>
<body class="flex flex-col items-end justify-start gap-3 p-12 text-white">
  <!-- top stacked notifs -->
  <div class="frost rounded-2xl w-[420px] p-3 flex gap-3 items-center notif-3">
    <div class="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl" style="background:linear-gradient(135deg,#6d5efc,#3a2fb8)">🧠</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between"><span class="text-[13px] font-semibold">GBrain</span><span class="text-[11px] opacity-60">2m ago</span></div>
      <div class="text-[12.5px] truncate opacity-80">Indexed 24 new pages into your knowledge base</div>
    </div>
  </div>
  <div class="frost rounded-2xl w-[420px] p-3 flex gap-3 items-center notif-2">
    <div class="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl" style="background:linear-gradient(135deg,#0f0f12,#2a2a35)">◧</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between"><span class="text-[13px] font-semibold">Canvas</span><span class="text-[11px] opacity-60">1m ago</span></div>
      <div class="text-[12.5px] truncate opacity-80">App published · 8 files synced to your workspace</div>
    </div>
  </div>
  <!-- main, in-focus notif -->
  <div class="frost rounded-2xl w-[420px] p-3 flex gap-3 items-center notif-1">
    <div class="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl shrink-0" style="background:linear-gradient(135deg,#ff7849,#d97757)">N</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <span class="text-[13px] font-semibold">NevoFlux</span>
        <span class="text-[11px] opacity-60">now</span>
      </div>
      <div class="text-[14px] font-semibold leading-tight mt-0.5">Build complete · Design Pack installed</div>
      <div class="text-[12.5px] opacity-80 leading-snug mt-0.5">31.2 KB · 12 skills · Rendered in the preview panel. Click to open the agent and ship it to Canvas.</div>
    </div>
    <button class="text-[11px] font-semibold px-2.5 py-1 rounded-full ml-1 shrink-0" style="background:rgba(255,255,255,0.12)">Open</button>
  </div>
</body>
</html>
```

## Usage

- App icon (left of each row): a CSS-gradient tile with a single emoji or monogram. Swap the gradient and glyph per source app (GBrain, Canvas, the NevoFlux "N").
- App name + timestamp (top row): the sending app and a relative time such as `now` or `2m ago`.
- Title: the headline of the notification, kept to one line.
- Body: 1-2 lines of supporting copy — what happened and what to do next.
- Action button (right of the focused row): the primary action, e.g. "Open" or "Reply"; remove it for a title-only banner.
- `.notif-1` is the in-focus banner (slides in); `.notif-2` / `.notif-3` are the receding stacked banners behind it. Drop the stack for a single banner.
