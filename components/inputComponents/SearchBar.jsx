import React, {useEffect} from "react";
import {SearchBarStyles} from "../../styles/elements/inputs";
import {Search} from "@mui/icons-material";

const SearchBar = (props, ref) => {

    const onEnter = (e) => {
        if (e.key === "Enter") {
            props.onEnter && props.onEnter();
        }
    };

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };

    return (
        <div className={classNames(SearchBarStyles.container, props.className, props.darkTheme && SearchBarStyles.darkContainer)} style={props.style} ref={ref}>
            <Search style={{marginLeft: "5px"}} />
            <input placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value)} onKeyUp={onEnter} />
        </div>
    );
};

export default React.forwardRef(SearchBar);
