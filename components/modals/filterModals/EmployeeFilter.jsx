import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";

const EmployeeFilter = (props) => {
      //------------- Dropdown values
      const [locations, setLocations] = useState([]);
      //-----------------------------
    const [employeeType, setEmployeeType] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");

    const [errorLocation, setErrorLocation] = useState({});

    const clearAllFilter = () => {
        setEmployeeType("")
        setRole("")
        setLocation("")
        setErrorLocation({})
        setStatus("")
        props.setData({})
    }
    
    const isError = () => {
        return false
    }

    const saveData = () => {
        if (!isError()) {
                    let data = {
                        employeeType: employeeType,
                        role: role,
                        location: location,
                        status:status 
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
                    type="dropdown"
                    label="Type of Employee"
                    placeholder="Type"
                    value={employeeType}
                    setValue={setEmployeeType}
                    options={["Admin", "Manager", "Employee"]}
                    className={DashboardModalStyles.singleColumn}
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

export default EmployeeFilter;
