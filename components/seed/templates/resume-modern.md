---
slug: packs/design-pack/templates/resume-modern
type: template
lang: en
category: resume
title: "NevoFlux Modern Resume"
title_zh: "极简简历"
description: "Minimal single-page A4 resume for print or PDF export, with a two-column layout and highlighted metrics."
tags: [resume, cv, 简历, template]
sample_image: packs/design-pack/assets/templates/resume-modern.svg
source: html-anything/resume-modern
---
## Design guidance

A clean, minimal single-page resume sized to A4 so it reads well on screen and exports cleanly to PDF or paper.

Layout:
- Container simulates an A4 page: `w-[210mm] min-h-[297mm] mx-auto` with roughly 16-20mm of inner padding.
- A large name at the top (`text-4xl`), with a single contact line below it (email / phone / city / GitHub / LinkedIn) separated by thin vertical dividers.
- Optional two-column body: a left column (~60%) for the main track (experience / projects / education) and a right column (~40%) for the secondary track (skills / languages / awards).
- Section headings use a small-caps style with a short accent bar above (`w-8 h-0.5`).
- Each experience entry shows company + role + date range (right-aligned), followed by 1-3 verb-led bullet points.

Design details:
- No flashy color: black / white / gray plus a single accent (deep blue or ink green).
- Numeric achievements are bolded in the accent color so results stand out at a glance.
- Includes `@media print` styles that hide unnecessary chrome (page shadow, paper background) while preserving color when printed.

