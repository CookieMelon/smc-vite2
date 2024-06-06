import { useContext, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { ThemeContext } from '../../App';

import { motion } from 'framer-motion';
import { getColors } from '../../hooks/use-color';

import { IoCloseOutline } from 'react-icons/io5';
import { createSearchParams, useNavigate } from 'react-router-dom';
export default function Search({ preload_variants }) {
	const navigate = useNavigate();

	const { red, blue, yellow } = getColors;

	const { smcTheme } = useContext(ThemeContext);
	const [searchOpen, toggleSearch] = useState(false);
	const searchInput = useRef();
	const searchForm = useRef();

	const search_variants = {
		'smc-red': {
			backgroundColor: red,
		},
		'smc-blue': {
			backgroundColor: blue,
		},
		'smc-yellow': {
			backgroundColor: yellow,
		},
	};

	const searchSubmit = (event) => {
		event.preventDefault();

		// toggleSearch(false);
		navigate({
			pathname: '/search',
			search: createSearchParams({
				search: event.target[0].value,
			}).toString(),
		});
	};

	return (
		<motion.div
			className={`nav-search ${smcTheme}`}
			variants={preload_variants}>
			<motion.form
				ref={searchForm}
				className='nav-input'
				method='get'
				action='/search'
				style={{
					display: searchOpen ? 'flex' : 'none',
				}}
				variants={search_variants}
				onSubmit={searchSubmit}
				onBlur={() => {
					toggleSearch(false);
				}}>
				<input
					type='text'
					name='search'
					ref={searchInput}
					placeholder='Enter keyword'
				/>
				<button
					onClick={() => {
						toggleSearch(false);
					}}>
					<IoCloseOutline size={'2rem'} />
				</button>
			</motion.form>
			<button
				className='nav-icon'
				style={{
					display: searchOpen ? 'none' : 'block',
				}}>
				<IoIosSearch
					onClick={() => {
						if (searchOpen) {
							searchForm.current.submit();
						} else {
							setTimeout(() => {
								searchInput.current.focus();
							}, 100);

							toggleSearch(true);
						}
					}}
					size={'1.75rem'}
				/>
			</button>
		</motion.div>
	);
}
