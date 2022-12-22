import React, { useEffect, useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import { dropdownService, locationAndRoleService } from "../../services";

const NewRoleModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    //-----------------------------
    const [roleName, setRoleName] = useState("");
    const [location, setLocation] = useState("");
    const [maximumHours, setMaximumHours] = useState(0);
    const [minimumHours, setMinimumHours] = useState(0);
    const [maximumWorkDays, setMaximumWorkDays] = useState(0);
    const [gapsInShifts, setGapsInShifts] = useState(0);
    const [adminRights, setAdminRights] = useState(false);

    const [errorRoleName, setErrorRoleName] = useState({
        message: "",
        show: false,
    });
    const [errorLocation, setErrorLocation] = useState({
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
        setAdminRights(false);
    }

    useEffect(() => {
        if (props.showModal) {
            if (props.role === 'ADMIN') {
                dropdownService.getLocations()
                    .then(res => {
                        if (!res.error) {
                            setLocations(res);
                        }
                    })
            }
            if (props.update) {
                props.setPageLoading(false);
            }
        }
    }, [props.showModal])


    const validateForm = async () => {
        let error = false;
        if (!props.update && roleName === '') {
            setErrorRoleName({
                message: 'Name is required',
                show: true
            })
            error = true;
        }
        if (props.role === 'ADMIN' && location === '') {
            setErrorLocation({
                message: 'Location is required',
                show: true
            })
            error = true;
        }
        return error;
    }

    const saveData = () => {
        validateForm()
            .then(error => {
                if (!error) {
                    setLoading(true)
                    if (props.update) {
                        locationAndRoleService.editLocationRole({
                            id: props.id,
                            totalHoursPerDayMin: minimumHours,
                            totalHoursPerDayMax: maximumHours,
                            minHoursBetweenShifts: gapsInShifts,
                            maxConsecutiveWorkDays: maximumWorkDays
                        })
                            .then(res => {
                                handleResponse(res);
                            })
                    } else {
                        locationAndRoleService.addNewLocationRole({
                            locationId: location,
                            name: roleName,
                            totalHoursPerDayMin: minimumHours,
                            totalHoursPerDayMax: maximumHours,
                            minHoursBetweenShifts: gapsInShifts,
                            maxConsecutiveWorkDays: maximumWorkDays,
                            isAdmin: adminRights
                        })
                            .then(res => {
                                handleResponse(res);
                            })
                    }
                }
            })
    }

    const handleResponse = (res) => {
        if (res.error) {
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
                message: props.update ? 'Role updated successfully' : 'Role added successfully'
            });
            props.setReloadData(true);
            onCancel();
        }
        setLoading(false);
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
                    required
                    editOn
                />
                {
                    props.role === 'ADMIN' &&
                    <EditableInput
                        type="dropdown"
                        options={locations}
                        placeholder="Location"
                        label="Location"
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
                    type="text"
                    label="Total hours per day (Maximum)"
                    value={maximumHours}
                    setValue={setMaximumHours}
                    initialValue={maximumHours}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Total hours per day (Minimum)"
                    value={minimumHours}
                    setValue={setMinimumHours}
                    initialValue={minimumHours}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Maximum consecutive work days"
                    value={maximumWorkDays}
                    setValue={setMaximumWorkDays}
                    initialValue={maximumWorkDays}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Minimum gaps between shifts"
                    value={gapsInShifts}
                    setValue={setGapsInShifts}
                    initialValue={gapsInShifts}
                    editOn
                />
                {!props.update && <Checkbox isChecked={adminRights} setIsChecked={setAdminRights} label='Give Admin Rights' className={DashboardModalStyles.singleColumn} />}
            </DashboardModal>
        </div>
    );
};

export default NewRoleModal;
