import React, { useEffect, useState } from 'react';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetContent } from 'src/data/data';
import parse from 'html-react-parser';

import { motion } from 'framer-motion';

const api_url = import.meta.env.VITE_API_URL;

import {
	Button,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
} from 'react-aria-components';
import { AnimatePresence } from 'framer-motion';

export default function FinancialHighlights() {
	const { title } = useGetContent();
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
			});
	}, []);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={''} />
			<Section containerClass={'medium'}>
				<Column>
					<Select placeholder='Select year' onSelectionChange={setSelected}>
						<Label>Year</Label>
						<Button>
							<SelectValue />
							<span aria-hidden='true'>▼</span>
						</Button>
						<Popover maxHeight={10}>
							<ListBox items={content}>
								{/* <ListBoxItem>Test</ListBoxItem>
								{content.length !== 0 &&
									content.map((c) => {
										return <ListBoxItem>{c.title}</ListBoxItem>;
									})} */}
								{(item) => <ListBoxItem>{item.title}</ListBoxItem>}
							</ListBox>
						</Popover>
					</Select>
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
