import {useRef, useState, useLayoutEffect} from 'react';
import {Stage, Layer} from 'react-konva';

import {useStore} from '../context/store';
import {useGuideLocations} from '../context/guides';
import {update} from '../context/pins';

import {useLimits} from '../util/limits';

import Board from './Board';
import Guide from './Guide';
import HalfPins from './HalfPins';
import Pin from './Pin';
import ShoulderIndicator from './ShoulderIndicator';

function useSize(target: React.RefObject<HTMLDivElement>) {
	const [size, setSize] = useState<DOMRect | null>();
	useLayoutEffect(
		() => setSize(
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
	const target = useRef<HTMLDivElement>(null);
	const size = useSize(target);
	const [
		{
			general: {material, cutter},
			pins,
			halfPins,
		},
		dispatch,
	] = useStore();
	const {pins: {minSpacing}} = useLimits();
	const guideLocations = useGuideLocations();

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

		const halfPinWidth = halfPins.enabled ? halfPins.width : 0;
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

		let renderedHalfPins = null;
		if (halfPins.enabled) {
			renderedHalfPins = (
				<HalfPins width={halfPinWidth} {...commonProps} />
			);
		}

		const renderedPins = [...pins]
			.sort((a, b) => a.x - b.x)
			.map(
				(pin, i, ps) => {
					let minX = pin.maxWidth / 2
						+ halfPinWidth
						+ (halfPins.enabled ? minSpacing : 0);
					if (i > 0) {
						const previous = ps[i - 1];
						minX = previous.x
							+ previous.maxWidth / 2
							+ pin.maxWidth / 2
							+ minSpacing;
					}

					let maxX = material.width
						- pin.maxWidth / 2
						- halfPinWidth
						- (halfPins.enabled ? minSpacing : 0);
					if (i < ps.length - 1) {
						const next = ps[i + 1];
						maxX = next.x
							- next.maxWidth / 2
							- pin.maxWidth / 2
							- minSpacing;
					}

					return (
						<Pin
							key={i}
							onChange={(d) => dispatch(update(pin.id, d))}
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
					{renderedHalfPins}
					{renderedPins}
					{guides}
					<ShoulderIndicator {...commonProps} />
				</Layer>
			</Stage>
		);
	}

	return (
		<div ref={target} className="Visualizer Block">
			{stage}
		</div>
	);
}