## Template (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Quill Harbor · Resume</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { background:#e9e6df; font-family:'Inter','Noto Sans SC',sans-serif; color:#1a1a1a; padding:32px 0; -webkit-font-smoothing:antialiased; }
  .page { width:210mm; min-height:297mm; margin:0 auto; background:#fff; padding:18mm 16mm; box-shadow:0 30px 60px -20px rgba(0,0,0,0.18); }
  .accent { color:#1f4d8f; }
  .accent-bar { display:inline-block; width:24px; height:2px; background:#1f4d8f; vertical-align:middle; margin-right:10px; }
  .section h2 { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#1f4d8f; margin:0 0 14px; }
  .role { display:flex; justify-content:space-between; align-items:baseline; gap:12px; }
  .role .meta { font-size:11px; color:#6b6760; font-family:'Inter',sans-serif; white-space:nowrap; tabular-nums:auto; }
  ul.bullets { list-style:none; padding:0; margin:8px 0 16px; }
  ul.bullets li { position:relative; padding-left:14px; font-size:13px; line-height:1.65; color:#262421; margin-bottom:4px; }
  ul.bullets li::before { content:""; position:absolute; left:0; top:9px; width:5px; height:5px; background:#1f4d8f; border-radius:1px; }
  @media print { body { background:#fff; padding:0; } .page { box-shadow:none; } }
</style>
</head>
<body>
<div class="page">
  <header class="pb-7 mb-7" style="border-bottom:1px solid #e7e5e0">
    <h1 class="text-[42px] font-bold tracking-tight leading-none mb-3">Quill Harbor</h1>
    <div class="text-[12.5px] text-[#1f4d8f] font-medium tracking-wide mb-3">Senior Agent Experience Engineer · NevoFlux Browser</div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-[#5a564e]">
      <span>📍 Brooklyn, NY</span><span class="opacity-30">|</span>
      <span>✉ quill.harbor@nevoflux.com</span><span class="opacity-30">|</span>
      <span>github.com/quillharbor</span><span class="opacity-30">|</span>
      <span>linkedin.com/in/quillharbor</span>
    </div>
  </header>

  <section class="section mb-6">
    <h2><span class="accent-bar"></span>Profile</h2>
    <p class="text-[13.5px] leading-[1.75] text-[#262421]">8 years building agent-driven products; led the design-system rebuild of a 50M+ MAU app, now focused on shipping the NevoFlux browser, its GBrain knowledge base, and Canvas apps that turn local agents into everyday tools.</p>
  </section>

  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-8">
      <section class="section mb-7">
        <h2><span class="accent-bar"></span>Experience</h2>

        <div class="mb-5">
          <div class="role">
            <div><span class="font-semibold text-[14.5px]">NevoFlux</span> <span class="text-[#5a564e] text-[13px]">— Senior Agent Experience Engineer</span></div>
            <div class="meta">Jun 2023 - Present</div>
          </div>
          <ul class="bullets">
            <li>Designed and led the NevoFlux browser's Canvas apps surface (0 to 1); reached <span class="font-semibold accent">12k</span> DAU in 6 months with an internal NPS of <span class="font-semibold accent">68</span></li>
            <li>Rebuilt the GBrain retrieval pipeline so the agent answers from a live knowledge base with <span class="font-semibold accent">0</span> production regressions and <span class="font-semibold accent">3.2×</span> faster indexing</li>
            <li>Shipped the design-pack template library, adopted across <span class="font-semibold accent">7</span> internal teams, with <span class="font-semibold accent">80k+</span> monthly pack installs</li>
          </ul>
        </div>

        <div class="mb-5">
          <div class="role">
            <div><span class="font-semibold text-[14.5px]">Northwind Trading</span> <span class="text-[#5a564e] text-[13px]">— Product Engineer</span></div>
            <div class="meta">Jul 2020 - May 2023</div>
          </div>
          <ul class="bullets">
            <li>Led the migration of the internal ops console onto the NevoFlux agent SDK, cutting task time from <span class="font-semibold accent">18s</span> to <span class="font-semibold accent">2.4s</span></li>
            <li>Built a low-code Canvas app engine that served <span class="font-semibold accent">30+</span> back-office workflows and saved <span class="font-semibold accent">800+</span> person-days</li>
            <li>Drove the team's typed-SDK coverage from <span class="font-semibold accent">53% → 92%</span> while mentoring a squad of 4</li>
          </ul>
        </div>

        <div class="mb-2">
          <div class="role">
            <div><span class="font-semibold text-[14.5px]">Mira Labs</span> <span class="text-[#5a564e] text-[13px]">— Frontend Intern</span></div>
            <div class="meta">Jun 2019 - Sep 2019</div>
          </div>
          <ul class="bullets">
            <li>Migrated two core merchant screens onto an early Canvas-app prototype</li>
            <li>Wrote an internal note, "5 Smells of Agent UI Design," bookmarked 200+ times</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <h2><span class="accent-bar"></span>Open Projects</h2>
        <ul class="bullets">
          <li><span class="font-semibold">html-anything</span> <span class="text-[#5a564e]">(1.2k ★)</span> — turn any document into beautiful HTML with a local NevoFlux agent</li>
          <li><span class="font-semibold">gbrain-lite</span> <span class="text-[#5a564e]">(450 ★)</span> — a 9KB embeddable retrieval client, 1.7× faster lookups than the reference SDK</li>
        </ul>
      </section>
    </div>

    <div class="col-span-4">
      <section class="section mb-6">
        <h2><span class="accent-bar"></span>Education</h2>
        <div class="text-[13.5px] font-semibold mb-1">Cooper State University</div>
        <div class="text-[12px] text-[#5a564e]">Computer Science · BSc</div>
        <div class="text-[11.5px] text-[#5a564e] mt-1">2016 - 2020 · GPA 3.85 / 4.00</div>
      </section>

      <section class="section mb-6">
        <h2><span class="accent-bar"></span>Core Skills</h2>
        <div class="flex flex-wrap gap-1.5">
          <span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">TypeScript</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Agent SDK</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">GBrain</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Canvas Apps</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Node.js</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Retrieval</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Design System</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Performance</span><span class="px-2 py-0.5 rounded text-[11px]" style="background:#eef2f8; color:#1f4d8f">Collaboration</span>
        </div>
      </section>

      <section class="section mb-6">
        <h2><span class="accent-bar"></span>Languages</h2>
        <ul class="text-[12px] text-[#262421] space-y-1.5">
          <li class="flex justify-between"><span>English</span><span class="text-[#5a564e]">Native</span></li>
          <li class="flex justify-between"><span>Mandarin</span><span class="text-[#5a564e]">Professional</span></li>
          <li class="flex justify-between"><span>Japanese</span><span class="text-[#5a564e]">N3</span></li>
        </ul>
      </section>

      <section class="section">
        <h2><span class="accent-bar"></span>Interests</h2>
        <p class="text-[12px] text-[#262421] leading-[1.7]">Distance running (half-marathon 1:42) · photography · corner-café detective</p>
      </section>
    </div>
  </div>
</div>
</body>
</html>
```

## Usage

- `header` — large name, a one-line role/tagline in the accent color, and a single contact row (city / email / GitHub / LinkedIn) split by faint dividers.
- `Profile` — a 1-2 sentence summary; lead with years of experience and current focus.
- Left column (`col-span-8`) — the main track: `Experience` (one block per role with company, title, right-aligned date `meta`, and verb-led `bullets`) and `Open Projects`.
- Right column (`col-span-4`) — the secondary track: `Education`, `Core Skills` (accent chips), `Languages`, and `Interests`.
- Wrap standout numbers in `<span class="font-semibold accent">…</span>` so metrics pop in the accent color.
- Print: `@media print` drops the page shadow and paper background; the layout stays A4 and color is preserved for PDF export.
