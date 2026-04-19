import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://transcendo.github.io/content-show";
const VISIBLE_DOC_URLS = new Set([
	"/docs/learn",
	"/docs/learn/learning-path",
	"/docs/learn/glossary",
	"/docs/fundamentals",
	"/docs/fundamentals/ai-agi-ani",
	"/docs/ai-card",
	"/docs/ai-card/aigc",
	"/docs/ai-card/asi",
	"/docs/models-and-agents",
	"/docs/models-and-agents/how-models-work",
	"/docs/models-and-agents/agents",
	"/docs/creative-ai",
	"/docs/creative-ai/media",
	"/docs/creative-ai/workflows",
	"/docs/resources",
	"/docs/resources/source-list",
	"/docs/ai-resources",
	"/docs/frontier",
	"/docs/frontier/alignment-governance",
	"/docs/frontier/hardware-commercialization",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const basePages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1.0,
		},
	];

	const docPages: MetadataRoute.Sitemap = await Promise.all(
		source
			.getPages()
			.filter((page) => VISIBLE_DOC_URLS.has(page.url))
			.map(async (page) => {
				const { lastModified } = await page.data.load();
				return {
					url: `${BASE_URL}${page.url}`,
					lastModified: lastModified ? new Date(lastModified) : new Date(),
					changeFrequency: "weekly",
					priority: 0.7,
				};
			}),
	);

	return [...basePages, ...docPages];
}
