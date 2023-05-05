import { useEffect } from "react";
import { useRef, useState } from "react";
import { getColorByStatus, joinClasses } from "../../../helpers";
import { CellStyles } from "../../../styles/elements";

const Cell = (props) => {

    const ref = useRef();
    const [commentHeight, setCommentHeight] = useState(0);
    const [color, setColor] = useState('#FFF');
    const [activeStyle, setActiveStyle] = useState({
        height: 0,
        overflow: 'hidden',
        padding: 0,
        border: 'none',
        boxShadow: 'none'
    });

    useEffect(() => {
        if (props.data && props.data.displayType && props.data.displayType === 'comment') {
            setCommentHeight(ref.current.clientHeight);
        }
    }, [ref.current, props.data]);

    useEffect(() => {
        if (props.data && props.data.status) {
            setColor(getColorByStatus(props.data.status))
        }
    }, [props.data])

    const statusStyle = {
        color: props.data && props.data.displayType === 'color' ? color : '#FFF',
        backgroundColor: props.data && props.data.displayType === 'color' ? 'none' : color
    }

    const getElement = () => {
        if (props.data) {
            if (!props.data.displayType && !props.data.dateRange) {
                return <p className={joinClasses(props.data.length > 25 && CellStyles.breakMobile)}>{props.data}</p>
            } else if (props.data.displayType === 'comment') {
                return <div
                    className={CellStyles.commentContainer}
                    onMouseEnter={() => setActiveStyle({
                        overflowY: 'scroll',
                        height: '80px',
                        padding: '20px 30px',
                        top: `${180 + (props.rowNum * 50)}px`
                    })}
                    onMouseLeave={() => setActiveStyle({
                        height: 0,
                        overflow: 'hidden',
                        padding: 0,
                        border: 'none',
                        boxShadow: 'none'
                    })}
                >
                    <p className={CellStyles.comment}>{props.data.text}</p>
                    <p ref={ref} style={activeStyle} className={CellStyles.fullComment}>{props.data.text}</p>
                </div>
            } else if (props.data.dateRange) {
                const ranges = props.data.text.split('-');
                return <>
                    <p style={{margin: 0}}>{ranges[0].trim()} -</p>
                    <p style={{margin: 0}}>{ranges[1].trim()}</p>
                </>
            } else {
                return <p className={CellStyles.status} style={statusStyle}>{props.data.text}</p>
            }
        } else {
            return <p>{'-'}</p>
        }
    }

    return (
        <div className={`${props.className}`} style={{...props.style, ...(props.data && props.data.dateRange) ? {flexDirection: 'column'} : {}}}>
            {getElement()}
        </div>
    )
}

export default Cell;