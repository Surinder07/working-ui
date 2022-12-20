import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";

const EditShiftModal = (props) => {
    const [value, setValue] = useState("");
    const [comment, setComment] = useState("");
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [initialDate,setInitialDate] = useState("");
    const [initialInTime,setInitialInTime] = useState("");
    const [initialOutTime,setInitialOutTime] = useState("");
    const [initialComment,setInitialComment] = useState("");

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

    const onCancel = () =>{
        setValue("")
        setInTime("")
        setOutTime("")
        setComment("")
        setInTimeError({
            errorMessage: "",
            showError: false
        })
        setOutTimeError({
            errorMessage: "",
            showError: false
        })
        setCommentError({
            errorMessage: "",
            showError: false
        })
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Update Shift"
            type="twoColNarrow"
            onCancel={onCancel}
        >
            <EditableInput
                type="date"
                label="Date"
                value={value}
                setValue={setValue}
                initialValue={initialDate}
                className={DashboardModalStyles.singleColumn}
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
    );
};

export default EditShiftModal;
