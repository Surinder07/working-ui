import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import Tabs from "../dashboardComponents/Tabs";
const CreateRequestModal = (props) => {
    const [formType, setFormType] = useState("Full Day");
    const [options, setOptions] = useState("Overtime Request"); //"Personal Information Update" "Time of Request","Overtime Request"
    const [requestTypeValue, setRequestTypeValue] = useState("");
    //Personal Information Update"
    const [title, setTitle] = useState("");

    // Time of Requests
    const [fromDate, setFromDate] = useState("");
    const [tillDate, setTillDate] = useState("");
    const [typeOfLeave, setTypeOfLeave] = useState("");
    //Overtime Requests
    const [overTimeDate, setOverTimeDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");

    const [errorRequestTypeValue, setErrorRequestTypeValue] = useState({
        errorMessage: "",
        showError: false,
    });
    //Personal Information Update"
    const [errorTitle, setErrorTitle] = useState({
        errorMessage: "",
        showError: false,
    });

    // Time of Requests
    const [errorTypeOfLeave, setErrorTypeOfLeave] = useState({
        errorMessage: "",
        showError: false,
    });
    //Overtime Requests
    const [errorStartTime, setErrorStartTime] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorDuration, setErrorDuration] = useState({
        errorMessage: "",
        showError: false,
    });
    const [errorDescription, setErrorDescription] = useState({
        errorMessage: "",
        showError: false,
    });

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Create Request"
            type="twoColNarrow"
        >
            <EditableInput
                type="dropdown"
                options={[
                    "Personal Information Update",
                    "Time of Request",
                    "Overtime Request",
                ]}
                value={requestTypeValue}
                setValue={setRequestTypeValue}
                label="Request Type"
                className={DashboardModalStyles.singleColumn}
                error={errorRequestTypeValue}
                setError={setErrorRequestTypeValue}
                editOn
            />
            {options === "Personal Information Update" ? (
                <>
                    <EditableInput
                        type="text"
                        label="Title"
                        value={title}
                        setValue={setTitle}
                        className={DashboardModalStyles.singleColumn}
                        error={errorTitle}
                        setError={setErrorTitle}
                        editOn
                    />
                </>
            ) : options === "Time of Request" ? (
                <>
                    <Tabs
                        className={DashboardModalStyles.singleColumn}
                        options={["Full Day", "Half Day"]}
                        selected={formType}
                        setSelected={setFormType}
                        size="big"
                    />
                    {formType === "Full Day" ? (
                        <>
                            <EditableInput
                                type="date"
                                label="From"
                                value={fromDate}
                                setValue={setFromDate}
                                required
                                editOn
                            />
                            <EditableInput
                                type="date"
                                value={tillDate}
                                setValue={setTillDate}
                                label="Till"
                                required
                                editOn
                            />
                        </>
                    ) : (
                        <></>
                    )}
                    <EditableInput
                        type="dropdown"
                        options={["India", "Canada", "Germany"]}
                        label="Type of Leave"
                        value={typeOfLeave}
                        setValue={setTypeOfLeave}
                        className={DashboardModalStyles.singleColumn}
                        error={errorTypeOfLeave}
                        setError={setErrorTypeOfLeave}
                        editOn
                    />
                </>
            ) : (
                <>
                    <EditableInput
                        type="date"
                        label="Date"
                        value={overTimeDate}
                        setValue={setOverTimeDate}
                        className={DashboardModalStyles.singleColumn}
                        required
                        editOn
                    />
                    <EditableInput
                        type="time"
                        label="Start Time"
                        value={startTime}
                        setValue={setStartTime}
                        error={errorStartTime}
                        setError={setErrorStartTime}
                        editOn
                    />
                    <EditableInput
                        type="text"
                        label="Duration"
                        value={duration}
                        setValue={setDuration}
                        error={errorDuration}
                        setError={setErrorDuration}
                        editOn
                    />
                </>
            )}
            <EditableInput
                type="text"
                label="Description"
                className={DashboardModalStyles.singleColumn}
                value={description}
                setValue={setDescription}
                error={errorDescription}
                setError={setErrorDescription}
                editOn
            />
        </DashboardModal>
    );
};

export default CreateRequestModal;
