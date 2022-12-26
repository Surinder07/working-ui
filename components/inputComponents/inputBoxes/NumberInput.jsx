import { useEffect, useRef } from 'react';
import { joinClasses } from '../../../helpers';
import { InputBoxStyles } from '../../../styles/elements';

const NumberInput = (props) => {

    const inputRef = useRef();

    useEffect(() => {
        console.log(inputRef)
    }, [inputRef])

    return (
        <div className={joinClasses(InputBoxStyles.numberContainer, props.showError ? InputBoxStyles.inputBoxError : InputBoxStyles.inputBox2Default)}>
            <p className={InputBoxStyles.decrease} onClick={() => inputRef.current.stepDown()}>-</p>
            <input
                name={props.name}
                id={props.id}
                min={0}
                disbaled={props.disbaled}
                type='number'
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                ref={inputRef}
            />
            <p className={InputBoxStyles.increase} onClick={() => inputRef.current.stepUp()}>+</p>
        </div>
    )
}

export default NumberInput;