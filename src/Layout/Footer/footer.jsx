import { motion, useScroll, useTransform } from 'framer-motion';

import React, { useRef } from 'react';

import { PiCaretDown, PiCaretDownBold } from 'react-icons/pi';
import SocialIcons from './social-icon';
import { Link } from 'react-router-dom';
import { getColors } from 'src/hooks/use-color';
import Button from 'src/Components/button/button';

import 'src/styles/radix-accordion.scss';
import SMC_SOR from 'src/images/SMC_SOR.png';
import FooterLogos from 'src/images/footer-other-logo.png';

import * as Accordion from '@radix-ui/react-accordion';

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

				<Accordion.Root
					className='AccordionRoot'
					type='single'
					defaultValue='item-1'
					collapsible>
					<div className='footer-links-col'>
						<Accordion.Item className='AccordionItem' value='item-1'>
							<Accordion.AccordionHeader className='AccordionHeader'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>Corporate Head Office</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<p className='small-text'>
									SAN MIGUEL CORPORATION <br />
									40 San Miguel Avenue, Mandaluyong City
									<br />
									1550 Metro Manila, Philippines
									<br />
									P.O. Box 271 Manila Central Post Office
									<br />
									Telephone: (+632) 8-632-3000
									<br />
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-2'>
							<Accordion.AccordionHeader className='AccordionHeader'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>San Miguel Customer Care Hotline</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<p className='small-text'>
									Telephone: (+632) 8-632-2000
									<br />
									SAN MIGUEL CORPORATION
									<br />
									Fax: (+632) 8-632-3299 routing code 2005
									<br />
									Toll Free 1-800-1888-7621
									<br />
									customercare@sanmiguel.com.ph
									<br />
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-3'>
							<Accordion.AccordionHeader className='AccordionHeader'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>Shareholder Services and Assistance</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<p className='small-text'>
									SMC STOCK TRANSFER SERVICE CORPORATION
									<br />
									40 San Miguel Avenue, Mandaluyong City
									<br />
									1550 Metro Manila, Philippines
									<br />
									P.O. Box 271 Manila Central Post Office
									<br />
									Telephone: (+632) 8-632-3000
									<br />
									smc_stsc@sanmiguel.com.ph
									<br />
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>
					</div>
					<div className='footer-links-col'>
						<Accordion.Item className='AccordionItem' value='item-4'>
							<Accordion.AccordionHeader className='AccordionHeader'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>Whistleblowing Office</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<p className='small-text'>
									ATTY. NOEL D. BALSICAS
									<br />
									WHISTLEBLOWER RELATIONS
									<br />
									OFFICER (WRO)
									<br />
									Telephone: 86322-WRO
									<br />
									[86322-976]
									<br />
									Mobile: 09177-WRO-SMC
									<br />
									[0917-7976-762]
									<br />
									smcwhistleblower@sanmiguel.com.ph
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-5'>
							<Accordion.AccordionHeader className='AccordionHeader'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>Investor Relations</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<p className='small-text'>
									ATTY. NOEL D. BALSICAS
									<br />
									WHISTLEBLOWER RELATIONS
									<br />
									OFFICER (WRO)
									<br />
									Telephone: 86322-WRO
									<br />
									[86322-976]
									<br />
									Mobile: 09177-WRO-SMC
									<br />
									[0917-7976-762]
									<br />
									smcwhistleblower@sanmiguel.com.ph
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-6'>
							<Accordion.AccordionHeader className='AccordionHeader'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>Data Privacy and Security Office</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<div className='privacy-flex'>
									<Link to='/corporate/smc-privacy-statement/'>
										<img
											src={SMC_SOR}
											alt='Seal of Registration'
											className='dpo'
											data-filename='SMC_SOR.png'
										/>
									</Link>
									<p className='small-text'>
										Telephone: (+632) 8-632-3007
										<br />
										Email: dpo@sanmiguel.com.ph
										<br />
										Click{' '}
										<Link to='/corporate/smc-privacy-statement'>
											<b>here</b>
										</Link>{' '}
										to view our
										<br />
										NPC Seal of Registration
									</p>
								</div>
							</Accordion.AccordionContent>
						</Accordion.Item>
					</div>
				</Accordion.Root>

				<p className='copy text-center small-text'>
					Copyright &copy; {year} San Miguel Corporation. All Rights Reserved.
				</p>
			</motion.div>
		</footer>
	);
}
