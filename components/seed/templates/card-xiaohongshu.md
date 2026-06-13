---
slug: packs/design-pack/templates/card-xiaohongshu
type: template
lang: en
category: card
title: "Xiaohongshu Card (NevoFlux Carousel)"
title_zh: "小红书图文卡片"
description: "A Xiaohongshu-style swipeable knowledge-card carousel for sharing NevoFlux tips as screenshots."
tags: [xhs, 小红书, carousel, 图文, template]
sample_image: packs/design-pack/assets/templates/card-xiaohongshu.svg
source: html-anything/card-xiaohongshu
---

## Design guidance

Layout
- Output N consecutive cards, each `width:1080px` with a `3/4` aspect ratio, stacked vertically with flex so the whole deck screenshots cleanly and each card can also be captured on its own. Let N follow how much the content carries: short content starts at 3-6 cards, longer content needs more (a single Xiaohongshu post allows up to 18 images, but staying within 9 usually reads best). Each card carries exactly one core idea.
- The first card is the cover: an oversized title + one subtitle line + one attention-grabbing badge (something like "Save this" / "Worth bookmarking").
- The middle cards expand the body, one core idea per card, paired with an emoji + a short sentence + one or two concrete examples.
- The last card is the summary + call to action (follow / save / share).

Design details
- Palette: pick soft Morandi or pink-leaning tones; keep elements rounded with generous white space.
- Use large type, wide line spacing, and strong contrast (Xiaohongshu is read on phones, so small text is unreadable).
- Put a small watermark in the bottom-right corner of every card (author handle / date).

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>5 small habits that make NevoFlux work harder for you</title>
<style>
  body { margin:0; background:#f3eee5; font-family:'Noto Sans SC',sans-serif; padding:36px 0; -webkit-font-smoothing:antialiased; }
  .deck { display:flex; flex-direction:column; align-items:center; gap:24px; }
  .card { width:1080px; max-width:96vw; aspect-ratio:3/4; border-radius:32px; overflow:hidden; position:relative; padding:80px 64px; display:flex; flex-direction:column; box-shadow:0 24px 60px -20px rgba(0,0,0,0.18); }
  .c1 { background:linear-gradient(160deg,#f7d2c2 0%,#f3a98a 100%); color:#3a1d10; }
  .c2 { background:linear-gradient(160deg,#fff7e6 0%,#ffe4b8 100%); color:#3a2e10; }
  .c3 { background:linear-gradient(160deg,#e8f0e3 0%,#bcd6b3 100%); color:#1f3a1f; }
  .c4 { background:linear-gradient(160deg,#e7e8f5 0%,#bec1e8 100%); color:#1d1f4a; }
  .c5 { background:linear-gradient(160deg,#fce7f0 0%,#f5b3ce 100%); color:#4a1b34; }
  .c6 { background:linear-gradient(160deg,#fff8e1 0%,#f7c99b 100%); color:#3a2210; }
  .c7 { background:linear-gradient(160deg,#15140f 0%,#3a2620 100%); color:#fafaf7; }
  .badge { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:999px; background:rgba(255,255,255,0.55); backdrop-filter:blur(8px); font-size:18px; font-weight:600; align-self:flex-start; }
  .num { font-family:Georgia, serif; font-style:italic; font-size:120px; font-weight:700; line-height:0.9; opacity:0.85; margin-bottom:24px; }
  h2 { font-size:64px; font-weight:900; line-height:1.1; letter-spacing:-0.01em; margin:0 0 32px; }
  .body { font-size:30px; font-weight:500; line-height:1.55; opacity:0.85; max-width:24ch; }
  .watermark { position:absolute; bottom:32px; right:36px; font-size:16px; opacity:0.55; font-weight:500; }
  .pageno { position:absolute; top:36px; right:44px; font-family:'Inter',sans-serif; font-size:18px; font-weight:600; opacity:0.45; letter-spacing:0.08em; }
  .hero { font-size:120px; font-weight:900; line-height:1.0; letter-spacing:-0.025em; margin:0; }
</style>
</head>
<body>
<div class="deck">

  <div class="card c1">
    <div class="pageno">01 / 07</div>
    <div class="badge">⚡ Save this · Power tips</div>
    <div style="margin:auto 0">
      <div style="font-size:24px; font-weight:600; opacity:0.7; margin-bottom:18px">NevoFlux power users · must read</div>
      <h2 class="hero">5 small habits<br/>that make<br/>NevoFlux<br/><span style="color:#9c2a25">click</span></h2>
    </div>
    <div style="font-size:22px; opacity:0.65; font-weight:500">Swipe to see →</div>
    <div class="watermark">@NevoFlux · 5/11</div>
  </div>

  <div class="card c2">
    <div class="pageno">02 / 07</div>
    <div class="num">01</div>
    <h2>Feed<br/>GBrain first</h2>
    <p class="body">Drop your docs into the <strong>GBrain</strong> knowledge base before you ask. Grounded answers beat clever prompts.</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c3">
    <div class="pageno">03 / 07</div>
    <div class="num">02</div>
    <h2>Show the agent<br/>your format</h2>
    <p class="body">Before pasting markdown / CSV, tell it <strong>"output in the style of pack X"</strong>.<br/><br/>One concrete design skill beats 50 adjectives.</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c4">
    <div class="pageno">04 / 07</div>
    <div class="num">03</div>
    <h2>Use packs,<br/>don't rebuild</h2>
    <p class="body">Save your best flows as Canvas apps. With NevoFlux you just pick a pack ——<br/><br/><strong>world-class design systems</strong> ready to go.</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c5">
    <div class="pageno">05 / 07</div>
    <div class="num">04</div>
    <h2>Edit by<br/>sending a diff</h2>
    <p class="body">Re-running is not starting from zero. After a tweak <strong>send only the diff</strong> and let the agent patch existing HTML ——<br/><br/>save 80% tokens + keep the design.</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c6">
    <div class="pageno">06 / 07</div>
    <div class="num">05</div>
    <h2>Reuse your<br/>local session</h2>
    <p class="body">No API key needed — run the NevoFlux agent on your local SDK session.<br/><br/><strong>0 marginal cost</strong>, far faster than a remote API.</p>
    <div class="watermark">@NevoFlux</div>
  </div>

  <div class="card c7">
    <div class="pageno">07 / 07</div>
    <div style="margin:auto 0">
      <div style="font-size:24px; font-weight:600; color:#e9b94a; margin-bottom:24px">Before you go ✨</div>
      <h2 class="hero" style="color:#fafaf7">More tools<br/>isn't better.<br/><span style="color:#e9b94a">A smooth flow</span><br/>is what works.</h2>
    </div>
    <div style="display:flex; gap:14px; font-size:22px; font-weight:600">
      <span style="padding:10px 22px; background:#e9b94a; color:#15140f; border-radius:999px">Follow</span>
      <span style="padding:10px 22px; background:rgba(255,255,255,0.12); color:#fafaf7; border-radius:999px; border:1px solid rgba(255,255,255,0.2)">Save</span>
      <span style="padding:10px 22px; background:rgba(255,255,255,0.12); color:#fafaf7; border-radius:999px; border:1px solid rgba(255,255,255,0.2)">Share</span>
    </div>
    <div class="watermark" style="color:rgba(255,255,255,0.5)">@NevoFlux · weekly browser-agent workflows</div>
  </div>

</div>
</body>
</html>
```

## Usage

- `.deck` holds the vertical stack of cards. Add or remove `.card` blocks to set N (start at 3-6 for short content, stay within 9 for best results); each card carries one idea.
- Cover card (`.c1`): fill `.badge` (a save/bookmark hook), the subtitle line, and the `.hero` headline; keep the "Swipe to see" prompt.
- Body cards (`.c2`-`.c6`): set the `.num` index, the `h2` idea, and the `.body` copy (one core point + 1-2 examples; `<strong>` for emphasis).
- Closing card (`.c7`): summary line, `.hero` takeaway, and the follow / save / share action pills.
- Update `.pageno` (NN / total) and the `.watermark` (handle / date) on every card.
- Palette is per-card via `.c1`-`.c7` gradient classes — soft Morandi/pink tones; self-contained with CSS gradients and no external URLs.
