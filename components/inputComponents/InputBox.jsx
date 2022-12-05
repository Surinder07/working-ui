import styles from '../../styles/elements/InputBox.module.css';
import { Person, Email, Key, Visibility, VisibilityOff, CorporateFare } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const InputBox = (props) => {

    const [type, setType] = useState(props.type);
    const [visibilityIcon, setVisibilityIcon] = useState(<Visibility />);

    useEffect(() => {
        if (props.type === 'user' || props.type === 'org') {
            setType('text')
        }
    })

    const getIcon = () => {
        switch (props.type.toLowerCase()) {
            case 'email':
                return <Email />
            case 'password':
                return <Key />
            case 'user':
                return <Person />
            case 'org':
                return <CorporateFare />
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
        <div className={`${props.inputType === 2 ? styles.inputBox2 : styles.inputBox} ${props.className} 
        ${props.showError ? styles.inputBoxError : props.inputType === 2 ? styles.inputBox2Default : styles.inputBoxDefault}`}
            style={props.style}>
            {props.inputType !== 2 && <div className={styles.inputIconContainer}>{getIcon()}</div>}
            <input
                type={type}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.setValue(e.target.value);
                    props.setShowError && props.setShowError(false);
                }}
                autoComplete='off' />
            {
                props.type.toLowerCase() === 'password' &&
                <div className={styles.inputIconContainer} style={{ cursor: 'pointer' }} onClick={switchPasswordVisibility}>
                    {props.type.toLowerCase() === 'password' && visibilityIcon}
                </div>
            }
            {props.showError && <p className={styles.errorMessage}>{props.errorMessage}</p>}
        </div>
    );
}

export default InputBox;