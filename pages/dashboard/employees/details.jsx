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
    EditRequestsModal,
    EmployeePreference
} from "../../../components";
import { dropdownService, memberService, requestService, shiftsService, timesheetService } from "../../../services";
import { fetchAndHandle, fetchAndHandleGet, fetchAndHandlePage, getRequestsListing, getSingleShiftsListing, getTimesheetListing, getUpdateMemberRequestBody } from "../../../helpers";
import { employeeTypeValues } from "../../../constants";
import EditShiftTimesheetModal from "../../../components/modals/EditShiftTimesheetModal";

const Employees = (props) => {

    const router = useRouter();

    // Dropdown values ---------
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    // -------------------------

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [mobile, setMobile] = useState({ countryCode: "", mobile: "", country: "" });
    const [initialMobile, setInitialMobile] = useState({ countryCode: "", mobile: "", country: "" });
    const [firstName, setFirstName] = useState("");
    const [initialFirstName, setInitialFirstName] = useState("");
    const [image, setImage] = useState();
    const [lastName, setLastName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [initialEmployeeId, setInitialEmployeeId] = useState("");
    const [location, setLocation] = useState("");
    const [initialLocation, setInitialLocation] = useState("");
    const [initialLocationId, setInitialLocationId] = useState("");
    const [role, setRole] = useState("");
    const [initialRole, setInitialRole] = useState("");
    const [employeeType, setEmployeeType] = useState("");
    const [initialEmployeeType, setInitialEmployeeType] = useState("");
    const [employeePreferenceData, setEmployeePreferenceData] = useState({});

    // Pagination info states
    const [pageNoAttendance, setPageNoAttendance] = useState(1);
    const [totalPagesAttendance, setTotalPagesAttendance] = useState(1);
    const [totalEntriesAttendance, setTotalEntriesAttendance] = useState(0);
    const [pageNoShifts, setPageNoShifts] = useState(1);
    const [totalPagesShifts, setTotalPagesShifts] = useState(1);
    const [totalEntriesShifts, setTotalEntriesShifts] = useState(0);
    const [pageNoRequests, setPageNoRequests] = useState(1);
    const [totalPagesRequests, setTotalPagesRequests] = useState(1);
    const [totalEntriesRequests, setTotalEntriesRequests] = useState(0);

    // Pagination data states
    const [attendanceData, setAttendanceData] = useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [requestsData, setRequestsData] = useState([]);

    // Reload states
    const [reloadPreferences, setReloadPreferences] = useState(false);
    const [reloadShifts, setReloadShifts] = useState(false);
    const [reloadAttendance, setReloadAttendance] = useState(false);
    const [reloadRequests, setReloadRequests] = useState(false);

    // Error states 
    const [errorMobile, setErrorMobile] = useState({});
    const [errorFirstName, setErrorFirstName] = useState({});
    const [errorLastName, setErrorLastName] = useState({});
    const [errorRole, setErrorRole] = useState({});

    // Modal States
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState("");
    const [showEditRequestModal, setShowEditRequestModal] = useState(false);

    const [expandedMenu, setExpandedMenu] = useState("none");
    const [personalEditOn, setPersonalEditOn] = useState(false);

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
        if (props.user.role) {
            if (props.user.role === 'ADMIN') {
                fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
            } else {
                fetchAndHandleGet(() => dropdownService.getRoles(null), setRoles);
            }
        }
    }, [props.user])

    useEffect(() => {
        if (location !== initialLocationId) setRole("");
        if (location && location !== '') {
            fetchAndHandleGet(() => dropdownService.getRoles(location), setRoles);
        }
    }, [location])

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

    useEffect(() => {
        fetchEmployeeAttendance();
    }, [pageNoAttendance])

    useEffect(() => {
        fetchEmployeeRequests();
    }, [pageNoRequests])

    useEffect(() => {
        fetchEmployeeShifts();
    }, [pageNoShifts])

    useEffect(() => {
        if (reloadAttendance) {
            fetchEmployeeAttendance();
            setReloadAttendance(false)
        }
    }, [reloadAttendance])

    useEffect(() => {
        if (reloadRequests) {
            fetchEmployeeRequests();
            setReloadRequests(false)
        }
    }, [reloadRequests])

    useEffect(() => {
        if (reloadShifts) {
            fetchEmployeeShifts();
            setReloadShifts(false)
        }
    }, [reloadShifts])

    const fetchAllData = async () => {
        fetchEmployeeDetails()
            .then(() => fetchEmployeeAttendance()
                .then(() => fetchEmployeeShifts()
                    .then(() => fetchEmployeeRequests())))
    }

    const fetchEmployeeDetails = async () => {
        fetchAndHandleGet(() => memberService.getMemberById(userId), setEmployeeDetails);
    }

    const fetchEmployeeAttendance = async () => {
        fetchAndHandlePage(() => timesheetService.getAll(pageNoAttendance, 5, { userId }),
            setAttendanceData, setTotalEntriesAttendance, setTotalPagesAttendance, props.setPageLoading,
            null, getTimesheetListing);
    }

    const fetchEmployeeShifts = async () => {
        fetchAndHandlePage(() => shiftsService.getByUser(pageNoShifts, 5, { userId }),
            setShiftData, setTotalEntriesShifts, setTotalPagesShifts, props.setPageLoading, null,
            getSingleShiftsListing);
    }

    const fetchEmployeeRequests = async () => {
        fetchAndHandlePage(() => requestService.getAllForUser(pageNoRequests, 5, { userId }),
            setRequestsData, setTotalEntriesRequests, setTotalPagesRequests, props.setPageLoading, null,
            getRequestsListing);
    }


    useEffect(() => {
        if (reloadPreferences) {
            fetchEmployeeDetails();
            setReloadPreferences(false);
            props.setPageLoading(false);
        }
    }, [reloadPreferences])

    const setEmployeeDetails = (data) => {
        setFirstName(data.firstName);
        setInitialFirstName(data.firstName);
        setLastName(data.lastName);
        setInitialLastName(data.lastName);
        setEmail(data.email);
        setMobile({ country: data.country, countryCode: data.countryCode, mobile: data.mobile });
        setInitialMobile({ country: data.country, countryCode: data.countryCode, mobile: data.mobile });
        setEmployeeId(data.employeeId);
        setInitialEmployeeId(data.employeeId);
        setLocation(data.locationId);
        setInitialLocation(data.locationName);
        setInitialLocationId(data.locationId);
        setRole(data.locationRoleId);
        setInitialRole(data.locationRoleName);
        setEmployeeType(data.fullTime ? 'Full Time' : 'Part Time');
        setInitialEmployeeType(data.fullTime ? 'Full Time' : 'Part Time');
        setEmployeePreferenceData(data.employeePreferences);
        setImage(data.imageUrl)
    }

    const handleWrongId = (message) => {
        props.setToasterInfo({
            error: true,
            title: "Error!",
            message: message
        })
        router.push('/dashboard/employees')
    }

    const updateUserData = () => {
        if (loading) return;
        try {
            fetchAndHandle(() => memberService.updateMember(getUpdateMemberRequestBody(firstName, lastName,
                mobile, location, role, employeeType, employeeId, userId)), "Employee details updated successfully",
                setLoading, setReloadPreferences, props.setPageLoading, null, null, props.setToasterInfo);
        } catch {
            setLoading(false);
            props.setPageLoading(false);
        }
    }

    const getActions = (tableType) => {
        return {
            key: 'Edit',
            action: (id) => {
                setEditId(id);
                switch (tableType) {
                    case 'request':
                        setShowEditRequestModal(true);
                        break;
                    case 'attendance':
                        setShowEditModal(true);
                        break;
                    case 'shift':
                        setShowEditModal(true);
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
                    data={title === 'Attendance' ? attendanceData :
                        (title === 'Requests' ? requestsData : shiftData)}
                    title={title}
                    expanded={expandedMenu === title.toLowerCase()}
                    toggleExpansion={() => handleExpansion(title.toLowerCase())}
                    expandable
                    actions={actions}
                    screenType={props.screenType}
                    pagination
                    totalEntries={title === 'Attendance' ? totalEntriesAttendance :
                        (title === 'Requests' ? totalEntriesRequests : totalEntriesShifts)}
                    pageSize={5}
                    totalPages={title === 'Attendance' ? totalPagesAttendance :
                        (title === 'Requests' ? totalPagesRequests : totalPagesShifts)}
                    pageNo={title === 'Attendance' ? pageNoAttendance :
                        (title === 'Requests' ? pageNoRequests : pageNoShifts)}
                    setPageNo={title === 'Attendance' ? setPageNoAttendance :
                        (title === 'Requests' ? setPageNoRequests : setPageNoShifts)}
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
                        <EditShiftTimesheetModal
                            type={expandedMenu === 'attendance' ? 'Timesheet' : 'Shift'}
                            showModal={showEditModal}
                            setShowModal={setShowEditModal}
                            setPageLoading={props.setPageLoading}
                            setToasterInfo={props.setToasterInfo}
                            setReloadData={expandedMenu === 'attendance' ? setReloadAttendance : setReloadShifts}
                            id={editId}
                        />
                        <EditRequestsModal
                            tabularType={'emp'}
                            showModal={showEditRequestModal}
                            setShowModal={setShowEditRequestModal}
                            setPageLoading={props.setPageLoading}
                            setReloadData={setReloadRequests}
                            setToasterInfo={props.setToasterInfo}
                            role={props.user.role}
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
                            handleCancel={() => {
                                setFirstName(initialFirstName);
                                setLastName(initialLastName);
                                setMobile(initialMobile);
                                setLocation(initialLocationId);
                                setRole(initialRole);
                                setEmployeeType(initialEmployeeType);
                            }}
                            onSave={updateUserData}
                        >
                            <div className={DashboardStyles.personalContainer}>
                                <ProfileImage size="big" src={image}/>
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
                                    {
                                        props.user.role && props.user.role === 'ADMIN' &&
                                        < EditableInput
                                            label="Location"
                                            type="typeAhead"
                                            options={locations}
                                            value={location}
                                            initialValue={initialLocation}
                                            setValue={setLocation}
                                            editOn={personalEditOn}
                                        />
                                    }
                                    <EditableInput
                                        label="Role"
                                        type="typeAhead"
                                        options={roles}
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
                            setToasterInfo={props.setToasterInfo}
                            userId={userId}
                            setPageLoading={props.setPageLoading}
                            setReloadData={setReloadPreferences}
                        />
                        {getExpandableData("Shifts", shiftData, getActions('shift'))}
                        {getExpandableData("Requests", requestsData, getActions('request'))}
                        {getExpandableData("Attendance", attendanceData, getActions('attendance'))}
                    </>
            }
        </>
    );
};

export default Employees;
