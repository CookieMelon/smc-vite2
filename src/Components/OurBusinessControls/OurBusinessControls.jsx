import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { APIContext } from 'src/App';
import Section from 'src/CMS/Section/Section';

import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSearchMenu } from 'src/data/data';
import { getColors } from 'src/hooks/use-color';

const { red } = getColors;
const api_url = import.meta.env.VITE_API_URL;

const control_img = {
	initial: {
		opacity: 1,
		scale: 1,
	},
	hover: {
		opacity: 0.5,
		scale: 0.9,
	},
};
const control_variants_prev = {
	initial: {
		x: '0rem',
	},
	hover: {
		x: '-1rem',
	},
};
const control_variants_next = {
	initial: {
		x: '0rem',
	},
	hover: {
		x: '1rem',
	},
};

export default function OurBusinessControls({ page_slug, parent_id }) {
	const { menuItem } = useSearchMenu(parent_id);
	const { ourBusinesses, setOurBusinesses } = useContext(APIContext);
	const [[prev, next], setControls] = useState([null, null]);
	useEffect(() => {});

	useEffect(() => {
		if (!menuItem) return;
		if (ourBusinesses.length !== 0) return;
		console.log(`${api_url}page/${menuItem.page_slug}/data-list`);
		fetch(`${api_url}page/${menuItem.page_slug}/data-list`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setOurBusinesses(data.filter((data) => data.set_as_sub_menu === 1));
			});

		console.log(menuItem);
	}, [menuItem]);

	useEffect(() => {
		if (ourBusinesses.length === 0) return;
		ourBusinesses.some((item, index) => {
			if (item.page_slug === page_slug) {
				setControls([index - 1, index + 1]);
				return true;
			}
		});
	}, [ourBusinesses]);

	useEffect(() => {
		console.log('prev', prev);
		console.log('prev', prev >= 0);
	}, [[prev]]);

	if (ourBusinesses.length !== 0)
		return (
			<Section containerClass='medium' sectionStyle={{ paddingTop: 0 }}>
				<motion.div className='page-controls'>
					{prev !== null && prev >= 0 && (
						<Control
							direction='prev'
							title={ourBusinesses[prev].page_title}
							link={`/${ourBusinesses[prev].page_slug_full}`}
						/>
					)}
					{next && next < ourBusinesses.length && (
						<Control
							direction='next'
							title={ourBusinesses[next].page_title}
							link={`/${ourBusinesses[next].page_slug_full}`}
						/>
					)}
				</motion.div>
			</Section>
		);
}

export function Control({ direction, title, link }) {
	const variants =
		direction === 'prev' ? control_variants_prev : control_variants_next;
	const label = direction === 'prev' ? 'Previous' : 'Next';
	const icon =
		direction === 'prev' ? (
			<BsArrowLeftCircle size={'1.75rem'} />
		) : (
			<BsArrowRightCircle size={'1.75rem'} />
		);
	return (
		<motion.div
			className={`control ${direction}`}
			initial='initial'
			whileHover='hover'
			transition={{
				staggerChildren: 0.02,
			}}>
			{/* <motion.div className='img-container' variants={control_variants_prev}>
		<motion.img
			variants={control_img}
			src={`${basePath}/images/OurBusinesses/thumb.png`}
		/>
	</motion.div> */}

			<Link to={link} className='control-details'>
				<motion.div className='arrow' variants={variants}>
					{icon}
				</motion.div>
				<motion.div>
					<motion.p variants={variants}>{label}</motion.p>
					<motion.p variants={variants} className='label heading-4'>
						{title}
					</motion.p>
				</motion.div>
			</Link>
		</motion.div>
	);
}

export function PrevBusinesses() {
	return (
		<motion.div
			className='control prev'
			initial='initial'
			whileHover='hover'
			transition={{
				staggerChildren: 0.02,
			}}>
			{/* <motion.div className='img-container' variants={control_variants_prev}>
				<motion.img
					variants={control_img}
					src={`${basePath}/images/OurBusinesses/thumb.png`}
				/>
			</motion.div> */}

			<div className='control-details'>
				<motion.div className='arrow' variants={control_variants_prev}>
					<BsArrowLeftCircle size={'1.75rem'} />
				</motion.div>
				<motion.div>
					<motion.p variants={control_variants_prev}>Previous</motion.p>
					<motion.p
						variants={{
							initial: {
								x: '0rem',
							},
							hover: {
								x: '-2rem',
								color: red,
							},
						}}
						className='label heading-4'>
						San Miguel Foods
					</motion.p>
				</motion.div>
			</div>
		</motion.div>
	);
}

export function NextBusinesses() {
	return (
		<motion.div
			className='control next'
			initial='initial'
			whileHover='hover'
			transition={{
				staggerChildren: 0.02,
			}}>
			{/* <motion.div className='img-container' variants={control_variants_next}>
				<motion.img
					variants={control_img}
					src={`${basePath}/images/OurBusinesses/thumb.png`}
				/>
			</motion.div> */}
			<div className='control-details'>
				<motion.div variants={control_variants_next} className='arrow'>
					<BsArrowRightCircle size={'1.75rem'} />
				</motion.div>
				<motion.div>
					<motion.p variants={control_variants_next}>Next</motion.p>
					<motion.p
						variants={{
							initial: {
								x: '0rem',
							},
							hover: {
								color: red,
								x: '2rem',
							},
						}}
						className='label heading-4'>
						San Miguel Foods
					</motion.p>
				</motion.div>
			</div>
		</motion.div>
	);
}
