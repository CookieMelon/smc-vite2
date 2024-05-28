import { motion, useInView, inView } from 'framer-motion';
import { useRef } from 'react';

export default function Column({
	columnClasses = '',
	columnStyle = {},
	children,
}) {
	const columnClass = `column ${columnClasses}`;
	const column = useRef();
	const inView = useInView(column);
	const columnVariants = {
		initial: {
			opacity: 0,
			y: 35,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div
			initial='initial'
			whileInView='animate'
			variants={columnVariants}
			viewport={{ once: true, amount: 0.05 }}
			className={columnClass}
			style={{ ...columnStyle }}
			ref={column}>
			{children}
		</motion.div>
	);
}
