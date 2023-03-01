import { DropdownStyles } from '../../../styles/elements';
import { hours, minutes } from '../../../constants';
import DropDown from './DropDown';

const TimeInput = (props) => {
    return (
        <div className={DropdownStyles.timeContainer}>
            <DropDown
                type='typeAhead'
                inputType={2}
                options={hours}
                placeholder='HH'
                value={props.value.hours}
                setValue={(h) => props.setValue({ ...props.value, hours: h })}
                openUp={props.openUp}
            />
            <DropDown
                type='typeAhead'
                inputType={2}
                options={minutes}
                placeholder='MM'
                value={props.value.minutes}
                setValue={(m) => props.setValue({ ...props.value, minutes: m })}
                openUp={props.openUp}
            />
        </div>
    )
}

export default TimeInput;