import { useState, useEffect, useRef } from 'react';
import { TabularInfoStyles } from '../../styles/elements';
import Pagination from './Pagination';
import { SearchBar } from '../inputComponents';
import { FilterAlt, ExpandMore, ExpandLess } from '@mui/icons-material';
import Table from './Table';

const TabularInfo = (props) => {

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
    }, [tableRef.current]);

    useEffect(() => {
        setNoData(false);
        if (props.data && !props.data[0]) {
            setNoData(true);
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
        <div className={TabularInfoStyles.tableContainer}>
            <div className={TabularInfoStyles.header} style={props.expandable && { cursor: 'pointer' }} onClick={toggleExpansion}>
                <div style={props.expandable && { paddingLeft: '40px', position: 'relative' }}>
                    {props.expandable && (props.expanded ? <ExpandLess className={TabularInfoStyles.dropDownIcon} /> :
                        <ExpandMore className={TabularInfoStyles.dropDownIcon} />)}
                    {props.title && <h2>{props.title}</h2>}
                    {props.description && <h4>{props.description}</h4>}
                </div>
                <div className={TabularInfoStyles.searchFilterContainer}>
                    {
                        props.showSearch && ((props.expandable && props.expanded) || !props.expandable) &&
                        <SearchBar ref={searchRef} className={TabularInfoStyles.search} />
                    }
                    {
                        props.showFilter && ((props.expandable && props.expanded) || !props.expandable) &&
                        <div ref={filterRef} className={TabularInfoStyles.filter}>
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
                            <p className={TabularInfoStyles.loadingText}>No data available</p> :
                            <>
                                <Table data={props.data} actions={props.actions} ref={tableRef} pagination={props.pagination} />
                                {
                                    props.pagination &&
                                    <Pagination
                                        totalEntries={70}
                                        entryPerPage={10}
                                        currentPageEntries={10}
                                        pageNo={pageNo}
                                        setPageNo={setPageNo}
                                    />
                                }
                            </>
                        :
                        <p className={TabularInfoStyles.loadingText}>Loading...</p>
                }
            </div>
        </div>
    )
}

export default TabularInfo;
