export const DEMO_CODE = "246810";

export const DOWNLOADS = {
  macArm: "https://assets.qwenwork.cn/release/latest/qwenworkcn-darwin-arm64.dmg",
  macIntel: "https://assets.qwenwork.cn/release/latest/qwenworkcn-darwin-x64.dmg",
  windows: "https://assets.qwenwork.cn/release/latest/qwenworkcn-setup-x64.exe",
  desktopChannel: "https://clientupgrade.qwenwork.cn/download?channel=official-win-x64",
} as const;

export const EXTERNAL = {
  learn: "https://learn.qwenwork.cn/",
  docs: "https://docs.qwenwork.cn/",
  releaseNotes: "https://docs.qwenwork.cn/release-notes/desktop",
  creator: "https://aicreator.qwenwork.host/",
  ambassador: "https://ambassador.qwenwork.host/",
  contest: "https://aiproductivity.qwenwork.host/",
  terms: "https://terms.alicdn.com/legal-agreement/terms/b_end_product_protocol/20260708175856831/20260708175856831.html",
  privacy: "https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20260709092132640/20260709092132640.html",
  aliyunUser: "https://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201712130944_39600.html",
  aliyunService: "https://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201802281451_77479.html",
  aliyunPrivacy: "https://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud202107091605_49213.html",
  icp: "https://beian.miit.gov.cn/",
  police: "https://beian.mps.gov.cn/",
} as const;

export const placeholders = [
  "把我的营销数据转化为清晰的可视化图表",
  "帮我提炼这份文档的重点",
  "分析这组数据并给出结论",
  "总结昨天的工作并列出今天的待办",
];

export const guestPrompts = [
  "帮我快速生成一份本周工作周报",
  "把这份数据整理成清晰的分析表格",
  "生成一份项目汇报演示文稿大纲",
];

export type PromptItem = { title: string; body: string };

export const promptGroups: { id: string; label: string; items: PromptItem[] }[] = [
  {
    id: "dingtalk",
    label: "钉钉办公",
    items: [
      { title: "文档优化", body: "审查这份方案，找到可能被质疑或失败的点" },
      { title: "项目周报", body: "写项目周报，汇总进展、风险和下周计划" },
      { title: "数据简报", body: "基于表格数据，总结并绘制带图表的数据简报" },
      { title: "表格分析", body: "读取表格数据，分析数据趋势和异常点" },
      { title: "待办梳理", body: "根据上周周报，梳理关键Todo与本周计划" },
    ],
  },
  {
    id: "docs",
    label: "文档创作",
    items: [
      { title: "产品PRD", body: "写一份产品需求文档，覆盖背景目标、场景、功能和验收标准" },
      { title: "选题脑暴", body: "脑暴内容选题，给出清单及推荐理由" },
      { title: "重点提炼", body: "长文章压缩，保留核心论点、结论与关键数据" },
      { title: "深度文章", body: "根据测试数据，写一份模型评估深度文章" },
      { title: "文案审核", body: "审查文案的违禁词和法务风险" },
    ],
  },
  {
    id: "data",
    label: "数据分析",
    items: [
      { title: "数据分析", body: "对A/B测试结果，进行显著性分析" },
      { title: "电商运营", body: "直播全链路数据复盘，定位流量、转化、留存的掉点环节" },
      { title: "用户分析", body: "分析用户数据，找出流失原因和趋势" },
      { title: "用户分析", body: "用户分层与差异化运营策略" },
      { title: "电商运营", body: "大促全周期GMV复盘与规划" },
    ],
  },
  { id: "team", label: "多人工作台", items: [] },
  { id: "design", label: "创意设计", items: [] },
  {
    id: "research",
    label: "深度调研",
    items: [
      { title: "模型对比", body: "最新的AI Flash模型对比" },
      { title: "竞品调研", body: "分析竞品社媒矩阵策略" },
      { title: "行业热点", body: "下半年值得关注的大型科技展会" },
      { title: "股票投资", body: "定时任务监测A股市场" },
      { title: "行业调研", body: "调研三江源区域的动物保护措施" },
    ],
  },
];

