import { AnimatePresence, motion, useScroll } from 'framer-motion';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { getColors } from 'src/hooks/use-color';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
	return Math.abs(offset) * velocity;
};

export default function ImageSlider({
	slides,
	adaptiveHeight = false,
	widgetClasses,
	gradient = true,
	dots,
	captionPosition = '',
	arrows = true,
}) {
	console.log('test');
	const slider = useRef(null);
	const { blue } = getColors;
	const [sliderHeight, setSliderHeight] = useState(null);
	const [sliderImageHeight, setSliderImageHeight] = useState(null);

	const sliderClasses = `image-slider ${widgetClasses}`;
	const sliderContainerClasses = `image-slider-container`;

	const { scrollYProgress } = useScroll({
		target: slider,
		offset: ['start end', 'end start'],
	});

	const [selected, setSelected] = useState(0);

	useEffect(() => {
		if (slider) {
			setSliderHeight(
				slider.current.querySelectorAll('.image-slide')[selected].offsetHeight
			);
		}

		setSliderImageHeight(
			slider.current
				.querySelectorAll('.image-slide')
				[selected].querySelector('.image-img').offsetHeight
		);
	}, [selected]);

	const innerItem_click = (event, info) => {
		setSelected((prev) => event.target.closest('.inner-item').dataset.index);
	};

	const getDistance = (index, current) => {
		return Math.abs(current - index);
	};

	const zindex = slides.map((slide, index) => {
		return slides.length - index;
	});

	const z = slides.map((slide, index) => {
		return `-${index * 100}px`;
	});

	const zAnnual = slides.map((slide, index) => {
		return `-${index * 50}px`;
	});

	const zFinal = captionPosition === 'annual-report' ? zAnnual : z;

	const rotate = slides.map((slide, index) => {
		return `${index * 20}deg`;
	});

	const o = slides.map((slide, index) => {
		if (gradient) {
			if (index === 0) return 1;
			if (index > 2) return 0;
			return 1 - index / 3;
		} else {
			if (index === 0) return 1;
			return 0;
		}
	});

	const x = slides.map((slide, index) => {
		if (index === 0) return 1;
		if (index > 2) return 0;
		return 1 - index / 3;
	});

	let slider_transition = {
		type: 'spring',
		duration: 0.35,
		bounce: '0.15',
	};

	let desc_variants = {
		selected: {
			opacity: 1,
			y: '0px',
			transition: slider_transition,
		},
		initial: {
			opacity: 0,
			y: '100px',
			transition: slider_transition,
		},
	};

	return (
		<div className={sliderContainerClasses}>
			{widgetClasses.includes('has-slider-bg') && (
				<motion.div className='slider-bgs'>
					{slides.map((slide, index) => {
						return (
							<motion.div
								key={`slider-bg_${index}`}
								className='slider-bg'
								animate={{
									opacity: selected === index ? 0.3 : 0,
								}}
								transition={slider_transition}
								style={{
									backgroundImage: `url(${slide.image.src})`,
								}}></motion.div>
						);
					})}
				</motion.div>
			)}
			<div
				className={sliderClasses}
				ref={slider}
				style={{ height: adaptiveHeight && sliderHeight }}>
				<div className='image-slider-track'>
					{slides.map((slide, index) => {
						let x_test = gradient
							? `${20 * ((selected - index) * 2)}%`
							: `${5 * ((selected - index) * 2)}%`;
						let rotate = `${-(selected - index) * 10}deg`;

						return (
							<motion.div
								dragElastic={1}
								drag={selected === index ? 'x' : ''}
								dragConstraints={{ left: 0, right: 0 }}
								onDragEnd={(e, { offset, velocity }) => {
									e.preventDefault();
									if (selected !== index) return;

									const swipe = swipePower(offset.x, velocity.x);

									if (swipe < -swipeConfidenceThreshold) {
										console.log('left');
										if (index < slides.length) setSelected(index + 1);
										// paginate(1);
									} else if (swipe > swipeConfidenceThreshold) {
										console.log('right');
										if (index > 0) setSelected(index - 1);
									}
								}}
								className={`image-slide ${slide.link ? 'has-link' : ''}`}
								key={`image-slide_${index}`}
								onTap={(event) => {
									setSelected(index);
								}}
								onClick={(event) => {
									if (slide.link) window.open(slide.link.href, '_blank');
								}}
								animate={{
									zIndex: zindex[getDistance(index, selected)],
									z: zFinal[getDistance(index, selected)],
									// rotate: rotate,

									x: `${-selected * 100}%`,
									// y: `${selected * index * 5}%`,
								}}
								transition={slider_transition}>
								<motion.div
									className='image-img'
									animate={{
										opacity:
											gradient === 'partial'
												? selected - index <= 0
													? o[getDistance(index, selected)]
													: 0
												: o[getDistance(index, selected)],
									}}>
									{slide.link ? (
										<motion.div to={slide.link.href} target='_blank'>
											<img src={slide.image.src} alt={slide.image.alt} />
										</motion.div>
									) : (
										<img src={slide.image.src} alt={slide.image.alt} />
									)}
								</motion.div>
							</motion.div>
						);
					})}
				</div>
				{widgetClasses.includes('has-arrows') && (
					<div className='controls'>
						{selected > 0 && (
							<motion.button
								className='button left'
								style={{
									top:
										sliderImageHeight &&
										adaptiveHeight &&
										sliderImageHeight / 2 - 20,
								}}
								onTap={(event) => {
									if (selected - 1 < 0) return;

									setSelected((prev) => prev - 1);
								}}>
								<PiCaretLeftBold />
							</motion.button>
						)}

						{selected < slides.length - 1 && (
							<motion.button
								className='button right'
								style={{
									top:
										sliderImageHeight &&
										adaptiveHeight &&
										sliderImageHeight / 2 - 20,
								}}
								onTap={(event) => {
									if (selected + 1 > slides.length - 1) return;

									setSelected((prev) => prev + 1);
								}}>
								<PiCaretRightBold />
							</motion.button>
						)}
					</div>
				)}
				{widgetClasses.includes('has-dots') && (
					<div className='image-slider-dots'>
						{slides.map((slide, index) => {
							return (
								<motion.button
									key={`slider_dots${index}`}
									onTap={() => {
										setSelected(index);
									}}
									animate={selected === index ? 'selected' : 'initial'}
									variants={{
										initial: {
											backgroundColor: '#d9d9d9',
										},
										selected: {
											backgroundColor: blue,
											transition: {
												staggerChildren: 0.05,
											},
										},
									}}></motion.button>
							);
						})}
					</div>
				)}
			</div>
			<AnimatePresence mode='popLayout'>
				{slides.map((slide, index) => {
					return (
						selected === index &&
						slide.desc && (
							<motion.div
								key={`image-description_${index}`}
								className={`image-description ${widgetClasses}`}
								initial='inital'
								animate={selected === index ? 'selected' : 'initial'}
								variants={{
									initial: {
										opacity: 0,
									},
									selected: {
										opacity: 1,
										transition: {
											staggerChildren: 0.05,
										},
									},
								}}>
								{slide.desc && parse(slide.desc)}
							</motion.div>
						)
					);
				})}
			</AnimatePresence>
		</div>
	);
}

const MotionLink = ({ children, ...props }) => {
	const ChildrenComponent = motion(Link, {
		forwardMotionProps: true,
	});

	return <ChildrenComponent {...props}>{children}</ChildrenComponent>;
};
