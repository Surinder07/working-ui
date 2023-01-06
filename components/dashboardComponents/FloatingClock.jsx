import { useEffect, useRef, useState } from "react";
import { PlayCircleOutline, StopCircleOutlined, Close, AvTimer, Warning } from "@mui/icons-material";
import { ClockStyles } from "../../styles/elements";
import { joinClasses } from "../../helpers";

const FloatingClock = (props) => {

    const modalRef = useRef();

    const [play, setPlay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState({
        hour: '00',
        minute: '00',
        second: '00'
    });
    const [startTime, setStartTime] = useState({
        hour: 'hh',
        minute: 'mm'
    })
    const [date, setDate] = useState("");

    useEffect(() => {
        setDate((new Date()).toLocaleString('default', { month: 'long', day: 'numeric' }))
    }, [])

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showModal])

    const handleClose = () => {
        document.body.style.overflow = "unset";
        setShowModal(false);
    };

    const toggleTimer = () => {
        if (play) {
            // disable button
            // stop timer
            setPlay(false);
            // enable button
        } else {
            // disable button
            // start timer
            setPlay(true);
            // enable button
        }
    }

    return (
        <>
            <div
                className={joinClasses(ClockStyles.clockIcon, showModal ? ClockStyles.activeClockContainer : ClockStyles.inactiveClockContainer)}
                onClick={() => {
                    setShowModal(!showModal);
                    document.body.style.overflow = "hidden";
                }}
            >
                <AvTimer className={ClockStyles.clock} />
            </div>
            {
                showModal &&
                <div className={ClockStyles.modalBackdrop}>
                    <div className={ClockStyles.modal}>
                        <h1>{date}</h1>
                        <Close className={ClockStyles.closeIcon} onClick={handleClose} />
                        <div className={ClockStyles.modalTimer}>
                            <div>
                                <h2>Clock In</h2>
                                <h3>{startTime.hour}:{startTime.minute}</h3>
                            </div>
                            <div>
                                <h2>Duration</h2>
                                <h3>{time.hour}:{time.minute}:{time.second}</h3>
                            </div>
                        </div>
                        <p className={ClockStyles.warnMessage}>
                            <Warning className={ClockStyles.warnIcon} />
                            Please Note you can only start timer once a day. Do not stop timer until shift is finished.
                        </p>
                        {
                            play ?
                                <StopCircleOutlined className={ClockStyles.playPauseButton} onClick={toggleTimer} /> :
                                <PlayCircleOutline className={ClockStyles.playPauseButton} onClick={toggleTimer} />
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default FloatingClock;
