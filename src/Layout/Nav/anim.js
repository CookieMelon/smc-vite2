import { getColors } from '../../hooks/use-color';

export const toggleSettings = {
	size: 70,
	gap: 8,
	edge: 10,
	padding: 10,
	hover: 15,
};

export const transitionSettings = {
	duration: 0.5,
	ease: [0.76, 0, 0.24, 1],
};

// main nav

export const hover_animation = {
	open: {
		opacity: 1,
		scale: 1,
		y: 0,
		pointerEvents: 'all',
		transition: { ...transitionSettings, duration: 0.15 },
	},
	closed: {
		opacity: 0,
		scale: 0.9,
		x: '-50%',
		y: 10,
		pointerEvents: 'none',
		transition: { ...transitionSettings, duration: 0.15 },
	},
};

// toggle nav

export const floatingNavContent_variants = {
	open: {
		display: 'flex',
		transition: {
			// staggerChildren: 0.025,
			// delayChildren: 0.5,
		},
	},
	initial: {
		display: 'none',

		transition: {
			// delay: 0.4,
			// delayChildren: 0.5,
		},
	},
};

export const navItem_variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: transitionSettings,
	},
	initial: {
		y: 50,
		opacity: 0,
		transition: transitionSettings,
	},
};

// export const path1_variants = {
// 	hovered: {
// 		d: `M${
// 			toggleSettings.size -
// 			toggleSettings.edge -
// 			toggleSettings.padding -
// 			toggleSettings.hover
// 		}  ${toggleSettings.size / 2 - toggleSettings.gap} L${
// 			toggleSettings.size - toggleSettings.edge - toggleSettings.padding
// 		} ${toggleSettings.size / 2 - toggleSettings.gap}`,
// 		transition: transitionSettings,
// 	},
// 	initial: {
// 		y: '0px',
// 		rotate: '0deg',
// 		d: `M${toggleSettings.edge + toggleSettings.padding} ${
// 			toggleSettings.size / 2 - toggleSettings.gap
// 		} L${toggleSettings.size - toggleSettings.edge - toggleSettings.padding} ${
// 			toggleSettings.size / 2 - toggleSettings.gap
// 		}`,
// 		transition: transitionSettings,
// 	},
// 	open: {
// 		d: `M${
// 			toggleSettings.size -
// 			toggleSettings.edge -
// 			toggleSettings.padding -
// 			toggleSettings.hover
// 		}  ${toggleSettings.size / 2 - toggleSettings.gap} L${
// 			toggleSettings.size - toggleSettings.edge - toggleSettings.padding
// 		} ${toggleSettings.size / 2 - toggleSettings.gap}`,
// 		transition: transitionSettings,
// 		y: '7px',
// 		rotate: '135deg',
// 		transformOrigin: '35px 27px',
// 		transition: transitionSettings,
// 	},
// };

// export const path2_variants = {
// 	hovered: {
// 		d: `M${toggleSettings.edge + toggleSettings.padding} ${
// 			toggleSettings.size / 2
// 		} L${toggleSettings.size - toggleSettings.edge - toggleSettings.padding} ${
// 			toggleSettings.size / 2
// 		}`,
// 		transition: transitionSettings,
// 	},
// 	initial: {
// 		scaleX: 1,
// 		d: `M${toggleSettings.edge + toggleSettings.padding} ${
// 			toggleSettings.size / 2
// 		} L${toggleSettings.size - toggleSettings.edge - toggleSettings.padding} ${
// 			toggleSettings.size / 2
// 		}`,
// 		transition: transitionSettings,
// 	},
// 	open: {
// 		scaleX: 0,
// 		transformOrigin: '35px 35px',
// 		transition: transitionSettings,
// 	},
// };

// export const path3_variants = {
// 	hovered: {
// 		d: `M${toggleSettings.edge + toggleSettings.padding} ${
// 			toggleSettings.size / 2 + toggleSettings.gap
// 		} L${toggleSettings.edge + toggleSettings.padding + toggleSettings.hover} ${
// 			toggleSettings.size / 2 + toggleSettings.gap
// 		}`,
// 		transition: transitionSettings,
// 	},
// 	initial: {
// 		y: '0px',
// 		rotate: '0deg',
// 		d: `M${toggleSettings.edge + toggleSettings.padding}  ${
// 			toggleSettings.size / 2 + toggleSettings.gap
// 		} L${toggleSettings.size - toggleSettings.edge - toggleSettings.padding} ${
// 			toggleSettings.size / 2 + toggleSettings.gap
// 		}`,
// 		transition: transitionSettings,
// 	},
// 	open: {
// 		y: '-8px',
// 		rotate: '225deg',
// 		transformOrigin: '35px 43px',
// 		transition: transitionSettings,
// 	},
// };

export const path1_variants = {
	hovered: {
		d: 'M35  27 L50 27',
		transition: transitionSettings,
	},
	initial: {
		y: '0px',
		rotate: '0deg',
		d: 'M20 27 L50 27',
		transition: transitionSettings,
	},
	open: {
		d: 'M20  27 L50 27',
		transition: transitionSettings,
		y: '7px',
		rotate: '135deg',
		transformOrigin: '35px 27px',
		transition: transitionSettings,
	},
};

export const path2_variants = {
	hovered: {
		d: 'M20 35 L50 35',
		transition: transitionSettings,
	},
	initial: {
		scaleX: 1,
		d: 'M20 35 L50 35',
		transition: transitionSettings,
	},
	open: {
		scaleX: 0,
		transformOrigin: '35px 35px',
		transition: transitionSettings,
	},
};

export const path3_variants = {
	hovered: {
		d: 'M20 43 L35 43',
		transition: transitionSettings,
	},
	initial: {
		y: '0px',
		rotate: '0deg',
		d: 'M20  43 L50 43',
		transition: transitionSettings,
	},
	open: {
		y: '-8px',
		rotate: '225deg',
		transformOrigin: '35px 43px',
		transition: transitionSettings,
	},
};
