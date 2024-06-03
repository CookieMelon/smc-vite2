const transform = ['walang-iwanan-smcs-covid-19-efforts', 'news'];
export const getLink = (item) => {
	let parent_slug = '/';

	if (item.page_slug_full.split('/').length !== 1)
		parent_slug += item.page_slug_full.split('/')[0];

	if (transform.includes(item.page_slug_full.split('/')[2])) {
		parent_slug += `/${item.page_slug_full.split('/')[2]}`;
	}

	let link = {};
	link.to = parent_slug;
	link.to += `/${item.page_slug}`;

	if (link.to === '/home') link.to = '/';

	if (item.page_external_link) {
		link.to = `${item.page_external_link}`;
		link.target = '_blank';
		link.rel = 'noopener';
	}

	return link;
};
