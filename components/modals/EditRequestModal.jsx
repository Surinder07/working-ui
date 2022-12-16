import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";

const EditRequestsModal = (props) => {
    const [value, setValue] = useState("");
    const [comment, setComment] = useState("");
    //initial value 
    const [initialValue,setInitialValue] = useState("");
    const [initialComment,setInitialComment] = useState("");
    const [commentError, setCommentError] = useState({
        errorMessage: "",
        showError: false,
    });
    // const [radioError, setRadioError] = useState({
    //     errorMessage: "",
    //     showError: false,
    // });

    const onCancel = ()=> {
        setValue("")
        setComment("")
    
        setCommentError({
            errorMessage: "",
            showError:false
        })
    
    }
    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Edit Request"
            type="singleCol"
            onCancel={onCancel}
        >
            <EditableInput type="radio" label="Approve" value={value} setValue={setValue} initialValue={initialValue} editOn />
            <EditableInput type="radio" label="Reject" value={value} setValue={setValue} initialValue={initialValue} editOn />
            <EditableInput type="radio" label="Refer back to employee" value={value} setValue={setValue} initialValue={initialValue} editOn />
            <EditableInput
                type="text"
                label="Comment"
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

export default EditRequestsModal;
