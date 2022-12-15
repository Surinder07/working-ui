import React, { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { dropdownService, locationAndRoleService } from "../../services";

const LocationModal = (props) => {

    const [timezones, setTimezones] = useState([]); // List to display

    const [location, setLocation] = useState('');
    const [timezone, setTimezone] = useState('');
    const [errorLocation, setErrorLocation] = useState({
        errorMessage: "",
        showError: false
    });
    const [errorTimezone, setErrorTimezone] = useState({
        errorMessage: "",
        showError: false
    });

    useEffect(() => {   
        dropdownService.getTimezones().then(res => setTimezones(res));
    },[])

    const saveData = () => {
        // @todo validate form
        locationAndRoleService.saveLocation(location, timezone)
        .then(res => {
            if (res.error) {
                // @todo Add error
            }
        });
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Add New Location"
            type="singleCol"
            onClick={saveData}
        >
            <EditableInput
                type="text"
                value={location}
                setValue={setLocation}
                error={errorLocation}
                setError={setErrorLocation}
                label="Location"
                editOn
            />
            <EditableInput
                type="dropdown"
                options={timezones}
                value={timezone}
                setValue={setTimezone}
                error={errorTimezone}
                setError={setErrorTimezone}
                label="Timezone"
                editOn
            />
        </DashboardModal>
    );
};

export default LocationModal;