export type Kit = {
  id: string;
  title: string;
  author: string;
  desc: string;
  skills: number;
  connections: number;
  version: string;
};

export const kits: Kit[] = [
  { id: "design", title: "产品设计", author: "QwenWork", desc: "设计师全流程工具箱，覆盖问题定义、用户研究、信息架构、交互流程、视觉规范、营销物料、动效开发、设计走查、可用性测试、工程交付和项目复盘。", skills: 28, connections: 0, version: "V0.5.10" },
  { id: "research", title: "投研分析", author: "QwenWork", desc: "券商/基金投研全流程工具，覆盖深度报告、行业研究、年报解读、业绩快评、调研纪要、晨会纪要、研报摘要和可比公司分析。", skills: 8, connections: 0, version: "V1.1.2" },
  { id: "contract", title: "智能合同管家", author: "QwenWork", desc: "对话式合同全生命周期专家：审、建、管、追。基于《民法典》合同编，审建管追一句话完成。", skills: 10, connections: 0, version: "V3.0.0" },
  { id: "legal", title: "企业法务", author: "QwenWork", desc: "起草法律文书、生成公司决议及章程修正案、类案检索与胜率预判、多领域合规审查。", skills: 8, connections: 0, version: "V1.1.2" },
  { id: "tax", title: "企业财税", author: "QwenWork", desc: "覆盖财务分析、记账凭证、预算分析、增值税管理、汇算清缴、内部审计、财务报表编制和月结管理。", skills: 9, connections: 0, version: "V1.1.1" },
  { id: "consult", title: "咨询交付", author: "QwenWork", desc: "管理咨询全流程工具，覆盖桌面调研、访谈纪要、方案框架、报告撰写、标杆对比、项目周报和CEO汇报。", skills: 7, connections: 0, version: "V1.1.1" },
  { id: "content", title: "内容创作专家", author: "内容创作团队", desc: "面向自媒体与市场运营，覆盖选题发现、爆款拆解、图文创作、视频编导到跨平台发布。", skills: 10, connections: 0, version: "V1.0.0" },
  { id: "wealth", title: "财富管理", author: "QwenWork", desc: "覆盖市场速览、资产配置、基金分析、客户报告、理财规划和税务筹划。", skills: 6, connections: 0, version: "V1.1.2" },
  { id: "pe", title: "股权投资", author: "QwenWork", desc: "PE/VC股权投资全流程工具，覆盖项目筛选、尽调清单、条款审查、投决备忘录、收益测算和退出分析。", skills: 6, connections: 0, version: "V1.1.2" },
  { id: "ppt-beauty", title: "PPT视觉美化师", author: "美图设计室", desc: "面向已有 PPT 的视觉美化专家，在保留内容的前提下提升版式、配色和商务呈现质感。", skills: 1, connections: 1, version: "V1.0.0" },
  { id: "litigation", title: "中国民商事诉讼工具箱", author: "游初 (You Chu)", desc: "面向执业律师与公司法务的中国民商事诉讼全流程工具箱，覆盖文书生成与辅助工作。", skills: 20, connections: 0, version: "V1.0.0" },
  { id: "ppt", title: "PPT演示设计师", author: "美图设计室", desc: "根据主题、提纲或资料生成结构完整、适合汇报和演示的专业 PPT。", skills: 1, connections: 1, version: "V1.0.0" },
  { id: "ib", title: "投行业务", author: "QwenWork", desc: "覆盖IPO招股书起草、并购重组报告书、债券募集说明书、交易所问询回复和财务建模。", skills: 6, connections: 0, version: "V1.1.2" },
  { id: "lawyer", title: "律师办案大管家", author: "千问办公", desc: "面向执业律师的民商事诉讼办案助手，覆盖接案、检索、分析、证据、文书、庭审到结案。", skills: 23, connections: 0, version: "V0.01" },
  { id: "1688", title: "1688买家助手", author: "1688", desc: "为1688买家提供选品找货、分销铺货和全链路交易闭环。", skills: 5, connections: 1, version: "V1.3.1" },
];

