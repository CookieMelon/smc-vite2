import { motion } from 'framer-motion';

import { getColors } from 'src/hooks/use-color';

import { PiCaretRightBold } from 'react-icons/pi';

export default function PDFItem({ title, date, download, link }) {
	const { blue } = getColors;
	const nameVariants = {
		rest: {
			opacity: 1,
			x: '0rem',
		},
		hover: {
			opacity: 1,

			x: '2rem',
		},
	};

	const detailsVariants = {
		rest: {
			opacity: 1,
			x: '0rem',
		},
		hover: {
			opacity: 1,
			x: '-2rem',
		},
	};

	const buttonVariants = {
		rest: {
			opacity: 1,
			color: blue,
			borderColor: '#CBCBCB',
			backgroundColor: '#ffffff00',
		},
		hover: {
			opacity: 1,
			color: '#ffffff',
			backgroundColor: blue,
			backgroundColor: blue,
		},
	};

	const bgVariants = {
		rest: {
			opacity: 0,
			// x: 100,
		},
		hover: {
			opacity: 1,
			// x: 0,
		},
	};
	return (
		<motion.div className='pdf-item' inital='rest' whileHover='hover'>
			<a
				target='_blank'
				href={link}
				rel='noopener noreferrer'
				className='pdf-link link-cover'></a>
			<motion.div className='pdf-name' variants={nameVariants}>
				{title}
			</motion.div>
			<motion.div className='pdf-details' variants={detailsVariants}>
				{date && <span className='small-text'>{date}</span>}
				{download ? (
					<motion.div className='pdf-button' variants={buttonVariants}>
						<PiCaretRightBold size={'1.25rem'} color='currentColor' />
					</motion.div>
				) : (
					<motion.div className='pdf-button' variants={buttonVariants}>
						<PiCaretRightBold size={'1.25rem'} color='currentColor' />
					</motion.div>
				)}
			</motion.div>
			<motion.div
				className='pdf-bg'
				initial={bgVariants.rest}
				variants={bgVariants}></motion.div>
		</motion.div>
	);
}
