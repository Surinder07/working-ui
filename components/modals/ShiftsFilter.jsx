import React,{useState} from "react";
import {FilterModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {EditableInput} from "../inputComponents";
const ShiftsFilter = (props) => {
    const [shiftFromDate, setShiftFromDate] = useState("");
    const [shiftToDate, setShiftToDate] = useState("");
    const [role, setRole] = useState("");
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
                    label="Shifts From"
                    value={shiftFromDate}
                    setValue={setShiftFromDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={shiftToDate}
                    setValue={setShiftToDate}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Role"
                    value={role}
                    setValue={setRole}
                    options={["Admin", "Manager", "Employee"]}
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
    );
};

export default ShiftsFilter;
