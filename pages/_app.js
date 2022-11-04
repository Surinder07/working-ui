import React from 'react';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/globals.css';
import Head from 'next/head';
import router from 'next/router';

function MyApp({ Component, pageProps }) {

    const [activeMenu, setActiveMenu] = useState('home');

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
                <meta name="description" content="Automated Workforce Scheduling created by WAAW to make businness hassle-free" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            {
                !(activeMenu === 'login' || activeMenu === 'Pricing') &&
                <Navigation
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                />
            }
            <Component {...pageProps} setActiveMenu={setActiveMenu}/>
            {
                !(activeMenu === 'login' || activeMenu === 'Pricing') &&
                <Footer
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                />
            }
        </React.Fragment>
    )
}

export default MyApp