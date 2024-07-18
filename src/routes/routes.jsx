import { Navigate } from 'react-router-dom';
import Builder from 'src/Pages/Builder';
import CompanyDisclosures from 'src/Pages/Corporate/CompanyDisclosures';
import Disclosures from 'src/Pages/Corporate/Disclosures';
import DividendHistory from 'src/Pages/Corporate/DividendHistory';
import FinancialHighlights from 'src/Pages/Corporate/FinancialHighlights';
import FinancialStatements from 'src/Pages/Corporate/FinancialStatement';
import PDFViewer from 'src/Pages/Corporate/PDFViewer';
import SharePrices from 'src/Pages/Corporate/SharePrices';
import WhistleBlowingForm from 'src/Pages/Corporate/WhistleBlowingForm';
import News from 'src/Pages/News/News';
import Search from 'src/Pages/Search';
import ErrorPage from 'src/error-page';

export const routes = [
	{
		path: '/',
		element: <Builder />,
	},

	{
		path: '/ASM2024',
		element: (
			<Navigate
				to='/disclosures/2024-smc-annual-stockholders-meeting'
				replace={true}
			/>
		),
	},

	{
		path: '/search',
		element: <Search />,
	},
	{
		path: '/our-story',
		element: <Builder />,
	},
	{
		path: '/our-story/:id',
		element: <Builder />,
	},
	{
		path: '/our-story/:id/:id',
		element: <Builder />,
	},
	{
		path: '/our-story/:id/:id/:id',
		element: <Builder />,
	},
	{
		path: '/corporate',
		element: <Builder />,
	},
	{
		path: '/corporate/:id',
		element: <Builder />,
	},
	{
		path: '/corporate/:id/:id',
		element: <Builder />,
	},
	{
		path: '/corporate/:id/:id/:id',
		element: <Builder />,
	},
	{
		path: '/page/:id',
		element: <Builder />,
	},
	{
		path: '/corporate/news',
		element: <News />,
	},
	{
		path: '/corporate/news/:id',
		element: <Builder />,
	},
	{
		path: '/corporate/corporate-governance/companys-policies/whistle-blower-form',
		element: <WhistleBlowingForm />,
	},
	{
		path: '/corporate/:id/:id/:id/:id',
		element: <Builder />,
	},
	{
		path: '/disclosures/pdf&link=https://www.sanmiguel.com.ph/storage/files/reports/2023_Minutes_of_the_2023_Annual_Stockholders_meeting_of_SMC_SIGNED-APPROVED.pdf',
		element: <PDFViewer />,
	},
	{
		path: '/disclosures/pdf&link=https://www.sanmiguel.com.ph/storage/files/reports/2024_Minutes_of_the_2024_Annual_Stockholders_meeting_of_SMC_Draft.pdf',
		element: <PDFViewer />,
	},
	{
		path: '/disclosures/all',
		element: <CompanyDisclosures />,
	},
	{
		path: '/disclosures/:id',
		element: <Disclosures />,
	},
	{
		path: '/corporate/investor-relations/financial-performance/financial-highlights',
		element: <FinancialHighlights />,
	},
	{
		path: '/corporate/investor-relations/shareholder-information/dividend-history',
		element: <DividendHistory />,
	},
	{
		path: '/corporate/investor-relations/shareholder-information/share-prices',
		element: <SharePrices />,
	},
	{
		path: '/corporate/investor-relations/financial-performance/financial-statements',
		element: <FinancialStatements />,
	},
	{
		path: '/corporate/:id',
		element: <Builder />,
	},
	{
		path: '/careers',
		element: <Builder />,
	},

	{
		path: '*',
		Component: ErrorPage,
	},
];
