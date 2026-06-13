---
name: design-curate
description: 向 design-pack 导入或扩展设计要求/规范/模板,并重建选择看板。当用户要"给 design-pack 新增/导入一个规范/要求/模板"、"把这份设计规范加进来"、"扩展 design-pack 的内容"时使用。写入 GBrain 的 packs/design-pack/ 命名空间,然后重新生成看板 artifact。
allowed-tools:
  - put_page
  - get_page
  - list_pages
  - file_upload
  - file_url
  - create_artifact
triggers:
  - 导入 design-pack
  - 扩展 design-pack
  - 新增设计规范
  - 加个模板
---

# design-curate — 导入/扩展内容并重建看板

把新的设计要求/规范/模板写进 GBrain 的 `packs/design-pack/` 命名空间,然后**重建选择看板**,
让新内容出现在看板里。看板是预生成的、零运行时查询,所以**每次导入都必须重建看板**。

> **工具名注意**:GBrain 工具经 `tool_search` + `tool_call_dynamic` 调用;`allowed-tools` 里的名字是
> gbrain 规范名,**精确名/schema 以 `tool_search` 为准**(可能以 `brain_*` 形式注册)。先确认再用。

## 1. 规整内容

每个条目要落成一个 GBrain 页,frontmatter 用 design-pack 统一 schema:
```markdown
---
slug: packs/design-pack/<requirements|specs|templates>/<kebab-id>
type: <requirement | spec | template>
title: <简短标题(看板直接显示)>
description: <一句话用途(看板直接显示)>
tags: [<...>]
sample_image: <file_url>      # 仅 template
---
<正文：requirement 条文 / spec 全文(token、do-don't)/ template 的 HTML 片段 + 用法>
```
- `slug` **必须**在 `packs/design-pack/` 下,且按类型分目录(`requirements/`、`specs/`、`templates/`)。
- `<kebab-id>` 用小写连字符。和用户确认 title/description/type/tags。

## 2. 写入 GBrain

1. 对每个条目调 `put_page`(markdown + 上面的 frontmatter)。`put_page` 会分块、嵌入、对账标签/链接。
2. **模板的样例图**:
   - 调 `file_upload` 把图片存为 GBrain 二进制文件(归在 `packs/design-pack/` 资产下)。
   - 用 `file_url` 取其引用,写回该模板页的 `sample_image`。
   - **不要**把 base64 图直接塞进页面正文——会污染 chunk/embedding,拉低检索质量。

## 3. 重建看板(关键)

参照仓库里的 `scripts/build-dashboard.mjs`(它是本步骤的**权威参考实现**):

1. `list_pages(prefix="packs/design-pack/")` 列出全部条目,逐个读 frontmatter(必要时 `get_page`)。
2. 抽出**轻量目录**:`{slug, type, title, description, tags, thumbnail?}`。正文**不进**看板。
3. 模板:经 `file_url` 取样例图 → **缩略图、base64 内联**(降采样,避免看板膨胀)。要求/规范无缩略图。
4. 生成自包含看板 HTML(目录按类型分组、复选选中、prompt 输入框、`agent.chat` 发送、`onStream` 进度;
   **无任何外链**),即 `build-dashboard.mjs` 产出的 `index.html` 形状。
5. 用新内容替换已安装的 `design-pack-board` 看板 artifact。

> **待验证(原地替换)**:如何就地更新已安装的 `design-pack-board` artifact(`create_artifact` 是否按 id
> upsert)尚未确认。**回退方案**:把目录(含缩略图)写到一个 GBrain 目录页或共享 storage,让看板启动时读它
> ——但这偏离「预生成/重建」模型,仅作兜底。优先用平台支持的就地更新;没有就新建并提示用户切换。

## 4. 报告与回退

- 逐条报告 `put_page`/`file_upload` 结果。
- **内容已入 GBrain 但看板重建失败** → 不算彻底失败:内容已可被 design-build 检索到;提示用户可重试重建。
- 图过大 → 重建时降采样为缩略图;原图仍留在 GBrain。
- 校验:写入后,确认每个新 slug 都在 `packs/design-pack/` 下、`type` 合法、模板有 `sample_image`。
