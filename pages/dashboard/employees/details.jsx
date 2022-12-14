import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DashboardStyles} from "../../../styles/pages";
import Link from "next/link";
import {
    WaawNoIndexHead,
    UserPreferenceCard,
    InputBox,
    DropDown,
    ContactInput,
    TabularInfo,
    DashboardCard,
    Modal,
    ProfileImage,
    EditableInput,
    EditTimesheetModal,
    EditShiftModal,
    EditRequestsModal,
} from "../../../components";

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
    const [showModalRequest,setShowModalRequest] = useState(false);
    const [date,setDate] = useState("");
    const [inDate,setInDate] = useState("")
    const [outDate,setOutDate] = useState("")
    const [inTime,setInTime] = useState("")
    const [outTime,setOutTime] = useState("")
    const [comment,setComment] = useState("")
    const [approve,setApprove] = useState("")
    const [reject,setReject] = useState("")
    const [referBack,setReferBack] = useState("")
    const [error, setError] = useState({
        message: "",
        showError: false,
    });
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

    const shiftsActions = {
        key: "Edit",
        action: (id) => {
            setEditId(id);
            setShowModalShift(true);
        },
    };
    const requestActions = {
        key: "Edit",
        action: (id) => {
            setEditId(id);
            setShowModalRequest(true);
        },
    };
    const attendanceActions = {
        key: "Edit",
        action: (id) => {
            setEditId(id);
            setShowModalTimeSheet(true);
        },
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
            <WaawNoIndexHead title="Employee Details" />
            <EditTimesheetModal
                showModal={showModalTimeSheet}
                setShowModal={setShowModalTimeSheet}
                inDate={inDate}
                setInDate={setInDate}
                outDate={outDate}
                setOutDate={setOutDate}
                inTime={inTime}
                setInTime={setInTime}
                outTime={outTime}
                setOutTime={setOutTime}
                comment={comment}
                setComment={setComment}
                editId={editId}
                error={error}
                setError={setError}
            />
            <EditShiftModal
                showModal={showModalShift}
                setShowModal={setShowModalShift}
                date={date}
                setDate={setDate}
                inTime={inTime}
                setInTime={setInTime}
                outTime={outTime}
                setOutTime={setOutTime}
                comment={comment}
                setComment={setComment}
                editId={editId}
                error={error}
                setError={setError}
            />
            <EditRequestsModal
            showModal={showModalRequest}
            setShowModal={setShowModalRequest}
            approve={approve}
            setApprove={setApprove}
            reject={reject}
            setReject={setReject}
            referBack={referBack}
            setReferBack={setReferBack}
            comment={comment}
            setComment={setComment}
            editId={editId}
            error={error}
                setError={setError}
            />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>
                    <Link
                        href="/dashboard/employees"
                        style={{color: "#535255"}}
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
            {getExpandableData("Shifts", shiftData, shiftsActions)}
            {getExpandableData("Requests", requestsData, requestActions)}
            {getExpandableData("Attendance", attendanceData, attendanceActions)}
        </>
    );
};

export default Employees;
