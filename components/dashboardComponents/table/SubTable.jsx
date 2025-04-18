import { CropFree } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { checkAllowedDataIndex, getAction, getColorByStatus, joinClasses } from "../../../helpers";
import { TableStyles } from "../../../styles/elements";
import Cell from "./Cell";

const SubTable = (props) => {
    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [keyListLength, setKeyListLength] = useState(0);
    const [colNum, setColNum] = useState(0);

    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            if (ref.current.clientHeight !== 0) props.setSubTableHeight(ref.current.clientHeight);
        }
    }, [props.expanded]);

    useEffect(() => {
        if (props.data && props.data.length > 0) {
            let keyList = Object.keys(props.data[0]).filter((item) => item !== "internalId");
            let headerList = Array.from(Object.keys(props.data[0]), (el) => {
                const result = el.replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            }).filter((item) => item.toLowerCase() !== "internal id");
            setDataKeyList(keyList);
            setDisplayHeaders(headerList);
            setKeyListLength(keyList.length);
            let columnsNum;
            if (keyList.length > 1) {
                columnsNum = (props.screenType === 1) ? keyList.length : ((props.screenType === 2) ? 4 : 2);
                if (props.actions) columnsNum++;
            } else columnsNum = 1;
            setColNum(columnsNum);
        }
    }, [props.data]);

    useEffect(() => {
        if (keyListLength > 1) {
            let columnsNum = (props.screenType === 1) ? keyListLength : ((props.screenType === 2) ? 4 : 2);
            if (props.actions) columnsNum++;
            setColNum(columnsNum);
        }
    }, [props.screenType, keyListLength]);

    return (
        <div
            ref={ref}
            className={joinClasses(TableStyles.subTable, props.history && TableStyles.historyTable)}
            style={{
                gridColumn: `span ${props.mainColNum}`,
                gridTemplateColumns: props.history ? "1fr" : `repeat(${colNum}, auto)`,
                height: props.expanded
                    ? props.history
                        ? `${props.history.length * 84 + (props.history.length + 1) * 20}px`
                        : displayHeaders.length === 1
                            ? "100px"
                            : `${props.data.length * 50 + 30}px`
                    : 0,
                overflowY: props.expanded ? "scroll" : "hidden",
                padding: props.history && props.expanded ? "20px" : '0 10px',
            }}
        >
            {(
                props.data && props.data.length > 0) &&
                displayHeaders
                    .filter((subHead, j) => checkAllowedDataIndex(j, props.screenType))
                    .map((subHead, j) => (
                        <div
                            key={`head_${j}`}
                            className={joinClasses(displayHeaders.length === 1 && TableStyles.subHeaderCellLeft,
                                TableStyles.subHeaderCell)}
                            style={displayHeaders.length === 1 ? { paddingLeft: "20px" } : {}}
                        >
                            {subHead}
                        </div>
                    ))
            }
            {
                ((!props.history && displayHeaders.length !== 1 && props.screenType >= 2) || props.actions) &&
                <div className={TableStyles.subHeaderCell}>Actions</div>
            }
            {
                (props.data && props.data.length > 0) &&
                props.data.map((subData, j) => (
                    <>
                        {dataKeyList
                            .filter((subKey, k) => checkAllowedDataIndex(k, props.screenType))
                            .map((subKey, k) => (
                                <Cell
                                    key={`cell_${j}_${k}`}
                                    className={joinClasses(displayHeaders.length === 1 && TableStyles.subBodyCellLeft, TableStyles.subBodyCell)}
                                    data={subData[subKey]}
                                    style={displayHeaders.length === 1 ? { paddingLeft: "20px" } : {}}
                                    rowNum={j}
                                />
                            ))
                        }
                        {
                            (displayHeaders.length !== 1 && props.screenType >= 2) ?
                                <CropFree
                                    className={TableStyles.expandIcons}
                                    onClick={() => {
                                        if (props.setSubData) {
                                            props.setSubData(subData);
                                        } else {
                                            props.setMobileData(subData);
                                            props.setShowModal(true);
                                        }
                                    }}
                                /> :
                                (
                                    props.actions &&
                                    <div className={TableStyles.subBodyCell} key={`action_${j}`}>
                                        {
                                            getAction(
                                                subData["internalId"],
                                                subData["status"] && subData["status"].text,
                                                subData["inTime"] && subData["inTime"],
                                                props.actions
                                            )
                                        }
                                    </div>
                                )

                        }
                    </>
                ))}
            {
                (props.history && props.history.length > 0) &&
                props.history.map((item, i) => (
                    <div className={TableStyles.requestContainer} key={`req_${i}`}>
                        <div
                            className={TableStyles.requestTitle}
                            style={{
                                color: getColorByStatus(item.status),
                                border: `solid 1px ${getColorByStatus(item.status)}`
                            }}>
                            {item.description}
                        </div>
                        <div
                            style={{ color: getColorByStatus(item.status) }}
                            className={TableStyles.requestDescription}>
                            <div>{item.title}</div>
                            <div>{item.date}</div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SubTable;
