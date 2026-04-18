import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://transcendo.github.io/content-show";
const VISIBLE_DOC_PREFIXES = [
	"/docs/learn",
	"/docs/fundamentals",
	"/docs/models-and-agents",
	"/docs/creative-ai",
	"/docs/resources",
	"/docs/frontier",
	"/docs/ai-card",
	"/docs/ai-resources",
];

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
		source.getPages().filter((page) =>
			VISIBLE_DOC_PREFIXES.some(
				(prefix) => page.url === prefix || page.url.startsWith(`${prefix}/`),
			),
		).map(async (page) => {
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
