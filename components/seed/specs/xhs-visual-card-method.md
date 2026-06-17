---
slug: packs/design-pack/specs/xhs-visual-card-method
type: spec
title: "小红书图文设计法 (XHS Visual Card Method)"
title_en: "XHS Visual Card — Method"
title_zh: "小红书图文设计法"
description: "How to direct a 小红书 knowledge carousel as editable HTML cards: judge the brief on four axes, lock one visual master (a shared :root block), confirm the cover first, then stamp the rest — with a save-worthiness QA checklist."
description_en: "Direct a 小红书 (RED) knowledge carousel as editable HTML cards: judge the brief on four axes, lock one visual master (a shared :root block), confirm the cover first, then stamp the remaining pages — plus a save-worthiness QA checklist. Export each card to PNG from the Canvas."
description_zh: "把一组小红书干货图文当作可编辑 HTML 卡片来'导演'：先做四维判断，锁一套视觉母版（共享的 :root 块），先出封面确认，再逐页盖章——附一份'收藏向'QA 清单。每页从 Canvas 导出 PNG 发布。"
tags: [xhs-card, social, carousel, method, 小红书图文, spec]
---

# 小红书图文设计法 / XHS Visual Card — Method

把一组**小红书干货图文**(6–8 页轮播)当作可编辑的 **HTML 卡片**来做,而不是让模型直出位图。
好处:一致性靠 **CSS 变量确定性强制**(不是反复叮嘱模型),每张卡**可改色、可改字、可微调**,
最后从画布**导出 PNG** 发布。配套模板见 `模板 · 小红书图文 / Templates · XHS Carousel`
([[xhs-cover]] / [[xhs-content]] / [[xhs-quote]] / [[xhs-compare]] / [[xhs-cta]])。

> 适用:知识/干货/教程/观点类**图文轮播**。不适用:单图海报、长图文、纯图片笔记。

## 1. 先做"总监判断"(四个维度)

不要拿到需求就排版。先沿四条轴判断,再决定**页数**和**每页职责**:

- **内容类型** — 教程 / 清单 / 观点 / 案例 / 测评 / 个人 IP。
- **传播目标** — 点击 / 收藏 / 评论 / 转化 / 涨粉。目标不同,封面钩子与结尾召唤不同。
- **读者情绪** — 想让对方"被戳中 / 好奇 / 被认同 / 想转发"中的哪一个?
- **信息密度** — 低(金句叙事)到高(步骤清单)。密度决定每页放几个块。

判断完,落成一张**页面清单**:封面 1 + 内容/对比若干 + 金句 0–1 + 结尾 1,共 6–8 页。

## 2. 锁"视觉母版"(共享 `:root` 块)

整组只锁**一次**风格,然后每一页**逐字照抄**同一段母版——这是"看起来像一套"的根本机制:

```css
:root{
  --w:1080px; --h:1440px;                 /* 画布锁定 · 小红书 3:4 */
  --paper:#FCFCFB; --ink:#1E1B16; --sub:#8A847A; --line:#EDEAE2;
  --accent:#15705C; --accent-soft:#E6F0EC; /* 唯一强调色 + 其浅底 */
  --mark:#FCE39A;                          /* 荧光笔(签名元素) */
  --pad:92px; --radius:28px;
  --sans:"PingFang SC","Microsoft YaHei",...; --serif:"Songti SC",...;
}
```

母版规则(改其一即破功):

- **画布 1080×1440(3:4)**,整页即卡片,导出 PNG 正好是发帖图。
- **单一强调色** `--accent`。需要第二种"颜色"时用它的浅底 `--accent-soft`,不引入新色。
- **每页只一处荧光笔** `--mark`,划在该页**唯一最关键**的短语上。
- **系统中文字体**(零外链):正文用 `--sans`;金句页换 `--serif` 做"刊物感"对比。
- 页脚统一带**账号名 + 页码**(`x / N`),让整组成立。

## 3. 排页(把职责映射到模板)

| 页型 | 模板 | 职责 |
|---|---|---|
| 封面 | [[xhs-cover]] | 一个钩子、做到极大、收藏提示 |
| 内容/步骤 | [[xhs-content]] | Notion 块式清单 + 一个提示块 |
| 金句 | [[xhs-quote]] | 一句衬线大字,被"截图转发" |
| 对比 | [[xhs-compare]] | ✕ 旧做法 / ✓ 新做法,右栏上浅底 |
| 结尾 | [[xhs-cta]] | 一个主行动(关注)+ 下一篇预告 |

编号只给**真有顺序**的内容(步骤/流程);无序就用普通圆点。

## 4. 先出 1 张"确认图",再批量

学传统视觉总监的**确认闸门**:先只做**封面**一张,和用户对齐 3–5 点
(强调色对不对、字够不够大、调性像不像)。明确通过后,才进入批量。
省的是"8 张全做完才发现方向错"的返工。

## 5. 批量其余页(逐字盖章)

确认后,把第 2 步那段 `:root` 母版**原样**复制进每一页,只改各页内部内容。
`design-build` 生成真实轮播时同理:**锁一次母版,跨页盖章**。

## 6. QA 自检清单(发布前逐条过)

- [ ] 封面三秒内能看懂"这篇讲什么、对我有什么用"。
- [ ] 封面标题在**手机上**足够大(满屏占比够、不费眼)。
- [ ] 每页**只有一个**重点;荧光笔只出现一次。
- [ ] 全组**只有一种强调色**,没有冒出第二种颜色。
- [ ] 6–8 页,页码连续,页脚账号名一致。
- [ ] 有**至少一页可被单独截图转发**(金句或一张干货页)。
- [ ] 不像 PPT、不像"AI 套图":留白、字阶、对齐都是有意为之。
- [ ] 文案是**人话**,具体优先于聪明;无错别字。
- [ ] 结尾**只要一个**主行动,并给出回来的具体理由。
- [ ] 封面与结尾**呼应**(同账号、同强调色,首尾成环)。

## 7. 导出与发布

每张卡是 1080×1440 整页。用 **NevoFlux Canvas 的"导出 PNG"**逐页导出
(得到精确 3:4 的图),按页码顺序上传到小红书即可。无需任何额外脚本或位图模型。
