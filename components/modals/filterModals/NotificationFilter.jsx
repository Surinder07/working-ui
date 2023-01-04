import React, {useEffect, useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
import { validateForEmptyField } from "../../../helpers";

const NotificationFilter = (props) => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });

    const clearAllFilter = () => {
        setDateFrom("")
        setDateTo("")
        setType("")
        setStatus("")
        setErrorDate({})
        props.setData({})
    }

    useEffect(()=> {
        props.setData && props.setData({
            fromDate:dateFrom,
            tillDate:dateTo,
            type,
            status,
        })
    },[])

    const isError =  () => {
        return validateForEmptyField(dateFrom, 'Date', setErrorDate, true) ||
        validateForEmptyField(dateTo, 'Date', setErrorDate, true)
    }

    const saveData = () => {
        if (!isError()) {
                    let data = {
                        fromDate: dateFrom,
                        toDate: dateTo,
                        type: type,
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
                    label="Date"
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
                    label="Type"
                    placeholder="Type"
                    value={type}
                    setValue={setType}
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

export default NotificationFilter;
