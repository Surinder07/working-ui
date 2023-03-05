import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { combineBoolean, fetchAndHandle, validateForEmptyField, validateForTime } from "../../helpers";
import { shiftsService, timesheetService } from "../../services";
import { useEffect } from "react";

const EditShiftTimesheetModal = (props) => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [comment, setComment] = useState("");
    const [startTime, setStartTime] = useState({ hours: 0, minutes: 0 });
    const [endTime, setEndTime] = useState({ hours: 0, minutes: 0 });
    const [initialStartTime, setInitialStartTime] = useState({ hours: 0, minutes: 0 });
    const [initialEndTime, setInitialEndTime] = useState({ hours: 0, minutes: 0 });
    const [initialComment, setInitialComment] = useState("");

    const [startTimeError, setStartTimeError] = useState({
        message: "",
        show: false,
    });
    const [endTimeError, setEndTimeError] = useState({
        message: "",
        show: false,
    });
    const [commentError, setCommentError] = useState({
        message: "",
        show: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.showModal) {
            if (props.type === 'Shift') {
                shiftsService.getById(props.id)
                    .then(res => {
                        if (res.error) {

                        } else {
                            updateState(res);
                        }
                    })
            } else {
                timesheetService.getById(props.id)
                    .then(res => {
                        if (res.error) {

                        } else {
                            updateState(res);
                        }
                    })
            }
        }
    }, [props]);

    const updateState = (data) => {
        const timeArrayStart = data.start.time.split(':');
        const timeArrayEnd = data.end.time.split(':');
        setComment(data.notes);
        setInitialComment(data.notes);
        setStartDate(data.start.date);
        setEndDate(data.end.date);
        setStartTime({ hours: timeArrayStart[0], minutes: timeArrayStart[1] });
        setInitialStartTime({ hours: timeArrayStart[0], minutes: timeArrayStart[1] });
        setEndTime({ hours: timeArrayEnd[0], minutes: timeArrayEnd[1] });
        setInitialEndTime({ hours: timeArrayEnd[0], minutes: timeArrayEnd[1] });
    }

    const getRequestBody = () => {
        return { 
            start: { date: startDate, time: startTime.hours + ':' + startTime.minutes }, 
            end: { date: endDate, time: endTime.hours + ':' + endTime.minutes }, 
            comments: comment, 
            id: props.id 
        }
    }

    const isError = () => {
        return combineBoolean(
            validateForEmptyField(comment, 'Comment', setCommentError, true),
            validateForTime(startTime, setStartTimeError, true),
            validateForTime(endTime, setEndTimeError, true)
        )
    }

    const saveData = () => {
        if (!isError()) {
            setLoading(true);
            if (props.type === 'Shift') {
                fetchAndHandle(() => shiftsService.editShift(getRequestBody()),
                    "Shift updated Successfully", setLoading, props.setReloadData, props.setPageLoading,
                    onCancel, props.setShowModal, props.setToasterInfo);
            } else {
                fetchAndHandle(() => timesheetService.editTimesheet(getRequestBody()),
                    "Timesheet updated Successfully", setLoading, props.setReloadData, props.setPageLoading,
                    onCancel, props.setShowModal, props.setToasterInfo);
            }
        }
    }

    const onCancel = () => {
        setStartTime(initialStartTime);
        setEndTime(initialEndTime);
        setComment(initialComment);
        props.setShowModal(false);
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title={`Update ${props.type}`}
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput
                type="date"
                label="Start Date"
                value={startDate}
                setValue={setStartDate}
                initialValue={startDate}
            />
            <EditableInput
                type="date"
                label="End Date"
                value={endDate}
                setValue={setEndDate}
                initialValue={endDate}
            />
            <EditableInput
                type="time"
                label="Start"
                value={startTime}
                setValue={setStartTime}
                StartitialValue={initialStartTime}
                error={startTimeError}
                setError={setStartTimeError}
                required
                editOn
            />
            <EditableInput
                type="time"
                label="End"
                value={endTime}
                setValue={setEndTime}
                initialValue={initialEndTime}
                error={endTimeError}
                setError={setEndTimeError}
                required
                editOn
            />
            <EditableInput
                type="textarea"
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
    )
}

export default EditShiftTimesheetModal;