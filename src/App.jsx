import 'src/styles/styles.scss';
import Nav from 'src/Layout/Nav/Nav';
import React, { createContext, useState } from 'react';
import { useGetTheme, useGetMenuNew } from 'src/data/data';
import { useLocation, useRoutes } from 'react-router-dom';
import ErrorPage from 'src/error-page';
import { AnimatePresence } from 'framer-motion';

import Builder from 'src/Pages/Builder';
import Preload from 'src/Components/Preload/preload';
import Footer from 'src/Layout/Footer/footer';
import FinancialHighlights from './Pages/FinancialHighlights';
import DividendHistory from './Pages/DividendHistory';
import SharePrices from './Pages/SharePrices';
import CompanyDisclosures from './Pages/CompanyDisclosures';

export const MenuContext = createContext([]);
export const ThemeContext = createContext();
export const PreloadContext = createContext({});

function App() {
	const [preload, setPreload] = useState(true);
	const [fakePreload, setFakePreload] = useState(false);
	const [doneIntro, setDoneIntro] = useState(false);
	const { menu } = useGetMenuNew(setFakePreload);
	const { smcTheme } = useGetTheme(menu);
	const location = useLocation();
	const router = useRoutes([
		{
			path: '/',
			element: <Builder />,
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
			path: '/corporate/:id',
			element: <Builder />,
		},
		{
			path: '/careers',
			element: <Builder />,
		},
		{
			path: '/search',
			element: <Builder />,
		},
		{
			path: '*',
			Component: ErrorPage,
		},
	]);

	if (!router) return null;

	return (
		<div className='App'>
			<PreloadContext.Provider
				value={{
					preload,
					fakePreload,
					setFakePreload,
					doneIntro,
					setDoneIntro,
				}}>
				<MenuContext.Provider value={menu}>
					<ThemeContext.Provider value={{ smcTheme }}>
						<Nav />
						<Preload />
						<div style={{ minHeight: '100vh' }}>
							<AnimatePresence mode='wait'>
								{React.cloneElement(router, { key: location.pathname })}
							</AnimatePresence>
						</div>
						<Footer />
					</ThemeContext.Provider>
				</MenuContext.Provider>
			</PreloadContext.Provider>
		</div>
	);
}

export default App;
