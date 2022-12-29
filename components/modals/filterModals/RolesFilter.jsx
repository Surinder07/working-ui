import React, {useState} from "react";
import {FilterModal} from "../base";
import {DashboardModalStyles} from "../../../styles/elements";
import {EditableInput} from "../../inputComponents";

const RolesFilter = (props) => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [profileType, setProfileType] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate,setErrorDate] = useState({
        message: '',
        show: false
    });
    const [loading, setLoading] = useState(false);
    const clearAllFilter = () => {
        setDateFrom("")
        setDateTo("")
        setProfileType("")
        setRole("")
        setStatus("")
        setErrorDate({
            message: '',
            show: false
        })
        props.setData({})
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
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'Role filtered successfully'
                    });
                    let data = {
                        fromDate: dateFrom,
                        toDate: dateTo,
                        profileType: profileType,
                        role: role,
                        status: status 
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
                    label="Creation Date"
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
                    label="Profile Type"
                    placeholder="Type"
                    value={profileType}
                    setValue={setProfileType}
                    options={["Admin", "Manager", "Employee"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                  {
                    props.role === 'ADMIN' &&
                    <EditableInput
                    type="dropdown"
                    label="Role"
                    placeholder="Role"
                    value={role}
                    setValue={setRole}
                    options={["Admin", "Manager", "Employee"]}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                }
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

export default RolesFilter;
