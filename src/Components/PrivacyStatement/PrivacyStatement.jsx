import { Link } from 'react-router-dom';
import './privacystatement.scss';

import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function PrivacyStatement() {
	const privacy = useRef(null);
	const [initial, setInitial] = useState('5rem');
	const [scrolled, setScrolled] = useState(true);
	const { scrollYProgress } = useScroll();

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (latest > 0.05) setScrolled(false);
		else setScrolled(true);
	});

	const [[checked, expiry], setStorage] = useState([
		localStorage.getItem('privacy_checked'),
		localStorage.getItem('privacy_expiry'),
	]);

	const [visible, setVisible] = useState(false);
	const setPrivacy = (event) => {
		setVisible(false);
		let expiry = new Date();
		expiry.setDate(expiry.getDate() + 1);

		localStorage.setItem('privacy_checked', true);
		localStorage.setItem('privacy_expiry', expiry.toString());
		setStorage([true, expiry.toString()]);
	};

	useEffect(() => {
		let fileWidget = document.querySelector('.file-widget');
		if (!fileWidget) return;

		setInitial('0rem');
	}, []);

	useEffect(() => {
		if (!checked || new Date().getTime() > new Date(expiry).getTime()) {
			setVisible(true);
			return;
		}
	}, [checked, expiry]);
	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					ref={privacy}
					className='privacy-statement'
					animate={{
						bottom: scrolled ? initial : '0rem',
					}}
					initial={{
						opacity: 1,
						x: '-50%',
						y: '0%',
					}}
					enter={{
						opacity: 1,
						y: '-5%',
					}}
					exit={{
						opacity: 0,
						y: '5%',
					}}>
					<div className='container-fluid-width'>
						<p>
							We have an updated Privacy Statement.{' '}
							<Link to='/corporate/corporate-governance/smc-privacy-statement'>
								<b>Learn&nbsp;More</b>
							</Link>
						</p>
						<button
							className='btn'
							onClick={(event) => {
								setPrivacy();
							}}>
							I Agree
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
