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
    EmployeesShiftFilter,
    EmployeeAttendanceFilter,
} from "../../../components";
import { memberService } from "../../../services";
import { fetchAndHandle, fetchAndHandleGet } from "../../../helpers";
import { employeeTypeValues } from "../../../constants";

const requestsD = []

// const requestsD = [
//     {
//         requestId: "6476475",
//         requestType: "request",
//         initiationDate: "01/01/2023",
//         location: "Canada",
//         initiatedBy: "Rahul",
//         assignedTo: "Rajiv",
//         status: "xyz",
//         history: [
//             {
//                 title: 'Xyz Raised a Request',
//                 description: 'Request for early leave on the next to next week',
//                 date: '29th August,2022',
//                 status: 'bad'
//             },
//             {
//                 title: 'Xyz Raised a Request',
//                 description: 'Request for early leave on the next to next week',
//                 date: '29th August,2022',
//                 status: 'basic'
//             },
//             {
//                 title: 'Xyz Raised a Request',
//                 description: 'Request for early leave on the next to next week',
//                 date: '29th August,2022',
//                 status: 'ok'
//             }
//         ]
//     }
// ];

const attendanceD = [];

// const attendanceD = [
//     {
//         date: "01/01/2023",
//         inTime: "10:00 AM",
//         outTime: "05:00 PM",
//         inDate: "01/01/2023",
//         outDate: "01/01/2023",
//         duration: "7 Hrs",
//         entryType: "Entry",
//         comments: "N/A",
//     },
//     {
//         date: "01/01/2023",
//         inTime: "10:00 AM",
//         outTime: "05:00 PM",
//         inDate: "01/01/2023",
//         outDate: "01/01/2023",
//         duration: "7 Hrs",
//         entryType: "Entry",
//         comments: "N/A",
//     },
//     {
//         date: "01/01/2023",
//         inTime: "10:00 AM",
//         outTime: "05:00 PM",
//         inDate: "01/01/2023",
//         outDate: "01/01/2023",
//         duration: "7 Hrs",
//         entryType: "Entry",
//         comments: "N/A",
//     },
//     {
//         date: "01/01/2023",
//         inTime: "10:00 AM",
//         outTime: "05:00 PM",
//         inDate: "01/01/2023",
//         outDate: "01/01/2023",
//         duration: "7 Hrs",
//         entryType: "Entry",
//         comments: "N/A",
//     },
// ];

const shiftD = []

// const shiftD = [
//     {
//         shiftdate: "01/01/2023",
//         shiftName: "Day",
//         startTime: "10:00 AM",
//         endTime: "05:00 PM",
//         workingHours: "7 Hrs",
//         status: "Status",
//         comments: "N/A",
//     },
//     {
//         shiftdate: "01/01/2023",
//         shiftName: "Day",
//         startTime: "10:00 AM",
//         endTime: "05:00 PM",
//         workingHours: "7 Hrs",
//         status: "Status",
//         comments: "N/A",
//     },
//     {
//         shiftdate: "01/01/2023",
//         shiftName: "Day",
//         startTime: "10:00 AM",
//         endTime: "05:00 PM",
//         workingHours: "7 Hrs",
//         status: "Status",
//         comments: "N/A",
//     },
//     {
//         shiftdate: "01/01/2023",
//         shiftName: "Day",
//         startTime: "10:00 AM",
//         endTime: "05:00 PM",
//         workingHours: "7 Hrs",
//         status: "Status",
//         comments: "N/A",
//     },
// ];

