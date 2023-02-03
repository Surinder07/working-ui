import React, { useState } from "react";
import { useEffect } from "react";
import { DashboardModalStyles } from "../../../styles/elements";
import { EditableInput } from "../../inputComponents";
import { FilterModal } from "../base";

const LocationFilter = (props) => {
    //------------- Dropdown values
    const [timezones, setTimezones] = useState([]);
    //-----------------------------
    const [status, setStatus] = useState("");
    const [timezone, setTimezone] = useState("");

    const clearAllFilter = () => {
        setStatus("");
        setTimezone("");
        props.setData({})
    };

    const saveData = () => {
        if (!isError()) {
            let data = {
                status: status,
                timezone: timezone
            }
            props.setData(data)
            clearAllFilter()
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
                onClick={saveData}
                clearAllFilter={clearAllFilter}
            >
                <EditableInput
                    type="dropdown"
                    label="Status"
                    placeholder="Status"
                    value={status}
                    setValue={setStatus}
                    options={[{ display: "pending", value: "pending" }, { display: "In Process", value: "In Process" }]}
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
