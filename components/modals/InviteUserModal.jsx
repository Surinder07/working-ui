import React, {useState} from "react";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import {EditableInput} from "../inputComponents";
import {ModalStyles} from "../../styles/elements";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InviteUserModal = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [typeOfEmployee, setTypeOfEmployee] = useState("");
    const [location, setLocation] = useState("");
    const [toggleValue, setToggleValue] = useState("");

    const [errorFirstName, setErrorFirstName] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorLastName, setErrorLastName] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorEmployeeId, setErrorEmployeeId] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorEmail, setErrorEmail] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorTypeOfEmployee, setErrorTypeOfEmployee] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorLocation, setErrorLocation] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorToggleValue, setErrorToggleValue] = useState({
        errorMessage: "",
        showError: false,
    });
    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Invite User"
            type="twoColWide"
        >
            <div className={DashboardModalStyles.singleColumn}>
                <CloudUploadIcon fontSize="large" color="action" />
                <br />
                <label htmlFor="upload">Select file to Import</label>
                <input type="file" id="upload" style={{display: "none"}} />
                <span>
                    <h4>Must be .xlsx or .csv file using our email template</h4>
                    <p>
                        Download template:
                        <a href="https://xyzabc@gmail.com" target="_blank">
                            https://xyzabc@gmail.com
                        </a>
                    </p>
                </span>
            </div>

            <EditableInput
                type="text"
                label="First Name"
                value={firstName}
                setValue={setFirstName}
                error={errorFirstName}
                setError={setErrorFirstName}
                required
                editOn
            />
            <EditableInput
                type="text"
                label="Last Name"
                value={lastName}
                setValue={setLastName}
                error={errorLastName}
                setError={setErrorLastName}
                required
                editOn
            />
            <EditableInput
                type="text"
                label="External Employee ID"
                value={employeeId}
                setValue={setEmployeeId}
                error={errorEmployeeId}
                setError={setErrorEmployeeId}
                editOn
            />
            <EditableInput
                type="text"
                label="Email Address"
                value={email}
                setValue={setEmail}
                error={errorEmail}
                setError={setErrorEmail}
                editOn
            />
            <EditableInput
                type="dropdown"
                options={["admin", "user"]}
                label="Type of Employee"
                value={typeOfEmployee}
                setValue={setTypeOfEmployee}
                error={errorTypeOfEmployee}
                setError={setErrorTypeOfEmployee}
                required
                editOn
            />
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "France", "Germany"]}
                label="Location"
                value={location}
                setValue={setLocation}
                error={errorLocation}
                setError={setErrorLocation}
                required
                editOn
            />
            <EditableInput
                type="toggle"
                options={["Permanent", "Part Time"]}
                value={toggleValue}
                setValue={setToggleValue}
                error={errorToggleValue}
                setError={setErrorToggleValue}
                editOn
            />
        </DashboardModal>
    );
};

export default InviteUserModal;
