import { motion } from 'framer-motion';
import { ImFacebook, ImYoutube, ImLinkedin2 } from 'react-icons/im';
import { FaViber } from 'react-icons/fa';
import { LuInstagram } from 'react-icons/lu';
import { getColors } from 'src/hooks/use-color';

export default function SocialIcons() {
	const { gray2, red, baseBlack } = getColors;
	const footerIcon = {
		size: '1.75rem',
		color: baseBlack,
	};
	return (
		<div
			style={{
				display: 'flex',
				gap: '7.5px',
			}}>
			<FacebookIcon link={'https://www.facebook.com/officialsanmiguelcorp/'} />
			<motion.div
				className='social-icons'
				initial={{
					backgroundImage: `linear-gradient(45deg, ${gray2}, ${gray2})`,
				}}
				whileHover={{
					scale: 1.2,
					color: '#ffffff',
					backgroundImage:
						'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
				}}
				whileTap={{ scale: 0.9 }}>
				<a
					href='https://www.instagram.com/officialsanmiguelcorp/?hl=en'
					target='_blank'
					without='true'
					rel='noreferrer'>
					<LuInstagram size={footerIcon.size} />
				</a>
			</motion.div>

			<motion.div
				className='social-icons'
				initial={{
					backgroundColor: gray2,
				}}
				whileHover={{
					scale: 1.2,
					color: '#ffffff',
					backgroundColor: '#ea3324',
				}}
				whileTap={{ scale: 0.9 }}>
				<a
					href='https://www.youtube.com/channel/UCeEbMc0xcGz-potb5RxhMLQ'
					target='_blank'
					without='true'
					rel='noreferrer'>
					<ImYoutube size={footerIcon.size} />
				</a>
			</motion.div>

			<motion.div
				className='social-icons'
				initial={{
					backgroundColor: gray2,
				}}
				whileHover={{
					scale: 1.2,
					color: '#ffffff',
					backgroundColor: '#2a6496',
				}}
				whileTap={{ scale: 0.9 }}>
				<a
					href='https://www.linkedin.com/company/san-miguel-corporation'
					target='_blank'
					without='true'
					rel='noreferrer'>
					<ImLinkedin2 size={footerIcon.size} />
				</a>
			</motion.div>

			<motion.div
				className='social-icons'
				initial={{
					backgroundColor: gray2,
				}}
				whileHover={{
					scale: 1.2,
					color: '#ffffff',
					backgroundColor: '#9069AE',
				}}
				whileTap={{ scale: 0.9 }}>
				<a
					href='https://invite.viber.com/?g2=AQBXThuOs%2FUC4EtMJHTcT1HGS%2BIm%2FqfGjmtyzIEmWP6lt9lijjc74sqm3o9mOJaq'
					target='_blank'
					without='true'
					rel='noreferrer'>
					<FaViber size={footerIcon.size} />
				</a>
			</motion.div>
		</div>
	);
}

export function FacebookIcon({ link }) {
	const { gray2, red, baseBlack } = getColors;
	const footerIcon = {
		size: '1.75rem',
		color: baseBlack,
	};
	return (
		<motion.div
			className='social-icons'
			initial={{
				backgroundColor: gray2,
			}}
			whileHover={{
				scale: 1.2,
				color: '#ffffff',
				backgroundColor: '#3975ea',
			}}
			whileTap={{ scale: 0.9 }}>
			<a href={link} target='_blank' without='true' rel='noreferrer'>
				<ImFacebook size={footerIcon.size} />
			</a>
		</motion.div>
	);
}
