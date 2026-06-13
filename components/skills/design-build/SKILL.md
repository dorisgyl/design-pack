---
name: design-build
description: 用 design-pack 的设计要求/规范/模板生成界面。当收到以 [design-pack:build] 开头的看板消息,或用户在侧边栏要求"用 design-pack 的规范/模板做/生成一个 …(落地页/定价页/组件/HTML)"时使用。先从 GBrain 检索依据,再生成一个新的 Canvas 画布。
allowed-tools:
  - get_page
  - query
  - search
  - create_artifact
triggers:
  - design-pack:build
  - 用 design-pack
  - 设计规范生成
  - 按规范做个
---

# design-build — 检索设计依据并生成界面

把「design-pack 的设计依据(要求/规范/模板)」检索出来,结合用户需求,生成一个新的 Canvas 画布
(通常是 HTML)。看板和侧边栏共用本 skill。

> **工具名注意**:GBrain 工具经 `tool_search`(query: `brain` / 知识库)+ `tool_call_dynamic(name, args)` 调用;
> 上面 `allowed-tools` 里的 `get_page`/`query`/`search` 是 gbrain 规范名,**精确名与 schema 以 `tool_search` 为准**
> (它们可能以 `brain_*` 形式注册)。`create_artifact` 是 Canvas 建画布工具。先 `tool_search` 确认,再用。

## 输入有两种形态

**A. 看板消息**(结构化,以标记开头):
```
[design-pack:build]
selected:
- packs/design-pack/specs/color-system
- packs/design-pack/templates/landing-hero
prompt:
<用户输入>
```
解析 `selected:` 下的 slug 列表(可能为空)和 `prompt:` 之后的全部文本。

**B. 侧边栏自由文本**(无标记):如「用 design-pack 的配色规范做个 SaaS 首页」。
没有显式 slug,靠语义检索找依据。

## 检索(Guide Fetch)

统一流程,两种输入都走它:

1. **取选中项**:对每个 `selected` slug 调 `get_page`。
   - 某 slug 落空(未找到)→ 跳过它,继续;**不要**因单个缺失就中止。
2. **语义扩展**(总是执行):用用户 `prompt` 作查询调 `query`(混合向量+关键词,mode=balanced),
   限定 `packs/design-pack/` 命名空间,拉出与需求相关、但用户没显式勾选的要求/规范/模板。
   - `query` 返回空 → 回退 `search`(关键词全文)再试一次。
3. **汇总依据**:合并(1)(2),按类型归类:要求(硬约束)、规范(token/规则)、模板(可复用结构)。去重。
   - 若(1)(2)都空 → 明确告诉用户「未检索到 design-pack 依据,将仅按你的描述生成」,然后继续。

## 生成

把汇总到的依据当作**硬性设计系统**,结合用户需求,生成成品:

- 默认用 `create_artifact`(`content_type: "text/html"`)新建**独立画布**。
- **遵守要求类**(如 [[accessibility-baseline]]、[[responsive-baseline]]):对比度、焦点态、语义标签、移动优先、无外链(iframe 沙箱屏蔽 CDN/外部资源——所有 CSS/JS 内联)。
- **套用规范类**的 token(配色/字阶/间距)而不是随手取值。
- **复用模板类**的结构作为骨架,再按需求改写文案与细节。
- 生成的画布同样必须自包含、无外链、无内联事件处理器(用 `addEventListener`)。

## 报告

- `create_artifact` 返回后,向用户说明:用了哪些依据(列 slug)、生成了什么、画布已打开。
- **注意**:agent 回复结束 ≠ 画布创建成功。确认 `create_artifact` 实际成功再报「完成」;失败则如实报错。

## 边界与回退

- 检索工具不可用 / 名称不符 → 先 `tool_search` 重新确认名称;仍不可用则告知用户并降级为「仅按需求生成、未应用 design-pack 依据」。
- 用户只给 `prompt`、没勾选 → 正常,靠 `query`/`search` 找依据。
- 用户勾选了、但 `prompt` 很泛 → 可在生成前用一句话和用户确认目标产物(页面/组件/邮件等)。
