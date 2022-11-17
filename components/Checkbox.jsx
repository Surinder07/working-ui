import styles from '../styles/elements/Checkbox.module.css';

const Checkbox = (props) => {

    return (
        <div className={styles.container} onClick={() => props.setIsChecked(!props.isChecked)}>
            <span>
                <input type="checkbox" checked={props.isChecked} />
                <span></span>
            </span>
            <label>{props.label}</label>
        </div>
    )

}

export default Checkbox;