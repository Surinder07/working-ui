import { EditableInputStyles } from '../../styles/elements';
import { CheckCircle, Cancel } from '@mui/icons-material';
import InputBox from './InputBox';
import ContactInput from './ContactInput';
import TimeInput from './TimeInput';
import DropDown from './DropDown';
import DatePicker from './DatePicker';
import Toggle from './Toggle';
import ToggleWithValue from './ToggleWithValue';

const EditableInput = (props) => {

    return (
        <div className={`${EditableInputStyles.container} ${props.className}`}>
            {props.label && <label htmlFor={props.label}>{props.label}</label>}
            {
                props.type === 'text' &&
                (
                    props.editOn ?
                        <InputBox name={props.label} inputType={2} type='text' value={props.value} /> :
                        <p>{props.value}</p>
                )
            }
            {
                props.type === 'mobile' &&
                (
                    props.editOn ?
                        <ContactInput name={props.label} inputType={2} value={props.value} setValue={props.setValue} /> :
                        <p>{props.value.countryCode} - {props.value.mobile}</p>
                )
            }
            {
                props.type === 'time' &&
                (
                    props.editOn ?
                        <TimeInput value={props.value} setValue={props.setValue} /> :
                        <p>{props.value.hours}:{props.value.minutes}</p>
                )
            }
            {
                props.type === 'dropdown' &&
                (
                    props.editOn ?
                        <DropDown options={props.options} defaultDisplay={value ? value : `${props.placeholder}`} setValue={props.setvalue} inputType={2} /> :
                        <p>{props.value}</p>
                )
            }
            {
                props.type === 'toggle' &&
                (
                    props.editOn ?
                        <ToggleWithValue value={props.value} setValue={props.setValue} /> :
                        <p>{props.value ? <CheckCircle style={{color: '#2996C3'}} /> : <Cancel style={{color: '#999'}}/>}</p>
                )
            }
            {
                props.type === 'toggle2' &&
                (
                    props.editOn ?
                        <ToggleWithValue options={props.options} selected={props.value} setSelected={props.setValue} /> :
                        <p>{props.value}</p>
                )
            }
            {
                props.type === 'date' &&
                (
                    props.editOn ?
                        <DatePicker value={props.value} setValue={props.setValue} /> :
                        <p>{props.value}</p>
                )
            }
        </div>
    )
}

export default EditableInput;