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
	const { disclosure_category, disclosure_files, pages, loading } =
		useGetSearch(searchParams);

	// useEffect(() => {
	// 	if (!result.length) return;

	// 	let clone = [...result];

	// 	lenis.scrollTo(0);

	// 	setData((prev) => (prev = clone.splice(page, per_page)));
	// }, [result, page]);

	return (
		<Fade>
			<PageBanner
				title={'Search Result'}
				widgetClasses={'smc-red'}></PageBanner>
			<Section containerClass={'medium gap-1'}>
				<SearchContent
					loading={loading}
					disclosure_category={disclosure_category}
					disclosure_files={disclosure_files}
					pages={pages}
					searchParams={searchParams}
				/>
			</Section>
		</Fade>
	);
}

function SearchContent({
	loading,
	disclosure_category,
	disclosure_files,
	pages,
	searchParams,
}) {
	if (loading)
		return (
			<>
				<SearchItem skeleton={true} />
				<SearchItem skeleton={true} />
			</>
		);
	else
		return (
			<SearchResults
				disclosure_category={disclosure_category}
				disclosure_files={disclosure_files}
				pages={pages}
				searchParams={searchParams}
			/>
		);
}

function SearchResults({
	disclosure_category,
	disclosure_files,
	pages,
	searchParams,
}) {
	if (
		disclosure_category.length === 0 &&
		disclosure_files.length === 0 &&
		pages.length === 0
	) {
		return <NoResult />;
	} else {
		return (
			<>
				<h4 className='column full text-center'>
					Showing{' '}
					{disclosure_category.length + disclosure_files.length + pages.length}{' '}
					results for "{searchParams.get('search')}"
				</h4>
				{pages.length !== 0 && <SearchCategory label={'Pages'} items={pages} />}
				{disclosure_files.length !== 0 && (
					<SearchCategory label={'Disclosure files'} items={disclosure_files} />
				)}
				{disclosure_category.length !== 0 && (
					<SearchCategory
						label={'Disclosure category'}
						items={disclosure_category}
					/>
				)}
			</>
		);
	}
}

function SearchCategory({ label, items }) {
	if (label === 'Pages') console.log(items);
	const [searchParams, setSearchParams] = useSearchParams();
	const limit = 5;

	const [data, setData] = useState([]);

	const per_page = 10;

	const [page, setPage] = useState(
		searchParams.get('page') ? searchParams.get('page') : 1
	);

	useEffect(() => {
		if (!items.length) return;

		let clone = [...items];

		// lenis.scrollTo(0);
		console.log((page - 1) * per_page);
		// setData((prev) => (prev = clone.splice((page - 1) * per_page, per_page)));
	}, [items, page]);

	if (!searchParams.get('category') || searchParams.get('category') === label)
		return (
			<>
				<p className='text-center full column' style={{ marginTop: '2rem' }}>
					About{' '}
					<b>
						{items.length} {label}
					</b>{' '}
					found:
				</p>
				{items.map((r, index) => {
					if (
						index < (page - 1) * per_page ||
						index > (page - 1) * per_page + per_page - 1
					)
						return;

					let link = getLink(r);

					let teaser = r.teaser;
					let title = r.page_title ? r.page_title : r.title;
					if (searchParams.get('category') === label || index < limit)
						return (
							<>
								<React.Fragment key={`${label}-${index}`}>
									<Column>
										<SearchItem link={link} title={title} teaser={teaser} />
									</Column>
								</React.Fragment>
								{index === limit - 1 &&
									items.length > limit &&
									!searchParams.get('category') && (
										<button
											onClick={(event) => {
												event.preventDefault();
												setSearchParams({
													search: searchParams.get('search'),
													category: label,
												});
											}}
											style={{ margin: '2rem auto 4rem' }}
											className='btn btn-bordered'>
											See more
										</button>
									)}
							</>
						);
				})}

				{searchParams.get('category') === label && (
					<Pagination
						currentOffset={page * per_page - 1}
						handler={(index) => {
							setPage(index / per_page + 1);

							setSearchParams({
								search: searchParams.get('search'),
								category: searchParams.get('category'),
								page: index / per_page + 1,
							});
						}}
						perPage={per_page}
						total={items.length}
					/>
				)}
			</>
		);
}
function SearchItem({ title, teaser, link, skeleton }) {
	let image = teaser && teaser.teaser_images.webp.main.src;
	// let
	// const { red } = getColors;
	if (skeleton)
		return (
			<div className='search-item skeleton'>
				{/* <Tag size='sm' color={'white'} bgColor={red}>
				Search Tag
			</Tag> */}
				{teaser && image && (
					<div>
						<img
							// src={image}

							alt={teaser.teaser_title.replace(/<[^>]*>?/gm, '')}></img>
					</div>
				)}

				<div className='search-desc'>
					<h4 className='search-title heading-4 skeleton-item'></h4>
					<p>
						<span className='skeleton-item'></span>
						<span className='skeleton-item'></span>
						<span className='skeleton-item'></span>
						<span className='skeleton-item'></span>
					</p>
				</div>
			</div>
		);
	else
		return (
			<div className='search-item'>
				{/* <Tag size='sm' color={'white'} bgColor={red}>
				Search Tag
			</Tag> */}
				{teaser && image && (
					<Link {...link} className='search-img'>
						<img
							// src={image}
							src={image}
							alt={teaser.teaser_title.replace(/<[^>]*>?/gm, '')}></img>
					</Link>
				)}

				<div className='search-desc'>
					<h4 className='search-title heading-5'>
						<Link {...link}>{parse(title)}</Link>
					</h4>
					{teaser && teaser.teaser_content && (
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
							porta est a nisl condimentum vestibulum. Mauris in ultricies
							lacus. Nulla euismod quis quam at commodo. Proin faucibus lorem in
							rhoncus cursus. Vestibulum porttitor facilisis turpis, eu blandit
							tellus fringilla ut.
						</p>
					)}
				</div>
			</div>
		);
}
