import './DividendHistory.scss';

import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetPage, useGetSharePrices } from 'src/data/data';
import { monthValues } from 'src/helper/form-helper';
import { useScript } from 'src/hooks/use-script';

const api_url = import.meta.env.VITE_API_URL;

export default function SharePrices() {
	const { title, theme } = useGetPage();

	const location = useLocation();
	const navigate = useNavigate();

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

	const { content } = useGetSharePrices(sely, selm);

	useEffect(() => {
		if (content) {
			let filter_form = document.querySelector('.disclosure__heading form');
			filter_form.setAttribute('action', 'share-prices');
			filter_form.setAttribute('method', 'get');
			filter_form.addEventListener('submit', (event) => {
				event.preventDefault();

				let fd = new FormData(filter_form);

				setSely(fd.get('sely'));
				setSelm(fd.get('selm'));
				// navigate({
				// 	pathname: '/share-prices',
				// 	search: createSearchParams({
				// 		selm: selm,
				// 		sely: sely,
				// 	}).toString(),
				// });

				// filter_form.submit();
			});
			let search = document.querySelector('.sbtn');
			search.classList.add('btn');
			search.classList.add('btn-bordered');

			let table = document.querySelector('.table-responsive');
			let tableHeader = table.querySelectorAll('.table__header th');
			let tableRows = table.querySelectorAll('tr:not(.table__header)');
			let tableHeader_text = [];

			tableHeader.forEach((header) => {
				tableHeader_text.push(header.innerHTML);
			});

			tableRows.forEach((tr) => {
				tr.querySelectorAll('td').forEach((td, index) => {
					td.dataset.label = tableHeader_text[index];
				});
			});
		}
	}, [content]);

	useScript('/smc_js/share-prices.js', 'script3', content);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={theme} />

			<Section containerClass={'medium'}>
				{content !== null && parse(content.data)}
			</Section>
		</Fade>
	);
}
