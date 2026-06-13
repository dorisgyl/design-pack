---
slug: packs/design-pack/specs/typography-scale
type: spec
title: 字体排印 (Typography Scale)
description: 模块化字阶、行高、字重与可读性规则。
tags: [typography, type-scale, readability, spec]
---

# 字体排印 (Typography Scale)

## 字阶（模块比 1.25，基准 16px）

| Token | rem | px | 用途 |
| --- | --- | --- | --- |
| `--text-xs` | 0.64 | ~10 | 角标/法务 |
| `--text-sm` | 0.8 | ~13 | 辅助/标签 |
| `--text-base` | 1 | 16 | 正文 |
| `--text-lg` | 1.25 | 20 | 引导句 |
| `--text-xl` | 1.563 | 25 | 小标题 |
| `--text-2xl` | 1.953 | ~31 | 区块标题 |
| `--text-3xl` | 2.441 | ~39 | 页面标题 |
| `--text-4xl` | 3.052 | ~49 | Hero |

大号标题用流式：`font-size: clamp(2rem, 1.5rem + 2.5vw, 3.052rem)`。

## 行高
- 正文 **1.5–1.6**；标题 **1.1–1.25**；超大标题可至 1.05。
- 行高随字号增大而减小。

## 字重
- 正文 400；强调 500/600；标题 600/700。最多用 2–3 个字重。

## 可读性
- 正文测量 **60–75ch**（`max-width: 70ch`）。
- 字间距：大标题可轻微收紧 `letter-spacing: -0.01em`；全大写文字加宽 `0.04em`。
- 段距用 `margin` 或 `gap`，不靠空行。

## 字体栈（系统优先，零外链，见 [[responsive-baseline]]）
```css
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
             "PingFang SC", "Microsoft YaHei", sans-serif;
--font-mono: ui-monospace, "SF Mono", "Cascadia Code", Consolas, monospace;
```

## Do / Don't
- ✅ 用 token 化字阶；❌ 随手写 `font-size: 17px`。
- ✅ 限制字重数量；❌ 一页五六种字重。
