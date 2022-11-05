import styles from '../styles/elements/ComingSoonEl.module.css';

const ComingSoonEl = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.containerComingSoon}><span className={styles.blueTextColor}>Coming</span> Soon</h1>
            <p className={styles.containerStayTuned}>Stay Tuned!</p>
            <div className={styles.line}></div>
        </div>
    )
}

export default ComingSoonEl;