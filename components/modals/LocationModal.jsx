import React, { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { dropdownService, locationAndRoleService } from "../../services";

const LocationModal = (props) => {

    const [timezones, setTimezones] = useState([]); // List to display

    const [location, setLocation] = useState('');
    const [timezone, setTimezone] = useState('');
    const [initialLocation,setInitialLocation] = useState('');
    const [initialTimezone,setInitialTimezone] = useState('');
    const [errorLocation, setErrorLocation] = useState({
        errorMessage: "",
        showError: false
    });
    const [errorTimezone, setErrorTimezone] = useState({
        errorMessage: "",
        showError: false
    });

    const onCancel = () => {
        setLocation("")
        setTimezone("")
        setErrorLocation({
            errorMessage: "",
            showError: false
        })
        setErrorTimezone({
            errorMessage: "",
            showError: false
        })
    }

    useEffect(() => {
        dropdownService.getTimezones().then(res => setTimezones(res));
    }, [])

    const saveData = () => {
        // @todo validate form
        locationAndRoleService.saveLocation(location, timezone)
            .then(res => {
                if (res.error) {
                    // @todo Add error
                } else {
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'Location added successfully'
                    });
                    props.setReloadData(true);
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
            onCancel={onCancel}
        >
            <EditableInput
                type="text"
                value={location}
                setValue={setLocation}
                initialValue={initialLocation}
                error={errorLocation}
                setError={setErrorLocation}
                label="Location"
                required
                editOn
            />
            <EditableInput
                type="dropdown"
                options={timezones}
                value={timezone}
                setValue={setTimezone}
                initialValue={initialTimezone}
                error={errorTimezone}
                setError={setErrorTimezone}
                label="Timezone"
                placeholder='Choose a timezone'
                required
                editOn
            />
        </DashboardModal>
    );
};

export default LocationModal;