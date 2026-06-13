---
slug: packs/design-pack/templates/feature-grid
type: template
title: 特性网格 (Feature Grid)
description: 响应式特性卡网格，每张含图标 + 标题 + 描述。
tags: [features, grid, cards, template]
sample_image: packs/design-pack/assets/feature-grid.svg
---

# 特性网格 (Feature Grid)

自适应特性卡网格（`auto-fit`），用于展示 3–6 个卖点。引用 [[spacing-layout]] 的栅格与间距、
[[color-system]] 的语义色，满足 [[accessibility-baseline]] 与 [[responsive-baseline]]。

## 插槽
- 区块 `title` / `subtitle`；每张卡 `icon`(SVG/emoji) · `title` · `desc`。

## HTML 片段

```html
<section class="dp-features">
  <header class="dp-features__head">
    <h2 class="dp-features__title">为什么选择我们</h2>
    <p class="dp-features__sub">三句话讲清差异化价值，聚焦结果而非功能。</p>
  </header>
  <div class="dp-features__grid">
    <article class="dp-feature">
      <div class="dp-feature__icon" aria-hidden="true">⚡</div>
      <h3 class="dp-feature__title">极速上手</h3>
      <p class="dp-feature__desc">零配置开箱即用，几分钟跑通第一个流程。</p>
    </article>
    <article class="dp-feature">
      <div class="dp-feature__icon" aria-hidden="true">🔒</div>
      <h3 class="dp-feature__title">默认安全</h3>
      <p class="dp-feature__desc">端到端加密与最小权限，数据始终在你掌控。</p>
    </article>
    <article class="dp-feature">
      <div class="dp-feature__icon" aria-hidden="true">🧩</div>
      <h3 class="dp-feature__title">灵活扩展</h3>
      <p class="dp-feature__desc">模块化设计，按需拼装，随业务自由生长。</p>
    </article>
  </div>
</section>

<style>
  .dp-features{
    max-width:var(--container,1200px); margin-inline:auto;
    padding:var(--space-16,64px) var(--space-6,24px);
    font-family:var(--font-sans,system-ui,sans-serif); color:var(--text,#0b0d10);
  }
  .dp-features__head{ text-align:center; max-width:60ch; margin:0 auto var(--space-12,48px); }
  .dp-features__title{ font-size:var(--text-2xl,1.953rem); margin:0 0 var(--space-3,12px); line-height:1.2; }
  .dp-features__sub{ font-size:var(--text-lg,1.25rem); color:var(--text-muted,#5b6470); margin:0; line-height:1.5; }
  .dp-features__grid{
    display:grid; gap:var(--space-6,24px);
    grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  }
  .dp-feature{
    background:var(--surface,#f7f8fa); border:1px solid var(--border,#e3e6eb);
    border-radius:var(--radius-lg,16px); padding:var(--space-8,32px);
    display:flex; flex-direction:column; gap:var(--space-3,12px);
  }
  .dp-feature__icon{
    width:48px; height:48px; display:grid; place-items:center; font-size:24px;
    border-radius:var(--radius-md,10px);
    background:color-mix(in srgb, var(--primary,#3b5bff) 12%, transparent);
  }
  .dp-feature__title{ margin:0; font-size:var(--text-xl,1.563rem); }
  .dp-feature__desc{ margin:0; color:var(--text-muted,#5b6470); line-height:1.6; }
</style>
```
