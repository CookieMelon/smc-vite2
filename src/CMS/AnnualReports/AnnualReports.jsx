import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getColors } from 'src/hooks/use-color';

import './annualreports.scss';

export default function AnnualReports({ slides }) {
	const { blue } = getColors;
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const text_variants = {
		initial: {
			x: '50px',
			opacity: 0,
			transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
		},
		enter: {
			x: '0',
			opacity: 1,
			transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			x: '-100px',
			opacity: 0,
			transition: {
				duration: 0.5,
				ease: [0.76, 0, 0.24, 1],
				opacity: {
					duration: 0.25,
				},
			},
		},
	};

	const getDistance = (index, current) => {
		return Math.abs(current - index);
	};

	const zindex = slides.map((slide, index) => {
		return slides.length - index;
	});

	const z = slides.map((slide, index) => {
		return `-${index * 20}px`;
	});

	const rotate = slides.map((slide, index) => {
		return `${index * 20}deg`;
	});

	const o = slides.map((slide, index) => {
		if (index == 0) return 1;
		if (index > 2) return 0;
		return 1 - index / 3;
	});

	const x = slides.map((slide, index) => {
		if (index == 0) return 1;
		if (index > 2) return 0;
		return 1 - index / 3;
	});
	return (
		<>
			{slides.map((slide, index) => {
				let featured = false;
				if (index === 0) featured = true;
				return <ARItem key={`ar-${index}`} featured={featured} slide={slide} />;
			})}
		</>
	);
}

function ARItem({ featured, slide }) {
	console.log(slide);
	let classes = featured ? 'ar-featured' : 'ar-item';
	let column = featured ? 'full' : '';
	return (
		<div className={`${column} column`}>
			<div className={`${classes} ar-item`}>
				<div className='img-container'>
					<Link to={slide.link} target='_blank'>
						<img {...slide.img} />
					</Link>
				</div>
				<div className='desc-container'>
					<motion.h5 className='heading-5 year'>{slide.subtitle}</motion.h5>
					{featured && (
						<motion.h3 className='annual-title heading-2'>
							{slide.title}
						</motion.h3>
					)}
					{featured && slide.desc && (
						<motion.div>
							{parse(slide.desc)}
							<motion.p>
								<Link
									to={slide.link}
									target='_blank'
									className={'btn btn-bordered pri-btn'}>
									Learn more
								</Link>
							</motion.p>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}
