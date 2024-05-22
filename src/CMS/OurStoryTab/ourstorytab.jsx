import React, { useState } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { getColors } from 'src/hooks/use-color';

export default function OurStoryTab() {
	const { red, baseBlack } = getColors;
	const [selected, setSelected] = useState(0);
	const other_variants = {
		initial: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		done: {
			opacity: 0,
		},
	};

	const tab_variants = {
		initial: {
			opacity: 0,
			z: 20,
			y: 50,
		},
		enter: {
			opacity: 1,
			z: 0,
		},
		done: (index) => {
			return {
				opacity: 1 - (selected - index) * 0.33,
				z: (selected - index) * -20,
				y: (selected - index) * -60,
			};
			// opacity: (index) => {
			// 	return 1 - (selected - index) * 0.15;
			// },
		},
	};

	const button_variants = {
		initial: {
			color: red,
			opacity: 1,
		},
		enter: {
			color: baseBlack,
			opacity: 1,
		},
		done: (index) => {
			return {
				color: red,
				opacity: 1 - (selected - index) * 0.15,
			};
			// opacity: (index) => {
			// 	return 1 - (selected - index) * 0.15;
			// },
		},
	};
	return (
		<motion.div
			className='column ourstory-col'
			style={{
				display: 'flex',
				gap: '5rem',
			}}>
			<div
				className=''
				style={{
					flex: '1 1 47%',
				}}>
				<h3>
					Pellentesque cras tortor viverra dui tempor semper cum sed. Sit ut.
				</h3>

				<div className='tab-source tabsource-ourstory'>
					<motion.button
						className={`tab-links ${selected === 0 ? 'active' : ''}`}
						animate={
							selected === 0 ? 'enter' : 0 < selected ? 'done' : 'initial'
						}
						onTap={() => {
							setSelected(0);
						}}>
						<motion.h3
							custom={0}
							variants={button_variants}
							className='heading-3'>
							Vision
						</motion.h3>
						<motion.div
							className='ourstory-accordion'
							animate={{
								height: selected === 0 ? 'auto' : 0,
							}}>
							<div>
								<p>
									A resilient and globally-competitive Philippines where
									everyone can enrich and enjoy their lives.
								</p>
							</div>
						</motion.div>
					</motion.button>
					<motion.button
						className={`tab-links ${selected === 1 ? 'active' : ''}`}
						animate={
							selected === 1 ? 'enter' : 1 < selected ? 'done' : 'initial'
						}
						onTap={() => {
							setSelected(1);
						}}>
						<motion.h3
							custom={2}
							variants={button_variants}
							className='heading-3'>
							Purpose
						</motion.h3>
						<motion.div
							className='ourstory-accordion'
							animate={{
								height: selected === 1 ? 'auto' : 0,
							}}>
							<div>
								<p>
									To lead in nation-building by creating opportunities that will
									uplift generations of Filipinos,
								</p>
							</div>
						</motion.div>
					</motion.button>
					<motion.button
						className={`tab-links ${selected === 2 ? 'active' : ''}`}
						animate={
							selected === 2 ? 'enter' : 2 < selected ? 'done' : 'initial'
						}
						onTap={() => {
							setSelected(2);
						}}>
						<motion.h3
							custom={2}
							variants={button_variants}
							className='heading-3'>
							Value
						</motion.h3>
						<motion.div
							className='ourstory-accordion'
							animate={{
								height: selected === 2 ? 'auto' : 0,
							}}>
							<div>
								<p>
									<b>
										<i>Malasakit</i>
									</b>
									is at the core of who we are as a company.
								</p>
								<ul>
									<li>Excellence</li>
									<li>Accountability</li>
									<li>Sustainability</li>
								</ul>
							</div>
						</motion.div>
					</motion.button>
				</div>
			</div>
			<div
				style={{
					flex: '1 1 47%',
					position: 'relative',
				}}>
				<div className='tab-target'>
					<div className='ourstory-grid'>
						<motion.div
							animate={
								selected === 0 ? 'enter' : 0 < selected ? 'done' : 'initial'
							}
							className='ourstory-tab-item'
							custom={0}
							variants={tab_variants}>
							<div className='mobile-only'>
								<h3 className='heading-3'>Vision</h3>
								<p>
									A resilient and globally-competitive Philippines where
									everyone can enrich and enjoy their lives.
								</p>
							</div>
							<motion.img
								variants={other_variants}
								className='ourstory-tab-icon'
								src={`/images/ph.svg`}
							/>
							<img src={`/images/OurStory/OurStory-4.png`} />
							<motion.p variants={other_variants}>
								Eu phasellus nunc neque porta laoreet maecenas tortor in. Magnis
								sit leo at a tortor. Quis massa tellus ut arcu sit sed sed. In
								ultrices curabitur leo eu.
							</motion.p>
						</motion.div>
						<motion.div
							className='ourstory-tab-item'
							custom={1}
							animate={
								selected === 1 ? 'enter' : 1 < selected ? 'done' : 'initial'
							}
							variants={tab_variants}>
							<div className='mobile-only'>
								<h3 className='heading-3'>Purpose</h3>
								<p>
									To lead in nation-building by creating opportunities that will
									uplift generations of Filipinos,
								</p>
							</div>
							<motion.img
								variants={other_variants}
								className='ourstory-tab-icon'
								src={`/images/tao.svg`}
							/>
							<img src={`/images/OurStory/OurStory-5.png`} />
							<motion.p variants={other_variants}>
								Eu phasellus nunc neque porta laoreet maecenas tortor in. Magnis
								sit leo at a tortor. Quis massa tellus ut arcu sit sed sed. In
								ultrices curabitur leo eu.
							</motion.p>
						</motion.div>
						<motion.div
							className='ourstory-tab-item'
							custom={2}
							animate={
								selected === 2 ? 'enter' : 2 < selected ? 'done' : 'initial'
							}
							variants={tab_variants}>
							<div className='mobile-only'>
								<h3 className='heading-3'>Value</h3>
								<p>
									<b>
										<i>Malasakit</i>
									</b>
									is at the core of who we are as a company.
								</p>
								<ul>
									<li>Excellence</li>
									<li>Accountability</li>
									<li>Sustainability</li>
								</ul>
							</div>
							<motion.img
								variants={other_variants}
								className='ourstory-tab-icon'
								src={`/images/heart.svg`}
							/>
							<img src={`/images/OurStory/OurStory-6.png`} />
							<motion.p variants={other_variants}>
								Eu phasellus nunc neque porta laoreet maecenas tortor in. Magnis
								sit leo at a tortor. Quis massa tellus ut arcu sit sed sed. In
								ultrices curabitur leo eu.
							</motion.p>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
