import { motion } from 'framer-motion';
import useAnim from 'src/hooks/use-anim';

export default function Section({
	children,

	containerClass,
	sectionStyle,
	containerStyle,
	direction,
	sectionClass,
}) {
	const sectionClasses = `section-content ${
		direction ? direction : ' '
	} ${sectionClass}`;
	const sectionContainerClasses = `container-fluid-width ${
		containerClass ? containerClass : ''
	}`;

	const section_anim = {
		initial: {
			// y: 20,
		},
		enter: {
			// y: 0,
			transition: {
				duration: 1,
				ease: [0.76, 0, 0.24, 1],
			},
		},
		exit: {
			// y: -20,
			transition: {
				duration: 0.5,
				delay: 0.075,
				ease: [0.76, 0, 0.24, 1],
			},
		},
	};

	return (
		<motion.div
			className={sectionClasses}
			{...useAnim(section_anim)}
			style={sectionStyle}>
			<div className={sectionContainerClasses} style={{ ...containerStyle }}>
				{children}
			</div>
		</motion.div>
	);
}
