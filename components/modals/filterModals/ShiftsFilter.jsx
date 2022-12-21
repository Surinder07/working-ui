import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";
const ShiftsFilter = (props) => {
    const [shiftFromDate, setShiftFromDate] = useState("");
    const [shiftToDate, setShiftToDate] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
        setShiftFromDate("")
        setShiftToDate("")
        setRole("")
        setStatus("")
        setErrorDate({
            message: '',
            show: false
        })
    }
    const validateForm = async () => {
        let error = false;
        if(shiftFromDate === '') {setErrorDate({
            message: 'Date is required',
            show: true
        })
        error = true;
        }
        if(shiftToDate === '') {setErrorDate({
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
                        message: 'Shift filtered successfully'
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
                    label="Shifts From"
                    value={shiftFromDate}
                    setValue={setShiftFromDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={shiftToDate}
                    setValue={setShiftToDate}
                    error={errorDate}
                    setError={setErrorDate}
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
                    placeholder=" Status"
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
