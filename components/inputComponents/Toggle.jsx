import { ToggleStyles } from "../../styles/elements";

const Toggle = (props) => {

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

export default Toggle;