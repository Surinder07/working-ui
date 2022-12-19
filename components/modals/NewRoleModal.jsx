import React, { useEffect, useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import { dropdownService } from "../../services";

const NewRoleModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    //-----------------------------
    const [roleName, setRoleName] = useState("");
    const [location, setLocation] = useState("");
    const [maximumHours, setMaximumHours] = useState("");
    const [minimumHours, setMinimumHours] = useState("");
    const [maximumWorkDays, setMaximumWorkDays] = useState("");
    const [gapsInShifts, setGapsInShifts] = useState("");
    const [initialRoleName, setInitialRoleName] = useState("");
    const [initialLocation, setInitialLocation] = useState("");
    const [initialMaximumHours, setInitialMaximumHours] = useState("");
    const [initialMinimumHours, setInitialMinimumHours] = useState("");
    const [initialMaximumWorkDays, setInitialMaximumWorkDays] = useState("");
    const [initialGapsInShifts, setInitialGapsInShifts] = useState("");
    const [adminRights, setAdminRights] = useState(false);

    const [errorRoleName, setErrorRoleName] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorLocation, setErrorLocation] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorMaximumHours, setErrorMaximumHours] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorMinimumHours, setErrorMinimumHours] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorMaximumWorkDays, setErrorMaximumWorkDays] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorGapsInShifts, setErrorGapsInShifts] = useState({
        errorMessage: "",
        showError: false,
    });

    const onCancel = () => {
        setRoleName("")
        setLocation("")
        setMaximumHours("")
        setMinimumHours("")
        setMaximumWorkDays("")
        setGapsInShifts("")
        setErrorRoleName({
            errorMessage: "",
            showError: false
        })
        setErrorLocation({
            errorMessage: "",
            showError: false
        })
        setErrorMaximumHours({
            errorMessage: "",
            showError: false
        })
        setErrorMinimumHours({
            errorMessage: "",
            showError: false
        })
        setErrorMaximumWorkDays({
            errorMessage: "",
            showError: false
        })
        setErrorGapsInShifts({
            errorMessage: "",
            showError: false
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

    return (
        <div>
            <DashboardModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Submit"
                onClick={() => console.log('clicked')}
                onCancel={onCancel}
                title={props.update ? "UpdateRole" : "Create New Role"}
                type="twoColWide"
            >
                <EditableInput
                    type="text"
                    label="Role Name"
                    value={roleName}
                    setValue={setRoleName}
                    initialValue={initialRoleName}
                    error={errorRoleName}
                    setError={setErrorRoleName}
                    nonEditable={props.update}
                    editOn
                />
                {
                    props.role === 'ADMIN' &&
                    <EditableInput
                        type="dropdown"
                        options={["India", "Canada", "USA", "Germany"]}
                        placeholder="Location"
                        label="Location"
                        value={location}
                        setValue={setLocation}
                        initialValue={initialLocation}
                        error={errorLocation}
                        setError={setErrorLocation}
                        editOn
                    />
                }
                <EditableInput
                    type="text"
                    label="Total hours per day (Maximum)"
                    value={maximumHours}
                    setValue={setMaximumHours}
                    initialValue={initialMaximumHours}
                    error={errorMaximumHours}
                    setError={setErrorMaximumHours}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Total hours per day (Minimum)"
                    value={minimumHours}
                    setValue={setMinimumHours}
                    initialValue={initialMinimumHours}
                    error={errorMinimumHours}
                    setError={setErrorMinimumHours}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Maximum consecutive work days"
                    value={maximumWorkDays}
                    setValue={setMaximumWorkDays}
                    initialValue={initialMaximumWorkDays}
                    error={errorMaximumWorkDays}
                    setError={setErrorMaximumWorkDays}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Minimum gaps between shifts"
                    value={gapsInShifts}
                    setValue={setGapsInShifts}
                    initialValue={initialGapsInShifts}
                    error={errorGapsInShifts}
                    setError={setErrorGapsInShifts}
                    editOn
                />
                {props.update && <Checkbox isChecked={adminRights} setIsChecked={setAdminRights} label='Give Admin Rights' className={DashboardModalStyles.singleColumn} />}
            </DashboardModal>
        </div>
    );
};

export default NewRoleModal;
