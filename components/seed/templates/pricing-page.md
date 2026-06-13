---
slug: packs/design-pack/templates/pricing-page
type: template
lang: en
category: prototype
title: "NevoFlux Pricing Page"
title_zh: "定价页"
description: "Three-tier pricing layout with a feature comparison table and FAQ for a SaaS product."
tags: [pricing, plans, 定价, template]
sample_image: packs/design-pack/assets/templates/pricing-page.svg
source: html-anything/pricing-page
---
## Design guidance

A standard SaaS three-tier pricing page that aligns value with price at a glance. Intent: a desktop sales page (target width 1440) where a visitor can read the plans, compare features, and pick a tier in seconds.

Layout:
- Header with a centered headline and a monthly / yearly billing toggle.
- Three pricing cards (Free / Pro / Enterprise), with the middle tier highlighted as the "popular" choice.
- A full feature comparison table (✓ / – / per-tier values).
- An FAQ built from native `details` / `summary` elements.
- A bottom call to action.

Design details:
- Warm, low-contrast neutral palette with white surfaces and a single accent color.
- The featured tier gets an accent border, a soft accent ring (box-shadow), and a small uppercase pill.
- List items use an accent ✓ marker; comparison cells use the accent for "has" and the muted color for "—".
- Cards share one rounded-corner / hairline-border treatment so the highlighted tier reads as a deliberate emphasis, not a different component.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pricing — NevoFlux</title>
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
      <h1>Your knowledge, one price.</h1>
      <p>Start free with a local GBrain. Move up to a paid plan the day your team needs shared Canvas apps. Switch to yearly billing for two months off.</p>
      <div class="toggle">
        <button class="active">Monthly</button>
        <button>Yearly · save 17%</button>
      </div>
    </header>

    <section class="tiers" data-od-id="tiers">
      <div class="tier">
        <h2>Free</h2>
        <p class="desc">For solo builders.</p>
        <div class="price">$0 <small>/ month</small></div>
        <ul>
          <li>1 local GBrain knowledge base</li>
          <li>NevoFlux browser + agent SDK</li>
          <li>3 Canvas apps</li>
          <li>Community support</li>
        </ul>
        <button class="cta cta-secondary">Start free</button>
      </div>
      <div class="tier featured">
        <span class="featured-pill">Recommended</span>
        <h2>Pro</h2>
        <p class="desc">For teams up to 50 people.</p>
        <div class="price">$19 <small>/ seat / month</small></div>
        <ul>
          <li>Unlimited GBrain sources</li>
          <li>Shared Canvas apps & roles</li>
          <li>Design Pack & skill marketplace</li>
          <li>Usage analytics + audit log</li>
          <li>Priority support</li>
        </ul>
        <button class="cta cta-primary">Choose Pro</button>
      </div>
      <div class="tier">
        <h2>Enterprise</h2>
        <p class="desc">SSO, self-hosted GBrain, 99.99% SLA.</p>
        <div class="price">Custom</div>
        <ul>
          <li>Self-hosted GBrain & agent runtime</li>
          <li>SAML / SCIM provisioning</li>
          <li>Private model & embedding keys</li>
          <li>Dedicated solutions engineer</li>
        </ul>
        <button class="cta cta-secondary">Talk to sales</button>
      </div>
    </section>

    <section class="compare" data-od-id="compare">
      <h3>Plan comparison</h3>
      <table>
        <thead><tr><th>Feature</th><th>Free</th><th>Pro</th><th>Enterprise</th></tr></thead>
        <tbody>
          <tr><td>NevoFlux browser & agent SDK</td><td class="has">✓</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>Local GBrain indexing</td><td class="has">✓</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>Shared Canvas apps</td><td class="no">—</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>SAML / SCIM</td><td class="no">—</td><td class="no">—</td><td class="has">✓</td></tr>
          <tr><td>Audit log</td><td class="no">—</td><td class="has">✓</td><td class="has">✓</td></tr>
          <tr><td>SLA</td><td class="no">—</td><td>99.9%</td><td>99.99%</td></tr>
          <tr><td>Support</td><td>Community</td><td>Priority</td><td>Dedicated SE</td></tr>
        </tbody>
      </table>
    </section>

    <section class="faq" data-od-id="faq">
      <h3>Common questions</h3>
      <details><summary>Can I change plans mid-month?</summary><p>Yes. Upgrading charges a prorated difference and unlocks shared Canvas apps immediately; downgrades take effect at the next billing cycle.</p></details>
      <details><summary>Is the Free plan really free?</summary><p>Yes — one local GBrain, the NevoFlux browser, and the agent SDK, with no credit card required. Every paid plan also includes a 14-day trial.</p></details>
      <details><summary>How does seat-based billing work for Pro?</summary><p>You pay per active seat per month. Inactive seats free up automatically after 30 days and we prorate the credit.</p></details>
    </section>
  </div>
</body>
</html>
```

## Usage

- `header` — centered headline, sub-copy, and a monthly / yearly billing toggle (the active button carries class `active`).
- `tiers` — three `.tier` cards. Add class `featured` to the tier you want to push; give it a `.featured-pill` and the primary CTA. Each card has an `h2` name, a `.desc`, a `.price` (with a `<small>` unit), a feature `ul`, and a `.cta` button.
- `compare` — the full feature matrix. Use `td.has` for an included feature (✓), `td.no` for an excluded one (—), or plain `td` for a per-tier value (SLA %, support level).
- `faq` — `details` / `summary` accordion; one `summary` question and one `p` answer per item.
- Keep the palette to the single `--accent` token; the featured tier, ✓ markers, and "has" cells all reuse it so emphasis stays consistent.
