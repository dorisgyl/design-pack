---
slug: packs/design-pack/templates/saas-landing-zh
type: template
lang: zh
category: prototype
title: "SaaS Landing"
title_en: "NevoFlux SaaS Landing"
description: "单页 SaaS 落地页,含 hero / features / social-proof / pricing / CTA。"
tags: [saas, landing, marketing, 模板]
sample_image: packs/design-pack/assets/templates/saas-landing.svg
source: html-anything/saas-landing
---
## 设计指导

完整的 SaaS 产品落地页,把用户内容映射到一组标准 section。意图:无论产品是什么,都能套进经典落地页流程,让访客从头读到尾并完成转化。

布局:
- 顶部导航 — logo、页内导航、登录入口、主 CTA。
- Hero — 大标题、副标文案、双 CTA、可视化占位。
- Logo 墙 — 社会认证(知名团队)。
- Features — 3-6 个特性卡,每张含 icon / 序号、标题与描述。
- How it works — 3 步流程,带序号,每步含标题与描述。
- Pricing — 2-3 档定价,推荐档高亮。
- FAQ — `details` / `summary` 手风琴。
- Footer。

设计细节:
- 现代 SaaS 风格:大字号、柔和渐变、glassmorphism 卡片、滚动入场动画。
- 至少处理 `md:` 断点,移动端收成单栏。
- 暖色低对比中性配色,白色卡面,单一强调色;推荐定价档带强调色描边与「推荐」小标签,让高亮看上去是有意为之。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — 让你的知识自己干活的浏览器</title>
  <style>
    :root {
      --bg: #fafaf9; --fg: #1c1b1a; --muted: #6b6964; --border: #e6e4e0;
      --accent: #c96442; --surface: #ffffff;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.55 -apple-system, system-ui, sans-serif; }
    .wrap { max-width: 1080px; margin: 0 auto; padding: 0 32px; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
    .logo { font-weight: 600; font-size: 17px; letter-spacing: -0.01em; }
    nav a { color: var(--fg); text-decoration: none; margin-left: 22px; font-size: 14px; }
    button { font: inherit; cursor: pointer; padding: 11px 20px; border-radius: 8px; font-weight: 500; }
    .btn-primary { background: var(--accent); color: white; border: 1px solid var(--accent); }
    .btn-secondary { background: transparent; color: var(--fg); border: 1px solid var(--border); }
    .btn-link { background: transparent; border: none; color: var(--accent); padding: 11px 0; font-weight: 500; cursor: pointer; }
    section { padding: 80px 0; }
    .hero { padding: 100px 0; }
    .hero h1 { font-size: clamp(44px, 6vw, 76px); line-height: 1.05; letter-spacing: -0.02em; max-width: 17ch; margin: 0 0 22px; }
    .hero p { font-size: 19px; color: var(--muted); max-width: 56ch; margin: 0 0 36px; }
    .hero .cta { display: flex; gap: 12px; }
    .features { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    @media (max-width: 800px) { .feature-grid { grid-template-columns: 1fr; } }
    .feature h3 { font-size: 18px; margin: 0 0 8px; letter-spacing: -0.01em; }
    .feature .num { font-family: ui-monospace, monospace; color: var(--accent); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; display: block; }
    .feature p { margin: 0; color: var(--muted); font-size: 14.5px; }
    .proof { text-align: center; }
    .proof h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin: 0 0 28px; }
    .logos { display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; opacity: 0.6; font-weight: 600; font-size: 17px; letter-spacing: -0.01em; }
    .pricing h2 { text-align: center; font-size: 36px; margin: 0 0 12px; letter-spacing: -0.02em; }
    .pricing .lede { text-align: center; color: var(--muted); margin: 0 0 48px; }
    .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media (max-width: 800px) { .tiers { grid-template-columns: 1fr; } }
    .tier { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 32px; }
    .tier.featured { border-color: var(--accent); position: relative; }
    .tier.featured::before { content: 'Recommended'; position: absolute; top: -12px; left: 24px; background: var(--accent); color: white; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 500; }
    .tier h3 { margin: 0 0 8px; font-size: 18px; }
    .tier .price { font-size: 40px; letter-spacing: -0.02em; margin: 6px 0 16px; }
    .tier .price small { font-size: 14px; color: var(--muted); font-weight: 400; }
    .tier ul { list-style: none; padding: 0; margin: 16px 0 24px; color: var(--muted); font-size: 14px; }
    .tier ul li { padding: 5px 0; border-top: 1px solid var(--border); }
    .tier ul li:first-child { border-top: none; }
    .closing { background: var(--accent); color: white; text-align: center; }
    .closing h2 { font-size: 38px; letter-spacing: -0.02em; margin: 0 0 14px; }
    .closing p { opacity: 0.85; margin: 0 0 28px; }
    .closing button { background: white; color: var(--accent); border: none; }
    footer { padding: 28px 0; color: var(--muted); font-size: 13px; text-align: center; }
  </style>
</head>
<body>
  <div class="wrap">
    <header data-od-id="topnav">
      <span class="logo">◰ NevoFlux</span>
      <nav>
        <a href="#features">功能</a>
        <a href="#pricing">定价</a>
        <a href="#docs">文档</a>
        <button class="btn-secondary" style="margin-left: 12px;">登录</button>
      </nav>
    </header>
    <section class="hero" data-od-id="hero">
      <h1>让你的知识自己干活的浏览器。</h1>
      <p>NevoFlux 把你读过的一切都索引进本地 GBrain 知识库,再让 agent 与 Canvas 应用基于它行动——全程在本机、可控、由你掌握的 SDK 驱动。</p>
      <div class="cta">
        <button class="btn-primary">获取 NevoFlux</button>
        <button class="btn-link">阅读文档 →</button>
      </div>
    </section>
  </div>

  <section class="features" id="features" data-od-id="features">
    <div class="wrap feature-grid">
      <div class="feature">
        <span class="num">01</span>
        <h3>GBrain 知识库</h3>
        <p>你打开的每个网页、PDF 和笔记都会在本地建立索引。用自然语言提问,得到基于你真正读过内容的回答。</p>
      </div>
      <div class="feature">
        <span class="num">02</span>
        <h3>Canvas 应用</h3>
        <p>把任意工作流变成 Canvas 上的小应用。接上你的 GBrain 与 agent,几分钟就能交付给团队。</p>
      </div>
      <div class="feature">
        <span class="num">03</span>
        <h3>Agent SDK 与 Pack</h3>
        <p>装上设计技能与 pack,或者自己写。agent 默认在本机运行——你的数据无需离开设备。</p>
      </div>
    </div>
  </section>

  <section class="proof wrap" data-od-id="proof">
    <h2>这些团队正在用它构建</h2>
    <div class="logos"><span>Ananke</span><span>Helix</span><span>Northwind</span><span>Quanta</span><span>Verde</span></div>
  </section>

  <section class="pricing wrap" id="pricing" data-od-id="pricing">
    <h2>定价</h2>
    <p class="lede">选一档,随时升级或取消。</p>
    <div class="tiers">
      <div class="tier">
        <h3>个人版</h3>
        <div class="price">¥0<small>/月</small></div>
        <p style="color: var(--muted); margin: 0;">适合个人。</p>
        <ul>
          <li>1 个本地 GBrain</li>
          <li>浏览器 + agent SDK</li>
          <li>3 个 Canvas 应用</li>
        </ul>
        <button class="btn-secondary" style="width: 100%;">选择个人版</button>
      </div>
      <div class="tier featured">
        <h3>团队版</h3>
        <div class="price">¥138<small>/席/月</small></div>
        <p style="color: var(--muted); margin: 0;">适合 50 人以内团队。</p>
        <ul>
          <li>不限量 GBrain 数据源</li>
          <li>共享 Canvas 应用与角色</li>
          <li>Design Pack 与技能市场</li>
          <li>审计日志</li>
        </ul>
        <button class="btn-primary" style="width: 100%;">选择团队版</button>
      </div>
      <div class="tier">
        <h3>企业版</h3>
        <div class="price">定制</div>
        <p style="color: var(--muted); margin: 0;">SSO、自托管 GBrain、SLA。</p>
        <ul>
          <li>自托管 agent 运行时</li>
          <li>SAML / SCIM</li>
          <li>专属支持</li>
        </ul>
        <button class="btn-secondary" style="width: 100%;">联系销售</button>
      </div>
    </div>
  </section>

  <section class="closing" data-od-id="closing">
    <div class="wrap">
      <h2>少读一点,多做一些。</h2>
      <p>14 天免费试用,无需信用卡。</p>
      <button>获取 NevoFlux</button>
    </div>
  </section>

  <footer class="wrap" data-od-id="footer">© NevoFlux · 隐私 · 条款 · 状态</footer>
</body>
</html>
```

## 用法

- `topnav` — logo、页内导航、`登录`次按钮(主 CTA 也可放这里)。替换品牌标记与链接即可。
- `hero` — 一句话价值主张的 `h1`、解释产品的副段落,以及含主按钮加 `.btn-link` 次操作的 `.cta` 行。
- `features` — 三张 `.feature` 卡,各含等宽 `.num` 序号、`h3` 标题与一段 `p`。重复该块可扩到六张;宽度小于 800px 时收成单栏。
- `proof` — 大写小标题加一排 `.logos` 客户 / 合作伙伴名(以文字代替 logo 图)。
- `pricing` — 三张 `.tier` 卡。给想主推的那档加 `featured` 类,即获得强调色描边与「推荐」标签。每张含 `h3` 名称、`.price`(带 `<small>` 单位)、一行描述、特性 `ul` 与一个满宽按钮。
- `closing` — 强调色铺底的收尾 CTA 区:标题、一句安心话术、一个按钮。
- `footer` — 单行法务 / 状态条。
- 全部内容自包含:不引用任何外链,仅用渐变与内联标记;复用单一 `--accent` 令牌,保持高亮一致。
