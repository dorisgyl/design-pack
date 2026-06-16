// build-icon-library.mjs — import a curated, recolorable SVG icon library for CS paper figures.
//
// One-time asset import (like import-guides.mjs). Reads the MIT-0 vector library shipped by
// paper-framework-figure-studio-pro, selects a curated set of concept primitives, and emits
// bilingual GBrain reference pages under components/seed/icons/<domain>.md. Each page lists,
// per concept: concept_id, EN/中文 meaning, recommended use, connector ports, and the inline
// <svg> (verbatim, comments stripped). These pages are retrieval-only (dashboard:false) so
// `design-build` can pull real primitives instead of regenerating glyphs.
//
// Source library is OUTSIDE the repo; the generated pages (with inlined SVGs) are the
// committed, self-contained artifact. Override the source path with PFFS_LIB.
//
// License: source skill is MIT No Attribution (© 2026 OpenAI); upstream Tabler (MIT) /
// Lucide (ISC) icons keep their notice via the per-icon `source` data attribute.
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'components', 'seed', 'icons');
const LIB = (process.env.PFFS_LIB || 'C:/Users/Docker/Downloads/paper-framework-figure-studio-pro-v3.2.15b-skill/assets/vector-library/iclr_reference_library').replace(/\\/g, '/');

const CARD_DIRS = ['icon_cards', 'neural_network_ppt_primitives/cards', 'paper_derived_icon_cards'];

// ---- build a stem -> card-file index across the three card collections -------------------
const index = new Map();
for (const d of CARD_DIRS) {
  const abs = join(LIB, d);
  if (!existsSync(abs)) continue;
  for (const name of readdirSync(abs)) {
    if (!name.endsWith('.json')) continue;
    const stem = name.slice(0, -5);
    if (!index.has(stem)) index.set(stem, join(abs, name));
  }
}

function resolveCard(token) {
  let best = null;
  for (const stem of index.keys()) {
    if (stem === token || stem.startsWith(token + '.')) {
      if (!best || stem.length < best.length) best = stem;
    }
  }
  if (!best) return null;
  const card = JSON.parse(readFileSync(index.get(best), 'utf8'));
  return { stem: best, card };
}

function loadSvg(card) {
  const f = card.files || {};
  const rel = f.tight_svg || f.ppt_safe_svg || f.raw_svg || f.semantic_cut_svg;
  if (!rel) return null;
  const abs = join(LIB, rel);
  if (!existsSync(abs)) return null;
  let s = readFileSync(abs, 'utf8');
  s = s.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  s = s.replace(/<svg([^>]*?)>/, (m, attrs) => {
    attrs = attrs.replace(/\s(width|height)="[^"]*"/g, '');
    return `<svg${attrs} width="40" height="40">`;
  });
  s = s.replace(/>\s+</g, '><').replace(/[ \t]{2,}/g, ' ').replace(/\n/g, '');
  return s;
}

function portStr(card) {
  const p = card.ports;
  if (!p) return 'in (0,0.5) · out (1,0.5)';
  const fmt = (a) => (Array.isArray(a) ? `(${a[0]},${a[1]})` : '');
  const bits = [];
  if (p.input) bits.push('in ' + fmt(p.input));
  if (p.output) bits.push('out ' + fmt(p.output));
  if (p.control) bits.push('ctrl ' + fmt(p.control));
  if (p.feedback) bits.push('fb ' + fmt(p.feedback));
  return bits.join(' · ') || 'in (0,0.5) · out (1,0.5)';
}

