import { useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";
import { CloudUpload } from "@mui/icons-material";
import { fetchWrapper } from "../../helpers";
import Link from 'next/link';

const InviteUserModal = (props) => {
    
    const fileEndpoint = process.env.endpoints.resources.fileTemplate;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [typeOfEmployee, setTypeOfEmployee] = useState("");
    const [location, setLocation] = useState("");
    const [toggleValue, setToggleValue] = useState("Permanent");
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


    const handleFileChange = (e) => {
        if (e.target.files.length) {
            handleUpload(e.target.files[0]);
            /**
            * @todo change image in user details
            */
        }
    }

    const handleUpload = async file => {
        console.log('data received', file);
        // const formData = new FormData();
        // formData.append("image", image.raw);

        // await fetch("YOUR_URL", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     body: formData
        // });
    };

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Invite User"
            type="twoColWide"
        >
            <div className={DashboardModalStyles.singleColumn}>
                <div className={`${DashboardModalStyles.uploadContainer}`}>
                    <CloudUpload className={DashboardModalStyles.icon} />
                    <label htmlFor="upload">Select file to Import</label>
                    <input type="file" id="upload" style={{ display: "none" }}  onChange={handleFileChange} />
                    <p>Must be .xlsx or .csv file using our email template</p>
                    <p>
                        {`Download `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, {resource: 'inviteUser', format:'xlsx'})}
                            className={DashboardModalStyles.download} target='_blank'>xlsx</Link>
                        {` or `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, {resource: 'inviteUser', format:'csv'})}
                            className={DashboardModalStyles.download}>csv</Link>
                        {` template here`}
                    </p>
                </div>
                <p className={DashboardModalStyles.seperator}>— OR —</p>
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
                type="toggle2"
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
