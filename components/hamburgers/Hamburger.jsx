import styles from '../../styles/elements/Hamburger.module.css';

const Hamburger = (props) => {
    return (
        <div className={styles.hamburgerContainer}>
            <input type="checkbox" name="hamburger" id="hamburger" checked={props.openMenu}
                onChange={(e) => props.setOpenMenu(e.target.checked)} />
            <div className={styles.hamburgerLines}>
                <span className={`${styles.line} ${styles.line1}`}></span>
                <span className={`${styles.line} ${styles.line2}`}></span>
                <span className={`${styles.line} ${styles.line3}`}></span>
            </div>
        </div>
    )
}

export default Hamburger;