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
		minX,
		maxX,
		guides,
		onChange,
	} = props;

	const pxBoardWidth = materialWidth * pixelsPerMM;
	const pxBoardStart = (viewWidth - pxBoardWidth) / 2;
	const pxMaxWidth = maxWidth * pixelsPerMM;

	function draw(context, shape) {
		const angleRad = 2 * cutterAngle * Math.PI / 360;
		const minWidth = maxWidth - (
			2 * materialThickness * Math.tan(angleRad)
		);
		const pxMinWidth = minWidth * pixelsPerMM;
		const pxHeight = materialThickness * pixelsPerMM;

		context.beginPath();
		context.moveTo(-0.5 * pxMinWidth, 0);
		context.lineTo(0.5 * pxMinWidth, 0);
		context.lineTo(0.5 * pxMaxWidth, pxHeight);
		context.lineTo(-0.5 * pxMaxWidth, pxHeight);
		context.closePath();

		context.fillStrokeShape(shape);
	}

	function dragBound({x: dragX}) {
		const pxGuides = guides.map(
			(g, i, gs) => g * pixelsPerMM + pxBoardStart,
		);
		for (const guide of pxGuides) {
			if (Math.abs(dragX - guide) < 7) {
				dragX = guide;
			}
			if (Math.abs(dragX - (pxMaxWidth / 2) - guide) < 7) {
				dragX = guide + pxMaxWidth / 2;
			}
			if (Math.abs(dragX + (pxMaxWidth / 2) - guide) < 7) {
				dragX = guide - pxMaxWidth / 2;
			}
		}

		const pxMinX = pxBoardStart + minX * pixelsPerMM;
		const pxMaxX = pxBoardStart + maxX * pixelsPerMM;
		const x = Math.min(Math.max(dragX, pxMinX), pxMaxX);

		return {x , y: viewHeight * .2};
	}

	function onDragEnd({target}) {
		onChange({x: (target.attrs.x - pxBoardStart) / pixelsPerMM});
	}

	return (
		<Shape
			x={pxBoardStart + x * pixelsPerMM}
			y={viewHeight * .2}
			sceneFunc={draw}
			fill="white"
			draggable
			dragBoundFunc={dragBound}
			onDragEnd={onDragEnd}
		/>
	);
}
