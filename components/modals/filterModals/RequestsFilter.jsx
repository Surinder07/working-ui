import React, {useEffect, useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
import { validateForEmptyField } from "../../../helpers";

const RequestsFilter = (props) => {
    const [initiationDateFrom, setInitiationDateFrom] = useState("");
    const [initiationDateTo, setInitiationDateTo] = useState("");
    const [requestType, setRequestType] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const clearAllFilter = () => {
        setInitiationDateFrom("")
        setInitiationDateTo("")
        setRequestType("")
        setErrorDate({})
        props.setData({})
    }

    useEffect(()=> {
        props.setData && props.setData({
            fromDate: initiationDateFrom,
            toDate: initiationDateTo,
            requestType,
            status 
        })
    },[])

    const isError = () => {
        return validateForEmptyField(initiationDateFrom, 'Date', setErrorDate, true) ||
        validateForEmptyField(setInitiationDateTo, 'Date', setErrorDate, true) 
    }

    const saveData = () => {
        if (!isError()) {
                    let data = {
                        fromDate: initiationDateFrom,
                        toDate: initiationDateTo,
                        requestType: requestType,
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
                    type="date"
                    label="Initiation Date"
                    value={initiationDateFrom}
                    setValue={setInitiationDateFrom}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={initiationDateTo}
                    setValue={setInitiationDateTo}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Request Type"
                    placeholder="Request Type"
                    value={requestType}
                    setValue={setRequestType}
                    options={["Admin", "Manager", "Employee"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
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

export default RequestsFilter;
