// build-paper-templates.mjs — emit the 论文图 / Paper Figure template seeds (en + -zh) from the
// hand-authored figures in scripts/paper-figures/<id>.html.
//
// For each figure: writes components/seed/templates/<id>.md (lang:en) and <id>-zh.md (lang:zh,
// with figure labels translated via a per-figure term map). The HTML is embedded verbatim in a
// ```html fence so design-build / design-curate can lift it. category = paper-figure.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FIG = join(ROOT, 'scripts', 'paper-figures');
const OUT = join(ROOT, 'components', 'seed', 'templates');

const FIGS = [
  {
    id: 'paper-architecture', grammar: 'layer-stack',
    title_en: 'Paper Figure · Architecture (layer stack)', title_zh: '论文图 · 架构图（分层堆叠）',
    desc_en: 'A layered system-architecture figure: stacked labeled bands (Data ▸ Encode ▸ Core ▸ Output), each holding several module cards with icons, data flowing down through the stack.',
    desc_zh: '分层系统架构图：自上而下堆叠的带标签层（数据 ▸ 编码 ▸ 核心 ▸ 输出），每层放若干带图标的模块卡，数据沿层栈向下流动。',
    guide_en: 'Use the **layer_stack** grammar for an architecture figure — it must read differently from a linear pipeline. Each band is a layer (a left colour-tab + several module cards); inter-layer flow arrows run down the columns. One accent colour per layer (role = colour). Module glyphs are recolourable Tabler `currentColor` icons referenced from an inline `<symbol>` sprite. Replace the generic modules with your paper\'s actual layers, keeping `×N` markers for repeats rather than duplicating blocks.',
    guide_zh: '架构图用 **layer_stack（分层堆叠）** 语法——它必须和线性 pipeline 看起来不一样。每条带子是一层（左侧色标 + 若干模块卡）；层间流向箭头沿列向下。每层一种强调色（颜色=角色）。模块图标用内联 `<symbol>` 雪碧图里可重着色的 Tabler `currentColor` 图标。把通用模块换成论文真实的层，重复用 `×N` 标记而不是复制块。',
    zh: [
      ['System architecture — layered view (data ▸ output)', '系统架构 — 分层视图（数据 ▸ 输出）'],
      ['Tokenize · split', '分词 · 划分'], ['train / val / test', '训练 / 验证 / 测试'],
      ['Encoder ×N', '编码器 ×N'], ['stacked blocks', '堆叠块'],
      ['Experts (MoE)', '专家 (MoE)'], ['route · fuse', '路由 · 融合'],
      ['Task head', '任务头'], ['predict ŷ', '预测 ŷ'],
      ['corpus · signals', '语料 · 信号'], ['state · cache', '状态 · 缓存'], ['order signal', '顺序信号'],
      ['Dataset', '数据集'], ['Augment', '数据增广'], ['transform', '变换'],
      ['Embedding', '嵌入'], ['vectorize', '向量化'], ['Positional', '位置编码'],
      ['Attention', '注意力'], ['re-weight', '重加权'], ['Memory', '记忆'],
      ['Decoder', '解码器'], ['generate', '生成'], ['Loss ℒ', '损失 ℒ'], ['supervision', '监督'],
      ['>Data<', '>数据<'], ['>input<', '>输入<'], ['>Encode<', '>编码<'], ['>represent<', '>表征<'],
      ['>Core<', '>核心<'], ['>model<', '>模型<'], ['>Output<', '>输出<'], ['>heads<', '>输出头<'],
    ],
  },
  {
    id: 'paper-pipeline', grammar: 'block-pipeline',
    title_en: 'Paper Figure · Pipeline (block pipeline)', title_zh: '论文图 · 流水线（分块管线）',
    desc_en: 'A linear method pipeline: numbered stage cards left→right (Data → Preprocess → Features → Model → Evaluate → Report), data artifacts on the edges and a feedback loop.',
    desc_zh: '线性方法流水线：从左到右带编号的阶段卡（数据 → 预处理 → 特征 → 模型 → 评测 → 报告），数据产物标在连线上，并带反馈回路。',
    guide_en: 'Use the **block_pipeline** grammar: a single left→right row of numbered stage cards with the data artifact carried on each edge (`raw → clean → X → ŷ`). One focal stage gets the accent (here Model), evaluation is amber, and a dashed feedback loop shows tuning. Metrics live in a tag, not a box.',
    guide_zh: '用 **block_pipeline（分块管线）** 语法：单行从左到右、带编号的阶段卡，每条边带数据产物（`raw → clean → X → ŷ`）。一个焦点阶段用强调色（此处为 Model），评测用琥珀色，虚线反馈回路表示调参。指标放在标签里而非方框。',
    zh: [
      ['Method pipeline — raw data to evaluation', '方法流水线 — 从原始数据到评测'],
      ['clean · split', '清洗 · 划分'], ['train · fit', '训练 · 拟合'],
      ['tune / update', '调参 / 更新'],
      ['>Data<', '>数据<'], ['>corpus<', '>语料<'], ['Preprocess', '预处理'],
      ['Features', '特征'], ['>encode<', '>编码<'], ['>Model<', '>模型<'],
      ['Evaluate', '评测'], ['validate', '验证'], ['Report', '报告'], ['>results<', '>结果<'],
      ['>raw<', '>原始<'], ['>clean<', '>清洗<'],
    ],
  },
  {
    id: 'paper-method-framework', grammar: 'central-core',
    title_en: 'Paper Figure · Method framework (central core)', title_zh: '论文图 · 方法框架（中心枢纽）',
    desc_en: 'A method-overview figure: a dominant central hub (the proposed model) with satellite modules — inputs feeding in from the left, outputs emerging on the right, variables on the spokes.',
    desc_zh: '方法总览图：一个占主导地位的中心枢纽（所提模型）+ 卫星模块——输入从左侧汇入，输出从右侧引出，变量标在辐条上。',
    guide_en: 'Use the **central_core** grammar when the paper\'s message is "everything revolves around this core". A large hub node sits centre with satellites on a radial layout; spokes carry the variables. Inputs point inward, outputs point outward. The hub gets the strongest visual weight (filled + halo).',
    guide_zh: '当论文的主旨是"一切围绕这个核心"时用 **central_core（中心枢纽）** 语法。中央放一个大枢纽节点，卫星呈辐射布局；辐条承载变量。输入箭头朝内、输出朝外。枢纽视觉权重最强（实心 + 光晕）。',
    zh: [
      ['Method framework — central model (inputs ▸ core ▸ outputs)', '方法框架 — 中心模型（输入 ▸ 核心 ▸ 输出）'],
      ['Core method', '核心方法'], ['proposed model', '所提模型'],
      ['Input data', '输入数据'], ['corpus · signals', '语料 · 信号'],
      ['memory · context', '记忆 · 上下文'], ['task head', '任务头'],
      ['Encoder', '编码器'], ['represent', '表征'], ['Retrieval', '检索'],
      ['Decoder', '解码器'], ['generate', '生成'], ['Prediction', '预测'], ['Evaluation', '评测'], ['metrics', '指标'],
      ['>features<', '>特征<'], ['>context<', '>上下文<'], ['>logits<', '>logits<'], ['>score<', '>分数<'],
    ],
  },
  {
    id: 'paper-agent-workflow', grammar: 'swimlanes',
    title_en: 'Paper Figure · Agent workflow (swimlanes)', title_zh: '论文图 · 智能体工作流（泳道）',
    desc_en: 'An agent-workflow figure in swimlanes: User / Agent / Tool·Env role lanes with a ReAct-style zig-zag (Query → Plan → Tool call → Observe → Answer) and a dashed re-plan loop.',
    desc_zh: '泳道式智能体工作流：User / Agent / Tool·Env 三条角色泳道，ReAct 式折线流程（Query → Plan → 工具调用 → Observe → Answer）+ 虚线重规划回路。',
    guide_en: 'Use the **swimlanes** grammar for multi-role / multi-phase workflows: each lane is a role, steps flow left→right and cross lanes to show hand-offs. Variables ride the edges (`aₜ`, `oₜ`); the dashed loop is the ReAct think/re-plan cycle. Keep one canonical path.',
    guide_zh: '多角色 / 多阶段工作流用 **swimlanes（泳道）** 语法：每条泳道是一个角色，步骤从左到右并跨泳道以体现交接。变量走连线（`aₜ`、`oₜ`）；虚线回路是 ReAct 思考/重规划循环。保持单一主路径。',
    zh: [
      ['Agent workflow — swimlanes (ReAct loop)', '智能体工作流 — 泳道（ReAct 循环）'],
      ['Tool call', '工具调用'], ['retrieve · run', '检索 · 执行'],
      ['re-plan (think)', '重规划（思考）'], ['answer ŷ', '回答 ŷ'],
      ['>Query<', '>查询<'], ['>request<', '>请求<'], ['>Plan<', '>规划<'], ['decompose', '分解'],
      ['>Observe<', '>观察<'], ['>reason<', '>推理<'], ['>Answer<', '>回答<'], ['>deliver<', '>交付<'],
      ['>User<', '>用户<'], ['>human<', '>人类<'], ['>Agent<', '>智能体<'], ['>policy<', '>策略<'],
      ['Tool · Env', '工具 · 环境'], ['>actions<', '>动作<'], ['>task<', '>任务<'],
    ],
  },
  {
    id: 'paper-system-dataflow', grammar: 'graph-network',
    title_en: 'Paper Figure · System data flow (graph network)', title_zh: '论文图 · 系统数据流（图网络）',
    desc_en: 'A system / data-flow figure as a graph network: services and stores as nodes connected by typed edges (request, route, read/write, query, event) in a non-linear layout.',
    desc_zh: '以图网络呈现的系统/数据流图：服务与存储为节点，由带类型的边（request、route、读/写、query、event）以非线性布局连接。',
    guide_en: 'Use the **graph_network** grammar when topology matters more than sequence: nodes placed organically (not in a row), connected by typed, labelled edges. Colour by role (client / gateway / service / cache / store). Each edge label names what flows (request, event, query…).',
    guide_zh: '当拓扑比顺序更重要时用 **graph_network（图网络）** 语法：节点有机摆放（非一行），由带类型、带标签的边连接。按角色着色（客户端 / 网关 / 服务 / 缓存 / 存储）。每个边标签说明流动的内容（request、event、query…）。',
    zh: [
      ['System data flow — service graph (typed edges)', '系统数据流 — 服务图（带类型的边）'],
      ['API gateway', 'API 网关'], ['route · auth', '路由 · 鉴权'],
      ['read / write', '读 / 写'],
      ['Service A', '服务 A'], ['Service B', '服务 B'], ['>compute<', '>计算<'], ['>worker<', '>工作节点<'],
      ['>Client<', '>客户端<'], ['hot state', '热状态'], ['>Store<', '>存储<'], ['>database<', '>数据库<'],
      ['>Cache<', '>缓存<'], ['>request<', '>请求<'], ['>route<', '>路由<'], ['>query<', '>查询<'],
      ['>write<', '>写入<'], ['>event<', '>事件<'],
    ],
  },
  {
    id: 'paper-mechanism', grammar: 'zoom-callouts',
    title_en: 'Paper Figure · Mechanism (zoom callouts)', title_zh: '论文图 · 机制（放大标注）',
    desc_en: 'A mechanism-intuition figure: an overview strip of the whole model with one module highlighted and magnified into a detail inset that shows its internal mechanism.',
    desc_zh: '机制直觉图：上方一条整体模型的总览带，其中一个模块被高亮并放大为细节插图，展示其内部机制。',
    guide_en: 'Use the **zoom_callouts** grammar to explain *how one part works*: a compact overview on top, a dashed magnifier from the focal module to a large inset, and the mechanism (here scaled dot-product attention) wired out inside. Density can be higher than an overview figure — but still one symbol = one meaning.',
    guide_zh: '解释"某个部件如何工作"用 **zoom_callouts（放大标注）** 语法：上方紧凑总览，从焦点模块拉出虚线放大镜连到大插图，机制（此处为缩放点积注意力）在插图内部接线展开。密度可比总览图高——但仍要一符号一义。',
    zh: [
      ['Mechanism — zoom into one module (scaled dot-product attention)', '机制 — 放大某个模块（缩放点积注意力）'],
      ['Inside the attention block', '注意力块内部'],
      ['softmax → α', 'softmax → α'], ['>project<', '>投影<'], ['>weights<', '>权重<'],
      ['>values<', '>值<'], ['>context<', '>上下文<'],
      ['>Input<', '>输入<'], ['>Encoder<', '>编码器<'], ['>Attention<', '>注意力<'], ['>Output<', '>输出<'],
    ],
  },
  {
    id: 'paper-case-walkthrough', grammar: 'storyboard',
    title_en: 'Paper Figure · Case walkthrough (storyboard)', title_zh: '论文图 · 案例走查（分镜）',
    desc_en: 'A case-walkthrough figure as a storyboard: sequential panels following one example end to end (Input → Encode → Match → Predict), each with an icon scene and a caption.',
    desc_zh: '以分镜呈现的案例走查图：顺序面板跟随一个样例端到端（输入 → 编码 → 匹配 → 预测），每格含一个图标场景和一句说明。',
    guide_en: 'Use the **storyboard** grammar to walk one concrete example through the system: framed panels left→right, each a numbered step with a scene icon and a one-line caption, chevrons between. Great for qualitative / case-study figures.',
    guide_zh: '用 **storyboard（分镜）** 语法把一个具体样例走查一遍：从左到右的带框面板，每格是一个带编号的步骤、一个场景图标、一句说明，面板间用箭头连接。适合定性 / 案例研究类配图。',
    zh: [
      ['Case walkthrough — one example, end to end', '案例走查 — 一个样例，端到端'],
      ['A query example <span class="mvar">x</span> enters — e.g. “classify this report”.', '一个查询样例 <span class="mvar">x</span> 进入 —— 例如"分类这份报告"。'],
      ['The encoder maps it to features <span class="mvar">h</span> = f(<span class="mvar">x</span>).', '编码器将其映射为特征 <span class="mvar">h</span> = f(<span class="mvar">x</span>)。'],
      ['Retrieve &amp; compare <span class="mvar">h</span> against memory / candidates.', '将 <span class="mvar">h</span> 与记忆 / 候选检索并比较。'],
      ['Output <span class="mvar">ŷ</span> with a calibrated confidence score.', '输出 <span class="mvar">ŷ</span> 及校准后的置信分数。'],
      ['>Input<', '>输入<'], ['>Encode<', '>编码<'], ['>Match<', '>匹配<'], ['>Predict<', '>预测<'],
    ],
  },
  {
    id: 'paper-evidence-board', grammar: 'matrix-map',
    title_en: 'Paper Figure · Evidence board (matrix map)', title_zh: '论文图 · 证据板（矩阵表）',
    desc_en: 'An evidence-board figure as a matrix: methods (rows) × benchmarks (columns) with scores, best-per-column stars, and the proposed method\'s row highlighted.',
    desc_zh: '以矩阵呈现的证据板图：方法（行）× 基准（列）的分数表，逐列最优加星标，所提方法行高亮。',
    guide_en: 'Use the **matrix_map** grammar for comparison / ablation evidence: a clean rows × columns table, one accent row for "Ours", best-per-column marked. Keep numbers tabular and the legend explicit (↑ higher is better, ★ best). Scores here are placeholders.',
    guide_zh: '对比 / 消融证据用 **matrix_map（矩阵表）** 语法：干净的行 × 列表格，"Ours" 行用强调色，逐列最优加标记。数字对齐，图例写清（↑ 越高越好，★ 最优）。此处分数为占位示例。',
    zh: [
      ['Evidence board — methods × benchmarks', '证据板 — 方法 × 基准'],
      ['Prior work A', '已有工作 A'], ['Prior SOTA', '此前 SOTA'],
      ['scores are illustrative placeholders', '分数为示意占位'],
      ['best per column', '逐列最优'], ['higher is better', '越高越好'],
      ['>Method<', '>方法<'], ['>Baseline<', '>基线<'], ['>Ours<', '>本文<'],
    ],
  },
];

