import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PiArrowUpRightBold } from 'react-icons/pi';
import './filewidget.scss';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FileWidget({ title, link }) {
	const ref = useRef();
	const [visible, setVisible] = useState(true);
	const { scrollYProgress } = useScroll();
	const [adjustment, setAdjustment] = useState('0px');

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (latest > 0.05) setVisible(false);
		else setVisible(true);

		let privacy = document.querySelector('.privacy-statement');
		if (!privacy) return;

		setAdjustment(`${privacy.offsetHeight}px`);
	});

	useEffect(() => {
		let privacy = document.querySelector('.privacy-statement');
		if (!privacy) return;

		setAdjustment(`${privacy.offsetHeight}px`);
		// privacy.style.setProperty('--privacy-adjustment', '5rem');
	}, []);
	return (
		<motion.div
			ref={ref}
			animate={visible ? 'enter' : 'initial'}
			variants={{
				initial: {
					y: '25%',
					// bottom: adjustment,
					opacity: 0,
				},
				enter: {
					y: '0%',
					opacity: 1,
				},
			}}
			className='file-widget'>
			<Link to={link}>
				<h5 className='file-widget_title'>
					<span>{title}</span>

					<PiArrowUpRightBold size={`1.5rem`} />
				</h5>
			</Link>
		</motion.div>
	);
}
