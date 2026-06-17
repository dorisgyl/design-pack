// build-xhs-cards.mjs — emit the 小红书图文 / XHS Carousel template seeds (en + -zh) from the
// hand-authored cards in scripts/xhs-cards/<id>.html.
//
// The canonical HTML is Chinese (lang="zh"); the -zh seed embeds it verbatim, and the en seed is
// produced by applyEn() (switch the <html> lang + translate the visible copy via a per-card
// zh→en term map, longest-first). The HTML is embedded in a ```html fence so design-build /
// design-curate can lift it. category = xhs-card. All five cards share one visual master
// (the `:root` block) — see the cs/xhs-visual-card-method spec.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'scripts', 'xhs-cards');
const OUT = join(ROOT, 'components', 'seed', 'templates');
const TAGS = '[xhs-card, social, carousel, notion-card, 小红书图文, template]';

const CARDS = [
  {
    id: 'xhs-cover',
    title_en: 'XHS Carousel · Cover (hook)', title_zh: '小红书图文 · 封面（钩子）',
    desc_en: 'Opening cover for a 小红书 knowledge carousel: an oversized hook headline with a single highlighter mark, an eyebrow label, a one-line promise, and a save prompt — 1080×1440, Notion-card style.',
    desc_zh: '小红书干货轮播的封面页：超大钩子标题（仅一处荧光笔强调）+ 眉标 + 一句承诺 + 收藏提示——1080×1440，Notion 卡片风。',
    guide_en: 'The cover earns the tap. Keep one idea, set it huge, and highlight only the single payoff word. Lock the visual master here (the shared `:root` block — bg / ink / one accent / type); every later page copies it verbatim so the set reads as one carousel. Swap the copy, keep the structure; never add a second accent colour.',
    guide_zh: '封面决定点不点开。只放一个观点、做到极大，只给最关键的一个词上荧光笔。在这里锁定视觉母版（共享的 `:root` 块——底色 / 墨色 / 单一强调色 / 字体）；后面每一页逐字照抄，整组才像一套。换文案、不换结构；永远不要加第二个强调色。',
    en: [
      ['小红书图文 · 封面', 'XHS Carousel · Cover'],
      ['效率手账 · 干货合集', 'Productivity · Field Notes'],
      ['复利效应', 'compound'],
      ['把笔记', 'Make your'],
      ['用出', 'notes '],
      ['5 个 Notion 工作流', '5 Notion workflows'],
      ['让过去的你，', 'so past-you '],
      ['帮现在的你省力', 'does the heavy lifting'],
      ['收藏 ↗ 反复用得上', "Save ↗ you'll reuse it"],
      ['@效率手账', '@FieldNotes'],
    ],
  },
  {
    id: 'xhs-content',
    title_en: 'XHS Carousel · Content (steps / list)', title_zh: '小红书图文 · 内容页（步骤 / 清单）',
    desc_en: 'Interior content page: a section title, a numbered step list as Notion-style blocks, and one tinted callout for the takeaway. 1080×1440.',
    desc_zh: '内页内容页：小标题 + Notion 块式编号步骤清单 + 一个浅底提示块收尾。1080×1440。',
    guide_en: "Use for the 'how' pages. Numbers are for real sequences only — if the items aren't ordered, use plain bullets. Three to four blocks max per page; push overflow to the next page rather than shrinking type. The callout carries the one sentence a reader should screenshot.",
    guide_zh: "用于讲'怎么做'的页。编号只给真正有顺序的内容——若无序就用普通圆点。每页最多三到四个块；放不下就翻页，别把字号压小。提示块装那句最该被截图的话。",
    en: [
      ['小红书图文 · 内容页', 'XHS Carousel · Content'],
      ['工作流 01 · 收集', 'Workflow 01 · Capture'],
      ['灵感统一落进同一个收集箱，零摩擦，才真的记得下来。', 'Everything lands in one inbox first — zero friction, so it actually gets written down.'],
      ['通勤路上把碎片归位到对应项目，十分钟就能清零。', 'On your commute, file each scrap into its project — ten minutes to hit zero.'],
      ['整理这个动作本身，就是一次低成本的回顾。', 'The act of sorting is itself a low-cost review.'],
      ['关键不是记得多，而是', "It's not about capturing more — it's about "],
      ['每天都清零', 'clearing to zero daily'],
      ['——让收集箱始终可信。', ' — so the inbox stays trustworthy.'],
      ['每天 10 分钟', '10 minutes a day'],
      ['清空你的', 'to empty your '],
      ['收集箱', 'inbox'],
      ['随手记，先不分类', 'Capture first, sort later'],
      ['每天定时清空', 'Empty it at a set time'],
      ['归档即复习', 'Filing is reviewing'],
      ['@效率手账', '@FieldNotes'],
    ],
  },
  {
    id: 'xhs-quote',
    title_en: 'XHS Carousel · Pull-quote', title_zh: '小红书图文 · 金句页',
    desc_en: "A single big serif statement centred, with one highlighted phrase and an accent keyword, plus a small attribution. The 'screenshot-and-share' page. 1080×1440.",
    desc_zh: "居中的一句大号衬线金句，含一处荧光笔短语和一个强调色关键词，配一行小注。用来被'截图转发'的页。1080×1440。",
    guide_en: "Switch the display face to a serif here — it's the one page that should feel editorial, not UI. One sentence, two emphases max (a highlighter mark + an accent keyword). Everything else is whitespace. If the line needs more than two breaks to fit, it's too long.",
    guide_zh: "这页把标题字换成衬线——它是唯一该有'刊物感'而非'界面感'的页。一句话、最多两处强调（荧光笔 + 强调色关键词）。其余全是留白。若一行要断三次以上才放得下，就是太长了。",
    en: [
      ['小红书图文 · 金句页', 'XHS Carousel · Quote'],
      ['金句 · 一句话记住', 'Pull-quote · one line to remember'],
      ['用了三年笔记之后，最深的一点体会', 'The biggest lesson after three years of note-taking'],
      ['笔记不是存放过去的', "Notes aren't a "],
      ['仓库', 'warehouse'],
      ['，<br>而是会替你增值的<br>', ' for the past,<br>they are an<br>'],
      ['资产</em>。', 'asset</em> that compounds.'],
      ['@效率手账', '@FieldNotes'],
    ],
  },
  {
    id: 'xhs-compare',
    title_en: 'XHS Carousel · Compare (✕ / ✓)', title_zh: '小红书图文 · 对比页（✕ / ✓）',
    desc_en: "Two-column before/after comparison: a muted '✕ most people' column and an accent-tinted '✓ pros' column, three points each. 1080×1440.",
    desc_zh: "两栏对比：左为弱化的'✕ 多数人'，右为强调色浅底的'✓ 高手'，各三条。1080×1440。",
    guide_en: 'Tint only the column you want chosen; leave the other a quiet grey. Keep the two columns parallel — same number of points, same phrasing length — so the contrast itself is the message. Three points per side reads fastest.',
    guide_zh: "只给你想让人选的那栏上浅底强调色，另一栏保持安静的灰。两栏要对仗——条数相同、句长相近——让'对比'本身成为信息。每栏三条最好读。",
    en: [
      ['小红书图文 · 对比页', 'XHS Carousel · Compare'],
      ['对比 · 少走三年弯路', 'Compare · skip three years of detours'],
      ['同样记笔记', 'Same note-taking'],
      ['差距在', 'the gap is in '],
      ['这一步', 'this one step'],
      ['按软件功能分文件夹', 'Folders by app feature'],
      ['记完就再也不打开', 'Never opened again'],
      ['越积越多，越积越乱', 'More piled up, more chaos'],
      ['按「将来怎么用」分类', 'Sorted by "how I\'ll use it"'],
      ['每周回看一次收集箱', 'Review the inbox weekly'],
      ['旧笔记被反复调用', 'Old notes reused often'],
      ['多数人', 'Most people'],
      ['高手', 'Pros'],
      ['@效率手账', '@FieldNotes'],
    ],
  },
  {
    id: 'xhs-cta',
    title_en: 'XHS Carousel · Ending (CTA)', title_zh: '小红书图文 · 结尾页（行动召唤）',
    desc_en: 'Closing page: a warm sign-off headline, like / save / follow actions with the follow button in the accent, and a teaser for the next post. 1080×1440.',
    desc_zh: '结尾页：一句温和的收束标题 + 点赞 / 收藏 / 关注三连（关注键用强调色）+ 下一篇预告。1080×1440。',
    guide_en: "Ask for one primary action, not five — the accent goes on Follow only. Give a concrete reason to come back (name the next post). Reuse the cover's handle and accent so the last page closes the loop the cover opened.",
    guide_zh: "只要一个主行动，别要五个——强调色只给'关注'。给一个具体的回来理由（点名下一篇）。沿用封面的账号名和强调色，让最后一页收回封面打开的那个环。",
    en: [
      ['小红书图文 · 结尾页', 'XHS Carousel · Ending'],
      ['写在最后', 'Before you go'],
      ['愿你的笔记', 'May your notes'],
      ['开始', 'start to '],
      ['复利生长', 'compound'],
      ['这套工作流，', 'This workflow — '],
      ['抄进你的 Notion 就能用', 'paste it into Notion and go'],
      ['。<br>觉得有用的话——', '.<br>If it helped you —'],
      ['下一篇拆解我的 ', 'Next post breaks down my '],
      ['模板结构', 'template structure'],
      ['，每周更新一次。', ', updated weekly.'],
      ['点赞', 'Like'],
      ['收藏', 'Save'],
      ['关注', 'Follow'],
      ['@效率手账', '@FieldNotes'],
      ['每周更新', 'weekly'],
    ],
  },
];

