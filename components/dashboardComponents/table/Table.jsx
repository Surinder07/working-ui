import React, { useEffect, useRef, useState } from "react";
import { TableStyles } from "../../../styles/elements";
import Cell from "./Cell";
import { Edit, Delete, AddCircleOutline, RemoveCircleOutline, FileDownload, CropFree } from "@mui/icons-material";
import Options from "../Options";
import SubTable from "./SubTable";
import MobileModal from "./MobileTable";
import { checkAllowedDataIndex, getAction } from "../../../helpers";

const Table = (props, ref) => {
    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [keyListLength, setKeyListLength] = useState(0);
    const [colNum, setColNum] = useState(0);
    const [expanded, setExpanded] = useState(0);
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [mobileData, setMobileData] = useState({});
    const [mobileSubData, setMobileSubData] = useState();

    useEffect(() => {
        if (props.data.length > 0) {
            let keyList = Object.keys(props.data[0]).filter((item) => item !== "subData" && item !== "internalId" && item !== "history");
            let headerList = Array.from(Object.keys(props.data[0]), (el) => {
                const result = el.replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            }).filter((item) => item.toLowerCase() !== "sub data" && item.toLowerCase() !== "internal id" && item.toLowerCase() !== "history");
            setDataKeyList(keyList);
            setDisplayHeaders(headerList);
            setKeyListLength(keyList.length);
            let columnsNum = (props.screenType === 1) ? keyList.length : ((props.screenType === 2) ? 4 : 2);
            if (props.actions) columnsNum++;
            if (props.data[0].subData || props.data[0].history) columnsNum++;
            setColNum(columnsNum);
        }
    }, [props.data]);

    useEffect(() => {
        if (keyListLength !== 0) {
            let columnsNum = (props.screenType === 1) ? keyListLength : ((props.screenType === 2) ? 4 : 2);
            if (props.actions) columnsNum++;
            if (props.data[0].subData || props.data[0].history) columnsNum++;
            setColNum(columnsNum);
        }
    }, [props.screenType]);

    return (
        <div className={TableStyles.table} style={{ gridTemplateColumns: `repeat(${colNum}, auto)` }} ref={ref}>
            {/* headers */}
            {props.data[0] && (props.data[0].subData || props.data[0].history) && <div className={TableStyles.headerCell}></div>}
            {/* An empty header for expand button in the body below */}
            {
                displayHeaders
                    .filter((head, i) => checkAllowedDataIndex(i, props.screenType))
                    .map((head, i) => (
                        <div className={TableStyles.headerCell} key={`head_${i}`}>
                            {head}
                        </div>
                    ))
            }
            {
                (props.screenType >= 2 || props.actions) &&
                <div className={TableStyles.headerCell}>Actions</div>
            }

            {/* body */}
            {dataKeyList.length > 0 &&
                props.data.map((row, i) => (
                    <>
                        {
                            (row.subData || row.history) &&
                            <div key={`expand_${i}`} className={TableStyles.bodyCell}>
                                {expanded === i + 1 ?
                                    <RemoveCircleOutline
                                        className={TableStyles.expandIcons}
                                        onClick={() => {
                                            setExpanded(0);
                                            props.setSubTableExpanded(false);
                                        }}
                                    /> :
                                    <AddCircleOutline
                                        className={TableStyles.expandIcons}
                                        onClick={() => {
                                            setExpanded(i + 1);
                                            props.onExpand && props.onExpand(row["internalId"], row["status"].text);
                                            props.setSubTableExpanded(true);
                                        }}
                                    />
                                }
                            </div>
                        }
                        {
                            dataKeyList
                                .filter((key, j) => checkAllowedDataIndex(j, props.screenType))
                                .map((key, j) => (
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
                                ))
                        }
                        {
                            props.screenType > 1 ?
                                <div
                                    style={{
                                        background:
                                            !props.pagination && props.data.length === i + 1
                                                ? "none"
                                                : "repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )",
                                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                                    }}
                                >
                                    <CropFree
                                        className={TableStyles.expandIcons}
                                        onClick={() => {
                                            setShowMobileModal(true);
                                            setMobileData(row);
                                        }}
                                    />
                                </div> :
                                props.actions &&
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
                                    {
                                        getAction(
                                            row["internalId"],
                                            row["status"] && row["status"].text,
                                            row["startDate"] && row["startDate"],
                                            props.actions
                                        )
                                    }
                                </div>
                        }

                        {
                            (row.subData || row.history) && (
                                <SubTable
                                    title={props.title}
                                    screenType={props.screenType}
                                    data={row["subData"]}
                                    history={row.history}
                                    setShowModal={setShowMobileModal}
                                    setMobileData={setMobileData}
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
                                showModal={showMobileModal}
                                mainColNum={colNum}
                                actions={props.actions}
                                subActions={props.subActions}
                                setSubTableHeight={props.setSubTableHeight}
                                setShowModal={setShowMobileModal}
                                setData={setMobileData}
                                data={mobileData}
                                subData={mobileSubData}
                                setSubData={setMobileSubData}
                            />
                        }
                    </>
                ))}
        </div>
    );
};

export default React.forwardRef(Table);
