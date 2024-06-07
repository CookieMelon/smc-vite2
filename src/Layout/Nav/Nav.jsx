import {
	animate,
	motion,
	useCycle,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuContext, PreloadContext, ThemeContext } from '../../App';
import { useGetBannerData, useGetToggleFill } from '../../data/data';
import { enterDuration } from '../layout-anim';

import EscudoGray from '../../images/smc-logo-gray.svg';
import EscudoWhite from '../../images/smc-logo-white.svg';
import Escudo from '../../images/smc-logo.svg';

import * as Dialog from '@radix-ui/react-dialog';
import 'src/styles/radix-dialog.scss';

import { PiCaretDownBold, PiCaretUpBold, PiXCircle } from 'react-icons/pi';

import { useWindowSize } from '@uidotdev/usehooks';
import { getColors } from '../../hooks/use-color';
import SocialIcons, { FacebookIcon } from '../Footer/social-icon';
import {
	floatingNavContent_variants,
	path1_variants,
	path2_variants,
	path3_variants,
	toggleSettings,
	transitionSettings,
} from './anim';
import { getLink } from './nav-helper';
import Search from './search';

const preload_variants = {
	initial: {
		opacity: 0,
	},
	preload: {
		opacity: 0,
	},

	'smc-default': {
		opacity: 1,
	},

	'smc-red': {
		opacity: 1,
	},
	'smc-yellow': {
		opacity: 1,
	},
	'smc-blue': {
		opacity: 1,
	},
};

const HoveredContext = createContext(null);

