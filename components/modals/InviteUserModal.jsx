import { useEffect, useState } from "react";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";
import { CloudUpload } from "@mui/icons-material";
import { dropdownService } from "../../services";
import { fetchWrapper } from "../../helpers";
import Link from 'next/link';

const InviteUserModal = (props) => {

    const fileEndpoint = process.env.endpoints.resources.fileTemplate;
    // ------------ Dropdown values
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    // ----------------------------
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [toggleValue, setToggleValue] = useState("Permanent");

    const [errorFirstName, setErrorFirstName] = useState({
        message: "",
        show: false,
    });
    const [errorLastName, setErrorLastName] = useState({
        message: "",
        show: false,
    });
    const [errorEmployeeId, setErrorEmployeeId] = useState({
        message: "",
        show: false,
    });
    const [errorEmail, setErrorEmail] = useState({
        message: "",
        show: false,
    });
    const [errorLocation, setErrorLocation] = useState({
        message: "",
        show: false,
    });
    const [errorRole, setErrorRole] = useState({
        message: "",
        show: false,
    });
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
        setFirstName("");
        setLastName("");
        setEmployeeId("");
        setEmail("");
        setLocation("");
        setRole("");
        setRoles([]);
        setToggleValue("Permanent");
        setErrorFirstName({
            message: "",
            show: false
        });
        setErrorLastName({
            message: "",
            show: false
        });
        setErrorEmployeeId({
            message: "",
            show: false
        });
        setErrorEmail({
            message: "",
            show: false
        });
        setErrorLocation({
            message: "",
            show: false
        });
        setErrorRole({
            message: "",
            show: false
        })
    }

    useEffect(() => {
        if (props.role === 'ADMIN') {
            dropdownService.getLocations()
                .then(res => {
                    if (!res.error) {
                        setLocations(res);
                    }
                })
        } else {
            dropdownService.getRoles(null)
                .then(res => {
                    if (!res.error) {
                        setRoles(res);
                    }
                });
        }
    }, [])

    useEffect(() => {
        if (location !== '') {
            dropdownService.getRoles(location)
                .then(res => {
                    if (!res.error) {
                        setRoles(res);
                    }
                });
        }
    }, [location])

    const validateForm = async () => {
        let error = false;
        if(firstName === '') {setErrorFirstName({
            message: 'First Name is required',
            show: true
        })
        error = true;
        }
        if(lastName === '') {setErrorLastName({
            message: 'Last Name is required',
            show: true
        })
        error = true;
        }
        if(email === '') {setErrorEmail({
            message: 'Email is required',
            show: true
        })
        error = true;
        }
        if(role === '') {setErrorRole({
            message: 'Role is required',
            show: true
        })}
     
        return error
    }

    const saveData = () => {
        validateForm()
        .then(error => {
            if(!error) {

                setLoading(true)
                if(error == true){
                    props.setToasterInfo({
                        error: true,
                        title: 'Error!',
                        message: res.message
                    })
                }
                else{
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'User invited successfully'
                    });
                    props.setReloadData(true)
                    onCancel()
                }
                setLoading(false)
            }
        })
    }

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
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <div className={DashboardModalStyles.singleColumn}>
                <div className={`${DashboardModalStyles.uploadContainer}`}>
                    <CloudUpload className={DashboardModalStyles.icon} />
                    <label htmlFor="upload">Select file to Import</label>
                    <input type="file" id="upload" style={{ display: "none" }} onChange={handleFileChange} />
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
                initialValue={employeeId}
                error={errorEmployeeId}
                setError={setErrorEmployeeId}
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
            {props.role === 'ADMIN' &&
                <EditableInput
                    type="dropdown"
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
                />}
            <EditableInput
                type="dropdown"
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
                options={["Permanent", "Part Time"]}
                value={toggleValue}
                setValue={setToggleValue}
                initialValue={toggleValue}
                editOn
            />
        </DashboardModal>
    );
};

export default InviteUserModal;
