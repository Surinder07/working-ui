import { PaginationStyles } from '../../styles/elements';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const PaginationDropdown = (props) => {

    const ref = useRef();
    const options = [5, 10, 15, 20];
    const [open, setOpen] = useState(false);

    useEffect(() => {
        props.setValue(10);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    return (
        <div className={PaginationStyles.dropdown} ref={ref} 
        style={{marginRight : props.rightSpace ? '15px' : '0'}}>
            <div className={PaginationStyles.selected} onClick={() => setOpen(!open)}>
                {`${props.value} items per page`}{open ? <KeyboardArrowUp className={PaginationStyles.dropDownIcon} /> :
                    <KeyboardArrowDown className={PaginationStyles.dropDownIcon} />}
            </div>
            <div className={`${PaginationStyles.options} ${!open && PaginationStyles.closedOptions}`} >
                {
                    options.map((option, i) => (
                        <p key={i} onClick={() => {
                            props.setValue(option);
                            setOpen(!open)
                        }}
                        >{`${option} items per page`}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default PaginationDropdown;