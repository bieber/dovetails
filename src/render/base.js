export const pocketStyle = [
	'fill:#7f7f7f;',
	'fill-opacity:1;',
	'fill-rule:nonzero;',
	'stroke:none;',
	'stroke-width:8;',
	'stroke-linejoin:round;',
	'stroke-miterlimit:10;',
	'stroke-dasharray:none;',
	'stroke-opacity:1',
].join('');

export const anchorStyle = [
	'fill:red;',
	'fill-opacity:1;',
	'fill-rule:nonzero;',
	'stroke:none;',
	'stroke-width:8;',
	'stroke-linejoin:round;',
	'stroke-miterlimit:10;',
	'stroke-dasharray:none;',
	'stroke-opacity:1',
].join('');

export const guideStyle = [
	'fill:none;',
	'fill-opacity:1;',
	'fill-rule:nonzero;',
	'stroke:#0068ff;',
	'stroke-width:0.5;',
	'stroke-linejoin:round;',
	'stroke-miterlimit:10;',
	'stroke-dasharray:none;',
	'stroke-opacity:1',
].join('');

export default function renderBase(state, buffer, anchor, innerPath) {
	const {general: {material: {thickness, width: materialWidth}}} = state;

	const totalWidth = materialWidth + 2 * buffer;
	const totalHeight = thickness + 2 * buffer;

	let anchorTranslate=[0, 0];
	switch (anchor) {
		case 'bottomleft':
			anchorTranslate = [buffer, buffer + thickness];
			break;
		case 'bottomright':
			anchorTranslate = [buffer + materialWidth, buffer + thickness];
			break;
		case 'topright':
			anchorTranslate = [buffer + materialWidth, buffer];
			break;
		case 'topleft':
			anchorTranslate = [buffer, buffer];
			break;
		default:
	}

	return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
		<svg
			version="1.1"
			baseProfile="full"
			width="${totalWidth}mm"
			height="${totalHeight}mm"
			viewBox="0 0 ${totalWidth} ${totalHeight}"
			xmlns="http://www.w3.org/2000/svg">
			<rect
				style="${guideStyle}"
				x="0"
				y="0"
				width="${totalWidth}"
				height="${totalHeight}"
			/>
			<g transform="translate(${buffer},${buffer})">
				${innerPath}
			</g>
			<rect
				style="${guideStyle}"
				x="${buffer}"
				y="${buffer}"
				width="${materialWidth}"
				height="${thickness}"
			/>
			<g transform="translate(${anchorTranslate.join(',')})">
				<polygon style="${anchorStyle}" points="0,0 0,-5 2,0" />
			</g>
		</svg>
	`;
}
