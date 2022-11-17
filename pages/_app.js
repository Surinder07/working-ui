import React from 'react';
import { useState, useEffect } from 'react';
import { NavLinks } from '../constants/NavLinks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
import router from 'next/router';
import TopLoader from '../components/TopLoader';
import WaawHead from '../components/WaawHead';
import { secureLocalStorage } from '../helpers';
import { userService } from '../services/user.service';

function MyApp({ Component, pageProps }) {

    const [activeMenu, setActiveMenu] = useState('home');
    const [openMenu, setOpenMenu] = useState(false);
    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const [screenType, setScreenType] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState({})
    const [token, setToken] = useState(null)
    const menuHeight = 70;
    const hideNavigationFor = ['login', 'coming-soon'];
    const showLoginFor = ['/', 'home', 'Why WAAW', 'Pricing'];

    const getActiveMenuFromPath = (path) => {
        switch (path) {
            case '/':
                return 'home';
            case '/why-waaw':
                return 'Why WAAW';
            case '/coming-soon':
                return 'Pricing';
            case '/login':
                return 'login';
        }
    }

    useEffect(() => {
        router.beforePopState(({ as }) => {
            setActiveMenu(getActiveMenuFromPath(as));
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router]);

    useEffect(() => {
        if (localStorage.getItem(userService.TOKEN_KEY) != null && localStorage.getItem(userService.TOKEN_KEY) != '') {
            setToken(secureLocalStorage.getData(userService.TOKEN_KEY));
        }
        if (user.email == null && localStorage.getItem(userService.USER_KEY) != null && localStorage.getItem(userService.USER_KEY) != '') {
            setUser(JSON.parse(secureLocalStorage.getData(userService.USER_KEY)));
        }
        if (window.innerWidth < 640) {
            setScreenType(3)
        } else if (window.innerWidth > 1000) {
            setScreenType(1)
        } else {
            setScreenType(2)
        }
    }, [])

    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setPageLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setPageLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [])

    return (
        <React.Fragment>
            <WaawHead />
            <div>
                <TopLoader pageLoading={pageLoading} />
                {
                    !hideNavigationFor.includes(activeMenu) &&
                    <Navbar
                        activeMenu={activeMenu}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        menuHeight={menuHeight}
                        navLinks={NavLinks}
                        screenType={screenType}
                        user={user}
                        showLogin={showLoginFor.includes(activeMenu)}
                    />
                }
                <Component {...pageProps}
                    setActiveMenu={setActiveMenu}
                    screenType={screenType}
                    user={user}
                    token={token}
                />
                {
                    !hideNavigationFor.includes(activeMenu) &&
                    <Footer screenType={screenType} />
                }
            </div>
        </React.Fragment>
    )
}

export default MyApp