import React, { useEffect, useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { combineBoolean, fetchAndHandleGet } from "../../../helpers";
import { batchStatusOptions, shiftStatusOptions } from "../../../constants";
import { dropdownService } from "../../../services";
const ShiftsFilter = (props) => {

    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    //-----------------------------
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [roleId, setRoleId] = useState("");
    const [locationId, setLocationId] = useState("");
    const [shiftStatus, setShiftStatus] = useState("");
    const [batchStatus, setBatchStatus] = useState("");
    const [errorDate, setErrorDate] = useState({
        message: '',
        show: false
    });

    useEffect(() => {
        if (props.role) {
            if (props.role === 'ADMIN') {
                fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
            } else {
                fetchAndHandleGet(() => dropdownService.getRoles(null), setRoles);
            }
        }
    }, [props.role])

    useEffect(() => {
        setRoleId("");
        if (locationId !== null && locationId !== '') {
            fetchAndHandleGet(() => dropdownService.getRoles(locationId), setRoles);
        }
    }, [locationId])
    
    const clearAllFilter = () => {
        setStartDate("")
        setEndDate("")
        setRoleId("")
        setLocationId("")
        setShiftStatus("")
        setBatchStatus("")
        setErrorDate({})
        props.setFilters({})
    }

    const isError = () => {
        if ((startDate === '' && endDate !== '') || (startDate !== '' && endDate === '')) {
            setErrorDate({
                message: 'Both dates are required',
                show: true
            })
            return true;
        }
    }

    const applyFilters = () => {
        if (!isError()) {
            props.setFilters({ ...props.filters, startDate, endDate, locationId, roleId, shiftStatus, batchStatus });
            return true;
        } else return false
    }

    return (
        <div>
            <FilterModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Apply Filter"
                title="Filter Options"
                type="twoColNarrow"
                onClick={applyFilters}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="date"
                    label="Shifts From"
                    value={startDate}
                    setValue={setStartDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={endDate}
                    setValue={setEndDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                {
                    props.role === 'ADMIN' &&
                    <EditableInput
                        type="typeAhead"
                        options={locations}
                        placeholder="Location"
                        label="Location"
                        value={locationId}
                        setValue={setLocationId}
                        className={DashboardModalStyles.singleColumn}
                        editOn
                    />
                }
                <EditableInput
                    type="typeAhead"
                    label="Role"
                    placeholder={locationId === '' ? 'Select a location to show roles' : 'Role'}
                    value={roleId}
                    setValue={setRoleId}
                    options={roles}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Shift Status"
                    placeholder="Shift Status"
                    value={shiftStatus}
                    setValue={setShiftStatus}
                    options={shiftStatusOptions}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Batch Status"
                    placeholder="Batch Status"
                    value={batchStatus}
                    setValue={setBatchStatus}
                    options={batchStatusOptions}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default ShiftsFilter;
