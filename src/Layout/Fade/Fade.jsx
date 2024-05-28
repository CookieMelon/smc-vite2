import { motion } from 'framer-motion';
import useAnim from 'src/hooks/use-anim';
import { fadeVariants } from './anim';

import { useContext } from 'react';

import { ThemeContext } from 'src/App';

export default function Fade({ children, customStyle }) {
	const { smcTheme } = useContext(ThemeContext);

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
