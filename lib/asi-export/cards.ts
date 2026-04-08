export type AsiStoryCard = {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  body?: string;
  variant?: 'cover' | 'fact' | 'compare' | 'faq' | 'summary';
  footer?: string;
};

export const asiStoryCards: AsiStoryCard[] = [
  {
    id: '01-cover',
    kicker: 'AI CARD #001',
    title: 'ASI：如果 AI 在大多数重要脑力任务上都超过人类，会发生什么？',
    subtitle: '这不是已经发生的现实，而是一个越来越多人认真讨论的未来问题。',
    variant: 'cover',
    footer: '600 × 800 story card',
  },
  {
    id: '02-what-is-asi',
    kicker: '一句话定义',
    title: 'ASI 不是“更会聊天的 AI”，而是“整体脑力可能超过人类的 AI”',
    bullets: [
      '重点不是某一项能力强，而是很多重要任务都更强',
      '比如研究、规划、分析、工程、决策',
      '公开层面看，现在并没有被公认已实现的 ASI',
    ],
    variant: 'fact',
  },
  {
    id: '03-agi-vs-asi',
    kicker: '核心区别',
    title: 'AGI vs ASI',
    body: 'AGI 更像“很多事都能做的通才型 AI”；ASI 更像“在很多关键脑力任务上都明显强过人类”的系统。',
    bullets: [
      'AGI：重点在通用',
      'ASI：重点在全面超人',
      '所以两者不是一个强弱小差别，而是等级差',
    ],
    variant: 'compare',
  },
  {
    id: '04-why-now',
    kicker: '为什么现在总被提起',
    title: '因为 AI 变强得太快，大家开始提前讨论后果',
    bullets: [
      '模型能力近几年上升很快',
      '训练规模、算力和资金投入不断变大',
      '安全、治理、控制权这些问题被提前摆上桌面',
    ],
    variant: 'fact',
  },
  {
    id: '05-common-questions',
    kicker: '普通人最关心',
    title: '关于 ASI，最常见的 3 个问题',
    bullets: [
      '它现在已经出现了吗？——没有公开共识说已经实现',
      '这是不是纯科幻？——不是，很多机构已把它当治理议题',
      '普通人为什么要关心？——因为它可能影响工作、教育、权力和规则',
    ],
    variant: 'faq',
  },
  {
    id: '06-dont-get-misled',
    kicker: '先别被带偏',
    title: '今天真正确定的，不是 ASI 已经来了，而是更强 AI 的安全问题已经开始了',
    bullets: [
      '不要把“正在讨论”误解成“已经实现”',
      '不要把“有人担心风险”误解成“全是吓人”',
      '现在更现实的争论，其实是治理、权力和控制边界',
    ],
    variant: 'summary',
  },
];
