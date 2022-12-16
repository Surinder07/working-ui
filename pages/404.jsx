import Link from "next/link";
import { useEffect } from "react";
import { WaawNoIndexHead } from "../components";
import { NotFoundStyles } from '../styles/pages';

const NotFound = (props) => {

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'loggedOut',
            activeMenu: 'none',
            activeSubMenu: 'none'
        })
    }, []);

    return (
        <>
            <WaawNoIndexHead title='404 - Page Not Found' />
            <div className={NotFoundStyles.notFoundPage}>
                <div className={NotFoundStyles.notFound}>
                    <div className={NotFoundStyles.notFound404}>
                        <h3>Oops! Page not found</h3>
                        <h1>
                            <span>4</span>
                            <span>0</span>
                            <span>4</span>
                        </h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                    <Link href={'/'}>
                        <p><span style={{ fontWeight: 700 }}>←</span> Go back to home</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound;