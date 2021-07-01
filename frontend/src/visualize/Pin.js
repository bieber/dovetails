import {Shape} from 'react-konva';

export default function Pin(props) {
	const {
		viewWidth,
		viewHeight,
		materialWidth,
		materialThickness,
		pixelsPerMM,
		cutterAngle,
		maxWidth,
		x,
	} = props;

	const pxBoardWidth = materialWidth * pixelsPerMM;

	function draw(context, shape) {
		const angleRad = 2 * cutterAngle * Math.PI / 360;
		const minWidth = maxWidth - (
			2 * (materialThickness + 1) * Math.tan(angleRad)
		);
		const pxMaxWidth = maxWidth * pixelsPerMM;
		const pxMinWidth = minWidth * pixelsPerMM;
		const pxHeight = materialThickness * pixelsPerMM;

		context.beginPath();
		context.moveTo(-0.5 * pxMinWidth, -pixelsPerMM);
		context.lineTo(0.5 * pxMinWidth, -pixelsPerMM);
		context.lineTo(0.5 * pxMaxWidth, pxHeight);
		context.lineTo(-0.5 * pxMaxWidth, pxHeight);
		context.closePath();

		context.fillStrokeShape(shape);
	}

	return (
		<Shape
			x={(viewWidth - pxBoardWidth) / 2 + x * pixelsPerMM}
			y={viewHeight * .2}
			sceneFunc={draw}
			fill="white"
			draggable
			dragBoundFunc={(pos) => ({x: pos.x, y: viewHeight * .2})}
		/>
	);
}
