---
slug: packs/design-pack/templates/pricing-table-zh
type: template
lang: zh
title: "定价表 (3 档)"
title_en: "Pricing Table (3 tiers)"
description: "三档定价,含主推档高亮、特性清单与每档 CTA。"
tags: [pricing, table, conversion, 模板]
sample_image: packs/design-pack/assets/templates/pricing-table.svg
source: design-pack/original
---

# 定价表 (3 档)

三档定价卡,中间档高亮为“主推”。引用 [[color-system]] / [[spacing-layout]] / [[typography-scale]],
满足 [[accessibility-baseline]](对比、焦点)与 [[responsive-baseline]](窄屏堆叠)。

## 插槽
- 每档:`name` · `price` · `period` · `features[]` · `cta` · `featured`(bool)。

## HTML 片段

```html
<section class="dp-pricing">
  <article class="dp-plan">
    <h3 class="dp-plan__name">入门</h3>
    <p class="dp-plan__price">¥0<span>/月</span></p>
    <ul class="dp-plan__features">
      <li>1 个项目</li><li>社区支持</li><li>基础组件库</li>
    </ul>
    <a class="dp-btn dp-btn--ghost" href="#free">开始使用</a>
  </article>

  <article class="dp-plan dp-plan--featured">
    <span class="dp-plan__badge">最受欢迎</span>
    <h3 class="dp-plan__name">专业</h3>
    <p class="dp-plan__price">¥99<span>/月</span></p>
    <ul class="dp-plan__features">
      <li>无限项目</li><li>优先支持</li><li>全部模板</li><li>团队协作</li>
    </ul>
    <a class="dp-btn dp-btn--primary" href="#pro">升级专业版</a>
  </article>

  <article class="dp-plan">
    <h3 class="dp-plan__name">企业</h3>
    <p class="dp-plan__price">定制</p>
    <ul class="dp-plan__features">
      <li>SSO / 审计</li><li>专属支持</li><li>SLA 保障</li>
    </ul>
    <a class="dp-btn dp-btn--ghost" href="#enterprise">联系我们</a>
  </article>
</section>

<style>
  .dp-pricing{
    display:grid; gap:var(--space-6,24px);
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    max-width:var(--container,1200px); margin-inline:auto;
    padding:var(--space-12,48px) var(--space-6,24px);
    font-family:var(--font-sans,system-ui,sans-serif); color:var(--text,#0b0d10);
  }
  .dp-plan{
    position:relative; display:flex; flex-direction:column; gap:var(--space-4,16px);
    background:var(--surface,#f7f8fa); border:1px solid var(--border,#e3e6eb);
    border-radius:var(--radius-lg,16px); padding:var(--space-8,32px);
    box-shadow:var(--shadow-sm,0 1px 2px rgba(16,24,40,.06));
  }
  .dp-plan--featured{
    border-color:var(--primary,#3b5bff); box-shadow:var(--shadow-lg,0 12px 32px rgba(16,24,40,.12));
  }
  .dp-plan__badge{
    position:absolute; top:calc(-1*var(--space-3,12px)); left:var(--space-8,32px);
    background:var(--primary,#3b5bff); color:var(--primary-contrast,#fff);
    font-size:var(--text-xs,.64rem); font-weight:600; letter-spacing:.04em; text-transform:uppercase;
    padding:var(--space-1,4px) var(--space-3,12px); border-radius:var(--radius-full,9999px);
  }
  .dp-plan__name{ margin:0; font-size:var(--text-xl,1.563rem); }
  .dp-plan__price{ margin:0; font-size:var(--text-3xl,2.441rem); font-weight:700; line-height:1.1; }
  .dp-plan__price span{ font-size:var(--text-base,1rem); font-weight:400; color:var(--text-muted,#5b6470); }
  .dp-plan__features{ list-style:none; margin:0; padding:0; display:grid; gap:var(--space-2,8px);
    color:var(--text-muted,#5b6470); flex:1; }
  .dp-plan__features li{ padding-left:1.5em; position:relative; }
  .dp-plan__features li::before{ content:"✓"; position:absolute; left:0; color:var(--success,#1a7f5a); font-weight:700; }
  .dp-btn{ display:inline-flex; align-items:center; justify-content:center; min-height:44px;
    padding:0 var(--space-6,24px); border-radius:var(--radius-md,10px); font-weight:600;
    text-decoration:none; border:1px solid transparent; }
  .dp-btn--primary{ background:var(--primary,#3b5bff); color:var(--primary-contrast,#fff); }
  .dp-btn--ghost{ background:transparent; color:var(--text,#0b0d10); border-color:var(--border,#e3e6eb); }
  .dp-btn:focus-visible{ outline:2px solid var(--primary,#3b5bff); outline-offset:2px; }
</style>
```
