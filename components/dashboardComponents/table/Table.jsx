import React, {useEffect, useRef, useState} from "react";
import {TableStyles} from "../../../styles/elements";
import Cell from "./Cell";
import {Edit, Delete, AddCircleOutline, RemoveCircleOutline, FileDownload, CropFree} from "@mui/icons-material";
import Options from "../Options";
import SubTable from "./SubTable";
import MobileModal from "./MobileTable";

const Table = (props, ref) => {
    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [colNum, setColNum] = useState(0);
    const [expanded, setExpanded] = useState(0);
    const [showModal, setShowModal] = useState(0);

    useEffect(() => {
        if (props.data.length > 0) {
            let keyList = Object.keys(props.data[0]).filter((item) => item !== "subData" && item !== "internalId" && item !== "history");
            let headerList = Array.from(Object.keys(props.data[0]), (el) => {
                const result = el.replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            }).filter((item) => item.toLowerCase() !== "sub data" && item.toLowerCase() !== "internal id" && item.toLowerCase() !== "history");
            setDataKeyList(keyList);
            setDisplayHeaders(headerList);
            let columnsNum;
            if (props.screenType === 1) {
                columnsNum = keyList.length;
            } else if (props.screenType === 2) {
                columnsNum = 4;
            } else if (props.screenType === 3) {
                columnsNum = 2;
            }
            if (props.actions) columnsNum++;
            if (props.data[0].subData || props.data[0].history) {
                columnsNum++;
            }
            setColNum(columnsNum);
        }
    }, [props.data]);

    const getAction = (id, status, date) => {
        if (Array.isArray(props.actions)) return <Options options={props.actions} actionId={id} status={status} date={date} />;
        else if (props.actions.key === "Edit") return <Edit className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
        else if (props.actions.key === "Delete") return <Delete style={{color: "#999"}} className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
        else if (props.actions.key === "Download") return <FileDownload className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
    };

    return (
        <div className={TableStyles.table} style={{gridTemplateColumns: `repeat(${colNum}, auto)`}} ref={ref}>
            {/* headers */}
            {props.data[0] && (props.data[0].subData || props.data[0].history) && <div className={TableStyles.headerCell}></div>}
            {/* An empty header for expand button in the body below */}
            {displayHeaders.map((head, i) => {
                if (props.screenType === 1) {
                    return (
                        <div className={TableStyles.headerCell} key={`head_${i}`}>
                            {head}
                        </div>
                    );
                } else if (props.screenType === 2 && i <= 3) {
                    return (
                        <div className={TableStyles.headerCell} key={`head_${i}`}>
                            {head}
                        </div>
                    );
                } else if (props.screenType === 3 && i <= 1) {
                    return (
                        <div className={TableStyles.headerCell} key={`head_${i}`}>
                            {head}
                        </div>
                    );
                }
            })}
            {(props.screenType >= 2 || props.actions) && <div className={TableStyles.headerCell}>Actions</div>}

            {/* body */}
            {dataKeyList.length > 0 &&
                props.data.map((row, i) => (
                    <>
                        {(row.subData || row.history) && (
                            <div key={`expand_${i}`} className={TableStyles.bodyCell}>
                                {expanded === i + 1 ? (
                                    <RemoveCircleOutline
                                        className={TableStyles.expandIcons}
                                        onClick={() => {
                                            setExpanded(0);
                                            props.setSubTableExpanded(false);
                                        }}
                                    />
                                ) : (
                                    <AddCircleOutline
                                        className={TableStyles.expandIcons}
                                        onClick={() => {
                                            setExpanded(i + 1);
                                            props.onExpand && props.onExpand(row["internalId"], row["status"].text);
                                            props.setSubTableExpanded(true);
                                        }}
                                    />
                                )}
                            </div>
                        )}
                        {dataKeyList.map((key, j) => {
                            if (props.screenType === 1) {
                                return (
                                    <Cell
                                        className={TableStyles.bodyCell}
                                        key={`cell_${i}_${j}`}
                                        style={{
                                            background:
                                                !props.pagination && props.data.length === i + 1
                                                    ? "none"
                                                    : "repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )",
                                        }}
                                        data={row[key]}
                                    />
                                );
                            } else if (props.screenType === 2 && j <= 3) {
                                return (
                                    <Cell
                                        className={TableStyles.bodyCell}
                                        key={`cell_${i}_${j}`}
                                        style={{
                                            background:
                                                !props.pagination && props.data.length === i + 1
                                                    ? "none"
                                                    : "repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )",
                                        }}
                                        data={row[key]}
                                    />
                                );
                            } else if (props.screenType === 3 && j <= 1) {
                                return (
                                    <Cell
                                        className={TableStyles.bodyCell}
                                        key={`cell_${i}_${j}`}
                                        style={{
                                            background:
                                                !props.pagination && props.data.length === i + 1
                                                    ? "none"
                                                    : "repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )",
                                        }}
                                        data={row[key]}
                                    />
                                );
                            }
                        })}
                        {props.screenType >= 2 ? (
                            <CropFree
                                className={TableStyles.expandIcons}
                                onClick={() => {
                                    setShowModal(i + 1);
                                }}
                            />
                        ) : (
                            props.actions && (
                                <div
                                    className={TableStyles.bodyCell}
                                    key={`action_${i}`}
                                    style={{
                                        background:
                                            !props.pagination && props.data.length === i + 1
                                                ? "none"
                                                : "repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )",
                                    }}
                                >
                                    {getAction(row["internalId"], row["status"] && row["status"].text, row["startDate"] && row["startDate"])}
                                </div>
                            )
                        )}
                        {(row.subData || row.history) && (
                            <SubTable
                                title={props.title}
                                screenType={props.screenType}
                                data={row["subData"]}
                                history={row.history}
                                mainColNum={colNum}
                                expanded={expanded === i + 1}
                                actions={props.subActions}
                                setSubTableHeight={props.setSubTableHeight}
                            />
                        )}
                        {
                            <MobileModal
                                title={props.title}
                                screenType={props.screenType}
                                showModal={showModal === i + 1}
                                mainColNum={colNum}
                                actions={props.subActions}
                                setSubTableHeight={props.setSubTableHeight}
                                setShowModal={setShowModal}
                                data={row}
                            />
                        }
                    </>
                ))}
        </div>
    );
};

export default React.forwardRef(Table);
