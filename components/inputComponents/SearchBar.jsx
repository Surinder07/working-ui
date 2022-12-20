import React from 'react';
import { SearchBarStyles } from "../../styles/elements/inputs";
import { Search } from "@mui/icons-material";

const SearchBar = (props, ref) => {

    const onEnter = (e) => {
        if (e.key === "Enter") {
            props.onEnter && props.onEnter();
        }
    };

    return (
        <div className={`${SearchBarStyles.container} ${props.className}`} style={props.style} ref={ref}>
            <Search style={{ marginLeft: "5px" }} />
            <input placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value)} onKeyUp={onEnter} disabled />
        </div>
    );
};

export default React.forwardRef(SearchBar);
