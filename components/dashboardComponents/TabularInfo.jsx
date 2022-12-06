import { useEffect, useRef } from 'react';
import { useState } from 'react';
import styles from '../../styles/elements/TabularInfo.module.css';
import Pagination from './Pagination';
import SearchBar from '../inputComponents/SearchBar';
import { FilterAlt, ExpandMore, ExpandLess } from '@mui/icons-material';

const TabularInfo = (props) => {

    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [noData, setNoData] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [tableHeight, setTableHeight] = useState('50px');

    const tableRef = useRef();
    const searchRef = useRef();
    const filterRef = useRef();

    useEffect(() => {
        if (tableRef.current) {
            setTableHeight(`${tableRef.current.clientHeight + 50}px`);
        } else {
            setTableHeight('50px')
        }
    }, [tableRef.current])

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

    const toggleExpansion = (e) => {
        if (props.expandable && (searchRef.current || filterRef.current)) {
            if ((searchRef.current && searchRef.current.contains(e.target)) || (filterRef.current && filterRef.current.contains(e.target))) {
                return;
            } else props.toggleExpansion();
        }
        else if (props.expandable) props.toggleExpansion();
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.header} style={props.expandable && { cursor: 'pointer' }} onClick={toggleExpansion}>
                <div style={props.expandable && { paddingLeft: '40px', position: 'relative' }}>
                    {props.expandable && (props.expanded ? <ExpandLess className={styles.dropDownIcon} /> :
                        <ExpandMore className={styles.dropDownIcon} />)}
                    {props.title && <h2>{props.title}</h2>}
                    {props.description && <h4>{props.description}</h4>}
                </div>
                <div className={styles.searchFilterContainer}>
                    {
                        props.showSearch && ((props.expandable && props.expanded) || !props.expandable) &&
                        <SearchBar ref={searchRef} className={styles.search} />
                    }
                    {
                        props.showFilter && ((props.expandable && props.expanded) || !props.expandable) &&
                        <div ref={filterRef} className={styles.filter}>
                            <FilterAlt />
                            <p>Filter</p>
                        </div>
                    }
                </div>
            </div>
            <div style={props.expandable && {
                height: props.expanded ? tableHeight : 0,
                transition: '0.2s all ease',
                overflow: 'hidden',
                marginTop: props.expanded && '20px'
            }}>
                {
                    props.data ?
                        noData ?
                            <p className={styles.loadingText}>No data available</p> :
                            <>
                                <table ref={tableRef} className={styles.table}>
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
        </div>
    )
}

export default TabularInfo;