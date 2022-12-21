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
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setLocation("")
        setTimezone("")
        setErrorLocation({
            message: "",
            show: false
        })
        setErrorTimezone({
            message: "",
            show: false
        })
    }

    useEffect(() => {
        dropdownService.getTimezones().then(res => setTimezones(res));
    }, [])

    const validateForm = async () => {
        let error = false;
        if (location === '') {
            setErrorLocation({
                message: 'Name is required',
                show: true
            })
            error = true;
        }
        if (timezone === '') {
            setErrorTimezone({
                message: 'Timezone is required',
                show: true
            })
            error = true;
        }
        return error;
    }

    const saveData = () => {
        validateForm()
            .then(error => {
                if (!error) {
                    setLoading(true);
                    locationAndRoleService.saveLocation(location, timezone)
                        .then(res => {
                            if (res.error) {
                                props.setToasterInfo({
                                    error: true,
                                    title: 'Error!',
                                    message: res.message
                                });
                            } else {
                                props.setToasterInfo({
                                    error: false,
                                    title: 'Success!',
                                    message: 'Location added successfully'
                                });
                                props.setReloadData(true);
                                onCancel();
                            }
                            setLoading(false);
                        });
                }
            })
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
            loading={loading}
        >
            <EditableInput
                type="text"
                value={location}
                setValue={setLocation}
                initialValue={location}
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
                initialValue={timezone}
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