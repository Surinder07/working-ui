import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardStyles } from "../../../styles/pages";
import Link from "next/link";
import {
    WaawNoIndexHead,
    UserPreferenceCard,
    TabularInfo,
    DashboardCard,
    ProfileImage,
    EditableInput,
    EditTimesheetModal,
    EditShiftModal,
    EditRequestsModal,
} from "../../../components";
import { BrandingWatermark } from "@mui/icons-material";

const Employees = (props) => {

    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [mobile, setMobile] = useState({
        countryCode: "",
        mobile: "",
        country: "",
    });
    const [showModalTimeSheet, setShowModalTimeSheet] = useState(false);
    const [showModalShift, setShowModalShift] = useState(false);
    const [showModalRequest, setShowModalRequest] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState("none");
    const [editOn, setEditOn] = useState(false);
    const [editId, setEditId] = useState("");

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
            activeSubMenu: "none",
        });
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.key) setUserId(router.query.id);
    }, [router.isReady, router.query]);

    const getActions = (tableType) => {
        return {
            key: 'Edit',
            action: (id) => {
                setEditId(id);
                switch (tableType) {
                    case 'request':
                        setShowModalRequest(true);
                        break;
                    case 'attendance':
                        setShowModalTimeSheet(true);
                        break;
                    case 'shift':
                        setShowModalShift(true);
                        BrandingWatermark;
                }
            }
        }
    }

    const handleExpansion = (clickedMenu) => {
        if (clickedMenu === expandedMenu) {
            setExpandedMenu("none");
        } else {
            setExpandedMenu(clickedMenu);
        }
    };

    const requestsData = [
        {
            requestId: "6476475",
            requestType: "request",
            initiationDate: "01/01/2023",
            location: "Canada",
            initiatedBy: "Rahul",
            assignedTo: "Rajiv",
            status: "xyz",
        },
        {
            requestId: "6476476",
            requestType: "request",
            initiationDate: "01/02/2023",
            location: "India",
            initiatedBy: "Arpit",
            assignedTo: "Sandeep",
            status: "xyz",
        },
        {
            requestId: "6476477",
            requestType: "request",
            initiationDate: "03/01/2023",
            location: "USA",
            initiatedBy: "Albert",
            assignedTo: "Edward",
            status: "xyz",
        },
        {
            requestId: "6476478",
            requestType: "request",
            initiationDate: "02/02/2023",
            location: "Mexico",
            initiatedBy: "Ethan",
            assignedTo: "Ishac",
            status: "xyz",
        },
    ];

    const attendanceData = [
        {
            date: "01/01/2023",
            inTime: "10:00 AM",
            outTime: "05:00 PM",
            inDate: "01/01/2023",
            outDate: "01/01/2023",
            duration: "7 Hrs",
            entryType: "Entry",
            comments: "N/A",
        },
        {
            date: "01/01/2023",
            inTime: "10:00 AM",
            outTime: "05:00 PM",
            inDate: "01/01/2023",
            outDate: "01/01/2023",
            duration: "7 Hrs",
            entryType: "Entry",
            comments: "N/A",
        },
        {
            date: "01/01/2023",
            inTime: "10:00 AM",
            outTime: "05:00 PM",
            inDate: "01/01/2023",
            outDate: "01/01/2023",
            duration: "7 Hrs",
            entryType: "Entry",
            comments: "N/A",
        },
        {
            date: "01/01/2023",
            inTime: "10:00 AM",
            outTime: "05:00 PM",
            inDate: "01/01/2023",
            outDate: "01/01/2023",
            duration: "7 Hrs",
            entryType: "Entry",
            comments: "N/A",
        },
    ];

    const shiftData = [
        {
            shiftdate: "01/01/2023",
            shiftName: "Day",
            startTime: "10:00 AM",
            endTime: "05:00 PM",
            workingHours: "7 Hrs",
            status: "Status",
            comments: "N/A",
        },
        {
            shiftdate: "01/01/2023",
            shiftName: "Day",
            startTime: "10:00 AM",
            endTime: "05:00 PM",
            workingHours: "7 Hrs",
            status: "Status",
            comments: "N/A",
        },
        {
            shiftdate: "01/01/2023",
            shiftName: "Day",
            startTime: "10:00 AM",
            endTime: "05:00 PM",
            workingHours: "7 Hrs",
            status: "Status",
            comments: "N/A",
        },
        {
            shiftdate: "01/01/2023",
            shiftName: "Day",
            startTime: "10:00 AM",
            endTime: "05:00 PM",
            workingHours: "7 Hrs",
            status: "Status",
            comments: "N/A",
        },
    ];

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
                    showSearch
                    showFilter
                />
            </DashboardCard>
        );
    };

    return (
        <>
            <WaawNoIndexHead title="Employee Details" />
            <EditTimesheetModal
                showModal={showModalTimeSheet}
                setShowModal={setShowModalTimeSheet}
                id={editId}
            />
            <EditShiftModal
                showModal={showModalShift}
                setShowModal={setShowModalShift}
                id={editId}
            />
            <EditRequestsModal
                showModal={showModalRequest}
                setShowModal={setShowModalRequest}
                id={editId}
            />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>
                    <Link
                        href="/dashboard/employees"
                        style={{ color: "#535255" }}
                    >
                        Employees
                    </Link>
                    {` > Employee Details`}
                </h1>
            </div>
            {/* Employee Personal Details */}
            <UserPreferenceCard
                title="Personal Details"
                isEditable
                editOn={editOn}
                setEditOn={setEditOn}
            >
                <div className={DashboardStyles.personalContainer}>
                    <ProfileImage size="big" />
                    <div className={DashboardStyles.personalContent}>
                        <EditableInput label="First Name" type="text" editOn />
                        <EditableInput label="Last Name" type="text" editOn />
                        <EditableInput
                            label="Mobile"
                            type="mobile"
                            value={mobile}
                            setValue={setMobile}
                            editOn
                        />
                        <EditableInput label="Email" type="text" editOn />
                        <EditableInput label="Employee Id" type="text" editOn />
                        <EditableInput label="Location" type="text" editOn />
                        <EditableInput label="Role" type="text" editOn />
                        <EditableInput
                            label="Employee type"
                            type="text"
                            editOn
                        />
                    </div>
                </div>
            </UserPreferenceCard>
            {getExpandableData("Preference")}
            {getExpandableData("Shifts", shiftData, getActions('shift'))}
            {getExpandableData("Requests", requestsData, getActions('request'))}
            {getExpandableData("Attendance", attendanceData, getActions('attendance'))}
        </>
    );
};

export default Employees;
