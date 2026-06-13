---
slug: packs/design-pack/specs/color-system
type: spec
title: 配色系统 (Color System)
description: 语义化色彩 token、明暗双主题与对比规则。
tags: [color, tokens, theming, dark-mode, spec]
---

# 配色系统 (Color System)

用**语义 token**而非裸色值。组件只引用语义 token，主题切换只换 token 取值。

## 语义 token

| Token | 用途 | Light | Dark |
| --- | --- | --- | --- |
| `--bg` | 页面底色 | `#ffffff` | `#0b0d10` |
| `--surface` | 卡片/面板 | `#f7f8fa` | `#15181d` |
| `--surface-2` | 次级面板 | `#eef0f4` | `#1d2128` |
| `--text` | 主文字 | `#0b0d10` | `#f2f4f7` |
| `--text-muted` | 次要文字 | `#5b6470` | `#9aa4b2` |
| `--border` | 描边/分隔 | `#e3e6eb` | `#2a2f37` |
| `--primary` | 主操作/品牌 | `#3b5bff` | `#6f86ff` |
| `--primary-contrast` | 主色上的文字 | `#ffffff` | `#0b0d10` |
| `--success` | 成功 | `#1a7f5a` | `#46c79a` |
| `--warning` | 警示 | `#a66a00` | `#e2a23b` |
| `--danger` | 危险/错误 | `#c0392b` | `#ff6b5e` |

实现：`:root` 定义 light，`:root[data-theme="dark"]` 或 `@media (prefers-color-scheme: dark)` 覆盖。

```css
:root {
  --bg:#fff; --surface:#f7f8fa; --text:#0b0d10; --text-muted:#5b6470;
  --border:#e3e6eb; --primary:#3b5bff; --primary-contrast:#fff;
}
@media (prefers-color-scheme: dark) {
  :root { --bg:#0b0d10; --surface:#15181d; --text:#f2f4f7; --text-muted:#9aa4b2;
          --border:#2a2f37; --primary:#6f86ff; --primary-contrast:#0b0d10; }
}
```

## 规则
- **对比**：`--text`/`--bg` ≥ 4.5:1；`--primary-contrast`/`--primary` ≥ 4.5:1；`--border`/`--bg` ≥ 3:1（见 [[accessibility-baseline]]）。
- **状态色**不单独承载语义，配图标/文案。
- 主色克制：主要用于主 CTA 与强调，避免大面积铺满。
- 中性灰用同一色相梯度，保证层级统一。

## Do / Don't
- ✅ `color: var(--text)` ；❌ `color: #333` 散落各处。
- ✅ 暗色用降低明度 + 略降饱和；❌ 直接反相。
