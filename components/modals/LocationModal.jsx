import { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { dropdownService, locationAndRoleService } from "../../services";
import { fetchAndHandle, fetchAndHandleGet, validateForEmptyField } from "../../helpers";

const LocationModal = (props) => {
    //------------- Dropdown values
    const [timezones, setTimezones] = useState([]);
    //-----------------------------
    const [location, setLocation] = useState('');
    const [timezone, setTimezone] = useState('');
    const [errorLocation, setErrorLocation] = useState({});
    const [errorTimezone, setErrorTimezone] = useState({});
    const [loading, setLoading] = useState(false);

    const onCancel = () => {
        setLocation("")
        setTimezone("")
        setErrorLocation({})
        setErrorTimezone({})
    }

    useEffect(() => {
        fetchAndHandleGet(dropdownService.getTimezones, setTimezones);
    }, [])

    const isError = () => {
        return validateForEmptyField(location, 'Name', setErrorLocation, true) ||
            validateForEmptyField(timezone, 'Timezone', setErrorTimezone, true);
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(() => locationAndRoleService.saveLocation({ name: location, timezone }),
                'Location added successfully', setLoading, props.setReloadData, props.setPageLoading,
                onCancel, props.setShowModal, props.setToasterInfo);
        }
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
                type="typeAhead"
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