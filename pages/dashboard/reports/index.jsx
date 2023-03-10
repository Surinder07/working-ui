import {useEffect, useRef, useState} from "react";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, Button, TabularInfo, DashboardCard, GenerateReportModal, PaginationDropdown, ReportsFilter} from "../../../components";
import {reportsService} from "../../../services";
import {fetchAndHandlePage, getReportListing} from "../../../helpers";
import Link from "next/link";

const Reports = (props) => {
    const fileRef = useRef();

    const [expandedMenu, setExpandedMenu] = useState("none");

    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [requestsData, setRequestsData] = useState();
    const [attendanceData, setAttendanceData] = useState();
    const [payrollData, setPayrollData] = useState();
    const [attendanceFilter, setAttendanceFilter] = useState({reportType: "ATTENDANCE"});
    const [payrollFilter, setPayrollFilter] = useState({reportType: "PAYROLL"});
    const [holidayFilter, setHolidayFilter] = useState({reportType: "HOLIDAYS"});
    const [pageNo, setPageNo] = useState({
        Payroll: 1,
        Attendance: 1,
        "Location Holidays": 1,
    });
    const [totalPages, setTotalPages] = useState({
        Payroll: 1,
        Attendance: 1,
        "Location Holidays": 1,
    });
    const [totalEntries, setTotalEntries] = useState({
        Payroll: 0,
        Attendance: 0,
        "Location Holidays": 0,
    });
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "REPORTS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(["ADMIN", "MANAGER"]);
    }, []);

    useEffect(() => {
        if (props.user.role) fetchData();
    }, [pageNo, attendanceFilter, payrollFilter, holidayFilter]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData]);

    const actions = {
        key: "Download",
        action: (id) => {
            reportsService.download(id).then((res) => {
                if (res.error) {
                } else {
                    const url = window.URL.createObjectURL(res);
                    fileRef.current.href = url;
                    fileRef.current.target = "_blank";
                    fileRef.current.download = "Report_" + new Date() + ".xls";
                    document.getElementById("file_download").click();
                    window.URL.revokeObjectURL(url);
                }
            });
        },
    };

    const handleExpansion = (clickedMenu) => {
        if (clickedMenu === expandedMenu) {
            setExpandedMenu("none");
        } else {
            setExpandedMenu(clickedMenu);
        }
    };

    const fetchData = () => {
        try {
            fetchAndHandlePage(
                () => reportsService.getAll(pageNo.Attendance, 5, attendanceFilter),
                setAttendanceData,
                (e) => setTotalEntries({...totalEntries, Attendance: e}),
                (e) => setTotalPages({...totalPages, Attendance: e}),
                props.setPageLoading,
                props.setToasterInfo,
                getReportListing,
                props.user.role
            );
            if (props.user.role === "ADMIN") {
                fetchAndHandlePage(
                    () => reportsService.getAll(pageNo.Payroll, 5, payrollFilter),
                    setPayrollData,
                    (e) => setTotalEntries({...totalEntries, Payroll: e}),
                    (e) => setTotalPages({...totalPages, Payroll: e}),
                    props.setPageLoading,
                    props.setToasterInfo,
                    getReportListing,
                    props.user.role
                );
                fetchAndHandlePage(
                    () => reportsService.getAll(pageNo["Location Holidays"], 5, holidayFilter),
                    setRequestsData,
                    (e) => setTotalEntries({...totalEntries, "Location Holidays": e}),
                    (e) => setTotalPages({...totalPages, "Location Holidays": e}),
                    props.setPageLoading,
                    props.setToasterInfo,
                    getReportListing,
                    props.user.role
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getExpandableData = (title, description, data) => {
        return (
            <DashboardCard style={{marginTop: "20px"}}>
                <TabularInfo
                    data={data}
                    title={title}
                    description={description}
                    screenType={props.screenType}
                    expanded={expandedMenu === title.toLowerCase()}
                    toggleExpansion={() => handleExpansion(title.toLowerCase())}
                    expandable={props.user.role === "ADMIN"}
                    actions={actions}
                    pagination
                    totalEntries={totalEntries[title]}
                    pageSize={5}
                    totalPages={totalPages[title]}
                    pageNo={pageNo[title]}
                    setPageNo={(no) =>
                        setPageNo(() => {
                            let temp = pageNo;
                            temp[title] = no;
                            setPageNo(temp);
                        })
                    }
                    setShowFilterModal={setShowFilterModal}
                    showFilter
                />
            </DashboardCard>
        );
    };

    return (
        <>
            <WaawNoIndexHead title="Reports" />
            {props.pageLoading ? (
                <></>
            ) : (
                <>
                    <GenerateReportModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setToasterInfo={props.setToasterInfo}
                        role={props.user.role}
                        setReloadData={setReloadData}
                        setPageLoading={props.setPageLoading}
                    />
                    <ReportsFilter
                        showModal={showFilterModal}
                        setShowModal={setShowFilterModal}
                        role={props.user.role}
                        attendanceFilter={attendanceFilter}
                        setAttendanceFilter={setAttendanceFilter}
                        payrollFilter={payrollFilter}
                        setPayrollFilter={setPayrollFilter}
                        holidayFilter={holidayFilter}
                        setHolidayFilter={setHolidayFilter}
                        expandedMenu={expandedMenu}
                    />
                    <Link href="" ref={fileRef} id="file_download" hidden={true} />
                    <div className={DashboardStyles.dashboardTitles}>
                        <h1>Reports</h1>
                        <div className={DashboardStyles.rightContainer}>
                            {/* <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace /> */}
                            {(props.user.role === "MANAGER" || props.user.role === "ADMIN") && (
                                <>
                                    <Button type="plain" onClick={() => setShowModal(true)}>
                                        + Generate New Report
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    {props.user.role === "ADMIN" && getExpandableData("Payroll", "Tabular list of existing Payroll Reports", payrollData)}
                    {getExpandableData("Attendance", "Tabular list of existing Attendance Reports", attendanceData)}
                    {props.user.role === "ADMIN" && getExpandableData("Location Holidays", "Tabular list of existing Location Holiday Reports", requestsData)}
                </>
            )}
        </>
    );
};

export default Reports;