function fm(obj) {
  return ['---', ...Object.entries(obj).map(([k, v]) => `${k}: ${v}`), '---', ''].join('\n');
}

// canonical HTML is Chinese; translate to English (longest-first pairs already ordered per card).
function applyEn(html, pairs) {
  let out = html.replace('<html lang="zh">', '<html lang="en">');
  for (const [zh, en] of pairs) out = out.split(zh).join(en);
  return out;
}

let n = 0;
for (const c of CARDS) {
  const zhHtml = readFileSync(join(SRC, c.id + '.html'), 'utf8');
  const enHtml = applyEn(zhHtml, c.en);

  const enFront = fm({
    slug: `packs/design-pack/templates/${c.id}`,
    type: 'template', lang: 'en', category: 'xhs-card',
    title: `"${c.title_en}"`, title_zh: `"${c.title_zh}"`,
    description: `"${c.desc_en}"`, description_zh: `"${c.desc_zh}"`,
    tags: TAGS, sample_image: `packs/design-pack/assets/templates/${c.id}.png`,
    source: `design-pack/${c.id}`,
  });
  const enBody = `## Design guidance\n\n${c.guide_en}\n\n## Template (HTML)\n\n\`\`\`html\n${enHtml}\n\`\`\`\n`;
  writeFileSync(join(OUT, c.id + '.md'), enFront + enBody, 'utf8');

  const zhFront = fm({
    slug: `packs/design-pack/templates/${c.id}-zh`,
    type: 'template', lang: 'zh', category: 'xhs-card',
    title: `"${c.title_zh}"`, title_zh: `"${c.title_zh}"`,
    description: `"${c.desc_zh}"`,
    tags: TAGS, sample_image: `packs/design-pack/assets/templates/${c.id}.png`,
    source: `design-pack/${c.id}`,
  });
  const zhBody = `## 设计说明\n\n${c.guide_zh}\n\n## 模板（HTML）\n\n\`\`\`html\n${zhHtml}\n\`\`\`\n`;
  writeFileSync(join(OUT, c.id + '-zh.md'), zhFront + zhBody, 'utf8');
  n += 2;
}
console.log(`wrote ${n} xhs-card template seeds → components/seed/templates/`);
