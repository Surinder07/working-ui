import React, { useEffect, useState } from 'react';
import styles from '../../styles/elements/Table.module.css';
import { Edit, Delete, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import Options from './Options';

const Table = (props, ref) => {

    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataKeyList, setDataKeyList] = useState([]);
    const [displaySubHeaders, setDisplaySubHeaders] = useState([]);
    const [dataSubKeyList, setDataSubKeyList] = useState([]);
    const [colNum, setColNum] = useState(0);
    const [subTableCololNum, setsubTableCololNum] = useState(0);
    const [expanded, setExpanded] = useState(0);

    useEffect(() => {
        let keyList = Object.keys(props.data[0]).filter(item => item !== 'subData' && item.toLowerCase() !== 'internalId');
        let headerList = Array.from(Object.keys(props.data[0]), (el) => {
            const result = el.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        }).filter(item => item.toLowerCase() !== 'sub data' && item.toLowerCase() !== 'internal id');
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
        setColNum(columnsNum)
    }, [props.data]);

    const getAction = (id) => {
        if (Array.isArray(props.actions)) return <Options options={props.actions} actionId={id} />
        else if (props.actions.key === 'Edit') return <Edit className={styles.actionIcon} onClick={() => props.actions.action(id)} />
        else if (props.actions.key === 'Delete') return <Delete className={styles.actionIcon} onClick={() => props.actions.action(id)} />
    }

    return (
        <div className={styles.table} style={{ gridTemplateColumns: `repeat(${colNum}, auto)` }} ref={ref}>
            {/* headers */}
            {props.data[0].subData && <div className={styles.headerCell}></div>}
            {
                displayHeaders.map((head, i) => (
                    <div className={styles.headerCell} key={`head_${i}`}>
                        {head}
                    </div>
                ))
            }
            {props.actions && <div className={styles.headerCell}></div>}

            {/* body */}
            {
                props.data.map((row, i) => (
                    <>
                        {row.subData && <div className={styles.bodyCell}>
                            {
                                expanded === i + 1 ?
                                    <RemoveCircleOutline className={styles.expandIcons} onClick={() => setExpanded(0)} /> :
                                    <AddCircleOutline className={styles.expandIcons} onClick={() => setExpanded(i + 1)} />
                            }
                        </div>
                        }
                        {
                            dataKeyList.map((key, j) => (
                                <div className={styles.bodyCell} key={`cell_${i}_${j}`}>
                                    {row[key]}
                                </div>
                            ))
                        }
                        {
                            props.actions &&
                            <div className={styles.bodyCell}>
                                {getAction(row['internalId'])}
                            </div>
                        }
                        {
                            row.subData &&
                            <div className={styles.subTable} style={{
                                gridColumn: `span ${colNum}`,
                                gridTemplateColumns: `repeat(${subTableCololNum}, auto)`,
                                height: expanded === i + 1 ? `${row.subData.length * 50 + 30}px` : 0,
                                overflowY: expanded === i + 1 ? 'scroll' : 'hidden'
                            }}>
                                {
                                    displaySubHeaders.map((subHead, j) => (
                                        <div key={`head_${i}_${j}`} className={`${displaySubHeaders.length === 1 && styles.subHeaderCellLeft}
                                            ${styles.subHeaderCell}`}>
                                            {subHead}
                                        </div>
                                    ))
                                }
                                {
                                    row.subData.map((subData, j) => (
                                        dataSubKeyList.map((subKey, k) => (
                                            <div key={`cell${i}_${j}_${k}`} className={styles.subBodyCell}>
                                                {subData[subKey]}
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                        }
                    </>
                ))
            }
        </div>
    )
}

export default React.forwardRef(Table);