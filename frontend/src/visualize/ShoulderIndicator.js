import {Line} from 'react-konva';

export default function ShoulderIndicator(props) {
	const {
		width: viewWidth,
		height: viewHeight,
		materialWidth,
		materialThickness,
		pixelsPerMM,
	} = props;

	const pxWidth = materialWidth * pixelsPerMM;

	return (
		<Line
			x={(viewWidth - pxWidth) / 2}
			y={viewHeight * .2 + materialThickness * pixelsPerMM}
			points={[0, 0, pxWidth, 0]}
			stroke="black"
			dash={[10, 5]}
			dashEnabled
		/>
	);
}
