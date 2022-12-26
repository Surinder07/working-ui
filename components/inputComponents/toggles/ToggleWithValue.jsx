import { ToggleStyles } from "../../../styles/elements";

/**
 * 
 * @param {*} options array with two options to be shown on either side of toggle
 * @param {*} selected selected option by default
 * @param {*} setSelected methos to change the selected value in state
 * @returns A tooggle component to choose between two values
 */
const ToggleWithValue = (props) => {

    const handleToggle = () => {
        if (props.selected === props.options[0]) props.setSelected(props.options[1]);
        else props.setSelected(props.options[0])
    }

    return (
        <div className={`${ToggleStyles.container} ${props.className}`}>
            <p className={`${ToggleStyles.text} ${props.selected === props.options[0] && ToggleStyles.selected}`}>
                {props.options[0]}
            </p>
            <div className={ToggleStyles.toggleBox} onClick={handleToggle}>
                <div className={`${ToggleStyles.toggleGear} ${props.selected === props.options[0] ?
                    ToggleStyles.selectFirst : ToggleStyles.selectSecond}`}></div>
            </div>
            <p className={`${ToggleStyles.text} ${props.selected === props.options[1] && ToggleStyles.selected}`}>
                {props.options[1]}
            </p>
        </div>
    )
}

export default ToggleWithValue;