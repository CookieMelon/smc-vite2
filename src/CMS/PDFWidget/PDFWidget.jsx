import { motion } from 'framer-motion';

import { PiArrowUpRightBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { getColors } from 'src/hooks/use-color';

const captcha_key = import.meta.env.VITE_API_CaptchaKey;

export default function PDFWidget({
	title,
	subtitle,
	link,
	headingSize = 'heading-5',
}) {
	const { red, baseBlack, blue } = getColors;

	const widgetVariants = {
		rest: {
			scale: 1,
			color: baseBlack,
			background: '#fafafa',
			// background: '#ffffff00',
		},
		hover: {
			color: '#ffffff',
			background: blue,
			transition: {
				duration: 0.15,
			},
			// background: red,
		},
		tap: {
			scale: 0.9,
			color: '#ffffff',
		},
	};

	const buttonVariant = {
		rest: {
			color: blue,
			borderColor: blue,
		},
		hover: {
			color: '#ffffff',
			borderColor: '#ffffff',
		},
	};

	const widgetBg_variants = {
		rest: {
			top: '100%',
			borderRadius: '90%',
			transition: {
				duration: 0.35,
			},
		},
		hover: {
			top: '-75%',
			borderRadius: '90%',
			transition: {
				duration: 0.35,
			},
		},
	};

	return (
		<motion.div
			className='pdf-widget'
			initial='rest'
			whileHover='hover'
			whileTap='tap'
			variants={widgetVariants}>
			{link && (
				<Link
					to={link}
					target='_blank'
					rel='noopener noreferrer'
					className='link-cover'></Link>
			)}

			<motion.h3
				className={`${headingSize} pdf-widget-title`}
				variants={{
					hover: {
						color: 'white',
					},
				}}>
				{title}
				<br />
				<span>{subtitle}</span>
			</motion.h3>
			<motion.div className='pdf-widget-link' variants={buttonVariant}>
				<PiArrowUpRightBold size={`1rem`} />
			</motion.div>
		</motion.div>
	);
}
