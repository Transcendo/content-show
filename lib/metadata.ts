import type { Metadata } from "next";

const productionSiteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.GITHUB_ACTIONS === "true"
		? "https://transcendo.github.io/content-show"
		: "https://ai.eggcampus.com");

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		metadataBase: baseUrl,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://transcendo.github.io/content-show",
			images: "/og.png",
			siteName: "AI知路",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "/og.png",
			...override.twitter,
		},
		icons: {
			icon: [
				{
					url: "/favicon/djd.png",
					sizes: "512x512",
					type: "image/png",
				},
				{ url: "/favicon/djd.ico", sizes: "any" },
			],
			apple: "/favicon/djd.png",
		},
		manifest: "/favicon/site.webmanifest",
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(productionSiteUrl);
