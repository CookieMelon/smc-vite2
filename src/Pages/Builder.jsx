import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Pillar from 'src/CMS/Pillar/Pillar';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';

import parse from 'html-react-parser';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageBanner from 'src/CMS/FullPageBanner/fullpagebanner';
import MainBanner from 'src/CMS/MainBanner/MainBanner';
import Marquee from 'src/CMS/Marquee/Marquee';
import OurStoryTab from 'src/CMS/OurStoryTab/ourstorytab';
import SingleImage from 'src/CMS/SingleImage/SingleImage';
import StackedImages from 'src/CMS/StackedImages/stackedimages';
import { useGetDataList, useGetPage } from 'src/data/data';

import PDFWidget from 'src/CMS/PDFWidget/PDFWidget';
import VideoContent from 'src/CMS/VideoContent/Video';

import ImageSlider from 'src/CMS/ImageSlider/ImageSlider';

import { useContext } from 'react';
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	ViberShareButton,
} from 'react-share';
import { LenixContext } from 'src/App';
import AnnualReports from 'src/CMS/AnnualReports/AnnualReports';
import HomepageWidget from 'src/CMS/HomepageWidget/HomepageWidget';
import OurBusinesses from 'src/CMS/OurBusinesses/OurBusinesses';
import OurCompanyTab from 'src/CMS/OurCompanyTab/OurCompanyTab';
import SustainabilitySection from 'src/CMS/SustainabilitySection/SustainabilitySection';
import OurBusinessControls from 'src/Components/OurBusinessControls/OurBusinessControls';
import {
	EmailIcon,
	FacebookIcon,
	LinkedInIcon,
	TwitterIcon,
	ViberIcon,
} from 'src/Layout/Footer/social-icon';
import ErrorPage from 'src/error-page';

import { createCMSElement } from 'src/helper/cms-helper';
import Disclosures from './Corporate/Disclosures';
import { NewsFeatured, NewsItem } from './News/News';
import SMAIForm from './OurStory/SMAIForm';

export default function Builder() {
	const lenis = useContext(LenixContext);
	const page_url = window.location.href;
	const {
		error,
		title,
		sections,
		content_type_id,
		page_slug,
		parent_id,
		theme,
		date,
	} = useGetPage();

	if (error) return <ErrorPage />;

	return (
		<Fade>
			{
				/* News Inner Page = 9*/
				/* Article Page = 5 */
				(content_type_id === 9 || content_type_id === 5) && (
					<>
						<PageBanner
							title={title}
							subtitle={new Date(date).toDateString()}
							widgetClasses='no-bg smc-blue'
						/>
						<Section
							widgetClasses='smc-null'
							containerClass={'medium'}
							sectionStyle={{ paddingBottom: '0' }}>
							<div className='social-icon'>
								<FacebookShareButton url={page_url}>
									<FacebookIcon />
								</FacebookShareButton>
								<TwitterShareButton url={page_url} title={title}>
									<TwitterIcon />
								</TwitterShareButton>

								<EmailShareButton url={page_url}>
									<EmailIcon />
								</EmailShareButton>

								<LinkedinShareButton url={page_url} title={title}>
									<LinkedInIcon />
								</LinkedinShareButton>
								<ViberShareButton url={page_url} title={title}>
									<ViberIcon />
								</ViberShareButton>
							</div>
						</Section>
					</>
				)
			}

			{sections.length !== 0 &&
				sections.map((section) => {
					let widgets = section.api_widgets;

					let sectionClasses = section.section_class
						? section.section_class.join(' ')
						: '';

					let containerClasses =
						section.container_class !== null
							? section.container_class.join(' ')
							: '';

					if (
						!containerClasses.includes('full') &&
						!containerClasses.includes('small')
					)
						containerClasses += ' medium';

					let hasColumn = sectionClasses.includes('column');

					if (!hasColumn) sectionClasses += ' column-1';

					if (!sectionClasses.includes('skip-section')) {
						return (
							<Section
								key={section.section_code}
								sectionClass={sectionClasses}
								containerClass={containerClasses}>
								{widgets.length !== 0 && (
									<Widgets
										keyWidget={`widgets_${section.section_code}`}
										widgets={widgets}
										hasColumn={hasColumn}
										theme={theme}
										page_slug={page_slug}
									/>
								)}
							</Section>
						);
					} else
						return (
							<React.Fragment key={section.section_code}>
								{widgets.length !== 0 && (
									<Widgets
										keyWidget={`widgets_${section.section_code}`}
										widgets={widgets}
										hasColumn={hasColumn}
										theme={theme}
									/>
								)}
							</React.Fragment>
						);
				})}

			{
				/* Our Businesses */
				content_type_id === 10 && (
					<OurBusinessControls page_slug={page_slug} parent_id={parent_id} />
				)
			}

			{
				/* Disclosures */
				content_type_id === 11 && <Disclosures page_slug={page_slug} />
			}
		</Fade>
	);
}

