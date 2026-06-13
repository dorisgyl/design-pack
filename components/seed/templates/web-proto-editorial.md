---
slug: packs/design-pack/templates/web-proto-editorial
type: template
lang: en
category: prototype
title: "NevoFlux Editorial Prototype"
title_zh: "Editorial 原型"
description: "An editorial-minimalist web prototype: warm monochrome canvas, serif display, grotesque body, hairline borders, macro whitespace, and ambient micro-motion."
tags: [editorial, minimalist, serif, template]
sample_image: packs/design-pack/assets/templates/web-proto-editorial.svg
source: html-anything/web-proto-editorial
---
## Design guidance

A magazine-feel, minimalist web prototype built on calm restraint and generous whitespace, lifted by subtle micro-motion.

Layout:
- Warm monochrome canvas — a single near-white paper tone, never pure white, with quiet ink and muted greys.
- Type stack with three voices: a serif display for headlines, a grotesque (neo-grotesque sans) for body copy, and a monospace for meta labels, keystrokes, and eyebrows.
- 1px hairline borders only — no drop shadows, no heavy cards. Structure is drawn with thin rules and the seams of an uneven bento grid.
- Extremely soft chips — pale, low-saturation tints (red, blue, green, yellow) used sparingly as tags.
- Macro whitespace — large section padding, asymmetric hero, lots of air between elements.
- Ambient micro-motion — gentle on-enter reveals via IntersectionObserver (translate + fade), reduced-motion aware. No scroll listeners.

