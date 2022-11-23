import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '../../styles/pages/Account.module.css';

const LinkExpired = (props) => {

    const router = useRouter();

    useEffect(() => {
        props.setActiveMenu('account');
    }, []);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.pageBackground} style={{ backgroundImage: `url(/bg/link-expired-bg.svg)` }}></div>
                    <div className={styles.contentContainer}>
                        <h1 style={{ color: '#000' }}>Whoops! The link has expired.</h1>
                        <h3>For security reasons, links expire after a little while. Please register again to continue</h3>
                        <button
                            className={`${styles.button}`}
                            style={{ width: 'fit-content', margin: '20px auto 0 auto' }}
                            onClick={() => router.push('/register')}
                        >
                            Go to Registration
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LinkExpired;