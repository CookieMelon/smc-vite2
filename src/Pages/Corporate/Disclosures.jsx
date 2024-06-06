import { useState } from 'react';

import Column from 'src/CMS/Column/column';
import Section from 'src/CMS/Section/Section';

import Pagination from '@unleashit/pagination';
import { useParams } from 'react-router-dom';
import PDFItem from 'src/CMS/PDFItem/PDFItem';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import { Select, SelectItem } from 'src/Components/Forms/Select/Select';
import Fade from 'src/Layout/Fade/Fade';
import { useGetDisclosureCategoryFiles, useGetPage } from 'src/data/data';
import { SectionBuilder } from '../Builder';

const api_url = import.meta.env.VITE_API_URL;

export default function Disclosures() {
	const { id: page_slug } = useParams();

	const {
		title: page_title,
		error,
		sections,
		content_type_id,
		page_slug: slug,
		parent_id,
		theme,
	} = useGetPage();

	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState('');
	const [year, setYear] = useState(' ');

	const currentYear = new Date().getFullYear();
	const { title, files, last_page, years, per_page, total } =
		useGetDisclosureCategoryFiles(page_slug, page, keyword, year);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={'smc-blue'} />
			<DisclosuresContent error={error} sections={sections} />
			<Section containerClass='medium'>
				<Column>
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
						<Select
							placeholder='Select a year'
							onValueChange={(value) => {
								setPage(1);
								setYear(value);
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
					</div>
					{/* <Dropdown
					placeholder='Select a year'
					value={year}
					onValueChange={setYear}>
					{years &&
						years.map((year) => {
							return <SelectItem value={year.label}>{year.label}</SelectItem>;
						})}
				</Dropdown> */}
				</Column>
				<Column>
					<div className='pdf-listing'>
						{files &&
							files.data.map((file) => {
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
				</Column>
				{per_page && (
					<Pagination
						// cssVars='btn'
						currentOffset={per_page * page - per_page}
						handler={(index) => {
							setPage(index / per_page + 1);
						}}
						perPage={per_page}
						total={total}
					/>
				)}

				{/* {files && files.total > files.per_page && (
					<Column>
						<div className='pagination'>
							<Pagination
								key={`pagination_${page_slug}`}
								last_page={last_page}
								page={page}
								setPage={setPage}
							/>
						</div>
					</Column>
				)} */}
			</Section>
		</Fade>
	);
}

function DisclosuresContent({ error, sections }) {
	if (!error) return <SectionBuilder sections={sections} />;
}
