import {Shape} from 'react-konva';
import Konva from 'konva';

type Props = {
	viewWidth: number,
	viewHeight: number,
	materialWidth: number,
	materialThickness: number,
	pixelsPerMM: number,
	cutterAngle: number,
	width: number,
};
export default function Pin(props: Props) {
	const {
		viewWidth,
		viewHeight,
		materialWidth,
		materialThickness,
		pixelsPerMM,
		cutterAngle,
		width,
	} = props;

	const pxBoardWidth = materialWidth * pixelsPerMM;
	const pxBoardStart = (viewWidth - pxBoardWidth) / 2;
	const pxMaxWidth = width * pixelsPerMM;

	function draw(context: Konva.Context, shape: Konva.Shape) {
		const angleRad = 2 * cutterAngle * Math.PI / 360;
		const minWidth = width - (materialThickness * Math.tan(angleRad));
		const pxMinWidth = minWidth * pixelsPerMM;
		const pxHeight = materialThickness * pixelsPerMM;

		context.beginPath();
		context.moveTo(-1, 0);
		context.lineTo(pxMinWidth, 0);
		context.lineTo(pxMaxWidth, pxHeight);
		context.lineTo(-1, pxHeight);
		context.closePath();
		context.fillStrokeShape(shape);
	}

	return (
		<>
			<Shape
				x={pxBoardStart}
				y={viewHeight * .2}
				sceneFunc={draw}
				fill="white"
			/>
			<Shape
				scaleX={-1}
				x={pxBoardStart + pxBoardWidth}
				y={viewHeight * .2}
				sceneFunc={draw}
				fill="white"
			/>
		</>
	);
}
