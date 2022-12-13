import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
// import {DashboardModalStyles} from "../../styles/elements";

const LocationModal = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title="Add New Location"
            type="singleCol"
        >
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "Germany"]}
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