import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetPage } from 'src/data/data';

const api_url = import.meta.env.VITE_API_URL;

import { AnimatePresence } from 'framer-motion';
import { Select, SelectItem } from 'src/Components/Select/Select';

export default function FinancialHighlights() {
	const { title, theme } = useGetPage();
	const [content, setContent] = useState([]);

	const [selected, setSelected] = useState();

	useEffect(() => {
		fetch(`${api_url}financial_highlights`, {
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
				setSelected(data[0].id);
			});
	}, []);

	console.log(content);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={theme} />
			<Section containerClass={'medium'}>
				<Column>
					<div className='disclosure-filter'>
						<Select
							placeholder='Select year'
							value={selected}
							onValueChange={setSelected}>
							{content &&
								content.map((c) => {
									return <SelectItem value={c.id}>{c.title}</SelectItem>;
								})}
						</Select>
					</div>
				</Column>
				<Column>
					<AnimatePresence>
						{content.length &&
							content.map((c) => {
								if (c.id === selected)
									return (
										<React.Fragment key={`content_${c.title}`}>
											{parse(c.content)}
										</React.Fragment>
									);
							})}
					</AnimatePresence>
				</Column>
			</Section>
		</Fade>
	);
}
