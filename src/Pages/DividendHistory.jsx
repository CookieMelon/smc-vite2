import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetPage } from 'src/data/data';
const api_url = import.meta.env.VITE_API_URL;

export default function DividendHistory() {
	const { title, theme } = useGetPage();
	const [content, setContent] = useState(null);
	const location = useLocation();
	const search = useLocation().search;
	const year = new Date().getFullYear();

	const [tabIndex, setTabIndex] = useState(0);

	const [selc, setSelc] = useState(
		new URLSearchParams(search).get('selyc')
			? new URLSearchParams(search).get('selyc')
			: `${year}`
	);

	const [sels, setSels] = useState(
		new URLSearchParams(search).get('selys')
			? new URLSearchParams(search).get('selys')
			: '2001'
	);

	const [selp, setSelp] = useState(
		new URLSearchParams(search).get('selyp')
			? new URLSearchParams(search).get('selyp')
			: '2014'
	);

	useEffect(() => {
		fetch(
			`${api_url}dividend_history?cd_year=${selc}&&sd_year=${sels}&&pd_year=${selp}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setContent((prev) => (prev = data));
			});
	}, [selc, sels, selp]);

	useEffect(() => {
		if (content === null) return;

		let forms = document.querySelectorAll('.disclosure__heading form');

		let search = document.querySelector('.sbtn');
		search.classList.add('btn');
		search.classList.add('btn-bordered');

		let frmc = document.querySelector('.sbtn');
		forms.forEach((form) => {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				let fd = new FormData(form);

				setSelc(fd.get('selyc'));
				setSels(fd.get('selys'));
				setSelp(fd.get('selyp'));
			});
		});
	}, [content]);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={theme} />

			<Section containerClass={'medium'}>
				<Column>
					<Tabs
						className='dividend-tabs'
						selectedIndex={tabIndex}
						onSelect={(index) => setTabIndex(index)}>
						<TabList>
							<Tab className='btn pri-btn'>
								<span className='btn-label'>Cash Dividends</span>
							</Tab>
							<Tab className='btn pri-btn'>
								<span className='btn-label'>Stock Dividends</span>
							</Tab>
							<Tab className='btn pri-btn'>
								<span className='btn-label'>Property Dividends</span>
							</Tab>
						</TabList>

						<TabPanel>{content && parse(content.cd_data)}</TabPanel>
						<TabPanel>{content && parse(content.sd_data)}</TabPanel>
						<TabPanel>{content && parse(content.ps_data)}</TabPanel>
					</Tabs>
				</Column>
			</Section>
		</Fade>
	);
}
