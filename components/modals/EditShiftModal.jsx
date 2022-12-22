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

    const onCancel = () =>{
        setValue("")
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
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Update Shift"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
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
