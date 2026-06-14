---
slug: packs/design-pack/requirements/responsive-baseline
type: requirement
title: 响应式基线 (Responsive Baseline)
title_en: "Responsive Baseline"
title_zh: "响应式基线"
description: 移动优先、流式排版、跨断点可用的响应式底线。
description_en: "Mobile-first, fluid, cross-breakpoint responsive baseline."
description_zh: "移动优先、流式排版、跨断点可用的响应式底线。"
tags: [responsive, mobile-first, layout, requirement]
---

# 响应式基线 (Responsive Baseline)

所有生成的界面**默认**移动优先，并在主流视口下可用、无横向滚动、无内容截断。

## 移动优先
- 基础样式面向窄屏；用 `min-width` 媒体查询**向上增强**，不要 `max-width` 层层覆盖。
- 默认单列；空间足够时再升列。

## 断点（建议）
- 手机：≤ **640px**
- 平板：641–**1024px**
- 桌面：> 1024px
断点服务于内容，不照搬具体设备宽度——在内容“撑不下/留白过大”处加断点。

## 流式排版
- 字号用 `clamp()` 做流式缩放，例如 `font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)`。
- 间距/容器用相对单位（`rem`、`%`、`min()/max()/clamp()`），避免硬编码像素宽度。
- 媒体（图片/视频）`max-width: 100%; height: auto;`，绝不溢出容器。

## 布局
- 优先 **Flexbox / Grid**；用 `gap` 而非 margin 拼间距。
- 支持时用**容器查询**（`@container`）让组件随容器而非视口自适应。
- 内容最大宽度受限（正文测量 60–75ch），大屏两侧留白而非无限拉伸。

## 触控
- 触控目标 ≥ 44×44px；悬停态必须有非悬停的等效可用路径（移动端无 hover）。

## 校验提示
在 360px、768px、1280px 三个宽度各看一遍：无横向滚动、无重叠、CTA 可点、文字不截断。
