import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";

const fontSans = localFont({
	src: "../assets/Geist.ttf",
	variable: "--font-sans",
});

const fontMono = localFont({
	src: "../assets/GeistMono.ttf",
	variable: "--font-mono",
});

export const metadata: Metadata = createMetadata({
	title: {
		template: "%s | AI知路",
		default: "AI知路",
	},
	description: "AI知路：把高频 AI 概念、模型逻辑、工具应用和资料来源整理成清楚的学习路线。",
});

export default function RootLayout({ children }: { children: ReactNode }) {
	const allPages = source.getPages().map((page) => ({
		name: page.data.title,
		url: page.url,
	}));

	return (
		<html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
				suppressHydrationWarning
			>
				<Providers pages={allPages}>
					<div className="relative min-h-dvh">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
