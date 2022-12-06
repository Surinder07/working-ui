import { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import Pagination from "./Pagination";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
const TabularInfo = (props) => {
  const [displayHeaders, setDisplayHeaders] = useState([]);
  const [dataKeyList, setDataKeyList] = useState([]);
  const [noData, setNoData] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [clicked, setClicked] = useState(0);

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked(0);
    }
    setClicked(index);
  };

  useEffect(() => {
    setNoData(false);
    if (props.data) {
      if (!props.data[0]) {
        setNoData(true);
        return;
      }
      setDataKeyList(Object.keys(props.data[0]));
      setDisplayHeaders(
        Array.from(Object.keys(props.data[0]), (el) => {
          const result = el.replace(/([A-Z])/g, " $1");
          return result.charAt(0).toUpperCase() + result.slice(1);
        })
      );
    }
  }, [props.data]);

  return (
    <div className={styles.tableContainer}>
      {props.title && <h2>{props.title}</h2>}
      {props.description && <h4>{props.description}</h4>}
      {props.data ? (
        noData ? (
          <p className={styles.loadingText}>No data available</p>
        ) : (
          <>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.tableHeadRow}>
                  {props.expandable && <th className={styles.tableHeadCell} style={{ width: "50px" }}></th>}
                  {displayHeaders.map((head, i) => (
                    <th className={styles.tableHeadCell} key={`head${i}`}>
                      {head}
                    </th>
                  ))}
                </tr>
                {props.data.map((row, i) => (
                  <>
                    <tr className={styles.tableBodyRow} key={`row${i}`}>
                      {props.expandable && (
                        <td className={`${styles.tableHeadCell} ${styles.expansionIcon}`} style={{ width: "50px" }} key={i}>
                          {props.active ? <ControlPoint style={{ marginLeft: "35px", color: " #999999" }} /> : <RemoveCircleOutline style={{ marginLeft: "35px", color: " #999999" }} />}
                        </td>
                      )}

                      {dataKeyList.map((cell, j) => (
                        <td className={styles.tableBodyCell} key={`cell${i}_${j}`}>
                          {row[cell]}
                        </td>
                      ))}
                    </tr>
                    <table styles={styles.table}>
                      <tbody>
                        <tr className={styles.tableHeadRow}>
                          {props.expandable && <th className={styles.tableHeadCell} style={{ width: "50px" }}></th>}
                          {displayHeaders.map((head, i) => (
                            <th className={styles.tableHeadCell} key={`head${i}`}>
                              {head}
                            </th>
                          ))}
                        </tr>
                        {props.data.map((row, i) => (
                          <>
                            <tr className={styles.tableBodyRow} key={`row${i}`}>
                              {props.expandable && (
                                <td className={styles.tableHeadCell} style={{ width: "50px" }} key={i}>
                                  {props.active ? (
                                    <ControlPoint className={styles.expansionIcon} style={{ marginLeft: "35px", color: " #999999" }} />
                                  ) : (
                                    <RemoveCircleOutline style={{ marginLeft: "35px", color: " #999999" }} />
                                  )}
                                </td>
                              )}

                              {dataKeyList.map((cell, j) => (
                                <td className={styles.tableBodyCell} key={`cell${i}_${j}`}>
                                  {row[cell]}
                                </td>
                              ))}
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </>
                ))}
              </tbody>
            </table>
            {props.pagination && <Pagination totalEntries={70} entryPerPage={10} currentPageEntries={10} pageNo={pageNo} setPageNo={setPageNo} />}
          </>
        )
      ) : (
        <p className={styles.loadingText}>Loading...</p>
      )}
    </div>
  );
};

export default TabularInfo;
