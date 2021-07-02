import {useRef, useState, useLayoutEffect} from 'react';
import {Stage, Layer} from 'react-konva';

import {useGuideLocations} from '../context/guideContext';
import {useGlobalContext} from '../context/globalContext';
import {usePinContext} from '../context/pinContext';

import Board from './Board';
import Guide from './Guide';
import Pin from './Pin';
import ShoulderIndicator from './ShoulderIndicator';

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

	if (!size) {
		return size;
	}
	return {width: size.width - 4, height: size.height - 4};
}


export default function Visualizer() {
	const target = useRef(null);
	const size = useSize(target);
	const [{material, cutter}] = useGlobalContext();
	const guideLocations = useGuideLocations();
	const {pins, updatePin} = usePinContext();

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

		const guides = guideLocations.map(
			(x, i, xs) => <Guide key={i} x={x} {...commonProps} />,
		);

		// Since sorting will potentially scramble up the indices, we
		// have to store the original indices before sorting for use in
		// the onChange handler
		const renderedPins = [...pins]
			.map((p, i, ps) => [i, p])
			.sort((a, b) => a[1].x - b[1].x)
			.map(
				(p, i, ps) => {
					const pin = p[1];
					let minX = pin.maxWidth / 2;
					if (i > 0) {
						const previous = ps[i - 1][1];
						minX = previous.x
							+ previous.maxWidth / 2
							+ pin.maxWidth / 2;
					}

					let maxX = material.width - pin.maxWidth / 2;
					if (i < ps.length - 1) {
						const next = ps[i + 1][1];
						maxX = next.x - next.maxWidth / 2 - pin.maxWidth / 2;
					}

					return (
						<Pin
							key={i}
							onChange={(delta) => updatePin(p[0], delta)}
							minX={minX}
							maxX={maxX}
							guides={guideLocations}
							{...pin}
							{...commonProps}
						/>
					);
				},
			);

		stage = (
			<Stage width={size.width} height={size.height}>
				<Layer>
					<Board {...commonProps} />
					{renderedPins}
					{guides}
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
