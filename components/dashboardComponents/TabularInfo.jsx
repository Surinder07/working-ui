import {useState, useEffect, useRef} from "react";
import {TabularInfoStyles} from "../../styles/elements";
import Pagination from "./Pagination";
import {SearchBar} from "../inputComponents";
import {FilterAlt, ExpandMore, ExpandLess, Edit} from "@mui/icons-material";
import {Table} from "./table";

const TabularInfo = (props) => {
    const [noData, setNoData] = useState(false);
    const [initialTableHeight, setInitialTableHeight] = useState(450);
    const [tableHeight, setTableHeight] = useState(450);
    const [subTableHeight, setSubTableHeight] = useState(0);
    const [subTableExpanded, setSubTableExpanded] = useState(false);

    const tableRef = useRef();
    const searchRef = useRef();
    const filterRef = useRef();
    const editRef = useRef();

    useEffect(() => {
        if (tableRef.current) {
            setInitialTableHeight(tableRef.current.clientHeight + (props.pagination ? 50 : 0));
            setTableHeight(tableRef.current.clientHeight + (props.pagination ? 50 : 0) + (subTableExpanded ? subTableHeight : 0));
        } else if (props.data) {
            setTableHeight(50 + (subTableExpanded ? subTableHeight : 0));
        }
    }, [tableRef.current]);

    useEffect(() => {
        setTableHeight(initialTableHeight + (subTableExpanded ? subTableHeight : 0));
    }, [subTableExpanded]);

    useEffect(() => {
        setNoData(false);
        if (props.data && !props.data[0]) {
            setNoData(true);
        }
    }, [props.data]);

    const toggleExpansion = (e) => {
        if (props.expandable && (searchRef.current || filterRef.current || editRef.current)) {
            if ((searchRef.current && searchRef.current.contains(e.target)) || (filterRef.current && filterRef.current.contains(e.target)) || (editRef.current && editRef.current.contains(e.target))) {
                return;
            } else props.toggleExpansion();
        } else if (props.expandable) props.toggleExpansion();
    };

    return (
        <div className={TabularInfoStyles.tableContainer}>
            <div className={TabularInfoStyles.header} style={props.expandable ? {cursor: "pointer"} : {cursor: "default"}} onClick={toggleExpansion}>
                <div style={props.expandable ? {paddingLeft: "40px"} : {paddingLeft: "0"}}>
                    {props.expandable && (props.expanded ? <ExpandLess className={TabularInfoStyles.dropDownIcon} /> : <ExpandMore className={TabularInfoStyles.dropDownIcon} />)}
                    {props.title && <h2>{props.title}</h2>}
                    {(!props.expandable || (props.expandable && props.expanded)) && props.description && <h4>{props.description}</h4>}
                    {props.isEditable && props.expanded && (
                        <div className={TabularInfoStyles.editOption} ref={editRef}>
                            {props.editOn ? (
                                <>
                                    <p
                                        style={{color: "#CC5252"}}
                                        onClick={() => {
                                            props.onCancel && props.onCancel();
                                            props.setEditOn(false);
                                        }}
                                    >
                                        Cancel
                                    </p>
                                    <p
                                        style={{color: "#2996C3"}}
                                        onClick={() => {
                                            props.onSave && props.onSave();
                                        }}
                                    >
                                        Save
                                    </p>
                                </>
                            ) : (
                                <p style={{color: "#2996C3"}} onClick={() => props.setEditOn(true)}>
                                    <Edit className={TabularInfoStyles.editIcon} /> Edit
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className={TabularInfoStyles.searchFilterContainer}>
                    {props.showSearch && ((props.expandable && props.expanded) || !props.expandable) && (
                        <SearchBar value={props.search} setValue={props.setSearch} ref={searchRef} className={TabularInfoStyles.search} placeholder="Search" />
                    )}
                    {props.showFilter && ((props.expandable && props.expanded) || !props.expandable) && (
                        <div ref={filterRef} className={TabularInfoStyles.filter} onClick={() => props.setShowFilterModal && props.setShowFilterModal(true)}>
                            <FilterAlt />
                            <p>Filter</p>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={TabularInfoStyles.tabularMapped}
                style={
                    props.expandable
                        ? {
                              height: props.expanded ? `${tableHeight}px` : 0,
                              transition: "0.2s all ease",
                              overflow: "hidden",
                              marginTop: props.expanded && "20px",
                          }
                        : {}
                }
            >
                {props.data ? (
                    noData ? (
                        <p className={TabularInfoStyles.loadingText}>No data available</p>
                    ) : (
                        <>
                            <Table
                                title={props.title}
                                screenType={props.screenType}
                                data={props.data}
                                actions={props.actions}
                                subActions={props.subActions}
                                ref={tableRef}
                                pagination={props.pagination}
                                onExpand={props.onExpand}
                                setSubTableHeight={setSubTableHeight}
                                setSubTableExpanded={setSubTableExpanded}
                            />
                            {props.pagination && (
                                <Pagination
                                    totalEntries={props.totalEntries}
                                    entryPerPage={props.pageSize}
                                    currentPageEntries={props.data.length}
                                    totalPages={props.totalPages}
                                    pageNo={props.pageNo}
                                    setPageNo={props.setPageNo}
                                    onExpand={props.onExpand}
                                />
                            )}
                        </>
                    )
                ) : props.children ? (
                    props.children
                ) : (
                    <p className={TabularInfoStyles.loadingText}>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default TabularInfo;
