import { InputBoxStyles } from '../../../styles/elements';
import { HourglassBottom, Pin, CreditCard, ReorderRounded } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { checkCardType, joinClasses } from '../../../helpers';

const InputBoxCard = (props) => {

    const inputRef = useRef();

    const [type, setType] = useState(props.type);
    const [cardType, setCardType] = useState(<></>);

    useEffect(() => {
        if (props.type === 'card' || props.type === 'code') {
            setType('number')
        } else setType('text');
    });


    const getIcon = () => {
        switch (props.type.toLowerCase()) {
            case 'card':
                return <CreditCard style={{ fontSize: '18px' }} />
            case 'code':
                return <Pin style={{ fontSize: '18px' }} />
            case 'expiry':
                return <HourglassBottom style={{ fontSize: '18px' }} />
            default:
                return <></>
        }
    }

    const isNumeric = (str) => {
        if (typeof str != "string") return false;
        return !isNaN(parseInt(str))
    }

    const checkAndSetExpiry = (value) => {
        if (value.length > props.value.length) {
            if (value.length !== 2 && !isNumeric(value.substring(value.length - 1))) return;
            if (value.length === 2 && !(isNumeric(value.charAt(1)) ||
                (parseInt(value.charAt(0)) === 1 && value.substring(value.length - 1) === '/'))) return;
            if (value.length === 2 && isNumeric(value) && parseInt(value) > 12) return;
            let zerothValue = parseInt(value.charAt(0));
            if (zerothValue !== 0 && zerothValue !== 1 && value.length === 1) {
                props.setValue('0' + value.toString() + '/');
                return;
            }
            if (zerothValue === 1 && value.charAt(1) === '/' && value.length === 2) {
                props.setValue('0' + value);
                return;
            }
            if (props.value.length === 1 && value.length === 2) {
                props.setValue(value + '/');
                return;
            }
            if (value.length > 7) return;
            if (parseInt(value) === NaN || parseInt(value) === undefined) return;
        }
        props.setValue(value);
    }

    return (
        <div className={joinClasses(
            props.inputType === 2 ? InputBoxStyles.inputBox2 : InputBoxStyles.inputBox, props.className,
            props.showError ? InputBoxStyles.inputBoxError : props.inputType === 2 ?
                InputBoxStyles.inputBox2Default : InputBoxStyles.inputBoxDefault,
            props.disabled && InputBoxStyles.inputBoxDisabled
        )}
            style={props.style}>
            {props.inputType !== 2 && <div className={InputBoxStyles.inputIconContainer}>{getIcon()}</div>}
            <input
                ref={inputRef}
                type={type}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                disabled={props.disabled}
                onChange={(e) => {
                    props.setShowError && props.setShowError(false);
                    if (props.type === 'code' && e.target.value.length > 3) return;
                    else if (props.type === 'expiry') {
                        checkAndSetExpiry(e.target.value);
                    } else if (props.type === 'card') {
                        setCardType(checkCardType(e.target.value));
                        props.setValue(e.target.value);
                    } else {
                        props.setValue(e.target.value);
                    }

                }}
                onKeyDown={(e) => { return e }}
                autoComplete={props.allowAutoFill ? "off" : "one-time-code"} />
            {
                props.type.toLowerCase() === 'card' &&
                <div className={InputBoxStyles.cardTypeIcon}>
                    {cardType}
                </div>
            }
            {props.showError && <p className={InputBoxStyles.errorMessage}>{props.errorMessage}</p>}
        </div>
    );
}

export default InputBoxCard;