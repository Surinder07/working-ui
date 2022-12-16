import { CheckBoxStyles } from '../../styles/elements/inputs';

const Checkbox = (props) => {

    return (
        <div className={`${CheckBoxStyles.container} ${props.className}`} onClick={() => props.setIsChecked(!props.isChecked)}>
            <div className={CheckBoxStyles.checkbox}>
                {props.isChecked &&
                    <div className={CheckBoxStyles.checked}>
                        <div className={CheckBoxStyles.tick}></div>
                    </div>
                }
            </div>
            <label>{props.label}</label>
        </div>
    )

}

export default Checkbox;