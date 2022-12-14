import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";

const LocationModal = (props) => {

   
    const [location, setLocation] = useState('');
    const [timezone,setTimezone] = useState('');
    const [errorLocation,setErrorLocation] = useState({
        errorMessage: "",
        showError: false
    });
    const [errorTimezone,setErrorTimezone]= useState({
        errorMessage: "",
        showError: false
    })
    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Add New Location"
            type="singleCol"
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
                options={["India", "Canada", "Germany"]}
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