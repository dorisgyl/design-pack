---
slug: packs/design-pack/templates/social-x-post-card
type: template
lang: en
category: card
title: "NevoFlux X / Twitter Post Card"
title_zh: "X (Twitter) 帖子卡"
description: "A realistic X (Twitter) post card with engagement metrics (likes / reposts / views), ready for video overlays or share images."
tags: [twitter, x, social, card, overlay, template]
sample_image: packs/design-pack/assets/templates/social-x-post-card.svg
source: html-anything/social-x-post-card
---

## Design guidance

Intent
- Render a tweet (or a punchy one-liner) as a high-fidelity X post card, for use as a video overlay, a tweet share image, or a knowledge snippet. Inspired by the hyperframes x-post style.

Canvas
- 1280×720 or 1080×1080. Dark background `#0f1419`/`#000` or light background `#ffffff` (per X theme). Card centered with a soft shadow.

Card structure
- Outer frame: 16px rounded corners, 1px border `#2f3336` (dark) / `#eff3f4` (light), 16px padding.
- Top row: avatar (48×48 circle, CSS gradient placeholder) + display name + handle `@username` + verified blue checkmark + timestamp (mono, 12px, gray).
- Body: 17-22px, weight 400; links use X blue `#1d9bf0`; hashtags and mentions same color; 0.6em between paragraphs.
- Optional: a quote card (small nested card, gray background, 12px rounded corners).
- Optional: one image (CSS gradient + caption placeholder, never an external image), 16:9, 12px rounded corners.
- Engagement row: 4 icons + numbers (reply / repost / quote / like), inline SVG icons (official X style), gray, colored on hover.
- Single-line X logo SVG in the top-right corner.
- Views row: an eye glyph + a number (small text).

