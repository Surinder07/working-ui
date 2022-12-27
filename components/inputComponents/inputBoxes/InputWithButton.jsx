import { InputBoxStyles } from '../../../styles/elements/inputs';

const InputWithButton = (props) => {
    return (
        <div className={InputBoxStyles.inputBoxWithButtonWrapper} style={props.style}>
            <div className={`${InputBoxStyles.inputBoxWithButton} ${props.className} ${props.showError ?
                InputBoxStyles.inputBoxError : InputBoxStyles.inputBoxDefault}`}>
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
                <button className={props.error ? InputBoxStyles.buttonError : InputBoxStyles.buttonDefault}>{props.buttonText}</button>
                {
                    props.showMessage &&
                    <p className={`${InputBoxStyles.message} ${props.error ? InputBoxStyles.errorMessage : InputBoxStyles.successMessage}`}>
                        {props.message}
                    </p>
                }
            </div>
        </div>
    )
}

export default InputWithButton;