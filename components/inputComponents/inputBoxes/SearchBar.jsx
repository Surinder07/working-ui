import React from 'react';
import { SearchBarStyles } from "../../../styles/elements/inputs";
import { Search } from "@mui/icons-material";
import { joinClasses } from '../../../helpers';

const SearchBar = (props, ref) => {

    return (
        <div className={joinClasses(
            SearchBarStyles.container,
            props.className,
            props.darkTheme && SearchBarStyles.darkContainer
        )}
            style={props.style}
            ref={ref}
        >
            <Search style={{ marginLeft: "5px", fontSize: "24px" }} />
            <input
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.setValue && props.setValue(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    );
};

export default React.forwardRef(SearchBar);
