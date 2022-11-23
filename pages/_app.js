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

    const [activeMenu, setActiveMenu] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const [screenType, setScreenType] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [firstVisit, setFirstVisit] = useState(true);
    const showLoginFor = ['/', 'home', 'Why WAAW', 'Pricing', '', 'hide'];

    const getActiveMenuFromPath = (path) => {
        switch (path) {
            case '/':
                return 'home';
            case '/why-waaw':
                return 'Why WAAW';
            case '/pricing/business':
                return 'Pricing';
            case '/pricing/talent':
                return 'Pricing';
            default:
                return 'hide';
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
        checkPageLoading();
        updateScreenTypeProp();
    }, [])

    useEffect(() => {
        checkIfLoggedIn();
    }, [activeMenu])

    const checkPageLoading = () => {
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
    }

    const updateScreenTypeProp = () => {
        if (window.innerWidth < 640) {
            setScreenType(3)
        } else if (window.innerWidth > 1000) {
            setScreenType(1)
        } else {
            setScreenType(2)
        }
    }

    const checkIfLoggedIn = () => {
        if (firstVisit && activeMenu !== '' && !showLoginFor.includes(activeMenu)) {
            userService.getUser()
                .then(res => {
                    secureLocalStorage.saveData(userService.USER_KEY, JSON.stringify(res));
                    setUser(res);
                })
                .catch((e) => {
                    router.push('/login');
                })
            setFirstVisit(false);
        }
    }

    return (
        <React.Fragment>
            <WaawHead />
            {
                console.log(activeMenu)
            }
            <div>
                <TopLoader pageLoading={pageLoading} />
                {
                    activeMenu !== 'hide' &&
                    <Navbar
                        activeMenu={activeMenu}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
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
                    setUser={setUser}
                    token={token}
                    setToken={setToken}
                />
                {
                    activeMenu !== 'hide' &&
                    <Footer screenType={screenType} />
                }
            </div>
        </React.Fragment>
    )
}

export default MyApp;