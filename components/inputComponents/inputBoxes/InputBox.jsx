import { InputBoxStyles } from '../../../styles/elements';
import { Person, Email, Key, Visibility, VisibilityOff, CorporateFare } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { joinClasses } from '../../../helpers';

const InputBox = (props) => {

    const [type, setType] = useState(props.type);
    const [visibilityIcon, setVisibilityIcon] = useState(<Visibility style={{ fontSize: '14px' }} />);

    useEffect(() => {
        if (props.type === 'user' || props.type === 'org' || props.type === 'email') {
            setType('text')
        }
    })

    const getIcon = () => {
        switch (props.type.toLowerCase()) {
            case 'email':
                return <Email style={{ fontSize: '14px' }} />
            case 'password':
                return <Key style={{ fontSize: '14px' }} />
            case 'user':
                return <Person style={{ fontSize: '14px' }} />
            case 'org':
                return <CorporateFare style={{ fontSize: '14px' }} />
            default:
                return <></>
        }
    }

    const switchPasswordVisibility = () => {
        if (type === 'password') {
            setType('text');
            setVisibilityIcon(<VisibilityOff />);
        } else {
            setType('password');
            setVisibilityIcon(<Visibility />);
        }
    }

    return (
        <div className={joinClasses(props.inputType === 2 ? InputBoxStyles.inputBox2 : InputBoxStyles.inputBox ,props.className,
        props.showError ? InputBoxStyles.inputBoxError : props.inputType === 2 ? InputBoxStyles.inputBox2Default : InputBoxStyles.inputBoxDefault)}
            style={props.style}>
            {props.inputType !== 2 && <div className={InputBoxStyles.inputIconContainer}>{getIcon()}</div>}
            <input
                type={type}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                disabled={props.disabled}
                onChange={(e) => {
                    props.setValue(e.target.value);
                    props.setShowError && props.setShowError(false);
                }}
                autoComplete="one-time-code" />
            {
                props.type.toLowerCase() === 'password' &&
                <div className={InputBoxStyles.inputIconContainer} style={{ cursor: 'pointer' }} onClick={switchPasswordVisibility}>
                    {props.type.toLowerCase() === 'password' && visibilityIcon}
                </div>
            }
            {props.showError && <p className={InputBoxStyles.errorMessage}>{props.errorMessage}</p>}
        </div>
    );
}

export default InputBox;