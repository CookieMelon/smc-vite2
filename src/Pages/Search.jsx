import Pagination from '@unleashit/pagination';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LenisContext } from 'src/App';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { getLink } from 'src/Layout/Nav/nav-helper';
import { useGetSearch } from 'src/data/data';
import { NoResult } from './Corporate/Disclosures';
export default function Search({}) {
	const lenis = useContext(LenisContext);
	const [searchParams] = useSearchParams();
	const { result } = useGetSearch(searchParams);
	const [data, setData] = useState([]);

	const per_page = 20;

	const [page, setPage] = useState(0);

	useEffect(() => {
		if (!result.length) return;

		let clone = [...result];

		lenis.scrollTo(0);

		console.log(page, per_page);

		setData((prev) => (prev = clone.splice(page, per_page)));
	}, [result, page]);

	return (
		<Fade>
			<PageBanner
				title={'Search Result'}
				widgetClasses={'smc-red'}></PageBanner>
			<Section containerClass={'medium gap-1'}>
				{data.length !== 0 ? (
					<>
						<p className='small-text'>
							About <b>{result.length} </b>found{' '}
						</p>
						{data.map((r, index) => {
							let link = getLink(r);

							let teaser = r.teaser;
							return (
								<React.Fragment key={`page_id-${r.page_id}`}>
									<Column>
										<SearchItem
											link={link}
											title={r.page_title}
											teaser={teaser}
										/>
									</Column>
								</React.Fragment>
							);
						})}
					</>
				) : (
					<NoResult />
				)}

				{data.length !== 0 && (
					<Pagination
						currentOffset={page}
						handler={(index) => {
							console.log(index);
							setPage(index);
						}}
						perPage={per_page}
						total={result.length}
					/>
				)}
			</Section>
		</Fade>
	);
}

function SearchItem({ title, teaser, link }) {
	console.log(teaser);
	let image = teaser && teaser.teaser_images.webp.main.src;

	// let
	// const { red } = getColors;
	return (
		<div className='search-item'>
			{/* <Tag size='sm' color={'white'} bgColor={red}>
				Search Tag
			</Tag> */}
			{teaser && image && (
				<Link to={link.to} className='search-img'>
					<img
						// src={image}
						src={image}
						alt={teaser.teaser_title.replace(/<[^>]*>?/gm, '')}></img>
				</Link>
			)}

			<div className='search-desc'>
				<h4 className='search-title heading-4'>
					<Link to={link.to}>{parse(title)}</Link>
				</h4>
				{teaser && teaser.teaser_content && (
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta
						est a nisl condimentum vestibulum. Mauris in ultricies lacus. Nulla
						euismod quis quam at commodo. Proin faucibus lorem in rhoncus
						cursus. Vestibulum porttitor facilisis turpis, eu blandit tellus
						fringilla ut.
					</p>
				)}
			</div>
		</div>
	);
}
