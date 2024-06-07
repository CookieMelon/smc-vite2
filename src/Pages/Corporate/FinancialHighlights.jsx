import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetFinancialHighlights, useGetPage } from 'src/data/data';

const api_url = import.meta.env.VITE_API_URL;

import { AnimatePresence } from 'framer-motion';
import { Select, SelectItem } from 'src/Components/Forms/Select/Select';

export default function FinancialHighlights() {
	const { title, theme } = useGetPage();

	const { content } = useGetFinancialHighlights();

	const [selected, setSelected] = useState();

	useEffect(() => {
		if (content.length === 0) return;
		setSelected(content[0].id);
	}, [content]);

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
									return (
										<SelectItem key={`year_${c.id}`} value={c.id}>
											{c.title}
										</SelectItem>
									);
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
