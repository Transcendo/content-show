import { HomeLayout } from "fumadocs-ui/layouts/home";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { ConceptGraph } from "@/components/concept-graph";
import { GlobalSearchButton } from "@/components/global-search-button";
import {
	docsLayoutProps,
	featuredTerms,
	knowledgeAreas,
	learningTracks,
} from "@/lib/site-config";

const heroImage =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/960px-Colored_neural_network.svg.png";

export default function HomePage() {
	return (
		<HomeLayout
			{...docsLayoutProps}
			className="min-h-dvh bg-[#f6f7f5] text-[#11140f] dark:bg-[#10130f] dark:text-[#f4f6ee]"
		>
			<main className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-10 pb-14 sm:px-6 sm:pt-12 sm:pb-16">
				<section className="grid gap-10 py-8 sm:py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
					<div className="max-w-3xl">
						<p className="inline-flex items-center gap-2 border border-[#11140f]/15 bg-white px-3 py-1 text-xs font-medium uppercase text-[#315f4a] shadow-sm dark:border-white/15 dark:bg-white/8 dark:text-[#8bd8ae]">
							<span className="size-1.5 bg-[#27ae60]" />
							AI Knowledge for Everyone
						</p>
						<h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.06] sm:text-6xl">
							把普通人也能学懂的 AI 知识，整理成一条清楚的学习路线。
						</h1>
						<p className="mt-6 max-w-2xl text-base leading-7 text-[#485147] sm:text-lg dark:text-[#c9d0c4]">
							Content Show 不做技术黑话堆叠。先解释高频名词，再串起模型、工具、应用、资源和治理问题，帮助你判断 AI 到底能帮自己做什么。
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								className="inline-flex items-center gap-2 bg-[#11140f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2c3329]"
								href="/learn/learning-path"
							>
								从学习路线开始
								<ArrowRight className="size-4" />
							</Link>
							<Link
								className="inline-flex items-center gap-2 border border-[#11140f]/20 bg-white px-5 py-3 text-sm font-medium transition hover:border-[#11140f]/45 dark:border-white/20 dark:bg-white/8"
								href="/glossary"
							>
								查看术语百科
							</Link>
							<GlobalSearchButton>全站搜索</GlobalSearchButton>
							<a
								className="inline-flex items-center gap-2 border border-transparent px-5 py-3 text-sm font-medium text-[#485147] transition hover:text-[#11140f] dark:text-[#c9d0c4] dark:hover:text-white"
								href="https://github.com/Transcendo/content-show"
								rel="noreferrer noopener"
								target="_blank"
							>
								<svg
									aria-hidden="true"
									className="size-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
								</svg>
								GitHub
							</a>
						</div>
						<div className="mt-7 grid gap-3 text-sm text-[#485147] sm:grid-cols-3 dark:text-[#c9d0c4]">
							<div className="flex items-center gap-2">
								<Sparkles className="size-4 text-[#2f9e44]" />
								从名词开始
							</div>
							<div className="flex items-center gap-2">
								<BookOpen className="size-4 text-[#d99200]" />
								按学习路径阅读
							</div>
							<div className="flex items-center gap-2">
								<ShieldCheck className="size-4 text-[#be3a34]" />
								区分事实与判断
							</div>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -left-5 top-5 h-20 w-20 border-2 border-[#f0c419]" />
						<div className="absolute -right-3 bottom-16 h-16 w-16 bg-[#e84d3d]" />
						<div className="relative border border-[#11140f]/12 bg-[#10130f] p-5 shadow-[16px_16px_0_#f0c419] dark:border-white/15">
							<img
								alt="Colored neural network diagram"
								className="aspect-[4/3] w-full object-contain"
								src={heroImage}
							/>
							<div className="border-t border-white/15 pt-4 text-white">
								<p className="text-xs uppercase text-[#8bd8ae]">
									Term Map
								</p>
								<p className="mt-2 text-2xl font-semibold">
									先把词放对位置，再决定该深入哪条线。
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="border-t border-[#11140f]/12 py-10 dark:border-white/12">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-sm font-medium text-[#be3a34]">名词入口</p>
							<h2 className="mt-2 text-3xl font-semibold">
								先从截图里的 99 个 AI 高频词开始。
							</h2>
						</div>
						<Link
							className="inline-flex items-center gap-2 text-sm font-medium text-[#315f4a] hover:text-[#11140f] dark:text-[#8bd8ae] dark:hover:text-white"
							href="/glossary"
						>
							进入术语百科
							<ArrowRight className="size-4" />
						</Link>
					</div>
					<div className="mt-6 flex flex-wrap gap-2">
						{featuredTerms.map((term) => (
							<span
								className="border border-[#11140f]/14 bg-white px-3 py-2 text-sm font-medium shadow-sm dark:border-white/12 dark:bg-white/8"
								key={term}
							>
								{term}
							</span>
						))}
					</div>
				</section>

				<ConceptGraph />

				<section className="grid gap-4 py-10 md:grid-cols-3">
					{learningTracks.map((track) => (
						<Link
							className="group border border-[#11140f]/12 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#11140f]/35 dark:border-white/12 dark:bg-white/7"
							href={track.href}
							key={track.title}
						>
							<p className="text-sm font-semibold text-[#d99200]">
								{track.index}
							</p>
							<h2 className="mt-6 text-xl font-semibold">{track.title}</h2>
							<p className="mt-3 text-sm leading-6 text-[#596157] dark:text-[#c9d0c4]">
								{track.description}
							</p>
							<span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#315f4a] group-hover:text-[#11140f] dark:text-[#8bd8ae] dark:group-hover:text-white">
								进入
								<ArrowRight className="size-4" />
							</span>
						</Link>
					))}
				</section>

				<section className="py-10">
					<div className="grid gap-4 lg:grid-cols-2">
						{knowledgeAreas.map((area) => (
							<Link
								className="grid gap-5 border border-[#11140f]/12 bg-white p-6 transition hover:border-[#11140f]/35 md:grid-cols-[1fr_auto] dark:border-white/12 dark:bg-white/7"
								href={area.href}
								key={area.title}
							>
								<div>
									<p className="text-sm font-medium text-[#be3a34]">
										{area.count}
									</p>
									<h2 className="mt-2 text-2xl font-semibold">{area.title}</h2>
									<p className="mt-3 text-sm leading-6 text-[#596157] dark:text-[#c9d0c4]">
										{area.description}
									</p>
								</div>
								<div className="flex flex-wrap content-start gap-2 md:max-w-44 md:justify-end">
									{area.tags.map((tag) => (
										<span
											className="border border-[#11140f]/10 bg-[#f6f7f5] px-2.5 py-1 text-xs font-medium dark:border-white/12 dark:bg-white/8"
											key={tag}
										>
											{tag}
										</span>
									))}
								</div>
							</Link>
						))}
					</div>
				</section>
			</main>
		</HomeLayout>
	);
}
