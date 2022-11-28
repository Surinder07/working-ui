import styles from '../../styles/elements/Hamburger.module.css'

const ConstantHamburger = (props) => {
    return (
        <div className={styles.constantHamburger} onClick={() => props.setOpen(!props.open)}>
            <span className={`${styles.line} ${styles.line1}`}></span>
            <span className={`${styles.line} ${styles.line2}`}></span>
            <span className={`${styles.line} ${styles.line3}`}></span>
        </div>
    )
}

export default ConstantHamburger;