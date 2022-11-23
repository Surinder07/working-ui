import { useEffect, useRef, useState } from "react";
import styles from '../../styles/elements/InputBox.module.css';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Image from 'next/image';

const CountryCodeDropdown = (props) => {

    const ref = useRef();

    const [displayValue, setDisplayValue] = useState(props.options[0].selectDisplay);
    const [open, setOpen] = useState(false);
    const openedDownStyle = {
        top: '37px',
        left: 0
    }
    const openedUpStyle = {
        bottom: 0,
        left: 0,
        transform: `translateY(-${props.inputHeight}px)`
    }

    const handleClickOutside = () => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        props.setValue(props.options[0].value);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const onClick = () => {
        props.onClick();
        setOpen(!open)
    }

    return (
        <div ref={ref} className={styles.dropdownContainer} onClick={onClick} style={props.style}>
            <div className={styles.selected}>
                {displayValue}{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </div>
            <div className={`${styles.options} ${!open && styles.closedOptions}`}
                style={props.openDown ? openedDownStyle : openedUpStyle}>
                {
                    props.options.map((option, i) => (
                        <p key={i} onClick={() => {
                            props.setValue(option.value);
                            setDisplayValue(option.selectDisplay);
                        }}
                        ><Image src={option.icon} height={20} width={20} alt={option.display} style={{ marginRight: '15px' }} />
                            {option.display}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default CountryCodeDropdown;