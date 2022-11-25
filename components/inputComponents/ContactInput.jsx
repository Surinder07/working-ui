import styles from '../../styles/elements/InputBox.module.css';
import { Phone } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import CountryCodeDropdown from './CountryCodeDropdown';
import { CountryCodes } from '../../constants';

const ContactInput = (props) => {

    const ref = useRef();
    const [openDown, setOpenDown] = useState(true);
    const [inputHeight, setInputHeight] = useState(0);

    useEffect(() => {
        setInputHeight(ref.current.clientHeight);
    }, [ref]);

    const onClick = () => {
        if ((ref.current.offsetTop + (CountryCodes.length * 50) + ref.current.clientHeight) > window.innerHeight)
            setOpenDown(false);
        if ((ref.current.offsetTop - window.scrollY < CountryCodes.length * 50))
            setOpenDown(true);
    }

    return (
        <div ref={ref} className={`${styles.inputBoxWithDropdown} ${props.className} ${props.showError ?
            styles.inputBoxError : styles.inputBoxDefault}`} style={props.style}>
            <div className={styles.inputIconContainer}><Phone /></div>
            <CountryCodeDropdown
                onClick={onClick}
                setValue={props.setCountryCode}
                openDown={openDown}
                options={CountryCodes}
                inputHeight={inputHeight}
                style={{
                    borderRight: props.showError ? '1px solid var(--error-message-color)' : '1px solid #2996C3',
                }} />
            <input
                type='tel'
                id='mobile'
                name='mobile'
                maxLength='10'
                placeholder='Enter Mobile No.'
                value={props.mobile}
                onChange={(e) => {
                    props.setMobile(e.target.value);
                    props.setShowError(false);
                }}
                style={{ paddingLeft: '15px' }}
                autoComplete='off' />
            {props.showError && <p className={styles.errorMessage}>{props.errorMessage}</p>}
        </div>
    )
}

export default ContactInput;