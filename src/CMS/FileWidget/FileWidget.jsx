import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { PiArrowUpRightBold } from 'react-icons/pi';
import './filewidget.scss';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FileWidget({ title, link }) {
	const [visible, setVisible] = useState(true);
	const { scrollYProgress } = useScroll();

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (latest > 0.05) setVisible(false);
		else setVisible(true);
	});

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					animate={{
						y: '0%',
						opacity: 1,
					}}
					initial={{
						y: '25%',
						opacity: 0,
					}}
					exit={{
						y: '25%',
						opacity: 0,
					}}
					className='file-widget'>
					<Link to={link}>
						<h5 className='file-widget_title'>
							<span>{title}</span>

							<PiArrowUpRightBold size={`1.5rem`} />
						</h5>
					</Link>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
