import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

import { useWindowSize } from '@uidotdev/usehooks';
import { easeInOut } from 'framer-motion';
import parse from 'html-react-parser';

export default function Pillar({ content, widgetClasses, children }) {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		amount: 0.5,
	});

	const { width } = useWindowSize();
	const [focus, setFocus] = useState(content.d.focus);
	const [bg, setBg] = useState(content.d.bg);

	const [isMobile, setIsMobile] = useState(width < 768);

	useEffect(() => {
		if (width < 500) setIsMobile(true);
		else setIsMobile(false);
	}, [width]);

	useEffect(() => {
		if (isMobile) {
			setFocus(content.m.focus);
			setBg(content.m.bg);
		} else {
			setFocus(content.d.focus);
			setBg(content.d.bg);
		}
	}, [isMobile]);

	const easing = easeInOut;

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});

	const introOutStart = 0.05;
	const introOutEnd = introOutStart + 0.05;

	const mainInStart = introOutStart + 0.15;
	const mainInEnd = introOutStart + 0.35;

	const delay = 0.015;
	const blurOpacity = useTransform(
		scrollYProgress,
		[mainInStart, mainInEnd],
		[0, 1]
	);

	const sticky_variants = {
		initial: {
			clipPath: 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%',
		},
		enter: {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%',
		},
	};

	const text_variants = {
		initial: {
			opacity: 0,
			y: 20,
		},
		enter: {
			opacity: 1,
			y: 0,
		},
	};

	const bg_variants = {
		initial: {
			z: 1,
		},
		enter: {
			z: 0,
		},
	};

	const blur_variants = {
		initial: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
	};

	const sticky = [
		useTransform(
			scrollYProgress,
			[0, mainInStart],
			[
				'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)',
				'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%',
			],
			{
				ease: easing,
			}
		),
	];

	const y = [
		useTransform(
			scrollYProgress,
			[0, mainInEnd, 1],
			['-50px', '-50px', '50px'],
			{
				ease: easing,
			}
		),
		useTransform(scrollYProgress, [0, mainInEnd, 1], ['0px', '0px', '2rem'], {
			ease: easing,
		}),
		useTransform(scrollYProgress, [0, mainInEnd, 1], ['0px', '150px', '0px'], {
			ease: easing,
		}),
	];

	const x = [
		useTransform(scrollYProgress, [0, 1], ['0px', '5px']),
		useTransform(scrollYProgress, [0, 1], ['0px', '10px']),
		useTransform(scrollYProgress, [0, 1], ['0px', '20px']),
	];

	const z = [
		useTransform(scrollYProgress, [0, mainInStart, 1], ['10px', '0px', '0px'], {
			ease: easing,
		}),
		useTransform(scrollYProgress, [0, mainInStart, 1], ['5px', '0px', '5px'], {
			ease: easing,
		}),
		useTransform(scrollYProgress, [0, mainInStart, 1], ['0px', '0px', '10px'], {
			ease: easing,
		}),
		useTransform(scrollYProgress, [0, mainInStart, 1], ['0px', '0px', '15px'], {
			ease: easing,
		}),
		useTransform(scrollYProgress, [0, mainInStart, 1], ['0px', '0px', '20px'], {
			ease: easing,
		}),
	];

	const text1 = [
		// opacity 0
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay, mainInEnd + delay, 1],
			[0, 0, 1, 1],
			{ ease: easing }
		),

		// y
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay, mainInEnd + delay, 1],
			['20px', '20px', '0px', '0px'],
			{ ease: easing }
		),
	];

	const text2 = [
		// opacity 0
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 2, mainInEnd + delay * 1.5, 1],
			[0, 0, 1, 1],
			{ ease: easing }
		),

		// y
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 2, mainInEnd + delay * 1.5, 1],
			['20px', '20px', '0px', '0px'],
			{ ease: easing }
		),
	];

	const text3 = [
		// opacity 0
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 3, mainInEnd + delay * 2, 1],
			[0, 0, 1, 1],
			{ ease: easing }
		),

		// y
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 3, mainInEnd + delay * 2, 1],
			['20px', '20px', '0px', '0px'],
			{ ease: easing }
		),
	];

	const path_con = [
		useTransform(
			scrollYProgress,
			[0, mainInStart - delay, mainInEnd - delay, 1],
			['0vh', '50vh', '50vh', '50vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart - delay, mainInEnd - delay, 1],
			['0vh', '50vh', '50vh', '50vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart - delay, mainInEnd - delay, 1],
			[1, 0, 0, 0],
			{ ease: easing }
		),
	];

	const line = [
		useTransform(
			scrollYProgress,
			[0, mainInStart, mainInEnd + delay * 3, 1],
			['0vh', '0vh', '60vh', '2vh'],
			{ ease: easing }
		),

		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 3, mainInEnd + 0.2, 1],
			['0vh', '0vh', '0', '60vh'],
			{ ease: easing }
		),
	];

	const paths_x = [
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 6, mainInEnd + delay * 6, 1],
			['-20vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),

		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 4, mainInEnd + delay * 4, 1],
			['-15vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 8, mainInEnd + delay * 8, 1],
			['-10vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
	];

	const paths_x_left = [
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 6, mainInEnd + delay * 6, 1],
			['20vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),

		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 4, mainInEnd + delay * 4, 1],
			['15vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 8, mainInEnd + delay * 8, 1],
			['10vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
	];

	const paths_y = [
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 6, mainInEnd + delay * 6, 1],
			['20vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 4, mainInEnd + delay * 4, 1],
			['15vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 8, mainInEnd + delay * 8, 1],
			['10vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
	];

	const paths_y_left = [
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 6, mainInEnd + delay * 6, 1],
			['20vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 4, mainInEnd + delay * 4, 1],
			['15vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
		useTransform(
			scrollYProgress,
			[0, mainInStart + delay * 8, mainInEnd + delay * 8, 1],
			['10vh', '0vh', '0vh', '0vh'],
			{ ease: easing }
		),
	];

	return (
		<div
			className={`${widgetClasses} pillar-section section-content`}
			ref={ref}>
			<motion.div
				className='pillar-sticky'
				initial='initial'
				animate={isMobile && isInView ? 'enter' : 'initial'}>
				<motion.div
					className='pillar-clip'
					variants={isMobile && sticky_variants}
					style={
						!isMobile && {
							clipPath: !widgetClasses.includes('left')
								? sticky[0]
								: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						}
					}>
					<motion.div
						variants={bg_variants}
						className='pillar-bg pillar-img'
						style={
							!isMobile
								? {
										x: x[0],
										y: y[0],
										z: !isMobile && z[0],
										backgroundImage: `url(${bg})`,
								  }
								: {
										backgroundImage: `url(${bg})`,
								  }
						}>
						<motion.div
							className='pillar-bg pillar-blur pillar-img'
							variants={blur_variants}
							style={
								!isMobile
									? {
											x: x[0],
											y: y[0],
											z: !isMobile && z[0],
											opacity: blurOpacity,
											backgroundImage: `url(${bg})`,
									  }
									: {
											backgroundImage: `url(${bg})`,
									  }
							}></motion.div>
						<motion.div
							style={
								!isMobile && {
									x: widgetClasses.includes('left')
										? paths_x_left[0]
										: paths_x[0],
									y: widgetClasses.includes('left')
										? paths_y_left[0]
										: paths_y[0],
								}
							}
							className='path-con'>
							<div className='path path-1'></div>
						</motion.div>
						<motion.div
							style={
								!isMobile && {
									x: widgetClasses.includes('left')
										? paths_x_left[0]
										: paths_x[1],
									y: widgetClasses.includes('left')
										? paths_y_left[0]
										: paths_y[1],
								}
							}
							className='path-con'>
							<div className='path path-2'></div>
						</motion.div>
						<motion.div
							style={
								!isMobile && {
									x: widgetClasses.includes('left')
										? paths_x_left[0]
										: paths_x[2],
									y: widgetClasses.includes('left')
										? paths_y_left[0]
										: paths_y[2],
								}
							}
							className='path-con'>
							<div className='path path-3'></div>
						</motion.div>

						<motion.div
							className='path-con over'
							style={{ opacity: path_con[2] }}>
							<div className='path path-1'></div>
						</motion.div>

						<motion.div
							className='path-con over'
							style={{ opacity: path_con[2] }}>
							<div className='path path-2'></div>
						</motion.div>
					</motion.div>

					<motion.div
						className='pillar-desc'
						initial='initial'
						animate={isMobile && isInView ? 'enter' : 'initial'}
						transition={{
							staggerChildren: 0.05,
						}}>
						<motion.p
							variants={isMobile && text_variants}
							style={!isMobile && { opacity: text1[0], y: text1[1] }}
							className='uppercase'
							data-text={content.text1}
							dangerouslySetInnerHTML={{ __html: content.text1 }}></motion.p>
						<motion.h2
							variants={isMobile && text_variants}
							style={!isMobile && { opacity: text2[0], y: text2[1] }}
							className='heading-2'
							data-text={content.text2}>
							{content.text2}
						</motion.h2>
						{content.text3 && (
							<motion.div
								className='pillar-text'
								variants={isMobile && text_variants}
								style={!isMobile && { opacity: text3[0], y: text3[1] }}>
								{parse(content.text3)}
							</motion.div>
						)}

						<div className='line-con'>
							<motion.div
								className='line'
								style={{
									height: line[0],
									y: line[1],
								}}></motion.div>
						</div>
					</motion.div>
					<motion.div
						className='pillar-focus pillar-img'
						style={
							!isMobile
								? {
										y: y[1],
										backgroundImage: `url(${focus})`,
								  }
								: {
										backgroundImage: `url(${focus})`,
								  }
						}></motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