export const skillCategories = [
  "全部",
  "内容创作",
  "视觉创意",
  "数据分析",
  "咨询研究",
  "效率工具",
  "市场销售",
  "电商零售",
  "产品开发",
  "人力招聘",
  "财务会计",
  "物流行业",
  "律师法务",
  "投资理财",
  "项目管理",
  "教育学习",
  "其他",
] as const;

export type Skill = {
  id: string;
  title: string;
  author: string;
  desc: string;
  installs: number;
  category: (typeof skillCategories)[number];
};

export const skills: Skill[] = [
  { id: "viz", title: "数据可视化", author: "钉钉 AI 表格", desc: "上传 Excel 或 CSV 表格，一键生成可视化数据分析报告。还可以将清洗后的数据备份到 AI 表格中。", installs: 87062, category: "数据分析" },
  { id: "weekly", title: "工作周报", author: "QwenWork", desc: "自动从钉钉日程、任务、听记、云文档提取当周工作内容，多维分析后生成结构化周报。", installs: 71660, category: "效率工具" },
  { id: "humanize", title: "AI文本优化", author: "QwenWork", desc: "消除 AI 写作痕迹，使文本更自然真实。识别并修正夸张象征、宣传用语和破折号滥用等模式。", installs: 60443, category: "内容创作" },
  { id: "quickbi", title: "数据分析", author: "Alibaba Cloud (Quick BI)", desc: "自然语言提问即可智能匹配并分析 Excel 或 Quick BI 数据集，将洞察即时呈现。", installs: 55802, category: "数据分析" },
  { id: "image", title: "图像创作", author: "QwenWork", desc: "精选图像生成助手，覆盖角色手办、场景微缩、产品展示、风格转换四大类。", installs: 49595, category: "视觉创意" },
  { id: "todo", title: "聊天消息提取待办", author: "QwenWork", desc: "指定钉钉群，提取、分析聊消息并生成相关的待办任务。", installs: 38673, category: "效率工具" },
  { id: "industry", title: "行业研究报告", author: "QwenWork", desc: "当用户需要行业研究、赛道分析、市场规模、竞争格局、技术趋势或政策环境时使用。", installs: 37511, category: "咨询研究" },
  { id: "longform", title: "长文本写作专家", author: "QwenWork", desc: "结构化长文写作技能，用于撰写、起草、扩展、组织或打磨博客文章、报告、方案。", installs: 34670, category: "内容创作" },
  { id: "group", title: "群聊内容摘要", author: "QwenWork", desc: "将钉钉群聊消息提取、分析并生成结构化钉钉文档摘要，涵盖议题、决策、行动项。", installs: 31137, category: "效率工具" },
  { id: "compete", title: "竞品分析", author: "QwenWork", desc: "针对目标产品与竞争对手进行系统性竞品研究，输出结构化钉钉在线文档。", installs: 29154, category: "咨询研究" },
  { id: "github", title: "github工具", author: "QwenWork", desc: "使用 gh 的 CLI 与 GitHub 交互，可实现通过 issue 获取、PR 信息管理、CI 运行及高级操作。", installs: 24603, category: "产品开发" },
  { id: "decision", title: "深度决策研究报告", author: "QwenWork", desc: "根据用户提出的复杂决策问题，调用悟空自有搜索、阅读和分析能力进行资料收集与判断。", installs: 22044, category: "咨询研究" },
];

export type Connector = { id: string; name: string; desc: string; mark: string; tint: string };

