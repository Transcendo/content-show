import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import {
	BookOpen,
	BrainCircuit,
	Compass,
	FileText,
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
		href: "/docs/learn",
		expandSectionForPathPrefix: "/docs/learn",
		Icon: Compass,
		list: [
			{
				title: "学习路线",
				href: "/docs/learn/learning-path",
				icon: Radar,
			},
			{
				title: "名词速查",
				href: "/docs/learn/glossary",
				icon: LibraryBig,
				isNew: true,
			},
		],
	},
	{
		title: "核心概念",
		href: "/docs/fundamentals",
		expandSectionForPathPrefix: "/docs/fundamentals",
		Icon: BrainCircuit,
		list: [
			{
				title: "AI / AGI / ANI",
				href: "/docs/fundamentals/ai-agi-ani",
				icon: Sparkles,
			},
			{
				title: "AIGC",
				href: "/docs/ai-card/aigc",
				icon: BookOpen,
			},
			{
				title: "ASI",
				href: "/docs/ai-card/asi",
				icon: BookOpen,
			},
		],
	},
	{
		title: "模型与智能体",
		href: "/docs/models-and-agents",
		expandSectionForPathPrefix: "/docs/models-and-agents",
		Icon: Layers3,
		list: [
			{
				title: "大模型怎么工作",
				href: "/docs/models-and-agents/how-models-work",
				icon: BrainCircuit,
			},
			{
				title: "智能体入门",
				href: "/docs/models-and-agents/agents",
				icon: Radar,
			},
		],
	},
	{
		title: "生成式应用",
		href: "/docs/creative-ai",
		expandSectionForPathPrefix: "/docs/creative-ai",
		Icon: Palette,
		list: [
			{
				title: "图像、视频与音乐",
				href: "/docs/creative-ai/media",
				icon: Sparkles,
			},
			{
				title: "工作流与 ComfyUI",
				href: "/docs/creative-ai/workflows",
				icon: Layers3,
			},
		],
	},
	{
		title: "资料与来源",
		href: "/docs/resources",
		expandSectionForPathPrefix: "/docs/resources",
		Icon: LibraryBig,
		list: [
			{
				title: "资料来源清单",
				href: "/docs/resources/source-list",
				icon: FileText,
			},
			{
				title: "AI 资源库",
				href: "/docs/ai-resources",
				icon: LibraryBig,
			},
		],
	},
	{
		title: "前沿与治理",
		href: "/docs/frontier",
		expandSectionForPathPrefix: "/docs/frontier",
		Icon: ShieldCheck,
		list: [
			{
				title: "对齐、安全与法规",
				href: "/docs/frontier/alignment-governance",
				icon: ShieldCheck,
			},
			{
				title: "硬件、具身智能与商业化",
				href: "/docs/frontier/hardware-commercialization",
				icon: Radar,
			},
		],
	},
];
