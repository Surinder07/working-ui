import styles from "../../styles/elements/SearchBar.module.css";
import { Search } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const SearchBar = (props) => {
  const onEnter = (e) => {
    if (e.key === "Enter") {
      props.onEnter && props.onEnter();
    }
  };

  return (
    <div className={`${styles.container} ${props.className}`} style={props.style}>
      {props.search && <Search style={{ marginLeft: "5px", color: " #C5C7CD" }} />}
      {props.filter && <FilterAltIcon style={{ marginLeft: "5px", color: " #C5C7CD" }} />}
      <input placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value)} onKeyUp={onEnter} />
    </div>
  );
};

export default SearchBar;