// ---- curated selection: domain -> [conceptToken, 中文 gloss] -----------------------------
const DOMAINS = [
  {
    slug: 'data-input', title_en: 'Data & input', title_zh: '数据与输入',
    desc_en: 'Datasets, tokens, sequences, tables, modalities, and input/query primitives.',
    desc_zh: '数据集、词元、序列、表格、模态以及输入/查询等基元。',
    icons: [
      ['data.dataset.database', '数据集 / 语料库'], ['data.token', '词元 token'],
      ['data.sequence', '序列'], ['data.graph', '图数据'], ['data.table', '表格数据'],
      ['data.split', '数据划分 (train/val/test)'], ['data.augment', '数据增广'],
      ['data.multimodal', '多模态数据'], ['data.vector.store', '向量库 / 嵌入索引'],
      ['data.loader', '数据加载管线'], ['data.label', '标注 / 标签'],
      ['input.prompt', '提示 prompt'], ['input.query', '查询 query'],
      ['input.observation', '观测 observation'], ['modality.text', '文本模态'],
      ['modality.image', '图像模态'], ['modality.audio', '音频模态'], ['modality.video', '视频模态'],
    ],
  },
  {
    slug: 'model-blocks', title_en: 'Model blocks', title_zh: '模型模块',
    desc_en: 'Encoders, decoders, attention, MoE, adapters, latent spaces, and core NN blocks.',
    desc_zh: '编码器、解码器、注意力、MoE、适配器、隐空间等核心神经网络模块。',
    icons: [
      ['model.embedding', '嵌入 embedding'], ['model.attention', '注意力'],
      ['model.transformer.encoder', 'Transformer 编码器'], ['model.transformer.decoder', 'Transformer 解码器'],
      ['model.layers.stack', '层堆叠 (×N)'], ['model.module.block', '通用模块块'],
      ['model.moe', '混合专家 MoE'], ['model.router', '路由器 router'], ['model.gate', '门控 gate'],
      ['model.adapter', '适配器 / LoRA'], ['model.latent.space', '隐空间 / 表征'],
      ['model.memory.bank', '记忆库 / KV 缓存'], ['model.generator', '生成器'],
      ['model.neural.brain', '神经网络主干'],
      ['paper.derived.architecture.encoder.decoder', '编码器-解码器架构'],
      ['paper.derived.architecture.transformer.block', 'Transformer 块'],
      ['paper.derived.architecture.unet.skip', 'U-Net 跳连'],
      ['paper.derived.architecture.diffusion.chain', '扩散去噪链'],
      ['paper.derived.architecture.mamba.scan', 'Mamba / SSM 选择扫描'],
      ['paper.derived.architecture.autoencoder.bottleneck', '自编码器瓶颈'],
      ['ai.attention.block.causal.mask', '因果掩码注意力'],
    ],
  },
  {
    slug: 'agent-retrieval', title_en: 'Agents & retrieval', title_zh: '智能体与检索',
    desc_en: 'Agent loops, planners, tools, memory, multi-agent, RAG, rerankers, and context.',
    desc_zh: '智能体循环、规划器、工具、记忆、多智能体、RAG、重排与上下文。',
    icons: [
      ['ai.agent.planner.executor.loop', '规划-执行循环'], ['ai.agent.tool.router', '工具路由'],
      ['ai.agent.memory.read.write', '记忆读写'], ['ai.agent.react.trace', 'ReAct 推理轨迹'],
      ['ai.agent.multi.role.swarm', '多角色协作'], ['ai.agent.critic.reflection.loop', '批评-反思循环'],
      ['ai.agent.guardrail.gateway', '安全护栏网关'],
      ['paper.derived.architecture.agent.loop', '智能体闭环'],
      ['paper.derived.architecture.tool.call', '工具调用'],
      ['paper.derived.architecture.multi.agent', '多智能体'],
      ['retrieval.search', '检索 / 搜索'], ['retrieval.context', '检索上下文'],
      ['retrieval.rerank', '重排'], ['model.retriever', '检索器'], ['model.reranker', '重排器'],
      ['paper.derived.architecture.rag.flow', 'RAG 检索增强流程'],
      ['paper.derived.architecture.rag.chunk.index', '文档分块索引'],
      ['paper.derived.architecture.kv.cache', 'KV 缓存'],
      ['paper.derived.architecture.context.window', '上下文窗口装配'],
    ],
  },
  {
    slug: 'eval-output', title_en: 'Evaluation & output', title_zh: '评测与输出',
    desc_en: 'Metrics, benchmarks, ablations, curves, heads, and qualitative/output panels.',
    desc_zh: '指标、基准、消融、曲线、输出头以及定性/输出面板。',
    icons: [
      ['evaluation.metric', '评测指标'], ['evaluation.benchmark', '基准 benchmark'],
      ['evaluation.ablation', '消融实验'], ['evaluation.human', '人工评测'],
      ['evaluation.leaderboard', '排行榜'], ['evaluation.qualitative', '定性样例'],
      ['evaluation.baseline', '基线对比'],
      ['ai.curve.train.val.loss', '训练/验证损失曲线'], ['ai.curve.pareto.tradeoff', 'Pareto 权衡曲线'],
      ['ai.curve.scaling.law', '缩放律曲线'], ['ai.curve.accuracy.metric', '精度曲线'],
      ['ai.plot.roc.curve', 'ROC 曲线'], ['ai.plot.pr.curve', 'PR 曲线'],
      ['nn.eval.ablation.grid', '消融网格'], ['nn.eval.before.after.examples', '前后对比样例'],
      ['nn.eval.failure.case.grid', '失败案例网格'], ['nn.eval.confidence.calibration', '置信度校准'],
      ['output.prediction', '预测输出'], ['output.answer', '答案输出'], ['output.report', '结果报告'],
      ['paper.derived.architecture.classifier.head', '分类头'],
      ['paper.derived.architecture.loss.head', '损失/监督头'],
      ['paper.derived.architecture.projection.head', '投影头'],
    ],
  },
  {
    slug: 'graph-vision', title_en: 'Graphs & 3D / vision', title_zh: '图与三维/视觉',
    desc_en: 'Graph topologies, GNNs, knowledge/causal graphs, 3D scenes, NeRF, splatting, BEV.',
    desc_zh: '图拓扑、GNN、知识/因果图、三维场景、NeRF、高斯泼溅、BEV。',
    icons: [
      ['graph.node', '图节点'], ['graph.edge', '图边'], ['graph.dag', '有向无环图 DAG'],
      ['graph.hierarchy', '层次结构'], ['graph.nodes.edges', '节点-边图'],
      ['paper.derived.architecture.gnn.message.passing', 'GNN 消息传递'],
      ['paper.derived.architecture.knowledge.graph', '知识图谱'],
      ['paper.derived.architecture.causal.graph', '因果图'],
      ['paper.derived.architecture.scene.graph.3d', '三维场景图'],
      ['paper.derived.architecture.molecule.graph', '分子图'],
      ['paper.derived.architecture.hypergraph', '超图'],
      ['paper.derived.architecture.nerf.rays', 'NeRF 射线场'],
      ['paper.derived.architecture.gaussian.splatting', '3D 高斯泼溅'],
      ['paper.derived.architecture.bev.perception', 'BEV 鸟瞰感知'],
      ['paper.derived.architecture.camera.frustum', '相机视锥'],
      ['paper.derived.architecture.point.voxel.fusion', '点-体素融合'],
      ['ai.vision.vit.patch.encoder', 'ViT 图块编码'],
    ],
  },
  {
    slug: 'system-flow', title_en: 'System & flow', title_zh: '系统与流转',
    desc_en: 'Servers, clients, services, security/privacy, connectors, and system topologies.',
    desc_zh: '服务器、客户端、服务、安全/隐私、连接器与系统拓扑。',
    icons: [
      ['system.server', '服务器'], ['system.client', '客户端'], ['system.api', 'API 接口'],
      ['system.cloud', '云'], ['system.cluster', '集群'], ['system.queue', '队列'],
      ['system.router', '系统路由'], ['system.monitor', '监控'],
      ['system.security.shield', '安全 / 防护'], ['system.privacy.lock', '隐私 / 加密'],
      ['system.container', '容器'], ['system.users', '用户 / 多方'],
      ['system.pipeline.service', '服务管线'], ['system.edge.device', '边缘设备'],
      ['ppt.connector.curved.arrow', '曲线连接箭头'],
      ['paper.derived.architecture.dual.tower', '双塔架构'],
      ['paper.derived.architecture.server.client.round', '服务端-客户端轮次'],
      ['paper.derived.architecture.fl.aggregation', '联邦聚合'],
      ['paper.derived.architecture.human.ai.loop', '人机协作闭环'],
    ],
  },
];

