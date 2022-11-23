import styles from '../../styles/elements/InputBox.module.css';

const InputWithButton = (props) => {
    return (
        <div className={styles.inputBoxWithButtonWrapper} style={props.style}>
            <div className={`${styles.inputBoxWithButton} ${props.className} ${props.showError ?
                styles.inputBoxError : styles.inputBoxDefault}`}>
                <input
                    type='text'
                    id={props.placeholder}
                    name={props.placeholder}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => {
                        props.setValue(e.target.value);
                        props.setShowError && props.setShowError(false);
                    }}
                    autoComplete='off' />
                <button className={props.error ? styles.buttonError : styles.buttonDefault}>{props.buttonText}</button>
                {
                    props.showMessage &&
                    <p className={`${styles.message} ${props.error ? styles.errorMessage : styles.successMessage}`}>
                        {props.message}
                    </p>
                }
            </div>
        </div>
    )
}

export default InputWithButton;