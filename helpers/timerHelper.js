const { timesheetService } = require("../services");

export const startTimer = (setPageLoading, setToasterInfo, timezone, setReloadData, setData, data) => {
    setPageLoading(true);
    timesheetService.startTimer()
        .then(res => {
            if (res.error) {
                setToasterInfo({
                    error: true,
                    title: "Error!",
                    message: res.message,
                })
            } else {
                const now = new Date()
                const timeString = now.toLocaleTimeString('en', { timeZone: timezone });
                const timeArray = timeString.split(' ')[0].split(':');
                setData({
                    ...data,
                    start: `${timeArray[0]}:${timeArray[1]}`,
                    startDate: now,
                    playing: true
                })
                setReloadData && setReloadData(true);
            }
            setPageLoading(false)
        })
}

export const stopTimer = (setPageLoading, setToasterInfo, setReloadData, setData, data) => {
    setPageLoading(true)
    timesheetService.stopTimer()
        .then(res => {
            if (res.error) {
                setToasterInfo({
                    error: true,
                    title: "Error!",
                    message: res.message,
                })
            } else {
                timesheetService.getActiveTimer()
                    .then(res => {
                        if (!res.error && res.upcomingShift) {
                            setData({
                                ...data,
                                playing: false,
                                disabled: false
                            });
                        } else {
                            setData({
                                ...data,
                                playing: false,
                                disabled: true
                            });
                        }
                    })

                setReloadData && setReloadData(true);
            }
            setPageLoading(false)
        });
}

export const checkActiveTimer = (setPageLoading, setToasterInfo, setData, data, stompMsg, setStompMsg) => {
    setPageLoading(true);
    timesheetService.getActiveTimer()
        .then(res => {
            if (res.error) {
                setToasterInfo({
                    error: true,
                    title: "Error!",
                    message: res.message,
                })
            }
            else {
                if (!res) {
                    setData({
                        ...data,
                        playing: false,
                        start: "--:--",
                        startDate: new Date(),
                        duration: "00:00:00",
                        timeToday: 0,
                        todayDuration: "00:00:00"
                    });
                } else {
                    var newDate = new Date((new Date(new Date().getTime() + (res.totalTimeWorkedToday * 1000))) - new Date());
                    var hour = newDate.getUTCHours().toString().padStart(2, '0');
                    var min = newDate.getUTCMinutes().toString().padStart(2, '0');
                    var sec = newDate.getUTCSeconds().toString().padStart(2, '0');
                    if (res.startDate !== null) {
                        const date = new Date(Date.parse(res.startTimestamp));
                        setData({
                            ...data,
                            playing: true,
                            disabled: false,
                            start: res.startTime,
                            startDate: date,
                            timeToday: res.totalTimeWorkedToday,
                            todayDuration: `${hour}:${min}:${sec}`
                        });
                    } else {
                        setData({
                            ...data,
                            timeToday: res.totalTimeWorkedToday,
                            todayDuration: `${hour}:${min}:${sec}`
                        })
                    }
                    if (res.upcomingShift) {
                        setStompMsg({
                            ...stompMsg,
                            timesheet: {
                                timerActive: true,
                                allowAfterSeconds: res.shiftsAfterSeconds
                            }
                        })
                    }
                }
            }
            setPageLoading(false);
        }).catch(() => {
            setPageLoading(false);
        })
}

export const refreshTimer = (data, setData) => {
    const d = new Date();
    const date = new Date(d - data.startDate);
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const min = date.getUTCMinutes().toString().padStart(2, '0');
    const sec = date.getUTCSeconds().toString().padStart(2, '0');
    const newDate = new Date(date.getTime() + (data.timeToday * 1000));
    const hourToday = newDate.getUTCHours().toString().padStart(2, '0');
    const minToday = newDate.getUTCMinutes().toString().padStart(2, '0');
    const secToday = newDate.getUTCSeconds().toString().padStart(2, '0');
    setData({
        ...data,
        duration: `${hour}:${min}:${sec}`,
        todayDuration: `${hourToday}:${minToday}:${secToday}`
    });
}