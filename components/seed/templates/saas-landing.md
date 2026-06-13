---
slug: packs/design-pack/templates/saas-landing
type: template
lang: en
category: prototype
title: "NevoFlux SaaS Landing"
title_zh: "SaaS Landing"
description: "Single-page SaaS landing page with hero, features, social proof, pricing, and a closing CTA."
tags: [saas, landing, marketing, template]
sample_image: packs/design-pack/assets/templates/saas-landing.svg
source: html-anything/saas-landing
---
## Design guidance

A complete SaaS product landing page that maps user content onto a standard set of sections. Intent: take whatever the product is and slot it into the canonical landing-page flow so a visitor can read it top to bottom and convert.

Layout:
- Top nav — logo, in-page navigation, sign-in, and a primary CTA.
- Hero — large headline, supporting sub-copy, a dual call to action, and a visual placeholder.
- Logo wall — social proof from recognizable teams.
- Features — three to six feature cards, each with an icon/number, a title, and a description.
- How it works — a three-step flow, numbered, each step with a title and description.
- Pricing — two to three tiers, with the recommended tier highlighted.
- FAQ — a `details` / `summary` accordion.
- Footer.

Design details:
- Modern SaaS look: large type, soft gradients, glassmorphism cards, scroll-in entrance animations.
- Handle at least the `md:` breakpoint; collapse to a single column on mobile.
- Warm, low-contrast neutral palette with white surfaces and a single accent color; the featured pricing tier carries the accent border plus a small "Recommended" pill so the emphasis reads as deliberate.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — the browser where your knowledge does the work</title>
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
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#docs">Docs</a>
        <button class="btn-secondary" style="margin-left: 12px;">Sign in</button>
      </nav>
    </header>
    <section class="hero" data-od-id="hero">
      <h1>The browser where your knowledge does the work.</h1>
      <p>NevoFlux indexes everything you read into a local GBrain, then lets agents and Canvas apps act on it — privately, on your machine, with an SDK you control.</p>
      <div class="cta">
        <button class="btn-primary">Get NevoFlux</button>
        <button class="btn-link">Read the docs →</button>
      </div>
    </section>
  </div>

  <section class="features" id="features" data-od-id="features">
    <div class="wrap feature-grid">
      <div class="feature">
        <span class="num">01</span>
        <h3>GBrain knowledge base</h3>
        <p>Every page, PDF, and note you open is indexed locally. Ask in plain language and get answers grounded in what you've actually read.</p>
      </div>
      <div class="feature">
        <span class="num">02</span>
        <h3>Canvas apps</h3>
        <p>Turn any workflow into a small app on the Canvas. Wire it to your GBrain and the agent, ship it to your team in minutes.</p>
      </div>
      <div class="feature">
        <span class="num">03</span>
        <h3>Agent SDK & packs</h3>
        <p>Drop in design skills and packs, or write your own. The agent runs on-device by default — your data never has to leave.</p>
      </div>
    </div>
  </section>

  <section class="proof wrap" data-od-id="proof">
    <h2>Trusted by teams building with</h2>
    <div class="logos"><span>Ananke</span><span>Helix</span><span>Northwind</span><span>Quanta</span><span>Verde</span></div>
  </section>

  <section class="pricing wrap" id="pricing" data-od-id="pricing">
    <h2>Pricing</h2>
    <p class="lede">Pick a tier. Switch or cancel any time.</p>
    <div class="tiers">
      <div class="tier">
        <h3>Solo</h3>
        <div class="price">$0<small>/mo</small></div>
        <p style="color: var(--muted); margin: 0;">For individuals.</p>
        <ul>
          <li>1 local GBrain</li>
          <li>Browser + agent SDK</li>
          <li>3 Canvas apps</li>
        </ul>
        <button class="btn-secondary" style="width: 100%;">Choose Solo</button>
      </div>
      <div class="tier featured">
        <h3>Team</h3>
        <div class="price">$19<small>/seat/mo</small></div>
        <p style="color: var(--muted); margin: 0;">For teams up to 50.</p>
        <ul>
          <li>Unlimited GBrain sources</li>
          <li>Shared Canvas apps & roles</li>
          <li>Design Pack & skill marketplace</li>
          <li>Audit log</li>
        </ul>
        <button class="btn-primary" style="width: 100%;">Choose Team</button>
      </div>
      <div class="tier">
        <h3>Enterprise</h3>
        <div class="price">Custom</div>
        <p style="color: var(--muted); margin: 0;">SSO, self-hosted GBrain, SLA.</p>
        <ul>
          <li>Self-hosted agent runtime</li>
          <li>SAML / SCIM</li>
          <li>Dedicated support</li>
        </ul>
        <button class="btn-secondary" style="width: 100%;">Talk to sales</button>
      </div>
    </div>
  </section>

  <section class="closing" data-od-id="closing">
    <div class="wrap">
      <h2>Read less, build more.</h2>
      <p>14-day free trial. No credit card needed.</p>
      <button>Get NevoFlux</button>
    </div>
  </section>

  <footer class="wrap" data-od-id="footer">© NevoFlux · Privacy · Terms · Status</footer>
</body>
</html>
```

## Usage

- `topnav` — logo, in-page nav links, a `Sign in` secondary button (the primary CTA can live here too). Swap the brand mark and links for your product.
- `hero` — one-line `h1` value proposition, a sub-paragraph that explains the product, and a `.cta` row with a primary button plus a `.btn-link` secondary action.
- `features` — three `.feature` cards. Each has a monospace `.num` label, an `h3` title, and a short `p`. Add up to six by repeating the block; the grid collapses to one column under 800px.
- `proof` — uppercase label plus a `.logos` row of customer / partner names (text stand-ins for logo art).
- `pricing` — three `.tier` cards. Add class `featured` to the tier you want to push; it gets the accent border and the "Recommended" pill. Each card has an `h3` name, a `.price` (with `<small>` unit), a one-line description, a feature `ul`, and a full-width button.
- `closing` — accent-filled final CTA band: headline, reassurance line, and one button.
- `footer` — single-line legal / status strip.
- Keep all content self-contained: no external URLs, gradients and inline marks only, and reuse the single `--accent` token so emphasis stays consistent.
