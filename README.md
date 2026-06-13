# design-pack

A pack for the **NevoFlux browser**: a bundle of modern design **requirements / specs /
templates** that live in GBrain, plus a selection **dashboard** and two skills that retrieve
those design bases and generate finished UI (HTML) from them.

Inspired by [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)'s
"semantic search + Guide Fetch" idea — but retrieval is done by GBrain's built-in `query`
(hybrid vector + keyword), so there's no bundled local index.

## How it works

```
看板(预生成,纯展示)                      agent 侧
┌─────────────────────────────┐          ┌──────────────────────────────────────┐
│ 勾选 要求/规范/模板 + 写 prompt │  agent.  │ design-build:                          │
│  → [design-pack:build] 消息   │  chat()  │  get_page(选中 slug) + query(语义扩展) │
└─────────────────────────────┘ ───────▶ │  → create_artifact() 新画布            │
                                          └──────────────────────────────────────┘
```

- **Canvas 不能直接调 GBrain**(MCP 工具不可直连)→ 检索与生成都在 agent 侧。
- **iframe 屏蔽外链** → 看板完全自包含,样例图 base64 内联。
- 内容存于 GBrain `packs/design-pack/...`,可通过 `design-curate` 持续扩展。

## Layout

```
pack.toml                                  # 清单(namespace=packs/design-pack)
components/
  skills/
    design-build/SKILL.md                  # 检索 + 生成(看板 & 侧边栏共用)
    design-curate/SKILL.md                 # 导入/扩展 + 重建看板
  seed/{requirements,specs,templates}/*.md # 原创设计内容(only-if-absent 种入 GBrain)
  seed/guides/<category>/*.md              # 从 modern-web-guidance 导入的 137 篇指南
  canvas-app/dist/index.html               # 预构建看板(由 build 脚本生成)
scripts/
  frontmatter.mjs                          # 极简 frontmatter 解析(无依赖)
  import-guides.mjs                        # 一次性:modern-web-guidance/guides → seed/guides/**
  sync-pack-seeds.mjs                      # 由 seed/** 重生成 pack.toml 的 [[components.seed]] 列表
  build-dashboard.mjs                      # seeds → dist/index.html(curate 重建步骤的参考实现)
  validate-pack.mjs                        # 不变量校验(本地校验门)
```

## 内容来源

- **原创设计内容(8 篇)**:无障碍/响应式基线、配色/字阶/间距规范、3 个 UI 模板。
- **导入指南(137 篇)**:从 [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)
  的 `guides/` 导入,归为 `type: spec`,按分类(accessibility / css / forms / performance /
  user-experience / …)放在 `packs/design-pack/guides/<分类>/`。看板里按「指南 · <分类>」分组,支持筛选。
  重新导入:`node scripts/import-guides.mjs [guides 目录]`。

## Content model

每个要求/规范/模板 = 一个 GBrain 页(markdown + frontmatter):
`slug` · `type`(requirement|spec|template) · `title` · `description` · `tags` ·
`sample_image`(仅模板)。看板只用轻量目录(标题/描述/缩略图);正文留在 GBrain,由 agent 检索。

## Develop

```bash
node scripts/import-guides.mjs      # (可选)重新导入 modern-web-guidance 指南
node scripts/sync-pack-seeds.mjs    # 增删 seed 后,同步 pack.toml 的 seed 列表
node scripts/build-dashboard.mjs    # 改了 seed 后重建看板
node scripts/validate-pack.mjs      # 校验不变量(Seed⊆Protected、frontmatter、看板自包含…)
```

## Install (在装有 NevoFlux 守护进程的机器上)

```bash
nevoflux pack validate pack.toml    # 平台级校验(本仓库环境未装 CLI)
nevoflux pack install pack.toml
```

沙箱试跑:指定 `XDG_CONFIG_HOME` 与 `NEVOFLUX_DATA_DIR` 到临时目录,做 validate → install → uninstall。

## 待验证(随平台落地确认)

1. `namespace` 是否允许带斜杠(`packs/design-pack`)—— 以 `nevoflux pack validate` 为准。
2. **重建看板如何原地替换**已安装的 `design-pack-board` artifact(`create_artifact` 是否按 id upsert);
   回退:看板读 GBrain 目录页/storage。见 `design-curate/SKILL.md`。
3. **GBrain 工具确切注册名 / `allowed-tools` 写法** —— 用 `tool_search` 核实(参见
   nevoflux `docs/reference/skills/brain/gbrain-tools.md`)。

参考:`docs/superpowers/specs/2026-06-13-design-pack-design.md`(设计)、
`docs/superpowers/plans/2026-06-13-design-pack.md`(实现计划)。