Design details:
- Floating pill nav, sticky near the top, with a frosted backdrop blur and a hairline border.
- Asymmetric hero: a monospace eyebrow chip, an oversized serif headline with italic accents, a muted lede, and primary + link actions with a keystroke hint.
- Bento grid on a 6-column track with uneven cells (hero, tall, wide, small) — hairline seams, mono section numbers, soft chips.
- A "what it isn't" contrast block: a serif statement beside paired Doesn't / Does rows, with struck-through copy for the negatives.
- A pricing band of three tiers separated by hairlines, one marked "recommended", all serif prices with mono-flavored meta.
- Mono footer with location, version, year, and quiet links.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NevoFlux — a quiet browser where the agent builds with you</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --canvas: #FBFBFA;
      --surface: #FFFFFF;
      --ink: #1A1A19;
      --muted: #787774;
      --hairline: #EAEAEA;
      --pale-red-bg: #FDEBEC; --pale-red-fg: #9F2F2D;
      --pale-blue-bg: #E1F3FE; --pale-blue-fg: #1F6C9F;
      --pale-green-bg: #EDF3EC; --pale-green-fg: #346538;
      --pale-yellow-bg: #FBF3DB; --pale-yellow-fg: #956400;
      --display: 'Instrument Serif', 'Newsreader', 'Lyon Text', Georgia, serif;
      --sans: 'Inter Tight', 'Switzer', 'SF Pro Display', system-ui, sans-serif;
      --mono: 'JetBrains Mono', 'Geist Mono', ui-monospace, monospace;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: var(--canvas);
      color: var(--ink);
      font-family: var(--sans);
      font-size: 16px;
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 0 32px; }

    /* ============ NAV (floating pill) ============ */
    .nav {
      position: sticky; top: 16px; z-index: 50;
      margin: 16px auto 0;
      display: flex; align-items: center; justify-content: space-between;
      max-width: 920px;
      padding: 10px 14px 10px 20px;
      background: rgba(251,251,250,0.78);
      backdrop-filter: saturate(140%) blur(16px);
      -webkit-backdrop-filter: saturate(140%) blur(16px);
      border: 1px solid var(--hairline);
      border-radius: 999px;
    }
    .nav .brand { font-family: var(--display); font-size: 22px; letter-spacing: -0.01em; }
    .nav .brand em { font-style: italic; color: var(--muted); }
    .nav ul { list-style: none; display: flex; gap: 22px; margin: 0; padding: 0; }
    .nav ul a { color: var(--ink); text-decoration: none; font-size: 13.5px; font-weight: 500; }
    .nav ul a:hover { color: var(--muted); }
    .nav .cta {
      font: 500 13px/1 var(--sans);
      padding: 9px 14px; border-radius: 999px;
      background: var(--ink); color: var(--canvas);
      border: 1px solid var(--ink);
      transition: transform 200ms cubic-bezier(0.16,1,0.3,1);
    }
    .nav .cta:active { transform: scale(0.98); }

    /* ============ HERO (asymmetric, eyebrow + serif display) ============ */
    .hero { padding: 96px 0 80px; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted);
      padding: 5px 11px; border: 1px solid var(--hairline);
      border-radius: 999px; background: var(--surface);
    }
    .eyebrow .dot { width: 6px; height: 6px; border-radius: 999px; background: var(--pale-green-fg); }
    .hero h1 {
      font-family: var(--display);
      font-size: clamp(48px, 7vw, 96px);
      line-height: 1.02;
      letter-spacing: -0.025em;
      margin: 22px 0 0;
      max-width: 16ch;
      font-weight: 400;
    }
    .hero h1 em { font-style: italic; color: var(--muted); }
    .hero .lede {
      font-size: 18.5px; color: var(--muted);
      max-width: 52ch; margin: 24px 0 36px;
      line-height: 1.55;
    }
    .hero .actions { display: flex; gap: 12px; align-items: center; }
    .btn {
      font: 500 14px/1 var(--sans);
      padding: 13px 22px; border-radius: 8px;
      cursor: pointer; transition: transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease;
    }
    .btn-primary { background: var(--ink); color: var(--canvas); border: 1px solid var(--ink); }
    .btn-primary:hover { background: #2A2A28; }
    .btn-primary:active { transform: scale(0.98); }
    .btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--hairline); }
    .btn-link { background: transparent; border: none; color: var(--ink); padding: 13px 0; font: 500 14px/1 var(--sans); cursor: pointer; }
    .btn-link::after { content: ' →'; color: var(--muted); }

    .keystroke {
      font-family: var(--mono); font-size: 11.5px;
      padding: 3px 7px; border: 1px solid var(--hairline);
      border-radius: 4px; background: var(--surface);
      color: var(--muted);
    }

    /* ============ BENTO (uneven grid, hairline only) ============ */
    .bento {
      padding: 72px 0;
      border-top: 1px solid var(--hairline);
    }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-auto-rows: minmax(180px, auto);
      gap: 0;
      border: 1px solid var(--hairline);
      background: var(--hairline);
    }
    .bento-grid > .cell {
      background: var(--surface);
      padding: 28px 30px;
    }
    .cell--hero { grid-column: span 4; grid-row: span 2; padding: 36px 40px; }
    .cell--tall { grid-column: span 2; grid-row: span 2; }
    .cell--wide { grid-column: span 4; }
    .cell--small { grid-column: span 2; }
    .cell h3 { font-family: var(--display); font-size: 26px; font-weight: 400; letter-spacing: -0.02em; margin: 0 0 8px; line-height: 1.15; }
    .cell h4 { font-size: 14px; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.005em; }
    .cell p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.6; max-width: 38ch; }
    .cell .num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 22px; }

    .chip {
      display: inline-block; font-family: var(--mono); font-size: 10.5px;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 3px 8px; border-radius: 999px; margin-right: 6px;
    }
    .chip--green { background: var(--pale-green-bg); color: var(--pale-green-fg); }
    .chip--blue { background: var(--pale-blue-bg); color: var(--pale-blue-fg); }
    .chip--red { background: var(--pale-red-bg); color: var(--pale-red-fg); }
    .chip--yellow { background: var(--pale-yellow-bg); color: var(--pale-yellow-fg); }

    .doclines {
      font-family: var(--mono); font-size: 11.5px; color: var(--muted); line-height: 1.85;
      border-top: 1px dashed var(--hairline); padding-top: 14px; margin-top: 20px;
    }
    .doclines b { color: var(--ink); font-weight: 500; }

    /* ============ CONTRAST BLOCK (no card, hairline only) ============ */
    .contrast {
      padding: 88px 0;
      border-top: 1px solid var(--hairline);
    }
    .contrast .columns {
      display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
    }
    .contrast h2 {
      font-family: var(--display); font-size: clamp(34px, 4.4vw, 56px);
      line-height: 1.05; letter-spacing: -0.025em; margin: 0;
      max-width: 14ch; font-weight: 400;
    }
    .contrast .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--hairline); margin-top: 24px; }
    .contrast .pair > div { padding: 22px 0; border-bottom: 1px solid var(--hairline); }
    .contrast .pair > div + div { border-left: 1px solid var(--hairline); padding-left: 22px; }
    .contrast .pair > div:nth-child(odd) { padding-right: 22px; }
    .contrast .pair .label { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); margin-bottom: 8px; }
    .contrast .pair p { margin: 0; font-size: 14.5px; line-height: 1.55; }
    .contrast .pair .strike { color: var(--muted); text-decoration: line-through; text-decoration-thickness: 1px; }

    /* ============ PRICING band (no card overuse) ============ */
    .pricing { padding: 88px 0; border-top: 1px solid var(--hairline); }
    .pricing-head { display: flex; justify-content: space-between; align-items: end; gap: 32px; margin-bottom: 36px; }
    .pricing-head h2 { font-family: var(--display); font-size: clamp(32px, 4vw, 48px); margin: 0; font-weight: 400; letter-spacing: -0.02em; line-height: 1.05; max-width: 18ch; }
    .pricing-head p { color: var(--muted); margin: 0; max-width: 38ch; font-size: 14.5px; }
    .tiers { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--hairline); }
    .tier { padding: 32px 28px; }
    .tier + .tier { border-left: 1px solid var(--hairline); }
    .tier h3 { font-family: var(--display); font-size: 24px; font-weight: 400; margin: 0 0 4px; letter-spacing: -0.01em; }
    .tier .sub { color: var(--muted); font-size: 13px; margin: 0 0 18px; }
    .tier .price { font-family: var(--display); font-size: 44px; letter-spacing: -0.025em; line-height: 1; margin-bottom: 18px; font-weight: 400; }
    .tier .price small { font-family: var(--sans); font-size: 13px; color: var(--muted); margin-left: 6px; }
    .tier ul { list-style: none; padding: 0; margin: 0 0 24px; }
    .tier ul li { font-size: 13.5px; padding: 8px 0; border-top: 1px solid var(--hairline); color: var(--ink); }
    .tier ul li:first-child { border-top: none; }
    .tier ul li::before { content: '— '; color: var(--muted); }
    .tier .btn { width: 100%; }
    .tier--highlight { background: var(--canvas); position: relative; }
    .tier--highlight::after {
      content: 'recommended';
      position: absolute; top: 16px; right: 16px;
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--pale-green-fg); background: var(--pale-green-bg);
      padding: 3px 8px; border-radius: 999px;
    }

    /* ============ FOOTER ============ */
    footer {
      border-top: 1px solid var(--hairline);
      padding: 32px 0;
      font-family: var(--mono); font-size: 11.5px; color: var(--muted);
      letter-spacing: 0.04em;
    }
    footer .row { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    footer a { color: var(--muted); text-decoration: none; }
    footer a:hover { color: var(--ink); }

    /* ============ RESPONSIVE ============ */
    @media (max-width: 880px) {
      .nav ul { display: none; }
      .bento-grid { grid-template-columns: 1fr; }
      .cell--hero, .cell--tall, .cell--wide, .cell--small { grid-column: span 1; grid-row: auto; }
      .contrast .columns, .pricing-head, .tiers { grid-template-columns: 1fr; display: block; }
      .tier + .tier { border-left: none; border-top: 1px solid var(--hairline); }
      .pricing-head p { margin-top: 12px; }
    }

    /* ============ MOTION (entry, subtle) ============ */
    .reveal { opacity: 0; transform: translateY(12px); transition: opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1); }
    .reveal.is-in { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
    }
  </style>
