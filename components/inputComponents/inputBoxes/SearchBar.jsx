import React from 'react';
import { SearchBarStyles } from "../../../styles/elements/inputs";
import { Search } from "@mui/icons-material";

const SearchBar = (props, ref) => {

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };

    return (
        <div className={classNames(SearchBarStyles.container, props.className, props.darkTheme && SearchBarStyles.darkContainer)} style={props.style} ref={ref}>
            <Search style={{ marginLeft: "5px" }} />
            <input placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue && props.setValue(e.target.value)} />
        </div>
    );
};

export default React.forwardRef(SearchBar);
