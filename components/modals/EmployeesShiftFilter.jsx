import React,{useState} from "react";
import {FilterModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {EditableInput} from "../inputComponents";

const EmployeesShiftFilter = () => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [status, setStatus] = useState("");
  return (
    <div>
         <FilterModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Apply Filter"
                title="Filter Options"
                type="twoColNarrow"
                showCloseButton
            >
                <EditableInput
                    type="date"
                    label="Start Date"
                    value={dateFrom}
                    setValue={setDateFrom}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={dateTo}
                    setValue={setDateTo}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Working Hours"
                    value={workingHours}
                    setValue={setWorkingHours}
                    options={["8 Hours"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Status"
                    value={status}
                    setValue={setStatus}
                    options={["pending", "In process", "completed"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
    </div>
  )
}

export default EmployeesShiftFilter