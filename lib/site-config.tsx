import type { LinkItemType } from "fumadocs-ui/layouts/shared";

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
		text: "核心概念",
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
		title: siteName,
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
	"CLIP",
	"CNN",
	"CV",
	"ChatGPT",
	"Chatbot",
] as const;

export const learningTracks = [
	{
		title: "先建立 AI 常识",
		description: "从 AI、ANI、AGI、ASI、AIGC 这些高频词开始，先把讨论里的基本坐标弄清楚。",
		href: "/docs/fundamentals",
		index: "01",
	},
	{
		title: "再理解模型能力",
		description: "把大模型、提示词、Token、Attention、RAG、Agent 放在同一条工作链里理解。",
		href: "/docs/models-and-agents",
		index: "02",
	},
	{
		title: "最后进入应用场景",
		description: "按写作、图像、视频、音乐、数字人、编程和工作流来判断 AI 能帮你做什么。",
		href: "/docs/creative-ai",
		index: "03",
	},
] as const;

export const knowledgeAreas = [
	{
		title: "核心概念",
		count: "5 个基础词",
		description: "AI、ANI、AGI、ASI、AIGC 是最容易混在一起的入口词，先把边界讲清楚。",
		href: "/docs/fundamentals",
		tags: ["AI", "AGI", "ASI"],
	},
	{
		title: "模型与智能体",
		count: "8 个机制词",
		description: "大模型不是魔法，先理解输入、注意力、训练、检索、工具调用和智能体。",
		href: "/docs/models-and-agents",
		tags: ["LLM", "Attention", "Agent"],
	},
	{
		title: "生成式应用",
		count: "6 类工具",
		description: "AIGC 的价值要回到真实任务：写东西、做图、剪视频、生成声音和搭工作流。",
		href: "/docs/creative-ai",
		tags: ["AI 绘画", "AI 视频", "ComfyUI"],
	},
	{
		title: "前沿与治理",
		count: "4 条观察线",
		description: "对齐、法规、硬件、具身智能和商业化决定 AI 不只是技术圈的话题。",
		href: "/docs/frontier",
		tags: ["Alignment", "法规", "硬件"],
	},
] as const;
