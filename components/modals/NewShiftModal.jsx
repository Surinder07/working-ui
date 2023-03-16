import { useState, useEffect } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import Tabs from "../dashboardComponents/Tabs";
import { dropdownService, shiftsService } from "../../services";
import { combineBoolean, fetchAndHandle, fetchAndHandleGet, newShiftRequestBody, validateForEmptyArray, validateForEmptyField, validateForTime } from "../../helpers";

const NewShiftModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const shiftType = ["Single Shift", "Batch"];
    const assignType = ["Users", "Roles"];
    //-----------------------------
    const [formType, setFormType] = useState(shiftType[0]);
    const [assignTo, setAssignTo] = useState(assignType[0]);
    const [releaseImmediately, setReleaseImmediately] = useState(false);
    const [startTime, setStartTime] = useState({});
    const [endTime, setEndTime] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [user, setUser] = useState([]);
    const [location, setLocation] = useState("");
    const [role, setRole] = useState([]);
    const [shiftName, setShiftName] = useState("");

    const [errorStartDate, setErrorStartDate] = useState({});
    const [errorEndDate, setErrorEndDate] = useState({});
    const [errorStartTime, setErrorStartTime] = useState({});
    const [errorEndTime, setErrorEndTime] = useState({});
    const [errorUser, setErrorUser] = useState({});
    const [errorLocation, setErrorLocation] = useState({});
    const [errorRole, setErrorRole] = useState({});
    const [errorShiftName, setErrorShiftName] = useState({});
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setStartTime({})
        setEndTime({})
        setStartDate("")
        setEndDate("")
        setUser("")
        setLocation("")
        setRole("")
        setShiftName("")
        setErrorStartTime({})
        setErrorEndTime({})
        setErrorStartDate({})
        setErrorEndDate({})
        setErrorUser({})
        setErrorLocation({})
        setErrorRole({})
        setErrorShiftName({})
    }

    useEffect(() => {
        if (props.showModal)
            if (props.role === 'ADMIN') {
                fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
            } else {
                fetchAndHandleGet(() => dropdownService.getRoles(null), setRoles);
            }
        fetchAndHandleGet(() => dropdownService.getUsers(), setUsers);
    }, [props.showModal])

    useEffect(() => {
        setRole([]);
        if (location && location !== '') {
            fetchAndHandleGet(() => dropdownService.getRoles(location), setRoles);
        }
    }, [location])

    useEffect(() => {
        props.setData && props.setData({
            startTime,
            endTime,
            startDate,
            endDate,
            user,
            location,
            role,
            shiftName
        })
    }, [])

    useEffect(() => {
        if (formType === 'Single Shift') setAssignTo('Users');
    }, [formType])

    const isError = () => {
        let error = combineBoolean(
            validateForEmptyField(startDate, 'Start Date', setErrorStartDate, true),
            validateForEmptyField(endDate, 'End Date', setErrorEndDate, true),
            validateForTime(startTime, setErrorStartTime, formType === 'Single Shift'),
            validateForTime(endTime, setErrorEndTime, formType === 'Single Shift'),
            validateForEmptyField(location, 'Location', setErrorLocation, props.role === 'ADMIN' && assignTo === 'Roles'),
            validateForEmptyArray(role, "Role", setErrorRole, formType === 'Single Shift' && assignTo === 'Roles'),
            validateForEmptyArray(user, "User", setErrorUser, assignTo === 'Users')
        );
        if (shiftName.length > 30) {
            error = true;
            setErrorShiftName({
                message: 'Shift Name cannot be more than 30 Characters',
                show: true
            })
        }
        return error;
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(() => shiftsService.newShift(newShiftRequestBody(formType, location, role, user,
                startDate, startTime, endDate, endTime, releaseImmediately, shiftName)),
                null, setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo);
        }
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
                options={shiftType}
                selected={formType}
                setSelected={setFormType}
                size="big"
            />
            <EditableInput
                type="date"
                value={startDate}
                setValue={setStartDate}
                initialValue={startDate}
                label="Start Date"
                error={errorStartDate}
                setError={setErrorStartDate}
                blockPast
                required
                editOn
            />
            <EditableInput
                type="date"
                value={endDate}
                setValue={setEndDate}
                initialValue={endDate}
                label="End Date"
                error={errorEndDate}
                setError={setErrorEndDate}
                blockPast
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
            {
                formType === 'Batch' &&
                <Tabs
                    className={DashboardModalStyles.singleColumn}
                    options={assignType}
                    selected={assignTo}
                    setSelected={setAssignTo}
                    size="small"
                    title="Assign Shift to"
                />
            }
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
                        description='Select multiple users to assign shift to'
                        required
                        editOn
                    /> :
                    <>
                        {
                            props.role === 'ADMIN' &&
                            <EditableInput
                                type="typeAhead"
                                label="Location"
                                options={locations}
                                placeholder="Location"
                                className={DashboardModalStyles.singleColumn}
                                value={location}
                                setValue={setLocation}
                                initialValue={location}
                                error={errorLocation}
                                setError={setErrorLocation}
                                required
                                // description={formType === 'Batch' ? 'Leave Location empty to create shift for all locations' : ''}
                                editOn
                            />
                        }
                        <EditableInput
                            type="multiselect"
                            label="Roles"
                            className={DashboardModalStyles.singleColumn}
                            options={roles}
                            placeholder='Select a location to show roles'
                            values={role}
                            setValues={setRole}
                            initialValue={role}
                            error={errorRole}
                            setError={setErrorRole}
                            required={formType === 'Single Shift'}
                            description={formType === 'Batch' ? 'Leave Role empty to create shift for all roles under given location' : ''}
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
