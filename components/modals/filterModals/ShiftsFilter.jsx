import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
const ShiftsFilter = (props) => {
       //------------- Dropdown values
       const [locations, setLocations] = useState([]);
       //-----------------------------
    const [shiftFromDate, setShiftFromDate] = useState("");
    const [shiftToDate, setShiftToDate] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [shiftStatus, setShiftStatus] = useState("");
    const [batchStatus, setBatchStatus] = useState("");
    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const [errorLocation, setErrorLocation] = useState({});
    const clearAllFilter = () => {
        setShiftFromDate("")
        setShiftToDate("")
        setRole("")
        setLocation("")
        setShiftStatus("")
        setBatchStatus("")
        setErrorLocation({})
        setErrorDate({})
        props.setData({})
    }
    const isError = () => {
        return validateForEmptyField(shiftFromDate, 'Date', setErrorDate, true) ||
               validateForEmptyField(shiftToDate, 'Date', setErrorDate, true) ||
               validateForEmptyField(location, 'Location', setErrorLocation, props.role === 'ADMIN')
    }

    const saveData = () => {
        if (!isError()) {
                    let data = {
                        fromDate: shiftFromDate,
                        toDate: shiftToDate,
                        role: role,
                        location: location,
                        shiftStatus: shiftStatus,
                        batchStatus: batchStatus, 
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
                    label="Shifts From"
                    value={shiftFromDate}
                    setValue={setShiftFromDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={shiftToDate}
                    setValue={setShiftToDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
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
                        className={DashboardModalStyles.singleColumn}
                        required
                        editOn
                    />
                }
                  <EditableInput
                    type="dropdown"
                    label="Shift Status"
                    placeholder="Shift Status"
                    value={shiftStatus}
                    setValue={setShiftStatus}
                    options={["pending", "In process", "completed"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Batch Status"
                    placeholder="Batch Status"
                    value={batchStatus}
                    setValue={setBatchStatus}
                    options={["pending", "In process", "completed"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default ShiftsFilter;
