import { useEffect, useRef, useState } from "react";
import { DropdownStyles } from '../../../styles/elements/inputs';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Image from 'next/image';

const CountryCodeDropdown = (props) => {

    const ref = useRef();

    const [displayValue, setDisplayValue] = useState('');
    const [open, setOpen] = useState(false);
    const openedDownStyle = {
        top: props.inputType === 2 ? '32px' : '37px',
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
        const selectedOption = props.value.country && props.value.country !== '' ? props.options.find(option => {
            return option.country === props.value.country;
        }) : props.options[0];
        setDisplayValue(selectedOption.selectDisplay);
        props.setValue({
            ...props.value,
            countryCode: selectedOption.value,
            country: selectedOption.country
        });
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
        <div ref={ref} className={`${props.inputType === 2 ? DropdownStyles.mulishCountryCodeContainer : DropdownStyles.poppinsBasicContainer}`} onClick={onClick} style={props.style}>
            <div className={DropdownStyles.selected}>
                {displayValue}
                {open ? <KeyboardArrowUp className={DropdownStyles.dropDownIcon} /> :
                    <KeyboardArrowDown className={DropdownStyles.dropDownIcon} />}
            </div>
            <div className={`${DropdownStyles.options} ${!open && DropdownStyles.closedOptions}`}
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