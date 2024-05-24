import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Pillar from 'src/CMS/Pillar/Pillar';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import Footer from 'src/Layout/Footer/footer';
import { useGetContent } from 'src/data/data';
import React, { createContext, useContext, useEffect } from 'react';
import parse from 'html-react-parser';
import StackedImages from 'src/CMS/StackedImages/stackedimages';
import OurStoryTab from 'src/CMS/OurStoryTab/ourstorytab';
import Marquee from 'src/CMS/Marquee/Marquee';
import SingleImage from 'src/CMS/SingleImage/SingleImage';
import FullPageBanner from 'src/CMS/FullPageBanner/fullpagebanner';
import MainBanner from 'src/CMS/MainBanner/MainBanner';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from 'src/App';
import VideoContent from 'src/CMS/VideoContent/Video';
import PDFWidget from 'src/CMS/PDFWidget/PDFWidget';

import { PiCaretCircleRight } from 'react-icons/pi';
import ImageSlider from 'src/CMS/ImageSlider/ImageSlider';

import SustainabilitySection from 'src/CMS/SustainabilitySection/SustainabilitySection';
import OurBusinesses from 'src/CMS/OurBusinesses/OurBusinesses';
import Disclosures from './Disclosures';
import HomepageWidget from 'src/CMS/HomepageWidget/HomepageWidget';
import OurCompanyTab from 'src/CMS/OurCompanyTab/OurCompanyTab';
import { createCMSElement } from 'src/hooks/use-createElements';
import AnnualReports from 'src/CMS/AnnualReports/AnnualReports';

let defaultMenus = ['our-story', 'sustainability', 'corporate', 'careers'];
export default function Builder() {
	// const location = useLocation();
	// const sections = useState([]);

	const location = useLocation();

	let index = defaultMenus.indexOf(location.pathname.split('/')[1]);
	let theme;
	if (location.pathname === '/') index = -2;

	switch (index) {
		case 0:
		case -1:
			theme = 'smc-red';
			break;
		case 1:
			theme = 'smc-null';
			break;
		case 2:
			theme = 'smc-blue';
			break;
		case 3:
			theme = 'smc-yellow';
			break;
		default:
			theme = 'smc-default';
			break;
	}

	const { title, sections, content_type_id, page_slug } = useGetContent();

	return (
		<Fade>
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
				/* Disclosures */
				content_type_id === 11 && <Disclosures page_slug={page_slug} />
			}
		</Fade>
	);
}

function Widgets({ widgets, hasColumn, keyWidget, theme }) {
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
							{parse(content)}
							{}
						</Column>
					);
				}

				if (widget.widgets_name === 'Text Column') {
					return (
						<Column key={key} columnClasses={widgetClasses}>
							<h2>{children[0].elements_slot}</h2>
							{parse(children[1].elements_slot)}

							<p>
								{children[1].api_childrens.map((child) => {
									if (child.elements_name === 'Hyperlink') {
										let elementClasses = child.elements_class
											? child.elements_class.join(' ')
											: '';

										return (
											<Link
												key={child.element_code}
												className={elementClasses}
												to={child.elements_attributes.src}>
												{child.elements_attributes.value}
											</Link>
										);
									}
								})}
							</p>
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
							<React.Fragment key={key}>
								{parse(children[0].elements_attributes.embedded_code)}
							</React.Fragment>
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

					return (
						<Column key={key}>
							<div className={`business-item ${widgetClasses}`}>
								<div className='img-container'>
									<img
										src={image.elements_attributes.src}
										alt={image.elements_attributes.alt}
									/>
								</div>
								<div className='desc-container'>
									{small.elements_slot && (
										<div className='business-type'>
											{createCMSElement(type)}
										</div>
									)}
									{title.elements_slot && (
										<h3 className={`business-name ${titleClass}`}>
											{title.elements_slot}
										</h3>
									)}

									{desc.elements_slot && parse(desc.elements_slot)}
									{}
								</div>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'PDF Widget') {
					let files = children[0].elements_attributes
						? children[0].elements_attributes.src
						: '';
					let title = children[1];
					// let headingSize = title.elements_class
					// 	? title.elements_class.join(' ')
					// 	: null;
					let link = children[2];

					return (
						<Column key={key} className={widgetClasses}>
							<PDFWidget
								// headingSize={headingSize}
								title={title.elements_slot}
								link={files}
							/>
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
						let title, desc, img, link;

						title = div.api_childrens[0].elements_slot;
						img = div.api_childrens[1].elements_attributes;
						desc = div.api_childrens[2].elements_slot;

						if (div.api_childrens[3].elements_attributes)
							link = div.api_childrens[3].elements_attributes.src;
						if (div.api_childrens[4].elements_attributes.to !== '')
							link = div.api_childrens[4].elements_attributes.to;

						let d = {};

						if (title) d.title = title;
						if (desc) d.desc = desc;
						if (img) d.img = img;
						if (link) d.link = link;

						slides.push(d);
					});
					return <AnnualReports key={key} slides={slides} />;
				}

				if (widget.widgets_name === 'Custom Widget') {
					if (children.elements_name !== 'Paragraph')
						return (
							<Column key={key} columnClasses={widgetClasses}>
								{children.map((child) => createCMSElement(child))}
							</Column>
						);
					else
						return <React.Fragment key={key}>{parse(children)}</React.Fragment>;
				}

				if (widget.widgets_name === 'Sustainability Widget') {
					let images = [];
					images.push(children[0].elements_attributes.src);
					images.push(children[1].elements_attributes.src);
					images.push(children[2].elements_attributes.src);

					return <SustainabilitySection images={images} key={key} />;
				}

				let ourbusiness_widget = [];
				let ourbusiness_key = `ourbusiness_`;

				if (widget.widgets_name === 'Our Business') {
					// let img = ;
					// let title = div[1].;
					// let description = div[2].;
					// let link = div[3].;

					children.forEach((d) => {
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

				// if (index === widgets.length - 1) {
				// 	return renderCombinedWidgets({ ourbusiness_widget, ourbusiness_key });
				// }
			})}
		</React.Fragment>
	);
}
