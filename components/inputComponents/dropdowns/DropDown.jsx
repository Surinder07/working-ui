import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import { DropdownStyles } from '../../../styles/elements/inputs';
import { joinClasses } from "../../../helpers";

const DropDown = (props) => {

    const ref = useRef();

    const [displayValue, setDisplayValue] = useState(props.placeholder);
    const [open, setOpen] = useState(false);
    const [openDown, setOpenDown] = useState(props.openUp ? false : true);
    const [inputHeight, setInputHeight] = useState(0);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (props.options) {
            setOptions(props.options);
        }
    }, [props.options])

    useEffect(() => {
        setInputHeight(ref.current.clientHeight);
    }, [ref.current]);

    useEffect(() => {
        if (props.value === '') {
            setDisplayValue(props.placeholder)
        } else {
            try {
                setDisplayValue(props.options.find(opt => opt.value === props.value).display)
            } catch (er) {
                setDisplayValue(props.placeholder)
            }
        }
    }, [props.value, props.options])

    const openedDownStyle = {
        top: props.inputType === 2 ? '32px' : '37px',
        left: 0
    }

    const openedUpStyle = {
        bottom: 0,
        left: 0,
        transform: `translateY(-${inputHeight}px)`
    }

    const updateOptions = (e) => {
        setOpen(true)
        setInputValue(e.target.value);
        if (e.target.value === '') setOptions(props.options);
        else setOptions(props.options.filter(opt => opt.display.toLowerCase().includes(e.target.value)))
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    const onClick = () => {
        if (!props.disabled) {
            if (!props.openUp) {
                if ((ref.current.offsetTop + (props.options.length * 50) + ref.current.clientHeight) > window.innerHeight)
                    setOpenDown(false);
                if ((ref.current.offsetTop - window.scrollY < props.options.length * 50))
                    setOpenDown(true);
            }
            setOpen(!open);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div ref={ref} className={joinClasses(props.inputType === 2 ? DropdownStyles.mulishBasicCountainer : DropdownStyles.poppinsBasicContainer, 
            DropdownStyles.dropdownRelative, props.showError ? DropdownStyles.inputBoxError : DropdownStyles.inputBoxDefault,
            props.disabled && DropdownStyles.inputBoxDisabled)}
            style={props.style}>
            <div className={DropdownStyles.selected2} onClick={onClick}>
                {props.type === 'typeAhead' ? <input value={inputValue} placeholder={displayValue} onChange={updateOptions} disabled={props.disabled} /> : displayValue}
                {open ? <KeyboardArrowUp className={DropdownStyles.dropDownIcon} /> :
                    <KeyboardArrowDown className={DropdownStyles.dropDownIcon} />}
            </div>
            <div className={joinClasses(DropdownStyles.options, !open && DropdownStyles.closedOptions)}
                style={openDown ? openedDownStyle : openedUpStyle}>
                {
                    options.length > 0 ?
                        options.map((option, i) => (
                            <p
                                key={i}
                                className={joinClasses(option.value === props.value) && DropdownStyles.optionSelected}
                                onClick={() => {
                                    props.setValue(option.value);
                                    setInputValue(option.display)
                                    setDisplayValue(option.display);
                                    props.setShowError && props.setShowError(false);
                                    setOpen(!open)
                                }}
                            >{option.display}</p>
                        )) :
                        <p>No data to show</p>
                }
            </div>
            {props.showError && <p className={DropdownStyles.errorMessage}>{props.errorMessage}</p>}
        </div>
    )

}

export default DropDown;