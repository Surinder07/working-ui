import { joinClasses } from "../../../helpers";
import { RadioStyles } from "../../../styles/elements"

const RadioButtons = (props) => {
    return (
        <div className={RadioStyles.container}>
            {
                props.options.map((opt, i) => (
                    <div className={RadioStyles.inline} key={`radio_${i}`} onClick={() => props.setValue(opt)}>
                        <div className={RadioStyles.radioContainer}>
                            {props.value === opt && <div className={RadioStyles.radioChecked}></div>}
                        </div>
                        <p className={joinClasses(props.value === opt && RadioStyles.selected)}>{opt}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default RadioButtons;