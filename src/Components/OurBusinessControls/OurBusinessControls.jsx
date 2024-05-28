import { useContext, useEffect } from 'react';
import { APIContext } from 'src/App';

import { useSearchMenu } from 'src/data/data';

const api_url = import.meta.env.VITE_API_URL;

export default function OurBusinessControls({ parent_id }) {
	const { menuItem } = useSearchMenu(parent_id);
	const { ourBusinesses, setOurBusinesses } = useContext(APIContext);

	useEffect(() => {});

	useEffect(() => {
		if (!menuItem) return;
		if (ourBusinesses.length !== 0) return;
		console.log(`${api_url}page/${menuItem.page_slug}/data-list`);
		fetch(`${api_url}page/${menuItem.page_slug}/data-list`, {
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
				setOurBusinesses(data);
			});

		console.log(menuItem);
	}, [menuItem]);

	useEffect(() => {
		console.log(ourBusinesses);
	}, [ourBusinesses]);
	return <div>controls</div>;
}