Typography
- Latin: `Chirp` (X's typeface) → fallback `Inter` or `Segoe UI`.
- Chinese: `Noto Sans SC` / `PingFang SC`.
- Numbers: same primary font, not mono.

Design details
- Light palette: bg `#fff`, text `#0f1419`, secondary `#536471`, border `#eff3f4`, accent `#1d9bf0`.
- Dark palette (recommended, for video overlays): bg `#000`, text `#e7e9ea`, secondary `#71767b`, border `#2f3336`, accent `#1d9bf0`.
- Format numbers: 1.2K / 4.5M (never raw 1234).
- Content must come from real input — do not fabricate the tweet.
- If the input is data → auto-summarize it into one punchy one-liner tweet (≤ 280 characters).
- Single-file HTML; inline SVG icons; no external image URLs.
- Optional: add a subtle radial highlight `radial-gradient(...)` behind the card to improve legibility on video overlays.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>X Post Card · The browser is the new knowledge base</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'Inter','Noto Sans SC',system-ui,sans-serif; background: radial-gradient(circle at 50% 30%, #1a1f2e 0%, #050507 70%); color: #e7e9ea; }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-12">
  <article class="w-[640px] rounded-2xl p-5" style="background:#000;border:1px solid #2f3336;box-shadow:0 30px 60px -20px rgba(0,0,0,0.6)">
    <!-- header -->
    <header class="flex items-start gap-3">
      <div class="w-12 h-12 rounded-full shrink-0" style="background:linear-gradient(135deg,#ff7e5f 0%,#feb47b 100%)"></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1 flex-wrap">
          <span class="font-bold">NevoFlux</span>
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="#1d9bf0"><path d="M22.5 12.5c0-1.6-.9-3-2.2-3.8.4-.2.7-.5 1-.8.4-.6.6-1.3.6-2 0-1.7-1.4-3-3-3-.5 0-1 .1-1.4.3-.4-1.3-1.6-2.2-3-2.2-1.7 0-3 1.3-3 3 0 .3 0 .5.1.8C9.1.7 7.7 0 6 0 4 0 2.5 1.5 2.5 3.5c0 .9.3 1.7.9 2.3-.5.2-1 .5-1.4.9C.5 7.5 0 8.7 0 10c0 1.6.9 3 2.2 3.7-.7.7-1.2 1.7-1.2 2.8 0 2 1.5 3.5 3.5 3.5.8 0 1.6-.3 2.2-.7.5 1.4 1.7 2.4 3.3 2.4 1.4 0 2.6-.9 3-2.1.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3 0-.5-.1-.9-.3-1.3 1.6-.2 2.8-1.6 2.8-3.3 0-1.1-.5-2-1.3-2.6.8-.6 1.3-1.6 1.3-2.7zm-12.6 4.8l-3.6-3.6 1.6-1.6 2 2 4.6-4.6 1.6 1.6-6.2 6.2z"/></svg>
          <span class="text-[#71767b] text-[14px]">@nevoflux</span>
          <span class="text-[#71767b]">·</span>
          <span class="text-[#71767b] text-[14px]">14h</span>
          <div class="ml-auto text-[#71767b]"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></div>
        </div>
        <p class="mt-2 text-[17px] leading-snug">Every tab you open is forgotten the moment you close it. The NevoFlux browser keeps it all in <span style="color:#1d9bf0">GBrain</span> — a knowledge base that lives inside the browser.</p>
        <p class="mt-3 text-[17px] leading-snug">Ask GBrain a question and the agent answers from what you've actually read, then builds you a <span style="color:#1d9bf0">Canvas app</span> on the spot. The browser stops being a viewer and becomes a workspace.</p>
        <p class="mt-3 text-[15px] text-[#71767b]">2026/05/11 · X for Web</p>
      </div>
    </header>
    <!-- engagement -->
    <div class="mt-4 flex items-center justify-between text-[#71767b] text-[13px] max-w-[440px]">
      <button class="flex items-center gap-1.5 hover:text-[#1d9bf0]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M1.75 4c-.97 0-1.75.78-1.75 1.75v12.5c0 .97.78 1.75 1.75 1.75h13.5c.97 0 1.75-.78 1.75-1.75V14h-1.5v4.25H1.5V5.75h17V8h1.5V5.75c0-.97-.78-1.75-1.75-1.75H1.75z"/><path d="M11.6 9.4l1.7 2.3-1.7 2.3h2.7l1.7-2.3-1.7-2.3z"/></svg>
        <span>482</span>
      </button>
      <button class="flex items-center gap-1.5 hover:text-[#00ba7c]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M4.5 3.88l4.4 4.4H5v8.83H1V19h6v-2.5H8V8.28zm15 8.13h-1V21H10v-2.5h7V12h1l-4 .5-4-4.5zm-9 6.5h-1V8H6V6h6v12.51z"/></svg>
        <span>1.2K</span>
      </button>
      <button class="flex items-center gap-1.5 hover:text-[#f91880]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M16.7 5c-2 0-3.5 1.6-4.7 3-1.2-1.4-2.7-3-4.7-3C4.4 5 2 7.4 2 10.4c0 2.3 1 4.6 4 7.4 1.8 1.7 4 3.4 4.7 3.9.4.3.9.3 1.3 0 .8-.5 3-2.3 4.7-3.9 3-2.8 4-5 4-7.4 0-3-2.4-5.4-4-5.4z"/></svg>
        <span style="color:#f91880">12.3K</span>
      </button>
      <button class="flex items-center gap-1.5 hover:text-[#1d9bf0]">
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M8 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <span>2.1M</span>
      </button>
      <button class="hover:text-[#1d9bf0]"><svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="currentColor"><path d="M12 2.5l-4 4h3v7h2v-7h3l-4-4z"/><path d="M3 14v6h18v-6h-2v4H5v-4z"/></svg></button>
    </div>
  </article>
</body>
</html>
```

## Usage

- Header avatar: the 48×48 circle is a pure CSS gradient placeholder — never an external image. Swap the gradient stops to match your brand.
- Display name + handle: the bold name (`NevoFlux`), the blue verified checkmark SVG, and the `@nevoflux` handle. Keep the timestamp short (`14h`).
- Body paragraphs: the tweet copy, 17px. Wrap links, hashtags, and product names (`GBrain`, `Canvas app`) in `style="color:#1d9bf0"` to pick up the X-blue accent.
- Source line: the small gray `2026/05/11 · X for Web` stamp under the body.
- Engagement row: four icon buttons with formatted counts (reply 482 / repost 1.2K / like 12.3K / views 2.1M). Always format as 1.2K / 4.5M, never raw numbers. The like count is tinted pink to read as "liked"; the rest color on hover.
- All icons are inline SVG in official X style; keep the card single-file with no external URLs.
