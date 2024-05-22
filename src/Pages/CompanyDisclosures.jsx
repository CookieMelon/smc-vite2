import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Fade from 'src/Layout/Fade/Fade';
import {
	useGetCompanyDiclosures,
	useGetContent,
	useGetDisclosureFiles,
} from 'src/data/data';
import parse from 'html-react-parser';
import Section from 'src/CMS/Section/Section';
import Column from 'src/CMS/Column/column';
import { AnimatePresence } from 'framer-motion';
import PDFItem from 'src/CMS/PDFItem/PDFItem';
import { PiCaretCircleLeft, PiCaretCircleRight } from 'react-icons/pi';
import PDFWidget from 'src/CMS/PDFWidget/PDFWidget';
const api_url = import.meta.env.VITE_API_URL;

export default function CompanyDisclosures({ page_slug }) {
	const { title } = useGetContent();
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState('');
	const [year, setYear] = useState('');

	const [content, setContent] = useState(null);
	const currentYear = new Date().getFullYear();
	// const test = useGetCompanyDiclosures();

	const [parent, setParent] = useState([]);

	useEffect(() => {
		fetch(`${api_url}disclosure_all`, {
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

	useEffect(() => {
		if (content && content.length) {
			let parents = [];

			content.forEach((item) => {
				// if (parseInt(item.company_disclosure) !== 1) return;
				if (
					parseInt(item.parent_id) === 0 &&
					parseInt(item.company_disclosure) === 1
				) {
					item.children = [];
					parents.push(item);
				}
			});

			content.forEach((children) => {
				// if (parseInt(children.company_disclosure) !== 1) return;
				if (
					parseInt(children.parent_id) !== 0 &&
					parseInt(children.company_disclosure) === 1
				) {
					parents.forEach((parent) => {
						if (parseInt(children.parent_id) === parseInt(parent.id)) {
							parent.children.push(children);
						}
					});
				}
			});

			setParent((prev) => (prev = parents));
		}
	}, [content]);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={''} />
			<Section containerClass='medium' sectionClass={'column-4'}>
				<Column columnClasses={'full'}>
					{parent.map((item) => {
						if (item.children.length === 0)
							return (
								<PDFItem
									key={`disclosure_${item.id}`}
									title={item.title}
									link={'/pdf/test-pdf.pdf'}
								/>
							);
					})}
				</Column>

				{parent.map((item) => {
					if (item.children.length !== 0) {
						return (
							<React.Fragment key={`disclosure_${item.id}`}>
								<h2 className='heading-3 column full'>{item.title}</h2>

								{item.children.map((item) => {
									return (
										<Column key={`disclosure_${item.id}`}>
											<PDFWidget
												// headingSize={headingSize}
												title={item.title}
												link={''}
											/>
										</Column>
									);
								})}
							</React.Fragment>
						);
					}
				})}
			</Section>
		</Fade>
	);
}
