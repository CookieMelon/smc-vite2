import { motion, useInView } from 'framer-motion';
import parse from 'html-react-parser';
import { useRef } from 'react';

import ScrollSnap from 'src/Components/ScrollSnap/ScrollSnap';
import Section from '../Section/Section';
import VideoContent from '../VideoContent/Video';

export default function HomepageWidget({ src, title, desc, link }) {
	const widgetLink = link.elements_attributes.to
		? link.elements_attributes.to
		: link.elements_attributes.href;

	const ref = useRef(null);
	const video = useRef(null);
	const pin = useRef(null);
	const trigger = useRef(null);

	const isInView = useInView(ref, {
		amount: 0.65,
	});

	return (
		<>
			<ScrollSnap>
				<motion.div
					className='section-content fullscreen homepage-widget-1'
					ref={ref}
					animate={isInView ? 'animate' : 'initial'}
					variants={{
						initial: {
							opacity: 0,
						},
						animate: {
							opacity: 1,
						},
					}}
					style={
						{
							// top: `-${wHeight}px`,
							// height: wHeight * 2.5,
							// alignItems: `flex-start`,
							// marginBottom: `-${wHeight}px`,
						}
					}>
					<motion.div
						className='sticky'
						ref={pin}
						style={{
							width: '100%',
							// height: wHeight,
							// position: 'sticky',
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
								}}>
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
										<button
											ref={trigger}
											to={widgetLink}
											target='_blank'
											className='btn btn-bordered white'>
											{link.elements_slot}
										</button>
									</motion.p>
								</motion.div>
							</motion.div>
						</motion.div>
						<motion.div
							className='video-container'
							style={{
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
			</ScrollSnap>
			<Section sectionStyle={{ display: 'none' }}>
				<VideoContent src={src} trigger={trigger} />
			</Section>
		</>
	);
}
