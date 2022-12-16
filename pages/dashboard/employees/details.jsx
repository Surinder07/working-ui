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
    EmployeePreference,
} from "../../../components";

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

const preferences = {
    mondayStartTime: '10:00',
    mondayEndTime: '05:00',
    tuesdayStartTime: '10:00',
    tuesdayEndTime: '05:00',
    wednesdayStartTime: '10:00',
    wednesdayEndTime: '05:00',
    thursdayStartTime: '10:00',
    thursdayEndTime: '05:00',
    fridayStartTime: '10:00',
    fridayEndTime: '05:00',
    saturdayStartTime: '10:00',
    saturdayEndTime: '05:00',
    sundayStartTime: '10:00',
    sundayEndTime: '05:00',
    wagesPerHour: 22.3,
    wagesCurrency: 'CAD',
}

const Employees = (props) => {

    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [mobile, setMobile] = useState({
        countryCode: "",
        mobile: "",
        country: "",
    });
    const [initialMobile, setInitialMobile] = useState({
        countryCode: "",
        mobile: "",
        country: "",
    });
    const [showModalTimeSheet, setShowModalTimeSheet] = useState(false);
    const [showModalShift, setShowModalShift] = useState(false);
    const [showModalRequest, setShowModalRequest] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState("none");
    const [personalEditOn, setPersonalEditOn] = useState(false);
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
                        break;
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
                    <Link href="/dashboard/employees" style={{ color: "#535255" }}>Employees</Link>
                    {` > Employee Details`}
                </h1>
            </div>
            {/* Employee Personal Details */}
            <UserPreferenceCard
                title="Personal Details"
                isEditable
                editOn={personalEditOn}
                setEditOn={setPersonalEditOn}
            >
                <div className={DashboardStyles.personalContainer}>
                    <ProfileImage size="big" />
                    <div className={DashboardStyles.personalContent}>
                        <EditableInput label="First Name" type="text" editOn={personalEditOn} />
                        <EditableInput label="Last Name" type="text" editOn={personalEditOn} />
                        <EditableInput
                            label="Mobile"
                            type="mobile"
                            value={mobile}
                            initialValue={initialMobile}
                            setValue={setMobile}
                            editOn={personalEditOn}
                        />
                        <EditableInput label="Email" type="text" editOn={personalEditOn} />
                        <EditableInput label="Employee Id" type="text" editOn={personalEditOn} />
                        <EditableInput label="Location" type="text" editOn={personalEditOn} />
                        <EditableInput label="Role" type="text" editOn={personalEditOn} />
                        <EditableInput
                            label="Employee type"
                            type="text"
                            editOn={personalEditOn}
                        />
                    </div>
                </div>
            </UserPreferenceCard>
            <EmployeePreference
                data={preferences}
                expanded={expandedMenu === 'preferences'}
                toggleExpansion={() => handleExpansion('preferences')}
            />
            {getExpandableData("Shifts", shiftData, getActions('shift'))}
            {getExpandableData("Requests", requestsData, getActions('request'))}
            {getExpandableData("Attendance", attendanceData, getActions('attendance'))}
        </>
    );
};

export default Employees;
