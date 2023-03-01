import { useEffect } from 'react';
import { joinClasses } from '../../../helpers';
import { InputBoxStyles } from '../../../styles/elements';

const NumberInput = (props) => {

    useEffect(() => {
        props.setValue(0);
    }, [])

    return (
        <div className={joinClasses(InputBoxStyles.numberContainer, props.showError ? InputBoxStyles.inputBoxError : InputBoxStyles.inputBox2Default)}>
            <p className={InputBoxStyles.decrease} onClick={() => {
                if (props.value > 0)props.setValue(parseInt(props.value) - 1)}}>-</p>
            <input
                name={props.name}
                id={props.id}
                min={0}
                placeholder={props.placeholder}
                disbaled={props.disbaled}
                type='number'
                value={props.value}
                onChange={(e) => {
                    if (e.target.value <= props.max && props.value >= 0) props.setValue(e.target.value)
                }}
            />
            <p className={InputBoxStyles.increase} onClick={() => {
                if (!props.max || props.value < props.max) props.setValue(parseInt(props.value) + 1)
            }}>+</p>
        </div>
    )
}

export default NumberInput;