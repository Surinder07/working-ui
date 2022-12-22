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

    const [initialInDate,setInitialInDate] = useState("");
    const [initialOutDate,setInitialOutDate] = useState("");
    const [initialInTime,setInitialInTime] = useState("");
    const [initialOutTime,setInitialOutTime] = useState("");
    const [initialComment,setInitialComment] = useState("");
    const [inTimeError, setInTimeError] = useState({
        message: "",
        show: false,
    });
    const [outTimeError, setOutTimeError] = useState({
        message: "",
        show: false,
    });
    const [commentError, setCommentError] = useState({
        message: "",
        show: false,
    });
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
        setInDate("")
        setOutDate("")
        setInTime("")
        setOutTime("")
        setComment("")
        setInTimeError({
            message: "",
            show: false
        })
        setOutTimeError({
            message: "",
            show: false
        })
        setCommentError({
            message: "",
            show: false
        })
    }

    const validateForm = async () => {
        let error = false;
        if(comment === '') {setCommentError({
            message: 'comment is required',
            show: true
        })
        error = true
    }
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

    return (
        <div>
            <DashboardModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText="Submit"
                title="Edit Time Sheet"
                type="twoColNarrow"
                onClick={saveData}
                onCancel={onCancel}
                loading={loading}
            >
                <EditableInput
                    type="date"
                    label="In Date"
                    value={inDate}
                    setValue={setInDate}
                    initialValue={initialInDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="Out Date"
                    value={outDate}
                    setValue={setOutDate}
                    initialValue={initialOutDate}
                    editOn
                />
                <EditableInput
                    type="time"
                    label="In Time"
                    value={inTime}
                    setValue={setInTime}
                    initialValue={initialInTime}
                    error={inTimeError}
                    setError={setInTimeError}
                    editOn
                />
                <EditableInput
                    type="time"
                    label="Out Time"
                    value={outTime}
                    setValue={setOutTime}
                    initialValue={initialOutTime}
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
                    initialValue={initialComment}
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