function Widgets({ widgets, keyWidget, theme, page_slug }) {
	let our_story_tabs = [];

	return (
		<React.Fragment key={keyWidget}>
			{widgets.map((widget, index) => {
				let children = widget.api_childrens;
				let key = widget.page_section_widget_code;

				let widgetClasses = widget.widgets_class;

				if (widgetClasses) widgetClasses = widgetClasses.join(' ');
				else widgetClasses = '';

				// CMS Pillars
				if (widget.widgets_name === 'Pillars') {
					let content = {
						d: {
							bg: children[0].elements_attributes.src,
							focus: children[2].elements_attributes.src,
						},
						m: {
							bg: children[1].elements_attributes.src,
							focus: children[3].elements_attributes.src,
						},

						text1: children[4].elements_slot,
						text2: children[5].elements_slot,
						text3: children[6].elements_slot,
					};
					return (
						<Pillar key={key} content={content} widgetClasses={widgetClasses} />
					);
				}

				if (widget.widgets_name === 'Homepage Banner') {
					let video;
					let images = [];

					children.forEach((child) => {
						if (child.elements_tag === 'video')
							video = child.elements_attributes.src;
						else if (child.elements_tag === 'div') {
							child.api_childrens.forEach((element) => {
								images.push(element.elements_attributes);
							});
						}
					});

					let time = [];
					let bg = [];
					widget.widgets_class.forEach((classes) => {
						if (classes.includes('time'))
							time.push(classes.split('time_').pop());
						if (classes.includes('color'))
							bg.push(classes.split('color_').pop());
					});

					let today = new Date();
					let show = false;

					let imageTimeStart = new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate(),
						time[0].split(':')[0],
						time[0].split(':')[1],
						0
					);
					let imageTimeEnd = new Date(
						today.getFullYear(),
						today.getMonth(),
						today.getDate(),
						time[1].split(':')[0],
						time[1].split(':')[1],
						59
					);

					if (imageTimeEnd > imageTimeStart) {
						if (today >= imageTimeStart && today <= imageTimeEnd) {
							show = true;
						}
					} else if (imageTimeStart > imageTimeEnd) {
						if (imageTimeEnd >= today || today >= imageTimeStart) {
							show = true;
						}
					}

					return show && <MainBanner key={key} images={images} video={video} />;
				}

				if (widget.widgets_name === 'Homepage Widget - 1') {
					let video = children[0];
					let title = children[1];
					let desc = children[2];
					let link = children[3];

					return (
						<HomepageWidget
							key={key}
							src={video.elements_attributes.src}
							title={title.elements_slot}
							desc={desc.elements_slot}
							link={link}
						/>
					);
				}

				if (widget.widgets_name === 'Page Banner') {
					let image = children[0].elements_attributes.src;
					let title = children[1].elements_slot;
					let subtitle = '';
					subtitle = children[2] ? children[2].elements_slot : '';
					let noBg = widgetClasses.includes('no-bg') ? true : false;

					widgetClasses += ` ${theme}`;

					// widgetClasses += ` ${theme}`;

					return (
						<PageBanner
							key={key}
							image={image}
							title={title}
							subtitle={subtitle}
							widgetClasses={widgetClasses}
							noBg={noBg}
						/>
					);
				}

				if (widget.widgets_name === 'Section Title') {
					let titleClass = children[0].elements_class
						? children[0].elements_class.join(' ')
						: '';

					return (
						<React.Fragment key={key}>
							<h2 className={`heading-2 ${titleClass}`}>
								{parse(children[0].elements_slot)}
							</h2>
							{children[1].elements_slot && parse(children[1].elements_slot)}
						</React.Fragment>
					);
				}

				if (widget.widgets_name === 'Text Content') {
					let childrenClasses =
						children[0].elements_class !== null
							? children[0].elements_class.join(' ')
							: '';

					let content = children[0].elements_slot
						? children[0].elements_slot
						: '';

					return (
						<Column key={key} columnClasses={childrenClasses}>
							{children.map((child) => createCMSElement(child))}
						</Column>
					);
				}

				if (widget.widgets_name === 'Text Column') {
					return (
						<Column key={key} columnClasses={widgetClasses}>
							{children.map((child) => createCMSElement(child))}
						</Column>
					);
				}

				if (widget.widgets_name === 'Stacked Images') {
					return (
						<Column key={key}>
							<StackedImages
								images={[
									children[0].elements_attributes,
									children[1].elements_attributes,
									children[2].elements_attributes,
								]}
							/>
						</Column>
					);
				}

				if (widget.widgets_name === 'Single Image') {
					return (
						<Column key={key}>
							<SingleImage image={children[0].elements_attributes} />
						</Column>
					);
				}

				if (widget.widgets_name === 'Image Content') {
					const elementClasses = children[0].elements_class
						? children[0].elements_class.join(' ')
						: '';
					return (
						<Column key={key}>
							<div className={`${elementClasses} img-container`}>
								<img
									src={children[0].elements_attributes.src}
									alt={children[0].elements_attributes.alt}
								/>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'Image - Marquee') {
					let images = [];
					children.forEach((image) => images.push(image));
					return (
						<Column key={key}>
							<Marquee images={images} widgetClasses={widgetClasses} />
						</Column>
					);
				}

				if (widget.widgets_name === 'Video Content') {
					let type = children[0].elements_attributes.type;
					if (type === 'youtube') {
						return (
							<div
								className='yt-container'
								style={{
									position: 'relative',
									aspectRatio: '4 / 2.3',
								}}
								key={key}>
								{parse(children[0].elements_attributes.embedded_code)}
							</div>
						);
					}

					let src = children[0].elements_attributes.src;

					let poster = children[0].api_childrens[0].elements_attributes.src;

					return <VideoContent key={key} src={src} poster={poster} />;
				}

				if (widget.widgets_name === 'Banner - Full Page') {
					return (
						<FullPageBanner
							key={key}
							image={children[0].elements_attributes}
							caption={children[1].elements_slot}
						/>
					);
				}

				if (widget.widgets_name === 'MV Item') {
					let elementClasses_1 = children[1].elements_class
						? children[1].elements_class.join(' ')
						: '';
					let elementClasses_2 = children[2].elements_class
						? children[2].elements_class.join(' ')
						: '';
					let elementClasses_3 = children[3].elements_class
						? children[3].elements_class.join(' ')
						: '';

					return (
						<Column key={key}>
							<div className='mv-item'>
								<div className='img-container'>
									<img
										src={children[0].elements_attributes.src}
										alt={children[0].elements_attributes.alt}
									/>
								</div>

								<div className='desc-container'>
									<div className={elementClasses_1}>
										{parse(children[1].elements_slot)}
									</div>
									<div className={elementClasses_2}>
										{' '}
										{parse(children[2].elements_slot)}
									</div>
									<div className={elementClasses_3}>
										{' '}
										{parse(children[3].elements_slot)}
									</div>
								</div>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'Business Item') {
					let image = children[0];
					let type = children[1];
					let small = children[1].api_childrens[0];
					let title = children[2];
					let titleClass = title.elements_class
						? title.elements_class.join(' ')
						: 'heading-3';
					let desc = children[3];
					let link = children[4];
					if (link) link.elements_attributes.to = link.elements_attributes.href;

					return (
						<Column key={key}>
							<div className={`business-item ${widgetClasses}`}>
								<div className='img-container'>
									{link ? (
										<Link {...link.elements_attributes}>
											<img
												src={image.elements_attributes.src}
												alt={image.elements_attributes.alt}
											/>
										</Link>
									) : (
										<img
											src={image.elements_attributes.src}
											alt={image.elements_attributes.alt}
										/>
									)}
								</div>
								<div className='desc-container'>
									{small.elements_slot && (
										<div className='business-type'>
											{createCMSElement(type)}
										</div>
									)}
									{title.elements_slot && (
										<h3 className={`business-name ${titleClass}`}>
											{link ? (
												<Link {...link.elements_attributes}>
													{title.elements_slot}
												</Link>
											) : (
												title.elements_slot
											)}
										</h3>
									)}

									{desc.elements_slot && parse(desc.elements_slot)}
								</div>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'PDF Widget') {
					let link = children[0].elements_attributes
						? children[0].elements_attributes.src
						: '';
					let title = children[1];

					if (children[2].elements_attributes.to)
						link = children[2].elements_attributes.to;
					console.log(link);

					return (
						<Column key={key} className={widgetClasses}>
							<PDFWidget title={title.elements_slot} link={link} />
						</Column>
					);
				}

				if (widget.widgets_name === 'Slider') {
					let slides = [];

					children.map((div) => {
						let image = div.api_childrens[0];
						let desc = div.api_childrens[1];

						let data = {
							image: image.elements_attributes,
							desc: desc.elements_slot,
						};

						slides.push(data);
					});

					return (
						<ImageSlider
							key={key}
							widgetClasses={widgetClasses}
							slides={slides}
						/>
					);
				}

				if (widget.widgets_name === 'Annual Reports') {
					let slides = [];

					children.map((div) => {
						let title, desc, img, link, subtitle;
						div.api_childrens.map((child) => {
							if (
								child.elements_name === 'Title' ||
								child.elements_name === 'H1'
							)
								title = child.elements_slot;
							if (child.elements_name === 'Image')
								img = child.elements_attributes;
							if (
								child.elements_name === 'Paragraph' ||
								child.elements_name === 'Content'
							)
								desc = child.elements_slot;
							if (
								child.elements_name === 'Corporate Files' &&
								child.elements_attributes
							) {
								link = child.elements_attributes.src;
							}

							if (
								(child.elements_name === 'React Button' ||
									child.elements_name === 'React Link') &&
								child.elements_attributes.to !== ''
							)
								link = child.elements_attributes.to;

							if (child.elements_name === 'Subtitle')
								subtitle = child.elements_slot;
						});

						let d = {};

						if (title) d.title = title;
						if (desc) d.desc = desc;
						if (img) d.img = img;
						if (link) d.link = link;
						if (subtitle) d.subtitle = subtitle;

						slides.push(d);
					});
					return <AnnualReports key={key} slides={slides} />;
				}

				if (widget.widgets_name === 'Custom Widget') {
					if (
						children.elements_name !== 'Paragraph' &&
						children.elements_name !== 'Content'
					)
						return (
							<Column key={key} columnClasses={widgetClasses}>
								{children.map((child) => createCMSElement(child))}
							</Column>
						);
					else
						return <React.Fragment key={key}>{parse(children)}</React.Fragment>;
				}

				if (widget.widgets_name === 'Sustainability Widget') {
					let title, desc, link;
					let images = [];

					children.map((child) => {
						if (child.elements_name === 'Title' || child.elements_name === 'H1')
							title = child.elements_slot;

						if (child.elements_name === 'Image')
							images.push(child.elements_attributes);

						if (child.elements_name === 'Paragraph') desc = child.elements_slot;

						if (
							(child.elements_name === 'React Button' ||
								child.elements_name === 'React Link') &&
							child.elements_attributes.to !== ''
						)
							link = child;
					});

					return (
						<SustainabilitySection
							images={images}
							label={title}
							desc={desc}
							link={link}
							key={key}
						/>
					);
				}

				let ourbusiness_widget = [];
				let ourbusiness_key = `ourbusiness_`;

				if (widget.widgets_name === 'Our Business') {
					// let img = ;
					// let title = div[1].;
					// let description = div[2].;
					// let link = div[3].;

					children.forEach((d) => {
						if (d.api_childrens.length)
							ourbusiness_widget.push({
								img: d.api_childrens[0].elements_attributes,
								title: d.api_childrens[1].elements_slot,
								description: d.api_childrens[2].elements_slot,
								link: d.api_childrens[3].elements_attributes.to,
							});
					});

					return <OurBusinesses data={ourbusiness_widget} key={key} />;
				}

				if (widget.widgets_name === 'Our Story Tabs') {
					let data = [];
					children.map((div) => {
						let trigger = div.api_childrens[0];
						let target = div.api_childrens[1];

						let d = {
							trigger: {
								label: trigger.api_childrens[0].elements_slot,
								subtitle: trigger.api_childrens[1].elements_slot,
							},
							target: {
								img_1: target.api_childrens[0].elements_attributes,
								img_2: target.api_childrens[1].elements_attributes,
								content: target.api_childrens[2].elements_slot,
							},
						};

						data.push(d);
					});

					return <OurStoryTab key={key} data={data} />;
				}

				if (widget.widgets_name === 'Our Company - Tabs') {
					let data = [];
					children.map((div) => {
						if (div.api_childrens === 0) return;

						let trigger = div.api_childrens[0];
						let target = div.api_childrens[1];

						let d = {
							trigger: {
								label: trigger.api_childrens[0].elements_slot,
								icon_1: trigger.api_childrens[1].elements_attributes,
								icon_2: trigger.api_childrens[2].elements_attributes,
							},

							target: target,
						};

						data.push(d);
					});
					return <OurCompanyTab data={data} key={key} />;
				}

				if (widget.widgets_name === 'Parent-Child - Data List') {
					if (!children[0]) return;
					if (!children[1]) return;
					let slug = children[0] && children[0].elements_attributes.href;
					let title = children[1] && children[1].elements_slot;
					if (slug && title)
						return <ParentChildDataList key={key} slug={slug} title={title} />;
				}

				if (widget.widgets_name === 'Parent - Data List') {
					return <Listing key={key} url={page_slug} title={''} />;
				}

				if (widget.widgets_name === 'Contact Us - SMAI') {
					return <SMAIForm />;
				}

				// if (index === widgets.length - 1) {
				// 	return renderCombinedWidgets({ ourbusiness_widget, ourbusiness_key });
				// }
			})}
		</React.Fragment>
	);
}

function Listing({ url, title }) {
	const { list } = useGetDataList(url, title);

	useEffect(() => {
		console.log(list);
	}, [list]);

	return (
		<>
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
		</>
	);
}

function ParentChildDataList({ slug, title }) {
	const { header, list } = useGetDataList(slug, title);

	return (
		<>
			<h2 style={{ flex: '1 1 250px', margin: '0' }}>{header}</h2>
			<div className='link-listing_links' style={{ flex: '1 1 360px' }}>
				{list.length !== 0 &&
					list.map((item, index) => {
						return (
							<Link key={`id_${item.page_id}`} to={`/${item.page_slug_full}`}>
								{item.page_title}
							</Link>
						);
					})}
			</div>
		</>
	);
}
