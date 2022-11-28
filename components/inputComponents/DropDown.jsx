import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import styles from '../../styles/elements/InputBox.module.css';

const DropDown = (props) => {

    const ref = useRef();

    const [displayValue, setDisplayValue] = useState(props.defaultDisplay);
    const [open, setOpen] = useState(false);
    const [openDown, setOpenDown] = useState(true);
    const [inputHeight, setInputHeight] = useState(0);

    useEffect(() => {
        setInputHeight(ref.current.clientHeight);
    }, [ref]);

    const openedDownStyle = {
        top: '37px',
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
        if ((ref.current.offsetTop + (props.options.length * 50) + ref.current.clientHeight) > window.innerHeight)
            setOpenDown(false);
        if ((ref.current.offsetTop - window.scrollY < props.options.length * 50))
            setOpenDown(true);
        setOpen(!open);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div ref={ref} className={`${styles.dropdownContainer} ${styles.dropdownRelative} ${props.showError ? styles.inputBoxError : styles.inputBoxDefault}`}
            style={props.style}>
            <div className={styles.selected2} onClick={onClick}>
                {displayValue}{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </div>
            <div className={`${styles.options} ${!open && styles.closedOptions}`}
                style={openDown ? openedDownStyle : openedUpStyle}>
                {
                    props.options.map((option, i) => (
                        <p key={i} onClick={() => {
                            props.setValue(option);
                            setDisplayValue(option);
                            props.setShowError && props.setShowError(false);
                            setOpen(!open)
                        }}
                        >{option}</p>
                    ))
                }
            </div>
            {props.showError && <p className={styles.errorMessage}>{props.errorMessage}</p>}
        </div>
    )

}

export default DropDown;