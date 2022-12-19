import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import { DropdownStyles } from '../../styles/elements/inputs';

const DropDown = (props) => {

    const ref = useRef();

    const [displayValue, setDisplayValue] = useState(props.placeholder);
    const [open, setOpen] = useState(false);
    const [openDown, setOpenDown] = useState(props.openUp ? false : true);
    const [inputHeight, setInputHeight] = useState(0);

    useEffect(() => {
        setInputHeight(ref.current.clientHeight);
    }, [ref.current]);

    useEffect(() => {
        if (props.initialValue === '') {
            console.log('entered empty')
            setDisplayValue(props.placeholder)
        } else {
            console.log('entered loop')
            props.options.filter(opt => opt.value === props.initialValue)
                .map(opt => setDisplayValue(opt.display))
        }
    }, [props.options])

    const openedDownStyle = {
        top: props.inputType === 2 ? '32px' : '37px',
        left: 0
    }

    const openedUpStyle = {
        bottom: 0,
        left: 0,
        transform: `translateY(-${inputHeight}px)`
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    const onClick = () => {
        if (!props.openUp) {
            if ((ref.current.offsetTop + (props.options.length * 50) + ref.current.clientHeight) > window.innerHeight)
                setOpenDown(false);
            if ((ref.current.offsetTop - window.scrollY < props.options.length * 50))
                setOpenDown(true);
        }
        setOpen(!open);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div ref={ref} className={`${props.inputType === 2 ? DropdownStyles.mulishBasicCountainer : DropdownStyles.poppinsBasicContainer} ${DropdownStyles.dropdownRelative} ${props.showError ? DropdownStyles.inputBoxError : DropdownStyles.inputBoxDefault}`}
            style={props.style}>
            <div className={DropdownStyles.selected2} onClick={onClick}>
                {displayValue}{open ? <KeyboardArrowUp className={DropdownStyles.dropDownIcon} /> :
                    <KeyboardArrowDown className={DropdownStyles.dropDownIcon} />}
            </div>
            <div className={`${DropdownStyles.options} ${!open && DropdownStyles.closedOptions}`}
                style={openDown ? openedDownStyle : openedUpStyle}>
                {
                    props.options.length > 0 ?
                        props.options.map((option, i) => (
                            <p key={i} onClick={() => {
                                props.setValue(option.value);
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