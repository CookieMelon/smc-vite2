import { useState } from 'react';

import { motion } from 'framer-motion';
import { getColors } from 'src/hooks/use-color';

import parse from 'html-react-parser';

export default function OurStoryTab({ data }) {
	const { red, baseBlack } = getColors;
	const [selected, setSelected] = useState(0);
	const other_variants = {
		initial: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		done: {
			opacity: 0,
		},
	};

	const tab_variants = {
		initial: {
			opacity: 0,
			z: 20,
			y: 50,
		},
		enter: {
			opacity: 1,
			z: 0,
		},
		done: (index) => {
			return {
				opacity: 1 - (selected - index) * 0.33,
				z: (selected - index) * -20,
				y: (selected - index) * -60,
			};
			// opacity: (index) => {
			// 	return 1 - (selected - index) * 0.15;
			// },
		},
	};

	const button_variants = {
		initial: {
			color: red,
			opacity: 1,
		},
		enter: {
			color: baseBlack,
			opacity: 1,
		},
		done: (index) => {
			return {
				color: red,
				opacity: 1 - (selected - index) * 0.15,
			};
			// opacity: (index) => {
			// 	return 1 - (selected - index) * 0.15;
			// },
		},
	};
	return (
		<motion.div
			className='column ourstory-col'
			style={{
				display: 'flex',
				gap: '5rem',
			}}>
			<div
				className=''
				style={{
					flex: '1 1 47%',
				}}>
				<h3>
					Pellentesque cras tortor viverra dui tempor semper cum sed. Sit ut.
				</h3>

				<div className='tab-source tabsource-ourstory'>
					{data.map((content, index) => {
						return (
							<motion.button
								key={`tab-links_${index}`}
								className={`tab-links ${selected === index ? 'active' : ''}`}
								animate={
									selected === index
										? 'enter'
										: index < selected
										? 'done'
										: 'initial'
								}
								onTap={() => {
									setSelected(index);
								}}>
								<motion.h3
									custom={index}
									variants={button_variants}
									className='heading-3'>
									{content.trigger.label}
								</motion.h3>
								<motion.div
									className='ourstory-accordion'
									animate={{
										height: selected === index ? 'auto' : 0,
									}}>
									<div>
										{content.trigger.subtitle &&
											parse(content.trigger.subtitle)}
									</div>
								</motion.div>
							</motion.button>
						);
					})}
				</div>
			</div>
			<div
				style={{
					flex: '1 1 47%',
					position: 'relative',
				}}>
				<div className='tab-target'>
					<div className='ourstory-grid'>
						{data.map((content, index) => {
							return (
								<motion.div
									key={`ourstory-tab-item_${index}`}
									animate={
										selected === index
											? 'enter'
											: index < selected
											? 'done'
											: 'initial'
									}
									className='ourstory-tab-item'
									custom={index}
									variants={tab_variants}>
									<div className='mobile-only'>
										<h3 className='heading-3'>{content.trigger.label}</h3>
										{content.trigger.subtitle &&
											parse(content.trigger.subtitle)}
									</div>
									<motion.img
										variants={other_variants}
										className='ourstory-tab-icon'
										src={content.target.img_1.src}
										alt={content.target.img_1.alt}
									/>
									<img
										src={content.target.img_2.src}
										alt={content.target.img_2.alt}
									/>
									<motion.p variants={other_variants}>
										Eu phasellus nunc neque porta laoreet maecenas tortor in.
										Magnis sit leo at a tortor. Quis massa tellus ut arcu sit
										sed sed. In ultrices curabitur leo eu.
									</motion.p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
