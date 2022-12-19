import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DashboardStyles} from "../../../styles/pages";
import {WaawNoIndexHead, Button, TabularInfo, DashboardCard, GenerateReportModal} from "../../../components";

const Reports = (props) => {
    const router = useRouter();

    const [expandedMenu, setExpandedMenu] = useState("none");

    const [showModal, setShowModal] = useState(true);

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

    const requestsData = [
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

    const attendanceData = [
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

    const payrollData = [
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

    const getExpandableData = (title, data, actions) => {
        return (
            <DashboardCard style={{marginTop: "20px"}}>
                <TabularInfo
                    data={data}
                    title={title}
                    expanded={expandedMenu === title.toLowerCase()}
                    toggleExpansion={() => handleExpansion(title.toLowerCase())}
                    expandable
                    actions={actions}
                    pagination
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
                    {props.user.role === "MANAGER" ||
                        (props.user.role === "ADMIN" && (
                            <>
                                <Button type="plain" style={{marginRight: "15px"}}>
                                    + Generate Payroll
                                </Button>
                                <Button type="plain">+ Generate Attendance</Button>
                            </>
                        ))}
                </div>
            </div>
            {getExpandableData("Payroll", payrollData, getActions("shift"))}
            {getExpandableData("Attendance", attendanceData, getActions("attendance"))}
            {getExpandableData("Location Holidays", requestsData, getActions("request"))}
            <GenerateReportModal showModal={showModal} setShowModal={setShowModal} />
        </>
    );
};

export default Reports;
