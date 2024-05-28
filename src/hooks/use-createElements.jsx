import parse from 'html-react-parser';
import React from 'react';
import { PiCaretCircleRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
const LinkElementNames = ['Button Stacked', 'React Link'];

export const createCMSElement = ({
	elements_name,
	api_childrens,
	elements_tag,
	elements_attributes,
	element_code,
	elements_class,
	elements_slot,
}) => {
	if (LinkElementNames.includes(elements_name)) elements_tag = Link;
	if (elements_name === 'Icon') {
		if (!elements_slot) return;
		elements_tag = getIcon(elements_slot);
		elements_attributes = {
			...elements_attributes,
			size: elements_attributes.size ? elements_attributes.size : '1.75rem',
		};
	}
	if (elements_name === 'Image') {
		if (!elements_attributes.src) return;
	}
	if (elements_name === 'Paragraph') {
		if (elements_slot)
			return (
				<React.Fragment key={element_code}>
					{parse(elements_slot)}
				</React.Fragment>
			);
	}

	// let element = {};
	// element.tag = e.elements_tag;
	// element.attributes = {
	// 	...e.elements_attributes,
	// 	className: e.elements_class,
	// };

	return React.createElement(
		elements_tag,
		{
			...elements_attributes,
			key: element_code,
			className: elements_class ? elements_class.join(' ') : '',
		},
		createCMSElementChild({
			elements_slot,
			api_childrens,
			elements_tag,
			element_code,
		})
	);
};

export const createCMSElementChild = ({
	elements_slot,
	api_childrens,
	elements_tag,
	element_code,
}) => {
	if (elements_tag === 'img') return null;
	return (
		<React.Fragment key={`${element_code}_children`}>
			{elements_slot && elements_slot}
			{api_childrens &&
				api_childrens.map((children) => {
					return createCMSElement(children);
				})}
		</React.Fragment>
	);
};

export const getIcon = (elements_slot) => {
	if (elements_slot === 'PiCaretCircleRight') return PiCaretCircleRight;
};
