import React from "react";
import {useState} from "react";
// import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CalenderHolidayModal = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText="Submit"
            title="Upload Holiday"
            type="singleCol"
        >
            <div className={DashboardModalStyles.singleColumn}>
                <div>
                    <CloudUploadIcon fontSize="large" color="action" />
                    <br />
                    <label htmlFor="upload">Select file to Import</label>
                    <input type="file" id="upload" style={{display: "none"}} />
                    <span>
                        <h4>
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
        </DashboardModal>
    );
};

export default CalenderHolidayModal;