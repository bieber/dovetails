import {useRef, useState, useLayoutEffect} from 'react';
import {Stage, Layer} from 'react-konva';

import {useGlobalContext} from '../context/globalContext';

import Board from './Board';
import ShoulderIndicator from './ShoulderIndicator';
import Pin from './Pin';

function useSize(target) {
	const [size, setSize] = useState();
	useLayoutEffect(
		() =>  setSize(
			target.current && target.current.getBoundingClientRect(),
		),
		[target],
	);
	useLayoutEffect(
		() => {
			const elem = target.current;
			if (!elem) {
				return;
			}

			const resizeObserver = new ResizeObserver(
				() => setSize(elem.getBoundingClientRect()),
			);
			resizeObserver.observe(elem);

			return () => resizeObserver.unobserve(elem);
		},
		[target],
	);

	return size;
}


export default function Visualizer() {
	const target = useRef(null);
	const size = useSize(target);
	const [{material, cutter}] = useGlobalContext();

	let stage = null;
	if (size) {
		// We'll use two possible criteria for the mm-to-pixels
		// conversion: either cutter height is 60% of the height, or
		// board width is 80% of the width, and we go with whichever
		// gives us the fewest pixels per millimeter to ensure the board
		// and pins fit nicely in the view
		const pixelsPerMM = Math.min(
			0.6 * size.height / material.thickness,
			0.8 * size.width / material.width,
		);

		const commonProps = {
			viewWidth: size.width,
			viewHeight: size.height,
			// These have to be copied into props because the child
			// components won't have access to the global context
			// due to konva portaling them out of the main render tree
			materialWidth: material.width,
			materialThickness: material.thickness,
			cutterAngle: cutter.angle,
			pixelsPerMM,
		};
		stage = (
			<Stage width={size.width} height={size.height}>
				<Layer>
					<Board {...commonProps} />
					<Pin maxWidth={15} x={50} {...commonProps} />
					<ShoulderIndicator {...commonProps} />
				</Layer>
			</Stage>
		);
	}

	return (
		<div ref={target} className="Visualizer">
			{stage}
		</div>
	);
}
