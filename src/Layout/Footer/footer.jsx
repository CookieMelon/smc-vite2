import { motion, useScroll, useTransform } from 'framer-motion';

import { useRef } from 'react';

import { PiCaretDown, PiXCircle } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { getColors } from 'src/hooks/use-color';
import SocialIcons from './social-icon';

import SMC_SOR from 'src/images/SMC_SOR.png';
import FooterLogos from 'src/images/footer-other-logo.png';
import 'src/styles/radix-accordion.scss';
import 'src/styles/radix-dialog.scss';

import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';

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
					<SocialIcons
						fb_link='https://www.facebook.com/officialsanmiguelcorp/'
						ig_link='https://www.instagram.com/officialsanmiguelcorp/?hl=en'
						yt_link='https://www.youtube.com/channel/UCeEbMc0xcGz-potb5RxhMLQ'
						li_link='https://www.linkedin.com/company/san-miguel-corporation'
						vb_link='https://invite.viber.com/?g2=AQBXThuOs%2FUC4EtMJHTcT1HGS%2BIm%2FqfGjmtyzIEmWP6lt9lijjc74sqm3o9mOJaq'
					/>
					<Dialog.Root modal={true}>
						<Dialog.Trigger asChild>
							<button className='subsidiary-btn btn btn-bordered'>
								View subsidiary websites
							</button>
							{/* <Button className='subsidiary-btn btn btn-bordered'>
								Subsidiary Websites
								<PiCaretDownBold fontSize={'1.35rem'} />
							</Button> */}
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay className='DialogOverlay' />
							<Dialog.Content
								className='DialogContent'
								data-lenis-prevent='true'>
								<h3 className='DialogContent-title'>Subsidiary Websites</h3>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Bank of Commerce'
										href='https://www.bankcom.com.ph/'>
										Bank of Commerce
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Eagle Cement'
										href='https://www.eaglecement.com.ph/'>
										Eagle Cement
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Petron Corp.'
										href='https://www.petron.com/'>
										Petron Corp.
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Ginebra San Miguel'
										href='https://www.ginebrasanmiguel.com/'>
										Ginebra San Miguel
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Properties, Inc'
										href='https://www.sanmiguelproperties.com.ph/'>
										San Miguel Properties, Inc
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Foods'
										href='https://www.sanmiguelfoods.com/'>
										San Miguel Foods
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Great Food Solutions'
										href='https://greatfoodsolutions.com/'>
										Great Food Solutions
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Home Foodie'
										href='https://homefoodie.com.ph/'>
										Home Foodie
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Magnolia Chicken'
										href='https://magnoliachicken.com/'>
										Magnolia Chicken
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Northern Cement'
										href='https://www.ncc.com.ph/'>
										Northern Cement
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Petrogen Insurance Corporation'
										href='https://petrogen.com.ph/'>
										Petrogen Insurance Corporation
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Food and Beverage'
										href='https://www.smfb.com.ph/'>
										San Miguel Food and Beverage
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='Red Horse Beer'
										href='https://www.facebook.com/redhorsebeer'>
										Red Horse Beer
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Brewery Hong Kong'
										href='https://www.facebook.com/share/iM72sSaVKwECVNPL/?mibextid=LQQJ4d'>
										San Miguel Brewery Hong Kong
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Brewing International Ltd.'
										href='https://sanmiguelbrewery.com'>
										San Miguel Brewing International Ltd.
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Mart'
										href='https://www.sanmiguelmart.ph/'>
										San Miguel Mart
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Pale Pilsen'
										href='https://www.facebook.com/SanMiguelPalePilsen/'>
										San Miguel Pale Pilsen
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Mig Light'
										href='https://www.facebook.com/sanmiglightph/'>
										San Mig Light
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='San Miguel Super Dry'
										href='https://www.facebook.com/sanmiguelsuperdrybeer/'>
										San Miguel Super Dry
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='SMC Stock Transfer Service Corporation'
										href='https://smcstocktransfer.com.ph/'>
										SMC Stock Transfer Service Corporation
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='SMC Global Power Holdings Corp'
										href='https://www.smcglobalpower.com.ph/'>
										SMC Global Power Holdings Corp
									</a>
								</p>
								<p>
									<a
										target='_blank'
										without='true'
										rel='noopener noreferrer'
										title='South Luzon Tollway Corporation'
										href='https://smcslex.com.ph/'>
										South Luzon Tollway Corporation
									</a>
								</p>
								<Dialog.Close className='IconButton' aria-label='Close' asChild>
									<PiXCircle size={'2rem'} />
								</Dialog.Close>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</div>

				<Accordion.Root className='AccordionRoot' type='single' collapsible>
					<div className='footer-links-col'>
						<Accordion.Item className='AccordionItem' value='item-1'>
							<Accordion.AccordionHeader className='AccordionHeader heading-6'>
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
							<Accordion.AccordionHeader className='AccordionHeader heading-6'>
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
									<a href='customercare@sanmiguel.com.ph'>
										customercare@sanmiguel.com.ph
									</a>
									<br />
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-3'>
							<Accordion.AccordionHeader className='AccordionHeader heading-6'>
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
									<a href='mailto:smc_stsc@sanmiguel.com.ph'>
										smc_stsc@sanmiguel.com.ph
									</a>
									<br />
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>
					</div>
					<div className='footer-links-col'>
						<Accordion.Item className='AccordionItem' value='item-4'>
							<Accordion.AccordionHeader className='AccordionHeader heading-6'>
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
									<a href='mailto:smcwhistleblower@sanmiguel.com.ph'>
										smcwhistleblower@sanmiguel.com.ph
									</a>
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-5'>
							<Accordion.AccordionHeader className='AccordionHeader heading-6'>
								<Accordion.AccordionTrigger className='AccordionTrigger'>
									<span>Investor Relations</span>
									<PiCaretDown />
								</Accordion.AccordionTrigger>
							</Accordion.AccordionHeader>
							<Accordion.AccordionContent className='AccordionContent'>
								<p className='small-text'>
									SAN MIGUEL CORPORATION <br />
									<a href='mailto:SMCInvestorRelations@sanmiguel.com.ph'>
										SMCInvestorRelations@sanmiguel.com.ph
									</a>
									<br />
									Telephone: (+632) 8-632-8742 <br />
								</p>
							</Accordion.AccordionContent>
						</Accordion.Item>

						<Accordion.Item className='AccordionItem' value='item-6'>
							<Accordion.AccordionHeader className='AccordionHeader heading-6'>
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
