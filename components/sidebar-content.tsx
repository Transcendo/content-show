import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import {
	BookOpen,
	BrainCircuit,
	Compass,
	FileText,
	GitBranch,
	Layers3,
	LibraryBig,
	Palette,
	Radar,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import type { ReactNode, SVGProps } from "react";

export interface SubpageItem {
	title: string;
	href?: string;
	icon?: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	group?: boolean;
}

export interface ListItem {
	title: string;
	href?: string;
	icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	group?: boolean;
	separator?: boolean;
	isNew?: boolean;
	subpages?: SubpageItem[];
	/** Navigates to a non-docs URL without a docs MDX page. */
	external?: boolean;
}

interface Content {
	title: string;
	href?: string;
	/** Expand this sidebar section when pathname is this URL or a child path. */
	expandSectionForPathPrefix?: string;
	Icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	isNew?: boolean;
	list: ListItem[];
}

const chapterPage = (title: string, href: string): ListItem => ({
	title,
	href,
	icon: FileText,
});

export function getPageTree(): Root {
	return {
		$id: "root",
		name: "docs",
		children: [
			{
				type: "folder",
				root: true,
				name: "AI Knowledge",
				description: "普通人也能读懂的 AI 学习目录。",
				children: contents.map(contentToPageTree),
			},
		],
	};
}

function contentToPageTree(content: Content): Folder {
	return {
		type: "folder",
		icon: <content.Icon />,
		name: content.title,
		index: content.href
			? {
					icon: <content.Icon />,
					name: content.title,
					type: "page",
					url: content.href,
				}
			: undefined,
		children: content.list
			.filter((item) => !item.group && (item.href || item.separator))
			.filter((item) => !item.external)
			.map((item) =>
				item.separator
					? ({
							type: "separator",
							name: item.title,
						} as const)
					: ({
							type: "page",
							url: item.href!,
							name: item.title,
							icon: <item.icon />,
						} as const),
			),
	};
}

export const contents: Content[] = [
	{
		title: "开始学习",
		href: "/learn",
		expandSectionForPathPrefix: "/learn",
		Icon: Compass,
		list: [
			{
				title: "学习路线",
				href: "/learn/learning-path",
				icon: Radar,
			},
		],
	},
	{
		title: "AI 术语百科",
		href: "/glossary",
		expandSectionForPathPrefix: "/glossary",
		Icon: LibraryBig,
		isNew: true,
		list: [
			{
				title: "核心词条",
				href: "/glossary",
				icon: LibraryBig,
				isNew: true,
			},
			{
				title: "知识图谱",
				href: "/graph",
				icon: GitBranch,
			},
		],
	},
	{
		title: "AI 基础概念",
		href: "/fundamentals",
		expandSectionForPathPrefix: "/fundamentals",
		Icon: BrainCircuit,
		list: [
			chapterPage("先把层级分开", "/fundamentals/hierarchy"),
			chapterPage("两条历史路线", "/fundamentals/history-routes"),
			chapterPage("这组词", "/fundamentals/key-terms"),
		],
	},
	{
		title: "机器学习基础",
		href: "/machine-learning",
		expandSectionForPathPrefix: "/machine-learning",
		Icon: BookOpen,
		list: [
			chapterPage("建议按这 5 步读", "/machine-learning/reading-order"),
			chapterPage("第一步：先分清“机器学习”这个总框", "/machine-learning/machine-learning-frame"),
			chapterPage("第二步：再理解为什么深度学习会成为主线", "/machine-learning/deep-learning-mainline"),
			chapterPage("第三步：用三种学习方式理解“模型是怎么学的”", "/machine-learning/learning-paradigms"),
			chapterPage("第四步：别急着看训练分数，先看它能不能泛化", "/machine-learning/generalization"),
			chapterPage("第五步：最后用过拟合判断模型为什么会翻车", "/machine-learning/overfitting"),
			chapterPage("如果你只想知道这组词为什么重要", "/machine-learning/why-it-matters"),
			chapterPage("继续往下读", "/machine-learning/reading-next"),
			chapterPage("这组词", "/machine-learning/key-terms"),
		],
	},
	{
		title: "模型与训练机制",
		href: "/model-mechanisms",
		expandSectionForPathPrefix: "/model-mechanisms",
		Icon: Layers3,
		list: [
			chapterPage("先抓住整条链路", "/model-mechanisms/whole-chain"),
			chapterPage("建议按这 4 步读", "/model-mechanisms/reading-order"),
			chapterPage("第一步：先把“模型结构”看明白", "/model-mechanisms/model-structure"),
			chapterPage("第二步：再理解注意力为什么这么关键", "/model-mechanisms/attention"),
			chapterPage("第三步：模型是怎么从“答错”里学习的", "/model-mechanisms/learning-from-errors"),
			chapterPage("第四步：训练和推理不是一回事", "/model-mechanisms/training-vs-inference"),
			chapterPage("普通人为什么值得懂这页", "/model-mechanisms/why-it-matters"),
			chapterPage("最容易混淆的 4 组关系", "/model-mechanisms/common-confusions"),
			chapterPage("继续往下读", "/model-mechanisms/reading-next"),
			chapterPage("这组词", "/model-mechanisms/key-terms"),
		],
	},
	{
		title: "大模型与提示工程",
		href: "/llm-prompting",
		expandSectionForPathPrefix: "/llm-prompting",
		Icon: Sparkles,
		list: [
			chapterPage("四类问题判断表", "/llm-prompting/problem-map"),
			chapterPage("Prompt Engineering 解决什么", "/llm-prompting/prompt-engineering"),
			chapterPage("RAG 解决什么", "/llm-prompting/rag"),
			chapterPage("Embedding 和 Vector Database 解决什么", "/llm-prompting/embedding-vector-database"),
			chapterPage("Fine-Tuning 解决什么", "/llm-prompting/fine-tuning"),
			chapterPage("SFT / RLHF / DPO / PPO 先怎么理解", "/llm-prompting/preference-optimization"),
			chapterPage("提示词、RAG、微调怎么选", "/llm-prompting/how-to-choose"),
			chapterPage("常见误解", "/llm-prompting/misconceptions"),
			chapterPage("继续阅读顺序", "/llm-prompting/reading-next"),
			chapterPage("这组词", "/llm-prompting/key-terms"),
		],
	},
	{
		title: "生成式与多模态",
		href: "/generative-multimodal",
		expandSectionForPathPrefix: "/generative-multimodal",
		Icon: Palette,
		list: [
			chapterPage("三个入口", "/generative-multimodal/three-entry-points"),
			chapterPage("质量判断要回到任务", "/generative-multimodal/quality-judgment"),
			chapterPage("这组词", "/generative-multimodal/key-terms"),
		],
	},
	{
		title: "智能体、产品与公司",
		href: "/agents-products",
		expandSectionForPathPrefix: "/agents-products",
		Icon: Radar,
		list: [
			chapterPage("先分清四种对象", "/agents-products/four-objects"),
			chapterPage("Agent 为什么单独放一类", "/agents-products/why-agent-matters"),
			chapterPage("这组词", "/agents-products/key-terms"),
		],
	},
	{
		title: "前沿、安全与治理",
		href: "/frontier",
		expandSectionForPathPrefix: "/frontier",
		Icon: ShieldCheck,
		list: [
			chapterPage("这页先抓住四条线", "/frontier/four-lines"),
			chapterPage("为什么普通人也要关心", "/frontier/why-it-matters"),
			chapterPage("这组词", "/frontier/key-terms"),
		],
	},
	{
		title: "算力与基础设施",
		href: "/infrastructure",
		expandSectionForPathPrefix: "/infrastructure",
		Icon: Layers3,
		list: [
			chapterPage("三个层次", "/infrastructure/three-layers"),
			chapterPage("为什么它会影响普通人", "/infrastructure/why-it-matters"),
			chapterPage("这组词", "/infrastructure/key-terms"),
		],
	},
	{
		title: "资料与来源",
		href: "/resources",
		expandSectionForPathPrefix: "/resources",
		Icon: LibraryBig,
		list: [
			{
				title: "资料来源清单",
				href: "/resources/source-list",
				icon: FileText,
			},
		],
	},
];
