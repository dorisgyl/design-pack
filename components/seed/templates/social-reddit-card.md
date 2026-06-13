---
slug: packs/design-pack/templates/social-reddit-card
type: template
lang: en
category: card
title: "Reddit Post Card"
title_zh: "Reddit 帖子卡"
description: "A realistic Reddit-style post card with up/down vote rail and comment count, ideal for video overlays and story sharing."
tags: [reddit, social, card, overlay, story, template]
sample_image: packs/design-pack/assets/templates/social-reddit-card.svg
source: html-anything/social-reddit-card
---

## Design guidance

**Template: Reddit post card**

**Intent.** Render a story, question, or quip as a Reddit-style post card for use as a video overlay or social-story share. Inspired by hyperframes reddit-post.

**Canvas.** 1280x720 (video overlay) or 800x600 (single-card share); background transparent or dark `#0b1416`.

**Card structure.**
- Outer frame: 16px rounded corners, background white `#ffffff` (light) or `#1a1a1b` (dark, recommended for video overlay), border 1px `#edeff1` / `#343536`.
- Left **vote rail** (40-56px wide):
  - Up arrow ▲ (16px, `#878a8c`, turns orange `#ff4500` on hover).
  - Vote count (Inter, 17px, weight 700, centered; color: 0 grey / positive orange / negative blue); use `12.3k` format for large numbers.
  - Down arrow ▼ (turns blue `#7193ff` on hover).
- Body region:
  - Top meta row: subreddit icon (CSS circle + letter) + `r/subreddit` (bold) + `· Posted by u/username · 3h` (small grey text).
  - **Title** (Inter / IBM Plex Sans, 22-28px, weight 500, dark text).
  - Content: 16px body, or a quote block, or one image (CSS gradient placeholder).
  - Bottom action row: 💬 `1.2k Comments` · 🏆 Awards · ⤴️ Share · ⋯ icon.
- Reddit Snoo logo in the top-right corner (inline SVG, orange `#ff4500`).

**Typography.**
- Primary: `IBM Plex Sans` → fallback `Inter`, weights 400/500/700.
- Numbers: same as the primary font.
- Chinese: `Noto Sans SC`.

**Design details.**
- Light mode: background `#fff`, text `#1c1c1c`, secondary `#7c7c7c`.
- Dark mode (recommended): background `#1a1a1b`, text `#d7dadc`, secondary `#818384`, border `#343536`.
- Vote-count colors: positive = `#ff4500`, negative = `#7193ff`, zero = `#878a8c`.
- The clickable title area can carry a subtle hover background.
- Never use externally linked images; use a CSS gradient + description for image placeholders.
- Always use the content the user provides; auto-generate a plausible subreddit / username / vote count.
- Single-file HTML; icons (up/down arrows, comment bubble, trophy) inline as SVG.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Reddit Post · r/NevoFlux</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  body { font-family: 'IBM Plex Sans','Noto Sans SC',system-ui,sans-serif; background: radial-gradient(circle at 30% 20%, #1a2026 0%, #050507 80%); }
</style>
</head>
<body class="min-h-screen flex items-center justify-center p-12">
  <article class="w-[720px] rounded-2xl flex" style="background:#1a1a1b;border:1px solid #343536;box-shadow:0 30px 60px -20px rgba(0,0,0,0.6)">
    <!-- vote rail -->
    <aside class="w-12 py-4 flex flex-col items-center gap-1.5 shrink-0" style="background:#161617;border-right:1px solid #343536;border-top-left-radius:1rem;border-bottom-left-radius:1rem">
      <button class="text-[#878a8c] hover:text-[#ff4500]"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M12 4l8 10h-5v6h-6v-6H4z"/></svg></button>
      <span class="font-bold text-[15px]" style="color:#ff4500">12.3k</span>
      <button class="text-[#878a8c] hover:text-[#7193ff]"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M12 20l-8-10h5V4h6v6h5z"/></svg></button>
    </aside>
    <!-- body -->
    <div class="flex-1 p-5 min-w-0" style="color:#d7dadc">
      <!-- meta -->
      <div class="flex items-center gap-2 text-[12px]" style="color:#818384">
        <div class="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style="background:#ff4500">r/</div>
        <span class="font-bold" style="color:#d7dadc">r/NevoFlux</span>
        <span>·</span>
        <span>Posted by u/canvas_builder · 4h ago</span>
        <span class="ml-auto text-[10px] uppercase tracking-wider px-2 py-0.5 rounded" style="background:#272729;color:#d7dadc">TIL</span>
      </div>
      <!-- title -->
      <h1 class="mt-3 text-[22px] font-medium leading-snug" style="color:#d7dadc">TIL the NevoFlux browser lets its agent read my whole GBrain knowledge base before drafting a Canvas app</h1>
      <!-- body -->
      <p class="mt-3 text-[15px] leading-relaxed" style="color:#d7dadc">
        So I dumped a year of meeting notes and specs into GBrain, then asked the NevoFlux agent to "build me a Canvas app that surfaces the open decisions". It pulled the right context, wired up the SDK, and shipped a working pack in one pass.
      </p>
      <p class="mt-3 text-[15px] leading-relaxed" style="color:#d7dadc">Less tab-juggling, more shipping. 10/10 would install the design-pack again.</p>
      <!-- actions -->
      <div class="mt-4 flex items-center gap-3 text-[12.5px] font-semibold" style="color:#818384">
        <button class="flex items-center gap-1.5 hover:text-[#d7dadc] px-2 py-1 rounded hover:bg-[#272729]">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4l4 4 4-4h4a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
          <span>1.2k Comments</span>
        </button>
        <button class="flex items-center gap-1.5 hover:text-[#d7dadc] px-2 py-1 rounded hover:bg-[#272729]">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/></svg>
          <span>7 Awards</span>
        </button>
        <button class="flex items-center gap-1.5 hover:text-[#d7dadc] px-2 py-1 rounded hover:bg-[#272729]">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M18 8a3 3 0 11-2.83-3H15l-7 4-1.17-1A3 3 0 113 11l5-3-4-3a3 3 0 11.83-1.83L9 6l7-4z"/></svg>
          <span>Share</span>
        </button>
        <button class="ml-auto px-2 py-1 rounded hover:bg-[#272729]">⋯</button>
      </div>
    </div>
  </article>
</body>
</html>
```

## Usage

- **Vote rail** — set the vote count and its color (`#ff4500` positive, `#7193ff` negative, `#878a8c` zero); use the `12.3k` short format for large numbers.
- **Meta row** — fill the subreddit (`r/NevoFlux`), poster (`u/username`), age, and the small tag badge (`TIL`, `Discussion`, etc.).
- **Title** — the headline; the load-bearing line of the card.
- **Body paragraphs** — one or more short paragraphs; swap for a quote block or a CSS-gradient image placeholder if needed.
- **Action row** — comment count, awards, share, and the overflow `⋯` button; adjust the metrics to taste.
- Keep it single-file with inline SVG icons and no external image URLs.
