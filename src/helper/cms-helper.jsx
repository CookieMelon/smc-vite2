import parse from 'html-react-parser';
import React from 'react';
import { PiCaretCircleRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
const LinkElementNames = ['Button Stacked', 'React Link', 'React Button'];

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
	if (elements_name === 'Paragraph' || elements_name === 'Content') {
		if (elements_slot)
			return (
				<React.Fragment key={element_code}>
					{parse(elements_slot)}
				</React.Fragment>
			);
	}
	if (elements_name === 'Quote') {
		if (elements_slot) elements_slot = parse(elements_slot);
	}

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

export const checkTitle = (element) => {
	if (element.elements_name === 'Title' || element.elements_name === 'H1')
		return element.elements_slot;
};

export const checkSubTitle = (element) => {
	if (element.elements_name === 'Subtitle') return element.elements_slot;
};

export const checkImage = (element) => {
	if (element.elements_name === 'Image') return element.elements_attributes;
};

export const checkParagraph = (element) => {
	if (element.elements_name === 'Paragraph') return element.elements_slot;
};

export const checkCorporateFiles = (element) => {
	if (
		element.elements_name === 'Corporate Files' &&
		element.elements_attributes
	)
		return element.elements_attributes.src;
};

export const checkReactLink = (element) => {
	if (
		(element.elements_name === 'React Button' ||
			element.elements_name === 'React Link') &&
		element.elements_attributes.to !== ''
	)
		return element.elements_attributes.to;
};
