import React from "react";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {EditableInput} from "../inputComponents";
import {ModalStyles} from "../../styles/elements";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InviteUserModal = (props) => {
    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Invite User"
            type="twoColWide"
        >
            <div className={DashboardModalStyles.singleColumn}>
                <div>
                    <CloudUploadIcon fontSize="large" color="action" />
                    <br />
                    <label htmlFor="upload">Select file to Import</label>
                    <input type="file" id="upload" style={{display: "none"}} />
                    <span>
                        <h4 id={ModalStyles.paraInInput}>
                            Must be .xlsx or .csv file using our email template
                        </h4>
                        <p>
                            Download template:
                            <a href="https://xyzabc@gmail.com" target="_blank">
                                https://xyzabc@gmail.com
                            </a>
                        </p>
                    </span>
                </div>
                <p>-OR-</p>
            </div>

            <EditableInput type="text" label="First Name" editOn />
            <EditableInput type="text" label="Last Name" editOn />
            <EditableInput type="text" label="External Employee ID" editOn />
            <EditableInput type="text" label="Email Address" editOn />
            <EditableInput
                type="dropdown"
                options={["admin", "user"]}
                label="Type of Employee"
                editOn
            />
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "France", "Germany"]}
                label="Location"
                editOn
            />
            <EditableInput
                type="toggle"
                options={["Permanent", "Part Time"]}
                editOn
            />
        </DashboardModal>
    );
};

export default InviteUserModal;
