import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";

const LocationModal = () => {

    const [showModal, setShowModal] = useState(true);
    const [location, setLocation] = useState('');

    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title="Add New Location"
            type="singleCol"
        >
            <EditableInput
                type="text"
                value={location}
                setValue={setLocation}
                label="Location"
                editOn
            />
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "Germany"]}
                label="Timezone"
                editOn
            />
        </DashboardModal>
    );
};

export default LocationModal;