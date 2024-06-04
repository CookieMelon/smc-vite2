import { useEffect, useState } from 'react';

import Column from 'src/CMS/Column/column';
import Section from 'src/CMS/Section/Section';

import { PiCaretCircleLeft, PiCaretCircleRight } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import PDFItem from 'src/CMS/PDFItem/PDFItem';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import { Select, SelectItem } from 'src/Components/Select/Select';
import Fade from 'src/Layout/Fade/Fade';
import { useGetDisclosureCategoryFiles } from 'src/data/data';

const api_url = import.meta.env.VITE_API_URL;

export default function Disclosures() {
	const { id: page_slug } = useParams();

	// const {
	// 	error,
	// 	title,
	// 	sections,
	// 	content_type_id,
	// 	page_slug: slug,
	// 	parent_id,
	// 	theme,
	// } = useGetPage();

	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState('');
	const [year, setYear] = useState('');

	const currentYear = new Date().getFullYear();
	const { title, files, last_page, years } = useGetDisclosureCategoryFiles(
		page_slug,
		page,
		keyword,
		year
	);

	// useEffect(() => {
	// 	console.log('files', files);
	// 	console.log('oldest_date', oldest_date);
	// }, [files, oldest_date]);

	// useEffect(() => {
	// 	console.log('title', title);
	// }, [title]);

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={'smc-blue'} />
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
						<Select placeholder='Select a year' onValueChange={setYear}>
							<SelectItem value={' '}>All</SelectItem>
							{years &&
								years.map((year) => {
									return <SelectItem value={year.name}>{year.name}</SelectItem>;
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

export const Pagination = ({ last_page, page, setPage }) => {
	const [pagination, setPagination] = useState([]);

	useEffect(() => {
		console.log(last_page);
		let pagination = [];
		for (let i = 1; i <= last_page; i++) {
			pagination.push({
				label: i,
			});
		}
		setPagination((prev) => (prev = pagination));
	}, [last_page]);

	useEffect(() => {
		console.log(pagination);
	}, [pagination]);
	return (
		<div className='pagination'>
			<button className='btn btn-icon' disabled={page === 1 ? true : false}>
				<PiCaretCircleLeft size={'2rem'} />
			</button>
			{pagination.length !== 0 &&
				pagination.map((p, index) => {
					return (
						<button
							key={`pagination_${index}`}
							className={`btn btn-text ${page === index + 1 ? 'active' : ''} `}
							onClick={() => {
								setPage(parseInt(p.label));
							}}>
							{p.label}
						</button>
					);
				})}

			<button
				className='btn btn-icon'
				disabled={page === page.length ? true : false}>
				<PiCaretCircleRight size={'2rem'} />
			</button>
		</div>
	);
};
