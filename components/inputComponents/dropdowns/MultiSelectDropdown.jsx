import { KeyboardArrowDown, KeyboardArrowUp, List } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import { MultiSelectDropDownStyles } from '../../../styles/elements/inputs';
import { joinClasses } from "../../../helpers";

const MultiSelectDropDown = (props) => {

    const ref = useRef();
    const listRef = useRef();
    const inputRef = useRef();

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

    const openedDownStyle = {
        top: '32px',
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

    const checkDirection = () => {
        if (!props.openUp) {
            if ((ref.current.offsetTop + (props.options.length * 50) + ref.current.clientHeight) > window.innerHeight)
                setOpenDown(false);
            if ((ref.current.offsetTop - window.scrollY < props.options.length * 50))
                setOpenDown(true);
        }
    }

    const updateOptions = (e) => {
        checkDirection();
        setOpen(true);
        setInputValue(e.target.value);
        props.setShowError && props.setShowError(false);
        if (e.target.value === '') setOptions(props.options);
        else setOptions(props.options.filter(opt => opt.display.toLowerCase().includes(e.target.value)))
    }

    const toggleChoice = (value) => {
        let choices = [...props.values];
        if (!choices.includes(value)) {
            choices.push(value);
            props.setValues(choices);
        } else {
            choices = choices.filter(choice => choice != value);
            props.setValues(choices);
        }
    }

    const onClick = (e) => {
        if (listRef.current && !listRef.current.contains(e.target)) {
            checkDirection();
            if (!open) {
                inputRef.current.focus();
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
        <div ref={ref} className={joinClasses(MultiSelectDropDownStyles.mulishBasicCountainer, MultiSelectDropDownStyles.dropdownRelative, props.showError ? MultiSelectDropDownStyles.inputBoxError : MultiSelectDropDownStyles.inputBoxDefault)}
            style={props.style}>
            <div className={MultiSelectDropDownStyles.multiSelectDisplay} onClick={onClick}>
                <div className={MultiSelectDropDownStyles.listContainer} ref={listRef}>
                    {
                        props.values.length > 0 &&
                        <span className={MultiSelectDropDownStyles.listMarker}>{props.values.length}</span>
                    }
                    <List className={MultiSelectDropDownStyles.listIcon} />
                </div>
                <>
                    <input value={inputValue} placeholder={props.placeholder} onChange={updateOptions} ref={inputRef}/>
                    {
                        open ?
                            <KeyboardArrowUp className={MultiSelectDropDownStyles.dropDownIcon} /> :
                            <KeyboardArrowDown className={MultiSelectDropDownStyles.dropDownIcon} />
                    }
                </>
            </div>
            <div className={joinClasses(MultiSelectDropDownStyles.options, !open && MultiSelectDropDownStyles.closedOptions)}
                style={openDown ? openedDownStyle : openedUpStyle}>
                {
                    options.length > 0 ?
                        options.map((option, i) => (
                            <p
                                key={i}
                                className={joinClasses(props.values.includes(option.value) && MultiSelectDropDownStyles.selectedOption)}
                                onClick={() => toggleChoice(option.value)}
                            >{option.display}</p>
                        )) :
                        <p>No data to show</p>
                }
            </div>
        </div >
    )

}

export default MultiSelectDropDown;