export default function Nav({}) {
	const router = useLocation();
	const { color } = useGetBannerData();
	const { preload, doneIntro } = useContext(PreloadContext);
	const { smcThemeDelayed, smcTheme } = useContext(ThemeContext);
	const [[navIndex, navHovered], setHovered] = useState([null, false]);
	const className = router.pathname === '/' ? 'home' : 'inner';
	const [navColor, setNavColor] = useState('#ffffff');
	const { scrollY } = useScroll();
	const [navOpen, navShow] = useState(true);
	const [isToggleOpen, toggle] = useCycle(false, true);
	const { red, blue, yellow, baseBlack } = getColors;

	const [anim, setAnim] = useState('preload');

	const [hideNav, setHideNav] = useState(false);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest < 100) {
			navShow(true);
		} else {
			navShow(false);
		}
	});

	useEffect(() => {
		if (router.pathname.split('/')[1] === 'page') setHideNav(true);
	}, [router.pathname]);

	useEffect(() => {
		console.log(hideNav);
	}, [hideNav]);

	const getNavColor = () => {
		switch (smcThemeDelayed) {
			case 'smc-red':
				return '#ffffff';
			case 'smc-blue':
				return '#ffffff';
			case 'smc-yellow':
				return baseBlack;
			default:
				return '#ffffff';
		}
	};

	const getBackground = (smcThemeDelayed) => {
		switch (smcThemeDelayed) {
			case 'smc-red':
				return red;
			case 'smc-blue':
				return blue;
			case 'smc-yellow':
				return yellow;
			default:
				return '#ffffff00';
		}
	};

	useEffect(() => {
		switch (smcTheme) {
			case 'smc-yellow':
				setNavColor(baseBlack);
			case 'smc-default':
				setNavColor(color ? color : '#ffffff');
			default:
				setNavColor('#ffffff');
		}
	}, [smcTheme, color]);
	useEffect(() => {
		getBackground(navIndex, navHovered);
	}, [navIndex, navHovered]);

	const default_variants = {
		opacity: 1,
		y: '0%',
		transition: {
			duration: 0.35,
			ease: [0.76, 0, 0.24, 1],
			opacity: {
				duration: 1,
			},
			// color: {
			// 	delay: enterDuration - 0.75,
			// },
		},
	};

	const navContainer_variants = {
		initial: {
			opacity: 1,
			y: '0%',
			color: navColor,
			transition: {
				y: {
					duration: 0.5,
				},
			},
		},
		'smc-red': {
			...default_variants,
			...{
				backgroundColor: red,
				color: navColor,
			},
		},
		'smc-yellow': {
			...default_variants,
			...{
				backgroundColor: yellow,
				color: baseBlack,
			},
		},
		'smc-blue': {
			...default_variants,
			...{
				backgroundColor: blue,
				color: navColor,
			},
		},
		'smc-default': {
			...default_variants,
			...{
				color: color,
			},
		},
		preload: {
			opacity: 0,
			color: navColor,
			transition: {
				duration: 2,
				staggerChildren: 0.5,
			},
		},

		closed: {
			opacity: 1,
			y: '-100%',
			color: navColor,
			transition: {
				duration: 0.35,
				ease: [0.76, 0, 0.24, 1],
			},
		},
	};

	useEffect(() => {
		if (!(preload && doneIntro)) setAnim('preload');
		else {
			if (navOpen) {
				setAnim(smcTheme);
			} else setAnim('closed');
		}
	}, [preload, doneIntro, navOpen, smcTheme]);

	return (
		<HoveredContext.Provider value={{ navIndex, navHovered, setHovered }}>
			<motion.div
				initial='initial'
				animate={anim}
				className={`${className} nav-container ${smcTheme}`}>
				<motion.div
					variants={navContainer_variants}
					className='container-fluid-width large'>
					<motion.div variants={preload_variants} className='brand-logo'>
						<NavLink to='/'>
							<figure>
								<motion.img
									variants={{
										initial: {
											opacity: 0,
										},
										'smc-default': {
											opacity: 1,
										},
										closed: {
											opacity: 1,
										},
									}}
									src={Escudo}
									alt='SMC Logo'
								/>
								<motion.img
									variants={{
										initial: {
											opacity: 0,
										},
										'smc-red': {
											opacity: 1,
										},
										'smc-blue': {
											opacity: 1,
										},
										closed: {
											opacity: 1,
										},
									}}
									src={EscudoWhite}
									alt='SMC Logo White'
								/>
								<motion.img
									variants={{
										initial: {
											opacity: 0,
										},
										'smc-yellow': {
											opacity: 1,
										},
										closed: {
											opacity: 1,
										},
									}}
									src={EscudoGray}
									alt='SMC Logo White'
								/>
							</figure>
						</NavLink>
					</motion.div>

					{!hideNav && <MainNav animation={false} />}
					{!hideNav && <Search preload_variants={preload_variants} />}
				</motion.div>

				{!hideNav && (
					<FloatingNav
						navOpen={navOpen}
						isToggleOpen={isToggleOpen}
						toggle={toggle}
					/>
				)}
			</motion.div>
			<motion.div
				className='hover-cover'
				animate={{
					opacity: navHovered ? 1 : 0,
				}}></motion.div>
		</HoveredContext.Provider>
	);
}

