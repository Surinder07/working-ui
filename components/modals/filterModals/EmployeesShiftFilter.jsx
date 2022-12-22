import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";

const EmployeesShiftFilter = () => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [status, setStatus] = useState("");
    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
        setDateFrom("")
        setDateTo("")
        setWorkingHours("")
        setStatus("")
        setErrorDate({
            message: '',
            show: false
        })
    }

    const validateForm = async () => {
        let error = false;
        if(dateFrom === '') {setErrorDate({
            message: 'Date is required',
            show: true
        })
        error = true;
        }
        if(dateTo === '') {setErrorDate({
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
                        message: 'User invited successfully'
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
    );
};

export default EmployeesShiftFilter;
