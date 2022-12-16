import { EditableInputStyles } from '../../styles/elements';
import { CheckCircle, Cancel } from '@mui/icons-material';
import InputBox from './InputBox';
import ContactInput from './ContactInput';
import TimeInput from './TimeInput';
import DropDown from './DropDown';
import Toggle from './Toggle';
import DatePicker from './DatePicker';
import ToggleWithValue from './ToggleWithValue';

const EditableInput = (props) => {
    return (
        <div className={`${EditableInputStyles.container} ${props.className}`}>
            {props.label && <label htmlFor={props.label}>
                {props.label}
                {props.required && <span style={{color: '#CC5252'}}> *</span>}
                </label>}
            {
                (props.type === 'text' || props.type === 'password') &&
                (
                    props.editOn ?
                        <InputBox name={props.label} inputType={2} type={props.type} value={props.value} setValue={props.setValue} disabled={props.disabled} /> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.type === 'mobile' &&
                (
                    props.editOn ?
                        <ContactInput name={props.label} inputType={2} value={props.value} setValue={props.setValue} disabled={props.disabled} /> :
                        <p>{props.initialValue.countryCode} - {props.value.mobile}</p>
                )
            }
            {
                props.type === 'time' &&
                (
                    props.editOn ?
                        <TimeInput value={props.value} setValue={props.setValue} disabled={props.disabled} openUp={props.openUp}/> :
                        <p>{props.initialValue.hours}:{props.initialValue.minutes}</p>
                )
            }
            {
                props.type === 'dropdown' &&
                (
                    props.editOn ?
                        <DropDown options={props.options} defaultDisplay={props.value ? props.value : `${props.placeholder}`} setValue={props.setValue} disabled={props.disabled} inputType={2}/> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.type === 'toggle' &&
                (
                    props.editOn ?
                        <Toggle value={props.value} setValue={props.setValue} disabled={props.disabled} /> :
                        <p>{props.initialValue ? <CheckCircle style={{color: '#2996C3'}} /> : <Cancel style={{color: '#999'}}/>}</p>
                )
            }
            {
                props.type === 'toggle2' &&
                (
                    props.editOn ?
                        <ToggleWithValue options={props.options} selected={props.value} setSelected={props.setValue} /> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.type === 'date' &&
                (
                    props.editOn ?
                        <DatePicker value={props.value} setValue={props.setValue} disabled={props.disabled} /> :
                        <p>{props.initialValue}</p>
                )
            }
        </div>
    )
}

export default EditableInput;