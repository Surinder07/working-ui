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
                        initialValue={startDateShift}
                        label="Start Date"
                        required
                        editOn
                    />
                    <EditableInput
                        type="date"
                        value={endDateShift}
                        setValue={setEndDateShift}
                        initialValue={endDateShift}
                        label="End Date"
                        required
                        editOn
                    />
                    <EditableInput
                        type="time"
                        label="Start Time"
                        value={startTime}
                        setValue={setStartTime}
                        initialValue={startTime}
                        error={errorStartTime}
                        setError={setErrorStartTime}
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
                        editOn
                    />
                </>
            ) : (
                <>
                    <EditableInput
                        type="date"
                        value={startDateBatches}
                        setValue={setStartDateBatches}
                        initialValue={startDateBatches}
                        label="Start Date"
                        required
                        editOn
                    />
                    <EditableInput
                        type="date"
                        value={endDateBatches}
                        setValue={setEndDateBatches}
                        initialValue={endDateBatches}
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
                    initialValue={user}
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
                        initialValue={location}
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
                        initialValue={role}
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
                initialValue={shiftName}
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
                initialValue={releaseImmediately}
            />
        </DashboardModal>
    );
};

export default NewShiftModal;
