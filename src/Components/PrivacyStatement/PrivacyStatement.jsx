import { Link } from 'react-router-dom';
import './privacystatement.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PrivacyStatement() {
	const [[checked, expiry], setStorage] = useState([
		localStorage.getItem('privacy_checked'),
		localStorage.getItem('expiry'),
	]);

	const [visible, setVisible] = useState(false);
	const setPrivacy = (event) => {
		setVisible(false);
		let expiry = new Date();
		expiry.setDate(expiry.getDate() + 1);

		localStorage.setItem('privacy_checked', true);
		localStorage.setItem('expiry', expiry.toString());
		setStorage([true, expiry.toString()]);
	};

	useEffect(() => {
		if (expiry !== null) {
			if (!checked || new Date().getTime() > new Date(expiry).getTime()) {
				setVisible(true);
				return;
			}
		}
	}, [checked, expiry]);
	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className='privacy-statement'
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
