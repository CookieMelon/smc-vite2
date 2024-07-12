import { AnimatePresence } from 'framer-motion';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import Nav from 'src/Layout/Nav/Nav';
import { useGetCSRFToken, useGetMenuNew, useGetTheme } from 'src/data/data';
import 'src/styles/styles.scss';

import { ReactLenis, useLenis } from 'lenis/react';
import Preload from 'src/Components/Preload/preload';
import Footer from 'src/Layout/Footer/footer';
import PrivacyStatement from './Components/PrivacyStatement/PrivacyStatement';
import { routes } from './routes/routes';

export const MenuContext = createContext([]);
export const ThemeContext = createContext();
export const PreloadContext = createContext({});
export const LenisContext = createContext({});
export const APIContext = createContext({});
export const CSRFContext = createContext(null);

function App() {
	// API context

	const lenis = useLenis(({ scroll }) => {
		// called every scroll
	});

	const [ourBusinesses, setOurBusinesses] = useState([]);
	// const [token, setToken] = useGetToken();

	const [preload, setPreload] = useState(false);
	const [doneIntro, setDoneIntro] = useState(false);
	// menu context
	const { menu } = useGetMenuNew();
	const { csrf_token } = useGetCSRFToken();

	// theme context
	const { smcTheme } = useGetTheme(menu);

	const location = useLocation();
	let router = useRoutes(routes);
	if (!router) return null;

	useEffect(() => {
		if (!lenis) return;
		lenis.scrollTo(0, {
			immediate: true,
		});
	}, [location, menu]);

	return (
		<ReactLenis root>
			<div className='App'>
				<CSRFContext.Provider value={csrf_token}>
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
				</CSRFContext.Provider>
			</div>
		</ReactLenis>
	);
}

export default App;
