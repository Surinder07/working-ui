import { useState, useEffect, useRef } from 'react';
import { TabularInfoStyles } from '../../styles/elements';
import Pagination from './Pagination';
import { SearchBar } from '../inputComponents';
import { FilterAlt, ExpandMore, ExpandLess, Edit } from '@mui/icons-material';
import Table from './Table';

const TabularInfo = (props) => {

    const [noData, setNoData] = useState(false);
    const [tableHeight, setTableHeight] = useState('450px');

    const tableRef = useRef();
    const searchRef = useRef();
    const filterRef = useRef();
    const editRef = useRef();

    useEffect(() => {
        if (tableRef.current) {
            setTableHeight(`${tableRef.current.clientHeight + (props.pagination ? 50 : 0)}px`);
        } else if (props.data) {
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
        if (props.expandable && (searchRef.current || filterRef.current || editRef.current)) {
            if ((searchRef.current && searchRef.current.contains(e.target)) ||
                (filterRef.current && filterRef.current.contains(e.target)) ||
                (editRef.current && editRef.current.contains(e.target))) {
                return;
            } else props.toggleExpansion();
        }
        else if (props.expandable) props.toggleExpansion();
    }

    return (
        <div className={TabularInfoStyles.tableContainer}>
            <div className={TabularInfoStyles.header} style={props.expandable && { cursor: 'pointer' }} onClick={toggleExpansion}>
                <div style={{ paddingLeft: props.expandable ? '40px' : '0' }}>
                    {props.expandable && (props.expanded ? <ExpandLess className={TabularInfoStyles.dropDownIcon} /> :
                        <ExpandMore className={TabularInfoStyles.dropDownIcon} />)}
                    {props.title && <h2>{props.title}</h2>}
                    {props.description && <h4>{props.description}</h4>}
                    {
                        props.isEditable && props.expanded &&
                        <div className={TabularInfoStyles.editOption} ref={editRef}>
                            {
                                props.editOn ?
                                    <>
                                        <p style={{ color: '#CC5252' }} onClick={() => props.setEditOn(false)}>Cancel</p>
                                        <p style={{ color: '#2996C3' }}>Save</p>
                                    </> :
                                    <p style={{ color: '#2996C3' }} onClick={() => props.setEditOn(true)}><Edit className={TabularInfoStyles.editIcon} /> Edit</p>
                            }
                        </div>
                    }
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
                                        totalEntries={props.totalEntries}
                                        entryPerPage={props.pageSize}
                                        currentPageEntries={props.data.length}
                                        totalPages={props.totalPages}
                                        pageNo={props.pageNo}
                                        setPageNo={props.setPageNo}
                                    />
                                }
                            </>
                        :
                        props.children ?
                            props.children :
                            <p className={TabularInfoStyles.loadingText}>Loading...</p>
                }
            </div>
        </div>
    )
}

export default TabularInfo;
