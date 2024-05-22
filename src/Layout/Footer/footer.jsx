import { motion, useScroll, useTransform } from 'framer-motion';

import { useRef } from 'react';

import { PiCaretDownBold } from 'react-icons/pi';
import SocialIcons from './social-icon';
import { Link } from 'react-router-dom';
import { getColors } from 'src/hooks/use-color';
import Button from 'src/Components/button/button';

import FooterLogos from 'src/images/footer-other-logo.png';

export default function Footer() {
	const year = new Date().getFullYear();
	const { baseBlack, gray2, red } = getColors;

	const footer = useRef(null);

	const { scrollYProgress } = useScroll({
		target: footer,
		offset: ['start end', 'start 0.5'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);

	return (
		<footer className='section-content main-footer' ref={footer}>
			<motion.div className='container-fluid-width medium' style={{ y: y }}>
				<div className='footer-logo'>
					<figure>
						<img
							src={FooterLogos}
							alt={"World's Best Companies 2023, World's Best Employers 2023"}
						/>
					</figure>
					<SocialIcons />
					<Button className='subsidiary-btn btn btn-bordered'>
						Subsidiary Websites
						<PiCaretDownBold fontSize={'1.35rem'} />
					</Button>
				</div>

				<div className='footer-links'></div>

				<p className='copy text-center small-text'>
					Copyright &copy; {year} San Miguel Corporation. All Rights Reserved.
				</p>
			</motion.div>
		</footer>
	);
}