export function MainNav({ c, animation = true, toggle }) {
	const menu = useContext(MenuContext);
	const nav = useRef(null);
	const { navIndex, navHovered, setHovered } = useContext(HoveredContext);
	const navItem_variants = {
		open: {
			y: '-100%',
		},
		initial: {
			backgroundColor: `rgba(0,0,0,0)`,
		},
		hover: {
			backgroundColor: `rgba(0,0,0,.1)`,
		},
	};

	const navDropdown_variants = {
		initial: {
			display: 'none',
		},
		hover: {
			display: 'block',
		},
	};

	const navAccordion = (event) => {
		let target = event.target;
		let accordionGroup = target.closest('.accordion-group');
		let accordionSource = target.closest('.accordion-source');
		let accordionButton = target.closest('button');
		let accordionTarget = event.target
			.closest('.accordion-source')
			.querySelector('.accordion-target');

		let accordionSources = [...accordionGroup.childNodes].filter(
			(i) => i !== accordionSource
		);

		let accordionTargets = [...accordionSources]
			.map((source) => {
				return source.querySelector('.accordion-target');
			})
			.filter((i) => {
				return i !== null;
			});

		let toClose = [...accordionTargets].filter((i) => {
			return i !== accordionTarget;
		});

		if (event.target.closest('button').classList.contains('active')) {
			accordionButton.classList.remove('active');
			animate(accordionTarget, {
				height: '0px',
			});
		} else {
			accordionButton.classList.add('active');
			animate(accordionTarget, {
				height: 'auto',
			});
		}

		if (toClose.length)
			animate(toClose, {
				height: '0px',
			});
		[...accordionTargets].map((target) => {
			target.classList.remove('active');
		});
		[...accordionSources].map((source) => {
			let button = source.childNodes[0].querySelector('button');
			if (button) button.classList.remove('active');
		});
	};

	return (
		<motion.div
			className={`${c} main-nav accordion-group`}
			variants={{
				...preload_variants,
				...{
					initial: {
						y: 0,
						opacity: 0,
						transition: {
							color: {
								delay: enterDuration - 0.75,
							},
							// delayChildren: 0.5,
						},
					},
					open: {
						y: -25,
						opacity: 1,
						transition: {
							staggerChildren: 0.015,
							color: {
								delay: enterDuration - 0.75,
							},
							// delayChildren: 0.5,
						},
					},
				},
			}}>
			{menu.map((item_lvl1, index) => {
				let activeClass = animation ? (index === 0 ? 'active' : '') : '';
				let height = animation ? (index === 0 ? 'auto' : '0px') : 'auto';
				let link = getLink(item_lvl1);

				if (link === '/home') return;

				return (
					<motion.div
						className='nav-item accordion-source'
						whileHover='hover'
						onHoverStart={() => {
							if (item_lvl1.navigations.length !== 0) setHovered([index, true]);
						}}
						onHoverEnd={() => {
							setHovered([null, false]);
						}}
						variants={navItem_variants}
						key={`menuItem_lvl1_${item_lvl1.page_id}`}>
						<div className='nav-item-link'>
							<NavLink end {...link} onClick={toggle}>
								{item_lvl1.page_title}
							</NavLink>
							{item_lvl1.navigations.length !== 0 && animation && (
								<button
									className={`${activeClass}`}
									onClick={(event) => {
										navAccordion(event);
									}}>
									<PiCaretDownBold className='open' fontSize={'1.75rem'} />
									<PiCaretUpBold className='close' fontSize={'1.75rem'} />
								</button>
							)}
						</div>
						{item_lvl1.navigations.length !== 0 && (
							<motion.div
								className='nav-dropdown accordion-target'
								style={{
									height: height,
									zIndex: navHovered && navIndex === index ? 1 : -1,
									display: navHovered && navIndex === index ? 'block' : 'none',
								}}>
								<div className='container-fluid-width medium accordion-group'>
									{item_lvl1.navigations.map((item_lvl2, index2) => {
										let flexValue = '1 1 40%';
										if (index == 2) flexValue = '1 1 25%';
										if (index === 2 && index2 == 0) flexValue = '1 1 50%';
										let activeClass = animation
											? index === 0 && index2 === 0
												? 'active'
												: ''
											: '';
										let height = animation
											? index === 0 && index2 === 0
												? 'auto'
												: '0px'
											: 'auto';

										let link = getLink(item_lvl2);

										let columnClass =
											item_lvl2.navigations.length > 4
												? index === 2 && index2 === 2
													? ''
													: 'column-2'
												: '';

										let bold = index === 2 && index2 === 2;

										return (
											<div
												className={`inner-dropdown accordion-source ${
													bold ? 'bold' : ''
												}`}
												key={`menuItem_lvl2_${item_lvl2.page_id}`}
												style={{
													flex: flexValue,
													// columnCount: index === 2 && index2 === 2 ? 1 : 2,
												}}>
												<motion.b
													whileHover='hover'
													className='inner-dropdown-link'>
													<NavLink end {...link} onClick={toggle}>
														{item_lvl2.page_title}
													</NavLink>
													{item_lvl2.navigations.length !== 0 && animation && (
														<button
															className={`${activeClass}`}
															onClick={(event) => {
																navAccordion(event);
															}}>
															<PiCaretDownBold
																className='open'
																fontSize={'1.5rem'}
															/>
															<PiCaretUpBold
																className='close'
																fontSize={'1.5rem'}
															/>
														</button>
													)}
												</motion.b>

												{item_lvl2.navigations.length !== 0 && (
													<div
														style={{
															height: height,
														}}
														className={`${columnClass} inner_lvl2-dropdown accordion-target accordion-group`}>
														{item_lvl2.navigations.map((item_lvl3, index) => {
															let link = getLink(item_lvl3);
															if (link.to !== 'find-us-on-social-media')
																return (
																	<div
																		key={`menuItem_lvl3_${item_lvl3.page_id}`}
																		className='accordion-source'
																		style={{
																			breakInside: 'avoid-column',
																		}}>
																		<div
																			className={`inner_lvl2-dropdown-link ${
																				bold ? 'bold' : ''
																			}`}>
																			<NavLink end {...link} onClick={toggle}>
																				{item_lvl3.page_title}
																			</NavLink>

																			{item_lvl3.navigations.length !== 0 && (
																				<button
																					onClick={(event) => {
																						navAccordion(event);
																					}}>
																					<PiCaretDownBold
																						className='open'
																						fontSize={'1.25rem'}
																					/>
																					<PiCaretUpBold
																						className='close'
																						fontSize={'1.25rem'}
																					/>
																				</button>
																			)}
																		</div>
																		{item_lvl3.navigations.length !== 0 && (
																			<div
																				className={`inner_lvl3-dropdown accordion-target`}
																				style={{
																					height: 0,
																					listStyle: 'circle',

																					overflow: 'hidden',
																				}}>
																				{item_lvl3.navigations.length !== 0 && (
																					<motion.ul>
																						{item_lvl3.navigations.map(
																							(item_lvl4, index) => {
																								let link = getLink(item_lvl4);

																								return (
																									<li
																										key={`menuItem_lvl4_${item_lvl4.page_id}`}>
																										<NavLink
																											end
																											{...link}
																											onClick={toggle}>
																											{item_lvl4.page_title}
																										</NavLink>
																									</li>
																								);
																							}
																						)}
																					</motion.ul>
																				)}
																			</div>
																		)}
																	</div>
																);
															else
																return (
																	<FindUsPopup
																		key={'finduspopup'}
																		toggle={toggle}
																		item_lvl3={item_lvl3}
																		bold={bold}
																	/>
																);
														})}
													</div>
												)}
											</div>
										);
									})}
								</div>
							</motion.div>
						)}
					</motion.div>
				);
			})}
		</motion.div>
	);
}

