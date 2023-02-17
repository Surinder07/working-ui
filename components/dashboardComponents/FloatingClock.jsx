import { useEffect, useState } from "react";
import { PlayCircleOutline, StopCircleOutlined, Close, AvTimer, Warning } from "@mui/icons-material";
import { ClockStyles } from "../../styles/elements";
import { joinClasses } from "../../helpers";
import { timesheetService } from "../../services";

const FloatingClock = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [start, setStart] = useState("--:--");
    const [startDate, setStartDate] = useState(new Date());
    const [duration, setDuration] = useState("00:00:00");
    const [playing, setPlaying] = useState(false);
    const [disableTimer, setDisableTimer] = useState(true);

    useEffect(() => {
        setStartDate(new Date());
        checkActiveTimer();
    }, [])

    const startTimer = () => {
        props.setPageLoading(true)
        timesheetService.startTimer()
            .then(res => {
                if (res.error) {
                    props.setToasterInfo({
                        error: true,
                        title: "Error!",
                        message: res.message,
                    })
                } else {
                    const now = new Date();
                    const timeString = now.toLocaleTimeString();
                    const timeArray = timeString.split(' ')[0].split(':');
                    setStart(`${timeArray[0]}:${timeArray[1]}`)
                    setStartDate(now);
                    setPlaying(true);
                }
                props.setPageLoading(false)
            })
    }

    const stopTimer = () => {
        props.setPageLoading(true)
        timesheetService.stopTimer()
            .then(res => {
                if (res.error) {
                    props.setToasterInfo({
                        error: true,
                        title: "Error!",
                        message: res.message,
                    })
                } else {
                    setPlaying(false);
                    setDisableTimer(true);
                }
                props.setPageLoading(false)
            });
    }

    const checkActiveTimer = () => {
        if (props.role !== 'ADMIN') {
            props.setPageLoading(true);
            timesheetService.getActiveTimer()
                .then(res => {
                    if (res.error) {
                        props.setToasterInfo({
                            error: true,
                            title: "Error!",
                            message: res.message,
                        })
                    }
                    else {
                        if (!res) {
                            setPlaying(false);
                            setDisableTimer(false);
                        } else {
                            setStart(res.startTime)
                            const date = new Date(Date.parse(res.startTimestamp));
                            setStartDate(date);
                            if (res.endDate == null) {
                                setPlaying(true);
                            } else {
                                var newDate = new Date(new Date(Date.parse(res.endTimestamp)) - date);
                                var hour = newDate.getUTCHours().toString().padStart(2, '0');
                                var min = newDate.getUTCMinutes().toString().padStart(2, '0');
                                var sec = newDate.getUTCSeconds().toString().padStart(2, '0');
                                setDuration(`${hour}:${min}:${sec}`);
                                setDisableTimer(true);
                            }
                        }
                    }
                    props.setPageLoading(false)
                }).catch(() => {
                    props.setPageLoading(false)
                })
        }
    }

    const refreshTimer = () => {
        var d = new Date();
        var date = new Date(d - startDate);
        var hour = date.getUTCHours().toString().padStart(2, '0');
        var min = date.getUTCMinutes().toString().padStart(2, '0');
        var sec = date.getUTCSeconds().toString().padStart(2, '0');
        setDuration(`${hour}:${min}:${sec}`);
    }

    useEffect(() => {
        if (playing) {
            const timerId = setInterval(refreshTimer, 1000);
            return function cleanup() {
                clearInterval(timerId);
            };
        }
    }, [playing]);

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
                        <h1>{startDate.toLocaleString('default', { month: 'long', day: 'numeric' })}</h1>
                        <Close className={ClockStyles.closeIcon} onClick={handleClose} />
                        <div className={ClockStyles.modalTimer}>
                            <div>
                                <h2>Clock In</h2>
                                <h3>{start}</h3>
                            </div>
                            <div>
                                <h2>Duration</h2>
                                <h3>{duration}</h3>
                            </div>
                        </div>
                        <p className={ClockStyles.warnMessage}>
                            <Warning className={ClockStyles.warnIcon} />
                            Please Note you can only start timer once a day. Do not stop timer until shift is finished.
                        </p>
                        {
                            !disableTimer && (
                                playing ?
                                    <StopCircleOutlined className={ClockStyles.playPauseButton} onClick={stopTimer} /> :
                                    <PlayCircleOutline className={ClockStyles.playPauseButton} onClick={startTimer} />
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default FloatingClock;
