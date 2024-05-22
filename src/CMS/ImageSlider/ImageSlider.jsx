import { useEffect, useRef, useState } from 'react';

import { motion, useScroll } from 'framer-motion';

import { PiCaretCircleLeft, PiCaretCircleRight } from 'react-icons/pi';

import { getColors } from 'src/hooks/use-color';

export default function ImageSlider({
	slides,
	adaptiveHeight = false,
	type,
	gradient = true,
	dots,
	captionPosition = '',
	arrows = true,
}) {
	const slider = useRef(null);

	return <div></div>;
}
