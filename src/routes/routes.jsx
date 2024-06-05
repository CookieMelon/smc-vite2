import Builder from 'src/Pages/Builder';
import CompanyDisclosures from 'src/Pages/CompanyDisclosures';
import Disclosures from 'src/Pages/Disclosures';
import DividendHistory from 'src/Pages/DividendHistory';
import FinancialHighlights from 'src/Pages/FinancialHighlights';
import FinancialStatements from 'src/Pages/FinancialStatement';
import Forms from 'src/Pages/Form';
import News from 'src/Pages/News';
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
		element: <Forms />,
	},
	{
		path: '/corporate/:id/:id/:id/:id',
		element: <Builder />,
	},

	{
		path: '/corporate/company-disclosures',
		element: <CompanyDisclosures />,
	},
	{
		path: '/disclosures/:id',
		element: <Disclosures />,
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
