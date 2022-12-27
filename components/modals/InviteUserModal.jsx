import { useEffect, useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";
import { CloudUpload, Close } from "@mui/icons-material";
import { dropdownService, memberService } from "../../services";
import { fetchWrapper } from "../../helpers";
import { saveUserRequestBody, fetchAndHandle, fetchAndHandleGet, validateForEmptyField } from '../../helpers';
import Link from 'next/link';

const InviteUserModal = (props) => {

    const fileEndpoint = process.env.endpoints.resources.fileTemplate;
    // ------------ Dropdown values
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    const toggleOption = ['Permanent', 'Part Time']
    // ----------------------------
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [toggleValue, setToggleValue] = useState(toggleOption[0]);
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);

    const [errorFirstName, setErrorFirstName] = useState({});
    const [errorLastName, setErrorLastName] = useState({});
    const [errorEmail, setErrorEmail] = useState({});
    const [errorLocation, setErrorLocation] = useState({});
    const [errorRole, setErrorRole] = useState({});

    const onCancel = () => {
        setFirstName("");
        setLastName("");
        setEmployeeId("");
        setEmail("");
        setLocation("");
        setRole("");
        setRoles([]);
        setFile({});
        setToggleValue(toggleOption[0]);
        setErrorFirstName({});
        setErrorLastName({});
        setErrorEmail({});
        setErrorLocation({});
        setErrorRole({})
    }

    useEffect(() => {
        if (props.role === 'ADMIN') {
            fetchAndHandleGet(() => dropdownService.getLocations(), setLocations);
        } else {
            fetchAndHandleGet(() => dropdownService.getRoles(null), setRoles);
        }
    }, [])

    useEffect(() => {
        if (location && location !== '') {
            fetchAndHandleGet(() => dropdownService.getRoles(location), setRoles);
        }
    }, [location])

    const isError = () => {
        return validateForEmptyField(firstName, 'First Name', setErrorFirstName, true) ||
            validateForEmptyField(lastName, 'Last Name', setErrorLastName, true) ||
            validateForEmptyField(email, 'Email', setErrorEmail, true) ||
            validateForEmptyField(role, 'Role', setErrorRole, true) ||
            validateForEmptyField(location, 'Location', setErrorLocation, props.role === 'ADMIN');
    }

    const saveData = () => {
        if (file.name) {
            fetchAndHandle(memberService.inviteByUpload({ file: file }), null, setLoading,
                props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo);
        } else if (!isError()) {
            fetchAndHandle(memberService.sendInvite(saveUserRequestBody(firstName, lastName, role,
                location, employeeId, email, toggleValue === 'Permanent')), 'Invite Sent Successfully',
                setLoading, props.setReloadData, props.setPageLoading, onCancel, props.setShowModal,
                props.setToasterInfo);
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Invite User"
            type="twoColWide"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <div className={DashboardModalStyles.singleColumn}>
                <div className={`${DashboardModalStyles.uploadContainer}`}>
                    <CloudUpload className={DashboardModalStyles.icon} />
                    <label htmlFor="upload">Select file to Import</label>
                    <input type="file" id="upload" style={{ display: 'none' }} files={[file]} onChange={handleFileChange} />
                    {
                        file.name &&
                        <p className={DashboardModalStyles.fileName}>
                            {file.name}
                            <Close className={DashboardModalStyles.icon} onClick={() => setFile({})} />
                        </p>
                    }
                    <p>Must be .xlsx or .csv file using our email template</p>
                    <p>
                        {`Download `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, { resource: 'inviteUser', format: 'xlsx' })}
                            className={DashboardModalStyles.download}>xlsx</Link>
                        {` or `}
                        <Link download href={fetchWrapper.getApiUrl(fileEndpoint, { resource: 'inviteUser', format: 'csv' })}
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
                initialValue={firstName}
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
                initialValue={lastName}
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
                initialValue={employeeId} s
                editOn
            />
            <EditableInput
                type="text"
                label="Email Address"
                value={email}
                setValue={setEmail}
                initialValue={email}
                error={errorEmail}
                setError={setErrorEmail}
                required
                editOn
            />
            {
                props.role === 'ADMIN' &&
                <EditableInput
                    type="typeAhead"
                    options={locations}
                    label="Location"
                    value={location}
                    setValue={setLocation}
                    initialValue={location}
                    error={errorLocation}
                    setError={setErrorLocation}
                    placeholder='Select a Location'
                    required
                    editOn
                />
            }
            <EditableInput
                type="typeAhead"
                options={roles}
                label="Role"
                value={role}
                setValue={setRole}
                initialValue={role}
                error={errorRole}
                setError={setErrorRole}
                placeholder='Select a Role'
                required
                editOn
            />
            <EditableInput
                className={DashboardModalStyles.singleColumn}
                type="toggle2"
                options={toggleOption}
                value={toggleValue}
                setValue={setToggleValue}
                initialValue={toggleValue}
                editOn
            />
        </DashboardModal>
    );
};

export default InviteUserModal;
