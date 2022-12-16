import { useRef, useState, useEffect } from "react";
import { DropdownStyles } from '../../styles/elements/inputs';

const MultiSelectInput = (props) => {

    const ref = useRef();

    const [displayValue, setDisplayValue] = useState(props.defaultDisplay);
    const [open, setOpen] = useState(false);
    const [openDown, setOpenDown] = useState(true);
    const [inputHeight, setInputHeight] = useState(0);

    useEffect(() => {
        setInputHeight(ref.current.clientHeight);
    }, [ref]);

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

    const onType = () => {
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
        <></>
    )
}

export default MultiSelectInput;