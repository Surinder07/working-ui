import React, { useEffect, useState } from "react";
import { TableStyles } from "../../styles/elements";
import { Edit, Delete, AddCircleOutline, RemoveCircleOutline, FileDownload } from "@mui/icons-material";
import Options from "./Options";

const Table = (props, ref) => {
    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [displaySubHeaders, setDisplaySubHeaders] = useState([]);
    const [dataSubKeyList, setDataSubKeyList] = useState([]);
    const [colNum, setColNum] = useState(0);
    const [subTableCololNum, setsubTableCololNum] = useState(0);
    const [expanded, setExpanded] = useState(0);

    useEffect(() => {
        let keyList = Object.keys(props.data[0]).filter((item) => item !== "subData" && item.toLowerCase() !== "internalId");
        let headerList = Array.from(Object.keys(props.data[0]), (el) => {
            const result = el.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }).filter((item) => item.toLowerCase() !== "sub data" && item.toLowerCase() !== "internal id");
        setDataKeyList(keyList);
        setDisplayHeaders(headerList);
        let columnsNum = keyList.length;
        if (props.actions) columnsNum++;
        if (props.data[0].subData) {
            let subKeyList = Object.keys(props.data[0].subData[0]);
            let subHeaderList = Array.from(Object.keys(props.data[0].subData[0]), (el) => {
                const result = el.replace(/([A-Z])/g, " $1");
                return result.charAt(0).toUpperCase() + result.slice(1);
            });
            setDataSubKeyList(subKeyList);
            setDisplaySubHeaders(subHeaderList);
            setsubTableCololNum(subKeyList.length);
            columnsNum++;
        }
        setColNum(columnsNum);
    }, [props.data]);

    const getAction = (id) => {
        if (Array.isArray(props.actions)) return <Options options={props.actions} actionId={id} />;
        else if (props.actions.key === "Edit") return <Edit className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
        else if (props.actions.key === "Delete") return <Delete style={{ color: "#999" }} className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
        else if (props.actions.key === "Download") return <FileDownload className={TableStyles.actionIcon} onClick={() => props.actions.action(id)} />;
    };

    return (
        <div className={TableStyles.table} style={{ gridTemplateColumns: `repeat(${colNum}, auto)` }} ref={ref}>
            {/* headers */}
            {props.data[0].subData && <div className={TableStyles.headerCell}></div>}{/* An empty header for expand button in the body below */}
            {displayHeaders.map((head, i) => (
                <div className={TableStyles.headerCell} key={`head_${i}`}>
                    {head}
                </div>
            ))}
            {props.actions && <div className={TableStyles.headerCell}>Actions</div>}

            {/* body */}
            {props.data.map((row, i) => (
                <>
                    {row.subData && (
                        <div key={`expand_${i}`} className={TableStyles.bodyCell}>
                            {expanded === i + 1 ? (
                                <RemoveCircleOutline className={TableStyles.expandIcons} onClick={() => setExpanded(0)} />
                            ) : (
                                <AddCircleOutline className={TableStyles.expandIcons} onClick={() => setExpanded(i + 1)} />
                            )}
                        </div>
                    )}
                    {dataKeyList.map((key, j) =>
                        row[key].text ? (
                            <div className={TableStyles.bodyCell} key={`cell_${i}_${j}`}
                                style={{
                                    background: !props.pagination && (props.data.length === i + 1) ? 'none' : 
                                    'repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )',
                                    color: row[key].color
                                }}>
                                {row[key].text}
                            </div>
                        ) : (
                            <div className={TableStyles.bodyCell} key={`cell_${i}_${j}`}
                                style={{ background: !props.pagination && (props.data.length === i + 1) ? 'none' : 
                                'repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )' }}>
                                {row[key]}
                            </div>
                        )
                    )}
                    {props.actions && (
                        <div className={TableStyles.bodyCell} key={`action_${i}`}
                            style={{ background: !props.pagination && (props.data.length === i + 1) ? 'none' : 
                            'repeating-linear-gradient(to bottom, transparent 0, transparent 49px, #DFE0EB 49px,#DFE0EB 50px )' }}>
                            {getAction(row["internalId"])}
                        </div>
                    )}
                    {row.subData && (
                        <div
                            className={TableStyles.subTable}
                            style={{
                                gridColumn: `span ${colNum}`,
                                gridTemplateColumns: `repeat(${subTableCololNum}, auto)`,
                                height: expanded === i + 1 ? (displaySubHeaders.length === 1 ? "100px" : `${row.subData.length * 50 + 30}px`) : 0,
                                overflowY: expanded === i + 1 ? "scroll" : "hidden",
                            }}
                        >
                            {displaySubHeaders.map((subHead, j) => (
                                <div
                                    key={`head_${i}_${j}`}
                                    className={`${displaySubHeaders.length === 1 && TableStyles.subHeaderCellLeft}
                                            ${TableStyles.subHeaderCell}`}
                                >
                                    {subHead}
                                </div>
                            ))}
                            {row.subData.map((subData, j) =>
                                dataSubKeyList.map((subKey, k) => (
                                    <div
                                        key={`cell${i}_${j}_${k}`}
                                        className={`${displaySubHeaders.length === 1 && TableStyles.subBodyCellLeft}
                                            ${TableStyles.subBodyCell}`}
                                    >
                                        {subData[subKey]}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </>
            ))}
        </div>
    );
};

export default React.forwardRef(Table);