function fm(obj) {
  return ['---', ...Object.entries(obj).map(([k, v]) => `${k}: ${v}`), '---', ''].join('\n');
}

function applyZh(html, pairs) {
  let out = html.replace('<html lang="en">', '<html lang="zh">');
  for (const [en, zh] of pairs) out = out.split(en).join(zh);
  return out;
}

let n = 0;
for (const f of FIGS) {
  const html = readFileSync(join(FIG, f.id + '.html'), 'utf8');
  const tags = `[paper-figure, diagram, ${f.grammar}, svg, 论文图, template]`;

  const enFront = fm({
    slug: `packs/design-pack/templates/${f.id}`,
    type: 'template', lang: 'en', category: 'paper-figure',
    title: `"${f.title_en}"`, title_zh: `"${f.title_zh}"`,
    description: `"${f.desc_en}"`, description_zh: `"${f.desc_zh}"`,
    tags, sample_image: `packs/design-pack/assets/templates/${f.id}.png`,
    source: `design-pack/${f.id}`,
  });
  const enBody = `## Design guidance\n\n${f.guide_en}\n\n## Template (HTML)\n\n\`\`\`html\n${html}\n\`\`\`\n`;
  writeFileSync(join(OUT, f.id + '.md'), enFront + enBody, 'utf8');

  const zhFront = fm({
    slug: `packs/design-pack/templates/${f.id}-zh`,
    type: 'template', lang: 'zh', category: 'paper-figure',
    title: `"${f.title_zh}"`, title_zh: `"${f.title_zh}"`,
    description: `"${f.desc_zh}"`,
    tags, sample_image: `packs/design-pack/assets/templates/${f.id}.png`,
    source: `design-pack/${f.id}`,
  });
  const zhHtml = applyZh(html, f.zh);
  const zhBody = `## 设计说明\n\n${f.guide_zh}\n\n## 模板（HTML）\n\n\`\`\`html\n${zhHtml}\n\`\`\`\n`;
  writeFileSync(join(OUT, f.id + '-zh.md'), zhFront + zhBody, 'utf8');
  n += 2;
}
console.log(`wrote ${n} paper-figure template seeds → components/seed/templates/`);
