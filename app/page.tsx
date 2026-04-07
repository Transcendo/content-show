import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex min-h-dvh items-center justify-center p-6 text-center">
			<meta httpEquiv="refresh" content="0;url=/docs/introduction" />
			<div className="space-y-3">
				<h1 className="text-lg font-medium">Redirecting to documentation</h1>
				<p className="text-sm text-muted-foreground">
					If you are not redirected automatically, open{" "}
					<Link className="underline" href="/docs/introduction">
						/docs/introduction
					</Link>
					.
				</p>
			</div>
		</main>
	);
}
