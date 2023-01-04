import React, { useEffect } from "react";
import {useState} from "react";
import { fetchAndHandle, validateForEmptyField } from "../../helpers";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";

const EditRequestsModal = (props) => {
    const [value, setValue] = useState("");
    const [comment, setComment] = useState("");
    //initial value 
    const [initialValue,setInitialValue] = useState("");
    const [initialComment,setInitialComment] = useState("");
    const [commentError, setCommentError] = useState({
        message: "",
        show: false,
    });
    // const [radioError, setRadioError] = useState({
    //     errorMessage: "",
    //     showError: false,
    // });
    const [loading, setLoading] = useState(false);
    const onCancel = ()=> {
        setValue("")
        setComment("")
        setCommentError({})
    
    }

    useEffect(()=> {
        props.setData && props.setData({
            requestvalue:value,
            comment
        })
    },[])

    const isError = () => {
        return validateForEmptyField(comment, 'comment', setCommentError, true)
    }

    const saveData = () => {
        if (!isError()) {
            fetchAndHandle(setLoading,props.setReloadData,props.setPageLoading,onCancel,props.setShowModal,props.setToasterInfo)
            //     setLoading(true)
            //     if(error == true){
            //         props.setToasterInfo({
            //             error: true,
            //             title: 'Error!',
            //             message: res.message
            //         })
            //     }
            //     else{
            //         props.setToasterInfo({
            //             error: false,
            //             title: 'Success!',
            //             message: 'User invited successfully'
            //         });
            //         props.setReloadData(true)
            //         onCancel()
            //     }
            //     setLoading(false)
            // })
        }
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Edit Request"
            type="singleCol"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput type="radio" label="Approve" value={value} setValue={setValue} initialValue={value} editOn />
            <EditableInput type="radio" label="Reject" value={value} setValue={setValue} initialValue={value} editOn />
            <EditableInput type="radio" label="Refer back to employee" value={value} setValue={setValue} initialValue={value} editOn />
            <EditableInput
                type="text"
                label="Comment"
                value={comment}
                setValue={setComment}
                initialValue={comment}
                error={commentError}
                setError={setCommentError}
                required
                editOn
            />
        </DashboardModal>
    );
};

export default EditRequestsModal;
