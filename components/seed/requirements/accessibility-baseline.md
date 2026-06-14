---
slug: packs/design-pack/requirements/accessibility-baseline
type: requirement
title: 无障碍基线 (Accessibility Baseline)
title_en: "Accessibility Baseline"
title_zh: "无障碍基线"
description: 任何界面默认必须满足的 WCAG 2.2 AA 无障碍底线。
description_en: "The default WCAG 2.2 AA accessibility floor every interface must meet."
description_zh: "任何界面默认必须满足的 WCAG 2.2 AA 无障碍底线。"
tags: [accessibility, a11y, wcag, requirement]
---

# 无障碍基线 (Accessibility Baseline)

所有生成的界面**默认**必须满足下列底线（对标 WCAG 2.2 AA）。除非用户明确豁免，否则视为硬性要求。

## 对比度
- 正文文字与背景对比 ≥ **4.5:1**。
- 大号文字（≥ 24px 常规 / ≥ 18.66px 粗体）与图标/UI 边界 ≥ **3:1**。
- 不要用纯色相区分状态（如只靠红/绿）；同时辅以图标或文案。

## 键盘与焦点
- 所有可交互元素必须**可 Tab 到达**且操作顺序符合阅读顺序。
- 焦点态必须**可见**：保留或自定义 `:focus-visible` 轮廓（≥ 2px，且与背景对比 ≥ 3:1）。绝不 `outline: none` 而不补替代样式。
- 不设置正数 `tabindex`；用 DOM 顺序表达焦点流。

## 语义结构
- 使用语义标签与地标：`header / nav / main / footer`、`button`（而非可点击 `div`）、`a` 用于导航。
- 标题层级单调递进（一个 `h1`，不跳级）。
- 表单控件均有关联 `label`；图标按钮带 `aria-label`。
- 有意义的图片有 `alt`；纯装饰图 `alt=""` 或 `aria-hidden`。

## 触控与动效
- 触控目标 ≥ **24×24px**（推荐 44×44px），间距充足。
- 尊重 `@media (prefers-reduced-motion: reduce)`：关闭非必要动画/视差。
- 不使用每秒闪烁 > 3 次的内容。

## 校验提示
生成后自检：键盘走查一遍、对比度抽查主色/正文、确认每个图标按钮有可访问名称。
