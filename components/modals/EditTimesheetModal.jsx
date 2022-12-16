import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";

const EditTimesheetModal = (props) => {
    const [inDate, setInDate] = useState("");
    const [outDate, setOutDate] = useState("");
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [comment, setComment] = useState("");
    const [inTimeError, setInTimeError] = useState({
        errorMessage: "",
        showError: false,
    });
    const [outTimeError, setOutTimeError] = useState({
        errorMessage: "",
        showError: false,
    });
    const [commentError, setCommentError] = useState({
        errorMessage: "",
        showError: false,
    });
    return (
        <div>
            <DashboardModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Submit"
                title="Edit Time Sheet"
                type="twoColNarrow"
            >
                <EditableInput
                    type="date"
                    label="In Date"
                    value={inDate}
                    setValue={setInDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="Out Date"
                    value={outDate}
                    setValue={setOutDate}
                    editOn
                />
                <EditableInput
                    type="time"
                    label="In Time"
                    value={inTime}
                    setValue={setInTime}
                    error={inTimeError}
                    setError={setInTimeError}
                    editOn
                />
                <EditableInput
                    type="time"
                    label="Out Time"
                    value={outTime}
                    setValue={setOutTime}
                    error={outTimeError}
                    setError={setOutTimeError}
                    editOn
                />
                <EditableInput
                    type="text"
                    label="Comment"
                    className={DashboardModalStyles.singleColumn}
                    value={comment}
                    setValue={setComment}
                    error={commentError}
                    setError={setCommentError}
                    required
                    editOn
                />
            </DashboardModal>
        </div>
    );
};

export default EditTimesheetModal;
