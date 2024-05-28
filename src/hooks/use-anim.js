const useAnim = (variants, preload) => {
	return {
		variants,
		initial: 'initial',
		animate: !preload ? 'enter' : 'initial',
		exit: 'exit',
	};
};

export default useAnim;
