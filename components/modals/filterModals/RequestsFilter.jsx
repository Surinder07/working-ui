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
    const onCancel = () => {
        setInitiationDateFrom("")
        setInitiationDateTo("")
        setRequestType("")
        setErrorDate({
            message: '',
            show: false
        })
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

                setLoading(true)
                if(error == true){
                    props.setToasterInfo({
                        error: true,
                        title: 'Error!',
                        message: res.message
                    })
                }
                else{
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'Request filtered successfully'
                    });
                    props.setReloadData(true)
                    onCancel()
                }
                setLoading(false)
            }
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
                onCancel={onCancel}
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
    );
};

export default RequestsFilter;
