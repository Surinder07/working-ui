import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, Clock, Button } from "../../../components";
import { Warning } from "@mui/icons-material";
import { timesheetService } from "../../../services";

const timesheet = [
    {
        inDate: '02/01/2023',
        inTime: '10:00',
        outDate: '02/01/2023',
        outTime: '05:30',
        type: 'daily',
        comment: 'N/A'
    },
    {
        inDate: '03/01/2023',
        inTime: '10:30',
        outDate: '04/01/2023',
        outTime: '06:00',
        type: 'daily',
        comment: 'N/A'
    },
    {
        inDate: '04/01/2023',
        inTime: '11:00',
        outDate: '04/01/2023',
        outTime: '06:30',
        type: 'daily',
        comment: 'N/A'
    },
]

const timeClock = (props) => {

    const [data, setData] = useState(timesheet);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [start, setStart] = useState("hh:mm");
    const [startDate, setStartDate] = useState("hh:mm");
    const [duration, setDuration] = useState("00:00:00");
    const [playing, setPlaying] = useState(false);
    const [disableTimer, setDisableTimer] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "TIMECLOCK",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["MANAGER", "EMPLOYEE"]);
        checkActiveTimer();
    }, []);

    const startTimer = () => {
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
            })
    }

    const stopTimer = () => {
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
            });
    }

    const checkActiveTimer = () => {
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
                    if (res === null) return;
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
            })
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

    const actions = [
        {
            key: "Add TimeSheet",
            action: () => console.log("Add TimeSheet will be added")
        },
        {
            key: "Edit",
            action: () => console.log("Api call will be added here"),
        },
        {
            key: "Delete",
            action: () => console.log("Api call will be added here"),
        },
    ];

    return (
        <>
            <WaawNoIndexHead title="Time Clock" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Time Clock</h1>
            </div>
            <DashboardCard className={DashboardStyles.timerCard} style={{ marginTop: "20px" }}>
                <div>
                    <h1>Time Clock</h1>
                    <div className={DashboardStyles.timerContainer}>
                        <div style={{ paddingRight: '40px' }} className={DashboardStyles.subTimerContainer}>
                            <h2>Start</h2>
                            <h3>{start}</h3>
                        </div>
                        <div style={{ paddingLeft: '40px' }}>
                            <h2>Duration</h2>
                            <h3>{duration}</h3>
                        </div>
                    </div>
                    <div className={DashboardStyles.clockButtons}>
                        <Button type='dashboard' onClick={startTimer} disabled={playing || disableTimer}>Clock In</Button>
                        <div style={{ width: '30px' }}></div>
                        <Button type='dashboard' onClick={stopTimer} disabled={!playing || disableTimer}>Clock Out</Button>
                    </div>
                    <p className={DashboardStyles.warnMessage}>
                        <Warning className={DashboardStyles.warnIcon} />
                        Please Note you can only start timer once a day. Do not stop timer until shift is finished.
                    </p>
                </div>
                <Clock />
            </DashboardCard>
            <DashboardCard style={{ marginTop: "20px" }}>
                <TabularInfo
                    title="Time Sheet"
                    description="Tabular list of all Time Sheet."
                    data={data}
                    actions={actions}
                    pagination
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                    showFilter
                />
            </DashboardCard>
        </>
    );
};

export default timeClock;
