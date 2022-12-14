import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";

const EditTimesheetModal = (props) => {
   
    const [value,setValue] = useState("")
    return (
        <div>
            <DashboardModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Submit"
                title="Edit Time Sheet"
                type="twoColNarrow"
            >
                <EditableInput type="date" label="In Date"  value={value} setValue={setValue} editOn />
                <EditableInput type="date" label="Out Date"  value={value} setValue={setValue} editOn />
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
        </div>
    );
};

export default EditTimesheetModal