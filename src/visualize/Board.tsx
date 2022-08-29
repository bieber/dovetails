import {Rect} from 'react-konva';

type Props = {
	viewWidth: number,
	viewHeight: number,
	materialWidth: number,
	pixelsPerMM: number,
};
export default function Board(props: Props) {
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
