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
