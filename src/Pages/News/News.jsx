import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { PiCaretCircleRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetDataList } from 'src/data/data';

export default function News() {
	const { list } = useGetDataList('news', 'News');

	const [[currentNews, otherNews], setNews] = useState([[], []]);

	useEffect(() => {
		if (list.length === 0) return;

		let current = [];
		let other = [];
		list.forEach((item) => {
			if (
				new Date(item.publish_date).getFullYear() === new Date().getFullYear()
			)
				current.push(item);
			else other.push(item);
		});

		setNews([current, other]);
	}, [list]);

	return (
		<Fade>
			<PageBanner title={'News'} widgetClasses='smc-blue no-bg' />
			{
				<Section
					sectionClass={'column-2'}
					containerClass={'medium align-start'}>
					<div className='column news-column'>
						{list.length !== 0 &&
							list.map((n, index) => {
								let news_details = {};
								news_details.key = n.id;
								news_details.page_title = n.page_title;
								news_details.date = n.publish_date;
								news_details.link = n.page_slug;

								if (n.teaser) {
									let teaser = n.teaser;

									if (teaser.teaser_images)
										news_details.image = teaser.teaser_images.webp.main.src;
									if (teaser.content) news_details.content = teaser.content;
								}
								if (index === 0)
									return (
										<Column columnClasses='full' key={`NewsItem_` + index}>
											<NewsFeatured
												image={news_details.image}
												date={news_details.date}
												title={news_details.page_title}
												link={news_details.link}
											/>
										</Column>
									);

								return (
									<Column key={`NewsItem_` + index}>
										<NewsItem
											link={news_details.link}
											index={index}
											title={news_details.page_title}
											date={news_details.date}
											img={news_details.image}
											// setModal={setModal}
										/>
									</Column>
								);
							})}
					</div>
					<div className='column news-column sticky'>
						<div className='other-news'>
							<h3 className='heading-3'>Other News</h3>
							{otherNews !== 0 &&
								otherNews.map((news, index) => {
									let news_details = {};
									news_details.key = news.id;
									news_details.page_title = news.page_title;
									news_details.date = news.publish_date;
									news_details.link = news.page_slug;

									if (index < 3)
										return (
											<NewsItem
												fontSize='heading-5'
												link={news_details.link}
												index={index}
												title={news_details.page_title}
												date={news_details.date}
												// setModal={setModal}
												key={`NewsItem_` + index}
											/>
										);
								})}
						</div>
					</div>
				</Section>
			}
		</Fade>
	);
}

export function NewsItem({
	index,
	title,
	date,
	img,
	link,
	setModal,
	direction,
	fontSize = 'heading-4',
}) {
	const newsItemClass = `news-item ${direction ? direction : ''}`;
	const formatedDate = moment(date).format('MMMM D, YYYY');
	return (
		<motion.div initial='initial' whileHover='hover' className={newsItemClass}>
			{img && (
				<motion.div className='img-container'>
					<Link to={link}>
						<img src={img} />
					</Link>
				</motion.div>
			)}
			<div className='desc-container'>
				<div className='news-date'>
					<small className='small-text'>{formatedDate}</small>
				</div>
				<h3 className={`news-title ${fontSize}`}>
					<Link to={link}>{parse(title)}</Link>
				</h3>
				<motion.p
					variants={{
						hover: {
							x: 10,
						},
					}}>
					<Link href={link} className='news-link'>
						Learn More
						<motion.span>
							<PiCaretCircleRight size={'1.5rem'} />
						</motion.span>
					</Link>
				</motion.p>
			</div>
		</motion.div>
	);
}

export function NewsFeatured({ image, date, title, link }) {
	const formatedDate = moment(date).format('MMMM D, YYYY');
	return (
		<div className='news-featured' style={{ backgroundImage: `url(${image})` }}>
			<div className='desc-container'>
				<div className='news-date small-text'>{formatedDate}</div>
				<h2 className='heading-2 news-title'>
					<Link to={link}>{parse(title)}</Link>
				</h2>
				{/* <p>{newsItems[0].desc}</p> */}
				<p>
					<Link to={link} className='news-link'>
						Learn More
						<PiCaretCircleRight size={'1.5rem'} />
					</Link>
				</p>
			</div>
		</div>
	);
}
