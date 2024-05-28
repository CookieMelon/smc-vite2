import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import SingleParallax from 'src/CMS/SingleParallax/single-parallax';

export default function Marquee({ images, widgetClasses }) {
	const marquee = useRef();
	const { scrollYProgress: scrollYProgress_start1 } = useScroll({
		target: marquee,
		offset: ['start end', 'end start'],
	});

	const reversed = widgetClasses.includes('reversed');

	return (
		<div className='marquee' ref={marquee}>
			<motion.div
				className='marquee-overflow'
				initial={{
					x: reversed ? '-100vw' : '0vw',
				}}
				// style={{ x: xVal }}
				animate={{
					x: reversed ? '0vw' : '-100vw',
				}}
				transition={{
					repeat: Infinity,
					duration: 25,
					ease: 'linear',
				}}>
				<div
					className='grid'
					style={{
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
					}}>
					{images.map((image) => {
						let img = image.elements_attributes;
						return (
							<div key={`1_${image.element_code}`}>
								<SingleParallax scrollYProgress_start={scrollYProgress_start1}>
									<img src={img.src} alt={img.alt} />
								</SingleParallax>
							</div>
						);
					})}
					{images.map((image) => {
						let img = image.elements_attributes;
						return (
							<div key={`2_${image.element_code}`}>
								<SingleParallax scrollYProgress_start={scrollYProgress_start1}>
									<img src={img.src} alt={img.alt} />
								</SingleParallax>
							</div>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
}
