import { motion } from 'framer-motion';
import { FaViber } from 'react-icons/fa';
import { ImFacebook, ImLinkedin2, ImYoutube } from 'react-icons/im';
import { LuInstagram } from 'react-icons/lu';
import { PiEnvelopeSimpleBold } from 'react-icons/pi';
import { getColors } from 'src/hooks/use-color';
const { gray2, blue, baseBlack } = getColors;
const footerIcon = {
	size: '3.25rem',
	color: baseBlack,
};
export default function SocialIcons({
	fb_link,
	ig_link,
	yt_link,
	li_link,
	vb_link,
}) {
	return (
		<div className='social-icon'>
			<FacebookIcon link={fb_link} />
			<InstagramIcon link={ig_link} />
			<YoutubeIcon link={yt_link} />
			<LinkedInIcon link={li_link} />
			<ViberIcon link={vb_link} />
		</div>
	);
}

export function FacebookIcon({ link }) {
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
			{link ? (
				<a href={link} target='_blank' without='true' rel='noreferrer'>
					<ImFacebook size={footerIcon.size} />
				</a>
			) : (
				<ImFacebook size={footerIcon.size} />
			)}
		</motion.div>
	);
}

export function InstagramIcon({ link }) {
	return (
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
			{link ? (
				<a href={link} target='_blank' without='true' rel='noreferrer'>
					<LuInstagram size={footerIcon.size} />
				</a>
			) : (
				<LuInstagram size={footerIcon.size} />
			)}
		</motion.div>
	);
}

export function YoutubeIcon({ link }) {
	return (
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
			{link ? (
				<a href={link} target='_blank' without='true' rel='noreferrer'>
					<ImYoutube size={footerIcon.size} />
				</a>
			) : (
				<ImYoutube size={footerIcon.size} />
			)}
		</motion.div>
	);
}

export function LinkedInIcon({ link }) {
	return (
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
			{link ? (
				<a href={link} target='_blank' without='true' rel='noreferrer'>
					<ImLinkedin2 size={footerIcon.size} />
				</a>
			) : (
				<ImLinkedin2 size={footerIcon.size} />
			)}
		</motion.div>
	);
}

export function ViberIcon({ link }) {
	return (
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
			{link ? (
				<a href={link} target='_blank' without='true' rel='noreferrer'>
					<FaViber size={footerIcon.size} />
				</a>
			) : (
				<FaViber size={footerIcon.size} />
			)}
		</motion.div>
	);
}

export function EmailIcon({ link }) {
	return (
		<motion.div
			className='social-icons'
			initial={{
				backgroundColor: gray2,
			}}
			whileHover={{
				scale: 1.2,
				color: '#ffffff',
				backgroundColor: blue,
			}}
			whileTap={{ scale: 0.9 }}>
			{link ? (
				<a href={link} target='_blank' without='true' rel='noreferrer'>
					<PiEnvelopeSimpleBold size={footerIcon.size} />
				</a>
			) : (
				<PiEnvelopeSimpleBold size={footerIcon.size} />
			)}
		</motion.div>
	);
}
