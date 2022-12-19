import React,{useState} from "react";
import {FilterModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {EditableInput} from "../inputComponents";

const EmployeeAttendanceFilter = () => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [entryType, setEntryType] = useState("");

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
                    label="Entry Type"
                    value={entryType}
                    setValue={setEntryType}
                    options={["Day","Night"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
    </div>
  )
}

export default EmployeeAttendanceFilter