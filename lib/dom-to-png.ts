export interface DomToPngOptions {
	backgroundColor?: string;
	canvasWidth?: number;
	canvasHeight?: number;
	pixelRatio?: number;
}

function inlineComputedStyles(source: Element, target: Element) {
	const computed = window.getComputedStyle(source);
	const targetEl = target as HTMLElement;

	for (const property of computed) {
		targetEl.style.setProperty(
			property,
			computed.getPropertyValue(property),
			computed.getPropertyPriority(property),
		);
	}

	const sourceChildren = Array.from(source.children);
	const targetChildren = Array.from(target.children);

	for (let i = 0; i < sourceChildren.length; i++) {
		const sourceChild = sourceChildren[i];
		const targetChild = targetChildren[i];
		if (sourceChild && targetChild) inlineComputedStyles(sourceChild, targetChild);
	}
}

export async function domToPng(
	node: HTMLElement,
	options: DomToPngOptions = {},
) {
	const scale = options.pixelRatio ?? 2;
	const rect = node.getBoundingClientRect();
	const width = options.canvasWidth ?? Math.ceil(rect.width || node.scrollWidth);
	const height =
		options.canvasHeight ?? Math.ceil(rect.height || node.scrollHeight);
	const clone = node.cloneNode(true) as HTMLElement;

	clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
	clone.style.width = `${width}px`;
	clone.style.minHeight = `${height}px`;
	clone.style.boxSizing = "border-box";
	inlineComputedStyles(node, clone);

	const serialized = new XMLSerializer().serializeToString(clone);
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
			<foreignObject width="100%" height="100%">
				${serialized}
			</foreignObject>
		</svg>
	`;
	const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
	const image = new Image();
	image.decoding = "async";
	image.src = svgUrl;
	await image.decode();

	const canvas = document.createElement("canvas");
	canvas.width = width * scale;
	canvas.height = height * scale;

	const context = canvas.getContext("2d");
	if (!context) throw new Error("Canvas 2D context is unavailable.");

	context.scale(scale, scale);
	context.fillStyle = options.backgroundColor ?? "#ffffff";
	context.fillRect(0, 0, width, height);
	context.drawImage(image, 0, 0, width, height);

	return canvas.toDataURL("image/png");
}
