import { InputBoxStyles } from '../../../styles/elements';
import { joinClasses } from '../../../helpers';

const TextArea = (props) => {
    return (
        <div className={joinClasses(InputBoxStyles.textAreaContainer, props.showError ? InputBoxStyles.textAreaError : InputBoxStyles.textAreaDefault)}>
            <textarea
                disabled={props.disabled}
                className={InputBoxStyles.textArea}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                rows={3}
            />
        </div>
    )
}

export default TextArea;