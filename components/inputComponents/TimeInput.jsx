import { DropdownStyles } from '../../styles/elements';
import { hours, minutes } from '../../constants';
import DropDown from './DropDown';

const TimeInput = (props) => {
    return (
        <div className={DropdownStyles.timeContainer}>
            <DropDown inputType={2} options={hours} defaultDisplay='HH' />
            <DropDown inputType={2} options={minutes} defaultDisplay='MM' />
        </div>
    )
}

export default TimeInput;