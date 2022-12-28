import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, TabularInfo, DashboardCard, GenerateReportModal } from "../../../components";

const requestsD = [
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
];

const attendanceD = [
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
];

const payrollD = [
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
    {
        Id: "Name",
        From: "Date",
        till: "Date",
        locationName: "Type",
    },
];

const Reports = (props) => {

    const router = useRouter();

    const [expandedMenu, setExpandedMenu] = useState("none");

    const [showModal, setShowModal] = useState(false);
    const [requestsData, setRequestsData] = useState(requestsD);
    const [attendanceData, setAttendanceData] = useState(attendanceD);
    const [payrollData, setPayrollData] = useState(payrollD);
    const [pageNo, setPageNo] = useState({
        "Payroll": 1,
        "Attendance": 1,
        "Location Holidays": 1
    });
    const [pageSize, setPageSize] = useState({
        "Payroll": 10,
        "Attendance": 10,
        "Location Holidays": 10
    });
    const [totalPages, setTotalPages] = useState({
        "Payroll": 1,
        "Attendance": 1,
        "Location Holidays": 1
    });
    const [totalEntries, setTotalEntries] = useState({
        "Payroll": 0,
        "Attendance": 0,
        "Location Holidays": 0
    });
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "REPORTS",
            activeSubMenu: "none",
        });
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.key) setUserId(router.query.id);
    }, [router.isReady, router.query]);

    const getActions = (tableType) => {
        return {
            key: "Download",
            action: (id) => {
                setEditId(id);
                switch (tableType) {
                    case "request":
                        setShowModalRequest(true);
                        break;
                    case "attendance":
                        setShowModalTimeSheet(true);
                        break;
                    case "shift":
                        setShowModalShift(true);
                        BrandingWatermark;
                }
            },
        };
    };

    const handleExpansion = (clickedMenu) => {
        if (clickedMenu === expandedMenu) {
            setExpandedMenu("none");
        } else {
            setExpandedMenu(clickedMenu);
        }
    };



    const getExpandableData = (title, data, actions) => {
        return (
            <DashboardCard style={{ marginTop: "20px" }}>
                <TabularInfo
                    data={data}
                    title={title}
                    expanded={expandedMenu === title.toLowerCase()}
                    toggleExpansion={() => handleExpansion(title.toLowerCase())}
                    expandable
                    actions={actions}
                    pagination
                    totalEntries={totalEntries[title]}
                    pageSize={pageSize[title]}
                    totalPages={totalPages[title]}
                    pageNo={pageNo[title]}
                    setPageNo={(no) => setPageNo({ ...pageNo, title: no })}
                    showSearch
                    showFilter
                />
            </DashboardCard>
        );
    };

    return (
        <>
            <WaawNoIndexHead title="Reports" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Reports</h1>
                <div>
                    {
                    props.user.role === "MANAGER" || props.user.role === "ADMIN" && 
                            <>
                                <Button type="plain" style={{ marginRight: "15px" }} onClick={() => setShowModal(true)}>
                                    + Generate Report Modal
                                </Button>
                            </>
                        }
                </div>
            </div>
            {getExpandableData("Payroll", payrollData, getActions("shift"))}
            {getExpandableData("Attendance", attendanceData, getActions("attendance"))}
            {getExpandableData("Location Holidays", requestsData, getActions("request"))}
            <GenerateReportModal showModal={showModal} setShowModal={setShowModal}  setToasterInfo={props.setToasterInfo} role={props.user.role} setReloadData={setReloadData}/>
        </>
    );
};

export default Reports;
