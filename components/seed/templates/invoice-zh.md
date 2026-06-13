---
slug: packs/design-pack/templates/invoice-zh
type: template
lang: zh
category: finance
title: "可打印发票"
title_en: "NevoFlux Printable Invoice"
description: "标准发票:寄件/收件 + 明细 + 税 + 总额 + 付款指引。"
tags: [invoice, bill, 发票, 模板]
sample_image: packs/design-pack/assets/templates/invoice.svg
source: html-anything/invoice
---
## 设计指导

一份可在 A4 上打印的单页发票,无论是在屏幕上查看还是打印输出,都应保持清晰易读。

布局:
- 页眉:发票号、开具日期、截止日期。
- 两个主体:左侧「寄件方」与右侧「收件方」并排。
- 明细表格:列包含描述、数量、单价、金额。
- 税额拆分与总额,右对齐。
- 底部的付款指引区域。

设计细节:
- 包含 `@media print` 打印样式,打印时会去掉阴影与边框并收紧页边距;颜色对比度保持不变。
- 暖纸色背景搭配白色发票纸面,标题与金额使用衬线显示字体,标签与数字数据使用等宽字体。
- 单一的深绿色强调色用于链接、折扣行与参考信息条。
- 应付总额位于反白(深色)胶囊中,使「应付金额」成为明确的视觉焦点。
- 数字单元格使用等宽数字,保证列对齐。

## 模板 (HTML)

```html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>发票 · NevoFlux · INV-2026-0142</title>
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
          <div class="brand-meta">智能体浏览器与 GBrain 知识平台 · 创立于 2024</div>
        </div>
      </div>
    </div>
    <div class="invoice-block">
      <div class="invoice-label">发票</div>
      <div class="invoice-num">INV-2026-0142</div>
      <div class="invoice-dates"><strong>开具</strong> 2026 年 5 月 14 日 · <strong>截止</strong> 2026 年 6 月 13 日</div>
    </div>
  </header>

  <section class="parties">
    <div class="party">
      <h4>寄件方</h4>
      <div class="name">脑流 (NevoFlux) 科技有限公司</div>
      <div class="lines">
        上海市黄浦区南京东路 221 号 4 层<br>
        中国 · 邮编 200001<br>
        税号 91310000XX1234567Y<br>
        <a href="mailto:billing@nevoflux.com">billing@nevoflux.com</a>
      </div>
    </div>
    <div class="party">
      <h4>收件方</h4>
      <div class="name">北风贸易有限公司</div>
      <div class="lines">
        收件人:奥卡福 · 财务总监<br>
        北京市朝阳区建国路 500 号 9 层<br>
        中国 · 邮编 100022<br>
        应付账款:<a href="mailto:ap@northwind.com">ap@northwind.com</a>
      </div>
    </div>
  </section>

  <div class="ref-strip">
    <div><div class="label">工作区</div><div class="value">北风生产工作区</div></div>
    <div><div class="label">采购单号</div><div class="value">NW-PO-2026-3387</div></div>
    <div><div class="label">付款条款</div><div class="value">月结 30 天 · 人民币</div></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>描述</th>
        <th class="num">数量</th>
        <th class="num">单价</th>
        <th class="num">金额</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="desc"><strong>NevoFlux 团队版 · 年度订阅</strong><small>最多 25 个 NevoFlux 浏览器席位,共享 GBrain 知识库与 Canvas 应用。</small></td>
        <td class="num">1</td>
        <td class="num">¥59,500.00</td>
        <td class="num">¥59,500.00</td>
      </tr>
      <tr>
        <td class="desc"><strong>GBrain 索引与检索</strong><small>托管接入 4 个数据语料、向量嵌入,并为智能体提供托管式向量检索。</small></td>
        <td class="num">1</td>
        <td class="num">¥154,000.00</td>
        <td class="num">¥154,000.00</td>
      </tr>
      <tr>
        <td class="desc"><strong>设计包与设计技能授权</strong><small>设计包模板库、设计技能,以及为工作区定制的品牌化 Canvas 应用主题。</small></td>
        <td class="num">1</td>
        <td class="num">¥45,500.00</td>
        <td class="num">¥45,500.00</td>
      </tr>
      <tr>
        <td class="desc"><strong>智能体 SDK 集成 · 超额</strong><small>4 月 12 日至 4 月 28 日期间,将智能体 SDK 接入北风内部工具的额外工程工时。</small></td>
        <td class="num">14</td>
        <td class="num">¥1,540.00</td>
        <td class="num">¥21,560.00</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="terms">
      <h5>付款条款</h5>
      款项应于发票开具后 30 天内付清。逾期付款将按 2026 年 2 月 14 日签署的主订阅协议每月加收 1.5% 的服务费。2026 年 3 月 12 日支付的 10% 预付款已在下方抵扣。
    </div>
    <div class="totals-block">
      <div class="total-row"><span>小计</span><span>¥280,560.00</span></div>
      <div class="total-row discount"><span>预付款抵扣 (10%)</span><span>−¥28,056.00</span></div>
      <div class="total-row tax"><span>增值税 (9%)</span><span>¥22,725.36</span></div>
      <div class="total-row subtotal"><span>税前净额</span><span>¥252,504.00</span></div>
      <div class="total-row grand"><span>应付总额</span><span>¥275,229.36</span></div>
    </div>
  </div>

  <div class="pay">
    <div>
      <h4>银行转账 (人民币)</h4>
      <div class="row"><span>开户行</span><span>招商银行上海分行</span></div>
      <div class="row"><span>开户名</span><span>脑流科技有限公司</span></div>
      <div class="row"><span>账号</span><span>9847-2210-3318</span></div>
      <div class="row"><span>联行号</span><span>308290000123</span></div>
      <div class="row"><span>备注</span><span>INV-2026-0142</span></div>
    </div>
    <div>
      <h4>在线支付</h4>
      <div class="row"><span>付款链接</span><span>nevoflux.com/p/inv-0142</span></div>
      <div class="row"><span>微信 / 支付宝</span><span>支持</span></div>
      <div class="row"><span>企业网银</span><span>可按需开通</span></div>
      <div class="row"><span>电子回单</span><span>自动发送至邮箱</span></div>
    </div>
  </div>

  <div class="signoff">
    <p>感谢北风的信任,很高兴用 NevoFlux 为贵团队赋能。</p>
    <div class="signature">
      <div class="scribble">薇 · 维加</div>
      <div class="name">薇·维加 · NevoFlux 创始人</div>
    </div>
  </div>
</div>
</body>
</html>
```

## 用法

- `brandbar`(页眉)—— 左侧为 NevoFlux 品牌标识与名称,右侧为发票号及开具/截止日期。
- `parties`(主体)—— 「寄件方」(开票主体)与「收件方」(客户);各含名称及地址/联系信息,应付账款邮箱为唯一的强调色链接。
- `ref-strip`(参考信息条)—— 三项速查信息(工作区、采购单号、付款条款),可按需替换标签与取值。
- `table`(明细表)—— 每行一个明细项;填写 `desc`(加粗标题 + 小字说明)以及数量、单价、金额数字单元格。
- `totals`(总额区)—— 左侧 `terms` 为付款条款;右侧 `totals-block` 列出小计、折扣、税额、净额,以及深色的应付总额胶囊。
- `pay`(付款区)—— 两列付款方式(银行转账信息与在线支付),取值保持等宽字体 `span`。
- `signoff`(落款)—— 一句简短致谢,加上签名手写体与签署人姓名。
