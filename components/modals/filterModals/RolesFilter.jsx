import React, { useEffect, useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { combineBoolean, fetchAndHandleGet, validateForEmptyField } from "../../../helpers";
import { profileType, status } from "../../../constants";
import { dropdownService } from "../../../services";

const RolesFilter = (props) => {
    // ------------ Dropdown values
    const [locations, setLocations] = useState([]);
    // ----------------------------

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [admin, setAdmin] = useState("");
    const [locationId, setLocationId] = useState("");
    const [active, setActive] = useState("");
    const [errorDate, setErrorDate] = useState({});

    useEffect(() => {
        if (props.role) {
            if (props.role === 'ADMIN') {
                fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
            }
        }
    }, [props.role])

    const clearAllFilter = () => {
        setStartDate("")
        setEndDate("")
        setAdmin("")
        setLocationId("")
        setActive("")
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
            props.setFilters({ startDate, endDate, admin, locationId, active });
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
                <h4 className={DashboardModalStyles.singleColumn} style={{width: '100%', textAlign: 'center', margin: 0, color: '#535255'}}>Creation Date</h4>
                <EditableInput
                    type="date"
                    label="From"
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
                <EditableInput
                    type="dropdown"
                    label="Profile Type"
                    placeholder="Type"
                    value={admin === '' ? '' : (admin === true ? 'Admin' : 'Employee')}
                    setValue={(val) => setAdmin(val === 'Admin')}
                    options={profileType}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                {
                    props.role === 'ADMIN' &&
                    <EditableInput
                        type="dropdown"
                        label="Location"
                        placeholder="Location"
                        value={locationId}
                        setValue={setLocationId}
                        options={locations}
                        className={DashboardModalStyles.singleColumn}
                        editOn
                    />
                }
                <EditableInput
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={active === '' ? '' : (active === true ? 'Active' : 'Disabled')}
                    setValue={(val) => setActive(val === 'Active')}
                    options={status}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default RolesFilter;
