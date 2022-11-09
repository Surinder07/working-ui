import React from 'react';
import { useState, useEffect } from 'react';
import { NavLinks } from '../lib/constants/NavLinks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
import Head from 'next/head';
import router from 'next/router';
import TopLoader from '../components/TopLoader';

function MyApp({ Component, pageProps }) {

    const [activeMenu, setActiveMenu] = useState('home');
    const [openMenu, setOpenMenu] = useState(false);
    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const [screenType, setScreenType] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const menuHeight = 70;

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
    })

    const getActiveMenuFromPath = (path) => {
        switch (path) {
            case '/':
                return 'home';
            case '/why-waaw':
                return 'Why WAAW';
            case '/coming-soon':
                return 'Pricing';
        }
    }

    useEffect(() => {
        if (window.innerWidth < 640) {
            setScreenType(3)
        } else if (window.innerWidth > 1000) {
            setScreenType(1)
        } else {
            setScreenType(2)
        }
    })

    useEffect(() => {
        router.beforePopState(({ as }) => {
            setActiveMenu(getActiveMenuFromPath(as));
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, [router]);

    return (
        <React.Fragment>
            <Head>
                <title>WaaW | Automated Workforce Scheduling</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="description" content="Automated Workforce Scheduling created by WAAW to make businness hassle-free" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <div>
                <TopLoader pageLoading={pageLoading} />
                {
                    !(activeMenu === 'login' || activeMenu === 'Pricing') &&
                    <Navbar
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        menuHeight={menuHeight}
                        navLinks={NavLinks}
                        screenType={screenType}
                    />
                }
                <Component {...pageProps} setActiveMenu={setActiveMenu} screenType={screenType} />
                {
                    !(activeMenu === 'login' || activeMenu === 'Pricing') &&
                    <Footer
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                        screenType={screenType}
                    />
                }
            </div>
        </React.Fragment>
    )
}

export default MyApp