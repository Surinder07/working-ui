import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";



const ReportsModal = () => {
    const [showModal, setShowModal] = useState(true);
    const [value,setValue] = useState("");
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title="Add Reports"
            type="twoColNarrow"
        >
            <EditableInput type="date"  value={value} setValue={setValue} label="From" editOn />
            <EditableInput type="date"  value={value} setValue={setValue} label="Till" editOn />
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "Germany"]}
                label="Location"
                className={DashboardModalStyles.singleColumn}
                editOn
            />
        </DashboardModal>
    );
};

export default ReportsModal;