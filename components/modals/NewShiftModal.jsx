import { useState, useEffect } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import Tabs from "../dashboardComponents/Tabs";
import { dropdownService } from "../../services";

const NewShiftModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    //-----------------------------
    const [formType, setFormType] = useState("Single Shift");
    const [assignTo, setAssignTo] = useState("Users");
    const [releaseImmediately, setReleaseImmediately] = useState(false);
    const [startTime, setStartTime] = useState({});
    const [endTime, setEndTime] = useState({});
    const [startDateShift, setStartDateShift] = useState("");
    const [endDateShift, setEndDateShift] = useState("");
    const [user, setUser] = useState([]);
    const [location, setLocation] = useState("");
    const [role, setRole] = useState([]);
    const [shiftName, setShiftName] = useState("");

    const [errorStartDate, setErrorStartDate] = useState({
        message: "",
        show: false,
    });
    const [errorEndDate, setErrorEndDate] = useState({
        message: "",
        show: false,
    });
    const [errorStartTime, setErrorStartTime] = useState({
        message: "",
        show: false,
    });
    const [errorEndTime, setErrorEndTime] = useState({
        message: "",
        show: false,
    });
    const [errorUser, setErrorUser] = useState({
        message: "",
        show: false,
    });
    const [errorLocation, setErrorLocation] = useState({
        message: "",
        show: false,
    });
    const [errorRole, setErrorRole] = useState({
        message: "",
        show: false,
    });
    const [errorShiftName, setErrorShiftName] = useState({
        message: "",
        show: false,
    });
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setStartTime({})
        setEndTime({})
        setStartDateShift("")
        setEndDateShift("")
        setUser("")
        setLocation("")
        setRole("")
        setShiftName("")
        setErrorStartTime({
            message: "",
            show: false
        })
        setErrorEndTime({
            message: "",
            show: false
        })
        setErrorStartDate({
            message: "",
            show: false
        })
        setErrorEndDate({
            message: "",
            show: false
        })
        setErrorUser({
            message: "",
            show: false
        })
        setErrorLocation({
            message: "",
            show: false
        })
        setErrorRole({
            message: "",
            show: false
        })
        setErrorShiftName({
            message: "",
            show: false
        })
    }

    useEffect(() => {
        if (props.role === 'ADMIN') {
            dropdownService.getLocations()
                .then(res => {
                    if (!res.error) {
                        setLocations(res);
                    }
                })
        }
    }, [])

    const validateForm = async () => {
        let error = false;
        if (startDateShift === '') {
            setErrorStartDate({
                message: 'Start Date required',
                show: true,
            })
            error = true;
        }
        if (endDateShift === '') {
            setErrorEndDate({
                message: 'End Date required',
                show: true,
            })
            error = true;
        }
        if (props.role === 'ADMIN' && location === '') {
            setErrorLocation({
                message: 'Location is required',
                show: true
            })
            error = true
        }
        if (role === '') {
            setErrorRole({
                message: 'Role is required',
                show: true
            })
            error = true
        }
        if (user === '') {
            setErrorUser({
                message: 'User is required',
                show: true
            })
            error = true
        }
        return error
    }

    const saveData = () => {
        validateForm()
            .then(error => {
                if (!error) {

                    setLoading(true)
                    if (error == true) {
                        props.setToasterInfo({
                            error: true,
                            title: 'Error!',
                            message: res.message
                        })
                    }
                    else {
                        props.setToasterInfo({
                            error: false,
                            title: 'Success!',
                            message: 'User invited successfully'
                        });
                        props.setReloadData(true)
                        onCancel()
                    }
                    setLoading(false)
                }
            })
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Create Shift"
            title="Create New Shift"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <Tabs
                className={DashboardModalStyles.singleColumn}
                options={["Single Shift", "Batches"]}
                selected={formType}
                setSelected={setFormType}
                size="big"
            />
            <EditableInput
                type="date"
                value={startDateShift}
                setValue={setStartDateShift}
                initialValue={startDateShift}
                label="Start Date"
                error={errorStartDate}
                setError={setErrorStartDate}
                required
                editOn
            />
            <EditableInput
                type="date"
                value={endDateShift}
                setValue={setEndDateShift}
                initialValue={endDateShift}
                label="End Date"
                error={errorEndDate}
                setError={setErrorEndDate}
                required
                editOn
            />
            {
                formType === "Single Shift" &&
                <>
                    <EditableInput
                        type="time"
                        label="Start Time"
                        value={startTime}
                        setValue={setStartTime}
                        initialValue={startTime}
                        error={errorStartTime}
                        setError={setErrorStartTime}
                        required
                        editOn
                    />
                    <EditableInput
                        type="time"
                        label="End Time"
                        value={endTime}
                        setValue={setEndTime}
                        initialValue={endTime}
                        error={errorEndTime}
                        setError={setErrorEndTime}
                        required
                        editOn
                    />
                </>
            }
            <Tabs
                className={DashboardModalStyles.singleColumn}
                options={["Users", "Locations"]}
                selected={assignTo}
                setSelected={setAssignTo}
                size="small"
                title="Assign Shift to"
            />
            {
                assignTo === "Users" ?
                    <EditableInput
                        type="multiselect"
                        label="Users"
                        className={DashboardModalStyles.singleColumn}
                        options={users}
                        placeholder='Select All Users'
                        values={user}
                        setValues={setUser}
                        error={errorUser}
                        setError={setErrorUser}
                        required
                        editOn
                    /> :
                    <>
                        {
                            props.role === 'ADMIN' &&
                            <EditableInput
                                type="typeAhead"
                                label="Location"
                                options={["India", "Canada", "Mexico"]}
                                placeholder="Location"
                                className={DashboardModalStyles.singleColumn}
                                value={location}
                                setValue={setLocation}
                                initialValue={location}
                                error={errorLocation}
                                setError={setErrorLocation}
                                required
                                editOn
                            />
                        }
                        <EditableInput
                            type="multiselect"
                            label="Roles"
                            className={DashboardModalStyles.singleColumn}
                            values={role}
                            setValues={setRole}
                            initialValue={role}
                            error={errorRole}
                            setError={setErrorRole}
                            required
                            editOn
                        />
                    </>
            }
            <EditableInput
                type="text"
                label="Shift name"
                className={DashboardModalStyles.singleColumn}
                value={shiftName}
                setValue={setShiftName}
                initialValue={shiftName}
                error={errorShiftName}
                setError={setErrorShiftName}
                description='Shift Name cannot be more than 30 Characters'
                editOn
            />
            <Checkbox
                label="Release Shift Immediately"
                className={DashboardModalStyles.singleColumn}
                isChecked={releaseImmediately}
                setIsChecked={setReleaseImmediately}
                initialValue={releaseImmediately}
            />
        </DashboardModal>
    );
};

export default NewShiftModal;
