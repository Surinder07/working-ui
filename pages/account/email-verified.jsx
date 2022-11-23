import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/pages/Account.module.css';

const EmailVerified = (props) => {

    const router = useRouter();

    useEffect(() => {
        props.setActiveMenu('account');
    }, []);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.pageContainer}>
                    <div className={styles.pageBackground} style={{ height: '50vh', backgroundImage: `url(/bg/email-success-bg.svg)` }}></div>
                    <div className={styles.contentContainer}>
                        <h3>Your email has been vaildated successfully. Please login to complete your profile.</h3>
                        <button
                            className={`${styles.button}`}
                            style={{ width: 'fit-content', margin: '20px auto 0 auto' }}
                            onClick={() => router.push('/login')}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default EmailVerified;