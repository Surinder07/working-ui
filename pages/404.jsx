import Link from "next/link";
import { useEffect } from "react";
import WaawHead from "../components/WaawHead";
import styles from '../styles/pages/404.module.css'

const NotFound = (props) => {

    useEffect(() => {
        props.setActiveMenu('404');
    })

    return (
        <>
            <WaawHead title='WaaW | 404 - Page Not Found' meta={{robots:'noindex, nofollow'}} />
            <div className={styles.notFoundPage}>
                <div className={styles.notFound}>
                    <div className={styles.notFound404}>
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