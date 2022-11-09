import { fontWeight } from "@mui/system";
import Head from "next/head";
import Link from "next/link";
import styles from '../styles/pages/404.module.css'

const NotFound = () => {
    return (
        <div>
            <Head>
                <title>WaaW | 404 - Page Not Found</title>
            </Head>
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
                    <Link href={'/home'}>
                    <p><span style={{fontWeight:700}}>←</span> Go back to home</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;