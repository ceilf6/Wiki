export interface Platform {
  id: string
  /** 平台名 */
  name: string
  /** 拉丁名/产品代号，用于装饰性排版 */
  latin: string
  /** 所属厂商 */
  vendor: string
  /** 代表模型 */
  model: string
  /** 亮点能力，2-3 条 */
  highlights: string[]
  /** 品牌主色，用于卡片光晕与徽标 */
  brandColor: string
  /** 官网 */
  url: string
  /** 徽标字（单字） */
  glyph: string
}

export const platforms: Platform[] = [
  {
    id: 'doubao',
    name: '豆包',
    latin: 'DOUBAO',
    vendor: '字节跳动',
    model: 'Doubao 1.5 Pro',
    highlights: ['多模态理解与生成', '国民级移动端入口', '火山引擎企业生态'],
    brandColor: '#5c7cfa',
    url: 'https://www.doubao.com',
    glyph: '豆',
  },
  {
    id: 'qwen',
    name: '通义千问',
    latin: 'QWEN',
    vendor: '阿里云',
    model: 'Qwen3',
    highlights: ['全尺寸开源模型矩阵', '全球开源社区影响力', '云上一站式模型服务'],
    brandColor: '#9775fa',
    url: 'https://tongyi.aliyun.com',
    glyph: '千',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    latin: 'MOONSHOT',
    vendor: '月之暗面',
    model: 'Kimi K2',
    highlights: ['超长上下文阅读', 'Agentic 智能体能力', '深度推理与搜索'],
    brandColor: '#38d9a9',
    url: 'https://kimi.moonshot.cn',
    glyph: '月',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    latin: 'DEEPSEEK',
    vendor: '深度求索',
    model: 'DeepSeek-R1',
    highlights: ['开源推理模型标杆', '极致性价比训练', '数学与代码能力'],
    brandColor: '#4dabf7',
    url: 'https://www.deepseek.com',
    glyph: '深',
  },
  {
    id: 'zhipu',
    name: '智谱清言',
    latin: 'GLM',
    vendor: '智谱 AI',
    model: 'GLM-4.5',
    highlights: ['Agent 原生模型', '清华系技术底蕴', '开放平台与 MaaS'],
    brandColor: '#748ffc',
    url: 'https://chatglm.cn',
    glyph: '谱',
  },
  {
    id: 'ernie',
    name: '文心一言',
    latin: 'ERNIE',
    vendor: '百度',
    model: '文心 X1',
    highlights: ['知识增强大模型', '飞桨深度学习平台', '搜索与地图场景落地'],
    brandColor: '#3b5bdb',
    url: 'https://yiyan.baidu.com',
    glyph: '文',
  },
  {
    id: 'yuanbao',
    name: '腾讯元宝',
    latin: 'HUNYUAN',
    vendor: '腾讯',
    model: '混元 Turbo',
    highlights: ['微信生态深度整合', '混元多模态底座', '公众号内容检索'],
    brandColor: '#22b8cf',
    url: 'https://yuanbao.tencent.com',
    glyph: '元',
  },
  {
    id: 'spark',
    name: '讯飞星火',
    latin: 'SPARK',
    vendor: '科大讯飞',
    model: '星火 X1',
    highlights: ['语音交互全链路', '教育医疗行业深耕', '国产算力底座训练'],
    brandColor: '#ff922b',
    url: 'https://xinghuo.xfyun.cn',
    glyph: '火',
  },
]