function FindUsPopup({ toggle, item_lvl3, bold }) {
	return (
		<Dialog.Root modal={true}>
			<Dialog.Trigger asChild>
				<div
					key={`menuItem_lvl3_${item_lvl3.page_id}`}
					className='accordion-source'
					style={{
						breakInside: 'avoid-column',
					}}>
					<div className={`inner_lvl2-dropdown-link ${bold ? 'bold' : ''}`}>
						<a onClick={toggle}>{item_lvl3.page_title}</a>

						{item_lvl3.navigations.length !== 0 && (
							<button
								onClick={(event) => {
									navAccordion(event);
								}}>
								<PiCaretDownBold className='open' fontSize={'1.25rem'} />
								<PiCaretUpBold className='close' fontSize={'1.25rem'} />
							</button>
						)}
					</div>
				</div>

				{/* <Button className='subsidiary-btn btn btn-bordered'>
								Subsidiary Websites
								<PiCaretDownBold fontSize={'1.35rem'} />
							</Button> */}
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='DialogOverlay' />
				<Dialog.Content className='DialogContent' data-lenis-prevent='true'>
					<h3 className='DialogContent-title'>Find us on Social media</h3>
					<p>
						<b>San Miguel Social Media</b>
					</p>

					<SocialIcons />

					<p>
						<b>Follow RSA on social media!</b>
					</p>

					<div style={{ display: 'flex', gap: '7.5px' }}>
						<FacebookIcon link={'https://www.facebook.com/smcramonang/'} />
					</div>
					<Dialog.Close className='IconButton' aria-label='Close' asChild>
						<PiXCircle size={'2rem'} />
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function FloatingNav({ navOpen, isToggleOpen, toggle }) {
	const { baseBlack, red, blue, yellow } = getColors;
	const { toggleFill } = useGetToggleFill();
	const toggleNav = useRef();
	const { smcTheme, smcThemeDelayed } = useContext(ThemeContext);

	// const [isToggleOpen, toggle] = useCycle(true, true);
	const getNavColor = () => {
		switch (smcThemeDelayed) {
			case 'smc-red':
				return '#ffffff';
			case 'smc-blue':
				return '#ffffff';
			case 'smc-yellow':
				return baseBlack;
			default:
				return '#ffffff';
		}
	};

	const getBackground = (smcThemeDelayed) => {
		switch (smcThemeDelayed) {
			case 'smc-red':
				return red;
			case 'smc-blue':
				return blue;
			case 'smc-yellow':
				return yellow;
			default:
				return '#ffffff00';
		}
	};

	const toggleDefaults = {
		stroke: '#ffffff',
		strokeWidth: '3px',
		strokeLinecap: 'round',
	};

	return (
		<motion.div className={`nav-toggle ${smcTheme}`}>
			<FloatingNavContent
				isToggleOpen={isToggleOpen}
				toggle={toggle}></FloatingNavContent>
			<motion.div
				className='nav-toggle-trigger'
				whileHover={isToggleOpen ? 'open' : 'hovered'}
				animate={isToggleOpen ? 'open' : !navOpen ? 'navopen' : 'initial'}
				variants={{
					initial: {
						scale: 0,
					},
					navopen: {
						scale: 1,
					},
					closed: {
						scale: 1,
					},
				}}
				onTap={toggle}>
				<svg
					width={toggleSettings.size}
					height={toggleSettings.size}
					viewBox={`0 0 ${toggleSettings.size} ${toggleSettings.size}`}
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<motion.circle
						cx={toggleSettings.size / 2}
						cy={toggleSettings.size / 2}
						r={30}
					/>
					<motion.path
						className='toggle_path1'
						{...toggleDefaults}
						variants={path1_variants}
						initial={path1_variants.initial}
						style={{
							transformOrigin: '35px 27px !important',
						}}
					/>
					<motion.path
						className='toggle_path2'
						{...toggleDefaults}
						variants={path2_variants}
						initial={path2_variants.initial}
						style={{
							transformOrigin: '35px 35px !important',
						}}
					/>
					<motion.path
						className='toggle_path3'
						{...toggleDefaults}
						variants={path3_variants}
						initial={path3_variants.initial}
						style={{
							transformOrigin: '35px 43px !important',
						}}
					/>
				</svg>
			</motion.div>
		</motion.div>
	);
}

function FloatingNavContent({ isToggleOpen, toggle }) {
	const { red } = getColors;
	const windowDimensions = useWindowSize();
	const toggleNav = useRef();

	useEffect(() => {
		if (isToggleOpen) document.querySelector('body').style.overflow = 'hidden';
		else document.querySelector('body').style.overflow = 'auto';
	}, [isToggleOpen]);

	const big_1_variants = {
		open: {
			opacity: 1,
			x: windowDimensions ? `${windowDimensions.height}px` : '0px',
			y: windowDimensions ? `-${windowDimensions.height}px` : '0px',
			transition: transitionSettings,
		},
		initial: {
			opacity: 0,
			x: windowDimensions ? `-${windowDimensions.height}px` : '0px',
			y: windowDimensions ? `${windowDimensions.height}px` : '0px',
			transition: transitionSettings,
		},
	};

	const path_variants = {
		open: {
			opacity: 1,
			x: `0px`,
			y: `0px`,
			transition: transitionSettings,
		},
		initial: {
			opacity: 0,
			x: windowDimensions ? `-${windowDimensions.height / 20}px` : '0px',
			y: windowDimensions ? `${windowDimensions.height / 20}px` : '0px',
			transition: transitionSettings,
		},
	};

	const circleBg_variants = {
		initial: {
			opacity: 0,
			r:
				windowDimensions.height > windowDimensions.width
					? windowDimensions.height * 1.5
					: windowDimensions.width * 1.5,
			fill: red,
			transition: transitionSettings,
		},
		open: {
			opacity: 1,
			r:
				windowDimensions.height > windowDimensions.width
					? windowDimensions.height * 1.5
					: windowDimensions.width * 1.5,
			transition: transitionSettings,
		},
	};

	function scroll(event) {
		toggleNav.current.scrollTop += event.deltaY / 3;
	}

	useEffect(() => {
		toggleNav.current.removeEventListener('wheel', scroll, { passive: true });
		toggleNav.current.addEventListener('wheel', scroll, { passive: true });
	}, [toggleNav]);

	return (
		<motion.div
			ref={toggleNav}
			className={`nav-toggle-content ${isToggleOpen ? 'active' : ''}`}
			animate={isToggleOpen ? 'open' : 'initial'}
			variants={floatingNavContent_variants}>
			{windowDimensions.width !== null && (
				<svg
					className='nav-toggle-bg-elements'
					width={windowDimensions.width}
					height={windowDimensions.height}
					viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}>
					<motion.circle
						className='circle-bg'
						variants={circleBg_variants}
						initial={circleBg_variants.initial}></motion.circle>

					<motion.path
						className='path_bg 1'
						d='M-262 637 L43 332'
						stroke='white'
						strokeWidth='160'
						strokeLinecap='round'
						variants={path_variants}
						initial={path_variants.initial}
					/>

					<motion.path
						className='path_bg 2'
						d='M-318 875L171 386'
						stroke='#F8D258'
						strokeWidth='180'
						strokeLinecap='round'
						variants={path_variants}
						initial={path_variants.initial}
					/>
					<motion.path
						className='path_bg 3'
						d={`M${windowDimensions.width - 350} ${250} 
					L${windowDimensions.width - 200} ${100}`}
						stroke='#F8D258'
						strokeWidth='125'
						strokeLinecap='round'
						variants={path_variants}
						initial={path_variants.initial}
					/>

					<motion.path
						className='path_bg'
						d={`M${windowDimensions.width - 100} ${
							windowDimensions.height / 2 - 150
						} 
						L${windowDimensions.width + 150} ${windowDimensions.height / 2 - 400}`}
						stroke='white'
						strokeWidth='160'
						strokeLinecap='round'
						variants={path_variants}
						initial={path_variants.initial}
					/>

					<motion.path
						className='path_bg'
						d={`M${windowDimensions.width - 150} ${
							windowDimensions.height - 250
						} 
						L${windowDimensions.width + 100} ${windowDimensions.height - 500}`}
						stroke='#3779B0'
						strokeWidth='160'
						strokeLinecap='round'
						variants={path_variants}
						initial={path_variants.initial}
					/>
					<motion.path
						className='path_bg'
						d={`M${windowDimensions.width - 600} ${
							windowDimensions.height + 200
						} 
						L${windowDimensions.width - 300} ${windowDimensions.height - 100}`}
						stroke='white'
						strokeWidth='160'
						strokeLinecap='round'
						variants={path_variants}
						initial={path_variants.initial}
					/>
				</svg>
			)}
			<MainNav
				c={'toggle-nav'}
				defaultOpen={false}
				animation={true}
				toggle={toggle}
			/>
		</motion.div>
	);
}
