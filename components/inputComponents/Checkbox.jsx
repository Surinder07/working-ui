import styles from '../../styles/elements/Checkbox.module.css';

const Checkbox = (props) => {

    return (
        <div className={styles.container} onClick={() => props.setIsChecked(!props.isChecked)}>
            <div className={styles.checkbox}>
                {props.isChecked &&
                    <div className={styles.checked}>
                        <div className={styles.tick}></div>
                    </div>
                }
            </div>
            <label>{props.label}</label>
        </div>
    )

}

export default Checkbox;