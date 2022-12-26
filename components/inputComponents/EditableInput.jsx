import { EditableInputStyles } from '../../styles/elements';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { InputBox, ContactInput, TextArea, NumberInput } from './inputBoxes';
import { TimeInput, DropDown, MultiSelectDropdown } from './dropdowns';
import DatePicker from './DatePicker';
import { Toggle, ToggleWithValue } from './toggles';

const EditableInput = (props) => {
    const setValue = (value) => {
        props.setError &&
            props.setError({
                message: "",
                show: "false",
            });
        props.setValue(value);
    };

    return (
        <div className={`${EditableInputStyles.container} ${props.className}`} style={props.style}>
            {props.label && <label htmlFor={props.label}>
                {props.label}
                {props.editOn && props.required && <span style={{ color: '#CC5252' }}> *</span>}
            </label>
            }
            {
                (props.type === 'text' || props.type === 'password') &&
                (
                    props.editOn ?
                        <InputBox name={props.label} inputType={2} type={props.type} value={props.value} setValue={setValue} disabled={props.nonEditable} /> :
                        <p>{props.initialValue ? props.initialValue : '-'}</p>
                )
            }
            {
                props.type === 'mobile' &&
                (
                    props.editOn ?
                        <ContactInput name={props.label} inputType={2} value={props.value} setValue={setValue} disabled={props.nonEditable} /> :
                        <p>{props.initialValue.countryCode} - {props.value.mobile}</p>
                )
            }
            {
                props.type === 'time' &&
                (
                    props.editOn ?
                        <TimeInput value={props.value} setValue={setValue} disabled={props.nonEditable} openUp={props.openUp} /> :
                        <p>{props.initialValue.hours}:{props.initialValue.minutes}</p>
                )
            }
            {
                props.type === 'dropdown' || props.type === 'typeAhead' &&
                (
                    props.editOn ?
                        <DropDown type={props.type} options={props.options} value={props.value} setValue={setValue} placeholder={props.placeholder} disabled={props.nonEditable} inputType={2} openUp={props.openUp} /> :
                        <p>{!props.initialValue || props.initialValue === '' ? '-' : props.initialValue}</p>
                )
            }
            {
                props.type === 'toggle' &&
                (
                    props.editOn ?
                        <Toggle value={props.value} setValue={setValue} disabled={props.nonEditable} /> :
                        <p>{props.initialValue ? <CheckCircle style={{ color: '#2996C3' }} /> : <Cancel style={{ color: '#999' }} />}</p>
                )
            }
            {
                props.type === 'toggle2' &&
                (
                    props.editOn ?
                        <ToggleWithValue options={props.options} selected={props.value} setSelected={setValue} /> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.type === 'date' &&
                (
                    props.editOn ?
                        <DatePicker value={props.value} setValue={setValue} disabled={props.nonEditable} /> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.type === 'multiselect' &&
                <MultiSelectDropdown values={props.values} setValues={props.setValues} options={props.options} setShowError={props.setShowError} showError={props.showError}/>
            }
            {
                props.type === 'textarea' && (
                    props.editOn ?
                        <TextArea value={props.value} setValue={setValue} disabled={props.nonEditable} /> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.type === 'number' && (
                    props.editOn ?
                        <NumberInput value={props.value} setValue={setValue} disabled={props.nonEditable} /> :
                        <p>{props.initialValue}</p>
                )
            }
            {
                props.error && props.error.show &&
                <p className={EditableInputStyles.errorMessage}>{props.error.message}</p>
            }
        </div>
    );
};

export default EditableInput;
