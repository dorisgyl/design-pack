# design-pack

[English](README.md) · [简体中文](README.zh-CN.md)

![design-pack — a design library inside your browser: pick, prompt, ship the UI](assets/poster.png)

**面向 [NevoFlux 浏览器](https://github.com/dorisgyl/nevoflux) 的设计知识库与 UI 生成器。**
它把一大套精选的现代设计要求、规范、模板和 Web 平台指南装进浏览器的 GBrain 知识库,
然后让你挑选所需内容、由 agent 据此生成成品、贴合品牌的界面——既可以在可视化看板里操作,
也可以直接在侧边栏对话里用。

## 你能得到什么

- **浏览器里一个可检索的设计库**,全部存于 GBrain,中英文都能搜:
  - **~80 个开箱即用的模板**——落地页、定价、Hero 与特性区块、演示/幻灯、社交卡片、仪表盘、
    海报、简历、文档、移动端界面、视频帧…… 每个都带真实预览图。
  - **一套论文图 / CS Paper Figure**——8 张可编辑的 **HTML/SVG** 图(矢量,非位图):分层的**架构图**、
    **方法流水线**、**方法框架**、**Agent 工作流**、**系统数据流**图、**机制**特写、**案例走查**,
    以及一张结果**证据板**——每张采用一种独立的版式语法,内置真实**可改色图标**,完全可手工编辑、中英双语。
    并配有一份 CS「框架图绘制方法」规范与可检索的图标库。
  - **一套小红书图文 / XHS Carousel**——5 种可编辑的 **HTML** 卡片页型(封面、内容、金句、对比、结尾),
    均为 1080×1440,共用一套**视觉母版**(一段 `:root` token 块),整组读起来像一条轮播。Notion 高级卡片风,
    完全可编辑、中英双语;发帖时从 Canvas **逐页导出 PNG**。并配有一份小红书「视觉总监」方法规范。
  - **137 篇现代 Web 平台指南**——无障碍、CSS、表单、性能、用户体验、View Transitions、
    锚点定位、通行密钥…… 给出具体模式、坑点与回退方案。
  - **13 套设计品味系统**——野兽派、极简、柔和/高端、品牌套件、反平庸的 "tasteskill",
    以及「图像转代码」「图像生成」等工作流。
  - **基线要求与规范**——无障碍(WCAG 2.2 AA)、响应式,以及一套配色 / 字阶 / 间距设计系统。
- **一个选择看板**(在 *My Canvas* 中打开):按类型与分类浏览全部内容,用粘性侧栏导航一键跳到任意分组,
  用类型 chips 或文字搜索过滤,切换 **EN / 中文**,并预览每个模板的真实缩略图。
- **一键生成**:勾选想用的要求 / 规范 / 模板 / 指南,写明要做什么,agent 就从 GBrain 取回完整设计依据,
  **生成一个新的 Canvas 应用(HTML)**,并遵循这些依据。
- **侧边栏里也能用**——直接对话即可(「用 design-pack 的配色规范做个 SaaS Hero」),同一个 skill 负责检索与生成。
- **完全可扩展**——把你自己的要求、规范或模板导入 GBrain,看板会自行重建。

## 你能实现什么目标

更快地交付**现代、无障碍、响应式、不显模板化**的界面:

- 把一句话的需求,变成已经遵循设计系统的真实落地页、定价页、演示、社交卡片或仪表盘。
- 生成的 UI 使用**当下的 Web 平台技术**(来自指南)而非过时写法,无障碍与响应式开箱即有。
- 一致地套用某个**美学方向**(极简、野兽派、高端……)。
- 为 CS 论文画一张**论文图**——架构、方法流水线、Agent 工作流、机制……——以**可编辑的矢量 HTML/SVG**
  呈现,可改色、可微调,而不是一张拍平的截图。
- 把一组**小红书图文**当作可编辑的 **HTML** 卡片来"导演"——挑封面 / 内容 / 金句 / 对比 / 结尾页型,
  全组锁住同一套视觉母版,再逐页导出 PNG——而不是向模型求一堆拍平的图。
- 维护一份不断增长、**中英双语、可团队共享**的设计记忆,agent 随时可取。

## 两个 skill

### `design-build`——检索 + 生成

取回你点名的设计依据,生成一个遵循它们的新 Canvas 应用(HTML)。

**从看板**(*My Canvas → design-pack*):勾选想用的要求 / 规范 / 模板 / 指南,写明要做什么,点**生成**。
看板会替你拼好消息。

**从侧边栏**——直接对话即可,不必打开看板。例如:

> 用 design-pack 的**配色规范** + **定价表**模板,做一个三档定价页,中间档高亮。

> Use design-pack's **color-system** spec and the **landing-hero** template to build a dark-theme
> SaaS analytics landing page. Emphasize "ten-minute onboarding".

> 按 design-pack 的**无障碍基线**和**响应式基线**,生成一个带内联校验的注册表单。

> 用 design-pack 里的 **brutalist(野兽派)**品味,做一个作品集 Hero。

agent 会从 GBrain 取回完整页面(你点名的 + 语义相关的指南),然后打开一个**新画布**呈现生成的 UI。
小贴士:直接用标题点名某个模板 / 规范 / 品味即可;不确定有什么就打开看板看看。

### `design-curate`——导入 + 扩展

把**你自己**的要求 / 规范 / 模板加进本 pack 的 GBrain 空间,并重建看板,让它们像内置内容一样可被选用。例如:

> 给 design-pack 加一个**规范**,叫 **acme-brand**:唯一强调色是 `#0EA5E9`,标题用 Geist,
> 间距基于 8pt,圆角 12px。

> 把这段 HTML 作为 design-pack **模板**导入(分类 card)并生成一张样例图:
> ```html
> <article class="quote-card">…</article>
> ```

> 给 design-pack 新增一个**要求**:所有交互元素必须有可见焦点态,文字对比度 ≥ 4.5:1。

写入页面(并上传样例图)后,看板会重建,你的新依据就会和内置内容并列出现——随后 `design-build` 即可使用。

## 安装

### 1. 先安装 NevoFlux 浏览器

- 下载:**https://nevoflux.app**
- 或取发布版:https://github.com/dorisgyl/nevoflux/releases

### 2. 在浏览器里安装本 pack

打开 **`nevoflux://settings` → Packs**,按仓库 URL
(`https://github.com/dorisgyl/design-pack`)或本地 `pack.toml` 安装。平台会**从 manifest 事务化处理
安装 / 更新 / 回滚**——无需手动跑脚本。

<details>
<summary>CLI 备选</summary>

在运行 NevoFlux 守护进程的机器上:

```bash
nevoflux pack validate pack.toml
nevoflux pack install pack.toml
```

</details>

## 开发 / 扩展

```bash
node scripts/import-guides.mjs      # (重新)导入 modern-web-guidance 指南
node scripts/import-taste.mjs       # (重新)导入 taste-skill 技能
node scripts/render-thumbs.mjs      # 渲染模板预览缩略图
node scripts/build-paper-templates.mjs  # 重建论文图 / CS Paper Figure 种子(中英双语)
node scripts/build-xhs-cards.mjs        # 重建小红书图文 / XHS Carousel 种子(中英双语)
node scripts/sync-pack-seeds.mjs    # 由 seed/** 同步 pack.toml 的 seed 列表
node scripts/build-dashboard.mjs    # 重建看板(dist/index.html)
node scripts/validate-pack.mjs      # 不变量校验
```

内部细节(内容模型、agent 侧检索流程、平台说明)见
`docs/superpowers/specs/2026-06-13-design-pack-design.md`。

## 致谢

design-pack 站在三个优秀工程的肩膀上,主要是把它们的成果做成了 NevoFlux 原生的适配与再托管:

- **[GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance)**——
  「语义检索 + Guide Fetch」的思路,以及构成本 pack 技术骨干的 **137 篇 Web 平台指南**。
- **[taste-skill](https://github.com/Leonxlnx/taste-skill)**——设计品味 / 反平庸的前端技能
  (野兽派、极简、柔和、tasteskill、品牌套件、图像生成……),为本 pack 注入了**美学方向**。
- **[html-anything](https://github.com/nexu-io/html-anything)**——成为本 pack 双语模板库的
  **~80 个模板技能**(`SKILL.md` + `example.html`)。

衷心感谢这些工程的作者。design-pack 通过 GBrain 检索并为 NevoFlux 本地化它们的内容,所有原创归功于这些项目。
