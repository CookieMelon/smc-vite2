import { Link, useSearchParams } from 'react-router-dom';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { getLink } from 'src/Layout/Nav/nav-helper';
import { useGetSearch } from 'src/data/data';

export default function Search({}) {
	const [searchParams] = useSearchParams();
	const { result } = useGetSearch(searchParams);
	if (result.length === 0) return;
	return (
		<Fade>
			<PageBanner
				title={'Search Result'}
				widgetClasses={'smc-red'}></PageBanner>
			<Section containerClass={'medium'}>
				<p className='small-text'>
					About <b>{result.length + 1} </b>found{' '}
				</p>
				{result.map((r) => {
					let link = getLink(r);

					let content = r.teaser ? r.teaser.teaser_content : null;
					return (
						<Column key={`page_id-${r.page_id}`}>
							<SearchItem link={link} title={r.page_title} content={content} />
						</Column>
					);
				})}
			</Section>
		</Fade>
	);
}

function SearchItem({ title, content, link }) {
	// const { red } = getColors;
	return (
		<div className='search-item'>
			{/* <Tag size='sm' color={'white'} bgColor={red}>
				Search Tag
			</Tag> */}
			<h5 className='search-title heading-5'>
				<Link to={link.to}>{title}</Link>
			</h5>
			{content && (
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta
					est a nisl condimentum vestibulum. Mauris in ultricies lacus. Nulla
					euismod quis quam at commodo. Proin faucibus lorem in rhoncus cursus.
					Vestibulum porttitor facilisis turpis, eu blandit tellus fringilla ut.
				</p>
			)}
		</div>
	);
}
