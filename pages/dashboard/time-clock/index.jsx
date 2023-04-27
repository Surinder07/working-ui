import { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import {
    WaawNoIndexHead,
    DashboardCard,
    TabularInfo,
    Clock,
    Button,
    TimesheetFilter
} from "../../../components";
import { Warning } from "@mui/icons-material";
import { timesheetService } from "../../../services";
import { fetchAndHandlePage, getTimesheetListing } from "../../../helpers";

const timeClock = (props) => {

    const [data, setData] = useState();
    const [reloadData, setReloadData] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const pageSize = 10;
    // const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [filters, setFilters] = useState({});
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "TIMECLOCK",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["MANAGER", "EMPLOYEE"]);
    }, []);

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
                            <div className={DashboardStyles.timerConsole}>
                                <h2 style={{ fontWeight: 700 }}>Time worked today</h2>
                                <h3 style ={{borderBottom: '2px #33333333 solid', width: '50%', textAlign: 'center'}}>{props.timer.todayDuration}</h3>
                                <h1 style={{ fontWeight: 700 }}>New Timer</h1>
                                <div className={DashboardStyles.timerContainer}>
                                    <div style={{ paddingRight: '40px' }} className={DashboardStyles.subTimerContainer}>
                                        <h2>Start</h2>
                                        <h3>{props.timer.start}</h3>
                                    </div>
                                    <div style={{ padding: '0 40px' }}>
                                        <h2>Duration</h2>
                                        <h3>{props.timer.duration}</h3>
                                    </div>
                                </div>
                                <div className={DashboardStyles.clockButtons}>
                                    <Button
                                        type='dashboard'
                                        onClick={() => props.clockIn(setReloadData)}
                                        disabled={props.timer.playing || props.timer.disabled}
                                    >Clock In</Button>
                                    <div style={{ width: '30px' }}></div>
                                    <Button
                                        type='dashboard'
                                        onClick={() => props.clockOut(setReloadData)}
                                        disabled={!props.timer.playing || props.timer.disabled}
                                    >Clock Out</Button>
                                </div>
                                <p className={DashboardStyles.warnMessage}>
                                    <Warning className={DashboardStyles.warnIcon} />
                                    Please Note you can only start timer when a shift is assigned to you.
                                </p>
                            </div>
                            <Clock timezone={props.user.timezone} />
                        </DashboardCard>
                        <TimesheetFilter
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
                                screenType={props.screenType}
                                setShowFilterModal={setShowFilterModal}
                            />
                        </DashboardCard>
                    </>
            }
        </>
    );
};

export default timeClock;
