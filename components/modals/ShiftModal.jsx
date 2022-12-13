import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";

const ShiftDetailsModal = () => {
    const [showModal, setShowModal] = useState(true);
    const [value,setValue] = useState("")
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title="Edit Shift"
            type="twoColNarrow"
        >
            <EditableInput
                type="date"
                label="Date"
                value={value} setValue={setValue}
                className={DashboardModalStyles.singleColumn}
                editOn
            />
            <EditableInput type="time" label="In Time" editOn />
            <EditableInput type="time" label="Out Time" editOn />
            <EditableInput
                type="text"
                label="Comment"
                className={DashboardModalStyles.singleColumn}
                required
                editOn
            />
        </DashboardModal>
    );
};

export default ShiftDetailsModal