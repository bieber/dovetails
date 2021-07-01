import {Rect} from 'react-konva';

export default function Board(props) {
	const {
		viewWidth,
		viewHeight,
		materialWidth,
		pixelsPerMM,
	} = props;

	const pxWidth = materialWidth * pixelsPerMM;

	return (
		<Rect
			x={(viewWidth - pxWidth) / 2}
			y={viewHeight * .2}
			width={pxWidth}
			height={viewHeight * .8}
			fill="#caa472"
		/>
	);
}
