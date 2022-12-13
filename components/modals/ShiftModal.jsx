import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";

const ShiftDetailsModal = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title=""
            type="twoColNarrow"
        >
            <EditableInput
                type="text"
                label="Date"
                className={DashboardModalStyles.singleColumn}
                editOn
            />
            <EditableInput type="time" label="In Time" editOn />
            <EditableInput type="time" label="Out Time" editOn />
            <EditableInput
                type="text"
                label="Comment"
                className={DashboardModalStyles.singleColumn}
                editOn
            />
        </DashboardModal>
    );
};

export default ShiftDetailsModal