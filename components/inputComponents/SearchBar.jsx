import styles from "../../styles/elements/SearchBar.module.css";
import { Search } from "@mui/icons-material";

const SearchBar = (props) => {
    const onEnter = (e) => {
        if (e.key === "Enter") {
            props.onEnter && props.onEnter();
        }
    };

    return (
        <div className={`${styles.container} ${props.className}`} style={props.style}>
            <Search style={{ marginLeft: "5px" }} />
            <input placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value)} onKeyUp={onEnter} />
        </div>
    );
};

export default SearchBar;