export const connectorGroups: { title: string; items: Connector[] }[] = [
  {
    title: "沟通协作",
    items: [
      { id: "ding", name: "钉钉", desc: "连接钉钉中的工作信息与服务", mark: "钉", tint: "#1677ff" },
      { id: "wecom", name: "企业微信", desc: "连接企业微信中的工作信息与服务", mark: "微", tint: "#2dbf5b" },
      { id: "feishu", name: "飞书", desc: "连接飞书中的工作信息与服务", mark: "飞", tint: "#3370ff" },
    ],
  },
  {
    title: "物流行业",
    items: [
      { id: "yimao", name: "亿贸AI", desc: "提供贸易合规审查、商品归类查询及贸易市场数据分析。", mark: "贸", tint: "#e11d2e" },
      { id: "rail", name: "数联宝-铁路货运查询", desc: "查询铁路站点停卸装命令及铁路专用线资料。", mark: "铁", tint: "#1d4ed8" },
      { id: "port", name: "口岸高质量数据集", desc: "口岸贸易业务 MCP 服务，覆盖报关通关与出口合规。", mark: "口", tint: "#e11d2e" },
      { id: "dataclaw", name: "数可捞", desc: "连接 DataClawHub，支持搜索任务、制品、数据集与工具。", mark: "捞", tint: "#2563eb" },
    ],
  },
  {
    title: "知识文档",
    items: [
      { id: "notion", name: "Notion", desc: "读写和检索 Notion 页面与数据库", mark: "N", tint: "#111111" },
      { id: "baixiao", name: "百晓智能", desc: "中英文学术检索：搜索期刊论文、专著、政策文件。", mark: "晓", tint: "#7c3aed" },
      { id: "beishu", name: "背书匠", desc: "专为备考打造的智能学习工具，用 AI 重构记忆与刷题。", mark: "背", tint: "#eab308" },
      { id: "cue", name: "cue", desc: "用自己的智能体创建、发布和演示 cue 演示文稿与文档。", mark: "c", tint: "#111111" },
      { id: "shenzhi", name: "深知可信工作台", desc: "聚焦法律、政策、标准等可信知识服务，形成可核验的研究结果。", mark: "D", tint: "#6d28d9" },
    ],
  },
  {
    title: "电商零售",
    items: [
      { id: "taobao", name: "淘宝天猫商家端", desc: "连接生意参谋、阿里妈妈、淘宝直播与千牛等商家后台数据。", mark: "淘", tint: "#ff5000" },
      { id: "eleme", name: "淘宝闪购餐饮商家版", desc: "在千问办公中连接淘宝闪购餐饮经营能力。", mark: "餐", tint: "#ff6a00" },
      { id: "retail", name: "淘宝闪购零售商家版", desc: "连接淘宝闪购零售 MCP 能力。", mark: "零", tint: "#0ea5e9" },
      { id: "youzan", name: "有赞", desc: "通过自然语言查询有赞店铺的商品、订单、客户与营销数据。", mark: "赞", tint: "#e11d48" },
    ],
  },
];

export const scheduleTemplates = [
  {
    id: "ding-agenda",
    title: "钉钉日程推送",
    desc: "读取我钉钉里今日及未来 3 天内即将到期的待办事项和日程，按时间顺序和紧急程度排序，生成计划清单",
    when: "每天 08:00–10:00",
  },
  {
    id: "daily-brief",
    title: "每日调研简报",
    desc: "做一份关于「AI Agent」的调研简报，抓取近昨天的网页、小红书、微博、行业新闻，按『事实-观点-数据-趋势』整理。",
    when: "每天 09:00–11:00",
  },
  {
    id: "work-daily",
    title: "工作日报推送",
    desc: "汇总今日工作内容，按完成事项、进行中事项、明日计划三段式输出，生成日报文档。",
    when: "工作日 19:00–21:00",
  },
];

export const professions = [
  { role: "HR", quote: "招聘流程一散就容易乱。千问办公帮我把简历、入职材料和薪酬资料放在一处，少在不同文件间来回找。" },
  { role: "律师", quote: "案子先问清事实，再落文书。千问办公里的民商事诉讼律师、合同管理和企业法务套件，正好覆盖常用流程。" },
  { role: "财务", quote: "月结最怕口径反复。千问办公的企业财税套件把财务分析、预算、增值税、报表和月结放进同一条流程。" },
  { role: "博主", quote: "选题来了就得快。千问办公能写营销文案、追踪社媒热点，也能整理效果数据，方便后面复盘。" },
  { role: "商家", quote: "商品规划和营销不能各做各的。千问办公帮我把需求、活动、用户反馈和经营信息接起来。" },
  { role: "教师", quote: "教案、课件、作业一多，整理就很占时间。千问办公帮我把材料理顺，我把精力留给学生和课堂。" },
  { role: "导游", quote: "行程、讲解和团队信息得随时找得到。千问办公帮我提前整理好，客人临时一问也能稳稳接住。" },
  { role: "广告人", quote: "提案不只有创意。千问办公帮我查广告合规、追竞品和效果，也把视觉规范、营销物料接上。" },
  { role: "分析师", quote: "观点不能只靠感觉。千问办公的投研分析套件能读年报、做行业研究、整理纪要和可比公司分析。" },
  { role: "艺术家", quote: "灵感之外，作品也要落成规范。千问办公帮我梳理视觉规范、营销物料和动效开发。" },
  { role: "鉴定师", quote: "鉴定不能只看结论，资料和依据都得留清楚。千问办公帮我整理案例、比对记录和报告材料。" },
  { role: "工程师", quote: "需求一变，代码之外的文档也得跟。千问办公的产品管理套件能写 PRD、拆故事、更新路线图。" },
];

