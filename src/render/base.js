export default function renderBase(state, buffer, innerPath) {
	const {general: {material: {thickness, width: materialWidth}}} = state;

	const totalWidth = materialWidth + 2 * buffer;
	const totalHeight = thickness + 2 * buffer;

	return `
		<svg
			version="1.1"
			baseProfile="full"
			width="${totalWidth}mm"
			height="${totalHeight}mm"
			viewBox="0 0 ${totalWidth} ${totalHeight}"
			xmlns="http://www.w3.org/2000/svg">
			<style>
				.guide {
					fill: none;
					stroke: #0068ffff;
					stroke-width: 0.5;
				}
				.pocket {
					fill: #7f7f7fff;
					stroke: none;
				}
			</style>
			<rect
				class="guide"
				x="0"
				y="0"
				width="${totalWidth}"
				height="${totalHeight}"
			/>
			<g transform="translate(${buffer},${buffer})">
				${innerPath}
			</g>
			<rect
				class="guide"
				x="${buffer}"
				y="${buffer}"
				width="${materialWidth}"
				height="${thickness}"
			/>
		</svg>
	`;
}
