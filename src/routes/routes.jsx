import Builder from 'src/Pages/Builder';
import CompanyDisclosures from 'src/Pages/CompanyDisclosures';
import DividendHistory from 'src/Pages/DividendHistory';
import FinancialHighlights from 'src/Pages/FinancialHighlights';
import FinancialStatements from 'src/Pages/FinancialStatement';
import Search from 'src/Pages/Search';
import SharePrices from 'src/Pages/SharePrices';
import ErrorPage from 'src/error-page';

export const routes = [
	{
		path: '/',
		element: <Builder />,
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
		path: '/corporate',
		element: <Builder />,
	},
	{
		path: '/corporate/company-disclosures',
		element: <CompanyDisclosures />,
	},
	{
		path: '/corporate/financial-highlights',
		element: <FinancialHighlights />,
	},
	{
		path: '/corporate/dividend-history',
		element: <DividendHistory />,
	},
	{
		path: '/corporate/share-prices',
		element: <SharePrices />,
	},
	{
		path: '/corporate/financial-statements',
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
