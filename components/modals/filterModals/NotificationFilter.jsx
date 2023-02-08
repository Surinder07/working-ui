import { useEffect, useState } from "react";
import { FilterModal } from "../base";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { validateForEmptyField } from "../../../helpers";
import { notificationStatus, notificationType } from "../../../constants";

const NotificationFilter = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    const [errorDate, setErrorDate] = useState({
        message: '',
        show: false
    });

    const clearAllFilter = () => {
        setStartDate("")
        setEndDate("")
        setType("")
        setStatus("")
        setErrorDate({})
        props.setFilters({})
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
            props.setFilters({ startDate, endDate, type, status })
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
                    label="Date"
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
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Type"
                    placeholder="Type"
                    value={type}
                    setValue={setType}
                    options={notificationType}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={status}
                    setValue={setStatus}
                    options={notificationStatus}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default NotificationFilter;
