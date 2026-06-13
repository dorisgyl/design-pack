---
slug: packs/design-pack/templates/landing-hero
type: template
title: 落地页 Hero 区
description: 营销落地页首屏：眼标 + 主标题 + 副文 + 双 CTA + 视觉块。
tags: [landing, hero, marketing, template]
sample_image: packs/design-pack/assets/landing-hero.svg
---

# 落地页 Hero 区

营销落地页首屏。引用配色 [[color-system]]、字阶 [[typography-scale]]、间距 [[spacing-layout]] 的 token。
满足 [[accessibility-baseline]] 与 [[responsive-baseline]]。

## 插槽
- `eyebrow` 眼标（可选）· `title` 主标题 · `subhead` 副文 · `cta_primary` / `cta_secondary` · `visual` 右侧视觉。

## HTML 片段

```html
<section class="dp-hero">
  <div class="dp-hero__copy">
    <p class="dp-hero__eyebrow">现在开始</p>
    <h1 class="dp-hero__title">把想法，几分钟内变成上线的产品</h1>
    <p class="dp-hero__sub">一句话讲清你的核心价值。聚焦用户能得到什么，而不是功能清单。</p>
    <div class="dp-hero__actions">
      <a class="dp-btn dp-btn--primary" href="#get-started">免费开始</a>
      <a class="dp-btn dp-btn--ghost" href="#demo">看演示</a>
    </div>
  </div>
  <div class="dp-hero__visual" aria-hidden="true"></div>
</section>

<style>
  .dp-hero{
    display:grid; gap:var(--space-12,48px);
    grid-template-columns:1.1fr .9fr; align-items:center;
    max-width:var(--container,1200px); margin-inline:auto;
    padding:var(--space-16,64px) var(--space-6,24px);
    color:var(--text,#0b0d10); font-family:var(--font-sans,system-ui,sans-serif);
  }
  .dp-hero__eyebrow{
    color:var(--primary,#3b5bff); font-weight:600;
    font-size:var(--text-sm,.8rem); letter-spacing:.04em; text-transform:uppercase;
    margin:0 0 var(--space-3,12px);
  }
  .dp-hero__title{
    font-size:clamp(2rem,1.4rem + 3vw,3.052rem); line-height:1.1; margin:0;
    letter-spacing:-.01em; max-width:18ch;
  }
  .dp-hero__sub{
    font-size:var(--text-lg,1.25rem); line-height:1.5; color:var(--text-muted,#5b6470);
    max-width:46ch; margin:var(--space-4,16px) 0 var(--space-8,32px);
  }
  .dp-hero__actions{ display:flex; gap:var(--space-3,12px); flex-wrap:wrap; }
  .dp-btn{
    display:inline-flex; align-items:center; min-height:44px;
    padding:0 var(--space-6,24px); border-radius:var(--radius-md,10px);
    font-weight:600; text-decoration:none; border:1px solid transparent;
  }
  .dp-btn--primary{ background:var(--primary,#3b5bff); color:var(--primary-contrast,#fff); }
  .dp-btn--ghost{ background:transparent; color:var(--text,#0b0d10); border-color:var(--border,#e3e6eb); }
  .dp-btn:focus-visible{ outline:2px solid var(--primary,#3b5bff); outline-offset:2px; }
  .dp-hero__visual{
    aspect-ratio:4/3; border-radius:var(--radius-lg,16px);
    background:
      radial-gradient(120% 120% at 0% 0%, color-mix(in srgb, var(--primary,#3b5bff) 22%, transparent), transparent 60%),
      var(--surface,#f7f8fa);
    border:1px solid var(--border,#e3e6eb); box-shadow:var(--shadow-lg,0 12px 32px rgba(16,24,40,.12));
  }
  @media (max-width:860px){
    .dp-hero{ grid-template-columns:1fr; padding-block:var(--space-12,48px); }
    .dp-hero__visual{ order:-1; }
  }
</style>
```
