import { useEffect, useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { Checkbox, EditableInput } from "../inputComponents";
import { dropdownService, locationAndRoleService } from "../../services";
import { addRoleRequestBody, combineBoolean, editRoleRequestBody, fetchAndHandle, fetchAndHandleGet, validateForEmptyField } from "../../helpers";

const NewRoleModal = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    //-----------------------------
    const [roleName, setRoleName] = useState("");
    const [location, setLocation] = useState("");
    const [maximumHours, setMaximumHours] = useState({
        hours: 0,
        minutes: 0
    });
    const [minimumHours, setMinimumHours] = useState({
        hours: 0,
        minutes: 0
    });
    const [maximumWorkDays, setMaximumWorkDays] = useState(0);
    const [gapsInShifts, setGapsInShifts] = useState({
        hours: 0,
        minutes: 0
    });
    const [adminRights, setAdminRights] = useState(false);

    const [errorRoleName, setErrorRoleName] = useState({});
    const [errorLocation, setErrorLocation] = useState({});
    const [errorHours, setErrorHours] = useState({});
    const [errorMinutes, setErrorMinutes] = useState({});
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

    useEffect(() => {
        props.setData && props.setData({
            roleName,
            location,
            maximumHours,
            minimumHours,
            maximumWorkDays,
            gapsInShifts,
            adminRights
        })
    }, [])


    const isError = () => {
        let error = combineBoolean(
            validateForEmptyField(roleName, 'Name', setErrorRoleName, !props.update),
            // validateForEmptyField(location, 'Location', setErrorLocation, props.role === 'ADMIN')
        );
        let maxMinHourError = (minimumHours.hours > maximumHours.hours) || (minimumHours.hours === maximumHours.hours && minimumHours.minutes > maximumHours.minutes);
        if (maxMinHourError) {
            setErrorHours({
                message: 'Minimum time cannot be',
                show: true
            });
            setErrorMinutes({
                message: 'more than maximim time',
                show: true
            })
        }
        return error || maxMinHourError;
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(props.update ?
                () => locationAndRoleService.editLocationRole(editRoleRequestBody(props.id, minimumHours, maximumHours, gapsInShifts, maximumWorkDays))
                : () => locationAndRoleService.addNewLocationRole(addRoleRequestBody(location, roleName, minimumHours, maximumHours, gapsInShifts, maximumWorkDays, adminRights)),
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
                        nonEditable={props.update}
                        required
                        editOn
                    />
                }
                <div>
                    <label>Total time per day (Maximum)</label>
                    <div className={DashboardModalStyles.twoColumn}>
                        <EditableInput
                            type="number"
                            label="Hours"
                            value={maximumHours.hours}
                            setValue={(val) => setMaximumHours({ ...maximumHours, hours: val })}
                            initialValue={maximumHours.hours}
                            error={errorHours}
                            setError={(e) => {
                                setErrorHours(e);
                                setErrorMinutes(e);
                            }}
                            max={23}
                            editOn
                        />
                        <EditableInput
                            type="number"
                            label="Minutes"
                            value={maximumHours.minutes}
                            setValue={(val) => setMaximumHours({ ...maximumHours, minutes: val })}
                            initialValue={maximumHours.minutes}
                            error={errorMinutes}
                            setError={(e) => {
                                setErrorHours(e);
                                setErrorMinutes(e);
                            }}
                            max={59}
                            editOn
                        />
                    </div>
                </div>
                <div>
                    <label>Total time per day (Minimum)</label>
                    <div className={DashboardModalStyles.twoColumn}>
                        <EditableInput
                            type="number"
                            label="Hours"
                            value={minimumHours.hours}
                            setValue={(val) => setMinimumHours({ ...maximumHours, hours: val })}
                            initialValue={minimumHours.hours}
                            max={23}
                            editOn
                        />
                        <EditableInput
                            type="number"
                            label="Minutes"
                            value={minimumHours.minutes}
                            setValue={(val) => setMinimumHours({ ...minimumHours, minutes: val })}
                            initialValue={minimumHours.minutes}
                            max={59}
                            editOn
                        />
                    </div>
                </div>
                <EditableInput
                    type="number"
                    label="Maximum consecutive work days"
                    value={maximumWorkDays}
                    setValue={setMaximumWorkDays}
                    initialValue={maximumWorkDays}
                    max={7}
                    editOn
                />
                <div>
                    <label>Minimum gaps between shifts</label>
                    <div className={DashboardModalStyles.twoColumn}>
                        <EditableInput
                            type="number"
                            label="Hours"
                            value={gapsInShifts.hours}
                            setValue={(val) => setGapsInShifts({ ...maximumHours, hours: val })}
                            initialValue={gapsInShifts.hours}
                            max={23}
                            editOn
                        />
                        <EditableInput
                            type="number"
                            label="Minutes"
                            value={gapsInShifts.minutes}
                            setValue={(val) => setGapsInShifts({ ...minimumHours, minutes: val })}
                            initialValue={gapsInShifts.minutes}
                            max={59}
                            editOn
                        />
                    </div>
                </div>
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
