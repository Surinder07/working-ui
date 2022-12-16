import { DropdownStyles } from '../../styles/elements';
import { hours, minutes } from '../../constants';
import DropDown from './DropDown';

const TimeInput = (props) => {
    return (
        <div className={DropdownStyles.timeContainer}>
            <DropDown
                inputType={2}
                options={hours}
                defaultDisplay={props.value.hours ? props.value.hours : 'HH'}
                value={props.value.hours}
                setValue={(h) => props.setValue({ ...props.value, hours: h })}
                openUp={props.openUp}
            />
            <DropDown
                inputType={2}
                options={minutes}
                defaultDisplay={props.value.minutes ? props.value.minutes : 'MM'}
                value={props.value.minutes}
                setValue={(m) => props.setValue({ ...props.value, minutes: m })}
                openUp={props.openUp}
            />
        </div>
    )
}

export default TimeInput;