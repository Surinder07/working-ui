import React, {useEffect, useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
import { validateForEmptyField } from "../../../helpers";

const EmployeeAttendanceFilter = (props) => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [entryType, setEntryType] = useState("");
    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const clearAllFilter = () => {
        setDateFrom("")
        setDateTo("")
        setEntryType("")
        setErrorDate({
            message: '',
            show: false
        })
        props.setData({})
    }

    useEffect(() => {
        props.setData && props.setData({
            fromDate: dateFrom,
            toDate: dateTo,
            entryType
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
                        entryType: entryType
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
                    label="Entry Type"
                    placeholder="Entry Type"
                    value={entryType}
                    setValue={setEntryType}
                    options={["Day", "Night"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default EmployeeAttendanceFilter;