const Employees = (props) => {

    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [mobile, setMobile] = useState({ countryCode: "", mobile: "", country: "" });
    const [initialMobile, setInitialMobile] = useState({ countryCode: "", mobile: "", country: "" });
    const [firstName, setFirstName] = useState("");
    const [initialFirstName, setInitialFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [location, setLocation] = useState("");
    const [initialLocation, setInitialLocation] = useState("");
    const [role, setRole] = useState("");
    const [initialRole, setInitialRole] = useState("");
    const [employeeType, setEmployeeType] = useState("");
    const [initialEmployeeType, setInitialEmployeeType] = useState("");
    const [employeePreferenceData, setEmployeePreferenceData] = useState({});

    // Pagination data states
    const [attendanceData, setAttendanceData] = useState(attendanceD);
    const [shiftData, setShiftData] = useState(shiftD);
    const [requestsData, setRequestsData] = useState(requestsD);

    // Error states 
    const [errorMobile, setErrorMobile] = useState({});
    const [errorFirstName, setErrorFirstName] = useState({});
    const [errorLastName, setErrorLastName] = useState({});
    const [errorRole, setErrorRole] = useState({});

    // Modal States
    const [showModalTimeSheet, setShowModalTimeSheet] = useState(false);
    const [showModalShift, setShowModalShift] = useState(false);
    const [showModalRequest, setShowModalRequest] = useState(false);
    const [showEmployeeShiftFilterModal, setShowEmployeeShiftFilterModal] = useState(false);
    const [showEmployeeAttendanceFilterModal, setShowEmployeeAttendanceFilterModal] = useState(false);

    const [expandedMenu, setExpandedMenu] = useState("none");
    const [personalEditOn, setPersonalEditOn] = useState(false);
    const [editId, setEditId] = useState("");

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: true,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN', 'MANAGER']);
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.id) setUserId(router.query.id);
        else handleWrongId('Please choose a valid employee first')
    }, [router.isReady, router.query]);

    useEffect(() => {
        if (userId !== '') {
            props.setPageLoading(true);
            fetchAllData()
                .then(() => {
                    props.setPageLoading(false);
                })
        }
    }, [userId]);

    const fetchAllData = async () => {
        fetchEmployeeDetails();
        // Fetch attendance
        // Fetch Shifts
        // Fetch requests
    }

    const fetchEmployeeDetails = () => {
        fetchAndHandleGet(() => memberService.getMemberById(userId), setEmployeeDetails);
    }

    const setEmployeeDetails = (data) => {
        setFirstName(data.firstName);
        setInitialFirstName(data.firstName);
        setLastName(data.lastName);
        setInitialLastName(data.lastName);
        setEmail(data.email);
        setMobile({ country: data.country, countryCode: data.countryCode, mobile: data.mobile });
        setInitialMobile({ country: data.country, countryCode: data.countryCode, mobile: data.mobile });
        setEmployeeId(data.employeeId);
        setLocation(data.locationName);
        setInitialLocation(data.locationName);
        setRole(data.locationRoleName);
        setInitialRole(data.locationRoleName);
        setEmployeeType(data.fullTime ? 'Full Time' : 'Part Time');
        setInitialEmployeeType(data.fullTime ? 'Full Time' : 'Part Time');
        setEmployeePreferenceData(data.employeePreferences);
    }

    const handleWrongId = (message) => {
        props.setToasterInfo({
            error: true,
            title: "Error!",
            message: message
        })
        router.push('/dashboard/employees')
    }

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
        setExpandedMenu(clickedMenu === expandedMenu ? "none" : clickedMenu);
    };

    const getExpandableData = (title, data, actions, setShowFilterModal) => {
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
                    setShowFilterModal={setShowFilterModal}
                />
            </DashboardCard>
        );
    };

    return (
        <>
            <WaawNoIndexHead title="Employee Details" />
            {
                props.pageLoading ? <></> :
                    <>
                        <EditTimesheetModal
                            showModal={showModalTimeSheet}
                            setShowModal={setShowModalTimeSheet}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role}
                            id={editId}
                        />
                        <EditShiftModal
                            showModal={showModalShift}
                            setShowModal={setShowModalShift}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role}
                            id={editId}
                        />
                        <EditRequestsModal
                            showModal={showModalRequest}
                            setShowModal={setShowModalRequest}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role}
                            id={editId}
                        />
                        <EmployeeAttendanceFilter
                            showModal={showEmployeeAttendanceFilterModal}
                            setShowModal={setShowEmployeeAttendanceFilterModal}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role} />
                        <EmployeesShiftFilter
                            showModal={showEmployeeShiftFilterModal}
                            setShowModal={setShowEmployeeShiftFilterModal}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role} />
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
                            handleCancel={() => {
                                setFirstName(initialFirstName);
                                setLastName(initialLastName);
                                setMobile(initialMobile);
                                setLocation(initialLocation);
                                setRole(initialRole);
                                setEmployeeType(initialEmployeeType);
                            }}
                        >
                            <div className={DashboardStyles.personalContainer}>
                                <ProfileImage size="big" />
                                <div className={DashboardStyles.personalContent}>
                                    <EditableInput
                                        label="First Name"
                                        type="text"
                                        value={firstName}
                                        initialValue={initialFirstName}
                                        setValue={setFirstName}
                                        error={errorFirstName}
                                        setError={setErrorFirstName}
                                        editOn={personalEditOn}
                                    />
                                    <EditableInput
                                        label="Last Name"
                                        type="text"
                                        value={lastName}
                                        initialValue={initialLastName}
                                        setValue={setLastName}
                                        error={errorLastName}
                                        setError={setErrorLastName}
                                        editOn={personalEditOn}
                                    />
                                    <EditableInput
                                        label="Email"
                                        type="text"
                                        value={email}
                                        initialValue={email}
                                        setValue={setEmail}
                                        editOn={personalEditOn}
                                        nonEditable
                                    />
                                    <EditableInput
                                        label="Mobile"
                                        type="mobile"
                                        value={mobile}
                                        initialValue={initialMobile}
                                        setValue={setMobile}
                                        error={errorMobile}
                                        setError={setErrorMobile}
                                        editOn={personalEditOn}
                                    />
                                    <EditableInput
                                        label="Location"
                                        type="text"
                                        value={location}
                                        initialValue={initialLocation}
                                        setValue={setLocation}
                                        editOn={personalEditOn}
                                    />
                                    <EditableInput
                                        label="Role"
                                        type="text"
                                        value={role}
                                        initialValue={initialRole}
                                        error={errorRole}
                                        setError={setErrorRole}
                                        setValue={setRole}
                                        editOn={personalEditOn}
                                    />
                                    <EditableInput
                                        label="Employee Id"
                                        type="text"
                                        value={employeeId}
                                        initialValue={employeeId}
                                        setValue={setEmployeeId}
                                        editOn={personalEditOn}
                                        nonEditable
                                    />
                                    <EditableInput
                                        label="Employee type"
                                        type="dropdown"
                                        options={employeeTypeValues}
                                        value={employeeType}
                                        initialValue={initialEmployeeType}
                                        setValue={setEmployeeType}
                                        editOn={personalEditOn}
                                    />
                                </div>
                            </div>
                        </UserPreferenceCard>
                        <EmployeePreference
                            data={employeePreferenceData}
                            expanded={expandedMenu === 'preferences'}
                            toggleExpansion={() => handleExpansion('preferences')}
                        />
                        {getExpandableData("Shifts", shiftData, getActions('shift'), setShowEmployeeShiftFilterModal)}
                        {getExpandableData("Requests", requestsData, getActions('request'), "")}
                        {getExpandableData("Attendance", attendanceData, getActions('attendance'), setShowEmployeeAttendanceFilterModal)}
                    </>
            }
        </>
    );
};

export default Employees;
