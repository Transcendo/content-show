import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { ContentShowLogo } from "@/components/icons/logo";

export const siteName = "Content Show";

export const topNavLinks: LinkItemType[] = [
	{
		text: "首页",
		url: "/",
		active: "url",
	},
	{
		text: "学习路线",
		url: "/docs/learn/learning-path",
		active: "nested-url",
	},
	{
		text: "名词速查",
		url: "/docs/learn/glossary",
		active: "nested-url",
	},
	{
		text: "大模型",
		url: "/docs/llm-prompting",
		active: "nested-url",
	},
	{
		text: "AI 基础",
		url: "/docs/fundamentals",
		active: "nested-url",
	},
	{
		text: "资料来源",
		url: "/docs/resources/source-list",
		active: "nested-url",
	},
];

export const docsLayoutProps = {
	links: topNavLinks,
	nav: {
		title: (
			<>
				<ContentShowLogo aria-hidden="true" className="size-7 shrink-0" />
				<span>{siteName}</span>
			</>
		),
		url: "/",
	},
	searchToggle: {
		enabled: false,
	},
	themeSwitch: {
		enabled: true,
	},
} as const;

export const featuredTerms = [
	"AGI",
	"AI",
	"AIGC",
	"ANI",
	"ASI",
	"Agent",
	"Alignment",
	"Attention",
	"Backpropagation",
	"Bias",
	"RAG",
	"Embedding",
	"Vector Database",
	"Transformer",
	"Token",
	"RLHF",
	"Diffusion Models",
	"MoE",
	"CLIP",
	"CNN",
] as const;

export const learningTracks = [
	{
		title: "先建立 AI 常识",
		description: "从 AI、ANI、AGI、ASI、AIGC、生成式 AI 开始，把讨论里的基本坐标弄清楚。",
		href: "/docs/fundamentals",
		index: "01",
	},
	{
		title: "再理解模型与大模型",
		description: "把训练数据、参数、损失、Token、RAG、Embedding 和微调放在同一条工作链里理解。",
		href: "/docs/llm-prompting",
		index: "02",
	},
	{
		title: "最后判断应用和风险",
		description: "按多模态、智能体、产品、公司、对齐、偏差和算力来判断 AI 能帮你做什么。",
		href: "/docs/generative-multimodal",
		index: "03",
	},
] as const;

export const knowledgeAreas = [
	{
		title: "AI 基础概念",
		count: "12 个入口词",
		description: "AI、ANI、AGI、ASI、AIGC、生成式 AI、符号主义和图灵测试先把边界讲清楚。",
		href: "/docs/fundamentals",
		tags: ["AI", "AGI", "AIGC"],
	},
	{
		title: "机器学习基础",
		count: "16 个基础词",
		description: "训练数据、验证集、监督学习、强化学习、拟合和泛化决定模型是否可靠。",
		href: "/docs/machine-learning",
		tags: ["Data", "Fitting", "RL"],
	},
	{
		title: "模型与训练机制",
		count: "20 个机制词",
		description: "神经网络、参数、权重、损失、梯度、反向传播和推理解释模型如何形成输出。",
		href: "/docs/model-mechanisms",
		tags: ["Neural", "Loss", "Vector"],
	},
	{
		title: "大模型与提示工程",
		count: "18 个实用词",
		description: "LLM、Token、Prompt、CoT、RAG、Embedding、向量数据库和微调影响日常使用质量。",
		href: "/docs/llm-prompting",
		tags: ["LLM", "RAG", "SFT"],
	},
	{
		title: "前沿、安全与治理",
		count: "9 个判断词",
		description: "对齐、偏差、幻觉、可解释性、涌现和规模定律决定 AI 不能只看演示效果。",
		href: "/docs/frontier",
		tags: ["Alignment", "XAI", "Scaling"],
	},
	{
		title: "生成式与多模态",
		count: "8 个能力词",
		description: "扩散模型、GAN、CLIP、CV、NeRF 和多模态解释 AI 如何处理图像与视频。",
		href: "/docs/generative-multimodal",
		tags: ["CLIP", "Diffusion", "CV"],
	},
	{
		title: "智能体、产品与公司",
		count: "8 个入口词",
		description: "Agent、Chatbot、ChatGPT、GPT-4、OpenAI、DeepMind 和框架工具要分开理解。",
		href: "/docs/agents-products",
		tags: ["Agent", "ChatGPT", "OpenAI"],
	},
	{
		title: "算力与基础设施",
		count: "8 个底座词",
		description: "算力、GPU、TPU、基础模型和 MoE 解释为什么 AI 背后是硬件和工程系统。",
		href: "/docs/infrastructure",
		tags: ["GPU", "TPU", "MoE"],
	},
] as const;
