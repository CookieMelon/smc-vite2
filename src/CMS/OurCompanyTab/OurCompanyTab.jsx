import { motion, AnimatePresence } from 'framer-motion';

import ImageSlider from 'src/CMS/ImageSlider/ImageSlider';
import { useState } from 'react';
import { createCMSElement } from 'src/hooks/use-createElements';

export default function OurCompanyTab({ data }) {
	const [selected, setSelected] = useState(0);
	console.log(data);
	return (
		<>
			<div className='column sticky tab-source tabsource-ourcompany'>
				{data.map((item, index) => {
					let trigger = item.trigger;

					return (
						<motion.button
							key={`ourcompany_trigger_${index}`}
							className={`tab-links ${selected === index ? 'active' : ''}`}
							onTap={() => {
								setSelected(index);
							}}>
							<div className='img-container'>
								<img src={trigger.icon_1.src} alt={trigger.icon_1.alt} />
								<img src={trigger.icon_2.src} alt={trigger.icon_2.alt} />
							</div>
							<div className='heading-6 tab-label'>{trigger.label}</div>
						</motion.button>
					);
				})}
			</div>

			<div className='column tab-target tabtarget-ourcompany'>
				{data.map((item, index) => {
					return (
						<motion.div
							key={`ourcompany_target_${index}`}
							style={{ display: selected === index ? 'block' : 'none' }}>
							{item.target.api_childrens.map((child) => {
								if (child.elements_class) {
									if (child.elements_class.includes('slider')) {
										// let slides = [];
										// child.api_childrens.map((div) => {
										// 	let image = div.api_childrens[0];
										// 	let desc = div.api_childrens[1];
										// 	let data = {
										// 		image: image.elements_attributes,
										// 		desc: desc.elements_slot,
										// 	};
										// 	slides.push(data);
										// });
										// return (
										// 	<ImageSlider key={`slider_${child.elements_code}`} />
										// );
									}
								}
								return createCMSElement(child);
							})}

							{/* <ImageSlider
						dots={true}
						type='full'
						captionPosition='absolute'
						arrows={false}
						slides={fnb}
					/> */}
						</motion.div>
					);
				})}
			</div>
		</>
	);
}
