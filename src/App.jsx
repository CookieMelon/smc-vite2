import { AnimatePresence } from 'framer-motion';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import Nav from 'src/Layout/Nav/Nav';
import { useGetMenuNew, useGetTheme } from 'src/data/data';
import 'src/styles/styles.scss';

import Preload from 'src/Components/Preload/preload';
import Footer from 'src/Layout/Footer/footer';

export const MenuContext = createContext([]);
export const ThemeContext = createContext();
export const PreloadContext = createContext({});
export const LenisContext = createContext({});
export const APIContext = createContext({});

import { ReactLenis, useLenis } from 'lenis/react';
import PrivacyStatement from './Components/PrivacyStatement/PrivacyStatement';
import { routes } from './routes/routes';

function App() {
	const lenis = useLenis(({ scroll }) => {});
	// API context
	const [ourBusinesses, setOurBusinesses] = useState([]);
	// const [token, setToken] = useGetToken();

	const [preload, setPreload] = useState(false);
	const [doneIntro, setDoneIntro] = useState(false);
	// menu context
	const { menu } = useGetMenuNew(setPreload);

	useEffect(() => {
		if (menu.length !== 0 && ourBusinesses.length !== 0) setPreload(true);
	}, [menu, ourBusinesses]);

	// theme context
	const { smcTheme } = useGetTheme(menu);

	const location = useLocation();
	let router = useRoutes(routes);
	if (!router) return null;

	useEffect(() => {
		if (lenis)
			lenis.scrollTo(0, {
				duration: 0,
			});
	}, [location, lenis]);

	return (
		<ReactLenis root>
			<div className='App'>
				<LenisContext.Provider value={lenis}>
					<APIContext.Provider
						value={{
							ourBusinesses,
							setOurBusinesses,
						}}>
						<PreloadContext.Provider
							value={{
								preload,
								setPreload,
								doneIntro,
								setDoneIntro,
							}}>
							<MenuContext.Provider value={menu}>
								<ThemeContext.Provider value={{ smcTheme }}>
									<Nav />
									<Preload />
									<PrivacyStatement />
									<div style={{ minHeight: '100vh' }}>
										<AnimatePresence mode='wait'>
											{React.cloneElement(router, { key: location.pathname })}
										</AnimatePresence>
									</div>
									<Footer />
								</ThemeContext.Provider>
							</MenuContext.Provider>
						</PreloadContext.Provider>
					</APIContext.Provider>
				</LenisContext.Provider>
			</div>
		</ReactLenis>
	);
}

export default App;