</head>
<body>

  <header class="nav" data-od-id="topnav">
    <span class="brand">NevoFlux<em> · browser</em></span>
    <ul>
      <li><a href="#bento">Surfaces</a></li>
      <li><a href="#contrast">What it isn't</a></li>
      <li><a href="#pricing">Plans</a></li>
      <li><a href="#changelog">Changelog</a></li>
    </ul>
    <button class="cta">Open browser</button>
  </header>

  <main>
    <section class="wrap hero reveal" data-od-id="hero">
      <span class="eyebrow"><span class="dot"></span>Now in private beta · build 0.4.7</span>
      <h1>A quiet browser where the <em>agent builds with you</em>, not for you.</h1>
      <p class="lede">NevoFlux is a browser for people who'd rather ship a working Canvas app than collect another tab. Ask the agent, ground it in GBrain, and watch it draft, run, and refine — without leaving the page.</p>
      <div class="actions">
        <button class="btn btn-primary">Request access</button>
        <button class="btn-link">Read the manual</button>
        <span class="keystroke">⌘ K</span>
      </div>
    </section>

    <section class="wrap bento reveal" id="bento" data-od-id="bento">
      <div class="bento-grid">
        <div class="cell cell--hero">
          <span class="num">01 / canvas</span>
          <span class="chip chip--green">Canvas</span>
          <h3>A Canvas that doubles as a workshop.</h3>
          <p>Describe what you want and the agent assembles a live Canvas app — editable, runnable, yours. Pin a panel to focus and the rest of the surface dims to a hairline. No template gallery, no plugin bingo — just the thing you asked for.</p>
          <div class="doclines">
            <b>↳</b> ⌘ ⇧ C   new canvas<br>
            <b>↳</b> ⌘ J     focus panel<br>
            <b>↳</b> ⌘ ⏎     run with agent
          </div>
        </div>
        <div class="cell cell--tall" data-od-id="bento-gbrain">
          <span class="num">02 / gbrain</span>
          <span class="chip chip--blue">GBrain</span>
          <h4 style="margin-top: 14px;">Grounded answers, no stray tabs</h4>
          <p>Drop pages, docs, and notes into GBrain and the agent cites them inline, anchored to the source. Trust an answer to file it away — never lose the "where did this come from" two weeks later.</p>
        </div>
        <div class="cell cell--small" data-od-id="bento-export">
          <span class="num">03 / export</span>
          <h4>Open files, always</h4>
          <p>Export round-trips: a Canvas app opens as the same HTML and assets it shipped with.</p>
        </div>
        <div class="cell cell--small" data-od-id="bento-history">
          <span class="num">04 / history</span>
          <span class="chip chip--yellow">Audit</span>
          <h4 style="margin-top: 8px;">Git-grade history</h4>
          <p>Every agent run is a commit. Diff two versions of a Canvas in three keystrokes.</p>
        </div>
        <div class="cell cell--wide" data-od-id="bento-packs">
          <span class="num">05 / packs</span>
          <span class="chip chip--red">Packs & SDK</span>
          <h4 style="margin-top: 14px;">Extend it with packs, drive it with the SDK</h4>
          <p>Install a design pack and its skills show up as the agent's house style. Reach the same agent from your own code through the NevoFlux SDK — build packs, ship Canvas apps, automate runs. No marketplace gatekeeping required.</p>
        </div>
      </div>
    </section>

    <section class="wrap contrast reveal" id="contrast" data-od-id="contrast">
      <div class="columns">
        <h2>NevoFlux isn't trying to be a chatbot. Or an IDE. Or another tab graveyard.</h2>
        <div>
          <div class="pair">
            <div>
              <div class="label">Doesn't</div>
              <p class="strike">Spit a wall of text and leave you to copy-paste it somewhere real.</p>
            </div>
            <div>
              <div class="label">Does</div>
              <p>Build a running Canvas app you can open, edit, and ship.</p>
            </div>
            <div>
              <div class="label">Doesn't</div>
              <p class="strike">Hallucinate sources, invent links, summarise pages it never read.</p>
            </div>
            <div>
              <div class="label">Does</div>
              <p>Ground answers in GBrain and cite the exact page you fed it.</p>
            </div>
            <div>
              <div class="label">Doesn't</div>
              <p class="strike">Lock your work in a format only this app can open.</p>
            </div>
            <div>
              <div class="label">Does</div>
              <p>Write plain files to disk. Read plain files from disk. Done.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap pricing reveal" id="pricing" data-od-id="pricing">
      <div class="pricing-head">
        <h2>One plan for the maker. One for the team. The rest is sales calls.</h2>
        <p>Free for fourteen days. We don't ask for a card and we don't email you afterwards unless you write back first.</p>
      </div>
      <div class="tiers">
        <div class="tier">
          <h3>Solo</h3>
          <p class="sub">For one maker with strong opinions.</p>
          <div class="price">$9<small>/ month</small></div>
          <ul>
            <li>Unlimited Canvas apps</li>
            <li>Local-first, encrypted GBrain</li>
            <li>Open file export & import</li>
            <li>Three design packs</li>
          </ul>
          <button class="btn btn-ghost">Start solo</button>
        </div>
        <div class="tier tier--highlight">
          <h3>Studio</h3>
          <p class="sub">For build teams up to twelve.</p>
          <div class="price">$22<small>/ seat / month</small></div>
          <ul>
            <li>Everything in Solo</li>
            <li>Shared GBrain & review</li>
            <li>SDK access & automated runs</li>
            <li>Audit log with diff history</li>
            <li>Private pack registry</li>
          </ul>
          <button class="btn btn-primary">Start studio</button>
        </div>
        <div class="tier">
          <h3>Press</h3>
          <p class="sub">For platforms and large orgs.</p>
          <div class="price">Talk<small>/ to us</small></div>
          <ul>
            <li>SSO (SAML, OIDC)</li>
            <li>Self-hosted deployment</li>
            <li>Custom pack pipelines</li>
            <li>Named support engineer</li>
          </ul>
          <button class="btn btn-ghost">Open a thread</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap row">
      <span>NevoFlux · Bordeaux, FR · v0.4.7 · 2026</span>
      <span>
        <a href="#">Manual</a> · <a href="#">Changelog</a> · <a href="#">Status</a> · <a href="#">Privacy</a>
      </span>
    </div>
  </footer>

  <script>
    // Intersection-observer reveal — never window scroll listeners.
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  </script>
</body>
</html>
```

## Usage

Fill these slots, keeping the structure and CSS intact:

- Nav — `.brand` (product + role tag), `ul a` links, and the `.cta` button label.
- Hero — `.eyebrow` status/build chip, `h1` serif headline (use `<em>` for the italic muted accent), `.lede` one-paragraph pitch, and the action buttons + `.keystroke` hint.
- Bento — five cells: a hero cell with mono number + chip + serif `h3` + paragraph + `.doclines` keystroke list, a tall cell, two small cells, and one wide cell. Swap the `.num` labels, chip colors, and copy per feature.
- Contrast — `h2` serif statement plus paired Doesn't / Does rows. Keep the `.strike` class on the "Doesn't" copy.
- Pricing — three `.tier` blocks; mark the middle one `.tier--highlight` to get the "recommended" badge. Update name, sub, price, the `ul` of dashed features, and the button.
- Footer — mono line with name · location · version · year, plus quiet links.

All visuals are CSS-only (gradients, tints, hairlines); there are no external images. The fonts load from Google Fonts with full system fallbacks in the font stack.
