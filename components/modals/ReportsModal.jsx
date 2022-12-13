import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";



const ReportsModal = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title=""
            type="twoColNarrow"
        >
            <EditableInput type="text" label="From" editOn />
            <EditableInput type="text" label="Till" editOn />
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