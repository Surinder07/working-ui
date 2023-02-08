import React, { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import Tabs from "../dashboardComponents/Tabs";
import { LeaveTypeValues, RequestTypeValues } from "../../constants";
import { combineBoolean, fetchAndHandle, newRequestRequestBody, validateForEmptyField, validateForNumberNotZero, validateForTime } from "../../helpers";
import { requestService } from "../../services";

const CreateRequestModal = (props) => {

    const [requestType, setRequestType] = useState(RequestTypeValues[0].display);
    const [timeOffFormType, setTimeOffFormType] = useState("Full Day");
    const [fromDate, setFromDate] = useState("");
    const [tillDate, setTillDate] = useState("");
    const [typeOfLeave, setTypeOfLeave] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState("");

    const [errorDate, setErrorDate] = useState({});
    const [errorTypeOfLeave, setErrorTypeOfLeave] = useState({});
    const [errorStartTime, setErrorStartTime] = useState({});
    const [errorDuration, setErrorDuration] = useState({});
    const [errorDescription, setErrorDescription] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRequestType(RequestTypeValues[0].display);
    }, [])

    const onCancel = () => {
        setRequestType("")
        setFromDate("")
        setTillDate("")
        setTypeOfLeave("")
        setStartTime("")
        setDuration("")
        setDescription("")
        setErrorDate({})
        setErrorTypeOfLeave({})
        setErrorStartTime({})
        setErrorDuration({})
        setErrorDescription({})
    }

    const isError = () => {
        return combineBoolean(
            validateForEmptyField(fromDate, 'From or To', setErrorDate, (requestType === 'Timeoff' || requestType === 'Overtime')),
            validateForEmptyField(tillDate, 'From or To', setErrorDate, (requestType === 'Timeoff' && timeOffFormType === 'Full Day')),
            validateForTime(startTime, setErrorStartTime, ((requestType === 'Timeoff' && timeOffFormType === 'Half Day') || requestType === 'Overtime')),
            validateForNumberNotZero(duration, 'Duration', setErrorDuration, ((requestType === 'Timeoff' && timeOffFormType === 'Half Day') || requestType === 'Overtime')),
            validateForEmptyField(description, 'Description', setErrorDescription, true),
            validateForEmptyField(typeOfLeave, 'Type of leave', setErrorTypeOfLeave, requestType === 'Timeoff')
        );
    }


    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(() => requestService.addNew(newRequestRequestBody(requestType, timeOffFormType,
                fromDate, tillDate, typeOfLeave, startTime, duration, description)),
                'Request added successfully', setLoading, props.setReloadData, props.setPageLoading,
                onCancel, props.setShowModal, props.setToasterInfo);
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
                options={RequestTypeValues}
                placeholder='Select Request Type'
                value={requestType}
                setValue={setRequestType}
                label="Request Type"
                className={DashboardModalStyles.singleColumn}
                editOn
            />
            {
                (requestType === 'TIMEOFF' || requestType === 'OVERTIME') &&
                <>
                    {
                        requestType === 'TIMEOFF' &&
                        <Tabs
                            className={DashboardModalStyles.singleColumn}
                            options={["Full Day", "Half Day"]}
                            selected={timeOffFormType}
                            setSelected={setTimeOffFormType}
                            size="small"
                        />
                    }
                    {
                        (requestType === 'TIMEOFF' && timeOffFormType === 'Full Day') &&
                        <>
                            <EditableInput
                                type="date"
                                label="From"
                                value={fromDate}
                                setValue={setFromDate}
                                error={errorDate}
                                setError={setErrorDate}
                                blockPast
                                required
                                editOn
                            />
                            <EditableInput
                                type="date"
                                value={tillDate}
                                setValue={setTillDate}
                                label="Till"
                                blockPast
                                required
                                editOn
                            />
                        </>
                    }
                    {
                        ((requestType === 'TIMEOFF' && timeOffFormType === 'Half Day') || requestType === 'OVERTIME') &&
                        <>
                            <EditableInput
                                type="date"
                                label="Date"
                                value={fromDate}
                                setValue={setFromDate}
                                error={errorDate}
                                setError={setErrorDate}
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
                                required
                                editOn
                            />
                            <EditableInput
                                type="number"
                                label="Duration (In Hrs)"
                                placeholder='Duration in hours'
                                value={duration}
                                setValue={setDuration}
                                error={errorDuration}
                                setError={setErrorDuration}
                                required
                                editOn
                            />
                        </>
                    }
                    {
                        requestType === 'TIMEOFF' &&
                        <EditableInput
                            type="dropdown"
                            options={LeaveTypeValues}
                            label="Type of Leave"
                            value={typeOfLeave}
                            placeholder='Select a leave type'
                            setValue={setTypeOfLeave}
                            initialValue={typeOfLeave}
                            className={DashboardModalStyles.singleColumn}
                            error={errorTypeOfLeave}
                            setError={setErrorTypeOfLeave}
                            required
                            editOn
                        />
                    }
                </>
            }
            <EditableInput
                type="textarea"
                label="Description"
                className={DashboardModalStyles.singleColumn}
                value={description}
                setValue={setDescription}
                error={errorDescription}
                setError={setErrorDescription}
                required
                editOn
            />
        </DashboardModal>
    );
};

export default CreateRequestModal;
