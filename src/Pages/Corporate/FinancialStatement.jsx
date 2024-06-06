import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useGetFinancialStatements, useGetPage } from 'src/data/data';

export default function FinancialStatements() {
	const { title, theme } = useGetPage();
	const { content } = useGetFinancialStatements();

	function FinancialStatementData({ items }) {
		let year = '';
		let newYear = false;

		// moment(new Date(item.date)).format('YYYY')
		return items.map((item, index) => {
			let item_year = new Date(item.fs_date).getFullYear();
			let title = item.fs_title ? item.fs_title : item.title;

			if (year !== item_year) {
				year = item_year;
				newYear = true;
			} else {
				newYear = false;
			}
			return (
				<>
					{newYear ? (
						<tr className='no-bg'>
							<td colSpan='2'>
								<b>{year}</b>
							</td>
						</tr>
					) : (
						''
					)}
					<tr>
						<td>{title}</td>
						<td>
							<a
								href={item.file_url}
								target='_blank'
								without='true'
								rel='noreferrer'>
								View/Download
							</a>
						</td>
					</tr>
				</>
			);
		});
	}

	return (
		<Fade>
			<PageBanner title={title} widgetClasses={theme} />
			<Section containerClass={'medium'}>
				<Column>
					{content &&
						content.map((item, index) => {
							return (
								<table className='table'>
									<tr>
										<th colSpan='2'>{item.title}</th>
									</tr>
									<FinancialStatementData items={item.disclosure_files} />
								</table>
							);
						})}
				</Column>
			</Section>
		</Fade>
	);
}
