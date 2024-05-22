import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Fade from 'src/Layout/Fade/Fade';
import { useGetContent, useGetDisclosureFiles } from 'src/data/data';
import parse from 'html-react-parser';
import Section from 'src/CMS/Section/Section';
import Column from 'src/CMS/Column/column';
import { AnimatePresence } from 'framer-motion';
import PDFItem from 'src/CMS/PDFItem/PDFItem';
import { PiCaretCircleLeft, PiCaretCircleRight } from 'react-icons/pi';
const api_url = import.meta.env.VITE_API_URL;

export default function Disclosures({ page_slug }) {
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState('');
	const [year, setYear] = useState('');

	const currentYear = new Date().getFullYear();
	const { files, oldest_date } = useGetDisclosureFiles(
		page_slug,
		page,
		keyword,
		year
	);

	useEffect(() => {
		console.log('files', files);
		console.log('oldest_date', oldest_date);
	}, [files, oldest_date]);

	return (
		<Section containerClass='medium'>
			<Column>
				<div className='pdf-listing'>
					{files &&
						files.data.map((file) => {
							console.log(file);
							return (
								<PDFItem key={file.title} title={file.title} link={file.src} />
							);
						})}
				</div>
			</Column>
			{files && files.total > files.per_page && (
				<Column>
					<div className='pagination'>
						<button className='btn btn-icon'>
							<PiCaretCircleLeft size={'2rem'} />
						</button>
						{}
						<button className='btn btn-text'>1</button>
						<button className='btn btn-text'>2</button>
						<button className='btn btn-text'>3</button>
						<button className='btn btn-text'>4</button>
						<button className='btn btn-text'>...</button>
						<button className='btn btn-text'>10</button>
						<button className='btn btn-icon'>
							<PiCaretCircleRight size={'2rem'} />
						</button>
					</div>
				</Column>
			)}
		</Section>
	);
}
