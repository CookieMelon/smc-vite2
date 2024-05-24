import useAnim from 'src/hooks/use-anim';
import { motion } from 'framer-motion';
import { fadeVariants } from './anim';

import { useContext, useEffect } from 'react';

import { ThemeContext } from 'src/App';

export default function Fade({ children, customStyle }) {
	const { smcTheme } = useContext(ThemeContext);

	// useEffect(() => {
	// 	const lenis = new Lenis();

	// 	const raf = (time) => {
	// 		lenis.raf(time);

	// 		requestAnimationFrame(raf);
	// 	};

	// 	requestAnimationFrame(raf);
	// }, []);

	return (
		<motion.div
			className={`fade ${smcTheme}`}
			style={{
				...{
					transformOrigin: 'center top',
				},
				...customStyle,
			}}
			{...useAnim(fadeVariants)}>
			{children}
		</motion.div>
	);
}