function frontmatter(d) {
  return [
    '---',
    `slug: packs/design-pack/icons/${d.slug}`,
    'type: spec',
    'collection: icons',
    'dashboard: false',
    `title: "Paper-figure icons — ${d.title_en}"`,
    `title_en: "Paper-figure icons — ${d.title_en}"`,
    `title_zh: "论文图图标 — ${d.title_zh}"`,
    `description: "${d.desc_en}"`,
    `description_en: "${d.desc_en}"`,
    `description_zh: "${d.desc_zh}"`,
    `tags: [paper-figure, icon, svg, primitive, ${d.slug}, 论文图, 图标]`,
    'license: "MIT-0 (paper-framework-figure-studio-pro); Tabler MIT / Lucide ISC where noted"',
    '---',
    '',
  ].join('\n');
}

mkdirSync(OUT_DIR, { recursive: true });
let total = 0;
const missing = [];
for (const d of DOMAINS) {
  const lines = [frontmatter(d)];
  lines.push(`# Paper-figure icons — ${d.title_en} / 论文图图标 — ${d.title_zh}\n`);
  lines.push(
    'Recolorable, library-free SVG primitives for CS paper figures. `design-build` retrieves ' +
      'these to compose figures: copy the `<svg>` and (for `currentColor` icons) set `color:` to ' +
      'the module\'s role colour. Each lists its connector **ports** (normalised x,y) for wiring ' +
      'edges. Provenance: paper-framework-figure-studio-pro vector library (MIT-0).\n'
  );
  lines.push('> 可重新着色的、零依赖 SVG 基元。复制 `<svg>`,`currentColor` 图标可用 `color:` 改成角色色;`ports` 为连线锚点 (归一化坐标)。\n');
  for (const [token, zh] of d.icons) {
    const r = resolveCard(token);
    if (!r) { missing.push(token); continue; }
    const svg = loadSvg(r.card);
    if (!svg) { missing.push(token + ' (no svg)'); continue; }
    const mean = r.card.primary_meaning || r.card.concept_id || token;
    const uses = (r.card.recommended_use || []).join(', ');
    lines.push(`## ${mean} / ${zh} — \`${r.stem}\``);
    const meta = [`**meaning**: ${mean} / ${zh}`];
    if (uses) meta.push(`**use**: ${uses}`);
    meta.push(`**ports**: ${portStr(r.card)}`);
    lines.push(meta.join(' · ') + '\n');
    lines.push('```svg\n' + svg + '\n```\n');
    total++;
  }
  const outFile = join(OUT_DIR, d.slug + '.md');
  writeFileSync(outFile, lines.join('\n'), 'utf8');
  console.log(`  ${d.slug}.md — ${d.icons.length - d.icons.filter(([t]) => missing.includes(t)).length}/${d.icons.length} icons`);
}
console.log(`\nbuilt ${DOMAINS.length} icon pages, ${total} icons total → components/seed/icons/`);
if (missing.length) console.log('MISSING (' + missing.length + '): ' + missing.join(', '));
