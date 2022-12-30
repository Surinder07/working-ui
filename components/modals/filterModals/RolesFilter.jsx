import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
import { validateForEmptyField } from "../../../helpers";

const RolesFilter = (props) => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [profileType, setProfileType] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate,setErrorDate] = useState({});
    const clearAllFilter = () => {
        setDateFrom("")
        setDateTo("")
        setProfileType("")
        setRole("")
        setStatus("")
        setErrorDate({})
        props.setData({})
    }
    const isError = () => {
        return validateForEmptyField(dateFrom, 'Date', setErrorDate, true) ||
               validateForEmptyField(dateTo, 'Date', setErrorDate, true) 
    }

    const saveData = () => {
        if (!isError()) {
                    let data = {
                        fromDate: dateFrom,
                        toDate: dateTo,
                        profileType: profileType,
                        role: role,
                        status: status 
                    }
                    props.setData(data)
                    clearAllFilter()
                }
    }
    return (
        <div>
            <FilterModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Apply Filter"
                title="Filter Options"
                type="twoColNarrow"
                onClick={saveData}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="date"
                    label="Creation Date"
                    value={dateFrom}
                    setValue={setDateFrom}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={dateTo}
                    setValue={setDateTo}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Profile Type"
                    placeholder="Type"
                    value={profileType}
                    setValue={setProfileType}
                    options={["Admin", "Manager", "Employee"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                  {
                    props.role === 'ADMIN' &&
                    <EditableInput
                    type="dropdown"
                    label="Role"
                    placeholder="Role"
                    value={role}
                    setValue={setRole}
                    options={["Admin", "Manager", "Employee"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                }
                <EditableInput
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={status}
                    setValue={setStatus}
                    options={["pending", "In process", "completed"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default RolesFilter;
