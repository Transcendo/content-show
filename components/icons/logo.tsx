import Image, { type ImageProps } from "next/image";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type ContentShowLogoProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height"
> & {
	alt?: string;
};

export const ContentShowLogo = ({
	className,
	alt = "",
	...props
}: ContentShowLogoProps) => {
	return (
		<Image
			{...props}
			src="/branding/djd.png"
			alt={alt}
			width={512}
			height={512}
			priority
			className={cn("size-8 rounded-sm object-contain", className)}
		/>
	);
};

export const Logo = ContentShowLogo;

export const LogoStroke = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			{...props}
			className={cn("size-7 w-7", className)}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="7"
				y="7"
				width="50"
				height="50"
				rx="8"
				stroke="currentColor"
				strokeWidth="3"
			/>
			<path
				d="M15 19h4c6.4 0 10.2 1.7 13 5.1 2.8-3.4 6.6-5.1 13-5.1h4v23h-4c-6.4 0-10.2 1.6-13 4.8-2.8-3.2-6.6-4.8-13-4.8h-4V19Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="3"
			/>
			<path d="M32 24v22" stroke="currentColor" strokeWidth="2" />
			<circle cx="44" cy="26" r="3" fill="currentColor" />
		</svg>
	);
};

export const BetterAuthLogo = ContentShowLogo;
