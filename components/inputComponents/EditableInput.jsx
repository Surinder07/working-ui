import { EditableInputStyles } from '../../styles/elements';
import InputBox from './InputBox';
import ContactInput from './ContactInput';
import TimeInput from './TimeInput';
import DropDown from './DropDown';
import DatePicker from './DatePicker';

const EditableInput = (props) => {

    return (
        <div className={`${EditableInputStyles.container} ${props.className}`}>
            <label htmlFor={props.label}>{props.label}</label>
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
                props.tyle === 'toggle' &&
                (
                    props.editOn ?
                        <Toggle options={props.options} selected={props.value} setSelected={props.setValue} /> :
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