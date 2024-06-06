import React, { useEffect, useState } from 'react';
import Column from 'src/CMS/Column/column';
import PDFItem from 'src/CMS/PDFItem/PDFItem';
import PDFWidget from 'src/CMS/PDFWidget/PDFWidget';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import { Select, SelectItem } from 'src/Components/Forms/Select/Select';
import Fade from 'src/Layout/Fade/Fade';
import { useGetDisclosureAll, useGetDisclosureFiles } from 'src/data/data';
const api_url = import.meta.env.VITE_API_URL;

import * as SelectPrimitive from '@radix-ui/react-select';
import Pagination from '@unleashit/pagination';

export default function CompanyDisclosures() {
	// const { title, theme } = useGetPage();
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState('');
	const [year, setYear] = useState(' ');
	const [category, setCategory] = useState(' ');

	const { content } = useGetDisclosureAll();

	const { files, last_page, years, per_page, total } = useGetDisclosureFiles(
		category,
		keyword,
		page,
		year
	);

	const [parent, setParent] = useState([]);

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

	// company disclosure
	// clean
	// no filter selected
	if (year === ' ' && keyword === '')
		return (
			<Fade>
				<PageBanner title={'Company Disclosures'} widgetClasses={'smc-blue'} />
				<Section
					containerClass='medium'
					sectionClass={'column-4'}
					containerStyle={{ '--column-gap': '1rem' }}>
					<Column columnClasses={'full'}>
						<div className='disclosure-filter'>
							<input
								placeholder='Enter keyword'
								value={keyword}
								type='text'
								required
								onChange={(event) => {
									setKeyword(event.target.value);
								}}
							/>
							<YearSelect
								year={year}
								setYear={setYear}
								setPage={setPage}
								years={years}
							/>
						</div>
					</Column>
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
													link={`/disclosures/${item.slug}`}
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

	return (
		<Fade>
			<PageBanner title={'Company Disclosures'} widgetClasses={'smc-blue'} />
			<Section
				containerClass='medium'
				sectionClass={'column-4'}
				containerStyle={{ '--column-gap': '1rem' }}>
				<Column columnClasses={'full'}>
					<div className='disclosure-filter'>
						<Select
							className='category-filter'
							placeholder='Select category'
							defaultValue={category}
							onValueChange={(value) => {
								setCategory(value);
								setPage(1);
							}}>
							<SelectItem value={' '}>All</SelectItem>
							{parent &&
								parent.map((item) => {
									if (!item.children.length)
										return (
											<SelectItem
												key={`category_${item.slug}`}
												value={item.slug}>
												{item.title}
											</SelectItem>
										);

									return (
										<SelectPrimitive.Group key={`group_${item.id}`}>
											<SelectPrimitive.Label className='SelectLabel'>
												{item.title}
											</SelectPrimitive.Label>
											{item.children.map((item) => {
												return (
													<SelectItem
														key={`category_${item.slug}`}
														value={item.slug}>
														{item.title}
													</SelectItem>
												);
											})}
										</SelectPrimitive.Group>
									);
								})}
						</Select>
						<input
							placeholder='Enter keyword'
							value={keyword}
							type='text'
							required
							onChange={(event) => {
								setKeyword(event.target.value);
							}}
						/>
						<YearSelect
							year={year}
							setYear={setYear}
							setPage={setPage}
							years={years}
						/>
					</div>
				</Column>
				<Column columnClasses='full'>
					<div className='pdf-listing'>
						{files.length &&
							files.map((file) => {
								return (
									<PDFItem
										key={`${file.title}_${file.date} `}
										date={file.date}
										title={file.title}
										link={file.file_url}
									/>
								);
							})}
					</div>
					<Pagination
						// cssVars='btn'
						currentOffset={per_page * page - per_page}
						handler={(index) => {
							setPage(index / per_page + 1);
						}}
						perPage={per_page}
						total={total}
					/>
				</Column>
			</Section>
		</Fade>
	);
}

function YearSelect({ year, setYear, setPage, years }) {
	return (
		<Select
			placeholder='Select year'
			defaultValue={year}
			onValueChange={(value) => {
				setYear(value);
				setPage(1);
			}}>
			<SelectItem value={' '}>All</SelectItem>
			{years &&
				years.map((year) => {
					return (
						<SelectItem key={`year_${year.name}`} value={year.name}>
							{year.name}
						</SelectItem>
					);
				})}
		</Select>
	);
}
