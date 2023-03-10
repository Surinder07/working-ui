import {Delete, Edit, FileDownload, CropFree} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import {TableStyles} from "../../../styles/elements";
import Options from "../Options";
import Cell from "./Cell";
import MobileModal from "./MobileTable";

const SubTable = (props) => {
    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [colNum, setColNum] = useState(0);
    const [showModal, setShowModal] = useState(0);

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
            let columnsNum;
            if (props.screenType === 1) {
                columnsNum = keyList.length;
            } else if (props.screenType === 2) {
                columnsNum = 5;
            } else if (props.screenType === 3) {
                columnsNum = 3;
            }
            if (props.actions) columnsNum++;
            setColNum(columnsNum);
        }
    }, [props.data]);

    const getColor = (type) => {
        switch (type) {
            case "ok":
                return "#2996C3";
            case "warn":
                return "#E4BE3D";
            case "basic":
                return "#535255";
            case "bad":
                return "#CC5252";
        }
    };

    const getAction = (id, status, date) => {
        if (Array.isArray(props.actions)) return <Options options={props.actions} actionId={id} status={status} date={date} />;
        else if (props.actions.key === "Edit") return <Edit className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
        else if (props.actions.key === "Delete") return <Delete style={{color: "#999"}} className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
        else if (props.actions.key === "Download") return <FileDownload className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
    };

    return (
        <div
            ref={ref}
            className={`${TableStyles.subTable} ${props.history && TableStyles.historyTable}`}
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
                padding: props.history && props.expanded ? "20px" : 0,
            }}
        >
            {props.data &&
                props.data.length > 0 &&
                displayHeaders.map((subHead, j) => {
                    if (props.screenType === 1) {
                        return (
                            <div
                                key={`head_${j}`}
                                className={`${displayHeaders.length === 1 && TableStyles.subHeaderCellLeft}
                                ${TableStyles.subHeaderCell}`}
                                style={displayHeaders.length === 1 ? {paddingLeft: "20px"} : {}}
                            >
                                {subHead}
                            </div>
                        );
                    } else if (props.screenType === 2 && j <= 3) {
                        return (
                            <div
                                key={`head_${j}`}
                                className={`${displayHeaders.length === 1 && TableStyles.subHeaderCellLeft}
                                ${TableStyles.subHeaderCell}`}
                                style={displayHeaders.length === 1 ? {paddingLeft: "20px"} : {}}
                            >
                                {subHead}
                            </div>
                        );
                    } else if (props.screenType === 3 && j <= 1) {
                        return (
                            <div
                                key={`head_${j}`}
                                className={`${displayHeaders.length === 1 && TableStyles.subHeaderCellLeft}
                                ${TableStyles.subHeaderCell}`}
                                style={displayHeaders.length === 1 ? {paddingLeft: "20px"} : {}}
                            >
                                {subHead}
                            </div>
                        );
                    }
                })}
            {(props.screenType >= 2 || props.actions) && <div className={TableStyles.subHeaderCell}>Actions</div>}
            {props.data &&
                props.data.length > 0 &&
                props.data.map((subData, j) => (
                    <>
                        {dataKeyList.map((subKey, k) => {
                            if (props.screenType === 1) {
                                return (
                                    <Cell
                                        key={`cell_${j}_${k}`}
                                        className={`${displayHeaders.length === 1 && TableStyles.subBodyCellLeft} ${TableStyles.subBodyCell}`}
                                        data={subData[subKey]}
                                        style={displayHeaders.length === 1 ? {paddingLeft: "20px"} : {}}
                                        rowNum={j}
                                    />
                                );
                            } else if (props.screenType === 2 && k <= 3) {
                                return (
                                    <Cell
                                        key={`cell_${j}_${k}`}
                                        className={`${displayHeaders.length === 1 && TableStyles.subBodyCellLeft} ${TableStyles.subBodyCell}`}
                                        data={subData[subKey]}
                                        style={displayHeaders.length === 1 ? {paddingLeft: "20px"} : {}}
                                        rowNum={j}
                                    />
                                );
                            } else if (props.screenType === 3 && j <= 1) {
                                return (
                                    <Cell
                                        key={`cell_${j}_${k}`}
                                        className={`${displayHeaders.length === 1 && TableStyles.subBodyCellLeft} ${TableStyles.subBodyCell}`}
                                        data={subData[subKey]}
                                        style={displayHeaders.length === 1 ? {paddingLeft: "20px"} : {}}
                                        rowNum={j}
                                    />
                                );
                            }
                        })}
                        {props.screenType >= 2 ? (
                            <CropFree
                                className={TableStyles.expandIcons}
                                onClick={() => {
                                    setShowModal(j + 1);
                                }}
                            />
                        ) : (
                            props.actions && (
                                <div className={TableStyles.subBodyCell} key={`action_${j}`}>
                                    {getAction(subData["internalId"], subData["status"] && subData["status"].text, subData["inTime"] && subData["inTime"])}
                                </div>
                            )
                        )}
                        {
                            <MobileModal
                                title={props.title}
                                screenType={props.screenType}
                                showModal={showModal === j + 1}
                                colNum={colNum}
                                actions={props.subActions}
                                setSubTableHeight={props.setSubTableHeight}
                                setShowModal={setShowModal}
                                data={subData}
                            />
                        }
                    </>
                ))}
            {props.history &&
                props.history.length > 0 &&
                props.history.map((item, i) => (
                    <div className={TableStyles.requestContainer} key={`req_${i}`}>
                        <div className={TableStyles.requestTitle} style={{color: getColor(item.status), border: `solid 1px ${getColor(item.status)}`}}>
                            {item.description}
                        </div>
                        <div style={{color: getColor(item.status)}} className={TableStyles.requestDescription}>
                            <div>{item.title}</div>
                            <div>{item.date}</div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SubTable;
