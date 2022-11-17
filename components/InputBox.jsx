import styles from '../styles/elements/InputBox.module.css';
import { Person, Email, Key, Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const InputBox = (props) => {

    const [type, setType] = useState(props.type);
    const [visibilityIcon, setVisibilityIcon] = useState(<Visibility />);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if(props.type === 'user') {
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

    const style={
        borderBottom: 'solid #555 2px',
        backgroundColor:' #eee'
    }

    const activeStyle={
        borderBottom: 'solid var(--button-blue-color) 2px',
        backgroundColor:'#FFF'
    }

    return (
        <div className={`${styles.inputBox} ${props.className}`} style={active ? activeStyle : style}>
            <div className={styles.inputIconContainer}>{getIcon()}</div>
            <input
                type={type}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                autoComplete='off' />
            {
                props.type.toLowerCase() === 'password' &&
                <div className={styles.inputIconContainer} style={{ cursor: 'pointer' }} onClick={switchPasswordVisibility}>
                    {props.type.toLowerCase() === 'password' && visibilityIcon}
                </div>
            }
        </div>
    );
}

export default InputBox;