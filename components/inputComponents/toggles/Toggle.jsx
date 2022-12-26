import { ToggleStyles } from "../../../styles/elements";

/**
 * 
 * @param {*} value true or false value 
 * @param {*} seValue method to update the value
 * @returns A Toggle component
 */
const Toggle = (props) => {
    return (
        <div className={`${ToggleStyles.toggleBox} ${!props.value && ToggleStyles.toggleFalse}`}
            onClick={() => {props.setValue(!props.value)}}>
            <div className={`${ToggleStyles.toggleGear} ${props.value ?
                ToggleStyles.selectSecond : ToggleStyles.selectFirst}`}></div>
        </div>
    );
}

export default Toggle;