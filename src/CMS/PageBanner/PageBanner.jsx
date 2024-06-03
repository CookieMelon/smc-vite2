import { motion, useScroll, useTransform } from 'framer-motion';
import { enterDuration } from 'src/Layout/layout-anim';
import { getColors } from 'src/hooks/use-color';

import { useEffect, useRef, useState } from 'react';

export default function PageBanner({
	title,
	subtitle,
	subtitleClasses,
	image,
	containerSize = 'medium',

	bannerShade = false,
	widgetClasses = '',
	headingSize = 'heading-1',
	children,
}) {
	const { red, yellow, blue, blueShade1, blueShade2 } = getColors;

	const bannerClasses = `page-banner ${widgetClasses}  ${
		!image ? 'no-image' : ''
	}`;
	const bannerContainerClasses = `container-fluid-width ${containerSize}`;
	const bannerHeadingClasses = `banner-title ${headingSize} `;

	const bannerSubtitleClasses = `banner-subtitle heading-5 ${
		subtitleClasses ? subtitleClasses : ''
	}`;
	const [rotate, setRotate] = useState(-30);
	const banner = useRef(null);
	const { scrollYProgress } = useScroll({
		target: banner,
		offset: ['start start', 'end start'],
	});

	const y = [
		useTransform(scrollYProgress, [0, 1], ['-5%', '5%']),
		useTransform(scrollYProgress, [0, 1], ['0vh', '15vh']),
		useTransform(scrollYProgress, [0, 1], ['0vh', '20vh']),
		useTransform(scrollYProgress, [0, 1], ['0vh', '40vh']),
	];

	const z = [
		useTransform(scrollYProgress, [0, 1], ['0px', '15px']),
		useTransform(scrollYProgress, [0, 1], ['0px', '10px']),
		useTransform(scrollYProgress, [0, 1], ['0px', '5px']),
		useTransform(scrollYProgress, [0, 1], ['0px', '10px']),
		useTransform(scrollYProgress, [0, 1], ['0px', '15px']),
	];

	useEffect(() => {
		if (widgetClasses.includes('smc-blue')) {
			setRotate(45);
		}
	}, []);

	const bg_anim = {
		initial: {
			scale: 1.1,
		},
		enter: {
			scale: 1,
			transition: {
				duration: 1,
				delay: 0.5,
				ease: [0.76, 0, 0.24, 1],
			},
		},
		exit: {
			scale: 1,
		},
	};

	const text_anim = {
		initial: {
			y: 20,
			opacity: 0,
		},
		enter: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 1,
				delay: 0.7,
				ease: [0.76, 0, 0.24, 1],
			},
		},
		exit: {
			y: -20,
			opacity: 0,
			transition: {
				duration: 0.75,
				delay: 0.5,
				ease: [0.76, 0, 0.24, 1],
			},
		},
	};

	const path_transitions = {
		delay: enterDuration - 0.5,
	};

	const path_settings = [
		{
			'smc-default': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red} 25%)`,
				left: '-10%',
				transition: path_transitions,
			},
			'smc-red': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red} 25%)`,
				left: '-10%',
				transition: path_transitions,
			},
			'smc-blue': {
				backgroundImage: `linear-gradient(90deg, ${blueShade2}, ${blueShade2})`,
				left: '-22.5%',
				transition: path_transitions,
			},
			'smc-yellow': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${blue})`,
				left: '-10%',
				transition: path_transitions,
			},
		},
		{
			'smc-default': {
				backgroundImage: `linear-gradient(90deg, ${yellow} 25%, ${red})`,
				left: '-10%',
				transition: path_transitions,
			},
			'smc-red': {
				backgroundImage: `linear-gradient(90deg, ${yellow} 25%, ${red})`,
				left: '-10%',
				transition: path_transitions,
			},
			'smc-blue': {
				backgroundImage: `linear-gradient(90deg, ${yellow}00, ${yellow})`,
				left: '-30%',
				transition: path_transitions,
			},
			'smc-yellow': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${blue})`,
				left: '-5%',
				transition: path_transitions,
			},
		},
		{
			'smc-default': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red})`,
				left: '-10%',
				transition: path_transitions,
			},
			'smc-red': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red})`,
				left: '-10%',
				transition: path_transitions,
			},
			'smc-blue': {
				backgroundImage: `linear-gradient(90deg, ${yellow}00, ${yellow})`,
				left: '5%',
				transition: path_transitions,
			},
			'smc-yellow': {
				backgroundImage: `linear-gradient(90deg, ${blue}, ${yellow})`,
				left: '-10%',
				transition: path_transitions,
			},
		},
		{
			'smc-default': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red} 25%)`,
				right: '-4%',
				transition: path_transitions,
			},
			'smc-red': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red} 25%)`,
				right: '-4%',
				transition: path_transitions,
			},
			'smc-blue': {
				right: '0%',
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${blueShade1})`,
				transition: path_transitions,
			},
			'smc-yellow': {
				right: '5%',
				backgroundImage: `linear-gradient(90deg, ${blue}, ${yellow})`,
				transition: path_transitions,
			},
		},
		{
			'smc-default': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red})`,
				transition: path_transitions,
			},
			'smc-red': {
				backgroundImage: `linear-gradient(90deg, ${yellow}, ${red})`,
				transition: path_transitions,
			},
			'smc-blue': {
				backgroundImage: `linear-gradient(90deg, ${blueShade1}, ${blueShade1})`,
				transition: path_transitions,
			},
			'smc-yellow': {
				backgroundImage: `linear-gradient(90deg, ${blue}, ${yellow})`,
				transition: path_transitions,
			},
		},
	];

	return (
		<motion.div
			className={bannerClasses}
			// {...useAnim(banner_anim)}
			ref={banner}>
			<div className='banner-bg'>
				<motion.div
					className='banner-img'
					style={{ backgroundImage: `url(${image})`, y: y[0] }}
					variants={bg_anim}></motion.div>

				<motion.div
					variants={path_settings[0]}
					className='path path-1'
					style={{
						y: '-70%',
						x: '-55%',
						rotate: rotate,
						z: z[0],
					}}></motion.div>

				<motion.div
					variants={path_settings[1]}
					className='path path-2'
					style={{
						y: '-70%',
						x: '-43%',
						rotate: rotate,
						z: z[1],
					}}></motion.div>

				<motion.div
					variants={path_settings[2]}
					className='path path-3'
					style={{ y: '2%', x: '-58%', rotate: rotate, z: z[2] }}></motion.div>

				<motion.div
					variants={path_settings[3]}
					className='path path-4'
					style={{ x: '55%', rotate: rotate, z: z[3] }}></motion.div>

				<motion.div
					className='path path-5'
					style={{ x: '65%', rotate: rotate, z: z[4] }}></motion.div>
				{bannerShade && <div className='banner-shade'></div>}
			</div>
			<motion.div className={bannerContainerClasses}>
				<motion.div
					className='banner-info'
					variants={{
						initial: {
							opacity: 1,
						},
						enter: {
							opacity: 1,
							transition: {
								staggerChildren: 0.05,
							},
						},
						exit: {
							opacity: 1,
						},
					}}>
					<motion.h1 className={bannerHeadingClasses}>{title}</motion.h1>
					{subtitle && (
						<motion.p className={bannerSubtitleClasses}>{subtitle}</motion.p>
					)}

					{children && children}
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
