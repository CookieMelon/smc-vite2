import { ThemeContext } from '../App';
import { getColors } from '../hooks/use-color';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { api_url } from 'src/hooks/use-env';

const api_url = import.meta.env.VITE_API_URL;

export const useGetButtonColor = () => {
	const { red, blue, yellow, baseBlack } = getColors;
	const [buttonColor, setButtonColor] = useState(baseBlack);
	const { smcTheme } = useContext(ThemeContext);

	useEffect(() => {
		if (smcTheme === 'smc-red') setButtonColor(red);
		else if (smcTheme === 'smc-blue') setButtonColor(blue);
		else if (smcTheme === 'smc-yellow') setButtonColor(baseBlack);
		else setButtonColor(baseBlack);
	}, [smcTheme]);

	return { buttonColor };
};

export const useGetMenuNew = (setFakePreload) => {
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		setFakePreload(false);
		if (!menu.length) {
			fetch(`${api_url}/navigation`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					let filteredMenu = data.filter((item) => {
						// let filteredNavigation = item.navigations.map((item) => {
						// 	let filteredNavigation = item.navigations.map((item) => {
						// 		return item.page_is_published;
						// 	});

						// 	item.navigations = filteredNavigation;
						// 	return item.page_is_published;
						// });

						// item.navigations = filteredNavigation;
						return item.page_is_published && item.page_slug !== 'home';
					});
					setMenu((prev) => (prev = filteredMenu));
					setFakePreload(true);
				});
		}
	}, [setFakePreload]);

	return { menu };
};

export const useGetBannerData = () => {
	const today = new Date();
	const { baseBlack } = getColors;
	const images = [
		{
			video: `/images/Homepage-1/NewBanner/banner_morning.mp4`,
			images: [],
			start: '5:00:00',
			end: '6:59:59',
			bg: ['#dcb994', '#eccda2'],
		},
		{
			images: [
				`/images/Homepage-1/NewBanner/7am-11am-1.png`,
				`/images/Homepage-1/NewBanner/7am-11am-2.png`,
				`/images/Homepage-1/NewBanner/7am-11am-3.png`,
				`/images/Homepage-1/NewBanner/7am-11am-4.png`,
			],
			start: '7:00:00',
			end: '10:59:59',
			bg: ['#bac1c9', '#6ba7cc'],
			color: baseBlack,
		},
		{
			images: [
				`/images/Homepage-1/NewBanner/11am-4pm-1.png`,
				`/images/Homepage-1/NewBanner/11am-4pm-2.png`,
				`/images/Homepage-1/NewBanner/11am-4pm-3.png`,
				`/images/Homepage-1/NewBanner/11am-4pm-4.png`,
			],
			start: '11:00:00',
			end: '15:59:59',
			bg: ['#bac1c9', '#6ba7cc'],
			color: baseBlack,
		},
		{
			images: [
				`/images/Homepage-1/NewBanner/4pm-6pm-1.png`,
				`/images/Homepage-1/NewBanner/4pm-6pm-2.png`,
				`/images/Homepage-1/NewBanner/4pm-6pm-3.png`,
				`/images/Homepage-1/NewBanner/4pm-6pm-4.png`,
			],
			start: '16:00:00',
			end: '17:59:59',
			bg: ['#6ba7cc', '#bac1c9'],
			color: baseBlack,
		},
		{
			video: `/images/Homepage-1/NewBanner/banner_night.mp4`,
			images: `/images/Homepage-1/NewBanner/D.jpg`,
			start: '18:00:00',
			end: '4:59:59',
			bg: ['#182A3A', '#101D28'],
		},
	];

	let banner_data = {};
	images.map((image, index) => {
		let imageTimeStart = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			image.start.split(':')[0],
			image.start.split(':')[1]
		);
		let imageTimeEnd = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			image.end.split(':')[0],
			image.end.split(':')[1]
		);

		if (today >= imageTimeStart && today <= imageTimeEnd) {
			banner_data.images = image.images;
			banner_data.video = image.video;
			banner_data.bg = image.bg;
			banner_data.color = image.color;
		}
		if (index === 4) {
			if (imageTimeEnd >= today || today >= imageTimeStart) {
				banner_data.images = image.images;
				banner_data.video = image.video;
				banner_data.bg = image.bg;
				banner_data.color = image.color;
			}
		}
	});

	return { ...banner_data };
};

export const useGetTheme = (menu) => {
	const [smcTheme, setsmcTheme] = useState('smc-default');

	const location = useLocation();

	const getTheme = (index, setter) => {
		switch (index) {
			case 0:
			case -1:
				setter('smc-red');
				break;
			case 1:
				setter('smc-null');
				break;
			case 2:
				setter('smc-blue');
				break;
			case 3:
				setter('smc-yellow');
				break;
			default:
				setter('smc-default');
		}
	};
	useEffect(() => {
		// if (router.route.split('/')[0] === )
		let parentLinks = menu.map((item) => item.page_slug);

		let index = parentLinks.indexOf(location.pathname.split('/')[1]);
		if (location.pathname === '/') index = -2;
		getTheme(index, setsmcTheme);
	}, [location, menu]);

	return { smcTheme };
};

export const useGetToggleFill = () => {
	const { red, blue, yellow } = getColors;
	const [toggleFill, setToggleFill] = useState(red);

	const { smcTheme } = useContext(ThemeContext);

	useEffect(() => {
		if (smcTheme === 'smc-red') setToggleFill(red);
		if (smcTheme === 'smc-blue') setToggleFill(blue);
		else if (smcTheme === 'smc-yellow') setToggleFill(yellow);
		else setToggleFill(red);
	}, [smcTheme]);

	return { toggleFill };
};

export const useGetContent = () => {
	const location = useLocation();
	const [[title, sections, content_type_id, page_slug], setData] = useState([
		'',
		[],
	]);
	useEffect(() => {
		let path =
			location.pathname === '/' ? 'home' : location.pathname.split('/').pop();

		fetch(`${api_url}page/${path}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setData([
					data.page_title,
					data.api_sections,
					data.content_type_id,
					data.page_slug,
				]);
			});
	}, []);

	return { title, sections, content_type_id, page_slug };
};

export const useGetDisclosureFiles = (page_slug, page, keyword, year) => {
	const [[files, oldest_date], setData] = useState([null, '']);

	useEffect(() => {
		fetch(
			`${api_url}disclosure_category/${page_slug}?page=${page}&&src=${keyword}&&year=${year}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setData([
					data.disclosure_files.files,
					data.disclosure_files.oldest_date,
				]);
			});
	}, [page_slug, page, keyword, year]);

	return { files, oldest_date };
};

export const useGetCompanyDiclosures = () => {
	useEffect(() => {
		fetch(`${api_url}company_disclosure`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// console.log(data);
			});
	}, []);
};
