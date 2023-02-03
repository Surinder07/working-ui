import React, { useEffect, useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { EmployeeStatus, EmployeeType } from "../../../constants";
import { fetchAndHandleGet } from "../../../helpers";
import { dropdownService } from "../../../services";

const EmployeeFilter = (props) => {
    //------------- Dropdown values
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    //-----------------------------
    const [type, setType] = useState("");
    const [roleId, setRoleId] = useState("");
    const [locationId, setLocationId] = useState("");
    const [status, setStatus] = useState("");

    const clearAllFilter = () => {
        setType("")
        setRoleId("")
        setLocationId("")
        setStatus("")
        props.setData({})
        props.setShowModal(false);
    }

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

    const applyFilter = () => {
        props.setData({ ...props.data, type, roleId, locationId, status });
        return true;
    }

    return (
        <div>
            <FilterModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Apply Filter"
                title="Filter Options"
                type="twoColNarrow"
                onClick={applyFilter}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="dropdown"
                    label="Type of Employee"
                    placeholder="Type"
                    value={type}
                    setValue={setType}
                    options={EmployeeType}
                    className={DashboardModalStyles.singleColumn}
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
                        initialValue={locationId}
                        className={DashboardModalStyles.singleColumn}
                        editOn
                    />
                }
                <EditableInput
                    type="typeAhead"
                    label='Role'
                    placeholder={locationId === '' ? 'Select a location to show roles' : 'Role'}
                    value={roleId}
                    setValue={setRoleId}
                    options={roles}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={status}
                    setValue={setStatus}
                    options={EmployeeStatus}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default EmployeeFilter;
