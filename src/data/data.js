import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuContext, ThemeContext } from '../App';
import { getColors } from '../hooks/use-color';
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

	const removeUnpublished = (menuParent) => {
		let filteredItem = menuParent.filter((child) => {
			let filteredNavigation = [];
			if (child.navigations.length !== 0)
				filteredNavigation = removeUnpublished(child.navigations);
			child.navigations = filteredNavigation;
			return (
				(child.set_as_sub_menu || child.set_as_main_menu) &&
				child.page_is_published &&
				child.page_slug !== 'home'
			);
		});

		return filteredItem;
	};

	useEffect(() => {
		setFakePreload(false);
		if (!menu.length) {
			fetch(`${api_url}navigation`, {
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
					let filteredMenu = removeUnpublished(data);

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
		if (location.pathname.split('/')[1] === 'disclosures') index = 2;

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

export const useGetPage = () => {
	const location = useLocation();
	const menu = useContext(MenuContext);
	const [
		[title, sections, content_type_id, page_slug, parent_id, theme],
		setData,
	] = useState(['', []]);

	const [[date], setNewsData] = useState([]);

	const [error, setError] = useState(false);

	const getTheme = (index) => {
		switch (index) {
			case 0:
			case -1:
				return 'smc-red';
			case 1:
				return 'smc-null';
			case 2:
				return 'smc-blue';
			case 3:
				return 'smc-yellow';
			default:
				return 'smc-default';
		}
	};
	useEffect(() => {
		if (menu.length === 0) return;

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
				if (data.error) {
					setError(true);
					return;
				}

				let parentLinks = menu.map((item) => item.page_slug);
				let index = parentLinks.indexOf(data.page_slug_full.split('/')[0]);
				if (location.pathname === '/') index = -2;

				setData([
					data.page_title,
					data.api_sections,
					data.content_type_id,
					data.page_slug,
					data.parent_page_id,
					getTheme(index),
				]);

				setNewsData([data.publish_date]);
			});
	}, [menu]);

	return {
		error,
		title,
		sections,
		content_type_id,
		page_slug,
		parent_id,
		theme,

		// news data
		date,
	};
};

const populateYear = (oldestYear) => {
	let yearNow = new Date().getFullYear();

	return Array.from({ length: yearNow - oldestYear + 1 }, (v, i) => {
		return {
			id: oldestYear + i,
			name: oldestYear + i,
		};
	}).reverse();
};
export const useGetDisclosureCategoryFiles = (
	page_slug,
	page,
	keyword,
	year
) => {
	const [[title, files, oldest_date, last_page], setData] = useState([
		null,
		'',
	]);
	const [years, setYears] = useState([]);
	const controller = new AbortController();
	const signal = controller.signal;

	useEffect(() => {
		fetch(
			`${api_url}disclosure_category/${page_slug}?page=${page}&&src=${keyword}&&year=${year}`,
			{
				method: 'GET',
				signal: signal,
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
					data.title,
					data.disclosure_files.files,
					data.disclosure_files.oldest_date,
					data.disclosure_files.files.last_page,
				]);

				setYears(
					(prev) =>
						(prev = populateYear(
							new Date(data.disclosure_files.oldest_date).getFullYear()
						))
				);
			});
	}, [page_slug, page, keyword, year]);

	return { title, files, oldest_date, last_page, years };
};

export const useGetDisclosureAll = () => {
	const [content, setContent] = useState(null);
	useEffect(() => {
		fetch(`${api_url}disclosure_all`, {
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
				setContent((prev) => (prev = data));
			});
	}, []);

	return { content };
};

export const useGetCompanyDiclosures = () => {
	const [list, setList] = useState([]);

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

export const useGetDisclosureFiles = (category, keyword, page, year) => {
	const [[files, last_page], setContent] = useState([[], '']);
	const [years, setYears] = useState([]);
	useEffect(() => {
		if (category === '')
			fetch(
				`${api_url}disclosure_file?src=${keyword}&&page=${page}&&year=${year}`,
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
					setContent([
						data.files.data,
						// data.disclosure_files.oldest_date,
						data.files.last_page,
					]);
					// let yearNow = new Date().getFullYear();

					setYears(
						(prev) =>
							(prev = populateYear(new Date(data.oldest_date).getFullYear()))
					);
				});
		if (category !== '')
			fetch(
				`${api_url}disclosure_category/${category}?page=${page}&&src=${keyword}&&year=${year}`,
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
					setContent([
						data.disclosure_files.files.data,
						data.disclosure_files.files.last_page,
					]);

					setYears(
						(prev) =>
							(prev = populateYear(
								new Date(data.disclosure_files.oldest_date).getFullYear()
							))
					);
				});
	}, [keyword, page, year, category]);

	return { files, years, last_page };
};

export const useGetDataList = (slug, title) => {
	const [[header, list], setList] = useState([title, []]);

	useEffect(() => {
		fetch(`${api_url}page/${slug}/data-list`, {
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
				setList([title, data]);
			});
	}, [slug]);

	return { header, list };
};

export const useSearchMenu = (id) => {
	const [menuItem, setMenuItem] = useState();
	const menu = useContext(MenuContext);

	const searchMenu = (element, id) => {
		element.map((item) => {
			if (item.page_id === id) {
				setMenuItem((prev) => (prev = item));
			}
			if (item.navigations.length !== 0)
				return searchMenu(item.navigations, id);
		});
	};

	useEffect(() => {
		if (menu.length === 0) return;
		searchMenu(menu, id);
	}, [menu]);

	return { menuItem };
};

export const useGetFinancialStatements = () => {
	const [content, setContent] = useState([]);

	fetch(`${api_url}financial_statements`, {
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
			setContent((prev) => (prev = data));
		});

	return { content };
};

export const useGetSearch = (searchParams) => {
	const [result, setResult] = useState([]);

	useEffect(() => {
		if (!searchParams.get('search')) return;
		fetch(`${api_url}search?search=${searchParams.get('search')}`, {
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
				setResult(data);
			});
	}, [searchParams]);

	return { result };
};

export const useGetSharePrices = (sely, selm) => {
	const [content, setContent] = useState(null);
	useEffect(() => {
		fetch(`${api_url}share_prices?year=${sely}&&month=${selm}`, {
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
				setContent((prev) => (prev = data));
			});
	}, [sely, selm]);

	return { content };
};
