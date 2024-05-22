export const pageTranslate = (index = 0) => {
	return {
		initial: {
			opacity: 0,
			top: '20vh',
		},
		enter: {
			opacity: 1,
			top: '0vh',
			transition: {
				duration: 0.75,
				delay: 0.5 + index * 0.03,
				ease: [0.76, 0, 0.24, 1],
			},
			transitionEnd: {
				opacity: 1,
				top: '0vh',
			},
		},
		exit: {
			opacity: 0,
			top: '-20vh',
			transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
		},
	};
};
