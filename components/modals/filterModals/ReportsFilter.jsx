import { useEffect, useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { combineBoolean, fetchAndHandleGet, validateForEmptyField } from "../../../helpers";
import { requestStatus, RequestTypeValues } from "../../../constants";
import { dropdownService } from "../../../services";

const ReportsFilter = (props) => {

    // ------------ Dropdown values
    const [locations, setLocations] = useState([]);
    // ----------------------------

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [locationId, setLocationId] = useState("");

    const [errorDate, setErrorDate] = useState({
        message: '',
        show: false
    });

    useEffect(() => {
        if (props.role) {
            if (props.role === 'ADMIN') {
                fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
            }
        }
    }, [props.role])

    useEffect(() => {
        switch (props.expandedMenu) {
            case 'location holidays':
                setStartDate(props.holidayFilter.start);
                setEndDate(props.holidayFilter.end);
                setLocationId(props.holidayFilter.locationId);
                break;
            case 'payroll':
                setStartDate(props.payrollFilter.start);
                setEndDate(props.payrollFilter.end);
                setLocationId(props.payrollFilter.locationId);
                break;
            case 'attendance':
                setStartDate(props.attendanceFilter.start);
                setEndDate(props.attendanceFilter.end);
                setLocationId(props.attendanceFilter.locationId);
                break;
        }
    }, [props.expandedMenu])

    const clearAllFilter = () => {
        setStartDate("");
        setEndDate("");
        setLocationId("");
        setErrorDate({});
        switch (props.expandedMenu) {
            case 'location holidays':
                props.setHolidayFilter({ reportType: 'HOLIDAYS' })
                break;
            case 'payroll':
                props.setPayrollFilter({ reportType: 'PAYROLL' })
                break;
            case 'attendance':
                props.setAttendanceFilter({ reportType: 'ATTENDANCE' })
                break;
        }
    }

    const isError = () => {
        if ((startDate === '' && endDate !== '') || (startDate !== '' && endDate === '')) {
            setErrorDate({
                message: 'Both dates are required',
                show: true
            })
            return true;
        }
    }

    const applyFilters = () => {
        if (!isError()) {
            switch (props.expandedMenu) {
                case 'location holidays':
                    props.setHolidayFilter({
                        ...props.holidayFilter, start: startDate, end: endDate, locationId
                    })
                    break;
                case 'payroll':
                    props.setPayrollFilter({
                        ...props.payrollFilter, start: startDate, end: endDate, locationId
                    })
                    break;
                case 'attendance':
                    props.setAttendanceFilter({
                        ...props.attendanceFilter, start: startDate, end: endDate, locationId
                    })
                    break;
            }
            return true;
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
                onClick={applyFilters}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="date"
                    label="Gereration Date From"
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
                {
                    props.role === 'ADMIN' &&
                    <EditableInput
                        type="typeAhead"
                        label="Location"
                        placeholder="Location"
                        value={locationId}
                        setValue={setLocationId}
                        options={locations}
                        className={DashboardModalStyles.singleColumn}
                        editOn
                    />
                }
            </FilterModal>
        </div>
    );
};

export default ReportsFilter;