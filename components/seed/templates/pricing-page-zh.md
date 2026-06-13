---
slug: packs/design-pack/templates/pricing-page-zh
type: template
lang: zh
category: prototype
title: "定价页"
title_en: "NevoFlux Pricing Page"
description: "三档定价 + 特性对比表 + FAQ 的 SaaS 定价页。"
tags: [pricing, plans, 定价, 模板]
sample_image: packs/design-pack/assets/templates/pricing-page.svg
source: html-anything/pricing-page
---
## 设计指导

标准 SaaS 三档定价页,一眼对齐价值与价格。意图:面向桌面端(目标宽度 1440)的销售页面,访客可以快速读完套餐、对比特性并选定档位。

布局:
- Header,含居中标题与「按月 / 按年」计费切换。
- 三档定价卡片(Free / Pro / Enterprise),中间一档作为「热门」高亮。
- 完整特性对比表(✓ / – / 各档不同取值)。
- FAQ,使用原生 `details` / `summary` 元素。
- 底部 CTA。

设计细节:
- 暖色、低对比度的中性色板,白色卡面,单一强调色。
- 高亮档位带强调色边框、柔和的强调色光环(box-shadow)与一枚小号大写药丸标签。
- 列表项使用强调色 ✓ 标记;对比表中 ✓ 用强调色,「—」用 muted 弱化色。
- 所有卡片共用同一套圆角 / 细线边框处理,使高亮档位读起来像是刻意强调,而非另一种组件。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>定价 — NevoFlux</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.55 -apple-system, system-ui, sans-serif; }
    .wrap { max-width: 1080px; margin: 0 auto; padding: 64px 32px 96px; }
    header { text-align: center; margin-bottom: 64px; }
    header h1 { font-size: clamp(40px, 5vw, 60px); letter-spacing: -0.02em; margin: 0 0 14px; }
    header p { font-size: 18px; color: var(--muted); margin: 0 auto; max-width: 50ch; }
    .toggle { display: inline-flex; margin-top: 28px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); overflow: hidden; }
    .toggle button { font: inherit; cursor: pointer; padding: 8px 18px; border: none; background: transparent; color: var(--muted); }
    .toggle button.active { background: var(--fg); color: white; }
    .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 64px; }
    @media (max-width: 800px) { .tiers { grid-template-columns: 1fr; } }
    .tier { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 36px 32px; }
    .tier.featured { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(201,100,66,0.08); }
    .tier h2 { margin: 0 0 4px; font-size: 18px; letter-spacing: -0.01em; }
    .tier .desc { color: var(--muted); font-size: 14px; margin: 0 0 24px; }
    .tier .price { font-size: 48px; letter-spacing: -0.025em; line-height: 1; margin-bottom: 6px; }
    .tier .price small { font-size: 14px; color: var(--muted); font-weight: 400; letter-spacing: 0; }
    .tier ul { list-style: none; padding: 0; margin: 24px 0 28px; font-size: 14px; }
    .tier ul li { padding: 8px 0; color: var(--fg); border-top: 1px solid var(--border); display: flex; gap: 10px; align-items: flex-start; }
    .tier ul li::before { content: '✓'; color: var(--accent); flex-shrink: 0; }
    .tier ul li:first-child { border-top: none; }
    button.cta { font: inherit; cursor: pointer; padding: 12px 18px; border-radius: 8px; width: 100%; font-weight: 500; }
    .cta-primary { background: var(--accent); color: white; border: 1px solid var(--accent); }
    .cta-secondary { background: transparent; color: var(--fg); border: 1px solid var(--border); }
    .featured-pill { display: inline-block; font-size: 11px; padding: 2px 9px; border-radius: 999px; background: var(--accent); color: white; margin-bottom: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
    .compare { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
    .compare h3 { padding: 24px 28px; margin: 0; font-size: 16px; border-bottom: 1px solid var(--border); }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { padding: 12px 18px; text-align: left; border-top: 1px solid var(--border); }
    th { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; background: var(--bg); }
    td.has { color: var(--accent); font-weight: 500; }
    td.no { color: var(--muted); }
    .faq { margin-top: 56px; }
    .faq h3 { font-size: 22px; letter-spacing: -0.01em; margin-bottom: 24px; }
    details { padding: 16px 0; border-top: 1px solid var(--border); }
    details summary { font-weight: 500; cursor: pointer; }
    details p { margin: 10px 0 0; color: var(--muted); }
  </style>
</head>
<body>
  <div class="wrap">
    <header data-od-id="header">
      <h1>你的知识,一个价格。</h1>
      <p>从一个本地 GBrain 知识库免费开始。当团队需要共享 Canvas 应用时,再升级到付费套餐。切换为按年计费,可省两个月。</p>
      <div class="toggle">
        <button class="active">按月</button>
        <button>按年 · 省 17%</button>
      </div>
    </header>

    <section class="tiers" data-od-id="tiers">
      <div class="tier">
        <h2>免费版</h2>
        <p class="desc">面向个人创作者。</p>
        <div class="price">¥0 <small>/ 月</small></div>
        <ul>
          <li>1 个本地 GBrain 知识库</li>
          <li>NevoFlux 浏览器 + 智能体 SDK</li>
          <li>3 个 Canvas 应用</li>
          <li>社区支持</li>
        </ul>
        <button class="cta cta-secondary">免费开始</button>
      </div>
      <div class="tier featured">
        <span class="featured-pill">推荐</span>
        <h2>专业版</h2>
        <p class="desc">面向 50 人以内的团队。</p>
        <div class="price">¥138 <small>/ 席位 / 月</small></div>
        <ul>
          <li>不限数量的 GBrain 数据源</li>
          <li>共享 Canvas 应用与角色权限</li>
          <li>设计 Pack 与技能市场</li>
          <li>用量分析 + 审计日志</li>
          <li>优先支持</li>
        </ul>
        <button class="cta cta-primary">选择专业版</button>
      </div>
      <div class="tier">
        <h2>企业版</h2>
        <p class="desc">SSO、私有部署 GBrain、99.99% SLA。</p>
        <div class="price">定制</div>
        <ul>
          <li>私有部署 GBrain 与智能体运行时</li>
          <li>SAML / SCIM 账号开通</li>
          <li>私有模型与向量密钥</li>
          <li>专属解决方案工程师</li>
        </ul>
        <button class="cta cta-secondary">联系销售</button>
      </div>
    </section>

    <section class="compare" data-od-id="compare">
      <h3>套餐对比</h3>
      <table>
        <thead><tr><th>特性</th><th>免费版</th><th>专业版</th><th>企业版</th></tr></thead>
        <tbody>
          <tr><td>NevoFlux 浏览器与智能体 SDK</td><td class="has">✓</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>本地 GBrain 索引</td><td class="has">✓</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>共享 Canvas 应用</td><td class="no">—</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>SAML / SCIM</td><td class="no">—</td><td class="no">—</td><td class="has">✓</td></tr>
          <tr><td>审计日志</td><td class="no">—</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>SLA</td><td class="no">—</td><td>99.9%</td><td>99.99%</td></tr>
          <tr><td>支持</td><td>社区</td><td>优先</td><td>专属工程师</td></tr>
        </tbody>
      </table>
    </section>

    <section class="faq" data-od-id="faq">
      <h3>常见问题</h3>
      <details><summary>可以在月中更换套餐吗?</summary><p>可以。升级会按差额比例计费,并立即解锁共享 Canvas 应用;降级则在下一个计费周期生效。</p></details>
      <details><summary>免费版真的免费吗?</summary><p>是的 —— 包含一个本地 GBrain、NevoFlux 浏览器与智能体 SDK,无需信用卡。每个付费套餐还附带 14 天试用。</p></details>
      <details><summary>专业版的按席位计费如何运作?</summary><p>按每月活跃席位收费。闲置席位在 30 天后自动释放,我们会按比例返还额度。</p></details>
    </section>
  </div>
</body>
</html>
```

## 用法

- `header` —— 居中标题、副文案,以及「按月 / 按年」计费切换(激活的按钮带 `active` 类)。
- `tiers` —— 三张 `.tier` 卡片。给想要主推的档位加上 `featured` 类,并配上 `.featured-pill` 与主 CTA。每张卡片含 `h2` 档位名、`.desc` 描述、`.price` 价格(带 `<small>` 单位)、特性 `ul` 列表与 `.cta` 按钮。
- `compare` —— 完整特性矩阵。包含的特性用 `td.has`(✓),不含的用 `td.no`(—),按档不同的取值用普通 `td`(SLA 百分比、支持级别)。
- `faq` —— `details` / `summary` 折叠面板;每项一个 `summary` 问题与一个 `p` 答案。
- 色板仅保留单一 `--accent` 变量;高亮档位、✓ 标记与「has」单元格全部复用它,保持强调的一致性。
