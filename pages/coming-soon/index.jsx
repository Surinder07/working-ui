import Link from "next/link";
import styles from '../../styles/ComingSoon.module.css';

const ComingSoon = (props) => {

    return (
        <div className={styles.background}>
            <Link href="/" onClick={() => props.setActiveMenu('/')}>
                <img src='/logo/LogoInverted.svg' alt="HOME" />
            </Link>
            <h3>WE ARE PREPARING SOMETHING AWESOME</h3>
            <h1>COMING SOON</h1>
            <div className={styles.loader}>
                <div className={styles.loader_progress}></div>
            </div>
            <p className={styles.loader_percent}>50%</p>
        </div>
    )
}

export default ComingSoon;