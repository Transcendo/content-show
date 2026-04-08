import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex min-h-dvh items-center justify-center p-6 text-center">
			<div className="space-y-3">
				<h1 className="text-lg font-medium">Open AI Knowledge</h1>
				<p className="text-sm text-muted-foreground">
					Open the documentation at{" "}
					<Link className="underline" href="/docs/ai-knowledge/asi">
						/docs/ai-knowledge/asi
					</Link>
					.
				</p>
			</div>
		</main>
	);
}
