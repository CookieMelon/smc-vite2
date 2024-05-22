export const initialDuration = 0.15;
export const initialDelay = 0;
export const enterDuration = 1.15;
export const enterDelay = 0.5;

export const exitDuration = 0.35;
export const exitDelay = 0.2;

export const text = {
	initial: {
		opacity: 1,
		transition: {
			duration: initialDuration,
			delay: initialDelay,
		},
	},
	enter: {
		opacity: 0,
		top: -100,
		transition: {
			duration: enterDuration,
			delay: enterDelay,
			ease: [0.76, 0, 0.24, 1],
			opacity: {
				duration: enterDuration - 0.2,
				delay: enterDelay,
			},
		},
		transitionEnd: { top: '47.5%' },
	},
	exit: {
		opacity: 1,
		top: '40vh',
		transition: {
			duration: exitDuration,
			delay: exitDelay,
			ease: [0.33, 1, 0.68, 1],
		},
	},
};

export const curve = (initialPath, targetPath, toggleFill) => {
	return {
		initial: {
			d: initialPath,
			transition: {
				duration: initialDuration,
				delay: initialDelay,
			},
		},
		enter: {
			d: targetPath,
			transition: {
				duration: enterDuration,
				delay: enterDelay,
				ease: [0.76, 0, 0.24, 1],
			},
		},
		exit: {
			d: initialPath,
			transition: { duration: exitDuration + 0.25, ease: [0.76, 0, 0.24, 1] },
		},
	};
};

export const translate = {
	initial: {
		top: '-300px',
		transition: {
			duration: initialDuration,
			delay: initialDelay,
		},
	},
	enter: {
		top: '-100vh',
		transition: {
			duration: enterDuration,
			delay: enterDelay,
			ease: [0.76, 0, 0.24, 1],
		},
		transitionEnd: {
			top: '100vh',
		},
	},
	exit: {
		top: '-300px',
		transition: { duration: exitDuration + 0.25, ease: [0.76, 0, 0.24, 1] },
	},
};

export const fadeVariants = {
	initial: {
		opacity: 0,
		scale: 0.96,
		top: '-300px',
		transition: {
			duration: initialDuration,
			delay: initialDelay,
		},
	},
	enter: {
		opacity: 1,
		scale: 1,
		top: '-100vh',
		transition: {
			duration: enterDuration,
			delay: enterDelay,
			ease: [0.76, 0, 0.24, 1],
		},
		transitionEnd: {
			top: '100vh',
		},
	},
	exit: {
		opacity: 0,
		scale: 0.96,
		top: '-300px',
		transition: { duration: exitDuration + 0.25, ease: [0.76, 0, 0.24, 1] },
	},
};
