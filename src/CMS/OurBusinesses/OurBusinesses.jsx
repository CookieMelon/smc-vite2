import { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import {
	motion,
	useMotionValueEvent,
	useScroll,
	AnimatePresence,
} from 'framer-motion';

import Button from 'src/Components/button/button';

import { useWindowSize } from '@uidotdev/usehooks';

import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

export default function OurBusinesses({ data, className, link, children }) {
	const { height, width } = useWindowSize();
	const [isMobile, setIsMobile] = useState(width < 768);

	useEffect(() => {
		if (width < 768) setIsMobile(true);
		else setIsMobile(false);
	}, [width]);

	const business = useRef(null);
	const { scrollYProgress } = useScroll({
		target: business,
		offset: ['start start', 'end end'],
	});

	const [selected, setSelected] = useState(0);
	// const data = [
	// 	{
	// 		img: '/images/OurBusinesses/food.jpg',
	// 		title: 'Food and Beverage',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// 	{
	// 		img: '/images/OurBusinesses/oil.jpg',
	// 		title: 'Oil Refining and Marketing',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// 	{
	// 		img: '/images/OurBusinesses/packaging.jpg',
	// 		title: 'Packaging',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// 	{
	// 		img: '/images/OurBusinesses/properties.jpg',
	// 		title: 'Properties',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// 	{
	// 		img: '/images/OurBusinesses/power.jpg',
	// 		title: 'Power and Energy',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// 	{
	// 		img: '/images/OurBusinesses/infrastructure.jpg',
	// 		title: 'Infrastructure',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// 	{
	// 		img: '/images/OurBusinesses/other.jpg',
	// 		title: 'Other businsesses',
	// 		description:
	// 			'San Miguel Brewery Inc. (SMB) is the largest producer of beer in the Philippines, with nine out of ten beer drinkers preferring its brands.',
	// 		link: '//our-business/inner',
	// 	},
	// ];

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		let mod = 1 / data.length;

		let index =
			~~(latest / mod) == data.length ? data.length - 1 : ~~(latest / mod);

		// setSelected(index);
	});
	const innerItem_click = (event, info) => {
		setSelected((prev) => event.target.closest('.inner-item').dataset.index);
	};

	let descriptionTransition = {
		initial: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
	};

	const getDescriptionProps = (index) => {
		return {
			initial: 'initial',
			animate: selected === index ? 'animate' : 'initial',
			exit: 'exit',
		};
	};

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
			x: '-50px',
			opacity: 0,
			transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
		},
	};
	return (
		<motion.div
			className='ourbusinesses-section'
			style={{
				height: `${data.length * 50}vh`,
			}}
			initial='initial'
			whileInView='visible'
			ref={business}>
			<div className='pin'>
				<div className='ourbusinesses-bg'>
					{data.map((val, index) => {
						return (
							<motion.img
								animate={{
									opacity: index == selected ? 1 : 0,
								}}
								data-index={index}
								key={`ourbusinesses-bg_${index}`}
								src={val.img.src}
								alt={val.img.alt}
							/>
						);
					})}
				</div>
				<div className='container-fluid-width large'>
					<div className='ourbusinesses-container'>
						<h2 className='heading-2'>Our Businesses</h2>
						<div className='outer-ring-container'>
							<div className='controls'>
								<motion.button
									className='control prev'
									whileTap={{
										x: '-1rem',
									}}
									onTap={() => {
										if (selected > 0) setSelected((prev) => prev - 1);
									}}
									style={{
										opacity: selected === 0 ? 0 : 1,
										pointerEvents: selected === 'none' ? 1 : 'all',
									}}>
									<PiCaretLeftBold size={'1rem'} />
								</motion.button>
								<motion.button
									className='control next'
									whileTap={{
										x: '1rem',
									}}
									onTap={() => {
										if (selected < data.length - 1)
											setSelected((prev) => prev + 1);
									}}
									style={{
										opacity: selected === data.length - 1 ? 0 : 1,
										pointerEvents: selected === 'none' ? 1 : 'all',
									}}>
									<PiCaretRightBold size={'1rem'} />
								</motion.button>
							</div>
							<div className='outer-ring'>
								<div className='ring'></div>
								{data.map((val, index) => {
									return (
										<motion.img
											animate={{
												opacity: index == selected ? 1 : 0,
											}}
											data-index={index}
											key={`outer-ring-img_${index}`}
											src={val.img.src}
											alt={val.img.alt}
										/>
									);
								})}
							</div>
							<div className='ring-selected'>
								<div className='ring'></div>
							</div>
						</div>

						<motion.div className='ring-description'>
							<AnimatePresence>
								<motion.div
									className='descriptions'
									initial='initial'
									exit='exit'
									animate='enter'
									variants={{
										initial: {
											display: 'none',
										},
										exit: {
											display: 'none',
										},
										enter: {
											display: 'block',
										},
									}}
									transition={{
										staggerChildren: 0.015,
									}}
									key={`ob_description_${selected}`}>
									<motion.h3 variants={text_variants}>
										{data[selected].title}
									</motion.h3>

									<motion.p variants={text_variants}>
										{parse(data[selected].description)}
									</motion.p>
									<motion.p variants={text_variants}>
										<Button
											link='/our-business/inner'
											className='btn btn-bordered white'>
											Read More
										</Button>
									</motion.p>
								</motion.div>
							</AnimatePresence>

							{/* {data.map((val, index) => {
								return (
									<motion.div
										className='descriptions'
										style={{
											display: 'none',
											pointerEvents: index == selected ? 'all' : 'none',
										}}
										key={`description_${index}`}>
										<motion.h3
											// {...getDescriptionProps(index)}
											animate={selected === index ? 'enter' : 'initial'}
											variants={{
												initial: {
													opacity: 0,
												},
												enter: {
													opacity: 1,
													transition: {
														delay: 0,
													},
												},
											}}
											className='heading-3'>
											{val.title}
										</motion.h3>
										<motion.p
											// {...getDescriptionProps(index)}
											animate={selected === index ? 'enter' : 'initial'}
											variants={{
												initial: {
													opacity: 0,
												},
												enter: {
													opacity: 1,
													transition: {
														delay: 0.1,
													},
												},
											}}>
											{val.description}
										</motion.p>
										<motion.p
											// {...getDescriptionProps(index)}
											animate={selected === index ? 'enter' : 'initial'}
											variants={{
												initial: {
													opacity: 0,
												},
												enter: {
													opacity: 1,
													transition: {
														delay: 0.2,
													},
												},
											}}>
											<Button
												link='/our-business/inner'
												className={'pri white'}>
												Read More
											</Button>
										</motion.p>
									</motion.div>
								);
							})} */}
						</motion.div>
						<motion.div className='inner-ring'>
							{data.map((val, index) => {
								return (
									<motion.div
										data-index={index}
										key={`inner-item_${index}`}
										className='inner-item'
										initial={{
											y: `-50%`,
										}}
										animate={{
											x: isMobile ? `${-selected * 100}%` : 0,
											y: !isMobile ? `${-50 - selected * 100}%` : 0,
										}}
										transition={{
											ease: 'easeInOut',
											duration: 0.5,
										}}
										onTap={(event, info) => {
											let test = document.querySelectorAll('.test2');
											height;
											window.scrollTo({
												top:
													business.current.offsetTop +
													test[index].offsetTop -
													height / 2,
												behavior: 'smooth',
											});
											// innerItem_click(event, info);
										}}>
										<div className='inner-img'>
											<motion.img
												transition={{
													ease: 'easeInOut',
													duration: 0.5,
												}}
												animate={{
													scale: index == selected ? 0.9 : 0.6,
												}}
												src={val.img.src}
												alt={val.img.alt}
											/>
										</div>
										<motion.p
											className=''
											animate={{
												opacity: index == selected ? 0 : 1,
											}}>
											<b>{val.title}</b>
										</motion.p>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
				</div>
			</div>
			<div
				className='test'
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					paddingTop: '50vh',
					paddingBottom: '50vh',
					height: '100%',
					zIndex: 0,
				}}>
				{data.map((val, index) => {
					return (
						<motion.div
							key={`control_${index}`}
							className='test2'
							whileInView={() => {
								if (!isMobile) setSelected(index);
							}}
							viewport={{
								amount: 'all',
							}}
							style={{
								height: `${100 / data.length}%`,
							}}>
							{val.title}
						</motion.div>
					);
				})}
				<div></div>
			</div>
		</motion.div>
	);
}
