import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../../styles/pages/Dashboard.module.css';
import Pagination from './Pagination';

const TabularInfo = (props) => {

    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [noData, setNoData] = useState(false);
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        setNoData(false);
        if (props.data) {
            if (!props.data[0]) {
                setNoData(true);
                return;
            }
            setDataKeyList(Object.keys(props.data[0]));
            setDisplayHeaders(Array.from(Object.keys(props.data[0]), el => {
                const result = el.replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            }))
        }
    }, [props.data]);

    return (
        <div className={styles.tableContainer}>
            {props.title && <h2>{props.title}</h2>}
            {props.description && <h4>{props.description}</h4>}
            {
                props.data ?
                    noData ?
                        <p className={styles.loadingText}>No data available</p> :
                        <>
                            <table className={styles.table}>
                                <tbody>
                                    <tr className={styles.tableHeadRow}>
                                        {
                                            displayHeaders.map((head, i) => (
                                                <th className={styles.tableHeadCell} key={`head${i}`}>
                                                    {head}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                    {
                                        props.data.map((row, i) => (
                                            <tr className={styles.tableBodyRow} key={`row${i}`}>
                                                {
                                                    dataKeyList.map((cell, j) => (
                                                        <td className={styles.tableBodyCell} key={`cell${i}_${j}`}>
                                                            {row[cell]}
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                props.pagination &&
                                <Pagination
                                    totalEntries={70}
                                    entryPerPage={10}
                                    currentPageEntries={10}
                                    pageNo={pageNo}
                                    setPageNo={setPageNo}
                                />}
                        </>
                    :
                    <p className={styles.loadingText}>Loading...</p>
            }
        </div>
    )
}

export default TabularInfo;