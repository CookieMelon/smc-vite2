import { motion, useInView } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { LenisContext } from 'src/App';

export default function ScrollSnap({ children }) {
	const ref = useRef(null);

	const isInView = useInView(ref, {
		amount: 0.15,
		// once: true,
	});

	const lenis = useContext(LenisContext);

	useEffect(() => {
		if (!isInView || !lenis) return;

		let refBox = ref.current.getBoundingClientRect();

		let { top, height } = refBox;
		lenis.scrollTo(ref.current.offsetTop, {
			lock: true,
			// touchInertiaMultiplier: 15,
			// smoothWheel: false,
			// duration: 0.5,
			// touchMultiplier: 0.5,
			// onComplete: () => {
			// 	console.log('test');
			// },
		});
		// const snap = new Snap(lenis, {});
		// snap.add(500); // snap at 500px
		// snap.add(1000); // snap at 1000px
		// snap.add(1500); // snap at 1500px
	}, [isInView, lenis]);

	return <motion.div ref={ref}>{children}</motion.div>;
}
