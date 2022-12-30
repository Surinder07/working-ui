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
     // initial states
     const [initialRequestTypeValue,setInitialRequestTypeValue] = useState("");
     const [initialTitle,setInitialTitle] = useState("");
     const [initialFromDate,setInitialFromDate] = useState("");
     const [initialTillDate,setInitialTillDate] = useState("");
     const [initialTypeOfLeave,setInitialTypeOfLeave] = useState("");
     const [initialOverTimeDate,setInitialOverTimeDate] = useState("");
     const [initialStartTime,setInitialStartTime] = useState("");
     const [initialDuration,setInitialDuration] = useState("");
     const [initialDescription,setInitialDescription] = useState("");



    const [errorRequestTypeValue, setErrorRequestTypeValue] = useState({
        message: "",
        show: false,
    });
    const [errorDate,setErrorDate] = useState({
        message: "",
        show: false,
    })
    //Personal Information Update"
    const [errorTitle, setErrorTitle] = useState({
        message: "",
        show: false,
    });

    // Time of Requests
    const [errorTypeOfLeave, setErrorTypeOfLeave] = useState({
        message: "",
        show: false,
    });
    //Overtime Requests
    const [errorStartTime, setErrorStartTime] = useState({
        message: "",
        show: false,
    });
    const [errorOverTimeDate, setErrorOverTimeDate] = useState({
        message: "",
        show: false,
    })
    const [errorDuration, setErrorDuration] = useState({
        message: "",
        show: false,
    });
    const [errorDescription, setErrorDescription] = useState({
        message: "",
        show: false,
    });
    
    const [loading, setLoading] = useState(false);

    const onCancel = ()=> {
        setRequestTypeValue("")
        setTitle("")
        setFromDate("")
        setTillDate("")
        setTypeOfLeave("")
        setOverTimeDate("")
        setStartTime("")
        setDuration("")
        setDescription("")
        setErrorRequestTypeValue({
            message: "",
            show:false
        })
        setErrorTitle({
            message: "",
            show:false
        })
        setErrorDate({
            message: "",
            show:false
        })
        setErrorOverTimeDate({
            message: "",
            show:false
        })
        setErrorTypeOfLeave({
            message: "",
            show:false
        })
        setErrorStartTime({
            message: "",
            show:false
        })
        setErrorDuration({
            message: "",
            show:false
        })
        setErrorDescription({
            message: "",
            show:false
        })
    }


    const isError = () => {
        return validateForEmptyField(fromDate, 'From', setErrorDate, true) ||
               validateForEmptyField(toDate, 'To', setErrorDate, true) ||
               validateForEmptyField(overTimeDate, 'Date', setErrorOverTimeDate, true)
    }


    const saveData = () => {
        if (!isError()) {
            fetchAndHandle()
                // setLoading(true)
                // if(error == true){
                //     props.setToasterInfo({
                //         error: true,
                //         title: 'Error!',
                //         message: res.message
                //     })
                // }
                // else{
                //     props.setToasterInfo({
                //         error: false,
                //         title: 'Success!',
                //         message: 'Request created successfully'
                //     });
                //     props.setReloadData(true)
                //     onCancel()
                // }
                // setLoading(false)
            }
        
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Create Request"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
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
                initialValue={requestTypeValue}
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
                        initialValue={title}
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
                                initialValue={fromDate}
                                error={errorDate}
                                setError={setErrorDate}
                                required
                                editOn
                            />
                            <EditableInput
                                type="date"
                                value={tillDate}
                                setValue={setTillDate}
                                initialValue={tillDate}
                                error={errorDate}
                                setError={setErrorDate}
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
                        initialValue={typeOfLeave}
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
                        initialValue={overTimeDate}
                        error={errorOverTimeDate}
                        setError={setErrorOverTimeDate}
                        className={DashboardModalStyles.singleColumn}
                        required
                        editOn
                    />
                    <EditableInput
                        type="time"
                        label="Start Time"
                        value={startTime}
                        setValue={setStartTime}
                        initialValue={startTime}
                        error={errorStartTime}
                        setError={setErrorStartTime}
                        editOn
                    />
                    <EditableInput
                        type="text"
                        label="Duration"
                        value={duration}
                        setValue={setDuration}
                        initialValue={duration}
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
                initialValue={description}
                error={errorDescription}
                setError={setErrorDescription}
                editOn
            />
        </DashboardModal>
    );
};

export default CreateRequestModal;
