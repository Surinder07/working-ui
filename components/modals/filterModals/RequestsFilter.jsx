import { useEffect, useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { combineBoolean, fetchAndHandleGet, validateForEmptyField } from "../../../helpers";
import { requestStatus, RequestTypeValues } from "../../../constants";
import { dropdownService } from "../../../services";

const RequestsFilter = (props) => {

    // ------------ Dropdown values
    const [locations, setLocations] = useState([]);
    // ----------------------------

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [locationId, setLocationId] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [myStartDate, setMyStartDate] = useState("");
    const [myEndDate, setMyEndDate] = useState("");
    const [myType, setMyType] = useState("");
    const [myStatus, setMyStatus] = useState("");

    const [errorDate, setErrorDate] = useState({
        message: '',
        show: false
    });
    const [errorMyDate, setErrorMyDate] = useState({
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

    const clearAllFilter = () => {
        if (props.tabularType === 'emp') {
            setStartDate("")
            setEndDate("")
            setLocationId("");
            setType("")
            setStatus("")
            setErrorDate({})
            props.setFilters({})
        } else {
            setMyStartDate("")
            setMyEndDate("")
            setMyType("")
            setMyStatus("")
            setErrorMyDate({})
            props.setMyFilters({})
        }
    }

    const isError = () => {
        if (props.tabularType === 'emp') {
            return combineBoolean(
                validateForEmptyField(startDate, 'Date', setErrorDate, true),
                validateForEmptyField(endDate, 'Date', setErrorDate, true)
            )
        } else {
            return combineBoolean(
                validateForEmptyField(myStartDate, 'Date', setErrorMyDate, true),
                validateForEmptyField(myEndDate, 'Date', setErrorMyDate, true)
            )
        }
    }

    const applyFilters = () => {
        if (!isError()) {
            if (props.tabularType === 'emp') props.setFilters({
                ...props.filters, startDate, endDate, type, status, locationId
            }) 
            else props.setMyFilters({
                ...props.myFilters,
                startDate: myStartDate, 
                endDate: myEndDate, 
                type: myType, 
                status: myStatus
            })
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
                onClick={applyFilters}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="date"
                    label="Initiation Date"
                    value={props.tabularType === 'emp' ? startDate : myStartDate}
                    setValue={props.tabularType === 'emp' ? setStartDate : setMyStartDate}
                    error={props.tabularType === 'emp' ? errorDate : errorMyDate}
                    setError={props.tabularType === 'emp' ? setErrorDate : setErrorMyDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="To"
                    value={props.tabularType === 'emp' ? endDate : myEndDate}
                    setValue={props.tabularType === 'emp' ? setEndDate: setMyEndDate}
                    setError={props.tabularType === 'emp' ? setErrorDate : setErrorMyDate}
                    editOn
                />
                {
                    (props.tabularType === 'emp' && props.role === 'ADMIN') &&
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
                <EditableInput
                    type="dropdown"
                    label="Request Type"
                    placeholder="Request Type"
                    value={props.tabularType === 'emp' ? type : myType}
                    setValue={props.tabularType === 'emp' ? setType : setMyType}
                    options={RequestTypeValues}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={props.tabularType === 'emp' ? status : myStatus}
                    setValue={props.tabularType === 'emp' ? setStatus : setMyStatus}
                    options={requestStatus}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default RequestsFilter;
