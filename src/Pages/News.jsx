import { useEffect, useState } from 'react';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { api_url } from 'src/hooks/use-env';

import { motion } from 'framer-motion';
import { PiCaretCircleRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Column from 'src/CMS/Column/column';

export default function News() {
	const [news, setNews] = useState([]);
	useEffect(() => {
		fetch(`${api_url}page/news/data-list`, {
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
				setNews((prev) => (prev = data));
			});
	}, []);

	useEffect(() => {
		console.log(news);
	}, [news]);
	return (
		<Fade>
			<PageBanner title={'News'} widgetClasses='smc-blue' />
			{news.length && (
				<Section widgetClasses='column-1' containerClass={'small'}>
					<div className='column news-column'>
						{news.map((n, index) => {
							let news_details = {};
							news_details.key = n.id;
							news_details.page_title = n.page_title;
							news_details.date = n.publish_date;
							news_details.link = n.page_slug;
							console.log(news_details.link);
							if (n.teaser) {
								let teaser = n.teaser;

								if (teaser.teaser_images)
									news_details.image = teaser.teaser_images.webp.main.src;
								if (teaser.content) news_details.content = teaser.content;
							}

							return (
								<Column>
									<motion.div
										initial='initial'
										whileHover='hover'
										className={'news-item'}>
										{news_details.image && (
											<motion.div className='img-container'>
												<Link to={`${news_details.link}`}>
													<img src={news_details.image} />
												</Link>
											</motion.div>
										)}

										<div className='desc-container'>
											<div className='news-date'>
												<small className='small-text'>
													{news_details.date}
												</small>
											</div>
											<h3 className='news-title heading-5'>
												<Link to={`${news_details.link}`}>
													{news_details.page_title}
												</Link>
											</h3>
											<motion.p
												variants={{
													hover: {
														x: 10,
													},
												}}>
												<Link to={`${news_details.link}`} className='news-link'>
													Learn More
													<motion.span>
														<PiCaretCircleRight size={'1.5rem'} />
													</motion.span>
												</Link>
											</motion.p>
										</div>
									</motion.div>
								</Column>
							);

							// if (index === 0)
							// 	return (
							// 		<div
							// 			className='news-featured'
							// 			ref={parent1}
							// 			style={{ backgroundImage: `url(${newsItems[0].img})` }}>
							// 			<div className='desc-container'>
							// 				<div className='news-date small-text'>
							// 					{newsItems[0].date}
							// 				</div>
							// 				<h2 className='heading-3 news-title'>
							// 					<Link href='/'>{newsItems[0].title}</Link>
							// 				</h2>
							// 				{/* <p>{newsItems[0].desc}</p> */}
							// 				<p>
							// 					<Link href={'/'} className='news-link'>
							// 						Learn More
							// 						<PiCaretCircleRight size={'1.5rem'} />
							// 					</Link>
							// 				</p>
							// 			</div>
							// 		</div>
							// 	);
						})}
					</div>
				</Section>
			)}
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
}) {
	const newsItemClass = `news-item ${direction ? direction : ''}`;
	return (
		<motion.div initial='initial' whileHover='hover' className={newsItemClass}>
			<motion.div className='img-container'>
				<Link href={link}>
					<img src={img} />
				</Link>
			</motion.div>
			<div className='desc-container'>
				<div className='news-date'>
					<small className='small-text'>{date}</small>
				</div>
				<h3 className='news-title heading-5'>
					<Link href={link}>{title}</Link>
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
