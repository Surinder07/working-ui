import { EditableInputStyles } from '../../styles/elements';
import InputBox from './InputBox';
import ContactInput from './ContactInput';

const EditableInput = (props) => {

    return (
        <div className={EditableInputStyles.container}>
            <label htmlFor={props.label}>{props.label}</label>
            {
                props.type === 'text' &&
                (
                    props.editOn ?
                        <InputBox inputType={2} type='text' value={props.value} /> :
                        <p>{props.value}</p>
                )
            }
            {
                props.type === 'mobile' &&
                (
                    props.editOn ?
                        <ContactInput inputType={2} value={props.value} setValue={props.setValue} /> :
                        <p>{props.value.countryCode} - {props.value.mobile}</p>
                )
            }
        </div>
    )
}

export default EditableInput;