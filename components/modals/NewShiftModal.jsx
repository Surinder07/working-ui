import {useState} from "react";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {Checkbox, EditableInput} from "../inputComponents";
import Tabs from "../dashboardComponents/Tabs";

const NewShiftModal = (props) => {
    const [formType, setFormType] = useState("Single Shift");
    const [assignTo, setAssignTo] = useState("Users");
    const [releaseImmediately, setReleaseImmediately] = useState(false);
    const [toggle, setToggle] = useState("a");
    const [startTime, setStartTime] = useState({});
    const [endTime, setEndTime] = useState({});
    const [startDateShift, setStartDateShift] = useState("");
    const [endDateShift, setEndDateShift] = useState("");
    const [startDateBatches, setStartDateBatches] = useState("");
    const [endDateBatches, setEndDateBatches] = useState("");
    const [user, setUser] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [shiftName, setShiftName] = useState("");

    const [initialReleaseImmediately, setInitialReleaseImmediately] = useState(false);
    const [initialToggle, setInitialToggle] = useState("a");
    const [initialStartTime, setInitialStartTime] = useState({});
    const [initialEndTime, setInitialEndTime] = useState({});
    const [initialStartDateShift, setInitialStartDateShift] = useState("");
    const [initialEndDateShift, setInitialEndDateShift] = useState("");
    const [initialStartDateBatches, setInitialStartDateBatches] = useState("");
    const [initialEndDateBatches, setInitialEndDateBatches] = useState("");
    const [initialUser, setInitialUser] = useState("");
    const [initialLocation, setInitialLocation] = useState("");
    const [initialRole, setInitialRole] = useState("");
    const [initialShiftName, setInitialShiftName] = useState("");

    const [errorStartTime, setErrorStartTime] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorEndTime, setErrorEndTime] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorUser, setErrorUser] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorLocation, setErrorLocation] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorRole, setErrorRole] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorShiftName, setErrorShiftName] = useState({
        errorMessage: "",
        showError: false,
    });
    
    const onCancel = () => {
        setStartTime({})
        setEndTime({})
        setStartDateShift("")
        setEndDateShift("")
        setStartDateBatches("")
        setEndDateBatches("")
        setUser("")
        setLocation("")
        setRole("")
        setShiftName("")
        setErrorStartTime({
            errorMessage: "",
            showError: false
        })
        setErrorEndTime({
            errorMessage: "",
            showError: false
        })
        setErrorUser({
            errorMessage: "",
            showError: false
        })
        setErrorLocation({
            errorMessage: "",
            showError: false
        })
        setErrorRole({
            errorMessage: "",
            showError: false
        })
        setErrorShiftName({
            errorMessage: "",
            showError: false
        })
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Create Shift"
            title="Create New Shift"
            type="twoColNarrow"
            onCancel={onCancel}
        >
            <Tabs
                className={DashboardModalStyles.singleColumn}
                options={["Single Shift", "Batches"]}
                selected={formType}
                setSelected={setFormType}
                size="big"
            />
            {formType && formType === "Single Shift" ? (
                <>
                    <EditableInput
                        type="date"
                        value={startDateShift}
                        setValue={setStartDateShift}
                        initialValue={initialStartDateShift}
                        label="Start Date"
                        required
                        editOn
                    />
                    <EditableInput
                        type="date"
                        value={endDateShift}
                        setValue={setEndDateShift}
                        initialValue={initialEndDateShift}
                        label="End Date"
                        required
                        editOn
                    />
                    <EditableInput
                        type="time"
                        label="Start Time"
                        value={startTime}
                        setValue={setStartTime}
                        initialValue={initialStartTime}
                        error={errorStartTime}
                        setError={setErrorStartTime}
                        editOn
                    />
                    <EditableInput
                        type="time"
                        label="End Time"
                        value={endTime}
                        setValue={setEndTime}
                        initialValue={initialEndTime}
                        error={errorEndTime}
                        setError={setErrorEndTime}
                        editOn
                    />
                </>
            ) : (
                <>
                    <EditableInput
                        type="date"
                        value={startDateBatches}
                        setValue={setStartDateBatches}
                        initialValue={initialStartDateBatches}
                        label="Start Date"
                        required
                        editOn
                    />
                    <EditableInput
                        type="date"
                        value={endDateBatches}
                        setValue={setEndDateBatches}
                        initialValue={initialEndDateBatches}
                        label="End Date"
                        required
                        editOn
                    />
                </>
            )}

            <Tabs
                className={DashboardModalStyles.singleColumn}
                options={["Users", "Locations"]}
                selected={assignTo}
                setSelected={setAssignTo}
                size="small"
                title="Assign Shift to"
            />
            {assignTo && assignTo === "Users" ? (
                <EditableInput
                    type="text"
                    label="User"
                    className={DashboardModalStyles.singleColumn}
                    value={user}
                    setValue={setUser}
                    initialValue={initialUser}
                    error={errorUser}
                    setError={setErrorUser}
                    required
                    editOn
                />
            ) : (
                <>
                    <EditableInput
                        type="dropdown"
                        label="Location"
                        options={["India", "Canada", "Mexico"]}
                        className={DashboardModalStyles.singleColumn}
                        value={location}
                        setValue={setLocation}
                        initialValue={initialLocation}
                        error={errorLocation}
                        setError={setErrorLocation}
                        required
                        editOn
                    />
                    <EditableInput
                        type="text"
                        label="Role"
                        className={DashboardModalStyles.singleColumn}
                        value={role}
                        setValue={setRole}
                        initialValue={initialRole}
                        error={errorRole}
                        setError={setErrorRole}
                        required
                        editOn
                    />
                </>
            )}

            <EditableInput
                type="text"
                label="Shift name"
                className={DashboardModalStyles.singleColumn}
                value={shiftName}
                setValue={setShiftName}
                initialValue={initialShiftName}
                error={errorShiftName}
                setError={setErrorShiftName}
                editOn
            />
            <p className={DashboardModalStyles.instruction}>
                Shift Name cannot be more than 30 Characters
            </p>
            <Checkbox
                label="Release Shift Immediately"
                className={DashboardModalStyles.singleColumn}
                isChecked={releaseImmediately}
                setIsChecked={setReleaseImmediately}
                initialValue={initialReleaseImmediately}
            />
        </DashboardModal>
    );
};

export default NewShiftModal;
