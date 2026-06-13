---
slug: packs/design-pack/templates/invoice
type: template
lang: en
category: finance
title: "NevoFlux Printable Invoice"
title_zh: "可打印发票"
description: "Standard A4 invoice: from/bill-to + line items + tax + totals + payment instructions."
tags: [invoice, bill, 发票, template]
sample_image: packs/design-pack/assets/templates/invoice.svg
source: html-anything/invoice
---
## Design guidance

A single-page, A4-printable invoice intended to read cleanly both on screen and when sent to a printer.

Layout:
- Header: invoice number, issue date, and due date.
- Two parties: a `From` block and a `Bill to` block side by side.
- Line items table with columns for description, quantity, rate, and amount.
- Tax breakdown plus totals, right-aligned.
- A payment instructions area at the bottom.

Design details:
- Includes `@media print` styles so the sheet drops its shadow and border and tightens its margins when printed; color contrast is preserved.
- Warm paper-toned background with a white invoice sheet, a serif display face for headings/figures, and a monospace face for labels and numeric data.
- A single deep-green accent appears on links, the discount row, and the reference strip.
- The grand total sits in an inverted (dark) pill so the amount due is the clear focal point.
- Numeric cells use tabular figures so columns align.

## Template (HTML)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Invoice · NevoFlux · INV-2026-0142</title>
<style>
  :root {
    --bg: #f3f1ec;
    --paper: #ffffff;
    --ink: #15140f;
    --muted: #6e6a5d;
    --line: #ddd6c4;
    --accent: #1f4d3a;
    --accent-soft: #e3ece8;
    --display: 'Iowan Old Style', 'Charter', Georgia, serif;
    --body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif;
    --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 14px; line-height: 1.55; }
  .sheet { max-width: 820px; margin: 32px auto; background: var(--paper); padding: 64px 72px; border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 24px 60px rgba(28,27,26,0.06); }

  header.brandbar { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: flex-start; padding-bottom: 28px; border-bottom: 2px solid var(--ink); }
  .brand { display: flex; align-items: center; gap: 14px; }
  .brand-mark { width: 44px; height: 44px; border-radius: 50%; background: var(--ink); color: var(--paper); display: inline-flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 22px; font-weight: 700; }
  .brand-name { font-family: var(--display); font-size: 22px; font-weight: 700; letter-spacing: -0.005em; }
  .brand-meta { font-size: 12.5px; color: var(--muted); margin-top: 2px; }
  .invoice-block { text-align: right; }
  .invoice-label { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); }
  .invoice-num { font-family: var(--display); font-size: 32px; letter-spacing: -0.01em; font-weight: 700; margin: 6px 0 4px; }
  .invoice-dates { font-size: 13px; color: var(--muted); }
  .invoice-dates strong { color: var(--ink); }

  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 28px 0; }
  .party h4 { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin: 0 0 8px; font-weight: 500; }
  .party .name { font-family: var(--display); font-size: 18px; font-weight: 700; margin-bottom: 4px; }
  .party .lines { font-size: 13.5px; color: var(--muted); line-height: 1.6; }
  .party .lines a { color: var(--accent); text-decoration: none; }

  .ref-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 16px 22px; background: var(--accent-soft); border-radius: 6px; margin-bottom: 32px; }
  .ref-strip .label { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 4px; font-weight: 500; }
  .ref-strip .value { font-size: 14px; }

  table { width: 100%; border-collapse: collapse; }
  thead th { text-align: left; padding: 10px 12px; border-bottom: 2px solid var(--ink); font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); font-weight: 500; }
  tbody td { padding: 14px 12px; border-bottom: 1px solid var(--line); vertical-align: top; }
  td.desc strong { display: block; font-weight: 600; margin-bottom: 4px; }
  td.desc small { display: block; color: var(--muted); font-size: 12.5px; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; font-family: var(--mono); font-size: 13.5px; }
  th.num { text-align: right; }

  .totals { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-top: 28px; align-items: flex-start; }
  .terms { font-size: 12.5px; color: var(--muted); padding: 18px 20px; background: var(--bg); border-radius: 6px; }
  .terms h5 { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin: 0 0 6px; font-weight: 500; }
  .totals-block { display: flex; flex-direction: column; gap: 8px; }
  .total-row { display: flex; justify-content: space-between; font-size: 14px; padding: 6px 0; }
  .total-row.subtotal { border-top: 1px solid var(--line); padding-top: 14px; }
  .total-row.discount { color: var(--accent); }
  .total-row.tax { color: var(--muted); }
  .total-row.grand { padding: 14px 18px; background: var(--ink); color: var(--paper); border-radius: 6px; margin-top: 6px; font-family: var(--display); font-size: 20px; font-weight: 700; align-items: center; }

  .pay { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 36px; padding: 22px; border: 1px solid var(--line); border-radius: 8px; }
  .pay h4 { font-family: var(--mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 0 0 10px; font-weight: 500; }
  .pay .row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
  .pay .row span { font-family: var(--mono); }

  .signoff { margin-top: 40px; display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: end; }
  .signoff p { margin: 0; font-family: var(--display); font-size: 16px; font-style: italic; color: var(--muted); }
  .signature { text-align: right; }
  .signature .scribble { font-family: 'Brush Script MT', 'Snell Roundhand', cursive; font-size: 28px; color: var(--accent); }
  .signature .name { font-size: 12.5px; color: var(--muted); padding-top: 6px; border-top: 1px solid var(--line); margin-top: 4px; }

  @media print {
    body { background: white; }
    .sheet { box-shadow: none; border: none; margin: 0; padding: 32px 36px; }
  }
  @media (max-width: 720px) {
    .sheet { padding: 32px 24px; margin: 0; border-radius: 0; }
    .parties, .pay, .signoff { grid-template-columns: 1fr; }
    .totals { grid-template-columns: 1fr; }
    .ref-strip { grid-template-columns: 1fr; }
    header.brandbar { grid-template-columns: 1fr; }
    .invoice-block { text-align: left; }
  }
</style>
</head>
<body>
<div class="sheet">
  <header class="brandbar">
    <div>
      <div class="brand">
        <div class="brand-mark">N</div>
        <div>
          <div class="brand-name">NevoFlux</div>
          <div class="brand-meta">The agentic browser &amp; GBrain platform · est. 2024</div>
        </div>
      </div>
    </div>
    <div class="invoice-block">
      <div class="invoice-label">Invoice</div>
      <div class="invoice-num">INV-2026-0142</div>
      <div class="invoice-dates"><strong>Issued</strong> 14 May 2026 · <strong>Due</strong> 13 June 2026</div>
    </div>
  </header>

  <section class="parties">
    <div class="party">
      <h4>From</h4>
      <div class="name">NevoFlux, Inc.</div>
      <div class="lines">
        221 Cooper Street, 4F<br>
        Brooklyn, NY 11211 · USA<br>
        EIN 87-1234567<br>
        <a href="mailto:billing@nevoflux.com">billing@nevoflux.com</a>
      </div>
    </div>
    <div class="party">
      <h4>Bill to</h4>
      <div class="name">Northwind Trading Co.</div>
      <div class="lines">
        Attn: Mira Okafor, CFO<br>
        500 Howard Street, Floor 9<br>
        San Francisco, CA 94103 · USA<br>
        AP: <a href="mailto:ap@northwind.com">ap@northwind.com</a>
      </div>
    </div>
  </section>

  <div class="ref-strip">
    <div><div class="label">Workspace</div><div class="value">Northwind production workspace</div></div>
    <div><div class="label">PO Number</div><div class="value">NW-PO-2026-3387</div></div>
    <div><div class="label">Terms</div><div class="value">Net 30 · USD</div></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th class="num">Qty</th>
        <th class="num">Rate</th>
        <th class="num">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="desc"><strong>NevoFlux Team plan · annual</strong><small>Up to 25 seats of the NevoFlux browser with shared GBrain knowledge bases and Canvas apps.</small></td>
        <td class="num">1</td>
        <td class="num">$8,500.00</td>
        <td class="num">$8,500.00</td>
      </tr>
      <tr>
        <td class="desc"><strong>GBrain indexing &amp; retrieval</strong><small>Managed ingestion of 4 source corpora, embeddings, and hosted vector retrieval for the agent.</small></td>
        <td class="num">1</td>
        <td class="num">$22,000.00</td>
        <td class="num">$22,000.00</td>
      </tr>
      <tr>
        <td class="desc"><strong>Design pack &amp; skills license</strong><small>Design-pack template library, design skills, and a branded Canvas app theme for the workspace.</small></td>
        <td class="num">1</td>
        <td class="num">$6,500.00</td>
        <td class="num">$6,500.00</td>
      </tr>
      <tr>
        <td class="desc"><strong>Agent SDK integration · overage</strong><small>Additional engineering hours wiring the agent SDK into Northwind's internal tools between 12 Apr and 28 Apr.</small></td>
        <td class="num">14</td>
        <td class="num">$220.00</td>
        <td class="num">$3,080.00</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="terms">
      <h5>Payment terms</h5>
      Payment is due within 30 days of issue. Late payments incur a 1.5% monthly service charge per the master subscription agreement signed 14 February 2026. The 10% retainer paid 12 March 2026 has been applied below.
    </div>
    <div class="totals-block">
      <div class="total-row"><span>Subtotal</span><span>$40,080.00</span></div>
      <div class="total-row discount"><span>Retainer applied (10%)</span><span>−$4,008.00</span></div>
      <div class="total-row tax"><span>Sales tax · NY (9%)</span><span>$3,246.48</span></div>
      <div class="total-row subtotal"><span>Net before tax</span><span>$36,072.00</span></div>
      <div class="total-row grand"><span>Total due</span><span>$39,318.48</span></div>
    </div>
  </div>

  <div class="pay">
    <div>
      <h4>Wire / ACH (USD)</h4>
      <div class="row"><span>Bank</span><span>Mercury Bank</span></div>
      <div class="row"><span>Routing (ACH)</span><span>084-001-122</span></div>
      <div class="row"><span>Routing (Wire)</span><span>026-073-150</span></div>
      <div class="row"><span>Account</span><span>9847-2210-3318</span></div>
      <div class="row"><span>Memo</span><span>INV-2026-0142</span></div>
    </div>
    <div>
      <h4>Online payment</h4>
      <div class="row"><span>Pay link</span><span>nevoflux.com/p/inv-0142</span></div>
      <div class="row"><span>Stripe / card / ACH</span><span>Yes</span></div>
      <div class="row"><span>Wise / SEPA / FX</span><span>On request</span></div>
      <div class="row"><span>Receipt</span><span>Auto-emailed</span></div>
    </div>
  </div>

  <div class="signoff">
    <p>Thank you, Northwind. We're glad to power your team on NevoFlux.</p>
    <div class="signature">
      <div class="scribble">Lila Vega</div>
      <div class="name">Lila Vega · Founder, NevoFlux</div>
    </div>
  </div>
</div>
</body>
</html>
```

## Usage

- `brandbar` — your NevoFlux brand mark and name on the left; the invoice number plus issue/due dates on the right.
- `parties` — `From` (your billing entity) and `Bill to` (the customer); each is a name plus address/contact lines, with the AP email as the one accent link.
- `ref-strip` — three quick references (workspace, PO number, terms); swap labels/values as needed.
- `table` — one row per line item; fill the `desc` (bold title + small detail), `Qty`, `Rate`, and `Amount` numeric cells.
- `totals` — left `terms` block holds payment terms; right `totals-block` lists subtotal, discount, tax, net, and the dark grand-total pill.
- `pay` — two payment columns (wire/ACH details and online payment); keep values in the monospace `span`.
- `signoff` — a short thank-you line plus a signature scribble and signer name.
