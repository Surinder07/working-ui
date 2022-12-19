import { useEffect } from "react";
import { useRef, useState } from "react";
import { CellStyles } from "../../../styles/elements";

const Status = (props) => {

    const ref = useRef();
    const [commentHeight, setCommentHeight] = useState(0);
    const [activeStyle, setActiveStyle] = useState();

    useEffect(() => {
        if (props.data.displayType && props.data.displayType === 'comment') {
            setCommentHeight(ref.current.clientHeight);
        }
    }, [ref.current, props.data]);

    const getColor = () => {
        switch (props.data.status) {
            case 'ok':
                return '#29CC97';
            case 'warn':
                return '#E4BE3D';
            case 'bad':
                return '#CC5252';
        }
    }

    const statusStyle = {
        color: props.data && props.data.displayType === 'color' ? getColor() : '#FFF',
        backgroundColor: props.data && props.data.displayType === 'color' ? 'none' : getColor()
    }

    const getElement = () => {
        if (!props.data.displayType) {
            return props.data
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
        } else {
            return <p className={CellStyles.status} style={statusStyle}>{props.data.text}</p>
        }
    }

    return (
        <div className={`${props.className}`} style={props.style}>
            {
                getElement()
            }
        </div>
    )
}

export default Status;