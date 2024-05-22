import { motion, useScroll, useTransform } from 'framer-motion';

import { useRef } from 'react';

export default function SingleParallax({ children }) {
	const singleParallax = useRef();
	const { scrollYProgress } = useScroll({
		target: singleParallax,
		offset: ['start end', 'end start'],
	});

	let yValues = useTransform(scrollYProgress, [0, 1], [`-5%`, `5%`]);

	return (
		<motion.div className='single-parallax' ref={singleParallax}>
			<motion.div
				initial={{
					height: '110%',
					width: '110%',
				}}
				style={{
					y: yValues,
				}}>
				{children}
			</motion.div>
		</motion.div>
	);
}