export const capabilities = [
  {
    title: "企业 IM 协作能力",
    accent: "全面打通",
    body: "支持消息群聊读取、考勤审批、会议日程、文档表格生成、知识库与邮件等 25 项企业 IM 能力，让信息查询、内容生产与流程处理直接在企业协作链路中闭环完成。",
    states: ["企业 IM 输入", "千问处理", "结果回写"],
  },
  {
    title: "Office 专业产物",
    accent: "一站生成与编辑",
    body: "支持输出 PPTX、Word、Excel、HTML 等多种产物，原生支持 Office 套件预览与实时编辑，从内容生成、格式调整到最终交付一站完成。",
    states: ["XLSX", "DOCX", "PPTX"],
  },
  {
    title: "多模态内容理解",
    accent: "与智能生成",
    body: "能够理解图片、音频、视频等多模态内容，并集成顶级 AI 生成模型，完成素材分析、内容提炼与图文音视频创作。",
    states: ["图片", "音频", "视频", "文本"],
  },
  {
    title: "全栈网页生成",
    accent: "与在线交付",
    body: "可制作带数据库与交互逻辑的免部署独立网页，覆盖设计、开发、数据接入和在线发布，全流程一站式交付。",
    states: ["页面结构", "交互逻辑", "发布配置"],
  },
  {
    title: "专业数据源",
    accent: "聚合与接入",
    body: "接入 1688 等电商后台、小红书等社交媒体，跨来源聚合经营与内容数据，快速形成可分析、可追踪的统一视图。",
    states: ["数据输入", "结构化输出", "数据处理"],
  },
  {
    title: "自定义技能",
    accent: "与专家套件",
    body: "支持自定义创建、上传和分享技能，公开市场汇聚海量优质技能与专家套件，覆盖不同岗位与工作场景，选择后即可直接使用。",
    states: ["行业研究", "内容增长", "经营分析", "商务写作", "营销策略", "项目管理"],
  },
];

export const certifications = [
  "ISO 27001 信息安全管理",
  "ISO 27018 公有云个人信息保护管理",
  "BS 10012 个人信息管理",
  "ISO 27017 云安全管理",
  "ISO 9001 质量管理",
  "ISO 20000-1 信息技术服务管理",
];

export const personalFaqs = [
  {
    q: "千问办公会员可以做什么？",
    a: "千问办公会员可调用基础与高级模型，完成 PPT 生成、文档撰写、数据分析、网页生成与发布等办公任务，并通过高速通道不限量对话。更多内容可查阅帮助中心。",
  },
  {
    q: "积分是什么？",
    a: "积分用于计量模型调用和任务执行。不同套餐包含每月基础积分，并按日发放登录积分，登录积分当日有效。",
  },
  {
    q: "积分用尽怎么办？",
    a: "标准版和高级版支持积分包充值。免费版可等待次日登录积分，或升级套餐。",
  },
  {
    q: "月付和连续包月有什么区别？",
    a: "月付按单月价格结算。连续包月享 8 折，可随时取消。年付在标价上享 7 折。",
  },
  {
    q: "购买标准版后可以升级吗？",
    a: "可以升级到个人高级版。升级后按新套餐的积分、存储和发布额度生效。",
  },
  {
    q: "需要反馈问题，如何联系我们？",
    a: "可在网页端右上角提交问题反馈，或前往帮助中心查看安装、账号与计费说明。",
  },
];
