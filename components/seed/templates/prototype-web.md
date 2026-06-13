---
slug: packs/design-pack/templates/prototype-web
type: template
lang: en
category: prototype
title: "NevoFlux Web Prototype"
title_zh: "Web 产品原型"
description: "A clickable, functional web prototype with nav, hero, features, and CTA — a high-fidelity SaaS-style landing page."
tags: [prototype, landing, 原型, template]
sample_image: packs/design-pack/assets/templates/prototype-web.svg
source: html-anything/prototype-web
---
## Design guidance

Output a complete, clickable product landing page that feels like it could ship tomorrow.

Sections, in order:
- Top nav — logo + nav links + CTA button.
- Hero — big headline + subhead + dual CTAs + a visual placeholder block.
- Features — 3 to 6 feature cards.
- How it works — numbered steps.
- Social proof — a logo wall or testimonials.
- Pricing — optional, usually three tiers.
- Footer.

Design details:
- Lean into modern SaaS trends: large type, soft gradients, glassmorphism cards, and on-scroll entrance animations (pure CSS is fine).
- Responsive: single column on mobile, multi-column on desktop. Handle at least the `md:` breakpoint.
- Add interaction: nav changes color on scroll, feature cards lift on hover, FAQ can expand as an accordion (use `<details>`).
- This is a high-fidelity prototype — it should look production-ready, not like a wireframe.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>NevoFlux — the browser where AI builds with you</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { margin:0; font-family:'Inter Tight','Noto Sans SC',sans-serif; background:#fafaf7; color:#15140f; -webkit-font-smoothing:antialiased; }
  .accent { color:#c96442; }
  .glass { background:rgba(255,255,255,0.7); backdrop-filter:blur(14px); border:1px solid rgba(21,20,15,0.06); }
  .grad-text { background:linear-gradient(120deg,#15140f 0%,#c96442 60%,#e9b94a 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .gradient-bg { background:radial-gradient(ellipse at 20% 0%, rgba(201,100,66,0.18), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(233,185,74,0.15), transparent 55%); }
  details summary::-webkit-details-marker { display:none; }
  details summary { cursor:pointer; list-style:none; }
  .card-rise { transition:transform 0.25s ease, box-shadow 0.25s ease; }
  .card-rise:hover { transform:translateY(-4px); box-shadow:0 30px 60px -30px rgba(21,20,15,0.2); }
</style>
</head>
<body>

<nav class="sticky top-0 z-30 glass">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="#" class="flex items-center gap-2.5 font-bold tracking-tight">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c96442] to-[#e9b94a] grid place-items-center text-white font-black">N</div>
      <span>NevoFlux</span>
    </a>
    <div class="hidden md:flex items-center gap-7 text-sm text-[#5a564e]">
      <a href="#features" class="hover:text-[#15140f]">Features</a>
      <a href="#how" class="hover:text-[#15140f]">How it works</a>
      <a href="#voices" class="hover:text-[#15140f]">Builders</a>
      <a href="#pricing" class="hover:text-[#15140f]">Pricing</a>
    </div>
    <div class="flex items-center gap-2">
      <a href="#" class="hidden sm:inline text-sm font-medium text-[#5a564e] hover:text-[#15140f] px-3 py-2">Sign in</a>
      <a href="#cta" class="text-sm font-semibold bg-[#15140f] text-white px-4 py-2 rounded-full hover:bg-[#2a2620] transition-colors">Download free →</a>
    </div>
  </div>
</nav>

<section class="gradient-bg pt-24 pb-32 px-6">
  <div class="max-w-5xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#e7e5e0] text-xs font-medium text-[#5a564e] mb-7">
      <span class="w-1.5 h-1.5 rounded-full bg-[#c96442]"></span>
      v1.0 · 800+ teams have built 12,000+ Canvas apps
    </div>
    <h1 class="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
      The browser where <span class="grad-text">AI</span><br class="md:hidden"/> builds <span class="italic font-bold" style="font-family:Georgia,serif">the 80%</span><br/>of the app you never wanted to wire up
    </h1>
    <p class="text-lg md:text-xl text-[#5a564e] max-w-2xl mx-auto leading-relaxed mb-10">
      Dashboards · internal tools · scrapers · data apps · personal sites —<br/>
      NevoFlux turns a prompt into a running Canvas app, grounded in your GBrain knowledge base.
    </p>
    <div class="flex items-center justify-center gap-3">
      <a href="#cta" class="inline-flex items-center gap-2 bg-[#c96442] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#b25737] transition-colors shadow-[0_14px_32px_-16px_rgba(201,100,66,0.85)]">
        Download free · no card needed →
      </a>
      <a href="#how" class="inline-flex items-center gap-2 bg-white border border-[#e7e5e0] font-medium text-[#15140f] px-6 py-3 rounded-full hover:border-[#15140f]/40 transition-colors">
        ▶ Watch the 90-sec demo
      </a>
    </div>
    <div class="mt-14 mx-auto max-w-3xl">
      <div class="rounded-2xl bg-white shadow-[0_50px_100px_-30px_rgba(21,20,15,0.25)] border border-[#e7e5e0] p-2">
        <div class="rounded-xl bg-[#15140f] aspect-video grid place-items-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-20" style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px); background-size:32px 32px;"></div>
          <div class="text-center relative z-10">
            <div class="text-7xl mb-3">▶</div>
            <div class="text-white/60 text-sm">Click to play · 90 seconds</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="features" class="py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">Features · Features</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">Not more features — a smoother flow.</h2>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">✦</div>
          <div class="text-lg font-bold mb-2">Agent build</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">Describe an app in one line; the NevoFlux agent ships a working Canvas app in seconds.</div>
        </div>
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">⌗</div>
          <div class="text-lg font-bold mb-2">GBrain memory</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">Every app is grounded in your GBrain knowledge base — notes, docs, and saved pages.</div>
        </div>
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">↗</div>
          <div class="text-lg font-bold mb-2">Packs & skills</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">Install design packs and skills, then reuse world-class templates across every Canvas.</div>
        </div>
      
        <div class="card-rise p-7 rounded-2xl bg-white border border-[#e7e5e0]">
          <div class="text-3xl mb-4 accent">◐</div>
          <div class="text-lg font-bold mb-2">Privacy first</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">The agent and SDK run locally first — your data never leaves your device.</div>
        </div>
      
    </div>
  </div>
</section>

<section id="how" class="py-24 px-6 bg-[#f4f1ec] border-y border-[#e7e5e0]">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-16">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">How it works · How it works</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">Three steps, ten seconds.</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      
        <div>
          <div class="text-5xl font-extrabold accent" style="font-family:Georgia,serif;font-style:italic">01</div>
          <div class="text-xl font-bold mt-2 mb-1.5">Describe it</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">Type a prompt, drop in a CSV, or point the agent at a page already in GBrain.</div>
        </div>
      
        <div>
          <div class="text-5xl font-extrabold accent" style="font-family:Georgia,serif;font-style:italic">02</div>
          <div class="text-xl font-bold mt-2 mb-1.5">Pick a pack</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">Choose from world-class design packs: dashboard / deck / card / report / landing.</div>
        </div>
      
        <div>
          <div class="text-5xl font-extrabold accent" style="font-family:Georgia,serif;font-style:italic">03</div>
          <div class="text-xl font-bold mt-2 mb-1.5">Hit ⌘+Enter</div>
          <div class="text-sm leading-relaxed text-[#5a564e]">The local agent runs, and seconds later a live Canvas app opens beside you.</div>
        </div>
      
    </div>
  </div>
</section>

<section id="voices" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">Builders · Voices</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">800+ small teams build here.</h2>
    </div>
    <div class="grid md:grid-cols-2 gap-5">
      <div class="p-7 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-2xl accent mb-3">"</div>
        <div class="text-lg font-medium leading-snug mb-5">No more wiring up a stack just to test an idea. One prompt and the Canvas app is live, grounded in our GBrain.</div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#c96442] to-[#e9b94a]"></div>
          <div><div class="font-semibold">Maya R.</div><div class="text-xs text-[#5a564e]">Founder · early-stage data startup</div></div>
        </div>
      </div>
      <div class="p-7 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-2xl accent mb-3">"</div>
        <div class="text-lg font-medium leading-snug mb-5">Our internal tools went from a two-week ticket to an afternoon. Agent builds the app, the SDK wires the data.</div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c3aa6] to-[#2348b8]"></div>
          <div><div class="font-semibold">Dev K.</div><div class="text-xs text-[#5a564e]">Eng lead · SaaS team</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="pricing" class="py-24 px-6 bg-[#f4f1ec] border-y border-[#e7e5e0]">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <div class="text-xs font-semibold tracking-[0.22em] uppercase text-[#c96442] mb-3">Pricing · Pricing</div>
      <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight">Affordable for small teams.</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-5">
      <div class="p-8 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-sm font-semibold text-[#5a564e] mb-2">Personal</div>
        <div class="text-5xl font-extrabold tracking-tight">$0</div>
        <div class="text-xs text-[#5a564e] mt-1 mb-6">Free forever</div>
        <ul class="space-y-2 text-sm text-[#262421] mb-6">
          <li>· 5 Canvas apps / mo</li><li>· Core design packs</li><li>· Local agent access</li>
        </ul>
        <button class="w-full py-2.5 rounded-full border border-[#15140f]/15 hover:border-[#15140f]/40 font-medium text-sm">Start</button>
      </div>
      <div class="p-8 rounded-2xl bg-[#15140f] text-white border border-[#15140f] ring-2 ring-[#c96442]/30 relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#c96442] text-white text-[10px] font-bold tracking-wider">POPULAR</div>
        <div class="text-sm font-semibold opacity-70 mb-2">Pro</div>
        <div class="text-5xl font-extrabold tracking-tight">$9<span class="text-base opacity-60 font-medium">/mo</span></div>
        <div class="text-xs opacity-60 mt-1 mb-6">Unlimited, team collaboration</div>
        <ul class="space-y-2 text-sm opacity-90 mb-6">
          <li>· Unlimited Canvas apps</li><li>· Team of 5 · shared GBrain</li><li>· Priority support</li>
        </ul>
        <button class="w-full py-2.5 rounded-full bg-[#c96442] hover:bg-[#b25737] font-semibold text-sm">Upgrade to Pro</button>
      </div>
      <div class="p-8 rounded-2xl bg-white border border-[#e7e5e0]">
        <div class="text-sm font-semibold text-[#5a564e] mb-2">Team</div>
        <div class="text-5xl font-extrabold tracking-tight">$24<span class="text-base text-[#5a564e] font-medium">/seat/mo</span></div>
        <div class="text-xs text-[#5a564e] mt-1 mb-6">Enterprise controls</div>
        <ul class="space-y-2 text-sm text-[#262421] mb-6">
          <li>· Unlimited seats</li><li>· SSO / audit logs</li><li>· Dedicated success manager</li>
        </ul>
        <button class="w-full py-2.5 rounded-full border border-[#15140f]/15 hover:border-[#15140f]/40 font-medium text-sm">Contact sales</button>
      </div>
    </div>
  </div>
</section>

<section id="cta" class="py-32 px-6 text-center">
  <h2 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">Build more, wire up less.</h2>
  <p class="text-lg text-[#5a564e] mb-8">Download free, no card needed, live in 90 seconds.</p>
  <a href="#" class="inline-flex items-center gap-2 bg-[#c96442] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#b25737] transition-colors shadow-[0_14px_32px_-16px_rgba(201,100,66,0.85)]">
    Get started now →
  </a>
</section>

<footer class="border-t border-[#e7e5e0] py-10 px-6">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#5a564e]">
    <div class="flex items-center gap-2.5">
      <div class="w-7 h-7 rounded-md bg-gradient-to-br from-[#c96442] to-[#e9b94a] grid place-items-center text-white text-xs font-black">N</div>
      <span class="font-semibold text-[#15140f]">NevoFlux</span>
      <span class="opacity-50">© 2026</span>
    </div>
    <div class="flex gap-5">
      <a href="#" class="hover:text-[#15140f]">Privacy</a>
      <a href="#" class="hover:text-[#15140f]">Terms</a>
      <a href="#" class="hover:text-[#15140f]">Contact</a>
    </div>
  </div>
</footer>

</body>
</html>
```

## Usage

- `nav` — brand mark, section anchors (Features / How it works / Builders / Pricing), and the primary download CTA.
- `hero` — eyebrow badge with a metric, big gradient headline, subhead, dual CTAs, and a video/visual placeholder block.
- `features` — four `card-rise` cards; swap the glyph, title, and one-line copy per capability.
- `how` — three numbered steps (Describe / Pick a pack / Run).
- `voices` — two testimonial cards; replace quote, gradient avatar, name, and role.
- `pricing` — three tiers (Personal / Pro / Team); edit price, cadence, and feature bullets. The middle tier carries the highlighted "POPULAR" ring.
- `cta` — closing headline + subhead + single button.
- `footer` — brand mark, copyright, and legal links.
- All imagery is CSS gradients or text glyphs, so the page stays self-contained with no external image URLs.
