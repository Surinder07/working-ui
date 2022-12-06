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
        <div ref={ref} className={`${props.inputType === 2 ? styles.inputBoxWithDropdown2 : styles.inputBoxWithDropdown} ${props.className} ${props.showError ?
            styles.inputBoxError : styles.inputBoxDefault}`} style={props.style}>
            {props.inputType !== 2 && <div className={styles.inputIconContainer}><Phone /></div>}
            <CountryCodeDropdown
                onClick={onClick}
                value={props.value}
                setValue={props.setValue}
                openDown={openDown}
                options={CountryCodes}
                inputHeight={inputHeight}
                style={{
                    borderRight: props.showError ? '1px solid var(--error-message-color)' : props.inputType === 2 ? '1px solid #BFBFBF' : '1px solid #2996C3',
                }} />
            <input
                type='tel'
                id='mobile'
                name='mobile'
                maxLength='10'
                placeholder='Enter Mobile No.'
                value={props.value.mobile}
                onChange={(e) => {
                    props.setValue({
                        ...props.value,
                        mobile: e.target.value
                    });
                    props.setShowError(false);
                }}
                style={{ paddingLeft: '15px' }}
                autoComplete='off' />
            {props.showError && <p className={styles.errorMessage}>{props.errorMessage}</p>}
        </div>
    )
}

export default ContactInput;