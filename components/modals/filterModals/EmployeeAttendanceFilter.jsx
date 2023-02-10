import { useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { timesheetType } from "../../../constants";

const EmployeeAttendanceFilter = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("");
    const [errorDate, setErrorDate] = useState({
        message: '',
        show: false
    });

    const clearAllFilter = () => {
        setStartDate("")
        setEndDate("")
        setType("")
        setErrorDate({
            message: '',
            show: false
        })
        props.setData({})
    }

    if ((startDate === '' && endDate !== '') || (startDate !== '' && endDate === '')) {
        setErrorDate({
            message: 'Both dates are required',
            show: true
        })
        return true;
    }

    const applyFilter = () => {
        if (!isError()) {
            props.setFilters({ ...props.filters, startDate, endDate, type })
        } else return false;
    }

    return (
        <div>
            <FilterModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Apply Filter"
                title="Filter Options"
                type="twoColNarrow"
                onClick={applyFilter}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="date"
                    label="Start Date"
                    value={startDate}
                    setValue={setStartDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={endDate}
                    setValue={setEndDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Entry Type"
                    placeholder="Entry Type"
                    value={type}
                    setValue={setType}
                    options={timesheetType}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default EmployeeAttendanceFilter;
