import { useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { timesheetType } from "../../../constants";

const EmployeeAttendanceFilter = (props) => {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [entryType, setEntryType] = useState("");
    const [errorDate, setErrorDate] = useState({
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

    if ((dateFrom === '' && dateTo !== '') || (dateFrom !== '' && dateTo === '')) {
        setErrorDate({
            message: 'Both dates are required',
            show: true
        })
        return true;
    }

    const applyFilter = () => {
        if (!isError()) {
            props.setFilters({ ...props.filters, startDate, endDate, type: entryType })
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
                    options={timesheetType}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default EmployeeAttendanceFilter;
