import {useState} from "react";
import {CalendarStyles} from "../../../styles/elements";
import {PlayCircleOutline, PauseCircleOutline, Close, CalendarViewDay} from "@mui/icons-material";

const ClockModal = (props) => {
    const [play, setPlay] = useState(false);

    return (
        <div className={CalendarStyles.modalBackdrop}>
            <div className={CalendarStyles.activeEventMain}>
                <h3 className={CalendarStyles.date}>10th June</h3>
                <Close className={CalendarStyles.closeIcon} onClick={props.closeClockModal} />
                <div className={CalendarStyles.activeEvent}>
                    <div>
                        <p className={CalendarStyles.subTitle}>Clock In</p>
                        <p className={CalendarStyles.attribute}>9:29 AM</p>
                    </div>
                    <div>
                        <p className={CalendarStyles.subTitle}>Duration</p>
                        <p className={CalendarStyles.attribute}>0h 10m 29s</p>
                    </div>
                </div>
                <div onClick={() => setPlay(!play)} style={{display: "flex"}}>
                    {play ? <PauseCircleOutline style={{width: "35px", height: "35px", margin: "auto"}} /> : <PlayCircleOutline style={{width: "35px", height: "35px", margin: "auto"}} />}
                </div>
            </div>
        </div>
    );
};

export default ClockModal;
