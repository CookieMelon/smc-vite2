import 'pdf-viewer-root';

import React, { useEffect, useRef, useState } from 'react';
import './DividendHistory.scss';

import { useLocation } from 'react-router-dom';
import Fade from 'src/Layout/Fade/Fade';

import pdf1 from 'src/assets/2023_Minutes_of_the_2023_Annual_Stockholders_meeting_of_SMC_SIGNED-APPROVED.pdf';
import pdf2 from 'src/assets/2024_Minutes_of_the_2024_Annual_Stockholders_meeting_of_SMC_Draft.pdf';

const api_url = import.meta.env.VITE_API_URL;

export default function PDFViewer() {
	// const [searchParams] = useSearchParams();
	// const link = searchParams.get('link');

	const location = useLocation();
	const link = location.pathname.split('=')[1];
	const div = useRef();
	const [file, setFile] = useState(null);

	useEffect(() => {
		let nav = document.querySelector('.nav-container');
		if (nav) nav.remove();

		let footer = document.querySelector('.main-footer');
		if (footer) footer.remove();

		let file_url = link.split('/');
		console.log(file_url[file_url.length - 1]);
		if (
			file_url[file_url.length - 1] ===
			'2023_Minutes_of_the_2023_Annual_Stockholders_meeting_of_SMC_SIGNED-APPROVED.pdf'
		) {
			setFile(pdf1);
			console.log('pdf1');
		}

		if (
			file_url[file_url.length - 1] ===
			'2024_Minutes_of_the_2024_Annual_Stockholders_meeting_of_SMC_Draft.pdf'
		) {
			setFile(pdf2);
			console.log('pdf2');
		}
	}, []);

	useEffect(() => {
		console.log(file);
	}, [file]);
	return (
		<Fade customStyle={{ minHeight: '100vh' }}>
			<div
				ref={div}
				style={{ height: '100%', width: '100%', position: 'absolute' }}>
				{file &&
					React.createElement('pdf-viewer-root', {
						url: `${file}`,
						mode: 2,
						dpi: 300,
						scale: 10,
					})}
			</div>
		</Fade>
	);
}
