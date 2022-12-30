import { useEffect, useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import { dropdownService, locationAndRoleService } from "../../services";
import { addRoleRequestBody, editRoleRequestBody, fetchAndHandleGet, validateForEmptyField, fetchAndHandle } from "../../helpers";

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

    const [errorRoleName, setErrorRoleName] = useState({});
    const [errorLocation, setErrorLocation] = useState({});
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setRoleName("")
        setLocation("")
        setMaximumHours("")
        setMinimumHours("")
        setMaximumWorkDays("")
        setGapsInShifts("")
        setErrorRoleName({})
        setErrorLocation({})
        setAdminRights(false);
    }

    useEffect(() => {
        if (props.showModal) {
            setLoading(false);
            if (props.role === 'ADMIN') {
                fetchAndHandleGet(dropdownService.getLocations, setLocations)
            }
            if (props.update) {
                locationAndRoleService.getRoleById(props.id)
                    .then(res => {
                        if (res.error) {
                            props.setToasterInfo({
                                error: true,
                                title: 'Something went wrong!',
                                message: `Couldn't fetch details for selected role`
                            })
                        } else {
                            setRoleName(res.name);
                            setLocation(res.locationId);
                            setMaximumHours(res.totalHoursPerDayMax);
                            setMinimumHours(res.totalHoursPerDayMin);
                            setMaximumWorkDays(res.maxConsecutiveWorkDays);
                            setGapsInShifts(res.minHoursBetweenShifts);
                        }
                        props.setPageLoading(false);
                    })
            }
        }
    }, [props.showModal])


    const isError = () => {
        return validateForEmptyField(roleName, 'Name', setErrorRoleName, !props.update) ||
            validateForEmptyField(location, 'Location', setErrorLocation, props.role === 'ADMIN');
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(props.update ?
                () => locationAndRoleService.editLocationRole(editRoleRequestBody(props.id, minimumHours, maximumHours, gapsInShifts, maximumWorkDays)) 
                : () => locationAndRoleService.addNewLocationRole(addRoleRequestBody(location, roleName, minimumHours, maximumHours, gapsInShifts, maximumWorkDays)),
                props.update ? 'Role updated successfully' : 'Role added successfully',
                setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo);
        }
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
                        type="typeAhead"
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
                    type="number"
                    label="Total hours per day (Maximum)"
                    value={maximumHours}
                    setValue={setMaximumHours}
                    initialValue={maximumHours}
                    editOn
                />
                <EditableInput
                    type="number"
                    label="Total hours per day (Minimum)"
                    value={minimumHours}
                    setValue={setMinimumHours}
                    initialValue={minimumHours}
                    editOn
                />
                <EditableInput
                    type="number"
                    label="Maximum consecutive work days"
                    value={maximumWorkDays}
                    setValue={setMaximumWorkDays}
                    initialValue={maximumWorkDays}
                    editOn
                />
                <EditableInput
                    type="number"
                    label="Minimum gaps between shifts (hrs)"
                    value={gapsInShifts}
                    setValue={setGapsInShifts}
                    initialValue={gapsInShifts}
                    editOn
                />
                {
                    (!props.update && props.role === 'ADMIN') &&
                    <Checkbox
                        isChecked={adminRights}
                        setIsChecked={setAdminRights}
                        label='Give Admin Rights'
                        className={DashboardModalStyles.singleColumn}
                    />
                }
            </DashboardModal>
        </div>
    );
};

export default NewRoleModal;
