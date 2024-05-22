import './DividendHistory.scss';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Fade from 'src/Layout/Fade/Fade';
import { useGetContent } from 'src/data/data';
import parse from 'html-react-parser';
import Section from 'src/CMS/Section/Section';
import Column from 'src/CMS/Column/column';
import { AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { Search_defaultSettings, monthValues } from './select-settings';
import { useScript } from 'src/hooks/use-script';

const api_url = import.meta.env.VITE_API_URL;

export default function SharePrices() {
	const { title } = useGetContent();
	const [content, setContent] = useState(null);
	const location = useLocation();

	const [month, setMonth] = useState(monthValues[0].value);

	const year = new Date().getFullYear();

	const [index, setIndex] = useState(0);

	const search = useLocation().search;

	const [sely, setSely] = useState(
		new URLSearchParams(search).get('sely')
			? new URLSearchParams(search).get('sely')
			: new Date().getFullYear()
	);
	const [selm, setSelm] = useState(
		new URLSearchParams(search).get('selm')
			? new URLSearchParams(search).get('selm')
			: 'all'
	);

	useEffect(() => {
		if (content) {
			let filter_form = document.querySelector('.disclosure__heading form');
			filter_form.setAttribute('action', '/share-prices');

			filter_form.addEventListener('submit', (event) => {
				event.preventDefault();

				let fd = new FormData(filter_form);

				setSely(fd.get('sely'));
				setSelm(fd.get('selm'));
			});
			let search = document.querySelector('.sbtn');
			search.classList.add('btn');
			search.classList.add('sec-btn');
		}
	}, [content]);

	useEffect(() => {
		fetch(`${api_url}share_prices?year=${sely}&&month=${selm}`, {
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
				setContent((prev) => (prev = data));
			});
	}, []);

	useScript('/smc_js/share-prices.js', 'script3', content);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={''} />

			<Section containerClass={'medium'}>
				{/* <div>
					<Select
						{...Search_defaultSettings}
						options={monthValues}
						label={'Select month'}
					/>
					<Select
						{...Search_defaultSettings}
						label={'Select year'}
						options={[
							{
								value: '2012',
								label: '2012',
							},
							{
								value: '2011',
								label: '2011',
							},
						]}
					/>
				</div> */}

				{content !== null && parse(content.data)}
			</Section>
		</Fade>
	);
}
