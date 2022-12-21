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
    const [adminRights, setAdminRights] = useState(false);

    const [errorRoleName, setErrorRoleName] = useState({
        message: "",
        show: false,
    });
    const [errorLocation, setErrorLocation] = useState({
        message: "",
        show: false,
    });
    const [errorMaximumHours, setErrorMaximumHours] = useState({
        message: "",
        show: false,
    });
    const [errorMinimumHours, setErrorMinimumHours] = useState({
        message: "",
        show: false,
    });
    const [errorMaximumWorkDays, setErrorMaximumWorkDays] = useState({
        message: "",
        show: false,
    });
    const [errorGapsInShifts, setErrorGapsInShifts] = useState({
        message: "",
        show: false,
    });
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
        setRoleName("")
        setLocation("")
        setMaximumHours("")
        setMinimumHours("")
        setMaximumWorkDays("")
        setGapsInShifts("")
        setErrorRoleName({
            message: "",
            show: false
        })
        setErrorLocation({
            message: "",
            show: false
        })
        setErrorMaximumHours({
            message: "",
            show: false
        })
        setErrorMinimumHours({
            message: "",
            show: false
        })
        setErrorMaximumWorkDays({
            message: "",
            show: false
        })
        setErrorGapsInShifts({
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

    }
    
    const saveData = () => {
        validateForm()
        .then(error => {
            if(!error) {

                setLoading(true)
                if(error == true){
                    props.setToasterInfo({
                        error: true,
                        title: 'Error!',
                        message: res.message
                    })
                }
                else{ props.update ?
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'Role updated successfully'
                    }): props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'Role added successfully'
                    });
                    props.setReloadData(true)
                    onCancel()
                }
                setLoading(false)
            }
        })
    }

    return (
        <div>
            <DashboardModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Submit"
                onClick={saveData}
                onCancel={onCancel}
                title={props.update ? "UpdateRole" : "Create New Role"}
                type="twoColWide"
                loading={loading}
            >
                <EditableInput
                    type="text"
                    label="Role Name"
                    value={roleName}
                    setValue={setRoleName}
                    initialValue={roleName}
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
                        initialValue={location}
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
                    initialValue={maximumHours}
                    error={errorMaximumHours}
                    setError={setErrorMaximumHours}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Total hours per day (Minimum)"
                    value={minimumHours}
                    setValue={setMinimumHours}
                    initialValue={minimumHours}
                    error={errorMinimumHours}
                    setError={setErrorMinimumHours}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Maximum consecutive work days"
                    value={maximumWorkDays}
                    setValue={setMaximumWorkDays}
                    initialValue={maximumWorkDays}
                    error={errorMaximumWorkDays}
                    setError={setErrorMaximumWorkDays}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Minimum gaps between shifts"
                    value={gapsInShifts}
                    setValue={setGapsInShifts}
                    initialValue={gapsInShifts}
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
