import Link from "next/link";
import LinkedImage from "../../components/LinkedImage";
import styles from '../../styles/pages/ComingSoon.module.css';

const ComingSoon = (props) => {

    return (
        <div className={styles.background}>
            <div className={styles.logoContainer}>
                <LinkedImage
                    link='/home'
                    src='/logoInverted.svg'
                    alt='Logo(link to home)'
                    height={80}
                    onClick={() => {
                        props.setActiveMenu('/');
                        props.setOpenMenu(false);
                    }}
                />
            </div>
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