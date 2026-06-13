---
slug: packs/design-pack/specs/spacing-layout
type: spec
title: 间距与布局 (Spacing & Layout)
description: 4/8pt 间距梯度、圆角、阴影与栅格系统。
tags: [spacing, layout, grid, elevation, spec]
---

# 间距与布局 (Spacing & Layout)

## 间距梯度（4pt 基、8pt 节奏）

| Token | px | 典型用途 |
| --- | --- | --- |
| `--space-1` | 4 | 图标-文字间隙 |
| `--space-2` | 8 | 紧凑内边距 |
| `--space-3` | 12 | 控件内边距 |
| `--space-4` | 16 | 卡片内边距 |
| `--space-6` | 24 | 卡片间距 |
| `--space-8` | 32 | 区块内间距 |
| `--space-12` | 48 | 区块间距 |
| `--space-16` | 64 | 大区块/章节 |

间距只取梯度值，不用随意数字。优先用 `gap` 排布。

## 圆角
`--radius-sm: 6px` · `--radius-md: 10px` · `--radius-lg: 16px` · `--radius-full: 9999px`。同一组件家族保持一致圆角。

## 阴影 / 层级（克制）
```css
--shadow-sm: 0 1px 2px rgba(16,24,40,.06);
--shadow-md: 0 4px 12px rgba(16,24,40,.08);
--shadow-lg: 0 12px 32px rgba(16,24,40,.12);
```
用阴影表达悬浮层级（卡片→弹层→对话框递增），不要每个元素都加阴影。

## 栅格
- 12 列；列间距 `--space-6`（24px），移动端可降到 16px。
- 内容容器最大宽度：`--container: 1200px`（宽屏内容区），正文阅读区 ≤ 70ch（见 [[typography-scale]]）。
- 用 `display:grid; grid-template-columns: repeat(12, 1fr)` 或按需的 `auto-fit/minmax`。

```css
.grid { display:grid; gap:var(--space-6);
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
```

## 留白
- 区块上下留白 ≥ `--space-12`；相关元素近、无关元素远（邻近原则）。
- 宁可多留白，不要塞满。

## Do / Don't
- ✅ `padding: var(--space-4)`；❌ `padding: 15px`。
- ✅ `gap` 排布；❌ 连环 margin 拼缝。
