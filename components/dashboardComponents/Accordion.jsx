import { useRef } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import TabularInfo from "../../components/dashboardComponents/TabularInfo";
import SearchBar from "../inputComponents/SearchBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Accordion = ({ faq, active, onToggle }) => {
  const { question, searchBar, filterBar, tableContent } = faq;

  const contentEl = useRef();

  return (
    <li className={`${styles.accordion_item} ${active ? "active" : ""}`}>
      <button className={styles.expansionButton} onClick={onToggle}>
        <div className={styles.leftAccordion}>
          <span className={styles.control}>{active ? <ExpandMoreIcon style={{ marginLeft: "5px", color: " #999999" }} /> : <ExpandLessIcon style={{ marginLeft: "5px", color: " #999999" }} />} </span>
          <p className={styles.accordion_header}>{question}</p>
        </div>
        <div className={styles.rightAccordion}>
          {/* {active && searchBar && <SearchBar className={styles.searchBar} setValue={console.log} placeholder="Search" search />}
          {active && filterBar && <SearchBar className={styles.filterBar} setValue={console.log} placeholder="Filter" filter />} */}
        </div>
      </button>
      <div ref={contentEl} className={styles.answer_wrapper} style={active ? { height: contentEl.current.scrollHeight } : { height: "0px" }}>
        <TabularInfo data={tableContent} />
      </div>
    </li>
  );
};

export default Accordion;
