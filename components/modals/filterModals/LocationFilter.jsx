import { useState, useEffect } from "react";
import { status } from "../../../constants";
import { fetchAndHandleGet } from "../../../helpers";
import { dropdownService } from "../../../services";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { FilterModal } from "../base";

const LocationFilter = (props) => {
    //------------- Dropdown values
    const [timezones, setTimezones] = useState([]);
    //-----------------------------
    const [activeStatus, setActiveStatus] = useState("");
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        fetchAndHandleGet(dropdownService.getTimezones, setTimezones);
    }, [])

    const clearAllFilter = () => {
        setActiveStatus("");
        setTimezone("");
        props.setFilters({})
    };

    const applyFilters = () => {
        props.setFilters({
            active: activeStatus === '' ? '' : activeStatus === 'Active',
            timezone
        })
        props.setShowModal(false);
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
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={activeStatus}
                    setValue={setActiveStatus}
                    options={status}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
                <EditableInput
                    type="typeAhead"
                    label="Timezone"
                    placeholder="Timezone"
                    value={timezone}
                    setValue={setTimezone}
                    options={timezones}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default LocationFilter;
