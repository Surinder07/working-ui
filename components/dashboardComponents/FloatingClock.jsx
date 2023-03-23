import { useEffect, useState } from "react";
import { PlayCircleOutline, StopCircleOutlined, Close, AvTimer, Warning } from "@mui/icons-material";
import { ClockStyles } from "../../styles/elements";
import { joinClasses } from "../../helpers";

const FloatingClock = (props) => {

    const [showModal, setShowModal] = useState(false);

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
                        <h1>{startDate.toLocaleString('default', { month: 'long', day: 'numeric', timezone: props.timezone })}</h1>
                        <Close className={ClockStyles.closeIcon} onClick={handleClose} />
                        <div className={ClockStyles.modalTimer}>
                            <div>
                                <h2>Clock In</h2>
                                <h3>{props.timer.start}</h3>
                            </div>
                            <div>
                                <h2>Duration</h2>
                                <h3>{props.timer.duration}</h3>
                            </div>
                        </div>
                        <p className={ClockStyles.warnMessage}>
                            <Warning className={ClockStyles.warnIcon} />
                            Please Note you can only start timer when a shift is assigned to you.
                        </p>
                        {
                            (!props.timer.disabled && props.timer.playing) ?
                                <StopCircleOutlined className={ClockStyles.playPauseButton} onClick={() => props.clockOut()} /> :
                                <PlayCircleOutline className={ClockStyles.playPauseButton} onClick={() => props.clockIn()} />
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default FloatingClock;
