import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetPage } from 'src/data/data';

export default function NewsInner() {
	// const { id: page_slug } = useParams();

	const {
		error,
		title,
		sections,
		content_type_id,
		page_slug,
		parent_id,
		theme,
		data,
	} = useGetPage();

	return (
		<Fade>
			<PageBanner title={title} widgetClasses='no-bg' />
			{sections.map((section) => {
				console.log(section.api_widgets);
				return (
					<Section containerClass='medium'>
						{section.api_widgets.map((children) => {
							return children.api_childrens((child) => {
								console.log(child);
							});
						})}
					</Section>
				);
			})}
		</Fade>
	);
}
