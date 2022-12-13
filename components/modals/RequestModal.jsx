import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
// import {DashboardModalStyles} from "../../styles/elements";

const RequestsModal = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title="Edit Request"
            type="singleCol"
        >
            <EditableInput type="radio" label="Approve" editOn />
            <EditableInput type="radio" label="Reject" editOn />
            <EditableInput type="radio" label="Refer back to employee" editOn />
            <EditableInput type="text" label="Comment" required editOn />
        </DashboardModal>
    );
};

export default RequestsModal;