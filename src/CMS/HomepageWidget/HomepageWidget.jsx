import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from 'framer-motion';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';

import { useWindowSize } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';

export default function HomepageWidget({ src, title, desc, link }) {
	const widgetLink = link.elements_attributes.to
		? link.elements_attributes.to
		: link.elements_attributes.href;

	const ref = useRef(null);
	const video = useRef(null);
	const pin = useRef(null);

	const [position, changePos] = useState('start');
	const [activate, setActivate] = useState(false);
	const [activateEnd, setActivateEnd] = useState(false);

	const { width: wWidth, height: wHeight } = useWindowSize();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});

	const start = wHeight / (wHeight * 2.5);
	const endStart = 0.6;

	useEffect(() => {}, [scrollYProgress]);

	useMotionValueEvent(scrollYProgress, 'change', (latest, prev) => {
		if (latest >= start) {
			setActivate(true);
		} else {
			setActivate(false);
		}

		if (latest >= 0.6) {
			setActivateEnd(true);
		} else {
			setActivateEnd(false);
		}
		// if (latest <= 0.25) changePos('start');
		// else if (latest >= 0.75) changePos('end');
		// else changePos('mid');

		// if (latest === 1) {
		// 	ref.current.style.opacity = '1 !important';
		// 	// video.current.style.position = 'absolute';
		// }
	});

	const test = useTransform(
		scrollYProgress,
		[0, 1],
		[0, 'var(--container-padding)']
	);

	return (
		<motion.div
			className='section-content fullscreen homepage-widget-1'
			ref={ref}
			animate={{
				opacity: activate ? 1 : 0,
			}}
			style={{
				top: `-${wHeight}px`,
				height: wHeight * 2.5,
				alignItems: `flex-start`,
				marginBottom: `-${wHeight}px`,
			}}>
			<motion.div
				ref={pin}
				style={{
					width: '100%',
					height: wHeight,
					position: 'sticky',
					left: 0,
					top: 0,
				}}>
				<motion.div
					className='container-fluid-width text-center'
					// style={{
					// 	y: yValue,
					// }}
				>
					<motion.div
						style={{ margin: 'auto' }}
						variants={{
							initial: {},
							activate: {
								transition: {
									staggerChildren: 0.035,
								},
							},
						}}
						animate={activate ? 'activate' : 'initial'}>
						<motion.h2
							className='heading-2'
							variants={{
								initial: {
									y: 25,
								},
								activate: {
									y: 0,
								},
							}}>
							{title}
						</motion.h2>
						<motion.div
							variants={{
								initial: {
									y: 25,
								},
								activate: {
									y: 0,
								},
							}}>
							{' '}
							{desc && parse(desc)}
							<motion.p
								variants={{
									initial: {
										y: 25,
									},
									activate: {
										y: 0,
									},
								}}>
								<Link
									to={widgetLink}
									target='_blank'
									className='btn btn-bordered white'>
									{link.elements_slot}
								</Link>
							</motion.p>
						</motion.div>
					</motion.div>
				</motion.div>
				<motion.div
					className='video-container'
					style={{
						padding: test,
						backgroundImage: 'linear-gradient(#748089, #898a8a)',
					}}
					initial={{
						// position: 'fixed',
						x: '-50%',
						y: '-50%',
					}}
					// animate={{
					// 	scale: activateEnd ? 0.85 : 1,
					// }}
					ref={video}>
					<video
						style={{
							height: '100%',
							width: '100%',
						}}
						muted={true}
						preload='auto'
						autoPlay={true}
						loop={true}
						playsInline
						src={src}></video>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
