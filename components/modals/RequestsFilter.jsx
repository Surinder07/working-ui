import React,{useState} from "react";
import {FilterModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {EditableInput} from "../inputComponents";

const RequestsFilter = () => {
    const [initiationDateFrom, setInitiationDateFrom] = useState("");
    const [initiationDateTo, setInitiationDateTo] = useState("");
    const [requestType, setRequestType] = useState("");
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
                    label="Initiation Date"
                    value={initiationDateFrom}
                    setValue={setInitiationDateFrom}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={initiationDateTo}
                    setValue={setInitiationDateTo}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Request Type"
                    value={requestType}
                    setValue={setRequestType}
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
  )
}

export default RequestsFilter