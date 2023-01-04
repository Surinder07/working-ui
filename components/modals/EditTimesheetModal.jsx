import React, { useEffect } from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import { fetchAndHandle, validateForEmptyField } from "../../helpers";

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
    const [inTimeError, setInTimeError] = useState({});
    const [outTimeError, setOutTimeError] = useState({});
    const [commentError, setCommentError] = useState({});
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

    useEffect(() => {
        props.setData && props.setData({
            inDate,
            outDate,
            inTime,
            outTime,
            comment
        })
    },[])

    const isError =  () => {
       return validateForEmptyField(comment, 'comment', setCommentError, true)
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(setLoading,props.setReloadData,props.setPageLoading,onCancel,props.setShowModal,props.setToasterInfo)
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
                //         message: 'TimeSheet edited successfully'
                //     });
                //     props.setReloadData(true)
                //     onCancel()
                // setLoading(false)
            }
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
                    initialValue={inDate}
                    editOn
                />
                <EditableInput
                    type="date"
                    label="Out Date"
                    value={outDate}
                    setValue={setOutDate}
                    initialValue={outDate}
                    editOn
                />
                <EditableInput
                    type="time"
                    label="In Time"
                    value={inTime}
                    setValue={setInTime}
                    initialValue={inTime}
                    error={inTimeError}
                    setError={setInTimeError}
                    editOn
                />
                <EditableInput
                    type="time"
                    label="Out Time"
                    value={outTime}
                    setValue={setOutTime}
                    initialValue={outTime}
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
                    initialValue={comment}
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
