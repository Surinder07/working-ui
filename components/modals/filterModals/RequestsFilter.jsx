import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";

const RequestsFilter = (props) => {
    const [initiationDateFrom, setInitiationDateFrom] = useState("");
    const [initiationDateTo, setInitiationDateTo] = useState("");
    const [requestType, setRequestType] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const [loading, setLoading] = useState(false);
    const clearAllFilter = () => {
        setInitiationDateFrom("")
        setInitiationDateTo("")
        setRequestType("")
        setErrorDate({
            message: '',
            show: false
        })
        props.setData({})
    }
    const validateForm = async () => {
        let error = false;
        if(initiationDateFrom === '') {setErrorDate({
            message: 'Date is required',
            show: true
        })
        error = true;
        }
        if(setInitiationDateTo === '') {setErrorDate({
            message: 'Date is required',
            show: true
        })
        error = true;
        }
        return error
    }

    const saveData = () => {
        validateForm()
        .then(error => {
            if(!error) {
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'Request filtered successfully'
                    });
                    let data = {
                        fromDate: initiationDateFrom,
                        toDate: initiationDateTo,
                        requestType: requestType,
                        status:status 
                    }
                    props.setData(JSON.stringify(data))
                    props.setReloadData(true)
                    clearAllFilter()
                }
                setLoading(false)
            
        })
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
                loading={loading}
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
