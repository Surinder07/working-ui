import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/globals.css';
import router from 'next/router';
import TopLoader from '../components/loaders/TopLoader';
import WaawHead from '../components/WaawHead';
import { secureLocalStorage } from '../helpers';
import { userService } from '../services/user.service';
import NavFooterPageLayout from '../layouts/NavFooterPageLayout';
import DashboardLayout from '../layouts/DashboardLayout';

function MyApp({ Component, pageProps }) {
    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const [screenType, setScreenType] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [firstVisit, setFirstVisit] = useState(true);
    const [pageInfo, setPageinfo] = useState({
        authenticationRequired: false,
        // Possible values: {loggedOut, dashboard, fullPage}
        pageView: 'loggedOut',
        activeMenu: 'none',
        activeSubMenu: 'none'
    });

    const getActiveMenuFromPath = (path) => {
        if (path.includes('why-waaw')) {
            return 'WHY_WAAW';
        } else if (path.includes('pricing')) {
            return 'PRICING';
        } else return 'none';
    }

    useEffect(() => {
        router.beforePopState(({ as }) => {
            setPageinfo({ ...pageInfo, activeMenu: getActiveMenuFromPath(as) });
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
    })

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
        if (firstVisit && pageInfo.authenticationRequired) {
            userService.getUser()
                .then(res => {
                    if (res.error) router.push('/login');
                    secureLocalStorage.saveData(userService.USER_KEY, JSON.stringify(res));
                    setUser(res);
                })
                .catch((e) => {
                    router.push('/login');
                })
            setFirstVisit(false);
        }
        if (!secureLocalStorage.getData(userService.USER_KEY) && pageInfo.authenticationRequired) {
            router.push('/login');
        }
    }

    const getComponentForPages = () => {
        return <Component {...pageProps}
            screenType={screenType}
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
            pageInfo={pageInfo}
            setPageInfo={setPageinfo}
        />
    }

    return (
        <React.Fragment>
            <WaawHead />
            <div>
                <TopLoader pageLoading={pageLoading} />
                {
                    pageInfo.pageView === 'loggedOut' &&
                    <NavFooterPageLayout
                        pageInfo={pageInfo}
                        setPageinfo={setPageinfo}
                        screenType={screenType}
                    >
                        {getComponentForPages()}
                    </NavFooterPageLayout>
                }
                {
                    pageInfo.pageView === 'dashboard' &&
                    <DashboardLayout
                        pageInfo={pageInfo}
                        setPageinfo={setPageinfo}
                        screenType={screenType}
                    >
                        {getComponentForPages()}
                    </DashboardLayout>
                }
                {
                    pageInfo.pageView === 'fullPage' &&
                    getComponentForPages()
                }
            </div>
        </React.Fragment>
    )
}

export default MyApp;