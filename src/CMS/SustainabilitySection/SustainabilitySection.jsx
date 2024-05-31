import { motion, useScroll, useTransform } from 'framer-motion';

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import parse from 'html-react-parser';

export default function SustainabilitySection({ images, desc, label, link }) {
	const cta = useRef();
	const { scrollYProgress } = useScroll({
		target: cta,
		offset: ['start end', 'end start'],
	});

	let yValues = [
		useTransform(scrollYProgress, [0, 1], ['0%', `${(0 * 25) / 2}%`]),
		useTransform(scrollYProgress, [0, 1], ['0%', `${(1 * 25) / 2}%`]),
		useTransform(scrollYProgress, [0, 1], ['0%', `${(2 * 25) / 2}%`]),
		useTransform(scrollYProgress, [0, 1], ['0%', `${(3 * 25) / 2}%`]),
	];

	let yTextValues = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		['-50%', `0%`, `100%`]
	);

	return (
		<div className='sustainability-section' ref={cta}>
			<div className='sustainability-images'>
				{images.map((val, index) => {
					return (
						<motion.div
							key={`cta_image_${index}`}
							style={{
								zIndex: index,
								y: yValues[index - 1],
								backgroundImage: `url(${val.src})`,
							}}></motion.div>
					);
				})}
			</div>
			<div className='container-fluid-width'>
				<div className='sustainability-desc'>
					{label && (
						<motion.h2
							className='heading-2'
							// style={{
							// 	x: '-50%',
							// 	y: yTextValues,
							// 	zIndex: images.length / 2 - 1,
							// }}
						>
							{label}
						</motion.h2>
					)}

					{desc && (
						<motion.div
						// style={{
						// 	x: '-50%',
						// 	y: yTextValues,
						// 	zIndex: images.length / 2 - 1,
						// }}
						>
							{parse(desc)}
						</motion.div>
					)}
					{link && (
						<div className='sustainability-btn'>
							<Link
								to={link.elements_attributes.to}
								className='btn btn-bordered white'
								target='_blank'>
								{link.elements_slot}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
