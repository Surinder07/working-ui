import { joinClasses } from '../../../helpers';
import { ButtonStyles, InputBoxStyles } from '../../../styles/elements/inputs';

const InputWithButton = (props) => {
    return (
        <div className={InputBoxStyles.inputBoxWithButtonWrapper} style={props.style}>
            <div className={joinClasses(
                InputBoxStyles.inputBoxWithButton,
                props.className,
                (props.showMessage && props.error) ? InputBoxStyles.inputBoxError : InputBoxStyles.inputBoxDefault
            )}>
                <input
                    type='text'
                    id={props.placeholder}
                    name={props.placeholder}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => {
                        props.setValue(e.target.value);
                        props.setShowMessage(false);
                        props.setDisabled(false);
                    }}
                    autoComplete='off'
                />
                <button
                    disabled={props.disabled}
                    onClick={props.onClick}
                    className={joinClasses(
                        (props.showMessage && props.error) ? InputBoxStyles.buttonError : InputBoxStyles.buttonDefault,
                        props.disabled && ButtonStyles.disabledButton
                    )}
                >
                    {props.buttonText}
                </button>
                {
                    props.showMessage &&
                    <p 
                    className={joinClasses(InputBoxStyles.message, props.error ? InputBoxStyles.errorMessage : InputBoxStyles.successMessage)}
                    style={{width: '200%'}}
                    >
                        {props.message}
                    </p>
                }
            </div>
        </div>
    )
}

export default InputWithButton;