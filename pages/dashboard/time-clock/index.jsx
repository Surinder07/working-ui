import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, DashboardCard, TabularInfo, Clock, Button, EmployeeAttendanceFilter } from "../../../components";
import { Warning } from "@mui/icons-material";
import { timesheetService } from "../../../services";
import { fetchAndHandlePage, getTimesheetListing } from "../../../helpers";

const timeClock = (props) => {

    const [data, setData] = useState();
    const [reloadData, setReloadData] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [filters, setFilters] = useState({});
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [start, setStart] = useState("--:--");
    const [startDate, setStartDate] = useState(new Date());
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
                    setReloadData(true);
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
                    setReloadData(true);
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
                    if (!res) {
                        setPlaying(false);
                        setDisableTimer(false)
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

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize, filters]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        fetchAndHandlePage(() => timesheetService.getAll(pageNo, pageSize, filters),
            setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
            getTimesheetListing, props.user.role);

    }

    return (
        <>
            <WaawNoIndexHead title="Time Clock" />
            {
                props.pageLoading ? <></> :
                    <>
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
                        <EmployeeAttendanceFilter
                            showModal={showFilterModal}
                            setShowModal={setShowFilterModal}
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <DashboardCard style={{ marginTop: "20px" }}>
                            <TabularInfo
                                title="Time Sheet"
                                description="Tabular list of all Time Sheet."
                                data={data}
                                pagination
                                totalEntries={totalEntries}
                                pageSize={pageSize}
                                totalPages={totalPages}
                                pageNo={pageNo}
                                setPageNo={setPageNo}
                                showFilter
                                setShowFilterModal={setShowFilterModal}
                            />
                        </DashboardCard>
                    </>
            }
        </>
    );
};

export default timeClock;
