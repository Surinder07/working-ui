import React, {useEffect, useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
import { validateForEmptyField } from "../../../helpers";

const EmployeesShiftFilter = (props) => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [status, setStatus] = useState("");
    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    
    const clearAllFilter = () => {
        setDateFrom("")
        setDateTo("")
        setWorkingHours("")
        setStatus("")
        setStatus("")
        setErrorDate({})
        props.setData({})
    }

    useEffect(()=> {
        props.setData && props.setData({
            fromDate: dateFrom,
            toDate: dateTo,
            workingHours,
            status 
        })
    },[])

    const isError = () => {
        return validateForEmptyField(dateFrom, 'Date', setErrorDate, true) ||
        validateForEmptyField(dateTo, 'Date', setErrorDate, true)
    }

    const saveData = () => {
        if (!isError()) {
                    let data = {
                        fromDate: dateFrom,
                        toDate: dateTo,
                        workingHours: workingHours,
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
                    label="Start Date"
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
                    label="Working Hours"
                    placeholder="Working Hours"
                    value={workingHours}
                    setValue={setWorkingHours}
                    options={["8 Hours"]}
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

export default EmployeesShiftFilter;
